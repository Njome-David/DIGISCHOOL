/** Donnees mock - dossiers administratifs des eleves (role Administratif). */
import { MOCK_STUDENTS } from '@/features/students/mockData';

export interface DocItem {
  key: string;
  label: string;
  provided: boolean;
}

export interface Dossier {
  matricule: string;
  studentName: string;
  classCode: string;
  docs: DocItem[];
  note: string;
}

function docsFor(seed: number): DocItem[] {
  const base = [
    { key: 'birth', label: 'Acte de naissance' },
    { key: 'photo', label: "Photo d'identite" },
    { key: 'vaccine', label: 'Carnet de vaccination' },
    { key: 'report', label: 'Bulletin annee precedente' },
    { key: 'id_parent', label: "Piece d'identite du parent" },
  ];
  return base.map((d, i) => ({ ...d, provided: (seed + i) % 3 !== 0 }));
}

export const MOCK_DOSSIERS: Dossier[] = MOCK_STUDENTS.filter((s) => s.status === 'enrolled').map((s, i) => ({
  matricule: s.matricule,
  studentName: `${s.firstName} ${s.lastName}`,
  classCode: s.classCode,
  docs: docsFor(i),
  note: '',
}));

export function dossierFor(matricule: string): Dossier | undefined {
  return MOCK_DOSSIERS.find((d) => d.matricule === matricule);
}

export function completeness(d: Dossier): number {
  return Math.round((d.docs.filter((x) => x.provided).length / d.docs.length) * 100);
}

export function isComplete(d: Dossier): boolean {
  return d.docs.every((x) => x.provided);
}

export function toggleDoc(matricule: string, key: string): void {
  const d = dossierFor(matricule);
  const doc = d?.docs.find((x) => x.key === key);
  if (doc) doc.provided = !doc.provided;
}

export function incompleteCount(): number {
  return MOCK_DOSSIERS.filter((d) => !isComplete(d)).length;
}
