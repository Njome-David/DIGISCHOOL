import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { ROLES, Role } from '@ecole/shared';
import { authRequired } from '../middlewares/auth';
import { requireRole } from '../middlewares/rbac';
import * as authService from '../modules/auth.service';
import {
  Admin,
  Personne,
  Eleve,
  Parents,
  Cycle,
  Classe,
  Salle,
  AnneeAcademique,
  Trimestre,
  Session,
  Cours,
  Enseignant,
  EmploiDuTemps,
  NatureEpreuve,
  Epreuve,
  Evaluation,
  Frequente,
  Scolarite,
  Tranches,
  Mode,
  Paiement,
  Messages,
  Rapport,
  Discipline,
  Livres,
  VilleNaissance,
  Bulletin,
  AuditLog,
} from '../db/models';
import { paginate, paginatedResponse } from '../lib/pagination';
import { nextId } from '../lib/id';
import { logAudit } from '../lib/audit';
import { upload } from '../lib/upload';
import { badRequest, notFound, forbidden } from '../lib/errors';
import { ENV } from '../config/env';
import path from 'path';
import fs from 'fs';
import PDFDocument from 'pdfkit';
import { sequelize } from '../db';
import { moyenneTrimestrielle, rangDansSalle, moyenneParCoursSession } from '../lib/averages';

const router = Router();

const wrap =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);

function parsePage(req: Request) {
  const page = Math.max(1, parseInt(String(req.query.page || 1), 10));
  const pageSize = Math.min(100, Math.max(1, parseInt(String(req.query.pageSize || 20), 10)));
  return { page, pageSize, ...paginate(page, pageSize) };
}

function scopeStudentWhere(req: Request, where: Record<string, unknown> = {}) {
  if (req.user?.role === ROLES.PARENT && req.user.childrenMatricules?.length) {
    return { ...where, matricule: { [Op.in]: req.user.childrenMatricules } };
  }
  return where;
}

// --- Auth ---
router.post(
  '/auth/login',
  wrap(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) throw badRequest('username et password requis');
    const result = await authService.login(username, password);
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ data: { accessToken: result.accessToken, user: result.user } });
  })
);

router.post(
  '/auth/refresh',
  wrap(async (req, res) => {
    const token = req.cookies?.refreshToken || req.body.refreshToken;
    if (!token) throw badRequest('refresh token manquant');
    const result = await authService.refresh(token);
    res.cookie('refreshToken', result.refreshToken, { httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({ data: { accessToken: result.accessToken, user: result.user } });
  })
);

router.post(
  '/auth/logout',
  authRequired,
  wrap(async (req, res) => {
    const token = req.cookies?.refreshToken || req.body.refreshToken;
    if (token) await authService.logout(token);
    res.clearCookie('refreshToken');
    res.status(204).send();
  })
);

router.post(
  '/auth/change-password',
  authRequired,
  wrap(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    await authService.changePassword(req.user!, currentPassword, newPassword);
    res.json({ data: { ok: true } });
  })
);

router.get(
  '/me',
  authRequired,
  wrap(async (req, res) => {
    res.json({ data: req.user });
  })
);

// --- Admins ---
router.get(
  '/admins',
  authRequired,
  requireRole(ROLES.ROOT),
  wrap(async (req, res) => {
    const { page, pageSize, limit, offset } = parsePage(req);
    const { rows, count } = await Admin.findAndCountAll({
      where: { isDelete: 0 },
      limit,
      offset,
      attributes: { exclude: ['password'] },
    });
    res.json(paginatedResponse(rows, count, page, pageSize));
  })
);

router.post(
  '/admins',
  authRequired,
  requireRole(ROLES.ROOT),
  wrap(async (req, res) => {
    const id = nextId();
    const hash = await bcrypt.hash(req.body.password || 'temp_ChangeMe1!', ENV.BCRYPT_ROUNDS);
    const admin = await Admin.create({
      ID: id,
      nom: req.body.nom,
      username: req.body.username,
      password: hash,
      typeAdmin: req.body.typeAdmin ?? 1,
      mobile: req.body.mobile || '0',
      alanyaID: req.body.alanyaID || '0',
      actif: 1,
      isDelete: 0,
      created_at: new Date(),
    });
    await logAudit(req, 'CREATE', 'admin', id);
    const { password: _, ...safe } = admin.toJSON();
    res.status(201).json({ data: safe });
  })
);

router.patch(
  '/admins/:id',
  authRequired,
  requireRole(ROLES.ROOT),
  wrap(async (req, res) => {
    const admin = await Admin.findByPk(String(req.params.id));
    if (!admin) throw notFound();
    await admin.update(req.body);
    await logAudit(req, 'UPDATE', 'admin', String(req.params.id));
    res.json({ data: admin });
  })
);

router.delete(
  '/admins/:id',
  authRequired,
  requireRole(ROLES.ROOT),
  wrap(async (req, res) => {
    const admin = await Admin.findByPk(String(req.params.id));
    if (!admin) throw notFound();
    await admin.update({ isDelete: 1 });
    await logAudit(req, 'DELETE', 'admin', String(req.params.id));
    res.status(204).send();
  })
);

// --- Personnel ---
router.get(
  '/personnel',
  authRequired,
  requireRole(ROLES.ROOT, ROLES.FONDATEUR, ROLES.DIRECTEUR, ROLES.ADMIN_AUDITEUR),
  wrap(async (req, res) => {
    const { page, pageSize, limit, offset } = parsePage(req);
    const { rows, count } = await Personne.findAndCountAll({
      where: { isDelete: 0 },
      limit,
      offset,
      attributes: { exclude: ['password'] },
    });
    res.json(paginatedResponse(rows, count, page, pageSize));
  })
);

router.post(
  '/personnel',
  authRequired,
  requireRole(ROLES.ROOT),
  wrap(async (req, res) => {
    const id = nextId();
    const hash = await bcrypt.hash(req.body.password || 'temp_ChangeMe1!', ENV.BCRYPT_ROUNDS);
    const p = await Personne.create({
      idPers: id,
      ...req.body,
      password: hash,
      idAdmin: req.user!.id,
      isDelete: 0,
      created_at: new Date(),
    });
    await logAudit(req, 'CREATE', 'personnel', id);
    res.status(201).json({ data: p });
  })
);

router.delete('/personnel/:id', authRequired, requireRole(ROLES.ROOT), wrap(async (req, res) => {
  const p = await Personne.findByPk(String(req.params.id));
  if (!p) throw notFound();
  await p.update({ isDelete: 1 });
  await logAudit(req, 'DELETE', 'personnel', String(req.params.id));
  res.status(204).send();
}));

// --- Students ---
router.get(
  '/students',
  authRequired,
  wrap(async (req, res) => {
    const { page, pageSize, limit, offset } = parsePage(req);
    const where = scopeStudentWhere(req, { isDelete: 0 });
    if (req.query.salle) {
      const f = await Frequente.findAll({ where: { idSalle: req.query.salle } });
      where.matricule = { [Op.in]: f.map((x: any) => x.matricule) };
    }
    const { rows, count } = await Eleve.findAndCountAll({ where, limit, offset });
    res.json(paginatedResponse(rows, count, page, pageSize));
  })
);

router.post(
  '/students',
  authRequired,
  requireRole(ROLES.ADMIN_INSCRIPTIONS, ROLES.ADMINISTRATIF),
  wrap(async (req, res) => {
    const matricule = nextId();
    const eleve = await Eleve.create({
      matricule,
      ...req.body,
      idAdmin: req.user!.id,
      isDelete: 0,
      created_at: new Date(),
    });
    await logAudit(req, 'CREATE', 'student', matricule);
    res.status(201).json({ data: eleve });
  })
);

router.get(
  '/students/:matricule',
  authRequired,
  wrap(async (req, res) => {
    const mat = parseInt(String(req.params.matricule), 10);
    if (req.user?.role === ROLES.PARENT && !req.user.childrenMatricules?.includes(mat)) {
      throw forbidden();
    }
    const eleve = await Eleve.findByPk(mat);
    if (!eleve || eleve.isDelete) throw notFound();
    res.json({ data: eleve });
  })
);

router.patch(
  '/students/:matricule',
  authRequired,
  requireRole(ROLES.ADMIN_INSCRIPTIONS, ROLES.ADMINISTRATIF),
  wrap(async (req, res) => {
    const eleve = await Eleve.findByPk(String(req.params.matricule));
    if (!eleve) throw notFound();
    await eleve.update(req.body);
    res.json({ data: eleve });
  })
);

router.post(
  '/students/:matricule/assign-room',
  authRequired,
  requireRole(ROLES.ADMIN_INSCRIPTIONS),
  wrap(async (req, res) => {
    const id = nextId();
    const f = await Frequente.create({
      idFrequente: id,
      matricule: parseInt(String(req.params.matricule), 10),
      idSalle: req.body.idSalle,
      idAcademi: req.body.idAcademi,
      commentaire: req.body.commentaire || 'RAS',
      idAdmin: req.user!.id,
      created_at: new Date(),
    });
    res.status(201).json({ data: f });
  })
);

// Route pour supprimer un parent d'un élève (soft delete)
router.delete('/students/:matricule/parents/:id', authRequired,
  requireRole(ROLES.ROOT, ROLES.ADMIN_INSCRIPTIONS), wrap(async (req, res) => {
    const r = await Parents.findByPk(String(req.params.id));
    if (!r) throw notFound();
    await r.update({ isDelete: 1 });
    res.status(204).send();
  }));

router.get('/students/:matricule/payments', authRequired, wrap(async (req, res) => {
  const mat = parseInt(String(req.params.matricule), 10);
  if (req.user?.role === ROLES.PARENT && !req.user.childrenMatricules?.includes(mat)) throw forbidden();
  const rows = await Paiement.findAll({ where: { matricule: mat } });
  res.json({ data: rows });
}));

router.get('/students/:matricule/grades', authRequired, wrap(async (req, res) => {
  const mat = parseInt(String(req.params.matricule), 10);
  if (req.user?.role === ROLES.PARENT && !req.user.childrenMatricules?.includes(mat)) throw forbidden();
  const where: any = { matricule: mat };
  if (req.query.idSession) where.idSession = req.query.idSession;
  const rows = await Evaluation.findAll({ where });
  res.json({ data: rows });
}));

router.get('/students/:matricule/discipline', authRequired, wrap(async (req, res) => {
  const mat = parseInt(String(req.params.matricule), 10);
  if (req.user?.role === ROLES.PARENT && !req.user.childrenMatricules?.includes(mat)) throw forbidden();
  const rows = await Rapport.findAll({ where: { matricule: mat, isDelete: 0 } });
  res.json({ data: rows });
}));

// --- Academic refs ---
const crudList = async (Model: any, pk: string, req: Request, res: Response, extraWhere: Record<string, unknown> = {}) => {
  const { page, pageSize, limit, offset } = parsePage(req);
  const where = { isDelete: 0, ...extraWhere };
  const { rows, count } = await Model.findAndCountAll({ where, limit, offset });
  res.json(paginatedResponse(rows, count, page, pageSize));
};

router.get('/cycles', authRequired, wrap(async (req, res) => crudList(Cycle, 'idCycle', req, res)));
router.post('/cycles', authRequired, requireRole(ROLES.ROOT), wrap(async (req, res) => {
  const id = nextId();
  const row = await Cycle.create({ idCycle: id, ...req.body, idAdmin: req.user!.id, isDelete: 0, created: new Date() });
  res.status(201).json({ data: row });
}));

router.get('/classes', authRequired, wrap(async (req, res) => crudList(Classe, 'idClasse', req, res)));
router.post('/classes', authRequired, requireRole(ROLES.ROOT), wrap(async (req, res) => {
  const id = nextId();
  const row = await Classe.create({ idClasse: id, ...req.body, idAdmin: req.user!.id, isDelete: 0, created_at: new Date() });
  res.status(201).json({ data: row });
}));

router.get('/salles', authRequired, wrap(async (req, res) => {
  const { page, pageSize, limit, offset } = parsePage(req);
  const { rows, count } = await Salle.findAndCountAll({ limit, offset });
  res.json(paginatedResponse(rows, count, page, pageSize));
}));
router.post('/salles', authRequired, requireRole(ROLES.ROOT), wrap(async (req, res) => {
  const id = nextId();
  const row = await Salle.create({ idSalle: id, ...req.body, idAdmin: req.user!.id, created_at: new Date() });
  res.status(201).json({ data: row });
}));

router.get('/academic-years', authRequired, wrap(async (req, res) => crudList(AnneeAcademique, 'idAnnee', req, res)));
router.post('/academic-years', authRequired, requireRole(ROLES.ROOT), wrap(async (req, res) => {
  const id = nextId();
  const row = await AnneeAcademique.create({ idAnnee: id, ...req.body, idAdmin: req.user!.id, isDelete: 0, created_at: new Date() });
  res.status(201).json({ data: row });
}));

router.get('/trimestres', authRequired, wrap(async (req, res) => {
  const where: any = {};
  if (req.query.idAca) where.idAca = req.query.idAca;
  const rows = await Trimestre.findAll({ where });
  res.json({ data: rows });
}));

router.get('/courses', authRequired, wrap(async (req, res) => crudList(Cours, 'idCours', req, res)));

router.get('/schedules/my', authRequired, requireRole(ROLES.ENSEIGNANT), wrap(async (req, res) => {
  const assignments = await Enseignant.findAll({
    where: { idPers: req.user!.id, Actif: 1, isDelete: 0 },
    attributes: ['idCours'], raw: true,
  });
  const coursIds = (assignments as any[]).map((a: any) => a.idCours);
  const rows = await EmploiDuTemps.findAll({ where: { idCours: { [Op.in]: coursIds } } });
  res.json({ data: rows });
}));

router.get('/schedules/:classId', authRequired, wrap(async (req, res) => {
  const rows = await EmploiDuTemps.findAll({ where: { idClasse: req.params.classId } });
  res.json({ data: rows });
}));

// --- Exams & grades ---
router.post('/exams/:id/grades', authRequired, requireRole(ROLES.ENSEIGNANT), wrap(async (req, res) => {
  const idEpreuve = parseInt(String(req.params.id), 10);
  const { evaluations } = req.body;
  if (!Array.isArray(evaluations)) throw badRequest('evaluations[] requis');
  const rows = await Evaluation.bulkCreate(
    evaluations.map((e: any) => ({ idEval: nextId(), idEpreuve, ...e, idPers: req.user!.id, created_at: new Date() })),
    { ignoreDuplicates: true }
  );
  await logAudit(req, 'BULK_GRADES', 'evaluation', idEpreuve);
  res.status(201).json({ data: rows });
}));

router.get('/exams', authRequired, wrap(async (req, res) => {
  const { page, pageSize, limit, offset } = parsePage(req);
  const { rows, count } = await Epreuve.findAndCountAll({ where: { isDelete: 0 }, limit, offset });
  res.json(paginatedResponse(rows, count, page, pageSize));
}));

router.post('/exams', authRequired, requireRole(ROLES.ENSEIGNANT), upload.single('file'), wrap(async (req, res) => {
  const id = nextId();
  const row = await Epreuve.create({
    idEpreuve: id,
    libelle: req.body.libelle,
    idNature: req.body.idNature,
    idPers: req.user!.id,
    urlDoc: req.file ? `/uploads/${req.file.filename}` : 'INDEFINI',
    auteur: req.user!.nom,
    created_at: new Date(),
    isDelete: 0,
  });
  res.status(201).json({ data: row });
}));

router.get('/evaluations', authRequired, wrap(async (req, res) => {
  const where: Record<string, unknown> = {};
  if (req.query.matricule) where.matricule = req.query.matricule;
  if (req.user?.role === ROLES.PARENT) {
    where.matricule = { [Op.in]: req.user.childrenMatricules || [] };
  }
  const rows = await Evaluation.findAll({ where, limit: 100 });
  res.json({ data: rows });
}));

router.post('/evaluations/bulk', authRequired, requireRole(ROLES.ENSEIGNANT), wrap(async (req, res) => {
  const items = req.body.evaluations || [];
  const created = [];
  for (const item of items) {
    const id = nextId();
    created.push(await Evaluation.create({ idEval: id, ...item, idPers: req.user!.id, created_at: new Date() }));
  }
  res.status(201).json({ data: created });
}));

router.patch('/evaluations/:id', authRequired, requireRole(ROLES.ENSEIGNANT), wrap(async (req, res) => {
  const ev = await Evaluation.findByPk(String(req.params.id));
  if (!ev) throw notFound();
  await ev.update(req.body);
  res.json({ data: ev });
}));

// --- Bulletins ---
router.get('/bulletins/:matricule/:trimestre', authRequired, wrap(async (req, res) => {
  const mat = parseInt(String(req.params.matricule), 10);
  if (req.user?.role === ROLES.PARENT && !req.user.childrenMatricules?.includes(mat)) throw forbidden();
  const b = await Bulletin.findOne({
    where: { matricule: mat, idTrimestre: req.params.trimestre },
  });
  if (!b) throw notFound();
  if (req.user?.role === ROLES.PARENT && !b.valide) throw forbidden('Bulletin non validé');
  res.json({ data: b });
}));

router.post('/bulletins/generate', authRequired, requireRole(ROLES.DIRECTEUR, ROLES.ROOT), wrap(async (req, res) => {
  const { idTrimestre } = req.body;
  if (!idTrimestre) throw badRequest('idTrimestre requis');

  // Récupère tous les élèves actifs avec leur salle pour ce trimestre
  const frequentes = await Frequente.findAll({
    //where: { isDelete: 0 },
    attributes: ['matricule', 'idSalle'],
    raw: true
  });

  const created = [];
  for (const f of frequentes as any[]) {
    const moy = await moyenneTrimestrielle(f.matricule, idTrimestre);
    const rang = await rangDansSalle(f.matricule, f.idSalle, idTrimestre);

    const [b] = await Bulletin.upsert({
      matricule: f.matricule,
      idTrimestre: Number(idTrimestre),
      moyenne: moy,
      rang: rang || null,
      valide: 0,
      generatedAt: new Date(),
    } as never);
    created.push(b);
  }

  await logAudit(req, 'GENERATE_BULLETINS', 'bulletin', idTrimestre);
  res.json({ data: created, meta: { count: created.length } });
}));

router.post('/bulletins/:id/validate', authRequired, requireRole(ROLES.DIRECTEUR), wrap(async (req, res) => {
  const b = await Bulletin.findByPk(String(req.params.id));
  if (!b) throw notFound();
  await b.update({ valide: 1 });
  res.json({ data: b });
}));

// --- Payments ---
router.get('/payments', authRequired, wrap(async (req, res) => {
  const { page, pageSize, limit, offset } = parsePage(req);
  const where = scopeStudentWhere(req);
  const { rows, count } = await Paiement.findAndCountAll({ where, limit, offset });
  res.json(paginatedResponse(rows, count, page, pageSize));
}));

router.post('/payments', authRequired, requireRole(ROLES.ADMIN_SCOLARITE), upload.single('receipt'), wrap(async (req, res) => {
  const id = nextId();
  const p = await Paiement.create({
    idPaie: id,
    matricule: req.body.matricule,
    idAca: req.body.idAca,
    montant: req.body.montant,
    idMode: req.body.idMode,
    idPers: req.user!.id,
    datePaie: req.body.datePaie || new Date(),
    url: req.file ? `/uploads/${req.file.filename}` : 'INDEFINI',
    comentaire: req.body.comentaire || 'INDEFINI',
    operation_ID: req.body.operation_ID || 'INDEFINI',
    dateEnregistrer: new Date(),
  });
  await logAudit(req, 'CREATE', 'payment', id);
  res.status(201).json({ data: p });
}));

router.get('/payments/overdue',
  authRequired,
  requireRole(ROLES.ADMIN_SCOLARITE, ROLES.FONDATEUR, ROLES.DIRECTEUR, ROLES.ADMIN_AUDITEUR),
  wrap(async (req, res) => {
    const idAca = req.query.idAca ? Number(req.query.idAca) : null;
    if (!idAca) throw badRequest('idAca requis');
    const [results] = await sequelize.query(
      `SELECT e.matricule, e.nom, e.prenom
       FROM Eleve e
       WHERE e.isDelete = 0 AND e.actif = 1
         AND e.matricule NOT IN (
           SELECT DISTINCT p.matricule FROM Paiement p WHERE p.idAca = :idAca
         )`,
      { replacements: { idAca }, raw: true }
    );
    res.json({ data: results });
  })
);

router.get('/tuitions', authRequired, wrap(async (_req, res) => {
  res.json({ data: await Scolarite.findAll() });
}));
router.get('/tranches', authRequired, wrap(async (_req, res) => {
  res.json({ data: await Tranches.findAll() });
}));
router.get('/modes', authRequired, wrap(async (_req, res) => {
  res.json({ data: await Mode.findAll() });
}));
router.post('/tuitions', authRequired, requireRole(ROLES.FONDATEUR), wrap(async (req, res) => {
  const id = nextId();
  const row = await Scolarite.create({ idScolarite: id, ...req.body, created_at: new Date() });
  res.status(201).json({ data: row });
}));
router.post('/tranches', authRequired, requireRole(ROLES.FONDATEUR), wrap(async (req, res) => {
  const id = nextId();
  const row = await Tranches.create({ idTranche: id, ...req.body });
  res.status(201).json({ data: row });
}));
router.post('/modes', authRequired, requireRole(ROLES.FONDATEUR), wrap(async (req, res) => {
  const id = nextId();
  const row = await Mode.create({ idMode: id, ...req.body, created_at: new Date() });
  res.status(201).json({ data: row });
}));

// --- Messages ---
router.get('/messages', authRequired, wrap(async (req, res) => {
  const where: any = {};
  if (req.user?.role === ROLES.PARENT) {
    // idParent est la PK de Parents, pas idPers — il faut retrouver l'idParent
    const parentRecord = await Parents.findOne({
      where: { idPers: req.user.id, isDelete: 0 },
      attributes: ['idParent'],
      raw: true,
    });
    if (!parentRecord) { res.json({ data: [] }); return; }
    where.idParent = (parentRecord as any).idParent;
  } else if (req.user?.role === ROLES.ENSEIGNANT) {
    where.idExp_Pers = req.user.id;
  }
  if (req.query.search) where.objet = { [Op.like]: `%${req.query.search}%` };
  const rows = await Messages.findAll({ where, order: [['created_at', 'DESC']], limit: 100 });
  res.json({ data: rows });
}));

router.post('/messages', authRequired, wrap(async (req, res) => {
  const id = nextId();
  const row = await Messages.create({
    idMessages: id,
    idExp_Pers: req.user!.id,
    idParent: req.body.idParent,
    objet: req.body.objet,
    information: req.body.information,
    type_message: req.body.type_message ?? 0,
    AnneeAcade: req.body.AnneeAcade || '2025-2026',
    valider: req.body.type_message === 1 ? 0 : 1,
    created_at: new Date(),
  });
  res.status(201).json({ data: row });
}));

router.post('/messages/:id/validate', authRequired, requireRole(ROLES.DIRECTEUR), wrap(async (req, res) => {
  const m = await Messages.findByPk(String(req.params.id));
  if (!m) throw notFound();
  await m.update({ valider: 1 });
  res.json({ data: m });
}));

router.put('/messages/:id/read', authRequired, wrap(async (req, res) => {
  const m = await Messages.findByPk(String(req.params.id));
  if (!m) throw notFound();
  await m.update({ valider: 1 }); // Or specific read logic if distinct from valider
  res.json({ data: m });
}));

// --- Discipline ---
router.get('/discipline-reports', authRequired, wrap(async (req, res) => {
  const where = scopeStudentWhere(req, { isDelete: 0 });
  const rows = await Rapport.findAll({ where, limit: 100 });
  res.json({ data: rows });
}));

router.post('/discipline-reports', authRequired, requireRole(ROLES.ENSEIGNANT, ROLES.ADMINISTRATIF), wrap(async (req, res) => {
  const id = nextId();
  const row = await Rapport.create({ idRap: id, ...req.body, idPers: req.user!.id, created_at: new Date(), isDelete: 0 });
  res.status(201).json({ data: row });
}));

router.post('/discipline-reports/:id/approve', authRequired, requireRole(ROLES.DIRECTEUR),
  wrap(async (req, res) => {
    const r = await Rapport.findByPk(String(req.params.id));
    if (!r) throw notFound();
    await r.update({
      commentaire: `[APPROUVÉ ${new Date().toISOString()}] ${r.commentaire}`,
    });
    await logAudit(req, 'APPROVE_DISCIPLINE', 'rapport', String(req.params.id));
    res.json({ data: { ...r.toJSON(), approved: true } });
  })
);

// router.put('/discipline-reports/:id/status', authRequired, requireRole(ROLES.DIRECTEUR), wrap(async (req, res) => {
//   const r = await Rapport.findByPk(String(req.params.id));
//   if (!r) throw notFound();
//   await r.update({ status: req.body.status });
//   res.json({ data: r });
// }));

router.get('/discipline', authRequired, wrap(async (_req, res) => {
  res.json({ data: await Discipline.findAll() });
}));

// --- Audit & stats ---
router.get('/audit-logs', authRequired, requireRole(ROLES.ROOT, ROLES.ADMIN_AUDITEUR), wrap(async (req, res) => {
  const { page, pageSize, limit, offset } = parsePage(req);
  const { rows, count } = await AuditLog.findAndCountAll({ limit, offset, order: [['createdAt', 'DESC']] });
  res.json(paginatedResponse(rows, count, page, pageSize));
}));

router.get('/stats/finance', authRequired,
  requireRole(ROLES.ROOT, ROLES.ADMIN_SCOLARITE, ROLES.FONDATEUR, ROLES.DIRECTEUR, ROLES.ADMIN_AUDITEUR),
  wrap(async (req, res) => {
    const where: any = {};
    if (req.query.idAca) where.idAca = req.query.idAca;
    if (req.query.trimestre) {
      const t = await Trimestre.findByPk(String(req.query.trimestre), { raw: true }) as any;
      if (t?.periode) {
        const [debut, fin] = t.periode.split(':');
        if (debut && fin) where.datePaie = { [Op.between]: [debut.trim(), fin.trim()] };
      }
    }
    const total = (await Paiement.sum('montant', { where })) ?? 0;
    const count = await Paiement.count({ where });
    res.json({ data: { total, count } });
  }));

router.get('/stats/pedagogy', authRequired, wrap(async (_req, res) => {
  const students = await Eleve.count({ where: { isDelete: 0 } });
  const classes  = await Classe.count({ where: { isDelete: 0 } });
  const courses  = await Cours.count({ where: { isDelete: 0 } });
  const [avgRow] = await sequelize.query(
    'SELECT ROUND(AVG(note), 2) AS avgGrade FROM Evaluation',
    { raw: true }
  );
  const avgGrade = (avgRow as any[])[0]?.avgGrade ?? 0;
  res.json({ data: { students, classes, courses, avgGrade } });
}));

router.get('/parents', authRequired, requireRole(ROLES.ROOT, ROLES.ADMIN_INSCRIPTIONS, ROLES.DIRECTEUR), wrap(async (req, res) => {
  const { page, pageSize, limit, offset } = parsePage(req);
  const { rows, count } = await Parents.findAndCountAll({ where: { isDelete: 0 }, limit, offset });
  res.json(paginatedResponse(rows, count, page, pageSize));
}));

router.get('/sessions', authRequired, wrap(async (req, res) => {
  const where: any = {};
  if (req.query.idTrimestre) where.idTrimestre = req.query.idTrimestre;
  const rows = await Session.findAll({ where });
  res.json({ data: rows });
}));

router.post(
  '/personnel/:id/send-credentials',
  authRequired,
  requireRole(ROLES.ROOT),
  wrap(async (req, res) => {
    const pers = await Personne.findByPk(String(req.params.id));
    if (!pers) throw notFound();
    await logAudit(req, 'SEND_CREDENTIALS', 'personnel', String(req.params.id));
    res.json({ data: { sent: true, username: pers.username } });
  })
);

router.get('/exams/:id/file', authRequired, wrap(async (req, res) => {
  const exam = await Epreuve.findByPk(String(req.params.id));
  if (!exam || exam.urlDoc === 'INDEFINI') throw notFound();
  const filePath = path.resolve(ENV.UPLOAD_DIR, path.basename(exam.urlDoc));
  if (!fs.existsSync(filePath)) throw notFound('Fichier introuvable');
  res.sendFile(filePath);
}));

router.post('/payments/reminders', authRequired, requireRole(ROLES.ADMIN_SCOLARITE),
  wrap(async (req, res) => {
    const { idAca, objet, information } = req.body;
    if (!idAca) throw badRequest('idAca requis');
    const [overdue] = await sequelize.query(
      `SELECT e.matricule FROM Eleve e WHERE e.isDelete = 0 AND e.actif = 1
       AND e.matricule NOT IN (SELECT DISTINCT p.matricule FROM Paiement p WHERE p.idAca = :idAca)`,
      { replacements: { idAca }, raw: true }
    );
    let sent = 0;
    for (const row of overdue as any[]) {
      const linkedParents = await Parents.findAll({ where: { matricule: row.matricule, isDelete: 0 } });
      for (const parent of linkedParents) {
        await Messages.create({
          idMessages: nextId(),
          idExp_Pers: req.user!.id,
          idParent: parent.idParent,
          objet: objet || 'Rappel de paiement',
          information: information || 'Votre paiement est en retard.',
          type_message: 2,
          AnneeAcade: String(idAca),
          valider: 1,
          created_at: new Date(),
        });
        sent++;
      }
    }
    await logAudit(req, 'SEND_REMINDERS', 'payments', idAca, { sent });
    res.json({ data: { sent, overdueCount: (overdue as any[]).length } });
  })
);

router.get('/villes', authRequired, wrap(async (_req, res) => {
  res.json({ data: await VilleNaissance.findAll() });
}));

router.get('/library/books', authRequired, wrap(async (_req, res) => {
  res.json({ data: await Livres.findAll() });
}));

router.post('/library/books', authRequired, requireRole(ROLES.ROOT), wrap(async (req, res) => {
  const id = nextId();
  const row = await Livres.create({ idLivre: id, idAdmin: req.user!.id, created_at: new Date(), ...req.body });
  res.status(201).json({ data: row });
}));

// router.post('/library/loans', authRequired, requireRole(ROLES.BIBLIOTHECAIRE), wrap(async (req, res) => {
//   const id = nextId();
//   const row = await Pret.create({ idPret: id, ...req.body, datePret: new Date(), statut: 'EN_COURS' });
//   res.status(201).json({ data: row });
// }));

// router.put('/library/loans/:id/return', authRequired, requireRole(ROLES.BIBLIOTHECAIRE), wrap(async (req, res) => {
//   const p = await Pret.findByPk(String(req.params.id));
//   if (!p) throw notFound();
//   await p.update({ dateRetour: new Date(), statut: 'RETOURNE' });
//   res.json({ data: p });
// }));

router.get('/natures-epreuve', authRequired, wrap(async (_req, res) => {
  res.json({ data: await NatureEpreuve.findAll() });
}));

// Receipt PDF
router.get('/payments/:id/receipt.pdf', authRequired, wrap(async (req, res) => {
  const p = await Paiement.findByPk(String(req.params.id));
  if (!p) throw notFound();
  if (req.user?.role === ROLES.PARENT && !req.user.childrenMatricules?.includes(p.matricule)) {
    throw forbidden();
  }
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=receipt-${p.idPaie}.pdf`);
  doc.pipe(res);
  doc.fontSize(18).text('EcoleApp 2026  Reçu de paiement', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`N° ${p.idPaie} | Matricule: ${p.matricule}`);
  doc.text(`Montant: ${p.montant} XAF | Date: ${p.datePaie}`);
  doc.text('PAYÉ', { align: 'center' });
  doc.end();
}));

// Nouvelles routes génériques pour les références académiques (cycles, classes, salles) avec POST + PATCH

// ── PATCH génériques manquants ──────────────────────────────────────────────
router.patch('/cycles/:id', authRequired, requireRole(ROLES.ROOT), wrap(async (req, res) => {
  const r = await Cycle.findByPk(String(req.params.id));
  if (!r) throw notFound();
  await r.update(req.body);
  res.json({ data: r });
}));

router.patch('/classes/:id', authRequired, requireRole(ROLES.ROOT), wrap(async (req, res) => {
  const r = await Classe.findByPk(String(req.params.id));
  if (!r) throw notFound();
  await r.update(req.body);
  res.json({ data: r });
}));

router.patch('/salles/:id', authRequired, requireRole(ROLES.ROOT), wrap(async (req, res) => {
  const r = await Salle.findByPk(String(req.params.id));
  if (!r) throw notFound();
  await r.update(req.body);
  res.json({ data: r });
}));

// ── Liaison parent-enfant ───────────────────────────────────────────────────
router.post('/students/:matricule/parents', authRequired,
  requireRole(ROLES.ROOT, ROLES.ADMIN_INSCRIPTIONS), wrap(async (req, res) => {
    const { idPers } = req.body;
    if (!idPers) throw badRequest('idPers requis');
    const mat = parseInt(String(req.params.matricule), 10);
    const eleve = await Eleve.findByPk(mat);
    if (!eleve) throw notFound();
    const existing = await Parents.findOne({ where: { idPers, matricule: mat } });
    if (existing) throw badRequest('Lien déjà existant');
    const row = await Parents.create({ idParent: nextId(), idPers, matricule: mat, idAdmin: req.user!.id, created_at: new Date(), isDelete: 0 });
    await logAudit(req, 'LINK_PARENT', 'parents', row.idParent);
    res.status(201).json({ data: row });
  }));

// ── Emploi du temps par enseignant ──────────────────────────────────────────
router.get('/schedules/my', authRequired, requireRole(ROLES.ENSEIGNANT), wrap(async (req, res) => {
  // Trouver les cours de cet enseignant
  const assignments = await Enseignant.findAll({
    where: { idPers: req.user!.id, Actif: 1, isDelete: 0 },
    attributes: ['idCours'], raw: true,
  });
  const courIds = (assignments as any[]).map((a: any) => a.idCours);
  const rows = await EmploiDuTemps.findAll({
    where: { idCours: { [Op.in]: courIds } },
  });
  res.json({ data: rows });
}));

// ── Upload photo élève ──────────────────────────────────────────────────────
router.post('/students/:matricule/photo', authRequired,
  requireRole(ROLES.ROOT, ROLES.ADMIN_INSCRIPTIONS, ROLES.ADMINISTRATIF),
  upload.single('photo'), wrap(async (req, res) => {
    if (!req.file) throw badRequest('Photo requise');
    const mat = parseInt(String(req.params.matricule), 10);
    const eleve = await Eleve.findByPk(mat);
    if (!eleve) throw notFound();
    const url = `/uploads/${req.file.filename}`;
    await eleve.update({ photoURL: url });
    res.json({ data: { photoURL: url } });
  })
);

export default router;
