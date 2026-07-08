import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Receipt, Download, Eye, X } from 'lucide-react';
import { Card, Avatar, EmptyState, Button } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { formatMoney, dateShort } from '@/shared/lib/format';
import { findStudent } from '@/features/students/mockData';
import { paymentsForStudent, type Payment } from '@/features/payments/mockData';
import { ReceiptPreview } from '@/features/payments/components/ReceiptPreview';
import { useTranslation } from "react-i18next";

export function ChildReceiptsPage() {
    const { t } = useTranslation();
  const { matricule } = useParams();
  const navigate = useNavigate();
  const child = matricule ? findStudent(matricule) : undefined;
  const payments = matricule ? paymentsForStudent(matricule) : [];
  const [preview, setPreview] = useState<Payment | null>(null);

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => navigate('/parent/children')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> {t('mes_enfants')}</button>

      {child && (
        <div className="flex items-center gap-3">
          <Avatar name={`${child.firstName} ${child.lastName}`} color={avatarColor(child.matricule)} size={42} />
          <div>
            <h2 className="text-base font-black text-ink">
              {child.firstName} {child.lastName}
            </h2>
            <p className="text-xs font-semibold text-ink-soft">{t('recus_de_paiement')}{child.classCode}</p>
          </div>
        </div>
      )}

      {payments.length === 0 ? (
        <div className="surface">
          <EmptyState icon={Receipt} message="Aucun recu disponible." />
        </div>
      ) : (
        <div className="space-y-3">
          {payments.map((p) => (
            <Card key={p.id} className="flex flex-wrap items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-700">
                <Receipt size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-black text-ink">{p.trancheLabel}</h3>
                <p className="text-xs font-semibold text-ink-soft">
                  {p.receiptNo} - {dateShort(p.date)} - {p.modeLabel}
                </p>
              </div>
              <span className="text-sm font-black text-success">{formatMoney(p.amount)}</span>
              <div className="flex shrink-0 gap-2">
                <Button variant="outline" onClick={() => setPreview(p)}>
                  <Eye size={14} /> {t('apercu')}</Button>
                <Button>
                  <Download size={14} /> {t('telecharger')}</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {preview && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setPreview(null)} role="presentation" />
          <div className="relative z-50 max-h-[88vh] w-full w-full overflow-y-auto">
            <div className="mb-2 flex justify-end">
              <button
                onClick={() => setPreview(null)}
                className="rounded-full bg-white p-2 text-ink-soft shadow-card transition-colors hover:text-ink"
                aria-label="Fermer"
              >
                <X size={16} />
              </button>
            </div>
            <ReceiptPreview payment={preview} />
          </div>
        </div>
      )}
    </div>
  );
}
