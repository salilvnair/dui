import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function PhoneInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Dial-code select + number field combo', color: 'var(--color-primary)' },
          { label: '10 built-in countries with flags', color: 'var(--color-success)' },
          { label: 'Custom country list override', color: 'var(--color-info)' },
          { label: 'Numeric character filtering', color: 'var(--color-warning)' },
          { label: 'DuiSize + DuiWidth support', color: '#a855f7' },
          { label: 'Disabled state', color: '#ec4899' },
          { label: 'Custom accent color', color: '#14b8a6' },
          { label: 'Configurable border radius', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'countryCode', type: 'string', required: true, description: "Currently selected country's code (e.g. 'US'), matching a PhoneCountry.code from the countries list." },
          { name: 'onCountryChange', type: '(code: string) => void', required: true, description: 'Called with the new country code when the dial-code select changes.' },
          { name: 'number', type: 'string', required: true, description: 'Current phone number string (digits, spaces, and hyphens only).' },
          { name: 'onNumberChange', type: '(number: string) => void', required: true, description: 'Called with the filtered number string on every keystroke. Non 0-9/space/hyphen characters are stripped before this fires.' },
          { name: 'countries', type: 'PhoneCountry[]', default: 'DEFAULT_PHONE_COUNTRIES', description: 'List of selectable countries: { code, dialCode, label, flag? }. Defaults to a built-in 10-country list (US, GB, IN, CA, AU, DE, FR, JP, SG, AE).' },
          { name: 'placeholder', type: 'string', default: "'Phone number'", description: 'Placeholder text for the number input.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables both the country select and number input, dimming the whole field.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls font size and padding via the shared input sizing base.' },
          { name: 'width', type: 'DuiWidth', description: "Field width token, e.g. 'sm' | 'md' | 'default' | 'lg' | 'fullWidth' | 'maxContent' | 'fw' | 'mx'." },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Corner radius for the outer container — a DuiRadius token or explicit pixel number.' },
          { name: 'color', type: 'string', description: 'Accent color passed through to the internal input sizing base (affects focus/accent styling).' },
          { name: 'className', type: 'string', description: 'Additional class name applied to the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override merged onto the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        PhoneInputView composes SelectInputView (for the dial-code dropdown) with a plain tel input. Both countryCode/onCountryChange and number/onNumberChange are required — the component is fully controlled.
      </DocNote>

      <DocNote type="warning">
        The number field strips any character that isn't a digit, space, or hyphen on every change. If you need to support parentheses or plus-prefixed local formats, pre-format the value before passing it back in via onNumberChange, or fork the regex in your own wrapper.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="PhoneInputView reads its dimensions from the shared input category base hook (useInputBase). Omitting size, width, borderRadius, or color on PhoneInputView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every input-category component at once."
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
