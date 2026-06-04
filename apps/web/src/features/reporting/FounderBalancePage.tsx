import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { KpiCard } from '@/shared/components/ui';
import { formatMoney } from '@/shared/lib/format';
import { ChartCard, BarChartCard, LineChartCard, ExportButton } from './components/charts';
import { annualBalance, revenueTrend } from './mockData';

export function FounderBalancePage() {
  const current = annualBalance[annualBalance.length - 1];
  const result = current.revenue - current.expenses;

  return (
    <div className="max-w-4xl space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">Bilans annuels</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">Vue financiere consolidee - {current.year}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard icon={TrendingUp} color="#22A05E" bg="#D1FAE5" value={formatMoney(current.revenue)} label="Recettes" />
        <KpiCard icon={TrendingDown} color="#DC2626" bg="#FEF2F2" value={formatMoney(current.expenses)} label="Depenses" />
        <KpiCard icon={Wallet} color="#7B2D9E" bg="#F0DCFA" value={formatMoney(result)} label="Resultat net" />
      </div>

      <ChartCard
        title="Recettes vs depenses par annee"
        action={<ExportButton rows={annualBalance} filename="bilans-annuels.csv" />}
      >
        <BarChartCard data={annualBalance as never} xKey="year" yKey="revenue" color="#22A05E" formatter={formatMoney} />
      </ChartCard>

      <ChartCard title="Evolution des recettes mensuelles" subtitle="Annee en cours">
        <LineChartCard data={revenueTrend as never} xKey="month" yKey="amount" formatter={formatMoney} />
      </ChartCard>
    </div>
  );
}
