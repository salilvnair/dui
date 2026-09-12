import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize, DuiRadius, DuiWidth } from '../../core/DuiTypes';
import { useInputBase } from '../../core/InputBase';
import { CalendarView, type IsoDate } from './CalendarView';
import { CalendarIcon } from '../../../icons';

export interface DateInputViewProps {
  /**
   * A stable hook for tests and automation.
   *
   * Lands on this component's root element as `data-testid`. Worth setting on
   * anything a test drives: several dui inputs render a `contenteditable` div
   * with a decorative placeholder span, which neither `getByPlaceholder` nor
   * `getByRole` reliably finds.
   */
  testId?: string;

  value: IsoDate | null;
  onChange: (value: IsoDate) => void;
  placeholder?: string;
  minDate?: IsoDate;
  maxDate?: IsoDate;
  size?: DuiSize;
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function formatDisplay(iso: IsoDate | null): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function DateInputView({ testId,
  value,
  onChange,
  placeholder = 'Select date…',
  minDate,
  maxDate,
  size,
  width,
  borderRadius,
  color,
  disabled = false,
  className = '',
  style,
}: DateInputViewProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const base = useInputBase(size, { width, borderRadius, color });
  const accent = color ?? 'var(--color-accent, var(--color-primary))';

  useEffect(() => {
    if (!open || !triggerRef.current || !popRef.current) return;
    const trigger = triggerRef.current;
    const pop = popRef.current;
    const position = () => {
      const r = trigger.getBoundingClientRect();
      pop.style.top = `${r.bottom + 6}px`;
      pop.style.left = `${Math.min(r.left, window.innerWidth - pop.offsetWidth - 8)}px`;
    };
    position();
    const raf = requestAnimationFrame(position);
    window.addEventListener('scroll', position, { passive: true, capture: true });
    window.addEventListener('resize', position, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', position, { capture: true });
      window.removeEventListener('resize', position);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (triggerRef.current?.contains(e.target as Node)) return;
      if (popRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div data-testid={testId} className={`relative inline-block ${className}`} style={style}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: base.gap,
          width: base.width,
          height: base.height,
          paddingLeft: base.paddingX,
          paddingRight: base.paddingX,
          fontSize: base.fontSize,
          background: 'var(--color-input-bg)',
          border: `1px solid ${open ? accent : 'var(--color-input-border)'}`,
          borderRadius: base.borderRadius,
          color: value ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
          cursor: disabled ? 'default' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'border-color 140ms',
          fontFamily: 'inherit',
          textAlign: 'left',
        }}
      >
        <CalendarIcon size={base.iconSize} style={{ flexShrink: 0, color: 'var(--color-text-muted)' }} />
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value ? formatDisplay(value) : placeholder}
        </span>
      </button>

      {open && createPortal(
        <div
          ref={popRef}
          style={{
            position: 'fixed',
            zIndex: 99999,
            boxShadow: '0 12px 40px rgba(0,0,0,.35)',
            borderRadius: 12,
          }}
        >
          <CalendarView
            mode="single"
            value={value}
            onChange={v => { onChange(v as IsoDate); setOpen(false); }}
            minDate={minDate}
            maxDate={maxDate}
            size={size}
            color={color}
          />
        </div>,
        document.body
      )}
    </div>
  );
}
