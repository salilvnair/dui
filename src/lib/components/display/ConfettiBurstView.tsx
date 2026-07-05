import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface ConfettiBurstHandle {
  /** Fire a burst. Origin defaults to viewport center; pass a DOMRect-like point to burst from a button, etc. */
  fire: (origin?: { x: number; y: number }) => void;
}

export interface ConfettiBurstViewProps {
  colors?: string[];
  particleCount?: number;
}

interface Particle {
  x: number; y: number; vx: number; vy: number;
  color: string; size: number; rotation: number; vr: number; life: number;
}

const DEFAULT_COLORS = ['#6366F1', '#22C55E', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4'];

/**
 * Canvas confetti burst, triggered imperatively via ref — `ref.current.fire()`.
 * Renders a fixed full-viewport transparent canvas that stays mounted but invisible
 * (zero particles) until fired, so it can sit anywhere in the tree.
 */
export const ConfettiBurstView = forwardRef<ConfettiBurstHandle, ConfettiBurstViewProps>(
  function ConfettiBurstView({ colors = DEFAULT_COLORS, particleCount = 80 }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const rafRef = useRef<number | null>(null);

    useImperativeHandle(ref, () => ({
      fire(origin) {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ox = origin?.x ?? window.innerWidth / 2;
        const oy = origin?.y ?? window.innerHeight / 2;

        for (let i = 0; i < particleCount; i++) {
          const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
          const speed = 4 + Math.random() * 7;
          particlesRef.current.push({
            x: ox, y: oy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 4 + Math.random() * 4,
            rotation: Math.random() * 360,
            vr: (Math.random() - 0.5) * 20,
            life: 1,
          });
        }

        if (rafRef.current === null) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          const ctx = canvas.getContext('2d')!;
          const tick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const alive: Particle[] = [];
            for (const p of particlesRef.current) {
              p.vy += 0.25; // gravity
              p.x += p.vx;
              p.y += p.vy;
              p.rotation += p.vr;
              p.life -= 0.012;
              if (p.life > 0) {
                ctx.save();
                ctx.globalAlpha = Math.max(0, p.life);
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                ctx.restore();
                alive.push(p);
              }
            }
            particlesRef.current = alive;
            if (alive.length > 0) {
              rafRef.current = requestAnimationFrame(tick);
            } else {
              rafRef.current = null;
            }
          };
          rafRef.current = requestAnimationFrame(tick);
        }
      },
    }), [colors, particleCount]);

    return (
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 99999 }}
      />
    );
  }
);
