import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function ConnectionPulseLineViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Connects any two arbitrary DOM elements', color: 'var(--color-primary)' },
          { label: 'Dashed line with traveling pulse dot', color: 'var(--color-success)' },
          { label: 'Auto-recomputes on resize via ResizeObserver', color: 'var(--color-info)' },
          { label: 'Absolutely positioned overlay (pointer-events: none)', color: 'var(--color-warning)' },
          { label: 'Custom accent color', color: '#a855f7' },
          { label: 'Renders null until refs resolve', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'containerRef', type: 'RefObject<HTMLElement | null>', required: true, description: 'A positioned ancestor (e.g. position: relative) that both `from` and `to` live inside. Coordinates are computed relative to it.' },
          { name: 'from', type: 'RefObject<HTMLElement | null>', required: true, description: 'The source element — the line starts at its center.' },
          { name: 'to', type: 'RefObject<HTMLElement | null>', required: true, description: 'The target element — the line ends at its center, and the pulse dot travels toward it.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Color of the dashed line and pulse dot.' },
          { name: 'size', type: 'DuiSize', description: 'Passed through to DisplayBase for context/color resolution.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the SVG overlay.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the SVG overlay.' },
        ]} />
      </DocSection>

      <DocNote type="warning">
        `containerRef` must have `position: relative` (or another positioning context) — the SVG overlay is rendered with `position: absolute; inset: 0` and sized to the container's bounding box. Without a positioned ancestor, the line will be placed relative to the nearest positioned ancestor further up the tree, which is usually not what you want.
      </DocNote>

      <DocNote type="tip">
        The component recalculates the line on window resize and via a `ResizeObserver` on `containerRef`, so it stays correct through layout shifts (e.g. sidebar collapse, responsive reflow) without any manual re-render trigger. It renders `null` on the first paint before all three refs are attached — safe to mount before your target elements exist.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ConnectionPulseLineView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on ConnectionPulseLineView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useDisplayBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '8px', desc: 'icon 8px' },
          { size: 'xs', height: '—', font: '9px', desc: 'icon 10px' },
          { size: 'sm', height: '—', font: '10px', desc: 'icon 11px' },
          { size: 'md', height: '—', font: '11px', desc: 'icon 12px' },
          { size: 'lg', height: '—', font: '12px', desc: 'icon 14px' },
          { size: 'xl', height: '—', font: '13px', desc: 'icon 16px' },
          { size: 'xxl', height: '—', font: '14px', desc: 'icon 18px' },
          { size: 'xxxl', height: '—', font: '16px', desc: 'icon 20px' },
        ]} />
        <DocNote type="info">
          These values come from the Display category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every display-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
