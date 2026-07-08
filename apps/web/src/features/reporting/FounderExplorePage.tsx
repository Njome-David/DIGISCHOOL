import { Users, GraduationCap, Wallet, Percent, Eye } from 'lucide-react';
import { KpiCard } from '@/shared/components/ui';
import { Alert } from '@/shared/components/form';
import { formatMoney } from '@/shared/lib/format';
import { ChartCard, LineChartCard, DonutChartCard } from './components/charts';
import { enrollmentTrend, genderSplit, totalRevenue } from './mockData';
import { MOCK_STUDENTS } from '@/features/students/mockData';
import { useTranslation } from "react-i18next";

export function FounderExplorePage() {
    const { t } = useTranslation();
  const enrolled = MOCK_STUDENTS.filter((s) => s.status === 'enrolled').length;

  return (
    <div className="w-full space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">{t('exploration_des_donnees')}</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">{t('acces_en_lecture_seule_a_l_ens')}</p>
      </div>

      <Alert tone="info" icon={Eye}>
        {t('mode_lecture_seule_le_fondateu')}</Alert>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard icon={GraduationCap} color="#7B2D9E" bg="#F0DCFA" value={enrolled} label={t('eleves_inscrits')} />
        <KpiCard icon={Users} color="#1081F3" bg="#EFF4FF" value={11} label={t('enseignants')} />
        <KpiCard icon={Wallet} color="#22A05E" bg="#D1FAE5" value={formatMoney(totalRevenue())} label={t('recettes_encaissees')} />
        <KpiCard icon={Percent} color="#D97706" bg="#FEF3C7" value="84%" label={t('taux_de_reussite')} />
      </div>

      <ChartCard title={t('evolution_des_effectifs')}>
        <LineChartCard data={enrollmentTrend as never} xKey="month" yKey="students" color="#1081F3" />
      </ChartCard>

      <ChartCard title={t('repartition_par_sexe')}>
        <DonutChartCard data={genderSplit()} />
      </ChartCard>
    </div>
  );
}
