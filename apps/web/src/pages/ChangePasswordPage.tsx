import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/features/auth/store';
import { AuthLayout } from '@/app/layouts/AuthLayout';
import { Field, PasswordInput, Alert } from '@/shared/components/form';
import { Button, Spinner } from '@/shared/components/ui';

const RULES: { label: string; test: (pw: string) => boolean }[] = [
  { label: 'Au moins 8 caracteres', test: (pw) => pw.length >= 8 },
  { label: 'Une majuscule', test: (pw) => /[A-Z]/.test(pw) },
  { label: 'Un chiffre', test: (pw) => /[0-9]/.test(pw) },
  { label: 'Un caractere special', test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

const STRENGTH_COLORS = ['', '#DC2626', '#D97706', '#22A05E', '#16A34A'];
const STRENGTH_LABELS = ['', 'Faible', 'Moyen', 'Bon', 'Fort'];

function StrengthBar({ pw }: { pw: string }) {
  const score = RULES.filter((r) => r.test(pw)).length;
  return (
    <div className="mt-2">
      <div className="mb-1 flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full transition-colors"
            style={{ backgroundColor: i <= score ? STRENGTH_COLORS[score] : '#EDE5F8' }}
          />
        ))}
      </div>
      {pw && (
        <p className="text-xs font-bold" style={{ color: STRENGTH_COLORS[score] }}>
          {STRENGTH_LABELS[score]}
        </p>
      )}
    </div>
  );
}

export function ChangePasswordPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const changePassword = useAuthStore((s) => s.changePassword);
  const isFirst = user?.mustChangePassword ?? false;

  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isFirst && !current.trim()) {
      setError('Saisissez votre mot de passe actuel.');
      return;
    }
    if (next.length < 8) {
      setError('Le nouveau mot de passe doit avoir au moins 8 caracteres.');
      return;
    }
    if (next !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    setLoading(true);
    const res = await changePassword(isFirst ? 'temp123' : current, next);
    setLoading(false);
    if (!res.success) {
      setError(res.error ?? 'Erreur.');
      return;
    }
    setSuccess(true);
    setTimeout(() => navigate('/'), 1600);
  };

  if (success) {
    return (
      <AuthLayout title="Mot de passe modifie">
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success-bg">
            <CheckCircle size={28} className="text-success" />
          </div>
          <p className="text-sm font-semibold text-ink">Mot de passe modifie. Redirection...</p>
          <Spinner className="border-brand-200 border-t-brand-500" />
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title={isFirst ? 'Premiere connexion' : 'Changer le mot de passe'}
      subtitle={
        isFirst
          ? 'Definissez un mot de passe personnel pour continuer.'
          : 'Entrez votre mot de passe actuel puis choisissez un nouveau mot de passe.'
      }
    >
      {isFirst && (
        <div className="mb-5">
          <Alert tone="brand" icon={ShieldCheck}>
            Compte cree par l'administrateur. Definissez votre propre mot de passe.
          </Alert>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <Alert icon={AlertCircle}>{error}</Alert>}

        {!isFirst && (
          <Field label="Mot de passe actuel">
            <PasswordInput value={current} onChange={setCurrent} autoComplete="current-password" />
          </Field>
        )}

        <Field label="Nouveau mot de passe">
          <PasswordInput
            value={next}
            onChange={setNext}
            placeholder="Min. 8 caracteres"
            autoComplete="new-password"
          />
          {next && <StrengthBar pw={next} />}
        </Field>

        <Field label="Confirmer">
          <PasswordInput
            value={confirm}
            onChange={setConfirm}
            autoComplete="new-password"
            invalid={!!confirm && confirm !== next}
          />
          {confirm && confirm !== next && (
            <p className="mt-1 text-xs font-semibold text-danger">Les mots de passe ne correspondent pas.</p>
          )}
        </Field>

        <ul className="space-y-1 text-xs">
          {RULES.map((rule) => {
            const ok = rule.test(next);
            return (
              <li key={rule.label} className="flex items-center gap-1.5 font-semibold">
                <CheckCircle size={12} style={{ color: ok ? '#22A05E' : '#C9B8E0' }} />
                <span className={ok ? 'text-success' : 'text-ink-soft'}>{rule.label}</span>
              </li>
            );
          })}
        </ul>

        <Button type="submit" loading={loading} className="w-full">
          {loading ? 'Enregistrement...' : 'Enregistrer le mot de passe'}
        </Button>
        {!isFirst && (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full text-center text-sm font-bold text-ink-soft hover:underline"
          >
            Annuler
          </button>
        )}
      </form>
    </AuthLayout>
  );
}
