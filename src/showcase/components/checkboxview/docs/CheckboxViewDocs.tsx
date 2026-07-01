import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function CheckboxViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Checked + unchecked + indeterminate states', color: 'var(--color-primary)' },
          { label: 'Custom accent color', color: 'var(--color-success)' },
          { label: 'Optional text label', color: 'var(--color-info)' },
          { label: 'Disabled state', color: 'var(--color-warning)' },
          { label: 'ARIA role=checkbox + aria-checked (mixed for indeterminate)', color: '#a855f7' },
          { label: 'Label click triggers onChange', color: '#ec4899' },
          { label: 'DuiProvider size context', color: '#14b8a6' },
          { label: 'Label font is one size step smaller for compact look', color: '#f97316' },
          { label: 'DuiToken-based box sizing', color: 'var(--color-primary)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'checked', type: 'boolean', required: true, description: 'Current checked state of the checkbox.' },
          { name: 'onChange', type: '(checked: boolean) => void', description: 'Called with the new boolean value when the user clicks. Optional — omit for read-only checkboxes.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'When true, the checkbox is non-interactive at 50% opacity.' },
          { name: 'indeterminate', type: 'boolean', default: 'false', description: 'When true, renders a horizontal dash inside the box (mixed state). Sets aria-checked to "mixed".' },
          { name: 'size', type: 'DuiSize', description: 'Falls back to DuiProvider context when omitted.' },
          { name: 'accentColor', type: 'string', description: 'Fill color of the box when checked or indeterminate. Defaults to var(--color-primary).' },
          { name: 'label', type: 'string', description: 'Optional text label. When provided, the component wraps the box in a flex div and the entire row is clickable.' },
          { name: 'className', type: 'string', description: 'Additional class names for the button element.' },
        ]} />
      </DocSection>

      <DocSection title="Visual states">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { state: 'unchecked', desc: 'Transparent background, 1.5px solid border at 28% text-primary opacity' },
            { state: 'checked', desc: 'Solid accentColor background, no border, white CheckIcon inside' },
            { state: 'indeterminate', desc: 'Solid accentColor background, white horizontal dash (2px height bar)' },
            { state: 'disabled', desc: 'Any state at 50% opacity, cursor: not-allowed' },
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
          { size: 'xs', height: '12px box', font: '10px label', desc: 'Dense' },
          { size: 'sm', height: '14px box', font: '11px label', desc: 'Compact' },
          { size: 'md', height: '16px box', font: '12px label', desc: 'Default' },
          { size: 'lg', height: '18px box', font: '12px label', desc: 'Large' },
          { size: 'xl', height: '20px box', font: '13px label', desc: 'XL' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The label font size is always one DuiSize step smaller than the box size for a compact, balanced look. For example, a md-size checkbox uses sm-level font for its label.
      </DocNote>

      <DocNote type="tip">
        When a label is provided, the entire row div (including the label text) triggers onChange on click — you do not need to click the box exactly.
      </DocNote>
    </div>
  );
}
