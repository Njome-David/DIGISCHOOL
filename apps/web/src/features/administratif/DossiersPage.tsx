import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, ChevronRight, FolderPlus } from 'lucide-react';
import { Card, Avatar, Badge, Button, SearchInput, FilterTabs, EmptyState, type FilterOption } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { MOCK_DOSSIERS, completeness, isComplete } from './mockData';
import { useTranslation } from "react-i18next";

type Filter = 'all' | 'incomplete' | 'complete';

const OPTIONS: FilterOption<Filter>[] = [
  { value: 'all', label: 'Tous' },
  { value: 'incomplete', label: 'Incomplets' },
  { value: 'complete', label: 'Complets' },
];

export function DossiersPage() {
    const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');

  const q = search.toLowerCase();
  const rows = MOCK_DOSSIERS.filter((d) => {
    const matchSearch = !q || d.studentName.toLowerCase().includes(q) || d.matricule.toLowerCase().includes(q);
    const matchFilter =
      filter === 'all' || (filter === 'complete' ? isComplete(d) : !isComplete(d));
    return matchSearch && matchFilter;
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">{t('dossiers_administratifs')}</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">{MOCK_DOSSIERS.length} {t('dossiers_eleves')}</p>
        </div>
        <Link to="/staff/files/new">
          <Button>
            <FolderPlus size={15} /> {t('nouveau_dossier')}</Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <SearchInput value={search} onChange={setSearch} placeholder={t('rechercher_un_eleve')} />
        <FilterTabs value={filter} onChange={setFilter} options={OPTIONS} />
      </div>

      {rows.length === 0 ? (
        <div className="surface">
          <EmptyState icon={FolderOpen} message="Aucun dossier trouve." />
        </div>
      ) : (
        <Card>
          <div className="divide-y divide-line-soft">
            {rows.map((d) => (
              <Link
                key={d.matricule}
                to={`/staff/students/${d.matricule}`}
                className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-canvas"
              >
                <Avatar name={d.studentName} seed={d.matricule} color={avatarColor(d.matricule)} size={38} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-ink">{d.studentName}</p>
                  <p className="text-xs font-semibold text-ink-soft">
                    {d.classCode} - {d.matricule}
                  </p>
                </div>
                <Badge tone={isComplete(d) ? 'success' : 'warning'}>{completeness(d)}%</Badge>
                <ChevronRight size={15} className="text-ink-faint" />
              </Link>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
