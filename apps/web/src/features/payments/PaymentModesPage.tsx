import { useState } from 'react';
import { CreditCard, Banknote, Smartphone, Building2, FileText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card, Badge } from '@/shared/components/ui';
import { MOCK_MODES, toggleMode } from './mockData';
import { useTranslation } from "react-i18next";

const MODE_ICONS: Record<string, LucideIcon> = {
  Especes: Banknote,
  'Mobile Money': Smartphone,
  'Virement bancaire': Building2,
  Cheque: FileText,
};

export function PaymentModesPage({ readOnly = false }: { readOnly?: boolean }) {
    const { t } = useTranslation();
  const [, force] = useState(0);

  const handleToggle = (id: string) => {
    toggleMode(id);
    force((n) => n + 1);
  };

  const modes = readOnly ? MOCK_MODES.filter((m) => m.active) : MOCK_MODES;

  return (
    <div className="w-full space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">
          {readOnly ? 'Modes de paiement acceptes' : 'Gestion des modes de paiement'}
        </h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">
          {readOnly ? 'Moyens disponibles pour encaisser un paiement' : 'Activer ou desactiver les moyens de paiement'}
        </p>
      </div>

      <div className="space-y-3">
        {modes.map((m) => {
          const Icon = MODE_ICONS[m.label] ?? CreditCard;
          return (
            <Card key={m.id} className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-700">
                <Icon size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-black text-ink">{m.label}</h3>
                <p className="text-xs font-semibold text-ink-soft">{m.active ? 'Actif' : 'Desactive'}</p>
              </div>
              {readOnly ? (
                <Badge tone="success">{t('disponible')}</Badge>
              ) : (
                <button
                  type="button"
                  onClick={() => handleToggle(m.id)}
                  className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
                  style={{ backgroundColor: m.active ? '#22A05E' : '#D1D5DB' }}
                  aria-label={m.active ? 'Desactiver' : 'Activer'}
                >
                  <span
                    className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all"
                    style={{ left: m.active ? '22px' : '2px' }}
                  />
                </button>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
