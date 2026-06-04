import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, FolderOpen, Check, CircleDashed } from 'lucide-react';
import { Card, Button, Badge, Avatar, EmptyState } from '@/shared/components/ui';
import { Field, Alert } from '@/shared/components/form';
import { avatarColor } from '@/shared/lib/roleMeta';
import { mockLatency } from '@/shared/lib/format';
import { findStudent } from '@/features/students/mockData';
import { dossierFor, toggleDoc, completeness, isComplete } from './mockData';

export function DossierFormPage() {
  const { matricule } = useParams<{ matricule: string }>();
  const navigate = useNavigate();
  const student = matricule ? findStudent(matricule) : undefined;
  const dossier = matricule ? dossierFor(matricule) : undefined;

  const [, force] = useState(0);
  const [note, setNote] = useState(dossier?.note ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!student || !dossier) {
    return (
      <div className="surface max-w-2xl">
        <EmptyState icon={FolderOpen} message="Dossier introuvable." />
      </div>
    );
  }

  function handleToggle(key: string) {
    toggleDoc(dossier!.matricule, key);
    setSaved(false);
    force((n) => n + 1);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    await mockLatency(600);
    dossier!.note = note.trim();
    setSaving(false);
    setSaved(true);
  }

  return (
    <div className="max-w-2xl space-y-4">
      <button
        onClick={() => navigate('/staff/files')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> Retour aux dossiers
      </button>

      <Card>
        <div className="flex items-center gap-3">
          <Avatar name={dossier.studentName} seed={dossier.matricule} color={avatarColor(dossier.matricule)} size={48} />
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-black text-ink">{dossier.studentName}</h2>
            <p className="text-xs font-semibold text-ink-soft">
              {student.classCode} - {student.matricule}
            </p>
          </div>
          <Badge tone={isComplete(dossier) ? 'success' : 'warning'}>{completeness(dossier)}%</Badge>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <InfoRow label="Parent / Tuteur" value={student.parentName} />
          <InfoRow label="Telephone" value={student.parentPhone} />
          <InfoRow label="Email" value={student.parentEmail} />
          <InfoRow label="Inscrit le" value={student.enrollmentDate} />
        </div>
      </Card>

      <Card>
        <h3 className="mb-3 text-sm font-black text-ink">Pieces du dossier</h3>
        <div className="space-y-2">
          {dossier.docs.map((doc) => (
            <button
              key={doc.key}
              type="button"
              onClick={() => handleToggle(doc.key)}
              className="flex w-full items-center gap-3 rounded-xl border border-line bg-field px-4 py-3 text-left transition-colors hover:border-brand-300"
            >
              <span
                className={
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full ' +
                  (doc.provided ? 'bg-success text-white' : 'bg-canvas text-ink-faint')
                }
              >
                {doc.provided ? <Check size={14} /> : <CircleDashed size={14} />}
              </span>
              <span className="flex-1 text-sm font-bold text-ink">{doc.label}</span>
              <Badge tone={doc.provided ? 'success' : 'neutral'}>{doc.provided ? 'Fourni' : 'Manquant'}</Badge>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <form onSubmit={submit} className="space-y-4">
          <Field label="Note administrative">
            <textarea
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                setSaved(false);
              }}
              rows={3}
              className="field-input resize-none"
              placeholder="Observations sur le dossier..."
            />
          </Field>

          {saved && <Alert tone="success">Dossier enregistre avec succes.</Alert>}

          <div className="flex justify-end gap-2">
            <Button type="submit" loading={saving}>
              <Save size={15} /> Enregistrer le dossier
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-canvas px-3 py-2.5">
      <p className="text-[11px] font-bold uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="truncate text-sm font-bold text-ink">{value}</p>
    </div>
  );
}
