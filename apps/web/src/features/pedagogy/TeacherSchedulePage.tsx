import { CalendarClock } from 'lucide-react';
import { Card } from '@/shared/components/ui';
import { useAuthStore } from '@/features/auth/store';
import { MOCK_PERSONNEL } from '@/features/accounts/mockData';
import { ScheduleGrid, type ScheduleCell } from './components/ScheduleGrid';
import { scheduleForTeacher } from './mockData';
import { useTranslation } from "react-i18next";

function resolveTeacherId(nom: string | undefined): string {
  const found = MOCK_PERSONNEL.find((p) => p.type === 'teacher' && p.nom === nom);
  return found?.id ?? 'p1';
}

export function TeacherSchedulePage() {
    const { t } = useTranslation();
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
    <div className="w-full space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">{t('mon_emploi_du_temps')}</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">{cells.length} {t('creneaux_cette_semaine')}</p>
      </div>

      <Card>
        {cells.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CalendarClock size={28} className="mb-3 text-brand-200" />
            <p className="text-sm font-semibold text-ink-soft">{t('aucun_creneau_programme')}</p>
          </div>
        ) : (
          <ScheduleGrid cells={cells} />
        )}
      </Card>
    </div>
  );
}
