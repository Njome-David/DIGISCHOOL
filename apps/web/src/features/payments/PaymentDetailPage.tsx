import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Printer, UserRound, Receipt } from 'lucide-react';
import { Button, EmptyState } from '@/shared/components/ui';
import { ReceiptPreview } from './components/ReceiptPreview';
import { findPayment } from './mockData';
import { useTranslation } from "react-i18next";

export function PaymentDetailPage() {
    const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const payment = id ? findPayment(id) : undefined;

  if (!payment) {
    return (
      <div className="w-full space-y-4">
        <button onClick={() => navigate('/scolarite/payments')} className="flex items-center gap-1.5 text-sm font-bold text-ink-soft hover:text-ink">
          <ArrowLeft size={15} /> {t('retour')}</button>
        <div className="surface">
          <EmptyState icon={Receipt} message="Paiement introuvable." />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={() => navigate('/scolarite/payments')}
          className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft size={15} /> {t('retour_aux_paiements')}</button>
        <div className="flex gap-2">
          <Link to={`/scolarite/students/${payment.matricule}`}>
            <Button variant="outline">
              <UserRound size={14} /> {t('etat_de_l_eleve')}</Button>
          </Link>
          <Button>
            <Printer size={14} /> {t('imprimer')}</Button>
        </div>
      </div>

      <ReceiptPreview payment={payment} />
    </div>
  );
}
