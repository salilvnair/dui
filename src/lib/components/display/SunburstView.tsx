import { useMemo, useState, type CSSProperties } from 'react';
import {
  sunburstLayout, arcPath, totalOf,
  type HierarchyNode, type SunburstSlice,
} from './hierarchy-layout';

export interface SunburstViewProps {
  root: HierarchyNode;
  size?: number;
  /** Rings drawn outward from the centre. */
  maxDepth?: number;
  /** Slices thinner than this share of the whole are dropped. */
  minShare?: number;
  accentColor?: string;
  /** Format the value for the centre label and tooltips. */
  format?: (value: number) => string;
  /** Shown in the hole when nothing is hovered. */
  centerLabel?: string;
  onSelect?: (slice: SunburstSlice) => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * A hierarchy as concentric rings.
 *
 * The profiler's idiom for "what is big and what is inside it": each ring is a
 * level, each slice is sized by its share, and a child sits inside the arc of
 * its parent. Reading outward from the centre follows containment, which is
 * what a treemap makes you infer from adjacency instead.
 *
 * Hue is derived from depth and position rather than from a palette, so a
 * hierarchy of any width gets distinguishable neighbours without the caller
 * supplying colours. Lightness falls with depth, which is what makes the
 * nesting legible at a glance — outer rings recede.
 */
export function SunburstView({
  root,
  size = 260,
  maxDepth = 4,
  minShare = 0.004,
  accentColor,
  format = (v) => String(Math.round(v)),
  centerLabel,
  onSelect,
  className = '',
  style,
}: SunburstViewProps) {
  const [hover, setHover] = useState<SunburstSlice | null>(null);

  const slices = useMemo(
    () => sunburstLayout(root, { maxDepth, minShare }),
    [root, maxDepth, minShare],
  );
  const total = useMemo(() => totalOf(root), [root]);

  const cx = size / 2;
  const cy = size / 2;
  // The hole is a third of the radius: enough to hold a total without the
  // first ring becoming a thin band.
  const rHole = size * 0.17;
  const rings = Math.max(1, maxDepth);
  const ringWidth = (size / 2 - rHole - 2) / rings;

  const hue = (s: SunburstSlice) => {
    // Position around the circle drives hue so neighbours differ; depth drives
    // lightness so the nesting reads without a legend.
    const h = Math.round(((s.startAngle + s.endAngle) / 2 / (Math.PI * 2)) * 320);
    const l = 62 - (s.depth - 1) * 7;
    return `hsl(${h} 58% ${Math.max(30, l)}%)`;
  };

  if (!slices.length) {
    return (
      <div className={className}
           style={{ width: size, height: size, display: 'grid', placeItems: 'center', ...style }}>
        <span style={{ fontSize: 11.5, color: 'var(--color-text-muted)' }}>Nothing to show</span>
      </div>
    );
  }

  const shown = hover;

  return (
    <div className={className} style={{ position: 'relative', width: size, height: size, ...style }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
           role="img"
           aria-label={`${slices.length} segments, ${format(total)} in total`}>
        {slices.map((s, i) => {
          const rInner = rHole + (s.depth - 1) * ringWidth;
          const rOuter = rInner + ringWidth - 1;
          const on = shown === s;
          return (
            <path
              key={i}
              d={arcPath(cx, cy, rInner, rOuter, s.startAngle, s.endAngle)}
              fill={accentColor && s.depth === 1 ? accentColor : hue(s)}
              opacity={shown && !on ? 0.35 : 1}
              stroke="var(--color-surface, #fff)"
              strokeWidth={0.5}
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

      {/*
        The centre carries whatever is hovered, and the total when nothing is.
        A tooltip that follows the cursor over a dense ring covers the slices
        either side of the one being read.
      */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', textAlign: 'center', padding: '0 12%',
      }}>
        <span style={{
          fontSize: 12.5, fontWeight: 600, color: 'var(--color-text-primary)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          maxWidth: '100%',
        }}>
          {shown ? shown.name.split('.').pop() : centerLabel ?? 'total'}
        </span>
        <span style={{ fontSize: 11, color: 'var(--color-text-muted)', fontVariantNumeric: 'tabular-nums' }}>
          {shown ? `${format(shown.value)} · ${(shown.share * 100).toFixed(1)}%` : format(total)}
        </span>
      </div>
    </div>
  );
}
