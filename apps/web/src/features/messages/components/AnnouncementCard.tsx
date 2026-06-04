import { Megaphone, Wallet } from 'lucide-react';
import { Card, Badge } from '@/shared/components/ui';
import { dateLong } from '@/shared/lib/format';
import { MESSAGE_TYPE_META, type CollectiveMessage } from '../mockData';

export function AnnouncementCard({ message }: { message: CollectiveMessage }) {
  const meta = MESSAGE_TYPE_META[message.type];
  const Icon = message.type === 2 ? Wallet : Megaphone;

  return (
    <Card>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-700">
          <Icon size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-black text-ink">{message.subject}</h3>
            <Badge tone={meta.tone}>{meta.label}</Badge>
          </div>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">
            {message.author} - {dateLong(message.date)}
          </p>
          <p className="mt-2 whitespace-pre-line text-sm font-medium leading-relaxed text-ink-soft">{message.body}</p>
        </div>
      </div>
    </Card>
  );
}
