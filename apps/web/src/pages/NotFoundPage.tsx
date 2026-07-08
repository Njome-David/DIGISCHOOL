import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useTranslation } from "react-i18next";

export function NotFoundPage() {
    const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-canvas px-4">
      <div className="max-w-md text-center">
        <div className="relative mx-auto mb-8 h-40 w-40">
          <div className="absolute inset-0 rounded-full bg-brand-500/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="select-none text-7xl font-extrabold text-brand-500 drop-shadow-[0_4px_24px_rgba(173,86,196,0.25)]">
              404
            </span>
          </div>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-ink">{t('page_introuvable')}</h1>
        <p className="mb-8 text-sm leading-relaxed text-ink-soft">
          {t('la_page_que_vous_cherchez_n_ex')}</p>

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
