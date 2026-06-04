import { Wallet, TrendingUp, Percent, Eye } from 'lucide-react';
import { KpiCard } from '@/shared/components/ui';
import { Alert } from '@/shared/components/form';
import { formatMoney } from '@/shared/lib/format';
import { ChartCard, LineChartCard, BarChartCard, DonutChartCard } from './components/charts';
import { revenueTrend, revenueByMode, annualBalance } from './mockData';
import { allStudentStates } from '@/features/payments/mockData';

export function AuditorFinancePage() {
  const states = allStudentStates();
  const expected = states.reduce((s, st) => s + st.total, 0);
  const collected = states.reduce((s, st) => s + st.paid, 0);
  const rate = expected ? Math.round((collected / expected) * 100) : 0;

  return (
    <div className="max-w-4xl space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">Statistiques financieres</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">Controle des flux financiers</p>
      </div>

      <Alert tone="info" icon={Eye}>
        Vue auditeur : consultation des indicateurs financiers sans droit de modification.
      </Alert>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard icon={Wallet} color="#22A05E" bg="#D1FAE5" value={formatMoney(collected)} label="Encaisse" />
        <KpiCard icon={TrendingUp} color="#7B2D9E" bg="#F0DCFA" value={formatMoney(expected)} label="Attendu" />
        <KpiCard icon={Percent} color="#D97706" bg="#FEF3C7" value={`${rate}%`} label="Recouvrement" />
      </div>

      <ChartCard title="Recettes mensuelles">
        <LineChartCard data={revenueTrend as never} xKey="month" yKey="amount" color="#22A05E" formatter={formatMoney} />
      </ChartCard>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Recettes vs depenses">
          <BarChartCard data={annualBalance as never} xKey="year" yKey="revenue" color="#1081F3" formatter={formatMoney} height={200} />
        </ChartCard>
        <ChartCard title="Par mode de paiement">
          <DonutChartCard data={revenueByMode()} formatter={formatMoney} height={200} />
        </ChartCard>
      </div>
    </div>
  );
}
