import { useMemo, type CSSProperties } from 'react';
import { windowOf, polyline, pathFor, areaFor, placeAt, type Span } from './lane-scale';

export interface LaneSeries {
  id: string;
  label: string;
  points: { at: number; value: number }[];
  color?: string;
  /** Fill under the line. Off for a series read as a level rather than a volume. */
  filled?: boolean;
  /** Right-hand readout — usually the latest or peak value, already formatted. */
  readout?: string;
  /** Draw as ticks rising from the baseline instead of a line: events, not a level. */
  kind?: 'line' | 'ticks';
}

export interface LaneMarker {
  at: number;
  label?: string;
  color?: string;
}

export interface LaneChartViewProps {
  series: LaneSeries[];
  markers?: LaneMarker[];
  laneHeight?: number;
  /** Clamp the axis instead of deriving it from the data. */
  window?: Span;
  className?: string;
  style?: CSSProperties;
}

/**
 * Several measurements over one time axis.
 *
 * Telemetry read as a stack of lanes rather than one chart with many lines:
 * heap in megabytes and CPU in percent share no y scale, and overlaying them
 * forces either two axes or a normalisation that makes both meaningless.
 * Separate lanes keep each series in its own units and still let the eye run
 * a vertical line down the stack, which is the actual question — what else was
 * happening when this happened.
 *
 * The axis is shared and computed across every series, for the same reason the
 * swimlane's is: lanes scaled independently put simultaneous events in
 * different columns.
 */
export function LaneChartView({
  series,
  markers = [],
  laneHeight = 64,
  window: fixedWindow,
  className = '',
  style,
}: LaneChartViewProps) {
  const win = useMemo(() => {
    if (fixedWindow) return fixedWindow;
    const spans = series.flatMap(s =>
      s.points.length ? [{ from: s.points[0].at, to: s.points[s.points.length - 1].at }] : []);
    return windowOf(spans);
  }, [series, fixedWindow]);

  if (!win || !series.length) {
    return (
      <div className={className} style={{ padding: 12, ...style }}>
        <span style={{ fontSize: 11.5, color: 'var(--color-text-muted)' }}>Nothing recorded</span>
      </div>
    );
  }

  const W = 1000;   // viewBox units; the SVG scales to its container

  return (
    <div className={className} style={{ position: 'relative', ...style }}>
      {series.map(s => {
        const colour = s.color ?? 'var(--color-primary)';
        const pts = polyline(s.points, win);
        const h = laneHeight - 22;

        return (
          <div key={s.id} style={{ marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2 }}>
              <span style={{
                fontSize: 9.5,
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              }}>
                {s.label}
              </span>
              <div style={{ flex: 1 }} />
              {s.readout && (
                <span style={{
                  fontSize: 10,
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-mono, ui-monospace, monospace)',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {s.readout}
                </span>
              )}
            </div>

            <svg
              viewBox={`0 0 ${W} ${h}`}
              preserveAspectRatio="none"
              style={{ display: 'block', width: '100%', height: h }}
              role="img"
              aria-label={`${s.label}${s.readout ? `, ${s.readout}` : ''}`}
            >
              {s.kind === 'ticks'
                ? /*
                     Events, drawn from the baseline up. A line through
                     discrete events implies a value between them, and there
                     isn't one — a GC pause does not interpolate.
                   */
                  pts.map((p, i) => (
                    <rect
                      key={i}
                      x={p.x * W - 1.5}
                      y={p.y * h}
                      width={3}
                      height={h - p.y * h}
                      rx={1}
                      fill={colour}
                    />
                  ))
                : (
                  <>
                    {s.filled !== false && (
                      <path d={areaFor(pts, W, h)} fill={colour} opacity={0.14} />
                    )}
                    <path
                      d={pathFor(pts, W, h)}
                      fill="none"
                      stroke={colour}
                      strokeWidth={1.6}
                      vectorEffect="non-scaling-stroke"
                    />
                  </>
                )}
            </svg>
          </div>
        );
      })}

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
              left: `${x * 100}%`,
              width: 2,
              background: m.color ?? 'var(--color-error)',
              opacity: 0.5,
              pointerEvents: 'none',
            }}
          />
        );
      })}
    </div>
  );
}
