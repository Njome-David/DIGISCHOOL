import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Receipt, Plus, AlertTriangle, ChevronRight } from 'lucide-react';
import { SearchInput, Badge, EmptyState, Button, Avatar, FilterTabs, type FilterOption } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { formatMoney, dateShort } from '@/shared/lib/format';
import { MOCK_PAYMENTS, MOCK_MODES } from './mockData';
import { useTranslation } from "react-i18next";

export function PaymentsPage() {
    const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState('all');

  const q = search.toLowerCase();
  const payments = MOCK_PAYMENTS.filter((p) => {
    const matchesQuery =
      !q ||
      p.studentName.toLowerCase().includes(q) ||
      p.matricule.toLowerCase().includes(q) ||
      p.receiptNo.toLowerCase().includes(q);
    const matchesMode = mode === 'all' || p.modeId === mode;
    return matchesQuery && matchesMode;
  });

  const total = payments.reduce((s, p) => s + p.amount, 0);

  const modeFilters: FilterOption<string>[] = [
    { value: 'all', label: 'Tous' },
    ...MOCK_MODES.map((m) => ({ value: m.id, label: m.label })),
  ];

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">{t('paiements')}</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">
            {payments.length} {t('encaissements')}{formatMoney(total)}
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/scolarite/overdue">
            <Button variant="outline">
              <AlertTriangle size={15} /> {t('retards')}</Button>
          </Link>
          <Link to="/scolarite/payments/new">
            <Button>
              <Plus size={15} /> {t('enregistrer')}</Button>
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        <SearchInput value={search} onChange={setSearch} placeholder={t('rechercher_un_eleve_un_matricu')} />
        <FilterTabs value={mode} onChange={setMode} options={modeFilters} />
      </div>

      {payments.length === 0 ? (
        <div className="surface">
          <EmptyState icon={Receipt} message="Aucun paiement trouve." />
        </div>
      ) : (
        <div className="surface divide-y divide-line-soft">
          {payments.map((p) => (
            <Link
              key={p.id}
              to={`/scolarite/payments/${p.id}`}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-canvas"
            >
              <Avatar name={p.studentName} color={avatarColor(p.matricule)} size={34} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-ink">{p.studentName}</p>
                <p className="text-xs font-semibold text-ink-soft">
                  {p.receiptNo} - {p.classCode} - {dateShort(p.date)}
                </p>
              </div>
              <div className="hidden sm:block">
                <Badge tone="neutral">{p.trancheLabel}</Badge>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-ink">{formatMoney(p.amount)}</p>
                <p className="text-xs font-semibold text-ink-faint">{p.modeLabel}</p>
              </div>
              <ChevronRight size={16} className="shrink-0 text-ink-faint" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
