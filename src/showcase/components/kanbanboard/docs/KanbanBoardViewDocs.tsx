import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function KanbanBoardViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Native HTML5 drag-and-drop', color: 'var(--color-primary)' },
          { label: 'Multi-column layout, horizontally scrollable', color: 'var(--color-success)' },
          { label: 'Per-column accent color', color: 'var(--color-info)' },
          { label: 'Card count badge per column', color: 'var(--color-warning)' },
          { label: 'Rich card content', color: '#a855f7' },
          { label: 'Fully controlled state', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'columns', type: 'KanbanColumn[]', required: true, description: 'Ordered list of columns to render.' },
          { name: 'onChange', type: '(columns: KanbanColumn[]) => void', required: true, description: 'Called with the new columns array whenever a card is dropped into a new position or column. The component computes the reordered array internally; the consumer is responsible for persisting it.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls card/column padding and font size. Falls back to DuiProvider context when omitted.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer board container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer board container.' },
        ]} />
      </DocSection>

      <DocSection title="KanbanColumn / KanbanCard shape">
        <PropTable props={[
          { name: 'column.id', type: 'string', required: true, description: 'Unique column identifier.' },
          { name: 'column.title', type: 'string', required: true, description: 'Column header text.' },
          { name: 'column.cards', type: 'KanbanCard[]', required: true, description: 'Cards currently in this column.' },
          { name: 'column.color', type: 'string', description: 'Accent color for the column header top border. Defaults to var(--color-primary).' },
          { name: 'card.id', type: 'string', required: true, description: 'Unique card identifier, must be unique across the whole board.' },
          { name: 'card.title', type: 'string', required: true, description: 'Card title text.' },
          { name: 'card.content', type: 'ReactNode', description: 'Optional secondary content rendered below the title (assignee, tags, due date, etc).' },
        ]} />
      </DocSection>

      <DocNote type="info">
        KanbanBoardView is fully controlled — it never mutates the columns prop directly. On drop it computes a new columns array (moving the dragged card out of its source column and into the target index) and hands it to onChange; you own storing that state.
      </DocNote>

      <DocNote type="warning">
        Drag-and-drop uses the native HTML5 draggable API, not a pointer-based library — it will not work well on touch-only devices. For touch-friendly reordering of a flat list, consider DragHandleView with a pointer-based drag implementation instead.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="KanbanBoardView reads its dimensions from the shared card category base hook (useCardBase). Omitting size, borderRadius, or color on KanbanBoardView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every card-category component at once."
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
