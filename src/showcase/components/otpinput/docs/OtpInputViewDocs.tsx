import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, RadiusReference } from '../../../shared/DocComponents';

export function OtpInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Auto-advance focus on digit entry', color: 'var(--color-primary)' },
          { label: 'Backspace navigates back & clears', color: 'var(--color-success)' },
          { label: 'Arrow-key navigation between boxes', color: 'var(--color-info)' },
          { label: 'Paste splits across remaining boxes', color: 'var(--color-warning)' },
          { label: 'onComplete callback when fully filled', color: '#a855f7' },
          { label: 'Numeric-only filtering (toggleable)', color: '#ec4899' },
          { label: 'Configurable length', color: '#14b8a6' },
          { label: 'Disabled state', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Current OTP string. Index i of the string fills box i; shorter strings leave trailing boxes empty.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called with the updated OTP string on every keystroke, backspace, or paste.' },
          { name: 'onComplete', type: '(value: string) => void', description: 'Called once when the OTP string reaches length and contains no empty characters — ideal for triggering auto-submit/verification.' },
          { name: 'length', type: 'number', default: '6', description: 'Number of digit boxes rendered.' },
          { name: 'numeric', type: 'boolean', default: 'true', description: 'When true, only digits 0-9 are accepted (both typed and pasted). Set false to allow any character.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all boxes and dims the input at 50% opacity.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls box height, font size, and gap via the shared input sizing base.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Corner radius for each box — a DuiRadius token or explicit pixel number.' },
          { name: 'color', type: 'string', default: "'var(--color-primary)'", description: 'Accent color for the border of filled boxes.' },
          { name: 'className', type: 'string', description: 'Additional class name applied to the outer flex container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override merged onto the outer flex container.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        OtpInputView is fully controlled — value and onChange are both required. Each keystroke commits the full joined string via onChange, and onComplete only fires once the string has no empty slots.
      </DocNote>

      <DocNote type="tip">
        Pasting a code anywhere in the box sequence automatically splits digits across the remaining boxes starting from the focused index — no extra handling needed to support "paste from SMS" flows.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="OtpInputView reads its dimensions from the shared input category base hook (useInputBase). Omitting size, width, borderRadius, or color on OtpInputView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every input-category component at once."
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
