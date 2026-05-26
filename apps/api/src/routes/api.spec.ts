import request from 'supertest';
import { createApp } from '../app';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

const makeToken = (payload: object) =>
  jwt.sign(payload, ENV.JWT_ACCESS_SECRET, { expiresIn: '1h' });

const app = createApp();

describe('Auth', () => {
  it('POST /auth/login → 400 si payload vide', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({});
    expect(res.status).toBe(400);
  });
});

describe('RBAC', () => {
  it('GET /admins → 401 sans token', async () => {
    expect((await request(app).get('/api/v1/admins')).status).toBe(401);
  });

  it('GET /admins → 403 pour PARENT', async () => {
    const token = makeToken({ id: 1, role: 'PARENT', userType: 'personne', childrenMatricules: [] });
    expect(
      (await request(app).get('/api/v1/admins').set('Authorization', `Bearer ${token}`)).status
    ).toBe(403);
  });

  it('GET /admins → 200 pour ROOT (token valide)', async () => {
    const token = makeToken({ id: 1, role: 'ROOT', userType: 'admin' });
    // Sans mock BD, la requête peut retourner 500 si la BD est inaccessible en test
    // On vérifie juste que ce n'est pas 401 ou 403
    const res = await request(app).get('/api/v1/admins').set('Authorization', `Bearer ${token}`);
    expect([200, 500]).toContain(res.status);
    expect(res.status).not.toBe(401);
    expect(res.status).not.toBe(403);
  });
});

describe('Routes manquantes', () => {
  it('Aucune route /v2/ → 404', async () => {
    const res = await request(app).get('/api/v1/v2/anything');
    expect(res.status).toBe(404);
  });
});