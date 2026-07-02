import type { ReactNode } from 'react';
import { CloseIcon } from '../../../icons';

export interface InspectorSectionViewProps {
  icon?: ReactNode;
  label: string;
  accentColor?: string;
  children: ReactNode;
  className?: string;
}

/** One bordered, labeled content block inside an InspectorPanelView. */
export function InspectorSectionView({ icon, label, accentColor, children, className = '' }: InspectorSectionViewProps) {
  return (
    <div
      className={className}
      style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-elevated-border)' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 10,
          fontSize: '10px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: accentColor ?? 'var(--color-text-muted)',
        }}
      >
        {icon && <span style={{ opacity: 0.8 }}>{icon}</span>}
        {label}
      </div>
      {children}
    </div>
  );
}

export interface InspectorPanelViewProps {
  /** Primary heading, e.g. an entity name */
  title: ReactNode;
  /** Small uppercase text under the title, e.g. entity type */
  subtitle?: string;
  /** Chips/badges row above the title */
  badges?: ReactNode;
  onClose?: () => void;
  /** false (default): absolute overlay panel on the right edge.
   *  true: fills its parent in normal flow (e.g. inside an existing sidebar). */
  embedded?: boolean;
  width?: number | string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/** Generic "entity detail sidebar" shell — header (badges + title + subtitle +
 * close button) followed by stacked InspectorSectionView blocks. */
export function InspectorPanelView({
  title,
  subtitle,
  badges,
  onClose,
  embedded = false,
  width = 320,
  children,
  className = '',
  style,
}: InspectorPanelViewProps) {
  const containerStyle: React.CSSProperties = embedded
    ? { width: '100%', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }
    : {
        position: 'absolute', right: 0, top: 0, bottom: 0, width,
        overflowY: 'auto', zIndex: 20, display: 'flex', flexDirection: 'column',
        background: 'var(--color-surface)', borderLeft: '1px solid var(--color-elevated-border)',
        boxShadow: '-8px 0 24px rgba(0,0,0,0.25)',
      };

  return (
    <div className={className} style={{ ...containerStyle, ...style }}>
      <div
        style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          padding: '14px 16px', borderBottom: '1px solid var(--color-elevated-border)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 0 }}>
          {badges && <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>{badges}</div>}
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0, wordBreak: 'break-word', lineHeight: 1.4 }}>
            {title}
          </h2>
          {subtitle && (
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {subtitle}
            </span>
          )}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            title="Close"
            style={{
              marginLeft: 8, flexShrink: 0, borderRadius: 6, padding: 4,
              background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)',
            }}
          >
            <CloseIcon size={15} />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
