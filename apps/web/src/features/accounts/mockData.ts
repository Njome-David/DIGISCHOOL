import { ROLES, type Role } from '@ecole/shared';

/** Comptes administrateurs geres par le Root (Module 2). */
export interface AdminAccount {
  id: string;
  nom: string;
  username: string;
  role: Role;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin: string | null;
}

export const MOCK_ADMINS: AdminAccount[] = [
  { id: '2', nom: 'Admin Inscriptions', username: 'admin', role: ROLES.ADMIN_INSCRIPTIONS, email: 'admin@ecoleapp.com', phone: '+237 690 000 002', status: 'active', createdAt: '2025-09-01T00:00:00', lastLogin: '2026-06-01T08:30:00' },
  { id: '3', nom: 'Agent Administratif', username: 'staff', role: ROLES.ADMINISTRATIF, email: 'staff@ecoleapp.com', phone: '+237 690 000 003', status: 'active', createdAt: '2025-09-01T00:00:00', lastLogin: '2026-06-01T07:50:00' },
  { id: '4', nom: 'Admin Scolarite', username: 'scolarite', role: ROLES.ADMIN_SCOLARITE, email: 'scolarite@ecoleapp.com', phone: '+237 690 000 004', status: 'active', createdAt: '2025-09-01T00:00:00', lastLogin: '2026-05-30T09:00:00' },
  { id: '5', nom: 'M. Fondateur', username: 'fondateur', role: ROLES.FONDATEUR, email: 'fondateur@ecoleapp.com', phone: '+237 690 000 005', status: 'active', createdAt: '2024-01-01T00:00:00', lastLogin: '2026-05-28T11:00:00' },
  { id: '6', nom: 'Dr. Jean Nkomo', username: 'directeur', role: ROLES.DIRECTEUR, email: 'directeur@ecoleapp.com', phone: '+237 690 000 006', status: 'active', createdAt: '2024-09-01T00:00:00', lastLogin: '2026-06-02T08:00:00' },
  { id: '7', nom: 'Auditeur Interne', username: 'auditeur', role: ROLES.ADMIN_AUDITEUR, email: 'auditeur@ecoleapp.com', phone: '+237 690 000 007', status: 'active', createdAt: '2024-09-01T00:00:00', lastLogin: '2026-05-20T14:00:00' },
  { id: '8', nom: 'Prof. Marie Fouda', username: 'teacher', role: ROLES.ENSEIGNANT, email: 'teacher@ecoleapp.com', phone: '+237 690 000 008', status: 'active', createdAt: '2025-09-01T00:00:00', lastLogin: '2026-06-01T07:30:00' },
  { id: '10', nom: 'Nouveau Compte', username: 'nouveau', role: ROLES.ADMIN_INSCRIPTIONS, email: '', phone: '', status: 'inactive', createdAt: '2026-06-01T10:00:00', lastLogin: null },
];

/** Roles assignables par le Root via le formulaire (tous sauf ROOT). */
export const ASSIGNABLE_ROLES: Role[] = [
  ROLES.ADMIN_INSCRIPTIONS,
  ROLES.ADMINISTRATIF,
  ROLES.ADMIN_SCOLARITE,
  ROLES.FONDATEUR,
  ROLES.DIRECTEUR,
  ROLES.ADMIN_AUDITEUR,
  ROLES.ENSEIGNANT,
  ROLES.PARENT,
];

export function findAdmin(id: string): AdminAccount | undefined {
  return MOCK_ADMINS.find((a) => a.id === id);
}

export function upsertAdmin(account: AdminAccount): void {
  const idx = MOCK_ADMINS.findIndex((a) => a.id === account.id);
  if (idx >= 0) MOCK_ADMINS[idx] = account;
  else MOCK_ADMINS.push(account);
}

/** Personnel de l'etablissement (enseignants + agents administratifs). */
export interface Personnel {
  id: string;
  nom: string;
  type: 'teacher' | 'staff';
  subject?: string;
  classes: string[];
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  hireDate: string;
}

export function findPersonnel(id: string): Personnel | undefined {
  return MOCK_PERSONNEL.find((p) => p.id === id);
}

export function upsertPersonnel(person: Personnel): void {
  const idx = MOCK_PERSONNEL.findIndex((p) => p.id === person.id);
  if (idx >= 0) MOCK_PERSONNEL[idx] = person;
  else MOCK_PERSONNEL.push(person);
}

export const MOCK_PERSONNEL: Personnel[] = [
  { id: 'p1', nom: 'Prof. Marie Fouda', type: 'teacher', subject: 'Mathematiques', classes: ['CE1-A', 'CE1-B'], email: 'fouda@ecoleapp.com', phone: '+237 699 100 001', status: 'active', hireDate: '2020-09-01' },
  { id: 'p2', nom: 'Prof. Alphonse Biya', type: 'teacher', subject: 'Francais', classes: ['CE2-A', 'CM1-A'], email: 'biya@ecoleapp.com', phone: '+237 699 100 002', status: 'active', hireDate: '2018-09-01' },
  { id: 'p3', nom: 'Prof. Sandra Messi', type: 'teacher', subject: 'Sciences & Eveil', classes: ['CP-A', 'CE2-B'], email: 'messi@ecoleapp.com', phone: '+237 699 100 003', status: 'active', hireDate: '2022-09-01' },
  { id: 'p4', nom: 'M. Armand Essomba', type: 'staff', classes: [], email: 'essomba@ecoleapp.com', phone: '+237 699 100 004', status: 'active', hireDate: '2019-01-01' },
  { id: 'p5', nom: 'Mme Claire Onana', type: 'staff', classes: [], email: 'onana@ecoleapp.com', phone: '+237 699 100 005', status: 'inactive', hireDate: '2021-04-01' },
];
