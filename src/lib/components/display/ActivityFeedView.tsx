import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';

export interface ActivityEntry {
  id: string;
  actor: string;
  avatar?: ReactNode;
  action: string;
  timestamp: string;
  /** ISO date string used to group entries under a day header, e.g. "2026-07-02". */
  day: string;
}

export interface ActivityFeedViewProps {
  entries: ActivityEntry[];
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

function dayLabel(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
}

/** Chronological activity feed, entries grouped by day. */
export function ActivityFeedView({
  entries,
  size,
  className = '',
  style,
}: ActivityFeedViewProps) {
  const base = useCardBase(size);
  const groups = new Map<string, ActivityEntry[]>();
  for (const e of entries) {
    if (!groups.has(e.day)) groups.set(e.day, []);
    groups.get(e.day)!.push(e);
  }

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 14, ...style }}>
      {Array.from(groups.entries()).map(([day, items]) => (
        <div key={day}>
          <div style={{ fontSize: base.fontSize, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>{dayLabel(day)}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {item.avatar ?? <span style={{ width: 24, height: 24, borderRadius: '999px', background: 'var(--color-surface-border)', flexShrink: 0 }} />}
                <span style={{ fontSize: base.fontSize, color: 'var(--color-text-secondary)' }}>
                  <strong style={{ color: 'var(--color-text-primary)' }}>{item.actor}</strong> {item.action}
                </span>
                <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)', marginLeft: 'auto', flexShrink: 0 }}>{item.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
