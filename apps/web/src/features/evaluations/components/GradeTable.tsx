import { Avatar } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import type { GradeRow } from '../mockData';
import { useTranslation } from "react-i18next";

export function GradeTable({
  rows,
  maxNote,
  onChange,
  readOnly,
}: {
  rows: GradeRow[];
  maxNote: number;
  onChange?: (matricule: string, patch: Partial<GradeRow>) => void;
  readOnly?: boolean;
}) {
    const { t } = useTranslation();
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-line-soft">
            <th className="px-3 py-2.5 text-left text-xs font-black text-ink-soft">{t('eleve')}</th>
            <th className="w-28 px-3 py-2.5 text-left text-xs font-black text-ink-soft">{t('note')}{maxNote}</th>
            <th className="px-3 py-2.5 text-left text-xs font-black text-ink-soft">{t('appreciation')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.matricule}
              style={{ borderBottom: i < rows.length - 1 ? '1px solid #EDE5F8' : 'none' }}
            >
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-2.5">
                  <Avatar name={r.studentName} color={avatarColor(r.matricule)} size={30} />
                  <div>
                    <p className="text-sm font-bold text-ink">{r.studentName}</p>
                    <p className="text-xs font-semibold text-ink-faint">{r.matricule}</p>
                  </div>
                </div>
              </td>
              <td className="px-3 py-2.5">
                {readOnly ? (
                  <span className="text-sm font-black text-ink">{r.note ?? '-'}</span>
                ) : (
                  <input
                    type="number"
                    min={0}
                    max={maxNote}
                    step={0.25}
                    value={r.note ?? ''}
                    onChange={(e) =>
                      onChange?.(r.matricule, { note: e.target.value === '' ? null : Number(e.target.value) })
                    }
                    className="w-20 rounded-lg border border-line bg-field px-2 py-1.5 text-sm font-bold text-ink outline-none focus:ring-2 focus:ring-brand-300"
                    placeholder="-"
                  />
                )}
              </td>
              <td className="px-3 py-2.5">
                {readOnly ? (
                  <span className="text-xs font-semibold text-ink-soft">{r.appreciation || '-'}</span>
                ) : (
                  <input
                    type="text"
                    value={r.appreciation}
                    onChange={(e) => onChange?.(r.matricule, { appreciation: e.target.value })}
                    className="w-full rounded-lg border border-line bg-field px-2 py-1.5 text-sm font-semibold text-ink outline-none focus:ring-2 focus:ring-brand-300"
                    placeholder={t('appreciation')}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
