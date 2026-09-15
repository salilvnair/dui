import { useState } from 'react';
import { SortableView, BadgeChipView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function SortableViewExamples() {
  const [order, setOrder] = useState(['Auth', 'Rate limit', 'Logging', 'Compression']);

  const move = (from: number, to: number) =>
    setOrder(prev => {
      const next = prev.slice();
      next.splice(to, 0, next.splice(from, 1)[0]);
      return next;
    });

  return (
    <>
      <ExampleCard
        title="Drag rows you drew yourself"
        description="SortableView supplies the handle, the drop indicator and the indices — the row is entirely yours"
        code={'<SortableView rows={rows} onReorder={(from, to) => move(from, to)} />'}
      >
        <div style={{ width: 360 }}>
          <SortableView
            onReorder={move}
            rows={order.map((name, i) => ({
              id: name,
              node: (
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 10px', border: '1px solid var(--color-surface-border)',
                  borderRadius: 8, background: 'var(--color-surface)',
                }}>
                  <span style={{ fontSize: 12 }}>{name}</span>
                  <BadgeChipView size="2xs" tone="var(--color-text-muted)">{'#' + (i + 1)}</BadgeChipView>
                </div>
              ),
            }))}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Locked"
        description="disabled renders the rows bare, with no handle and no drag"
        code={'<SortableView rows={rows} onReorder={move} disabled />'}
      >
        <div style={{ width: 360 }}>
          <SortableView
            onReorder={move}
            disabled
            rows={order.map(name => ({
              id: name,
              node: (
                <div style={{
                  padding: '8px 10px', fontSize: 12,
                  border: '1px solid var(--color-surface-border)',
                  borderRadius: 8, background: 'var(--color-surface)',
                }}>
                  {name}
                </div>
              ),
            }))}
          />
        </div>
      </ExampleCard>
    </>
  );
}
