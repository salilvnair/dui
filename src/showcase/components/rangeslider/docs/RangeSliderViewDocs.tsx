import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function RangeSliderViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Dual-handle min/max range', color: 'var(--color-primary)' },
          { label: 'Pointer-drag based (touch + mouse)', color: 'var(--color-success)' },
          { label: 'Configurable min / max / step', color: 'var(--color-info)' },
          { label: 'Optional inline value display', color: 'var(--color-warning)' },
          { label: 'Disabled state', color: '#a855f7' },
          { label: 'Custom accent color + width', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: '[number, number]', required: true, description: 'Current [low, high] tuple.' },
          { name: 'onChange', type: '(value: [number, number]) => void', required: true, description: 'Called continuously while dragging with the updated [low, high] tuple.' },
          { name: 'min', type: 'number', default: '0', description: 'Minimum selectable value.' },
          { name: 'max', type: 'number', default: '100', description: 'Maximum selectable value.' },
          { name: 'step', type: 'number', default: '1', description: 'Snap increment for both handles.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables dragging and dims the track.' },
          { name: 'size', type: 'DuiSize', description: 'Reserved for future size-driven styling (currently unused in rendering).' },
          { name: 'accentColor', type: 'string', default: 'var(--color-primary)', description: 'Color of the fill track and both thumbs.' },
          { name: 'width', type: 'number | string', default: '200', description: 'Track width in pixels (or any CSS width string).' },
          { name: 'showValue', type: 'boolean', default: 'false', description: 'Renders the current low–high values as text next to the track.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override on the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        RangeSliderView is distinct from SliderView (single-handle). Use it for min/max band selection like a latency filter or a status-code range, not for a single scalar value like volume or zoom.
      </DocNote>

      <DocNote type="warning">
        The low handle can never be dragged past the high handle and vice versa — onChange automatically clamps each handle against the other, so consumers don't need to guard against an inverted range.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="RangeSliderView declares a size prop in its type signature, but the current implementation does not yet read it or fall back to DuiProvider context — track/handle dimensions are fixed regardless of the ambient size."
      >
        <FeatureGrid features={[
          { label: 'size prop reserved, not yet wired', color: 'var(--color-warning)' },
          { label: 'No DuiProvider fallback yet', color: 'var(--color-error)' },
        ]} />
        <DocNote type="warning">
          Track height, handle diameter, and label font size are currently fixed constants — passing size has no visual effect. Use width, accentColor, and style for the overrides that are actually supported today.
        </DocNote>
      </DocSection>
      </div>
  );
}
