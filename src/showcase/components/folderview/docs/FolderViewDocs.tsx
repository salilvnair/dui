import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function FolderViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Recursive folder tree (FolderNode)', color: 'var(--color-primary)' },
          { label: 'Expand/collapse with animated chevron', color: 'var(--color-success)' },
          { label: 'Inline rename on double-click', color: 'var(--color-info)' },
          { label: 'Hover action buttons per folder', color: 'var(--color-warning)' },
          { label: 'DUI ContextMenuView on right-click', color: '#a855f7' },
          { label: 'Runner modal (tabbed popup per node)', color: '#ec4899' },
          { label: 'HTML5 drag-and-drop (nodes + items)', color: '#14b8a6' },
          { label: 'Move confirm modal', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="FolderNode">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique node identifier.' },
          { name: 'label', type: 'string', required: true, description: 'Display name of the folder.' },
          { name: 'children', type: 'FolderNode[]', description: 'Sub-folder nodes.' },
          { name: 'items', type: 'T[]', description: 'Leaf items inside this folder. Rendered via renderItem.' },
          { name: 'data', type: 'unknown', description: 'Arbitrary metadata attached to the node.' },
        ]} />
      </DocSection>

      <DocSection title="FolderAction">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: "Action identifier. Use 'run' to trigger the runner modal; use 'more'/'context' to trigger the context menu." },
          { name: 'icon', type: 'ReactNode', required: true, description: 'Icon for the action button.' },
          { name: 'tooltip', type: 'string', description: 'Tooltip shown on hover.' },
          { name: 'disabled', type: 'boolean | (node) => boolean', description: 'Disables the action. Accepts a per-node function.' },
          { name: 'onClick', type: '(node, e) => void', required: true, description: 'Called when action is clicked (unless id is "run" or "more").' },
        ]} />
      </DocSection>

      <DocSection title="Core Props">
        <PropTable props={[
          { name: 'nodes', type: 'FolderNode[]', required: true, description: 'Top-level folder nodes.' },
          { name: 'accentColor', type: 'string', default: "'var(--color-text-muted)'", description: 'Accent color for folder icons, drop highlights, and action buttons.' },
          { name: 'folderActions', type: 'FolderAction[]', description: 'Action buttons rendered on folder hover.' },
          { name: 'contextMenuItems', type: '(node) => ContextMenuItem[]', description: 'Returns context menu items for a node. Right-click triggers the menu.' },
          { name: 'runner', type: 'FolderRunnerConfig', description: 'Config for the runner modal (tabbed popup opened by the "run" action).' },
          { name: 'defaultExpandedIds', type: 'Set<string>', description: 'IDs of nodes expanded by default (uncontrolled).' },
          { name: 'expandedIds', type: 'Set<string>', description: 'Controlled expanded node IDs.' },
          { name: 'onToggle', type: '(id: string) => void', description: 'Called when a node is expanded/collapsed (controlled mode).' },
          { name: 'renderItem', type: '(item, node, depth) => ReactNode', description: 'Custom renderer for leaf items.' },
          { name: 'onRename', type: '(id: string, newName: string) => void', description: 'Called after a double-click rename is committed.' },
          { name: 'onFolderClick', type: '(node) => void', description: 'Called when a folder is clicked (in addition to expand/collapse).' },
          { name: 'emptyLabel', type: 'string', default: "'No items'", description: 'Text shown when nodes array is empty.' },
          { name: 'indentPx', type: 'number', default: '12', description: 'Horizontal indent per depth level in px.' },
        ]} />
      </DocSection>

      <DocSection title="Drag-and-drop Props">
        <PropTable props={[
          { name: 'draggable', type: 'boolean', default: 'false', description: 'Enable HTML5 drag-and-drop for folder nodes.' },
          { name: 'isDraggableNode', type: '(node) => boolean', description: 'Guard function to prevent specific nodes from being dragged.' },
          { name: 'onMove', type: '(dragId, targetId, position) => void', description: 'Called when a node is dropped. position is "before" | "inside" | "after".' },
          { name: 'confirmFolderMove', type: 'boolean', default: 'false', description: 'Show a confirmation modal before calling onMove.' },
          { name: 'getMoveSummary', type: '(dragId) => MoveSummaryEntry[]', description: 'Returns sub-folder and item entries shown in the move confirmation modal.' },
          { name: 'draggableItems', type: 'boolean', default: 'false', description: 'Enable drag-and-drop for leaf items.' },
          { name: 'getItemId', type: '(item) => string', description: 'Required when draggableItems=true. Returns a stable unique ID per item.' },
          { name: 'onItemMove', type: '(itemId, targetId, targetKind, position) => void', description: 'Called when an item is dropped.' },
        ]} />
      </DocSection>

      <DocSection title="Runner modal">
        <DocNote type="info">
          When a folder action has <code>id="run"</code>, clicking it opens the FolderRunnerConfig modal. The modal shows a tabbed layout with configurable content per tab and an optional Save button. This is used in Daakia for the collection runner panel.
        </DocNote>
      </DocSection>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="FolderView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          FolderView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
