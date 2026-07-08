import { Link } from 'react-router-dom';
import { Users, ChevronRight, GraduationCap } from 'lucide-react';
import { Card, Avatar, Badge, EmptyState } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { useAuthStore } from '@/features/auth/store';
import { MOCK_PERSONNEL } from '@/features/accounts/mockData';
import { MOCK_CLASSES } from '@/features/academic/mockData';
import { MOCK_STUDENTS } from '@/features/students/mockData';
import { coursesForTeacher } from './mockData';
import { useTranslation } from "react-i18next";

function resolveTeacherId(nom: string | undefined): string {
  const found = MOCK_PERSONNEL.find((p) => p.type === 'teacher' && p.nom === nom);
  return found?.id ?? 'p1';
}

export function TeacherStudentsPage() {
    const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const teacherId = resolveTeacherId(user?.nom);
  const classIds = [...new Set(coursesForTeacher(teacherId).map((c) => c.classId))];

  const groups = classIds
    .map((cid) => ({
      cls: MOCK_CLASSES.find((c) => c.id === cid),
      students: MOCK_STUDENTS.filter((s) => s.classId === cid && s.status === 'enrolled'),
    }))
    .filter((g) => g.students.length > 0);

  const total = groups.reduce((s, g) => s + g.students.length, 0);

  return (
    <div className="w-full space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">{t('mes_eleves')}</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">
          {total} {t('eleves_dans')}{groups.length} {t('classe')}{groups.length > 1 ? 's' : ''}
        </p>
      </div>

      {groups.length === 0 ? (
        <div className="surface">
          <EmptyState icon={GraduationCap} message="Aucun eleve dans vos classes." />
        </div>
      ) : (
        groups.map((g) => (
          <Card key={g.cls?.id}>
            <div className="mb-3 flex items-center gap-2">
              <Badge tone="brand">{g.cls?.code}</Badge>
              <span className="flex items-center gap-1 text-xs font-bold text-ink-soft">
                <Users size={12} /> {g.students.length}
              </span>
            </div>
            <div className="divide-y divide-line-soft">
              {g.students.map((s) => (
                <Link
                  key={s.matricule}
                  to={`/teacher/students/${s.matricule}`}
                  className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-canvas"
                >
                  <Avatar name={`${s.firstName} ${s.lastName}`} seed={s.matricule} color={avatarColor(s.matricule)} size={36} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-ink">
                      {s.firstName} {s.lastName}
                    </p>
                    <p className="text-xs font-semibold text-ink-soft">{s.matricule}</p>
                  </div>
                  <ChevronRight size={15} className="text-ink-faint" />
                </Link>
              ))}
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
