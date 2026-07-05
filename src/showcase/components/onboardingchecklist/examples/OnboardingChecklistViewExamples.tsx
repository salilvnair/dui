import { useState } from 'react';
import { OnboardingChecklistView, type OnboardingStep } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function OnboardingChecklistViewExamples() {
  const [steps, setSteps] = useState<OnboardingStep[]>([
    { id: '1', label: 'Create workspace', done: true },
    { id: '2', label: 'Send first request', done: true },
    { id: '3', label: 'Invite a teammate', done: false },
    { id: '4', label: 'Set up an environment', done: false },
  ]);

  const toggleStep = (id: string) =>
    setSteps(prev => prev.map(s => (s.id === id ? { ...s, done: !s.done } : s)));

  return (
    <div>
      <ExampleCard
        title="Basic Checklist"
        description="Default title with a progress bar showing completed vs total steps"
        code={`<OnboardingChecklistView
  steps={[
    { id: '1', label: 'Create workspace', done: true },
    { id: '2', label: 'Send first request', done: false },
  ]}
/>`}
      >
        <div style={{ maxWidth: 320 }}>
          <OnboardingChecklistView
            steps={[
              { id: '1', label: 'Create workspace', done: true },
              { id: '2', label: 'Send first request', done: false },
            ]}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Interactive Steps (click to complete)"
        description="Each step can carry its own onClick, e.g. to toggle done state or deep-link to that task"
        code={`const [steps, setSteps] = useState(initialSteps);
const toggle = (id) => setSteps(prev => prev.map(s => s.id === id ? { ...s, done: !s.done } : s));

<OnboardingChecklistView
  title="Getting started"
  steps={steps.map(s => ({ ...s, onClick: () => toggle(s.id) }))}
/>`}
      >
        <div style={{ maxWidth: 320 }}>
          <OnboardingChecklistView
            title="Getting started"
            steps={steps.map(s => ({ ...s, onClick: () => toggleStep(s.id) }))}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Title & Accent Color"
        description="Override the default 'Getting started' title and tint the progress bar"
        code={`<OnboardingChecklistView
  title="Team setup checklist"
  color="var(--color-info)"
  steps={[
    { id: '1', label: 'Add billing details', done: true },
    { id: '2', label: 'Invite 3 teammates', done: false },
    { id: '3', label: 'Connect messaging integration', done: false },
  ]}
/>`}
      >
        <div style={{ maxWidth: 320 }}>
          <OnboardingChecklistView
            title="Team setup checklist"
            color="var(--color-info)"
            steps={[
              { id: '1', label: 'Add billing details', done: true },
              { id: '2', label: 'Invite 3 teammates', done: false },
              { id: '3', label: 'Connect messaging integration', done: false },
            ]}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Collapsed by Default"
        description="defaultExpanded=false starts the checklist collapsed — useful for a persistent sidebar widget"
        code={`<OnboardingChecklistView
  title="Setup (3/5)"
  defaultExpanded={false}
  steps={steps}
/>`}
      >
        <div style={{ maxWidth: 320 }}>
          <OnboardingChecklistView
            title="Setup"
            defaultExpanded={false}
            steps={[
              { id: '1', label: 'Create workspace', done: true },
              { id: '2', label: 'Send first request', done: true },
              { id: '3', label: 'Invite a teammate', done: true },
              { id: '4', label: 'Configure webhook', done: false },
              { id: '5', label: 'Enable 2FA', done: false },
            ]}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="All Complete (100%)"
        description="When every step is done, the progress bar fills completely"
        code={`<OnboardingChecklistView
  title="All done!"
  steps={[
    { id: '1', label: 'Create workspace', done: true },
    { id: '2', label: 'Send first request', done: true },
    { id: '3', label: 'Invite a teammate', done: true },
  ]}
/>`}
      >
        <div style={{ maxWidth: 320 }}>
          <OnboardingChecklistView
            title="All done!"
            steps={[
              { id: '1', label: 'Create workspace', done: true },
              { id: '2', label: 'Send first request', done: true },
              { id: '3', label: 'Invite a teammate', done: true },
            ]}
          />
        </div>
      </ExampleCard>
    </div>
  );
}
