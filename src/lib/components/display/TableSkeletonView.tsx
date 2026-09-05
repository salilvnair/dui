/**
 * The shape of a table, while the table is on its way.
 *
 * Not a spinner and not a centred block. A spinner says "something is
 * happening"; a centred block says "this panel is empty and here is a badge in
 * the middle of it". Neither is what a list that is about to arrive looks
 * like — and the centred version is actively worse, because the placeholder
 * appears in one place and the rows then appear somewhere else, so the eye is
 * pulled back to a region it had already finished reading.
 *
 * So the rows start at the top, sit on the row height the real table uses, and
 * line up with its columns. Nothing moves when the data lands except the bars
 * turning into text.
 *
 * The count comes from the space available rather than from a guess. A fixed
 * eight rows leaves a short panel scrolling a placeholder and a tall one with
 * a stripe of skeleton over an acre of nothing; measuring means the fill is
 * right at any height, which is the entire reason to prefer this over a
 * hand-placed block.
 */
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

export interface TableSkeletonColumn {
  /**
   * A number is a fixed pixel width; a string is used as-is.
   *
   * `'flex'` takes the remaining space, which is how the name column in a file
   * list behaves — the one column whose width is not known in advance.
   */
  width: number | string | 'flex';
  /** Draw this cell's bar shorter than its column, as real content usually is. */
  fill?: number;
  align?: 'left' | 'right';
}

export interface TableSkeletonViewProps {
  columns: TableSkeletonColumn[];
  /** Height of one row, matching the table this stands in for. */
  rowHeight?: number;
  /** Fixed row count. Omit to fill the available height. */
  rows?: number;
  /** A small square before the first column — a file or status icon. */
  leadingIcon?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Widths that vary, because content does.
 *
 * A column of identical bars reads as a progress meter rather than as a list.
 * The variation is deterministic per row so it does not reshuffle on every
 * render — a placeholder that animates its own layout is worse than one that
 * sits still.
 */
const JITTER = [1, 0.82, 0.93, 0.7, 0.88, 0.76, 1, 0.85];

export function TableSkeletonView({
  columns,
  rowHeight = 22,
  rows,
  leadingIcon,
  className,
  style,
}: TableSkeletonViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [measured, setMeasured] = useState<number | null>(null);

  useEffect(() => {
    if (rows !== undefined) return;
    const el = ref.current;
    if (!el) return;
    const read = () => {
      const h = el.clientHeight;
      // One fewer than fits, so the last row is never a half-row clipped by
      // the container — a cut-off placeholder reads as a rendering fault.
      if (h > 0) setMeasured(Math.max(3, Math.floor(h / rowHeight) - 1));
    };
    read();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [rows, rowHeight]);

  const count = rows ?? measured ?? 6;

  return (
    <div
      ref={ref}
      className={className}
      aria-busy="true"
      aria-label="loading"
      style={{ width: '100%', height: '100%', overflow: 'hidden', ...style }}
    >
      {Array.from({ length: count }, (_, r) => (
        <div key={r} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          height: rowHeight, padding: '0 12px',
        }}>
          {leadingIcon && <Bar w={13} h={13} radius={3} />}
          {columns.map((c, i) => {
            const jitter = JITTER[(r + i) % JITTER.length];
            const pct = (c.fill ?? 0.6) * jitter;
            const flex = c.width === 'flex';
            return (
              <span
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: c.align === 'right' ? 'flex-end' : 'flex-start',
                  ...(flex
                    ? { flex: 1, minWidth: 0 }
                    : { width: c.width, flexShrink: 0 }),
                }}
              >
                <Bar w={flex ? `${Math.round(pct * 100)}%` : `${Math.round(pct * 100)}%`} h={9} />
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Bar({ w, h, radius = 4 }: { w: number | string; h: number; radius?: number }) {
  return (
    <span
      className="animate-pulse"
      style={{
        display: 'block', width: w, height: h, borderRadius: radius,
        background: 'var(--color-loader-track)',
      }}
    />
  );
}
