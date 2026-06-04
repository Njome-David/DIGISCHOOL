# FRONTEND_PLAN - EcoleApp 2026 (apps/web)

Document de suivi prive. Plan de realisation du frontend module par module, avec
donnees mock alignees sur le futur backend (@ecole/shared, roles UPPERCASE).
Reference fonctionnelle : 02_Fonctionnalites_et_Pages_Frontend.pdf (97 pages P-001..P-097,
fonctionnalites FNC-01..FNC-87, modules M1..M10).

Convention texte : ASCII uniquement (pas d'accents, pas d'emoji, tirets simples).

Legende statut :
- [x]   termine
- [~]   en cours
- [ ]   a faire
- [lock] verrouille dans la sidebar (module pas encore ouvert)

Legende roles : R=Root, A=Admin Inscriptions, F=Fondateur, D=Directeur, S=Admin Scolarite,
Au=Admin Auditeur, E=Enseignant, Ad=Administratif, P=Parent.

---

## 1. Stack & conventions

| Domaine | Choix |
| --- | --- |
| Framework | React 18 + Vite 5 + TypeScript |
| Styling | TailwindCSS 3 (tokens charte violette DIGISCHOOL) |
| Routing | react-router-dom v6 (lazy + Suspense) |
| State | Zustand (auth mock) + TanStack Query (pret pour le branchement API) |
| Icones | lucide-react uniquement - aucun emoji |
| Charts | recharts (modules reporting/finances) |
| Package manager | npm (workspaces) - jamais pnpm |
| Texte | ASCII pur (pas d'accents) dans tout le code |

Auth : store mock (features/auth/store.ts) aligne sur les roles @ecole/shared. Le passage a
POST /auth/login remplacera le corps des actions sans toucher aux vues.

Methode par module : pour chaque module on (1) cree les mocks features/<module>/mockData.ts,
(2) construit les pages avec les composants partages, (3) cable les routes + la navigation,
(4) deverrouille l'entree sidebar, (5) verifie tsc + vite build, (6) attend la validation.

---

## 2. Fondations (transverses) - [x] TERMINE

- [x] tailwind.config.js (palette, ombres, rayons, gradients, easing spring)
- [x] index.css (fonts, base, .surface/.btn-*/.field-*)
- [x] shared/components/ui.tsx (Card, Button, Avatar, Badge, EmptyState, SearchInput,
  FilterTabs, ProgressBar, KpiCard, PageHeading, Spinner, SectionTitle)
- [x] shared/components/form.tsx (Field, PasswordInput, Alert)
- [x] shared/lib/roleMeta.ts, shared/lib/format.ts
- [x] Shell : AuthLayout, Sidebar (modules verrouilles), Topbar, AppLayout, RootSubNav,
  navigation.ts, pageTitles.ts
- [x] router.tsx (lazy + Suspense), nettoyage des anciennes pages scaffold
- [x] Conversion ASCII de tout apps/web/src (encodages Latin-1 -> ASCII)

Composants transverses encore a produire (au fil des modules) : ScheduleGrid, GradeTable,
PaymentRow, ChartCard (recharts), Stepper, Modal de confirmation, DatePicker, UploadField,
Breadcrumb, Pagination.

---

## 3. Module 1 - Authentification, profil & navigation - [x] TERMINE

| P | Vue | Route | Role | Fichier | Statut |
| --- | --- | --- | --- | --- | --- |
| P-001 | Connexion | /login | Public | pages/LoginPage.tsx | [x] |
| P-002 | Mot de passe oublie | /forgot-password | Public | pages/ForgotPasswordPage.tsx | [x] |
| P-003 | Changement mot de passe | /change-password | Connecte | pages/ChangePasswordPage.tsx | [x] |
| P-004 | Routeur dashboard | /dashboard | Connecte | router (RoleHome) | [x] |
| P-005 | Mon profil | /profile | Connecte | pages/ProfilePage.tsx | [x] |
| P-006 | Notifications | /notifications | Connecte | features/notifications/NotificationsPage.tsx | [x] |
| P-007 | Messagerie - inbox | /messages | Connecte | features/messages/MessagesPage.tsx | [x] |
| P-008 | Messagerie - detail | /messages/:id | Connecte | features/messages/MessageDetailPage.tsx | [x] |
| P-094 | Erreur 404 | * | Public | pages/NotFoundPage.tsx | [x] |
| - | Landing publique | / | Public | pages/LandingPage.tsx | [x] |

FNC couverts : FNC-01, 02, 04, 10, 60, 61 (base). Mock : auth/mockUsers, dashboards/dashboardData,
messages/mockData.

---

## 4. Module 2 - Gestion academique & comptes - [x] TERMINE

| P | Vue | Route | Role | Fichier | Statut |
| --- | --- | --- | --- | --- | --- |
| P-009 | Dashboard Root (overview academique) | /root/dashboard | R | academic/RootOverviewPage.tsx | [x] |
| P-010 | Liste admins | /root/admins | R | accounts/AdminsPage.tsx | [x] |
| P-011 | Creation/edition admin | /root/admins/new, /:id | R | accounts/AdminFormPage.tsx | [x] |
| P-012 | Liste personnels | /root/personnel | R | accounts/PersonnelPage.tsx | [x] |
| P-016 | Gestion cycles | /root/cycles | R | academic/CyclesPage.tsx | [x] |
| P-017 | Gestion classes | /root/classes | R | academic/ClassesPage.tsx | [x] |
| P-019 | Annees academiques | /root/years | R | academic/AcademicYearsPage.tsx | [x] |
| P-020 | Trimestres & sessions | /root/terms | R | academic/TermsPage.tsx | [x] |
| P-022 | Journal d'audit | /root/audit | R, Au | academic/AuditPage.tsx | [x] |
| P-023 | Dashboard Admin | /admin/dashboard | A | dashboards/DashboardPage.tsx | [x] |
| P-024 | Liste eleves | /admin/students | A | students/StudentsPage.tsx | [x] |
| P-025 | Nouvelle inscription | /admin/students/new | A | students/StudentFormPage.tsx | [x] |
| P-026 | Fiche eleve | /admin/students/:matricule | A | students/StudentDetailPage.tsx | [x] |

Restes M2 (pages doc non encore faites - a integrer plus tard sans bloquer) :
- [ ] P-013 Creation/edition personnel (/root/personnel/new, /:id)
- [ ] P-014 Liste parents (/root/parents)
- [ ] P-015 Envoi des codes de connexion (/root/credentials)
- [ ] P-018 Gestion des salles (/root/salles)
- [ ] P-021 Referentiels villes/quartiers/disciplines (/root/refs)
- [ ] P-027 Edition eleve (/admin/students/:matricule/edit)
- [ ] P-028 Affectation classe/salle (/admin/students/:matricule/assign)
- [ ] P-029 Liaison parent-eleve (/admin/students/:matricule/parents)

---

## 5. Module 3 - Gestion Pedagogique - [~] EN COURS

Objet : cours, coefficients, affectation enseignant<->cours<->classe, titulaires, emploi du temps.
FNC : FNC-25 a FNC-31.

| P | Vue | Route | Role | Fichier | Statut |
| --- | --- | --- | --- | --- | --- |
| (R) | Gestion des cours (liste + coeff + note max + classe + enseignant) | /root/courses | R | pedagogy/CoursesPage.tsx | [~] |
| (R) | Creation/edition cours | /root/courses/new, /:id | R | pedagogy/CourseFormPage.tsx | [~] |
| (R) | Editeur emploi du temps par classe | /root/schedule | R | pedagogy/SchedulePage.tsx | [~] |
| P-071 | Mes classes / mes cours | /teacher/classes | E | pedagogy/TeacherClassesPage.tsx | [~] |
| P-079 | Mon emploi du temps | /teacher/schedule | E | pedagogy/TeacherSchedulePage.tsx | [~] |

Composant nouveau : ScheduleGrid (grille jour x creneau), PedagogySubNav (Root).
Mock : features/pedagogy/mockData.ts (subjects/cours, affectations, creneaux).
Note doc : la gestion Root des cours/emploi du temps n'etait pas enumeree comme page P-xxx
(les 14 pages Root sont academiques) ; on l'ajoute pour couvrir FNC-25..29.

---

## 6. Module 4 - Evaluations & Bulletins - [x] TERMINE

Objet : natures d'epreuves, upload epreuves, saisie des notes, moyennes, rangs, bulletins, validation.
FNC : FNC-32 a FNC-44.

| P | Vue | Route | Role | Etat |
| --- | --- | --- | --- | --- |
| P-074 | Mes epreuves | /teacher/exams | E | [x] |
| P-075 | Televerser une epreuve | /teacher/exams/new | E | [x] |
| P-076 | Saisie des notes | /teacher/exams/:id/grades | E | [x] |
| P-080 | Televerser un devoir / corrige | /teacher/homework/new | E | [x] |
| P-057 | Validation des bulletins | /directeur/bulletins | D | [x] |
| P-082 | Mes enfants (selecteur) | /parent/children | P | [x] |
| P-084 | Notes de l'enfant | /parent/children/:matricule/grades | P | [x] |
| P-085 | Bulletins disponibles | /parent/children/:matricule/bulletins | P | [x] |
| P-087 | Epreuves & devoirs | /parent/children/:matricule/exams | P | [x] |

Composants : GradeTable (saisie note + appreciation), BulletinPreview, UploadField (partage, form.tsx).
Mock : features/evaluations/mockData.ts (epreuves, notes, moyennes, rangs, bulletins) + childrenForParent (students).
Notes : workflow bulletin a valider -> validee -> publiee (Directeur). Parent ne telecharge que les bulletins publies.
Restant ulterieur : generation PDF reelle (mock telechargement pour l'instant), Stepper d'upload (formulaire simple retenu).

---

## 7. Module 5 - Scolarite & Paiements - [x] TERMINE

Objet : tarifs/scolarites, tranches, modes, encaissements, recus, retards, relances.
FNC : FNC-45 a FNC-54.

| P | Vue | Route | Role | Etat |
| --- | --- | --- | --- | --- |
| P-046 | Gestion des scolarites | /fondateur/tuitions | F | [x] |
| P-047 | Creation/edition scolarite | /fondateur/tuitions/new, /:id | F | [x] |
| P-048 | Gestion des tranches | /fondateur/tranches | F | [x] |
| P-049 | Gestion des modes de paiement | /fondateur/modes | F | [x] |
| P-035 | Liste des paiements | /scolarite/payments | S | [x] |
| P-036 | Enregistrer un paiement | /scolarite/payments/new | S | [x] |
| P-037 | Detail d'un paiement | /scolarite/payments/:id | S | [x] |
| P-038 | Etat paiements par eleve | /scolarite/students/:matricule | S | [x] |
| P-039 | Eleves en retard | /scolarite/overdue | S | [x] |
| P-040 | Envoi de relances | /scolarite/reminders | S | [x] |
| P-043 | Liste des modes (lecture) | /scolarite/modes | S | [x] |
| P-089 | Scolarite & paiements (enfant) | /parent/children/:matricule/payments | P | [x] |
| P-090 | Recus de paiement | /parent/children/:matricule/receipts | P | [x] |

Composants : PaymentStateView (tranches + totaux), ReceiptPreview, FilterTabs (par mode).
Mock : features/payments/mockData.ts (scolarites par classe, 3 tranches, modes, paiements, etats calcules + retards).
Helper : formatMoney (FCFA) ajoute a shared/lib/format.ts.
Notes : allocation des paiements par tranche dans l'ordre, statut a jour / en retard calcule, relances multi-destinataires (mock).
Restant ulterieur : generation PDF reelle des recus (mock telechargement pour l'instant).

---

## 8. Module 6 - Communication - [x] TERMINE

Objet : messagerie avancee, messages collectifs, validation directeur, annonces, relances.
FNC : FNC-55 a FNC-62 (inbox/detail de base deja en M1).

| P | Vue | Route | Role | Etat |
| --- | --- | --- | --- | --- |
| P-092 | Composer un message | /messages/new + /parent/messages/new | P, R, A, S, E | [x] |
| P-058 | Validation des messages collectifs | /directeur/messages | D | [x] |
| P-093 | Annonces de l'ecole | /parent/announcements | P | [x] |

Composants : ComposeMessagePage (destinataires : individuel / tous parents / relance, adaptatif par role),
AnnouncementCard, DirectorMessagesPage (file de validation).
Mock : extension de features/messages/mockData.ts (types 0/1/2, CollectiveMessage avec statut pending/validated/rejected, announcements()).
Notes : un message collectif (type 1/2) part en attente -> validation Directeur -> diffusion -> visible en annonce parent.
Bouton "Nouveau message" de l'inbox (M1) cable vers la bonne route selon le role.

---

## 9. Module 7 - Discipline - [x] TERMINE

Objet : referentiel disciplines (faute+points), rapports, cumul points, validation seuil.
FNC : FNC-63 a FNC-67.

| P | Vue | Route | Role | Etat |
| --- | --- | --- | --- | --- |
| P-077 | Saisie d'un rapport disciplinaire | /teacher/discipline/new | E | [x] |
| P-078 | Mes rapports disciplinaires | /teacher/discipline | E | [x] |
| P-059 | Approbation des rapports | /directeur/discipline | D | [x] |
| P-088 | Discipline (enfant) | /parent/children/:matricule/discipline | P | [x] |
| P-021* | Referentiel disciplines | /root/refs | R | [x] |

Composants : DisciplineReportForm, PointsBadge, SeverityTag (discipline/components/tags.tsx).
Mock : features/discipline/mockData.ts (referentiel faute+points, rapports, statut pending/approved/rejected, cumul points).
Notes : seuil grave a 10 points -> rapport en attente de validation Directeur ; sinon approuve directement.
Cumul des points approuves par eleve (FNC-65) affiche au Directeur et au parent.
Acces parent via le hub /parent/children (lien Discipline).

---

## 10. Module 8 - Documents & Medias - [x] TERMINE

Objet : bibliotheque/livres, photos eleves, justificatifs paiement, contraintes upload.
FNC : FNC-68 a FNC-73.

| P | Vue | Route | Role | Etat |
| --- | --- | --- | --- | --- |
| P-091 | Manuels scolaires (catalogue) | /library + /parent/library | P, tous (lecture) | [x] |
| (R) | Upload manuel / gestion bibliotheque | /root/library | R | [x] |
| (intg) | Upload photo eleve | dans StudentFormPage | A, Ad | [x] |
| (intg) | Justificatifs paiement | dans PaymentFormPage (M5) | S | [x] |

Composants : UploadField (taille max 10 Mo, partage), BookCard, FileBadge.
Mock : features/documents/mockData.ts (livres par specialite, taille fichier).
Helper : formatFileSize ajoute a shared/lib/format.ts.
Notes : catalogue filtrable par specialite + recherche ; gestion Root (upload + suppression).
FNC-72/73 (taille max 10 Mo, antivirus) sont systeme : rappel d'UI present, scan reel cote backend.

---

## 11. Module 9 - Reporting & Tableaux de bord - [x] TERMINE

Objet : enrichissement des dashboards (charts), performances, demographie, exports.
FNC : FNC-74 a FNC-82.

| P | Vue | Route | Role |
| --- | --- | --- | --- |
| P-050 | Bilans annuels | /fondateur/balance | F |
| P-051 | Comparaison inter-annees | /fondateur/compare | F |
| P-052 | Exploration (lecture seule) | /fondateur/explore | F |
| P-054 | Performance par classe | /directeur/perf/classes | D |
| P-055 | Performance par cours | /directeur/perf/courses | D |
| P-056 | Performance par eleve | /directeur/perf/students | D |
| P-060 | Vue d'ensemble enseignants | /directeur/teachers | D |
| P-061 | Vue d'ensemble eleves | /directeur/students | D |
| P-062 | Statistiques demographiques | /directeur/demographics | D |
| P-063 | Rapports synthetiques | /directeur/reports | D |
| P-041 | Recapitulatif financier | /scolarite/reports | S |
| P-042 | Stats par mode de paiement | /scolarite/by-mode | S |
| P-044 | Export comptable | /scolarite/export | S |
| P-067 | Statistiques financieres | /auditeur/finance | Au |
| P-068 | Statistiques pedagogiques | /auditeur/pedagogy | Au |
| P-069 | Exports | /auditeur/exports | Au |
| P-082 | Selection enfant | /parent/children | P |
| P-083 | Fiche enfant | /parent/children/:matricule | P |

Composants : ChartCard (line/bar/donut via recharts), MetricChart, ExportButton, DateRangeFilter.
Les dashboards de base (P-045, P-053, P-064, P-070, P-081, P-034) sont enrichis ici.
Mock : features/reporting/mockData.ts (series temporelles, agregats).

---

## 12. Module 10 - Audit & Logs + pages techniques - [x] TERMINE

Objet : journal d'audit (deja en M2 cote Root), vues auditeur, pages techniques.
FNC : FNC-83 a FNC-87.

| P | Vue | Route | Role |
| --- | --- | --- | --- |
| P-064 | Dashboard Auditeur | /auditeur/dashboard | Au |
| P-065 | Toutes les listes (lecture) | /auditeur/listings | Au |
| P-066 | Consultation journal d'audit | /auditeur/audit-logs | Au |
| P-095 | Erreur 403 | /403 | Public |
| P-096 | Maintenance | /maintenance | Public |
| P-097 | A propos / mentions legales | /about | Public |

Pages roles restantes a placer ici ou dans leur module :
- Administratif : P-030 dashboard, P-031 dossiers, P-032 saisie dossier, P-033 edition eleve volet admin.

Composants : ReadOnlyTable, ExportCsvButton.

---

## 13. Recapitulatif & ordre de realisation

Ordre : M1 [x] -> M2 [x] -> M3 [x] -> M4 [x] -> M5 [x] -> M6 [x] -> M7 [x] -> M8 [x] -> M9 [x] -> M10 [x].
Validation utilisateur a la fin de chaque module avant d'ouvrir le suivant.

| Module | Statut |
| --- | --- |
| Fondations | [x] |
| M1 Auth / profil / navigation | [x] |
| M2 Academique & comptes | [x] |
| M3 Pedagogie | [x] |
| M4 Evaluations & bulletins | [x] |
| M5 Scolarite & paiements | [x] |
| M6 Communication | [x] |
| M7 Discipline | [x] |
| M8 Documents & medias | [x] |
| M9 Reporting & dashboards | [x] |
| M10 Audit & pages techniques | [x] |

Note photos : les avatars affichent de vraies photos Unsplash (helper shared/lib/photos.ts,
selection deterministe par graine, repli initiales en cas d'erreur de chargement).
Les 10 modules du frontend sont desormais realises avec mock data.

Note doc : 97 vues pour ~75-80 routes (pages partagees via parametres). Certaines pages
(course CRUD Root, /root/library) ne sont pas enumerees P-xxx mais requises par les FNC ;
elles sont ajoutees au module fonctionnel correspondant.

## Verification de couverture (97 pages)

Audit complet P-001..P-097 contre 02_Fonctionnalites_et_Pages_Frontend.pdf.
Resultat : 97/97 vues implementees. Typecheck (tsc) et build (vite) OK.

Pages ajoutees lors de la verification finale :
- P-013 /root/personnel/new + /:id (formulaire personnel)
- P-014 /root/parents (liste des parents)
- P-015 /root/credentials (envoi des codes de connexion)
- P-018 /root/salles (gestion des salles)
- P-021 /root/refs (onglets villes / quartiers / disciplines)
- P-027 /admin/students/:matricule/edit (edition eleve)
- P-028 /admin/students/:matricule/assign (affectation classe / salle)
- P-029 /admin/students/:matricule/parents (liaison parent - eleve)
- P-032 /staff/files/new (saisie d'un dossier d'inscription)
- routes Administratif alignees sur la doc : /staff/files, /staff/students/:matricule
- P-072 /teacher/students + P-073 /teacher/students/:matricule
- P-086 /parent/children/:matricule/schedule (emploi du temps enfant)
- P-094 route /404 explicite (en plus du catch-all)

Navigation : RootSubNav etendu (Parents, Codes, Salles, Referentiels) ;
liens ajoutes (fiche eleve -> editer/affecter/parents, classes enseignant -> mes eleves,
fiche enfant -> emploi du temps / recus).
