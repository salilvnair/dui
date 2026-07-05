import type { CSSProperties, ReactNode } from 'react';
import type { DuiSize } from '../../core/DuiTypes';
import { useCardBase } from '../../core/CardBase';

export interface CommentNode {
  id: string;
  author: string;
  avatar?: ReactNode;
  timestamp: string;
  content: string;
  replies?: CommentNode[];
}

export interface CommentThreadViewProps {
  comments: CommentNode[];
  onReply?: (id: string) => void;
  size?: DuiSize;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

function Comment({ node, onReply, base, accent, depth }: { node: CommentNode; onReply?: (id: string) => void; base: ReturnType<typeof useCardBase>; accent: string; depth: number }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginLeft: depth * 24 }}>
      <span style={{ flexShrink: 0 }}>{node.avatar ?? <span style={{ width: 26, height: 26, borderRadius: '999px', background: 'var(--color-surface-border)', display: 'block' }} />}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontSize: base.fontSize, fontWeight: 700, color: 'var(--color-text-primary)' }}>{node.author}</span>
          <span style={{ fontSize: base.fontSize, color: 'var(--color-text-muted)' }}>{node.timestamp}</span>
        </div>
        <div style={{ fontSize: base.fontSize, color: 'var(--color-text-secondary)', lineHeight: 1.5, marginTop: 2 }}>{node.content}</div>
        {onReply && (
          <button type="button" onClick={() => onReply(node.id)} style={{ border: 'none', background: 'transparent', color: accent, fontSize: base.fontSize, fontWeight: 700, cursor: 'pointer', padding: 0, marginTop: 4 }}>
            Reply
          </button>
        )}
        {node.replies && node.replies.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
            {node.replies.map(reply => <Comment key={reply.id} node={reply} onReply={onReply} base={base} accent={accent} depth={depth + 1} />)}
          </div>
        )}
      </div>
    </div>
  );
}

/** Nested comment thread with reply action — GitHub/PR-style. */
export function CommentThreadView({
  comments,
  onReply,
  size,
  color,
  className = '',
  style,
}: CommentThreadViewProps) {
  const base = useCardBase(size, { color });
  const accent = color ?? 'var(--color-primary)';

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 14, ...style }}>
      {comments.map(c => <Comment key={c.id} node={c} onReply={onReply} base={base} accent={accent} depth={0} />)}
    </div>
  );
}
