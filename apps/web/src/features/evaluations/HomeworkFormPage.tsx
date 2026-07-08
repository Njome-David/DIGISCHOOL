import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { Card, Button } from '@/shared/components/ui';
import { Field, Alert, UploadField } from '@/shared/components/form';
import { useAuthStore } from '@/features/auth/store';
import { MOCK_PERSONNEL } from '@/features/accounts/mockData';
import { coursesForTeacher } from '@/features/pedagogy/mockData';
import { mockLatency } from '@/shared/lib/format';
import { useTranslation } from "react-i18next";

function resolveTeacher(nom: string | undefined) {
  return MOCK_PERSONNEL.find((p) => p.type === 'teacher' && p.nom === nom) ?? MOCK_PERSONNEL[0];
}

export function HomeworkFormPage() {
    const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const teacher = resolveTeacher(user?.nom);
  const myCourses = coursesForTeacher(teacher.id);

  const [form, setForm] = useState({
    title: '',
    kind: 'devoir' as 'devoir' | 'corrige',
    courseId: myCourses[0]?.id ?? '',
    fileName: null as string | null,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.title.trim() || !form.fileName) {
      setError('Le titre et le fichier sont obligatoires.');
      return;
    }
    setSaving(true);
    await mockLatency();
    setSaving(false);
    navigate('/teacher/exams');
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
            <Upload size={20} />
          </div>
          <div>
            <h2 className="text-base font-black text-ink">{t('televerser_un_devoir_corrige')}</h2>
            <p className="text-xs font-semibold text-ink-soft">{t('mis_a_disposition_des_eleves_e')}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4">
            <Alert tone="danger">{error}</Alert>
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <Field label={t('titre')}>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="field-input"
              placeholder={t('ex_devoir_de_revision_chapitre')}
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={t('type')}>
              <select
                value={form.kind}
                onChange={(e) => setForm((f) => ({ ...f, kind: e.target.value as 'devoir' | 'corrige' }))}
                className="field-input"
              >
                <option value="devoir">{t('devoir')}</option>
                <option value="corrige">{t('corrige')}</option>
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
          </div>

          <Field label={t('fichier')}>
            <UploadField value={form.fileName} onChange={(name) => setForm((f) => ({ ...f, fileName: name }))} />
          </Field>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => navigate('/teacher/exams')}>
              {t('annuler')}</Button>
            <Button type="submit" loading={saving}>
              <Save size={15} /> {t('televerser')}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
