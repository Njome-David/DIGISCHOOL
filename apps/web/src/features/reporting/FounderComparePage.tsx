import { Card, Badge } from '@/shared/components/ui';
import { ChartCard, BarChartCard, ExportButton } from './components/charts';
import { yearComparison } from './mockData';

export function FounderComparePage() {
  const chartData = yearComparison.map((y) => ({ metric: y.metric, '2024-2025': y.y2024, '2025-2026': y.y2025 }));

  return (
    <div className="max-w-4xl space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">Comparaison inter-annees</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">2024-2025 vs 2025-2026</p>
      </div>

      <ChartCard
        title="Indicateurs cles"
        action={<ExportButton rows={yearComparison} filename="comparaison-annees.csv" />}
      >
        <BarChartCard data={chartData as never} xKey="metric" yKey="2025-2026" color="#7B2D9E" />
      </ChartCard>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-line-soft">
                <th className="px-2 py-2 text-left text-xs font-black text-ink-soft">Indicateur</th>
                <th className="px-2 py-2 text-center text-xs font-black text-ink-soft">2024-2025</th>
                <th className="px-2 py-2 text-center text-xs font-black text-ink-soft">2025-2026</th>
                <th className="px-2 py-2 text-center text-xs font-black text-ink-soft">Evolution</th>
              </tr>
            </thead>
            <tbody>
              {yearComparison.map((y, i) => {
                const delta = y.y2025 - y.y2024;
                return (
                  <tr key={y.metric} style={{ borderBottom: i < yearComparison.length - 1 ? '1px solid #EDE5F8' : 'none' }}>
                    <td className="px-2 py-2.5 text-sm font-bold text-ink">{y.metric}</td>
                    <td className="px-2 py-2.5 text-center text-sm font-semibold text-ink-soft">{y.y2024}</td>
                    <td className="px-2 py-2.5 text-center text-sm font-black text-ink">{y.y2025}</td>
                    <td className="px-2 py-2.5 text-center">
                      <Badge tone={delta >= 0 ? 'success' : 'danger'}>
                        {delta >= 0 ? '+' : ''}
                        {delta}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
