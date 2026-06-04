/** Donnees mock du Module 5 - Scolarite & Paiements (montants en FCFA). */
import { MOCK_STUDENTS, findStudent } from '@/features/students/mockData';

export interface Tranche {
  id: string;
  label: string;
  amount: number;
  dueDate: string;
  order: number;
}

export interface Tuition {
  id: string;
  label: string;
  classId: string;
  classCode: string;
  yearLabel: string;
  total: number;
  tranches: Tranche[];
  active: boolean;
}

const TRANCHE_LABELS = ['Inscription', '2e tranche', '3e tranche'];
const DUE_DATES = ['2025-09-15', '2025-12-15', '2026-03-15'];
const SPLIT = [0.4, 0.3, 0.3];

function makeTranches(tid: string, total: number): Tranche[] {
  const first = Math.round((total * SPLIT[0]) / 1000) * 1000;
  const second = Math.round((total * SPLIT[1]) / 1000) * 1000;
  const amounts = [first, second, total - first - second];
  return TRANCHE_LABELS.map((label, i) => ({
    id: `${tid}-t${i + 1}`,
    label,
    amount: amounts[i],
    dueDate: DUE_DATES[i],
    order: i + 1,
  }));
}

const TUITION_CONFIG: { classId: string; classCode: string; total: number }[] = [
  { classId: 'cl1', classCode: 'SIL', total: 300000 },
  { classId: 'cl2', classCode: 'CP-A', total: 350000 },
  { classId: 'cl3', classCode: 'CE1-A', total: 350000 },
  { classId: 'cl4', classCode: 'CE1-B', total: 350000 },
  { classId: 'cl5', classCode: 'CE2-A', total: 360000 },
  { classId: 'cl6', classCode: 'CE2-B', total: 360000 },
  { classId: 'cl7', classCode: 'CM1-A', total: 380000 },
  { classId: 'cl8', classCode: 'CM2-A', total: 400000 },
];

export const MOCK_TUITIONS: Tuition[] = TUITION_CONFIG.map((c) => {
  const id = `tu-${c.classId}`;
  return {
    id,
    label: `Scolarite ${c.classCode}`,
    classId: c.classId,
    classCode: c.classCode,
    yearLabel: '2025-2026',
    total: c.total,
    tranches: makeTranches(id, c.total),
    active: true,
  };
});

export function getTuition(classId: string): Tuition | undefined {
  return MOCK_TUITIONS.find((t) => t.classId === classId && t.active);
}

export function allTranches(): { tuition: Tuition; tranche: Tranche }[] {
  return MOCK_TUITIONS.flatMap((tuition) => tuition.tranches.map((tranche) => ({ tuition, tranche })));
}

/* ?? Modes de paiement ??????????????????????????????????????? */
export interface PaymentMode {
  id: string;
  label: string;
  active: boolean;
}

export const MOCK_MODES: PaymentMode[] = [
  { id: 'm1', label: 'Especes', active: true },
  { id: 'm2', label: 'Mobile Money', active: true },
  { id: 'm3', label: 'Virement bancaire', active: true },
  { id: 'm4', label: 'Cheque', active: false },
];

export function toggleMode(id: string): void {
  const m = MOCK_MODES.find((x) => x.id === id);
  if (m) m.active = !m.active;
}

/* ?? Paiements ??????????????????????????????????????????????? */
export interface Payment {
  id: string;
  receiptNo: string;
  matricule: string;
  studentName: string;
  classCode: string;
  trancheId: string;
  trancheLabel: string;
  amount: number;
  modeId: string;
  modeLabel: string;
  date: string;
  recordedBy: string;
}

export const MOCK_PAYMENTS: Payment[] = [
  { id: 'pay1', receiptNo: 'REC-2026-0001', matricule: '2026-001', studentName: 'Thomas Martin', classCode: 'CE1-A', trancheId: 'tu-cl3-t1', trancheLabel: 'Inscription', amount: 140000, modeId: 'm2', modeLabel: 'Mobile Money', date: '2025-09-10', recordedBy: 'Admin Scolarite' },
  { id: 'pay2', receiptNo: 'REC-2026-0002', matricule: '2026-001', studentName: 'Thomas Martin', classCode: 'CE1-A', trancheId: 'tu-cl3-t2', trancheLabel: '2e tranche', amount: 105000, modeId: 'm1', modeLabel: 'Especes', date: '2025-12-12', recordedBy: 'Admin Scolarite' },
  { id: 'pay3', receiptNo: 'REC-2026-0003', matricule: '2026-002', studentName: 'Lea Martin', classCode: 'CP-A', trancheId: 'tu-cl2-t1', trancheLabel: 'Inscription', amount: 140000, modeId: 'm2', modeLabel: 'Mobile Money', date: '2025-09-11', recordedBy: 'Admin Scolarite' },
  { id: 'pay4', receiptNo: 'REC-2026-0004', matricule: '2026-003', studentName: 'Paul Nguema', classCode: 'CE2-A', trancheId: 'tu-cl5-t1', trancheLabel: 'Inscription', amount: 144000, modeId: 'm3', modeLabel: 'Virement bancaire', date: '2025-09-05', recordedBy: 'Admin Scolarite' },
  { id: 'pay5', receiptNo: 'REC-2026-0005', matricule: '2026-003', studentName: 'Paul Nguema', classCode: 'CE2-A', trancheId: 'tu-cl5-t2', trancheLabel: '2e tranche', amount: 108000, modeId: 'm3', modeLabel: 'Virement bancaire', date: '2025-12-10', recordedBy: 'Admin Scolarite' },
  { id: 'pay6', receiptNo: 'REC-2026-0006', matricule: '2026-003', studentName: 'Paul Nguema', classCode: 'CE2-A', trancheId: 'tu-cl5-t3', trancheLabel: '3e tranche', amount: 108000, modeId: 'm1', modeLabel: 'Especes', date: '2026-03-08', recordedBy: 'Admin Scolarite' },
  { id: 'pay7', receiptNo: 'REC-2026-0007', matricule: '2026-005', studentName: 'Emmanuel Fouda', classCode: 'CE1-A', trancheId: 'tu-cl3-t1', trancheLabel: 'Inscription', amount: 140000, modeId: 'm1', modeLabel: 'Especes', date: '2025-09-14', recordedBy: 'Admin Scolarite' },
  { id: 'pay8', receiptNo: 'REC-2026-0008', matricule: '2026-004', studentName: 'Aminata Sow', classCode: 'CM1-A', trancheId: 'tu-cl7-t1', trancheLabel: 'Inscription', amount: 152000, modeId: 'm2', modeLabel: 'Mobile Money', date: '2025-09-13', recordedBy: 'Admin Scolarite' },
  { id: 'pay9', receiptNo: 'REC-2026-0009', matricule: '2026-012', studentName: 'Sophie Djomou', classCode: 'CE2-A', trancheId: 'tu-cl5-t1', trancheLabel: 'Inscription', amount: 144000, modeId: 'm2', modeLabel: 'Mobile Money', date: '2025-09-09', recordedBy: 'Admin Scolarite' },
  { id: 'pay10', receiptNo: 'REC-2026-0010', matricule: '2026-012', studentName: 'Sophie Djomou', classCode: 'CE2-A', trancheId: 'tu-cl5-t2', trancheLabel: '2e tranche', amount: 108000, modeId: 'm1', modeLabel: 'Especes', date: '2025-12-15', recordedBy: 'Admin Scolarite' },
];

export function paymentsForStudent(matricule: string): Payment[] {
  return MOCK_PAYMENTS.filter((p) => p.matricule === matricule).sort((a, b) => a.date.localeCompare(b.date));
}

export function findPayment(id: string): Payment | undefined {
  return MOCK_PAYMENTS.find((p) => p.id === id);
}

export function nextReceiptNo(): string {
  const n = MOCK_PAYMENTS.length + 1;
  return `REC-2026-${String(n).padStart(4, '0')}`;
}

export function addPayment(p: Payment): void {
  MOCK_PAYMENTS.unshift(p);
}

/* ?? Etat par eleve ?????????????????????????????????????????? */
export interface TrancheState {
  tranche: Tranche;
  paid: number;
  covered: boolean;
  overdue: boolean;
}

export interface StudentPaymentState {
  matricule: string;
  studentName: string;
  classCode: string;
  classId: string;
  total: number;
  paid: number;
  balance: number;
  overdue: boolean;
  trancheStates: TrancheState[];
}

const TODAY = new Date('2026-06-04');

export function getStudentState(matricule: string): StudentPaymentState | undefined {
  const student = findStudent(matricule);
  if (!student) return undefined;
  const tuition = getTuition(student.classId);
  const payments = paymentsForStudent(matricule);
  const total = tuition?.total ?? 0;
  const paid = payments.reduce((s, p) => s + p.amount, 0);

  let remaining = paid;
  const trancheStates: TrancheState[] = (tuition?.tranches ?? []).map((tranche) => {
    const applied = Math.min(remaining, tranche.amount);
    remaining -= applied;
    const covered = applied >= tranche.amount;
    const overdue = !covered && new Date(tranche.dueDate) < TODAY;
    return { tranche, paid: applied, covered, overdue };
  });

  const balance = Math.max(0, total - paid);
  const overdue = trancheStates.some((t) => t.overdue);

  return {
    matricule,
    studentName: `${student.firstName} ${student.lastName}`,
    classCode: student.classCode,
    classId: student.classId,
    total,
    paid,
    balance,
    overdue,
    trancheStates,
  };
}

export function allStudentStates(): StudentPaymentState[] {
  return MOCK_STUDENTS.filter((s) => s.status === 'enrolled')
    .map((s) => getStudentState(s.matricule))
    .filter((s): s is StudentPaymentState => Boolean(s));
}

export function overdueStudents(): StudentPaymentState[] {
  return allStudentStates().filter((s) => s.overdue);
}
