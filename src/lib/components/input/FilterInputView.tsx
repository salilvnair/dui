/**
 * A text box that narrows a list, and says so while it is doing it.
 *
 * The ordinary way to build one of these is a plain input with a placeholder
 * reading "Filter pods" — which works exactly until somebody types in it. The
 * placeholder is the only thing identifying the control, and typing is what
 * removes it, so the state where filtering is actually happening is the one
 * state with nothing on screen to say so. That is the state people get stuck
 * in, scrolling a list wondering where half of it went.
 *
 * So the icon is permanent and the clear button is conditional: the first
 * keeps saying what the box is, the second appears only when there is
 * something to undo. The icon also takes the accent once there is a value,
 * which is the cheapest possible "this list is filtered" indicator.
 */
import type { ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { SearchInputView } from './SearchInputView';
import { FilterIcon, CloseCircleIcon } from '../../../icons';

export interface FilterInputViewProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: DuiSize;
  width?: string | number;
  /** Colour the icon takes once the filter is doing something. */
  accentColor?: string;
  /** Replaces the clear button, for a caller that needs its own control. */
  suffix?: ReactNode;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}

export function FilterInputView({
  value,
  onChange,
  placeholder = 'Filter',
  size = 'sm',
  width = '100%',
  accentColor = 'var(--color-primary)',
  suffix,
  onKeyDown,
  autoFocus,
}: FilterInputViewProps) {
  const active = value.length > 0;

  return (
    <SearchInputView
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      size={size}
      width={width}
      onKeyDown={onKeyDown}
      autoFocus={autoFocus}
      prefix={
        <FilterIcon
          size={12}
          color={active ? accentColor : 'var(--color-text-muted)'}
        />
      }
      suffix={suffix ?? (active ? (
        <button
          type="button"
          onClick={() => onChange('')}
          title="Clear the filter"
          aria-label="Clear the filter"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: 'none', background: 'transparent', padding: 2,
            cursor: 'pointer', color: 'var(--color-text-muted)',
          }}
        >
          <CloseCircleIcon size={12} />
        </button>
      ) : undefined)}
    />
  );
}
