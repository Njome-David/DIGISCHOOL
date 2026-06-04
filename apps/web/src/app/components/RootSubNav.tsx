import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCog,
  Users,
  Contact,
  KeyRound,
  GitBranch,
  BookOpen,
  DoorOpen,
  CalendarRange,
  Clock,
  ListChecks,
  FileSearch,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/shared/components/ui';

const TABS: { label: string; to: string; icon: LucideIcon; end?: boolean }[] = [
  { label: "Vue d'ensemble", to: '/root/dashboard', icon: LayoutDashboard, end: true },
  { label: 'Comptes admin', to: '/root/admins', icon: UserCog },
  { label: 'Personnel', to: '/root/personnel', icon: Users },
  { label: 'Parents', to: '/root/parents', icon: Contact },
  { label: 'Codes', to: '/root/credentials', icon: KeyRound },
  { label: 'Cycles', to: '/root/cycles', icon: GitBranch },
  { label: 'Classes', to: '/root/classes', icon: BookOpen },
  { label: 'Salles', to: '/root/salles', icon: DoorOpen },
  { label: 'Annees scolaires', to: '/root/years', icon: CalendarRange },
  { label: 'Trimestres', to: '/root/terms', icon: Clock },
  { label: 'Referentiels', to: '/root/refs', icon: ListChecks },
  { label: "Journal d'audit", to: '/root/audit', icon: FileSearch },
];

export function RootSubNav() {
  return (
    <div className="-mx-1 mb-1 overflow-x-auto">
      <div className="flex w-max min-w-full gap-1 rounded-2xl bg-muted p-1">
        {TABS.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-bold transition-all',
                isActive ? 'bg-white text-brand-700 shadow-sm' : 'text-brand-600 hover:bg-white/50 hover:text-brand-700'
              )
            }
          >
            <t.icon size={14} />
            {t.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
