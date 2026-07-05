import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function SchemaBlueprintViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'JSON Schema / OpenAPI spec as an architectural blueprint', color: 'var(--color-primary)' },
          { label: 'Graph-paper background styling', color: 'var(--color-success)' },
          { label: 'Dashed right-angle connectors between related nodes', color: 'var(--color-info)' },
          { label: 'Automatic multi-column grid layout', color: 'var(--color-warning)' },
          { label: 'Auto-sizes node height to field count', color: '#a855f7' },
          { label: 'DuiProvider size context', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'nodes', type: 'SchemaBlueprintNode[]', required: true, description: 'The schema entities to render, laid out left-to-right, top-to-bottom in a grid.' },
          { name: 'width', type: 'number', default: '560', description: 'Total canvas width in pixels. Also determines how many columns fit (width / (160 + 40)).' },
          { name: 'height', type: 'number', default: '320', description: 'Canvas height in pixels. Content scrolls if nodes overflow.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls the base font size used as a fallback; field rows use a fixed 10px regardless. Falls back to DuiProvider context.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocSection title="SchemaBlueprintNode shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Stable identifier, referenced by other nodes\' connectsTo.' },
          { name: 'title', type: 'string', required: true, description: 'Entity name shown in the node header.' },
          { name: 'fields', type: 'SchemaBlueprintField[]', required: true, description: 'Array of { name, type } rows shown inside the node.' },
          { name: 'connectsTo', type: 'string[]', description: 'IDs of nodes this one references (e.g. a foreign object/ref field). Draws a dashed right-angle connector to each.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Node width is fixed at 160px and column count is derived purely from the width prop — there's currently no way to override per-node width. For schemas with long field type names, widen the width prop rather than expecting text to wrap.
      </DocNote>

      <DocNote type="tip">
        connectsTo only draws forward references from the referencing node to the referenced one — if you want a bidirectional-looking connection, add the reverse id to both nodes' connectsTo arrays, or accept the implied directionality (source has the ref field, so the arrow reads naturally as "points to").
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="SchemaBlueprintView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on SchemaBlueprintView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
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
