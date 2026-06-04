import { NavLink } from 'react-router-dom';
import { BookOpen, CalendarClock, type LucideIcon } from 'lucide-react';
import { cn } from '@/shared/components/ui';

const TABS: { label: string; to: string; icon: LucideIcon; end?: boolean }[] = [
  { label: 'Cours', to: '/root/courses', icon: BookOpen },
  { label: 'Emploi du temps', to: '/root/schedule', icon: CalendarClock },
];

export function PedagogySubNav() {
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
