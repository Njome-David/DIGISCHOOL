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
  label: string;
  to: string;
  icon: LucideIcon;
}

/** Items communs a tous les roles (Module 1). */
export function commonNav(role: Role): NavLinkItem[] {
  return [
    { label: 'Tableau de bord', to: ROLE_DASHBOARD[role], icon: LayoutDashboard },
    { label: 'Mon profil', to: '/profile', icon: User },
    { label: 'Notifications', to: '/notifications', icon: Bell },
    { label: 'Messages', to: '/messages', icon: MessageSquare },
  ];
}

interface ModuleDef {
  key: string;
  label: string;
  icon: LucideIcon;
  /** Chemin d'entree par role. Absent = module verrouille (a venir) pour ce role. */
  paths?: Partial<Record<Role, string>>;
}

/** Les 9 modules metier (M2 ? M10)  ordre du roadmap produit. */
const MODULES: ModuleDef[] = [
  {
    key: 'm2',
    label: 'Gestion academique',
    icon: GraduationCap,
    paths: {
      [ROLES.ROOT]: '/root/dashboard',
      [ROLES.ADMIN_INSCRIPTIONS]: '/admin/students',
      [ROLES.ADMINISTRATIF]: '/staff/files',
    },
  },
  {
    key: 'm3',
    label: 'Gestion pedagogique',
    icon: BookOpen,
    paths: {
      [ROLES.ROOT]: '/root/courses',
      [ROLES.ENSEIGNANT]: '/teacher/classes',
      [ROLES.DIRECTEUR]: '/root/courses',
    },
  },
  {
    key: 'm4',
    label: 'Evaluations & Bulletins',
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
    label: 'Scolarite & Paiements',
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
    label: 'Communication',
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
    label: 'Discipline',
    icon: ShieldCheck,
    paths: {
      [ROLES.ROOT]: '/root/refs',
      [ROLES.ENSEIGNANT]: '/teacher/discipline',
      [ROLES.DIRECTEUR]: '/directeur/discipline',
    },
  },
  {
    key: 'm8',
    label: 'Documents',
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
    label: 'Reporting',
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
    label: 'Audit & Securite',
    icon: ScrollText,
    paths: {
      [ROLES.ROOT]: '/root/audit',
      [ROLES.ADMIN_AUDITEUR]: '/auditeur/dashboard',
    },
  },
];

/** Modules visibles par role (indices dans MODULES)  reflete le perimetre fonctionnel. */
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
  label: string;
  icon: LucideIcon;
  /** Chemin si debloque pour le role, sinon null (verrouille). */
  to: string | null;
}

export function moduleNav(role: Role): ModuleNavItem[] {
  return VISIBLE_BY_ROLE[role].map((i) => {
    const m = MODULES[i];
    return { key: m.key, label: m.label, icon: m.icon, to: m.paths?.[role] ?? null };
  });
}
