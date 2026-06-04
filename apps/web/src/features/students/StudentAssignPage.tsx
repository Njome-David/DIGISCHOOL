import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, DoorOpen } from 'lucide-react';
import { Card, Button, Badge, EmptyState } from '@/shared/components/ui';
import { Field, Alert } from '@/shared/components/form';
import { mockLatency } from '@/shared/lib/format';
import { MOCK_CLASSES, MOCK_SALLES, MOCK_YEARS } from '@/features/academic/mockData';
import { findStudent, updateStudent } from './mockData';

export function StudentAssignPage() {
  const { matricule } = useParams<{ matricule: string }>();
  const navigate = useNavigate();
  const student = matricule ? findStudent(matricule) : undefined;

  const [classId, setClassId] = useState(student?.classId ?? MOCK_CLASSES[0]?.id ?? '');
  const [salleId, setSalleId] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!student) {
    return (
      <div className="surface max-w-2xl">
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
    <div className="max-w-2xl space-y-4">
      <button
        onClick={() => navigate(`/admin/students/${student.matricule}`)}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> Retour a la fiche
      </button>

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-brand-700">
          <DoorOpen size={20} />
        </div>
        <div>
          <h2 className="text-base font-black text-ink">Affectation classe / salle</h2>
          <p className="text-xs font-semibold text-ink-soft">
            {student.firstName} {student.lastName} - Annee {currentYear?.label ?? '-'}
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <Card>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Classe">
              <select value={classId} onChange={(e) => { setClassId(e.target.value); setSalleId(''); setSaved(false); }} className="field-input">
                {MOCK_CLASSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} - {c.cycle}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Salle" hint={sallesForClass.length === 0 ? 'Aucune salle pour cette classe' : undefined}>
              <select value={salleId} onChange={(e) => { setSalleId(e.target.value); setSaved(false); }} className="field-input" disabled={sallesForClass.length === 0}>
                <option value="">Selectionner une salle</option>
                {sallesForClass.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label} ({s.surface} m2)
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-canvas px-4 py-3">
            <span className="text-xs font-bold text-ink-soft">Classe actuelle</span>
            <Badge tone="brand">{student.classCode}</Badge>
          </div>
        </Card>

        {saved && <Alert tone="success">Affectation enregistree pour l'annee courante.</Alert>}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => navigate(`/admin/students/${student.matricule}`)}>
            Annuler
          </Button>
          <Button type="submit" loading={saving}>
            <Save size={15} /> Enregistrer l'affectation
          </Button>
        </div>
      </form>
    </div>
  );
}
