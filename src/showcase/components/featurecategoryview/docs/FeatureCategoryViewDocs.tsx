import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function FeatureCategoryViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Collapsible feature category', color: 'var(--color-primary)' },
          { label: 'Smooth height animation (220ms)', color: 'var(--color-success)' },
          { label: 'Category-level toggle switch', color: 'var(--color-info)' },
          { label: 'Per-feature toggle switches', color: 'var(--color-warning)' },
          { label: 'Enabled/total count badge', color: '#a855f7' },
          { label: 'Accent color chip per category', color: '#ec4899' },
          { label: 'Per-feature optional description', color: '#14b8a6' },
          { label: 'No flash on initial render', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="FeatureItem">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique identifier for this feature item.' },
          { name: 'label', type: 'string', required: true, description: 'Feature name displayed in the row.' },
          { name: 'description', type: 'string', description: 'Optional sub-label shown below the feature name in muted text.' },
          { name: 'enabled', type: 'boolean', required: true, description: 'Current toggle state of this feature.' },
          { name: 'onToggle', type: '(enabled: boolean) => void', required: true, description: 'Called when the feature toggle switch is clicked.' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'categoryLabel', type: 'string', required: true, description: 'Category name shown as a colored chip in the header.' },
          { name: 'categoryColor', type: 'string', description: 'Accent color for the chip, header background tint, and toggles. Defaults to var(--color-primary).' },
          { name: 'features', type: 'FeatureItem[]', required: true, description: 'List of feature items to display.' },
          { name: 'defaultExpanded', type: 'boolean', default: 'false', description: 'Whether the category starts expanded.' },
          { name: 'categoryEnabled', type: 'boolean', description: 'Controlled state for the optional category-level toggle switch.' },
          { name: 'onCategoryToggle', type: '(enabled: boolean) => void', description: 'When provided, shows a toggle switch in the header to enable/disable the entire category.' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root element.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles on the root element.' },
        ]} />
      </DocSection>

      <DocSection title="Animation details">
        <DocNote type="info">
          The body uses a two-phase height animation to avoid FOUC on mount. On initial render, no transition is applied. On subsequent toggles, height animates from the current px value to 0 (collapse) or scrollHeight then auto (expand).
        </DocNote>
        <DocNote type="tip">
          The enabled count badge (<code>2/5</code>) is always shown in the header, even when collapsed, so users can see the current state at a glance.
        </DocNote>
      </DocSection>
    </div>
  );
}
