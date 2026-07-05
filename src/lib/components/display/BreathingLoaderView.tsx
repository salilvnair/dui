import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useAvatarBase } from '../../core/AvatarBase';
import './BreathingLoaderView.css';

export interface BreathingLoaderViewProps {
  label?: string;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** An ultra-minimal loading state — a single circle slowly scales/fades in a breathing rhythm. A calmer alternative to a spinner. */
export function BreathingLoaderView({
  label,
  size,
  color,
  className = '',
  style,
}: BreathingLoaderViewProps) {
  const base = useAvatarBase(size, { color });
  const accent = color ?? 'var(--color-primary)';
  const diameter = base.diameter;

  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, ...style }}>
      <span className="dui_breathing__circle" style={{ display: 'inline-block', width: diameter, height: diameter, borderRadius: '999px', background: accent }} />
      {label && <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{label}</span>}
    </div>
  );
}
