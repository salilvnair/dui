import { useState } from 'react';
import { StackedToastDeckView } from '@/dui';
import type { ToastDeckEntry } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

let idCounter = 100;

export function StackedToastDeckViewExamples() {
  const [toasts, setToasts] = useState<ToastDeckEntry[]>([
    { id: '1', content: 'Deploy succeeded' },
    { id: '2', content: 'New comment on PR #42' },
    { id: '3', content: 'Webhook delivered' },
  ]);

  const [colored, setColored] = useState<ToastDeckEntry[]>([
    { id: 'a', content: '200 OK — /api/users', color: 'var(--color-success)' },
    { id: 'b', content: '429 Too Many Requests — /api/search', color: 'var(--color-warning)' },
    { id: 'c', content: '500 Internal Error — /api/orders', color: 'var(--color-error)' },
  ]);

  const [wide, setWide] = useState<ToastDeckEntry[]>([
    { id: 'w1', content: 'Environment "Production" activated' },
  ]);

  const [runToasts, setRunToasts] = useState<ToastDeckEntry[]>([
    { id: 'run-1', content: 'Request 1/12 passed', color: 'var(--color-success)' },
    { id: 'run-2', content: 'Request 2/12 passed', color: 'var(--color-success)' },
    { id: 'run-3', content: 'Request 3/12 failed: timeout', color: 'var(--color-error)' },
  ]);

  const addToast = () => {
    idCounter += 1;
    setRunToasts(prev => [{ id: String(idCounter), content: `Request ${idCounter - 100}/12 passed`, color: 'var(--color-success)' }, ...prev]);
  };

  return (
    <div>
      <ExampleCard
        title="Basic Notification Deck"
        description="Common default use — recent toasts recede behind the newest; click the deck to fan out and dismiss"
        code={`const [toasts, setToasts] = useState([
  { id: '1', content: 'Deploy succeeded' },
  { id: '2', content: 'New comment on PR #42' },
  { id: '3', content: 'Webhook delivered' },
]);

<StackedToastDeckView toasts={toasts} onDismiss={id => setToasts(prev => prev.filter(t => t.id !== id))} />`}
      >
        <StackedToastDeckView toasts={toasts} onDismiss={id => setToasts(prev => prev.filter(t => t.id !== id))} />
      </ExampleCard>

      <ExampleCard
        title="Colored Response Status Toasts"
        description="Per-toast color coding via ToastDeckEntry.color, mirroring HTTP status severity"
        code={`const [toasts, setToasts] = useState([
  { id: 'a', content: '200 OK — /api/users', color: 'var(--color-success)' },
  { id: 'b', content: '429 Too Many Requests — /api/search', color: 'var(--color-warning)' },
  { id: 'c', content: '500 Internal Error — /api/orders', color: 'var(--color-error)' },
]);

<StackedToastDeckView toasts={toasts} onDismiss={id => setToasts(prev => prev.filter(t => t.id !== id))} />`}
      >
        <StackedToastDeckView toasts={colored} onDismiss={id => setColored(prev => prev.filter(t => t.id !== id))} />
      </ExampleCard>

      <ExampleCard
        title="Custom Width, Single Toast"
        description="A wider deck for a single environment-switch notification"
        code={`<StackedToastDeckView
  toasts={[{ id: 'w1', content: 'Environment "Production" activated' }]}
  onDismiss={id => setWide(prev => prev.filter(t => t.id !== id))}
  width={360}
/>`}
      >
        <StackedToastDeckView toasts={wide} onDismiss={id => setWide(prev => prev.filter(t => t.id !== id))} width={360} />
      </ExampleCard>

      <ExampleCard
        title="Live Collection Run Feed"
        description="API-testing domain use case — toasts arrive as each request in a collection run completes"
        code={`const [toasts, setToasts] = useState(initialRunToasts);

<StackedToastDeckView toasts={toasts} onDismiss={id => setToasts(p => p.filter(t => t.id !== id))} />
<button onClick={() => setToasts(p => [{ id: nextId(), content: 'Request N/12 passed', color: 'var(--color-success)' }, ...p])}>
  Simulate next result
</button>`}
      >
        <StackedToastDeckView toasts={runToasts} onDismiss={id => setRunToasts(prev => prev.filter(t => t.id !== id))} />
        <button
          onClick={addToast}
          style={{ marginTop: 8, fontSize: 11, padding: '4px 10px', borderRadius: 6, border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)', color: 'var(--color-text-primary)', cursor: 'pointer' }}
        >
          Simulate next result
        </button>
      </ExampleCard>

      <ExampleCard
        title="Empty Deck"
        description="Edge case — an empty toasts array renders an empty, non-interactive container"
        code={`<StackedToastDeckView toasts={[]} onDismiss={() => {}} />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <StackedToastDeckView toasts={[]} onDismiss={() => {}} />
          <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>No active notifications</span>
        </div>
      </ExampleCard>
    </div>
  );
}
