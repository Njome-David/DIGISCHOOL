import { useState } from 'react';
import { ShieldCheck, CheckCircle, XCircle } from 'lucide-react';
import { Card, Button, Badge, Avatar, EmptyState, FilterTabs, type FilterOption } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { dateShort } from '@/shared/lib/format';
import { SeverityTag, PointsBadge } from './components/tags';
import {
  MOCK_REPORTS,
  setReportStatus,
  studentPoints,
  REPORT_STATUS_META,
  type ReportStatus,
} from './mockData';
import { useTranslation } from "react-i18next";

const FILTERS: FilterOption<ReportStatus>[] = [
  { value: 'pending', label: 'A valider', activeColor: '#D97706' },
  { value: 'approved', label: 'Approuves', activeColor: '#22A05E' },
  { value: 'rejected', label: 'Rejetes', activeColor: '#DC2626' },
];

export function DisciplineApprovalPage() {
    const { t } = useTranslation();
  const [filter, setFilter] = useState<ReportStatus>('pending');
  const [, force] = useState(0);

  const list = MOCK_REPORTS.filter((r) => r.status === filter).sort((a, b) => b.date.localeCompare(a.date));

  const act = (id: string, status: ReportStatus) => {
    setReportStatus(id, status);
    force((n) => n + 1);
  };

  return (
    <div className="w-full space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">{t('approbation_des_rapports_disci')}</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">
          {MOCK_REPORTS.filter((r) => r.status === 'pending').length} {t('rapports_graves_en_attente')}</p>
      </div>

      <FilterTabs value={filter} onChange={setFilter} options={FILTERS} />

      {list.length === 0 ? (
        <div className="surface">
          <EmptyState icon={ShieldCheck} message="Aucun rapport dans cette categorie." />
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((r) => {
            const meta = REPORT_STATUS_META[r.status];
            const cumul = studentPoints(r.matricule);
            return (
              <Card key={r.id}>
                <div className="flex items-start gap-3">
                  <Avatar name={r.studentName} color={avatarColor(r.matricule)} size={40} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-black text-ink">{r.studentName}</h3>
                      <Badge tone="neutral">{r.classCode}</Badge>
                      <SeverityTag points={r.points} />
                      {r.status !== 'pending' && <Badge tone={meta.tone}>{meta.label}</Badge>}
                    </div>
                    <p className="mt-1 text-sm font-bold text-ink">{r.label}</p>
                    <p className="mt-0.5 text-xs font-semibold text-ink-soft">
                      {r.reportedBy} - {dateShort(r.date)} - {r.term}
                    </p>
                    {r.comment && (
                      <p className="mt-2 rounded-xl bg-canvas px-3 py-2 text-xs font-medium text-ink-soft">{r.comment}</p>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      <PointsBadge points={r.points} />
                      <span className="text-xs font-semibold text-ink-faint">
                        {t('cumul_approuve_de_l_eleve')}{cumul} {t('pts')}</span>
                    </div>

                    {r.status === 'pending' && (
                      <div className="mt-3 flex gap-2">
                        <Button variant="success" onClick={() => act(r.id, 'approved')}>
                          <CheckCircle size={14} /> {t('approuver')}</Button>
                        <Button variant="outline" onClick={() => act(r.id, 'rejected')}>
                          <XCircle size={14} /> {t('rejeter')}</Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
