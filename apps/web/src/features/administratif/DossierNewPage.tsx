import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, FolderPlus, User, Users } from 'lucide-react';
import { Card, Button, SectionTitle } from '@/shared/components/ui';
import { Field, Alert, UploadField } from '@/shared/components/form';
import { mockLatency } from '@/shared/lib/format';
import { MOCK_CLASSES } from '@/features/academic/mockData';
import { addStudent, MOCK_STUDENTS, type Student } from '@/features/students/mockData';
import { useTranslation } from "react-i18next";

const nextMatricule = () => `2026-${String(MOCK_STUDENTS.length + 1).padStart(3, '0')}`;

export function DossierNewPage() {
    const { t } = useTranslation();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'M' as 'M' | 'F',
    nationality: 'Camerounaise',
    classId: MOCK_CLASSES[0]?.id ?? '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    birthCert: null as string | null,
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
    navigate('/staff/files');
  }

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => navigate('/staff/files')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> {t('retour_aux_dossiers')}</button>

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-brand-700">
          <FolderPlus size={20} />
        </div>
        <div>
          <h2 className="text-base font-black text-ink">{t('saisie_d_un_dossier_d_inscript')}</h2>
          <p className="text-xs font-semibold text-ink-soft">{t('demande_complete_eleve_et_tute')}</p>
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
              <input type="date" value={form.dateOfBirth} onChange={(e) => set('dateOfBirth', e.target.value)} className="field-input" />
            </Field>
            <Field label={t('sexe')}>
              <select value={form.gender} onChange={(e) => set('gender', e.target.value as 'M' | 'F')} className="field-input">
                <option value="M">{t('masculin')}</option>
                <option value="F">{t('feminin')}</option>
              </select>
            </Field>
            <Field label={t('nationalite')}>
              <input value={form.nationality} onChange={(e) => set('nationality', e.target.value)} className="field-input" />
            </Field>
            <Field label={t('classe_demandee')}>
              <select value={form.classId} onChange={(e) => set('classId', e.target.value)} className="field-input">
                {MOCK_CLASSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} - {c.cycle}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={t('acte_de_naissance')} hint={t('pdf_ou_image')}>
              <UploadField value={form.birthCert} onChange={(name) => set('birthCert', name)} accept=".pdf,.jpg,.jpeg,.png" hint={t('pdf_jpg_ou_png')} />
            </Field>
            <Field label={t('photo_de_l_eleve')} hint={t('optionnel')}>
              <UploadField value={form.photo} onChange={(name) => set('photo', name)} accept=".jpg,.jpeg,.png" hint={t('jpg_ou_png')} />
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
              <input value={form.parentPhone} onChange={(e) => set('parentPhone', e.target.value)} className="field-input" placeholder={t('237_6xx_xxx_xxx')} />
            </Field>
            <Field label={t('email')} hint={t('optionnel')}>
              <input type="email" value={form.parentEmail} onChange={(e) => set('parentEmail', e.target.value)} className="field-input" />
            </Field>
          </div>
        </Card>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate('/staff/files')}>
            {t('annuler')}</Button>
          <Button type="submit" loading={saving}>
            <Save size={15} /> {t('enregistrer_le_dossier')}</Button>
        </div>
      </form>
    </div>
  );
}
