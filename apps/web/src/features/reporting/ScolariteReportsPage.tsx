import { Wallet, TrendingUp, Percent } from 'lucide-react';
import { KpiCard } from '@/shared/components/ui';
import { formatMoney } from '@/shared/lib/format';
import { ChartCard, LineChartCard, DonutChartCard, ExportButton } from './components/charts';
import { revenueTrend, revenueByMode } from './mockData';
import { allStudentStates } from '@/features/payments/mockData';

export function ScolariteReportsPage() {
  const states = allStudentStates();
  const expected = states.reduce((s, st) => s + st.total, 0);
  const collected = states.reduce((s, st) => s + st.paid, 0);
  const rate = expected ? Math.round((collected / expected) * 100) : 0;

  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">Recapitulatif financier</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">Synthese des encaissements de scolarite</p>
        </div>
        <ExportButton rows={revenueByMode()} filename="recap-financier.csv" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard icon={Wallet} color="#22A05E" bg="#D1FAE5" value={formatMoney(collected)} label="Encaisse" />
        <KpiCard icon={TrendingUp} color="#7B2D9E" bg="#F0DCFA" value={formatMoney(expected)} label="Attendu" />
        <KpiCard icon={Percent} color="#D97706" bg="#FEF3C7" value={`${rate}%`} label="Taux de recouvrement" />
      </div>

      <ChartCard title="Recettes mensuelles">
        <LineChartCard data={revenueTrend as never} xKey="month" yKey="amount" color="#22A05E" formatter={formatMoney} />
      </ChartCard>

      <ChartCard title="Repartition par mode de paiement">
        <DonutChartCard data={revenueByMode()} formatter={formatMoney} />
      </ChartCard>
    </div>
  );
}
