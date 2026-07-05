import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function YamlKeyChipDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Monospace YAML key badge', color: 'var(--color-primary)' },
          { label: 'Accent color tinted background', color: 'var(--color-success)' },
          { label: 'Optional click handler', color: 'var(--color-info)' },
          { label: 'Inline-flex (no layout disruption)', color: 'var(--color-warning)' },
          { label: 'No-select (no text highlight on click)', color: '#a855f7' },
          { label: 'Used in LiveColorCustomizer', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'yamlKey', type: 'string', required: true, description: 'The YAML theme key name to display (e.g. "brand.primary", "component_button.primary_bg").' },
          { name: 'color', type: 'string', description: 'Accent color for text and background tint. Defaults to var(--color-primary).' },
          { name: 'onClick', type: '() => void', description: 'When provided, adds cursor-pointer and calls the handler on click.' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root span.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles on the root span.' },
        ]} />
      </DocSection>

      <DocSection title="Visual style">
        <DocNote type="info">
          YamlKeyChip renders as a 16px-tall monospace pill with a 10px font, 4px border-radius, and a color-mix background at 10% + 22% border opacity. This matches the style used in Daakia's theme editor to label which YAML key controls each color variable.
        </DocNote>
        <DocNote type="tip">
          YamlKeyChip is a purely presentational chip — no state, no effects. It pairs naturally with <code>LiveColorCustomizer</code> and any settings UI that surfaces theme configuration keys.
        </DocNote>
      </DocSection>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="YamlKeyChip does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          YamlKeyChip is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
