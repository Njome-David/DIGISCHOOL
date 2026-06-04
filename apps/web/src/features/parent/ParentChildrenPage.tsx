import { Link } from 'react-router-dom';
import { GraduationCap, FileText, FileCheck2, ClipboardList, Wallet, ShieldAlert, CalendarClock, ChevronRight } from 'lucide-react';
import { Card, Avatar, Badge, EmptyState } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { ageFrom } from '@/shared/lib/format';
import { useAuthStore } from '@/features/auth/store';
import { childrenForParent } from '@/features/students/mockData';

const LINKS = [
  { label: 'Notes', to: 'grades', icon: FileText },
  { label: 'Bulletins', to: 'bulletins', icon: FileCheck2 },
  { label: 'Emploi du temps', to: 'schedule', icon: CalendarClock },
  { label: 'Epreuves & devoirs', to: 'exams', icon: ClipboardList },
  { label: 'Scolarite', to: 'payments', icon: Wallet },
  { label: 'Discipline', to: 'discipline', icon: ShieldAlert },
];

export function ParentChildrenPage() {
  const user = useAuthStore((s) => s.user);
  const children = childrenForParent(user?.nom);

  return (
    <div className="max-w-3xl space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">Mes enfants</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">
          {children.length} enfant{children.length > 1 ? 's' : ''} rattache{children.length > 1 ? 's' : ''} a votre compte
        </p>
      </div>

      {children.length === 0 ? (
        <div className="surface">
          <EmptyState icon={GraduationCap} message="Aucun enfant rattache a votre compte." />
        </div>
      ) : (
        <div className="space-y-3">
          {children.map((child) => (
            <Card key={child.matricule}>
              <Link to={`/parent/children/${child.matricule}`} className="group flex items-center gap-3">
                <Avatar
                  name={`${child.firstName} ${child.lastName}`}
                  seed={child.matricule}
                  color={avatarColor(child.matricule)}
                  size={48}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-black text-ink group-hover:text-brand-700">
                    {child.firstName} {child.lastName}
                  </h3>
                  <p className="text-xs font-semibold text-ink-soft">
                    {ageFrom(child.dateOfBirth)} ans - Matricule {child.matricule}
                  </p>
                </div>
                <Badge tone="brand">{child.classCode}</Badge>
              </Link>

              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                {LINKS.map((l) => (
                  <Link
                    key={l.to}
                    to={`/parent/children/${child.matricule}/${l.to}`}
                    className="group flex flex-col items-center gap-1.5 rounded-xl bg-canvas p-3 text-center transition-colors hover:bg-brand-50"
                  >
                    <l.icon size={18} className="text-brand-500" />
                    <span className="text-xs font-bold text-ink-soft group-hover:text-brand-700">{l.label}</span>
                    <ChevronRight size={12} className="text-ink-faint" />
                  </Link>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
