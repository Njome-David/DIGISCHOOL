import { Avatar } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import type { Bulletin } from '../mockData';
import { useTranslation } from "react-i18next";

export function BulletinPreview({ bulletin }: { bulletin: Bulletin }) {
    const { t } = useTranslation();
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <div className="mb-4 flex items-center gap-3 border-b border-line-soft pb-4">
        <Avatar name={bulletin.studentName} color={avatarColor(bulletin.matricule)} size={42} />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-black text-ink">{bulletin.studentName}</h3>
          <p className="text-xs font-semibold text-ink-soft">
            {bulletin.classCode} - {bulletin.term} {t('matricule')}{bulletin.matricule}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-black text-brand-600">{bulletin.generalAverage.toFixed(2)}</p>
          <p className="text-xs font-semibold text-ink-faint">{t('moyenne_20')}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-line-soft">
              <th className="px-2 py-2 text-left text-xs font-black text-ink-soft">{t('matiere')}</th>
              <th className="px-2 py-2 text-center text-xs font-black text-ink-soft">{t('coeff')}</th>
              <th className="px-2 py-2 text-center text-xs font-black text-ink-soft">{t('moy')}</th>
              <th className="px-2 py-2 text-center text-xs font-black text-ink-soft">{t('rang')}</th>
              <th className="px-2 py-2 text-left text-xs font-black text-ink-soft">{t('appreciation')}</th>
            </tr>
          </thead>
          <tbody>
            {bulletin.lines.map((l, i) => (
              <tr key={l.courseLabel} style={{ borderBottom: i < bulletin.lines.length - 1 ? '1px solid #EDE5F8' : 'none' }}>
                <td className="px-2 py-2 text-sm font-bold text-ink">{l.courseLabel}</td>
                <td className="px-2 py-2 text-center text-xs font-semibold text-ink-soft">{l.coeff}</td>
                <td className="px-2 py-2 text-center text-sm font-black text-ink">{l.moyenne.toFixed(1)}</td>
                <td className="px-2 py-2 text-center text-xs font-semibold text-ink-soft">{l.rank}</td>
                <td className="px-2 py-2 text-xs font-semibold text-ink-soft">{l.appreciation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line-soft pt-4">
        <div className="rounded-xl bg-canvas p-3 text-center">
          <p className="text-sm font-black text-ink">{bulletin.generalRank} / {bulletin.classSize}</p>
          <p className="text-xs font-semibold text-ink-soft">{t('rang_general')}</p>
        </div>
        <div className="rounded-xl bg-canvas p-3 text-center">
          <p className="text-sm font-black text-ink">{bulletin.generalAverage.toFixed(2)}</p>
          <p className="text-xs font-semibold text-ink-soft">{t('moyenne')}</p>
        </div>
        <div className="rounded-xl bg-accent p-3 text-center">
          <p className="text-sm font-black text-brand-700">{bulletin.mention}</p>
          <p className="text-xs font-semibold text-brand-600">{t('mention')}</p>
        </div>
      </div>
    </div>
  );
}
