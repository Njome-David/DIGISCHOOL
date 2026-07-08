import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  User,
  Bell,
  MessageSquare,
  GraduationCap,
  BookOpen,
  ClipboardList,
  DollarSign,
  MessageCircle,
  ShieldCheck,
  FileText,
  BarChart2,
  ScrollText,
} from 'lucide-react';
import { ROLES, ROLE_DASHBOARD, type Role } from '@ecole/shared';

export interface NavLinkItem {
  labelKey: string;
  to: string;
  icon: LucideIcon;
}

/** Items communs a tous les roles (Module 1). */
export function commonNav(role: Role): NavLinkItem[] {
  return [
    { labelKey: 'nav.dashboard', to: ROLE_DASHBOARD[role], icon: LayoutDashboard },
    { labelKey: 'nav.profile', to: '/profile', icon: User },
    { labelKey: 'nav.notifications', to: '/notifications', icon: Bell },
    { labelKey: 'nav.messages', to: '/messages', icon: MessageSquare },
  ];
}

interface ModuleDef {
  key: string;
  labelKey: string;
  icon: LucideIcon;
  paths?: Partial<Record<Role, string>>;
}

const MODULES: ModuleDef[] = [
  {
    key: 'm2',
    labelKey: 'gestion_academique',
    icon: GraduationCap,
    paths: {
      [ROLES.ROOT]: '/root/dashboard',
      [ROLES.ADMIN_INSCRIPTIONS]: '/admin/students',
      [ROLES.ADMINISTRATIF]: '/staff/files',
    },
  },
  {
    key: 'm3',
    labelKey: 'gestion_pedagogique',
    icon: BookOpen,
    paths: {
      [ROLES.ROOT]: '/root/courses',
      [ROLES.ENSEIGNANT]: '/teacher/classes',
      [ROLES.DIRECTEUR]: '/root/courses',
    },
  },
  {
    key: 'm4',
    labelKey: 'evaluations_bulletins',
    icon: ClipboardList,
    paths: {
      [ROLES.ROOT]: '/directeur/bulletins',
      [ROLES.ENSEIGNANT]: '/teacher/exams',
      [ROLES.DIRECTEUR]: '/directeur/bulletins',
      [ROLES.PARENT]: '/parent/children',
    },
  },
  {
    key: 'm5',
    labelKey: 'scolarite_paiements',
    icon: DollarSign,
    paths: {
      [ROLES.ROOT]: '/scolarite/payments',
      [ROLES.FONDATEUR]: '/fondateur/tuitions',
      [ROLES.ADMIN_SCOLARITE]: '/scolarite/payments',
      [ROLES.PARENT]: '/parent/children',
    },
  },
  {
    key: 'm6',
    labelKey: 'communication',
    icon: MessageCircle,
    paths: {
      [ROLES.ROOT]: '/messages/new',
      [ROLES.ADMIN_INSCRIPTIONS]: '/messages/new',
      [ROLES.ADMIN_SCOLARITE]: '/messages/new',
      [ROLES.ENSEIGNANT]: '/messages/new',
      [ROLES.DIRECTEUR]: '/directeur/messages',
      [ROLES.PARENT]: '/parent/announcements',
    },
  },
  {
    key: 'm7',
    labelKey: 'discipline',
    icon: ShieldCheck,
    paths: {
      [ROLES.ROOT]: '/root/refs',
      [ROLES.ENSEIGNANT]: '/teacher/discipline',
      [ROLES.DIRECTEUR]: '/directeur/discipline',
    },
  },
  {
    key: 'm8',
    labelKey: 'documents',
    icon: FileText,
    paths: {
      [ROLES.ROOT]: '/root/library',
      [ROLES.ADMIN_INSCRIPTIONS]: '/library',
      [ROLES.ENSEIGNANT]: '/library',
      [ROLES.ADMINISTRATIF]: '/library',
      [ROLES.PARENT]: '/parent/library',
    },
  },
  {
    key: 'm9',
    labelKey: 'reporting',
    icon: BarChart2,
    paths: {
      [ROLES.ROOT]: '/fondateur/balance',
      [ROLES.FONDATEUR]: '/fondateur/balance',
      [ROLES.DIRECTEUR]: '/directeur/perf/classes',
      [ROLES.ADMIN_SCOLARITE]: '/scolarite/reports',
      [ROLES.ADMIN_AUDITEUR]: '/auditeur/finance',
    },
  },
  {
    key: 'm10',
    labelKey: 'audit_securite',
    icon: ScrollText,
    paths: {
      [ROLES.ROOT]: '/root/audit',
      [ROLES.ADMIN_AUDITEUR]: '/auditeur/dashboard',
    },
  },
];

const VISIBLE_BY_ROLE: Record<Role, number[]> = {
  [ROLES.ROOT]: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  [ROLES.ADMIN_INSCRIPTIONS]: [0, 2, 4, 6],
  [ROLES.DIRECTEUR]: [0, 1, 2, 3, 4, 5, 7],
  [ROLES.ENSEIGNANT]: [1, 2, 3, 4, 5, 6],
  [ROLES.PARENT]: [1, 2, 3, 4, 6],
  [ROLES.ADMIN_SCOLARITE]: [0, 1, 3, 4, 7],
  [ROLES.FONDATEUR]: [3, 7],
  [ROLES.ADMIN_AUDITEUR]: [7, 8],
  [ROLES.ADMINISTRATIF]: [0, 6],
};

export interface ModuleNavItem {
  key: string;
  labelKey: string;
  icon: LucideIcon;
  to: string | null;
}

export function moduleNav(role: Role): ModuleNavItem[] {
  return VISIBLE_BY_ROLE[role].map((i) => {
    const m = MODULES[i];
    return { key: m.key, labelKey: m.labelKey, icon: m.icon, to: m.paths?.[role] ?? null };
  });
}
