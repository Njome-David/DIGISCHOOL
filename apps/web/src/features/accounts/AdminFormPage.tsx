import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, UserCog, KeyRound } from 'lucide-react';
import { ROLE_LABELS } from '@ecole/shared';
import { Card, Button, Avatar } from '@/shared/components/ui';
import { Field, Alert } from '@/shared/components/form';
import { ROLE_META } from '@/shared/lib/roleMeta';
import { mockLatency } from '@/shared/lib/format';
import { ASSIGNABLE_ROLES, findAdmin, upsertAdmin, type AdminAccount } from './mockData';

const EMPTY: AdminAccount = {
  id: '',
  nom: '',
  username: '',
  role: ASSIGNABLE_ROLES[0],
  email: '',
  phone: '',
  status: 'active',
  createdAt: new Date().toISOString(),
  lastLogin: null,
};

export function AdminFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const existing = id ? findAdmin(id) : undefined;

  const [form, setForm] = useState<AdminAccount>(existing ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = <K extends keyof AdminAccount>(key: K, value: AdminAccount[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.nom.trim() || !form.username.trim()) {
      setError('Le nom complet et l\u2019identifiant sont obligatoires.');
      return;
    }
    setSaving(true);
    await mockLatency();
    upsertAdmin({ ...form, id: form.id || String(Date.now()) });
    setSaving(false);
    navigate('/root/admins');
  }

  const meta = ROLE_META[form.role];

  return (
    <div className="max-w-2xl space-y-4">
      <button
        onClick={() => navigate('/root/admins')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> Retour aux comptes
      </button>

      <Card>
        <div className="mb-5 flex items-center gap-3">
          {form.nom ? (
            <Avatar name={form.nom} color={meta.color} size={48} />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-brand-700">
              <UserCog size={20} />
            </div>
          )}
          <div>
            <h2 className="text-base font-black text-ink">
              {editing ? 'Modifier le compte' : 'Nouveau compte administrateur'}
            </h2>
            <p className="text-xs font-semibold text-ink-soft">
              {editing ? `Identifiant : @${form.username}` : 'Creer un acces au systeme'}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4">
            <Alert tone="danger">{error}</Alert>
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Nom complet">
              <input
                value={form.nom}
                onChange={(e) => set('nom', e.target.value)}
                className="field-input"
                placeholder="Ex. Marie Dupont"
              />
            </Field>
            <Field label="Identifiant">
              <input
                value={form.username}
                onChange={(e) => set('username', e.target.value)}
                className="field-input"
                placeholder="m.dupont"
                disabled={editing}
              />
            </Field>
          </div>

          <Field label="Role">
            <select
              value={form.role}
              onChange={(e) => set('role', e.target.value as AdminAccount['role'])}
              className="field-input"
            >
              {ASSIGNABLE_ROLES.map((r) => (
                <option key={r} value={r}>
                  {ROLE_LABELS[r]}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Email" hint="Optionnel">
              <input
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                className="field-input"
                placeholder="email@ecoleapp.com"
              />
            </Field>
            <Field label="Telephone" hint="Optionnel">
              <input
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                className="field-input"
                placeholder="+237 6XX XXX XXX"
              />
            </Field>
          </div>

          {!editing && (
            <Alert tone="info" icon={KeyRound}>
              Un mot de passe temporaire sera genere. L'utilisateur devra le changer a la premiere connexion.
            </Alert>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => navigate('/root/admins')}>
              Annuler
            </Button>
            <Button type="submit" loading={saving}>
              <Save size={15} /> {editing ? 'Enregistrer' : 'Creer le compte'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
