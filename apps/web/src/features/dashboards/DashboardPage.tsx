import { Link } from 'react-router-dom';
import { ArrowRight, Lock, User, Bell, Mail, GraduationCap, type LucideIcon } from 'lucide-react';
import { useAuthStore } from '@/features/auth/store';
import { Card, SectionTitle, KpiCard, Avatar } from '@/shared/components/ui';
import { ROLE_META } from '@/shared/lib/roleMeta';
import { dashboardFor } from './dashboardData';
import { useTranslation } from "react-i18next";

const QUICK_LINKS: { label: string; desc: string; to: string; icon: LucideIcon; ok: boolean }[] = [
  { label: 'Mon profil', desc: 'Mettre a jour mes informations', to: '/profile', icon: User, ok: true },
  { label: 'Notifications', desc: 'Centre de notifications', to: '/notifications', icon: Bell, ok: true },
  { label: 'Messages', desc: 'Boite de reception', to: '/messages', icon: Mail, ok: true },
  { label: 'Gestion academique', desc: 'Module M2  bientot', to: '#', icon: GraduationCap, ok: false },
];

export function DashboardPage() {
    const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  if (!user) return null;
  const { welcome, kpis, activities } = dashboardFor(user.role);

  return (
    <div className="w-full space-y-5">
      <div className="flex items-center justify-between gap-4 rounded-2xl bg-brand-gradient p-5">
        <div className="text-white">
          <p className="text-sm font-semibold opacity-70">{t('bonjour')}</p>
          <h2 className="text-xl font-black">{user.nom}</h2>
          <p className="mt-0.5 text-sm font-semibold opacity-60">{welcome}</p>
        </div>
        <Avatar name={user.nom} color="rgba(255,255,255,0.2)" size={56} className="hidden sm:flex" />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            icon={kpi.icon}
            color={kpi.color}
            bg={kpi.bg}
            value={kpi.value}
            label={kpi.label}
            sub={kpi.sub}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <SectionTitle>{t('activite_recente')}</SectionTitle>
            <Link
              to="/notifications"
              className="flex items-center gap-1 text-xs font-bold text-brand-500 hover:underline"
            >
              {t('voir_tout')}<ArrowRight size={11} />
            </Link>
          </div>
          <div className="space-y-3">
            {activities.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: a.dot }} />
                <div>
                  <p className="text-xs font-semibold leading-relaxed text-ink">{a.text}</p>
                  <p className="mt-0.5 text-xs text-ink-faint">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle className="mb-4">{t('acces_rapide')}</SectionTitle>
          <div className="space-y-1">
            {QUICK_LINKS.map((item) =>
              item.ok ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-brand-50"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-brand-500">
                    <item.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-ink">{item.label}</p>
                    <p className="text-xs font-semibold text-ink-soft">{item.desc}</p>
                  </div>
                  <ArrowRight
                    size={13}
                    className="text-brand-500 opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </Link>
              ) : (
                <div key={item.label} className="flex cursor-not-allowed items-center gap-3 rounded-xl p-3 opacity-40">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-line-soft text-ink-faint">
                    <item.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-ink">{item.label}</p>
                    <p className="text-xs font-semibold text-ink-soft">{item.desc}</p>
                  </div>
                  <Lock size={13} className="text-ink-faint" />
                </div>
              )
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
