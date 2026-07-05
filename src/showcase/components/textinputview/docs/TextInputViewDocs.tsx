import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function TextInputViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'forwardRef compatible', color: 'var(--color-primary)' },
          { label: 'Left + Right icon slots', color: 'var(--color-success)' },
          { label: 'Masked / password mode with eye toggle', color: 'var(--color-info)' },
          { label: 'Error state (red border)', color: 'var(--color-warning)' },
          { label: 'Naked mode (no border/bg)', color: '#a855f7' },
          { label: 'Custom accent focus ring', color: '#ec4899' },
          { label: 'DUI container props (width, borderRadius)', color: '#14b8a6' },
          { label: 'Extends all native input HTML attributes', color: '#f97316' },
          { label: 'Font style override', color: 'var(--color-primary)' },
          { label: 'Prefix / suffix icon aliases', color: 'var(--color-success)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'size', type: 'TextInputSize', default: "'default'", description: "Size of the input. 'default' resolves to the DuiProvider context size (md equivalent)." },
          { name: 'rounded', type: 'boolean', default: 'true', description: 'true = token border-radius. false = 0px square corners.' },
          { name: 'accentColor', type: 'string', description: 'Override the focus border and ring color. Accepts any CSS variable or raw color value.' },
          { name: 'error', type: 'boolean', default: 'false', description: 'When true, renders a red border. In naked mode, shows a red bottom underline + red text/caret.' },
          { name: 'iconLeft', type: 'ReactNode', description: 'Icon rendered inside the left edge of the input. Alias: prefixIcon.' },
          { name: 'iconRight', type: 'ReactNode', description: 'Icon rendered inside the right edge. Ignored when masked=true. Alias: suffixIcon.' },
          { name: 'prefixIcon', type: 'ReactNode', description: 'Alias for iconLeft.' },
          { name: 'suffixIcon', type: 'ReactNode', description: 'Alias for iconRight. Ignored when masked=true.' },
          { name: 'masked', type: 'boolean', default: 'false', description: 'When true, the value is hidden (type=password) with an eye-toggle button on the right.' },
          { name: 'maskIcon', type: '{ hidden?: ReactNode; shown?: ReactNode }', description: 'Custom icons for the masked toggle. Defaults to EyeOffIcon (hidden) / EyeIcon (shown).' },
          { name: 'naked', type: 'boolean', default: 'false', description: 'When true: no border, transparent background, no focus ring. For embedding inside containers that supply their own chrome.' },
          { name: 'width', type: 'DuiWidth', description: 'Width override for the input container. Accepts DUI token values or CSS strings.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Border radius override for the container.' },
          { name: 'color', type: 'string', description: 'Text color override for the input.' },
          { name: 'fontStyle', type: 'DuiFontStyle', description: "Font style override, e.g. 'italic'." },
          { name: '...rest', type: 'InputHTMLAttributes<HTMLInputElement>', description: 'All native input attributes (placeholder, value, onChange, disabled, type, etc.) are forwarded to the underlying input element.' },
        ]} />
      </DocSection>

      <DocSection title="Sizes">
        <SizeReference sizes={[
          { size: 'xs', height: '20px', font: '10px', desc: 'Dense' },
          { size: 'sm', height: '24px', font: '11px', desc: 'Compact' },
          { size: 'md', height: '28px', font: '12px', desc: 'Default' },
          { size: 'lg', height: '32px', font: '13px', desc: 'Large' },
          { size: 'xl', height: '36px', font: '14px', desc: 'XL' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Use the naked prop when embedding TextInputView inside a parent container (e.g. SelectTextInputView) that provides its own border and background. The naked mode still shows an error state via a bottom underline when error=true.
      </DocNote>

      <DocNote type="info">
        When masked=true is set, any iconRight or suffixIcon is automatically suppressed — the eye toggle button takes exclusive ownership of the right slot.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="TextInputView reads its dimensions from the shared input category base hook (useInputBase). Omitting size, width, borderRadius, or color on TextInputView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every input-category component at once."
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
        <DocNote type="info">
          These values come from the Input category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every input-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
