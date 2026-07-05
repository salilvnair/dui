import type { CSSProperties, ReactNode } from 'react';
import type { DuiRadius } from '../../core/DuiTypes';
import { useMediaBase } from '../../core/MediaBase';

export interface AspectRatioViewProps {
  children: ReactNode;
  /** width / height. Default 16/9. */
  ratio?: number;
  borderRadius?: DuiRadius | number;
  className?: string;
  style?: CSSProperties;
}

/** Fixed aspect-ratio box for image/video containers — content fills it via absolute inset. */
export function AspectRatioView({
  children,
  ratio,
  borderRadius,
  className = '',
  style,
}: AspectRatioViewProps) {
  const base = useMediaBase(undefined, { borderRadius, aspectRatio: ratio });

  return (
    <div
      className={className}
      style={{
        position: 'relative', width: '100%', aspectRatio: base.aspectRatio,
        borderRadius: base.borderRadius, overflow: 'hidden', ...style,
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>{children}</div>
    </div>
  );
}
