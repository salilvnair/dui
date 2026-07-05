import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote } from '../../../shared/DocComponents';

export function RatingViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Star or heart glyph', color: 'var(--color-primary)' },
          { label: 'Half-step precision (allowHalf)', color: 'var(--color-success)' },
          { label: 'Hover preview before commit', color: 'var(--color-info)' },
          { label: 'Read-only display mode', color: 'var(--color-warning)' },
          { label: 'Configurable max count', color: '#a855f7' },
          { label: 'Custom accent color', color: '#ec4899' },
          { label: 'DuiProvider size context', color: '#14b8a6' },
          { label: 'SVG gradient half-fill rendering', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'number', required: true, description: 'Current rating value, e.g. 3 or 3.5 when allowHalf is true.' },
          { name: 'onChange', type: '(value: number) => void', description: 'Called with the new rating when a glyph is clicked. Omit alongside readOnly for a display-only rating.' },
          { name: 'max', type: 'number', default: '5', description: 'Total number of glyphs rendered.' },
          { name: 'allowHalf', type: 'boolean', default: 'false', description: 'Allow selecting half steps (e.g. 3.5) by clicking the left or right half of a glyph.' },
          { name: 'readOnly', type: 'boolean', default: 'false', description: 'Disables all pointer interaction; glyphs render the value with no hover state.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Drives icon size via DUI_ICON_SIZE (multiplied 1.6x). Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: "ctx.activeColor ?? 'var(--color-warning)'", description: 'Fill color for active/filled glyphs. Empty glyphs use a muted translucent tint.' },
          { name: 'icon', type: "'star' | 'heart'", default: "'star'", description: 'Glyph shape to render.' },
          { name: 'className', type: 'string', description: 'Additional class name applied to the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override merged onto the outer container.' },
        ]} />
      </DocSection>

      <DocSection title="icon enum">
        <EnumTable name="RatingView icon" values={[
          { value: 'star', description: 'Default 5-point star glyph.', color: 'var(--color-warning)' },
          { value: 'heart', description: 'Heart glyph — useful for favorite/like ratings.', color: 'var(--color-error)' },
        ]} />
      </DocSection>

      <DocNote type="info">
        When allowHalf is enabled, clicking or hovering the left half of a glyph commits a .5 value; the right half commits the next whole number. This is determined by cursor X position relative to the glyph's bounding box.
      </DocNote>

      <DocNote type="tip">
        For display-only aggregate scores (e.g. "4.5 avg over 128 runs"), pass readOnly without an onChange handler — there's no need to wire up a no-op callback.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="RatingView reads <code>size</code>, <code>color</code>, and related style props directly from the DuiProvider context via useDui() rather than through a shared category base hook. Omitting a local size or color prop falls back to the nearest <DuiProvider> value."
      >
        <FeatureGrid features={[
          { label: 'useDui() context read', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / color overrides', color: 'var(--color-info)' },
        ]} />
        <DocNote type="info">
          RatingView derives its own local size map from the resolved <code>size</code> value rather than sharing one of the category base hooks (e.g. useInputBase, useButtonBase). Behavior is still provider-aware: change <code>{'<DuiProvider size="...">'}</code> to restyle this component along with the rest of the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
