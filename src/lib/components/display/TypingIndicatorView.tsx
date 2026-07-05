import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';
import './TypingIndicatorView.css';

export interface TypingIndicatorViewProps {
  label?: string;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Animated "…is typing" dots. */
export function TypingIndicatorView({
  label,
  size,
  color,
  className = '',
  style,
}: TypingIndicatorViewProps) {
  const base = useDisplayBase(size, { color });
  const accent = color ?? 'var(--color-text-muted)';

  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, ...style }}>
      <span style={{ display: 'inline-flex', gap: 3, padding: '6px 10px', borderRadius: 999, background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)' }}>
        {[0, 1, 2].map(i => (
          <span key={i} className="dui_typing__dot" style={{ background: accent, animationDelay: `${i * 150}ms` }} />
        ))}
      </span>
      {label && <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{label}</span>}
    </div>
  );
}
