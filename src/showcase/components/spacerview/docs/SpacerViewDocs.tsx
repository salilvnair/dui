import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote } from '../../../shared/DocComponents';

export function SpacerViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Horizontal or vertical separator', color: 'var(--color-primary)' },
          { label: 'Three spacing sizes (sm/md/lg)', color: 'var(--color-success)' },
          { label: 'aria-hidden + role="separator"', color: 'var(--color-info)' },
          { label: 'Token-based sizing via CSS classes', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Direction of the spacer. Horizontal adds vertical margin; vertical adds horizontal margin.' },
          { name: 'spacing', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Amount of space. Maps to CSS classes defined in SpacerView.css.' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root div.' },
        ]} />
      </DocSection>

      <DocSection title="Spacing values">
        <EnumTable name="spacing" values={[
          { value: 'sm', description: 'Small spacing (4–8px)', color: 'var(--color-success)' },
          { value: 'md', description: 'Medium spacing (12–16px)', color: 'var(--color-primary)' },
          { value: 'lg', description: 'Large spacing (24–32px)', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection title="Usage notes">
        <DocNote type="info">
          SpacerView is a purely layout utility — it renders a div with <code>role="separator"</code> and <code>aria-hidden="true"</code>. It produces visual whitespace between sections, not a visible divider line (for that, use a border or HR element).
        </DocNote>
        <DocNote type="tip">
          In a flex column layout, a horizontal SpacerView adds top/bottom margin. In a flex row layout, use a vertical SpacerView to add left/right margin between items.
        </DocNote>
      </DocSection>
    </div>
  );
}
