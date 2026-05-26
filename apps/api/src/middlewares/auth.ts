import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { Role } from '@ecole/shared';
import { unauthorized } from '../lib/errors';

export interface AuthUser {
  id: number;
  userType: 'admin' | 'personne';
  role: Role;
  username: string;
  nom: string;
  mustChangePassword?: boolean;
  childrenMatricules?: number[];
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      requestId?: string;
    }
  }
}

export function authRequired(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return next(unauthorized());
  try {
    const token = header.slice(7);
    const payload = jwt.verify(token, ENV.JWT_ACCESS_SECRET) as AuthUser;
    req.user = payload;
    next();
  } catch {
    next(unauthorized('Token invalide ou expiré'));
  }
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) {
    try {
      const token = header.slice(7);
      req.user = jwt.verify(token, ENV.JWT_ACCESS_SECRET) as AuthUser;
    } catch {
      /* ignore */
    }
  }
  next();
}
