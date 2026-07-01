import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, VariantRow } from '../../../shared/DocComponents';

export function TabViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '3 variants: pill, underline, chip', color: 'var(--color-primary)' },
          { label: 'Animated sliding indicator', color: 'var(--color-success)' },
          { label: 'Badge count per tab', color: 'var(--color-info)' },
          { label: 'Dot indicator per tab', color: 'var(--color-warning)' },
          { label: 'Per-badge custom color', color: '#a855f7' },
          { label: 'Per-dot custom color', color: '#ec4899' },
          { label: 'Custom accent + inactive color', color: '#14b8a6' },
          { label: 'DUI container props (width, borderRadius)', color: '#f97316' },
          { label: 'DuiProvider size context', color: 'var(--color-primary)' },
          { label: 'ARIA role=tablist + aria-selected', color: 'var(--color-success)' },
        ]} />
      </DocSection>

      <DocSection title="Variants">
        <VariantRow variants={[
          { label: 'pill', description: 'Track background with animated sliding pill indicator. Default.', color: 'var(--color-primary)' },
          { label: 'underline', description: 'No track, animated 2px bottom underline slides under the active tab.', color: 'var(--color-info)' },
          { label: 'chip', description: 'Each tab is an independent pill chip; no shared track or underline.', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'tabs', type: 'TabItem[]', required: true, description: 'Array of tab items to render.' },
          { name: 'activeTab', type: 'string', required: true, description: 'The id of the currently active tab.' },
          { name: 'onChange', type: '(id: string) => void', required: true, description: 'Called when the user clicks a tab.' },
          { name: 'size', type: 'DuiSize', description: 'Falls back to DuiProvider context when omitted.' },
          { name: 'variant', type: 'TabVariant', default: "'pill'", description: 'Visual variant of the tab bar.' },
          { name: 'accentColor', type: 'string', description: 'Color for the active indicator, active tab text, and badge fills. Overrides base.activeColor.' },
          { name: 'className', type: 'string', description: 'Additional class names for the container element.' },
          { name: 'width', type: 'DuiWidth', description: 'Width of the tab container. When set, the container stretches to fill and tabs share space equally.' },
          { name: 'borderRadius', type: 'DuiRadius | number', description: 'Border radius override (applies to pill track and pill indicator).' },
          { name: 'color', type: 'string', description: 'Override color for inactive tab text.' },
          { name: 'activeColor', type: 'string', description: 'Color for the active tab indicator and text. Alias for accentColor with context-level support.' },
          { name: 'fontStyle', type: 'DuiFontStyle', description: 'Font style override for tab labels.' },
        ]} />
      </DocSection>

      <DocSection title="TabItem shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique identifier for the tab.' },
          { name: 'label', type: 'string', required: true, description: 'Display text of the tab.' },
          { name: 'badge', type: 'number', description: 'Count shown as a pill badge to the right of the label. Only rendered when > 0.' },
          { name: 'dot', type: 'boolean', description: 'When true, shows a small colored dot indicator to the right of the label.' },
          { name: 'dotColor', type: 'string', description: 'Override color for the dot indicator. Defaults to the accent color.' },
          { name: 'badgeColor', type: 'string', description: 'Override color for the badge pill. Defaults to the accent color.' },
        ]} />
      </DocSection>

      <DocSection title="TabVariant enum">
        <EnumTable name="TabVariant" values={[
          { value: 'pill', description: 'Track with sliding pill background indicator', color: 'var(--color-primary)' },
          { value: 'underline', description: 'Sliding 2px bottom border indicator', color: 'var(--color-info)' },
          { value: 'chip', description: 'Independent rounded chip per tab', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Sizes">
        <SizeReference sizes={[
          { size: 'xs', height: '20px', font: '10px', desc: 'Dense' },
          { size: 'sm', height: '24px', font: '11px', desc: 'Compact' },
          { size: 'md', height: '28px', font: '12px', desc: 'Default' },
          { size: 'lg', height: '32px', font: '13px', desc: 'Large' },
          { size: 'xl', height: '36px', font: '14px', desc: 'XL' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The animated indicator uses useLayoutEffect to measure the active tab's offsetLeft and offsetWidth after each render, then transitions left and width with a 200ms ease-out. This means the animation also runs correctly during tab reordering.
      </DocNote>

      <DocNote type="tip">
        For browser-style tab bars with closeable tabs and a new-tab button, use TabBarView instead. TabView is for in-panel section switching (e.g. Headers / Body / Auth).
      </DocNote>
    </div>
  );
}
