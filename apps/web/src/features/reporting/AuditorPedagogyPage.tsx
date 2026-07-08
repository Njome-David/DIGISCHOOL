import { Eye } from 'lucide-react';
import { Alert } from '@/shared/components/form';
import { ChartCard, BarChartCard, DonutChartCard } from './components/charts';
import { classPerformance, coursePerformance, genderSplit, ageDistribution } from './mockData';
import { useTranslation } from "react-i18next";

export function AuditorPedagogyPage() {
    const { t } = useTranslation();
  return (
    <div className="w-full space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">{t('statistiques_pedagogiques')}</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">{t('controle_des_resultats_et_des')}</p>
      </div>

      <Alert tone="info" icon={Eye}>
        {t('vue_auditeur_consultation_des')}</Alert>

      <ChartCard title={t('moyenne_par_classe')}>
        <BarChartCard data={classPerformance() as never} xKey="classCode" yKey="average" color="#7B2D9E" />
      </ChartCard>

      <ChartCard title={t('moyenne_par_matiere')}>
        <BarChartCard data={coursePerformance() as never} xKey="course" yKey="average" color="#1081F3" />
      </ChartCard>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title={t('repartition_par_sexe')}>
          <DonutChartCard data={genderSplit()} height={200} />
        </ChartCard>
        <ChartCard title={t('repartition_par_age')}>
          <BarChartCard data={ageDistribution() as never} xKey="age" yKey="count" color="#AD56C4" height={200} />
        </ChartCard>
      </div>
    </div>
  );
}
