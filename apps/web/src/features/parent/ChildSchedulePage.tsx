import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarClock } from 'lucide-react';
import { Card, Badge, EmptyState } from '@/shared/components/ui';
import { findStudent } from '@/features/students/mockData';
import { ScheduleGrid, type ScheduleCell } from '@/features/pedagogy/components/ScheduleGrid';
import { scheduleForClass, findCourse } from '@/features/pedagogy/mockData';
import { useTranslation } from "react-i18next";

export function ChildSchedulePage() {
    const { t } = useTranslation();
  const { matricule } = useParams<{ matricule: string }>();
  const navigate = useNavigate();
  const child = matricule ? findStudent(matricule) : undefined;

  if (!child) {
    return (
      <div className="surface w-full">
        <EmptyState icon={CalendarClock} message="Eleve introuvable." />
      </div>
    );
  }

  const cells: ScheduleCell[] = scheduleForClass(child.classId).map((s) => {
    const course = findCourse(s.courseId);
    return {
      day: s.day,
      slot: s.slot,
      label: course?.label ?? 'Cours',
      sub: s.room,
      color: course?.color ?? '#AD56C4',
    };
  });

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => navigate(`/parent/children/${child.matricule}`)}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> {t('retour_a_la_fiche')}</button>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">{t('emploi_du_temps')}</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">
            {child.firstName} {child.lastName} - {cells.length} {t('creneaux')}</p>
        </div>
        <Badge tone="brand">{child.classCode}</Badge>
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
