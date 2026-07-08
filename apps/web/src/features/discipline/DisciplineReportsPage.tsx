import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Plus } from 'lucide-react';
import { SearchInput, Badge, EmptyState, Button, Avatar } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { dateShort } from '@/shared/lib/format';
import { useAuthStore } from '@/features/auth/store';
import { PointsBadge } from './components/tags';
import { reportsByTeacher, REPORT_STATUS_META } from './mockData';
import { useTranslation } from "react-i18next";

export function DisciplineReportsPage() {
    const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const [search, setSearch] = useState('');

  const q = search.toLowerCase();
  const reports = reportsByTeacher(user?.nom).filter(
    (r) => !q || r.studentName.toLowerCase().includes(q) || r.label.toLowerCase().includes(q)
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">{t('mes_rapports_disciplinaires')}</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">{reports.length} {t('rapports_saisis')}</p>
        </div>
        <Link to="/teacher/discipline/new">
          <Button>
            <Plus size={15} /> {t('nouveau_rapport')}</Button>
        </Link>
      </div>

      <SearchInput value={search} onChange={setSearch} placeholder={t('rechercher_un_eleve_ou_une_fau')} />

      {reports.length === 0 ? (
        <div className="surface">
          <EmptyState icon={ShieldAlert} message="Aucun rapport disciplinaire." />
        </div>
      ) : (
        <div className="surface divide-y divide-line-soft">
          {reports.map((r) => {
            const meta = REPORT_STATUS_META[r.status];
            return (
              <div key={r.id} className="flex items-center gap-3 px-4 py-3">
                <Avatar name={r.studentName} color={avatarColor(r.matricule)} size={34} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-ink">{r.studentName}</p>
                    <Badge tone="neutral">{r.classCode}</Badge>
                  </div>
                  <p className="mt-0.5 text-xs font-semibold text-ink-soft">
                    {r.label} - {dateShort(r.date)}
                  </p>
                </div>
                <PointsBadge points={r.points} />
                <Badge tone={meta.tone} className="hidden sm:inline-flex">
                  {meta.label}
                </Badge>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
