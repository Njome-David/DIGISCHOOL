import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ReactNode } from 'react';

export function cn(...inputs: (string | undefined | false)[]) {
  return twMerge(clsx(inputs));
}

export function Card({ children, className, title }: { children: ReactNode; className?: string; title?: string }) {
  return (
    <div className={cn('card', className)}>
      {title && <h2 className="mb-4 font-display text-lg font-semibold text-slate-900">{title}</h2>}
      {children}
    </div>
  );
}

export function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }) {
  const styles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-100',
  };
  return (
    <button className={cn(styles[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="input-field" {...props} />;
}

export function Badge({ children, color = 'brand' }: { children: ReactNode; color?: 'brand' | 'green' | 'amber' | 'red' }) {
  const colors = {
    brand: 'bg-brand-50 text-brand-700',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    red: 'bg-red-50 text-red-700',
  };
  return (
    <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', colors[color])}>
      {children}
    </span>
  );
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  keyField,
}: {
  columns: { key: keyof T | string; label: string; render?: (row: T) => ReactNode }[];
  data: T[];
  keyField: keyof T;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-100">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            {columns.map((c) => (
              <th key={String(c.key)} className="px-4 py-3">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-400">
                Aucune donnée
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={String(row[keyField])} className="hover:bg-slate-50/80">
                {columns.map((c) => (
                  <td key={String(c.key)} className="px-4 py-3 text-slate-700">
                    {c.render ? c.render(row) : String(row[c.key as keyof T] ?? '—')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="card flex flex-col gap-1">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="font-display text-3xl font-bold text-brand-700">{value}</p>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
