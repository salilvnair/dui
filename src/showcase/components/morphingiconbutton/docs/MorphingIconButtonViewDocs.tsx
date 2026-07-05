import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function MorphingIconButtonViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'SVG path-morph transition (not crossfade)', color: 'var(--color-primary)' },
          { label: '3 built-in presets', color: 'var(--color-success)' },
          { label: 'Controlled active state', color: 'var(--color-info)' },
          { label: 'Custom accent color', color: 'var(--color-warning)' },
          { label: 'DuiProvider size context', color: '#a855f7' },
          { label: 'aria-pressed for a11y', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'preset', type: 'MorphIconPreset', required: true, description: 'Which icon pair to morph between.' },
          { name: 'active', type: 'boolean', required: true, description: 'Controlled state — true shows the "on" path (pause/close/moon), false shows the "off" path (play/menu/sun).' },
          { name: 'onClick', type: '() => void', required: true, description: 'Click handler — typically toggles the state that drives `active`.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Button footprint and inner icon size. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-text-primary)', description: 'Icon stroke/fill color.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the button.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the button.' },
        ]} />
      </DocSection>

      <DocSection title="MorphIconPreset enum">
        <EnumTable name="MorphIconPreset" values={[
          { value: 'play-pause', description: 'Play triangle morphs into two pause bars.', color: 'var(--color-success)' },
          { value: 'menu-close', description: 'Hamburger menu morphs into an X close icon.', color: 'var(--color-info)' },
          { value: 'sun-moon', description: 'Sun morphs into a crescent moon (filled icon).', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        The morph is a pure CSS `d` attribute transition on a single SVG `path` element (`transition: d 320ms cubic-bezier(...)`), not two overlapping icons faded in/out. This only works reliably when both path strings in a preset have the same number and type of path commands — if you add a custom preset, keep the "off" and "on" `d` strings structurally aligned.
      </DocNote>

      <DocNote type="info">
        This is a controlled component: `active` must be driven by the parent's own state, and `onClick` should flip it. There is no internal toggle state.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="MorphingIconButtonView reads its dimensions from the shared button category base hook (useButtonBase). Omitting size, width, borderRadius, or color on MorphingIconButtonView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every button-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useButtonBase', color: 'var(--color-primary)' },
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
          These values come from the Button category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every button-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
