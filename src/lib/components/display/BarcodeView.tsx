import { useMemo, type CSSProperties } from 'react';

export interface BarcodeViewProps {
  value: string;
  height?: number;
  showValue?: boolean;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Deterministic bar-pattern generator, visually representative — not a scannable
 * Code128/EAN encoder. For a real scannable barcode, generate the SVG server-side
 * or via a dedicated encoding library and pass it through as a plain `<img>`.
 */
function widthsFor(value: string): number[] {
  const widths: number[] = [];
  let seed = 0;
  for (let i = 0; i < value.length; i++) seed = (seed * 31 + value.charCodeAt(i)) >>> 0;
  for (let i = 0; i < 60; i++) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    widths.push(1 + (seed % 3));
  }
  return widths;
}

/** Barcode generator display — canvas/SVG-drawn, no extra runtime dependency. */
export function BarcodeView({
  value,
  height = 50,
  showValue = true,
  color,
  className = '',
  style,
}: BarcodeViewProps) {
  const accent = color ?? 'var(--color-text-primary)';
  const widths = useMemo(() => widthsFor(value), [value]);
  const totalWidth = widths.reduce((a, b) => a + b, 0) * 2;

  return (
    <div className={className} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4, ...style }}>
      <svg width={totalWidth} height={height} viewBox={`0 0 ${totalWidth} ${height}`}>
        {widths.reduce<{ x: number; nodes: React.ReactNode[] }>((acc, w, i) => {
          if (i % 2 === 0) acc.nodes.push(<rect key={i} x={acc.x} y={0} width={w * 2} height={height} fill={accent} />);
          acc.x += w * 2;
          return acc;
        }, { x: 0, nodes: [] }).nodes}
      </svg>
      {showValue && <span style={{ fontSize: 11, fontFamily: 'ui-monospace, monospace', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>{value}</span>}
    </div>
  );
}
