import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, MessageSquare, DollarSign, BarChart2, type LucideIcon } from 'lucide-react';
import authBg from '@/assets/auth-bg.png';
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';

const HIGHLIGHT_KEYS = ['gestion_academique', 'communication', 'suivi_financier', 'statistiques'];
const HIGHLIGHT_ICONS: LucideIcon[] = [GraduationCap, MessageSquare, DollarSign, BarChart2];

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
    const { t } = useTranslation();
  return (
    <div className="flex min-h-[100dvh] flex-col lg:flex-row">
      <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-auth-gradient p-12 lg:flex lg:w-[45%]">
        <div
          className="absolute inset-0 opacity-15"
          style={{ backgroundImage: `url(${authBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10" />
        <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10" />

        <div className="relative z-10 max-w-sm text-center text-white">
          <Link to="/" className="group mb-8 inline-block">
            <h1 className="text-4xl font-black tracking-tight drop-shadow-lg transition-opacity group-hover:opacity-90">
              {t('digischool')}</h1>
            <p className="mt-1 text-sm font-medium opacity-60">{t('ecoleapp_2026')}</p>
          </Link>
          <p className="mb-8 text-lg font-semibold leading-relaxed opacity-90">
            {t('la_plateforme_complete_de_gest')}</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {HIGHLIGHT_KEYS.map((key, i) => {
              const Icon = HIGHLIGHT_ICONS[i];
              return (
                <div
                  key={key}
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5 backdrop-blur-sm"
                >
                  <Icon size={18} className="shrink-0 opacity-90" />
                  <span className="opacity-90">{t(key)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-canvas p-6 lg:p-10">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:hidden">
            <Link to="/">
              <h1 className="text-2xl font-black text-brand-500">{t('digischool')}</h1>
            </Link>
          </div>

          <div className="rounded-2xl border border-line bg-white p-8 shadow-card">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-ink">{title}</h2>
                {subtitle && <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{subtitle}</p>}
              </div>
              <LanguageSwitcher />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
