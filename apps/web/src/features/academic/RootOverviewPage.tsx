import { Link } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  CalendarRange,
  Clock,
  BookOpen,
  UserCog,
  GitBranch,
  FileSearch,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { RootSubNav } from '@/app/components/RootSubNav';
import { Card, SectionTitle, KpiCard } from '@/shared/components/ui';
import { dateTime } from '@/shared/lib/format';
import { MOCK_CLASSES, MOCK_YEARS, MOCK_AUDIT, type AuditType } from './mockData';
import { MOCK_ADMINS } from '@/features/accounts/mockData';
import { MOCK_STUDENTS } from '@/features/students/mockData';

const AUDIT_DOT: Record<AuditType, string> = {
  create: '#22A05E',
  update: '#1081F3',
  delete: '#DC2626',
  login: '#7B2D9E',
  security: '#D97706',
};

const SHORTCUTS: { label: string; desc: string; to: string; icon: LucideIcon; color: string; bg: string }[] = [
  { label: 'Comptes admin', desc: 'Gerer les utilisateurs systeme', to: '/root/admins', icon: UserCog, color: '#7B2D9E', bg: '#F0DCFA' },
  { label: 'Personnel', desc: 'Enseignants & agents admin', to: '/root/personnel', icon: Users, color: '#1081F3', bg: '#EFF4FF' },
  { label: 'Cycles scolaires', desc: 'Maternelle, Primaire', to: '/root/cycles', icon: GitBranch, color: '#22A05E', bg: '#D1FAE5' },
  { label: 'Classes', desc: 'Toutes les salles de classe', to: '/root/classes', icon: BookOpen, color: '#AD56C4', bg: '#F0DCFA' },
  { label: 'Annees scolaires', desc: 'Configurer les annees', to: '/root/years', icon: CalendarRange, color: '#D97706', bg: '#FEF3C7' },
  { label: 'Trimestres', desc: 'Periodes par annee', to: '/root/terms', icon: Clock, color: '#0EA5E9', bg: '#E0F2FE' },
  { label: "Journal d'audit", desc: 'Tracabilite des actions', to: '/root/audit', icon: FileSearch, color: '#DC2626', bg: '#FEF2F2' },
  { label: 'Inscriptions', desc: 'Gerer les dossiers eleves', to: '/admin/students', icon: GraduationCap, color: '#22A05E', bg: '#D1FAE5' },
];

export function RootOverviewPage() {
  const activeYear = MOCK_YEARS.find((y) => y.active);
  const activeAdmins = MOCK_ADMINS.filter((a) => a.status === 'active').length;
  const enrolled = MOCK_STUDENTS.filter((s) => s.status === 'enrolled').length;
  const activeClasses = MOCK_CLASSES.filter((c) => c.status === 'active').length;

  const stats = [
    { label: 'Comptes admin actifs', value: String(activeAdmins), sub: `sur ${MOCK_ADMINS.length} comptes`, icon: UserCog, color: '#7B2D9E', bg: '#F0DCFA' },
    { label: 'Eleves inscrits', value: String(enrolled), sub: 'Annee 2025-2026', icon: Users, color: '#1081F3', bg: '#EFF4FF' },
    { label: 'Classes actives', value: String(activeClasses), sub: '2 cycles', icon: BookOpen, color: '#22A05E', bg: '#D1FAE5' },
    { label: 'Annee active', value: activeYear?.label ?? '', sub: activeYear ? 'En cours' : 'Non definie', icon: CalendarRange, color: '#D97706', bg: '#FEF3C7' },
  ];

  return (
    <div className="max-w-5xl space-y-5">
      <RootSubNav />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <KpiCard key={s.label} icon={s.icon} color={s.color} bg={s.bg} value={s.value} label={s.label} sub={s.sub} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <SectionTitle className="mb-4">Acces rapide</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            {SHORTCUTS.map((s) => (
              <Link
                key={s.label}
                to={s.to}
                className="group flex items-center gap-2.5 rounded-xl p-3 transition-colors hover:bg-brand-50"
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: s.bg, color: s.color }}
                >
                  <s.icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-ink">{s.label}</p>
                  <p className="truncate text-xs font-semibold text-ink-faint">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <SectionTitle>Journal d'audit (recent)</SectionTitle>
            <Link to="/root/audit" className="flex items-center gap-1 text-xs font-bold text-brand-500 hover:underline">
              Voir tout <ArrowRight size={11} />
            </Link>
          </div>
          <div className="space-y-3">
            {MOCK_AUDIT.slice(0, 6).map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: AUDIT_DOT[a.type] }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-ink">
                    <span className="font-bold">{a.user}</span>  {a.action}
                  </p>
                  <p className="mt-0.5 truncate text-xs font-semibold text-ink-faint">
                    {a.target} - {dateTime(a.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
