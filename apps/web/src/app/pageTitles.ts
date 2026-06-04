/** Titre de page affiche dans la Topbar, derive du chemin courant. */
const STATIC_TITLES: Record<string, string> = {
  '/profile': 'Mon profil',
  '/notifications': 'Notifications',
  '/messages': 'Messages',
  // Module 2  Root
  '/root/dashboard': 'Gestion academique',
  '/root/admins': 'Comptes administrateurs',
  '/root/admins/new': 'Nouvel administrateur',
  '/root/personnel': 'Personnel',
  '/root/personnel/new': 'Nouveau personnel',
  '/root/parents': 'Comptes parents',
  '/root/credentials': 'Envoi des codes',
  '/root/cycles': 'Cycles scolaires',
  '/root/classes': 'Classes',
  '/root/salles': 'Gestion des salles',
  '/root/years': 'Annees scolaires',
  '/root/terms': 'Trimestres',
  '/root/refs': 'Referentiels',
  '/root/audit': "Journal d'audit",
  // Module 2  Admin inscriptions
  '/admin/students': 'Dossiers eleves',
  '/admin/students/new': 'Inscrire un eleve',
  // Module 3  Pedagogie
  '/root/courses': 'Cours',
  '/root/courses/new': 'Nouveau cours',
  '/root/schedule': 'Emploi du temps',
  '/teacher/classes': 'Mes classes',
  '/teacher/schedule': 'Mon emploi du temps',
  '/teacher/students': 'Mes eleves',
  // Module 4  Evaluations & bulletins
  '/teacher/exams': 'Mes epreuves',
  '/teacher/exams/new': 'Televerser une epreuve',
  '/teacher/homework/new': 'Devoir / corrige',
  '/directeur/bulletins': 'Validation des bulletins',
  '/parent/children': 'Mes enfants',
  // Module 5  Scolarite & paiements
  '/fondateur/tuitions': 'Gestion des scolarites',
  '/fondateur/tuitions/new': 'Nouvelle scolarite',
  '/fondateur/tranches': 'Gestion des tranches',
  '/fondateur/modes': 'Modes de paiement',
  '/scolarite/payments': 'Paiements',
  '/scolarite/payments/new': 'Enregistrer un paiement',
  '/scolarite/overdue': 'Eleves en retard',
  '/scolarite/reminders': 'Envoi de relances',
  '/scolarite/modes': 'Modes de paiement',
  // Module 6  Communication
  '/messages/new': 'Composer un message',
  '/parent/messages/new': 'Composer un message',
  '/directeur/messages': 'Validation des messages',
  '/parent/announcements': "Annonces de l'ecole",
  // Module 7  Discipline
  '/teacher/discipline': 'Mes rapports disciplinaires',
  '/teacher/discipline/new': 'Nouveau rapport',
  '/directeur/discipline': 'Approbation des rapports',
  // Module 8  Documents & medias
  '/library': 'Manuels scolaires',
  '/parent/library': 'Manuels scolaires',
  '/root/library': 'Bibliotheque - gestion',
  // Module 9  Reporting & tableaux de bord
  '/fondateur/balance': 'Bilans annuels',
  '/fondateur/compare': 'Comparaison inter-annees',
  '/fondateur/explore': 'Exploration des donnees',
  '/directeur/perf/classes': 'Performance par classe',
  '/directeur/perf/courses': 'Performance par cours',
  '/directeur/perf/students': 'Performance par eleve',
  '/directeur/teachers': "Vue d'ensemble enseignants",
  '/directeur/students': "Vue d'ensemble eleves",
  '/directeur/demographics': 'Statistiques demographiques',
  '/directeur/reports': 'Rapports synthetiques',
  '/scolarite/reports': 'Recapitulatif financier',
  '/scolarite/by-mode': 'Stats par mode de paiement',
  '/scolarite/export': 'Export comptable',
  '/auditeur/finance': 'Statistiques financieres',
  '/auditeur/pedagogy': 'Statistiques pedagogiques',
  '/auditeur/exports': 'Exports',
  // Module 10  Audit & pages techniques
  '/auditeur/dashboard': "Tableau de bord auditeur",
  '/auditeur/listings': 'Toutes les listes',
  '/auditeur/audit-logs': "Journal d'audit",
  '/staff/dashboard': 'Tableau de bord',
  '/staff/files': 'Dossiers administratifs',
  '/staff/files/new': "Saisie d'un dossier",
};

export function pageTitle(path: string): string {
  if (STATIC_TITLES[path]) return STATIC_TITLES[path];
  if (path.endsWith('/dashboard')) return 'Tableau de bord';
  if (path.startsWith('/messages/')) return 'Detail du message';
  if (path.startsWith('/root/admins/')) return 'Modifier le compte';
  if (path.startsWith('/root/personnel/')) return 'Modifier le personnel';
  if (path.endsWith('/edit') && path.startsWith('/admin/students/')) return "Modifier l'eleve";
  if (path.endsWith('/assign') && path.startsWith('/admin/students/')) return 'Affectation classe / salle';
  if (path.endsWith('/parents') && path.startsWith('/admin/students/')) return 'Liaison parent - eleve';
  if (path.startsWith('/admin/students/')) return 'Dossier eleve';
  if (path.startsWith('/teacher/students/')) return 'Fiche eleve';
  if (path.startsWith('/root/courses/')) return 'Cours';
  if (path.endsWith('/grades') && path.startsWith('/teacher/exams/')) return 'Saisie des notes';
  if (path.endsWith('/grades')) return 'Notes de l\'enfant';
  if (path.endsWith('/bulletins')) return 'Bulletins';
  if (path.endsWith('/schedule')) return 'Emploi du temps';
  if (path.endsWith('/exams')) return 'Epreuves & devoirs';
  if (path.endsWith('/payments')) return 'Scolarite & paiements';
  if (path.endsWith('/receipts')) return 'Recus de paiement';
  if (path.endsWith('/discipline')) return 'Dossier disciplinaire';
  if (path.startsWith('/fondateur/tuitions/')) return 'Editer la scolarite';
  if (path.startsWith('/scolarite/payments/')) return 'Detail du paiement';
  if (path.startsWith('/scolarite/students/')) return "Etat de l'eleve";
  if (path.startsWith('/staff/students/')) return 'Dossier administratif';
  if (/^\/parent\/children\/[^/]+$/.test(path)) return 'Fiche enfant';
  return 'EcoleApp 2026';
}
