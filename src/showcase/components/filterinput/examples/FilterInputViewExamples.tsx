import { useState } from 'react';
import { FilterInputView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const ROWS = ['GET /api/users', 'POST /api/users', 'DELETE /api/users/17', 'GET /api/orders'];

export function FilterInputViewExamples() {
  const [q, setQ] = useState('');
  const [size, setSize] = useState('');
  const shown = ROWS.filter(r => r.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <ExampleCard
        title="Filtering a list"
        description="The icon takes the accent once the box is doing something, so a filtered list never looks like an empty one"
        code={`<FilterInputView value={q} onChange={setQ} placeholder="Filter requests…" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
          <FilterInputView value={q} onChange={setQ} placeholder="Filter requests…" width={280} />
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            {shown.length} of {ROWS.length}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {shown.map(r => (
              <code key={r} style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{r}</code>
            ))}
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Sizes"
        description="Shares the DUI size scale with every other input"
        code={`<FilterInputView size="sm" value={v} onChange={setV} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(['xs', 'sm', 'md', 'lg'] as const).map(s => (
            <FilterInputView key={s} size={s} value={size} onChange={setSize} placeholder={s} width={240} />
          ))}
        </div>
      </ExampleCard>
    </>
  );
}
