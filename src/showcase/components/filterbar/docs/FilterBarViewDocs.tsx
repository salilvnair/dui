import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function FilterBarViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Chip-based active filter row', color: 'var(--color-primary)' },
          { label: 'Per-filter removal', color: 'var(--color-success)' },
          { label: 'Optional clear-all action', color: 'var(--color-info)' },
          { label: 'Custom accent color', color: 'var(--color-warning)' },
          { label: 'Renders null when empty', color: '#a855f7' },
          { label: 'Built on useChipBase sizing', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'filters', type: 'FilterBarFilter[]', required: true, description: 'Active filters to render, each { key, label }.' },
          { name: 'onRemove', type: '(key: string) => void', required: true, description: 'Called with a filter\'s key when its remove (×) icon is clicked.' },
          { name: 'onClearAll', type: '() => void', description: 'When provided, renders a trailing "Clear all" text button.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls chip height, padding, and font size.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for every chip — drives text color, translucent background tint, and the remove icon color.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer row container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override on the outer row container.' },
        ]} />
      </DocSection>

      <DocNote type="warning">
        FilterBarView returns null when filters is an empty array — it does not render an empty row. Do not rely on it for layout spacing; wrap it in a container with a fixed min-height if you need the toolbar row to hold its place.
      </DocNote>

      <DocNote type="tip">
        All chips in the bar share a single color. To differentiate filter types (e.g. errors vs. environment), render separate FilterBarView instances or use ChipView directly for mixed-color filter rows.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="FilterBarView reads its dimensions from the shared chip category base hook (useChipBase). Omitting size, borderRadius, or color on FilterBarView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every chip-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useChipBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '10px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'xs', height: '12px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'sm', height: '16px', font: '9px', desc: 'padX 5px, radius full' },
          { size: 'md', height: '20px', font: '10px', desc: 'padX 7px, radius full' },
          { size: 'lg', height: '24px', font: '11px', desc: 'padX 9px, radius full' },
          { size: 'xl', height: '28px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'xxl', height: '32px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'xxxl', height: '38px', font: '12px', desc: 'padX 11px, radius full' },
        ]} />
        <DocNote type="info">
          These values come from the Chip category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every chip-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
