import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function LevelViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Space-between two-slot layout', color: 'var(--color-primary)' },
          { label: 'Left / right groups accept any ReactNode', color: 'var(--color-success)' },
          { label: 'Size-driven gap between grouped items', color: 'var(--color-info)' },
          { label: 'Full width by default', color: 'var(--color-warning)' },
          { label: 'Zero visual chrome — pure layout primitive', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'left', type: 'ReactNode', description: 'Content rendered in the left-aligned group.' },
          { name: 'right', type: 'ReactNode', description: 'Content rendered in the right-aligned group.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls the gap between items within each side group. Falls back to DuiProvider context when omitted.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override merged onto the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        LevelView is a bare flex row primitive with justify-content: space-between. It renders no background, border, or padding of its own, so it composes cleanly as a toolbar strip inside panels, cards, or page headers.
      </DocNote>

      <DocNote type="tip">
        Pass a React fragment with multiple children to left or right to group several controls (e.g. a chip plus a path string) while keeping single-slot semantics for the space-between split.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="LevelView reads its dimensions from the shared layout category base hook (useLayoutBase). Omitting size, width, borderRadius, or color on LevelView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every layout-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useLayoutBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '8px', desc: 'pad 32px' },
          { size: 'xs', height: '—', font: '9px', desc: 'pad 32px' },
          { size: 'sm', height: '—', font: '10px', desc: 'pad 12px' },
          { size: 'md', height: '—', font: '11px', desc: 'pad 16px' },
          { size: 'lg', height: '—', font: '12px', desc: 'pad 24px' },
          { size: 'xl', height: '—', font: '13px', desc: 'pad 32px' },
          { size: 'xxl', height: '—', font: '14px', desc: 'pad 32px' },
          { size: 'xxxl', height: '—', font: '16px', desc: 'pad 32px' },
        ]} />
        <DocNote type="info">
          These values come from the Layout category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every layout-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
