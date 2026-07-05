import { useMemo, type CSSProperties, type ReactNode } from 'react';

export interface WatermarkViewProps {
  children: ReactNode;
  text: string;
  /** Rotation angle in degrees. Default -22. */
  angle?: number;
  /** Gap between repeated tiles (px). Default 120. */
  gap?: number;
  fontSize?: number;
  color?: string;
  opacity?: number;
  className?: string;
  style?: CSSProperties;
}

/** Repeated diagonal text watermark overlay primitive. */
export function WatermarkView({
  children,
  text,
  angle = -22,
  gap = 120,
  fontSize = 14,
  color,
  opacity = 0.12,
  className = '',
  style,
}: WatermarkViewProps) {
  const accent = color ?? 'var(--color-text-primary)';

  const dataUri = useMemo(() => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${gap}" height="${gap}">
        <text x="0" y="${gap / 2}" transform="rotate(${angle} ${gap / 2} ${gap / 2})"
          font-size="${fontSize}" fill="${accent}" fill-opacity="${opacity}"
          font-family="sans-serif" text-anchor="middle">${text}</text>
      </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }, [text, angle, gap, fontSize, accent, opacity]);

  return (
    <div className={className} style={{ position: 'relative', ...style }}>
      {children}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `url(${dataUri})`, backgroundRepeat: 'repeat',
        }}
      />
    </div>
  );
}
