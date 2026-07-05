import { useState } from 'react';
import { KanbanBoardView, type KanbanColumn } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function KanbanBoardViewExamples() {
  const [basic, setBasic] = useState<KanbanColumn[]>([
    { id: 'todo', title: 'To Do', cards: [{ id: 'c1', title: 'Design auth flow' }] },
    { id: 'doing', title: 'In Progress', cards: [] },
    { id: 'done', title: 'Done', cards: [] },
  ]);

  const [apiTasks, setApiTasks] = useState<KanbanColumn[]>([
    {
      id: 'backlog', title: 'Backlog', color: 'var(--color-text-muted)',
      cards: [
        { id: 't1', title: 'Add rate limiting to /v2/orders' },
        { id: 't2', title: 'Document webhook retry policy' },
      ],
    },
    {
      id: 'inreview', title: 'In Review', color: 'var(--color-warning)',
      cards: [
        { id: 't3', title: 'GraphQL schema for Payments', content: 'Awaiting review from Priya' },
      ],
    },
    {
      id: 'shipped', title: 'Shipped', color: 'var(--color-success)',
      cards: [
        { id: 't4', title: 'OAuth2 refresh token rotation' },
      ],
    },
  ]);

  const [singleColumn, setSingleColumn] = useState<KanbanColumn[]>([
    { id: 'only', title: 'Untriaged Bugs', color: 'var(--color-error)', cards: [] },
  ]);

  return (
    <div>
      <ExampleCard
        title="Basic Board"
        description="Three columns, drag cards between them with native HTML5 drag-and-drop"
        code={`function Preview() {
  const [columns, setColumns] = useState([{ id: 'todo', title: 'To Do', cards: [{ id: 'c1', title: 'Design auth flow' }] }]);
  return <KanbanBoardView columns={columns} onChange={setColumns} />;
}`}
      >
        <KanbanBoardView columns={basic} onChange={setBasic} />
      </ExampleCard>

      <ExampleCard
        title="API Task Board with Column Colors (domain use case)"
        description="Track API development tasks across Backlog / In Review / Shipped, each column tinted by status"
        code={`<KanbanBoardView
  columns={[
    { id: 'backlog', title: 'Backlog', color: 'var(--color-text-muted)', cards: [{ id: 't1', title: 'Add rate limiting to /v2/orders' }] },
    { id: 'inreview', title: 'In Review', color: 'var(--color-warning)', cards: [{ id: 't3', title: 'GraphQL schema for Payments', content: 'Awaiting review from Priya' }] },
    { id: 'shipped', title: 'Shipped', color: 'var(--color-success)', cards: [{ id: 't4', title: 'OAuth2 refresh token rotation' }] },
  ]}
  onChange={setColumns}
/>`}
      >
        <KanbanBoardView columns={apiTasks} onChange={setApiTasks} />
      </ExampleCard>

      <ExampleCard
        title="Compact Size"
        description="Use size='sm' for a denser board inside a modal or side panel"
        code={`<KanbanBoardView columns={apiTasks} onChange={setColumns} size="sm" />`}
      >
        <KanbanBoardView columns={apiTasks} onChange={setApiTasks} size="sm" />
      </ExampleCard>

      <ExampleCard
        title="Card with Rich Content"
        description="Cards accept a content node for secondary metadata (assignee, due date, tags)"
        code={`{
  id: 't5',
  title: 'Investigate 502s on /v1/webhooks',
  content: <span style={{ color: 'var(--color-error)' }}>P1 · assigned to Sam</span>,
}`}
      >
        <KanbanBoardView
          columns={[
            {
              id: 'urgent', title: 'Urgent', color: 'var(--color-error)',
              cards: [{ id: 't5', title: 'Investigate 502s on /v1/webhooks', content: <span style={{ color: 'var(--color-error)' }}>P1 · assigned to Sam</span> }],
            },
          ]}
          onChange={() => {}}
        />
      </ExampleCard>

      <ExampleCard
        title="Empty Column (edge case)"
        description="A column with zero cards still renders its header and drop zone — drag a card in to populate it"
        code={`<KanbanBoardView columns={[{ id: 'only', title: 'Untriaged Bugs', color: 'var(--color-error)', cards: [] }]} onChange={setColumns} />`}
      >
        <KanbanBoardView columns={singleColumn} onChange={setSingleColumn} />
      </ExampleCard>
    </div>
  );
}
