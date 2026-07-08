import { BookOpen, Download, Trash2 } from 'lucide-react';
import { Badge, Button } from '@/shared/components/ui';
import { FileBadge } from './FileBadge';
import { specialtyColor, type Book } from '../mockData';
import { useTranslation } from "react-i18next";

export function BookCard({ book, onRemove }: { book: Book; onRemove?: (id: string) => void }) {
    const { t } = useTranslation();
  const color = specialtyColor(book.specialty);
  return (
    <div className="surface flex flex-col p-4">
      <div className="mb-3 flex h-24 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}14` }}>
        <BookOpen size={32} style={{ color }} />
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge tone="neutral">{book.level}</Badge>
        <span className="rounded-full px-2 py-0.5 text-xs font-bold text-white" style={{ backgroundColor: color }}>
          {book.specialty}
        </span>
      </div>
      <h3 className="mt-2 line-clamp-2 text-sm font-black text-ink">{book.title}</h3>
      <p className="mt-0.5 text-xs font-semibold text-ink-soft">{book.author}</p>
      <div className="mt-2">
        <FileBadge fileName={book.fileName} fileSize={book.fileSize} />
      </div>
      <div className="mt-3 flex gap-2">
        <Button variant="outline" className="flex-1">
          <Download size={14} /> {t('telecharger')}</Button>
        {onRemove && (
          <Button variant="outline" onClick={() => onRemove(book.id)} aria-label="Supprimer">
            <Trash2 size={14} className="text-danger" />
          </Button>
        )}
      </div>
    </div>
  );
}
