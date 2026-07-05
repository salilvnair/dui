import { useState } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useButtonBase } from '../../core/ButtonBase';
import { HeartIcon } from '../../../icons';
import './LikeButtonView.css';

export interface LikeButtonViewProps {
  liked: boolean;
  onChange: (liked: boolean) => void;
  count?: number;
  size?: DuiSize;
  color?: string;
  className?: string;
}

/** Animated heart/like toggle button — pop animation on like. */
export function LikeButtonView({
  liked,
  onChange,
  count,
  size,
  color,
  className = '',
}: LikeButtonViewProps) {
  const base = useButtonBase(size, { color });
  const accent = color ?? 'var(--color-error)';
  const [popping, setPopping] = useState(false);

  const handleClick = () => {
    const next = !liked;
    onChange(next);
    if (next) { setPopping(true); setTimeout(() => setPopping(false), 320); }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`dui_likebtn ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: 'none', background: 'transparent', cursor: 'pointer', padding: 2 }}
      aria-pressed={liked}
    >
      <span className={popping ? 'dui_likebtn__icon dui_likebtn__icon--pop' : 'dui_likebtn__icon'} style={{ display: 'flex', color: liked ? accent : 'var(--color-text-muted)' }}>
        <HeartIcon size={base.iconSize + 2} fill={liked ? accent : 'none'} stroke={liked ? accent : 'currentColor'} />
      </span>
      {count !== undefined && <span style={{ fontSize: base.fontSize, fontWeight: 600, color: 'var(--color-text-secondary)' }}>{count}</span>}
    </button>
  );
}
