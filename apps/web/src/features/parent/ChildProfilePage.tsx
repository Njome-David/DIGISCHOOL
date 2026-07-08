import { Link, useParams } from 'react-router-dom';
import {
  GraduationCap,
  FileText,
  FileCheck2,
  ClipboardList,
  Wallet,
  ShieldAlert,
  CalendarClock,
  Receipt,
  ChevronRight,
  Cake,
  Flag,
  Phone,
} from 'lucide-react';
import { Card, Avatar, Badge, EmptyState, KpiCard } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { ageFrom, formatMoney } from '@/shared/lib/format';
import { findStudent } from '@/features/students/mockData';
import { bulletinsForStudent } from '@/features/evaluations/mockData';
import { getStudentState } from '@/features/payments/mockData';
import { studentPoints } from '@/features/discipline/mockData';
import { useTranslation } from "react-i18next";

const LINKS = [
  { label: 'Notes', to: 'grades', icon: FileText },
  { label: 'Bulletins', to: 'bulletins', icon: FileCheck2 },
  { label: 'Emploi du temps', to: 'schedule', icon: CalendarClock },
  { label: 'Epreuves & devoirs', to: 'exams', icon: ClipboardList },
  { label: 'Scolarite', to: 'payments', icon: Wallet },
  { label: 'Recus', to: 'receipts', icon: Receipt },
  { label: 'Discipline', to: 'discipline', icon: ShieldAlert },
];

export function ChildProfilePage() {
    const { t } = useTranslation();
  const { matricule } = useParams<{ matricule: string }>();
  const child = matricule ? findStudent(matricule) : undefined;

  if (!child) {
    return (
      <div className="surface w-full">
        <EmptyState icon={GraduationCap} message="Eleve introuvable." />
      </div>
    );
  }

  const bulletins = bulletinsForStudent(child.matricule);
  const lastBulletin = bulletins[bulletins.length - 1];
  const state = getStudentState(child.matricule);
  const points = studentPoints(child.matricule);

  return (
    <div className="w-full space-y-4">
      <Card>
        <div className="flex items-center gap-4">
          <Avatar
            name={`${child.firstName} ${child.lastName}`}
            seed={child.matricule}
            color={avatarColor(child.matricule)}
            size={64}
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-black text-ink">
              {child.firstName} {child.lastName}
            </h2>
            <p className="text-xs font-semibold text-ink-soft">{t('matricule')}{child.matricule}</p>
          </div>
          <Badge tone="brand">{child.classCode}</Badge>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Info icon={Cake} label={t('age')} value={`${ageFrom(child.dateOfBirth)} ans`} />
          <Info icon={Flag} label={t('nationalite')} value={child.nationality} />
          <Info icon={Phone} label={t('contact_parent')} value={child.parentPhone} />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard
          icon={FileCheck2}
          color="#7B2D9E"
          bg="#F0DCFA"
          value={lastBulletin ? `${lastBulletin.generalAverage.toFixed(2)}/20` : '-'}
          label={t('derniere_moyenne')}
        />
        <KpiCard
          icon={Wallet}
          color={state?.overdue ? '#DC2626' : '#22A05E'}
          bg={state?.overdue ? '#FEF2F2' : '#D1FAE5'}
          value={state ? formatMoney(state.balance) : '-'}
          label={state?.overdue ? 'Solde du (en retard)' : 'Solde restant'}
        />
        <KpiCard icon={ShieldAlert} color="#D97706" bg="#FEF3C7" value={points} label={t('points_discipline')} />
      </div>

      <Card>
        <h3 className="mb-3 text-sm font-black text-ink">{t('acces_rapide')}</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
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
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-canvas px-3 py-2.5">
      <Icon size={16} className="shrink-0 text-brand-500" />
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wide text-ink-faint">{label}</p>
        <p className="truncate text-sm font-bold text-ink">{value}</p>
      </div>
    </div>
  );
}
