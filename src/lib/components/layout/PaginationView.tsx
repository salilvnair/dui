import type { DuiSize } from '../../core/DuiTypes';
import { useNavBase } from '../../core/NavBase';
import { ChevronLeftIcon, ChevronRightIcon } from '../../../icons';

export interface PaginationViewProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  /** Sibling pages shown on each side of the current page. Default 1. */
  siblingCount?: number;
  size?: DuiSize;
  color?: string;
  className?: string;
}

function buildRange(page: number, totalPages: number, siblingCount: number): (number | 'ellipsis')[] {
  const totalSlots = siblingCount * 2 + 5;
  if (totalPages <= totalSlots) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const left = Math.max(page - siblingCount, 2);
  const right = Math.min(page + siblingCount, totalPages - 1);
  const range: (number | 'ellipsis')[] = [1];
  if (left > 2) range.push('ellipsis');
  for (let i = left; i <= right; i++) range.push(i);
  if (right < totalPages - 1) range.push('ellipsis');
  range.push(totalPages);
  return range;
}

export function PaginationView({
  page,
  totalPages,
  onChange,
  siblingCount = 1,
  size,
  color,
  className = '',
}: PaginationViewProps) {
  const base = useNavBase(size, { activeColor: color });
  const accent = base.activeColor ?? 'var(--color-primary)';
  const range = buildRange(page, totalPages, siblingCount);
  const btnSize = parseInt(base.itemHeight, 10) * 0.82;

  const btnStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: btnSize, height: btnSize, minWidth: btnSize, borderRadius: base.borderRadius,
    border: 'none', background: active ? accent : 'transparent',
    color: active ? 'var(--color-btn-primary-text, #fff)' : 'var(--color-text-secondary)',
    fontSize: base.fontSize, fontWeight: active ? 700 : 500, cursor: 'pointer',
  });

  return (
    <nav className={className} style={{ display: 'flex', alignItems: 'center', gap: 2 }} aria-label="Pagination">
      <button type="button" disabled={page <= 1} onClick={() => onChange(page - 1)} style={{ ...btnStyle(false), opacity: page <= 1 ? 0.35 : 1, cursor: page <= 1 ? 'not-allowed' : 'pointer' }} aria-label="Previous page">
        <ChevronLeftIcon size={base.iconSize} />
      </button>
      {range.map((p, i) => p === 'ellipsis'
        ? <span key={`e${i}`} style={{ width: btnSize, textAlign: 'center', color: 'var(--color-text-muted)', fontSize: base.fontSize }}>…</span>
        : <button key={p} type="button" onClick={() => onChange(p)} style={btnStyle(p === page)}>{p}</button>
      )}
      <button type="button" disabled={page >= totalPages} onClick={() => onChange(page + 1)} style={{ ...btnStyle(false), opacity: page >= totalPages ? 0.35 : 1, cursor: page >= totalPages ? 'not-allowed' : 'pointer' }} aria-label="Next page">
        <ChevronRightIcon size={base.iconSize} />
      </button>
    </nav>
  );
}
