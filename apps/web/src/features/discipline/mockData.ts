/** Donnees mock du Module 7 - Discipline. */

/** Seuil de points a partir duquel un rapport est grave et requiert la validation du Directeur. */
export const GRAVE_THRESHOLD = 10;

export type Severity = 'minor' | 'moderate' | 'severe';

export const SEVERITY_META: Record<Severity, { label: string; tone: 'success' | 'warning' | 'danger' }> = {
  minor: { label: 'Mineur', tone: 'success' },
  moderate: { label: 'Moyen', tone: 'warning' },
  severe: { label: 'Grave', tone: 'danger' },
};

export function severityOf(points: number): Severity {
  if (points >= GRAVE_THRESHOLD) return 'severe';
  if (points >= 3) return 'moderate';
  return 'minor';
}

/* ?? Referentiel des disciplines (faute + points) ???????????? */
export interface DisciplineRef {
  id: string;
  label: string;
  points: number;
  active: boolean;
}

export const MOCK_DISCIPLINE_REFS: DisciplineRef[] = [
  { id: 'd1', label: 'Retard repete', points: 1, active: true },
  { id: 'd2', label: 'Bavardage en classe', points: 2, active: true },
  { id: 'd3', label: 'Absence non justifiee', points: 3, active: true },
  { id: 'd4', label: 'Devoir non fait', points: 2, active: true },
  { id: 'd5', label: 'Insolence envers un enseignant', points: 5, active: true },
  { id: 'd6', label: 'Bagarre / violence', points: 10, active: true },
  { id: 'd7', label: 'Triche a un examen', points: 8, active: true },
  { id: 'd8', label: 'Degradation de materiel', points: 6, active: true },
];

export function toggleRef(id: string): void {
  const r = MOCK_DISCIPLINE_REFS.find((x) => x.id === id);
  if (r) r.active = !r.active;
}

export function addRef(ref: DisciplineRef): void {
  MOCK_DISCIPLINE_REFS.unshift(ref);
}

export function activeRefs(): DisciplineRef[] {
  return MOCK_DISCIPLINE_REFS.filter((r) => r.active);
}

/* ?? Rapports disciplinaires ????????????????????????????????? */
export type ReportStatus = 'pending' | 'approved' | 'rejected';

export const REPORT_STATUS_META: Record<ReportStatus, { label: string; tone: 'warning' | 'success' | 'danger' }> = {
  pending: { label: 'A valider', tone: 'warning' },
  approved: { label: 'Approuve', tone: 'success' },
  rejected: { label: 'Rejete', tone: 'danger' },
};

export interface DisciplineReport {
  id: string;
  matricule: string;
  studentName: string;
  classCode: string;
  refId: string;
  label: string;
  points: number;
  date: string;
  term: string;
  reportedBy: string;
  comment: string;
  status: ReportStatus;
}

export const MOCK_REPORTS: DisciplineReport[] = [
  { id: 'r1', matricule: '2026-001', studentName: 'Thomas Martin', classCode: 'CE1-A', refId: 'd2', label: 'Bavardage en classe', points: 2, date: '2026-05-12', term: 'Trimestre 3', reportedBy: 'Prof. Marie Fouda', comment: 'Perturbe le cours de mathematiques a plusieurs reprises.', status: 'approved' },
  { id: 'r2', matricule: '2026-005', studentName: 'Emmanuel Fouda', classCode: 'CE1-A', refId: 'd1', label: 'Retard repete', points: 1, date: '2026-05-18', term: 'Trimestre 3', reportedBy: 'Prof. Marie Fouda', comment: 'Troisieme retard de la semaine.', status: 'approved' },
  { id: 'r3', matricule: '2026-005', studentName: 'Emmanuel Fouda', classCode: 'CE1-A', refId: 'd5', label: 'Insolence envers un enseignant', points: 5, date: '2026-05-29', term: 'Trimestre 3', reportedBy: 'Prof. Marie Fouda', comment: 'Reponse irrespectueuse pendant le cours.', status: 'pending' },
  { id: 'r4', matricule: '2026-003', studentName: 'Paul Nguema', classCode: 'CE2-A', refId: 'd7', label: 'Triche a un examen', points: 8, date: '2026-05-28', term: 'Trimestre 3', reportedBy: 'Prof. Alphonse Biya', comment: "Tentative de triche pendant l'examen de francais.", status: 'pending' },
  { id: 'r5', matricule: '2026-012', studentName: 'Sophie Djomou', classCode: 'CE2-A', refId: 'd4', label: 'Devoir non fait', points: 2, date: '2026-05-20', term: 'Trimestre 3', reportedBy: 'Prof. Alphonse Biya', comment: 'Devoir de francais non rendu.', status: 'approved' },
  { id: 'r6', matricule: '2026-001', studentName: 'Thomas Martin', classCode: 'CE1-A', refId: 'd3', label: 'Absence non justifiee', points: 3, date: '2026-05-23', term: 'Trimestre 3', reportedBy: 'Prof. Marie Fouda', comment: 'Absence sans justificatif le 23 mai.', status: 'approved' },
];

export function reportsByTeacher(name: string | undefined): DisciplineReport[] {
  if (!name) return [];
  return MOCK_REPORTS.filter((r) => r.reportedBy === name).sort((a, b) => b.date.localeCompare(a.date));
}

export function reportsForStudent(matricule: string, approvedOnly = false): DisciplineReport[] {
  return MOCK_REPORTS.filter((r) => r.matricule === matricule && (!approvedOnly || r.status === 'approved')).sort(
    (a, b) => b.date.localeCompare(a.date)
  );
}

export function reportsByStatus(status: ReportStatus): DisciplineReport[] {
  return MOCK_REPORTS.filter((r) => r.status === status).sort((a, b) => b.date.localeCompare(a.date));
}

export function pendingReportsCount(): number {
  return MOCK_REPORTS.filter((r) => r.status === 'pending').length;
}

export function setReportStatus(id: string, status: ReportStatus): void {
  const r = MOCK_REPORTS.find((x) => x.id === id);
  if (r) r.status = status;
}

export function addReport(report: DisciplineReport): void {
  MOCK_REPORTS.unshift(report);
}

/** Cumul des points approuves d'un eleve (FNC-65). */
export function studentPoints(matricule: string): number {
  return reportsForStudent(matricule, true).reduce((s, r) => s + r.points, 0);
}
