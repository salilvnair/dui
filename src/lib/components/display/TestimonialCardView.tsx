import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';

export interface TestimonialCardViewProps {
  quote: string;
  author: string;
  role?: string;
  avatar?: ReactNode;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** Quote + avatar testimonial card. */
export function TestimonialCardView({
  quote,
  author,
  role,
  avatar,
  size,
  className = '',
  style,
}: TestimonialCardViewProps) {
  const base = useCardBase(size);

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: base.padding, border: '1px solid var(--color-surface-border)', borderRadius: base.borderRadius, ...style }}>
      <p style={{ margin: 0, fontSize: `calc(${base.fontSize} * 1.05)`, color: 'var(--color-text-primary)', lineHeight: 1.6 }}>"{quote}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {avatar ?? <span style={{ width: 32, height: 32, borderRadius: '999px', background: 'var(--color-surface-border)' }} />}
        <div>
          <div style={{ fontSize: base.fontSize, fontWeight: 700, color: 'var(--color-text-primary)' }}>{author}</div>
          {role && <div style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{role}</div>}
        </div>
      </div>
    </div>
  );
}
