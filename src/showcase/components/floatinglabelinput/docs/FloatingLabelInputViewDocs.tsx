import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function FloatingLabelInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Floating label input', color: 'var(--color-primary)' },
          { label: 'Floats on focus or when filled', color: 'var(--color-success)' },
          { label: 'Any input type (text, password, email, …)', color: 'var(--color-info)' },
          { label: 'Disabled state', color: 'var(--color-warning)' },
          { label: 'Width presets', color: '#a855f7' },
          { label: 'Custom borderRadius + accent color', color: '#ec4899' },
          { label: 'DuiProvider size context', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'label', type: 'string', required: true, description: 'The label text, statically centered as a placeholder until focus/value floats it above the field.' },
          { name: 'value', type: 'string', required: true, description: 'Controlled input value.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called with the new value on every keystroke.' },
          { name: 'type', type: 'string', default: "'text'", description: 'Native input type attribute, e.g. text, password, email, number.' },
          { name: 'disabled', type: 'boolean', description: 'Disables the input; dims opacity.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls height, padding, and font size. Falls back to DuiProvider context.' },
          { name: 'width', type: 'DuiWidth', description: 'Named width preset for the input container.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Named radius preset or raw px number.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color used for the focused border and the floated label.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        This is distinct from TextInputView, which uses a static placeholder that disappears on typing. Reach for FloatingLabelInputView when you want the label to remain visible as a persistent context cue after the user starts typing — e.g. dense settings forms.
      </DocNote>

      <DocNote type="tip">
        The floated state is derived from focused || value.length {'>'} 0, so a pre-filled controlled value (e.g. editing an existing environment variable) renders with the label already floated on first mount, with no flash of overlapping text.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="FloatingLabelInputView reads its dimensions from the shared input category base hook (useInputBase). Omitting size, width, borderRadius, or color on FloatingLabelInputView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every input-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useInputBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '16px', font: '8px', desc: 'padX 4px' },
          { size: 'xs', height: '20px', font: '9px', desc: 'padX 6px' },
          { size: 'sm', height: '24px', font: '10px', desc: 'padX 8px' },
          { size: 'md', height: '28px', font: '11px', desc: 'padX 10px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'padX 12px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'padX 16px' },
          { size: 'xxl', height: '48px', font: '14px', desc: 'padX 20px' },
          { size: 'xxxl', height: '56px', font: '16px', desc: 'padX 24px' },
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
          These values come from the Input category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every input-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
