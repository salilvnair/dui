import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, RadiusReference } from '../../../shared/DocComponents';

export function InviteInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Email-chip multi-value input', color: 'var(--color-primary)' },
          { label: 'Enter / comma to commit', color: 'var(--color-info)' },
          { label: 'Regex email validation', color: 'var(--color-warning)' },
          { label: 'Backspace to remove last chip', color: 'var(--color-success)' },
          { label: 'Per-chip remove button', color: '#a855f7' },
          { label: 'Disabled state', color: '#14b8a6' },
          { label: 'DuiSize + custom borderRadius', color: 'var(--color-error)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'emails', type: 'string[]', required: true, description: 'Controlled list of committed, validated email addresses.' },
          { name: 'onChange', type: '(emails: string[]) => void', required: true, description: 'Called whenever a chip is added or removed.' },
          { name: 'placeholder', type: 'string', default: '"Enter email and press Enter…"', description: 'Placeholder text shown in the text field when there are no chips yet.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the text field and dims the whole input.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls input height and font size via the DUI input base.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Overrides the input border radius.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for chip background/text.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="warning">
        Invalid input (failing the built-in email regex) shows a red border but does not surface an inline error message — commit is silently rejected on blur or Enter. Consider adding your own validation summary above the field for accessibility.
      </DocNote>

      <DocNote type="tip">
        Pressing Backspace with an empty draft removes the last committed chip, matching the common "email/tag input" UX pattern used in TagInputView — reuse that mental model when explaining this component to users.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="InviteInputView reads its dimensions from the shared input category base hook (useInputBase). Omitting size, width, borderRadius, or color on InviteInputView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every input-category component at once."
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
