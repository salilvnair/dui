import { useRef } from 'react';
import { ConfettiBurstView, ButtonView } from '@/dui';
import type { ConfettiBurstHandle } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ConfettiBurstViewExamples() {
  const defaultRef = useRef<ConfettiBurstHandle>(null);
  const collectionRef = useRef<ConfettiBurstHandle>(null);
  const originRef = useRef<ConfettiBurstHandle>(null);
  const customRef = useRef<ConfettiBurstHandle>(null);
  const denseRef = useRef<ConfettiBurstHandle>(null);

  return (
    <div>
      <ExampleCard
        title="Basic Fire"
        description="Fire a burst from a button click — origin defaults to viewport center"
        code={`function Preview() {
  const ref = useRef(null);
  return (
    <>
      <ButtonView onClick={() => ref.current.fire()}>Celebrate</ButtonView>
      <ConfettiBurstView ref={ref} />
    </>
  );
}`}
      >
        <ButtonView onClick={() => defaultRef.current?.fire()}>Celebrate</ButtonView>
        <ConfettiBurstView ref={defaultRef} />
      </ExampleCard>

      <ExampleCard
        title="Collection Run Passed (interactive)"
        description="Trigger celebration confetti when all requests in a collection run pass"
        code={`function Preview() {
  const ref = useRef(null);
  return (
    <>
      <ButtonView onClick={() => ref.current.fire()} color="var(--color-success)">
        Run Collection: 24/24 passed
      </ButtonView>
      <ConfettiBurstView ref={ref} colors={['#22C55E', '#6366F1', '#F59E0B']} />
    </>
  );
}`}
      >
        <ButtonView onClick={() => collectionRef.current?.fire()} color="var(--color-success)">
          Run Collection: 24/24 passed
        </ButtonView>
        <ConfettiBurstView ref={collectionRef} colors={['#22C55E', '#6366F1', '#F59E0B']} />
      </ExampleCard>

      <ExampleCard
        title="Fire from Click Origin"
        description="Pass the click event's coordinates so confetti bursts from the button itself, not viewport center"
        code={`<ButtonView
  onClick={(e) => {
    const r = e.currentTarget.getBoundingClientRect();
    ref.current.fire({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  }}
>
  Burst from here
</ButtonView>
<ConfettiBurstView ref={ref} />`}
      >
        <ButtonView
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            const r = e.currentTarget.getBoundingClientRect();
            originRef.current?.fire({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
          }}
        >
          Burst from here
        </ButtonView>
        <ConfettiBurstView ref={originRef} />
      </ExampleCard>

      <ExampleCard
        title="Custom Colors"
        description="Override the palette to match a brand or a specific celebratory theme"
        code={`<ConfettiBurstView ref={ref} colors={['#ec4899', '#a855f7', '#14b8a6']} />`}
      >
        <ButtonView onClick={() => customRef.current?.fire()} variant="ghost">Fire custom palette</ButtonView>
        <ConfettiBurstView ref={customRef} colors={['#ec4899', '#a855f7', '#14b8a6']} />
      </ExampleCard>

      <ExampleCard
        title="Dense Burst (particleCount)"
        description="Increase particleCount for a bigger, denser celebration — e.g. hitting a milestone"
        code={`<ConfettiBurstView ref={ref} particleCount={200} />`}
      >
        <ButtonView onClick={() => denseRef.current?.fire()} variant="ghost">1000th request sent</ButtonView>
        <ConfettiBurstView ref={denseRef} particleCount={200} />
      </ExampleCard>
    </div>
  );
}
