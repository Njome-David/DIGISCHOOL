import { Link } from 'react-router-dom';
import { Eye, GraduationCap, Wallet, Percent, ListChecks, FileSearch, ChevronRight } from 'lucide-react';
import { Card, KpiCard } from '@/shared/components/ui';
import { Alert } from '@/shared/components/form';
import { formatMoney, dateTime } from '@/shared/lib/format';
import { ChartCard, LineChartCard, DonutChartCard } from '@/features/reporting/components/charts';
import { revenueTrend, genderSplit, totalRevenue } from '@/features/reporting/mockData';
import { MOCK_STUDENTS } from '@/features/students/mockData';
import { MOCK_AUDIT } from '@/features/academic/mockData';

export function AuditorDashboardPage() {
  const enrolled = MOCK_STUDENTS.filter((s) => s.status === 'enrolled').length;
  const recent = MOCK_AUDIT.slice(0, 4);

  return (
    <div className="max-w-4xl space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">Tableau de bord - Auditeur</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">Supervision et controle en lecture seule</p>
      </div>

      <Alert tone="info" icon={Eye}>
        Profil auditeur : acces en consultation a l'ensemble des donnees, sans droit de modification.
      </Alert>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard icon={GraduationCap} color="#7B2D9E" bg="#F0DCFA" value={enrolled} label="Eleves inscrits" />
        <KpiCard icon={Wallet} color="#22A05E" bg="#D1FAE5" value={formatMoney(totalRevenue())} label="Recettes" />
        <KpiCard icon={Percent} color="#D97706" bg="#FEF3C7" value="84%" label="Taux de reussite" />
        <KpiCard icon={ListChecks} color="#1081F3" bg="#EFF4FF" value={MOCK_AUDIT.length} label="Evenements audit" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Recettes mensuelles">
          <LineChartCard data={revenueTrend as never} xKey="month" yKey="amount" color="#22A05E" formatter={formatMoney} height={200} />
        </ChartCard>
        <ChartCard title="Repartition par sexe">
          <DonutChartCard data={genderSplit()} height={200} />
        </ChartCard>
      </div>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-black text-ink">Activite recente</h3>
          <Link to="/auditeur/audit-logs" className="flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700">
            Journal complet <ChevronRight size={13} />
          </Link>
        </div>
        <div className="divide-y divide-line-soft">
          {recent.map((a) => (
            <div key={a.id} className="flex items-center gap-3 py-2.5">
              <FileSearch size={15} className="shrink-0 text-ink-faint" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink">{a.action}</p>
                <p className="text-xs font-semibold text-ink-soft">
                  {a.user} - {a.role}
                </p>
              </div>
              <span className="shrink-0 text-xs font-semibold text-ink-faint">{dateTime(a.date)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
