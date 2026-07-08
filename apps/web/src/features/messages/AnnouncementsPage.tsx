import { Megaphone } from 'lucide-react';
import { EmptyState } from '@/shared/components/ui';
import { AnnouncementCard } from './components/AnnouncementCard';
import { announcements } from './mockData';
import { useTranslation } from "react-i18next";

export function AnnouncementsPage() {
    const { t } = useTranslation();
  const list = announcements();

  return (
    <div className="w-full space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">{t('annonces_de_l_ecole')}</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">
          {list.length} {t('annonce')}{list.length > 1 ? 's' : ''} {t('publiee')}{list.length > 1 ? 's' : ''}
        </p>
      </div>

      {list.length === 0 ? (
        <div className="surface">
          <EmptyState icon={Megaphone} message="Aucune annonce pour le moment." />
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((m) => (
            <AnnouncementCard key={m.id} message={m} />
          ))}
        </div>
      )}
    </div>
  );
}
