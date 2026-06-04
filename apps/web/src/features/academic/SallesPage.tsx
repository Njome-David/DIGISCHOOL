import { useState } from 'react';
import { DoorOpen, Plus, Ruler, MapPin, BookOpen } from 'lucide-react';
import { RootSubNav } from '@/app/components/RootSubNav';
import { Card, Button, Badge, EmptyState } from '@/shared/components/ui';
import { Field } from '@/shared/components/form';
import { MOCK_SALLES, MOCK_CLASSES, addSalle, type Salle } from './mockData';

export function SallesPage() {
  const [, force] = useState(0);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    label: '',
    surface: '',
    position: '',
    classId: MOCK_CLASSES[0]?.id ?? '',
  });

  function add() {
    if (!form.label.trim()) return;
    const cls = MOCK_CLASSES.find((c) => c.id === form.classId);
    const salle: Salle = {
      id: `sa${Date.now()}`,
      label: form.label.trim(),
      surface: Number(form.surface) || 0,
      position: form.position.trim(),
      classId: form.classId,
      classCode: cls?.code ?? '',
    };
    addSalle(salle);
    setForm({ label: '', surface: '', position: '', classId: MOCK_CLASSES[0]?.id ?? '' });
    setOpen(false);
    force((n) => n + 1);
  }

  return (
    <div className="max-w-4xl space-y-4">
      <RootSubNav />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-ink">Gestion des salles</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">{MOCK_SALLES.length} salles rattachees a une classe</p>
        </div>
        <Button onClick={() => setOpen((o) => !o)}>
          <Plus size={15} /> Nouvelle salle
        </Button>
      </div>

      {open && (
        <Card>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Libelle">
              <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="field-input" placeholder="Salle 7" />
            </Field>
            <Field label="Surface (m2)">
              <input type="number" value={form.surface} onChange={(e) => setForm({ ...form, surface: e.target.value })} className="field-input" />
            </Field>
            <Field label="Position">
              <input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className="field-input" placeholder="Batiment B - 1er etage" />
            </Field>
            <Field label="Classe rattachee">
              <select value={form.classId} onChange={(e) => setForm({ ...form, classId: e.target.value })} className="field-input">
                {MOCK_CLASSES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} - {c.cycle}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button onClick={add}>Ajouter la salle</Button>
          </div>
        </Card>
      )}

      {MOCK_SALLES.length === 0 ? (
        <div className="surface">
          <EmptyState icon={DoorOpen} message="Aucune salle definie." />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {MOCK_SALLES.map((s) => (
            <Card key={s.id}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-700">
                  <DoorOpen size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black text-ink">{s.label}</p>
                  <p className="text-xs font-semibold text-ink-soft">{s.position || 'Position non definie'}</p>
                </div>
                <Badge tone="brand">
                  <BookOpen size={11} /> {s.classCode}
                </Badge>
              </div>
              <div className="mt-3 flex items-center gap-4 border-t border-line-soft pt-2 text-xs font-semibold text-ink-soft">
                <span className="flex items-center gap-1">
                  <Ruler size={12} className="text-ink-faint" /> {s.surface} m2
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-ink-faint" /> {s.position || '-'}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
