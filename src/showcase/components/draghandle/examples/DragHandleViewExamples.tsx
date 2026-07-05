import { useState } from 'react';
import { DragHandleView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function DragHandleViewExamples() {
  const [items, setItems] = useState(['Get all users', 'Create order', 'Delete session', 'Webhook: order.created']);
  const dragIndex = useState({ current: -1 })[0];

  const onDrop = (targetIndex: number) => {
    if (dragIndex.current < 0 || dragIndex.current === targetIndex) return;
    setItems(prev => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex.current, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
    dragIndex.current = -1;
  };

  return (
    <div>
      <ExampleCard
        title="Default Handle"
        description="Six-dot grip icon, standalone"
        code={`<DragHandleView />`}
      >
        <DragHandleView />
      </ExampleCard>

      <ExampleCard
        title="Custom Color"
        description="Override the dot color to match a themed list"
        code={`<DragHandleView color="var(--color-primary)" />
<DragHandleView color="var(--color-warning)" />
<DragHandleView color="var(--color-error)" />`}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <DragHandleView color="var(--color-primary)" />
          <DragHandleView color="var(--color-warning)" />
          <DragHandleView color="var(--color-error)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="Grip scales with the DuiSize prop"
        code={`<DragHandleView size="xs" />
<DragHandleView size="md" />
<DragHandleView size="xl" />`}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <DragHandleView size="xs" />
          <DragHandleView size="md" />
          <DragHandleView size="xl" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Reorderable Request List (API-testing use case)"
        description="Drag a request row within a collection to reorder it — DragHandleView is the grab affordance, drag logic lives in the consumer"
        code={`const [items, setItems] = useState(['Get all users', 'Create order', 'Delete session']);
let dragIndex = -1;

{items.map((item, i) => (
  <div
    key={item}
    draggable
    onDragStart={() => (dragIndex = i)}
    onDragOver={e => e.preventDefault()}
    onDrop={() => reorder(dragIndex, i)}
    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
  >
    <DragHandleView size="sm" />
    <span>{item}</span>
  </div>
))}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map((item, i) => (
            <div
              key={item}
              draggable
              onDragStart={() => { dragIndex.current = i; }}
              onDragOver={e => e.preventDefault()}
              onDrop={() => onDrop(i)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', border: '1px solid var(--color-surface-border)', borderRadius: 6 }}
            >
              <DragHandleView size="sm" />
              <span style={{ fontSize: 12, color: 'var(--color-text-primary)' }}>{item}</span>
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled-Looking State"
        description="Dim the handle and remove cursor affordance when reordering is temporarily locked (e.g. a read-only shared collection)"
        code={`<div style={{ opacity: 0.35, pointerEvents: 'none' }}>
  <DragHandleView />
</div>`}
      >
        <div style={{ opacity: 0.35, pointerEvents: 'none' }}>
          <DragHandleView />
        </div>
      </ExampleCard>
    </div>
  );
}
