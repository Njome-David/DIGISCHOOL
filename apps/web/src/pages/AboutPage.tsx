import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { useTranslation } from "react-i18next";

const APP_VERSION = '1.0.0';

export function AboutPage() {
    const { t } = useTranslation();
  return (
    <div className="min-h-[100dvh] bg-canvas px-4 py-12">
      <div className="mx-auto w-full space-y-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700">
          <ArrowLeft size={15} /> {t('retour_a_l_accueil')}</Link>

        <div className="surface p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 text-white">
            <GraduationCap size={30} />
          </div>
          <h1 className="text-xl font-black text-ink">{t('ecoleapp_2026')}</h1>
          <p className="mt-1 text-sm font-semibold text-ink-soft">
            {t('plateforme_de_gestion_scolaire')}{APP_VERSION}
          </p>
        </div>

        <div className="surface p-6">
          <h2 className="mb-3 text-sm font-black text-ink">{t('a_propos')}</h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            {t('ecoleapp_2026_est_une_solution')}</p>
        </div>

        <div className="surface p-6">
          <h2 className="mb-3 text-sm font-black text-ink">{t('contact')}</h2>
          <div className="space-y-2.5">
            <ContactRow icon={MapPin} value="BP 1234, Yaounde, Cameroun" />
            <ContactRow icon={Phone} value="+237 600 00 00 00" />
            <ContactRow icon={Mail} value="contact@ecoleapp.cm" />
          </div>
        </div>

        <div className="surface p-6">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-black text-ink">
            <ShieldCheck size={16} className="text-brand-500" /> {t('mentions_legales')}</h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            {t('les_donnees_personnelles_colle')}</p>
          <p className="mt-4 text-xs font-semibold text-ink-faint">
            {t('c')}{new Date().getFullYear()} {t('ecoleapp_tous_droits_reserves')}</p>
        </div>
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, value }: { icon: React.ElementType; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-700">
        <Icon size={15} />
      </span>
      <span className="text-sm font-bold text-ink">{value}</span>
    </div>
  );
}
