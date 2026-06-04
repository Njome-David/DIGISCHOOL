import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Wallet, FileText } from 'lucide-react';
import { Avatar, Badge, EmptyState, Button } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { getStudentState } from '@/features/payments/mockData';
import { PaymentStateView } from '@/features/payments/components/PaymentStateView';

export function ChildPaymentsPage() {
  const { matricule } = useParams();
  const navigate = useNavigate();
  const state = matricule ? getStudentState(matricule) : undefined;

  return (
    <div className="max-w-3xl space-y-4">
      <button
        onClick={() => navigate('/parent/children')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> Mes enfants
      </button>

      {!state ? (
        <div className="surface">
          <EmptyState icon={Wallet} message="Aucune information de scolarite disponible." />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar name={state.studentName} color={avatarColor(state.matricule)} size={42} />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-ink">{state.studentName}</h2>
                  <Badge tone={state.overdue ? 'danger' : 'success'}>{state.overdue ? 'En retard' : 'A jour'}</Badge>
                </div>
                <p className="text-xs font-semibold text-ink-soft">Scolarite - {state.classCode}</p>
              </div>
            </div>
            <Link to={`/parent/children/${state.matricule}/receipts`}>
              <Button variant="outline">
                <FileText size={14} /> Mes recus
              </Button>
            </Link>
          </div>

          <PaymentStateView state={state} />
        </>
      )}
    </div>
  );
}
