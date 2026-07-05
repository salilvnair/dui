import { useState } from 'react';
import { StackedSwipeCardView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

interface PendingRequest {
  id: string;
  method: string;
  path: string;
}

const INITIAL_REQUESTS: PendingRequest[] = [
  { id: 'r1', method: 'POST', path: '/api/users' },
  { id: 'r2', method: 'DELETE', path: '/api/sessions/9931' },
  { id: 'r3', method: 'PATCH', path: '/api/orgs/42/roles' },
];

export function StackedSwipeCardViewExamples() {
  const [items, setItems] = useState(['Request #1', 'Request #2', 'Request #3']);
  const [decisions, setDecisions] = useState<string[]>([]);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [approved, setApproved] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);

  return (
    <div>
      <ExampleCard
        title="Basic Approve/Reject Stack"
        description="Common default use — one-at-a-time swipe deck of plain string items"
        code={`const [items, setItems] = useState(['Request #1', 'Request #2', 'Request #3']);

<StackedSwipeCardView
  items={items}
  renderItem={item => <div>{item}</div>}
  onSwipe={item => setItems(prev => prev.filter(i => i !== item))}
/>`}
      >
        <StackedSwipeCardView
          items={items}
          renderItem={item => <div style={{ fontWeight: 600 }}>{item}</div>}
          onSwipe={item => setItems(prev => prev.filter(i => i !== item))}
        />
        {items.length === 0 && <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>All reviewed.</div>}
      </ExampleCard>

      <ExampleCard
        title="Interactive Direction Tracking"
        description="Stateful example — records left vs right swipe direction into a decision log"
        code={`const [decisions, setDecisions] = useState<string[]>([]);

<StackedSwipeCardView
  items={['Cache invalidation', 'Rate limit bump', 'New webhook secret']}
  renderItem={item => <div>{item}</div>}
  onSwipe={(item, direction) =>
    setDecisions(d => [\`\${item}: \${direction === 'right' ? 'approved' : 'rejected'}\`, ...d])
  }
/>`}
      >
        <StackedSwipeCardView
          items={['Cache invalidation', 'Rate limit bump', 'New webhook secret'].filter(i => !decisions.some(d => d.startsWith(i)))}
          renderItem={item => <div style={{ fontWeight: 600 }}>{item}</div>}
          onSwipe={(item, direction) =>
            setDecisions(d => [`${item}: ${direction === 'right' ? 'approved' : 'rejected'}`, ...d])
          }
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          {decisions.length === 0 ? 'Swipe left (reject) or right (approve)' : decisions.map((d, i) => <div key={i}>{d}</div>)}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Card Dimensions"
        description="Size the stack for a compact review widget embedded in a sidebar"
        code={`<StackedSwipeCardView
  items={['Draft #A', 'Draft #B']}
  renderItem={item => <div style={{ fontSize: 12 }}>{item}</div>}
  onSwipe={() => {}}
  width={200}
  height={120}
/>`}
      >
        <StackedSwipeCardView
          items={['Draft #A', 'Draft #B']}
          renderItem={item => <div style={{ fontSize: 12 }}>{item}</div>}
          onSwipe={() => {}}
          width={200}
          height={120}
        />
      </ExampleCard>

      <ExampleCard
        title="Pending Request Approval Queue"
        description="API-testing domain use case — reviewer swipes through queued mutation requests for a shared environment"
        code={`const [requests, setRequests] = useState(pendingRequests);

<StackedSwipeCardView
  items={requests}
  renderItem={r => (
    <div>
      <span style={{ fontWeight: 700 }}>{r.method}</span> {r.path}
    </div>
  )}
  onSwipe={(r, direction) => {
    setRequests(prev => prev.filter(x => x.id !== r.id));
    direction === 'right' ? approve(r.id) : reject(r.id);
  }}
/>`}
      >
        <StackedSwipeCardView
          items={requests}
          renderItem={r => (
            <div>
              <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{r.method}</span>{' '}
              <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{r.path}</span>
            </div>
          )}
          onSwipe={(r, direction) => {
            setRequests(prev => prev.filter(x => x.id !== r.id));
            if (direction === 'right') setApproved(a => [...a, r.id]);
            else setRejected(a => [...a, r.id]);
          }}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Approved: {approved.length} · Rejected: {rejected.length}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Empty State"
        description="Edge case — an empty items array renders nothing (no placeholder card)"
        code={`<StackedSwipeCardView
  items={[]}
  renderItem={item => <div>{item}</div>}
  onSwipe={() => {}}
/>`}
      >
        <div style={{ width: 280, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--color-surface-border)', borderRadius: 8 }}>
          <StackedSwipeCardView items={[]} renderItem={item => <div>{item}</div>} onSwipe={() => {}} height={60} />
          <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Queue empty — nothing to review</span>
        </div>
      </ExampleCard>
    </div>
  );
}
