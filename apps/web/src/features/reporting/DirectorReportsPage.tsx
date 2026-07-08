import { FileBarChart, Users, Wallet, ShieldAlert } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/shared/components/ui';
import { ExportButton } from './components/charts';
import { classPerformance, coursePerformance, studentPerformance, ageDistribution, revenueByMode } from './mockData';
import { useTranslation } from "react-i18next";

interface ReportDef {
  icon: LucideIcon;
  title: string;
  description: string;
  rows: Record<string, string | number>[];
  filename: string;
}

export function DirectorReportsPage() {
    const { t } = useTranslation();
  const reports: ReportDef[] = [
    { icon: FileBarChart, title: 'Performance par classe', description: 'Moyennes et taux de reussite par classe', rows: classPerformance(), filename: 'rapport-classes.csv' },
    { icon: FileBarChart, title: 'Performance par matiere', description: 'Moyennes par cours', rows: coursePerformance(), filename: 'rapport-cours.csv' },
    { icon: Users, title: 'Classement des eleves', description: 'Classement general par moyenne', rows: studentPerformance(), filename: 'rapport-eleves.csv' },
    { icon: ShieldAlert, title: 'Demographie', description: 'Repartition par age', rows: ageDistribution(), filename: 'rapport-demographie.csv' },
    { icon: Wallet, title: 'Recettes par mode', description: 'Encaissements par mode de paiement', rows: revenueByMode(), filename: 'rapport-recettes.csv' },
  ];

  return (
    <div className="w-full space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">{t('rapports_synthetiques')}</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">{t('generer_et_exporter_les_rappor')}</p>
      </div>

      <div className="space-y-3">
        {reports.map((r) => (
          <Card key={r.title} className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-700">
              <r.icon size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-black text-ink">{r.title}</h3>
              <p className="text-xs font-semibold text-ink-soft">{r.description}</p>
            </div>
            <ExportButton rows={r.rows} filename={r.filename} />
          </Card>
        ))}
      </div>
    </div>
  );
}
