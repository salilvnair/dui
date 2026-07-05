import { useState, useEffect } from 'react';
import { KbdView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function KbdViewExamples() {
  const [pressed, setPressed] = useState<string[]>([]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toUpperCase() : e.key;
      setPressed(prev => (prev.includes(key) ? prev : [...prev, key]).slice(-3));
    };
    const up = () => setPressed([]);
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  return (
    <div>
      <ExampleCard
        title="Command Palette Shortcut"
        description="Composed multi-key hint chip"
        code={`<KbdView keys={['⌘', 'K']} />`}
      >
        <KbdView keys={['⌘', 'K']} />
      </ExampleCard>

      <ExampleCard
        title="Live Key Capture (interactive)"
        description="Press any keys on your keyboard — the last few pressed render as a KbdView combo"
        code={`const [pressed, setPressed] = useState<string[]>([]);
// on keydown: setPressed(prev => [...prev, key].slice(-3))

<KbdView keys={pressed.length ? pressed : ['—']} />`}
      >
        <KbdView keys={pressed.length ? pressed : ['—']} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Try pressing keys on your keyboard while this card is visible
        </div>
      </ExampleCard>

      <ExampleCard
        title="Common Shortcut Reference"
        description="A settings panel listing hotkeys — a very typical real usage in an API client"
        code={`<KbdView keys={['⌘', 'Enter']} />  Send request
<KbdView keys={['⌘', 'S']} />      Save
<KbdView keys={['⌘', 'Shift', 'N']} /> New request
<KbdView keys={['Esc']} />         Cancel`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { keys: ['⌘', 'Enter'], label: 'Send request' },
            { keys: ['⌘', 'S'], label: 'Save' },
            { keys: ['⌘', 'Shift', 'N'], label: 'New request' },
            { keys: ['Esc'], label: 'Cancel' },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 220 }}>
              <span style={{ fontSize: 12.5, color: 'var(--color-text-secondary)' }}>{row.label}</span>
              <KbdView keys={row.keys} size="sm" />
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Single Key + Sizes"
        description="A single key renders as one kbd chip; size scales height/font"
        code={`<KbdView keys="Esc" size="sm" />
<KbdView keys="Esc" size="md" />
<KbdView keys="Esc" size="lg" />`}
      >
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <KbdView keys="Esc" size="sm" />
          <KbdView keys="Esc" size="md" />
          <KbdView keys="Esc" size="lg" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="color tints the key text; useful for highlighting a destructive or primary action shortcut"
        code={`<KbdView keys={['⌘', 'Backspace']} color="var(--color-error)" />
<KbdView keys={['⌘', 'Enter']} color="var(--color-success)" />`}
      >
        <div style={{ display: 'flex', gap: 10 }}>
          <KbdView keys={['⌘', 'Backspace']} color="var(--color-error)" />
          <KbdView keys={['⌘', 'Enter']} color="var(--color-success)" />
        </div>
      </ExampleCard>
    </div>
  );
}
