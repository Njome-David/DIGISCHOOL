/** Donnees mock du Module 4 - Evaluations & Bulletins. */
import { MOCK_STUDENTS, type Student } from '@/features/students/mockData';

export const EXAM_NATURES = [
  { code: 'CC', label: 'Controle continu' },
  { code: 'EXAM', label: 'Examen' },
  { code: 'DM', label: 'Devoir mercredi' },
  { code: 'DWE', label: 'Devoir week-end' },
] as const;

export type ExamStatus = 'draft' | 'graded' | 'published';

export const EXAM_STATUS_META: Record<ExamStatus, { label: string; tone: 'neutral' | 'warning' | 'success' }> = {
  draft: { label: 'Brouillon', tone: 'neutral' },
  graded: { label: 'Notee', tone: 'warning' },
  published: { label: 'Publiee', tone: 'success' },
};

export interface Exam {
  id: string;
  title: string;
  natureCode: string;
  natureLabel: string;
  courseId: string;
  courseLabel: string;
  classId: string;
  classCode: string;
  teacherId: string;
  teacherName: string;
  date: string;
  term: string;
  maxNote: number;
  fileName: string | null;
  status: ExamStatus;
}

export const MOCK_EXAMS: Exam[] = [
  { id: 'ex1', title: 'CC1 - Operations', natureCode: 'CC', natureLabel: 'Controle continu', courseId: 'co1', courseLabel: 'Mathematiques', classId: 'cl3', classCode: 'CE1-A', teacherId: 'p1', teacherName: 'Prof. Marie Fouda', date: '2026-04-22', term: 'Trimestre 3', maxNote: 20, fileName: 'cc1-math-ce1a.pdf', status: 'published' },
  { id: 'ex2', title: 'Examen trimestriel', natureCode: 'EXAM', natureLabel: 'Examen', courseId: 'co1', courseLabel: 'Mathematiques', classId: 'cl3', classCode: 'CE1-A', teacherId: 'p1', teacherName: 'Prof. Marie Fouda', date: '2026-05-28', term: 'Trimestre 3', maxNote: 20, fileName: 'exam-t3-math-ce1a.pdf', status: 'graded' },
  { id: 'ex3', title: 'Devoir du mercredi', natureCode: 'DM', natureLabel: 'Devoir mercredi', courseId: 'co6', courseLabel: 'Mathematiques', classId: 'cl5', classCode: 'CE2-A', teacherId: 'p1', teacherName: 'Prof. Marie Fouda', date: '2026-06-03', term: 'Trimestre 3', maxNote: 20, fileName: 'dm-math-ce2a.pdf', status: 'draft' },
  { id: 'ex4', title: 'CC2 - Geometrie', natureCode: 'CC', natureLabel: 'Controle continu', courseId: 'co6', courseLabel: 'Mathematiques', classId: 'cl5', classCode: 'CE2-A', teacherId: 'p1', teacherName: 'Prof. Marie Fouda', date: '2026-05-15', term: 'Trimestre 3', maxNote: 20, fileName: 'cc2-math-ce2a.pdf', status: 'graded' },
];

export interface GradeRow {
  matricule: string;
  studentName: string;
  note: number | null;
  appreciation: string;
}

export function studentsInClass(classId: string): Student[] {
  return MOCK_STUDENTS.filter((s) => s.classId === classId && s.status === 'enrolled');
}

/** Notes mutables par epreuve (mock). Initialisees pour les epreuves notees. */
const SEED_GRADES: Record<string, Record<string, { note: number; appreciation: string }>> = {
  ex1: {
    '2026-001': { note: 15, appreciation: 'Bon travail' },
    '2026-005': { note: 12, appreciation: 'Peut mieux faire' },
  },
  ex2: {
    '2026-001': { note: 16, appreciation: 'Tres bien' },
    '2026-005': { note: 11, appreciation: 'En progres' },
  },
  ex4: {
    '2026-003': { note: 14, appreciation: 'Bien' },
    '2026-012': { note: 17, appreciation: 'Excellent' },
  },
};

const gradeStore: Record<string, GradeRow[]> = {};

export function gradesForExam(examId: string): GradeRow[] {
  if (!gradeStore[examId]) {
    const exam = findExam(examId);
    const seed = SEED_GRADES[examId] ?? {};
    gradeStore[examId] = exam
      ? studentsInClass(exam.classId).map((s) => ({
          matricule: s.matricule,
          studentName: `${s.firstName} ${s.lastName}`,
          note: seed[s.matricule]?.note ?? null,
          appreciation: seed[s.matricule]?.appreciation ?? '',
        }))
      : [];
  }
  return gradeStore[examId];
}

export function saveGrades(examId: string, rows: GradeRow[]): void {
  gradeStore[examId] = rows;
  const exam = findExam(examId);
  if (exam && exam.status === 'draft' && rows.some((r) => r.note !== null)) exam.status = 'graded';
}

export function findExam(id: string): Exam | undefined {
  return MOCK_EXAMS.find((e) => e.id === id);
}

export function examsForTeacher(teacherId: string): Exam[] {
  return MOCK_EXAMS.filter((e) => e.teacherId === teacherId);
}

export function examsForClass(classId: string): Exam[] {
  return MOCK_EXAMS.filter((e) => e.classId === classId && e.status !== 'draft');
}

export function addExam(exam: Exam): void {
  MOCK_EXAMS.unshift(exam);
}

/* ?? Bulletins ??????????????????????????????????????????????? */
export type BulletinStatus = 'pending' | 'validated' | 'published';

export interface BulletinLine {
  courseLabel: string;
  coeff: number;
  moyenne: number;
  rank: number;
  appreciation: string;
}

export interface Bulletin {
  id: string;
  matricule: string;
  studentName: string;
  classCode: string;
  classId: string;
  term: string;
  lines: BulletinLine[];
  generalAverage: number;
  generalRank: number;
  classSize: number;
  mention: string;
  status: BulletinStatus;
}

export function mentionFor(avg: number): string {
  if (avg >= 16) return 'Excellent';
  if (avg >= 14) return 'Tres bien';
  if (avg >= 12) return 'Bien';
  if (avg >= 10) return 'Assez bien';
  return 'Insuffisant';
}

export const MOCK_BULLETINS: Bulletin[] = [
  {
    id: 'b1', matricule: '2026-001', studentName: 'Thomas Martin', classCode: 'CE1-A', classId: 'cl3', term: 'Trimestre 3',
    lines: [
      { courseLabel: 'Mathematiques', coeff: 4, moyenne: 15.5, rank: 1, appreciation: 'Tres bon trimestre' },
      { courseLabel: 'Francais', coeff: 4, moyenne: 13, rank: 3, appreciation: 'Bon niveau' },
      { courseLabel: 'Anglais', coeff: 2, moyenne: 14, rank: 2, appreciation: 'Participe bien' },
      { courseLabel: 'Sciences & Eveil', coeff: 2, moyenne: 16, rank: 1, appreciation: 'Curieux' },
      { courseLabel: 'Education physique', coeff: 1, moyenne: 17, rank: 1, appreciation: 'Dynamique' },
    ],
    generalAverage: 14.6, generalRank: 1, classSize: 25, mention: 'Tres bien', status: 'published',
  },
  {
    id: 'b2', matricule: '2026-005', studentName: 'Emmanuel Fouda', classCode: 'CE1-A', classId: 'cl3', term: 'Trimestre 3',
    lines: [
      { courseLabel: 'Mathematiques', coeff: 4, moyenne: 11.5, rank: 8, appreciation: 'En progres' },
      { courseLabel: 'Francais', coeff: 4, moyenne: 12, rank: 6, appreciation: 'Correct' },
      { courseLabel: 'Anglais', coeff: 2, moyenne: 13, rank: 4, appreciation: 'Bien' },
      { courseLabel: 'Sciences & Eveil', coeff: 2, moyenne: 12.5, rank: 5, appreciation: 'Serieux' },
      { courseLabel: 'Education physique', coeff: 1, moyenne: 15, rank: 3, appreciation: 'Bonne energie' },
    ],
    generalAverage: 12.1, generalRank: 6, classSize: 25, mention: 'Bien', status: 'validated',
  },
  {
    id: 'b3', matricule: '2026-003', studentName: 'Paul Nguema', classCode: 'CE2-A', classId: 'cl5', term: 'Trimestre 3',
    lines: [
      { courseLabel: 'Mathematiques', coeff: 4, moyenne: 13.5, rank: 2, appreciation: 'Bien' },
      { courseLabel: 'Francais', coeff: 4, moyenne: 14, rank: 1, appreciation: 'Tres bien' },
      { courseLabel: 'Histoire-Geographie', coeff: 2, moyenne: 12, rank: 4, appreciation: 'Correct' },
      { courseLabel: 'Arts plastiques', coeff: 1, moyenne: 16, rank: 1, appreciation: 'Creatif' },
    ],
    generalAverage: 13.5, generalRank: 2, classSize: 30, mention: 'Bien', status: 'pending',
  },
  {
    id: 'b4', matricule: '2026-012', studentName: 'Sophie Djomou', classCode: 'CE2-A', classId: 'cl5', term: 'Trimestre 3',
    lines: [
      { courseLabel: 'Mathematiques', coeff: 4, moyenne: 16.5, rank: 1, appreciation: 'Excellent' },
      { courseLabel: 'Francais', coeff: 4, moyenne: 13, rank: 3, appreciation: 'Bon travail' },
      { courseLabel: 'Histoire-Geographie', coeff: 2, moyenne: 14, rank: 2, appreciation: 'Tres bien' },
      { courseLabel: 'Arts plastiques', coeff: 1, moyenne: 15, rank: 2, appreciation: 'Soignee' },
    ],
    generalAverage: 14.8, generalRank: 1, classSize: 30, mention: 'Tres bien', status: 'pending',
  },
];

export function bulletinsByStatus(status: BulletinStatus): Bulletin[] {
  return MOCK_BULLETINS.filter((b) => b.status === status);
}

export function bulletinsForStudent(matricule: string): Bulletin[] {
  return MOCK_BULLETINS.filter((b) => b.matricule === matricule);
}

export function setBulletinStatus(id: string, status: BulletinStatus): void {
  const b = MOCK_BULLETINS.find((x) => x.id === id);
  if (b) b.status = status;
}
