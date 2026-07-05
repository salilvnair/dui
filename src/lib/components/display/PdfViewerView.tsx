import { useState, type CSSProperties } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../../../icons';

export interface PdfViewerViewProps {
  /** URL to the PDF file — rendered via the browser's native PDF viewer inside an iframe. */
  src: string;
  totalPages?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
}

/** Paginated PDF preview wrapper. Uses the browser's native PDF renderer via an iframe, with an optional page-number affordance when `totalPages` is known. */
export function PdfViewerView({
  src,
  totalPages,
  height = 480,
  className = '',
  style,
}: PdfViewerViewProps) {
  const [page, setPage] = useState(1);
  const pageParam = `#page=${page}`;

  return (
    <div className={className} style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8, overflow: 'hidden', ...style }}>
      <iframe title="PDF preview" src={`${src}${pageParam}`} style={{ width: '100%', height, border: 'none', display: 'block' }} />
      {totalPages !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 8, borderTop: '1px solid var(--color-surface-border)', background: 'var(--color-surface)' }}>
          <button type="button" disabled={page <= 1} onClick={() => setPage(p => p - 1)} style={{ display: 'flex', border: 'none', background: 'transparent', color: 'var(--color-text-secondary)', cursor: page <= 1 ? 'not-allowed' : 'pointer', opacity: page <= 1 ? 0.4 : 1 }}>
            <ChevronLeftIcon size={14} />
          </button>
          <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Page {page} of {totalPages}</span>
          <button type="button" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} style={{ display: 'flex', border: 'none', background: 'transparent', color: 'var(--color-text-secondary)', cursor: page >= totalPages ? 'not-allowed' : 'pointer', opacity: page >= totalPages ? 0.4 : 1 }}>
            <ChevronRightIcon size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
