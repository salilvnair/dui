import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, RadiusReference } from '../../../shared/DocComponents';

export function StepperInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'iOS UIStepper-style +/- control', color: 'var(--color-primary)' },
          { label: 'min / max / step clamping', color: 'var(--color-success)' },
          { label: 'Editable center text field', color: 'var(--color-info)' },
          { label: 'Auto-disables buttons at bounds', color: 'var(--color-warning)' },
          { label: 'DuiProvider size context', color: '#a855f7' },
          { label: 'Custom accent color', color: '#ec4899' },
          { label: 'Disabled state', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'number', required: true, description: 'Current numeric value.' },
          { name: 'onChange', type: '(value: number) => void', required: true, description: 'Called with the new clamped value on increment, decrement, or direct text edit.' },
          { name: 'min', type: 'number', default: '-Infinity', description: 'Minimum allowed value. Decrement button disables when reached.' },
          { name: 'max', type: 'number', default: 'Infinity', description: 'Maximum allowed value. Increment button disables when reached.' },
          { name: 'step', type: 'number', default: '1', description: 'Amount added/subtracted per click.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the entire control and dims it to 50% opacity.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Size of the control. Falls back to DuiProvider context when omitted.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Border radius preset or raw px value for the outer container.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for the +/- icons.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The center field is a real text input with inputMode="decimal" — users can type a value directly, not just click the buttons. Non-numeric input is silently ignored (NaN is filtered before onChange fires).
      </DocNote>

      <DocNote type="info">
        Increment/decrement buttons disable automatically once value reaches min or max — you don't need to manage that state yourself, just clamp on your own if you also allow free typing beyond bounds.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="StepperInputView reads its dimensions from the shared input category base hook (useInputBase). Omitting size, width, borderRadius, or color on StepperInputView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every input-category component at once."
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
