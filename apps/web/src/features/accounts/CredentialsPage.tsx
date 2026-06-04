import { useMemo, useState } from 'react';
import { Send, KeyRound, Check } from 'lucide-react';
import { RootSubNav } from '@/app/components/RootSubNav';
import { Card, Button, Badge, Avatar, SearchInput } from '@/shared/components/ui';
import { Alert } from '@/shared/components/form';
import { avatarColor } from '@/shared/lib/roleMeta';
import { ROLE_LABELS } from '@ecole/shared';
import { MOCK_ADMINS } from './mockData';
import { MOCK_PERSONNEL } from './mockData';
import { allParents } from '@/features/students/mockData';

interface Recipient {
  id: string;
  name: string;
  detail: string;
  channel: string;
}

export function CredentialsPage() {
  const recipients = useMemo<Recipient[]>(() => {
    const admins = MOCK_ADMINS.map((a) => ({ id: `a-${a.id}`, name: a.nom, detail: ROLE_LABELS[a.role], channel: a.phone || a.email }));
    const staff = MOCK_PERSONNEL.map((p) => ({ id: `p-${p.id}`, name: p.nom, detail: p.type === 'teacher' ? 'Enseignant' : 'Administratif', channel: p.phone || p.email }));
    const parents = allParents().map((p) => ({ id: `par-${p.name}`, name: p.name, detail: 'Parent', channel: p.phone || p.email }));
    return [...admins, ...staff, ...parents];
  }, []);

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sent, setSent] = useState<Set<string>>(new Set());
  const [confirm, setConfirm] = useState(0);

  const q = search.toLowerCase();
  const filtered = recipients.filter((r) => !q || r.name.toLowerCase().includes(q) || r.detail.toLowerCase().includes(q));

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function sendCodes() {
    if (selected.size === 0) return;
    setSent((prev) => new Set([...prev, ...selected]));
    setConfirm(selected.size);
    setSelected(new Set());
  }

  return (
    <div className="max-w-3xl space-y-4">
      <RootSubNav />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">Envoi des codes de connexion</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">
            Selectionnez les comptes a notifier (envoi via messagerie / SMS)
          </p>
        </div>
        <Button onClick={sendCodes} disabled={selected.size === 0}>
          <Send size={15} /> Envoyer ({selected.size})
        </Button>
      </div>

      {confirm > 0 && (
        <Alert tone="success">
          Codes de connexion envoyes a {confirm} compte{confirm > 1 ? 's' : ''}.
        </Alert>
      )}

      <SearchInput value={search} onChange={setSearch} placeholder="Rechercher un compte" />

      <Card>
        <div className="divide-y divide-line-soft">
          {filtered.map((r) => {
            const isSent = sent.has(r.id);
            const isChecked = selected.has(r.id);
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => toggle(r.id)}
                className="-mx-2 flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-canvas"
              >
                <span
                  className={
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ' +
                    (isChecked ? 'border-brand-500 bg-brand-500 text-white' : 'border-line bg-white')
                  }
                >
                  {isChecked && <Check size={13} />}
                </span>
                <Avatar name={r.name} seed={r.name} color={avatarColor(r.name)} size={36} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-ink">{r.name}</p>
                  <p className="truncate text-xs font-semibold text-ink-soft">
                    {r.detail} - {r.channel}
                  </p>
                </div>
                {isSent ? (
                  <Badge tone="success">
                    <KeyRound size={11} /> Code envoye
                  </Badge>
                ) : (
                  <Badge tone="neutral">En attente</Badge>
                )}
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
