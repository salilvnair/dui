import { TimelineView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function TimelineViewExamples() {
  const requestLifecycle = [
    { id: '1', title: 'Request sent', timestamp: '10:02:01 AM' },
    { id: '2', title: 'DNS resolved', timestamp: '10:02:01 AM' },
    { id: '3', title: 'TLS handshake complete', timestamp: '10:02:02 AM' },
    { id: '4', title: 'Response received (200 OK)', timestamp: '10:02:02 AM', color: 'var(--color-success)' },
  ];

  const deploymentSteps = [
    { id: '1', title: 'Build started', timestamp: 'Step 1' },
    { id: '2', title: 'Tests passed', timestamp: 'Step 2', color: 'var(--color-success)' },
    { id: '3', title: 'Deployed to staging', timestamp: 'Step 3', color: 'var(--color-info)' },
    { id: '4', title: 'Awaiting approval', timestamp: 'Step 4', color: 'var(--color-warning)' },
  ];

  return (
    <div>
      <ExampleCard
        title="Default Vertical Timeline"
        description="Basic vertical event trail"
        code={`<TimelineView entries={[{ id: '1', title: 'Request sent', timestamp: '10:02 AM' }]} />`}
      >
        <TimelineView entries={[{ id: '1', title: 'Request sent', timestamp: '10:02 AM' }]} />
      </ExampleCard>

      <ExampleCard
        title="Request Lifecycle (API-testing use case)"
        description="Track a request's low-level phases with per-entry colors for status"
        code={`<TimelineView
  entries={[
    { id: '1', title: 'Request sent', timestamp: '10:02:01 AM' },
    { id: '2', title: 'DNS resolved', timestamp: '10:02:01 AM' },
    { id: '3', title: 'TLS handshake complete', timestamp: '10:02:02 AM' },
    { id: '4', title: 'Response received (200 OK)', timestamp: '10:02:02 AM', color: 'var(--color-success)' },
  ]}
/>`}
      >
        <TimelineView entries={requestLifecycle} />
      </ExampleCard>

      <ExampleCard
        title="Horizontal Orientation"
        description="Deployment pipeline steps laid out left-to-right"
        code={`<TimelineView orientation="horizontal" entries={deploymentSteps} />`}
      >
        <TimelineView orientation="horizontal" entries={deploymentSteps} />
      </ExampleCard>

      <ExampleCard
        title="With Rich Content and Custom Icons"
        description="Each entry can carry an icon node and arbitrary content below the title"
        code={`<TimelineView
  entries={[
    {
      id: '1',
      icon: <span>✓</span>,
      title: 'Environment "Production" activated',
      timestamp: 'Just now',
      content: 'Switched by Jordan Lee — 12 variables loaded.',
      color: 'var(--color-success)',
    },
  ]}
/>`}
      >
        <TimelineView
          entries={[
            {
              id: '1',
              icon: <span style={{ fontSize: 11 }}>✓</span>,
              title: 'Environment "Production" activated',
              timestamp: 'Just now',
              content: 'Switched by Jordan Lee — 12 variables loaded.',
              color: 'var(--color-success)',
            },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Empty State"
        description="No entries yet — renders an empty container; pair with your own placeholder message"
        code={`<TimelineView entries={[]} />
{entries.length === 0 && <p>No activity recorded yet.</p>}`}
      >
        <TimelineView entries={[]} />
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No activity recorded yet.</div>
      </ExampleCard>
    </div>
  );
}
