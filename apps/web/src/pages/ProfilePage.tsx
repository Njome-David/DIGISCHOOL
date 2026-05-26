import { useAuthStore } from '@/features/auth/store';
import { ROLE_LABELS } from '@ecole/shared';
import { PageHeader, Card } from '@/shared/components/ui';

export function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;

  return (
    <div>
      <PageHeader title="Mon profil" />
      <Card>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-slate-500">Nom</dt>
            <dd className="font-medium">{user.nom}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Identifiant</dt>
            <dd className="font-medium">{user.username}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Rôle</dt>
            <dd className="font-medium">{ROLE_LABELS[user.role]}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Type compte</dt>
            <dd className="font-medium">{user.userType}</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
