import { useState } from 'react';
import { BookOpen, AlertTriangle } from 'lucide-react';
import { RootSubNav } from '@/app/components/RootSubNav';
import { SearchInput, Badge, EmptyState } from '@/shared/components/ui';
import { MOCK_CLASSES, MOCK_CYCLES, type Classe } from './mockData';

export function ClassesPage() {
  const [classes, setClasses] = useState<Classe[]>(MOCK_CLASSES);
  const [search, setSearch] = useState('');
  const [cycleFilter, setCycleFilter] = useState('all');

  const toggleStatus = (id: string) =>
    setClasses((p) =>
      p.map((c) => (c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c))
    );

  const q = search.toLowerCase();
  const filtered = classes.filter((c) => {
    const matchSearch = !q || c.code.toLowerCase().includes(q) || (c.teacher ?? '').toLowerCase().includes(q);
    const matchCycle = cycleFilter === 'all' || c.cycleId === cycleFilter;
    return matchSearch && matchCycle;
  });

  const totalEnrolled = classes.reduce((s, c) => s + c.enrolled, 0);
  const totalCapacity = classes.reduce((s, c) => s + c.capacity, 0);

  return (
    <div className="max-w-5xl space-y-4">
      <RootSubNav />

      <div>
        <h2 className="text-base font-black text-ink">Classes</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">
          {classes.length} classes - {totalEnrolled}/{totalCapacity} eleves
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Rechercher une classe ou enseignant" />
        <select
          value={cycleFilter}
          onChange={(e) => setCycleFilter(e.target.value)}
          className="rounded-xl border border-line bg-white px-3 py-2.5 text-sm font-semibold text-ink outline-none"
        >
          <option value="all">Tous les cycles</option>
          {MOCK_CYCLES.map((cy) => (
            <option key={cy.id} value={cy.id}>
              {cy.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-card">
        {filtered.length === 0 ? (
          <EmptyState icon={BookOpen} message="Aucune classe trouvee." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-line-soft">
                  {['Classe', 'Cycle', 'Enseignant principal', 'Effectif', 'Taux', 'Statut'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-black text-ink-soft">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((cl, i) => {
                  const pct = Math.round((cl.enrolled / cl.capacity) * 100);
                  const isFull = pct >= 90;
                  const isMat = cl.cycleId === 'c1';
                  return (
                    <tr
                      key={cl.id}
                      className="transition-colors hover:bg-brand-50"
                      style={{ borderBottom: i < filtered.length - 1 ? '1px solid #EDE5F8' : 'none' }}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-brand-700">
                            <BookOpen size={12} />
                          </div>
                          <p className="text-sm font-black text-ink">{cl.code}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge tone={isMat ? 'brand' : 'info'}>{cl.cycle}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        {cl.teacher ? (
                          <p className="text-xs font-semibold text-ink">{cl.teacher}</p>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-semibold text-warning">
                            <AlertTriangle size={11} /> Non assigne
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs font-bold text-ink">
                        {cl.enrolled}/{cl.capacity}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${pct}%`, backgroundColor: isFull ? '#DC2626' : '#22A05E' }}
                            />
                          </div>
                          <span className="text-xs font-bold" style={{ color: isFull ? '#DC2626' : '#22A05E' }}>
                            {pct}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => toggleStatus(cl.id)}>
                          <Badge tone={cl.status === 'active' ? 'success' : 'danger'}>
                            {cl.status === 'active' ? 'Active' : 'Inactive'}
                          </Badge>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
