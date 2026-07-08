import { useMemo, useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Save, Receipt } from 'lucide-react';
import { Card, Button } from '@/shared/components/ui';
import { Field, Alert, UploadField } from '@/shared/components/form';
import { formatMoney } from '@/shared/lib/format';
import { MOCK_STUDENTS } from '@/features/students/mockData';
import {
  MOCK_MODES,
  getStudentState,
  getTuition,
  nextReceiptNo,
  addPayment,
  type Payment,
} from './mockData';
import { useTranslation } from "react-i18next";

const ENROLLED = MOCK_STUDENTS.filter((s) => s.status === 'enrolled');

export function PaymentFormPage() {
    const { t } = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const activeModes = MOCK_MODES.filter((m) => m.active);

  const [matricule, setMatricule] = useState(params.get('matricule') ?? ENROLLED[0]?.matricule ?? '');
  const state = useMemo(() => (matricule ? getStudentState(matricule) : undefined), [matricule]);
  const tuition = useMemo(() => state && getTuition(state.classId), [state]);

  const firstOpen = state?.trancheStates.find((t) => !t.covered);
  const [trancheId, setTrancheId] = useState(firstOpen?.tranche.id ?? '');
  const selectedTranche = tuition?.tranches.find((t) => t.id === trancheId) ?? firstOpen?.tranche;

  const [amount, setAmount] = useState<number>(firstOpen ? firstOpen.tranche.amount - firstOpen.paid : 0);
  const [modeId, setModeId] = useState(activeModes[0]?.id ?? '');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [proof, setProof] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function onStudentChange(m: string) {
    setMatricule(m);
    const st = getStudentState(m);
    const open = st?.trancheStates.find((t) => !t.covered);
    setTrancheId(open?.tranche.id ?? '');
    setAmount(open ? open.tranche.amount - open.paid : 0);
  }

  function onTrancheChange(id: string) {
    setTrancheId(id);
    const ts = state?.trancheStates.find((t) => t.tranche.id === id);
    if (ts) setAmount(ts.tranche.amount - ts.paid);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!state || !selectedTranche) {
      setError('Selectionnez un eleve et une tranche.');
      return;
    }
    if (amount <= 0) {
      setError('Le montant doit etre superieur a zero.');
      return;
    }
    if (!modeId) {
      setError('Selectionnez un mode de paiement.');
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    const mode = activeModes.find((m) => m.id === modeId)!;
    const payment: Payment = {
      id: `pay${Date.now()}`,
      receiptNo: nextReceiptNo(),
      matricule: state.matricule,
      studentName: state.studentName,
      classCode: state.classCode,
      trancheId: selectedTranche.id,
      trancheLabel: selectedTranche.label,
      amount,
      modeId: mode.id,
      modeLabel: mode.label,
      date,
      recordedBy: 'Admin Scolarite',
    };
    addPayment(payment);
    setSaving(false);
    navigate(`/scolarite/payments/${payment.id}`);
  }

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => navigate('/scolarite/payments')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> {t('retour_aux_paiements')}</button>

      <Card>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-brand-700">
            <Receipt size={20} />
          </div>
          <div>
            <h2 className="text-base font-black text-ink">{t('enregistrer_un_paiement')}</h2>
            <p className="text-xs font-semibold text-ink-soft">{t('generation_automatique_du_recu')}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4">
            <Alert tone="danger">{error}</Alert>
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <Field label={t('eleve')}>
            <select value={matricule} onChange={(e) => onStudentChange(e.target.value)} className="field-input">
              {ENROLLED.map((s) => (
                <option key={s.matricule} value={s.matricule}>
                  {s.firstName} {s.lastName} - {s.classCode} ({s.matricule})
                </option>
              ))}
            </select>
          </Field>

          {state && (
            <div className="flex items-center justify-between rounded-xl bg-canvas px-4 py-3">
              <span className="text-xs font-bold text-ink-soft">{t('solde_restant')}</span>
              <span className="text-sm font-black" style={{ color: state.balance > 0 ? '#DC2626' : '#22A05E' }}>
                {formatMoney(state.balance)}
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={t('tranche')}>
              <select value={trancheId} onChange={(e) => onTrancheChange(e.target.value)} className="field-input">
                {(tuition?.tranches ?? []).map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label} ({formatMoney(t.amount)})
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t('mode_de_paiement')}>
              <select value={modeId} onChange={(e) => setModeId(e.target.value)} className="field-input">
                {activeModes.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t('montant_fcfa')}>
              <input
                type="number"
                min={0}
                step={1000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="field-input"
              />
            </Field>
            <Field label={t('date')}>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="field-input" />
            </Field>
          </div>

          <Field label={t('justificatif')} hint={t('optionnel_recu_scan_ou_capture')}>
            <UploadField value={proof} onChange={setProof} accept=".pdf,.jpg,.jpeg,.png" hint={t('pdf_ou_image_10_mo_maximum')} />
          </Field>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => navigate('/scolarite/payments')}>
              {t('annuler')}</Button>
            <Button type="submit" loading={saving}>
              <Save size={15} /> {t('encaisser_et_generer_le_recu')}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
