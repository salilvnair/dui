import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';

export interface QuoteBlockViewProps {
  children: ReactNode;
  attribution?: string;
  role?: string;
  avatar?: ReactNode;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Styled blockquote with an optional avatar + attribution line. */
export function QuoteBlockView({
  children,
  attribution,
  role,
  avatar,
  size,
  color,
  className = '',
  style,
}: QuoteBlockViewProps) {
  const base = useDisplayBase(size, { color });
  const accent = color ?? 'var(--color-primary)';

  return (
    <blockquote className={className} style={{ margin: 0, padding: `0 0 0 16px`, borderLeft: `3px solid ${accent}`, ...style }}>
      <p style={{ margin: 0, fontSize: `calc(${base.fontSize} * 1.15)`, fontStyle: 'italic', color: 'var(--color-text-primary)', lineHeight: 1.6 }}>
        "{children}"
      </p>
      {(attribution || avatar) && (
        <footer style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
          {avatar}
          <div>
            {attribution && <div style={{ fontSize: base.fontSize, fontWeight: 700, color: 'var(--color-text-primary)' }}>{attribution}</div>}
            {role && <div style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{role}</div>}
          </div>
        </footer>
      )}
    </blockquote>
  );
}
