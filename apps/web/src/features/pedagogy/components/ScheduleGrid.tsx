import { DAYS, TIME_SLOTS, type Day } from '../mockData';

export interface ScheduleCell {
  day: Day;
  slot: number;
  label: string;
  sub?: string;
  color: string;
}

/** Grille emploi du temps : lignes = creneaux horaires, colonnes = jours. */
export function ScheduleGrid({
  cells,
  onCellClick,
}: {
  cells: ScheduleCell[];
  onCellClick?: (day: Day, slot: number) => void;
}) {
  const at = (day: Day, slot: number) => cells.find((c) => c.day === day && c.slot === slot);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[680px]">
        <div className="grid grid-cols-[72px_repeat(5,1fr)] gap-1.5">
          <div />
          {DAYS.map((d) => (
            <div key={d} className="rounded-xl bg-muted py-2 text-center text-xs font-black text-brand-700">
              {d}
            </div>
          ))}

          {TIME_SLOTS.map((ts, slot) => (
            <div key={slot} className="contents">
              <div className="flex flex-col items-center justify-center py-2 text-center">
                <span className="text-xs font-black text-ink">{ts.start}</span>
                <span className="text-[10px] font-semibold text-ink-faint">{ts.end}</span>
              </div>
              {DAYS.map((day) => {
                const cell = at(day, slot);
                if (!cell) {
                  return (
                    <button
                      key={day + slot}
                      type="button"
                      onClick={onCellClick ? () => onCellClick(day, slot) : undefined}
                      className={
                        'min-h-[52px] rounded-xl border border-dashed border-line-soft transition-colors ' +
                        (onCellClick ? 'hover:border-brand-300 hover:bg-brand-50' : '')
                      }
                      aria-label="Creneau libre"
                    />
                  );
                }
                return (
                  <button
                    key={day + slot}
                    type="button"
                    onClick={onCellClick ? () => onCellClick(day, slot) : undefined}
                    className="min-h-[52px] rounded-xl p-2 text-left transition-transform hover:scale-[0.98]"
                    style={{ backgroundColor: cell.color + '1A', borderLeft: `3px solid ${cell.color}` }}
                  >
                    <p className="truncate text-xs font-black text-ink">{cell.label}</p>
                    {cell.sub && <p className="truncate text-[10px] font-semibold text-ink-soft">{cell.sub}</p>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
