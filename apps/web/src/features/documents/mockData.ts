/** Donnees mock du Module 8 - Documents & Medias (bibliotheque de manuels). */

/** Taille maximale autorisee a l'upload (FNC-72). */
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export const SPECIALTIES = ['Mathematiques', 'Francais', 'Anglais', 'Sciences', 'Eveil', 'Lecture'] as const;
export type Specialty = (typeof SPECIALTIES)[number];

const SPECIALTY_COLORS: Record<Specialty, string> = {
  Mathematiques: '#7B2D9E',
  Francais: '#1081F3',
  Anglais: '#22A05E',
  Sciences: '#D97706',
  Eveil: '#AD56C4',
  Lecture: '#DC2626',
};

export function specialtyColor(s: string): string {
  return SPECIALTY_COLORS[s as Specialty] ?? '#AD56C4';
}

export interface Book {
  id: string;
  title: string;
  author: string;
  specialty: Specialty;
  level: string;
  fileName: string;
  fileSize: number;
  addedDate: string;
}

export const MOCK_BOOKS: Book[] = [
  { id: 'bk1', title: 'Mathematiques CE1 - Methode de Singapour', author: 'Collectif Hatier', specialty: 'Mathematiques', level: 'CE1', fileName: 'maths-ce1.pdf', fileSize: 4_613_734, addedDate: '2025-09-02' },
  { id: 'bk2', title: 'Mon livre de Francais CE1', author: 'A. Mballa', specialty: 'Francais', level: 'CE1', fileName: 'francais-ce1.pdf', fileSize: 3_355_443, addedDate: '2025-09-02' },
  { id: 'bk3', title: 'English for Kids - Level 2', author: 'S. Johnson', specialty: 'Anglais', level: 'CE2', fileName: 'english-l2.pdf', fileSize: 2_516_582, addedDate: '2025-09-04' },
  { id: 'bk4', title: 'Sciences & Eveil CE2', author: 'Collectif Nathan', specialty: 'Sciences', level: 'CE2', fileName: 'sciences-ce2.pdf', fileSize: 5_872_026, addedDate: '2025-09-05' },
  { id: 'bk5', title: 'Cahier de lecture SIL', author: 'M. Atangana', specialty: 'Lecture', level: 'SIL', fileName: 'lecture-sil.pdf', fileSize: 1_887_437, addedDate: '2025-09-06' },
  { id: 'bk6', title: 'Mathematiques CM1', author: 'Collectif Hatier', specialty: 'Mathematiques', level: 'CM1', fileName: 'maths-cm1.pdf', fileSize: 6_081_740, addedDate: '2025-09-08' },
  { id: 'bk7', title: 'Eveil et decouverte CP', author: 'L. Nkodo', specialty: 'Eveil', level: 'CP', fileName: 'eveil-cp.pdf', fileSize: 2_936_012, addedDate: '2025-09-10' },
  { id: 'bk8', title: 'Grammaire et conjugaison CM2', author: 'A. Mballa', specialty: 'Francais', level: 'CM2', fileName: 'francais-cm2.pdf', fileSize: 4_194_304, addedDate: '2025-09-12' },
];

export function booksBySpecialty(specialty: string): Book[] {
  if (specialty === 'all') return MOCK_BOOKS;
  return MOCK_BOOKS.filter((b) => b.specialty === specialty);
}

export function findBook(id: string): Book | undefined {
  return MOCK_BOOKS.find((b) => b.id === id);
}

export function addBook(book: Book): void {
  MOCK_BOOKS.unshift(book);
}

export function removeBook(id: string): void {
  const idx = MOCK_BOOKS.findIndex((b) => b.id === id);
  if (idx >= 0) MOCK_BOOKS.splice(idx, 1);
}
