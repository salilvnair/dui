import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, RadiusReference } from '../../../shared/DocComponents';

export function ShortcutRecorderViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Click-to-record keybinding capture', color: 'var(--color-primary)' },
          { label: 'Modifier-aware combo detection', color: 'var(--color-success)' },
          { label: 'Auto-commits on first non-modifier key', color: 'var(--color-info)' },
          { label: 'Escape cancels recording', color: 'var(--color-warning)' },
          { label: 'Renders combo via KbdView', color: '#a855f7' },
          { label: 'Disabled state', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value', type: 'string[]', required: true, description: 'The currently committed key combo, e.g. ["⌘", "K"].' },
          { name: 'onChange', type: '(keys: string[]) => void', required: true, description: 'Called with the newly recorded combo once a non-modifier key is pressed.' },
          { name: 'placeholder', type: 'string', default: "'Click to record…'", description: 'Text shown when value is empty and not currently recording.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables starting a new recording.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls control height, padding, and font size via useInputBase.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Corner radius override, forwarded to useInputBase.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Border accent color shown while actively recording.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override on the outer container.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Recording auto-commits as soon as a non-modifier key is pressed alongside any held modifiers (Control/Meta/Alt/Shift), so users don't need to press Enter — pressing "K" while holding ⌘ immediately finalizes and closes recording.
      </DocNote>

      <DocNote type="warning">
        Modifier-only key presses (just holding Shift, for example) update the live draft but do not commit — only a subsequent non-modifier keystroke or Escape ends the recording session.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="ShortcutRecorderView reads its dimensions from the shared input category base hook (useInputBase). Omitting size, width, borderRadius, or color on ShortcutRecorderView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every input-category component at once."
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
