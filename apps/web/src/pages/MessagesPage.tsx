import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/lib/api';
import { PageHeader, Card } from '@/shared/components/ui';

export function MessagesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: () => api.get('/messages').then((r) => r.data.data),
  });

  return (
    <div>
      <PageHeader title="Messages" subtitle="Communication école ? parents" />
      {isLoading ? (
        <p className="text-slate-400">Chargement…</p>
      ) : (
        <div className="space-y-4">
          {(data || []).map((m: { idMessages: number; objet: string; information: string; created_at: string }) => (
            <Card key={m.idMessages}>
              <h3 className="font-semibold text-slate-900">{m.objet}</h3>
              <p className="mt-2 text-sm text-slate-600">{m.information}</p>
              <p className="mt-2 text-xs text-slate-400">{new Date(m.created_at).toLocaleString('fr-FR')}</p>
            </Card>
          ))}
          {(!data || data.length === 0) && <p className="text-slate-400">Aucun message</p>}
        </div>
      )}
    </div>
  );
}
