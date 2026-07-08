import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, BookOpen } from 'lucide-react';
import { Card, Button } from '@/shared/components/ui';
import { Field, Alert } from '@/shared/components/form';
import { avatarColor } from '@/shared/lib/roleMeta';
import { mockLatency } from '@/shared/lib/format';
import { MOCK_CLASSES } from '@/features/academic/mockData';
import { MOCK_PERSONNEL } from '@/features/accounts/mockData';
import { SUBJECT_OPTIONS, findCourse, upsertCourse, type Course } from './mockData';
import { useTranslation } from "react-i18next";

const TEACHERS = MOCK_PERSONNEL.filter((p) => p.type === 'teacher');

export function CourseFormPage() {
    const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const existing = id ? findCourse(id) : undefined;

  const [form, setForm] = useState<Course>(
    existing ?? {
      id: '',
      code: SUBJECT_OPTIONS[0].code,
      label: SUBJECT_OPTIONS[0].label,
      coefficient: 2,
      noteMax: 20,
      classId: MOCK_CLASSES[0]?.id ?? '',
      classCode: MOCK_CLASSES[0]?.code ?? '',
      teacherId: null,
      teacherName: null,
      color: '#7B2D9E',
    }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const setSubject = (code: string) => {
    const subj = SUBJECT_OPTIONS.find((s) => s.code === code)!;
    setForm((f) => ({ ...f, code: subj.code, label: subj.label, color: avatarColor(subj.code) }));
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (form.coefficient < 1 || form.noteMax < 1) {
      setError('Le coefficient et la note maximale doivent etre superieurs a zero.');
      return;
    }
    setSaving(true);
    await mockLatency();
    const cls = MOCK_CLASSES.find((c) => c.id === form.classId);
    const teacher = TEACHERS.find((t) => t.id === form.teacherId);
    upsertCourse({
      ...form,
      id: form.id || `co${Date.now()}`,
      classCode: cls?.code ?? '',
      teacherName: teacher?.nom ?? null,
      teacherId: form.teacherId || null,
    });
    setSaving(false);
    navigate('/root/courses');
  }

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => navigate('/root/courses')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> {t('retour_aux_cours')}</button>

      <Card>
        <div className="mb-5 flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl font-black text-white"
            style={{ backgroundColor: form.color }}
          >
            {form.code.slice(0, 2) || <BookOpen size={20} />}
          </div>
          <div>
            <h2 className="text-base font-black text-ink">{editing ? 'Modifier le cours' : 'Nouveau cours'}</h2>
            <p className="text-xs font-semibold text-ink-soft">{t('coefficient_note_maximale_et_e')}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4">
            <Alert tone="danger">{error}</Alert>
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={t('matiere')}>
              <select value={form.code} onChange={(e) => setSubject(e.target.value)} className="field-input">
                {SUBJECT_OPTIONS.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t('classe')}>
              <select
                value={form.classId}
                onChange={(e) => setForm((f) => ({ ...f, classId: e.target.value }))}
                className="field-input"
              >
                {MOCK_CLASSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} - {c.cycle}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t('coefficient')}>
              <input
                type="number"
                min={1}
                max={10}
                value={form.coefficient}
                onChange={(e) => setForm((f) => ({ ...f, coefficient: Number(e.target.value) }))}
                className="field-input"
              />
            </Field>
            <Field label={t('note_maximale')}>
              <input
                type="number"
                min={1}
                max={100}
                value={form.noteMax}
                onChange={(e) => setForm((f) => ({ ...f, noteMax: Number(e.target.value) }))}
                className="field-input"
              />
            </Field>
          </div>

          <Field label={t('enseignant')} hint={t('optionnel_assignable_plus_tard')}>
            <select
              value={form.teacherId ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, teacherId: e.target.value || null }))}
              className="field-input"
            >
              <option value="">{t('non_assigne')}</option>
              {TEACHERS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nom}
                </option>
              ))}
            </select>
          </Field>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => navigate('/root/courses')}>
              {t('annuler')}</Button>
            <Button type="submit" loading={saving}>
              <Save size={15} /> {editing ? 'Enregistrer' : 'Creer le cours'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
