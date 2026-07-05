import { useState } from 'react';
import { WizardStepperView, type WizardStep } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const apiSetupSteps: WizardStep[] = [
  { id: 'connect', label: 'Connect', description: 'Choose data source' },
  { id: 'auth', label: 'Authenticate', description: 'Add credentials' },
  { id: 'map', label: 'Map Fields', description: 'Match schema' },
  { id: 'review', label: 'Review', description: 'Confirm & save' },
];

export function WizardStepperViewExamples() {
  const [active, setActive] = useState('auth');
  const [wizardActive, setWizardActive] = useState('connect');
  const [completed, setCompleted] = useState<string[]>([]);

  const goNext = () => {
    const idx = apiSetupSteps.findIndex(s => s.id === wizardActive);
    if (idx < 0) return;
    setCompleted(prev => [...prev, wizardActive]);
    const next = apiSetupSteps[idx + 1];
    if (next) setWizardActive(next.id);
  };

  return (
    <div>
      <ExampleCard
        title="Basic Stepper"
        description="Static active step, no click navigation"
        code={`const steps = [
  { id: 'connect', label: 'Connect' },
  { id: 'auth', label: 'Authenticate' },
];

<WizardStepperView steps={steps} activeStep="auth" />`}
      >
        <WizardStepperView
          steps={[{ id: 'connect', label: 'Connect' }, { id: 'auth', label: 'Authenticate' }]}
          activeStep={active}
        />
      </ExampleCard>

      <ExampleCard
        title="Full Setup Wizard (interactive)"
        description="4-step API connection wizard — Next advances and marks the previous step complete"
        code={`const [active, setActive] = useState('connect');
const [completed, setCompleted] = useState<string[]>([]);

<WizardStepperView
  steps={apiSetupSteps}
  activeStep={active}
  completedSteps={completed}
  onStepClick={setActive}
/>
<button onClick={goNext}>Next</button>`}
      >
        <WizardStepperView
          steps={apiSetupSteps}
          activeStep={wizardActive}
          completedSteps={completed}
          onStepClick={id => (completed.includes(id) || apiSetupSteps.findIndex(s => s.id === id) <= apiSetupSteps.findIndex(s => s.id === wizardActive)) && setWizardActive(id)}
        />
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={goNext}
            disabled={wizardActive === 'review'}
            style={{ fontSize: 12, padding: '5px 12px', borderRadius: 6, border: 'none', background: 'var(--color-primary)', color: '#fff', cursor: wizardActive === 'review' ? 'not-allowed' : 'pointer', opacity: wizardActive === 'review' ? 0.5 : 1 }}
          >
            Next
          </button>
          <button
            type="button"
            onClick={() => { setWizardActive('connect'); setCompleted([]); }}
            style={{ fontSize: 12, padding: '5px 12px', borderRadius: 6, border: '1px solid var(--color-surface-border)', background: 'transparent', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
          >
            Reset
          </button>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="color tints active/completed circles and connecting lines"
        code={`<WizardStepperView steps={steps} activeStep="map" completedSteps={['connect', 'auth']} color="var(--color-success)" />`}
      >
        <WizardStepperView
          steps={apiSetupSteps}
          activeStep="map"
          completedSteps={['connect', 'auth']}
          color="var(--color-success)"
        />
      </ExampleCard>

      <ExampleCard
        title="Environment Migration Steps"
        description="Domain-realistic use — migrating a collection from one environment to another"
        code={`<WizardStepperView
  steps={[
    { id: 'select', label: 'Select Collection' },
    { id: 'target', label: 'Choose Target Env' },
    { id: 'conflicts', label: 'Resolve Conflicts' },
    { id: 'confirm', label: 'Confirm' },
  ]}
  activeStep="conflicts"
  completedSteps={['select', 'target']}
/>`}
      >
        <WizardStepperView
          steps={[
            { id: 'select', label: 'Select Collection' },
            { id: 'target', label: 'Choose Target Env' },
            { id: 'conflicts', label: 'Resolve Conflicts' },
            { id: 'confirm', label: 'Confirm' },
          ]}
          activeStep="conflicts"
          completedSteps={['select', 'target']}
        />
      </ExampleCard>

      <ExampleCard
        title="First Step, Nothing Completed"
        description="Edge case — no steps completed yet and clicking ahead is disabled since onStepClick restricts navigation to completed or reachable steps"
        code={`<WizardStepperView steps={apiSetupSteps} activeStep="connect" completedSteps={[]} onStepClick={() => {}} />`}
      >
        <WizardStepperView steps={apiSetupSteps} activeStep="connect" completedSteps={[]} onStepClick={() => {}} />
      </ExampleCard>
    </div>
  );
}
