import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, UserPlus, Trash2, Users, Phone, Mail } from 'lucide-react';
import { Card, Button, Avatar, EmptyState } from '@/shared/components/ui';
import { Field } from '@/shared/components/form';
import { avatarColor } from '@/shared/lib/roleMeta';
import { findStudent } from './mockData';
import { useTranslation } from "react-i18next";

interface ParentLink {
  id: string;
  name: string;
  phone: string;
  email: string;
  relation: string;
}

export function StudentParentsPage() {
    const { t } = useTranslation();
  const { matricule } = useParams<{ matricule: string }>();
  const navigate = useNavigate();
  const student = matricule ? findStudent(matricule) : undefined;

  const [links, setLinks] = useState<ParentLink[]>(
    student ? [{ id: 'l1', name: student.parentName, phone: student.parentPhone, email: student.parentEmail, relation: 'Tuteur principal' }] : []
  );
  const [form, setForm] = useState({ name: '', phone: '', email: '', relation: 'Parent' });

  if (!student) {
    return (
      <div className="surface w-full">
        <EmptyState icon={Users} message="Eleve introuvable." />
      </div>
    );
  }

  function add(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setLinks((prev) => [...prev, { id: `l${Date.now()}`, name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim(), relation: form.relation }]);
    setForm({ name: '', phone: '', email: '', relation: 'Parent' });
  }

  function remove(id: string) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => navigate(`/admin/students/${student.matricule}`)}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> {t('retour_a_la_fiche')}</button>

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-brand-700">
          <Users size={20} />
        </div>
        <div>
          <h2 className="text-base font-black text-ink">{t('liaison_parent_eleve')}</h2>
          <p className="text-xs font-semibold text-ink-soft">
            {student.firstName} {student.lastName} - {student.classCode}
          </p>
        </div>
      </div>

      <Card>
        <h3 className="mb-3 text-sm font-black text-ink">{t('parents_rattaches')}{links.length})</h3>
        {links.length === 0 ? (
          <EmptyState icon={Users} message="Aucun parent rattache." />
        ) : (
          <div className="divide-y divide-line-soft">
            {links.map((l) => (
              <div key={l.id} className="flex items-center gap-3 py-2.5">
                <Avatar name={l.name} seed={l.name} color={avatarColor(l.name)} size={38} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-ink">{l.name}</p>
                  <p className="flex flex-wrap items-center gap-2 text-xs font-semibold text-ink-soft">
                    <span>{l.relation}</span>
                    <span className="flex items-center gap-1"><Phone size={10} /> {l.phone}</span>
                    {l.email && <span className="flex items-center gap-1"><Mail size={10} /> {l.email}</span>}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(l.id)}
                  className="shrink-0 rounded-lg p-1.5 text-ink-faint transition-colors hover:bg-danger-bg hover:text-danger"
                  aria-label="Retirer"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card>
        <h3 className="mb-3 text-sm font-black text-ink">{t('ajouter_un_parent')}</h3>
        <form onSubmit={add} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={t('nom')}>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="field-input" />
            </Field>
            <Field label={t('relation')}>
              <select value={form.relation} onChange={(e) => setForm({ ...form, relation: e.target.value })} className="field-input">
                <option>{t('parent')}</option>
                <option>{t('pere')}</option>
                <option>{t('mere')}</option>
                <option>{t('tuteur')}</option>
              </select>
            </Field>
            <Field label={t('telephone')}>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="field-input" placeholder={t('237_6xx_xxx_xxx')} />
            </Field>
            <Field label={t('email')} hint={t('optionnel')}>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="field-input" />
            </Field>
          </div>
          <div className="flex justify-end">
            <Button type="submit">
              <UserPlus size={15} /> {t('rattacher')}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
