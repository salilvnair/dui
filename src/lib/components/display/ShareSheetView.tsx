import { useState, type CSSProperties, type ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';
import { CopyIcon, CheckIcon } from '../../../icons';

export interface ShareTarget {
  id: string;
  label: string;
  icon: ReactNode;
  onClick: () => void;
}

export interface ShareSheetViewProps {
  url: string;
  targets?: ShareTarget[];
  onCopy?: () => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Social share row + copy-link field. */
export function ShareSheetView({
  url,
  targets = [],
  onCopy,
  size,
  color,
  className = '',
  style,
}: ShareSheetViewProps) {
  const base = useCardBase(size, { color });
  const accent = color ?? 'var(--color-primary)';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(url); } catch { /* clipboard unavailable */ }
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 300, ...style }}>
      {targets.length > 0 && (
        <div style={{ display: 'flex', gap: 12, justifyContent: 'space-around' }}>
          {targets.map(t => (
            <button key={t.id} type="button" onClick={t.onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <span style={{ width: 40, height: 40, borderRadius: '999px', background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent }}>
                {t.icon}
              </span>
              <span style={{ fontSize: base.fontSize, color: 'var(--color-text-secondary)' }}>{t.label}</span>
            </button>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid var(--color-surface-border)', borderRadius: 8, padding: '6px 8px' }}>
        <span style={{ flex: 1, fontSize: base.fontSize, color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{url}</span>
        <button type="button" onClick={handleCopy} style={{ display: 'flex', border: 'none', background: 'transparent', color: copied ? 'var(--color-success)' : accent, cursor: 'pointer', flexShrink: 0 }}>
          {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
        </button>
      </div>
    </div>
  );
}
