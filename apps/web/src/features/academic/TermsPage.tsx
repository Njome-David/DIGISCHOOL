import { useState } from 'react';
import { Clock, CheckCircle, CalendarRange } from 'lucide-react';
import { RootSubNav } from '@/app/components/RootSubNav';
import { dateShort } from '@/shared/lib/format';
import { MOCK_TERMS, MOCK_YEARS } from './mockData';
import { useTranslation } from "react-i18next";

type TermState = 'current' | 'past' | 'future';

const STATE_CONFIG: Record<TermState, { label: string; bg: string; color: string; border: string }> = {
  current: { label: 'En cours', bg: '#F0DCFA', color: '#7B2D9E', border: '#AD56C4' },
  past: { label: 'Termine', bg: '#D1FAE5', color: '#22A05E', border: 'transparent' },
  future: { label: 'A venir', bg: '#EFF4FF', color: '#1081F3', border: 'transparent' },
};

export function TermsPage() {
    const { t } = useTranslation();
  const [yearFilter, setYearFilter] = useState('y2');
  const filtered = MOCK_TERMS.filter((t) => t.yearId === yearFilter);
  const currentTerm = MOCK_TERMS.find((t) => t.current);

  return (
    <div className="w-full space-y-4">
      <RootSubNav />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">{t('trimestres')}</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">
            {currentTerm ? `${currentTerm.label} (${currentTerm.yearLabel}) en cours` : 'Aucun trimestre en cours'}
          </p>
        </div>
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="rounded-xl border border-line bg-white px-3 py-2.5 text-sm font-semibold text-ink outline-none"
        >
          {MOCK_YEARS.map((y) => (
            <option key={y.id} value={y.id}>
              {y.label}
              {y.active ? ' (active)' : ''}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((term) => {
          const start = new Date(term.startDate).getTime();
          const end = new Date(term.endDate).getTime();
          const state: TermState = term.current
            ? 'current'
            : Date.now() > end
              ? 'past'
              : Date.now() < start
                ? 'future'
                : 'current';
          const cfg = STATE_CONFIG[state];
          const total = end - start;
          const elapsed = Math.max(0, Math.min(Date.now() - start, total));
          const pct = Math.round((elapsed / total) * 100);

          return (
            <div key={term.id} className="surface p-5" style={{ borderLeft: `4px solid ${cfg.border}` }}>
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: cfg.bg, color: cfg.color }}
                  >
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-black text-ink">{term.label}</h3>
                      <span
                        className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold"
                        style={{ backgroundColor: cfg.bg, color: cfg.color }}
                      >
                        {term.current && <CheckCircle size={10} />}
                        {cfg.label}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
                      <CalendarRange size={11} />
                      {dateShort(term.startDate)} ? {dateShort(term.endDate)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: cfg.color }} />
                </div>
                <span className="shrink-0 text-xs font-black text-ink">{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
