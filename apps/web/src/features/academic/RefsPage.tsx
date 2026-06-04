import { useState, type FormEvent } from 'react';
import { MapPin, Building2, Plus } from 'lucide-react';
import { RootSubNav } from '@/app/components/RootSubNav';
import { Card, Button, Badge, FilterTabs, type FilterOption } from '@/shared/components/ui';
import { Field } from '@/shared/components/form';
import { DisciplineRefsPage } from '@/features/discipline/DisciplineRefsPage';
import { MOCK_VILLES, MOCK_QUARTIERS, toggleLookup, addLookup, type Lookup } from './mockData';

type Tab = 'villes' | 'quartiers' | 'disciplines';

const TABS: FilterOption<Tab>[] = [
  { value: 'villes', label: 'Villes' },
  { value: 'quartiers', label: 'Quartiers' },
  { value: 'disciplines', label: 'Disciplines' },
];

export function RefsPage() {
  const [tab, setTab] = useState<Tab>('disciplines');

  return (
    <div className="max-w-3xl space-y-4">
      <RootSubNav />

      <div>
        <h2 className="text-base font-black text-ink">Referentiels</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">Villes de naissance, quartiers et disciplines</p>
      </div>

      <FilterTabs value={tab} onChange={setTab} options={TABS} />

      {tab === 'villes' && <LookupManager list={MOCK_VILLES} icon={MapPin} singular="ville" placeholder="Ex. Kribi" />}
      {tab === 'quartiers' && <LookupManager list={MOCK_QUARTIERS} icon={Building2} singular="quartier" placeholder="Ex. Ngousso" />}
      {tab === 'disciplines' && <DisciplineRefsPage embedded />}
    </div>
  );
}

function LookupManager({
  list,
  icon: Icon,
  singular,
  placeholder,
}: {
  list: Lookup[];
  icon: typeof MapPin;
  singular: string;
  placeholder: string;
}) {
  const [, force] = useState(0);
  const [label, setLabel] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;
    addLookup(list, label.trim());
    setLabel('');
    force((n) => n + 1);
  };

  return (
    <div className="space-y-4">
      <Card>
        <form onSubmit={submit} className="flex flex-wrap items-end gap-3">
          <div className="min-w-[200px] flex-1">
            <Field label={`Nouvelle entree (${singular})`}>
              <input value={label} onChange={(e) => setLabel(e.target.value)} className="field-input" placeholder={placeholder} />
            </Field>
          </div>
          <Button type="submit">
            <Plus size={15} /> Ajouter
          </Button>
        </form>
      </Card>

      <div className="surface divide-y divide-line-soft">
        {list.map((item) => (
          <div key={item.id} className="flex items-center gap-3 px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-canvas text-ink-soft">
              <Icon size={16} />
            </div>
            <p className="flex-1 text-sm font-bold text-ink">{item.label}</p>
            {!item.active && <Badge tone="neutral">Inactif</Badge>}
            <button
              type="button"
              onClick={() => {
                toggleLookup(list, item.id);
                force((n) => n + 1);
              }}
              className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
              style={{ backgroundColor: item.active ? '#22A05E' : '#D1D5DB' }}
              aria-label={item.active ? 'Desactiver' : 'Activer'}
            >
              <span
                className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all"
                style={{ left: item.active ? '22px' : '2px' }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
