import { useState } from 'react';
import { PriorityPickerView, type PriorityLevel } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

interface Ticket {
  id: string;
  title: string;
  priority: PriorityLevel;
}

export function PriorityPickerViewExamples() {
  const [priority, setPriority] = useState<PriorityLevel>('high');

  const [tickets, setTickets] = useState<Ticket[]>([
    { id: 'BUG-142', title: 'Webhook retries not respecting backoff', priority: 'urgent' },
    { id: 'BUG-118', title: 'Environment switcher loses selection', priority: 'medium' },
    { id: 'FEAT-88', title: 'Add gRPC reflection support', priority: 'low' },
  ]);

  const [disabledPriority] = useState<PriorityLevel>('medium');

  return (
    <div>
      <ExampleCard
        title="Basic Priority Picker"
        description="Controlled single-select of low/medium/high/urgent"
        code={`const [priority, setPriority] = useState('high');

<PriorityPickerView value={priority} onChange={setPriority} />`}
      >
        <PriorityPickerView value={priority} onChange={setPriority} />
      </ExampleCard>

      <ExampleCard
        title="Bug Tracker Ticket List (interactive)"
        description="Change priority inline on each ticket row — an issue-tracker bug/feature backlog"
        code={`const [tickets, setTickets] = useState([
  { id: 'BUG-142', title: 'Webhook retries not respecting backoff', priority: 'urgent' },
]);

<PriorityPickerView
  value={ticket.priority}
  onChange={p => setTickets(prev => prev.map(t => t.id === ticket.id ? { ...t, priority: p } : t))}
  size="sm"
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {tickets.map(ticket => (
            <div key={ticket.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ fontSize: 12.5 }}>
                <span style={{ color: 'var(--color-text-muted)', marginRight: 6 }}>{ticket.id}</span>
                <span style={{ color: 'var(--color-text-primary)' }}>{ticket.title}</span>
              </div>
              <PriorityPickerView
                value={ticket.priority}
                size="sm"
                onChange={p => setTickets(prev => prev.map(t => (t.id === ticket.id ? { ...t, priority: p } : t)))}
              />
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="All Priority Levels"
        description="Static display of each of the four levels selected, showing the full color range"
        code={`<PriorityPickerView value="low" onChange={() => {}} />
<PriorityPickerView value="medium" onChange={() => {}} />
<PriorityPickerView value="high" onChange={() => {}} />
<PriorityPickerView value="urgent" onChange={() => {}} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <PriorityPickerView value="low" onChange={() => {}} />
          <PriorityPickerView value="medium" onChange={() => {}} />
          <PriorityPickerView value="high" onChange={() => {}} />
          <PriorityPickerView value="urgent" onChange={() => {}} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Incident Severity Selector"
        description="Domain-realistic use — setting the severity of a monitored endpoint incident"
        code={`const [severity, setSeverity] = useState('urgent');

<PriorityPickerView value={severity} onChange={setSeverity} size="md" />`}
      >
        <PriorityPickerView value="urgent" onChange={() => {}} size="md" />
      </ExampleCard>

      <ExampleCard
        title="Disabled State"
        description="disabled locks the picker — useful when a ticket is closed/read-only"
        code={`<PriorityPickerView value="medium" onChange={() => {}} disabled />`}
      >
        <PriorityPickerView value={disabledPriority} onChange={() => {}} disabled />
      </ExampleCard>
    </div>
  );
}
