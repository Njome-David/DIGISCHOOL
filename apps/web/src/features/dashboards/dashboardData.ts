import {
  Users,
  BookOpen,
  DollarSign,
  MessageSquare,
  TrendingUp,
  Clock,
  Bell,
  type LucideIcon,
} from 'lucide-react';
import { ROLES, type Role } from '@ecole/shared';

export interface Kpi {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export interface Activity {
  id: string;
  text: string;
  time: string;
  dot: string;
}

export interface DashboardData {
  welcome: string;
  kpis: Kpi[];
  activities: Activity[];
}

const DATA: Partial<Record<Role, DashboardData>> = {
  [ROLES.DIRECTEUR]: {
    welcome: 'Synthese pedagogique',
    kpis: [
      { label: 'Moyenne generale', value: '13,4/20', sub: '1er trimestre', icon: TrendingUp, color: '#22A05E', bg: '#D1FAE5' },
      { label: 'Taux de reussite', value: '78%', sub: '+3% vs dernier', icon: BookOpen, color: '#1081F3', bg: '#EFF4FF' },
      { label: 'Bulletins a valider', value: '5', sub: 'En attente', icon: Clock, color: '#D97706', bg: '#FEF3C7' },
      { label: 'Messages a valider', value: '2', sub: 'Collectifs', icon: MessageSquare, color: '#7B2D9E', bg: '#F0DCFA' },
    ],
    activities: [
      { id: '1', text: 'Bulletin CM2-A soumis pour validation', time: 'Il y a 30 min', dot: '#1081F3' },
      { id: '2', text: 'Performance Maths CE1 : +5% ce trimestre', time: '09:15', dot: '#22A05E' },
      { id: '3', text: 'Rapport disciplinaire grave  seuil depasse', time: '08:45', dot: '#DC2626' },
    ],
  },
  [ROLES.ENSEIGNANT]: {
    welcome: 'Mes cours et classes',
    kpis: [
      { label: 'Mes classes', value: '3', sub: 'CE1, CE2, CM1', icon: BookOpen, color: '#7B2D9E', bg: '#F0DCFA' },
      { label: 'Notes a saisir', value: '18', sub: 'Epreuves en attente', icon: Clock, color: '#D97706', bg: '#FEF3C7' },
      { label: 'Mes eleves', value: '87', sub: '3 classes', icon: Users, color: '#1081F3', bg: '#EFF4FF' },
      { label: 'Messages recus', value: '4', sub: 'Non lus', icon: MessageSquare, color: '#22A05E', bg: '#D1FAE5' },
    ],
    activities: [
      { id: '1', text: 'Epreuve Maths CE1  notes a saisir', time: "Aujourd'hui", dot: '#D97706' },
      { id: '2', text: 'Message recu de la direction', time: 'Il y a 2 h', dot: '#1081F3' },
      { id: '3', text: 'Devoir CE2 corrige televerse', time: 'Hier 16:30', dot: '#22A05E' },
    ],
  },
  [ROLES.PARENT]: {
    welcome: 'Tableau de bord parent',
    kpis: [
      { label: 'Enfant(s) suivi(s)', value: '2', sub: 'CE1 & CP', icon: Users, color: '#7B2D9E', bg: '#F0DCFA' },
      { label: 'Derniere moyenne', value: '14,2/20', sub: 'Thomas  T1', icon: TrendingUp, color: '#22A05E', bg: '#D1FAE5' },
      { label: 'Paiement en attente', value: '1', sub: '45 000 XAF', icon: DollarSign, color: '#DC2626', bg: '#FEF2F2' },
      { label: 'Messages non lus', value: '2', sub: "De l'ecole", icon: MessageSquare, color: '#1081F3', bg: '#EFF4FF' },
    ],
    activities: [
      { id: '1', text: 'Bulletin de Thomas disponible', time: 'Il y a 1 h', dot: '#22A05E' },
      { id: '2', text: 'Rappel paiement  Tranche 2 en retard', time: "Aujourd'hui", dot: '#DC2626' },
      { id: '3', text: 'Annonce : Reunion parents 05/06 a 15h30', time: 'Hier', dot: '#1081F3' },
    ],
  },
  [ROLES.ADMIN_SCOLARITE]: {
    welcome: 'Suivi financier',
    kpis: [
      { label: 'Recettes du jour', value: '285 000 XAF', sub: '12 paiements', icon: DollarSign, color: '#22A05E', bg: '#D1FAE5' },
      { label: 'Eleves en retard', value: '34', sub: 'Tranche 2', icon: Clock, color: '#DC2626', bg: '#FEF2F2' },
      { label: 'Taux recouvrement', value: '71%', sub: 'Objectif 90%', icon: TrendingUp, color: '#D97706', bg: '#FEF3C7' },
      { label: 'Relances envoyees', value: '18', sub: 'Ce mois', icon: MessageSquare, color: '#7B2D9E', bg: '#F0DCFA' },
    ],
    activities: [
      { id: '1', text: 'Paiement enregistre : Mbida Paul  45 000 XAF', time: 'Il y a 15 min', dot: '#22A05E' },
      { id: '2', text: '34 eleves en retard sur la tranche 2', time: '09:00', dot: '#DC2626' },
      { id: '3', text: 'Relances envoyees en masse (18 parents)', time: 'Hier 14:00', dot: '#1081F3' },
    ],
  },
};

const FALLBACK: DashboardData = {
  welcome: 'Bienvenue sur EcoleApp 2026',
  kpis: [
    { label: 'Messages non lus', value: '3', icon: MessageSquare, color: '#AD56C4', bg: '#F0DCFA' },
    { label: 'Notifications', value: '5', icon: Bell, color: '#1081F3', bg: '#EFF4FF' },
  ],
  activities: [{ id: '1', text: 'Bienvenue dans EcoleApp 2026', time: 'Maintenant', dot: '#AD56C4' }],
};

export function dashboardFor(role: Role): DashboardData {
  return DATA[role] ?? FALLBACK;
}
