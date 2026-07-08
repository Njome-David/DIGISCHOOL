import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/features/auth/store';
import { DEMO_HINTS } from '@/features/auth/mockUsers';
import { AuthLayout } from '@/app/layouts/AuthLayout';
import { Field, PasswordInput, Alert } from '@/shared/components/form';
import { Button } from '@/shared/components/ui';
import { useTranslation } from "react-i18next";

export function LoginPage() {
    const { t } = useTranslation();
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError(t('veuillez_renseigner_tous_les_c'));
      return;
    }
    setLoading(true);
    setError('');
    const res = await login(username.trim(), password);
    setLoading(false);
    if (!res.success) {
      setError(res.error ?? t('veuillez_renseigner_tous_les_c'));
      return;
    }
    navigate(res.redirect ?? '/');
  };

  return (
    <AuthLayout title={t('connexion')} subtitle={t('entrez_vos_identifiants_pour')}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <Alert icon={AlertCircle}>{error}</Alert>}

        <Field label={t('nom_d_utilisateur')}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t('ex_directeur')}
            autoFocus
            autoComplete="username"
            className="field-input"
          />
        </Field>

        <Field
          label={t('mot_de_passe')}
          action={
            <Link to="/forgot-password" className="text-xs font-bold text-brand-500 hover:underline">
              {t('oublie')}</Link>
          }
        >
          <PasswordInput value={password} onChange={setPassword} autoComplete="current-password" />
        </Field>

        <Button type="submit" loading={loading} className="w-full">
          {!loading && <LogIn size={16} />}
          {loading ? t('connexion_en_cours') : t('se_connecter')}
        </Button>

        <div className="rounded-xl bg-accent p-3 text-xs text-brand-700">
          <p className="mb-1.5 font-black">{t('comptes_de_demo')}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
            {DEMO_HINTS.map((d) => (
              <button
                key={d.username}
                type="button"
                onClick={() => {
                  setUsername(d.username);
                  setPassword(d.password);
                  setError('');
                }}
                className="text-left hover:underline"
              >
                <span className="font-black">{d.username}</span> / {d.password}
              </button>
            ))}
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
