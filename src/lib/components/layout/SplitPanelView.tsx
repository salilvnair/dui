import { useState, useRef, useEffect } from 'react';

export type SplitDirection = 'horizontal' | 'vertical';

export interface SplitPanelViewProps {
  direction?: SplitDirection;
  first: React.ReactNode;
  second: React.ReactNode;
  /** Initial split (0–100%) for the first panel. Uncontrolled default. */
  defaultSplit?: number;
  /** Controlled split value. When provided, overrides internal state — wire with onResize. */
  split?: number;
  /** Min px size for first panel */
  minFirst?: number;
  /** Min px size for second panel */
  minSecond?: number;
  /** Min % size for first panel (0–100). Takes precedence over minFirst when set — the divider can't drag below this. */
  minFirstPct?: number;
  /** Min % size for second panel (0–100). Takes precedence over minSecond when set. */
  minSecondPct?: number;
  accentColor?: string;
  /** Fired on every drag move and on double-click reset */
  onResize?: (split: number) => void;
  /** Fired once when drag ends (pointer up) or on double-click reset */
  onResizeEnd?: (split: number) => void;
  /** Fired when the handle is clicked without dragging (e.g. to collapse/expand) */
  onHandleClick?: () => void;
  /**
   * Show only the first panel — no second panel, no handle, no divider.
   *
   * The reason to use this instead of rendering `first` on its own is that the
   * tree keeps its shape. `first` stays the same element in the same position
   * whether or not the second panel is showing, so React reconciles it rather
   * than unmounting it.
   *
   * A caller that instead swaps between `<>{content}</>` and
   * `<SplitPanelView first={content} />` moves that subtree to a new position
   * on every toggle, so React tears it down and builds it again — and any
   * state inside it goes with it: a parsed file, a scroll position, a
   * half-filled form. It looks like a layout prop and behaves like a data one.
   */
  collapsed?: boolean;
  /**
   * Tooltip shown on pill hover. Pass `null` to suppress.
   * Defaults to "Double-click to reset Alt+/ / Drag to resize" with a styled kbd badge.
   */
  pillTooltip?: React.ReactNode | null;
  style?: React.CSSProperties;
  className?: string;
}

const KBD: React.CSSProperties = {
  fontSize: 9,
  padding: '1px 5px',
  borderRadius: 3,
  background: 'var(--color-panel)',
  fontFamily: 'monospace',
  border: '1px solid color-mix(in srgb, var(--color-text-primary) 15%, transparent)',
};

const DEFAULT_PILL_TOOLTIP = (
  <>
    <div>Double-click to reset <kbd style={KBD}>Alt+/</kbd></div>
    <div>Drag to resize</div>
  </>
);

const EASE = 'cubic-bezier(0.2, 0.8, 0.2, 1)';

export function SplitPanelView({
  direction = 'horizontal',
  first,
  second,
  defaultSplit = 50,
  split: splitProp,
  minFirst = 80,
  minSecond = 80,
  minFirstPct,
  minSecondPct,
  accentColor,
  onResize,
  onResizeEnd,
  onHandleClick,
  pillTooltip = DEFAULT_PILL_TOOLTIP,
  collapsed = false,
  style,
  className = '',
}: SplitPanelViewProps) {
  const [internalSplit, setInternalSplit] = useState(splitProp ?? defaultSplit);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstPaneRef = useRef<HTMLDivElement>(null);
  const dragActiveRef = useRef(false);
  const hasMovedRef = useRef(false);
  // Live split during a drag. Pointermove writes the first pane's size
  // DIRECTLY to the DOM (second pane is flex:1 and follows) instead of
  // setState — a per-mousemove setState re-rendered BOTH pane subtrees on
  // every pixel, which is visibly laggy when a pane hosts a canvas
  // (vis-network/ReactFlow redraw on resize). React state is committed
  // once, on pointerup.
  const dragSplitRef = useRef<number | null>(null);
  const isHoriz = direction === 'horizontal';
  const accent = accentColor || 'var(--color-primary)';
  const pillActive = dragging || hovered;

  // Sync internal split when controlled prop changes
  useEffect(() => {
    if (splitProp !== undefined) setInternalSplit(splitProp);
  }, [splitProp]);

  // If something re-renders mid-drag (e.g. hover state), use the live drag
  // position — otherwise the render would rewrite the pane size from stale
  // state and visibly snap the divider back under the pointer.
  const baseSplit = splitProp !== undefined ? splitProp : internalSplit;
  const currentSplit = dragging && dragSplitRef.current != null ? dragSplitRef.current : baseSplit;

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragActiveRef.current = true;
    hasMovedRef.current = false;
    setDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragActiveRef.current || !containerRef.current) return;
    hasMovedRef.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    const total = isHoriz ? rect.width : rect.height;
    const pos = isHoriz ? e.clientX - rect.left : e.clientY - rect.top;
    // Percent thresholds take precedence over px ones — the divider can't cross them.
    const minFirstP = minFirstPct ?? (minFirst / total) * 100;
    const minSecondP = minSecondPct ?? (minSecond / total) * 100;
    const pct = Math.max(
      minFirstP,
      Math.min(100 - minSecondP, (pos / total) * 100),
    );
    dragSplitRef.current = pct;
    if (firstPaneRef.current) {
      if (isHoriz) firstPaneRef.current.style.width = `${pct}%`;
      else firstPaneRef.current.style.height = `${pct}%`;
    }
    onResize?.(pct);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    dragActiveRef.current = false;
    setDragging(false);
    if (!hasMovedRef.current) {
      onHandleClick?.();
    } else {
      // Commit the drag's final position to React state exactly once.
      const finalSplit = dragSplitRef.current ?? internalSplit;
      dragSplitRef.current = null;
      setInternalSplit(finalSplit);
      onResizeEnd?.(finalSplit);
    }
  };

  const handleDoubleClick = () => {
    setInternalSplit(defaultSplit);
    onResize?.(defaultSplit);
    onResizeEnd?.(defaultSplit);
  };

  // Collapsed, the first panel is the whole container — and its min size stops
  // applying, since there is no second panel left for it to be squeezed by.
  const firstStyle: React.CSSProperties = isHoriz
    ? { width: collapsed ? '100%' : `${currentSplit}%`,
        minWidth: collapsed ? 0 : minFirst, height: '100%', overflow: 'hidden',
        transition: dragging ? 'none' : `width 180ms ${EASE}` }
    : { height: collapsed ? '100%' : `${currentSplit}%`,
        minHeight: collapsed ? 0 : minFirst, width: '100%', overflow: 'hidden',
        transition: dragging ? 'none' : `height 180ms ${EASE}` };

  const secondStyle: React.CSSProperties = isHoriz
    ? { flex: 1, minWidth: minSecond, height: '100%', overflow: 'hidden' }
    : { flex: 1, minHeight: minSecond, width: '100%', overflow: 'hidden',
        transition: dragging ? 'none' : `all 180ms ${EASE}` };

  const pillW = isHoriz ? 3 : (pillActive ? 80 : 44);
  const pillH = isHoriz ? (pillActive ? 80 : 44) : 3;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: 'flex',
        flexDirection: isHoriz ? 'row' : 'column',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div ref={firstPaneRef} style={firstStyle}>{first}</div>

      {/* Drag handle. Hidden rather than removed when collapsed — it holds no
          caller content, so there is nothing to preserve either way, and this
          keeps the panels' positions in the tree fixed. */}
      <div
        style={{
          display: collapsed ? 'none' : undefined,
          flexShrink: 0,
          // 8px: the line is 1px, and a 1px drag target is a frustration.
          width: isHoriz ? 8 : '100%',
          height: isHoriz ? '100%' : 8,
          cursor: isHoriz ? 'col-resize' : 'row-resize',
          position: 'relative',
          userSelect: 'none',
          zIndex: 10,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onDoubleClick={handleDoubleClick}
        aria-label="Resize panels"
      >
        {/*
          The divider itself — a continuous line the full length of the split.

          There was only ever the pill: a 44px lozenge floating in the middle
          of an otherwise invisible 6px gap, which reads as a stray handle
          rather than as an edge between two panels. A pane needs a boundary
          whether or not you intend to drag it, and the pill then sits ON that
          boundary as the part you grab.
        */}
        <div
          style={{
            position: 'absolute',
            ...(isHoriz
              ? { left: '50%', top: 0, bottom: 0, width: 1, transform: 'translateX(-50%)' }
              : { top: '50%', left: 0, right: 0, height: 1, transform: 'translateY(-50%)' }),
            background: pillActive
              ? `color-mix(in srgb, ${accent} 55%, transparent)`
              : 'var(--color-surface-border)',
            transition: 'background 150ms ease',
            pointerEvents: 'none',
          }}
        />

        {/* Pill indicator */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: pillW,
            height: pillH,
            borderRadius: 9999,
            background: pillActive ? accent : `color-mix(in srgb, ${accent} 50%, var(--color-surface-border))`,
            transition: `${isHoriz ? 'height' : 'width'} 150ms ease, background 150ms ease`,
            pointerEvents: 'none',
          }}
        />

        {/* Tooltip — anchored below pill (vertical) or to the right (horizontal) */}
        {pillTooltip != null && hovered && !dragging && (
          <div
            style={{
              position: 'absolute',
              ...(isHoriz
                ? { left: 'calc(100% + 4px)', top: '50%', transform: 'translateY(-50%)' }
                : { left: '50%', top: 'calc(100% + 4px)', transform: 'translateX(-50%)' }
              ),
              background: 'var(--color-surface)',
              color: 'var(--color-text-primary)',
              fontSize: 11,
              lineHeight: 1.7,
              padding: '6px 10px',
              borderRadius: 8,
              border: '1px solid var(--color-surface-border)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          >
            {pillTooltip}
          </div>
        )}
      </div>

      {/* The second panel IS unmounted when collapsed — unlike the handle it
          holds the caller's content, and a hidden pane that keeps running is
          not what "collapsed" promises. */}
      {!collapsed && <div style={secondStyle}>{second}</div>}
    </div>
  );
}
