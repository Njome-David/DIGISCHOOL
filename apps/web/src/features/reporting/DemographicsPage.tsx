import { ChartCard, BarChartCard, DonutChartCard, ExportButton } from './components/charts';
import { ageDistribution, genderSplit, nationalitySplit } from './mockData';
import { useTranslation } from "react-i18next";

export function DemographicsPage() {
    const { t } = useTranslation();
  const ages = ageDistribution();
  const nationalities = nationalitySplit();

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">{t('statistiques_demographiques')}</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">{t('age_sexe_et_nationalite_des_el')}</p>
        </div>
        <ExportButton rows={ages} filename="demographie-age.csv" />
      </div>

      <ChartCard title={t('repartition_par_age')}>
        <BarChartCard data={ages as never} xKey="age" yKey="count" color="#AD56C4" />
      </ChartCard>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title={t('repartition_par_sexe')}>
          <DonutChartCard data={genderSplit()} height={200} />
        </ChartCard>
        <ChartCard title={t('repartition_par_nationalite')}>
          <DonutChartCard data={nationalities} height={200} />
        </ChartCard>
      </div>
    </div>
  );
}
