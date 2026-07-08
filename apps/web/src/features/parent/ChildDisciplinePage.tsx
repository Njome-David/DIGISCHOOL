import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Card, Avatar, EmptyState } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { dateShort } from '@/shared/lib/format';
import { findStudent } from '@/features/students/mockData';
import { reportsForStudent, studentPoints } from '@/features/discipline/mockData';
import { SeverityTag, PointsBadge } from '@/features/discipline/components/tags';
import { useTranslation } from "react-i18next";

export function ChildDisciplinePage() {
    const { t } = useTranslation();
  const { matricule } = useParams();
  const navigate = useNavigate();
  const child = matricule ? findStudent(matricule) : undefined;
  const reports = matricule ? reportsForStudent(matricule, true) : [];
  const total = matricule ? studentPoints(matricule) : 0;

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => navigate('/parent/children')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> {t('mes_enfants')}</button>

      {child && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar name={`${child.firstName} ${child.lastName}`} color={avatarColor(child.matricule)} size={42} />
            <div>
              <h2 className="text-base font-black text-ink">
                {child.firstName} {child.lastName}
              </h2>
              <p className="text-xs font-semibold text-ink-soft">{t('dossier_disciplinaire')}{child.classCode}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-canvas px-4 py-2">
            <span className="text-xs font-bold text-ink-soft">{t('total_trimestre')}</span>
            <PointsBadge points={total} />
          </div>
        </div>
      )}

      {reports.length === 0 ? (
        <div className="surface">
          <EmptyState icon={ShieldCheck} message="Aucun incident disciplinaire. Felicitations !" />
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map((r) => (
            <Card key={r.id}>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-700">
                  <ShieldAlert size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-black text-ink">{r.label}</h3>
                    <SeverityTag points={r.points} />
                  </div>
                  <p className="mt-0.5 text-xs font-semibold text-ink-soft">
                    {r.reportedBy} - {dateShort(r.date)}
                  </p>
                  {r.comment && (
                    <p className="mt-2 text-sm font-medium leading-relaxed text-ink-soft">{r.comment}</p>
                  )}
                </div>
                <PointsBadge points={r.points} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
