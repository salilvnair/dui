import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function SettingsRowViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Label + description + control layout primitive', color: 'var(--color-primary)' },
          { label: 'Control accepts any ReactNode', color: 'var(--color-success)' },
          { label: 'Optional description line', color: 'var(--color-info)' },
          { label: 'DuiProvider size context', color: 'var(--color-warning)' },
          { label: 'Pairs with SettingsSectionView', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'label', type: 'string', required: true, description: 'Primary bold label text.' },
          { name: 'description', type: 'string', description: 'Optional muted secondary line under the label.' },
          { name: 'control', type: 'ReactNode', required: true, description: 'The right-aligned control — commonly a ToggleSwitchView, but any node works (text, button, select).' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls padding, gap, and font size. Falls back to DuiProvider context.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer row.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer row.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        SettingsRowView has no border or background of its own — it's a bare label/control layout row. Stack several inside a SettingsSectionView (or your own bordered container) to get dividers between rows, as shown in the "Stacked Rows" example.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="SettingsRowView reads its dimensions from the shared layout category base hook (useLayoutBase). Omitting size, width, borderRadius, or color on SettingsRowView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every layout-category component at once."
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
