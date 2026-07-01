import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote } from '../../../shared/DocComponents';

export function SideNavViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Collapsible sidebar', color: 'var(--color-primary)' },
          { label: 'Controlled + uncontrolled collapse', color: 'var(--color-success)' },
          { label: 'Group headers (uppercase, collapsible)', color: 'var(--color-info)' },
          { label: 'Badge + count per item', color: 'var(--color-warning)' },
          { label: 'Built-in search box', color: '#a855f7' },
          { label: 'Empty state on no search results', color: '#ec4899' },
          { label: 'Animated collapse (200ms)', color: '#14b8a6' },
          { label: 'DuiProvider size inheritance', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="SideNavItem">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique identifier for the nav item. Passed to onSelect callback.' },
          { name: 'label', type: 'string', required: true, description: 'Display text shown in the nav item.' },
          { name: 'icon', type: 'ReactNode', description: 'Optional icon rendered left of the label.' },
          { name: 'badge', type: 'number | string', description: 'Accent-colored pill badge shown right of label (e.g. "New", 3).' },
          { name: 'count', type: 'number', description: 'Plain muted count shown right of a group header label.' },
          { name: 'isGroup', type: 'boolean', description: 'When true, renders as uppercase section header — non-selectable and collapsible.' },
          { name: 'children', type: 'SideNavItem[]', description: 'Child items nested under a group header.' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'items', type: 'SideNavItem[]', required: true, description: 'Full nav item tree. Groups can contain children.' },
          { name: 'activeId', type: 'string', description: 'ID of the currently selected item. Highlighted with accent color.' },
          { name: 'onSelect', type: '(id: string) => void', description: 'Called when a leaf nav item is clicked.' },
          { name: 'collapsible', type: 'boolean', default: 'true', description: 'Show/hide the collapse toggle button at the bottom.' },
          { name: 'defaultCollapsed', type: 'boolean', default: 'false', description: 'Initial collapsed state (uncontrolled mode).' },
          { name: 'collapsed', type: 'boolean', description: 'Controlled collapsed state. When provided, overrides internal state.' },
          { name: 'onCollapsedChange', type: '(collapsed: boolean) => void', description: 'Called when collapse state changes (controlled mode).' },
          { name: 'defaultOpenIds', type: 'string[]', description: 'IDs of groups open by default. Defaults to all groups open.' },
          { name: 'width', type: 'number', default: '200', description: 'Width in px when expanded.' },
          { name: 'collapsedWidth', type: 'number', default: '44', description: 'Width in px when collapsed (icon-only mode).' },
          { name: 'accentColor', type: 'string', description: 'Accent color for active item highlight and badges.' },
          { name: 'searchable', type: 'boolean', default: 'false', description: 'Show a search input above nav items.' },
          { name: 'searchPlaceholder', type: 'string', default: "'Search…'", description: 'Placeholder text for the search box.' },
          { name: 'emptyText', type: 'string', default: "'No results'", description: 'Message shown when no items match the search query.' },
          { name: 'size', type: 'DuiSize', description: 'Size token. Falls back to DuiProvider context when omitted.' },
          { name: 'className', type: 'string', description: 'Extra CSS class applied to the root element.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles applied to the root element.' },
        ]} />
      </DocSection>

      <DocSection title="Collapse Behavior">
        <DocNote type="info">
          When collapsed, leaf items render as icon-only squares. Groups collapse their children directly, with no header shown. The collapse toggle button only appears in uncontrolled mode (when the <code>collapsed</code> prop is not provided).
        </DocNote>
        <DocNote type="tip">
          Pass <code>collapsed</code> + <code>onCollapsedChange</code> together for controlled mode. Use <code>defaultCollapsed</code> alone for uncontrolled mode.
        </DocNote>
      </DocSection>

      <DocSection title="Exported Helpers">
        <PropTable props={[
          { name: 'countLeaves(items)', type: 'number', description: 'Recursively counts all non-group items in the tree.' },
          { name: 'filterItems(items, q)', type: 'SideNavItem[]', description: 'Filters items by label substring match, preserving group structure.' },
        ]} />
      </DocSection>
    </div>
  );
}
