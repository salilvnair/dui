import type { ReactNode } from 'react';

export interface InfoViewProps {
  /** Icon rendered inside a soft colored badge above the title */
  icon?: ReactNode;
  title: string;
  /** Plain description text — use `paths` for inline code/file-path snippets instead of embedding them here */
  description?: string;
  /** File paths / code snippets rendered as indigo/purple monospace pills, same treatment as InfoPopupView's item.code */
  paths?: string[];
  /** Small chip badges rendered below the paths (e.g. a count or a status word) */
  badges?: { label: string; color?: string }[];
  accentColor?: string;
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/** Colorful "nothing here yet" panel — icon badge + title + description +
 * indigo/purple-coded path/snippet pills + optional chip badges. Reuses
 * InfoPopupView's item.code visual language for the path pills. */
export function InfoView({
  icon,
  title,
  description,
  paths,
  badges,
  accentColor,
  compact = false,
  className = '',
  style,
}: InfoViewProps) {
  const accent = accentColor || 'var(--color-primary)';

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: compact ? 8 : 12,
        padding: compact ? '24px 20px' : '48px 24px',
        ...style,
      }}
    >
      {icon && (
        <div
          style={{
            width: compact ? 40 : 52,
            height: compact ? 40 : 52,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `color-mix(in srgb, ${accent} 14%, transparent)`,
            color: accent,
          }}
        >
          {icon}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: compact ? 13 : 15, fontWeight: 600, color: 'var(--color-text-primary)' }}>
          {title}
        </span>
        {description && (
          <span style={{ fontSize: compact ? 11 : 12, color: 'var(--color-text-muted)', lineHeight: 1.6, maxWidth: 380 }}>
            {description}
          </span>
        )}
      </div>

      {paths && paths.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6 }}>
          {paths.map((p, i) => (
            <span
              key={i}
              style={{
                padding: '3px 9px',
                borderRadius: 5,
                fontSize: 11,
                fontFamily: 'Menlo, Monaco, monospace',
                background: 'color-mix(in srgb, var(--color-info, #6366f1) 12%, transparent)',
                color: 'var(--color-info, #6366f1)',
                border: '1px solid color-mix(in srgb, var(--color-info, #6366f1) 25%, transparent)',
              }}
            >
              {p}
            </span>
          ))}
        </div>
      )}

      {badges && badges.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6 }}>
          {badges.map((b, i) => {
            const c = b.color || accent;
            return (
              <span
                key={i}
                style={{
                  padding: '2px 8px',
                  borderRadius: 99,
                  fontSize: 10,
                  fontWeight: 600,
                  background: `color-mix(in srgb, ${c} 15%, transparent)`,
                  color: c,
                }}
              >
                {b.label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
