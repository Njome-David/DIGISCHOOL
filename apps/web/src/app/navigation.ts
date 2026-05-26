import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CreditCard,
  MessageSquare,
  BookOpen,
  Settings,
  School,
  FileText,
  BarChart3,
  Library,
  Calendar,
  ClipboardList,
} from 'lucide-react';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const NAV: Record<string, NavItem[]> = {
  root: [
    { to: '/root/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { to: '/root/admins', label: 'Administrateurs', icon: Users },
    { to: '/root/personnel', label: 'Personnel', icon: Users },
    { to: '/root/parents', label: 'Parents', icon: Users },
    { to: '/root/credentials', label: 'Identifiants', icon: Settings },
    { to: '/root/cycles', label: 'Cycles', icon: School },
    { to: '/root/classes', label: 'Classes', icon: School },
    { to: '/root/salles', label: 'Salles', icon: School },
    { to: '/root/years', label: 'Années', icon: Calendar },
    { to: '/root/terms', label: 'Trimestres', icon: Calendar },
    { to: '/root/refs', label: 'Référentiels', icon: BookOpen },
    { to: '/root/audit', label: 'Audit', icon: FileText },
  ],
  admin: [
    { to: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { to: '/admin/students', label: 'Élèves', icon: GraduationCap },
  ],
  staff: [
    { to: '/staff/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { to: '/staff/files', label: 'Dossiers', icon: FileText },
    { to: '/staff/students', label: 'Élèves', icon: GraduationCap },
  ],
  scolarite: [
    { to: '/scolarite/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { to: '/scolarite/payments', label: 'Paiements', icon: CreditCard },
    { to: '/scolarite/overdue', label: 'Impayés', icon: CreditCard },
    { to: '/scolarite/reminders', label: 'Relances', icon: MessageSquare },
    { to: '/scolarite/reports', label: 'Rapports', icon: BarChart3 },
    { to: '/scolarite/by-mode', label: 'Par mode', icon: CreditCard },
    { to: '/scolarite/modes', label: 'Modes', icon: CreditCard },
  ],
  fondateur: [
    { to: '/fondateur/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { to: '/fondateur/tuitions', label: 'Tarifs', icon: CreditCard },
    { to: '/fondateur/tranches', label: 'Tranches', icon: CreditCard },
    { to: '/fondateur/modes', label: 'Modes paiement', icon: CreditCard },
    { to: '/fondateur/balance', label: 'Balance', icon: BarChart3 },
    { to: '/fondateur/compare', label: 'Comparaison', icon: BarChart3 },
    { to: '/fondateur/explore', label: 'Exploration', icon: BarChart3 },
  ],
  directeur: [
    { to: '/directeur/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { to: '/directeur/perf/classes', label: 'Perf. classes', icon: BarChart3 },
    { to: '/directeur/perf/courses', label: 'Perf. cours', icon: BarChart3 },
    { to: '/directeur/perf/students', label: 'Perf. élèves', icon: BarChart3 },
    { to: '/directeur/bulletins', label: 'Bulletins', icon: BookOpen },
    { to: '/directeur/messages', label: 'Messages', icon: MessageSquare },
    { to: '/directeur/discipline', label: 'Discipline', icon: ClipboardList },
    { to: '/directeur/teachers', label: 'Enseignants', icon: Users },
    { to: '/directeur/students', label: 'Élèves', icon: GraduationCap },
    { to: '/directeur/demographics', label: 'Démographie', icon: BarChart3 },
    { to: '/directeur/reports', label: 'Rapports', icon: FileText },
  ],
  auditeur: [
    { to: '/auditeur/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { to: '/auditeur/listings', label: 'Listings', icon: FileText },
    { to: '/auditeur/audit-logs', label: 'Journal audit', icon: FileText },
    { to: '/auditeur/finance', label: 'Finance', icon: CreditCard },
    { to: '/auditeur/pedagogy', label: 'Pédagogie', icon: BookOpen },
    { to: '/auditeur/exports', label: 'Exports', icon: FileText },
  ],
  teacher: [
    { to: '/teacher/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { to: '/teacher/classes', label: 'Mes classes', icon: School },
    { to: '/teacher/exams', label: 'Épreuves', icon: BookOpen },
    { to: '/teacher/homework', label: 'Devoirs', icon: BookOpen },
    { to: '/teacher/discipline', label: 'Discipline', icon: ClipboardList },
    { to: '/teacher/schedule', label: 'Emploi du temps', icon: Calendar },
  ],
  parent: [
    { to: '/parent/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { to: '/parent/children', label: 'Mes enfants', icon: GraduationCap },
    { to: '/parent/messages', label: 'Messages', icon: MessageSquare },
    { to: '/parent/payments', label: 'Paiements', icon: CreditCard },
    { to: '/parent/library', label: 'Bibliothèque', icon: Library },
    { to: '/parent/announcements', label: 'Annonces', icon: MessageSquare },
  ],
};

export function getNavPrefix(pathname: string): string {
  const seg = pathname.split('/')[1];
  return seg || 'root';
}
