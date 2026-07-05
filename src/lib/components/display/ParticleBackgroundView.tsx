import { useMemo, type CSSProperties, type ReactNode } from 'react';

export interface ParticleBackgroundViewProps {
  children?: ReactNode;
  /** Number of particles. Default 40. */
  count?: number;
  color?: string;
  height?: number;
  className?: string;
  style?: CSSProperties;
}

interface Particle { x: number; y: number; r: number; dur: number; delay: number; }

function makeParticles(count: number, seed: number): Particle[] {
  let s = seed;
  const rand = () => { s = (s * 1103515245 + 12345) >>> 0; return (s >>> 8) / 0xFFFFFF; };
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    r: 1 + rand() * 2,
    dur: 6 + rand() * 8,
    delay: rand() * 6,
  }));
}

/** Subtle animated particle/dot background. */
export function ParticleBackgroundView({
  children,
  count = 40,
  color,
  height = 240,
  className = '',
  style,
}: ParticleBackgroundViewProps) {
  const accent = color ?? 'var(--color-primary)';
  const particles = useMemo(() => makeParticles(count, count * 7919), [count]);

  return (
    <div className={className} style={{ position: 'relative', height, overflow: 'hidden', borderRadius: 8, background: 'var(--color-surface)', ...style }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        {particles.map((p, i) => (
          <circle key={i} cx={`${p.x}%`} cy={`${p.y}%`} r={p.r} fill={accent} opacity={0.5}>
            <animate attributeName="opacity" values="0.15;0.7;0.15" dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${p.y}%;${p.y - 6}%;${p.y}%`} dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
      {children && <div style={{ position: 'relative', height: '100%' }}>{children}</div>}
    </div>
  );
}
