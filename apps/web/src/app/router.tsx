import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store';
import { AppLayout } from '@/app/layouts/AppLayout';
import { Spinner } from '@/shared/components/ui';
import { ROLE_DASHBOARD } from '@ecole/shared';

/* Public / auth (Module 1) */
const LandingPage = lazy(() => import('@/pages/LandingPage').then((m) => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })));
const ChangePasswordPage = lazy(() => import('@/pages/ChangePasswordPage').then((m) => ({ default: m.ChangePasswordPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

/* Common (Module 1) */
const ProfilePage = lazy(() => import('@/pages/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const DashboardPage = lazy(() => import('@/features/dashboards/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const NotificationsPage = lazy(() => import('@/features/notifications/NotificationsPage').then((m) => ({ default: m.NotificationsPage })));
const MessagesPage = lazy(() => import('@/features/messages/MessagesPage').then((m) => ({ default: m.MessagesPage })));
const MessageDetailPage = lazy(() => import('@/features/messages/MessageDetailPage').then((m) => ({ default: m.MessageDetailPage })));

/* Module 2  academique (Root) */
const RootOverviewPage = lazy(() => import('@/features/academic/RootOverviewPage').then((m) => ({ default: m.RootOverviewPage })));
const CyclesPage = lazy(() => import('@/features/academic/CyclesPage').then((m) => ({ default: m.CyclesPage })));
const ClassesPage = lazy(() => import('@/features/academic/ClassesPage').then((m) => ({ default: m.ClassesPage })));
const AcademicYearsPage = lazy(() => import('@/features/academic/AcademicYearsPage').then((m) => ({ default: m.AcademicYearsPage })));
const TermsPage = lazy(() => import('@/features/academic/TermsPage').then((m) => ({ default: m.TermsPage })));
const AuditPage = lazy(() => import('@/features/academic/AuditPage').then((m) => ({ default: m.AuditPage })));
const AdminsPage = lazy(() => import('@/features/accounts/AdminsPage').then((m) => ({ default: m.AdminsPage })));
const AdminFormPage = lazy(() => import('@/features/accounts/AdminFormPage').then((m) => ({ default: m.AdminFormPage })));
const PersonnelPage = lazy(() => import('@/features/accounts/PersonnelPage').then((m) => ({ default: m.PersonnelPage })));
const PersonnelFormPage = lazy(() => import('@/features/accounts/PersonnelFormPage').then((m) => ({ default: m.PersonnelFormPage })));
const ParentsPage = lazy(() => import('@/features/accounts/ParentsPage').then((m) => ({ default: m.ParentsPage })));
const CredentialsPage = lazy(() => import('@/features/accounts/CredentialsPage').then((m) => ({ default: m.CredentialsPage })));
const SallesPage = lazy(() => import('@/features/academic/SallesPage').then((m) => ({ default: m.SallesPage })));
const RefsPage = lazy(() => import('@/features/academic/RefsPage').then((m) => ({ default: m.RefsPage })));

/* Module 2  inscriptions (Admin) */
const StudentsPage = lazy(() => import('@/features/students/StudentsPage').then((m) => ({ default: m.StudentsPage })));
const StudentFormPage = lazy(() => import('@/features/students/StudentFormPage').then((m) => ({ default: m.StudentFormPage })));
const StudentDetailPage = lazy(() => import('@/features/students/StudentDetailPage').then((m) => ({ default: m.StudentDetailPage })));
const StudentAssignPage = lazy(() => import('@/features/students/StudentAssignPage').then((m) => ({ default: m.StudentAssignPage })));
const StudentParentsPage = lazy(() => import('@/features/students/StudentParentsPage').then((m) => ({ default: m.StudentParentsPage })));

/* Module 3 - pedagogie */
const CoursesPage = lazy(() => import('@/features/pedagogy/CoursesPage').then((m) => ({ default: m.CoursesPage })));
const CourseFormPage = lazy(() => import('@/features/pedagogy/CourseFormPage').then((m) => ({ default: m.CourseFormPage })));
const SchedulePage = lazy(() => import('@/features/pedagogy/SchedulePage').then((m) => ({ default: m.SchedulePage })));
const TeacherClassesPage = lazy(() => import('@/features/pedagogy/TeacherClassesPage').then((m) => ({ default: m.TeacherClassesPage })));
const TeacherSchedulePage = lazy(() => import('@/features/pedagogy/TeacherSchedulePage').then((m) => ({ default: m.TeacherSchedulePage })));
const TeacherStudentsPage = lazy(() => import('@/features/pedagogy/TeacherStudentsPage').then((m) => ({ default: m.TeacherStudentsPage })));
const TeacherStudentDetailPage = lazy(() => import('@/features/pedagogy/TeacherStudentDetailPage').then((m) => ({ default: m.TeacherStudentDetailPage })));

/* Module 4 - evaluations & bulletins */
const ExamsPage = lazy(() => import('@/features/evaluations/ExamsPage').then((m) => ({ default: m.ExamsPage })));
const ExamFormPage = lazy(() => import('@/features/evaluations/ExamFormPage').then((m) => ({ default: m.ExamFormPage })));
const GradesPage = lazy(() => import('@/features/evaluations/GradesPage').then((m) => ({ default: m.GradesPage })));
const HomeworkFormPage = lazy(() => import('@/features/evaluations/HomeworkFormPage').then((m) => ({ default: m.HomeworkFormPage })));
const BulletinsValidationPage = lazy(() => import('@/features/evaluations/BulletinsValidationPage').then((m) => ({ default: m.BulletinsValidationPage })));
const ParentChildrenPage = lazy(() => import('@/features/parent/ParentChildrenPage').then((m) => ({ default: m.ParentChildrenPage })));
const ChildGradesPage = lazy(() => import('@/features/parent/ChildGradesPage').then((m) => ({ default: m.ChildGradesPage })));
const ChildBulletinsPage = lazy(() => import('@/features/parent/ChildBulletinsPage').then((m) => ({ default: m.ChildBulletinsPage })));
const ChildExamsPage = lazy(() => import('@/features/parent/ChildExamsPage').then((m) => ({ default: m.ChildExamsPage })));

/* Module 5 - scolarite & paiements */
const TuitionsPage = lazy(() => import('@/features/payments/TuitionsPage').then((m) => ({ default: m.TuitionsPage })));
const TuitionFormPage = lazy(() => import('@/features/payments/TuitionFormPage').then((m) => ({ default: m.TuitionFormPage })));
const TranchesPage = lazy(() => import('@/features/payments/TranchesPage').then((m) => ({ default: m.TranchesPage })));
const PaymentModesPage = lazy(() => import('@/features/payments/PaymentModesPage').then((m) => ({ default: m.PaymentModesPage })));
const PaymentsPage = lazy(() => import('@/features/payments/PaymentsPage').then((m) => ({ default: m.PaymentsPage })));
const PaymentFormPage = lazy(() => import('@/features/payments/PaymentFormPage').then((m) => ({ default: m.PaymentFormPage })));
const PaymentDetailPage = lazy(() => import('@/features/payments/PaymentDetailPage').then((m) => ({ default: m.PaymentDetailPage })));
const StudentPaymentPage = lazy(() => import('@/features/payments/StudentPaymentPage').then((m) => ({ default: m.StudentPaymentPage })));
const OverduePage = lazy(() => import('@/features/payments/OverduePage').then((m) => ({ default: m.OverduePage })));
const RemindersPage = lazy(() => import('@/features/payments/RemindersPage').then((m) => ({ default: m.RemindersPage })));
const ChildPaymentsPage = lazy(() => import('@/features/parent/ChildPaymentsPage').then((m) => ({ default: m.ChildPaymentsPage })));
const ChildReceiptsPage = lazy(() => import('@/features/parent/ChildReceiptsPage').then((m) => ({ default: m.ChildReceiptsPage })));

/* Module 6 - communication */
const ComposeMessagePage = lazy(() => import('@/features/messages/ComposeMessagePage').then((m) => ({ default: m.ComposeMessagePage })));
const DirectorMessagesPage = lazy(() => import('@/features/messages/DirectorMessagesPage').then((m) => ({ default: m.DirectorMessagesPage })));
const AnnouncementsPage = lazy(() => import('@/features/messages/AnnouncementsPage').then((m) => ({ default: m.AnnouncementsPage })));

/* Module 7 - discipline */
const DisciplineReportsPage = lazy(() => import('@/features/discipline/DisciplineReportsPage').then((m) => ({ default: m.DisciplineReportsPage })));
const DisciplineReportForm = lazy(() => import('@/features/discipline/DisciplineReportForm').then((m) => ({ default: m.DisciplineReportForm })));
const DisciplineApprovalPage = lazy(() => import('@/features/discipline/DisciplineApprovalPage').then((m) => ({ default: m.DisciplineApprovalPage })));
const ChildDisciplinePage = lazy(() => import('@/features/parent/ChildDisciplinePage').then((m) => ({ default: m.ChildDisciplinePage })));

/* Module 8 - documents & medias */
const LibraryPage = lazy(() => import('@/features/documents/LibraryPage').then((m) => ({ default: m.LibraryPage })));
const LibraryAdminPage = lazy(() => import('@/features/documents/LibraryAdminPage').then((m) => ({ default: m.LibraryAdminPage })));

/* Module 9 - reporting & tableaux de bord */
const FounderBalancePage = lazy(() => import('@/features/reporting/FounderBalancePage').then((m) => ({ default: m.FounderBalancePage })));
const FounderComparePage = lazy(() => import('@/features/reporting/FounderComparePage').then((m) => ({ default: m.FounderComparePage })));
const FounderExplorePage = lazy(() => import('@/features/reporting/FounderExplorePage').then((m) => ({ default: m.FounderExplorePage })));
const PerformancePage = lazy(() => import('@/features/reporting/PerformancePage').then((m) => ({ default: m.PerformancePage })));
const TeachersOverviewPage = lazy(() => import('@/features/reporting/TeachersOverviewPage').then((m) => ({ default: m.TeachersOverviewPage })));
const StudentsOverviewPage = lazy(() => import('@/features/reporting/StudentsOverviewPage').then((m) => ({ default: m.StudentsOverviewPage })));
const DemographicsPage = lazy(() => import('@/features/reporting/DemographicsPage').then((m) => ({ default: m.DemographicsPage })));
const DirectorReportsPage = lazy(() => import('@/features/reporting/DirectorReportsPage').then((m) => ({ default: m.DirectorReportsPage })));
const ScolariteReportsPage = lazy(() => import('@/features/reporting/ScolariteReportsPage').then((m) => ({ default: m.ScolariteReportsPage })));
const ScolariteByModePage = lazy(() => import('@/features/reporting/ScolariteByModePage').then((m) => ({ default: m.ScolariteByModePage })));
const ExportsPage = lazy(() => import('@/features/reporting/ExportsPage').then((m) => ({ default: m.ExportsPage })));
const AuditorFinancePage = lazy(() => import('@/features/reporting/AuditorFinancePage').then((m) => ({ default: m.AuditorFinancePage })));
const AuditorPedagogyPage = lazy(() => import('@/features/reporting/AuditorPedagogyPage').then((m) => ({ default: m.AuditorPedagogyPage })));
const ChildProfilePage = lazy(() => import('@/features/parent/ChildProfilePage').then((m) => ({ default: m.ChildProfilePage })));
const ChildSchedulePage = lazy(() => import('@/features/parent/ChildSchedulePage').then((m) => ({ default: m.ChildSchedulePage })));

/* Module 10 - audit & pages techniques */
const AuditorDashboardPage = lazy(() => import('@/features/audit/AuditorDashboardPage').then((m) => ({ default: m.AuditorDashboardPage })));
const AuditLogsPage = lazy(() => import('@/features/audit/AuditLogsPage').then((m) => ({ default: m.AuditLogsPage })));
const AuditorListingsPage = lazy(() => import('@/features/audit/AuditorListingsPage').then((m) => ({ default: m.AuditorListingsPage })));
const AdministratifDashboardPage = lazy(() => import('@/features/administratif/AdministratifDashboardPage').then((m) => ({ default: m.AdministratifDashboardPage })));
const DossiersPage = lazy(() => import('@/features/administratif/DossiersPage').then((m) => ({ default: m.DossiersPage })));
const DossierFormPage = lazy(() => import('@/features/administratif/DossierFormPage').then((m) => ({ default: m.DossierFormPage })));
const DossierNewPage = lazy(() => import('@/features/administratif/DossierNewPage').then((m) => ({ default: m.DossierNewPage })));
const ForbiddenPage = lazy(() => import('@/pages/ForbiddenPage').then((m) => ({ default: m.ForbiddenPage })));
const MaintenancePage = lazy(() => import('@/pages/MaintenancePage').then((m) => ({ default: m.MaintenancePage })));
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })));

function PageFallback() {
  return (
    <div className="flex h-full items-center justify-center py-20">
      <Spinner className="h-6 w-6 border-brand-200 border-t-brand-500" />
    </div>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  if (user.mustChangePassword) return <Navigate to="/change-password" replace />;
  return <>{children}</>;
}

function RoleHome() {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  if (user.mustChangePassword) return <Navigate to="/change-password" replace />;
  return <Navigate to={ROLE_DASHBOARD[user.role]} replace />;
}

export function AppRouter() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Authentifie */}
        <Route
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<RoleHome />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/messages/:id" element={<MessageDetailPage />} />

          {/* Module 2  Root : gestion academique & comptes */}
          <Route path="/root/dashboard" element={<RootOverviewPage />} />
          <Route path="/root/admins" element={<AdminsPage />} />
          <Route path="/root/admins/new" element={<AdminFormPage />} />
          <Route path="/root/admins/:id" element={<AdminFormPage />} />
          <Route path="/root/personnel" element={<PersonnelPage />} />
          <Route path="/root/personnel/new" element={<PersonnelFormPage />} />
          <Route path="/root/personnel/:id" element={<PersonnelFormPage />} />
          <Route path="/root/parents" element={<ParentsPage />} />
          <Route path="/root/credentials" element={<CredentialsPage />} />
          <Route path="/root/cycles" element={<CyclesPage />} />
          <Route path="/root/classes" element={<ClassesPage />} />
          <Route path="/root/salles" element={<SallesPage />} />
          <Route path="/root/years" element={<AcademicYearsPage />} />
          <Route path="/root/terms" element={<TermsPage />} />
          <Route path="/root/audit" element={<AuditPage />} />

          {/* Module 2  Admin inscriptions : dossiers eleves */}
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/students" element={<StudentsPage />} />
          <Route path="/admin/students/new" element={<StudentFormPage />} />
          <Route path="/admin/students/:matricule" element={<StudentDetailPage />} />
          <Route path="/admin/students/:matricule/edit" element={<StudentFormPage />} />
          <Route path="/admin/students/:matricule/assign" element={<StudentAssignPage />} />
          <Route path="/admin/students/:matricule/parents" element={<StudentParentsPage />} />

          {/* Module 3 - Pedagogie : cours & emploi du temps */}
          <Route path="/root/courses" element={<CoursesPage />} />
          <Route path="/root/courses/new" element={<CourseFormPage />} />
          <Route path="/root/courses/:id" element={<CourseFormPage />} />
          <Route path="/root/schedule" element={<SchedulePage />} />
          <Route path="/teacher/classes" element={<TeacherClassesPage />} />
          <Route path="/teacher/schedule" element={<TeacherSchedulePage />} />
          <Route path="/teacher/students" element={<TeacherStudentsPage />} />
          <Route path="/teacher/students/:matricule" element={<TeacherStudentDetailPage />} />

          {/* Module 4 - Evaluations & bulletins */}
          <Route path="/teacher/exams" element={<ExamsPage />} />
          <Route path="/teacher/exams/new" element={<ExamFormPage />} />
          <Route path="/teacher/exams/:id/grades" element={<GradesPage />} />
          <Route path="/teacher/homework/new" element={<HomeworkFormPage />} />
          <Route path="/directeur/bulletins" element={<BulletinsValidationPage />} />
          <Route path="/parent/children" element={<ParentChildrenPage />} />
          <Route path="/parent/children/:matricule/grades" element={<ChildGradesPage />} />
          <Route path="/parent/children/:matricule/bulletins" element={<ChildBulletinsPage />} />
          <Route path="/parent/children/:matricule/schedule" element={<ChildSchedulePage />} />
          <Route path="/parent/children/:matricule/exams" element={<ChildExamsPage />} />

          {/* Module 5 - Scolarite & paiements */}
          <Route path="/fondateur/tuitions" element={<TuitionsPage />} />
          <Route path="/fondateur/tuitions/new" element={<TuitionFormPage />} />
          <Route path="/fondateur/tuitions/:id" element={<TuitionFormPage />} />
          <Route path="/fondateur/tranches" element={<TranchesPage />} />
          <Route path="/fondateur/modes" element={<PaymentModesPage />} />
          <Route path="/scolarite/payments" element={<PaymentsPage />} />
          <Route path="/scolarite/payments/new" element={<PaymentFormPage />} />
          <Route path="/scolarite/payments/:id" element={<PaymentDetailPage />} />
          <Route path="/scolarite/students/:matricule" element={<StudentPaymentPage />} />
          <Route path="/scolarite/overdue" element={<OverduePage />} />
          <Route path="/scolarite/reminders" element={<RemindersPage />} />
          <Route path="/scolarite/modes" element={<PaymentModesPage readOnly />} />
          <Route path="/parent/children/:matricule/payments" element={<ChildPaymentsPage />} />
          <Route path="/parent/children/:matricule/receipts" element={<ChildReceiptsPage />} />

          {/* Module 6 - Communication */}
          <Route path="/messages/new" element={<ComposeMessagePage />} />
          <Route path="/parent/messages/new" element={<ComposeMessagePage />} />
          <Route path="/directeur/messages" element={<DirectorMessagesPage />} />
          <Route path="/parent/announcements" element={<AnnouncementsPage />} />

          {/* Module 7 - Discipline */}
          <Route path="/teacher/discipline" element={<DisciplineReportsPage />} />
          <Route path="/teacher/discipline/new" element={<DisciplineReportForm />} />
          <Route path="/directeur/discipline" element={<DisciplineApprovalPage />} />
          <Route path="/root/refs" element={<RefsPage />} />
          <Route path="/parent/children/:matricule/discipline" element={<ChildDisciplinePage />} />

          {/* Module 8 - Documents & medias */}
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/parent/library" element={<LibraryPage />} />
          <Route path="/root/library" element={<LibraryAdminPage />} />

          {/* Module 9 - Reporting & tableaux de bord */}
          <Route path="/fondateur/balance" element={<FounderBalancePage />} />
          <Route path="/fondateur/compare" element={<FounderComparePage />} />
          <Route path="/fondateur/explore" element={<FounderExplorePage />} />
          <Route path="/directeur/perf/classes" element={<PerformancePage scope="classes" />} />
          <Route path="/directeur/perf/courses" element={<PerformancePage scope="courses" />} />
          <Route path="/directeur/perf/students" element={<PerformancePage scope="students" />} />
          <Route path="/directeur/teachers" element={<TeachersOverviewPage />} />
          <Route path="/directeur/students" element={<StudentsOverviewPage />} />
          <Route path="/directeur/demographics" element={<DemographicsPage />} />
          <Route path="/directeur/reports" element={<DirectorReportsPage />} />
          <Route path="/scolarite/reports" element={<ScolariteReportsPage />} />
          <Route path="/scolarite/by-mode" element={<ScolariteByModePage />} />
          <Route path="/scolarite/export" element={<ExportsPage scope="finance" />} />
          <Route path="/auditeur/finance" element={<AuditorFinancePage />} />
          <Route path="/auditeur/pedagogy" element={<AuditorPedagogyPage />} />
          <Route
            path="/auditeur/exports"
            element={<ExportsPage title="Exports" subtitle="Telecharger tous les jeux de donnees" scope="all" />}
          />
          <Route path="/parent/children/:matricule" element={<ChildProfilePage />} />

          {/* Module 10 - Audit & pages techniques */}
          <Route path="/auditeur/dashboard" element={<AuditorDashboardPage />} />
          <Route path="/auditeur/listings" element={<AuditorListingsPage />} />
          <Route path="/auditeur/audit-logs" element={<AuditLogsPage />} />
          <Route path="/staff/dashboard" element={<AdministratifDashboardPage />} />
          <Route path="/staff/files" element={<DossiersPage />} />
          <Route path="/staff/files/new" element={<DossierNewPage />} />
          <Route path="/staff/students/:matricule" element={<DossierFormPage />} />

          {/* Tableaux de bord des autres roles */}
          <Route path="/scolarite/dashboard" element={<DashboardPage />} />
          <Route path="/fondateur/dashboard" element={<DashboardPage />} />
          <Route path="/directeur/dashboard" element={<DashboardPage />} />
          <Route path="/teacher/dashboard" element={<DashboardPage />} />
          <Route path="/parent/dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
