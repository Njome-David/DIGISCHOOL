import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MailOpen, Star, Pencil } from 'lucide-react';
import { SearchInput, Avatar, EmptyState } from '@/shared/components/ui';
import { useAuthStore } from '@/features/auth/store';
import { ROLES } from '@ecole/shared';
import { MOCK_MESSAGES, messageDateShort, type Message } from './mockData';
import { useTranslation } from "react-i18next";

export function MessagesPage() {
    const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [search, setSearch] = useState('');
  const unread = messages.filter((m) => !m.read).length;
  const role = useAuthStore((s) => s.user?.role);
  const composePath = role === ROLES.PARENT ? '/parent/messages/new' : '/messages/new';

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMessages((p) => p.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m)));
  };

  const q = search.toLowerCase();
  const filtered = messages.filter(
    (m) =>
      m.subject.toLowerCase().includes(q) ||
      m.from.toLowerCase().includes(q) ||
      m.preview.toLowerCase().includes(q)
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-black text-ink">{t('boite_de_reception')}</h2>
            {unread > 0 && (
              <span className="rounded-full bg-brand-500 px-2 py-0.5 text-xs font-black text-white">{unread}</span>
            )}
          </div>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">
            {messages.length} {t('message')}{messages.length > 1 ? 's' : ''}
          </p>
        </div>
        <Link to={composePath} className="btn-brand">
          <Pencil size={13} /> {t('nouveau_message')}</Link>
      </div>

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder={t('rechercher_par_objet_expediteu')}
        className="flex-none"
      />

      <div className="overflow-hidden rounded-2xl bg-white shadow-card">
        {filtered.length === 0 ? (
          <EmptyState icon={Mail} message="Aucun message trouve." />
        ) : (
          filtered.map((m, i) => (
            <Link
              key={m.id}
              to={`/messages/${m.id}`}
              className="flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-brand-50"
              style={{
                borderBottom: i < filtered.length - 1 ? '1px solid #EDE5F8' : 'none',
                backgroundColor: m.read ? undefined : '#FAF7FE',
              }}
            >
              <Avatar name={m.initials} color={m.color} size={36} className="mt-0.5" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={`truncate text-sm text-ink ${m.read ? 'font-bold' : 'font-black'}`}>{m.from}</p>
                  <span className="shrink-0 text-xs font-semibold text-ink-faint">{messageDateShort(m.date)}</span>
                </div>
                <p className={`mt-0.5 truncate text-xs ${m.read ? 'text-ink-soft' : 'font-bold text-ink'}`}>
                  {m.subject}
                </p>
                <p className="mt-0.5 truncate text-xs font-semibold text-ink-faint">{m.preview}</p>
              </div>
              <div className="ml-1 flex shrink-0 flex-col items-center gap-2">
                <button onClick={(e) => toggleStar(m.id, e)} className="p-0.5" aria-label="Favori">
                  <Star size={13} style={{ color: m.starred ? '#D97706' : '#C9B8E0', fill: m.starred ? '#D97706' : 'none' }} />
                </button>
                {m.read ? <MailOpen size={11} className="text-brand-200" /> : <Mail size={11} className="text-brand-500" />}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
