import { useState } from 'react';
import {
  FileSearch,
  PlusCircle,
  RefreshCw,
  Trash2,
  LogIn,
  ShieldAlert,
  type LucideIcon,
} from 'lucide-react';
import { RootSubNav } from '@/app/components/RootSubNav';
import { SearchInput, FilterTabs, EmptyState, type FilterOption } from '@/shared/components/ui';
import { dateTime } from '@/shared/lib/format';
import { MOCK_AUDIT, type AuditType } from './mockData';
import { useTranslation } from "react-i18next";

const TYPE_CFG: Record<AuditType, { label: string; icon: LucideIcon; color: string; bg: string }> = {
  create: { label: 'Creation', icon: PlusCircle, color: '#22A05E', bg: '#D1FAE5' },
  update: { label: 'Modification', icon: RefreshCw, color: '#1081F3', bg: '#EFF4FF' },
  delete: { label: 'Suppression', icon: Trash2, color: '#DC2626', bg: '#FEF2F2' },
  login: { label: 'Connexion', icon: LogIn, color: '#7B2D9E', bg: '#F0DCFA' },
  security: { label: 'Securite', icon: ShieldAlert, color: '#D97706', bg: '#FEF3C7' },
};

const FILTER_OPTIONS: FilterOption<AuditType | 'all'>[] = [
  { value: 'all', label: 'Tous' },
  ...(Object.entries(TYPE_CFG) as [AuditType, (typeof TYPE_CFG)[AuditType]][]).map(([k, v]) => ({
    value: k,
    label: v.label,
    activeColor: v.color,
  })),
];

export function AuditPage() {
    const { t } = useTranslation();
  const [typeFilter, setTypeFilter] = useState<AuditType | 'all'>('all');
  const [search, setSearch] = useState('');

  const q = search.toLowerCase();
  const filtered = MOCK_AUDIT.filter((a) => {
    const matchSearch =
      !q || a.user.toLowerCase().includes(q) || a.action.toLowerCase().includes(q) || a.target.toLowerCase().includes(q);
    const matchType = typeFilter === 'all' || a.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="w-full space-y-4">
      <RootSubNav />

      <div>
        <h2 className="text-base font-black text-ink">{t('journal_d_audit')}</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">
          {MOCK_AUDIT.length} {t('evenements_enregistres_tracabi')}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <SearchInput value={search} onChange={setSearch} placeholder={t('rechercher_utilisateur_action')} />
        <FilterTabs value={typeFilter} onChange={setTypeFilter} options={FILTER_OPTIONS} />
      </div>

      {filtered.length === 0 ? (
        <div className="surface">
          <EmptyState icon={FileSearch} message="Aucun evenement trouve." />
        </div>
      ) : (
        <div className="relative">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-line-soft" />
          <div className="space-y-3">
            {filtered.map((entry) => {
              const cfg = TYPE_CFG[entry.type];
              const Icon = cfg.icon;
              return (
                <div key={entry.id} className="relative flex items-start gap-4 pl-12">
                  <div
                    className="absolute left-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white ring-2 ring-line-soft"
                    style={{ backgroundColor: cfg.bg, color: cfg.color }}
                  >
                    <Icon size={14} />
                  </div>
                  <div className="flex-1 surface p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <span
                            className="rounded-full px-2 py-0.5 text-xs font-black"
                            style={{ backgroundColor: cfg.bg, color: cfg.color }}
                          >
                            {cfg.label}
                          </span>
                          <p className="text-sm font-black text-ink">{entry.action}</p>
                        </div>
                        <p className="text-xs font-semibold text-ink-soft">
                          {t('cible')}<span className="text-ink">{entry.target}</span>
                        </p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-3">
                          <p className="text-xs font-semibold text-ink-faint">
                            {t('par')}<span className="font-bold text-ink">{entry.user}</span>
                            <span className="text-brand-200"> - {entry.role}</span>
                          </p>
                          {entry.ip && <p className="text-xs font-semibold text-ink-faint">{t('ip')}{entry.ip}</p>}
                        </div>
                      </div>
                      <p className="shrink-0 text-xs font-semibold text-ink-faint">{dateTime(entry.date)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
