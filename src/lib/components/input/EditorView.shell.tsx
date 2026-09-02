import { useState } from 'react';
import { ContextMenuView, type ContextMenuItem } from '../modal/ContextMenuView';

/**
 * Shared render shell for both the Monaco-backed and fallback editor
 * implementations — pure DUI chrome, no editor-engine dependency either way.
 */
export function EditorShell({
  bordered, containerHeight, children, contextMenuMode = 'native', contextMenuItems,
  itemsAt, accentColor,
}: {
  bordered: boolean;
  containerHeight: string;
  children: React.ReactNode;
  contextMenuMode?: 'native' | 'dui' | 'none';
  contextMenuItems?: ContextMenuItem[];
  /**
   * Items that depend on where the click landed, asked for at right-click.
   *
   * A path menu cannot be built ahead of time: which key or tag you are on is
   * the whole question, and it is only answered by the coordinates of the
   * click. Static `contextMenuItems` follow whatever this returns.
   */
  itemsAt?: (x: number, y: number) => ContextMenuItem[];
  accentColor?: string;
}) {
  const [ctxPos, setCtxPos] = useState<{ x: number; y: number } | null>(null);
  const [atPoint, setAtPoint] = useState<ContextMenuItem[]>([]);
  const isDui = contextMenuMode === 'dui';

  return (
    <div
      className={`dui-editor-shell relative${bordered ? ' rounded border border-[var(--color-surface-border)]' : ''}`}
      style={{ height: containerHeight, width: '100%', position: 'relative', ...(accentColor ? { '--editor-accent': accentColor } as React.CSSProperties : {}) }}
      /*
        Capture, not bubble.

        Monaco handles `contextmenu` on its own DOM and stops it there — it
        does that whether or not its menu is enabled, so with
        `contextMenuMode='dui'` the event died inside the editor and this
        handler never ran: no native menu, no DUI menu, nothing at all on
        right-click. Capturing runs this on the way down, before Monaco sees
        it.
      */
      onContextMenuCapture={isDui ? (e) => {
        e.preventDefault();
        setAtPoint(itemsAt?.(e.clientX, e.clientY) ?? []);
        setCtxPos({ x: e.clientX, y: e.clientY });
      } : undefined}
    >
      {children}
      {isDui && (atPoint.length > 0 || contextMenuItems) && (
        <ContextMenuView
          open={!!ctxPos}
          anchorEl={null}
          position={ctxPos ?? undefined}
          items={[...atPoint, ...(contextMenuItems ?? [])]}
          onClose={() => setCtxPos(null)}
          width={240}
        />
      )}
    </div>
  );
}
