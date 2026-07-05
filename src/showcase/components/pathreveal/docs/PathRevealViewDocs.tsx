import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function PathRevealViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Generic SVG stroke-draw reveal primitive', color: 'var(--color-primary)' },
          { label: 'Single path or array of paths', color: 'var(--color-success)' },
          { label: 'Uses getTotalLength() for an accurate draw', color: 'var(--color-info)' },
          { label: 'Configurable draw duration', color: 'var(--color-warning)' },
          { label: 'Custom stroke color and width', color: '#a855f7' },
          { label: 'Re-draws on remount (change key to replay)', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'd', type: 'string | string[]', required: true, description: 'One or more SVG path `d` strings. Each draws itself independently on mount.' },
          { name: 'viewBox', type: 'string', default: '"0 0 100 100"', description: 'SVG viewBox attribute.' },
          { name: 'width', type: 'number', default: '100', description: 'Rendered SVG width in pixels.' },
          { name: 'height', type: 'number', default: '100', description: 'Rendered SVG height in pixels.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Stroke color applied to all paths.' },
          { name: 'strokeWidth', type: 'number', default: '2', description: 'Stroke width applied to all paths.' },
          { name: 'duration', type: 'number', default: '1200', description: 'Draw animation duration in milliseconds. Set to 0 to render the path immediately with no animation.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the SVG element.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the SVG element.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        There's no imperative "replay" method — to retrigger the draw, force a remount by changing the component's React `key` (e.g. bump a counter on a button click). All paths in a multi-path `d` array animate simultaneously and independently, each using its own computed length.
      </DocNote>

      <DocNote type="info">
        The animation relies on `SVGPathElement.getTotalLength()`, computed in a `useEffect` after mount, so there's a one-frame delay (`requestAnimationFrame`) before the draw-in transition starts. This is expected and prevents the path from briefly flashing fully visible before animating.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="PathRevealView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          PathRevealView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
