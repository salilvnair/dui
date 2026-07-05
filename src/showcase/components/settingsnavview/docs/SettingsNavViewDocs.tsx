import { DocSection, PropTable, FeatureGrid, DocNote, RadiusReference } from '../../../shared/DocComponents';

export function SettingsNavViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Grouped settings navigation', color: 'var(--color-primary)' },
          { label: 'Optional group titles', color: 'var(--color-success)' },
          { label: 'Item description line', color: 'var(--color-info)' },
          { label: 'Icon support per item', color: 'var(--color-warning)' },
          { label: 'Badge chips per item', color: '#a855f7' },
          { label: 'DUI size + radius + font tokens', color: '#ec4899' },
          { label: 'Active + inactive color overrides', color: '#14b8a6' },
          { label: 'DuiProvider context fallback', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="SettingsNavItem">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique identifier. Passed to onSelect callback when clicked.' },
          { name: 'label', type: 'string', required: true, description: 'Primary label text for the item.' },
          { name: 'description', type: 'string', description: 'Optional secondary line shown below the label in muted style.' },
          { name: 'icon', type: 'ReactNode', description: 'Optional icon rendered left of the label. Tinted with accent when active.' },
          { name: 'badge', type: 'string', description: 'Accent-tinted pill badge rendered on the right side of the item.' },
        ]} />
      </DocSection>

      <DocSection title="SettingsNavGroup">
        <PropTable props={[
          { name: 'title', type: 'string', description: 'Optional uppercase group label shown above the items.' },
          { name: 'items', type: 'SettingsNavItem[]', required: true, description: 'List of items in this group.' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'groups', type: 'SettingsNavGroup[]', required: true, description: 'Array of groups, each containing a title and list of items.' },
          { name: 'activeId', type: 'string', description: 'ID of the currently selected item.' },
          { name: 'onSelect', type: '(id: string) => void', description: 'Called when any item is clicked.' },
          { name: 'accentColor', type: 'string', description: 'Accent color for active item text, icon, and badge. Falls back to DuiProvider activeColor.' },
          { name: 'size', type: 'DuiSize', description: 'Controls item height and font size. Falls back to DuiProvider size.' },
          { name: 'borderRadius', type: "DuiRadius | number", description: 'Border radius for items. Accepts preset name or raw px number.' },
          { name: 'color', type: 'string', description: 'Text color for inactive items. Falls back to DuiProvider color.' },
          { name: 'activeColor', type: 'string', description: 'Color for active item text and icon (alias for accentColor).' },
          { name: 'fontStyle', type: "DuiFontStyle", description: "Font style applied to item text ('normal' | 'italic')." },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root element.' },
        ]} />
      </DocSection>

      <DocSection title="Usage note">
        <DocNote type="tip">
          SettingsNavView differs from SideNavView in that it is designed for dense settings panels, not sidebars. It has no collapse toggle or search box. Use it for app settings screens with multiple named sections.
        </DocNote>
      </DocSection>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="SettingsNavView reads <code>size</code>, <code>color</code>, and related style props directly from the DuiProvider context via useDui() rather than through a shared category base hook. Omitting a local size or color prop falls back to the nearest <DuiProvider> value."
      >
        <FeatureGrid features={[
          { label: 'useDui() context read', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / color overrides', color: 'var(--color-info)' },
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
          SettingsNavView derives its own local size map from the resolved <code>size</code> value rather than sharing one of the category base hooks (e.g. useInputBase, useButtonBase). Behavior is still provider-aware: change <code>{'<DuiProvider size="...">'}</code> to restyle this component along with the rest of the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
