import { useMemo, useState, type CSSProperties } from 'react';
import { windowOf, place, placeAt, type Span } from './lane-scale';

export interface SwimlaneSegment extends Span {
  /** What state this stretch was in. Drives the colour via `colors`. */
  state: string;
  /** Anything the caller wants back on hover or click. */
  meta?: unknown;
}

export interface SwimlaneRow {
  id: string;
  label: string;
  segments: SwimlaneSegment[];
}

export interface SwimlaneMarker {
  at: number;
  label?: string;
  color?: string;
}

export interface SwimlaneChartViewProps {
  rows: SwimlaneRow[];
  /** state → colour. A state with no entry is drawn in the muted default. */
  colors: Record<string, string>;
  /** Vertical marks across every lane — a dump taken, a GC, a deploy. */
  markers?: SwimlaneMarker[];
  rowHeight?: number;
  /** Width of the label gutter. */
  labelWidth?: number;
  /** Clamp the axis instead of deriving it from the data. */
  window?: Span;
  format?: (span: Span) => string;
  onSelect?: (row: SwimlaneRow, segment: SwimlaneSegment) => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * Entities on a shared timeline, coloured by what they were doing.
 *
 * Threads by state, connections by lifetime, pods by phase — the shape is the
 * same whenever the question is "what was each of these doing, and did they do
 * it at the same time". The vertical alignment IS the information: three rows
 * turning red within the same 40ms is a lock, and no table of states will ever
 * show that.
 *
 * Every lane shares one axis, computed across all rows. Scaling lanes
 * independently would put simultaneous events in different columns, which
 * destroys the only thing this chart is for.
 */
export function SwimlaneChartView({
  rows,
  colors,
  markers = [],
  rowHeight = 22,
  labelWidth = 150,
  window: fixedWindow,
  format,
  onSelect,
  className = '',
  style,
}: SwimlaneChartViewProps) {
  const [hover, setHover] = useState<{ row: string; seg: SwimlaneSegment } | null>(null);

  const win = useMemo(() => {
    if (fixedWindow) return fixedWindow;
    return windowOf(rows.flatMap(r => r.segments));
  }, [rows, fixedWindow]);

  if (!win || !rows.length) {
    return (
      <div className={className} style={{ padding: 12, ...style }}>
        <span style={{ fontSize: 11.5, color: 'var(--color-text-muted)' }}>Nothing to show</span>
      </div>
    );
  }

  return (
    <div className={className} style={{ position: 'relative', ...style }}>
      {rows.map(row => (
        <div key={row.id} style={{ display: 'flex', alignItems: 'center', height: rowHeight }}>
          <span
            title={row.label}
            style={{
              width: labelWidth,
              flexShrink: 0,
              paddingRight: 10,
              fontSize: 10.5,
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              color: 'var(--color-text-muted)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textAlign: 'right',
            }}
          >
            {row.label}
          </span>

          <div style={{ position: 'relative', flex: 1, height: rowHeight - 8 }}>
            {row.segments.map((seg, i) => {
              const p = place(seg, win);
              if (!p) return null;
              const on = hover?.row === row.id && hover.seg === seg;
              return (
                <div
                  key={i}
                  title={format ? format(seg) : `${seg.state}`}
                  onMouseEnter={() => setHover({ row: row.id, seg })}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => onSelect?.(row, seg)}
                  style={{
                    position: 'absolute',
                    left: `${p.x * 100}%`,
                    width: `${p.width * 100}%`,
                    top: 0,
                    bottom: 0,
                    background: colors[seg.state] ?? 'var(--color-text-muted)',
                    // Square where the data was cut by the window, rounded
                    // where it genuinely started or stopped — so a clipped
                    // span does not read as a completed one.
                    borderTopLeftRadius: p.clippedStart ? 0 : 3,
                    borderBottomLeftRadius: p.clippedStart ? 0 : 3,
                    borderTopRightRadius: p.clippedEnd ? 0 : 3,
                    borderBottomRightRadius: p.clippedEnd ? 0 : 3,
                    opacity: hover && !on ? 0.55 : 1,
                    cursor: onSelect ? 'pointer' : 'default',
                    transition: 'opacity 120ms',
                  }}
                />
              );
            })}
          </div>
        </div>
      ))}

      {/* Markers last, so they sit over every lane. */}
      {markers.map((m, i) => {
        const x = placeAt(m.at, win);
        if (x === null) return null;
        return (
          <div
            key={i}
            title={m.label}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `calc(${labelWidth}px + (100% - ${labelWidth}px) * ${x})`,
              width: 2,
              background: m.color ?? 'var(--color-text-primary)',
              opacity: 0.5,
              pointerEvents: 'none',
            }}
          />
        );
      })}
    </div>
  );
}
