import { useState, type CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useTableBase } from '../../core/TableBase';
import { EyeIcon, EyeOffIcon, CopyIcon, CheckIcon, TrashIcon } from '../../../icons';

export interface ApiKeyRowViewProps {
  label: string;
  apiKey: string;
  onRevoke?: () => void;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

function mask(key: string): string {
  if (key.length <= 8) return '•'.repeat(key.length);
  return `${key.slice(0, 4)}${'•'.repeat(Math.max(4, key.length - 8))}${key.slice(-4)}`;
}

/** Masked API key row with reveal/copy/revoke actions. */
export function ApiKeyRowView({
  label,
  apiKey,
  onRevoke,
  size,
  className = '',
  style,
}: ApiKeyRowViewProps) {
  const base = useTableBase(size);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(apiKey); } catch { /* clipboard unavailable */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const iconBtnStyle: CSSProperties = { display: 'flex', border: 'none', background: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer', padding: 4 };

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: `8px ${base.paddingX}`, border: '1px solid var(--color-surface-border)', borderRadius: 8, ...style }}>
      <span style={{ fontSize: base.cellFontSize, fontWeight: 700, color: 'var(--color-text-primary)', flexShrink: 0 }}>{label}</span>
      <span style={{ flex: 1, fontSize: base.cellFontSize, fontFamily: 'ui-monospace, monospace', color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {visible ? apiKey : mask(apiKey)}
      </span>
      <button type="button" onClick={() => setVisible(v => !v)} style={iconBtnStyle} aria-label={visible ? 'Hide' : 'Reveal'}>
        {visible ? <EyeOffIcon size={14} /> : <EyeIcon size={14} />}
      </button>
      <button type="button" onClick={handleCopy} style={{ ...iconBtnStyle, color: copied ? 'var(--color-success)' : iconBtnStyle.color }} aria-label="Copy">
        {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
      </button>
      {onRevoke && (
        <button type="button" onClick={onRevoke} style={{ ...iconBtnStyle, color: 'var(--color-error)' }} aria-label="Revoke">
          <TrashIcon size={14} />
        </button>
      )}
    </div>
  );
}
