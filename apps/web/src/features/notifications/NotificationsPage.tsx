import { useState } from 'react';
import { Bell, CheckCheck, Trash2, Info, AlertTriangle, CheckCircle, AlertCircle, type LucideIcon } from 'lucide-react';
import { FilterTabs, EmptyState } from '@/shared/components/ui';
import { relativeTime } from '@/shared/lib/format';

type NotifType = 'info' | 'success' | 'warning' | 'error';

interface Notif {
  id: string;
  type: NotifType;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const INITIAL: Notif[] = [
  { id: '1', type: 'warning', title: 'Paiement en retard', message: 'La tranche 2 pour Thomas est en retard de 15 jours.', date: '2026-05-28T09:30:00', read: false },
  { id: '2', type: 'success', title: 'Bulletin disponible', message: 'Le bulletin du 1er trimestre de Thomas est disponible au telechargement.', date: '2026-05-28T08:00:00', read: false },
  { id: '3', type: 'info', title: "Annonce de l'ecole", message: "Reunion parents d'eleves le 05 juin 2026 a 15h30 en salle polyvalente.", date: '2026-05-27T14:00:00', read: false },
  { id: '4', type: 'success', title: 'Inscription confirmee', message: 'Le dossier de Lea Martin a ete valide pour l\'annee 2025-2026.', date: '2026-05-26T10:20:00', read: true },
  { id: '5', type: 'info', title: 'Nouveaux devoirs publies', message: '2 devoirs ont ete publies par Prof. Fouda pour CE1-A.', date: '2026-05-25T16:45:00', read: true },
  { id: '6', type: 'error', title: 'Rapport disciplinaire', message: 'Un rapport disciplinaire a ete emis pour Thomas Martin  comportement en classe.', date: '2026-05-24T11:00:00', read: true },
  { id: '7', type: 'info', title: 'Message recu', message: 'Vous avez recu un message de la direction concernant le calendrier scolaire.', date: '2026-05-23T09:00:00', read: true },
];

const CONFIG: Record<NotifType, { icon: LucideIcon; color: string; bg: string }> = {
  info: { icon: Info, color: '#1081F3', bg: '#EFF4FF' },
  success: { icon: CheckCircle, color: '#22A05E', bg: '#D1FAE5' },
  warning: { icon: AlertTriangle, color: '#D97706', bg: '#FEF3C7' },
  error: { icon: AlertCircle, color: '#DC2626', bg: '#FEF2F2' },
};

export function NotificationsPage() {
  const [notifs, setNotifs] = useState(INITIAL);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const unread = notifs.filter((n) => !n.read).length;

  const markAll = () => setNotifs((p) => p.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifs((p) => p.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const remove = (id: string) => setNotifs((p) => p.filter((n) => n.id !== id));

  const list = filter === 'unread' ? notifs.filter((n) => !n.read) : notifs;

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-black text-ink">Notifications</h2>
            {unread > 0 && (
              <span className="rounded-full bg-danger px-2 py-0.5 text-xs font-black text-white">{unread}</span>
            )}
          </div>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">
            {unread > 0 ? `${unread} non lue${unread > 1 ? 's' : ''}` : 'Tout est a jour'}
          </p>
        </div>
        {unread > 0 && (
          <button
            onClick={markAll}
            className="flex items-center gap-1.5 text-xs font-bold text-brand-500 hover:underline"
          >
            <CheckCheck size={13} /> Tout marquer comme lu
          </button>
        )}
      </div>

      <FilterTabs
        value={filter}
        onChange={setFilter}
        className="w-fit"
        options={[
          { value: 'all', label: 'Toutes' },
          { value: 'unread', label: `Non lues (${unread})` },
        ]}
      />

      <div className="space-y-2">
        {list.length === 0 ? (
          <div className="surface">
            <EmptyState icon={Bell} message={`Aucune notification${filter === 'unread' ? ' non lue' : ''}.`} />
          </div>
        ) : (
          list.map((n) => {
            const c = CONFIG[n.type];
            const Icon = c.icon;
            return (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                className="group flex cursor-pointer items-start gap-3 rounded-2xl bg-white p-4 shadow-card transition-all hover:shadow-card-hover"
                style={{ borderLeft: n.read ? '3px solid transparent' : `3px solid ${c.color}` }}
              >
                <div
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: c.bg, color: c.color }}
                >
                  <Icon size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm text-ink ${n.read ? 'font-bold' : 'font-black'}`}>{n.title}</p>
                    <div className="flex shrink-0 items-center gap-1">
                      {!n.read && <div className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          remove(n.id);
                        }}
                        className="rounded p-1 text-danger opacity-0 transition-all hover:bg-danger-bg group-hover:opacity-100"
                        aria-label="Supprimer"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-ink-soft">{n.message}</p>
                  <p className="mt-1.5 text-xs font-semibold text-ink-faint">{relativeTime(n.date)}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
