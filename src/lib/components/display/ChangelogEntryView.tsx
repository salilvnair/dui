import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';

export type ChangeType = 'feature' | 'fix' | 'improvement' | 'breaking';

export interface ChangelogEntryViewProps {
  version: string;
  date: string;
  changes: { type: ChangeType; description: ReactNode }[];
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

const TYPE_CONFIG: Record<ChangeType, { label: string; color: string }> = {
  feature: { label: 'Feature', color: 'var(--color-success)' },
  fix: { label: 'Fix', color: 'var(--color-info)' },
  improvement: { label: 'Improved', color: 'var(--color-primary)' },
  breaking: { label: 'Breaking', color: 'var(--color-error)' },
};

/** Version + date + change-type badges + description block — changelog/release-notes entry. */
export function ChangelogEntryView({
  version,
  date,
  changes,
  size,
  className = '',
  style,
}: ChangelogEntryViewProps) {
  const base = useCardBase(size);

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 16, borderBottom: '1px solid var(--color-surface-border)', ...style }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: `calc(${base.fontSize} * 1.2)`, fontWeight: 800, color: 'var(--color-text-primary)' }}>v{version}</span>
        <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{date}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {changes.map((c, i) => {
          const cfg = TYPE_CONFIG[c.type];
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <span style={{ flexShrink: 0, fontSize: base.fontSize, fontWeight: 700, color: cfg.color, background: `color-mix(in srgb, ${cfg.color} 14%, transparent)`, padding: '1px 6px', borderRadius: 4 }}>{cfg.label}</span>
              <span style={{ fontSize: base.fontSize, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{c.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
