import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { ProgressBar, Badge } from '@/shared/components/ui';
import { formatMoney, dateShort } from '@/shared/lib/format';
import type { StudentPaymentState } from '../mockData';
import { useTranslation } from "react-i18next";

export function PaymentStateView({ state }: { state: StudentPaymentState }) {
    const { t } = useTranslation();
  const pct = state.total ? Math.round((state.paid / state.total) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="surface p-4">
          <p className="text-xs font-bold text-ink-soft">{t('total_scolarite')}</p>
          <p className="mt-1 text-lg font-black text-ink">{formatMoney(state.total)}</p>
        </div>
        <div className="surface p-4">
          <p className="text-xs font-bold text-ink-soft">{t('regle')}</p>
          <p className="mt-1 text-lg font-black text-success">{formatMoney(state.paid)}</p>
        </div>
        <div className="surface p-4">
          <p className="text-xs font-bold text-ink-soft">{t('solde_restant')}</p>
          <p className="mt-1 text-lg font-black" style={{ color: state.balance > 0 ? '#DC2626' : '#22A05E' }}>
            {formatMoney(state.balance)}
          </p>
        </div>
      </div>

      <div className="surface p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold text-ink-soft">{t('progression')}</span>
          <span className="text-xs font-black text-ink">{pct}%</span>
        </div>
        <ProgressBar value={pct} color={state.balance > 0 ? '#D97706' : '#22A05E'} />
      </div>

      <div className="surface overflow-hidden">
        <div className="border-b border-line-soft px-4 py-3">
          <h3 className="text-sm font-black text-ink">{t('tranches')}</h3>
        </div>
        <div className="divide-y divide-line-soft">
          {state.trancheStates.map((ts) => {
            const tone = ts.covered ? 'success' : ts.overdue ? 'danger' : 'warning';
            const Icon = ts.covered ? CheckCircle : ts.overdue ? AlertTriangle : Clock;
            const label = ts.covered ? 'Reglee' : ts.overdue ? 'En retard' : 'A venir';
            return (
              <div key={ts.tranche.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-canvas text-ink-soft">
                  <Icon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-ink">{ts.tranche.label}</p>
                  <p className="text-xs font-semibold text-ink-soft">{t('echeance')}{dateShort(ts.tranche.dueDate)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-ink">{formatMoney(ts.tranche.amount)}</p>
                  {!ts.covered && ts.paid > 0 && (
                    <p className="text-xs font-semibold text-ink-soft">{t('regle')}{formatMoney(ts.paid)}</p>
                  )}
                </div>
                <Badge tone={tone}>{label}</Badge>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
