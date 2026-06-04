import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Save, CheckCircle, Lock, ChevronRight } from 'lucide-react';
import { ROLE_LABELS } from '@ecole/shared';
import { useAuthStore } from '@/features/auth/store';
import { Card, SectionTitle, Avatar, Badge, Button } from '@/shared/components/ui';
import { Field } from '@/shared/components/form';
import { ROLE_META } from '@/shared/lib/roleMeta';
import { mockLatency } from '@/shared/lib/format';

export function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  if (!user) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await mockLatency();
    updateProfile({ email, phone });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-xl space-y-5">
      <Card className="flex items-center gap-5 p-6">
        <Avatar name={user.nom} color={ROLE_META[user.role].color} size={64} />
        <div>
          <h2 className="text-lg font-black text-ink">{user.nom}</h2>
          <div className="mt-1">
            <Badge>{ROLE_LABELS[user.role]}</Badge>
          </div>
          <p className="mt-1 text-xs font-semibold text-ink-soft">@{user.username}</p>
        </div>
      </Card>

      <Card className="p-6">
        <SectionTitle className="mb-5">Informations personnelles</SectionTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Nom d'utilisateur" hint="L'identifiant ne peut pas etre modifie.">
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input
                type="text"
                value={user.username}
                readOnly
                className="field-input cursor-not-allowed bg-canvas pl-9 text-ink-faint"
              />
            </div>
          </Field>

          <Field label="Adresse e-mail">
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="field-input pl-9"
              />
            </div>
          </Field>

          <Field label="Telephone">
            <div className="relative">
              <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-500" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+237 6XX XXX XXX"
                className="field-input pl-9"
              />
            </div>
          </Field>

          <div className="flex items-center gap-3 pt-1">
            <Button type="submit" loading={saving}>
              {!saving && (saved ? <CheckCircle size={15} /> : <Save size={15} />)}
              {saving ? 'Enregistrement' : saved ? 'Enregistre !' : 'Enregistrer'}
            </Button>
            {saved && <span className="text-sm font-bold text-success">Modifications sauvegardees</span>}
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <SectionTitle className="mb-3">Securite</SectionTitle>
        <Link
          to="/change-password"
          className="group flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-brand-50"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent">
              <Lock size={15} className="text-brand-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-ink">Changer le mot de passe</p>
              <p className="text-xs font-semibold text-ink-soft">Recommande tous les 3 mois</p>
            </div>
          </div>
          <ChevronRight size={15} className="text-brand-500 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </Card>
    </div>
  );
}
