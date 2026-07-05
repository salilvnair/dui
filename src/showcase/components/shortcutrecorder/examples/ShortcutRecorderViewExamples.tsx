import { useState } from 'react';
import { ShortcutRecorderView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

interface Binding {
  id: string;
  action: string;
  keys: string[];
}

export function ShortcutRecorderViewExamples() {
  const [keys, setKeys] = useState<string[]>(['⌘', 'K']);

  const [bindings, setBindings] = useState<Binding[]>([
    { id: 'send', action: 'Send request', keys: ['⌘', 'Enter'] },
    { id: 'save', action: 'Save request', keys: ['⌘', 'S'] },
    { id: 'new', action: 'New request', keys: ['⌘', 'Shift', 'N'] },
  ]);

  const updateBinding = (id: string, next: string[]) =>
    setBindings(prev => prev.map(b => (b.id === id ? { ...b, keys: next } : b)));

  const [emptyKeys, setEmptyKeys] = useState<string[]>([]);
  const [disabledKeys] = useState<string[]>(['⌘', 'P']);

  return (
    <div>
      <ExampleCard
        title="Basic Shortcut Recorder"
        description="Click to start recording, press a key combo, it commits automatically"
        code={`const [keys, setKeys] = useState(['⌘', 'K']);

<ShortcutRecorderView value={keys} onChange={setKeys} />`}
      >
        <ShortcutRecorderView value={keys} onChange={setKeys} />
      </ExampleCard>

      <ExampleCard
        title="Keybinding Settings Panel (interactive)"
        description="A real settings-style list where each action has its own independently rebindable shortcut"
        code={`const [bindings, setBindings] = useState([
  { id: 'send', action: 'Send request', keys: ['⌘', 'Enter'] },
  { id: 'save', action: 'Save request', keys: ['⌘', 'S'] },
]);

<ShortcutRecorderView
  value={binding.keys}
  onChange={next => updateBinding(binding.id, next)}
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {bindings.map(b => (
            <div key={b.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span style={{ fontSize: 12.5, color: 'var(--color-text-primary)' }}>{b.action}</span>
              <ShortcutRecorderView value={b.keys} onChange={next => updateBinding(b.id, next)} style={{ width: 140 }} />
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent + Border Radius"
        description="color highlights the border while recording; borderRadius controls corner rounding"
        code={`<ShortcutRecorderView value={['⌘', 'F']} onChange={() => {}} color="var(--color-success)" borderRadius="lg" />`}
      >
        <ShortcutRecorderView value={['⌘', 'F']} onChange={() => {}} color="var(--color-success)" borderRadius="lg" />
      </ExampleCard>

      <ExampleCard
        title="Empty / Unset Shortcut (edge case)"
        description="No keys recorded yet — shows the placeholder text until the user records a combo"
        code={`const [keys, setKeys] = useState<string[]>([]);

<ShortcutRecorderView value={keys} onChange={setKeys} placeholder="No shortcut set — click to record" />`}
      >
        <ShortcutRecorderView value={emptyKeys} onChange={setEmptyKeys} placeholder="No shortcut set — click to record" />
      </ExampleCard>

      <ExampleCard
        title="Disabled State"
        description="disabled locks the recorder — e.g. for a shortcut reserved by the OS that can't be reassigned"
        code={`<ShortcutRecorderView value={['⌘', 'P']} onChange={() => {}} disabled />`}
      >
        <ShortcutRecorderView value={disabledKeys} onChange={() => {}} disabled />
      </ExampleCard>
    </div>
  );
}
