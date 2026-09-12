import { SparkleIcon, SpinnerIcon } from '../../../icons';
import type { DuiSize, DuiRadius, DuiWidth, DuiFontStyle } from '../../core/DuiTypes';
import { useButtonBase } from '../../core/ButtonBase';
import { useDui } from '../../core/DuiContext';
import { ActionButtonView } from './ActionButtonView';
import './AIButtonView.css';

export type AIButtonAction = 'generate' | 'fuzz' | 'explain' | 'fix' | 'ask' | 'suggest';

export interface AIButtonViewProps {
  /**
   * A stable hook for tests and automation.
   *
   * Lands on this component's root element as `data-testid`. Worth setting on
   * anything a test drives: several dui inputs render a `contenteditable` div
   * with a decorative placeholder span, which neither `getByPlaceholder` nor
   * `getByRole` reliably finds.
   */
  testId?: string;

  action?: AIButtonAction;
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  disabled?: boolean;
  /** Falls back to DuiProvider size when omitted. */
  size?: DuiSize;
  /** Shorthand for size="sm" — kept for backwards compat. */
  compact?: boolean;
  accentColor?: string;
  className?: string;
  // ─── DUI container props ───────────────────────────────────────────────────
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
  fontStyle?: DuiFontStyle;
}

const ACTION_LABEL: Record<AIButtonAction, string> = {
  generate: 'Generate',
  fuzz:     'Fuzz',
  explain:  'Explain',
  fix:      'Fix',
  ask:      'Ask AI',
  suggest:  'Suggest',
};

export function AIButtonView({ testId,
  action = 'ask',
  label,
  onClick,
  loading = false,
  disabled = false,
  size,
  compact = false,
  accentColor,
  className = '',
  width,
  borderRadius,
  color,
  fontStyle,
}: AIButtonViewProps) {
  const ctx = useDui();
  // `compact` maps to 'xs' (20px); an explicit `size` wins over it.
  const resolvedSize: DuiSize | undefined = size ?? (compact ? 'xs' : undefined);
  const base = useButtonBase(resolvedSize, { width, borderRadius, color, fontStyle });

  /*
    The box lives in `ActionButtonView` now, and this is that box with a
    sparkle in it.

    It used to be a hundred lines of its own, which meant a plain action
    button beside one could only be a different component with a different
    look — and the day the tint or the hover changed here, nothing else would
    follow. One implementation, two faces.
  */
  return (
    <ActionButtonView testId={testId}
      onClick={onClick}
      disabled={disabled || loading}
      size={resolvedSize}
      accentColor={accentColor || ctx.defaultColor || 'var(--color-protocol-ai)'}
      className={className}
      width={width}
      borderRadius={borderRadius}
      color={color}
      fontStyle={fontStyle}
      icon={loading
        ? <SpinnerIcon size={base.iconSize} style={{ flexShrink: 0 }} />
        : <SparkleIcon size={base.iconSize} style={{ flexShrink: 0 }} />}
      label={loading ? 'Thinking…' : (label ?? ACTION_LABEL[action])}
    />
  );
}
