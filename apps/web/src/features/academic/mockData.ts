/** Donnees mock du Module 2  Gestion academique (referentiels). */

export interface Cycle {
  id: string;
  code: string;
  label: string;
  levelCount: number;
  active: boolean;
}

export const MOCK_CYCLES: Cycle[] = [
  { id: 'c1', code: 'MAT', label: 'Maternelle', levelCount: 3, active: true },
  { id: 'c2', code: 'PRI', label: 'Primaire', levelCount: 6, active: true },
];

export interface Classe {
  id: string;
  code: string;
  label: string;
  cycleId: string;
  cycle: string;
  capacity: number;
  enrolled: number;
  teacher: string | null;
  yearId: string;
  status: 'active' | 'inactive';
}

export const MOCK_CLASSES: Classe[] = [
  { id: 'cl1', code: 'SIL', label: 'SIL', cycleId: 'c1', cycle: 'Maternelle', capacity: 30, enrolled: 25, teacher: 'Prof. Sandra Messi', yearId: 'y2', status: 'active' },
  { id: 'cl2', code: 'CP-A', label: 'CP - A', cycleId: 'c2', cycle: 'Primaire', capacity: 35, enrolled: 32, teacher: 'Prof. Sandra Messi', yearId: 'y2', status: 'active' },
  { id: 'cl3', code: 'CE1-A', label: 'CE1-A', cycleId: 'c2', cycle: 'Primaire', capacity: 35, enrolled: 34, teacher: 'Prof. Marie Fouda', yearId: 'y2', status: 'active' },
  { id: 'cl4', code: 'CE1-B', label: 'CE1-B', cycleId: 'c2', cycle: 'Primaire', capacity: 35, enrolled: 28, teacher: 'Prof. Marie Fouda', yearId: 'y2', status: 'active' },
  { id: 'cl5', code: 'CE2-A', label: 'CE2-A', cycleId: 'c2', cycle: 'Primaire', capacity: 35, enrolled: 30, teacher: 'Prof. Alphonse Biya', yearId: 'y2', status: 'active' },
  { id: 'cl6', code: 'CE2-B', label: 'CE2-B', cycleId: 'c2', cycle: 'Primaire', capacity: 35, enrolled: 26, teacher: 'Prof. Alphonse Biya', yearId: 'y2', status: 'active' },
  { id: 'cl7', code: 'CM1-A', label: 'CM1-A', cycleId: 'c2', cycle: 'Primaire', capacity: 35, enrolled: 33, teacher: 'Prof. Alphonse Biya', yearId: 'y2', status: 'active' },
  { id: 'cl8', code: 'CM2-A', label: 'CM2-A', cycleId: 'c2', cycle: 'Primaire', capacity: 35, enrolled: 29, teacher: null, yearId: 'y2', status: 'active' },
];

export interface AcademicYear {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  active: boolean;
}

export const MOCK_YEARS: AcademicYear[] = [
  { id: 'y1', label: '2024-2025', startDate: '2024-09-02', endDate: '2025-07-11', active: false },
  { id: 'y2', label: '2025-2026', startDate: '2025-09-01', endDate: '2026-07-10', active: true },
];

export interface Term {
  id: string;
  label: string;
  yearId: string;
  yearLabel: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export const MOCK_TERMS: Term[] = [
  { id: 't1', label: 'Trimestre 1', yearId: 'y2', yearLabel: '2025-2026', startDate: '2025-09-01', endDate: '2025-12-19', current: false },
  { id: 't2', label: 'Trimestre 2', yearId: 'y2', yearLabel: '2025-2026', startDate: '2026-01-06', endDate: '2026-03-27', current: false },
  { id: 't3', label: 'Trimestre 3', yearId: 'y2', yearLabel: '2025-2026', startDate: '2026-04-06', endDate: '2026-07-10', current: true },
  { id: 't4', label: 'Trimestre 1', yearId: 'y1', yearLabel: '2024-2025', startDate: '2024-09-02', endDate: '2024-12-20', current: false },
  { id: 't5', label: 'Trimestre 2', yearId: 'y1', yearLabel: '2024-2025', startDate: '2025-01-06', endDate: '2025-03-28', current: false },
  { id: 't6', label: 'Trimestre 3', yearId: 'y1', yearLabel: '2024-2025', startDate: '2025-04-07', endDate: '2025-07-11', current: false },
];

/** Salles (rattachees a une classe) - P-018 / FNC-17. */
export interface Salle {
  id: string;
  label: string;
  surface: number;
  position: string;
  classId: string;
  classCode: string;
}

export const MOCK_SALLES: Salle[] = [
  { id: 'sa1', label: 'Salle 1', surface: 48, position: 'Batiment A - RDC', classId: 'cl3', classCode: 'CE1-A' },
  { id: 'sa2', label: 'Salle 2', surface: 45, position: 'Batiment A - RDC', classId: 'cl4', classCode: 'CE1-B' },
  { id: 'sa3', label: 'Salle 3', surface: 50, position: 'Batiment A - 1er etage', classId: 'cl5', classCode: 'CE2-A' },
  { id: 'sa4', label: 'Salle 4', surface: 50, position: 'Batiment A - 1er etage', classId: 'cl6', classCode: 'CE2-B' },
  { id: 'sa5', label: 'Salle 5', surface: 52, position: 'Batiment B - RDC', classId: 'cl7', classCode: 'CM1-A' },
  { id: 'sa6', label: 'Salle 6', surface: 52, position: 'Batiment B - RDC', classId: 'cl8', classCode: 'CM2-A' },
];

export function addSalle(s: Salle): void {
  MOCK_SALLES.push(s);
}

/** Referentiels lookups (villes, quartiers) - P-021 / FNC-22, FNC-23. */
export interface Lookup {
  id: string;
  label: string;
  active: boolean;
}

export const MOCK_VILLES: Lookup[] = [
  { id: 'v1', label: 'Yaounde', active: true },
  { id: 'v2', label: 'Douala', active: true },
  { id: 'v3', label: 'Bafoussam', active: true },
  { id: 'v4', label: 'Garoua', active: true },
  { id: 'v5', label: 'Bamenda', active: false },
];

export const MOCK_QUARTIERS: Lookup[] = [
  { id: 'q1', label: 'Bastos', active: true },
  { id: 'q2', label: 'Mvog-Mbi', active: true },
  { id: 'q3', label: 'Nlongkak', active: true },
  { id: 'q4', label: 'Mendong', active: true },
  { id: 'q5', label: 'Essos', active: true },
];

export function toggleLookup(list: Lookup[], id: string): void {
  const item = list.find((x) => x.id === id);
  if (item) item.active = !item.active;
}

export function addLookup(list: Lookup[], label: string): void {
  list.push({ id: `lk${Date.now()}`, label, active: true });
}

export type AuditType = 'create' | 'update' | 'delete' | 'login' | 'security';

export interface AuditEntry {
  id: string;
  type: AuditType;
  user: string;
  role: string;
  action: string;
  target: string;
  date: string;
  ip?: string;
}

export const MOCK_AUDIT: AuditEntry[] = [
  { id: 'a1', type: 'login', user: 'root', role: 'Root', action: 'Connexion reussie', target: 'Systeme', date: '2026-06-02T08:05:00', ip: '192.168.1.1' },
  { id: 'a2', type: 'create', user: 'root', role: 'Root', action: 'Creation compte utilisateur', target: 'nouveau (admin)', date: '2026-06-01T10:00:00', ip: '192.168.1.1' },
  { id: 'a3', type: 'login', user: 'admin', role: 'Admin Inscriptions', action: 'Connexion reussie', target: 'Systeme', date: '2026-06-01T08:30:00', ip: '192.168.1.5' },
  { id: 'a4', type: 'create', user: 'admin', role: 'Admin Inscriptions', action: 'Inscription eleve', target: 'Thomas Martin (CE1-A)', date: '2026-05-30T09:15:00' },
  { id: 'a5', type: 'update', user: 'root', role: 'Root', action: 'Modification classe', target: 'CM2-A (capacite ? 35)', date: '2026-05-29T14:20:00' },
  { id: 'a6', type: 'security', user: 'inconnu', role: '', action: 'Tentative connexion echouee x3', target: 'username: hacker', date: '2026-05-28T22:15:00', ip: '203.45.67.89' },
  { id: 'a7', type: 'update', user: 'root', role: 'Root', action: 'Activation annee scolaire', target: '2025-2026', date: '2026-05-28T09:00:00' },
  { id: 'a8', type: 'create', user: 'admin', role: 'Admin Inscriptions', action: 'Inscription eleve', target: 'Lea Martin (CP-A)', date: '2026-05-27T10:30:00' },
  { id: 'a9', type: 'delete', user: 'root', role: 'Root', action: 'Suppression compte', target: 'ancien.compte', date: '2026-05-26T16:00:00' },
  { id: 'a10', type: 'update', user: 'directeur', role: 'Directeur', action: 'Validation bulletin', target: 'CE1-A  Trimestre 2', date: '2026-05-25T11:00:00' },
  { id: 'a11', type: 'login', user: 'teacher', role: 'Enseignant', action: 'Connexion reussie', target: 'Systeme', date: '2026-05-24T07:30:00', ip: '192.168.1.12' },
  { id: 'a12', type: 'create', user: 'root', role: 'Root', action: 'Creation trimestre', target: 'Trimestre 3  2025-2026', date: '2026-05-20T08:00:00' },
  { id: 'a13', type: 'update', user: 'admin', role: 'Admin Inscriptions', action: 'Mise a jour dossier eleve', target: 'Paul Nguema (CE2-A)', date: '2026-05-18T14:30:00' },
  { id: 'a14', type: 'security', user: 'staff', role: 'Administratif', action: 'Acces refuse  page restreinte', target: '/root/audit', date: '2026-05-15T10:00:00', ip: '192.168.1.8' },
  { id: 'a15', type: 'create', user: 'root', role: 'Root', action: 'Ajout classe', target: 'CE1-B', date: '2026-05-10T09:00:00' },
];
