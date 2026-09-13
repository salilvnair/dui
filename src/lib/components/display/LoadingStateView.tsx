import { useEffect, useState, type ReactNode, type CSSProperties } from 'react';
import './LoadingStateView.css';

export interface LoadingStateViewProps {
  /**
   * The thing being waited for, drawn large.
   *
   * Deliberately the subject rather than a generic spinner: a reader glancing
   * at the screen learns what is happening from the icon before they read a
   * word of it.
   */
  icon?: ReactNode;
  title: string;
  message?: string;
  accentColor?: string;
  /** Matches EmptyStateView, so the two swap without the layout moving. */
  compact?: boolean;
  /**
   * Seconds after which the wait stops being ordinary.
   *
   * A cluster on the other side of the world, behind a VPN, answers in seconds
   * rather than milliseconds — and the reader cannot tell that from a hang. At
   * this point the component says so itself instead of leaving them to guess.
   * 0 disables it.
   */
  slowAfterSeconds?: number;
  /** What to say once it has been slow. Replaces `message`. */
  slowMessage?: string;
  /** Offered only once the wait has gone long — Cancel, Try again, Go back. */
  action?: { label: string; onClick: () => void };
  /** Shown under the message: what is being fetched, step by step. */
  hints?: { key: ReactNode; text: string }[];
  className?: string;
  style?: CSSProperties;
}

/**
 * Waiting, said properly.
 *
 * The shape of EmptyStateView with a pulse and a clock. It exists because the
 * alternative everywhere was a line of grey text — "Loading pods…", "Loading
 * namespaces…" — which says nothing about what is being waited for, nothing
 * about how long it has been, and looks identical whether the answer is a
 * hundred milliseconds away or never coming.
 *
 * Three things it does that a spinner cannot: it names the subject, it changes
 * its mind after a while, and it eventually offers a way out.
 */
export function LoadingStateView({
  icon,
  title,
  message,
  accentColor = 'var(--color-primary)',
  compact = false,
  slowAfterSeconds = 8,
  slowMessage,
  action,
  hints,
  className = '',
  style,
}: LoadingStateViewProps) {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (!slowAfterSeconds) return;
    const id = window.setTimeout(() => setSlow(true), slowAfterSeconds * 1000);
    return () => window.clearTimeout(id);
  }, [slowAfterSeconds]);

  const size = compact ? 40 : 54;
  const body = slow && slowMessage ? slowMessage : message;

  return (
    <div
      className={className}
      role="status"
      aria-busy="true"
      aria-live="polite"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: compact ? 8 : 10,
        padding: compact ? '18px 16px' : '34px 26px',
        textAlign: 'center',
        ...style,
      }}
    >
      {icon && (
        <div
          className="dui_loading-state__medallion"
          style={{
            display: 'grid',
            placeItems: 'center',
            width: size,
            height: size,
            borderRadius: compact ? 12 : 16,
            color: accentColor,
            background: `color-mix(in srgb, ${accentColor} 11%, transparent)`,
            border: `1px solid color-mix(in srgb, ${accentColor} 22%, transparent)`,
          }}
        >
          <span className="dui_loading-state__ripple" style={{ borderRadius: compact ? 12 : 16 }} />
          {icon}
        </div>
      )}

      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 2,
        fontSize: compact ? 12.5 : 13.5, fontWeight: 600,
        color: 'var(--color-text-primary)',
      }}>
        {title}
        {/* The only thing on screen that moves with time. Three dots rather
            than a count, because a count nobody can act on is just anxiety. */}
        <span aria-hidden="true" style={{ display: 'inline-flex', marginLeft: 1 }}>
          {[0, 1, 2].map(i => (
            <span key={i} className="dui_loading-state__dot" style={{ color: accentColor }}>.</span>
          ))}
        </span>
      </div>

      {body && (
        <p style={{
          margin: 0,
          maxWidth: '52ch',
          fontSize: compact ? 11 : 11.5,
          lineHeight: 1.6,
          color: slow ? 'var(--color-warning)' : 'var(--color-text-muted)',
        }}>
          {body}
        </p>
      )}

      {hints && hints.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 2 }}>
          {hints.map((h, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 8,
              fontSize: 10.5, lineHeight: 1.55, color: 'var(--color-text-muted)',
              textAlign: 'left',
            }}>
              <span style={{ color: accentColor, flexShrink: 0, marginTop: 1 }}>{h.key}</span>
              <span>{h.text}</span>
            </div>
          ))}
        </div>
      )}

      {/*
        The way out appears only once waiting has stopped being reasonable.
        Offered at the start it reads as "this probably will not work", which is
        not what a half-second round trip deserves.
      */}
      {action && slow && (
        <button
          type="button"
          onClick={action.onClick}
          style={{
            marginTop: 4,
            fontSize: 11,
            padding: '4px 12px',
            borderRadius: 6,
            cursor: 'pointer',
            color: accentColor,
            background: `color-mix(in srgb, ${accentColor} 10%, transparent)`,
            border: `1px solid color-mix(in srgb, ${accentColor} 32%, transparent)`,
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
