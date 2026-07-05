import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function MasonryGridViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Pure CSS columns — no JS measurement', color: 'var(--color-primary)' },
          { label: 'Configurable column count', color: 'var(--color-success)' },
          { label: 'break-inside: avoid keeps cards intact', color: 'var(--color-info)' },
          { label: 'DuiProvider size context (gap)', color: 'var(--color-warning)' },
          { label: 'Works with any variable-height children', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'children', type: 'ReactNode[]', required: true, description: 'Array of items to lay out — each item becomes one masonry block.' },
          { name: 'columns', type: 'number', default: '3', description: 'Number of CSS columns (column-count).' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls the gap between items via the DUI layout token scale. Falls back to DuiProvider context when omitted.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the grid container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the grid container.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Layout is done entirely with CSS multi-column (column-count + break-inside: avoid), so items fill top-to-bottom within each column rather than left-to-right row by row — this is what gives the balanced Pinterest look without measuring DOM heights in JS.
      </DocNote>

      <DocNote type="warning">
        Because children must be an array (ReactNode[]), pass items via .map() or an explicit array literal rather than a single JSX fragment — a bare single child will fail the type check.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="MasonryGridView reads its dimensions from the shared layout category base hook (useLayoutBase). Omitting size, width, borderRadius, or color on MasonryGridView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every layout-category component at once."
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
