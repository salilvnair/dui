import type { CSSProperties } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useChipBase } from '../../core/ChipBase';

export interface TagCloudEntry {
  label: string;
  /** Relative weight — determines font size within the cloud. */
  weight: number;
  onClick?: () => void;
}

export interface TagCloudViewProps {
  tags: TagCloudEntry[];
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

/** Weighted tag cloud — font size scales with each tag's relative weight. */
export function TagCloudView({
  tags,
  size,
  color,
  className = '',
  style,
}: TagCloudViewProps) {
  const base = useChipBase(size, { color });
  const accent = color ?? 'var(--color-primary)';
  const maxWeight = Math.max(1, ...tags.map(t => t.weight));
  const minFont = parseInt(base.fontSize, 10);

  return (
    <div className={className} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 8, ...style }}>
      {tags.map((tag, i) => {
        const ratio = tag.weight / maxWeight;
        const fontSize = minFont + ratio * minFont * 1.8;
        const opacity = 0.55 + ratio * 0.45;
        const Tag = tag.onClick ? 'button' : 'span';
        return (
          <Tag
            key={i}
            type={tag.onClick ? 'button' : undefined}
            onClick={tag.onClick}
            style={{
              fontSize, fontWeight: 700, color: accent, opacity,
              border: 'none', background: 'transparent', cursor: tag.onClick ? 'pointer' : 'default',
              fontFamily: 'inherit', lineHeight: 1, padding: 0,
            }}
          >
            {tag.label}
          </Tag>
        );
      })}
    </div>
  );
}
