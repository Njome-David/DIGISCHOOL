export class AppError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const notFound = (msg = 'Ressource introuvable') => new AppError(404, 'NOT_FOUND', msg);
export const forbidden = (msg = 'Accès refusé') => new AppError(403, 'FORBIDDEN', msg);
export const unauthorized = (msg = 'Non authentifié') => new AppError(401, 'UNAUTH', msg);
export const badRequest = (msg: string, details?: unknown) =>
  new AppError(400, 'BAD_REQUEST', msg, details);
