/** Dossiers eleves (Module 2  Admin inscriptions). */
export type StudentStatus = 'enrolled' | 'transferred' | 'excluded';

export interface Student {
  matricule: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'M' | 'F';
  nationality: string;
  classCode: string;
  classId: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  enrollmentDate: string;
  status: StudentStatus;
}

export const MOCK_STUDENTS: Student[] = [
  { matricule: '2026-001', firstName: 'Thomas', lastName: 'Martin', dateOfBirth: '2019-03-12', gender: 'M', nationality: 'Camerounaise', classCode: 'CE1-A', classId: 'cl3', parentName: 'M. Paul Martin', parentPhone: '+237 690 100 001', parentEmail: 'parent@ecoleapp.com', enrollmentDate: '2025-09-01', status: 'enrolled' },
  { matricule: '2026-002', firstName: 'Lea', lastName: 'Martin', dateOfBirth: '2020-07-05', gender: 'F', nationality: 'Camerounaise', classCode: 'CP-A', classId: 'cl2', parentName: 'M. Paul Martin', parentPhone: '+237 690 100 001', parentEmail: 'parent@ecoleapp.com', enrollmentDate: '2025-09-01', status: 'enrolled' },
  { matricule: '2026-003', firstName: 'Paul', lastName: 'Nguema', dateOfBirth: '2018-11-20', gender: 'M', nationality: 'Camerounaise', classCode: 'CE2-A', classId: 'cl5', parentName: 'Mme Nguema', parentPhone: '+237 690 100 003', parentEmail: 'nguema@mail.cm', enrollmentDate: '2025-09-01', status: 'enrolled' },
  { matricule: '2026-004', firstName: 'Aminata', lastName: 'Sow', dateOfBirth: '2017-05-18', gender: 'F', nationality: 'Senegalaise', classCode: 'CM1-A', classId: 'cl7', parentName: 'M. Ibrahim Sow', parentPhone: '+237 690 100 004', parentEmail: 'sow@mail.cm', enrollmentDate: '2025-09-01', status: 'enrolled' },
  { matricule: '2026-005', firstName: 'Emmanuel', lastName: 'Fouda', dateOfBirth: '2019-01-30', gender: 'M', nationality: 'Camerounaise', classCode: 'CE1-A', classId: 'cl3', parentName: 'Mme Fouda', parentPhone: '+237 690 100 005', parentEmail: 'e.fouda@mail.cm', enrollmentDate: '2025-09-01', status: 'enrolled' },
  { matricule: '2026-006', firstName: 'Grace', lastName: 'Mvogo', dateOfBirth: '2020-09-14', gender: 'F', nationality: 'Camerounaise', classCode: 'CP-A', classId: 'cl2', parentName: 'M. Mvogo', parentPhone: '+237 690 100 006', parentEmail: 'mvogo@mail.cm', enrollmentDate: '2025-09-01', status: 'enrolled' },
  { matricule: '2026-007', firstName: 'Isaac', lastName: 'Bello', dateOfBirth: '2016-04-22', gender: 'M', nationality: 'Camerounaise', classCode: 'CM2-A', classId: 'cl8', parentName: 'Dr. Bello', parentPhone: '+237 690 100 007', parentEmail: 'bello@mail.cm', enrollmentDate: '2024-09-01', status: 'enrolled' },
  { matricule: '2026-008', firstName: 'Fatima', lastName: 'Aliou', dateOfBirth: '2018-08-08', gender: 'F', nationality: 'Nigeriane', classCode: 'CE2-B', classId: 'cl6', parentName: 'M. Aliou Hamidou', parentPhone: '+237 690 100 008', parentEmail: 'aliou@mail.cm', enrollmentDate: '2025-09-01', status: 'enrolled' },
  { matricule: '2026-009', firstName: 'Kevin', lastName: 'Abena', dateOfBirth: '2019-06-17', gender: 'M', nationality: 'Camerounaise', classCode: 'CE1-B', classId: 'cl4', parentName: 'Mme Abena', parentPhone: '+237 690 100 009', parentEmail: 'abena@mail.cm', enrollmentDate: '2025-09-01', status: 'enrolled' },
  { matricule: '2026-010', firstName: 'Carine', lastName: 'Tabi', dateOfBirth: '2020-02-28', gender: 'F', nationality: 'Camerounaise', classCode: 'CP-A', classId: 'cl2', parentName: 'M. Tabi Charles', parentPhone: '+237 690 100 010', parentEmail: 'tabi@mail.cm', enrollmentDate: '2025-09-01', status: 'enrolled' },
  { matricule: '2026-011', firstName: 'Rostand', lastName: 'Nkeng', dateOfBirth: '2017-12-03', gender: 'M', nationality: 'Camerounaise', classCode: 'CM1-A', classId: 'cl7', parentName: 'M. Nkeng', parentPhone: '+237 690 100 011', parentEmail: 'nkeng@mail.cm', enrollmentDate: '2024-09-01', status: 'enrolled' },
  { matricule: '2026-012', firstName: 'Sophie', lastName: 'Djomou', dateOfBirth: '2018-10-10', gender: 'F', nationality: 'Camerounaise', classCode: 'CE2-A', classId: 'cl5', parentName: 'Mme Djomou', parentPhone: '+237 690 100 012', parentEmail: 'djomou@mail.cm', enrollmentDate: '2025-09-01', status: 'enrolled' },
  { matricule: '2025-103', firstName: 'Marc', lastName: 'Ondoa', dateOfBirth: '2019-04-15', gender: 'M', nationality: 'Camerounaise', classCode: 'CE1-A', classId: 'cl3', parentName: 'M. Ondoa', parentPhone: '+237 690 100 013', parentEmail: 'ondoa@mail.cm', enrollmentDate: '2024-09-01', status: 'transferred' },
  { matricule: '2026-013', firstName: 'Hanna', lastName: 'Mbarga', dateOfBirth: '2019-09-01', gender: 'F', nationality: 'Camerounaise', classCode: 'CE1-B', classId: 'cl4', parentName: 'Dr. Mbarga', parentPhone: '+237 690 100 014', parentEmail: 'mbarga@mail.cm', enrollmentDate: '2025-09-01', status: 'enrolled' },
  { matricule: '2026-014', firstName: 'Junior', lastName: 'Ateba', dateOfBirth: '2016-07-20', gender: 'M', nationality: 'Camerounaise', classCode: 'CM2-A', classId: 'cl8', parentName: 'M. Ateba', parentPhone: '+237 690 100 015', parentEmail: 'ateba@mail.cm', enrollmentDate: '2024-09-01', status: 'enrolled' },
];

export const STATUS_META: Record<StudentStatus, { label: string; tone: 'success' | 'warning' | 'danger' }> = {
  enrolled: { label: 'Inscrit', tone: 'success' },
  transferred: { label: 'Transfere', tone: 'warning' },
  excluded: { label: 'Exclu', tone: 'danger' },
};

export function findStudent(matricule: string): Student | undefined {
  return MOCK_STUDENTS.find((s) => s.matricule === matricule);
}

/** Enfants rattaches a un parent (via le nom du parent - mock). */
export function childrenForParent(parentName: string | undefined): Student[] {
  if (!parentName) return [];
  return MOCK_STUDENTS.filter((s) => s.parentName === parentName);
}

export function addStudent(student: Student): void {
  MOCK_STUDENTS.push(student);
}

export function updateStudent(matricule: string, patch: Partial<Student>): void {
  const idx = MOCK_STUDENTS.findIndex((s) => s.matricule === matricule);
  if (idx >= 0) MOCK_STUDENTS[idx] = { ...MOCK_STUDENTS[idx], ...patch };
}

/** Parents agreges depuis les fiches eleves (mock - un parent par nom). */
export interface ParentInfo {
  name: string;
  phone: string;
  email: string;
  children: Student[];
}

export function allParents(): ParentInfo[] {
  const map = new Map<string, ParentInfo>();
  for (const s of MOCK_STUDENTS) {
    const existing = map.get(s.parentName);
    if (existing) existing.children.push(s);
    else map.set(s.parentName, { name: s.parentName, phone: s.parentPhone, email: s.parentEmail, children: [s] });
  }
  return [...map.values()];
}
