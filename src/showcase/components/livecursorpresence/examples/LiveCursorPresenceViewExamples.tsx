import { useEffect, useState } from 'react';
import { LiveCursorPresenceView, type LiveCursor } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function LiveCursorPresenceViewExamples() {
  const [cursors, setCursors] = useState<LiveCursor[]>([
    { id: '1', name: 'Jordan', x: 0.3, y: 0.4 },
    { id: '2', name: 'Priya', x: 0.7, y: 0.6 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursors(prev => prev.map(c => ({
        ...c,
        x: Math.min(0.95, Math.max(0.05, c.x + (Math.random() - 0.5) * 0.15)),
        y: Math.min(0.9, Math.max(0.1, c.y + (Math.random() - 0.5) * 0.15)),
      })));
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ExampleCard
        title="Two Collaborators"
        description="Named cursors overlaid on arbitrary content, positioned as fractions of the container"
        code={`<LiveCursorPresenceView cursors={[{ id: '1', name: 'Jordan', x: 0.3, y: 0.4 }, { id: '2', name: 'Priya', x: 0.7, y: 0.6 }]}>
  <div style={{ height: 160, border: '1px solid var(--color-surface-border)', borderRadius: 8 }} />
</LiveCursorPresenceView>`}
      >
        <LiveCursorPresenceView cursors={[{ id: '1', name: 'Jordan', x: 0.3, y: 0.4 }, { id: '2', name: 'Priya', x: 0.7, y: 0.6 }]}>
          <div style={{ height: 160, border: '1px solid var(--color-surface-border)', borderRadius: 8, background: 'var(--color-surface)' }} />
        </LiveCursorPresenceView>
      </ExampleCard>

      <ExampleCard
        title="Live Movement Simulation (interactive)"
        description="Cursors drift randomly every 1.4s — positions smoothly transition via CSS"
        code={`const [cursors, setCursors] = useState(initialCursors);

useEffect(() => {
  const id = setInterval(() => {
    setCursors(prev => prev.map(c => ({ ...c, x: jitter(c.x), y: jitter(c.y) })));
  }, 1400);
  return () => clearInterval(id);
}, []);

<LiveCursorPresenceView cursors={cursors}>
  <RequestBuilderPanel />
</LiveCursorPresenceView>`}
      >
        <LiveCursorPresenceView cursors={cursors}>
          <div style={{ height: 160, border: '1px solid var(--color-surface-border)', borderRadius: 8, background: 'var(--color-surface)' }} />
        </LiveCursorPresenceView>
      </ExampleCard>

      <ExampleCard
        title="Collection Editor with Team Presence"
        description="Realistic Daakia usage — cursors over a shared collection tree while teammates browse it"
        code={`<LiveCursorPresenceView cursors={[{ id: '1', name: 'Marcus', x: 0.15, y: 0.3 }]}>
  <div style={{ padding: 12, fontFamily: 'var(--font-mono)', fontSize: 12 }}>
    <div>📁 Auth API</div>
    <div style={{ paddingLeft: 16 }}>POST /login</div>
    <div style={{ paddingLeft: 16 }}>POST /refresh</div>
  </div>
</LiveCursorPresenceView>`}
      >
        <LiveCursorPresenceView cursors={[{ id: '1', name: 'Marcus', x: 0.15, y: 0.3 }]}>
          <div style={{ padding: 12, fontFamily: 'var(--font-mono, monospace)', fontSize: 12, border: '1px solid var(--color-surface-border)', borderRadius: 8, background: 'var(--color-surface)' }}>
            <div>Auth API</div>
            <div style={{ paddingLeft: 16, color: 'var(--color-text-muted)' }}>POST /login</div>
            <div style={{ paddingLeft: 16, color: 'var(--color-text-muted)' }}>POST /refresh</div>
          </div>
        </LiveCursorPresenceView>
      </ExampleCard>

      <ExampleCard
        title="Custom Per-User Colors"
        description="Explicit color overrides instead of the default palette rotation"
        code={`<LiveCursorPresenceView cursors={[
  { id: '1', name: 'Sofia', x: 0.25, y: 0.35, color: '#e11d48' },
  { id: '2', name: 'devops-bot', x: 0.65, y: 0.5, color: '#14b8a6' },
]}>
  <div style={{ height: 140, border: '1px solid var(--color-surface-border)', borderRadius: 8 }} />
</LiveCursorPresenceView>`}
      >
        <LiveCursorPresenceView cursors={[
          { id: '1', name: 'Sofia', x: 0.25, y: 0.35, color: '#e11d48' },
          { id: '2', name: 'devops-bot', x: 0.65, y: 0.5, color: '#14b8a6' },
        ]}>
          <div style={{ height: 140, border: '1px solid var(--color-surface-border)', borderRadius: 8, background: 'var(--color-surface)' }} />
        </LiveCursorPresenceView>
      </ExampleCard>

      <ExampleCard
        title="No Active Collaborators (edge case)"
        description="Empty cursors array — content renders normally with no overlay"
        code={`<LiveCursorPresenceView cursors={[]}>
  <div style={{ height: 100, border: '1px dashed var(--color-surface-border)', borderRadius: 8 }} />
</LiveCursorPresenceView>`}
      >
        <LiveCursorPresenceView cursors={[]}>
          <div style={{ height: 100, border: '1px dashed var(--color-surface-border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--color-text-muted)' }}>
            No one else is viewing this collection
          </div>
        </LiveCursorPresenceView>
      </ExampleCard>
    </div>
  );
}
