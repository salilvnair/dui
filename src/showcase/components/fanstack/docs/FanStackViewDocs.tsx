import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function FanStackViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Tiles fan out of an anchor on open', color: 'var(--color-primary)' },
          { label: 'Straight stack, or an arc via angleStep', color: 'var(--color-success)' },
          { label: 'Sweeps up-left or up-right', color: 'var(--color-info)' },
          { label: 'Per-tile colour', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="A small set of actions that spring out of a floating button. The anchor is whatever you position it inside — the component draws only the tiles, so the trigger stays yours."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'items', type: 'FanStackItem[]', required: true, description: 'Each with an id, an icon, a label and an optional colour.' },
          { name: 'open', type: 'boolean', required: true, description: 'Whether the tiles are out.' },
          { name: 'onSelect', type: '(id: string) => void', required: true, description: 'A tile was chosen.' },
          { name: 'direction', type: "'up-left' | 'up-right'", description: 'Which way the arc sweeps out of its anchor.' },
          { name: 'radius', type: 'number', description: 'Distance from the anchor to the first tile.' },
          { name: 'spread', type: 'number', description: 'Extra distance per tile — the gap between consecutive tiles.' },
          { name: 'angleStep', type: 'number', default: '0', description: 'Degrees of sweep added per tile. 0 stacks them straight up.' },
          { name: 'tileSize', type: 'number', description: 'Tile box in px.' },
          { name: 'color', type: 'string', description: 'Default tile colour.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
        ]} />
      </DocSection>
    </div>
  );
}
