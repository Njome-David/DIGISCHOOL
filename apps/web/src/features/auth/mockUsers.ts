import { ROLES, type Role } from '@ecole/shared';

export interface MockAccount {
  id: string;
  username: string;
  password: string;
  role: Role;
  nom: string;
  email: string;
  phone: string;
  mustChangePassword: boolean;
}

/**
 * Comptes de demonstration (phase frontend mock).
 * Le branchement reel se fera via POST /api/v1/auth/login  voir features/auth/store.ts.
 */
export const MOCK_ACCOUNTS: MockAccount[] = [
  { id: '1', username: 'root', password: 'root123', role: ROLES.ROOT, nom: 'Super Admin', email: 'root@ecoleapp.com', phone: '+237 690 000 001', mustChangePassword: false },
  { id: '2', username: 'admin', password: 'admin123', role: ROLES.ADMIN_INSCRIPTIONS, nom: 'Admin Inscriptions', email: 'admin@ecoleapp.com', phone: '+237 690 000 002', mustChangePassword: false },
  { id: '3', username: 'staff', password: 'staff123', role: ROLES.ADMINISTRATIF, nom: 'Agent Administratif', email: 'staff@ecoleapp.com', phone: '+237 690 000 003', mustChangePassword: false },
  { id: '4', username: 'scolarite', password: 'scol123', role: ROLES.ADMIN_SCOLARITE, nom: 'Admin Scolarite', email: 'scolarite@ecoleapp.com', phone: '+237 690 000 004', mustChangePassword: false },
  { id: '5', username: 'fondateur', password: 'fond123', role: ROLES.FONDATEUR, nom: 'M. Fondateur', email: 'fondateur@ecoleapp.com', phone: '+237 690 000 005', mustChangePassword: false },
  { id: '6', username: 'directeur', password: 'dir123', role: ROLES.DIRECTEUR, nom: 'Dr. Jean Nkomo', email: 'directeur@ecoleapp.com', phone: '+237 690 000 006', mustChangePassword: false },
  { id: '7', username: 'auditeur', password: 'aud123', role: ROLES.ADMIN_AUDITEUR, nom: 'Auditeur Interne', email: 'auditeur@ecoleapp.com', phone: '+237 690 000 007', mustChangePassword: false },
  { id: '8', username: 'teacher', password: 'ens123', role: ROLES.ENSEIGNANT, nom: 'Prof. Marie Fouda', email: 'teacher@ecoleapp.com', phone: '+237 690 000 008', mustChangePassword: false },
  { id: '9', username: 'parent', password: 'par123', role: ROLES.PARENT, nom: 'M. Paul Martin', email: 'parent@ecoleapp.com', phone: '+237 690 000 009', mustChangePassword: false },
  { id: '10', username: 'nouveau', password: 'temp123', role: ROLES.ADMIN_INSCRIPTIONS, nom: 'Nouveau Compte', email: '', phone: '', mustChangePassword: true },
];

/** Raccourcis affiches sur la page de connexion. */
export const DEMO_HINTS: { username: string; password: string }[] = [
  { username: 'root', password: 'root123' },
  { username: 'directeur', password: 'dir123' },
  { username: 'teacher', password: 'ens123' },
  { username: 'parent', password: 'par123' },
  { username: 'admin', password: 'admin123' },
  { username: 'scolarite', password: 'scol123' },
];
