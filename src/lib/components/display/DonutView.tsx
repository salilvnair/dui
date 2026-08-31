import { useMemo, useState, type CSSProperties } from 'react';
import { donutLayout, arcPath, type DonutSlice } from './hierarchy-layout';

export interface DonutViewProps {
  items: { name: string; value: number; color?: string; meta?: unknown }[];
  size?: number;
  /** Ring thickness as a fraction of the radius. */
  thickness?: number;
  /** Slices past this are rolled into one named remainder. */
  maxSlices?: number;
  accentColor?: string;
  format?: (value: number) => string;
  /** Draw the name/value list beside the ring. */
  legend?: boolean;
  centerLabel?: string;
  onSelect?: (slice: DonutSlice) => void;
  className?: string;
  style?: CSSProperties;
}

const FALLBACK = [
  'var(--color-primary)',
  'var(--color-success)',
  'var(--color-warning)',
  'var(--color-error)',
  'var(--color-info, #6aa9ff)',
  'var(--color-secondary, #9a7cf5)',
];

/**
 * One level of a whole, as a ring.
 *
 * For the case a sunburst over-serves: a flat breakdown where the question is
 * "how much of this is that", not "what is inside it". A leak report opens on
 * one of these because the first thing worth knowing is whether the heap has
 * one owner or fifty.
 *
 * The tail is rolled into a named remainder rather than dropped — see
 * donutLayout. A gap in a chart that claims to be a whole reads as a bug.
 */
export function DonutView({
  items,
  size = 180,
  thickness = 0.34,
  maxSlices = 8,
  accentColor,
  format = (v) => String(Math.round(v)),
  legend = true,
  centerLabel,
  onSelect,
  className = '',
  style,
}: DonutViewProps) {
  const [hover, setHover] = useState<DonutSlice | null>(null);

  const slices = useMemo(() => donutLayout(items, { maxSlices }), [items, maxSlices]);
  const total = useMemo(() => slices.reduce((t, s) => t + s.value, 0), [slices]);

  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size / 2 - 1;
  const rInner = rOuter * (1 - thickness);

  const colorAt = (s: DonutSlice, i: number) => {
    const given = items.find(it => it.name === s.name)?.color;
    if (given) return given;
    if (i === 0 && accentColor) return accentColor;
    // The rolled-up remainder is deliberately grey: it is not a category and
    // colouring it like one invites the reader to look for it in the legend.
    if (s.name === 'other') return 'var(--color-text-muted)';
    return FALLBACK[i % FALLBACK.length];
  };

  if (!slices.length) {
    return (
      <div className={className}
           style={{ width: size, height: size, display: 'grid', placeItems: 'center', ...style }}>
        <span style={{ fontSize: 11.5, color: 'var(--color-text-muted)' }}>Nothing to show</span>
      </div>
    );
  }

  return (
    <div className={className}
         style={{ display: 'flex', alignItems: 'center', gap: 16, ...style }}>
      <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
             role="img" aria-label={`${slices.length} slices, ${format(total)} in total`}>
          {slices.map((s, i) => {
            const on = hover === s;
            return (
              <path
                key={s.name + i}
                d={arcPath(cx, cy, rInner, rOuter, s.startAngle, s.endAngle)}
                fill={colorAt(s, i)}
                opacity={hover && !on ? 0.35 : 1}
                stroke="var(--color-surface, #fff)"
                strokeWidth={1}
                style={{ cursor: onSelect ? 'pointer' : 'default', transition: 'opacity 120ms' }}
                onMouseEnter={() => setHover(s)}
                onMouseLeave={() => setHover(null)}
                onClick={() => onSelect?.(s)}
              >
                <title>{`${s.name} — ${format(s.value)} (${(s.share * 100).toFixed(1)}%)`}</title>
              </path>
            );
          })}
        </svg>

        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', textAlign: 'center', padding: '0 14%',
        }}>
          <span style={{
            fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%',
          }}>
            {hover ? `${(hover.share * 100).toFixed(1)}%` : centerLabel ?? format(total)}
          </span>
          {hover && (
            <span style={{
              fontSize: 10, color: 'var(--color-text-muted)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%',
            }}>
              {hover.name.split('.').pop()}
            </span>
          )}
        </div>
      </div>

      {legend && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
          {slices.map((s, i) => (
            <div
              key={s.name + i}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onSelect?.(s)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7, minWidth: 0,
                opacity: hover && hover !== s ? 0.5 : 1,
                cursor: onSelect ? 'pointer' : 'default',
                transition: 'opacity 120ms',
              }}
            >
              <span style={{
                width: 8, height: 8, borderRadius: 2, flexShrink: 0,
                background: colorAt(s, i),
              }} />
              <span style={{
                fontSize: 11.5, color: 'var(--color-text-primary)',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }} title={s.name}>
                {s.name}
              </span>
              <span style={{
                fontSize: 11, color: 'var(--color-text-muted)', marginLeft: 'auto',
                flexShrink: 0, fontVariantNumeric: 'tabular-nums',
              }}>
                {(s.share * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
