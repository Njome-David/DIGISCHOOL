import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, FileCheck2, Download, Eye, Lock, X } from 'lucide-react';
import { Card, Avatar, Badge, EmptyState, Button } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { findStudent } from '@/features/students/mockData';
import { bulletinsForStudent, type Bulletin } from '@/features/evaluations/mockData';
import { BulletinPreview } from '@/features/evaluations/components/BulletinPreview';
import { useTranslation } from "react-i18next";

export function ChildBulletinsPage() {
    const { t } = useTranslation();
  const { matricule } = useParams();
  const navigate = useNavigate();
  const child = matricule ? findStudent(matricule) : undefined;
  const bulletins = matricule ? bulletinsForStudent(matricule) : [];
  const [preview, setPreview] = useState<Bulletin | null>(null);

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => navigate('/parent/children')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> {t('mes_enfants')}</button>

      {child && (
        <div className="flex items-center gap-3">
          <Avatar name={`${child.firstName} ${child.lastName}`} color={avatarColor(child.matricule)} size={42} />
          <div>
            <h2 className="text-base font-black text-ink">
              {child.firstName} {child.lastName}
            </h2>
            <p className="text-xs font-semibold text-ink-soft">{t('bulletins')}{child.classCode}</p>
          </div>
        </div>
      )}

      {bulletins.length === 0 ? (
        <div className="surface">
          <EmptyState icon={FileCheck2} message="Aucun bulletin pour le moment." />
        </div>
      ) : (
        <div className="space-y-3">
          {bulletins.map((b) => {
            const available = b.status === 'published';
            return (
              <Card key={b.id} className="flex flex-wrap items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-700">
                  <FileCheck2 size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-black text-ink">{t('bulletin')}{b.term}</h3>
                  <p className="text-xs font-semibold text-ink-soft">
                    {t('moyenne')}{b.generalAverage.toFixed(2)}/20 - {b.mention}
                  </p>
                </div>
                {available ? (
                  <div className="flex shrink-0 gap-2">
                    <Button variant="outline" onClick={() => setPreview(b)}>
                      <Eye size={14} /> {t('apercu')}</Button>
                    <Button>
                      <Download size={14} /> {t('telecharger')}</Button>
                  </div>
                ) : (
                  <Badge tone="neutral">
                    <Lock size={11} /> {t('pas_encore_publie')}</Badge>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {preview && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setPreview(null)} role="presentation" />
          <div className="relative z-50 max-h-[88vh] w-full w-full overflow-y-auto">
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
          </div>
        </div>
      )}
    </div>
  );
}
