import { GraduationCap, CheckCircle } from 'lucide-react';
import { formatMoney, dateLong } from '@/shared/lib/format';
import type { Payment } from '../mockData';

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line-soft py-2.5 last:border-0">
      <span className="text-xs font-semibold text-ink-soft">{label}</span>
      <span className="text-sm font-bold text-ink">{value}</span>
    </div>
  );
}

export function ReceiptPreview({ payment }: { payment: Payment }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <div className="mb-4 flex items-center justify-between border-b border-line-soft pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-brand-700">
            <GraduationCap size={20} />
          </div>
          <div>
            <p className="text-sm font-black text-ink">EcoleApp 2026</p>
            <p className="text-xs font-semibold text-ink-soft">Recu de paiement</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-ink-soft">N. recu</p>
          <p className="text-sm font-black text-brand-600">{payment.receiptNo}</p>
        </div>
      </div>

      <div className="mb-4">
        <Row label="Eleve" value={payment.studentName} />
        <Row label="Matricule" value={payment.matricule} />
        <Row label="Classe" value={payment.classCode} />
        <Row label="Tranche" value={payment.trancheLabel} />
        <Row label="Mode de paiement" value={payment.modeLabel} />
        <Row label="Date" value={dateLong(payment.date)} />
        <Row label="Encaisse par" value={payment.recordedBy} />
      </div>

      <div className="flex items-center justify-between rounded-xl bg-success-bg px-4 py-3">
        <span className="flex items-center gap-1.5 text-sm font-bold text-success">
          <CheckCircle size={16} /> Montant regle
        </span>
        <span className="text-lg font-black text-success">{formatMoney(payment.amount)}</span>
      </div>
    </div>
  );
}
