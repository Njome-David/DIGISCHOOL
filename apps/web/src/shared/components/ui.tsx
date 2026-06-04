import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { forwardRef, useState, type ReactNode } from 'react';
import { Search } from 'lucide-react';
import { initials as toInitials } from '@/shared/lib/roleMeta';
import { portraitUrl } from '@/shared/lib/photos';

export function cn(...inputs: (string | undefined | false | null)[]) {
  return twMerge(clsx(inputs));
}

/* Surface card */
export function Card({
  children,
  className,
  as: As = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section';
}) {
  return <As className={cn('surface p-5', className)}>{children}</As>;
}

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn('text-sm font-extrabold text-ink', className)}>{children}</h3>;
}

/* Spinner */
export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white',
        className
      )}
      role="status"
      aria-label="Chargement"
    />
  );
}

/* Button */
type ButtonVariant = 'brand' | 'outline' | 'ghost' | 'success' | 'danger';

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  brand: 'btn-brand',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  success:
    'inline-flex items-center justify-center gap-2 rounded-xl bg-success px-5 py-2.5 text-sm font-extrabold text-white transition-all duration-200 ease-spring hover:opacity-90 active:scale-[0.98] disabled:opacity-60',
  danger:
    'inline-flex items-center justify-center gap-2 rounded-xl bg-danger px-5 py-2.5 text-sm font-extrabold text-white transition-all duration-200 ease-spring hover:opacity-90 active:scale-[0.98] disabled:opacity-60',
};

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; loading?: boolean }
>(function Button({ children, variant = 'brand', loading, disabled, className, ...props }, ref) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(BUTTON_VARIANTS[variant], className)}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
});

/* Avatar - affiche une photo (Unsplash) par defaut, avec repli sur les initiales */
export function Avatar({
  name,
  color = '#AD56C4',
  size = 36,
  className,
  src,
  seed,
  initialsOnly = false,
}: {
  name: string;
  color?: string;
  size?: number;
  className?: string;
  /** URL explicite. Si absent, une photo est derivee de seed/name. */
  src?: string;
  /** Graine stable (ex. matricule). Par defaut le nom. */
  seed?: string;
  /** Forcer l'affichage des initiales (entites non personnelles). */
  initialsOnly?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const photo = initialsOnly ? undefined : src ?? portraitUrl(seed ?? name, Math.round(size * 2));
  const showPhoto = photo && !failed;

  return (
    <span
      className={cn('relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-black text-white', className)}
      style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.34 }}
    >
      {showPhoto ? (
        <img
          src={photo}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        toInitials(name)
      )}
    </span>
  );
}

/* Badge */
type BadgeTone = 'brand' | 'success' | 'info' | 'warning' | 'danger' | 'neutral';

const BADGE_TONES: Record<BadgeTone, string> = {
  brand: 'bg-accent text-brand-700',
  success: 'bg-success-bg text-success',
  info: 'bg-info-bg text-info',
  warning: 'bg-warning-bg text-warning',
  danger: 'bg-danger-bg text-danger',
  neutral: 'bg-line-soft text-ink-soft',
};

export function Badge({
  children,
  tone = 'brand',
  className,
  style,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold',
        !style && BADGE_TONES[tone],
        className
      )}
      style={style}
    >
      {children}
    </span>
  );
}

/* Empty state */
export function EmptyState({ icon: Icon, message }: { icon: React.ElementType; message: string }) {
  return (
    <div className="p-8 text-center">
      <Icon size={30} className="mx-auto mb-3 text-brand-200" />
      <p className="text-sm font-semibold text-ink-soft">{message}</p>
    </div>
  );
}

/* Search input */
export function SearchInput({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn('relative flex-1', className)}>
      <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="field-search"
      />
    </div>
  );
}

/* Filter tabs (pill toggle group) */
export interface FilterOption<T extends string> {
  value: T;
  label: ReactNode;
  /** Couleur active personnalisee (sinon brand). */
  activeColor?: string;
}

export function FilterTabs<T extends string>({
  value,
  onChange,
  options,
  className,
}: {
  value: T;
  onChange: (v: T) => void;
  options: FilterOption<T>[];
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap gap-1 rounded-xl bg-muted p-1', className)}>
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-bold transition-all',
              active ? 'text-white shadow-sm' : 'text-ink-soft hover:text-ink'
            )}
            style={active ? { backgroundColor: opt.activeColor ?? '#AD56C4' } : undefined}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/* Progress bar */
export function ProgressBar({
  value,
  color = '#AD56C4',
  className,
}: {
  value: number;
  color?: string;
  className?: string;
}) {
  return (
    <div className={cn('h-2 overflow-hidden rounded-full bg-muted', className)}>
      <div
        className="h-full rounded-full transition-all duration-500 ease-spring"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: color }}
      />
    </div>
  );
}

/* Page heading */
export function PageHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-base font-black text-ink">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs font-semibold text-ink-soft">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/* KPI card */
export function KpiCard({
  icon: Icon,
  color,
  bg,
  value,
  label,
  sub,
}: {
  icon: React.ElementType;
  color: string;
  bg: string;
  value: ReactNode;
  label: string;
  sub?: string;
}) {
  return (
    <div className="surface p-4">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: bg, color }}>
        <Icon size={20} />
      </div>
      <p className="text-xl font-black text-ink">{value}</p>
      <p className="mt-0.5 text-xs font-bold text-ink">{label}</p>
      {sub && <p className="mt-0.5 text-xs font-semibold text-ink-soft">{sub}</p>}
    </div>
  );
}
