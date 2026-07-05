import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function KbdViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Single key or key combo', color: 'var(--color-primary)' },
          { label: 'Auto "+" separator between keys', color: 'var(--color-success)' },
          { label: 'Monospace kbd styling', color: 'var(--color-info)' },
          { label: 'Beveled bottom border (3D key look)', color: 'var(--color-warning)' },
          { label: 'Keyboard hint chip', color: '#a855f7' },
          { label: 'Used internally by ShortcutRecorderView', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'keys', type: 'string | string[]', required: true, description: 'A single key label or an array rendered as separate kbd chips in sequence (e.g. ["⌘", "K"]).' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls chip height, padding, and font size via useChipBase.' },
          { name: 'color', type: 'string', description: 'Text color override for the key label(s). Defaults to var(--color-text-secondary).' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapping span.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override on the outer wrapping span.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Pass an array to render a full combo like ⌘+Shift+N as separate visually-distinct key caps rather than one long string — this reads much closer to real OS shortcut hints.
      </DocNote>

      <DocNote type="info">
        ShortcutRecorderView renders its captured/recording key combo using KbdView internally, so any size or styling changes you make to KbdView usage patterns will look consistent across both components.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="KbdView reads its dimensions from the shared chip category base hook (useChipBase). Omitting size, borderRadius, or color on KbdView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every chip-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useChipBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '10px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'xs', height: '12px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'sm', height: '16px', font: '9px', desc: 'padX 5px, radius full' },
          { size: 'md', height: '20px', font: '10px', desc: 'padX 7px, radius full' },
          { size: 'lg', height: '24px', font: '11px', desc: 'padX 9px, radius full' },
          { size: 'xl', height: '28px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'xxl', height: '32px', font: '12px', desc: 'padX 11px, radius full' },
          { size: 'xxxl', height: '38px', font: '12px', desc: 'padX 11px, radius full' },
        ]} />
        <DocNote type="info">
          These values come from the Chip category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every chip-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
