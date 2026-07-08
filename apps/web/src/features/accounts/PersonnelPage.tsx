import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, GraduationCap, Briefcase, Mail, Phone, BookOpen, UserPlus } from 'lucide-react';
import { RootSubNav } from '@/app/components/RootSubNav';
import { SearchInput, FilterTabs, Badge, EmptyState, Avatar, Button, type FilterOption } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { MOCK_PERSONNEL, type Personnel } from './mockData';
import { useTranslation } from "react-i18next";

type TypeFilter = 'all' | 'teacher' | 'staff';

const FILTERS: FilterOption<TypeFilter>[] = [
  { value: 'all', label: 'Tous' },
  { value: 'teacher', label: 'Enseignants' },
  { value: 'staff', label: 'Administratifs' },
];

export function PersonnelPage() {
    const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<TypeFilter>('all');

  const q = search.toLowerCase();
  const filtered = MOCK_PERSONNEL.filter((p) => {
    const matchSearch = !q || p.nom.toLowerCase().includes(q) || (p.subject ?? '').toLowerCase().includes(q);
    const matchType = filter === 'all' || p.type === filter;
    return matchSearch && matchType;
  });

  const teachers = MOCK_PERSONNEL.filter((p) => p.type === 'teacher').length;
  const staff = MOCK_PERSONNEL.filter((p) => p.type === 'staff').length;

  return (
    <div className="w-full space-y-4">
      <RootSubNav />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">{t('personnel')}</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">
            {teachers} {t('enseignants')}{staff} {t('agents_administratifs')}</p>
        </div>
        <Link to="/root/personnel/new">
          <Button>
            <UserPlus size={15} /> {t('nouveau_personnel')}</Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        <SearchInput value={search} onChange={setSearch} placeholder={t('rechercher_un_membre_du_person')} />
        <FilterTabs value={filter} onChange={setFilter} options={FILTERS} />
      </div>

      {filtered.length === 0 ? (
        <div className="surface">
          <EmptyState icon={Users} message="Aucun membre trouve." />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((person: Personnel) => {
            const isTeacher = person.type === 'teacher';
            return (
              <Link key={person.id} to={`/root/personnel/${person.id}`} className="surface block p-4 transition-colors hover:border-brand-200">
                <div className="flex items-center gap-3">
                  <Avatar name={person.nom} color={avatarColor(person.nom)} size={42} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-ink">{person.nom}</p>
                    <span className="mt-0.5 inline-flex items-center gap-1 text-xs font-bold text-ink-soft">
                      {isTeacher ? <GraduationCap size={11} /> : <Briefcase size={11} />}
                      {isTeacher ? person.subject : 'Agent administratif'}
                    </span>
                  </div>
                  <Badge tone={person.status === 'active' ? 'success' : 'neutral'}>
                    {person.status === 'active' ? 'Actif' : 'Inactif'}
                  </Badge>
                </div>

                {isTeacher && person.classes.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {person.classes.map((c) => (
                      <span
                        key={c}
                        className="flex items-center gap-1 rounded-lg bg-muted px-2 py-0.5 text-xs font-bold text-brand-700"
                      >
                        <BookOpen size={9} /> {c}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-3 space-y-1 border-t border-line-soft pt-2">
                  <p className="flex items-center gap-1.5 truncate text-xs font-semibold text-ink-soft">
                    <Mail size={11} className="shrink-0 text-ink-faint" /> {person.email}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
                    <Phone size={11} className="shrink-0 text-ink-faint" /> {person.phone}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
