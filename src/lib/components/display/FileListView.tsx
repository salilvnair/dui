import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';
import { FileIconView } from './FileIconView';
import { TrashIcon } from '../../../icons';

export interface FileListEntry {
  id: string;
  name: string;
  bytes: number;
  /** 0-100. Omit or 100 for "done". */
  progress?: number;
  error?: string;
}

export interface FileListViewProps {
  files: FileListEntry[];
  onRemove: (id: string) => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Uploaded-files list with per-row progress and remove action. */
export function FileListView({
  files,
  onRemove,
  size,
  color,
  className = '',
  style,
}: FileListViewProps) {
  const base = useDisplayBase(size, { color });
  const accent = color ?? 'var(--color-primary)';

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {files.map(f => (
        <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <FileIconView name={f.name} bytes={f.bytes} size={size} />
            {f.progress !== undefined && f.progress < 100 && !f.error && (
              <div style={{ height: 3, borderRadius: 2, background: 'var(--color-surface-border)', marginTop: 4, overflow: 'hidden' }}>
                <div style={{ width: `${f.progress}%`, height: '100%', background: accent, transition: 'width 200ms' }} />
              </div>
            )}
            {f.error && <div style={{ fontSize: base.fontSize, color: 'var(--color-error)', marginTop: 2 }}>{f.error}</div>}
          </div>
          <button type="button" onClick={() => onRemove(f.id)} style={{ display: 'flex', border: 'none', background: 'transparent', color: 'var(--color-text-muted)', cursor: 'pointer', flexShrink: 0 }} aria-label="Remove">
            <TrashIcon size={13} />
          </button>
        </div>
      ))}
    </div>
  );
}
