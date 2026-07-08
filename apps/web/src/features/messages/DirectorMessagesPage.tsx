import { useState } from 'react';
import { MailCheck, CheckCircle, XCircle, Users, Wallet } from 'lucide-react';
import { Card, Button, Badge, EmptyState, FilterTabs, type FilterOption } from '@/shared/components/ui';
import { dateTimeLong } from '@/shared/lib/format';
import {
  MOCK_COLLECTIVE,
  setCollectiveStatus,
  MESSAGE_TYPE_META,
  type CollectiveStatus,
} from './mockData';
import { useTranslation } from "react-i18next";

const FILTERS: FilterOption<CollectiveStatus>[] = [
  { value: 'pending', label: 'A valider', activeColor: '#D97706' },
  { value: 'validated', label: 'Validees', activeColor: '#22A05E' },
  { value: 'rejected', label: 'Rejetees', activeColor: '#DC2626' },
];

export function DirectorMessagesPage() {
    const { t } = useTranslation();
  const [filter, setFilter] = useState<CollectiveStatus>('pending');
  const [, force] = useState(0);

  const list = MOCK_COLLECTIVE.filter((m) => m.status === filter).sort((a, b) => b.date.localeCompare(a.date));

  const act = (id: string, status: CollectiveStatus) => {
    setCollectiveStatus(id, status);
    force((n) => n + 1);
  };

  return (
    <div className="w-full space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">{t('validation_des_messages_collec')}</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">
          {MOCK_COLLECTIVE.filter((m) => m.status === 'pending').length} {t('messages_en_attente_de_validat')}</p>
      </div>

      <FilterTabs value={filter} onChange={setFilter} options={FILTERS} />

      {list.length === 0 ? (
        <div className="surface">
          <EmptyState icon={MailCheck} message="Aucun message dans cette categorie." />
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((m) => {
            const meta = MESSAGE_TYPE_META[m.type];
            const Icon = m.type === 2 ? Wallet : Users;
            return (
              <Card key={m.id}>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-700">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-black text-ink">{m.subject}</h3>
                      <Badge tone={meta.tone}>{meta.label}</Badge>
                    </div>
                    <p className="mt-0.5 text-xs font-semibold text-ink-soft">
                      {m.author} - {dateTimeLong(m.date)} - {m.recipientCount} {t('destinataires')}</p>
                    <p className="mt-2 whitespace-pre-line text-sm font-medium leading-relaxed text-ink-soft">{m.body}</p>

                    {m.status === 'pending' && (
                      <div className="mt-3 flex gap-2">
                        <Button variant="success" onClick={() => act(m.id, 'validated')}>
                          <CheckCircle size={14} /> {t('valider_et_diffuser')}</Button>
                        <Button variant="outline" onClick={() => act(m.id, 'rejected')}>
                          <XCircle size={14} /> {t('rejeter')}</Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
