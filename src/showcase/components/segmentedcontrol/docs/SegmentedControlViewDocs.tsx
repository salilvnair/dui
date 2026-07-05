import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function SegmentedControlViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Solid sliding indicator', color: 'var(--color-primary)' },
          { label: 'Springy "bounce" transition', color: 'var(--color-success)' },
          { label: '3 shape variants: pill / rounded / pointy', color: 'var(--color-info)' },
          { label: 'Full-width equal-share segments', color: 'var(--color-warning)' },
          { label: 'Arrow-key navigation between segments', color: '#a855f7' },
          { label: 'Per-option disabled entries', color: '#ec4899' },
          { label: 'Icon + label per segment', color: '#14b8a6' },
          { label: 'Shares TabBase sizing with tabs/buttons', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'options', type: 'SegmentedControlOption[]', required: true, description: 'Segments to render, in order.' },
          { name: 'value', type: 'string', required: true, description: 'Currently selected option value.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called with the new value when a segment is selected.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Size of the control. Falls back to DuiProvider context.' },
          { name: 'variant', type: 'SegmentedControlVariant', default: "'pill'", description: "Shape of the track/indicator. 'pill' = fully rounded ends (iOS default), 'rounded' = size-based radius, 'pointy' = sharp square corners." },
          { name: 'accentColor', type: 'string', default: "'var(--color-primary)'", description: 'Solid fill color of the active sliding indicator.' },
          { name: 'fullWidth', type: 'boolean', description: 'Stretch to fill container width, with segments sharing it equally.' },
          { name: 'width', type: 'DuiWidth', description: 'Width preset for the control.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Explicit radius override — takes precedence over variant.' },
          { name: 'color', type: 'string', description: 'Inactive label text color override.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all segments and dims the control.' },
          { name: 'className', type: 'string', description: 'Additional CSS class names on the outer container.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocSection title="SegmentedControlOption shape">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Underlying value for the segment.' },
          { name: 'label', type: 'string', required: true, description: 'Text displayed on the segment.' },
          { name: 'icon', type: 'ReactNode', description: 'Optional icon rendered before the label.' },
          { name: 'disabled', type: 'boolean', description: 'When true, the segment cannot be selected via click or arrow keys.' },
        ]} />
      </DocSection>

      <DocSection title="SegmentedControlVariant enum">
        <EnumTable name="SegmentedControlVariant" values={[
          { value: 'pill', description: 'Fully rounded ends — the default pill shape.', color: 'var(--color-primary)' },
          { value: 'rounded', description: 'Radius derived from the current size preset.', color: 'var(--color-success)' },
          { value: 'pointy', description: 'Sharp square corners, no rounding.', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The active segment fill uses accentColor while inactive labels use color (or the size-based default). borderRadius, when supplied, overrides the radius implied by variant.
      </DocNote>

      <DocNote type="tip">
        Use arrow-left / arrow-right for keyboard navigation once the control has focus — disabled segments are automatically skipped.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="SegmentedControlView reads its dimensions from the shared tab category base hook (useTabBase). Omitting size, width, borderRadius, or color on SegmentedControlView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every tab-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useTabBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '16px', font: '8px', desc: 'padX 18px' },
          { size: 'xs', height: '20px', font: '9px', desc: 'padX 18px' },
          { size: 'sm', height: '24px', font: '10px', desc: 'padX 10px' },
          { size: 'md', height: '28px', font: '11px', desc: 'padX 12px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'padX 14px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'padX 18px' },
          { size: 'xxl', height: '48px', font: '14px', desc: 'padX 18px' },
          { size: 'xxxl', height: '56px', font: '16px', desc: 'padX 18px' },
        ]} />
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 8 }}>
          Width presets, resolved via the <code>width</code> prop or the nearest <code>{'<DuiProvider width="...">'}</code>:
        </div>
        <WidthReference widths={[
          { width: 'sm', value: '80px' },
          { width: 'md', value: '120px' },
          { width: 'default', value: 'auto' },
          { width: 'lg', value: '200px' },
          { width: 'fullWidth', value: '100%' },
          { width: 'maxContent', value: 'max-content' },
          { width: 'fw', value: '100%' },
          { width: 'mx', value: 'max-content' },
        ]} />
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 8 }}>
          Border radius presets, resolved via the <code>borderRadius</code> prop:
        </div>
        <RadiusReference radii={[
          { radius: 'none', value: '0px' },
          { radius: 'sm', value: '3px' },
          { radius: 'md', value: '4px' },
          { radius: 'lg', value: '6px' },
          { radius: 'full', value: 'full' },
        ]} />
        <DocNote type="info">
          These values come from the Tab category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every tab-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
