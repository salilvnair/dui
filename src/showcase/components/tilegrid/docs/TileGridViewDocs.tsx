import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function TileGridViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Recursive ancestor/parent/child nesting', color: 'var(--color-primary)' },
          { label: 'Per-node flex weight', color: 'var(--color-success)' },
          { label: 'Per-node vertical stacking', color: 'var(--color-info)' },
          { label: 'Top-level vertical orientation', color: 'var(--color-warning)' },
          { label: 'Zero-config responsive flex wrapping via minWidth: 0', color: '#a855f7' },
          { label: 'DuiProvider size-driven gap', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'nodes', type: 'TileNode[]', required: true, description: 'Top-level tile nodes to render as a row (or column when vertical is true).' },
          { name: 'vertical', type: 'boolean', default: 'false', description: 'Stack the top-level nodes array vertically instead of horizontally.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls the gap between tiles at every nesting level. Falls back to DuiProvider context when omitted.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override merged onto the outer container.' },
        ]} />
      </DocSection>

      <DocSection title="TileNode shape">
        <PropTable props={[
          { name: 'content', type: 'ReactNode', description: 'Leaf content for this node. Mutually exclusive with children — a node is either a leaf or a nested sub-grid.' },
          { name: 'children', type: 'TileNode[]', description: 'Nested tiles. When present, this node renders as a sub-grid ("parent" wrapping an "ancestor") instead of leaf content.' },
          { name: 'vertical', type: 'boolean', description: "Stack this node's own children vertically instead of horizontally." },
          { name: 'weight', type: 'number', default: '1', description: 'Flex-grow weight relative to sibling nodes at the same level.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        TileGridView is a recursive tile layout primitive: nodes recurse arbitrarily deep, so a "parent" tile can contain "child" tiles which can themselves contain further nested tiles — useful for dashboard-style layouts with mixed row/column regions.
      </DocNote>

      <DocNote type="warning">
        A TileNode should set either content or children, not both — if children is present it takes precedence and content is ignored for that node.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="TileGridView reads its dimensions from the shared layout category base hook (useLayoutBase). Omitting size, width, borderRadius, or color on TileGridView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every layout-category component at once."
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
