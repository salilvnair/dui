import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize, DuiRadius } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';

export interface ArticleCardViewProps {
  image?: string;
  title: string;
  excerpt?: string;
  meta?: ReactNode;
  onClick?: () => void;
  size?: DuiSize;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Image + title + excerpt + meta preview card — blog/article listing. */
export function ArticleCardView({
  image,
  title,
  excerpt,
  meta,
  onClick,
  size,
  borderRadius,
  color,
  className = '',
  style,
}: ArticleCardViewProps) {
  const base = useCardBase(size, { borderRadius, color });
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={className}
      style={{
        display: 'flex', flexDirection: 'column', textAlign: 'left', width: '100%',
        border: '1px solid var(--color-surface-border)', borderRadius: base.borderRadius, overflow: 'hidden',
        background: 'var(--color-surface)', cursor: onClick ? 'pointer' : 'default', padding: 0, fontFamily: 'inherit',
        ...style,
      }}
    >
      {image && <div style={{ width: '100%', aspectRatio: 16 / 9, background: `center/cover no-repeat url(${image})` }} />}
      <div style={{ padding: base.padding, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontSize: `calc(${base.fontSize} * 1.15)`, fontWeight: 700, color: 'var(--color-text-primary)' }}>{title}</div>
        {excerpt && <div style={{ fontSize: base.fontSize, color: 'var(--color-text-secondary)', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{excerpt}</div>}
        {meta && <div style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)', marginTop: 4 }}>{meta}</div>}
      </div>
    </Tag>
  );
}
