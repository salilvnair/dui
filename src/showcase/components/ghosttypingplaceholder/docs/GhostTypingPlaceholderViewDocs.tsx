import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, WidthReference, RadiusReference } from '../../../shared/DocComponents';

export function GhostTypingPlaceholderViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Types and backspaces rotating example queries', color: 'var(--color-primary)' },
          { label: 'Pauses on a fully-typed example before deleting', color: 'var(--color-success)' },
          { label: 'Freezes animation while focused or a value exists', color: 'var(--color-info)' },
          { label: 'Configurable typing speed and pause duration', color: 'var(--color-warning)' },
          { label: 'DuiProvider size/width/radius context', color: '#a855f7' },
          { label: 'Fully controlled input value', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Current controlled input value.' },
          { name: 'onChange', type: '(value: string) => void', required: true, description: 'Fires on every keystroke with the new value.' },
          { name: 'examples', type: 'string[]', required: true, description: 'Rotating example queries typed/backspaced into the placeholder slot, in order.' },
          { name: 'speed', type: 'number', default: '45', description: 'Milliseconds per character while typing. Deleting runs at half this (speed / 2).' },
          { name: 'pause', type: 'number', default: '1400', description: 'Milliseconds to hold a fully-typed example before backspacing begins.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Input height and font size. Falls back to DuiProvider context.' },
          { name: 'width', type: 'DuiWidth', description: 'Preset input width token.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Corner radius — either a DUI radius token or a raw pixel number.' },
          { name: 'color', type: 'string', description: 'Passed through to the underlying InputBase color resolution.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the input.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the input.' },
        ]} />
      </DocSection>

      <DocSection title="DuiWidth enum">
        <EnumTable name="DuiWidth" values={[
          { value: 'sm', description: 'Small fixed width.', color: 'var(--color-success)' },
          { value: 'md', description: 'Medium fixed width.', color: 'var(--color-primary)' },
          { value: 'default', description: "Component's default width." },
          { value: 'lg', description: 'Large fixed width.', color: 'var(--color-info)' },
          { value: 'fullWidth', description: '100% of the parent container.', color: 'var(--color-warning)' },
          { value: 'maxContent', description: 'Shrinks to fit content.' },
          { value: 'fw', description: 'Alias for fullWidth.' },
          { value: 'mx', description: 'Max-width variant.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The ghost animation automatically stops the moment the input is focused or has a non-empty `value` — the real placeholder is cleared in both cases so there's no visual conflict between real text and animated ghost text.
      </DocNote>

      <DocNote type="warning">
        Passing an empty `examples` array leaves the placeholder blank indefinitely (no error, just nothing to type). Always provide at least one example string.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="GhostTypingPlaceholderView reads its dimensions from the shared input category base hook (useInputBase). Omitting size, width, borderRadius, or color on GhostTypingPlaceholderView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every input-category component at once."
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
