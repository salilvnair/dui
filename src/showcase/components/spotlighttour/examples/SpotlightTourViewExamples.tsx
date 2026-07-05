import { useState } from 'react';
import { SpotlightTourView, ButtonView } from '@/dui';
import type { SpotlightTourStep } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function SpotlightTourViewExamples() {
  const [open1, setOpen1] = useState(false);
  const [step1, setStep1] = useState(0);
  const steps1: SpotlightTourStep[] = [
    { target: '#dui-tour-send-1', title: 'Send requests', content: 'Build and fire HTTP requests from here.' },
  ];

  const [open2, setOpen2] = useState(false);
  const [step2, setStep2] = useState(0);
  const steps2: SpotlightTourStep[] = [
    { target: '#dui-tour-collections-2', title: 'Save to collections', content: 'Organize requests into folders for your team.' },
    { target: '#dui-tour-env-2', title: 'Switch environments', content: 'Swap between Production, Staging, and Local without editing URLs.' },
    { target: '#dui-tour-send-2', title: 'Send requests', content: 'Build and fire HTTP requests from here.' },
  ];

  const [open3, setOpen3] = useState(false);
  const [step3, setStep3] = useState(0);
  const steps3: SpotlightTourStep[] = [
    { target: '#dui-tour-color-3', title: 'Themed accent', content: 'The tour highlight and dots pick up your custom accent color.' },
    { target: '#dui-tour-send-3', title: 'Send requests', content: 'Build and fire HTTP requests from here.' },
  ];

  return (
    <div>
      <ExampleCard
        title="Single-Step Tour"
        description="Coach-mark onboarding — spotlight cutout around a target selector plus a step tooltip"
        code={`function Preview() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const steps = [{ target: '#send-btn', title: 'Send requests', content: 'Build and fire HTTP requests from here.' }];
  return (
    <>
      <ButtonView id="send-btn" onClick={() => setOpen(true)}>Send</ButtonView>
      <SpotlightTourView
        open={open}
        steps={steps}
        stepIndex={step}
        onNext={() => setStep(s => s + 1)}
        onPrev={() => setStep(s => s - 1)}
        onClose={() => setOpen(false)}
      />
    </>
  );
}`}
      >
        <ButtonView id="dui-tour-send-1" onClick={() => { setStep1(0); setOpen1(true); }}>Start tour</ButtonView>
        <SpotlightTourView
          open={open1}
          steps={steps1}
          stepIndex={step1}
          onNext={() => setStep1(s => s + 1)}
          onPrev={() => setStep1(s => s - 1)}
          onClose={() => setOpen1(false)}
        />
      </ExampleCard>

      <ExampleCard
        title="Multi-Step Onboarding Tour (interactive)"
        description="A realistic 3-step first-run tour walking through collections, environments, and sending a request"
        code={`const steps = [
  { target: '#collections', title: 'Save to collections', content: 'Organize requests into folders for your team.' },
  { target: '#env-switcher', title: 'Switch environments', content: 'Swap between Production, Staging, and Local without editing URLs.' },
  { target: '#send-btn', title: 'Send requests', content: 'Build and fire HTTP requests from here.' },
];

<SpotlightTourView open={open} steps={steps} stepIndex={step} onNext={...} onPrev={...} onClose={...} />`}
      >
        <div style={{ display: 'flex', gap: 10 }}>
          <ButtonView id="dui-tour-collections-2" variant="ghost" onClick={() => { setStep2(0); setOpen2(true); }}>Collections</ButtonView>
          <ButtonView id="dui-tour-env-2" variant="ghost" onClick={() => { setStep2(0); setOpen2(true); }}>Production</ButtonView>
          <ButtonView id="dui-tour-send-2" onClick={() => { setStep2(0); setOpen2(true); }}>Send</ButtonView>
        </div>
        <SpotlightTourView
          open={open2}
          steps={steps2}
          stepIndex={step2}
          onNext={() => setStep2(s => s + 1)}
          onPrev={() => setStep2(s => s - 1)}
          onClose={() => setOpen2(false)}
        />
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="color tints both the spotlight ring and the progress dots"
        code={`<SpotlightTourView open={open} steps={steps} stepIndex={step} color="var(--color-success)" onNext={...} onPrev={...} onClose={...} />`}
      >
        <div style={{ display: 'flex', gap: 10 }}>
          <ButtonView id="dui-tour-color-3" variant="ghost" onClick={() => { setStep3(0); setOpen3(true); }}>Themed target</ButtonView>
          <ButtonView id="dui-tour-send-3" onClick={() => { setStep3(0); setOpen3(true); }}>Send</ButtonView>
        </div>
        <SpotlightTourView
          open={open3}
          steps={steps3}
          stepIndex={step3}
          color="var(--color-success)"
          onNext={() => setStep3(s => s + 1)}
          onPrev={() => setStep3(s => s - 1)}
          onClose={() => setOpen3(false)}
        />
      </ExampleCard>

      <ExampleCard
        title="Sizes"
        description="size controls tooltip typography and border radius"
        code={`<SpotlightTourView open={open} steps={steps} stepIndex={0} size="lg" onNext={...} onPrev={...} onClose={...} />`}
      >
        <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
          size accepts the standard DuiSize scale (xs–xxxl) and controls the tooltip's header/body font size and border radius — try it live via the props panel above.
        </div>
      </ExampleCard>

      <ExampleCard
        title="Missing Target (edge case)"
        description="If the target selector doesn't match any element, no spotlight cutout is drawn but the step tooltip still centers on screen"
        code={`<SpotlightTourView
  open={true}
  steps={[{ target: '#does-not-exist', title: 'Fallback', content: 'No element matched — tooltip centers itself.' }]}
  stepIndex={0}
  onNext={() => {}}
  onPrev={() => {}}
  onClose={() => {}}
/>`}
      >
        <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
          When target doesn't resolve to a DOM node, rect stays null — the cutout box is skipped and the tooltip falls back to a centered position, so the tour never crashes on a missing selector.
        </div>
      </ExampleCard>
    </div>
  );
}
