import { useState } from 'react';
import { VirtualizedListView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

interface RequestLogRow {
  id: number;
  method: string;
  path: string;
  status: number;
  ms: number;
}

function makeLogs(n: number): RequestLogRow[] {
  const methods = ['GET', 'POST', 'PUT', 'DELETE'];
  const statuses = [200, 201, 304, 404, 500];
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    method: methods[i % methods.length],
    path: `/api/v1/resource/${i + 1}`,
    status: statuses[i % statuses.length],
    ms: 12 + (i % 240),
  }));
}

export function VirtualizedListViewExamples() {
  const [logs] = useState(() => makeLogs(5000));
  const [selected, setSelected] = useState<number | null>(null);
  const [emptyLogs] = useState<RequestLogRow[]>([]);

  return (
    <div>
      <ExampleCard
        title="Basic Windowed List"
        description="5,000 simple rows — only the visible slice is ever mounted"
        code={`const items = Array.from({ length: 5000 }, (_, i) => 'Row ' + (i + 1));

<VirtualizedListView
  items={items}
  itemHeight={28}
  height={200}
  renderItem={item => <div>{item}</div>}
/>`}
      >
        <VirtualizedListView
          items={Array.from({ length: 5000 }, (_, i) => `Row ${i + 1}`)}
          itemHeight={28}
          height={200}
          renderItem={item => (
            <div style={{ padding: '0 10px', display: 'flex', alignItems: 'center', height: '100%', fontSize: 12.5, color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-surface-border)' }}>
              {item}
            </div>
          )}
        />
      </ExampleCard>

      <ExampleCard
        title="Selectable Request Log (interactive)"
        description="Clicking a row selects it — state lives outside the virtualized window"
        code={`const [selected, setSelected] = useState<number | null>(null);

<VirtualizedListView
  items={logs}
  itemHeight={32}
  height={220}
  renderItem={row => (
    <div onClick={() => setSelected(row.id)} style={{ background: selected === row.id ? 'var(--color-primary)' : undefined }}>
      {row.method} {row.path} — {row.status}
    </div>
  )}
/>`}
      >
        <VirtualizedListView
          items={logs.slice(0, 500)}
          itemHeight={32}
          height={220}
          renderItem={row => (
            <div
              onClick={() => setSelected(row.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, height: '100%', padding: '0 10px', cursor: 'pointer',
                background: selected === row.id ? 'color-mix(in srgb, var(--color-primary) 14%, transparent)' : undefined,
                borderBottom: '1px solid var(--color-surface-border)', fontSize: 12,
              }}
            >
              <span style={{ fontWeight: 700, width: 46, color: 'var(--color-text-muted)' }}>{row.method}</span>
              <span style={{ flex: 1, color: 'var(--color-text-primary)' }}>{row.path}</span>
              <span style={{ color: row.status >= 400 ? 'var(--color-error)' : 'var(--color-success)' }}>{row.status}</span>
              <span style={{ color: 'var(--color-text-muted)' }}>{row.ms}ms</span>
            </div>
          )}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Selected: {selected ?? 'none'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Overscan Comparison"
        description="Higher overscan pre-mounts more off-screen rows to reduce blank flashes on fast scroll"
        code={`<VirtualizedListView items={logs} itemHeight={26} height={160} overscan={1} renderItem={...} />
<VirtualizedListView items={logs} itemHeight={26} height={160} overscan={12} renderItem={...} />`}
      >
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>overscan=1</div>
            <VirtualizedListView
              items={logs.slice(0, 200)}
              itemHeight={26}
              height={160}
              overscan={1}
              renderItem={row => <div style={{ fontSize: 11.5, padding: '0 8px', lineHeight: '26px', borderBottom: '1px solid var(--color-surface-border)' }}>{row.path}</div>}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>overscan=12</div>
            <VirtualizedListView
              items={logs.slice(0, 200)}
              itemHeight={26}
              height={160}
              overscan={12}
              renderItem={row => <div style={{ fontSize: 11.5, padding: '0 8px', lineHeight: '26px', borderBottom: '1px solid var(--color-surface-border)' }}>{row.path}</div>}
            />
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Environment Variable List"
        description="Domain-realistic use — scrolling through hundreds of environment variables in an API client"
        code={`const envVars = Array.from({ length: 800 }, (_, i) => ({ key: 'VAR_' + i, value: 'value-' + i }));

<VirtualizedListView
  items={envVars}
  itemHeight={30}
  height={200}
  renderItem={v => <div>{v.key} = {v.value}</div>}
/>`}
      >
        <VirtualizedListView
          items={Array.from({ length: 800 }, (_, i) => ({ key: `API_ENV_VAR_${i}`, value: `value-${i}-${Math.random().toString(36).slice(2, 6)}` }))}
          itemHeight={30}
          height={200}
          renderItem={v => (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', height: '100%', padding: '0 10px', fontSize: 12, fontFamily: 'ui-monospace, monospace', borderBottom: '1px solid var(--color-surface-border)' }}>
              <span style={{ color: 'var(--color-primary)' }}>{v.key}</span>
              <span style={{ color: 'var(--color-text-muted)' }}>=</span>
              <span style={{ color: 'var(--color-text-secondary)' }}>{v.value}</span>
            </div>
          )}
        />
      </ExampleCard>

      <ExampleCard
        title="Empty State"
        description="No items — the container renders with zero height content and no rows"
        code={`<VirtualizedListView
  items={[]}
  itemHeight={28}
  height={80}
  renderItem={item => <div>{item}</div>}
/>`}
      >
        <VirtualizedListView
          items={emptyLogs}
          itemHeight={28}
          height={80}
          renderItem={row => <div>{row.path}</div>}
        />
        <div style={{ marginTop: -80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--color-text-muted)', pointerEvents: 'none' }}>
          No requests logged yet
        </div>
      </ExampleCard>
    </div>
  );
}
