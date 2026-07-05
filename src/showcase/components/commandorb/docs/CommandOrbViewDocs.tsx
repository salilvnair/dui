import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function CommandOrbViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Floating, breathing AI-assistant orb', color: 'var(--color-primary)' },
          { label: 'Idle pulse → thinking ripple → speaking waveform', color: 'var(--color-success)' },
          { label: 'Expands into a chat panel', color: 'var(--color-info)' },
          { label: 'Radial-gradient glossy fill', color: 'var(--color-warning)' },
          { label: 'DuiProvider size context (fixed diameter presets)', color: '#a855f7' },
          { label: 'Custom accent color', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'state', type: 'CommandOrbState', required: true, description: 'Current visual/behavioral state of the orb.' },
          { name: 'onClick', type: '() => void', description: 'Click handler — typically used to advance/toggle state.' },
          { name: 'panel', type: 'ReactNode', description: 'Content rendered inside an expanded panel below the orb, only shown when state is "open".' },
          { name: 'size', type: 'DuiSize', default: "'lg'", description: 'Orb diameter, looked up from a fixed per-size pixel table (28px at xxs up to 76px at xxxl; 52px at the default lg). Defaults locally to \'lg\' rather than falling back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for the gradient fill and glow shadow.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="CommandOrbState enum">
        <EnumTable name="CommandOrbState" values={[
          { value: 'idle', description: 'Resting state with a slow ambient breathing pulse.', color: 'var(--color-primary)' },
          { value: 'thinking', description: 'Shows an expanding ripple ring while processing.', color: 'var(--color-warning)' },
          { value: 'speaking', description: 'Shows an animated 4-bar waveform while responding.', color: 'var(--color-success)' },
          { value: 'open', description: 'Renders the panel prop expanded below the orb.', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocNote type="warning">
        Unlike most DUI components, size does not fall back to DuiProvider context — it defaults to 'lg' locally and looks up a fixed diameter table (DIAMETER), since orb dimensions are circular and don't map cleanly onto the height/padding scale used elsewhere.
      </DocNote>

      <DocNote type="tip">
        This component is fully controlled — it does not manage its own state transitions. Drive `state` from your own logic (e.g. 'thinking' while awaiting an LLM response, 'speaking' while streaming tokens back via AIStreamingTextView inside `panel`).
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="CommandOrbView reads its dimensions from the shared button category base hook (useButtonBase). Omitting size, width, borderRadius, or color on CommandOrbView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every button-category component at once."
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
