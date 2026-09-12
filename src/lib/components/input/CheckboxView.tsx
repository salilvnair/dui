import type { CSSProperties } from 'react';
import { CheckIcon } from '../../../icons';
import type { DuiSize } from '../../core/DuiTypes';
import { useDui } from '../../core/DuiContext';
import { DUI_CHECKBOX, DUI_FONT_SIZE } from '../../core/DuiTokens';

const DUI_SIZES: DuiSize[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'];

/** @deprecated Use `DuiSize` directly. */
export type CheckboxSize = DuiSize;

export interface CheckboxViewProps {
  /**
   * A stable hook for tests and automation.
   *
   * Lands on this component's root element as `data-testid`. Worth setting on
   * anything a test drives: several dui inputs render a `contenteditable` div
   * with a decorative placeholder span, which neither `getByPlaceholder` nor
   * `getByRole` reliably finds.
   */
  testId?: string;

  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  /** Falls back to DuiProvider size when omitted. */
  size?: DuiSize;
  accentColor?: string;
  label?: string;
  className?: string;
}

export function CheckboxView({ testId,
  checked,
  onChange,
  disabled = false,
  indeterminate = false,
  size,
  accentColor,
  label,
  className = '',
}: CheckboxViewProps) {
  const ctx = useDui();
  const s = size ?? ctx.size;
  const accent = accentColor || 'var(--color-primary)';
  const { box, icon } = DUI_CHECKBOX[s];
  // Label font is one size step smaller than the checkbox box size for compact look
  const labelS = DUI_SIZES[Math.max(0, DUI_SIZES.indexOf(s) - 1)];
  const font = DUI_FONT_SIZE[labelS];
  const isActive = checked || indeterminate;

  const boxStyle: CSSProperties = {
    width: box,
    height: box,
    borderRadius: 3,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background 120ms, border-color 120ms',
    border: isActive
      ? 'none'
      : `1.5px solid color-mix(in srgb, var(--color-text-primary) 28%, transparent)`,
    background: isActive ? accent : 'transparent',
    opacity: disabled ? 0.5 : 1,
  };

  const box_ = (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      style={boxStyle}
      className={className}
    >
      {indeterminate ? (
        <span style={{ width: icon - 2, height: 2, background: 'var(--color-surface)', borderRadius: 1 }} />
      ) : checked ? (
        <CheckIcon size={icon} style={{ color: 'var(--color-surface)', strokeWidth: 3 }} />
      ) : null}
    </button>
  );

  if (!label) return box_;

  return (
    <div data-testid={testId}
      style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: disabled ? 'not-allowed' : 'pointer' }}
      onClick={() => !disabled && onChange?.(!checked)}
    >
      {box_}
      <span style={{ fontSize: font, color: disabled ? 'var(--color-text-muted)' : 'var(--color-text-secondary)', userSelect: 'none' }}>
        {label}
      </span>
    </div>
  );
}
