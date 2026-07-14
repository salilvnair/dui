export type LoaderVariant = 'spinner' | 'dots' | 'skeleton' | 'pulse' | 'progress-bar';
export type LoaderSize = 'sm' | 'md' | 'lg';

export interface LoaderViewProps {
  variant?: LoaderVariant;
  size?: LoaderSize;
  accentColor?: string;
  label?: string;
  fullscreen?: boolean;
  progress?: number; // 0–100 for progress-bar only
  /** skeleton only: renders a single placeholder bar of this exact size
   * instead of the default 3-line paragraph shape — for mimicking a
   * specific piece of UI (a stat number, a table cell, a title). */
  width?: number | string;
  height?: number | string;
  /** skeleton only: 'rect' (default) is the bar/paragraph shape above.
   * 'circle' with an explicit width/height renders one pulsing circle
   * that size; with no size given (the common full-area loading-overlay
   * case) it scatters a handful of varying-size pulsing circles instead —
   * reads as loading *nodes*, a natural fit for graph/network canvases. */
  shape?: 'rect' | 'circle';
  className?: string;
}

const SPINNER_SIZE: Record<LoaderSize, number> = { sm: 16, md: 24, lg: 36 };
const LABEL_SIZE: Record<LoaderSize, string> = { sm: '10px', md: '11px', lg: '12px' };

function Spinner({ size, accent }: { size: LoaderSize; accent: string }) {
  const s = SPINNER_SIZE[size];
  return (
    <span
      className="animate-spin"
      style={{
        display: 'inline-block',
        width: s,
        height: s,
        borderRadius: '50%',
        border: `2px solid color-mix(in srgb, ${accent} 20%, transparent)`,
        borderTopColor: accent,
        flexShrink: 0,
      }}
    />
  );
}

function Dots({ size, accent }: { size: LoaderSize; accent: string }) {
  const d = size === 'sm' ? 6 : size === 'md' ? 8 : 10;
  return (
    <div style={{ display: 'flex', gap: d / 2, alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="animate-bounce"
          style={{
            display: 'inline-block',
            width: d,
            height: d,
            borderRadius: '50%',
            background: accent,
            animationDelay: `${i * 120}ms`,
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}

// Scattered pulsing circles (percentage-positioned, staggered animation
// delays) — reads as loading *nodes* rather than a generic placeholder,
// the natural "round skeleton" shape for a graph/network canvas that has
// no single obvious rect to mimic ahead of time.
const NODE_SKELETON_LAYOUT: { x: number; y: number; d: number; delay: number }[] = [
  { x: 50, y: 42, d: 22, delay: 0 },
  { x: 32, y: 58, d: 14, delay: 90 },
  { x: 68, y: 60, d: 16, delay: 180 },
  { x: 40, y: 28, d: 10, delay: 270 },
  { x: 62, y: 32, d: 12, delay: 360 },
  { x: 50, y: 70, d: 9, delay: 450 },
];

function CircleSkeleton({ width, height }: { width?: number | string; height?: number | string }) {
  if (width !== undefined || height !== undefined) {
    const d = width ?? height;
    return (
      <span
        className="animate-pulse"
        style={{
          display: 'block',
          width: d,
          height: height ?? d,
          borderRadius: '50%',
          background: 'var(--color-loader-track)',
        }}
      />
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 120 }}>
      {NODE_SKELETON_LAYOUT.map((n, i) => (
        <span
          key={i}
          className="animate-pulse"
          style={{
            position: 'absolute',
            left: `${n.x}%`,
            top: `${n.y}%`,
            width: n.d,
            height: n.d,
            marginLeft: -n.d / 2,
            marginTop: -n.d / 2,
            borderRadius: '50%',
            background: 'var(--color-loader-track)',
            animationDelay: `${n.delay}ms`,
          }}
        />
      ))}
    </div>
  );
}

function Skeleton({ size, width, height, shape = 'rect' }: { size: LoaderSize; width?: number | string; height?: number | string; shape?: 'rect' | 'circle' }) {
  if (shape === 'circle') return <CircleSkeleton width={width} height={height} />;

  if (width !== undefined || height !== undefined) {
    return (
      <span
        className="animate-pulse"
        style={{
          display: 'block',
          height: height ?? (size === 'sm' ? 10 : size === 'md' ? 12 : 14),
          width: width ?? '100%',
          borderRadius: 4,
          background: 'var(--color-loader-track)',
        }}
      />
    );
  }

  const heights = size === 'sm' ? [10, 10, 6] : size === 'md' ? [12, 12, 8] : [14, 14, 10];
  const widths = ['100%', '80%', '60%'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: heights[0] * 0.75, width: '100%' }}>
      {heights.map((h, i) => (
        <span
          key={i}
          className="animate-pulse"
          style={{
            display: 'block',
            height: h,
            width: widths[i],
            borderRadius: 4,
            background: 'var(--color-loader-track)',
          }}
        />
      ))}
    </div>
  );
}

function Pulse({ size, accent }: { size: LoaderSize; accent: string }) {
  const s = SPINNER_SIZE[size];
  return (
    <span
      className="animate-pulse"
      style={{
        display: 'inline-block',
        width: s,
        height: s,
        borderRadius: '50%',
        background: `color-mix(in srgb, ${accent} 40%, transparent)`,
        flexShrink: 0,
      }}
    />
  );
}

function ProgressBar({ size, accent, progress = 0 }: { size: LoaderSize; accent: string; progress?: number }) {
  const h = size === 'sm' ? 3 : size === 'md' ? 4 : 6;
  const pct = Math.max(0, Math.min(100, progress));
  return (
    <div style={{
      width: '100%',
      height: h,
      borderRadius: 999,
      background: `color-mix(in srgb, ${accent} 15%, transparent)`,
      overflow: 'hidden',
    }}>
      <div style={{
        height: '100%',
        width: `${pct}%`,
        borderRadius: 999,
        background: accent,
        transition: 'width 300ms ease',
      }} />
    </div>
  );
}

export function LoaderView({
  variant = 'spinner',
  size = 'md',
  accentColor,
  label,
  fullscreen = false,
  progress,
  width,
  height,
  shape = 'rect',
  className = '',
}: LoaderViewProps) {
  const accent = accentColor || 'var(--color-loader-accent)';
  // Scattered-circles mode (skeleton + circle, no explicit width/height) has
  // no single shape to size the wrapper by — it needs to fill whatever
  // space the caller's own className/layout gives it instead.
  const isNodeCluster = variant === 'skeleton' && shape === 'circle' && width === undefined && height === undefined;

  const inner = (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: variant === 'progress-bar' ? 'column' : 'row',
        alignItems: 'center',
        gap: '8px',
        width: width ?? (variant === 'skeleton' || variant === 'progress-bar' ? '100%' : 'auto'),
        height: variant === 'skeleton' ? (height ?? (isNodeCluster ? '100%' : undefined)) : undefined,
      }}
    >
      {variant === 'spinner'      && <Spinner size={size} accent={accent} />}
      {variant === 'dots'         && <Dots size={size} accent={accent} />}
      {variant === 'skeleton'     && <Skeleton size={size} width={width} height={height} shape={shape} />}
      {variant === 'pulse'        && <Pulse size={size} accent={accent} />}
      {variant === 'progress-bar' && <ProgressBar size={size} accent={accent} progress={progress} />}
      {label && variant !== 'skeleton' && (
        <span style={{ fontSize: LABEL_SIZE[size], color: 'var(--color-text-muted)' }}>{label}</span>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.4)', zIndex: 900,
      }}>
        {inner}
      </div>
    );
  }

  return inner;
}
