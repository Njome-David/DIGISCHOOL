import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ClipboardList, Download, FileText } from 'lucide-react';
import { Card, Avatar, Badge, EmptyState, FilterTabs, Button, type FilterOption } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { dateShort } from '@/shared/lib/format';
import { findStudent } from '@/features/students/mockData';
import { examsForClass, EXAM_NATURES } from '@/features/evaluations/mockData';
import { useTranslation } from "react-i18next";

export function ChildExamsPage() {
    const { t } = useTranslation();
  const { matricule } = useParams();
  const navigate = useNavigate();
  const child = matricule ? findStudent(matricule) : undefined;
  const [nature, setNature] = useState('all');

  const exams = child ? examsForClass(child.classId) : [];
  const filtered = nature === 'all' ? exams : exams.filter((e) => e.natureCode === nature);

  const filters: FilterOption<string>[] = [
    { value: 'all', label: 'Toutes' },
    ...EXAM_NATURES.map((n) => ({ value: n.code, label: n.label })),
  ];

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
            <p className="text-xs font-semibold text-ink-soft">{t('epreuves_devoirs')}{child.classCode}</p>
          </div>
        </div>
      )}

      <FilterTabs value={nature} onChange={setNature} options={filters} />

      {filtered.length === 0 ? (
        <div className="surface">
          <EmptyState icon={ClipboardList} message="Aucune epreuve disponible." />
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((exam) => (
            <Card key={exam.id} className="flex flex-wrap items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-700">
                <FileText size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-black text-ink">{exam.title}</h3>
                  <Badge tone="neutral">{exam.natureLabel}</Badge>
                </div>
                <p className="mt-0.5 text-xs font-semibold text-ink-soft">
                  {exam.courseLabel} - {dateShort(exam.date)} - {exam.term}
                </p>
              </div>
              {exam.fileName && (
                <Button variant="outline" className="shrink-0">
                  <Download size={14} /> {t('telecharger')}</Button>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
