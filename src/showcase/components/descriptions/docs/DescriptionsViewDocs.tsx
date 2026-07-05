import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function DescriptionsViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Label/value grid layout', color: 'var(--color-primary)' },
          { label: 'Configurable column count', color: 'var(--color-success)' },
          { label: 'Per-item column span', color: 'var(--color-info)' },
          { label: 'Optional title header', color: 'var(--color-warning)' },
          { label: 'ReactNode values (chips, badges, links)', color: '#a855f7' },
          { label: 'DuiProvider size context', color: '#ec4899' },
          { label: 'Custom accent color', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'title', type: 'string', description: 'Optional header rendered above the grid, in a bordered top row.' },
          { name: 'items', type: 'DescriptionItem[]', required: true, description: 'Ordered list of label/value pairs rendered in the grid.' },
          { name: 'columns', type: 'number', default: '2', description: 'Number of grid columns. Items wrap into new rows once columns is exceeded.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls font size and spacing. Falls back to DuiProvider context when omitted.' },
          { name: 'color', type: 'string', description: 'Accent color passed to the internal display base (affects title sizing scale; base color hook).' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer bordered container.' },
        ]} />
      </DocSection>

      <DocSection title="DescriptionItem shape">
        <PropTable props={[
          { name: 'label', type: 'string', required: true, description: 'Field name shown above the value in muted text.' },
          { name: 'value', type: 'ReactNode', required: true, description: 'Field value. Accepts plain text, numbers, or rich nodes like ChipView / links.' },
          { name: 'span', type: 'number', description: 'Number of grid columns this item occupies. Default 1 — omit for a normal single-column cell.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        DescriptionsView is read-only by design — there is no edit mode. Pair it with a modal or drawer form when the underlying data needs to change.
      </DocNote>

      <DocNote type="tip">
        Set span equal to columns on an item (e.g. span: 2 when columns={'{2}'}) to give long values — URLs, tokens, full request bodies — a full-width row instead of being squeezed into a narrow cell.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="DescriptionsView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on DescriptionsView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
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
