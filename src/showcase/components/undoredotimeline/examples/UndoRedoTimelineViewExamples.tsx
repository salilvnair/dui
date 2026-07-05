import { useState } from 'react';
import { UndoRedoTimelineView, type UndoRedoNode } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const REQUEST_HISTORY: UndoRedoNode[] = [
  { id: 'a', label: 'Initial' },
  { id: 'b', label: 'Add header', parentId: 'a' },
  { id: 'c', label: 'Add auth', parentId: 'b' },
  { id: 'd', label: 'Revert header', parentId: 'a' },
];

const SCHEMA_HISTORY: UndoRedoNode[] = [
  { id: '1', label: 'Created User schema' },
  { id: '2', label: 'Added email field', parentId: '1' },
  { id: '3', label: 'Made email required', parentId: '2' },
  { id: '4', label: 'Branched: removed email', parentId: '2' },
  { id: '5', label: 'Added role enum', parentId: '3' },
];

export function UndoRedoTimelineViewExamples() {
  const [active, setActive] = useState('c');
  const [schemaActive, setSchemaActive] = useState('5');
  const [linearActive, setLinearActive] = useState('3');

  return (
    <div>
      <ExampleCard
        title="Branching Request Edit History (interactive)"
        description="Click any node to jump to it — diverging edits (from 'Initial') render as separate branches"
        code={`const nodes = [
  { id: 'a', label: 'Initial' },
  { id: 'b', label: 'Add header', parentId: 'a' },
  { id: 'c', label: 'Add auth', parentId: 'b' },
  { id: 'd', label: 'Revert header', parentId: 'a' },
];
const [active, setActive] = useState('c');

<UndoRedoTimelineView nodes={nodes} activeId={active} onSelect={setActive} />`}
      >
        <UndoRedoTimelineView nodes={REQUEST_HISTORY} activeId={active} onSelect={setActive} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>Active node: {active}</div>
      </ExampleCard>

      <ExampleCard
        title="Schema Edit Branch Tree"
        description="A longer branching history for a request body schema, with a custom accent color"
        code={`<UndoRedoTimelineView nodes={schemaHistory} activeId={active} onSelect={setActive} color="var(--color-protocol-graphql)" />`}
      >
        <UndoRedoTimelineView nodes={SCHEMA_HISTORY} activeId={schemaActive} onSelect={setSchemaActive} color="var(--color-protocol-graphql)" />
      </ExampleCard>

      <ExampleCard
        title="Linear History (no branches)"
        description="Every node has exactly one child — renders as a simple straight line, no indentation"
        code={`<UndoRedoTimelineView
  nodes={[
    { id: '1', label: 'Created collection' },
    { id: '2', label: 'Added GET /users', parentId: '1' },
    { id: '3', label: 'Added POST /users', parentId: '2' },
  ]}
  activeId="3"
  onSelect={() => {}}
/>`}
      >
        <UndoRedoTimelineView
          nodes={[
            { id: '1', label: 'Created collection' },
            { id: '2', label: 'Added GET /users', parentId: '1' },
            { id: '3', label: 'Added POST /users', parentId: '2' },
          ]}
          activeId={linearActive}
          onSelect={setLinearActive}
        />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm / md label sizing for compact vs spacious history panels"
        code={`<UndoRedoTimelineView nodes={nodes} activeId="a" onSelect={() => {}} size="sm" />
<UndoRedoTimelineView nodes={nodes} activeId="a" onSelect={() => {}} size="md" />`}
      >
        <div style={{ display: 'flex', gap: 24 }}>
          <UndoRedoTimelineView nodes={REQUEST_HISTORY} activeId="a" onSelect={() => {}} size="sm" />
          <UndoRedoTimelineView nodes={REQUEST_HISTORY} activeId="a" onSelect={() => {}} size="md" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Single Node (edge case)"
        description="Just the initial state — no history to branch from yet"
        code={`<UndoRedoTimelineView nodes={[{ id: 'root', label: 'New request created' }]} activeId="root" onSelect={() => {}} />`}
      >
        <UndoRedoTimelineView nodes={[{ id: 'root', label: 'New request created' }]} activeId="root" onSelect={() => {}} />
      </ExampleCard>
    </div>
  );
}
