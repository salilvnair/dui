import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function DragHandleViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Six-dot grip icon', color: 'var(--color-primary)' },
          { label: 'grab cursor + touch-action: none', color: 'var(--color-success)' },
          { label: 'DuiProvider size context', color: 'var(--color-info)' },
          { label: 'Custom dot color', color: 'var(--color-warning)' },
          { label: 'Pure presentational primitive', color: '#a855f7' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls the dot size and grid gap, scaled from the resolved icon size. Falls back to DuiProvider context when omitted.' },
          { name: 'color', type: 'string', default: 'var(--color-text-muted)', description: 'Fill color of the six grip dots.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer span.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer span.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        DragHandleView is a pure visual affordance — it renders the grip icon only and does not implement drag-and-drop itself. Wire up native HTML5 drag events (draggable, onDragStart, onDragOver, onDrop) or a drag library on the containing row, using this component purely as the "grab me here" target.
      </DocNote>

      <DocNote type="tip">
        Pair with KanbanBoardView for a full drag-and-drop board pattern, or use standalone as the handle in any reorderable list (collection items, form fields, pipeline steps).
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="DragHandleView reads its dimensions from the shared display category base hook (useDisplayBase). Omitting size, borderRadius, or color on DragHandleView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every display-category component at once."
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
