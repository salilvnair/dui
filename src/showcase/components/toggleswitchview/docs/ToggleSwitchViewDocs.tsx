import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function ToggleSwitchViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Animated thumb transition', color: 'var(--color-primary)' },
          { label: 'Custom accent / active color', color: 'var(--color-success)' },
          { label: 'Optional label (left or right)', color: 'var(--color-info)' },
          { label: 'Disabled state with dashed border', color: 'var(--color-warning)' },
          { label: 'ARIA role=switch + aria-checked', color: '#a855f7' },
          { label: 'DuiProvider size context', color: '#ec4899' },
          { label: 'Label color override', color: '#14b8a6' },
          { label: 'Context activeColor + color props', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'checked', type: 'boolean', required: true, description: 'Current on/off state of the toggle.' },
          { name: 'onChange', type: '(checked: boolean) => void', required: true, description: 'Called with the new boolean value when the user clicks the toggle.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'When true, the toggle is non-interactive. Shows a dashed border track and muted thumb at 50% opacity.' },
          { name: 'size', type: 'ToggleSwitchSize', description: 'Accepts all DuiSize values. Falls back to DuiProvider context when omitted.' },
          { name: 'accentColor', type: 'string', description: 'Color of the track when checked=true. Defaults to var(--color-toggle-on).' },
          { name: 'label', type: 'string', description: 'Optional text label rendered beside the switch.' },
          { name: 'labelPosition', type: "'left' | 'right'", default: "'right'", description: "Position of the label relative to the switch track." },
          { name: 'className', type: 'string', description: 'Additional class names applied to the button element (or the wrapper div when a label is present).' },
          { name: 'activeColor', type: 'string', description: 'Alias for accentColor with context-level support. Sets the checked track color.' },
          { name: 'color', type: 'string', description: 'Label text color override.' },
        ]} />
      </DocSection>

      <DocSection title="Visual states">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { state: 'checked', desc: 'Track = accentColor (solid), thumb = white, border = transparent' },
            { state: 'unchecked', desc: 'Track = 10% text-primary tint, border = 20% text-primary' },
            { state: 'disabled', desc: 'Dashed border, transparent track, muted thumb, 50% opacity' },
          ].map(s => (
            <div key={s.state} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <code style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-primary)', fontWeight: 600, flexShrink: 0, marginTop: 1 }}>{s.state}</code>
              <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{s.desc}</span>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Sizes">
        <SizeReference sizes={[
          { size: 'xs', height: '12px track', font: '10px', desc: 'Dense' },
          { size: 'sm', height: '14px track', font: '11px', desc: 'Compact' },
          { size: 'md', height: '16px track', font: '12px', desc: 'Default' },
          { size: 'lg', height: '20px track', font: '13px', desc: 'Large' },
          { size: 'xl', height: '24px track', font: '14px', desc: 'XL' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The thumb position animates via a CSS left transition (160ms). In the checked state the left is calculated as trackWidth - thumbSize - 2px so the thumb sits flush with the right edge with a 2px margin.
      </DocNote>

      <DocNote type="tip">
        When no label is provided, the component returns just the button element (no wrapper div), making it easy to embed directly in a flex row alongside other elements.
      </DocNote>
    </div>
  );
}
