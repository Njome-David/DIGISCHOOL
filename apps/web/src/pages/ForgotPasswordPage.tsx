import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { School } from 'lucide-react';
import { Card } from '@/shared/components/ui';

export function ForgotPasswordPage() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Card className="w-full max-w-md text-center">
        <School className="mx-auto text-brand-600" size={40} />
        <h1 className="mt-4 font-display text-xl font-bold">Mot de passe oublie</h1>
        <p className="mt-2 text-sm text-slate-500">
          Contactez l'administrateur Root pour reinitialiser votre acces.
        </p>
        <Link to="/login" className="mt-6 inline-block text-sm font-medium text-brand-600 hover:underline">
          {t('common.back')} vers {t('auth.login')}
        </Link>
      </Card>
    </div>
  );
}
