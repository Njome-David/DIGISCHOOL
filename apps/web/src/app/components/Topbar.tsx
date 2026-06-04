import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, LogOut, Menu, User } from 'lucide-react';
import { ROLE_LABELS } from '@ecole/shared';
import { useAuthStore } from '@/features/auth/store';
import { Avatar } from '@/shared/components/ui';
import { ROLE_META } from '@/shared/lib/roleMeta';

export function Topbar({ title, onOpenMenu }: { title: string; onOpenMenu: () => void }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-line bg-white px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg p-1.5 text-ink-soft transition-colors hover:bg-brand-50 lg:hidden"
          onClick={onOpenMenu}
          aria-label="Ouvrir le menu"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-base font-black text-ink">{title}</h2>
      </div>

      <div className="flex items-center gap-1.5">
        <Link
          to="/notifications"
          className="relative rounded-xl p-2 transition-colors hover:bg-brand-50"
          aria-label="Notifications"
        >
          <Bell size={19} className="text-brand-500" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
        </Link>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 rounded-xl py-1.5 pl-2 pr-1.5 transition-colors hover:bg-brand-50"
          >
            <Avatar name={user.nom} color={ROLE_META[user.role].color} size={28} />
            <div className="hidden text-left sm:block">
              <p className="text-xs font-bold leading-tight text-ink">{user.nom}</p>
              <p className="text-[10px] text-ink-soft">{ROLE_LABELS[user.role]}</p>
            </div>
            <ChevronDown
              size={13}
              className={`text-ink-soft transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </button>

          {open && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} role="presentation" />
              <div className="absolute right-0 top-full z-20 mt-1 w-56 overflow-hidden rounded-2xl border border-line bg-white py-1.5 shadow-pop">
                <div className="border-b border-line-soft px-4 py-3">
                  <p className="text-sm font-bold text-ink">{user.nom}</p>
                  <p className="mt-0.5 text-xs text-ink-soft">{user.email || 'Aucun email'}</p>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-brand-50"
                >
                  <User size={15} className="text-brand-500" /> Mon profil
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-semibold text-danger transition-colors hover:bg-danger-bg"
                >
                  <LogOut size={15} /> Se deconnecter
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
