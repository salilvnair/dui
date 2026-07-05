import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function MaskedInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Token-based mask (9 / A / *)', color: 'var(--color-primary)' },
          { label: 'Literal separators auto-inserted', color: 'var(--color-success)' },
          { label: 'Controlled value + onChange', color: 'var(--color-info)' },
          { label: '8-step DUI size scale', color: 'var(--color-warning)' },
          { label: 'Configurable width tokens', color: '#a855f7' },
          { label: 'Custom border-radius', color: '#ec4899' },
          { label: 'Monospace, letter-spaced rendering', color: '#14b8a6' },
          { label: 'Disabled state', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Current masked value (controlled). Update it from onChange to keep the input in sync.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called with the newly masked string whenever the user types.' },
          { name: 'mask', type: 'string', required: true, description: 'Mask pattern. Tokens: 9 = digit, A = letter, * = any character. Any other character is a literal separator that is auto-inserted as the user types.' },
          { name: 'placeholder', type: 'string', description: 'Placeholder text. Defaults to the mask itself with 9/A tokens replaced by underscores (e.g. "___-___-____").' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input and reduces opacity to 0.5.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Size preset controlling height, font size, and horizontal padding. Falls back to DuiProvider context when omitted.' },
          { name: 'width', type: 'DuiWidth', description: 'Width token for the input (e.g. sm, md, default, lg, fullWidth, maxContent, fw, mx).' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Named radius token (none, sm, md, lg, full) or an explicit pixel number.' },
          { name: 'color', type: 'string', description: 'Accent color passed through to the underlying input-base styling hook.' },
          { name: 'className', type: 'string', default: "''", description: 'Additional class names applied to the input element.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style overrides merged onto the computed input styles.' },
        ]} />
      </DocSection>

      <DocSection title="Mask tokens">
        <EnumTable name="mask token" values={[
          { value: '9', description: 'Matches a single digit (0-9). Non-digit characters are skipped.', color: 'var(--color-primary)' },
          { value: 'A', description: 'Matches a single letter (a-z, A-Z). Non-letter characters are skipped.', color: 'var(--color-info)' },
          { value: '*', description: 'Matches any character.', color: 'var(--color-success)' },
          { value: 'other', description: 'Any other character (e.g. "-", " ", ":") is treated as a literal separator and inserted automatically.', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The mask engine scans the raw typed characters and skips any that don't match the expected token type at that position — so typing letters into a "9999" mask simply drops them rather than showing an error state. There is no built-in validation/error prop; pair this with your own form validation for required-format checks (e.g. verifying full card or SSN length before submit).
      </DocNote>

      <DocNote type="tip">
        Great fits for API-tooling UIs: masking credit card numbers on a billing page, formatting phone numbers in a contact/webhook config, structuring OTP/verification codes, or applying a fixed-format template to license keys and API key fields (e.g. "AAAA-9999-AAAA-9999").
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="MaskedInputView reads its dimensions from the shared input category base hook (useInputBase). Omitting size, width, borderRadius, or color on MaskedInputView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every input-category component at once."
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
