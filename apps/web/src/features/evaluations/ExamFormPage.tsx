import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, ClipboardList } from 'lucide-react';
import { Card, Button } from '@/shared/components/ui';
import { Field, Alert, UploadField } from '@/shared/components/form';
import { useAuthStore } from '@/features/auth/store';
import { MOCK_PERSONNEL } from '@/features/accounts/mockData';
import { MOCK_TERMS } from '@/features/academic/mockData';
import { coursesForTeacher } from '@/features/pedagogy/mockData';
import { mockLatency } from '@/shared/lib/format';
import { addExam, EXAM_NATURES, type Exam } from './mockData';
import { useTranslation } from "react-i18next";

function resolveTeacher(nom: string | undefined) {
  return MOCK_PERSONNEL.find((p) => p.type === 'teacher' && p.nom === nom) ?? MOCK_PERSONNEL[0];
}

export function ExamFormPage() {
    const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const teacher = resolveTeacher(user?.nom);
  const myCourses = coursesForTeacher(teacher.id);
  const terms = MOCK_TERMS.filter((t) => t.yearId === 'y2');

  const [form, setForm] = useState({
    title: '',
    natureCode: EXAM_NATURES[0].code as string,
    courseId: myCourses[0]?.id ?? '',
    term: terms.find((t) => t.current)?.label ?? terms[0]?.label ?? 'Trimestre 3',
    date: new Date().toISOString().slice(0, 10),
    maxNote: 20,
    fileName: null as string | null,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.title.trim()) {
      setError("Le titre de l'epreuve est obligatoire.");
      return;
    }
    if (!form.courseId) {
      setError('Aucun cours disponible. Contactez le Root pour vos affectations.');
      return;
    }
    setSaving(true);
    await mockLatency();
    const course = myCourses.find((c) => c.id === form.courseId)!;
    const nature = EXAM_NATURES.find((n) => n.code === form.natureCode)!;
    const exam: Exam = {
      id: `ex${Date.now()}`,
      title: form.title.trim(),
      natureCode: nature.code,
      natureLabel: nature.label,
      courseId: course.id,
      courseLabel: course.label,
      classId: course.classId,
      classCode: course.classCode,
      teacherId: teacher.id,
      teacherName: teacher.nom,
      date: form.date,
      term: form.term,
      maxNote: form.maxNote,
      fileName: form.fileName,
      status: 'draft',
    };
    addExam(exam);
    setSaving(false);
    navigate(`/teacher/exams/${exam.id}/grades`);
  }

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => navigate('/teacher/exams')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> {t('retour_a_mes_epreuves')}</button>

      <Card>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-brand-700">
            <ClipboardList size={20} />
          </div>
          <div>
            <h2 className="text-base font-black text-ink">{t('televerser_une_epreuve')}</h2>
            <p className="text-xs font-semibold text-ink-soft">{t('metadonnees_fichier_pdf_docx')}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4">
            <Alert tone="danger">{error}</Alert>
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <Field label={t('titre_de_l_epreuve')}>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="field-input"
              placeholder={t('ex_controle_continu_n_1')}
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={t('nature')}>
              <select
                value={form.natureCode}
                onChange={(e) => setForm((f) => ({ ...f, natureCode: e.target.value }))}
                className="field-input"
              >
                {EXAM_NATURES.map((n) => (
                  <option key={n.code} value={n.code}>
                    {n.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t('cours')}>
              <select
                value={form.courseId}
                onChange={(e) => setForm((f) => ({ ...f, courseId: e.target.value }))}
                className="field-input"
              >
                {myCourses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label} - {c.classCode}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t('trimestre')}>
              <select
                value={form.term}
                onChange={(e) => setForm((f) => ({ ...f, term: e.target.value }))}
                className="field-input"
              >
                {terms.map((t) => (
                  <option key={t.id} value={t.label}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t('date')}>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className="field-input"
              />
            </Field>
          </div>

          <Field label={t('note_maximale')}>
            <input
              type="number"
              min={1}
              max={100}
              value={form.maxNote}
              onChange={(e) => setForm((f) => ({ ...f, maxNote: Number(e.target.value) }))}
              className="field-input"
            />
          </Field>

          <Field label={t('fichier_de_l_epreuve')}>
            <UploadField value={form.fileName} onChange={(name) => setForm((f) => ({ ...f, fileName: name }))} />
          </Field>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => navigate('/teacher/exams')}>
              {t('annuler')}</Button>
            <Button type="submit" loading={saving}>
              <Save size={15} /> {t('creer_et_saisir_les_notes')}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
