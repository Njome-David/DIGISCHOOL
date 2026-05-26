import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store';
import { AppLayout } from '@/app/layouts/AppLayout';
import { ROLE_DASHBOARD, type Role } from '@ecole/shared';

const LoginPage = lazy(() => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })));
const ChangePasswordPage = lazy(() => import('@/pages/ChangePasswordPage').then((m) => ({ default: m.ChangePasswordPage })));
const ProfilePage = lazy(() => import('@/pages/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const DashboardPage = lazy(() => import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const StudentsPage = lazy(() => import('@/pages/StudentsPage').then((m) => ({ default: m.StudentsPage })));
const PaymentsPage = lazy(() => import('@/pages/PaymentsPage').then((m) => ({ default: m.PaymentsPage })));
const MessagesPage = lazy(() => import('@/pages/MessagesPage').then((m) => ({ default: m.MessagesPage })));
const ResourcePage = lazy(() => import('@/pages/ResourcePage').then((m) => ({ default: m.ResourcePage })));

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.accessToken);
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function RoleHome() {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  if (user.mustChangePassword) return <Navigate to="/change-password" replace />;
  return <Navigate to={ROLE_DASHBOARD[user.role as Role]} replace />;
}

const col = (cols: { key: string; label: string }[]) => cols;

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />

      <Route
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<RoleHome />} />
        <Route path="/dashboard" element={<RoleHome />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<DashboardPage title="Notifications" />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/messages/:id" element={<MessagesPage />} />

        {/* Root — 14 pages */}
        <Route path="/root/dashboard" element={<DashboardPage title="Root" />} />
        <Route path="/root/admins" element={<ResourcePage title="Administrateurs" endpoint="/admins" columns={col([{ key: 'ID', label: 'ID' }, { key: 'nom', label: 'Nom' }, { key: 'username', label: 'Login' }, { key: 'typeAdmin', label: 'Type' }])} />} />
        <Route path="/root/personnel" element={<ResourcePage title="Personnel" endpoint="/personnel" columns={col([{ key: 'idPers', label: 'ID' }, { key: 'nom', label: 'Nom' }, { key: 'prenom', label: 'Prénom' }])} />} />
        <Route path="/root/parents" element={<ResourcePage title="Liens parents" endpoint="/parents" columns={col([{ key: 'idParent', label: 'ID' }, { key: 'idPers', label: 'Pers.' }, { key: 'matricule', label: 'Matricule' }])} />} />
        <Route path="/root/credentials" element={<DashboardPage title="Gestion identifiants" subtitle="Envoi des codes de connexion" />} />
        <Route path="/root/cycles" element={<ResourcePage title="Cycles" endpoint="/cycles" columns={col([{ key: 'idCycle', label: 'ID' }, { key: 'libelle', label: 'Libellé' }])} />} />
        <Route path="/root/classes" element={<ResourcePage title="Classes" endpoint="/classes" columns={col([{ key: 'idClasse', label: 'ID' }, { key: 'libelle', label: 'Libellé' }])} />} />
        <Route path="/root/salles" element={<ResourcePage title="Salles" endpoint="/salles" columns={col([{ key: 'idSalle', label: 'ID' }, { key: 'libelle', label: 'Libellé' }])} />} />
        <Route path="/root/years" element={<ResourcePage title="Années académiques" endpoint="/academic-years" columns={col([{ key: 'idAnnee', label: 'ID' }, { key: 'libelle', label: 'Libellé' }])} />} />
        <Route path="/root/terms" element={<ResourcePage title="Trimestres" endpoint="/trimestres" columns={col([{ key: 'idTrimes', label: 'ID' }, { key: 'libelle', label: 'Libellé' }])} />} />
        <Route path="/root/refs" element={<ResourcePage title="Référentiels" endpoint="/villes" columns={col([{ key: 'idVille', label: 'ID' }, { key: 'libelle', label: 'Ville' }])} />} />
        <Route path="/root/audit" element={<ResourcePage title="Audit" endpoint="/audit-logs" columns={col([{ key: 'id', label: 'ID' }, { key: 'action', label: 'Action' }, { key: 'resource', label: 'Ressource' }])} />} />

        {/* Admin inscriptions — 7 pages */}
        <Route path="/admin/dashboard" element={<DashboardPage title="Admin Inscriptions" />} />
        <Route path="/admin/students" element={<StudentsPage />} />
        <Route path="/admin/students/:matricule" element={<StudentsPage />} />
        <Route path="/admin/students/:matricule/assign" element={<DashboardPage title="Affectation salle" />} />
        <Route path="/admin/students/:matricule/parents" element={<DashboardPage title="Parents de l'élève" />} />

        {/* Staff — 4 pages */}
        <Route path="/staff/dashboard" element={<DashboardPage title="Administratif" />} />
        <Route path="/staff/files" element={<DashboardPage title="Dossiers d'inscription" />} />
        <Route path="/staff/students" element={<StudentsPage />} />
        <Route path="/staff/students/:matricule" element={<StudentsPage />} />

        {/* Scolarité — 11 pages */}
        <Route path="/scolarite/dashboard" element={<DashboardPage title="Admin Scolarité" />} />
        <Route path="/scolarite/payments" element={<PaymentsPage />} />
        <Route path="/scolarite/payments/:id" element={<PaymentsPage />} />
        <Route path="/scolarite/overdue" element={<ResourcePage title="Impayés" endpoint="/payments/overdue" columns={col([{ key: 'matricule', label: 'Matricule' }])} />} />
        <Route path="/scolarite/reminders" element={<DashboardPage title="Relances" subtitle="Messages aux retardataires" />} />
        <Route path="/scolarite/reports" element={<DashboardPage title="Rapports financiers" />} />
        <Route path="/scolarite/by-mode" element={<ResourcePage title="Paiements par mode" endpoint="/modes" columns={col([{ key: 'idMode', label: 'ID' }, { key: 'libelle', label: 'Mode' }])} />} />
        <Route path="/scolarite/modes" element={<ResourcePage title="Modes" endpoint="/modes" columns={col([{ key: 'idMode', label: 'ID' }, { key: 'libelle', label: 'Libellé' }])} />} />
        <Route path="/scolarite/export" element={<DashboardPage title="Export" />} />
        <Route path="/scolarite/students/:matricule" element={<StudentsPage />} />

        {/* Fondateur — 8 pages */}
        <Route path="/fondateur/dashboard" element={<DashboardPage title="Fondateur" />} />
        <Route path="/fondateur/tuitions" element={<ResourcePage title="Tarifs" endpoint="/tuitions" columns={col([{ key: 'idScolarite', label: 'ID' }, { key: 'inscription', label: 'Inscription' }, { key: 'pension', label: 'Pension' }])} />} />
        <Route path="/fondateur/tranches" element={<ResourcePage title="Tranches" endpoint="/tranches" columns={col([{ key: 'idTranche', label: 'ID' }, { key: 'libelle', label: 'Libellé' }, { key: 'montant', label: 'Montant' }])} />} />
        <Route path="/fondateur/modes" element={<ResourcePage title="Modes" endpoint="/modes" columns={col([{ key: 'idMode', label: 'ID' }, { key: 'libelle', label: 'Libellé' }])} />} />
        <Route path="/fondateur/balance" element={<DashboardPage title="Balance financière" />} />
        <Route path="/fondateur/compare" element={<DashboardPage title="Comparaison cycles" />} />
        <Route path="/fondateur/explore" element={<DashboardPage title="Exploration données" />} />

        {/* Directeur — 11 pages */}
        <Route path="/directeur/dashboard" element={<DashboardPage title="Directeur" />} />
        <Route path="/directeur/perf/classes" element={<ResourcePage title="Performance classes" endpoint="/classes" columns={col([{ key: 'idClasse', label: 'ID' }, { key: 'libelle', label: 'Classe' }])} />} />
        <Route path="/directeur/perf/courses" element={<ResourcePage title="Performance cours" endpoint="/courses" columns={col([{ key: 'idCours', label: 'ID' }, { key: 'libelle', label: 'Cours' }])} />} />
        <Route path="/directeur/perf/students" element={<StudentsPage />} />
        <Route path="/directeur/bulletins" element={<DashboardPage title="Bulletins" subtitle="Génération et validation" />} />
        <Route path="/directeur/messages" element={<MessagesPage />} />
        <Route path="/directeur/discipline" element={<ResourcePage title="Discipline" endpoint="/discipline-reports" columns={col([{ key: 'idRap', label: 'ID' }, { key: 'libelle', label: 'Libellé' }])} />} />
        <Route path="/directeur/teachers" element={<ResourcePage title="Enseignants" endpoint="/personnel" columns={col([{ key: 'idPers', label: 'ID' }, { key: 'nom', label: 'Nom' }])} />} />
        <Route path="/directeur/students" element={<StudentsPage />} />
        <Route path="/directeur/demographics" element={<DashboardPage title="Démographie" />} />
        <Route path="/directeur/reports" element={<DashboardPage title="Rapports" />} />

        {/* Auditeur — 6 pages */}
        <Route path="/auditeur/dashboard" element={<DashboardPage title="Auditeur" />} />
        <Route path="/auditeur/listings" element={<StudentsPage />} />
        <Route path="/auditeur/audit-logs" element={<ResourcePage title="Journal audit" endpoint="/audit-logs" columns={col([{ key: 'id', label: 'ID' }, { key: 'action', label: 'Action' }])} />} />
        <Route path="/auditeur/finance" element={<DashboardPage title="Finance" />} />
        <Route path="/auditeur/pedagogy" element={<DashboardPage title="Pédagogie" />} />
        <Route path="/auditeur/exports" element={<DashboardPage title="Exports" />} />

        {/* Enseignant — 11 pages */}
        <Route path="/teacher/dashboard" element={<DashboardPage title="Enseignant" />} />
        <Route path="/teacher/classes" element={<ResourcePage title="Mes cours" endpoint="/courses" columns={col([{ key: 'idCours', label: 'ID' }, { key: 'libelle', label: 'Matière' }])} />} />
        <Route path="/teacher/students/:matricule" element={<StudentsPage />} />
        <Route path="/teacher/exams" element={<ResourcePage title="Épreuves" endpoint="/exams" columns={col([{ key: 'idEpreuve', label: 'ID' }, { key: 'libelle', label: 'Libellé' }])} />} />
        <Route path="/teacher/exams/:id" element={<ResourcePage title="Détail épreuve" endpoint="/exams" columns={col([{ key: 'idEpreuve', label: 'ID' }])} />} />
        <Route path="/teacher/exams/:id/grades" element={<ResourcePage title="Notes" endpoint="/evaluations" columns={col([{ key: 'idEval', label: 'ID' }, { key: 'note', label: 'Note' }])} />} />
        <Route path="/teacher/homework" element={<ResourcePage title="Devoirs" endpoint="/exams" columns={col([{ key: 'idEpreuve', label: 'ID' }, { key: 'libelle', label: 'Devoir' }])} />} />
        <Route path="/teacher/discipline" element={<ResourcePage title="Discipline" endpoint="/discipline-reports" columns={col([{ key: 'idRap', label: 'ID' }])} />} />
        <Route path="/teacher/schedule" element={<DashboardPage title="Emploi du temps" />} />

        {/* Parent — 13 pages */}
        <Route path="/parent/dashboard" element={<DashboardPage title="Espace Parent" />} />
        <Route path="/parent/children" element={<StudentsPage parentMode />} />
        <Route path="/parent/children/:matricule" element={<StudentsPage parentMode />} />
        <Route path="/parent/children/:matricule/grades" element={<ResourcePage title="Notes" endpoint="/evaluations" columns={col([{ key: 'idEval', label: 'ID' }, { key: 'note', label: 'Note' }])} />} />
        <Route path="/parent/children/:matricule/bulletins" element={<DashboardPage title="Bulletins" />} />
        <Route path="/parent/children/:matricule/schedule" element={<DashboardPage title="Emploi du temps" />} />
        <Route path="/parent/children/:matricule/exams" element={<ResourcePage title="Épreuves" endpoint="/exams" columns={col([{ key: 'idEpreuve', label: 'ID' }])} />} />
        <Route path="/parent/children/:matricule/discipline" element={<ResourcePage title="Discipline" endpoint="/discipline-reports" columns={col([{ key: 'idRap', label: 'ID' }])} />} />
        <Route path="/parent/messages" element={<MessagesPage />} />
        <Route path="/parent/messages/new" element={<MessagesPage />} />
        <Route path="/parent/payments" element={<PaymentsPage />} />
        <Route path="/parent/receipts" element={<PaymentsPage />} />
        <Route path="/parent/library" element={<ResourcePage title="Bibliothèque" endpoint="/library/books" columns={col([{ key: 'idLivre', label: 'ID' }, { key: 'titre', label: 'Titre' }])} />} />
        <Route path="/parent/announcements" element={<MessagesPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
