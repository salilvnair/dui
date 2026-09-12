import { useState } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useButtonBase } from '../../core/ButtonBase';

export interface FollowButtonViewProps {
  /**
   * A stable hook for tests and automation.
   *
   * Lands on this component's root element as `data-testid`. Worth setting on
   * anything a test drives: several dui inputs render a `contenteditable` div
   * with a decorative placeholder span, which neither `getByPlaceholder` nor
   * `getByRole` reliably finds.
   */
  testId?: string;

  following: boolean;
  onChange: (following: boolean) => void;
  size?: DuiSize;
  color?: string;
  className?: string;
}

/** Follow/following state-toggle button — swaps label + style, "Unfollow" on hover while following. */
export function FollowButtonView({ testId,
  following,
  onChange,
  size,
  color,
  className = '',
}: FollowButtonViewProps) {
  const base = useButtonBase(size, { color });
  const accent = color ?? base.defaultColor ?? 'var(--color-primary)';
  const [hover, setHover] = useState(false);

  const label = following ? (hover ? 'Unfollow' : 'Following') : 'Follow';

  return (
    <button data-testid={testId}
      type="button"
      onClick={() => onChange(!following)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={className}
      style={{
        height: base.height, paddingLeft: base.paddingX, paddingRight: base.paddingX,
        borderRadius: base.borderRadius, fontSize: base.fontSize, fontWeight: 700,
        cursor: 'pointer', minWidth: 92, transition: 'background 140ms, border-color 140ms, color 140ms',
        border: following ? `1px solid ${hover ? 'var(--color-error)' : 'var(--color-surface-border)'}` : `1px solid ${accent}`,
        background: following ? 'transparent' : accent,
        color: following ? (hover ? 'var(--color-error)' : 'var(--color-text-primary)') : 'var(--color-btn-primary-text, #fff)',
      }}
    >
      {label}
    </button>
  );
}
