import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { Card, Avatar, Badge, EmptyState, FilterTabs, type FilterOption } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { findStudent } from '@/features/students/mockData';
import { bulletinsForStudent } from '@/features/evaluations/mockData';
import { useTranslation } from "react-i18next";

export function ChildGradesPage() {
    const { t } = useTranslation();
  const { matricule } = useParams();
  const navigate = useNavigate();
  const child = matricule ? findStudent(matricule) : undefined;
  const bulletins = matricule ? bulletinsForStudent(matricule) : [];
  const terms = bulletins.map((b) => b.term);
  const [term, setTerm] = useState(terms[0] ?? '');

  const bulletin = bulletins.find((b) => b.term === term);
  const termOptions: FilterOption<string>[] = terms.map((t) => ({ value: t, label: t }));

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => navigate('/parent/children')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> {t('mes_enfants')}</button>

      {child && (
        <div className="flex items-center gap-3">
          <Avatar name={`${child.firstName} ${child.lastName}`} color={avatarColor(child.matricule)} size={42} />
          <div>
            <h2 className="text-base font-black text-ink">
              {child.firstName} {child.lastName}
            </h2>
            <p className="text-xs font-semibold text-ink-soft">{t('notes')}{child.classCode}</p>
          </div>
        </div>
      )}

      {terms.length > 1 && <FilterTabs value={term} onChange={setTerm} options={termOptions} />}

      {!bulletin ? (
        <div className="surface">
          <EmptyState icon={FileText} message="Aucune note disponible pour le moment." />
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-line-soft">
                  <th className="px-2 py-2 text-left text-xs font-black text-ink-soft">{t('matiere')}</th>
                  <th className="px-2 py-2 text-center text-xs font-black text-ink-soft">{t('coeff')}</th>
                  <th className="px-2 py-2 text-center text-xs font-black text-ink-soft">{t('moyenne')}</th>
                  <th className="px-2 py-2 text-center text-xs font-black text-ink-soft">{t('rang')}</th>
                  <th className="px-2 py-2 text-left text-xs font-black text-ink-soft">{t('appreciation')}</th>
                </tr>
              </thead>
              <tbody>
                {bulletin.lines.map((l, i) => (
                  <tr key={l.courseLabel} style={{ borderBottom: i < bulletin.lines.length - 1 ? '1px solid #EDE5F8' : 'none' }}>
                    <td className="px-2 py-2.5 text-sm font-bold text-ink">{l.courseLabel}</td>
                    <td className="px-2 py-2.5 text-center text-xs font-semibold text-ink-soft">{l.coeff}</td>
                    <td className="px-2 py-2.5 text-center">
                      <span className="text-sm font-black" style={{ color: l.moyenne >= 10 ? '#22A05E' : '#DC2626' }}>
                        {l.moyenne.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-2 py-2.5 text-center text-xs font-semibold text-ink-soft">{l.rank}</td>
                    <td className="px-2 py-2.5 text-xs font-semibold text-ink-soft">{l.appreciation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line-soft pt-4">
            <div className="flex items-center gap-3">
              <div className="text-center">
                <p className="text-lg font-black text-brand-600">{bulletin.generalAverage.toFixed(2)}</p>
                <p className="text-xs font-semibold text-ink-soft">{t('moyenne_generale')}</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-black text-ink">
                  {bulletin.generalRank}/{bulletin.classSize}
                </p>
                <p className="text-xs font-semibold text-ink-soft">{t('rang')}</p>
              </div>
            </div>
            <Badge tone="brand">{bulletin.mention}</Badge>
          </div>
        </Card>
      )}
    </div>
  );
}
