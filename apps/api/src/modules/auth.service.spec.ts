jest.mock('../db/models', () => ({
  Admin: { findOne: jest.fn(), findByPk: jest.fn() },
  Personne: { findOne: jest.fn(), findByPk: jest.fn() },
  Parents: { findAll: jest.fn() },
  RefreshToken: { create: jest.fn(), findOne: jest.fn(), destroy: jest.fn() },
}));

import * as authService from './auth.service';
import { Admin, Personne, Parents, RefreshToken } from '../db/models';
import bcrypt from 'bcryptjs';

jest.mock('../db/models');
jest.mock('bcryptjs');

const mockAdmin = {
  ID: 1, username: 'root', password: 'hashed', nom: 'Root',
  typeAdmin: 0, actif: 1, isDelete: 0,
};
const mockParent = {
  idPers: 10, username: 'parent1', password: 'hashed', nom: 'Doe',
  prenom: 'John', typePersonne: 4, isDelete: 0,
};

beforeEach(() => jest.clearAllMocks());

describe('login', () => {
  it('retourne un token pour un admin valide', async () => {
    (Admin.findOne as jest.Mock).mockResolvedValue(mockAdmin);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (RefreshToken.create as jest.Mock).mockResolvedValue({});
    const result = await authService.login('root', 'password');
    expect(result.accessToken).toBeDefined();
    expect(result.user.role).toBe('ROOT');
  });

  it('rejette un admin avec mauvais mot de passe', async () => {
    (Admin.findOne as jest.Mock).mockResolvedValue(mockAdmin);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    await expect(authService.login('root', 'wrong')).rejects.toThrow();
  });

  it('peuple childrenMatricules pour un PARENT', async () => {
    (Admin.findOne as jest.Mock).mockResolvedValue(null);
    (Personne.findOne as jest.Mock).mockResolvedValue(mockParent);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (Parents.findAll as jest.Mock).mockResolvedValue([
    { matricule: 101 } as any,
    { matricule: 102 } as any,
    ]);
    (RefreshToken.create as jest.Mock).mockResolvedValue({});
    const result = await authService.login('parent1', 'password');
    expect(result.user.childrenMatricules).toEqual([101, 102]);
  });

  it('rejette si aucun compte trouvé', async () => {
    (Admin.findOne as jest.Mock).mockResolvedValue(null);
    (Personne.findOne as jest.Mock).mockResolvedValue(null);
    await expect(authService.login('inconnu', 'x')).rejects.toThrow();
  });
});

describe('logout', () => {
  it('détruit le refresh token', async () => {
    (RefreshToken.destroy as jest.Mock).mockResolvedValue(1);
    await authService.logout('some-token');
    expect(RefreshToken.destroy).toHaveBeenCalledWith({ where: { token: 'some-token' } });
  });
});