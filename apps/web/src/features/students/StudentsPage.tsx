import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users } from 'lucide-react';
import { SearchInput, FilterTabs, Badge, EmptyState, Avatar, Button, type FilterOption } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { ageFrom } from '@/shared/lib/format';
import { MOCK_CLASSES } from '@/features/academic/mockData';
import { MOCK_STUDENTS, STATUS_META, type Student, type StudentStatus } from './mockData';

type StatusFilter = 'all' | StudentStatus;

const FILTERS: FilterOption<StatusFilter>[] = [
  { value: 'all', label: 'Tous' },
  { value: 'enrolled', label: 'Inscrits', activeColor: '#22A05E' },
  { value: 'transferred', label: 'Transfrs', activeColor: '#D97706' },
  { value: 'excluded', label: 'Exclus', activeColor: '#DC2626' },
];

export function StudentsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [classFilter, setClassFilter] = useState('all');

  const q = search.toLowerCase();
  const filtered = MOCK_STUDENTS.filter((s) => {
    const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
    const matchSearch = !q || fullName.includes(q) || s.matricule.toLowerCase().includes(q);
    const matchStatus = status === 'all' || s.status === status;
    const matchClass = classFilter === 'all' || s.classId === classFilter;
    return matchSearch && matchStatus && matchClass;
  });

  const enrolled = MOCK_STUDENTS.filter((s) => s.status === 'enrolled').length;

  return (
    <div className="max-w-6xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">Dossiers lves</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">
            {enrolled} lves inscrits  {MOCK_STUDENTS.length} dossiers au total
          </p>
        </div>
        <Link to="/admin/students/new">
          <Button>
            <Plus size={15} /> Inscrire un lve
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Rechercher par nom ou matricule" />
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
        <FilterTabs value={status} onChange={setStatus} options={FILTERS} />
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-card">
        {filtered.length === 0 ? (
          <EmptyState icon={Users} message="Aucun lve trouv." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-line-soft">
                  {['lve', 'Matricule', 'Classe', 'ge', 'Parent', 'Statut'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-black text-ink-soft">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s: Student, i) => (
                  <tr
                    key={s.matricule}
                    className="transition-colors hover:bg-brand-50"
                    style={{ borderBottom: i < filtered.length - 1 ? '1px solid #EDE5F8' : 'none' }}
                  >
                    <td className="px-4 py-3">
                      <Link to={`/admin/students/${s.matricule}`} className="flex items-center gap-2.5">
                        <Avatar name={`${s.firstName} ${s.lastName}`} color={avatarColor(s.matricule)} size={34} />
                        <span className="text-sm font-bold text-ink hover:text-brand-600">
                          {s.firstName} {s.lastName}
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-xs font-bold text-ink-soft">{s.matricule}</td>
                    <td className="px-4 py-3">
                      <Badge tone="brand">{s.classCode}</Badge>
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold text-ink-soft">{ageFrom(s.dateOfBirth)} ans</td>
                    <td className="px-4 py-3">
                      <p className="text-xs font-semibold text-ink">{s.parentName}</p>
                      <p className="text-xs font-semibold text-ink-faint">{s.parentPhone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={STATUS_META[s.status].tone}>{STATUS_META[s.status].label}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
