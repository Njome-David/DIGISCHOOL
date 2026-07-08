import { Wallet, TrendingUp, Percent } from 'lucide-react';
import { KpiCard } from '@/shared/components/ui';
import { formatMoney } from '@/shared/lib/format';
import { ChartCard, LineChartCard, DonutChartCard, ExportButton } from './components/charts';
import { revenueTrend, revenueByMode } from './mockData';
import { allStudentStates } from '@/features/payments/mockData';
import { useTranslation } from "react-i18next";

export function ScolariteReportsPage() {
    const { t } = useTranslation();
  const states = allStudentStates();
  const expected = states.reduce((s, st) => s + st.total, 0);
  const collected = states.reduce((s, st) => s + st.paid, 0);
  const rate = expected ? Math.round((collected / expected) * 100) : 0;

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">{t('recapitulatif_financier')}</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">{t('synthese_des_encaissements_de')}</p>
        </div>
        <ExportButton rows={revenueByMode()} filename="recap-financier.csv" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard icon={Wallet} color="#22A05E" bg="#D1FAE5" value={formatMoney(collected)} label={t('encaisse')} />
        <KpiCard icon={TrendingUp} color="#7B2D9E" bg="#F0DCFA" value={formatMoney(expected)} label={t('attendu')} />
        <KpiCard icon={Percent} color="#D97706" bg="#FEF3C7" value={`${rate}%`} label={t('taux_de_recouvrement')} />
      </div>

      <ChartCard title={t('recettes_mensuelles')}>
        <LineChartCard data={revenueTrend as never} xKey="month" yKey="amount" color="#22A05E" formatter={formatMoney} />
      </ChartCard>

      <ChartCard title={t('repartition_par_mode_de_paieme')}>
        <DonutChartCard data={revenueByMode()} formatter={formatMoney} />
      </ChartCard>
    </div>
  );
}
