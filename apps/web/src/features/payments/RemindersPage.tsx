import { useState } from 'react';
import { Send, Check, AlertTriangle, MessageCircle } from 'lucide-react';
import { Card, Button, Avatar, Badge, EmptyState } from '@/shared/components/ui';
import { Field, Alert } from '@/shared/components/form';
import { avatarColor } from '@/shared/lib/roleMeta';
import { formatMoney, mockLatency } from '@/shared/lib/format';
import { overdueStudents } from './mockData';

const DEFAULT_MESSAGE =
  'Cher parent, nous vous rappelons que le solde de la scolarite de votre enfant reste a regler. Merci de bien vouloir vous rapprocher de l administration.';

export function RemindersPage() {
  const list = overdueStudents();
  const [selected, setSelected] = useState<Set<string>>(new Set(list.map((s) => s.matricule)));
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [sending, setSending] = useState(false);
  const [sentCount, setSentCount] = useState(0);

  const toggle = (m: string) => {
    setSentCount(0);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(m)) next.delete(m);
      else next.add(m);
      return next;
    });
  };

  async function send() {
    setSending(true);
    await mockLatency(800);
    setSentCount(selected.size);
    setSending(false);
  }

  if (list.length === 0) {
    return (
      <div className="max-w-2xl space-y-4">
        <h2 className="text-base font-black text-ink">Envoi de relances</h2>
        <div className="surface">
          <EmptyState icon={MessageCircle} message="Aucun eleve en retard. Aucune relance necessaire." />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">Envoi de relances</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">
          {selected.size} destinataire{selected.size > 1 ? 's' : ''} selectionne{selected.size > 1 ? 's' : ''}
        </p>
      </div>

      {sentCount > 0 && (
        <Alert tone="success" icon={Check}>
          {sentCount} relance{sentCount > 1 ? 's' : ''} envoyee{sentCount > 1 ? 's' : ''} avec succes.
        </Alert>
      )}

      <Card>
        <Field label="Message de relance">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="field-input resize-none"
          />
        </Field>
      </Card>

      <div className="surface divide-y divide-line-soft">
        {list.map((st) => {
          const checked = selected.has(st.matricule);
          return (
            <button
              key={st.matricule}
              type="button"
              onClick={() => toggle(st.matricule)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-canvas"
            >
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors"
                style={{
                  backgroundColor: checked ? '#AD56C4' : 'transparent',
                  borderColor: checked ? '#AD56C4' : '#D1D5DB',
                }}
              >
                {checked && <Check size={13} className="text-white" />}
              </span>
              <Avatar name={st.studentName} color={avatarColor(st.matricule)} size={32} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-ink">{st.studentName}</p>
                <p className="flex items-center gap-1 text-xs font-semibold text-danger">
                  <AlertTriangle size={11} /> {st.classCode} - solde {formatMoney(st.balance)}
                </p>
              </div>
              <Badge tone="neutral" className="hidden sm:inline-flex">
                {Math.round((st.paid / st.total) * 100)}%
              </Badge>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button onClick={send} loading={sending} disabled={selected.size === 0}>
          <Send size={15} /> Envoyer {selected.size} relance{selected.size > 1 ? 's' : ''}
        </Button>
      </div>
    </div>
  );
}
