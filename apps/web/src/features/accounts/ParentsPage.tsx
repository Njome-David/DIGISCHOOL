import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Mail, Phone, GraduationCap } from 'lucide-react';
import { RootSubNav } from '@/app/components/RootSubNav';
import { SearchInput, Badge, EmptyState, Avatar } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { allParents } from '@/features/students/mockData';
import { useTranslation } from "react-i18next";

export function ParentsPage() {
    const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const parents = allParents();

  const q = search.toLowerCase();
  const filtered = parents.filter(
    (p) => !q || p.name.toLowerCase().includes(q) || p.children.some((c) => `${c.firstName} ${c.lastName}`.toLowerCase().includes(q))
  );

  return (
    <div className="w-full space-y-4">
      <RootSubNav />

      <div>
        <h2 className="text-base font-black text-ink">{t('comptes_parents')}</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">
          {parents.length} {t('parents_lies_a')}{parents.reduce((s, p) => s + p.children.length, 0)} {t('eleves')}</p>
      </div>

      <SearchInput value={search} onChange={setSearch} placeholder={t('rechercher_un_parent_ou_un_enf')} />

      {filtered.length === 0 ? (
        <div className="surface">
          <EmptyState icon={Users} message="Aucun parent trouve." />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {filtered.map((p) => (
            <div key={p.name} className="surface p-4">
              <div className="flex items-center gap-3">
                <Avatar name={p.name} seed={p.name} color={avatarColor(p.name)} size={42} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-ink">{p.name}</p>
                  <p className="text-xs font-semibold text-ink-soft">
                    {p.children.length} {t('enfant')}{p.children.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <div className="mt-3 space-y-1 border-b border-line-soft pb-2">
                <p className="flex items-center gap-1.5 truncate text-xs font-semibold text-ink-soft">
                  <Mail size={11} className="shrink-0 text-ink-faint" /> {p.email || 'Non renseigne'}
                </p>
                <p className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
                  <Phone size={11} className="shrink-0 text-ink-faint" /> {p.phone}
                </p>
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.children.map((c) => (
                  <Link
                    key={c.matricule}
                    to={`/admin/students/${c.matricule}`}
                    className="flex items-center gap-1 rounded-lg bg-muted px-2 py-1 text-xs font-bold text-brand-700 transition-colors hover:bg-accent"
                  >
                    <GraduationCap size={10} /> {c.firstName} {c.lastName}
                    <Badge tone="neutral">{c.classCode}</Badge>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
