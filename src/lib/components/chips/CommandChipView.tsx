import { useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useButtonBase } from '../../core/ButtonBase';
import './CommandChipView.css';

export interface CommandChipViewProps {
  /** The command text — also what is copied to the clipboard on click. */
  command: string;
  /** DUI size — shares the SAME height/padding/font tokens as ButtonView, so a
   *  `CommandChipView` and a `ButtonView` at the same `size` line up pixel-for
   *  pixel (e.g. put a Run button next to a command chip). Falls back to the
   *  DuiProvider context size when omitted. */
  size?: DuiSize;
  /** Text + border accent (CSS var or raw value). Defaults to the DUI context
   *  color, then a neutral token. */
  color?: string;
  /** Confirmation text shown briefly after a successful copy. */
  copiedLabel?: string;
  /** Set false to render a plain, non-interactive command pill (no copy). */
  copyable?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * CommandChipView — a monospace command pill that copies itself to the
 * clipboard on click. Sized through the shared button-metric system
 * (`useButtonBase`) so it is guaranteed the same height as a `ButtonView` of
 * the same `size`. Degrades to a plain, selectable pill when the Clipboard API
 * is unavailable (non-secure context).
 */
export function CommandChipView({
  command,
  size,
  color,
  copiedLabel = 'copied ✓',
  copyable = true,
  className = '',
  style,
}: CommandChipViewProps) {
  const base = useButtonBase(size);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const copy = () => {
    if (!copyable) return;
    try {
      void navigator.clipboard.writeText(command);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable — the visible text is still selectable.
    }
  };

  const accent = color || base.color || 'var(--color-text-primary)';

  return (
    <button
      type="button"
      onClick={copy}
      title={copyable ? 'Copy command' : undefined}
      className={`dui_command_chip inline-flex items-center select-none ${copyable ? 'cursor-pointer' : 'cursor-default'} ${className}`}
      style={{
        height: base.height,
        paddingLeft: base.paddingX,
        paddingRight: base.paddingX,
        fontSize: base.fontSize,
        borderRadius: base.borderRadius,
        fontFamily: 'var(--dui-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace)',
        border: '1px solid var(--color-elevated-border, var(--color-btn-secondary-border, #374151))',
        background: 'var(--color-elevated, var(--color-btn-secondary-bg, #111827))',
        color: copied ? 'var(--color-success, #059669)' : accent,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {copied ? copiedLabel : command}
    </button>
  );
}
