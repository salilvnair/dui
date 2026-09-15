import { useState } from 'react';
import { RearrangeView } from '@/dui';
import type { RearrangeItem } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function RearrangeViewExamples() {
  const [cols, setCols] = useState<RearrangeItem[]>([
    { id: 'method', label: 'Method', enabled: true },
    { id: 'url', label: 'URL', enabled: true },
    { id: 'status', label: 'Status', enabled: true },
    { id: 'time', label: 'Time', enabled: false },
    { id: 'size', label: 'Size', enabled: false },
  ]);

  const [plain, setPlain] = useState<RearrangeItem[]>([
    { id: 'a', label: 'First' },
    { id: 'b', label: 'Second' },
    { id: 'c', label: 'Third' },
  ]);

  return (
    <>
      <ExampleCard
        title="Order and enable in one list"
        description="Drag to reorder, tick to include — which is how a column picker actually works"
        code={'<RearrangeView items={cols} onChange={setCols} />'}
      >
        <div style={{ width: 320 }}>
          <RearrangeView items={cols} onChange={setCols} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Order only"
        description="selectable={false} drops the checkboxes"
        code={'<RearrangeView items={items} onChange={setItems} selectable={false} />'}
      >
        <div style={{ width: 320 }}>
          <RearrangeView items={plain} onChange={setPlain} selectable={false} />
        </div>
      </ExampleCard>
    </>
  );
}
