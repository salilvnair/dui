import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference, RadiusReference } from '../../../shared/DocComponents';

export function PanelListViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Heading + optional tab strip + block list', color: 'var(--color-primary)' },
          { label: 'Built-in case-insensitive filter (via SearchInputView)', color: 'var(--color-success)' },
          { label: 'Per-item icon, active state, click handler', color: 'var(--color-info)' },
          { label: 'Empty "No matches" state', color: 'var(--color-warning)' },
          { label: 'Custom accent color for tabs and active item', color: '#a855f7' },
          { label: 'Custom border radius', color: '#ec4899' },
          { label: 'DuiProvider size context', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'heading', type: 'string', required: true, description: 'Panel title shown in the header row.' },
          { name: 'items', type: 'PanelListItem[]', required: true, description: 'List of rows rendered below the header/tabs/search. Filtered client-side against the search query when searchable is true.' },
          { name: 'tabs', type: 'PanelListTab[]', description: 'Optional tab strip rendered under the heading. When omitted, no tab row is shown.' },
          { name: 'activeTab', type: 'string', description: 'Id of the currently active tab. Should be controlled alongside onTabChange.' },
          { name: 'onTabChange', type: '(id: string) => void', description: 'Called with the clicked tab id.' },
          { name: 'searchable', type: 'boolean', default: 'true', description: 'Shows a filter input above the list that narrows items by label (case-insensitive substring match).' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls padding, gap, and font size throughout the panel. Falls back to DuiProvider context when omitted.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Named radius preset or raw pixel value for the outer panel corners.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color used for the active tab underline/text and the active item background/text.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override merged onto the outer container.' },
        ]} />
      </DocSection>

      <DocSection title="PanelListItem shape">
        <PropTable props={[
          { name: 'value', type: 'string', required: true, description: 'Unique identifier for the item, used as the React key.' },
          { name: 'label', type: 'string', required: true, description: 'Display text, and the field matched against the search filter.' },
          { name: 'icon', type: 'ReactNode', description: 'Optional leading icon rendered before the label.' },
          { name: 'active', type: 'boolean', description: 'Highlights the row with the accent color when true.' },
          { name: 'onClick', type: '() => void', description: 'Click handler for the row.' },
        ]} />
      </DocSection>

      <DocSection title="PanelListTab shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique tab identifier, matched against activeTab.' },
          { name: 'label', type: 'string', required: true, description: 'Tab display text.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        PanelListView owns its own search query state internally — you only need to control items, activeTab, and onTabChange. Swapping items when the active tab changes (e.g. showing different lists per tab) is the caller's responsibility.
      </DocNote>

      <DocNote type="tip">
        Set searchable to false for short, fixed lists like an environment switcher where filtering adds more chrome than value.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="PanelListView reads its dimensions from the shared layout category base hook (useLayoutBase). Omitting size, width, borderRadius, or color on PanelListView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every layout-category component at once."
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
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 8 }}>
          Border radius presets, resolved via the <code>borderRadius</code> prop:
        </div>
        <RadiusReference radii={[
          { radius: 'none', value: '0px' },
          { radius: 'sm', value: '3px' },
          { radius: 'md', value: '4px' },
          { radius: 'lg', value: '6px' },
          { radius: 'full', value: 'full' },
        ]} />
        <DocNote type="info">
          These values come from the Layout category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every layout-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
