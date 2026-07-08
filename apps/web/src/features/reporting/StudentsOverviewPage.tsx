import { GraduationCap, UserCheck, UserMinus } from 'lucide-react';
import { KpiCard } from '@/shared/components/ui';
import { ChartCard, BarChartCard, DonutChartCard, ExportButton } from './components/charts';
import { genderSplit } from './mockData';
import { MOCK_STUDENTS } from '@/features/students/mockData';
import { MOCK_CLASSES } from '@/features/academic/mockData';
import { useTranslation } from "react-i18next";

export function StudentsOverviewPage() {
    const { t } = useTranslation();
  const enrolled = MOCK_STUDENTS.filter((s) => s.status === 'enrolled');
  const transferred = MOCK_STUDENTS.filter((s) => s.status === 'transferred').length;

  const byClass = MOCK_CLASSES.map((c) => ({
    classCode: c.code,
    eleves: enrolled.filter((s) => s.classId === c.id).length,
  })).filter((c) => c.eleves > 0);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">{t('vue_d_ensemble_des_eleves')}</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">{t('repartition_et_effectifs')}</p>
        </div>
        <ExportButton rows={byClass} filename="effectifs-classes.csv" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard icon={GraduationCap} color="#7B2D9E" bg="#F0DCFA" value={enrolled.length} label={t('inscrits')} />
        <KpiCard icon={UserCheck} color="#22A05E" bg="#D1FAE5" value={MOCK_CLASSES.length} label={t('classes_actives')} />
        <KpiCard icon={UserMinus} color="#D97706" bg="#FEF3C7" value={transferred} label={t('transferes')} />
      </div>

      <ChartCard title={t('effectifs_par_classe')}>
        <BarChartCard data={byClass as never} xKey="classCode" yKey="eleves" color="#1081F3" />
      </ChartCard>

      <ChartCard title={t('repartition_par_sexe')}>
        <DonutChartCard data={genderSplit()} />
      </ChartCard>
    </div>
  );
}
