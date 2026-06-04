import { Card } from '@/shared/components/ui';
import { formatMoney } from '@/shared/lib/format';
import { ChartCard, BarChartCard, DonutChartCard, ExportButton } from './components/charts';
import { revenueByMode } from './mockData';

export function ScolariteByModePage() {
  const data = revenueByMode();
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">Statistiques par mode de paiement</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">Total encaisse : {formatMoney(total)}</p>
        </div>
        <ExportButton rows={data} filename="paiements-par-mode.csv" />
      </div>

      <ChartCard title="Montant par mode">
        <BarChartCard data={data as never} xKey="name" yKey="value" color="#1081F3" formatter={formatMoney} />
      </ChartCard>

      <ChartCard title="Repartition">
        <DonutChartCard data={data} formatter={formatMoney} />
      </ChartCard>

      <Card>
        <div className="divide-y divide-line-soft">
          {data.map((d) => (
            <div key={d.name} className="flex items-center justify-between py-2.5">
              <span className="text-sm font-bold text-ink">{d.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-ink-soft">
                  {total ? Math.round((d.value / total) * 100) : 0}%
                </span>
                <span className="text-sm font-black text-ink">{formatMoney(d.value)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
