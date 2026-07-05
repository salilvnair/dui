import { useState } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useButtonBase } from '../../core/ButtonBase';
import { BookmarkIcon } from '../../../icons';
import './LikeButtonView.css';

export interface BookmarkButtonViewProps {
  saved: boolean;
  onChange: (saved: boolean) => void;
  size?: DuiSize;
  color?: string;
  className?: string;
}

/** Animated bookmark/save toggle button. */
export function BookmarkButtonView({
  saved,
  onChange,
  size,
  color,
  className = '',
}: BookmarkButtonViewProps) {
  const base = useButtonBase(size, { color });
  const accent = color ?? base.defaultColor ?? 'var(--color-primary)';
  const [popping, setPopping] = useState(false);

  const handleClick = () => {
    const next = !saved;
    onChange(next);
    if (next) { setPopping(true); setTimeout(() => setPopping(false), 320); }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', border: 'none', background: 'transparent', cursor: 'pointer', padding: 2 }}
      aria-pressed={saved}
      aria-label={saved ? 'Remove bookmark' : 'Add bookmark'}
    >
      <span className={popping ? 'dui_likebtn__icon dui_likebtn__icon--pop' : 'dui_likebtn__icon'} style={{ display: 'flex', color: saved ? accent : 'var(--color-text-muted)' }}>
        <BookmarkIcon size={base.iconSize + 2} fill={saved ? accent : 'none'} stroke={saved ? accent : 'currentColor'} />
      </span>
    </button>
  );
}
