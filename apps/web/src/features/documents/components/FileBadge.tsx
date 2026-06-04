import { FileText } from 'lucide-react';
import { formatFileSize } from '@/shared/lib/format';

export function FileBadge({ fileName, fileSize }: { fileName: string; fileSize: number }) {
  const ext = fileName.split('.').pop()?.toUpperCase() ?? 'PDF';
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-faint">
      <FileText size={13} className="text-brand-400" />
      {ext} - {formatFileSize(fileSize)}
    </span>
  );
}
