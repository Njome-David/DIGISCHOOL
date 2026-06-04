import { useRef, useState, type ReactNode } from 'react';
import { Eye, EyeOff, UploadCloud, FileText, X } from 'lucide-react';
import { cn } from '@/shared/components/ui';

/* Labelled field wrapper */
export function Field({
  label,
  hint,
  action,
  children,
}: {
  label: string;
  hint?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-sm font-bold text-ink">{label}</label>
        {action}
      </div>
      {children}
      {hint && <p className="mt-1 text-xs font-semibold text-ink-faint">{hint}</p>}
    </div>
  );
}

/* Password input with show/hide toggle */
export function PasswordInput({
  value,
  onChange,
  placeholder = '',
  autoComplete,
  invalid,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  invalid?: boolean;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={cn('field-input pr-11', invalid && 'border-danger focus:ring-danger/30')}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-ink-faint transition-colors hover:text-ink-soft"
        aria-label={show ? 'Masquer' : 'Afficher'}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

/* Inline alert / callout */
type AlertTone = 'danger' | 'success' | 'info' | 'brand';

const ALERT_TONES: Record<AlertTone, string> = {
  danger: 'bg-danger-bg text-danger border-danger/20',
  success: 'bg-success-bg text-success border-success/20',
  info: 'bg-info-bg text-info border-info/20',
  brand: 'bg-accent text-brand-700 border-brand-300',
};

export function Alert({
  tone = 'danger',
  icon: Icon,
  children,
}: {
  tone?: AlertTone;
  icon?: React.ElementType;
  children: ReactNode;
}) {
  return (
    <div className={cn('flex items-start gap-2 rounded-xl border p-3 text-sm font-semibold', ALERT_TONES[tone])}>
      {Icon && <Icon size={15} className="mt-0.5 shrink-0" />}
      <span>{children}</span>
    </div>
  );
}

/* File upload (mock - ne televerse rien, garde juste le nom du fichier) */
export function UploadField({
  value,
  onChange,
  accept = '.pdf,.docx',
  hint = 'PDF ou DOCX - 10 Mo maximum',
}: {
  value: string | null;
  onChange: (fileName: string | null) => void;
  accept?: string;
  hint?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);

  if (value) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-line bg-field px-4 py-3">
        <span className="flex min-w-0 items-center gap-2">
          <FileText size={16} className="shrink-0 text-brand-500" />
          <span className="truncate text-sm font-bold text-ink">{value}</span>
        </span>
        <button
          type="button"
          onClick={() => onChange(null)}
          className="shrink-0 rounded-lg p-1 text-ink-faint transition-colors hover:bg-white hover:text-danger"
          aria-label="Retirer le fichier"
        >
          <X size={15} />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => ref.current?.click()}
      className="flex w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-line bg-field py-6 transition-colors hover:border-brand-300 hover:bg-brand-50"
    >
      <UploadCloud size={22} className="text-brand-400" />
      <span className="text-sm font-bold text-ink-soft">Cliquer pour televerser un fichier</span>
      <span className="text-xs font-semibold text-ink-faint">{hint}</span>
      <input
        ref={ref}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onChange(f.name);
        }}
      />
    </button>
  );
}
