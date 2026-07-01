import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function LiveColorCustomizerDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Native color picker per CSS var', color: 'var(--color-primary)' },
          { label: 'Live document.documentElement mutation', color: 'var(--color-success)' },
          { label: 'Scoped mutation via onVarChange', color: 'var(--color-info)' },
          { label: 'Dirty tracking per variable', color: 'var(--color-warning)' },
          { label: 'Per-variable reset button', color: '#a855f7' },
          { label: 'Reset all button', color: '#ec4899' },
          { label: 'YamlKeyChip per variable', color: '#14b8a6' },
          { label: 'forceOpen mode (no toggle button)', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="LiveColorVar">
        <PropTable props={[
          { name: 'cssVar', type: 'string', required: true, description: 'CSS custom property name (e.g. "--color-primary").' },
          { name: 'yamlKey', type: 'string', required: true, description: 'Corresponding YAML theme key (e.g. "brand.primary"). Displayed as a YamlKeyChip.' },
          { name: 'label', type: 'string', description: 'Human-readable label shown above the swatch. Defaults to cssVar with "--color-" stripped.' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'vars', type: 'LiveColorVar[]', required: true, description: 'Array of CSS variables to expose for editing.' },
          { name: 'title', type: 'string', description: "Label on the toggle button. Defaults to 'Customize colors'." },
          { name: 'forceOpen', type: 'boolean', default: 'false', description: 'When true, the grid is always visible and the toggle button is hidden. Used when embedded in a live playground pane.' },
          { name: 'onVarChange', type: '(cssVar: string, value: string | null) => void', description: 'When provided, color changes call this instead of mutating document.documentElement. value=null means reset.' },
        ]} />
      </DocSection>

      <DocSection title="Color resolution">
        <DocNote type="info">
          On open, all colors are read from <code>getComputedStyle(document.documentElement)</code>. Non-hex values are converted to hex via a 1×1 canvas pixel. Transparent values fall back to #888888.
        </DocNote>
        <DocNote type="tip">
          Use <code>onVarChange</code> to scope changes to a specific container (preview pane) rather than the global document. When <code>value</code> is <code>null</code>, the variable override should be removed.
        </DocNote>
        <DocNote type="warning">
          Changes made via LiveColorCustomizer apply immediately and persist until page reload or until Reset is clicked. They do not affect stored themes or YAML files — they are in-memory overrides only.
        </DocNote>
      </DocSection>
    </div>
  );
}
