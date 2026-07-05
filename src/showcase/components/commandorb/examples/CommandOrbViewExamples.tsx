import { useState } from 'react';
import { CommandOrbView, type CommandOrbState } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function CommandOrbViewExamples() {
  const [state, setState] = useState<CommandOrbState>('idle');
  const [panelState, setPanelState] = useState<CommandOrbState>('open');

  return (
    <div>
      <ExampleCard
        title="Idle Orb"
        description="Default resting state — gentle breathing pulse"
        code={`<CommandOrbView state="idle" onClick={() => {}} />`}
      >
        <CommandOrbView state="idle" onClick={() => {}} />
      </ExampleCard>

      <ExampleCard
        title="Click to Cycle States (interactive)"
        description="Click the orb to step through idle → thinking → speaking → idle"
        code={`const [state, setState] = useState<CommandOrbState>('idle');

<CommandOrbView
  state={state}
  onClick={() => setState(s => s === 'idle' ? 'thinking' : s === 'thinking' ? 'speaking' : 'idle')}
/>`}
      >
        <CommandOrbView
          state={state}
          onClick={() => setState(s => (s === 'idle' ? 'thinking' : s === 'thinking' ? 'speaking' : 'idle'))}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>State: {state}</div>
      </ExampleCard>

      <ExampleCard
        title="Expanded Chat Panel"
        description="state='open' renders the panel prop below the orb — a mini assistant chat"
        code={`<CommandOrbView
  state="open"
  onClick={() => setPanelState('idle')}
  panel={
    <div>
      <div style={{ fontWeight: 600, fontSize: 12 }}>Ask Daakia AI</div>
      <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>
        "Why did my last request return a 429?"
      </div>
    </div>
  }
/>`}
      >
        <CommandOrbView
          state={panelState}
          onClick={() => setPanelState(s => (s === 'open' ? 'idle' : 'open'))}
          panel={
            <div>
              <div style={{ fontWeight: 600, fontSize: 12 }}>Ask Daakia AI</div>
              <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>
                "Why did my last request return a 429?"
              </div>
            </div>
          }
        />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm / lg / xl orb sizes for different placements"
        code={`<CommandOrbView state="idle" size="sm" onClick={() => {}} />
<CommandOrbView state="idle" size="lg" onClick={() => {}} />
<CommandOrbView state="idle" size="xl" onClick={() => {}} />`}
      >
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <CommandOrbView state="idle" size="sm" onClick={() => {}} />
          <CommandOrbView state="idle" size="lg" onClick={() => {}} />
          <CommandOrbView state="idle" size="xl" onClick={() => {}} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="Team-branded orb color, e.g. matching a workspace theme"
        code={`<CommandOrbView state="speaking" color="var(--color-protocol-graphql)" onClick={() => {}} />`}
      >
        <CommandOrbView state="speaking" color="var(--color-protocol-graphql)" onClick={() => {}} />
      </ExampleCard>
    </div>
  );
}
