import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from './ui';

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} role="presentation" />
      <div className={cn('relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-elevated', className)}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-slate-900">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-1 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
