import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useAvatarBase } from '../../core/AvatarBase';
import './PulseDotView.css';

export interface PulseDotViewProps {
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Attention-grabbing pulsing dot primitive — complements StatusIndicatorView. */
export function PulseDotView({
  size,
  color,
  className = '',
  style,
}: PulseDotViewProps) {
  const base = useAvatarBase(size);
  const accent = color ?? 'var(--color-error)';

  return (
    <span
      className={className}
      style={{ position: 'relative', display: 'inline-block', width: base.dotSize, height: base.dotSize, color: accent, ...style }}
    >
      <span className="dui_pulsedot__ring" />
      <span style={{ position: 'absolute', inset: 0, borderRadius: '999px', background: accent }} />
    </span>
  );
}
