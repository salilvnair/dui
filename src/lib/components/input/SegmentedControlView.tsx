/**
 * SegmentedControlView — pill-shaped segmented control (toggle group) with a
 * solid sliding indicator and a springy "bounce" transition between segments.
 *
 * Uses DUI TabBase for sizing so heights match SelectInputView and ButtonView
 * at every size, and inherits width/borderRadius/color from DuiProvider like
 * every other DUI component.
 */
import { useRef, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { DuiSize, DuiRadius, DuiWidth } from '../../core/DuiTypes';
import { useTabBase } from '../../core/TabBase';
import './SegmentedControlView.css';

export type SegmentedControlVariant = 'pill' | 'rounded' | 'pointy';

export interface SegmentedControlOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlViewProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  size?: DuiSize;
  /** Shape of the track/indicator. 'pill' = fully rounded ends (iOS default), 'rounded' = size-based radius, 'pointy' = sharp square corners. Default 'pill'. */
  variant?: SegmentedControlVariant;
  /** Solid fill color of the active indicator. */
  accentColor?: string;
  /** Stretch to fill container width, segments share it equally. */
  fullWidth?: boolean;
  width?: DuiWidth;
  /** Explicit radius override — takes precedence over `variant`. */
  borderRadius?: DuiRadius | number;
  /** Inactive label text color override. */
  color?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const VARIANT_RADIUS: Record<SegmentedControlVariant, DuiRadius> = {
  pill: 'full',
  rounded: 'md',
  pointy: 'none',
};

export function SegmentedControlView({
  options,
  value,
  onChange,
  size,
  variant = 'pill',
  accentColor = 'var(--color-primary)',
  fullWidth,
  width,
  borderRadius,
  color,
  disabled = false,
  className = '',
  style,
}: SegmentedControlViewProps) {
  const resolvedRadius = borderRadius ?? VARIANT_RADIUS[variant];
  const base = useTabBase(size, { width, borderRadius: resolvedRadius, color });
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const [bounce, setBounce] = useState(false);
  const mounted = useRef(false);

  const activeIdx = options.findIndex(o => o.value === value);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const btns = container.querySelectorAll<HTMLButtonElement>('button[data-seg]');
    const btn = btns[activeIdx];
    if (!btn) return;
    setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [activeIdx]);

  useEffect(() => {
    measure();
    if (mounted.current) {
      setBounce(true);
      const t = setTimeout(() => setBounce(false), 360);
      return () => clearTimeout(t);
    }
    mounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, activeIdx, options.length]);

  // The indicator must re-measure whenever the CONTAINER's size changes for
  // any reason, not just a literal browser-window resize — a SplitPanelView
  // drag, a popover repositioning, a sidebar collapse/expand, or a parent
  // flex reflow all resize this control without ever firing `window`'s
  // resize event, which previously left the sliding pill positioned from a
  // stale measurement (visibly floating between two segments after any such
  // reflow). ResizeObserver catches all of these; the window listener stays
  // as a cheap fallback for environments without it.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => measure());
      ro.observe(container);
      return () => ro.disconnect();
    }
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;
    const enabled = options.filter(o => !o.disabled);
    if (!enabled.length) return;
    const curIdx = enabled.findIndex(o => o.value === value);
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      onChange(enabled[(curIdx + 1) % enabled.length].value);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onChange(enabled[(curIdx - 1 + enabled.length) % enabled.length].value);
    }
  }, [disabled, options, value, onChange]);

  const TRACK_PADDING = 3;
  const trackRadius = variant === 'pointy'
    ? base.borderRadius
    : `calc(${base.borderRadius} + ${TRACK_PADDING}px)`;

  return (
    <div
      ref={containerRef}
      role="tablist"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKey}
      className={`dui_segctrl ${className}`}
      style={{
        display: 'inline-flex',
        position: 'relative',
        height: base.height,
        padding: TRACK_PADDING,
        borderRadius: trackRadius,
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-surface-border)',
        width: fullWidth ? '100%' : base.width,
        boxSizing: 'border-box',
        flexShrink: 0,
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        outline: 'none',
        ...style,
      }}
    >
      {indicator.width > 0 && (
        <div
          aria-hidden="true"
          className={`dui_segctrl__indicator${bounce ? ' dui_segctrl__indicator--bounce' : ''}`}
          style={{
            position: 'absolute',
            top: TRACK_PADDING,
            left: indicator.left,
            width: indicator.width,
            height: `calc(100% - ${TRACK_PADDING * 2}px)`,
            borderRadius: base.borderRadius,
            // Translucent accent wash + hairline, not a solid block — the
            // active segment should read as highlighted, not glow like a CTA.
            backgroundColor: `color-mix(in srgb, ${accentColor} 22%, transparent)`,
            border: `1px solid color-mix(in srgb, ${accentColor} 45%, transparent)`,
            boxSizing: 'border-box',
            boxShadow: `0 1px 4px color-mix(in srgb, ${accentColor} 15%, transparent)`,
          }}
        />
      )}

      {options.map(opt => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            data-seg="1"
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={opt.disabled}
            onClick={() => !opt.disabled && opt.value !== value && onChange(opt.value)}
            className="dui_segctrl__seg"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: base.gap,
              paddingLeft: base.paddingX,
              paddingRight: base.paddingX,
              fontSize: base.fontSize,
              fontWeight: isActive ? 700 : 500,
              height: '100%',
              border: 'none',
              background: 'transparent',
              // Accent-tinted label on the translucent indicator — readable on
              // both themes without the white-on-solid-accent glare.
              color: isActive ? accentColor : (base.color ?? 'var(--color-text-secondary)'),
              cursor: opt.disabled ? 'not-allowed' : 'pointer',
              opacity: opt.disabled ? 0.35 : 1,
              position: 'relative',
              zIndex: 1,
              // Flex items default to `min-width: auto`, which resolves to
              // their unwrapped content width — at `flex: 1` that silently
              // overrides flex-shrink and lets the whole row (and its
              // longest label, e.g. "Intermediate"/"Advanced") overflow the
              // control's own width instead of shrinking to fit, so a
              // narrower parent (a popover, a collapsed sidebar, a phone
              // viewport) clipped the tail of the last segment against
              // whatever ancestor had `overflow: hidden`. `minWidth: 0`
              // is the standard fix — it lets flex-shrink actually apply.
              minWidth: 0,
              userSelect: 'none',
            }}
          >
            {opt.icon}
            {/* overflow/textOverflow live on this span, not the button —
                the button needs `display:flex` for icon+label centering,
                and text-overflow only applies to block/inline-block boxes.
                `minWidth: 0` here too: nested flex/block children need
                their own opt-out of the same auto-min-content floor. */}
            <span
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                minWidth: 0,
              }}
            >
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
