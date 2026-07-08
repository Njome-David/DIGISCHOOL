import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, FileText, Check } from 'lucide-react';
import { Card, Button, Badge, EmptyState } from '@/shared/components/ui';
import { dateShort, mockLatency } from '@/shared/lib/format';
import { GradeTable } from './components/GradeTable';
import { findExam, gradesForExam, saveGrades, EXAM_STATUS_META, type GradeRow } from './mockData';
import { useTranslation } from "react-i18next";

export function GradesPage() {
    const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const exam = id ? findExam(id) : undefined;

  const [rows, setRows] = useState<GradeRow[]>(() => (id ? gradesForExam(id).map((r) => ({ ...r })) : []));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!exam) {
    return (
      <div className="w-full space-y-4">
        <button onClick={() => navigate('/teacher/exams')} className="flex items-center gap-1.5 text-sm font-bold text-ink-soft hover:text-ink">
          <ArrowLeft size={15} /> {t('retour')}</button>
        <div className="surface">
          <EmptyState icon={FileText} message="Epreuve introuvable." />
        </div>
      </div>
    );
  }

  const patch = (matricule: string, p: Partial<GradeRow>) => {
    setSaved(false);
    setRows((prev) => prev.map((r) => (r.matricule === matricule ? { ...r, ...p } : r)));
  };

  async function save() {
    setSaving(true);
    await mockLatency();
    saveGrades(exam!.id, rows);
    setSaving(false);
    setSaved(true);
  }

  const meta = EXAM_STATUS_META[exam.status];
  const avg =
    rows.filter((r) => r.note !== null).reduce((s, r) => s + (r.note ?? 0), 0) /
    (rows.filter((r) => r.note !== null).length || 1);

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => navigate('/teacher/exams')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> {t('retour_a_mes_epreuves')}</button>

      <Card>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-black text-ink">{exam.title}</h2>
              <Badge tone="neutral">{exam.natureLabel}</Badge>
              <Badge tone={meta.tone}>{meta.label}</Badge>
            </div>
            <p className="mt-1 text-xs font-semibold text-ink-soft">
              {exam.courseLabel} - {exam.classCode} - {dateShort(exam.date)} {t('note')}{exam.maxNote}
            </p>
          </div>
          <div className="rounded-xl bg-canvas px-4 py-2 text-center">
            <p className="text-lg font-black text-ink">{avg.toFixed(1)}</p>
            <p className="text-xs font-semibold text-ink-soft">{t('moyenne_classe')}</p>
          </div>
        </div>
      </Card>

      <Card>
        <GradeTable rows={rows} maxNote={exam.maxNote} onChange={patch} />
      </Card>

      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="flex items-center gap-1 text-sm font-bold text-success">
            <Check size={15} /> {t('notes_enregistrees')}</span>
        )}
        <Button onClick={save} loading={saving}>
          <Save size={15} /> {t('enregistrer_les_notes')}</Button>
      </div>
    </div>
  );
}
