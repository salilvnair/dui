import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function StatusIndicatorViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '5 status states', color: 'var(--color-primary)' },
          { label: 'Animated pulse ring (connecting + connected)', color: 'var(--color-success)' },
          { label: 'Custom label text', color: 'var(--color-info)' },
          { label: 'Optional subtext below label', color: 'var(--color-warning)' },
          { label: 'Show/hide label', color: '#a855f7' },
          { label: '3 sizes (sm, md, lg)', color: '#ec4899' },
          { label: 'Color override (accent)', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'status', type: 'StatusState', required: true, description: 'Current status. Controls the dot color, default label text, and whether the pulse animation runs.' },
          { name: 'label', type: 'string', description: 'Override the default label text. Defaults to the status display name (e.g. "Connected").' },
          { name: 'subtext', type: 'string', description: 'Secondary smaller text shown below the label. Useful for showing connection details or timestamps.' },
          { name: 'showLabel', type: 'boolean', default: 'true', description: 'When false, only the dot is shown without any text.' },
          { name: 'size', type: 'StatusSize', default: "'md'", description: 'Controls dot size and font size.' },
          { name: 'accentColor', type: 'string', description: 'Override both the dot color and label color. When set, overrides the status-derived color entirely.' },
          { name: 'className', type: 'string', description: 'Additional class names for the outer span.' },
        ]} />
      </DocSection>

      <DocSection title="StatusState enum">
        <EnumTable name="StatusState" values={[
          { value: 'idle', description: 'Muted dot — var(--color-text-muted)', color: 'var(--color-text-muted)' },
          { value: 'connecting', description: 'Pulsing warning dot — var(--color-warning)', color: 'var(--color-warning)' },
          { value: 'connected', description: 'Pulsing success dot — var(--color-success)', color: 'var(--color-success)' },
          { value: 'disconnected', description: 'Muted dot (same as idle)', color: 'var(--color-text-muted)' },
          { value: 'error', description: 'Error red dot — var(--color-error)', color: 'var(--color-error)' },
        ]} />
      </DocSection>

      <DocSection title="Sizes">
        <SizeReference sizes={[
          { size: 'sm', height: '6px dot', font: '10px', desc: 'Dense inline' },
          { size: 'md', height: '8px dot', font: '11px', desc: 'Default' },
          { size: 'lg', height: '10px dot', font: '12px', desc: 'Prominent' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The pulse animation (animate-ping) runs only for the connecting and connected states. It is a separate absolutely-positioned span behind the dot, larger by 4px, at 35% opacity. The main dot remains opaque on top.
      </DocNote>

      <DocNote type="tip">
        Use showLabel=false when embedding in a tight toolbar where only the colored dot is needed. Add a tooltip on the parent element to explain the status to keyboard/assistive users.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="StatusIndicatorView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          StatusIndicatorView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
