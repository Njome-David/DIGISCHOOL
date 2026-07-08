import { Card, Badge } from '@/shared/components/ui';
import { ChartCard, BarChartCard, ExportButton } from './components/charts';
import { classPerformance, coursePerformance, studentPerformance } from './mockData';
import { useTranslation } from "react-i18next";

type Scope = 'classes' | 'courses' | 'students';

const TITLES: Record<Scope, { title: string; subtitle: string }> = {
  classes: { title: 'Performance par classe', subtitle: 'Moyenne generale et taux de reussite' },
  courses: { title: 'Performance par cours', subtitle: 'Moyenne par matiere' },
  students: { title: 'Performance par eleve', subtitle: 'Classement general' },
};

function avgColor(v: number): string {
  return v >= 14 ? '#22A05E' : v >= 10 ? '#D97706' : '#DC2626';
}

export function PerformancePage({ scope }: { scope: Scope }) {
  const meta = TITLES[scope];

  return (
    <div className="w-full space-y-4">
      <div>
        <h2 className="text-base font-black text-ink">{meta.title}</h2>
        <p className="mt-0.5 text-xs font-semibold text-ink-soft">{meta.subtitle}</p>
      </div>

      {scope === 'classes' && <ClassesView />}
      {scope === 'courses' && <CoursesView />}
      {scope === 'students' && <StudentsView />}
    </div>
  );
}

function ClassesView() {
    const { t } = useTranslation();
  const data = classPerformance();
  return (
    <>
      <ChartCard title={t('moyenne_par_classe')} action={<ExportButton rows={data} filename="perf-classes.csv" />}>
        <BarChartCard data={data as never} xKey="classCode" yKey="average" color="#7B2D9E" />
      </ChartCard>
      <Card>
        <div className="divide-y divide-line-soft">
          {data.map((c) => (
            <div key={c.classCode} className="flex items-center gap-3 py-2.5">
              <Badge tone="brand">{c.classCode}</Badge>
              <div className="flex-1" />
              <span className="text-xs font-semibold text-ink-soft">{t('reussite')}{c.passRate}%</span>
              <span className="text-sm font-black" style={{ color: avgColor(c.average) }}>
                {c.average.toFixed(2)}/20
              </span>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function CoursesView() {
    const { t } = useTranslation();
  const data = coursePerformance();
  return (
    <>
      <ChartCard title={t('moyenne_par_matiere')} action={<ExportButton rows={data} filename="perf-cours.csv" />}>
        <BarChartCard data={data as never} xKey="course" yKey="average" color="#1081F3" />
      </ChartCard>
      <Card>
        <div className="divide-y divide-line-soft">
          {data.map((c) => (
            <div key={c.course} className="flex items-center gap-3 py-2.5">
              <span className="flex-1 text-sm font-bold text-ink">{c.course}</span>
              <span className="text-sm font-black" style={{ color: avgColor(c.average) }}>
                {c.average.toFixed(2)}/20
              </span>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function StudentsView() {
    const { t } = useTranslation();
  const data = studentPerformance();
  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-black text-ink">{t('classement_general')}</h3>
        <ExportButton rows={data} filename="perf-eleves.csv" />
      </div>
      <div className="divide-y divide-line-soft">
        {data.map((s) => (
          <div key={s.name} className="flex items-center gap-3 py-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-canvas text-xs font-black text-ink-soft">
              {s.rank}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-ink">{s.name}</p>
              <p className="text-xs font-semibold text-ink-soft">{s.classCode}</p>
            </div>
            <span className="text-sm font-black" style={{ color: avgColor(s.average) }}>
              {s.average.toFixed(2)}/20
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
