import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Wallet } from 'lucide-react';
import { Card, Button } from '@/shared/components/ui';
import { Field, Alert } from '@/shared/components/form';
import { formatMoney } from '@/shared/lib/format';
import { MOCK_CLASSES } from '@/features/academic/mockData';
import { MOCK_TUITIONS } from './mockData';
import { useTranslation } from "react-i18next";

const TRANCHE_LABELS = ['Inscription', '2e tranche', '3e tranche'];
const SPLIT = [0.4, 0.3, 0.3];

function previewTranches(total: number) {
  const first = Math.round((total * SPLIT[0]) / 1000) * 1000;
  const second = Math.round((total * SPLIT[1]) / 1000) * 1000;
  return [first, second, total - first - second];
}

export function TuitionFormPage() {
    const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const existing = id ? MOCK_TUITIONS.find((t) => t.id === id) : undefined;
  const isEdit = Boolean(existing);

  const [form, setForm] = useState({
    classId: existing?.classId ?? MOCK_CLASSES[0]?.id ?? '',
    total: existing?.total ?? 350000,
    yearLabel: existing?.yearLabel ?? '2025-2026',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const amounts = previewTranches(form.total);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (form.total <= 0) {
      setError('Le montant total doit etre superieur a zero.');
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    navigate('/fondateur/tuitions');
  }

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => navigate('/fondateur/tuitions')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> {t('retour_aux_scolarites')}</button>

      <Card>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-brand-700">
            <Wallet size={20} />
          </div>
          <div>
            <h2 className="text-base font-black text-ink">{isEdit ? 'Editer la scolarite' : 'Nouvelle scolarite'}</h2>
            <p className="text-xs font-semibold text-ink-soft">{t('montant_annuel_reparti_en_3_tr')}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4">
            <Alert tone="danger">{error}</Alert>
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={t('classe')}>
              <select
                value={form.classId}
                onChange={(e) => setForm((f) => ({ ...f, classId: e.target.value }))}
                className="field-input"
              >
                {MOCK_CLASSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t('annee_scolaire')}>
              <input value={form.yearLabel} readOnly className="field-input bg-canvas" />
            </Field>
          </div>

          <Field label={t('montant_total_annuel_fcfa')}>
            <input
              type="number"
              min={0}
              step={1000}
              value={form.total}
              onChange={(e) => setForm((f) => ({ ...f, total: Number(e.target.value) }))}
              className="field-input"
            />
          </Field>

          <div className="rounded-xl border border-line-soft bg-canvas p-4">
            <p className="mb-3 text-xs font-black text-ink-soft">{t('repartition_des_tranches')}</p>
            <div className="space-y-2">
              {TRANCHE_LABELS.map((label, i) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm font-bold text-ink">{label}</span>
                  <span className="text-sm font-black text-brand-600">{formatMoney(amounts[i])}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => navigate('/fondateur/tuitions')}>
              {t('annuler')}</Button>
            <Button type="submit" loading={saving}>
              <Save size={15} /> {isEdit ? 'Enregistrer' : 'Creer la scolarite'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
