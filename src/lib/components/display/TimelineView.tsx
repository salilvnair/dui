import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';

export interface TimelineEntry {
  id: string;
  icon?: ReactNode;
  title: ReactNode;
  timestamp?: string;
  content?: ReactNode;
  color?: string;
}

export interface TimelineViewProps {
  entries: TimelineEntry[];
  orientation?: 'vertical' | 'horizontal';
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Event trail with icon nodes — vertical (default) or horizontal. */
export function TimelineView({
  entries,
  orientation = 'vertical',
  size,
  color,
  className = '',
  style,
}: TimelineViewProps) {
  const base = useCardBase(size, { color });
  const accent = color ?? 'var(--color-primary)';

  if (orientation === 'horizontal') {
    return (
      <div className={className} style={{ display: 'flex', alignItems: 'flex-start', width: '100%', ...style }}>
        {entries.map((e, i) => (
          <div key={e.id} style={{ display: 'flex', alignItems: 'center', flex: i < entries.length - 1 ? 1 : undefined }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 90 }}>
              <span style={{ width: 22, height: 22, borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: e.color ?? accent, color: '#fff', flexShrink: 0 }}>{e.icon}</span>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: base.fontSize, fontWeight: 700, color: 'var(--color-text-primary)' }}>{e.title}</div>
                {e.timestamp && <div style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{e.timestamp}</div>}
              </div>
            </div>
            {i < entries.length - 1 && <div style={{ flex: 1, height: 1.5, marginTop: 11, background: 'var(--color-surface-border)' }} />}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {entries.map((e, i) => (
        <div key={e.id} style={{ display: 'flex', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            <span style={{ width: 22, height: 22, borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: e.color ?? accent, color: '#fff' }}>{e.icon}</span>
            {i < entries.length - 1 && <div style={{ width: 1.5, flex: 1, background: 'var(--color-surface-border)', minHeight: 24 }} />}
          </div>
          <div style={{ paddingBottom: 18, flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: base.fontSize, fontWeight: 700, color: 'var(--color-text-primary)' }}>{e.title}</span>
              {e.timestamp && <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{e.timestamp}</span>}
            </div>
            {e.content && <div style={{ fontSize: base.fontSize, color: 'var(--color-text-secondary)', marginTop: 2 }}>{e.content}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
