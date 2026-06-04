import { GraduationCap, UserCheck, UserMinus } from 'lucide-react';
import { KpiCard } from '@/shared/components/ui';
import { ChartCard, BarChartCard, DonutChartCard, ExportButton } from './components/charts';
import { genderSplit } from './mockData';
import { MOCK_STUDENTS } from '@/features/students/mockData';
import { MOCK_CLASSES } from '@/features/academic/mockData';

export function StudentsOverviewPage() {
  const enrolled = MOCK_STUDENTS.filter((s) => s.status === 'enrolled');
  const transferred = MOCK_STUDENTS.filter((s) => s.status === 'transferred').length;

  const byClass = MOCK_CLASSES.map((c) => ({
    classCode: c.code,
    eleves: enrolled.filter((s) => s.classId === c.id).length,
  })).filter((c) => c.eleves > 0);

  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">Vue d'ensemble des eleves</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">Repartition et effectifs</p>
        </div>
        <ExportButton rows={byClass} filename="effectifs-classes.csv" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard icon={GraduationCap} color="#7B2D9E" bg="#F0DCFA" value={enrolled.length} label="Inscrits" />
        <KpiCard icon={UserCheck} color="#22A05E" bg="#D1FAE5" value={MOCK_CLASSES.length} label="Classes actives" />
        <KpiCard icon={UserMinus} color="#D97706" bg="#FEF3C7" value={transferred} label="Transferes" />
      </div>

      <ChartCard title="Effectifs par classe">
        <BarChartCard data={byClass as never} xKey="classCode" yKey="eleves" color="#1081F3" />
      </ChartCard>

      <ChartCard title="Repartition par sexe">
        <DonutChartCard data={genderSplit()} />
      </ChartCard>
    </div>
  );
}
