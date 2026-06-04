import { ROLES, type Role } from '@ecole/shared';

/** Couleur d'avatar + pastille (badge) par role, sur la charte DIGISCHOOL. */
export const ROLE_META: Record<Role, { color: string; badgeBg: string; badgeText: string }> = {
  [ROLES.ROOT]: { color: '#7B2D9E', badgeBg: '#F0DCFA', badgeText: '#7B2D9E' },
  [ROLES.ADMIN_INSCRIPTIONS]: { color: '#1081F3', badgeBg: '#EFF4FF', badgeText: '#1081F3' },
  [ROLES.ADMINISTRATIF]: { color: '#D97706', badgeBg: '#FEF3C7', badgeText: '#D97706' },
  [ROLES.ADMIN_SCOLARITE]: { color: '#22A05E', badgeBg: '#D1FAE5', badgeText: '#22A05E' },
  [ROLES.FONDATEUR]: { color: '#7B2D9E', badgeBg: '#F0DCFA', badgeText: '#7B2D9E' },
  [ROLES.DIRECTEUR]: { color: '#AD56C4', badgeBg: '#F0DCFA', badgeText: '#AD56C4' },
  [ROLES.ADMIN_AUDITEUR]: { color: '#DC2626', badgeBg: '#FEF2F2', badgeText: '#DC2626' },
  [ROLES.ENSEIGNANT]: { color: '#0EA5E9', badgeBg: '#E0F2FE', badgeText: '#0EA5E9' },
  [ROLES.PARENT]: { color: '#9B8AAE', badgeBg: '#F3F4F6', badgeText: '#7D6B90' },
};

/** Segment d'URL du role (derive du dashboard)  ex. ROOT -> "root". */
export function rolePrefix(role: Role, dashboard: string): string {
  return dashboard.split('/')[1] || role.toLowerCase();
}

/** Palette stable d'avatars pour les entites sans role (eleves, expediteurs). */
export const AVATAR_PALETTE = ['#7B2D9E', '#1081F3', '#22A05E', '#D97706', '#AD56C4', '#DC2626'];

export function avatarColor(seed: string): string {
  const code = seed.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_PALETTE[code % AVATAR_PALETTE.length];
}

export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((n) => n[0] ?? '')
    .slice(0, 2)
    .join('')
    .toUpperCase();
}
