import { Users, GraduationCap, Wallet, Percent, Eye } from 'lucide-react';
import { KpiCard } from '@/shared/components/ui';
import { Alert } from '@/shared/components/form';
import { formatMoney } from '@/shared/lib/format';
import { ChartCard, LineChartCard, DonutChartCard } from './components/charts';
import { enrollmentTrend, genderSplit, totalRevenue } from './mockData';
import { MOCK_STUDENTS } from '@/features/students/mockData';

export function FounderExplorePage() {
  const enrolled = MOCK_STUDENTS.filter((s) => s.status === 'enrolled').length;

  return (
    <div className="max-w-4xl space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">Exploration des donnees</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">Acces en lecture seule a l'ensemble des indicateurs</p>
      </div>

      <Alert tone="info" icon={Eye}>
        Mode lecture seule : le Fondateur consulte les donnees sans pouvoir les modifier.
      </Alert>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard icon={GraduationCap} color="#7B2D9E" bg="#F0DCFA" value={enrolled} label="Eleves inscrits" />
        <KpiCard icon={Users} color="#1081F3" bg="#EFF4FF" value={11} label="Enseignants" />
        <KpiCard icon={Wallet} color="#22A05E" bg="#D1FAE5" value={formatMoney(totalRevenue())} label="Recettes encaissees" />
        <KpiCard icon={Percent} color="#D97706" bg="#FEF3C7" value="84%" label="Taux de reussite" />
      </div>

      <ChartCard title="Evolution des effectifs">
        <LineChartCard data={enrollmentTrend as never} xKey="month" yKey="students" color="#1081F3" />
      </ChartCard>

      <ChartCard title="Repartition par sexe">
        <DonutChartCard data={genderSplit()} />
      </ChartCard>
    </div>
  );
}
