import { useState } from 'react';
import { CalendarRange, CheckCircle, Clock } from 'lucide-react';
import { RootSubNav } from '@/app/components/RootSubNav';
import { Badge } from '@/shared/components/ui';
import { dateLong } from '@/shared/lib/format';
import { MOCK_YEARS, type AcademicYear } from './mockData';

export function AcademicYearsPage() {
  const [years, setYears] = useState<AcademicYear[]>(MOCK_YEARS);
  const setActive = (id: string) => setYears((p) => p.map((y) => ({ ...y, active: y.id === id })));
  const current = years.find((y) => y.active);

  return (
    <div className="max-w-3xl space-y-4">
      <RootSubNav />

      <div>
        <h2 className="text-base font-black text-ink">Annees scolaires</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">
          {years.length} annees configurees - {current?.label ?? ''} en cours
        </p>
      </div>

      <div className="space-y-3">
        {[...years].reverse().map((year) => {
          const start = new Date(year.startDate).getTime();
          const end = new Date(year.endDate).getTime();
          const total = end - start;
          const elapsed = Math.max(0, Math.min(Date.now() - start, total));
          const pct = Math.round((elapsed / total) * 100);

          return (
            <div
              key={year.id}
              className="surface p-5"
              style={{ borderLeft: year.active ? '4px solid #AD56C4' : '4px solid transparent' }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: year.active ? '#F0DCFA' : '#F3F4F6', color: year.active ? '#7B2D9E' : '#9B8AAE' }}
                  >
                    <CalendarRange size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-ink">Annee {year.label}</h3>
                      {year.active && (
                        <Badge>
                          <CheckCircle size={10} /> En cours
                        </Badge>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs font-semibold text-ink-soft">
                      {dateLong(year.startDate)} ? {dateLong(year.endDate)}
                    </p>
                  </div>
                </div>
                {!year.active && (
                  <button onClick={() => setActive(year.id)} className="btn-outline text-brand-500">
                    <CheckCircle size={13} /> Definir comme active
                  </button>
                )}
              </div>

              {year.active && (
                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="flex items-center gap-1 text-xs font-bold text-ink-soft">
                      <Clock size={11} /> Progression de l'annee
                    </p>
                    <p className="text-xs font-black text-ink">{pct}%</p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
