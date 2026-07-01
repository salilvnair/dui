import { useState } from 'react';
import { ContextMenuView, type ContextMenuItem } from '../modal/ContextMenuView';

/**
 * Shared render shell for both the Monaco-backed and fallback editor
 * implementations — pure DUI chrome, no editor-engine dependency either way.
 */
export function EditorShell({
  bordered, containerHeight, children, contextMenuMode = 'native', contextMenuItems, accentColor,
}: {
  bordered: boolean;
  containerHeight: string;
  children: React.ReactNode;
  contextMenuMode?: 'native' | 'dui' | 'none';
  contextMenuItems?: ContextMenuItem[];
  accentColor?: string;
}) {
  const [ctxPos, setCtxPos] = useState<{ x: number; y: number } | null>(null);
  const isDui = contextMenuMode === 'dui';

  return (
    <div
      className={`dui-editor-shell relative${bordered ? ' rounded border border-[var(--color-surface-border)]' : ''}`}
      style={{ height: containerHeight, width: '100%', position: 'relative', ...(accentColor ? { '--editor-accent': accentColor } as React.CSSProperties : {}) }}
      onContextMenu={isDui ? (e) => { e.preventDefault(); setCtxPos({ x: e.clientX, y: e.clientY }); } : undefined}
    >
      {children}
      {isDui && contextMenuItems && (
        <ContextMenuView
          open={!!ctxPos}
          anchorEl={null}
          position={ctxPos ?? undefined}
          items={contextMenuItems}
          onClose={() => setCtxPos(null)}
        />
      )}
    </div>
  );
}
