import { Card, Badge } from '@/shared/components/ui';
import { formatMoney, dateShort } from '@/shared/lib/format';
import { MOCK_TUITIONS } from './mockData';

export function TranchesPage() {
  return (
    <div className="max-w-4xl space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">Gestion des tranches</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">
          Echeancier des paiements par scolarite
        </p>
      </div>

      <div className="space-y-3">
        {MOCK_TUITIONS.map((t) => (
          <Card key={t.id}>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-ink">{t.label}</h3>
                <Badge tone="brand">{t.classCode}</Badge>
              </div>
              <span className="text-sm font-black text-ink">{formatMoney(t.total)}</span>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {t.tranches.map((tr) => (
                <div key={tr.id} className="rounded-xl border border-line-soft bg-canvas p-3">
                  <p className="text-xs font-bold text-ink-soft">{tr.label}</p>
                  <p className="mt-1 text-sm font-black text-ink">{formatMoney(tr.amount)}</p>
                  <p className="mt-0.5 text-xs font-semibold text-ink-faint">Echeance {dateShort(tr.dueDate)}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
