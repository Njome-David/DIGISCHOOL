import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, AlertTriangle, Hash, Scale } from 'lucide-react';
import { PedagogySubNav } from '@/app/components/PedagogySubNav';
import { SearchInput, Badge, EmptyState, Button } from '@/shared/components/ui';
import { MOCK_COURSES, type Course } from './mockData';
import { MOCK_CLASSES } from '@/features/academic/mockData';

export function CoursesPage() {
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('all');

  const q = search.toLowerCase();
  const filtered = MOCK_COURSES.filter((c) => {
    const matchSearch =
      !q || c.label.toLowerCase().includes(q) || (c.teacherName ?? '').toLowerCase().includes(q);
    const matchClass = classFilter === 'all' || c.classId === classFilter;
    return matchSearch && matchClass;
  });

  const unassigned = MOCK_COURSES.filter((c) => !c.teacherId).length;

  return (
    <div className="max-w-5xl space-y-4">
      <PedagogySubNav />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">Cours</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">
            {MOCK_COURSES.length} cours
            {unassigned > 0 ? ` - ${unassigned} sans enseignant` : ''}
          </p>
        </div>
        <Link to="/root/courses/new">
          <Button>
            <Plus size={15} /> Nouveau cours
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Rechercher un cours ou un enseignant..." />
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="rounded-xl border border-line bg-white px-3 py-2.5 text-sm font-semibold text-ink outline-none"
        >
          <option value="all">Toutes les classes</option>
          {MOCK_CLASSES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="surface">
          <EmptyState icon={BookOpen} message="Aucun cours trouve." />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course: Course) => (
            <Link
              key={course.id}
              to={`/root/courses/${course.id}`}
              className="surface group p-4 transition-transform hover:-translate-y-0.5"
            >
              <div className="mb-3 flex items-start justify-between">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl font-black text-white"
                  style={{ backgroundColor: course.color }}
                >
                  {course.code.slice(0, 2)}
                </div>
                <Badge tone="brand">{course.classCode}</Badge>
              </div>
              <h3 className="text-sm font-black text-ink group-hover:text-brand-600">{course.label}</h3>
              <div className="mt-2 flex items-center gap-3 text-xs font-bold text-ink-soft">
                <span className="flex items-center gap-1">
                  <Scale size={11} /> Coeff. {course.coefficient}
                </span>
                <span className="flex items-center gap-1">
                  <Hash size={11} /> /{course.noteMax}
                </span>
              </div>
              <div className="mt-3 border-t border-line-soft pt-2">
                {course.teacherName ? (
                  <p className="truncate text-xs font-semibold text-ink">{course.teacherName}</p>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-semibold text-warning">
                    <AlertTriangle size={11} /> Enseignant non assigne
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
