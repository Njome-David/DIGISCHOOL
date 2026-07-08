import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { AuthLayout } from '@/app/layouts/AuthLayout';
import { Field, Alert } from '@/shared/components/form';
import { Button } from '@/shared/components/ui';
import { mockLatency } from '@/shared/lib/format';
import { useTranslation } from "react-i18next";

export function ForgotPasswordPage() {
    const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Veuillez renseigner votre nom d'utilisateur.");
      return;
    }
    setLoading(true);
    setError('');
    // Branchement backend : POST /auth/forgot-password { username } -> notifie le Root
    await mockLatency(800);
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <AuthLayout title={t('demande_envoyee')}>
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success-bg">
            <CheckCircle size={28} className="text-success" />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">
              {t('demande_envoyee_au')}<strong>{t('super_admin')}</strong>.
            </p>
            <p className="mt-2 text-sm text-ink-soft">
              {t('vous_recevrez_vos_nouveaux_ide')}</p>
          </div>
          <Link
            to="/login"
            className="mt-2 flex items-center gap-1.5 text-sm font-bold text-brand-500 hover:underline"
          >
            <ArrowLeft size={14} /> {t('retour_a_la_connexion')}</Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title={t('mot_de_passe_oublie')}
      subtitle="Entrez votre identifiant. Le Super Admin sera notifie pour reinitialiser votre acces."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <Alert icon={AlertCircle}>{error}</Alert>}
        <Field label={t('nom_d_utilisateur')}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t('votre_identifiant_de_connexion')}
            autoFocus
            className="field-input"
          />
        </Field>
        <Button type="submit" loading={loading} className="w-full">
          {!loading && <Send size={15} />}
          {loading ? 'Envoi...' : 'Envoyer la demande'}
        </Button>
        <Link
          to="/login"
          className="flex items-center justify-center gap-1.5 text-sm font-bold text-ink-soft hover:underline"
        >
          <ArrowLeft size={14} /> {t('retour_a_la_connexion')}</Link>
      </form>
    </AuthLayout>
  );
}
