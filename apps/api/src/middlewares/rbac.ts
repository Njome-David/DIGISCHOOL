import { Request, Response, NextFunction } from 'express';
import { Role } from '@ecole/shared';
import { forbidden } from '../lib/errors';

export const requireRole =
  (...roles: Role[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(forbidden('Non authentifié'));
    if (!roles.includes(req.user.role)) return next(forbidden());
    next();
  };
