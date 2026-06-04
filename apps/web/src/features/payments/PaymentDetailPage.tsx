import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Printer, UserRound, Receipt } from 'lucide-react';
import { Button, EmptyState } from '@/shared/components/ui';
import { ReceiptPreview } from './components/ReceiptPreview';
import { findPayment } from './mockData';

export function PaymentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const payment = id ? findPayment(id) : undefined;

  if (!payment) {
    return (
      <div className="max-w-2xl space-y-4">
        <button onClick={() => navigate('/scolarite/payments')} className="flex items-center gap-1.5 text-sm font-bold text-ink-soft hover:text-ink">
          <ArrowLeft size={15} /> Retour
        </button>
        <div className="surface">
          <EmptyState icon={Receipt} message="Paiement introuvable." />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={() => navigate('/scolarite/payments')}
          className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft size={15} /> Retour aux paiements
        </button>
        <div className="flex gap-2">
          <Link to={`/scolarite/students/${payment.matricule}`}>
            <Button variant="outline">
              <UserRound size={14} /> Etat de l'eleve
            </Button>
          </Link>
          <Button>
            <Printer size={14} /> Imprimer
          </Button>
        </div>
      </div>

      <ReceiptPreview payment={payment} />
    </div>
  );
}
