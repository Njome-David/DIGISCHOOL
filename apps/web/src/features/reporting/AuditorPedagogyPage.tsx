import { Eye } from 'lucide-react';
import { Alert } from '@/shared/components/form';
import { ChartCard, BarChartCard, DonutChartCard } from './components/charts';
import { classPerformance, coursePerformance, genderSplit, ageDistribution } from './mockData';

export function AuditorPedagogyPage() {
  return (
    <div className="max-w-4xl space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">Statistiques pedagogiques</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">Controle des resultats et des effectifs</p>
      </div>

      <Alert tone="info" icon={Eye}>
        Vue auditeur : consultation des indicateurs pedagogiques sans droit de modification.
      </Alert>

      <ChartCard title="Moyenne par classe">
        <BarChartCard data={classPerformance() as never} xKey="classCode" yKey="average" color="#7B2D9E" />
      </ChartCard>

      <ChartCard title="Moyenne par matiere">
        <BarChartCard data={coursePerformance() as never} xKey="course" yKey="average" color="#1081F3" />
      </ChartCard>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Repartition par sexe">
          <DonutChartCard data={genderSplit()} height={200} />
        </ChartCard>
        <ChartCard title="Repartition par age">
          <BarChartCard data={ageDistribution() as never} xKey="age" yKey="count" color="#AD56C4" height={200} />
        </ChartCard>
      </div>
    </div>
  );
}
