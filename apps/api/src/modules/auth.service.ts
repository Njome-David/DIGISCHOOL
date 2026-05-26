import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { Op } from 'sequelize';
import {
  ADMIN_TYPE_TO_ROLE,
  PERSONNE_TYPE_TO_ROLE,
  Role,
  ROLES,
} from '@ecole/shared';
import { ENV } from '../config/env';
import { Admin, Personne, Parents, RefreshToken } from '../db/models';
import { AppError, unauthorized } from '../lib/errors';

export interface TokenPayload {
  id: number;
  userType: 'admin' | 'personne';
  role: Role;
  username: string;
  nom: string;
  mustChangePassword?: boolean;
  childrenMatricules?: number[];
}

function mapAdminRole(typeAdmin: number): Role {
  return ADMIN_TYPE_TO_ROLE[typeAdmin] ?? ROLES.ADMIN_INSCRIPTIONS;
}

function mapPersonneRole(typePersonne: number): Role | null {
  return PERSONNE_TYPE_TO_ROLE[typePersonne] ?? null;
}

async function getChildrenMatricules(idPers: number): Promise<number[]> {
  const links = await Parents.findAll({
    where: { idPers, isDelete: 0 },
    attributes: ['matricule'],
  });
  return links.map((l) => l.matricule);
}

export async function login(username: string, password: string) {
  const admin = await Admin.findOne({
    where: {
      username,
      actif: 1,
      [Op.or]: [{ isDelete: 0 }, { isDelete: null }],
    },
  });
  if (admin) {
    const ok =
      (await bcrypt.compare(password, admin.password).catch(() => false)) ||
      admin.password === password;
    if (!ok) throw unauthorized('Identifiants incorrects');
    const role = mapAdminRole(admin.typeAdmin);
    const payload: TokenPayload = {
      id: admin.ID,
      userType: 'admin',
      role,
      username: admin.username,
      nom: admin.nom,
      mustChangePassword: password.startsWith('temp_'),
    };
    return issueTokens(payload);
  }

  const pers = await Personne.findOne({ where: { username, isDelete: 0 } });
  if (!pers) throw unauthorized('Identifiants incorrects');

  const ok =
    (await bcrypt.compare(password, pers.password).catch(() => false)) ||
    pers.password === password;
  if (!ok) throw unauthorized('Identifiants incorrects');

  const role = mapPersonneRole(pers.typePersonne);
  if (!role) throw unauthorized('Profil non autorisé');

  const payload: TokenPayload = {
    id: pers.idPers,
    userType: 'personne',
    role,
    username: pers.username,
    nom: `${pers.prenom} ${pers.nom}`,
    mustChangePassword: password.startsWith('temp_'),
    childrenMatricules:
      role === ROLES.PARENT ? await getChildrenMatricules(pers.idPers) : undefined,
  };
  return issueTokens(payload);
}

async function issueTokens(payload: TokenPayload) {
  const accessToken = jwt.sign(payload, ENV.JWT_ACCESS_SECRET, {
    expiresIn: ENV.JWT_ACCESS_TTL as jwt.SignOptions['expiresIn'],
  });
  const refreshToken = randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await RefreshToken.create({
    userId: payload.id,
    userType: payload.userType,
    token: refreshToken,
    expiresAt,
  });

  return { accessToken, refreshToken, user: payload };
}

export async function refresh(refreshToken: string) {
  const row = await RefreshToken.findOne({ where: { token: refreshToken } });
  if (!row || row.expiresAt < new Date()) throw unauthorized('Refresh token invalide');

  let payload: TokenPayload;
  if (row.userType === 'admin') {
    const admin = await Admin.findByPk(row.userId);
    if (!admin) throw unauthorized();
    payload = {
      id: admin.ID,
      userType: 'admin',
      role: mapAdminRole(admin.typeAdmin),
      username: admin.username,
      nom: admin.nom,
    };
  } else {
    const pers = await Personne.findByPk(row.userId);
    if (!pers) throw unauthorized();
    const role = mapPersonneRole(pers.typePersonne);
    if (!role) throw unauthorized();
    payload = {
      id: pers.idPers,
      userType: 'personne',
      role,
      username: pers.username,
      nom: `${pers.prenom} ${pers.nom}`,
      childrenMatricules:
        role === ROLES.PARENT ? await getChildrenMatricules(pers.idPers) : undefined,
    };
  }

  await row.destroy();
  return issueTokens(payload);
}

export async function logout(refreshToken: string) {
  await RefreshToken.destroy({ where: { token: refreshToken } });
}

export async function changePassword(
  user: TokenPayload,
  currentPassword: string,
  newPassword: string
) {
  const hash = await bcrypt.hash(newPassword, ENV.BCRYPT_ROUNDS);
  if (user.userType === 'admin') {
    const admin = await Admin.findByPk(user.id);
    if (!admin) throw unauthorized();
    const ok =
      (await bcrypt.compare(currentPassword, admin.password).catch(() => false)) ||
      admin.password === currentPassword;
    if (!ok) throw new AppError(400, 'BAD_PASSWORD', 'Mot de passe actuel incorrect');
    await admin.update({ password: hash });
  } else {
    const pers = await Personne.findByPk(user.id);
    if (!pers) throw unauthorized();
    const ok =
      (await bcrypt.compare(currentPassword, pers.password).catch(() => false)) ||
      pers.password === currentPassword;
    if (!ok) throw new AppError(400, 'BAD_PASSWORD', 'Mot de passe actuel incorrect');
    await pers.update({ password: hash });
  }
}
