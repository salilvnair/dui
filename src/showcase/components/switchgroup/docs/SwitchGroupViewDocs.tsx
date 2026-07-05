import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function SwitchGroupViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Settings.app-style grouped rows', color: 'var(--color-primary)' },
          { label: 'Optional section header title', color: 'var(--color-success)' },
          { label: 'Per-row description text', color: 'var(--color-info)' },
          { label: 'Per-row leading icon', color: 'var(--color-warning)' },
          { label: 'Per-row disabled state', color: '#a855f7' },
          { label: 'Multi-select checked array', color: '#ec4899' },
          { label: 'Built on ToggleSwitchView', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'title', type: 'string', description: 'Optional uppercase section header shown above the group.' },
          { name: 'items', type: 'SwitchGroupItem[]', required: true, description: 'Rows to render. Each item: { value, label, description?, icon?, disabled? }.' },
          { name: 'checked', type: 'string[]', required: true, description: 'Array of currently-enabled item values.' },
          { name: 'onChange', type: '(checked: string[]) => void', required: true, description: 'Called with the full updated checked array whenever any row is toggled.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls row padding, gap, and font size. Also passed through to each row\'s ToggleSwitchView.' },
          { name: 'color', type: 'string', description: 'Accent color passed through to each row\'s ToggleSwitchView as accentColor.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocSection title="SwitchGroupItem shape">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Unique identifier used in the checked array.' },
          { name: 'label', type: 'string', required: true, description: 'Primary row label.' },
          { name: 'description', type: 'string', description: 'Secondary muted text shown below the label.' },
          { name: 'icon', type: 'ReactNode', description: 'Leading icon rendered before the label.' },
          { name: 'disabled', type: 'boolean', description: 'Dims the row and blocks toggling for this item only.' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        This is a multi-select group — every row toggles independently and all "on" values accumulate in checked. For a single persistent settings row without grouping, use ToggleSwitchView directly instead.
      </DocNote>

      <DocNote type="info">
        Rows are drawn from useCardBase for spacing/typography, while the toggle control itself is a real ToggleSwitchView instance per row — size and color set on SwitchGroupView cascade down to every switch automatically.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="SwitchGroupView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on SwitchGroupView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useCardBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '28px', font: '8px', desc: 'pad 10px 16px' },
          { size: 'xs', height: '36px', font: '9px', desc: 'pad 10px 16px' },
          { size: 'sm', height: '48px', font: '10px', desc: 'pad 4px 8px' },
          { size: 'md', height: '64px', font: '11px', desc: 'pad 6px 10px' },
          { size: 'lg', height: '80px', font: '12px', desc: 'pad 8px 12px' },
          { size: 'xl', height: '96px', font: '13px', desc: 'pad 10px 16px' },
          { size: 'xxl', height: '112px', font: '14px', desc: 'pad 10px 16px' },
          { size: 'xxxl', height: '128px', font: '16px', desc: 'pad 10px 16px' },
        ]} />
        <DocNote type="info">
          These values come from the Card category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every card-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
