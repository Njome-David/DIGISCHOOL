import { Link } from 'react-router-dom';
import { AlertTriangle, Send, ChevronRight, CheckCircle } from 'lucide-react';
import { Card, Button, Avatar, Badge, EmptyState } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { formatMoney } from '@/shared/lib/format';
import { overdueStudents } from './mockData';
import { useTranslation } from "react-i18next";

export function OverduePage() {
    const { t } = useTranslation();
  const list = overdueStudents();
  const totalDue = list.reduce((s, st) => s + st.balance, 0);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">{t('eleves_en_retard')}</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">
            {list.length} {t('eleves')}{formatMoney(totalDue)} {t('a_recouvrer')}</p>
        </div>
        {list.length > 0 && (
          <Link to="/scolarite/reminders">
            <Button>
              <Send size={15} /> {t('envoyer_des_relances')}</Button>
          </Link>
        )}
      </div>

      {list.length === 0 ? (
        <div className="surface">
          <EmptyState icon={CheckCircle} message="Aucun eleve en retard. Tout est a jour." />
        </div>
      ) : (
        <div className="surface divide-y divide-line-soft">
          {list.map((st) => {
            const lateTranches = st.trancheStates.filter((t) => t.overdue).length;
            return (
              <Link
                key={st.matricule}
                to={`/scolarite/students/${st.matricule}`}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-canvas"
              >
                <Avatar name={st.studentName} color={avatarColor(st.matricule)} size={34} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-ink">{st.studentName}</p>
                  <p className="flex items-center gap-1 text-xs font-semibold text-danger">
                    <AlertTriangle size={11} /> {lateTranches} {t('tranche')}{lateTranches > 1 ? 's' : ''} {t('en_retard')}{st.classCode}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-danger">{formatMoney(st.balance)}</p>
                  <p className="text-xs font-semibold text-ink-faint">{t('solde')}</p>
                </div>
                <Badge tone="neutral" className="hidden sm:inline-flex">
                  {Math.round((st.paid / st.total) * 100)}{t('regle')}</Badge>
                <ChevronRight size={16} className="shrink-0 text-ink-faint" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
