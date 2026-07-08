import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, DoorOpen } from 'lucide-react';
import { Card, Button, Badge, EmptyState } from '@/shared/components/ui';
import { Field, Alert } from '@/shared/components/form';
import { mockLatency } from '@/shared/lib/format';
import { MOCK_CLASSES, MOCK_SALLES, MOCK_YEARS } from '@/features/academic/mockData';
import { findStudent, updateStudent } from './mockData';
import { useTranslation } from "react-i18next";

export function StudentAssignPage() {
    const { t } = useTranslation();
  const { matricule } = useParams<{ matricule: string }>();
  const navigate = useNavigate();
  const student = matricule ? findStudent(matricule) : undefined;

  const [classId, setClassId] = useState(student?.classId ?? MOCK_CLASSES[0]?.id ?? '');
  const [salleId, setSalleId] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!student) {
    return (
      <div className="surface w-full">
        <EmptyState icon={DoorOpen} message="Eleve introuvable." />
      </div>
    );
  }

  const currentYear = MOCK_YEARS.find((y) => y.active);
  const sallesForClass = MOCK_SALLES.filter((s) => s.classId === classId);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await mockLatency(600);
    const cls = MOCK_CLASSES.find((c) => c.id === classId);
    updateStudent(student!.matricule, { classId, classCode: cls?.code ?? student!.classCode });
    setSaving(false);
    setSaved(true);
  }

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => navigate(`/admin/students/${student.matricule}`)}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> {t('retour_a_la_fiche')}</button>

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-brand-700">
          <DoorOpen size={20} />
        </div>
        <div>
          <h2 className="text-base font-black text-ink">{t('affectation_classe_salle')}</h2>
          <p className="text-xs font-semibold text-ink-soft">
            {student.firstName} {student.lastName} {t('annee')}{currentYear?.label ?? '-'}
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <Card>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={t('classe')}>
              <select value={classId} onChange={(e) => { setClassId(e.target.value); setSalleId(''); setSaved(false); }} className="field-input">
                {MOCK_CLASSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} - {c.cycle}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t('salle')} hint={sallesForClass.length === 0 ? 'Aucune salle pour cette classe' : undefined}>
              <select value={salleId} onChange={(e) => { setSalleId(e.target.value); setSaved(false); }} className="field-input" disabled={sallesForClass.length === 0}>
                <option value="">{t('selectionner_une_salle')}</option>
                {sallesForClass.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label} ({s.surface} {t('m2')}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-canvas px-4 py-3">
            <span className="text-xs font-bold text-ink-soft">{t('classe_actuelle')}</span>
            <Badge tone="brand">{student.classCode}</Badge>
          </div>
        </Card>

        {saved && <Alert tone="success">{t('affectation_enregistree_pour_l')}</Alert>}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate(`/admin/students/${student.matricule}`)}>
            {t('annuler')}</Button>
          <Button type="submit" loading={saving}>
            <Save size={15} /> {t('enregistrer_l_affectation')}</Button>
        </div>
      </form>
    </div>
  );
}
