import { useState, type FormEvent } from 'react';
import { ListChecks, Plus } from 'lucide-react';
import { Card, Button, Badge } from '@/shared/components/ui';
import { Field } from '@/shared/components/form';
import { SeverityTag } from './components/tags';
import { MOCK_DISCIPLINE_REFS, toggleRef, addRef, GRAVE_THRESHOLD, type DisciplineRef } from './mockData';
import { useTranslation } from "react-i18next";

export function DisciplineRefsPage({ embedded = false }: { embedded?: boolean }) {
    const { t } = useTranslation();
  const [, force] = useState(0);
  const [label, setLabel] = useState('');
  const [points, setPoints] = useState(1);

  const handleToggle = (id: string) => {
    toggleRef(id);
    force((n) => n + 1);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;
    const ref: DisciplineRef = { id: `d${Date.now()}`, label: label.trim(), points, active: true };
    addRef(ref);
    setLabel('');
    setPoints(1);
    force((n) => n + 1);
  };

  return (
    <div className={embedded ? 'space-y-4' : 'w-full space-y-4'}>
      {!embedded && (
        <div>
          <h2 className="text-base font-black text-ink">{t('referentiel_des_disciplines')}</h2>
          <p className="mt-0.5 text-xs font-semibold text-ink-soft">
            {t('fautes_et_points_associes_seui')}{GRAVE_THRESHOLD} {t('points')}</p>
        </div>
      )}

      <Card>
        <form onSubmit={submit} className="flex flex-wrap items-end gap-3">
          <div className="min-w-[200px] flex-1">
            <Field label={t('nouvelle_faute')}>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="field-input"
                placeholder={t('ex_utilisation_du_telephone')}
              />
            </Field>
          </div>
          <div className="w-28">
            <Field label={t('points')}>
              <input
                type="number"
                min={1}
                max={20}
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="field-input"
              />
            </Field>
          </div>
          <Button type="submit">
            <Plus size={15} /> {t('ajouter')}</Button>
        </form>
      </Card>

      <div className="surface divide-y divide-line-soft">
        {MOCK_DISCIPLINE_REFS.map((r) => (
          <div key={r.id} className="flex items-center gap-3 px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-canvas text-ink-soft">
              <ListChecks size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-ink">{r.label}</p>
              <p className="text-xs font-semibold text-ink-soft">{r.points} {t('pt')}{r.points > 1 ? 's' : ''}</p>
            </div>
            <SeverityTag points={r.points} />
            {!r.active && <Badge tone="neutral">{t('inactive')}</Badge>}
            <button
              type="button"
              onClick={() => handleToggle(r.id)}
              className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
              style={{ backgroundColor: r.active ? '#22A05E' : '#D1D5DB' }}
              aria-label={r.active ? 'Desactiver' : 'Activer'}
            >
              <span
                className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all"
                style={{ left: r.active ? '22px' : '2px' }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
