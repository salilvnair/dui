/**
 * The tinted pill the AI buttons are made of, without the AI.
 *
 * `AIButtonView` had a look nothing else could wear: a 10%-tint fill, a
 * 35%-tint border, the hover and press it comes with — and a sparkle welded
 * on. So a plain action sitting in the same row as three AI buttons had to be
 * a `ButtonView`, which is a different object: heavier fill, different border,
 * different weight. Four buttons on one line, one of them visibly not of the
 * set.
 *
 * This is that box on its own, with an optional icon. `AIButtonView` is now
 * this plus a sparkle, so the two cannot drift: one of them changing shape
 * without the other is not expressible.
 */
import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize, DuiRadius, DuiWidth, DuiFontStyle } from '../../core/DuiTypes';
import { useButtonBase } from '../../core/ButtonBase';
import { useDui, resolveBorderRadius } from '../../core/DuiContext';
import './AIButtonView.css';

export interface ActionButtonViewProps {
  label?: ReactNode;
  children?: ReactNode;
  /**
   * Rendered before the label.
   *
   * A function receives the size's own icon size, which is how it ends up
   * identical to the sparkle on an `AIButtonView` beside it — passing a node
   * with a hand-picked size is how two buttons in one row come to disagree by
   * a pixel.
   */
  icon?: ReactNode | ((iconSize: number) => ReactNode);
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  title?: string;
  /** Falls back to the DuiProvider size when omitted. */
  size?: DuiSize;
  /**
   * The tone the fill, border and text are mixed from.
   *
   * Defaults to the provider's colour rather than to the AI accent: this
   * button belongs to whatever surface it sits on.
   */
  accentColor?: string;
  className?: string;
  // ─── DUI container props ───────────────────────────────────────────────────
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
  fontStyle?: DuiFontStyle;
}

export function ActionButtonView({
  label,
  children,
  icon,
  onClick,
  disabled = false,
  title,
  size,
  accentColor,
  className = '',
  width,
  borderRadius,
  color,
  fontStyle,
}: ActionButtonViewProps) {
  const ctx = useDui();
  const base = useButtonBase(size, { width, borderRadius, color, fontStyle });
  const accent = accentColor || ctx.defaultColor;
  const resolvedRadius = resolveBorderRadius(borderRadius ?? ctx.borderRadius, '5px');

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      /*
        Both classes: `dui_action-button` is the shape, `dui_ai-button` is the
        selector the stylesheet and any app-level override already target.
      */
      className={`dui_action-button dui_ai-button ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: base.gap,
        height: base.height,
        width: base.width !== 'auto' ? base.width : undefined,
        paddingLeft: base.paddingX,
        paddingRight: base.paddingX,
        borderRadius: resolvedRadius,
        color: base.color || (accent ? accent : 'var(--color-aibtn-text)'),
        fontSize: base.fontSize,
        fontWeight: 600,
        fontStyle: base.fontStyle,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        letterSpacing: '0.01em',
        fontFamily: 'inherit',
        // Resting fill and border as CSS vars, so the class's :hover rule can
        // override them without knowing the accent.
        '--dui-aibtn-bg': accent
          ? `color-mix(in srgb, ${accent} 10%, transparent)`
          : 'var(--color-aibtn-bg)',
        '--dui-aibtn-border-color': accent
          ? `color-mix(in srgb, ${accent} 35%, transparent)`
          : 'var(--color-aibtn-border)',
        '--dui-aibtn-hover-bg': accent
          ? `color-mix(in srgb, ${accent} 10%, var(--color-surface))`
          : `color-mix(in srgb, var(--color-protocol-ai) 10%, var(--color-surface))`,
        '--dui-aibtn-hover-border': accent
          ? `color-mix(in srgb, ${accent} 45%, var(--color-surface-border))`
          : `color-mix(in srgb, var(--color-protocol-ai) 45%, var(--color-surface-border))`,
      } as CSSProperties}
    >
      {typeof icon === 'function' ? icon(base.iconSize) : icon}
      {label ?? children}
    </button>
  );
}
