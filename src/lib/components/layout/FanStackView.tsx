import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import './FanStackView.css';

const ENTER_MS = 260;
const EXIT_MS = 200;
const STAGGER_MS = 45;

export interface FanStackItem {
  id: string;
  icon: ReactNode;
  label: string;
  /** Per-item accent — the tile ring/glow and label dot. Falls back to `color`. */
  color?: string;
}

export interface FanStackViewProps {
  items: FanStackItem[];
  onSelect: (id: string) => void;
  open: boolean;
  /** Which way the arc sweeps out of its anchor. */
  direction?: 'up-left' | 'up-right';
  color?: string;
  /** Distance from the anchor to the first tile. */
  radius?: number;
  /** Extra distance added per tile — the gap between consecutive tiles. */
  spread?: number;
  /** Degrees of sweep added per tile. `0` (default) stacks them straight up;
   *  a non-zero value bows the column into an arc. */
  angleStep?: number;
  tileSize?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * macOS Finder "fan"/stack — items rise out of their anchor point, evenly
 * spaced and staggered from nearest to furthest, each labelled on hover.
 * Straight-up by default (`angleStep = 0`); give it a non-zero `angleStep`
 * to bow the column into an arc. Anchor it inside a `position: relative`
 * parent; the stack is absolutely positioned at that parent's centre and
 * never takes part in layout.
 */
export function FanStackView({
  items,
  onSelect,
  open,
  direction = 'up-left',
  color,
  radius = 68,
  spread = 54,
  angleStep = 0,
  tileSize = 44,
  className = '',
  style,
}: FanStackViewProps) {
  const accent = color ?? 'var(--color-primary)';
  // 90° is straight up. Sweeping past it bends left; short of it bends right.
  const sweep = direction === 'up-left' ? 1 : -1;

  // Closing has to be animated too, so the tiles stay mounted through the
  // collapse and are only torn down once it has finished — unmounting on
  // `open === false` would make them vanish with no exit at all.
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (open) {
      setMounted(true);
      setClosing(false);
      return;
    }
    if (!mounted) return;
    setClosing(true);
    timer.current = setTimeout(
      () => { setMounted(false); setClosing(false); },
      EXIT_MS + Math.max(items.length - 1, 0) * STAGGER_MS,
    );
    return () => { if (timer.current) clearTimeout(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, items.length]);

  return (
    <div
      className={`dui_fanstack dui_fanstack--${direction === 'up-left' ? 'left' : 'right'} ${className}`}
      aria-hidden={!open}
      style={style}
    >
      {mounted && items.map((item, i) => {
        const angle = (90 + sweep * angleStep * i) * (Math.PI / 180);
        const r = radius + spread * i;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        const itemColor = item.color ?? accent;

        return (
          <button
            key={item.id}
            type="button"
            className={`dui_fanstack__item ${closing ? 'dui_fanstack__item--closing' : ''}`}
            onClick={() => onSelect(item.id)}
            tabIndex={closing ? -1 : 0}
            style={{
              // translate(-50%,-50%) centres the tile on the computed point;
              // the trailing translate walks it out along the arc.
              transform: `translate(-50%, -50%) translate(${x}px, ${-y}px)`,
              // Opening runs nearest-first; closing reverses so the furthest
              // tile folds back in first and the column zips into the anchor.
              animationDelay: `${(closing ? items.length - 1 - i : i) * STAGGER_MS}ms`,
              ['--dui-fan-accent' as string]: itemColor,
            }}
          >
            <span
              className="dui_fanstack__tile"
              style={{ width: tileSize, height: tileSize, color: itemColor }}
            >
              {item.icon}
            </span>
            <span className="dui_fanstack__label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
