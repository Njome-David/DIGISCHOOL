import { useState } from 'react';
import { Eye } from 'lucide-react';
import { Card, FilterTabs, SearchInput, type FilterOption } from '@/shared/components/ui';
import { Alert } from '@/shared/components/form';
import { ExportButton } from '@/features/reporting/components/charts';
import { formatMoney } from '@/shared/lib/format';
import { MOCK_STUDENTS } from '@/features/students/mockData';
import { MOCK_PERSONNEL } from '@/features/accounts/mockData';
import { MOCK_PAYMENTS } from '@/features/payments/mockData';
import { MOCK_COURSES } from '@/features/pedagogy/mockData';
import { useTranslation } from "react-i18next";

type DatasetKey = 'students' | 'personnel' | 'payments' | 'courses';

interface DatasetCfg {
  label: string;
  columns: { key: string; label: string }[];
  rows: Record<string, string | number>[];
  filename: string;
}

function buildDatasets(): Record<DatasetKey, DatasetCfg> {
  return {
    students: {
      label: 'Eleves',
      columns: [
        { key: 'matricule', label: 'Matricule' },
        { key: 'nom', label: 'Nom' },
        { key: 'classe', label: 'Classe' },
        { key: 'statut', label: 'Statut' },
      ],
      rows: MOCK_STUDENTS.map((s) => ({
        matricule: s.matricule,
        nom: `${s.firstName} ${s.lastName}`,
        classe: s.classCode,
        statut: s.status,
      })),
      filename: 'listing-eleves.csv',
    },
    personnel: {
      label: 'Personnel',
      columns: [
        { key: 'nom', label: 'Nom' },
        { key: 'type', label: 'Type' },
        { key: 'email', label: 'Email' },
        { key: 'statut', label: 'Statut' },
      ],
      rows: MOCK_PERSONNEL.map((p) => ({ nom: p.nom, type: p.type, email: p.email, statut: p.status })),
      filename: 'listing-personnel.csv',
    },
    payments: {
      label: 'Paiements',
      columns: [
        { key: 'recu', label: 'Recu' },
        { key: 'eleve', label: 'Eleve' },
        { key: 'montant', label: 'Montant' },
        { key: 'mode', label: 'Mode' },
      ],
      rows: MOCK_PAYMENTS.map((p) => ({
        recu: p.receiptNo,
        eleve: p.studentName,
        montant: formatMoney(p.amount),
        mode: p.modeLabel,
      })),
      filename: 'listing-paiements.csv',
    },
    courses: {
      label: 'Cours',
      columns: [
        { key: 'code', label: 'Code' },
        { key: 'libelle', label: 'Libelle' },
        { key: 'classe', label: 'Classe' },
        { key: 'enseignant', label: 'Enseignant' },
      ],
      rows: MOCK_COURSES.map((c) => ({
        code: c.code,
        libelle: c.label,
        classe: c.classCode,
        enseignant: c.teacherName ?? '-',
      })),
      filename: 'listing-cours.csv',
    },
  };
}

export function AuditorListingsPage() {
    const { t } = useTranslation();
  const datasets = buildDatasets();
  const [active, setActive] = useState<DatasetKey>('students');
  const [search, setSearch] = useState('');

  const options: FilterOption<DatasetKey>[] = (Object.keys(datasets) as DatasetKey[]).map((k) => ({
    value: k,
    label: datasets[k].label,
  }));

  const cfg = datasets[active];
  const q = search.toLowerCase();
  const rows = q
    ? cfg.rows.filter((r) => Object.values(r).some((v) => String(v).toLowerCase().includes(q)))
    : cfg.rows;

  return (
    <div className="w-full space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">{t('toutes_les_listes')}</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">{t('consultation_transversale_des')}</p>
      </div>

      <Alert tone="info" icon={Eye}>
        {t('lecture_seule_les_donnees_sont')}</Alert>

      <div className="flex flex-wrap items-center gap-3">
        <FilterTabs value={active} onChange={(v) => { setActive(v); setSearch(''); }} options={options} />
        <div className="flex-1" />
        <ExportButton rows={cfg.rows} filename={cfg.filename} />
      </div>

      <SearchInput value={search} onChange={setSearch} placeholder={`Rechercher dans ${cfg.label.toLowerCase()}`} />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-line-soft">
                {cfg.columns.map((c) => (
                  <th key={c.key} className="px-2 py-2 text-left text-xs font-black text-ink-soft">
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid #EDE5F8' : 'none' }}>
                  {cfg.columns.map((c) => (
                    <td key={c.key} className="px-2 py-2.5 text-sm font-semibold text-ink">
                      {r[c.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
