import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Users } from 'lucide-react';
import { Card, Button, SectionTitle } from '@/shared/components/ui';
import { Field, Alert } from '@/shared/components/form';
import { mockLatency } from '@/shared/lib/format';
import { SUBJECT_OPTIONS } from '@/features/pedagogy/mockData';
import { findPersonnel, upsertPersonnel, type Personnel } from './mockData';
import { useTranslation } from "react-i18next";

export function PersonnelFormPage() {
    const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const existing = id ? findPersonnel(id) : undefined;

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    nom: existing?.nom ?? '',
    type: (existing?.type ?? 'teacher') as 'teacher' | 'staff',
    subject: existing?.subject ?? SUBJECT_OPTIONS[0].label,
    email: existing?.email ?? '',
    phone: existing?.phone ?? '',
    classes: existing?.classes.join(', ') ?? '',
    status: (existing?.status ?? 'active') as 'active' | 'inactive',
  });

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.nom.trim() || !form.email.trim()) {
      setError('Le nom et l email sont obligatoires.');
      return;
    }
    setSaving(true);
    await mockLatency();
    const person: Personnel = {
      id: existing?.id ?? `p${Date.now()}`,
      nom: form.nom.trim(),
      type: form.type,
      subject: form.type === 'teacher' ? form.subject : undefined,
      classes: form.classes.split(',').map((c) => c.trim()).filter(Boolean),
      email: form.email.trim(),
      phone: form.phone.trim(),
      status: form.status,
      hireDate: existing?.hireDate ?? new Date().toISOString().slice(0, 10),
    };
    upsertPersonnel(person);
    setSaving(false);
    navigate('/root/personnel');
  }

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => navigate('/root/personnel')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> {t('retour_au_personnel')}</button>

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-brand-700">
          <Users size={20} />
        </div>
        <div>
          <h2 className="text-base font-black text-ink">{existing ? 'Modifier le personnel' : 'Nouveau personnel'}</h2>
          <p className="text-xs font-semibold text-ink-soft">{t('enseignant_ou_agent_administra')}</p>
        </div>
      </div>

      {error && <Alert tone="danger">{error}</Alert>}

      <form onSubmit={submit} className="space-y-4">
        <Card>
          <SectionTitle className="mb-4">{t('identite')}</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={t('nom_complet')}>
              <input value={form.nom} onChange={(e) => set('nom', e.target.value)} className="field-input" />
            </Field>
            <Field label={t('type')}>
              <select value={form.type} onChange={(e) => set('type', e.target.value as 'teacher' | 'staff')} className="field-input">
                <option value="teacher">{t('enseignant')}</option>
                <option value="staff">{t('agent_administratif')}</option>
              </select>
            </Field>
            {form.type === 'teacher' && (
              <Field label={t('matiere')}>
                <select value={form.subject} onChange={(e) => set('subject', e.target.value)} className="field-input">
                  {SUBJECT_OPTIONS.map((s) => (
                    <option key={s.code} value={s.label}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </Field>
            )}
            <Field label={t('statut')}>
              <select value={form.status} onChange={(e) => set('status', e.target.value as 'active' | 'inactive')} className="field-input">
                <option value="active">{t('actif')}</option>
                <option value="inactive">{t('inactif')}</option>
              </select>
            </Field>
          </div>
        </Card>

        <Card>
          <SectionTitle className="mb-4">{t('coordonnees_affectation')}</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={t('email')}>
              <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className="field-input" />
            </Field>
            <Field label={t('telephone')}>
              <input value={form.phone} onChange={(e) => set('phone', e.target.value)} className="field-input" placeholder={t('237_6xx_xxx_xxx')} />
            </Field>
            {form.type === 'teacher' && (
              <Field label={t('classes')} hint={t('separees_par_des_virgules_ex_c')}>
                <input value={form.classes} onChange={(e) => set('classes', e.target.value)} className="field-input" />
              </Field>
            )}
          </div>
        </Card>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate('/root/personnel')}>
            {t('annuler')}</Button>
          <Button type="submit" loading={saving}>
            <Save size={15} /> {existing ? 'Enregistrer' : 'Creer le compte'}
          </Button>
        </div>
      </form>
    </div>
  );
}
