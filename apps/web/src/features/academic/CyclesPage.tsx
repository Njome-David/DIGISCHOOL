import { useState } from 'react';
import { GitBranch, BookOpen, CheckCircle, ToggleLeft, ToggleRight } from 'lucide-react';
import { RootSubNav } from '@/app/components/RootSubNav';
import { ProgressBar } from '@/shared/components/ui';
import { MOCK_CYCLES, MOCK_CLASSES, type Cycle } from './mockData';
import { useTranslation } from "react-i18next";

function fillColor(pct: number) {
  return pct >= 90 ? '#DC2626' : pct >= 70 ? '#D97706' : '#22A05E';
}

export function CyclesPage() {
    const { t } = useTranslation();
  const [cycles, setCycles] = useState<Cycle[]>(MOCK_CYCLES);
  const toggle = (id: string) => setCycles((p) => p.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
  const activeCount = cycles.filter((c) => c.active).length;

  return (
    <div className="w-full space-y-4">
      <RootSubNav />

      <div>
        <h2 className="text-base font-black text-ink">{t('cycles_scolaires')}</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">
          {cycles.length} {t('cycle')}{cycles.length > 1 ? 's' : ''} - {activeCount} {t('actif')}{activeCount > 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cycles.map((cycle) => {
          const classes = MOCK_CLASSES.filter((cl) => cl.cycleId === cycle.id);
          const enrolled = classes.reduce((s, c) => s + c.enrolled, 0);
          const capacity = classes.reduce((s, c) => s + c.capacity, 0);
          const pct = capacity > 0 ? Math.round((enrolled / capacity) * 100) : 0;
          const isMat = cycle.code === 'MAT';

          return (
            <div
              key={cycle.id}
              className="surface p-5"
              style={{ borderTop: `4px solid ${isMat ? '#AD56C4' : '#1081F3'}` }}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: isMat ? '#F0DCFA' : '#EFF4FF', color: isMat ? '#7B2D9E' : '#1081F3' }}
                  >
                    <GitBranch size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-ink">{cycle.label}</h3>
                    <p className="text-xs font-semibold text-ink-faint">{t('code')}{cycle.code}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggle(cycle.id)}
                  className="shrink-0"
                  style={{ color: cycle.active ? '#22A05E' : '#DC2626' }}
                  aria-label="Activer/desactiver"
                >
                  {cycle.active ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                </button>
              </div>

              <div className="mb-4 grid grid-cols-3 gap-3">
                {[
                  { label: 'Niveaux', value: cycle.levelCount },
                  { label: 'Classes', value: classes.length },
                  { label: 'Eleves', value: enrolled },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-canvas p-3 text-center">
                    <p className="text-lg font-black text-ink">{s.value}</p>
                    <p className="text-xs font-semibold text-ink-soft">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="mb-1 flex items-center justify-between">
                <p className="text-xs font-bold text-ink-soft">{t('taux_de_remplissage')}</p>
                <p className="text-xs font-black text-ink">{pct}%</p>
              </div>
              <ProgressBar value={pct} color={fillColor(pct)} />
              <p className="mt-1 text-xs font-semibold text-ink-faint">{enrolled}/{capacity} {t('places')}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {classes.map((cl) => (
                  <span
                    key={cl.id}
                    className="flex items-center gap-1 rounded-lg bg-muted px-2 py-1 text-xs font-bold text-brand-700"
                  >
                    <BookOpen size={10} /> {cl.code}
                    {cl.teacher && <CheckCircle size={9} className="text-success" />}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
