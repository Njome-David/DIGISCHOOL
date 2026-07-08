import { Card, Avatar, Badge } from '@/shared/components/ui';
import { ExportButton } from './components/charts';
import { teachersOverview } from './mockData';
import { useTranslation } from "react-i18next";

export function TeachersOverviewPage() {
    const { t } = useTranslation();
  const data = teachersOverview();

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">{t('vue_d_ensemble_des_enseignants')}</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">{data.length} {t('enseignants_en_activite')}</p>
        </div>
        <ExportButton rows={data} filename="enseignants.csv" />
      </div>

      <Card>
        <div className="divide-y divide-line-soft">
          {data.map((t) => (
            <div key={t.name} className="flex items-center gap-3 py-3">
              <Avatar name={t.name} seed={t.name} size={38} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-ink">{t.name}</p>
                <p className="text-xs font-semibold text-ink-soft">{t.subject}</p>
              </div>
              <Badge tone="neutral">{t.courses} {t('cours')}</Badge>
              <Badge tone="brand">{t.classes} {t('classes')}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
