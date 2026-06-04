import { type ReactNode } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Download } from 'lucide-react';
import { Button } from '@/shared/components/ui';
import { CHART_COLORS } from '../mockData';

export function ChartCard({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="surface p-4">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-black text-ink">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs font-semibold text-ink-soft">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

const AXIS = { fontSize: 11, fontWeight: 700, fill: '#8B7CA0' };
const tooltipStyle = {
  borderRadius: 12,
  border: '1px solid #EDE5F8',
  fontSize: 12,
  fontWeight: 700,
  boxShadow: '0 8px 24px rgba(80,40,120,0.12)',
};

export function BarChartCard({
  data,
  xKey,
  yKey,
  color = '#AD56C4',
  height = 220,
  formatter,
}: {
  data: Record<string, string | number>[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
  formatter?: (v: number) => string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F0EAF8" vertical={false} />
        <XAxis dataKey={xKey} tick={AXIS} axisLine={false} tickLine={false} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number | string) => (formatter ? formatter(Number(v)) : v)} />
        <Bar dataKey={yKey} fill={color} radius={[6, 6, 0, 0]} maxBarSize={42} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LineChartCard({
  data,
  xKey,
  yKey,
  color = '#7B2D9E',
  height = 220,
  formatter,
}: {
  data: Record<string, string | number>[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
  formatter?: (v: number) => string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F0EAF8" vertical={false} />
        <XAxis dataKey={xKey} tick={AXIS} axisLine={false} tickLine={false} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number | string) => (formatter ? formatter(Number(v)) : v)} />
        <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={3} dot={{ r: 3, fill: color }} activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function DonutChartCard({
  data,
  height = 220,
  formatter,
}: {
  data: { name: string; value: number }[];
  height?: number;
  formatter?: (v: number) => string;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="85%" paddingAngle={2}>
            {data.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={(v: number | string) => (formatter ? formatter(Number(v)) : v)} />
        </PieChart>
      </ResponsiveContainer>
      <div className="w-full shrink-0 space-y-1.5 sm:w-44">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-xs font-bold text-ink-soft">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
              {d.name}
            </span>
            <span className="text-xs font-black text-ink">
              {total ? Math.round((d.value / total) * 100) : 0}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Bouton d'export (mock) : genere un CSV telechargeable cote client. */
export function ExportButton({
  rows,
  filename,
  label = 'Exporter CSV',
}: {
  rows: Record<string, string | number>[];
  filename: string;
  label?: string;
}) {
  const handleExport = () => {
    if (rows.length === 0) return;
    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(','),
      ...rows.map((r) => headers.map((h) => `"${String(r[h]).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="outline" onClick={handleExport}>
      <Download size={14} /> {label}
    </Button>
  );
}
