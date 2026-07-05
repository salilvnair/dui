import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';

export interface MessageBubbleViewProps {
  children: ReactNode;
  variant: 'sent' | 'received';
  timestamp?: string;
  avatar?: ReactNode;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Chat message bubble — sent (right-aligned, filled) / received (left-aligned, neutral). */
export function MessageBubbleView({
  children,
  variant,
  timestamp,
  avatar,
  size,
  color,
  className = '',
  style,
}: MessageBubbleViewProps) {
  const base = useCardBase(size, { color });
  const accent = color ?? 'var(--color-primary)';
  const isSent = variant === 'sent';

  return (
    <div className={className} style={{ display: 'flex', flexDirection: isSent ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 8, ...style }}>
      {avatar && <span style={{ flexShrink: 0 }}>{avatar}</span>}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: isSent ? 'flex-end' : 'flex-start', gap: 3, maxWidth: '75%' }}>
        <div
          style={{
            padding: base.padding, borderRadius: base.borderRadius,
            borderBottomRightRadius: isSent ? 4 : base.borderRadius,
            borderBottomLeftRadius: isSent ? base.borderRadius : 4,
            background: isSent ? accent : 'var(--color-surface)',
            border: isSent ? 'none' : '1px solid var(--color-surface-border)',
            color: isSent ? 'var(--color-btn-primary-text, #fff)' : 'var(--color-text-primary)',
            fontSize: base.fontSize, lineHeight: 1.5,
          }}
        >
          {children}
        </div>
        {timestamp && <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{timestamp}</span>}
      </div>
    </div>
  );
}
