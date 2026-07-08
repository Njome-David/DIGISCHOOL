import { Database, Wallet, GraduationCap, FileBarChart, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/shared/components/ui';
import { ExportButton } from './components/charts';
import { classPerformance, studentPerformance, ageDistribution, revenueByMode } from './mockData';
import { MOCK_PAYMENTS } from '@/features/payments/mockData';
import { MOCK_STUDENTS } from '@/features/students/mockData';

interface DatasetDef {
  icon: LucideIcon;
  title: string;
  description: string;
  rows: Record<string, string | number>[];
  filename: string;
}

export function ExportsPage({
  title = 'Exports comptables',
  subtitle = 'Telecharger les jeux de donnees au format CSV',
  scope = 'all',
}: {
  title?: string;
  subtitle?: string;
  scope?: 'finance' | 'all';
}) {
  const finance: DatasetDef[] = [
    {
      icon: Wallet,
      title: 'Paiements',
      description: `${MOCK_PAYMENTS.length} encaissements`,
      rows: MOCK_PAYMENTS.map((p) => ({
        recu: p.receiptNo,
        eleve: p.studentName,
        classe: p.classCode,
        tranche: p.trancheLabel,
        montant: p.amount,
        mode: p.modeLabel,
        date: p.date,
      })),
      filename: 'export-paiements.csv',
    },
    { icon: FileBarChart, title: 'Recettes par mode', description: 'Agregat par mode de paiement', rows: revenueByMode(), filename: 'export-recettes-mode.csv' },
  ];

  const pedagogy: DatasetDef[] = [
    {
      icon: GraduationCap,
      title: 'Eleves',
      description: `${MOCK_STUDENTS.length} dossiers`,
      rows: MOCK_STUDENTS.map((s) => ({
        matricule: s.matricule,
        prenom: s.firstName,
        nom: s.lastName,
        classe: s.classCode,
        sexe: s.gender,
        nationalite: s.nationality,
        statut: s.status,
      })),
      filename: 'export-eleves.csv',
    },
    { icon: FileBarChart, title: 'Performance par classe', description: 'Moyennes et reussite', rows: classPerformance(), filename: 'export-perf-classes.csv' },
    { icon: Users, title: 'Classement des eleves', description: 'Moyennes generales', rows: studentPerformance(), filename: 'export-classement.csv' },
    { icon: FileBarChart, title: 'Demographie', description: 'Repartition par age', rows: ageDistribution(), filename: 'export-demographie.csv' },
  ];

  const datasets = scope === 'finance' ? finance : [...finance, ...pedagogy];

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-brand-700">
          <Database size={20} />
        </div>
        <div>
          <h2 className="text-base font-black text-ink">{title}</h2>
          <p className="text-xs font-semibold text-ink-soft">{subtitle}</p>
        </div>
      </div>

      <div className="space-y-3">
        {datasets.map((d) => (
          <Card key={d.filename} className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-canvas text-ink-soft">
              <d.icon size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-black text-ink">{d.title}</h3>
              <p className="text-xs font-semibold text-ink-soft">{d.description}</p>
            </div>
            <ExportButton rows={d.rows} filename={d.filename} />
          </Card>
        ))}
      </div>
    </div>
  );
}
