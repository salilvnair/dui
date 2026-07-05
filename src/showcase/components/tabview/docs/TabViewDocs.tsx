import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference, VariantRow, WidthReference, RadiusReference } from '../../../shared/DocComponents';

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
      
      <DocSection
        title="DUI Sizing & Theming"
        description="TabView reads its dimensions from the shared tab category base hook (useTabBase). Omitting size, width, borderRadius, or color on TabView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every tab-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useTabBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '16px', font: '8px', desc: 'padX 18px' },
          { size: 'xs', height: '20px', font: '9px', desc: 'padX 18px' },
          { size: 'sm', height: '24px', font: '10px', desc: 'padX 10px' },
          { size: 'md', height: '28px', font: '11px', desc: 'padX 12px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'padX 14px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'padX 18px' },
          { size: 'xxl', height: '48px', font: '14px', desc: 'padX 18px' },
          { size: 'xxxl', height: '56px', font: '16px', desc: 'padX 18px' },
        ]} />
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, marginBottom: 8 }}>
          Width presets, resolved via the <code>width</code> prop or the nearest <code>{'<DuiProvider width="...">'}</code>:
        </div>
        <WidthReference widths={[
          { width: 'sm', value: '80px' },
          { width: 'md', value: '120px' },
          { width: 'default', value: 'auto' },
          { width: 'lg', value: '200px' },
          { width: 'fullWidth', value: '100%' },
          { width: 'maxContent', value: 'max-content' },
          { width: 'fw', value: '100%' },
          { width: 'mx', value: 'max-content' },
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
          These values come from the Tab category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every tab-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
