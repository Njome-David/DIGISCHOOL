import { useState, type FormEvent } from 'react';
import { Library, Plus } from 'lucide-react';
import { Card, Button, EmptyState } from '@/shared/components/ui';
import { Field, Alert, UploadField } from '@/shared/components/form';
import { BookCard } from './components/BookCard';
import { MOCK_BOOKS, SPECIALTIES, addBook, removeBook, type Book, type Specialty } from './mockData';
import { useTranslation } from "react-i18next";

const LEVELS = ['SIL', 'CP', 'CE1', 'CE2', 'CM1', 'CM2'];

export function LibraryAdminPage() {
    const { t } = useTranslation();
  const [, force] = useState(0);
  const [form, setForm] = useState({
    title: '',
    author: '',
    specialty: SPECIALTIES[0] as Specialty,
    level: LEVELS[2],
    fileName: null as string | null,
  });
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim() || !form.fileName) {
      setError('Le titre et le fichier sont obligatoires.');
      return;
    }
    const book: Book = {
      id: `bk${Date.now()}`,
      title: form.title.trim(),
      author: form.author.trim() || 'Auteur inconnu',
      specialty: form.specialty,
      level: form.level,
      fileName: form.fileName,
      fileSize: 2_097_152,
      addedDate: new Date().toISOString().slice(0, 10),
    };
    addBook(book);
    setForm({ title: '', author: '', specialty: SPECIALTIES[0], level: LEVELS[2], fileName: null });
    force((n) => n + 1);
  };

  const handleRemove = (id: string) => {
    removeBook(id);
    force((n) => n + 1);
  };

  return (
    <div className="w-full space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">{t('bibliotheque_gestion')}</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">
          {MOCK_BOOKS.length} {t('manuels_taille_max_10_mo_par_f')}</p>
      </div>

      <Card>
        <h3 className="mb-4 text-sm font-black text-ink">{t('televerser_un_manuel')}</h3>
        {error && (
          <div className="mb-4">
            <Alert tone="danger">{error}</Alert>
          </div>
        )}
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={t('titre')}>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="field-input"
                placeholder={t('titre_de_l_ouvrage')}
              />
            </Field>
            <Field label={t('auteur')}>
              <input
                value={form.author}
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                className="field-input"
                placeholder={t('auteur_ou_editeur')}
              />
            </Field>
            <Field label={t('specialite')}>
              <select
                value={form.specialty}
                onChange={(e) => setForm((f) => ({ ...f, specialty: e.target.value as Specialty }))}
                className="field-input"
              >
                {SPECIALTIES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t('niveau')}>
              <select
                value={form.level}
                onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))}
                className="field-input"
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label={t('fichier_pdf')}>
            <UploadField value={form.fileName} onChange={(name) => setForm((f) => ({ ...f, fileName: name }))} accept=".pdf" />
          </Field>
          <div className="flex justify-end">
            <Button type="submit">
              <Plus size={15} /> {t('ajouter_a_la_bibliotheque')}</Button>
          </div>
        </form>
      </Card>

      {MOCK_BOOKS.length === 0 ? (
        <div className="surface">
          <EmptyState icon={Library} message="Aucun manuel dans la bibliotheque." />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_BOOKS.map((b) => (
            <BookCard key={b.id} book={b} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </div>
  );
}
