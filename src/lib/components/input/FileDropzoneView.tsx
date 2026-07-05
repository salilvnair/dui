import { useState, useRef, type CSSProperties } from 'react';
import type { DuiSize, DuiRadius, DuiWidth } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';
import { UploadIcon, FileTextIcon, TrashIcon } from '../../../icons';
import './FileDropzoneView.css';

export interface FileDropzoneEntry {
  file: File;
  /** 0-100. Omit or 100 for "done". */
  progress?: number;
  error?: string;
}

export interface FileDropzoneViewProps {
  files: FileDropzoneEntry[];
  onFilesAdded: (files: File[]) => void;
  onRemove: (index: number) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  size?: DuiSize;
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileDropzoneView({
  files,
  onFilesAdded,
  onRemove,
  accept,
  multiple = true,
  disabled = false,
  size,
  width,
  borderRadius,
  color,
  className = '',
  style,
}: FileDropzoneViewProps) {
  const base = useCardBase(size, { borderRadius, color });
  const accent = color ?? 'var(--color-primary)';
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || !fileList.length) return;
    onFilesAdded(Array.from(fileList));
  };

  return (
    <div className={`dui_dropzone ${className}`} style={{ width, ...style }}>
      <div
        className={`dui_dropzone__area${dragOver ? ' dui_dropzone__area--over' : ''}`}
        style={{ borderRadius: base.borderRadius, borderColor: dragOver ? accent : undefined, opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
      >
        <UploadIcon size={20} style={{ color: dragOver ? accent : 'var(--color-text-muted)' }} />
        <div style={{ fontSize: base.fontSize, fontWeight: 600, color: 'var(--color-text-primary)', marginTop: 6 }}>
          Drop files here or click to browse
        </div>
        <div style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)', marginTop: 2 }}>
          {accept ?? 'Any file type'}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          style={{ display: 'none' }}
          onChange={e => { handleFiles(e.target.files); e.target.value = ''; }}
        />
      </div>

      {files.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: base.gap }}>
          {files.map((entry, i) => (
            <div key={i} className="dui_dropzone__row" style={{ borderRadius: base.borderRadius }}>
              <FileTextIcon size={14} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: base.fontSize, color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {entry.file.name}
                </div>
                <div style={{ fontSize: base.fontSize, color: entry.error ? 'var(--color-error)' : 'var(--color-text-muted)' }}>
                  {entry.error ?? formatSize(entry.file.size)}
                </div>
                {entry.progress !== undefined && entry.progress < 100 && !entry.error && (
                  <div className="dui_dropzone__progresstrack">
                    <div className="dui_dropzone__progressfill" style={{ width: `${entry.progress}%`, background: accent }} />
                  </div>
                )}
              </div>
              <button type="button" className="dui_dropzone__remove" onClick={() => onRemove(i)} aria-label="Remove file">
                <TrashIcon size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
