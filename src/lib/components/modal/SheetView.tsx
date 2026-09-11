/**
 * A sheet, off any edge.
 *
 * ── How it differs from the two components either side of it ──
 *
 * `DrawerView` is a flush slab that opens and waits for a button. `BottomSheetView`
 * is this, but only from the bottom. `SheetView` is the iPhone sheet on all four
 * edges: rounded leading corners, a grab handle, and it follows your finger —
 * drag it a third of its own size, or flick it, and it goes.
 *
 * The difference is not decoration. A panel you can throw away is one people
 * open freely, which is what makes it the right thing for "show me this row"
 * — a detail view that costs nothing to open costs nothing to close, and so it
 * never needs a back button or a route of its own.
 *
 * ── Dismissing ──
 *
 * The backdrop, Escape, the × in the header, and the drag. All four, because
 * this replaces navigation and the way back from a page is never one thing.
 *
 * The geometry — which way it moves, how far is far enough, what counts as a
 * flick — is in `sheet-drag.ts`, where it can be tested. What is left here is
 * the DOM.
 */
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '../../../icons';
import {
  axisOf, grownTo, offsetStyle, opposite, shouldDismiss, speedOf, travel,
  type SheetEdge,
} from './sheet-drag';
import './SheetView.css';

export type { SheetEdge };

/** How long the leaving animation runs — matches `--closing` in the CSS. */
const EXIT_MS = 200;
/** And the arriving one. See `entering` — it must run once, not once per class change. */
const ENTER_MS = 280;

export interface SheetViewProps {
  open: boolean;
  onClose: () => void;
  /** Which edge it comes in from. */
  edge?: SheetEdge;
  /** Width for `left`/`right`, height for `top`/`bottom`. */
  size?: number | string;
  title?: ReactNode;
  /** Replaces the whole title row, for a header that is more than a string. */
  header?: ReactNode;
  footer?: ReactNode;
  /** The handle, and the drag with it. On by default. */
  handle?: boolean;
  /** Clicking the backdrop closes it. On by default. */
  backdropClose?: boolean;
  children?: ReactNode;
  className?: string;
}

export function SheetView({
  open,
  onClose,
  edge = 'right',
  size,
  title,
  header,
  footer,
  handle = true,
  backdropClose = true,
  children,
  className = '',
}: SheetViewProps) {
  const panel = useRef<HTMLDivElement>(null);
  const [moved, setMoved] = useState(0);
  const [dragging, setDragging] = useState(false);
  /**
   * True only while the sheet is arriving.
   *
   * The entry animation used to live on the panel's base class, which meant
   * *any* class change re-triggered it: pressing the handle added `--dragging`
   * (`animation: none`) and releasing it took that away again, so a plain click
   * on the grab bar made the whole sheet slide in from off-screen a second
   * time. It runs once now, on a class that is removed when it has finished.
   */
  const [entering, setEntering] = useState(open);
  /** The width, once somebody has pulled the handle away from the edge. */
  const [grown, setGrown] = useState<number | undefined>();
  /** True for the length of the leaving animation, so it is seen to leave. */
  const [closing, setClosing] = useState(false);
  /** Mounted separately from `open`, so the exit has something to animate. */
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
      setMoved(0);
      setEntering(true);
      const t = window.setTimeout(() => setEntering(false), ENTER_MS);
      return () => window.clearTimeout(t);
    }
    if (!mounted) return;
    /* Back to zero before the exit runs. A sheet dismissed *by* a drag is
       still holding the drag's transform, and the leaving keyframes are a
       transform too — leaving it set means the panel jumps to the pointer's
       last position and animates out from there. */
    setMoved(0);
    setClosing(true);
    const t = window.setTimeout(() => { setMounted(false); setClosing(false); }, EXIT_MS);
    return () => window.clearTimeout(t);
  }, [open, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [mounted, onClose]);

  const drag = useCallback((e: React.PointerEvent) => {
    if (!handle || e.button !== 0) return;
    e.preventDefault();
    const from = { x: e.clientX, y: e.clientY, at: Date.now() };
    setDragging(true);

    /* The width it had when the drag began — what a pull away from the edge
       is measured against. */
    const wide = panel.current
      ? (axisOf(edge) === 'x' ? panel.current.offsetWidth : panel.current.offsetHeight)
      : 0;
    const away = opposite(edge);
    const room = () => (axisOf(edge) === 'x' ? window.innerWidth : window.innerHeight);

    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - from.x;
      const dy = ev.clientY - from.y;
      /*
        One handle, two jobs, decided by direction. Pulled away from its own
        edge it grows; pushed towards it, it leaves. `travel` already floors the
        wrong way at zero, so only one of these is ever non-zero.
      */
      const pulled = travel(away, dx, dy);
      if (pulled > 0) {
        setMoved(0);
        setGrown(grownTo(wide, pulled, room()));
        return;
      }
      setMoved(travel(edge, dx, dy));
    };
    const up = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      setDragging(false);

      const gone = travel(edge, ev.clientX - from.x, ev.clientY - from.y);
      const box = panel.current;
      const extent = box
        ? (axisOf(edge) === 'x' ? box.offsetWidth : box.offsetHeight)
        : 0;
      if (shouldDismiss(gone, extent, speedOf(gone, Date.now() - from.at))) {
        onClose();
      } else {
        /* Short of the threshold it goes back. The class does the easing; the
           state going to zero is what it eases to. */
        setMoved(0);
      }
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  }, [edge, handle, onClose]);

  if (!mounted) return null;

  const side = axisOf(edge) === 'x';
  const dim = side ? 'width' : 'height';
  const fallback = side ? 'min(560px, 92vw)' : 'min(60vh, 720px)';

  const body = (
    <>
      {header ?? (title !== undefined && (
        <div className="dui_sheet__head">
          <span className="dui_sheet__title">{title}</span>
          <button type="button" className="dui_sheet__x" onClick={onClose} aria-label="Close">
            <CloseIcon size={14} />
          </button>
        </div>
      ))}
      <div className="dui_sheet__content">{children}</div>
      {footer && <div className="dui_sheet__foot">{footer}</div>}
    </>
  );

  return createPortal(
    <div
      className={`dui_sheet__backdrop dui_sheet__backdrop--${edge}`
        + (closing ? ' dui_sheet__backdrop--closing' : '')}
      onPointerDown={backdropClose ? e => { if (e.target === e.currentTarget) onClose(); } : undefined}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        className={`dui_sheet__panel dui_sheet__panel--${edge}`
          + (entering && !closing ? ' dui_sheet__panel--entering' : '')
          + (closing ? ' dui_sheet__panel--closing' : '')
          + (dragging ? ' dui_sheet__panel--dragging' : '')
          /* Settling is only for the spring back from a released drag. Adding
             it at rest would kill the entry keyframes, which are a transform
             too. */
          + (!dragging && !closing && moved > 0 ? ' dui_sheet__panel--settling' : '')
          + (className ? ` ${className}` : '')}
        style={{
          /* What the handle was pulled to wins over what the caller asked for
             — it is the reader saying how much room this needs. */
          [dim]: grown !== undefined
            ? `${grown}px`
            : typeof size === 'number' ? `${size}px` : size ?? fallback,
          /* Only while it is being held or springing back — at rest this is
             empty so the keyframes own the transform. */
          transform: offsetStyle(edge, moved) || undefined,
        }}
      >
        {handle && (
          <div
            className="dui_sheet__grab"
            onPointerDown={drag}
            /* Both jobs, in the tooltip, because neither is discoverable. */
            title={axisOf(edge) === 'x'
              ? 'Drag away to widen, or towards the edge to close'
              : 'Drag away to make it taller, or towards the edge to close'}
            aria-hidden="true"
          >
            <i />
          </div>
        )}
        {side ? <div className="dui_sheet__body--side">{body}</div> : body}
      </div>
    </div>,
    document.body,
  );
}
