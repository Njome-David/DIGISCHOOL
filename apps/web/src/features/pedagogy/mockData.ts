/** Donnees mock du Module 3 - Gestion pedagogique (cours, affectations, emploi du temps). */

export interface Course {
  id: string;
  code: string;
  label: string;
  coefficient: number;
  noteMax: number;
  classId: string;
  classCode: string;
  teacherId: string | null;
  teacherName: string | null;
  color: string;
}

export const MOCK_COURSES: Course[] = [
  { id: 'co1', code: 'MATH', label: 'Mathematiques', coefficient: 4, noteMax: 20, classId: 'cl3', classCode: 'CE1-A', teacherId: 'p1', teacherName: 'Prof. Marie Fouda', color: '#7B2D9E' },
  { id: 'co2', code: 'FR', label: 'Francais', coefficient: 4, noteMax: 20, classId: 'cl3', classCode: 'CE1-A', teacherId: 'p2', teacherName: 'Prof. Alphonse Biya', color: '#1081F3' },
  { id: 'co3', code: 'ANG', label: 'Anglais', coefficient: 2, noteMax: 20, classId: 'cl3', classCode: 'CE1-A', teacherId: 'p3', teacherName: 'Prof. Sandra Messi', color: '#22A05E' },
  { id: 'co4', code: 'SCI', label: 'Sciences & Eveil', coefficient: 2, noteMax: 20, classId: 'cl3', classCode: 'CE1-A', teacherId: 'p3', teacherName: 'Prof. Sandra Messi', color: '#D97706' },
  { id: 'co5', code: 'EPS', label: 'Education physique', coefficient: 1, noteMax: 20, classId: 'cl3', classCode: 'CE1-A', teacherId: null, teacherName: null, color: '#0EA5E9' },
  { id: 'co6', code: 'MATH', label: 'Mathematiques', coefficient: 4, noteMax: 20, classId: 'cl5', classCode: 'CE2-A', teacherId: 'p1', teacherName: 'Prof. Marie Fouda', color: '#7B2D9E' },
  { id: 'co7', code: 'FR', label: 'Francais', coefficient: 4, noteMax: 20, classId: 'cl5', classCode: 'CE2-A', teacherId: 'p2', teacherName: 'Prof. Alphonse Biya', color: '#1081F3' },
  { id: 'co8', code: 'HG', label: 'Histoire-Geographie', coefficient: 2, noteMax: 20, classId: 'cl5', classCode: 'CE2-A', teacherId: 'p2', teacherName: 'Prof. Alphonse Biya', color: '#AD56C4' },
  { id: 'co9', code: 'ARTS', label: 'Arts plastiques', coefficient: 1, noteMax: 20, classId: 'cl5', classCode: 'CE2-A', teacherId: null, teacherName: null, color: '#DC2626' },
];

export const SUBJECT_OPTIONS = [
  { code: 'MATH', label: 'Mathematiques' },
  { code: 'FR', label: 'Francais' },
  { code: 'ANG', label: 'Anglais' },
  { code: 'SCI', label: 'Sciences & Eveil' },
  { code: 'HG', label: 'Histoire-Geographie' },
  { code: 'EPS', label: 'Education physique' },
  { code: 'ARTS', label: 'Arts plastiques' },
  { code: 'INFO', label: 'Informatique' },
];

export const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'] as const;
export type Day = (typeof DAYS)[number];

export interface TimeSlot {
  start: string;
  end: string;
}

export const TIME_SLOTS: TimeSlot[] = [
  { start: '07:30', end: '08:30' },
  { start: '08:30', end: '09:30' },
  { start: '09:30', end: '10:30' },
  { start: '10:45', end: '11:45' },
  { start: '11:45', end: '12:45' },
  { start: '13:30', end: '14:30' },
  { start: '14:30', end: '15:30' },
];

export interface ScheduleEntry {
  id: string;
  classId: string;
  day: Day;
  slot: number;
  courseId: string;
  room: string;
}

export const MOCK_SCHEDULE: ScheduleEntry[] = [
  { id: 's1', classId: 'cl3', day: 'Lundi', slot: 0, courseId: 'co1', room: 'Salle 1' },
  { id: 's2', classId: 'cl3', day: 'Lundi', slot: 1, courseId: 'co2', room: 'Salle 1' },
  { id: 's3', classId: 'cl3', day: 'Lundi', slot: 3, courseId: 'co3', room: 'Salle 1' },
  { id: 's4', classId: 'cl3', day: 'Mardi', slot: 0, courseId: 'co2', room: 'Salle 1' },
  { id: 's5', classId: 'cl3', day: 'Mardi', slot: 1, courseId: 'co1', room: 'Salle 1' },
  { id: 's6', classId: 'cl3', day: 'Mardi', slot: 5, courseId: 'co4', room: 'Labo' },
  { id: 's7', classId: 'cl3', day: 'Mercredi', slot: 0, courseId: 'co1', room: 'Salle 1' },
  { id: 's8', classId: 'cl3', day: 'Mercredi', slot: 1, courseId: 'co4', room: 'Labo' },
  { id: 's9', classId: 'cl3', day: 'Jeudi', slot: 0, courseId: 'co2', room: 'Salle 1' },
  { id: 's10', classId: 'cl3', day: 'Jeudi', slot: 3, courseId: 'co5', room: 'Terrain' },
  { id: 's11', classId: 'cl3', day: 'Vendredi', slot: 0, courseId: 'co1', room: 'Salle 1' },
  { id: 's12', classId: 'cl3', day: 'Vendredi', slot: 1, courseId: 'co3', room: 'Salle 1' },
  { id: 's13', classId: 'cl5', day: 'Lundi', slot: 0, courseId: 'co6', room: 'Salle 3' },
  { id: 's14', classId: 'cl5', day: 'Lundi', slot: 1, courseId: 'co7', room: 'Salle 3' },
  { id: 's15', classId: 'cl5', day: 'Mardi', slot: 0, courseId: 'co8', room: 'Salle 3' },
  { id: 's16', classId: 'cl5', day: 'Mercredi', slot: 1, courseId: 'co6', room: 'Salle 3' },
  { id: 's17', classId: 'cl5', day: 'Jeudi', slot: 3, courseId: 'co9', room: 'Atelier' },
  { id: 's18', classId: 'cl5', day: 'Vendredi', slot: 0, courseId: 'co7', room: 'Salle 3' },
];

export function coursesForClass(classId: string): Course[] {
  return MOCK_COURSES.filter((c) => c.classId === classId);
}

export function coursesForTeacher(teacherId: string): Course[] {
  return MOCK_COURSES.filter((c) => c.teacherId === teacherId);
}

export function findCourse(id: string): Course | undefined {
  return MOCK_COURSES.find((c) => c.id === id);
}

export function upsertCourse(course: Course): void {
  const idx = MOCK_COURSES.findIndex((c) => c.id === course.id);
  if (idx >= 0) MOCK_COURSES[idx] = course;
  else MOCK_COURSES.push(course);
}

export function scheduleForClass(classId: string): ScheduleEntry[] {
  return MOCK_SCHEDULE.filter((s) => s.classId === classId);
}

/** Creneaux d'un enseignant (via les cours qu'il assure). */
export function scheduleForTeacher(teacherId: string): (ScheduleEntry & { course: Course })[] {
  const ids = new Set(coursesForTeacher(teacherId).map((c) => c.id));
  return MOCK_SCHEDULE.filter((s) => ids.has(s.courseId)).map((s) => ({
    ...s,
    course: findCourse(s.courseId)!,
  }));
}
