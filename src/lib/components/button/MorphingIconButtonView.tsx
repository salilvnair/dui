import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useButtonBase } from '../../core/ButtonBase';

export type MorphIconPreset = 'play-pause' | 'menu-close' | 'sun-moon';

export interface MorphingIconButtonViewProps {
  preset: MorphIconPreset;
  active: boolean;
  onClick: () => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const PATHS: Record<MorphIconPreset, [string, string]> = {
  'play-pause': [
    'M6 4 L6 20 L6 20 L6 4 L20 12 Z M6 4 L6 20',
    'M6 4 L9 4 L9 20 L6 20 Z M15 4 L18 4 L18 20 L15 20 Z',
  ],
  'menu-close': [
    'M4 6 L20 6 M4 12 L20 12 M4 18 L20 18',
    'M6 6 L18 18 M18 6 L6 18 M12 12 L12 12',
  ],
  'sun-moon': [
    'M12 5 A7 7 0 1 1 11.9 5 Z',
    'M12 3 A9 9 0 1 0 21 12 A7 7 0 0 1 12 3 Z',
  ],
};

/** The icon itself SVG-path-morphs between two states instead of a crossfade/swap. */
export function MorphingIconButtonView({
  preset,
  active,
  onClick,
  size,
  color,
  className = '',
  style,
}: MorphingIconButtonViewProps) {
  const base = useButtonBase(size, { color });
  const accent = color ?? 'var(--color-text-primary)';
  const [off, on] = PATHS[preset];
  const iconSize = base.iconSize;

  return (
    <button
      onClick={onClick}
      className={className}
      aria-pressed={active}
      style={{
        width: base.height, height: base.height, borderRadius: base.borderRadius, border: 'none',
        background: 'transparent', color: accent, cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        ...style,
      }}
    >
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={preset === 'sun-moon' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d={active ? on : off} style={{ transition: 'd 320ms cubic-bezier(0.4, 0, 0.2, 1)' }} />
      </svg>
    </button>
  );
}
