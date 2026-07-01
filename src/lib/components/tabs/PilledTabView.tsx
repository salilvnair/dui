/**
 * PilledTabView — SwiftUI-style segmented control with a sliding pill.
 *
 * Ditto from ck8t's `.bs-inspector-modes` / `.bs-inspector-pill` pattern.
 * Pure inline styles so it works without any CSS import.
 *
 * Usage:
 *   <PilledTabView
 *     tabs={[{ id: 'basic', label: 'Basic' }, { id: 'advanced', label: 'Advanced' }]}
 *     activeId={tab}
 *     onChange={setTab}
 *   />
 */
import { useEffect, useRef, useState } from 'react'

export interface PilledTab {
  id: string
  label: string
}

export interface PilledTabViewProps {
  tabs: PilledTab[]
  activeId: string
  onChange: (id: string) => void
  /** CSS color or variable for the active pill background. Defaults to indigo. */
  accentColor?: string
  /**
   * `'rounded'` — subtle rounded corners (default, border-radius 8/6).
   * `'pill'`    — fully pill-shaped corners (border-radius 999).
   */
  mode?: 'rounded' | 'pill'
  className?: string
  style?: React.CSSProperties
}

export function PilledTabView({
  tabs,
  activeId,
  onChange,
  accentColor,
  mode = 'rounded',
  className,
  style,
}: PilledTabViewProps) {
  const activeIdx = Math.max(0, tabs.findIndex((t) => t.id === activeId))
  const accent = accentColor ?? 'var(--color-primary, rgba(99,102,241,1))'
  const isPill = mode === 'pill'
  const containerRadius = isPill ? 999 : 8
  const pillRadius = isPill ? 999 : 6
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)

  useEffect(() => {
    const el = btnRefs.current[activeIdx]
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth })
  }, [activeIdx, tabs])

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'inline-flex',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: containerRadius,
        padding: 2,
        gap: 0,
        ...style,
      }}
    >
      {/* Sliding pill — tracks actual button bounds */}
      {pill && (
        <div
          style={{
            position: 'absolute',
            top: 2,
            bottom: 2,
            left: pill.left,
            width: pill.width,
            borderRadius: pillRadius,
            background: `color-mix(in srgb, ${accent} 22%, transparent)`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.06)',
            transition: 'left 380ms cubic-bezier(0.34, 1.56, 0.64, 1), width 380ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            pointerEvents: 'none',
          }}
        />
      )}
      {tabs.map((tab, i) => {
        const isActive = tab.id === activeId
        return (
          <button
            key={tab.id}
            ref={(el) => { btnRefs.current[i] = el }}
            onClick={() => onChange(tab.id)}
            style={{
              position: 'relative',
              flex: 'none',
              padding: '4px 14px',
              borderRadius: pillRadius,
              fontSize: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.09em',
              background: 'transparent',
              color: isActive ? accent : 'var(--color-text-muted, #64748b)',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 200ms ease',
              textAlign: 'center',
              zIndex: 1,
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
