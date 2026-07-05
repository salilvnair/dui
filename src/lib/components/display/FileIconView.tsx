import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useDisplayBase } from '../../core/DisplayBase';
import { FileTextIcon, ImageIcon, VideoIcon, MusicIcon, ArchiveIcon, CodeIcon, DocumentIcon } from '../../../icons';

export interface FileIconViewProps {
  name: string;
  size?: DuiSize;
  bytes?: number;
  className?: string;
  style?: CSSProperties;
}

const EXT_GROUPS: { exts: string[]; Icon: typeof FileTextIcon; color: string }[] = [
  { exts: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'], Icon: ImageIcon, color: 'var(--color-success)' },
  { exts: ['mp4', 'mov', 'avi', 'webm'], Icon: VideoIcon, color: 'var(--color-error)' },
  { exts: ['mp3', 'wav', 'ogg', 'flac'], Icon: MusicIcon, color: '#a855f7' },
  { exts: ['zip', 'tar', 'gz', 'rar', '7z'], Icon: ArchiveIcon, color: 'var(--color-warning)' },
  { exts: ['js', 'ts', 'tsx', 'jsx', 'py', 'json', 'yaml', 'yml', 'html', 'css'], Icon: CodeIcon, color: 'var(--color-info)' },
  { exts: ['pdf', 'doc', 'docx', 'txt', 'md'], Icon: DocumentIcon, color: 'var(--color-text-muted)' },
];

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function resolveIcon(name: string) {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  return EXT_GROUPS.find(g => g.exts.includes(ext)) ?? { Icon: FileTextIcon, color: 'var(--color-text-muted)' };
}

/** Extension-based file-type icon + name + size row. */
export function FileIconView({
  name,
  size,
  bytes,
  className = '',
  style,
}: FileIconViewProps) {
  const base = useDisplayBase(size);
  const { Icon, color } = resolveIcon(name);

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 8, ...style }}>
      <span style={{ display: 'flex', color, flexShrink: 0 }}><Icon size={16} /></span>
      <span style={{ fontSize: base.fontSize, color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
      {bytes !== undefined && <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)', flexShrink: 0 }}>{formatSize(bytes)}</span>}
    </div>
  );
}
