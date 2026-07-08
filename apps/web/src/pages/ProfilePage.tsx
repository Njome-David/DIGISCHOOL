import { useState, type FormEvent } from 'react';
import { Phone, Mail, Save, CheckCircle, Lock } from 'lucide-react';
import { ROLE_LABELS } from '@ecole/shared';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/features/auth/store';
import { useThemeStore } from '@/features/theme/store';
import { Card, SectionTitle, Avatar, Badge, Button } from '@/shared/components/ui';
import { Field } from '@/shared/components/form';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';
import { ROLE_META } from '@/shared/lib/roleMeta';
import { mockLatency } from '@/shared/lib/format';

export function ProfilePage() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useThemeStore();
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  if (!user) return null;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await mockLatency();
    updateProfile({ email, phone });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="w-full space-y-5">
      <Card className="flex items-center gap-5 p-6">
        <Avatar name={user.nom} color={ROLE_META[user.role].color} size={64} />
        <div>
          <h2 className="text-lg font-black text-ink">{user.nom}</h2>
          <div className="mt-1">
            <Badge>{ROLE_LABELS[user.role]}</Badge>
          </div>
          <p className="mt-1 text-xs font-semibold text-ink-soft">@{user.username}</p>
        </div>
      </Card>

      <Card className="p-6">
        <SectionTitle className="mb-5">{t('informations_personnelles')}</SectionTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label={t('nom_d_utilisateur')} hint={t('l_identifiant_ne_peut_pas_etre')}>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input
                type="text"
                value={user.username}
                readOnly
                className="field-input cursor-not-allowed bg-canvas pl-9 text-ink-faint"
              />
            </div>
          </Field>

          <Field label={t('adresse_e_mail')}>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('votre_email_com')}
                className="field-input pl-9"
              />
            </div>
          </Field>

          <Field label={t('telephone')}>
            <div className="relative">
              <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-500" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t('237_6xx_xxx_xxx')}
                className="field-input pl-9"
              />
            </div>
          </Field>

          <div className="flex items-center gap-3 pt-1">
            <Button type="submit" loading={saving}>
              {!saving && (saved ? <CheckCircle size={15} /> : <Save size={15} />)}
              {saving ? t('enregistrement') : saved ? t('enregistre') : t('enregistrer')}
            </Button>
            {saved && <span className="text-sm font-bold text-success">{t('modifications_sauvegardees')}</span>}
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <SectionTitle className="mb-5">{t('preferences')}</SectionTitle>
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-ink">{t('mode_sombre')}</p>
              <p className="mt-0.5 text-xs font-semibold text-ink-soft">{t('activer_le_theme_fonce')}</p>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                theme === 'dark' ? 'bg-brand-500' : 'bg-line'
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  theme === 'dark' ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-ink">{t('langue_de_l_application')}</p>
              <p className="mt-0.5 text-xs font-semibold text-ink-soft">{t('choisissez_votre_langue_princi')}</p>
            </div>
            <select
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="rounded-lg border border-line bg-field px-2.5 py-1.5 text-sm font-bold transition-colors hover:border-brand-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            >
              <option value="fr">{t('francais')}</option>
              <option value="en">{t('english')}</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <SectionTitle className="mb-0">{t('securite')}</SectionTitle>
            <p className="mt-0.5 text-xs font-semibold text-ink-soft">{t('recommande_tous_les_3_mois')}</p>
          </div>
          <Button variant="outline">
            <Lock size={14} /> {t('changer_le_mot_de_passe')}
          </Button>
        </div>
      </Card>
    </div>
  );
}
