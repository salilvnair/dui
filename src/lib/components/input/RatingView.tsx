import { useState, type CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDui } from '../../core/DuiContext';
import { DUI_ICON_SIZE } from '../../core/DuiTokens';

export interface RatingViewProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  /** Allow selecting half steps (e.g. 3.5). Default false. */
  allowHalf?: boolean;
  readOnly?: boolean;
  size?: DuiSize;
  color?: string;
  icon?: 'star' | 'heart';
  className?: string;
  style?: CSSProperties;
}

function Glyph({ filled, half, icon, size, color }: { filled: boolean; half: boolean; icon: 'star' | 'heart'; size: number; color: string }) {
  const emptyColor = 'color-mix(in srgb, var(--color-text-muted) 35%, transparent)';
  const path = icon === 'star'
    ? 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z'
    : 'M12 21s-7.5-4.5-10-9.2C.5 8.5 2.5 5 6 5c2 0 3.5 1 4 2 .5-1 2-2 4-2 3.5 0 5.5 3.5 4 6.8-2.5 4.7-10 9.2-10 9.2z';
  const gradId = `dui-rating-half-${Math.random().toString(36).slice(2)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {half && (
        <defs>
          <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor={color} />
            <stop offset="50%" stopColor={emptyColor} />
          </linearGradient>
        </defs>
      )}
      <path d={path} fill={half ? `url(#${gradId})` : filled ? color : emptyColor} />
    </svg>
  );
}

export function RatingView({
  value,
  onChange,
  max = 5,
  allowHalf = false,
  readOnly = false,
  size,
  color,
  icon = 'star',
  className = '',
  style,
}: RatingViewProps) {
  const ctx = useDui();
  const s = size ?? ctx.size;
  const iconSize = DUI_ICON_SIZE[s] * 1.6;
  const accent = color ?? ctx.activeColor ?? 'var(--color-warning)';
  const [hover, setHover] = useState<number | null>(null);

  const display = hover ?? value;

  const handleClick = (idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (readOnly || !onChange) return;
    let v = idx + 1;
    if (allowHalf) {
      const rect = e.currentTarget.getBoundingClientRect();
      const half = e.clientX - rect.left < rect.width / 2;
      v = idx + (half ? 0.5 : 1);
    }
    onChange(v);
  };

  const handleMove = (idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (readOnly) return;
    if (!allowHalf) { setHover(idx + 1); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    const half = e.clientX - rect.left < rect.width / 2;
    setHover(idx + (half ? 0.5 : 1));
  };

  return (
    <div
      className={className}
      style={{ display: 'inline-flex', gap: 2, ...style }}
      onMouseLeave={() => setHover(null)}
    >
      {Array.from({ length: max }, (_, i) => {
        const filled = display >= i + 1;
        const half = allowHalf && !filled && display >= i + 0.5;
        return (
          <button
            key={i}
            type="button"
            disabled={readOnly}
            onClick={e => handleClick(i, e)}
            onMouseMove={e => handleMove(i, e)}
            style={{
              border: 'none',
              background: 'transparent',
              padding: 1,
              cursor: readOnly ? 'default' : 'pointer',
              display: 'flex',
              lineHeight: 0,
            }}
            aria-label={`Rate ${i + 1} of ${max}`}
          >
            <Glyph filled={filled} half={half} icon={icon} size={iconSize} color={accent} />
          </button>
        );
      })}
    </div>
  );
}
