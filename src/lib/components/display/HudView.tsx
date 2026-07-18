import { useRef, useCallback, useEffect, useState } from 'react';
import './HudView.css';

export interface HudItem {
  id: string;
  /** Icon-only items (default look) — omit when using dotColor + label instead */
  icon?: React.ReactNode;
  /** Colored swatch rendered before the label — e.g. a source-layer legend key */
  dotColor?: string;
  /** Text label rendered after the icon/dot — turns the item into a legend pill instead of an icon-only square button */
  label?: string;
  onClick?: () => void;
  title?: string;
  disabled?: boolean;
  /** Renders a highlighted active state (e.g. "mute breakpoints" toggled on).
   * For dot+label legend items, `active: false` instead dims the item to
   * indicate "hidden/off" rather than highlighting it. */
  active?: boolean;
  /** Separator before this item */
  separator?: boolean;
}

export interface HudViewProps {
  items: HudItem[];
  /** Short status text rendered after the last item */
  status?: string;
  /** Optional accent color — sets --dui-hud-accent CSS custom property */
  accentColor?: string;
  /** Optional color used for the active (toggled) button state — sets --dui-hud-active-color */
  activeColor?: string;
  className?: string;
  onDragEnd?: (x: number, y: number) => void;
  /** Embed in a positioned container — uses position:relative instead of
   * fixed-centered-on-viewport. Drag is still enabled by default; pass
   * `draggable={false}` explicitly to disable it (e.g. static showcase/demo use). */
  contained?: boolean;
  /** 'free' (default) drags in any direction, matching the original
   * always-has-been HUD behavior. 'x' constrains the drag handle to
   * horizontal movement only. */
  dragAxis?: 'free' | 'x';
  /** Explicitly enable/disable the drag handle. Defaults to true regardless
   * of `contained` — set to false for a static, non-draggable HUD bar. */
  draggable?: boolean;
  /** Adds a minimize control next to the drag handle — collapses the whole
   * HUD into a small draggable circular orb. Click the orb to restore. */
  minimizable?: boolean;
  /** Start minimized (uncontrolled — default false). Ignored if `minimized` is set. */
  defaultMinimized?: boolean;
  /** Controlled minimized state — pass with `onMinimizedChange` to fully control it. */
  minimized?: boolean;
  onMinimizedChange?: (minimized: boolean) => void;
  /** Adds a "reset to initial view" icon button next to the minimize
   * control — for a canvas/graph HUD where the caller wants a one-click
   * way back to whatever view state it opened with, regardless of how far
   * the user has since panned/zoomed. Purely presentational: HudView has
   * no concept of "initial view" itself, the caller supplies the handler. */
  onReset?: () => void;
  /** Tooltip for the reset button. Defaults to "Reset view". */
  resetTitle?: string;
}

export function HudView({
  items,
  status,
  accentColor,
  activeColor,
  className = '',
  onDragEnd,
  contained = false,
  dragAxis = 'free',
  draggable = true,
  minimizable = false,
  defaultMinimized = false,
  minimized: minimizedProp,
  onMinimizedChange,
  onReset,
  resetTitle = 'Reset view',
}: HudViewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ dragging: boolean; startX: number; startY: number; originLeft: number; originTop: number }>({
    dragging: false,
    startX: 0,
    startY: 0,
    originLeft: 0,
    originTop: 0,
  });
  // Did this particular mousedown/mouseup pair actually move the pointer?
  // The orb (unlike the plain drag grip) has to double as both a drag
  // handle AND a click target (restore) — a real drag stays minimized and
  // just repositions; a stationary click restores the full HUD.
  const movedRef = useRef(false);

  const [internalMinimized, setInternalMinimized] = useState(defaultMinimized);
  const isMinimized = minimizedProp ?? internalMinimized;
  const setMinimized = useCallback((v: boolean) => {
    if (minimizedProp === undefined) setInternalMinimized(v);
    onMinimizedChange?.(v);
  }, [minimizedProp, onMinimizedChange]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const d = dragState.current;
    if (!d.dragging || !rootRef.current) return;
    const dx = e.clientX - d.startX;
    const dy = dragAxis === 'x' ? 0 : e.clientY - d.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) movedRef.current = true;
    const el = rootRef.current;
    const newLeft = Math.max(0, Math.min(window.innerWidth - el.offsetWidth, d.originLeft + dx));
    const newTop = Math.max(0, Math.min(window.innerHeight - el.offsetHeight, d.originTop + dy));
    el.style.left = `${newLeft}px`;
    el.style.top = `${newTop}px`;
    el.style.transform = 'none';
  }, [dragAxis]);

  const onMouseUp = useCallback((e: MouseEvent) => {
    const d = dragState.current;
    if (!d.dragging) return;
    d.dragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    if (rootRef.current) {
      const rect = rootRef.current.getBoundingClientRect();
      onDragEnd?.(rect.left, rect.top);
    }
    // Orb-only: a click (no movement) restores the full HUD instead of
    // just ending a (non-existent) drag.
    if (isMinimized && !movedRef.current) setMinimized(false);
    e.stopPropagation();
  }, [onMouseMove, onDragEnd, isMinimized, setMinimized]);

  const onDragMouseDown = useCallback((e: React.MouseEvent) => {
    if (!rootRef.current) return;
    e.preventDefault();
    const el = rootRef.current;
    const rect = el.getBoundingClientRect();
    movedRef.current = false;
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      originLeft: rect.left,
      originTop: rect.top,
    };
    // `getBoundingClientRect()` is always viewport-absolute, but `left`/`top`
    // only mean "viewport pixels" when `position` is fixed/absolute — for
    // `contained` mode (position: relative in CSS) they mean "offset from
    // normal flow position", so writing rect.left/top straight in there
    // shoves the element by its own screen position on the very first move.
    // Force `position: fixed` here (regardless of `contained`) so the
    // coordinate system is always self-consistent for the drag, and the HUD
    // undocks into a free-floating overlay it can move in any direction —
    // matching the rect we just measured, so there's no visual jump.
    el.style.position = 'fixed';
    el.style.left = `${rect.left}px`;
    el.style.top = `${rect.top}px`;
    el.style.transform = 'none';
    el.style.zIndex = '9999';
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [onMouseMove, onMouseUp]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const customStyle = {
    ...(accentColor ? { '--dui-hud-accent': accentColor } : {}),
    ...(activeColor ? { '--dui-hud-active-color': activeColor } : {}),
  } as React.CSSProperties;

  if (isMinimized) {
    return (
      <div
        ref={rootRef}
        className={`dui_hud dui_hud--orb${contained ? ' dui_hud--contained' : ''}${className ? ` ${className}` : ''}`}
        style={customStyle}
        onMouseDown={draggable ? onDragMouseDown : undefined}
        title="Drag to move, click to restore"
      >
        <span className="dui_hud__orb-dot" />
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`dui_hud${contained ? ' dui_hud--contained' : ''}${className ? ` ${className}` : ''}`}
      style={customStyle}
    >
      {/* Drag handle — hidden grip when explicitly non-draggable */}
      <div
        className="dui_hud__drag"
        onMouseDown={draggable ? onDragMouseDown : undefined}
        title={draggable ? 'Drag to move' : undefined}
        style={draggable ? undefined : { cursor: 'default', opacity: 0.25 }}
      >
        <span className="dui_hud__grip" />
      </div>

      {/* Reset button — next to the drag handle, before minimize */}
      {onReset && (
        <button
          type="button"
          className="dui_hud__minimize dui_hud__reset"
          onClick={onReset}
          title={resetTitle}
          aria-label={resetTitle}
        >
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H5a2 2 0 00-2 2v3" />
            <path d="M16 3h3a2 2 0 012 2v3" />
            <path d="M21 16v3a2 2 0 01-2 2h-3" />
            <path d="M3 16v3a2 2 0 002 2h3" />
          </svg>
        </button>
      )}

      {/* Minimize button — next to the drag handle */}
      {minimizable && (
        <button
          type="button"
          className="dui_hud__minimize"
          onClick={() => setMinimized(true)}
          title="Minimize"
          aria-label="Minimize"
        >
          <span className="dui_hud__minimize-dash" />
        </button>
      )}

      {/* Items */}
      {items.map(item => {
        const isLegendItem = item.dotColor !== undefined || item.label !== undefined;
        return (
          <div key={item.id} style={{ display: 'contents' }}>
            {item.separator && <div className="dui_hud__sep" />}
            <button
              type="button"
              className={`dui_hud__btn${isLegendItem ? ' dui_hud__btn--legend' : (item.active ? ' dui_hud__btn--active' : '')}`}
              onClick={item.onClick}
              disabled={item.disabled}
              title={item.title}
              style={
                isLegendItem
                  ? {
                      // disabled must win over the active/inactive dim —
                      // this inline style previously only branched on
                      // `active`, so a disabled-but-active legend item (e.g.
                      // a zero-count layer that's still toggled "on") kept
                      // rendering at full opacity: the CSS `:disabled` rule
                      // sets opacity too, but an inline style always beats a
                      // stylesheet rule for the same property, so it was
                      // silently overridden.
                      opacity: item.disabled ? 0.35 : item.active === false ? 0.4 : 1,
                      filter: item.disabled ? 'grayscale(1)' : undefined,
                    }
                  : undefined
              }
            >
              {item.dotColor && (
                <span
                  aria-hidden="true"
                  style={{
                    width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                    background: item.dotColor, display: 'inline-block',
                  }}
                />
              )}
              {item.icon}
              {item.label && <span className="dui_hud__label">{item.label}</span>}
            </button>
          </div>
        );
      })}

      {/* Status text */}
      {status && <span className="dui_hud__status">{status}</span>}
    </div>
  );
}
