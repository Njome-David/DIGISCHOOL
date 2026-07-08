import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Cake,
  Flag,
  BookOpen,
  CalendarCheck,
  User,
  Phone,
  Mail,
  Pencil,
  DoorOpen,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Card, SectionTitle, Avatar, Badge, Button, EmptyState } from '@/shared/components/ui';
import { avatarColor } from '@/shared/lib/roleMeta';
import { ageFrom, dateLong } from '@/shared/lib/format';
import { findStudent, STATUS_META } from './mockData';
import { useTranslation } from "react-i18next";

function InfoRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-canvas text-ink-soft">
        <Icon size={14} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-ink-faint">{label}</p>
        <p className="truncate text-sm font-bold text-ink">{value}</p>
      </div>
    </div>
  );
}

export function StudentDetailPage() {
    const { t } = useTranslation();
  const { matricule } = useParams();
  const navigate = useNavigate();
  const student = matricule ? findStudent(matricule) : undefined;

  if (!student) {
    return (
      <div className="w-full space-y-4">
        <button
          onClick={() => navigate('/admin/students')}
          className="flex items-center gap-1.5 text-sm font-bold text-ink-soft hover:text-ink"
        >
          <ArrowLeft size={15} /> {t('retour_a_la_liste')}</button>
        <div className="surface">
          <EmptyState icon={User} message="Dossier eleve introuvable." />
        </div>
      </div>
    );
  }

  const fullName = `${student.firstName} ${student.lastName}`;
  const status = STATUS_META[student.status];

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/admin/students')}
          className="flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft size={15} /> {t('retour_a_la_liste')}</button>
        <div className="flex flex-wrap gap-2">
          <Link to={`/admin/students/${student.matricule}/assign`}>
            <Button variant="outline">
              <DoorOpen size={14} /> {t('affecter')}</Button>
          </Link>
          <Link to={`/admin/students/${student.matricule}/parents`}>
            <Button variant="outline">
              <Users size={14} /> {t('parents')}</Button>
          </Link>
          <Link to={`/admin/students/${student.matricule}/edit`}>
            <Button variant="outline">
              <Pencil size={14} /> {t('modifier')}</Button>
          </Link>
        </div>
      </div>

      <Card className="bg-brand-gradient text-white">
        <div className="flex flex-wrap items-center gap-4">
          <Avatar name={fullName} color="rgba(255,255,255,0.25)" size={64} className="ring-2 ring-white/30" />
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-black">{fullName}</h2>
            <p className="text-sm font-semibold text-white/80">
              {t('matricule')}{student.matricule} - {student.classCode}
            </p>
          </div>
          <Badge className="bg-white/20 text-white">{status.label}</Badge>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <SectionTitle className="mb-4">{t('informations_personnelles')}</SectionTitle>
          <div className="space-y-3">
            <InfoRow icon={User} label={t('sexe')} value={student.gender === 'M' ? 'Masculin' : 'Feminin'} />
            <InfoRow
              icon={Cake}
              label={t('date_de_naissance')}
              value={`${dateLong(student.dateOfBirth)} (${ageFrom(student.dateOfBirth)} ans)`}
            />
            <InfoRow icon={Flag} label={t('nationalite')} value={student.nationality} />
            <InfoRow icon={BookOpen} label={t('classe')} value={student.classCode} />
            <InfoRow icon={CalendarCheck} label={t('date_d_inscription')} value={dateLong(student.enrollmentDate)} />
          </div>
        </Card>

        <Card>
          <SectionTitle className="mb-4">{t('parent_tuteur')}</SectionTitle>
          <div className="space-y-3">
            <InfoRow icon={User} label={t('nom')} value={student.parentName} />
            <InfoRow icon={Phone} label={t('telephone')} value={student.parentPhone} />
            <InfoRow icon={Mail} label={t('email')} value={student.parentEmail || 'Non renseigne'} />
          </div>

          <div className="mt-5 rounded-xl bg-canvas p-3">
            <p className="text-xs font-semibold text-ink-soft">
              {t('les_bulletins_paiements_et_l_h')}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
