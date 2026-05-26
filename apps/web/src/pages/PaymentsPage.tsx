import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/lib/api';
import { PageHeader, DataTable } from '@/shared/components/ui';

export function PaymentsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: () => api.get('/payments').then((r) => r.data.data),
  });

  return (
    <div>
      <PageHeader title="Paiements" subtitle="Historique des encaissements" />
      {isLoading ? (
        <p className="text-slate-400">Chargement…</p>
      ) : (
        <DataTable
          keyField="idPaie"
          data={data || []}
          columns={[
            { key: 'idPaie', label: 'N°' },
            { key: 'matricule', label: 'Matricule' },
            { key: 'montant', label: 'Montant (XAF)' },
            { key: 'datePaie', label: 'Date' },
          ]}
        />
      )}
    </div>
  );
}
