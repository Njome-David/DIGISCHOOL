import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCog, Plus, Mail, Phone, Power } from 'lucide-react';
import { ROLE_LABELS } from '@ecole/shared';
import { RootSubNav } from '@/app/components/RootSubNav';
import { SearchInput, Badge, EmptyState, Avatar, Button } from '@/shared/components/ui';
import { ROLE_META } from '@/shared/lib/roleMeta';
import { dateTime } from '@/shared/lib/format';
import { MOCK_ADMINS, type AdminAccount } from './mockData';

export function AdminsPage() {
  const [admins, setAdmins] = useState<AdminAccount[]>(MOCK_ADMINS);
  const [search, setSearch] = useState('');

  const toggle = (id: string) =>
    setAdmins((p) =>
      p.map((a) => (a.id === id ? { ...a, status: a.status === 'active' ? 'inactive' : 'active' } : a))
    );

  const q = search.toLowerCase();
  const filtered = admins.filter(
    (a) => !q || a.nom.toLowerCase().includes(q) || a.username.toLowerCase().includes(q) || a.email.toLowerCase().includes(q)
  );

  return (
    <div className="max-w-5xl space-y-4">
      <RootSubNav />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">Comptes administrateurs</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">
            {admins.filter((a) => a.status === 'active').length} actifs  {admins.length} comptes
          </p>
        </div>
        <Link to="/root/admins/new">
          <Button>
            <Plus size={15} /> Nouveau compte
          </Button>
        </Link>
      </div>

      <SearchInput value={search} onChange={setSearch} placeholder="Rechercher par nom, identifiant, email" />

      {filtered.length === 0 ? (
        <div className="surface">
          <EmptyState icon={UserCog} message="Aucun compte trouv." />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {filtered.map((admin) => {
            const meta = ROLE_META[admin.role];
            return (
              <div key={admin.id} className="surface p-4">
                <div className="flex items-start gap-3">
                  <Avatar name={admin.nom} color={meta.color} size={44} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          to={`/root/admins/${admin.id}`}
                          className="block truncate text-sm font-black text-ink hover:text-brand-600"
                        >
                          {admin.nom}
                        </Link>
                        <p className="truncate text-xs font-semibold text-ink-faint">@{admin.username}</p>
                      </div>
                      <button
                        onClick={() => toggle(admin.id)}
                        className="shrink-0 rounded-lg p-1.5 transition-colors hover:bg-canvas"
                        style={{ color: admin.status === 'active' ? '#22A05E' : '#9B8AAE' }}
                        title={admin.status === 'active' ? 'Dsactiver' : 'Activer'}
                      >
                        <Power size={15} />
                      </button>
                    </div>

                    <div className="mt-2">
                      <Badge style={{ backgroundColor: meta.badgeBg, color: meta.badgeText }}>
                        {ROLE_LABELS[admin.role]}
                      </Badge>
                    </div>

                    <div className="mt-3 space-y-1">
                      {admin.email && (
                        <p className="flex items-center gap-1.5 truncate text-xs font-semibold text-ink-soft">
                          <Mail size={11} className="shrink-0 text-ink-faint" /> {admin.email}
                        </p>
                      )}
                      {admin.phone && (
                        <p className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
                          <Phone size={11} className="shrink-0 text-ink-faint" /> {admin.phone}
                        </p>
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-line-soft pt-2">
                      <p className="text-xs font-semibold text-ink-faint">
                        {admin.lastLogin ? `Vu ${dateTime(admin.lastLogin)}` : 'Jamais connect'}
                      </p>
                      <Badge tone={admin.status === 'active' ? 'success' : 'neutral'}>
                        {admin.status === 'active' ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
