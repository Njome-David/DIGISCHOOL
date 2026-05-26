import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { School } from 'lucide-react';
import { useAuthStore } from '@/features/auth/store';
import { getApiErrorMessage } from '@/shared/lib/api';
import { Button, Input } from '@/shared/components/ui';

const schema = z.object({
  username: z.string().min(1, 'Identifiant requis'),
  password: z.string().min(1, 'Mot de passe requis'),
});

type Form = z.infer<typeof schema>;

export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    setLoading(true);
    try {
      const redirect = await login(data.username, data.password);
      toast.success('Connexion r�ussie');
      navigate(redirect);
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 flex-col justify-between bg-brand-950 p-12 text-white lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500">
            <School size={28} />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">DIGISCHOOL</h1>
            <p className="text-brand-300">Gestion scolaire bilingue</p>
          </div>
        </div>
        <div>
          <p className="font-display text-4xl font-bold leading-tight">
            Numerisez votre ecole primaire
          </p>
          <p className="mt-4 max-w-md text-brand-200">
            Notes, bulletins, paiements et communication parents dans une seule plateforme.
          </p>
        </div>
        <p className="text-sm text-brand-400">DIGISCHOOL</p>
      </div>
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <h1 className="font-display text-2xl font-bold text-brand-700">DIGISCHOOL</h1>
          </div>
          <div className="card">
            <h2 className="font-display text-xl font-semibold text-slate-900">{t('auth.login')}</h2>
            <p className="mt-1 text-sm text-slate-500">{t('app.tagline')}</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">{t('auth.username')}</label>
                <Input placeholder="username" {...register('username')} />
                {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">{t('auth.password')}</label>
                <Input type="password" placeholder="********" {...register('password')} />
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('common.loading') : t('auth.submit')}
              </Button>
              <Link to="/forgot-password" className="block text-center text-sm text-brand-600 hover:underline">
                Mot de passe oublie ?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
