import { useState } from 'react';
import { FileCheck2, CheckCircle, Send, ChevronRight, X } from 'lucide-react';
import { Card, Button, Badge, EmptyState, FilterTabs, type FilterOption } from '@/shared/components/ui';
import { BulletinPreview } from './components/BulletinPreview';
import { MOCK_BULLETINS, setBulletinStatus, type Bulletin, type BulletinStatus } from './mockData';

const FILTERS: FilterOption<BulletinStatus>[] = [
  { value: 'pending', label: 'A valider', activeColor: '#D97706' },
  { value: 'validated', label: 'Validees', activeColor: '#1081F3' },
  { value: 'published', label: 'Publiees', activeColor: '#22A05E' },
];

const STATUS_TONE: Record<BulletinStatus, 'warning' | 'info' | 'success'> = {
  pending: 'warning',
  validated: 'info',
  published: 'success',
};
const STATUS_LABEL: Record<BulletinStatus, string> = {
  pending: 'A valider',
  validated: 'Validee',
  published: 'Publiee',
};

export function BulletinsValidationPage() {
  const [filter, setFilter] = useState<BulletinStatus>('pending');
  const [preview, setPreview] = useState<Bulletin | null>(null);
  const [, force] = useState(0);

  const list = MOCK_BULLETINS.filter((b) => b.status === filter);

  const act = (b: Bulletin, status: BulletinStatus) => {
    setBulletinStatus(b.id, status);
    setPreview(null);
    force((n) => n + 1);
  };

  return (
    <div className="max-w-4xl space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">Validation des bulletins</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">
          {MOCK_BULLETINS.filter((b) => b.status === 'pending').length} bulletins en attente de signature
        </p>
      </div>

      <FilterTabs value={filter} onChange={setFilter} options={FILTERS} />

      {list.length === 0 ? (
        <div className="surface">
          <EmptyState icon={FileCheck2} message="Aucun bulletin dans cette categorie." />
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((b) => (
            <Card key={b.id} className="flex flex-wrap items-center gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-black text-ink">{b.studentName}</h3>
                  <Badge tone="brand">{b.classCode}</Badge>
                  <Badge tone={STATUS_TONE[b.status]}>{STATUS_LABEL[b.status]}</Badge>
                </div>
                <p className="mt-0.5 text-xs font-semibold text-ink-soft">
                  {b.term} - Moyenne {b.generalAverage.toFixed(2)}/20 - Rang {b.generalRank}/{b.classSize} - {b.mention}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="outline" onClick={() => setPreview(b)}>
                  Apercu <ChevronRight size={14} />
                </Button>
                {b.status === 'pending' && (
                  <Button variant="success" onClick={() => act(b, 'validated')}>
                    <CheckCircle size={14} /> Valider
                  </Button>
                )}
                {b.status === 'validated' && (
                  <Button onClick={() => act(b, 'published')}>
                    <Send size={14} /> Publier
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {preview && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setPreview(null)} role="presentation" />
          <div className="relative z-50 max-h-[88vh] w-full max-w-2xl overflow-y-auto">
            <div className="mb-2 flex justify-end">
              <button
                onClick={() => setPreview(null)}
                className="rounded-full bg-white p-2 text-ink-soft shadow-card transition-colors hover:text-ink"
                aria-label="Fermer"
              >
                <X size={16} />
              </button>
            </div>
            <BulletinPreview bulletin={preview} />
            {preview.status === 'pending' && (
              <div className="mt-3 flex justify-end gap-2">
                <Button variant="success" onClick={() => act(preview, 'validated')}>
                  <CheckCircle size={14} /> Valider et signer
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
