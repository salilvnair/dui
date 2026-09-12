import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { CheckboxView } from './CheckboxView';
import { useToggleBase } from '../../core/ToggleBase';

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface ChecklistViewProps {
  /**
   * A stable hook for tests and automation.
   *
   * Lands on this component's root element as `data-testid`. Worth setting on
   * anything a test drives: several dui inputs render a `contenteditable` div
   * with a decorative placeholder span, which neither `getByPlaceholder` nor
   * `getByRole` reliably finds.
   */
  testId?: string;

  items: ChecklistItem[];
  onToggle: (id: string) => void;
  size?: DuiSize;
  accentColor?: string;
  className?: string;
  style?: CSSProperties;
}

/** Todo-style checklist — strikethrough + faded once complete. */
export function ChecklistView({ testId,
  items,
  onToggle,
  size,
  accentColor,
  className = '',
  style,
}: ChecklistViewProps) {
  const base = useToggleBase(size, { activeColor: accentColor });
  const accent = accentColor ?? base.activeColor ?? 'var(--color-primary)';

  return (
    <div data-testid={testId} className={className} style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      {items.map(item => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: item.checked ? 0.55 : 1, transition: 'opacity 140ms' }}>
          <CheckboxView checked={item.checked} onChange={() => onToggle(item.id)} size={size} accentColor={accent} />
          <span
            style={{
              fontSize: base.fontSize, color: 'var(--color-text-primary)',
              textDecoration: item.checked ? 'line-through' : 'none',
              cursor: 'pointer',
            }}
            onClick={() => onToggle(item.id)}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
