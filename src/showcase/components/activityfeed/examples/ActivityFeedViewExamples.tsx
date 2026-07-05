import { ActivityFeedView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ActivityFeedViewExamples() {
  const todayIso = '2026-07-03';
  const yesterdayIso = '2026-07-02';
  const olderIso = '2026-06-28';

  const teamActivity = [
    { id: '1', actor: 'Jordan Lee', action: 'deployed Users API', timestamp: '9:14 AM', day: todayIso },
    { id: '2', actor: 'Priya Nair', action: 'added a new environment variable', timestamp: '9:02 AM', day: todayIso },
    { id: '3', actor: 'Sam Torres', action: 'ran the checkout collection (18/18 passed)', timestamp: '5:40 PM', day: yesterdayIso },
    { id: '4', actor: 'Priya Nair', action: 'invited teammate to workspace "Payments"', timestamp: '11:20 AM', day: yesterdayIso },
    { id: '5', actor: 'Jordan Lee', action: 'created collection "Webhooks v2"', timestamp: '3:05 PM', day: olderIso },
  ];

  return (
    <div>
      <ExampleCard
        title="Default Feed"
        description="Entries grouped and headed by day automatically"
        code={`<ActivityFeedView entries={[{ id: '1', actor: 'Jordan Lee', action: 'deployed Users API', timestamp: '9:14 AM', day: '2026-07-02' }]} />`}
      >
        <ActivityFeedView entries={[{ id: '1', actor: 'Jordan Lee', action: 'deployed Users API', timestamp: '9:14 AM', day: '2026-07-02' }]} />
      </ExampleCard>

      <ExampleCard
        title="Team Workspace Activity (domain use case)"
        description="Multi-day feed of teammate actions across a shared workspace — mirrors a shared workspace activity log"
        code={`<ActivityFeedView
  entries={[
    { id: '1', actor: 'Jordan Lee', action: 'deployed Users API', timestamp: '9:14 AM', day: '2026-07-03' },
    { id: '2', actor: 'Priya Nair', action: 'added a new environment variable', timestamp: '9:02 AM', day: '2026-07-03' },
    { id: '3', actor: 'Sam Torres', action: 'ran the checkout collection (18/18 passed)', timestamp: '5:40 PM', day: '2026-07-02' },
  ]}
/>`}
      >
        <ActivityFeedView entries={teamActivity} />
      </ExampleCard>

      <ExampleCard
        title="Custom Avatars"
        description="Pass an avatar node per entry instead of the default placeholder circle"
        code={`<ActivityFeedView
  entries={[{
    id: '1', actor: 'Priya Nair', action: 'merged environment "staging" into "production"',
    timestamp: '2:00 PM', day: '2026-07-03',
    avatar: <img src="https://i.pravatar.cc/48?u=priya" style={{ width: 24, height: 24, borderRadius: '999px' }} />,
  }]}
/>`}
      >
        <ActivityFeedView
          entries={[{
            id: '1', actor: 'Priya Nair', action: 'merged environment "staging" into "production"',
            timestamp: '2:00 PM', day: '2026-07-03',
            avatar: <img src="https://i.pravatar.cc/48?u=priya" alt="Priya Nair" style={{ width: 24, height: 24, borderRadius: '999px' }} />,
          }]}
        />
      </ExampleCard>

      <ExampleCard
        title="Compact Size"
        description="Use size='sm' for a dense sidebar activity widget"
        code={`<ActivityFeedView entries={teamActivity} size="sm" />`}
      >
        <ActivityFeedView entries={teamActivity.slice(0, 3)} size="sm" />
      </ExampleCard>

      <ExampleCard
        title="Empty State"
        description="No entries — renders nothing; pair with a fallback message"
        code={`<ActivityFeedView entries={[]} />
{entries.length === 0 && <p>No recent activity in this workspace.</p>}`}
      >
        <ActivityFeedView entries={[]} />
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No recent activity in this workspace.</div>
      </ExampleCard>
    </div>
  );
}
