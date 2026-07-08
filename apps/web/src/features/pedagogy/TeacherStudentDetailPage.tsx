import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Cake, Flag, BookOpen, GraduationCap, ShieldAlert } from 'lucide-react';
import { Card, Avatar, Badge, KpiCard, EmptyState } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { ageFrom } from '@/shared/lib/format';
import { findStudent } from '@/features/students/mockData';
import { bulletinsForStudent } from '@/features/evaluations/mockData';
import { studentPoints } from '@/features/discipline/mockData';
import { useTranslation } from "react-i18next";

export function TeacherStudentDetailPage() {
    const { t } = useTranslation();
  const { matricule } = useParams<{ matricule: string }>();
  const navigate = useNavigate();
  const student = matricule ? findStudent(matricule) : undefined;

  if (!student) {
    return (
      <div className="surface w-full">
        <EmptyState icon={GraduationCap} message="Eleve introuvable." />
      </div>
    );
  }

  const bulletins = bulletinsForStudent(student.matricule);
  const last = bulletins[bulletins.length - 1];
  const points = studentPoints(student.matricule);

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => navigate('/teacher/students')}
        className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} /> {t('retour_a_mes_eleves')}</button>

      <Card>
        <div className="flex items-center gap-4">
          <Avatar name={`${student.firstName} ${student.lastName}`} seed={student.matricule} color={avatarColor(student.matricule)} size={56} />
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-black text-ink">
              {student.firstName} {student.lastName}
            </h2>
            <p className="text-xs font-semibold text-ink-soft">{t('matricule')}{student.matricule}</p>
          </div>
          <Badge tone="brand">{student.classCode}</Badge>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Info icon={Cake} label={t('age')} value={`${ageFrom(student.dateOfBirth)} ans`} />
          <Info icon={Flag} label={t('nationalite')} value={student.nationality} />
          <Info icon={BookOpen} label={t('classe')} value={student.classCode} />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <KpiCard
          icon={GraduationCap}
          color="#7B2D9E"
          bg="#F0DCFA"
          value={last ? `${last.generalAverage.toFixed(2)}/20` : '-'}
          label={t('derniere_moyenne')}
          sub={last ? `Rang ${last.generalRank}/${last.classSize}` : undefined}
        />
        <KpiCard icon={ShieldAlert} color="#D97706" bg="#FEF3C7" value={points} label={t('points_discipline')} />
      </div>

      <Card>
        <h3 className="mb-3 text-sm font-black text-ink">{t('notes_par_matiere')}{last ? `- ${last.term}` : ''}</h3>
        {!last ? (
          <EmptyState icon={BookOpen} message="Aucune note disponible." />
        ) : (
          <div className="divide-y divide-line-soft">
            {last.lines.map((l) => (
              <div key={l.courseLabel} className="flex items-center gap-3 py-2.5">
                <span className="flex-1 text-sm font-bold text-ink">{l.courseLabel}</span>
                <span className="text-xs font-semibold text-ink-soft">{t('coeff')}{l.coeff}</span>
                <span
                  className="text-sm font-black"
                  style={{ color: l.moyenne >= 14 ? '#22A05E' : l.moyenne >= 10 ? '#D97706' : '#DC2626' }}
                >
                  {l.moyenne.toFixed(2)}/20
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-canvas px-3 py-2.5">
      <Icon size={16} className="shrink-0 text-brand-500" />
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wide text-ink-faint">{label}</p>
        <p className="truncate text-sm font-bold text-ink">{value}</p>
      </div>
    </div>
  );
}
