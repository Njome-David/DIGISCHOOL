import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { api } from '@/shared/lib/api';
import { PageHeader, DataTable, Card } from '@/shared/components/ui';
import type { ReactNode } from 'react';

export interface ColumnDef {
  key: string;
  label: string;
  render?: (row: Record<string, unknown>) => ReactNode;
}

export function ResourcePage({
  title,
  subtitle,
  endpoint,
  columns,
  keyField,
}: {
  title: string;
  subtitle?: string;
  endpoint: string;
  columns: ColumnDef[];
  keyField?: string;
}) {
  const { t } = useTranslation();
  const { data, isLoading, error } = useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const res = await api.get(endpoint);
      return res.data.data ?? res.data;
    },
  });

  const rows = Array.isArray(data) ? data : [];
  const pk = keyField || columns[0]?.key || 'id';

  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} />
      {error && (
        <Card>
          <p className="text-sm text-red-600">{(error as Error).message || 'Erreur de chargement'}</p>
        </Card>
      )}
      {isLoading ? (
        <p className="text-slate-400">{t('common.loading')}</p>
      ) : (
        <DataTable keyField={pk} data={rows} columns={columns} />
      )}
    </div>
  );
}
