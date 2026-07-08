import { useTranslation } from 'react-i18next';

export function LanguageSwitcher({ compact }: { compact?: boolean }) {
  const { t, i18n } = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className={`rounded-lg border border-line bg-field px-2 py-1 text-xs font-bold text-ink transition-colors hover:border-brand-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 ${compact ? 'py-0.5 text-[10px]' : ''}`}
      aria-label={t('langue_de_l_application')}
    >
      <option value="fr">{t('francais')}</option>
      <option value="en">{t('english')}</option>
    </select>
  );
}

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-lg border border-line bg-field px-2.5 py-1 text-xs font-bold text-ink transition-colors hover:border-brand-300 hover:bg-brand-50"
      aria-label={`Switch language to ${i18n.language === 'fr' ? 'English' : 'Francais'}`}
    >
      {i18n.language === 'fr' ? 'EN' : 'FR'}
    </button>
  );
}
