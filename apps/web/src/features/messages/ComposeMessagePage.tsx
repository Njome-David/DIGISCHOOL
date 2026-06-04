import { useState, useMemo, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Check, Info, Users, User, Wallet } from 'lucide-react';
import { Card, Button, Badge } from '@/shared/components/ui';
import { Field, Alert } from '@/shared/components/form';
import { mockLatency } from '@/shared/lib/format';
import { useAuthStore } from '@/features/auth/store';
import { ROLES } from '@ecole/shared';
import { MOCK_STUDENTS } from '@/features/students/mockData';
import { addCollective, type CollectiveMessage, type MessageType } from './mockData';

type Audience = 'individual' | 'all' | 'reminder';

const AUDIENCES: { value: Audience; label: string; icon: typeof User; type: MessageType }[] = [
  { value: 'individual', label: 'Un parent', icon: User, type: 0 },
  { value: 'all', label: 'Tous les parents', icon: Users, type: 1 },
  { value: 'reminder', label: 'Relance paiement', icon: Wallet, type: 2 },
];

export function ComposeMessagePage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const isParent = user?.role === ROLES.PARENT;

  const parents = useMemo(() => {
    const seen = new Set<string>();
    return MOCK_STUDENTS.filter((s) => {
      if (seen.has(s.parentName)) return false;
      seen.add(s.parentName);
      return true;
    }).map((s) => ({ name: s.parentName, childName: `${s.firstName} ${s.lastName}` }));
  }, []);

  const [audience, setAudience] = useState<Audience>('individual');
  const [recipient, setRecipient] = useState(parents[0]?.name ?? '');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<'individual' | 'collective' | null>(null);
  const [error, setError] = useState('');

  const isCollective = !isParent && audience !== 'individual';

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!subject.trim() || !body.trim()) {
      setError("L'objet et le message sont obligatoires.");
      return;
    }
    setSending(true);
    await mockLatency(700);

    if (isCollective) {
      const def = AUDIENCES.find((a) => a.value === audience)!;
      const msg: CollectiveMessage = {
        id: `c${Date.now()}`,
        type: def.type as 1 | 2,
        subject: subject.trim(),
        body: body.trim(),
        author: user?.nom ?? 'Administration',
        date: new Date().toISOString(),
        status: 'pending',
        recipientCount: audience === 'reminder' ? 38 : 142,
      };
      addCollective(msg);
      setSent('collective');
    } else {
      setSent('individual');
    }
    setSending(false);
  }

  if (sent) {
    return (
      <div className="max-w-2xl space-y-4">
        <Card>
          <div className="flex flex-col items-center py-8 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-success-bg text-success">
              <Check size={28} />
            </div>
            <h2 className="text-base font-black text-ink">Message envoye</h2>
            <p className="mt-1 max-w-sm text-sm font-semibold text-ink-soft">
              {sent === 'collective'
                ? 'Votre message collectif a ete transmis au Directeur pour validation avant diffusion.'
                : 'Votre message a bien ete transmis au destinataire.'}
            </p>
            <div className="mt-5 flex gap-2">
              <Button variant="outline" onClick={() => navigate('/messages')}>
                Retour aux messages
              </Button>
              <Button
                onClick={() => {
                  setSent(null);
                  setSubject('');
                  setBody('');
                }}
              >
                Nouveau message
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-4">
      <button
        onClick={() => navigate('/messages')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> Retour aux messages
      </button>

      <Card>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-brand-700">
            <Send size={20} />
          </div>
          <div>
            <h2 className="text-base font-black text-ink">Composer un message</h2>
            <p className="text-xs font-semibold text-ink-soft">
              {isParent ? "A destination de l'administration" : 'Choisissez les destinataires'}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4">
            <Alert tone="danger">{error}</Alert>
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          {isParent ? (
            <Field label="Destinataire">
              <input value="Administration de l'ecole" readOnly className="field-input bg-canvas" />
            </Field>
          ) : (
            <Field label="Destinataires">
              <div className="grid grid-cols-3 gap-2">
                {AUDIENCES.map((a) => {
                  const active = audience === a.value;
                  return (
                    <button
                      key={a.value}
                      type="button"
                      onClick={() => setAudience(a.value)}
                      className="flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 transition-colors"
                      style={{
                        borderColor: active ? '#AD56C4' : '#EDE5F8',
                        backgroundColor: active ? '#FAF5FE' : 'transparent',
                      }}
                    >
                      <a.icon size={18} className={active ? 'text-brand-600' : 'text-ink-faint'} />
                      <span className={active ? 'text-xs font-bold text-brand-700' : 'text-xs font-bold text-ink-soft'}>
                        {a.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Field>
          )}

          {!isParent && audience === 'individual' && (
            <Field label="Parent">
              <select value={recipient} onChange={(e) => setRecipient(e.target.value)} className="field-input">
                {parents.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name} (parent de {p.childName})
                  </option>
                ))}
              </select>
            </Field>
          )}

          {isCollective && (
            <Alert tone="info" icon={Info}>
              Les messages collectifs sont soumis a la validation du Directeur avant diffusion.
            </Alert>
          )}

          <Field label="Objet">
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="field-input"
              placeholder="Objet du message"
            />
          </Field>

          <Field label="Message">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              className="field-input resize-none"
              placeholder="Votre message..."
            />
          </Field>

          <div className="flex items-center justify-between pt-2">
            {isCollective ? (
              <Badge tone="warning">A valider par le Directeur</Badge>
            ) : (
              <span />
            )}
            <Button type="submit" loading={sending}>
              <Send size={15} /> {isCollective ? 'Soumettre pour validation' : 'Envoyer'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
