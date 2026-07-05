import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useFeedbackBase } from '../../core/FeedbackBase';
import { useAvatarBase } from '../../core/AvatarBase';

export type SkeletonVariant = 'text' | 'block' | 'avatar' | 'row';

export interface SkeletonViewProps {
  variant?: SkeletonVariant;
  /** Number of lines for `variant="text"`. Default 1. */
  lines?: number;
  width?: number | string;
  height?: number | string;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

// Matches LoaderView's skeleton convention: Tailwind's `animate-pulse` utility
// over `var(--color-loader-track)` — no bespoke shimmer keyframes needed.
const barStyle = (h: number | string, w: number | string): CSSProperties => ({
  display: 'block', height: h, width: w, borderRadius: 4, background: 'var(--color-loader-track)',
});

export function SkeletonView({
  variant = 'text',
  lines = 1,
  width,
  height,
  size,
  className = '',
  style,
}: SkeletonViewProps) {
  const base = useFeedbackBase(size);
  const avatarBase = useAvatarBase(size);
  const lineHeight = parseInt(base.fontSize, 10) + 8;

  if (variant === 'avatar') {
    return <span className={`animate-pulse ${className}`} style={{ ...barStyle(avatarBase.diameter, avatarBase.diameter), borderRadius: '999px', display: 'inline-block', flexShrink: 0, ...style }} />;
  }

  if (variant === 'row') {
    return (
      <div className={className} style={{ display: 'flex', alignItems: 'center', gap: base.gap, ...style }}>
        <span className="animate-pulse" style={{ ...barStyle(avatarBase.diameter, avatarBase.diameter), borderRadius: '999px', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="animate-pulse" style={barStyle(lineHeight * 0.6, '60%')} />
          <span className="animate-pulse" style={barStyle(lineHeight * 0.5, '35%')} />
        </div>
      </div>
    );
  }

  if (variant === 'block') {
    return <span className={`animate-pulse ${className}`} style={{ ...barStyle(height ?? 80, width ?? '100%'), borderRadius: base.borderRadius, ...style }} />;
  }

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 6, width: width ?? '100%', ...style }}>
      {Array.from({ length: lines }, (_, i) => (
        <span
          key={i}
          className="animate-pulse"
          style={barStyle(height ?? lineHeight * 0.6, i === lines - 1 && lines > 1 ? '70%' : '100%')}
        />
      ))}
    </div>
  );
}
