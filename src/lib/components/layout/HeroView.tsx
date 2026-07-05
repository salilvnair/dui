import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize, DuiRadius } from '../../core/DuiTypes';
import { useLayoutBase } from '../../core/LayoutBase';

const MIN_HEIGHT: Record<DuiSize, number> = {
  xxs: 80, xs: 100, sm: 140, md: 200, lg: 280, xl: 360, xxl: 440, xxxl: 520,
};

export interface HeroViewProps {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  /** Optional background — CSS gradient/color string, or an image URL. */
  background?: string;
  size?: DuiSize;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function HeroView({
  title,
  subtitle,
  actions,
  background,
  size,
  borderRadius,
  color,
  className = '',
  style,
}: HeroViewProps) {
  const base = useLayoutBase(size, { borderRadius, color });
  const s = size ?? 'md';
  const isImage = background?.startsWith('http') || background?.startsWith('/');

  return (
    <div
      className={className}
      style={{
        minHeight: MIN_HEIGHT[s],
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: base.padding, gap: base.gap,
        borderRadius: base.borderRadius, boxSizing: 'border-box',
        background: background
          ? (isImage ? `center/cover no-repeat url(${background})` : background)
          : 'var(--color-surface)',
        color: base.color ?? (background ? '#fff' : 'var(--color-text-primary)'),
        ...style,
      }}
    >
      <div style={{ fontSize: `calc(${base.fontSize} * 2.2)`, fontWeight: 800, letterSpacing: '-0.02em' }}>{title}</div>
      {subtitle && <div style={{ fontSize: `calc(${base.fontSize} * 1.2)`, opacity: 0.8, maxWidth: 480 }}>{subtitle}</div>}
      {actions && <div style={{ display: 'flex', gap: base.gap, marginTop: base.gap }}>{actions}</div>}
    </div>
  );
}
