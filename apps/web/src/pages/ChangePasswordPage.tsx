import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { api } from '@/shared/lib/api';
import { useAuthStore } from '@/features/auth/store';
import { ROLE_DASHBOARD } from '@ecole/shared';
import type { Role } from '@ecole/shared';
import { Button, Input, Card } from '@/shared/components/ui';

export function ChangePasswordPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/change-password', { currentPassword: current, newPassword: next });
      toast.success('Mot de passe mis a jour');
      if (user) navigate(ROLE_DASHBOARD[user.role as Role]);
    } catch {
      toast.error('echec du changement de mot de passe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <h1 className="font-display text-xl font-bold">Changer le mot de passe</h1>
        <p className="mt-1 text-sm text-slate-500">Obligatoire a la premi�re connexion</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <Input type="password" placeholder="Mot de passe actuel" value={current} onChange={(e) => setCurrent(e.target.value)} />
          <Input type="password" placeholder="Nouveau mot de passe" value={next} onChange={(e) => setNext(e.target.value)} />
          <Button type="submit" className="w-full" disabled={loading}>
            Enregistrer
          </Button>
        </form>
      </Card>
    </div>
  );
}
