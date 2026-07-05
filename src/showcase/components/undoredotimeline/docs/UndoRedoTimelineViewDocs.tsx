import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function UndoRedoTimelineViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Branching git-log style history graph', color: 'var(--color-primary)' },
          { label: 'Jump to any node, not just linear undo/redo', color: 'var(--color-success)' },
          { label: 'Diverging edits render as visible lanes', color: 'var(--color-info)' },
          { label: 'Click any node to select it', color: 'var(--color-warning)' },
          { label: 'DuiProvider size context', color: '#a855f7' },
          { label: 'Custom accent color', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'nodes', type: 'UndoRedoNode[]', required: true, description: 'The full history, in the order they were created. The first node encountered with no parentId is treated as a root.' },
          { name: 'activeId', type: 'string', required: true, description: 'ID of the currently-active/selected node — highlighted and bolded.' },
          { name: 'onSelect', type: '(id: string) => void', required: true, description: 'Called with a node\'s id when clicked.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls label font size. Falls back to DuiProvider context.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Accent color for the active node\'s dot and border.' },
          { name: 'className', type: 'string', description: 'Additional class names on the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="UndoRedoNode shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Stable identifier for this history entry.' },
          { name: 'label', type: 'string', required: true, description: 'Human-readable description of the change, e.g. "Add auth header".' },
          { name: 'parentId', type: 'string', description: 'The id of the node this one was created from. Omit only for the root entry.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        Unlike a conventional linear undo/redo stack, this component never discards "redo" history when you make a new edit from a non-latest node — the new edit simply becomes a sibling branch (a new lane), and both paths remain fully visible and clickable.
      </DocNote>

      <DocNote type="tip">
        nodes must be passed in creation order for lane assignment to work correctly, since a node's lane is derived from its position among its parent's other children (indexOf) — reordering the array retroactively can shift which branch appears in which lane.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="UndoRedoTimelineView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on UndoRedoTimelineView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useDisplayBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '—', font: '8px', desc: 'icon 8px' },
          { size: 'xs', height: '—', font: '9px', desc: 'icon 10px' },
          { size: 'sm', height: '—', font: '10px', desc: 'icon 11px' },
          { size: 'md', height: '—', font: '11px', desc: 'icon 12px' },
          { size: 'lg', height: '—', font: '12px', desc: 'icon 14px' },
          { size: 'xl', height: '—', font: '13px', desc: 'icon 16px' },
          { size: 'xxl', height: '—', font: '14px', desc: 'icon 18px' },
          { size: 'xxxl', height: '—', font: '16px', desc: 'icon 20px' },
        ]} />
        <DocNote type="info">
          These values come from the Display category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every display-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
