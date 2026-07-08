import { useMemo, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, ShieldAlert, Info } from 'lucide-react';
import { Card, Button } from '@/shared/components/ui';
import { Field, Alert } from '@/shared/components/form';
import { mockLatency } from '@/shared/lib/format';
import { useAuthStore } from '@/features/auth/store';
import { MOCK_STUDENTS } from '@/features/students/mockData';
import { SeverityTag } from './components/tags';
import {
  activeRefs,
  addReport,
  GRAVE_THRESHOLD,
  type DisciplineReport,
} from './mockData';
import { useTranslation } from "react-i18next";

const ENROLLED = MOCK_STUDENTS.filter((s) => s.status === 'enrolled');

export function DisciplineReportForm() {
    const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const refs = activeRefs();

  const [matricule, setMatricule] = useState(ENROLLED[0]?.matricule ?? '');
  const [refId, setRefId] = useState(refs[0]?.id ?? '');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [comment, setComment] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const selectedRef = useMemo(() => refs.find((r) => r.id === refId), [refId, refs]);
  const isGrave = (selectedRef?.points ?? 0) >= GRAVE_THRESHOLD;

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    const student = ENROLLED.find((s) => s.matricule === matricule);
    if (!student || !selectedRef) {
      setError('Selectionnez un eleve et une faute.');
      return;
    }
    setSaving(true);
    await mockLatency(700);
    const report: DisciplineReport = {
      id: `r${Date.now()}`,
      matricule: student.matricule,
      studentName: `${student.firstName} ${student.lastName}`,
      classCode: student.classCode,
      refId: selectedRef.id,
      label: selectedRef.label,
      points: selectedRef.points,
      date,
      term: 'Trimestre 3',
      reportedBy: user?.nom ?? 'Enseignant',
      comment: comment.trim(),
      status: isGrave ? 'pending' : 'approved',
    };
    addReport(report);
    setSaving(false);
    navigate('/teacher/discipline');
  }

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => navigate('/teacher/discipline')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> {t('retour_a_mes_rapports')}</button>

      <Card>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-brand-700">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h2 className="text-base font-black text-ink">{t('saisir_un_rapport_disciplinair')}</h2>
            <p className="text-xs font-semibold text-ink-soft">{t('les_rapports_graves_sont_valid')}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4">
            <Alert tone="danger">{error}</Alert>
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <Field label={t('eleve')}>
            <select value={matricule} onChange={(e) => setMatricule(e.target.value)} className="field-input">
              {ENROLLED.map((s) => (
                <option key={s.matricule} value={s.matricule}>
                  {s.firstName} {s.lastName} - {s.classCode}
                </option>
              ))}
            </select>
          </Field>

          <Field label={t('faute_referentiel')}>
            <select value={refId} onChange={(e) => setRefId(e.target.value)} className="field-input">
              {refs.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label} ({r.points} {t('pt')}{r.points > 1 ? 's' : ''})
                </option>
              ))}
            </select>
          </Field>

          {selectedRef && (
            <div className="flex items-center justify-between rounded-xl bg-canvas px-4 py-3">
              <span className="text-xs font-bold text-ink-soft">{t('gravite')}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-ink">{selectedRef.points} {t('pts')}</span>
                <SeverityTag points={selectedRef.points} />
              </div>
            </div>
          )}

          <Field label={t('date')}>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="field-input" />
          </Field>

          <Field label={t('commentaire')}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="field-input resize-none"
              placeholder={t('circonstances_de_l_incident')}
            />
          </Field>

          {isGrave && (
            <Alert tone="info" icon={Info}>
              {t('ce_rapport_est_grave_seuil_de')}{GRAVE_THRESHOLD} {t('points_et_sera_soumis_a_la_val')}</Alert>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => navigate('/teacher/discipline')}>
              {t('annuler')}</Button>
            <Button type="submit" loading={saving}>
              <Save size={15} /> {t('enregistrer_le_rapport')}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
