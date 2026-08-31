import { useMemo, useState, type CSSProperties } from 'react';
import { flameLayout, totalOf, type HierarchyNode, type FlameCell } from './hierarchy-layout';

export interface FlameGraphViewProps {
  root: HierarchyNode;
  width?: number;
  /** Height of one row. */
  rowHeight?: number;
  maxDepth?: number;
  /** Cells narrower than this fraction of the width are not drawn. */
  minWidth?: number;
  accentColor?: string;
  format?: (value: number) => string;
  /** Click a frame to make it the new root. */
  onZoom?: (cell: FlameCell) => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * Merged stacks, as stacked bars.
 *
 * The standard way to read a profile: width is how much of the sample a frame
 * accounts for, and a frame sits on top of its caller. A wide plateau near the
 * top is where the time or the memory actually is; a tall narrow spire is deep
 * but cheap, and the eye can tell those apart instantly in a way it cannot
 * from a call tree.
 *
 * Drawn as DOM rather than canvas so a frame can carry a title, be clicked and
 * be found by the browser's own search. A merged thread dump is hundreds of
 * cells, not the hundreds of thousands a CPU profile produces, and that is
 * comfortably inside what the DOM handles.
 */
export function FlameGraphView({
  root,
  width = 720,
  rowHeight = 18,
  maxDepth = 24,
  minWidth = 0.0015,
  accentColor,
  format = (v) => String(Math.round(v)),
  onZoom,
  className = '',
  style,
}: FlameGraphViewProps) {
  const [hover, setHover] = useState<FlameCell | null>(null);

  const cells = useMemo(
    () => flameLayout(root, { maxDepth, minWidth }),
    [root, maxDepth, minWidth],
  );
  const total = useMemo(() => totalOf(root), [root]);

  const depth = cells.length ? Math.max(...cells.map(c => c.depth)) : 0;
  const height = (depth + 1) * rowHeight;

  /*
    Warm hues, varied by name rather than by position.

    A flame graph is read by shape, so colour carries no ordering — but the
    same frame must keep the same colour between renders or a re-layout looks
    like the profile changed. Hashing the name gives that for free.
  */
  const hue = (name: string) => {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
    return 12 + (Math.abs(h) % 46);
  };

  if (!cells.length) {
    return (
      <div className={className} style={{ padding: 12, ...style }}>
        <span style={{ fontSize: 11.5, color: 'var(--color-text-muted)' }}>Nothing to show</span>
      </div>
    );
  }

  return (
    <div className={className} style={{ ...style }}>
      <div style={{ position: 'relative', width, height, fontSize: 10 }}>
        {cells.map((c, i) => {
          const w = c.width * width;
          const on = hover === c;
          return (
            <div
              key={`${c.depth}-${c.x}-${i}`}
              title={`${c.name} — ${format(c.value)} (${(c.width * 100).toFixed(1)}%)`}
              onMouseEnter={() => setHover(c)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onZoom?.(c)}
              style={{
                position: 'absolute',
                left: c.x * width,
                // Grows upward: the base is the bottom, which is the
                // orientation every profiler uses and the one that makes a
                // plateau read as a plateau.
                bottom: c.depth * rowHeight,
                width: Math.max(1, w - 1),
                height: rowHeight - 1,
                background: c.depth === 0 && accentColor
                  ? accentColor
                  : `hsl(${hue(c.name)} 72% ${on ? 62 : 52}%)`,
                borderRadius: 2,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                padding: '0 4px',
                lineHeight: `${rowHeight - 1}px`,
                color: '#fff',
                cursor: onZoom ? 'pointer' : 'default',
                boxSizing: 'border-box',
                transition: 'background 100ms',
              }}
            >
              {/* Only label what can hold a label. Text clipped to two
                  characters is noise that makes the shape harder to read. */}
              {w > 42 ? c.name : ''}
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 6, fontSize: 11, minHeight: 16,
        color: 'var(--color-text-muted)',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {hover
          ? `${hover.name} — ${format(hover.value)} of ${format(total)} (${(hover.width * 100).toFixed(1)}%)`
          : `${cells.length} frames, ${depth + 1} deep`}
      </div>
    </div>
  );
}
