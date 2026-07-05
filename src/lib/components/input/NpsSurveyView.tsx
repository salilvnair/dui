import { useState, type CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useButtonBase } from '../../core/ButtonBase';

export interface NpsSurveyViewProps {
  question?: string;
  score: number | null;
  onScoreChange: (score: number) => void;
  followUp?: string;
  onFollowUpChange?: (text: string) => void;
  onSubmit?: () => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** 0-10 Net Promoter Score picker with an optional follow-up text field. */
export function NpsSurveyView({
  question = 'How likely are you to recommend us to a friend?',
  score,
  onScoreChange,
  followUp,
  onFollowUpChange,
  onSubmit,
  size,
  color,
  className = '',
  style,
}: NpsSurveyViewProps) {
  const base = useButtonBase(size, { color });
  const accent = color ?? base.defaultColor ?? 'var(--color-primary)';
  const [hover, setHover] = useState<number | null>(null);

  const colorFor = (n: number) => n <= 6 ? 'var(--color-error)' : n <= 8 ? 'var(--color-warning)' : 'var(--color-success)';

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 10, ...style }}>
      <span style={{ fontSize: base.fontSize, fontWeight: 600, color: 'var(--color-text-primary)' }}>{question}</span>
      <div style={{ display: 'flex', gap: 4 }}>
        {Array.from({ length: 11 }, (_, n) => {
          const active = score === n || hover === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onScoreChange(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(null)}
              style={{
                width: 26, height: 26, borderRadius: 6, border: `1px solid ${active ? colorFor(n) : 'var(--color-surface-border)'}`,
                background: active ? colorFor(n) : 'transparent', color: active ? '#fff' : 'var(--color-text-secondary)',
                fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'all 100ms',
              }}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--color-text-muted)' }}>
        <span>Not likely</span>
        <span>Very likely</span>
      </div>
      {score !== null && onFollowUpChange && (
        <div style={{ display: 'flex', gap: 6 }}>
          <input
            value={followUp ?? ''}
            onChange={e => onFollowUpChange(e.target.value)}
            placeholder="What's the reason for your score?"
            style={{ flex: 1, height: 30, fontSize: base.fontSize, padding: '0 8px', border: '1px solid var(--color-input-border)', borderRadius: 6, background: 'var(--color-input-bg)', color: 'var(--color-text-primary)', outline: 'none' }}
          />
          {onSubmit && (
            <button type="button" onClick={onSubmit} style={{ border: 'none', borderRadius: 6, padding: '0 12px', background: accent, color: '#fff', fontWeight: 700, fontSize: base.fontSize, cursor: 'pointer' }}>
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
}
