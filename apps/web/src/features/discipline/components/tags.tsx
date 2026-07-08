import { Badge } from '@/shared/components/ui';
import { SEVERITY_META, severityOf } from '../mockData';
import { useTranslation } from "react-i18next";

export function SeverityTag({ points }: { points: number }) {
  const meta = SEVERITY_META[severityOf(points)];
  return <Badge tone={meta.tone}>{meta.label}</Badge>;
}

export function PointsBadge({ points }: { points: number }) {
    const { t } = useTranslation();
  const sev = severityOf(points);
  const color = sev === 'severe' ? '#DC2626' : sev === 'moderate' ? '#D97706' : '#22A05E';
  return (
    <span
      className="inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-black text-white"
      style={{ backgroundColor: color }}
    >
      {points} {t('pt')}{points > 1 ? 's' : ''}
    </span>
  );
}
