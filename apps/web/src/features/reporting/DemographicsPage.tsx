import { ChartCard, BarChartCard, DonutChartCard, ExportButton } from './components/charts';
import { ageDistribution, genderSplit, nationalitySplit } from './mockData';

export function DemographicsPage() {
  const ages = ageDistribution();
  const nationalities = nationalitySplit();

  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">Statistiques demographiques</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">Age, sexe et nationalite des eleves</p>
        </div>
        <ExportButton rows={ages} filename="demographie-age.csv" />
      </div>

      <ChartCard title="Repartition par age">
        <BarChartCard data={ages as never} xKey="age" yKey="count" color="#AD56C4" />
      </ChartCard>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Repartition par sexe">
          <DonutChartCard data={genderSplit()} height={200} />
        </ChartCard>
        <ChartCard title="Repartition par nationalite">
          <DonutChartCard data={nationalities} height={200} />
        </ChartCard>
      </div>
    </div>
  );
}
