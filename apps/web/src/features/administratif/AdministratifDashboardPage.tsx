import { Link } from 'react-router-dom';
import { FolderOpen, FileWarning, GraduationCap, ChevronRight, BookOpen } from 'lucide-react';
import { Card, KpiCard, Badge } from '@/shared/components/ui';
import { MOCK_DOSSIERS, incompleteCount, completeness, isComplete } from './mockData';

export function AdministratifDashboardPage() {
  const incomplete = incompleteCount();
  const recent = [...MOCK_DOSSIERS].sort((a, b) => completeness(a) - completeness(b)).slice(0, 5);

  return (
    <div className="max-w-3xl space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">Tableau de bord - Administratif</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">Suivi des dossiers administratifs des eleves</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard icon={FolderOpen} color="#7B2D9E" bg="#F0DCFA" value={MOCK_DOSSIERS.length} label="Dossiers" />
        <KpiCard icon={FileWarning} color="#DC2626" bg="#FEF2F2" value={incomplete} label="Incomplets" />
        <KpiCard icon={GraduationCap} color="#22A05E" bg="#D1FAE5" value={MOCK_DOSSIERS.length - incomplete} label="Complets" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link to="/staff/files" className="surface flex items-center gap-3 p-4 transition-colors hover:bg-brand-50">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-brand-700">
            <FolderOpen size={18} />
          </span>
          <span className="flex-1 text-sm font-black text-ink">Gerer les dossiers</span>
          <ChevronRight size={16} className="text-ink-faint" />
        </Link>
        <Link to="/library" className="surface flex items-center gap-3 p-4 transition-colors hover:bg-brand-50">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-brand-700">
            <BookOpen size={18} />
          </span>
          <span className="flex-1 text-sm font-black text-ink">Bibliotheque</span>
          <ChevronRight size={16} className="text-ink-faint" />
        </Link>
      </div>

      <Card>
        <h3 className="mb-3 text-sm font-black text-ink">Dossiers a completer en priorite</h3>
        <div className="divide-y divide-line-soft">
          {recent.map((d) => (
            <Link
              key={d.matricule}
              to={`/staff/students/${d.matricule}`}
              className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-canvas"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink">{d.studentName}</p>
                <p className="text-xs font-semibold text-ink-soft">{d.classCode}</p>
              </div>
              <Badge tone={isComplete(d) ? 'success' : 'warning'}>{completeness(d)}%</Badge>
              <ChevronRight size={15} className="text-ink-faint" />
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
