import { useRef, type CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDui } from '../../core/DuiContext';
import { DUI_HEIGHT } from '../../core/DuiTokens';
import { CameraIcon } from '../../../icons';

export interface AvatarUploadViewProps {
  /** Preview image URL, or null/undefined for the empty state. */
  src?: string | null;
  onFileSelected: (file: File) => void;
  initials?: string;
  disabled?: boolean;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function AvatarUploadView({
  src,
  onFileSelected,
  initials,
  disabled = false,
  size,
  color,
  className = '',
  style,
}: AvatarUploadViewProps) {
  const ctx = useDui();
  const s = size ?? ctx.size;
  const accent = color ?? ctx.activeColor ?? 'var(--color-primary)';
  const diameter = DUI_HEIGHT.card[s];
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`dui_avatarupload ${className}`}
      style={{
        position: 'relative', width: diameter, height: diameter, borderRadius: '999px',
        cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.5 : 1, flexShrink: 0, ...style,
      }}
      onClick={() => !disabled && inputRef.current?.click()}
    >
      <div style={{
        width: '100%', height: '100%', borderRadius: '999px', overflow: 'hidden',
        background: src ? `center/cover no-repeat url(${src})` : `color-mix(in srgb, ${accent} 15%, transparent)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '2px solid var(--color-surface-border)',
        fontSize: diameter * 0.36, fontWeight: 700, color: accent,
      }}>
        {!src && (initials ?? <CameraIcon size={diameter * 0.32} />)}
      </div>
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: diameter * 0.34, height: diameter * 0.34, borderRadius: '999px',
        background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '2px solid var(--color-surface)',
      }}>
        <CameraIcon size={diameter * 0.18} style={{ color: 'var(--color-btn-primary-text, #fff)' }} />
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        disabled={disabled}
        style={{ display: 'none' }}
        onChange={e => { const f = e.target.files?.[0]; if (f) onFileSelected(f); e.target.value = ''; }}
      />
    </div>
  );
}
