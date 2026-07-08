import { useState } from 'react';
import { CalendarClock } from 'lucide-react';
import { PedagogySubNav } from '@/app/components/PedagogySubNav';
import { Card } from '@/shared/components/ui';
import { ScheduleGrid, type ScheduleCell } from './components/ScheduleGrid';
import { MOCK_CLASSES } from '@/features/academic/mockData';
import { scheduleForClass, findCourse } from './mockData';
import { useTranslation } from "react-i18next";

export function SchedulePage() {
    const { t } = useTranslation();
  const [classId, setClassId] = useState(MOCK_CLASSES[0]?.id ?? '');

  const cells: ScheduleCell[] = scheduleForClass(classId).map((s) => {
    const course = findCourse(s.courseId);
    return {
      day: s.day,
      slot: s.slot,
      label: course?.label ?? 'Cours',
      sub: s.room,
      color: course?.color ?? '#AD56C4',
    };
  });

  const selected = MOCK_CLASSES.find((c) => c.id === classId);

  return (
    <div className="w-full space-y-4">
      <PedagogySubNav />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">{t('emploi_du_temps')}</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">
            {selected ? `Classe ${selected.code} - ${cells.length} creneaux` : 'Selectionnez une classe'}
          </p>
        </div>
        <select
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          className="rounded-xl border border-line bg-white px-3 py-2.5 text-sm font-semibold text-ink outline-none"
        >
          {MOCK_CLASSES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code} - {c.cycle}
            </option>
          ))}
        </select>
      </div>

      <Card>
        {cells.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CalendarClock size={28} className="mb-3 text-brand-200" />
            <p className="text-sm font-semibold text-ink-soft">{t('aucun_creneau_defini_pour_cett')}</p>
          </div>
        ) : (
          <ScheduleGrid cells={cells} />
        )}
      </Card>
    </div>
  );
}
