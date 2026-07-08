import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Receipt, UserRound } from 'lucide-react';
import { Card, Button, Avatar, Badge, EmptyState } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { formatMoney, dateShort } from '@/shared/lib/format';
import { PaymentStateView } from './components/PaymentStateView';
import { getStudentState, paymentsForStudent } from './mockData';
import { useTranslation } from "react-i18next";

export function StudentPaymentPage() {
    const { t } = useTranslation();
  const { matricule } = useParams();
  const navigate = useNavigate();
  const state = matricule ? getStudentState(matricule) : undefined;
  const history = matricule ? paymentsForStudent(matricule) : [];

  if (!state) {
    return (
      <div className="w-full space-y-4">
        <button onClick={() => navigate('/scolarite/payments')} className="flex items-center gap-1.5 text-sm font-bold text-ink-soft hover:text-ink">
          <ArrowLeft size={15} /> {t('retour')}</button>
        <div className="surface">
          <EmptyState icon={UserRound} message="Eleve introuvable." />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => navigate('/scolarite/payments')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> {t('retour_aux_paiements')}</button>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={state.studentName} color={avatarColor(state.matricule)} size={44} />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-ink">{state.studentName}</h2>
              <Badge tone={state.overdue ? 'danger' : 'success'}>{state.overdue ? 'En retard' : 'A jour'}</Badge>
            </div>
            <p className="text-xs font-semibold text-ink-soft">
              {state.classCode} {t('matricule')}{state.matricule}
            </p>
          </div>
        </div>
        <Link to={`/scolarite/payments/new?matricule=${state.matricule}`}>
          <Button>
            <Plus size={15} /> {t('enregistrer_un_paiement')}</Button>
        </Link>
      </div>

      <PaymentStateView state={state} />

      <Card>
        <h3 className="mb-3 text-sm font-black text-ink">{t('historique_des_paiements')}</h3>
        {history.length === 0 ? (
          <EmptyState icon={Receipt} message="Aucun paiement enregistre." />
        ) : (
          <div className="divide-y divide-line-soft">
            {history.map((p) => (
              <Link
                key={p.id}
                to={`/scolarite/payments/${p.id}`}
                className="flex items-center gap-3 py-2.5 transition-colors hover:opacity-80"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-canvas text-ink-soft">
                  <Receipt size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-ink">{p.trancheLabel}</p>
                  <p className="text-xs font-semibold text-ink-soft">
                    {p.receiptNo} - {dateShort(p.date)} - {p.modeLabel}
                  </p>
                </div>
                <span className="text-sm font-black text-success">{formatMoney(p.amount)}</span>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
