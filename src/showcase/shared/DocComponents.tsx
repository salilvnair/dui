// Shared documentation building blocks for DUI Showcase docs tabs.
// Every component doc uses these primitives for consistent, colorful prop docs.

import type { CSSProperties, ReactNode } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface EnumEntry {
  value: string;
  description: string;
  color?: string;
}

export interface FeatureEntry {
  label: string;
  color?: string;
  description?: string;
}

// ─── Palette ──────────────────────────────────────────────────────────────────

const CHIP_PALETTE = [
  'var(--color-primary)',
  'var(--color-success)',
  'var(--color-info)',
  'var(--color-warning)',
  '#a855f7',
  '#ec4899',
  '#14b8a6',
  '#f97316',
];

function chipColor(idx: number) {
  return CHIP_PALETTE[idx % CHIP_PALETTE.length];
}

// ─── DocSection ───────────────────────────────────────────────────────────────

interface DocSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export function DocSection({ title, description, children, style }: DocSectionProps) {
  return (
    <div style={{ marginBottom: 32, ...style }}>
      <div style={{ marginBottom: description ? 6 : 12 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'var(--color-text-muted)',
        }}>
          {title}
        </span>
        {description && (
          <p style={{ margin: '4px 0 12px', fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

// ─── FeatureGrid ──────────────────────────────────────────────────────────────

export function FeatureGrid({ features }: { features: (string | FeatureEntry)[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 4 }}>
      {features.map((f, i) => {
        const label = typeof f === 'string' ? f : f.label;
        const color = typeof f === 'string' ? chipColor(i) : (f.color ?? chipColor(i));
        const desc = typeof f === 'string' ? undefined : f.description;
        return (
          <span
            key={label}
            title={desc}
            style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '3px 10px', borderRadius: 99,
              fontSize: 11, fontWeight: 600, letterSpacing: '0.01em',
              background: `color-mix(in srgb, ${color} 14%, transparent)`,
              color,
              border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
              cursor: desc ? 'help' : 'default',
            }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}

// ─── PropTable ────────────────────────────────────────────────────────────────

export function PropTable({ props }: { props: PropRow[] }) {
  return (
    <div style={{
      border: '1px solid var(--color-surface-border)',
      borderRadius: 10, overflow: 'hidden', fontSize: 12,
    }}>
      {/* Header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1.4fr 1.6fr 0.8fr 2.5fr',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-surface-border)',
        padding: '7px 12px',
        gap: 8,
      }}>
        {['Prop', 'Type', 'Default', 'Description'].map(h => (
          <span key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
            {h}
          </span>
        ))}
      </div>

      {props.map((p, i) => (
        <div
          key={p.name}
          style={{
            display: 'grid', gridTemplateColumns: '1.4fr 1.6fr 0.8fr 2.5fr',
            padding: '9px 12px', gap: 8, alignItems: 'start',
            background: i % 2 === 0 ? 'transparent' : 'color-mix(in srgb, var(--color-surface) 40%, transparent)',
            borderBottom: i < props.length - 1 ? '1px solid var(--color-surface-border)' : 'none',
          }}
        >
          {/* Prop name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <code style={{
              fontSize: 11.5, fontFamily: 'monospace',
              color: 'var(--color-primary)', fontWeight: 600,
            }}>
              {p.name}
            </code>
            {p.required && (
              <span style={{
                fontSize: 9, fontWeight: 700, color: 'var(--color-error)',
                background: 'color-mix(in srgb, var(--color-error) 12%, transparent)',
                border: '1px solid color-mix(in srgb, var(--color-error) 28%, transparent)',
                borderRadius: 4, padding: '0px 4px',
              }}>
                required
              </span>
            )}
          </div>

          {/* Type */}
          <code style={{
            fontSize: 11, fontFamily: 'monospace',
            color: '#a855f7',
            lineHeight: 1.5,
            wordBreak: 'break-word',
          }}>
            {p.type}
          </code>

          {/* Default */}
          {p.default ? (
            <code style={{
              fontSize: 11, fontFamily: 'monospace',
              color: 'var(--color-success)',
            }}>
              {p.default}
            </code>
          ) : (
            <span style={{ color: 'var(--color-text-muted)', fontSize: 11 }}>—</span>
          )}

          {/* Description */}
          <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
            {p.description}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── EnumTable ────────────────────────────────────────────────────────────────

interface EnumTableProps {
  name: string;
  values: EnumEntry[];
}

export function EnumTable({ name, values }: EnumTableProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 6 }}>
        <code style={{ fontSize: 12, fontFamily: 'monospace', color: '#a855f7', fontWeight: 600 }}>
          {name}
        </code>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {values.map((v, i) => {
          const color = v.color ?? chipColor(i);
          return (
            <div
              key={v.value}
              title={v.description}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', borderRadius: 7,
                border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
                background: `color-mix(in srgb, ${color} 10%, transparent)`,
                cursor: 'help',
              }}
            >
              <code style={{ fontSize: 11, fontFamily: 'monospace', color, fontWeight: 600 }}>
                {v.value}
              </code>
              <span style={{ fontSize: 10.5, color: 'var(--color-text-muted)' }}>
                {v.description}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── DocNote ──────────────────────────────────────────────────────────────────

type NoteType = 'info' | 'warning' | 'tip' | 'danger';

const NOTE_CONFIG: Record<NoteType, { icon: string; color: string; label: string }> = {
  info:    { icon: 'ℹ', color: 'var(--color-info)',    label: 'Note' },
  warning: { icon: '⚠', color: 'var(--color-warning)', label: 'Warning' },
  tip:     { icon: '✦', color: 'var(--color-success)', label: 'Tip' },
  danger:  { icon: '⛔', color: 'var(--color-error)',   label: 'Danger' },
};

export function DocNote({ type = 'info', children }: { type?: NoteType; children: ReactNode }) {
  const cfg = NOTE_CONFIG[type];
  return (
    <div style={{
      display: 'flex', gap: 10,
      padding: '10px 14px', borderRadius: 8, marginBottom: 16,
      background: `color-mix(in srgb, ${cfg.color} 8%, transparent)`,
      border: `1px solid color-mix(in srgb, ${cfg.color} 24%, transparent)`,
    }}>
      <span style={{ color: cfg.color, flexShrink: 0, fontSize: 13, lineHeight: '18px' }}>
        {cfg.icon}
      </span>
      <div>
        <span style={{ fontSize: 11, fontWeight: 700, color: cfg.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {cfg.label}
        </span>
        <div style={{ marginTop: 4, fontSize: 12.5, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── InlineCode ───────────────────────────────────────────────────────────────

export function InlineCode({ children }: { children: string }) {
  return (
    <code style={{
      fontFamily: 'monospace', fontSize: 11.5,
      background: 'var(--color-surface)',
      border: '1px solid var(--color-surface-border)',
      borderRadius: 4, padding: '1px 5px',
      color: 'var(--color-primary)',
    }}>
      {children}
    </code>
  );
}

// ─── SizeReference ────────────────────────────────────────────────────────────

export interface SizeRef { size: string; height: string; font: string; desc: string }

export function SizeReference({ sizes }: { sizes: SizeRef[] }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {sizes.map(s => (
        <div key={s.size} style={{
          padding: '8px 14px', borderRadius: 8,
          border: '1px solid var(--color-surface-border)',
          background: 'var(--color-surface)',
          minWidth: 80, textAlign: 'center',
        }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>
            {s.size}
          </div>
          <div style={{ fontSize: 10, color: 'var(--color-text-muted)', marginTop: 4 }}>h: {s.height}</div>
          <div style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>fs: {s.font}</div>
          <div style={{ fontSize: 10, color: 'var(--color-text-secondary)', marginTop: 2 }}>{s.desc}</div>
        </div>
      ))}
    </div>
  );
}

// ─── VariantRow ───────────────────────────────────────────────────────────────

export interface VariantEntry { label: string; description: string; color: string }

export function VariantRow({ variants }: { variants: VariantEntry[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {variants.map(v => (
        <div key={v.label} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 12px', borderRadius: 8,
          border: `1px solid color-mix(in srgb, ${v.color} 30%, transparent)`,
          background: `color-mix(in srgb, ${v.color} 9%, transparent)`,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: v.color, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: v.color }}>{v.label}</div>
            <div style={{ fontSize: 10.5, color: 'var(--color-text-muted)' }}>{v.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
