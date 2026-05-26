export const ROLES = {
  ROOT: 'ROOT',
  ADMIN_INSCRIPTIONS: 'ADMIN_INSCRIPTIONS',
  FONDATEUR: 'FONDATEUR',
  DIRECTEUR: 'DIRECTEUR',
  ADMIN_SCOLARITE: 'ADMIN_SCOLARITE',
  ADMIN_AUDITEUR: 'ADMIN_AUDITEUR',
  ENSEIGNANT: 'ENSEIGNANT',
  ADMINISTRATIF: 'ADMINISTRATIF',
  PARENT: 'PARENT',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ADMIN_TYPE_TO_ROLE: Record<number, Role> = {
  0: ROLES.ROOT,
  1: ROLES.ADMIN_INSCRIPTIONS,
  2: ROLES.FONDATEUR,
  3: ROLES.DIRECTEUR,
  4: ROLES.ADMIN_SCOLARITE,
  5: ROLES.ADMIN_AUDITEUR,
};

export const PERSONNE_TYPE_TO_ROLE: Record<number, Role> = {
  1: ROLES.ENSEIGNANT,
  2: ROLES.ADMINISTRATIF,
  4: ROLES.PARENT,
};

export const ROLE_DASHBOARD: Record<Role, string> = {
  [ROLES.ROOT]: '/root/dashboard',
  [ROLES.ADMIN_INSCRIPTIONS]: '/admin/dashboard',
  [ROLES.FONDATEUR]: '/fondateur/dashboard',
  [ROLES.DIRECTEUR]: '/directeur/dashboard',
  [ROLES.ADMIN_SCOLARITE]: '/scolarite/dashboard',
  [ROLES.ADMIN_AUDITEUR]: '/auditeur/dashboard',
  [ROLES.ENSEIGNANT]: '/teacher/dashboard',
  [ROLES.ADMINISTRATIF]: '/staff/dashboard',
  [ROLES.PARENT]: '/parent/dashboard',
};

export const ROLE_LABELS: Record<Role, string> = {
  [ROLES.ROOT]: 'Root',
  [ROLES.ADMIN_INSCRIPTIONS]: 'Admin Inscriptions',
  [ROLES.FONDATEUR]: 'Fondateur',
  [ROLES.DIRECTEUR]: 'Directeur',
  [ROLES.ADMIN_SCOLARITE]: 'Admin Scolarité',
  [ROLES.ADMIN_AUDITEUR]: 'Admin Auditeur',
  [ROLES.ENSEIGNANT]: 'Enseignant',
  [ROLES.ADMINISTRATIF]: 'Administratif',
  [ROLES.PARENT]: 'Parent',
};
