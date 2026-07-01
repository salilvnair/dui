import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote } from '../../../shared/DocComponents';

export function ContextMenuViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Portal-rendered at document.body', color: 'var(--color-primary)' },
          { label: 'Anchor-element or cursor-position trigger', color: 'var(--color-success)' },
          { label: 'Infinite recursive submenus', color: 'var(--color-info)' },
          { label: 'Keyboard shortcut binding (Escape + single-key)', color: 'var(--color-warning)' },
          { label: 'Danger styling per item', color: '#a855f7' },
          { label: 'Separator / divider items', color: '#ec4899' },
          { label: 'Optional icons and keyboard shortcuts displayed', color: '#14b8a6' },
          { label: 'Viewport-safe auto positioning', color: '#f97316' },
          { label: 'Dropdown alignment (auto, left, right)', color: 'var(--color-primary)' },
          { label: 'Match anchor width option', color: 'var(--color-success)' },
          { label: 'Open/close animation (dui_menu-in)', color: 'var(--color-info)' },
          { label: 'Disabled per-item state', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'items', type: 'ContextMenuItem[]', required: true, description: 'Array of menu items. Items with separator=true render as horizontal dividers.' },
          { name: 'anchorEl', type: 'HTMLElement | null', required: true, description: 'The element to anchor the menu to. Menu opens below this element. Pass null to use position instead.' },
          { name: 'open', type: 'boolean', required: true, description: 'Controls the visibility of the menu.' },
          { name: 'onClose', type: '() => void', required: true, description: 'Called when the user clicks outside the menu, presses Escape, or clicks a non-submenu item.' },
          { name: 'width', type: 'ContextMenuWidth', default: "'auto'", description: "Width of the menu. 'auto' = max-content. 'sm' = 140px. 'md' = 180px. 'lg' = 220px. number = px value." },
          { name: 'rounded', type: 'boolean', default: 'true', description: 'true = 8px border-radius on the menu, 5px on items. false = 0px square.' },
          { name: 'matchAnchorWidth', type: 'boolean', default: 'false', description: 'When true, the menu width is set to match the anchor element width.' },
          { name: 'position', type: '{ x: number; y: number }', description: 'Alternative to anchorEl. Positions the menu at a specific viewport coordinate (for right-click context menus).' },
          { name: 'align', type: "'auto' | 'left' | 'right'", default: "'auto'", description: "Menu alignment relative to anchor. 'right' right-aligns with the anchor (opens leftward). 'left' always left-aligns. 'auto' chooses based on viewport space." },
        ]} />
      </DocSection>

      <DocSection title="ContextMenuItem shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique identifier for the item. Used as the React key.' },
          { name: 'label', type: 'string', required: true, description: 'Display text for the item.' },
          { name: 'icon', type: 'ReactNode', description: 'Icon rendered to the left of the label. Rendered in a 14px wide flex container.' },
          { name: 'shortcut', type: 'string', description: "Keyboard shortcut hint displayed on the right side. Also wired as a keyboard shortcut when the menu is open. Use '⌫' to match Backspace/Delete." },
          { name: 'danger', type: 'boolean', description: 'When true, the item and its icon render in var(--color-error) red.' },
          { name: 'disabled', type: 'boolean', description: 'When true, the item is shown at 45% opacity and clicks are ignored.' },
          { name: 'separator', type: 'boolean', description: 'When true, the item renders as a horizontal 1px divider line, ignoring all other props.' },
          { name: 'children', type: 'ContextMenuItem[]', description: 'Nested menu items. Hovering this item opens a submenu portalled to document.body, positioned to the right (auto-flips if needed).' },
          { name: 'onClick', type: '() => void', description: 'Handler called when the item is clicked. Also used by shortcut binding.' },
        ]} />
      </DocSection>

      <DocSection title="ContextMenuWidth enum">
        <EnumTable name="ContextMenuWidth" values={[
          { value: 'auto', description: 'max-content — menu is as wide as the longest item', color: 'var(--color-text-muted)' },
          { value: 'sm', description: '140px', color: 'var(--color-success)' },
          { value: 'md', description: '180px', color: 'var(--color-primary)' },
          { value: 'lg', description: '220px', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Submenu portals are also attached to document.body and positioned independently. Each level of nesting has its own sibling-coordination state so only one child submenu can be open at a time per menu level.
      </DocNote>

      <DocNote type="tip">
        Shortcuts are fired globally while the menu is open. A shortcut of "D" fires the item's onClick when the user presses D. The special shortcut "⌫" matches both Backspace and Delete.
      </DocNote>

      <DocNote type="warning">
        Items with children (submenus) do not fire onClick — clicking them opens the submenu instead. Add onClick only to leaf items.
      </DocNote>
    </div>
  );
}
