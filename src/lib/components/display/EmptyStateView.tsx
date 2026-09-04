import './EmptyStateView.css';

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
}

export interface EmptyStateHint {
  /** The gesture or control — rendered in mono, like a key cap. */
  key: string;
  /** What it does. */
  text: string;
}

export interface EmptyStateViewProps {
  icon?: React.ReactNode;
  title: string;
  message?: string;
  action?: EmptyStateAction;
  accentColor?: string;
  compact?: boolean;
  className?: string;
  /**
   * Sit the icon in a tinted medallion instead of floating it.
   *
   * A small glyph at half opacity in the middle of a large empty pane reads as
   * something that failed to load. Giving it a ground turns the same icon into
   * a deliberate mark, which is the difference between "nothing here yet" and
   * "something is broken" — and an empty state's whole job is to say the first
   * one convincingly.
   */
  variant?: 'plain' | 'medallion';
  /**
   * What you could do next, as key/description pairs.
   *
   * An empty state is the one moment the reader has attention to spare and
   * nothing to read, so it is the cheapest place to teach the two or three
   * gestures the view depends on.
   */
  hints?: EmptyStateHint[];
}

export function EmptyStateView({
  icon,
  title,
  message,
  action,
  accentColor,
  compact = false,
  className = '',
  variant = 'plain',
  hints,
}: EmptyStateViewProps) {
  const accent = accentColor || 'var(--color-primary)';

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: compact ? '20px 16px' : '40px 24px',
        gap: compact ? '8px' : '12px',
        textAlign: 'center',
        width: '100%',
      }}
    >
      {icon && (variant === 'medallion' ? (
        <div style={{
          display: 'grid',
          placeItems: 'center',
          width: compact ? 40 : 54,
          height: compact ? 40 : 54,
          borderRadius: compact ? 12 : 16,
          color: accent,
          background: `color-mix(in srgb, ${accent} 11%, transparent)`,
          border: `1px solid color-mix(in srgb, ${accent} 22%, transparent)`,
          marginBottom: compact ? 0 : '6px',
        }}>
          {icon}
        </div>
      ) : (
        <div style={{
          color: 'var(--color-emptystate-icon)',
          opacity: 0.5,
          marginBottom: compact ? 0 : '4px',
        }}>
          {icon}
        </div>
      ))}

      <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? '4px' : '6px' }}>
        <span style={{
          fontSize: compact ? '12px' : '13px',
          fontWeight: 500,
          color: 'var(--color-emptystate-title)',
        }}>
          {title}
        </span>
        {message && (
          <span style={{
            fontSize: compact ? '11px' : '12px',
            color: 'var(--color-emptystate-desc)',
            lineHeight: 1.5,
            maxWidth: '320px',
          }}>
            {message}
          </span>
        )}
      </div>

      {hints && hints.length > 0 && (
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 5,
          marginTop: compact ? 2 : 6, textAlign: 'left',
        }}>
          {hints.map(h => (
            <div key={h.key + h.text} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{
                flexShrink: 0, minWidth: 52, textAlign: 'right',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 10, fontWeight: 600, color: accent,
              }}>{h.key}</span>
              <span style={{
                fontSize: 11, lineHeight: 1.5, color: 'var(--color-emptystate-desc)',
              }}>{h.text}</span>
            </div>
          ))}
        </div>
      )}

      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="dui_empty-state__action"
          style={{
            marginTop: '4px',
            padding: '5px 14px',
            height: '26px',
            fontSize: '11px',
            fontWeight: 500,
            borderRadius: '5px',
            border: `1px solid color-mix(in srgb, ${accent} 40%, transparent)`,
            background: `color-mix(in srgb, ${accent} 10%, transparent)`,
            color: accent,
            cursor: 'pointer',
            '--dui-empty-accent': accent,
          } as React.CSSProperties}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
