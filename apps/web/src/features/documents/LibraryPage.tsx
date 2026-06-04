import { useState } from 'react';
import { Library } from 'lucide-react';
import { SearchInput, EmptyState, FilterTabs, type FilterOption } from '@/shared/components/ui';
import { BookCard } from './components/BookCard';
import { MOCK_BOOKS, SPECIALTIES, specialtyColor } from './mockData';

export function LibraryPage() {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('all');

  const q = search.toLowerCase();
  const books = MOCK_BOOKS.filter((b) => {
    const matchesQuery = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
    const matchesSpecialty = specialty === 'all' || b.specialty === specialty;
    return matchesQuery && matchesSpecialty;
  });

  const filters: FilterOption<string>[] = [
    { value: 'all', label: 'Toutes' },
    ...SPECIALTIES.map((s) => ({ value: s, label: s, activeColor: specialtyColor(s) })),
  ];

  return (
    <div className="max-w-4xl space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">Manuels scolaires</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">
          {books.length} ouvrage{books.length > 1 ? 's' : ''} disponible{books.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-3">
        <SearchInput value={search} onChange={setSearch} placeholder="Rechercher un titre ou un auteur..." />
        <FilterTabs value={specialty} onChange={setSpecialty} options={filters} />
      </div>

      {books.length === 0 ? (
        <div className="surface">
          <EmptyState icon={Library} message="Aucun manuel trouve." />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      )}
    </div>
  );
}
