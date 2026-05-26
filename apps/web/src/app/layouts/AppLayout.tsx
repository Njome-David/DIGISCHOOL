import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, X, School } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/features/auth/store';
import { ROLE_LABELS } from '@ecole/shared';
import { cn } from '@/shared/components/ui';
import { NAV, getNavPrefix } from '@/app/navigation';

export function AppLayout() {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const prefix = getNavPrefix(location.pathname);
  const nav = NAV[prefix] || NAV.root;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-brand-950 text-white transition-transform lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 font-bold">
            <School size={20} />
          </div>
          <div>
            <p className="font-display text-sm font-bold">{t('app.name')}</p>
            <p className="text-xs text-brand-300">{t('app.tagline')}</p>
          </div>
          <button type="button" className="ml-auto lg:hidden" onClick={() => setOpen(false)} aria-label="Fermer">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                  isActive ? 'bg-brand-600 text-white' : 'text-brand-200 hover:bg-white/10 hover:text-white'
                )
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <p className="truncate text-xs text-brand-300">{user?.nom}</p>
          <p className="text-xs text-brand-400">{user && ROLE_LABELS[user.role]}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-brand-200 hover:bg-white/10"
          >
            <LogOut size={16} /> {t('auth.logout')}
          </button>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} role="presentation" />
      )}

      <div className="flex flex-1 flex-col lg:ml-0">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-100 bg-white/80 px-6 backdrop-blur">
          <button type="button" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Menu">
            <Menu size={22} />
          </button>
          <div className="flex-1" />
          <NavLink to="/profile" className="text-sm font-medium text-slate-600 hover:text-brand-600">
            {t('nav.profile')}
          </NavLink>
          <NavLink to="/notifications" className="text-sm font-medium text-slate-600 hover:text-brand-600">
            {t('nav.notifications')}
          </NavLink>
          <NavLink to="/messages" className="text-sm font-medium text-slate-600 hover:text-brand-600">
            {t('nav.messages')}
          </NavLink>
        </header>
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
