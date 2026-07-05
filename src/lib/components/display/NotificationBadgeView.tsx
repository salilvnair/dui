import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useFeedbackBase } from '../../core/FeedbackBase';

export interface NotificationBadgeViewProps {
  children: ReactNode;
  /** Omit or 0 for a plain dot badge. */
  count?: number;
  /** Hide the badge entirely (e.g. count === 0 and dot not wanted). */
  hidden?: boolean;
  /** Show a dot even without a count. */
  dot?: boolean;
  max?: number;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function NotificationBadgeView({
  children,
  count,
  hidden = false,
  dot = false,
  max = 99,
  size,
  color,
  className = '',
  style,
}: NotificationBadgeViewProps) {
  const base = useFeedbackBase(size, { color });
  const accent = color ?? 'var(--color-error)';
  const showDot = dot || count === undefined;
  const label = count !== undefined ? (count > max ? `${max}+` : String(count)) : '';
  const visible = !hidden && (showDot || (count ?? 0) > 0);

  return (
    <span className={className} style={{ position: 'relative', display: 'inline-flex', ...style }}>
      {children}
      {visible && (
        <span
          style={{
            position: 'absolute', top: -2, right: -2,
            minWidth: showDot && count === undefined ? base.badgeSize * 0.45 : base.badgeSize,
            height: showDot && count === undefined ? base.badgeSize * 0.45 : base.badgeSize,
            padding: showDot && count === undefined ? 0 : '0 4px',
            borderRadius: '999px', background: accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: base.fontSize, fontWeight: 700, color: '#fff',
            border: '2px solid var(--color-surface)', boxSizing: 'content-box',
            lineHeight: 1,
          }}
        >
          {!(showDot && count === undefined) && label}
        </span>
      )}
    </span>
  );
}
