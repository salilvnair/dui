import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useButtonBase } from '../../core/ButtonBase';
import { ChevronUpIcon, ChevronDownIcon } from '../../../icons';

export interface VoteWidgetViewProps {
  score: number;
  userVote: 'up' | 'down' | null;
  onVote: (vote: 'up' | 'down' | null) => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Upvote/downvote counter control. */
export function VoteWidgetView({
  score,
  userVote,
  onVote,
  size,
  color,
  className = '',
  style,
}: VoteWidgetViewProps) {
  const base = useButtonBase(size, { color });
  const accent = color ?? base.defaultColor ?? 'var(--color-primary)';

  const handle = (dir: 'up' | 'down') => onVote(userVote === dir ? null : dir);

  const btnStyle = (active: boolean): CSSProperties => ({
    display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent',
    cursor: 'pointer', padding: 2, color: active ? accent : 'var(--color-text-muted)',
  });

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, ...style }}>
      <button type="button" style={btnStyle(userVote === 'up')} onClick={() => handle('up')} aria-label="Upvote">
        <ChevronUpIcon size={base.iconSize} />
      </button>
      <span style={{ fontSize: base.fontSize, fontWeight: 700, color: 'var(--color-text-primary)' }}>{score}</span>
      <button type="button" style={btnStyle(userVote === 'down')} onClick={() => handle('down')} aria-label="Downvote">
        <ChevronDownIcon size={base.iconSize} />
      </button>
    </div>
  );
}
