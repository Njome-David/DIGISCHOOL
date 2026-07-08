import { Link } from 'react-router-dom';
import { Wallet, Plus, Pencil, Layers } from 'lucide-react';
import { Card, Button, Badge, EmptyState } from '@/shared/components/ui';
import { formatMoney } from '@/shared/lib/format';
import { MOCK_TUITIONS } from './mockData';
import { useTranslation } from "react-i18next";

export function TuitionsPage() {
    const { t } = useTranslation();
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">{t('gestion_des_scolarites')}</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">
            {MOCK_TUITIONS.length} {t('grilles_tarifaires_annee_2025')}</p>
        </div>
        <Link to="/fondateur/tuitions/new">
          <Button>
            <Plus size={15} /> {t('nouvelle_scolarite')}</Button>
        </Link>
      </div>

      {MOCK_TUITIONS.length === 0 ? (
        <div className="surface">
          <EmptyState icon={Wallet} message="Aucune scolarite definie." />
        </div>
      ) : (
        <div className="space-y-3">
          {MOCK_TUITIONS.map((t) => (
            <Card key={t.id} className="flex flex-wrap items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-700">
                <Wallet size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-black text-ink">{t.label}</h3>
                  <Badge tone="brand">{t.classCode}</Badge>
                  <Badge tone={t.active ? 'success' : 'neutral'}>{t.active ? 'Active' : 'Inactive'}</Badge>
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-ink-soft">
                  <Layers size={12} /> {t.tranches.length} {t('tranches')}{t.yearLabel}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-ink">{formatMoney(t.total)}</p>
                <p className="text-xs font-semibold text-ink-faint">{t('total_annuel')}</p>
              </div>
              <Link to={`/fondateur/tuitions/${t.id}`} className="shrink-0">
                <Button variant="outline">
                  <Pencil size={14} /> {t('editer')}</Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
