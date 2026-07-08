import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, ShieldX } from 'lucide-react';
import { useTranslation } from "react-i18next";

export function ForbiddenPage() {
    const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-canvas px-4">
      <div className="max-w-md text-center">
        <div className="relative mx-auto mb-8 h-40 w-40">
          <div className="absolute inset-0 rounded-full bg-danger/15" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldX size={64} className="text-danger drop-shadow-[0_4px_24px_rgba(220,38,38,0.25)]" />
          </div>
        </div>

        <p className="mb-2 text-sm font-black uppercase tracking-widest text-danger">{t('erreur_403')}</p>
        <h1 className="mb-3 text-2xl font-bold text-ink">{t('acces_refuse')}</h1>
        <p className="mb-8 text-sm leading-relaxed text-ink-soft">
          {t('vous_n_avez_pas_les_autorisati')}</p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={() => navigate(-1)} className="btn-outline">
            <ArrowLeft size={16} /> {t('page_precedente')}</button>
          <Link to="/" className="btn-brand">
            <Home size={16} /> {t('accueil')}</Link>
        </div>

        <p className="mt-12 text-sm font-extrabold tracking-tight text-brand-500/40">{t('digischool')}</p>
      </div>
    </div>
  );
}
