import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useTabBase } from '../../core/TabBase';
import { BoldIcon, ItalicIcon, UnderlineIcon, LinkIcon, ListIcon, CodeIcon } from '../../../icons';

export type RichTextAction = 'bold' | 'italic' | 'underline' | 'link' | 'list' | 'code';

export interface RichTextToolbarViewProps {
  active?: RichTextAction[];
  onAction: (action: RichTextAction) => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const ACTIONS: { id: RichTextAction; Icon: typeof BoldIcon; label: string }[] = [
  { id: 'bold', Icon: BoldIcon, label: 'Bold' },
  { id: 'italic', Icon: ItalicIcon, label: 'Italic' },
  { id: 'underline', Icon: UnderlineIcon, label: 'Underline' },
  { id: 'link', Icon: LinkIcon, label: 'Link' },
  { id: 'list', Icon: ListIcon, label: 'List' },
  { id: 'code', Icon: CodeIcon, label: 'Code' },
];

/** Formatting toolbar primitive — bold/italic/underline/link/list/code. */
export function RichTextToolbarView({
  active = [],
  onAction,
  size,
  color,
  className = '',
  style,
}: RichTextToolbarViewProps) {
  const base = useTabBase(size, { activeColor: color });
  const accent = base.activeColor ?? 'var(--color-primary)';
  const activeSet = new Set(active);

  return (
    <div className={className} style={{ display: 'inline-flex', gap: 2, padding: 3, border: '1px solid var(--color-surface-border)', borderRadius: 8, background: 'var(--color-surface)', ...style }}>
      {ACTIONS.map(({ id, Icon, label }) => {
        const isActive = activeSet.has(id);
        return (
          <button
            key={id}
            type="button"
            onClick={() => onAction(id)}
            title={label}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 6,
              border: 'none', background: isActive ? `color-mix(in srgb, ${accent} 16%, transparent)` : 'transparent',
              color: isActive ? accent : 'var(--color-text-secondary)', cursor: 'pointer',
            }}
          >
            <Icon size={13} />
          </button>
        );
      })}
    </div>
  );
}
