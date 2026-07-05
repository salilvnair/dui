import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function AffixViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Sticky-on-scroll wrapper', color: 'var(--color-primary)' },
          { label: 'Configurable offsetTop', color: 'var(--color-success)' },
          { label: 'onStickyChange callback', color: 'var(--color-info)' },
          { label: 'data-stuck attribute for CSS hooks', color: 'var(--color-warning)' },
          { label: 'Zero dependencies — pure scroll/resize listeners', color: '#a855f7' },
          { label: 'Uses native position: sticky under the hood', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'Content to pin — typically a toolbar, header, or action bar.' },
          { name: 'offsetTop', type: 'number', default: '0', description: 'Distance from the viewport (or scroll container) top before the content sticks.' },
          { name: 'onStickyChange', type: '(stuck: boolean) => void', description: 'Called whenever the stuck state flips. Useful for adding a shadow or highlight once pinned.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the wrapper.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        AffixView renders a single wrapper with position: sticky — it does not clone or measure a separate placeholder. The "stuck" detection compares the wrapper's own bounding rect against offsetTop on scroll and resize.
      </DocNote>

      <DocNote type="tip">
        Style the pinned state declaratively with the data-stuck="true" attribute (e.g. a CSS rule targeting [data-stuck="true"] to add a box-shadow), or drive React state via onStickyChange when you need conditional content, not just conditional styling.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="AffixView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          AffixView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
