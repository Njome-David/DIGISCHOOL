import { Link } from 'react-router-dom';
import { BookOpen, Users, Scale, GraduationCap } from 'lucide-react';
import { Card, Badge, Button, EmptyState } from '@/shared/components/ui';
import { useAuthStore } from '@/features/auth/store';
import { MOCK_PERSONNEL } from '@/features/accounts/mockData';
import { MOCK_CLASSES } from '@/features/academic/mockData';
import { coursesForTeacher, type Course } from './mockData';

function resolveTeacherId(nom: string | undefined): string {
  const found = MOCK_PERSONNEL.find((p) => p.type === 'teacher' && p.nom === nom);
  return found?.id ?? 'p1';
}

export function TeacherClassesPage() {
  const user = useAuthStore((s) => s.user);
  const teacherId = resolveTeacherId(user?.nom);
  const courses = coursesForTeacher(teacherId);

  const byClass = courses.reduce<Record<string, Course[]>>((acc, c) => {
    (acc[c.classId] ??= []).push(c);
    return acc;
  }, {});
  const classIds = Object.keys(byClass);

  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">Mes classes</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">
            {classIds.length} classe{classIds.length > 1 ? 's' : ''} - {courses.length} cours assures
          </p>
        </div>
        <Link to="/teacher/students">
          <Button variant="outline">
            <Users size={15} /> Mes eleves
          </Button>
        </Link>
      </div>

      {classIds.length === 0 ? (
        <div className="surface">
          <EmptyState icon={GraduationCap} message="Aucune classe assignee pour le moment." />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {classIds.map((cid) => {
            const cls = MOCK_CLASSES.find((c) => c.id === cid);
            const list = byClass[cid];
            return (
              <Card key={cid}>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-brand-700">
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-ink">{cls?.code ?? list[0].classCode}</h3>
                      <p className="text-xs font-semibold text-ink-faint">{cls?.cycle}</p>
                    </div>
                  </div>
                  {cls && (
                    <span className="flex items-center gap-1 text-xs font-bold text-ink-soft">
                      <Users size={12} /> {cls.enrolled}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {list.map((course) => (
                    <div key={course.id} className="flex items-center justify-between rounded-xl bg-canvas p-2.5">
                      <div className="flex items-center gap-2">
                        <span className="h-7 w-1 rounded-full" style={{ backgroundColor: course.color }} />
                        <p className="text-xs font-bold text-ink">{course.label}</p>
                      </div>
                      <Badge tone="neutral">
                        <Scale size={10} /> Coeff. {course.coefficient}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
