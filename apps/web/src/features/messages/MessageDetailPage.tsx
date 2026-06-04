import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Star, Trash2, Reply, Send, Mail } from 'lucide-react';
import { Avatar, Button } from '@/shared/components/ui';
import { dateTimeLong, mockLatency } from '@/shared/lib/format';
import { MOCK_MESSAGES, type Message } from './mockData';

export function MessageDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [showReply, setShowReply] = useState(false);

  useEffect(() => {
    setMessages((p) => p.map((m) => (m.id === id ? { ...m, read: true } : m)));
  }, [id]);

  const message = messages.find((m) => m.id === id);

  const toggleStar = () =>
    setMessages((p) => p.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m)));

  const handleSend = async () => {
    if (!reply.trim()) return;
    setSending(true);
    await mockLatency(700);
    setSending(false);
    setSent(true);
    setReply('');
    setShowReply(false);
    setTimeout(() => setSent(false), 3000);
  };

  if (!message) {
    return (
      <div className="max-w-2xl">
        <div className="surface p-8 text-center">
          <Mail size={32} className="mx-auto mb-3 text-brand-200" />
          <p className="text-sm font-bold text-ink">Message introuvable.</p>
          <Link to="/messages" className="mt-3 inline-block text-sm font-bold text-brand-500 hover:underline">
            Retour a la boite de reception
          </Link>
        </div>
      </div>
    );
  }

  const idx = MOCK_MESSAGES.findIndex((m) => m.id === id);
  const prev = MOCK_MESSAGES[idx - 1];
  const nextMsg = MOCK_MESSAGES[idx + 1];

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => navigate('/messages')}
          className="flex items-center gap-1.5 text-sm font-bold text-ink-soft hover:underline"
        >
          <ArrowLeft size={15} /> Boite de reception
        </button>
        <div className="flex items-center gap-2">
          {sent && <span className="text-xs font-bold text-success">Reponse envoyee !</span>}
          <button onClick={toggleStar} className="rounded-xl p-2 transition-colors hover:bg-brand-50" aria-label="Favori">
            <Star
              size={15}
              style={{ color: message.starred ? '#D97706' : '#C9B8E0', fill: message.starred ? '#D97706' : 'none' }}
            />
          </button>
          <button
            onClick={() => navigate('/messages')}
            className="rounded-xl p-2 text-danger transition-colors hover:bg-danger-bg"
            aria-label="Supprimer"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-card">
        <div className="border-b border-line-soft px-6 py-5">
          <h2 className="mb-4 text-base font-black text-ink">{message.subject}</h2>
          <div className="flex items-center gap-3">
            <Avatar name={message.initials} color={message.color} size={40} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-black text-ink">{message.from}</p>
              <p className="text-xs font-semibold text-ink-faint">A vous - {dateTimeLong(message.date)}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5">
          <p className="whitespace-pre-wrap text-sm font-semibold leading-relaxed text-ink">{message.body}</p>
        </div>

        {!showReply ? (
          <div className="px-6 pb-5">
            <button onClick={() => setShowReply(true)} className="btn-outline text-brand-500">
              <Reply size={14} /> Repondre
            </button>
          </div>
        ) : (
          <div className="space-y-3 border-t border-line-soft px-6 pb-5 pt-4">
            <p className="text-xs font-bold text-ink-soft">
              Repondre a <span className="text-ink">{message.from}</span>
            </p>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={4}
              placeholder="Ecrivez votre reponse"
              className="field-input resize-none"
            />
            <div className="flex items-center gap-2">
              <Button onClick={handleSend} loading={sending} disabled={!reply.trim()}>
                {!sending && <Send size={13} />}
                {sending ? 'Envoi' : 'Envoyer'}
              </Button>
              <button
                onClick={() => {
                  setShowReply(false);
                  setReply('');
                }}
                className="btn-ghost"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs font-bold text-ink-faint">
        {prev ? (
          <Link to={`/messages/${prev.id}`} className="flex items-center gap-1 text-brand-500 hover:underline">
            <ArrowLeft size={12} /> Message precedent
          </Link>
        ) : (
          <span />
        )}
        {nextMsg ? (
          <Link to={`/messages/${nextMsg.id}`} className="flex items-center gap-1 text-brand-500 hover:underline">
            Message suivant <ArrowLeft size={12} className="rotate-180" />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
