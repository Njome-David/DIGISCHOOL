import { CalendarClock } from 'lucide-react';
import { Card } from '@/shared/components/ui';
import { useAuthStore } from '@/features/auth/store';
import { MOCK_PERSONNEL } from '@/features/accounts/mockData';
import { ScheduleGrid, type ScheduleCell } from './components/ScheduleGrid';
import { scheduleForTeacher } from './mockData';

function resolveTeacherId(nom: string | undefined): string {
  const found = MOCK_PERSONNEL.find((p) => p.type === 'teacher' && p.nom === nom);
  return found?.id ?? 'p1';
}

export function TeacherSchedulePage() {
  const user = useAuthStore((s) => s.user);
  const teacherId = resolveTeacherId(user?.nom);
  const entries = scheduleForTeacher(teacherId);

  const cells: ScheduleCell[] = entries.map((e) => ({
    day: e.day,
    slot: e.slot,
    label: e.course.label,
    sub: `${e.course.classCode} - ${e.room}`,
    color: e.course.color,
  }));

  return (
    <div className="max-w-5xl space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">Mon emploi du temps</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">{cells.length} creneaux cette semaine</p>
      </div>

      <Card>
        {cells.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CalendarClock size={28} className="mb-3 text-brand-200" />
            <p className="text-sm font-semibold text-ink-soft">Aucun creneau programme.</p>
          </div>
        ) : (
          <ScheduleGrid cells={cells} />
        )}
      </Card>
    </div>
  );
}
