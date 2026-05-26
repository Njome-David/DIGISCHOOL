import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/lib/api';
import { PageHeader, DataTable, Badge } from '@/shared/components/ui';

export function StudentsPage({ parentMode }: { parentMode?: boolean }) {
  const { data, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: () => api.get('/students').then((r) => r.data.data),
  });

  return (
    <div>
      <PageHeader
        title={parentMode ? 'Mes enfants' : 'Élèves'}
        subtitle={parentMode ? 'Suivi académique de vos enfants' : 'Liste des élèves inscrits'}
      />
      {isLoading ? (
        <p className="text-slate-400">Chargement…</p>
      ) : (
        <DataTable
          keyField="matricule"
          data={data || []}
          columns={[
            { key: 'matricule', label: 'Matricule' },
            { key: 'nom', label: 'Nom' },
            { key: 'prenom', label: 'Prénom' },
            { key: 'langue', label: 'Langue' },
            {
              key: 'actif',
              label: 'Statut',
              render: (r) => (
                <Badge color={r.actif ? 'green' : 'amber'}>{r.actif ? 'Actif' : 'Inactif'}</Badge>
              ),
            },
          ]}
        />
      )}
    </div>
  );
}
