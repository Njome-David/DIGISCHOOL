import { Request, Response, NextFunction } from 'express';
import { AppError } from '../lib/errors';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: { code: err.code, message: err.message, details: err.details },
    });
  }
  console.error(err);
  return res.status(500).json({
    error: { code: 'INTERNAL', message: 'Erreur interne du serveur' },
  });
}

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route introuvable' } });
}
