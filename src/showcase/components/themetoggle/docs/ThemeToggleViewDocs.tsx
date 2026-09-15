import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function ThemeToggleViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'One button, two states, no label needed', color: 'var(--color-primary)' },
          { label: 'Sun and moon tinted independently', color: 'var(--color-warning)' },
          { label: 'Icon-button size scale', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The two-state theme switch, for a header with no room for three segments. Where you want an explicit System option as well, use SegmentedControlView with three — as this showcase does."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'theme', type: "'dark' | 'light'", required: true, description: 'Which state the button is showing.' },
          { name: 'onToggle', type: '() => void', required: true, description: 'Fired on click. The component does not hold the theme itself.' },
          { name: 'size', type: 'IconButtonSize', description: 'Icon-button size scale.' },
          { name: 'sunColor', type: 'string', description: 'Tint for the light glyph.' },
          { name: 'moonColor', type: 'string', description: 'Tint for the dark glyph.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
          { name: 'testId', type: 'string', description: 'Lands on the root as data-testid.' },
        ]} />
      </DocSection>
    </div>
  );
}
