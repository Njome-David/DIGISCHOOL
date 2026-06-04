export interface Message {
  id: string;
  from: string;
  initials: string;
  color: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  read: boolean;
  starred: boolean;
}

export const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    from: 'Direction',
    initials: 'D',
    color: '#7B2D9E',
    subject: 'Reunion pedagogique  03 juin 2026',
    preview: "Nous vous informons qu'une reunion pedagogique aura lieu le mardi 03 juin a 14h00 en salle des professeurs.",
    body: "Bonjour,\n\nNous vous informons qu'une reunion pedagogique aura lieu le mardi 03 juin 2026 a 14h00 en salle des professeurs.\n\nOrdre du jour :\n- Bilan du 2eme trimestre\n- Preparation des conseils de classe\n- Divers\n\nVotre presence est obligatoire.\n\nCordialement,\nLa Direction",
    date: '2026-05-28T10:30:00',
    read: false,
    starred: false,
  },
  {
    id: '2',
    from: 'Admin Scolarite',
    initials: 'AS',
    color: '#22A05E',
    subject: 'Rappel de paiement  Tranche 2',
    preview: 'La tranche 2 de scolarite est en retard depuis le 15 mai. Veuillez regulariser votre situation.',
    body: 'Cher parent,\n\nLa tranche 2 de scolarite (45 000 XAF) est en retard depuis le 15 mai 2026.\n\nVeuillez regulariser votre situation au bureau de la scolarite ou via Mobile Money.\n\nModes acceptes : Cash, Orange Money, MTN MoMo.\n\nCordialement,\nService Scolarite',
    date: '2026-05-27T09:00:00',
    read: false,
    starred: true,
  },
  {
    id: '3',
    from: 'Prof. Fouda',
    initials: 'PF',
    color: '#1081F3',
    subject: 'Resultats epreuve Mathematiques CE1',
    preview: 'Les resultats de l\'epreuve du 20 mai sont disponibles. Moyenne : 13,4/20.',
    body: 'Bonjour a tous,\n\nLes resultats de l\'epreuve de mathematiques du 20 mai 2026 sont disponibles dans l\'application.\n\nMoyenne de classe : 13,4/20\nMeilleure note : 19/20\nNote la plus basse : 6/20\n\nLes devoirs corriges seront distribues jeudi.\n\nCordialement,\nProf. Fouda  CE1',
    date: '2026-05-26T16:00:00',
    read: true,
    starred: false,
  },
  {
    id: '4',
    from: 'Administration',
    initials: 'AD',
    color: '#D97706',
    subject: 'Calendrier scolaire  Trimestre 3',
    preview: 'Veuillez trouver ci-dessous le calendrier officiel du troisieme trimestre 2025-2026.',
    body: 'Chers parents et enseignants,\n\nVoici le calendrier officiel du 3eme trimestre 2025-2026 :\n\n- Reprise des cours : 06 janvier 2026\n- Examens : 16 au 20 mars 2026\n- Remise des bulletins : 27 mars 2026\n- Fin du trimestre : 31 mars 2026\n\nCordialement,\nL\'Administration',
    date: '2026-05-24T11:30:00',
    read: true,
    starred: false,
  },
  {
    id: '5',
    from: 'Dr. Nkomo',
    initials: 'DN',
    color: '#DC2626',
    subject: "Rapport disciplinaire  A l'attention des parents",
    preview: "Un incident s'est produit en classe le 22 mai. Merci de prendre contact avec l'etablissement.",
    body: 'Cher parent,\n\nUn incident disciplinaire s\'est produit le 22 mai 2026 impliquant votre enfant.\n\nVeuillez contacter l\'etablissement dans les 48h pour convenir d\'un entretien.\n\nCordialement,\nDr. Jean Nkomo  Directeur',
    date: '2026-05-23T08:00:00',
    read: true,
    starred: false,
  },
];

export function messageDateShort(iso: string): string {
  const date = new Date(iso);
  const diffDays = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (diffDays === 0) return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  if (diffDays === 1) return 'Hier';
  if (diffDays < 7) return date.toLocaleDateString('fr-FR', { weekday: 'short' });
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

/* ?? Module 6 - Communication ???????????????????????????????? */
/** Types de message (modele BD) : 0 individuel, 1 tous parents, 2 relance paiement. */
export type MessageType = 0 | 1 | 2;

export const MESSAGE_TYPE_META: Record<MessageType, { label: string; tone: 'neutral' | 'info' | 'warning' }> = {
  0: { label: 'Individuel', tone: 'neutral' },
  1: { label: 'Tous les parents', tone: 'info' },
  2: { label: 'Relance paiement', tone: 'warning' },
};

/** Les messages collectifs (type 1 et 2) doivent etre valides par le Directeur. */
export type CollectiveStatus = 'pending' | 'validated' | 'rejected';

export interface CollectiveMessage {
  id: string;
  type: 1 | 2;
  subject: string;
  body: string;
  author: string;
  date: string;
  status: CollectiveStatus;
  recipientCount: number;
}

export const MOCK_COLLECTIVE: CollectiveMessage[] = [
  {
    id: 'c1',
    type: 1,
    subject: 'Reunion de parents - 3e trimestre',
    body: "Chers parents,\n\nUne reunion de parents se tiendra le samedi 14 juin 2026 a 09h00 dans le preau de l'ecole pour faire le bilan du trimestre et preparer la fin d'annee.\n\nVotre presence est vivement souhaitee.\n\nL'Administration",
    author: 'Admin Inscriptions',
    date: '2026-06-02T08:30:00',
    status: 'pending',
    recipientCount: 142,
  },
  {
    id: 'c2',
    type: 2,
    subject: 'Relance - Tranche 3 de scolarite',
    body: "Cher parent,\n\nLa 3e tranche de la scolarite est arrivee a echeance. Merci de regulariser le solde restant avant le 20 juin 2026 afin de garantir la participation de votre enfant aux examens de fin d'annee.\n\nService Scolarite",
    author: 'Admin Scolarite',
    date: '2026-06-01T14:00:00',
    status: 'pending',
    recipientCount: 38,
  },
  {
    id: 'c3',
    type: 1,
    subject: "Fete de fin d'annee 2025-2026",
    body: "Chers parents,\n\nLa fete de fin d'annee aura lieu le vendredi 04 juillet 2026 a partir de 10h00. Au programme : remise des prix, spectacles et kermesse.\n\nNous comptons sur votre presence.\n\nLa Direction",
    author: 'Direction',
    date: '2026-05-29T10:00:00',
    status: 'validated',
    recipientCount: 142,
  },
  {
    id: 'c4',
    type: 1,
    subject: 'Fermeture exceptionnelle - 30 mai',
    body: "Chers parents,\n\nEn raison d'une journee pedagogique, l'ecole sera exceptionnellement fermee le vendredi 30 mai 2026. Les cours reprendront normalement le lundi 02 juin.\n\nL'Administration",
    author: 'Administration',
    date: '2026-05-26T16:30:00',
    status: 'validated',
    recipientCount: 142,
  },
];

export function pendingCollective(): CollectiveMessage[] {
  return MOCK_COLLECTIVE.filter((m) => m.status === 'pending').sort((a, b) => b.date.localeCompare(a.date));
}

export function collectiveByStatus(status: CollectiveStatus): CollectiveMessage[] {
  return MOCK_COLLECTIVE.filter((m) => m.status === status).sort((a, b) => b.date.localeCompare(a.date));
}

export function setCollectiveStatus(id: string, status: CollectiveStatus): void {
  const m = MOCK_COLLECTIVE.find((x) => x.id === id);
  if (m) m.status = status;
}

export function addCollective(msg: CollectiveMessage): void {
  MOCK_COLLECTIVE.unshift(msg);
}

/** Annonces visibles par les parents = messages collectifs valides (type 1 et 2). */
export function announcements(): CollectiveMessage[] {
  return MOCK_COLLECTIVE.filter((m) => m.status === 'validated').sort((a, b) => b.date.localeCompare(a.date));
}
