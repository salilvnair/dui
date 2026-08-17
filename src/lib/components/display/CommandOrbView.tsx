import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useButtonBase } from '../../core/ButtonBase';
import './CommandOrbView.css';

export type CommandOrbState = 'idle' | 'thinking' | 'speaking' | 'open';

export interface CommandOrbViewProps {
  state: CommandOrbState;
  onClick?: () => void;
  /** Glyph rendered inside the orb itself. Shown while `idle`/`open` — the
   *  `thinking` ripple and `speaking` waveform own the orb interior instead. */
  icon?: ReactNode;
  /** Rendered inside an expanded panel below the orb when `state === 'open'`. */
  panel?: ReactNode;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const DIAMETER: Record<DuiSize, number> = {
  xxs: 28, xs: 32, sm: 36, md: 44, lg: 52, xl: 60, xxl: 68, xxxl: 76,
};

/** Floating, breathing circular AI-assistant orb — idle pulse → thinking ripple → speaking waveform, expands into a chat panel. */
export function CommandOrbView({
  state,
  onClick,
  icon,
  panel,
  size,
  color,
  className = '',
  style,
}: CommandOrbViewProps) {
  const base = useButtonBase(size, { color });
  const s = size ?? 'lg';
  const diameter = DIAMETER[s] ?? DIAMETER.lg;
  const accent = color ?? 'var(--color-primary)';

  return (
    <div className={className} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10, ...style }}>
      <button
        onClick={onClick}
        className={`dui_orb ${state === 'idle' ? 'dui_orb--idle' : ''}`}
        style={{
          width: diameter, height: diameter,
          background: `radial-gradient(circle at 35% 30%, color-mix(in srgb, ${accent} 70%, white), ${accent})`,
          color: accent,
          boxShadow: `0 4px 16px color-mix(in srgb, ${accent} 40%, transparent)`,
        }}
      >
        {/* No rotate-on-open here: the glyph is caller-supplied and arbitrary,
            and spinning e.g. a lightning bolt just makes it unreadable. A
            gentle scale reads as "active" for any glyph. */}
        {icon && (state === 'idle' || state === 'open') && (
          <span className="dui_orb__icon" style={{ transform: state === 'open' ? 'scale(0.88)' : undefined }}>
            {icon}
          </span>
        )}
        {state === 'thinking' && <span className="dui_orb__ripple" />}
        {state === 'speaking' && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 2, height: diameter * 0.4 }}>
            {[0, 1, 2, 3].map(i => (
              <span key={i} className="dui_orb__bar" style={{ height: '100%', animationDelay: `${i * 120}ms` }} />
            ))}
          </span>
        )}
      </button>
      {state === 'open' && panel && (
        <div style={{ borderRadius: base.borderRadius, border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)', minWidth: 240, padding: 12 }}>
          {panel}
        </div>
      )}
    </div>
  );
}
