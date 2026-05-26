import { Request } from 'express';
import { AuditLog } from '../db/models';

export async function logAudit(
  req: Request,
  action: string,
  resource: string,
  resourceId?: string | number,
  meta?: object
) {
  if (!req.user) return;
  try {
    await AuditLog.create({
      userId: req.user.id,
      userType: req.user.userType,
      role: req.user.role,
      action,
      resource,
      resourceId: resourceId != null ? String(resourceId) : null,
      ip: req.ip || null,
      meta: meta ? JSON.stringify(meta) : null,
    });
  } catch (e) {
    console.error('Audit log failed', e);
  }
}
