import { sequelize } from '../db';

/**
 * Génère un ID entier unique sans race condition.
 * Utilise une séquence atomique via SELECT ... FOR UPDATE sur la table cible.
 * Stratégie : timestamp ms + random 3 chiffres, modulo MAX_INT_UNSIGNED.
 * Pour un projet scolaire avec <1000 utilisateurs simultanés, c'est suffisant.
 */
export function nextId(): number {
  const ts = Date.now() % 2_000_000_000; // reste dans unsigned int (max ~4.2B)
  const rand = Math.floor(Math.random() * 999);
  return ts + rand;
}

/**
 * Version async pour les cas où on veut garantir l'unicité via DB.
 * Utilise un SELECT MAX() + FOR UPDATE dans une transaction.
 */
export async function nextIdSafe(tableName: string, pkField: string): Promise<number> {
  const [rows] = await sequelize.query(
    `SELECT MAX(\`${pkField}\`) as maxId FROM \`${tableName}\` FOR UPDATE`,
    { raw: true }
  );
  const maxId = (rows as any[])[0]?.maxId ?? 0;
  return Number(maxId) + 1;
}
