import { Wrench } from 'lucide-react';
import { useTranslation } from "react-i18next";

export function MaintenancePage() {
    const { t } = useTranslation();
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-canvas px-4">
      <div className="max-w-md text-center">
        <div className="relative mx-auto mb-8 h-40 w-40">
          <div className="absolute inset-0 rounded-full bg-brand-500/15" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Wrench size={60} className="text-brand-500 drop-shadow-[0_4px_24px_rgba(173,86,196,0.25)]" />
          </div>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-ink">{t('maintenance_en_cours')}</h1>
        <p className="mb-8 text-sm leading-relaxed text-ink-soft">
          {t('la_plateforme_est_temporaireme')}</p>

        <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-bold text-brand-700">
          <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />
          {t('retablissement_imminent')}</div>

        <p className="mt-12 text-sm font-extrabold tracking-tight text-brand-500/40">{t('digischool')}</p>
      </div>
    </div>
  );
}
