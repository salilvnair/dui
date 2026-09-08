import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useChipBase } from '../../core/ChipBase';

/** `'xs'` is a sub-sm alias kept for dense protocol badges. */
export type ChipViewSize = 'xs' | DuiSize;

export interface ChipViewProps {
  label: string;
  /** Leading glyph — pass a DUI icon component (e.g. `<TargetGoalIcon size={12} />`),
   *  never an emoji. Sized/colored by the caller; the chip just positions it. */
  icon?: ReactNode;
  /** CSS variable or raw color value — drives text, border, and auto-derived bg */
  color?: string;
  /** Override background explicitly instead of deriving from color */
  bg?: string;
  /** Size — falls back to DuiProvider context when omitted (resolves to 'sm' equivalent). */
  size?: ChipViewSize;
  /** true = rounded-full (default), false = token border-radius */
  rounded?: boolean;
  onClick?: () => void;
  /**
   * Makes the chip removable: a dismiss control **inside** the chip, after the
   * label.
   *
   * Inside, not beside. A remove button placed next to the chip is a second
   * object that has to be kept aligned to it, and it comes apart the moment the
   * row wraps or the size changes — so the chip owns it.
   */
  onRemove?: () => void;
  /** Screen-reader name for the dismiss control. Defaults to `Remove <label>`. */
  removeLabel?: string;
  /**
   * Cap the label and end it with an ellipsis past that width.
   *
   * A tag, a filename or a header value can be arbitrarily long, and one long
   * chip in a wrapping row otherwise stretches the whole way across and pushes
   * every chip after it onto a line of its own. The full text stays in the
   * tooltip, which is what makes truncating it safe.
   */
  maxLabelWidth?: number | string;
  /** Filled background instead of translucent */
  active?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Tooltip. Defaults to the label. */
  title?: string;
}

const XS = { height: '16px', px: '5px', fontSize: '9px' };

export function ChipView({
  label,
  icon,
  color,
  bg,
  size,
  rounded = true,
  onClick,
  onRemove,
  removeLabel,
  maxLabelWidth,
  active = false,
  className = '',
  style,
  title,
}: ChipViewProps) {
  // 'xs' bypasses the size system — it's a fixed sub-sm preset for dense badges.
  const isXs = size === 'xs';
  // For DuiSize values (sm/md/lg/xl) or undefined (inherits from context), use the base hook.
  const base = useChipBase(isXs ? 'sm' : (size as DuiSize | undefined));
  const { height, px, fontSize } = isXs
    ? XS
    : { height: base.height, px: base.paddingX, fontSize: base.fontSize };

  const accent = color || 'var(--color-primary)';
  const borderRadius = rounded ? '9999px' : '4px';

  const background = active
    ? accent
    : (bg || `color-mix(in srgb, ${accent} 12%, transparent)`);
  const textColor = active ? 'var(--color-chip-active-text)' : accent;
  const borderColor = `color-mix(in srgb, ${accent} 30%, transparent)`;

  return (
    <span
      className={`inline-flex items-center font-semibold tracking-wide select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      title={title ?? label}
      style={{
        height,
        paddingLeft: px,
        // The dismiss control carries its own right-hand breathing room, so the
        // padding halves rather than stacking with it.
        paddingRight: onRemove ? `calc(${px} / 2)` : px,
        gap: icon ? '5px' : 0,
        fontSize,
        borderRadius,
        background,
        color: textColor,
        border: `1px solid ${borderColor}`,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        transition: 'all 120ms ease',
        ...style,
      }}
      onClick={onClick}
    >
      {icon && <span style={{ display: 'inline-flex', flexShrink: 0 }}>{icon}</span>}
      <span
        style={maxLabelWidth
          ? {
              maxWidth: typeof maxLabelWidth === 'number' ? `${maxLabelWidth}px` : maxLabelWidth,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }
          : undefined}
      >
        {label}
      </span>
      {onRemove && (
        <button
          type="button"
          aria-label={removeLabel ?? `Remove ${label}`}
          onClick={e => { e.stopPropagation(); onRemove(); }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '4px',
            padding: 0,
            width: '13px',
            height: '13px',
            flexShrink: 0,
            border: 'none',
            borderRadius: '9999px',
            background: 'transparent',
            color: 'inherit',
            opacity: 0.62,
            cursor: 'pointer',
            transition: 'opacity 120ms ease, background 120ms ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.background = 'color-mix(in srgb, currentColor 22%, transparent)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '0.62';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="3" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      )}
    </span>
  );
}
