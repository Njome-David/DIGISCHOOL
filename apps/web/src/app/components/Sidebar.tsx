import { NavLink, useNavigate } from 'react-router-dom';
import { ChevronRight, Lock, LogOut } from 'lucide-react';
import { ROLE_LABELS } from '@ecole/shared';
import { useAuthStore } from '@/features/auth/store';
import { commonNav, moduleNav } from '@/app/navigation';
import { Avatar, cn } from '@/shared/components/ui';
import { useTranslation } from "react-i18next";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
    const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  if (!user) return null;

  const common = commonNav(user.role);
  const modules = moduleNav(user.role);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-150',
      isActive
        ? 'bg-white/20 font-bold text-white shadow-sm'
        : 'font-semibold text-white/80 hover:bg-white/10 hover:text-white'
    );

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-sidebar-gradient">
      <div className="border-b border-white/10 px-6 py-5">
        <h1 className="text-xl font-black tracking-tight text-white">{t('digischool')}</h1>
        <p className="mt-0.5 text-xs font-semibold text-white/50">{t('ecoleapp_2026')}</p>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-white/40">{t('navigation')}</p>
        {common.map((item) => (
          <NavLink key={item.to} to={item.to} onClick={onNavigate} className={linkClass}>
            <item.icon size={18} className="shrink-0" />
            <span className="flex-1">{t(item.labelKey)}</span>
            <ChevronRight size={13} className="opacity-0 transition-opacity group-hover:opacity-50" />
          </NavLink>
        ))}

        <p className="mb-2 mt-5 px-3 text-[10px] font-bold uppercase tracking-wider text-white/40">{t('modules')}</p>
        {modules.map((item) =>
          item.to ? (
            <NavLink key={item.key} to={item.to} onClick={onNavigate} className={linkClass}>
              <item.icon size={18} className="shrink-0" />
              <span className="flex-1">{t(item.labelKey)}</span>
              <ChevronRight size={13} className="opacity-0 transition-opacity group-hover:opacity-50" />
            </NavLink>
          ) : (
            <div
              key={item.key}
              className="flex cursor-not-allowed select-none items-center gap-3 rounded-xl px-3 py-2.5 opacity-40"
              title={t('bientot_disponible')}
            >
              <item.icon size={18} className="shrink-0 text-white/70" />
              <span className="flex-1 text-sm font-semibold text-white/70">{t(item.labelKey)}</span>
              <Lock size={11} className="text-white/40" />
            </div>
          )
        )}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="mb-3 flex min-w-0 items-center gap-3">
          <Avatar name={user.nom} color="rgba(255,255,255,0.2)" size={36} />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white">{user.nom}</p>
            <p className="text-xs text-white/50">{ROLE_LABELS[user.role]}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut size={15} /> {t('se_deconnecter')}</button>
      </div>
    </aside>
  );
}
