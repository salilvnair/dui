import { useState, type CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useButtonBase } from '../../core/ButtonBase';
import { ThumbsUpIcon, ThumbsDownIcon } from '../../../icons';

export interface FeedbackWidgetViewProps {
  /**
   * A stable hook for tests and automation.
   *
   * Lands on this component's root element as `data-testid`. Worth setting on
   * anything a test drives: several dui inputs render a `contenteditable` div
   * with a decorative placeholder span, which neither `getByPlaceholder` nor
   * `getByRole` reliably finds.
   */
  testId?: string;

  question?: string;
  vote: 'up' | 'down' | null;
  onVote: (vote: 'up' | 'down') => void;
  comment?: string;
  onCommentChange?: (comment: string) => void;
  onSubmit?: () => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Thumbs up/down + optional comment micro-survey. */
export function FeedbackWidgetView({ testId,
  question = 'Was this helpful?',
  vote,
  onVote,
  comment,
  onCommentChange,
  onSubmit,
  size,
  color,
  className = '',
  style,
}: FeedbackWidgetViewProps) {
  const base = useButtonBase(size, { color });
  const accent = color ?? base.defaultColor ?? 'var(--color-primary)';
  const [showComment, setShowComment] = useState(false);

  const handleVote = (v: 'up' | 'down') => {
    onVote(v);
    setShowComment(true);
  };

  const btnStyle = (active: boolean): CSSProperties => ({
    display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '999px',
    border: `1px solid ${active ? accent : 'var(--color-surface-border)'}`,
    background: active ? `color-mix(in srgb, ${accent} 14%, transparent)` : 'transparent',
    color: active ? accent : 'var(--color-text-muted)', cursor: 'pointer',
  });

  return (
    <div data-testid={testId} className={className} style={{ display: 'flex', flexDirection: 'column', gap: 10, ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: base.fontSize, color: 'var(--color-text-secondary)' }}>{question}</span>
        <button type="button" style={btnStyle(vote === 'up')} onClick={() => handleVote('up')} aria-label="Yes"><ThumbsUpIcon size={14} /></button>
        <button type="button" style={btnStyle(vote === 'down')} onClick={() => handleVote('down')} aria-label="No"><ThumbsDownIcon size={14} /></button>
      </div>
      {showComment && onCommentChange && (
        <div style={{ display: 'flex', gap: 6 }}>
          <input
            value={comment ?? ''}
            onChange={e => onCommentChange(e.target.value)}
            placeholder="Tell us more (optional)"
            style={{ flex: 1, height: 30, fontSize: base.fontSize, padding: '0 8px', border: '1px solid var(--color-input-border)', borderRadius: 6, background: 'var(--color-input-bg)', color: 'var(--color-text-primary)', outline: 'none' }}
          />
          {onSubmit && (
            <button type="button" onClick={onSubmit} style={{ border: 'none', borderRadius: 6, padding: '0 12px', background: accent, color: '#fff', fontWeight: 700, fontSize: base.fontSize, cursor: 'pointer' }}>
              Send
            </button>
          )}
        </div>
      )}
    </div>
  );
}
