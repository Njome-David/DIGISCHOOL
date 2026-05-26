import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '@/shared/lib/api';
import { PageHeader, StatCard, Card } from '@/shared/components/ui';

export function DashboardPage({ title, subtitle }: { title: string; subtitle?: string }) {
  const { data: finance } = useQuery({
    queryKey: ['stats-finance'],
    queryFn: () => api.get('/stats/finance').then((r) => r.data.data),
  });
  const { data: pedagogy } = useQuery({
    queryKey: ['stats-pedagogy'],
    queryFn: () => api.get('/stats/pedagogy').then((r) => r.data.data),
  });

  const chartData = [
    { name: 'Élèves', value: pedagogy?.students ?? 0 },
    { name: 'Classes', value: pedagogy?.classes ?? 0 },
    { name: 'Paiements', value: finance?.count ?? 0 },
  ];

  return (
    <div>
      <PageHeader title={title} subtitle={subtitle || 'Vue d\'ensemble'} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Élèves actifs" value={pedagogy?.students ?? '—'} />
        <StatCard label="Classes" value={pedagogy?.classes ?? '—'} />
        <StatCard label="Encaissements" value={finance?.count ?? '—'} sub="transactions" />
        <StatCard
          label="Total perçu"
          value={finance?.total ? `${Number(finance.total).toLocaleString('fr-FR')} XAF` : '—'}
        />
      </div>
      <Card className="mt-8" title="Aperçu">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4f46e5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
