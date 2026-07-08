import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, GraduationCap, User, Users } from 'lucide-react';
import { Card, Button, SectionTitle } from '@/shared/components/ui';
import { Field, Alert, UploadField } from '@/shared/components/form';
import { mockLatency } from '@/shared/lib/format';
import { MOCK_CLASSES } from '@/features/academic/mockData';
import { addStudent, updateStudent, findStudent, MOCK_STUDENTS, type Student } from './mockData';
import { useTranslation } from "react-i18next";

const nextMatricule = () => `2026-${String(MOCK_STUDENTS.length + 1).padStart(3, '0')}`;

export function StudentFormPage() {
    const { t } = useTranslation();
  const navigate = useNavigate();
  const { matricule } = useParams<{ matricule: string }>();
  const existing = matricule ? findStudent(matricule) : undefined;
  const isEdit = Boolean(existing);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: existing?.firstName ?? '',
    lastName: existing?.lastName ?? '',
    dateOfBirth: existing?.dateOfBirth ?? '',
    gender: (existing?.gender ?? 'M') as 'M' | 'F',
    nationality: existing?.nationality ?? 'Camerounaise',
    classId: existing?.classId ?? MOCK_CLASSES[0]?.id ?? '',
    parentName: existing?.parentName ?? '',
    parentPhone: existing?.parentPhone ?? '',
    parentEmail: existing?.parentEmail ?? '',
    photo: null as string | null,
  });

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.firstName.trim() || !form.lastName.trim() || !form.dateOfBirth) {
      setError('Le prenom, le nom et la date de naissance sont obligatoires.');
      return;
    }
    if (!form.parentName.trim() || !form.parentPhone.trim()) {
      setError('Les coordonnees du parent sont obligatoires.');
      return;
    }
    setSaving(true);
    await mockLatency();
    const cls = MOCK_CLASSES.find((c) => c.id === form.classId);
    if (isEdit && existing) {
      updateStudent(existing.matricule, {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        dateOfBirth: form.dateOfBirth,
        gender: form.gender,
        nationality: form.nationality,
        classCode: cls?.code ?? existing.classCode,
        classId: form.classId,
        parentName: form.parentName.trim(),
        parentPhone: form.parentPhone.trim(),
        parentEmail: form.parentEmail.trim(),
      });
      setSaving(false);
      navigate(`/admin/students/${existing.matricule}`);
      return;
    }
    const student: Student = {
      matricule: nextMatricule(),
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      dateOfBirth: form.dateOfBirth,
      gender: form.gender,
      nationality: form.nationality,
      classCode: cls?.code ?? '',
      classId: form.classId,
      parentName: form.parentName.trim(),
      parentPhone: form.parentPhone.trim(),
      parentEmail: form.parentEmail.trim(),
      enrollmentDate: new Date().toISOString().slice(0, 10),
      status: 'enrolled',
    };
    addStudent(student);
    setSaving(false);
    navigate(`/admin/students/${student.matricule}`);
  }

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => navigate('/admin/students')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> {t('retour_a_la_liste')}</button>

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-brand-700">
          <GraduationCap size={20} />
        </div>
        <div>
          <h2 className="text-base font-black text-ink">
            {isEdit ? `Modifier ${existing?.firstName} ${existing?.lastName}` : 'Inscrire un nouvel eleve'}
          </h2>
          <p className="text-xs font-semibold text-ink-soft">
            {isEdit ? `Matricule ${existing?.matricule}` : 'Le matricule sera genere automatiquement.'}
          </p>
        </div>
      </div>

      {error && <Alert tone="danger">{error}</Alert>}

      <form onSubmit={submit} className="space-y-4">
        <Card>
          <div className="mb-4 flex items-center gap-2">
            <User size={15} className="text-brand-500" />
            <SectionTitle>{t('informations_de_l_eleve')}</SectionTitle>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={t('prenom')}>
              <input value={form.firstName} onChange={(e) => set('firstName', e.target.value)} className="field-input" />
            </Field>
            <Field label={t('nom')}>
              <input value={form.lastName} onChange={(e) => set('lastName', e.target.value)} className="field-input" />
            </Field>
            <Field label={t('date_de_naissance')}>
              <input
                type="date"
                value={form.dateOfBirth}
                onChange={(e) => set('dateOfBirth', e.target.value)}
                className="field-input"
              />
            </Field>
            <Field label={t('sexe')}>
              <select value={form.gender} onChange={(e) => set('gender', e.target.value as 'M' | 'F')} className="field-input">
                <option value="M">{t('masculin')}</option>
                <option value="F">{t('feminin')}</option>
              </select>
            </Field>
            <Field label={t('nationalite')}>
              <input
                value={form.nationality}
                onChange={(e) => set('nationality', e.target.value)}
                className="field-input"
              />
            </Field>
            <Field label={t('classe')}>
              <select value={form.classId} onChange={(e) => set('classId', e.target.value)} className="field-input">
                {MOCK_CLASSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code}  {c.cycle}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="mt-4">
            <Field label={t('photo_de_l_eleve')} hint={t('optionnel_jpg_ou_png_10_mo_max')}>
              <UploadField
                value={form.photo}
                onChange={(name) => set('photo', name)}
                accept=".jpg,.jpeg,.png"
                hint={t('jpg_ou_png_10_mo_maximum')}
              />
            </Field>
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center gap-2">
            <Users size={15} className="text-brand-500" />
            <SectionTitle>{t('parent_tuteur')}</SectionTitle>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={t('nom_du_parent')}>
              <input value={form.parentName} onChange={(e) => set('parentName', e.target.value)} className="field-input" />
            </Field>
            <Field label={t('telephone')}>
              <input
                value={form.parentPhone}
                onChange={(e) => set('parentPhone', e.target.value)}
                className="field-input"
                placeholder={t('237_6xx_xxx_xxx')}
              />
            </Field>
            <Field label={t('email')} hint={t('optionnel')}>
              <input
                type="email"
                value={form.parentEmail}
                onChange={(e) => set('parentEmail', e.target.value)}
                className="field-input"
              />
            </Field>
          </div>
        </Card>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/students')}>
            {t('annuler')}</Button>
          <Button type="submit" loading={saving}>
            <Save size={15} /> {isEdit ? 'Enregistrer' : "Inscrire l'eleve"}
          </Button>
        </div>
      </form>
    </div>
  );
}
