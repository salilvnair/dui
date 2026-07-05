import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function SettingsSectionViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Bordered card with title + description header', color: 'var(--color-primary)' },
          { label: 'Auto-dividers between array children', color: 'var(--color-success)' },
          { label: 'Pairs with SettingsRowView', color: 'var(--color-info)' },
          { label: 'DuiProvider size context', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'title', type: 'string', required: true, description: 'Section heading, shown bold at the top of the card.' },
          { name: 'description', type: 'string', description: 'Optional muted line under the title.' },
          { name: 'children', type: 'ReactNode', required: true, description: 'Typically one or more SettingsRowView elements. When passed as an array, a top border divider is automatically inserted between siblings.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls header padding and font size. Falls back to DuiProvider context.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer card.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer card.' },
        ]} />
      </DocSection>

      <DocNote type="warning">
        Automatic divider insertion only happens when children is an array (e.g. multiple JSX elements passed directly, which React collapses into an array). A single child or a fragment wrapping multiple rows will not get dividers — pass rows as direct siblings, not wrapped in a fragment.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="SettingsSectionView reads its dimensions from the shared layout category base hook (useLayoutBase). Omitting size, width, borderRadius, or color on SettingsSectionView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every layout-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useLayoutBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '8px', desc: 'pad 32px' },
          { size: 'xs', height: '—', font: '9px', desc: 'pad 32px' },
          { size: 'sm', height: '—', font: '10px', desc: 'pad 12px' },
          { size: 'md', height: '—', font: '11px', desc: 'pad 16px' },
          { size: 'lg', height: '—', font: '12px', desc: 'pad 24px' },
          { size: 'xl', height: '—', font: '13px', desc: 'pad 32px' },
          { size: 'xxl', height: '—', font: '14px', desc: 'pad 32px' },
          { size: 'xxxl', height: '—', font: '16px', desc: 'pad 32px' },
        ]} />
        <DocNote type="info">
          These values come from the Layout category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every layout-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
