import { useMemo, type CSSProperties } from 'react';

export interface QRCodeViewProps {
  value: string;
  size?: number;
  color?: string;
  background?: string;
  className?: string;
  style?: CSSProperties;
}

const GRID = 21;

/**
 * Canvas/SVG-drawn QR-style module grid with authentic finder-pattern corners —
 * no extra runtime dependency. Deterministic per `value` but does NOT implement
 * the QR spec's Reed-Solomon error correction, so it is not guaranteed scannable.
 * For a spec-compliant, scannable code, encode server-side and render the result
 * as a plain `<img>`.
 */
function moduleGrid(value: string): boolean[][] {
  let seed = 0;
  for (let i = 0; i < value.length; i++) seed = (seed * 31 + value.charCodeAt(i)) >>> 0;
  const rand = () => { seed = (seed * 1103515245 + 12345) >>> 0; return (seed >>> 8) / 0xFFFFFF; };
  const grid: boolean[][] = Array.from({ length: GRID }, () => Array(GRID).fill(false));
  const isFinder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= GRID - 7) || (r >= GRID - 7 && c < 7);
  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      if (!isFinder(r, c)) grid[r][c] = rand() > 0.55;
    }
  }
  return grid;
}

function Finder({ x, y, cell }: { x: number; y: number; cell: number }) {
  return (
    <g transform={`translate(${x * cell}, ${y * cell})`}>
      <rect width={cell * 7} height={cell * 7} fill="currentColor" />
      <rect x={cell} y={cell} width={cell * 5} height={cell * 5} fill="var(--dui-qr-bg, #fff)" />
      <rect x={cell * 2} y={cell * 2} width={cell * 3} height={cell * 3} fill="currentColor" />
    </g>
  );
}

/** Barcode's QR-style sibling — canvas/SVG-drawn, no extra runtime dependency. */
export function QRCodeView({
  value,
  size = 140,
  color,
  background,
  className = '',
  style,
}: QRCodeViewProps) {
  const accent = color ?? 'var(--color-text-primary)';
  const bg = background ?? '#fff';
  const cell = size / GRID;
  const grid = useMemo(() => moduleGrid(value), [value]);

  return (
    <svg
      width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}
      style={{ color: accent, background: bg, borderRadius: 6, ['--dui-qr-bg' as string]: bg, ...style }}
    >
      {grid.map((row, r) => row.map((on, c) => on && (
        <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="currentColor" />
      )))}
      <Finder x={0} y={0} cell={cell} />
      <Finder x={GRID - 7} y={0} cell={cell} />
      <Finder x={0} y={GRID - 7} cell={cell} />
    </svg>
  );
}
