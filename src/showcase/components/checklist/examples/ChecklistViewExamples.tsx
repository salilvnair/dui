import { useState } from 'react';
import { ChecklistView, type ChecklistItem } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ChecklistViewExamples() {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '1', label: 'Send first request', checked: false },
    { id: '2', label: 'Save a response example', checked: false },
    { id: '3', label: 'Create an environment', checked: false },
  ]);

  const toggle = (id: string) =>
    setItems(prev => prev.map(i => (i.id === id ? { ...i, checked: !i.checked } : i)));

  const [onboarding, setOnboarding] = useState<ChecklistItem[]>([
    { id: 'signup', label: 'Create your workspace', checked: true },
    { id: 'invite', label: 'Invite a teammate', checked: true },
    { id: 'collection', label: 'Create your first collection', checked: false },
    { id: 'request', label: 'Send your first request', checked: false },
    { id: 'env', label: 'Set up an environment', checked: false },
  ]);

  const [prLikeChecklist] = useState<ChecklistItem[]>([
    { id: 'a', label: 'All endpoints documented', checked: true },
    { id: 'b', label: 'Auth flow tested', checked: true },
    { id: 'c', label: 'Rate limits configured', checked: true },
  ]);

  const [emptyItems] = useState<ChecklistItem[]>([]);

  return (
    <div>
      <ExampleCard
        title="Basic Checklist"
        description="Todo-style checklist with strikethrough + fade on completion"
        code={`const [items, setItems] = useState([
  { id: '1', label: 'Send first request', checked: false },
]);

<ChecklistView
  items={items}
  onToggle={id => setItems(prev => prev.map(i => i.id === id ? { ...i, checked: !i.checked } : i))}
/>`}
      >
        <ChecklistView items={items} onToggle={toggle} />
      </ExampleCard>

      <ExampleCard
        title="Onboarding Checklist (interactive)"
        description="Getting-started checklist for a new Daakia workspace — click any item to toggle"
        code={`const [onboarding, setOnboarding] = useState([
  { id: 'signup', label: 'Create your workspace', checked: true },
  { id: 'invite', label: 'Invite a teammate', checked: true },
  { id: 'collection', label: 'Create your first collection', checked: false },
]);

<ChecklistView items={onboarding} onToggle={id => ...} accentColor="var(--color-success)" />`}
      >
        <ChecklistView
          items={onboarding}
          onToggle={id => setOnboarding(prev => prev.map(i => (i.id === id ? { ...i, checked: !i.checked } : i)))}
          accentColor="var(--color-success)"
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          {onboarding.filter(i => i.checked).length} of {onboarding.length} complete
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color + Size"
        description="accentColor tints the checkbox; size controls label font size"
        code={`<ChecklistView items={items} onToggle={() => {}} accentColor="var(--color-info)" size="sm" />`}
      >
        <ChecklistView items={items.slice(0, 2)} onToggle={() => {}} accentColor="var(--color-info)" size="sm" />
      </ExampleCard>

      <ExampleCard
        title="Release Readiness Checklist"
        description="Domain-realistic use — pre-publish checklist for an API collection, all items already complete"
        code={`<ChecklistView
  items={[
    { id: 'a', label: 'All endpoints documented', checked: true },
    { id: 'b', label: 'Auth flow tested', checked: true },
    { id: 'c', label: 'Rate limits configured', checked: true },
  ]}
  onToggle={() => {}}
/>`}
      >
        <ChecklistView items={prLikeChecklist} onToggle={() => {}} />
      </ExampleCard>

      <ExampleCard
        title="Empty List (edge case)"
        description="No items to render"
        code={`<ChecklistView items={[]} onToggle={() => {}} />`}
      >
        <ChecklistView items={emptyItems} onToggle={() => {}} />
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No checklist items yet</div>
      </ExampleCard>
    </div>
  );
}
