/** Donnees mock du Module 9 - Reporting & Tableaux de bord. */
import { MOCK_STUDENTS } from '@/features/students/mockData';
import { MOCK_PAYMENTS, MOCK_MODES } from '@/features/payments/mockData';
import { MOCK_BULLETINS } from '@/features/evaluations/mockData';
import { MOCK_PERSONNEL } from '@/features/accounts/mockData';
import { MOCK_COURSES } from '@/features/pedagogy/mockData';
import { ageFrom } from '@/shared/lib/format';

export const MONTHS = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun'];

/** Evolution des effectifs sur l'annee. */
export const enrollmentTrend = [
  { month: 'Sep', students: 118 },
  { month: 'Oct', students: 126 },
  { month: 'Nov', students: 131 },
  { month: 'Dec', students: 134 },
  { month: 'Jan', students: 138 },
  { month: 'Fev', students: 140 },
  { month: 'Mar', students: 141 },
  { month: 'Avr', students: 142 },
  { month: 'Mai', students: 142 },
  { month: 'Jun', students: 142 },
];

/** Recettes mensuelles (FCFA). */
export const revenueTrend = [
  { month: 'Sep', amount: 12_400_000 },
  { month: 'Oct', amount: 4_200_000 },
  { month: 'Nov', amount: 3_100_000 },
  { month: 'Dec', amount: 9_800_000 },
  { month: 'Jan', amount: 2_600_000 },
  { month: 'Fev', amount: 1_900_000 },
  { month: 'Mar', amount: 8_700_000 },
  { month: 'Avr', amount: 2_100_000 },
  { month: 'Mai', amount: 1_500_000 },
  { month: 'Jun', amount: 1_200_000 },
];

export function revenueByMode(): { name: string; value: number }[] {
  return MOCK_MODES.map((m) => ({
    name: m.label,
    value: MOCK_PAYMENTS.filter((p) => p.modeId === m.id).reduce((s, p) => s + p.amount, 0),
  })).filter((x) => x.value > 0);
}

export function genderSplit(): { name: string; value: number }[] {
  const enrolled = MOCK_STUDENTS.filter((s) => s.status === 'enrolled');
  return [
    { name: 'Garcons', value: enrolled.filter((s) => s.gender === 'M').length },
    { name: 'Filles', value: enrolled.filter((s) => s.gender === 'F').length },
  ];
}

export function nationalitySplit(): { name: string; value: number }[] {
  const map = new Map<string, number>();
  MOCK_STUDENTS.filter((s) => s.status === 'enrolled').forEach((s) => {
    map.set(s.nationality, (map.get(s.nationality) ?? 0) + 1);
  });
  return [...map.entries()].map(([name, value]) => ({ name, value }));
}

export function ageDistribution(): { age: string; count: number }[] {
  const map = new Map<number, number>();
  MOCK_STUDENTS.filter((s) => s.status === 'enrolled').forEach((s) => {
    const a = ageFrom(s.dateOfBirth);
    map.set(a, (map.get(a) ?? 0) + 1);
  });
  return [...map.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([age, count]) => ({ age: `${age} ans`, count }));
}

export function classPerformance(): { classCode: string; average: number; passRate: number }[] {
  const map = new Map<string, number[]>();
  MOCK_BULLETINS.forEach((b) => {
    if (!map.has(b.classCode)) map.set(b.classCode, []);
    map.get(b.classCode)!.push(b.generalAverage);
  });
  return [...map.entries()].map(([classCode, avgs]) => ({
    classCode,
    average: +(avgs.reduce((s, a) => s + a, 0) / avgs.length).toFixed(2),
    passRate: Math.round((avgs.filter((a) => a >= 10).length / avgs.length) * 100),
  }));
}

export function coursePerformance(): { course: string; average: number }[] {
  const map = new Map<string, number[]>();
  MOCK_BULLETINS.forEach((b) =>
    b.lines.forEach((l) => {
      if (!map.has(l.courseLabel)) map.set(l.courseLabel, []);
      map.get(l.courseLabel)!.push(l.moyenne);
    })
  );
  return [...map.entries()]
    .map(([course, vals]) => ({ course, average: +(vals.reduce((s, v) => s + v, 0) / vals.length).toFixed(2) }))
    .sort((a, b) => b.average - a.average);
}

export function studentPerformance(): { name: string; classCode: string; average: number; rank: number }[] {
  return [...MOCK_BULLETINS]
    .sort((a, b) => b.generalAverage - a.generalAverage)
    .map((b, i) => ({ name: b.studentName, classCode: b.classCode, average: b.generalAverage, rank: i + 1 }));
}

export function teachersOverview(): { name: string; subject: string; courses: number; classes: number }[] {
  return MOCK_PERSONNEL.filter((p) => p.type === 'teacher').map((t) => {
    const courses = MOCK_COURSES.filter((c) => c.teacherId === t.id);
    const classes = new Set(courses.map((c) => c.classId));
    return { name: t.nom, subject: t.subject ?? '-', courses: courses.length, classes: classes.size };
  });
}

/** Comparaison inter-annees pour le Fondateur. */
export const yearComparison = [
  { metric: 'Effectifs', y2024: 128, y2025: 142 },
  { metric: 'Taux de reussite', y2024: 79, y2025: 84 },
  { metric: 'Taux de recouvrement', y2024: 88, y2025: 91 },
  { metric: 'Enseignants', y2024: 9, y2025: 11 },
];

export const annualBalance = [
  { year: '2023-2024', revenue: 41_000_000, expenses: 33_500_000 },
  { year: '2024-2025', revenue: 46_500_000, expenses: 36_200_000 },
  { year: '2025-2026', revenue: 47_500_000, expenses: 37_800_000 },
];

export const CHART_COLORS = ['#7B2D9E', '#1081F3', '#22A05E', '#D97706', '#AD56C4', '#DC2626'];

export function totalRevenue(): number {
  return MOCK_PAYMENTS.reduce((s, p) => s + p.amount, 0);
}
