/**
 * A text box that runs a search, and looks like it will.
 *
 * The sibling of `FilterInputView`, and it exists for the same reason: the
 * placeholder is the only thing identifying a bare input, and typing removes
 * it, so the state where the control is actually in use is the one state with
 * nothing on screen to say what it is. The icon stays, and takes the accent
 * once there is something to run.
 *
 * The difference from the filter is what Enter means. A filter narrows a list
 * that is already on screen, so it applies as you type and Enter has nothing
 * to do. A search is a round trip — an exec into a pod, a walk of a filesystem
 * — so it has to be asked for, and the key people press to ask is Enter. A
 * separate Search button beside the field is a second way to do the same
 * thing, and it takes width from the field on every screen it sits on.
 *
 * Clearing is offered rather than assumed: the X removes the text, and callers
 * that want clearing to also drop the results say so with `onClear`.
 */
import type { ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { SearchInputView } from './SearchInputView';
import { SearchIcon, CloseCircleIcon } from '../../../icons';

export interface SearchFieldViewProps {
  value: string;
  onChange: (value: string) => void;
  /** Enter, and the icon's tooltip. Omit for a box that only holds a term. */
  onSearch?: (value: string) => void;
  /**
   * Clearing, when it means more than emptying the box.
   *
   * Defaults to `onChange('')`. Pass this where the results have to go too —
   * a cleared query beside a full result list is a screen describing a search
   * nobody can see the terms of.
   */
  onClear?: () => void;
  placeholder?: string;
  size?: DuiSize;
  width?: string | number;
  accentColor?: string;
  /** Sits between the text and the clear button — a count, a spinner. */
  trailing?: ReactNode;
  autoFocus?: boolean;
}

export function SearchFieldView({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = 'Search',
  size = 'sm',
  width = '100%',
  accentColor = 'var(--color-primary)',
  trailing,
  autoFocus,
}: SearchFieldViewProps) {
  const active = value.length > 0;

  return (
    <SearchInputView
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      size={size}
      width={width}
      autoFocus={autoFocus}
      onKeyDown={e => {
        if (e.key !== 'Enter' || !onSearch) return;
        e.preventDefault();
        onSearch(value);
      }}
      prefix={
        <SearchIcon
          size={12}
          color={active ? accentColor : 'var(--color-text-muted)'}
        />
      }
      suffix={(trailing || active) ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {trailing}
          {active && (
            <button
              type="button"
              onClick={() => (onClear ? onClear() : onChange(''))}
              title="Clear"
              aria-label="Clear the search"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: 'none', background: 'transparent', padding: 2,
                cursor: 'pointer', color: 'var(--color-text-muted)',
              }}
            >
              <CloseCircleIcon size={12} />
            </button>
          )}
        </span>
      ) : undefined}
    />
  );
}
