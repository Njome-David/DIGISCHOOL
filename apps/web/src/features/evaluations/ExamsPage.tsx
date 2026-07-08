import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Plus, FileText, Upload, PenLine } from 'lucide-react';
import { SearchInput, Badge, EmptyState, Button } from '@/shared/components/ui';
import { useAuthStore } from '@/features/auth/store';
import { MOCK_PERSONNEL } from '@/features/accounts/mockData';
import { dateShort } from '@/shared/lib/format';
import { examsForTeacher, gradesForExam, EXAM_STATUS_META, type Exam } from './mockData';
import { useTranslation } from "react-i18next";

function resolveTeacherId(nom: string | undefined): string {
  return MOCK_PERSONNEL.find((p) => p.type === 'teacher' && p.nom === nom)?.id ?? 'p1';
}

export function ExamsPage() {
    const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const teacherId = resolveTeacherId(user?.nom);
  const [search, setSearch] = useState('');

  const q = search.toLowerCase();
  const exams = examsForTeacher(teacherId).filter(
    (e) => !q || e.title.toLowerCase().includes(q) || e.classCode.toLowerCase().includes(q)
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">{t('mes_epreuves')}</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">{exams.length} {t('epreuves_creees')}</p>
        </div>
        <div className="flex gap-2">
          <Link to="/teacher/homework/new">
            <Button variant="outline">
              <Upload size={15} /> {t('devoir_corrige')}</Button>
          </Link>
          <Link to="/teacher/exams/new">
            <Button>
              <Plus size={15} /> {t('nouvelle_epreuve')}</Button>
          </Link>
        </div>
      </div>

      <SearchInput value={search} onChange={setSearch} placeholder={t('rechercher_une_epreuve_ou_une')} />

      {exams.length === 0 ? (
        <div className="surface">
          <EmptyState icon={ClipboardList} message="Aucune epreuve pour le moment." />
        </div>
      ) : (
        <div className="space-y-3">
          {exams.map((exam: Exam) => {
            const rows = gradesForExam(exam.id);
            const graded = rows.filter((r) => r.note !== null).length;
            const meta = EXAM_STATUS_META[exam.status];
            return (
              <div key={exam.id} className="surface flex flex-wrap items-center gap-4 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-700">
                  <FileText size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-black text-ink">{exam.title}</h3>
                    <Badge tone="neutral">{exam.natureLabel}</Badge>
                    <Badge tone={meta.tone}>{meta.label}</Badge>
                  </div>
                  <p className="mt-0.5 text-xs font-semibold text-ink-soft">
                    {exam.courseLabel} - {exam.classCode} - {dateShort(exam.date)} - {exam.term}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-ink-faint">
                    {graded}/{rows.length} {t('eleves_notes')}</p>
                </div>
                <Link to={`/teacher/exams/${exam.id}/grades`} className="shrink-0">
                  <Button variant="outline">
                    <PenLine size={14} /> {t('saisir_les_notes')}</Button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
