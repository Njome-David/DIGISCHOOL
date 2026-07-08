import { GraduationCap, CheckCircle } from 'lucide-react';
import { formatMoney, dateLong } from '@/shared/lib/format';
import type { Payment } from '../mockData';
import { useTranslation } from "react-i18next";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line-soft py-2.5 last:border-0">
      <span className="text-xs font-semibold text-ink-soft">{label}</span>
      <span className="text-sm font-bold text-ink">{value}</span>
    </div>
  );
}

export function ReceiptPreview({ payment }: { payment: Payment }) {
    const { t } = useTranslation();
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <div className="mb-4 flex items-center justify-between border-b border-line-soft pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-brand-700">
            <GraduationCap size={20} />
          </div>
          <div>
            <p className="text-sm font-black text-ink">{t('ecoleapp_2026')}</p>
            <p className="text-xs font-semibold text-ink-soft">{t('recu_de_paiement')}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-ink-soft">{t('n_recu')}</p>
          <p className="text-sm font-black text-brand-600">{payment.receiptNo}</p>
        </div>
      </div>

      <div className="mb-4">
        <Row label={t('eleve')} value={payment.studentName} />
        <Row label={t('matricule')} value={payment.matricule} />
        <Row label={t('classe')} value={payment.classCode} />
        <Row label={t('tranche')} value={payment.trancheLabel} />
        <Row label={t('mode_de_paiement')} value={payment.modeLabel} />
        <Row label={t('date')} value={dateLong(payment.date)} />
        <Row label={t('encaisse_par')} value={payment.recordedBy} />
      </div>

      <div className="flex items-center justify-between rounded-xl bg-success-bg px-4 py-3">
        <span className="flex items-center gap-1.5 text-sm font-bold text-success">
          <CheckCircle size={16} /> {t('montant_regle')}</span>
        <span className="text-lg font-black text-success">{formatMoney(payment.amount)}</span>
      </div>
    </div>
  );
}
