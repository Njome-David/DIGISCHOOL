import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, FolderOpen, Check, CircleDashed } from 'lucide-react';
import { Card, Button, Badge, Avatar, EmptyState } from '@/shared/components/ui';
import { Field, Alert } from '@/shared/components/form';
import { avatarColor } from '@/shared/lib/roleMeta';
import { mockLatency } from '@/shared/lib/format';
import { findStudent } from '@/features/students/mockData';
import { dossierFor, toggleDoc, completeness, isComplete } from './mockData';
import { useTranslation } from "react-i18next";

export function DossierFormPage() {
    const { t } = useTranslation();
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
      <div className="surface w-full">
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
    <div className="w-full space-y-4">
      <button
        onClick={() => navigate('/staff/files')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> {t('retour_aux_dossiers')}</button>

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
          <InfoRow label={t('parent_tuteur')} value={student.parentName} />
          <InfoRow label={t('telephone')} value={student.parentPhone} />
          <InfoRow label={t('email')} value={student.parentEmail} />
          <InfoRow label={t('inscrit_le')} value={student.enrollmentDate} />
        </div>
      </Card>

      <Card>
        <h3 className="mb-3 text-sm font-black text-ink">{t('pieces_du_dossier')}</h3>
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
          <Field label={t('note_administrative')}>
            <textarea
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                setSaved(false);
              }}
              rows={3}
              className="field-input resize-none"
              placeholder={t('observations_sur_le_dossier')}
            />
          </Field>

          {saved && <Alert tone="success">{t('dossier_enregistre_avec_succes')}</Alert>}

          <div className="flex justify-end gap-2">
            <Button type="submit" loading={saving}>
              <Save size={15} /> {t('enregistrer_le_dossier')}</Button>
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
