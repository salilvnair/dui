import { useRef } from 'react';
import { ConnectionPulseLineView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ConnectionPulseLineViewExamples() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const containerRef2 = useRef<HTMLDivElement>(null);
  const authRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<HTMLDivElement>(null);

  const containerRef3 = useRef<HTMLDivElement>(null);
  const nodeARef = useRef<HTMLDivElement>(null);
  const nodeBRef = useRef<HTMLDivElement>(null);

  const containerRef4 = useRef<HTMLDivElement>(null);
  const webhookRef = useRef<HTMLDivElement>(null);
  const handlerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ExampleCard
        title="Basic Two-Box Connection"
        description="Common default use — a pulsing line linking two arbitrary DOM elements inside a positioned container"
        code={`const containerRef = useRef(null);
const fromRef = useRef(null);
const toRef = useRef(null);

<div ref={containerRef} style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', height: 60 }}>
  <div ref={fromRef} style={{ width: 60, height: 32, border: '1px solid var(--color-surface-border)', borderRadius: 6 }} />
  <div ref={toRef} style={{ width: 60, height: 32, border: '1px solid var(--color-surface-border)', borderRadius: 6 }} />
  <ConnectionPulseLineView containerRef={containerRef} from={fromRef} to={toRef} />
</div>`}
      >
        <div ref={containerRef} style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', height: 60 }}>
          <div ref={fromRef} style={{ width: 60, height: 32, border: '1px solid var(--color-surface-border)', borderRadius: 6 }} />
          <div ref={toRef} style={{ width: 60, height: 32, border: '1px solid var(--color-surface-border)', borderRadius: 6 }} />
          <ConnectionPulseLineView containerRef={containerRef} from={fromRef} to={toRef} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Auth Token Linked to Request"
        description="API-testing domain use case — visually links an environment's stored auth token to the request that consumes it"
        code={`<div ref={containerRef} style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', height: 60 }}>
  <div ref={authRef} style={{ width: 100, height: 32, border: '1px solid var(--color-info)', borderRadius: 6, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    Bearer token
  </div>
  <div ref={requestRef} style={{ width: 100, height: 32, border: '1px solid var(--color-info)', borderRadius: 6, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    GET /me
  </div>
  <ConnectionPulseLineView containerRef={containerRef} from={authRef} to={requestRef} color="var(--color-info)" />
</div>`}
      >
        <div ref={containerRef2} style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', height: 60 }}>
          <div ref={authRef} style={{ width: 100, height: 32, border: '1px solid var(--color-info)', borderRadius: 6, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Bearer token
          </div>
          <div ref={requestRef} style={{ width: 100, height: 32, border: '1px solid var(--color-info)', borderRadius: 6, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            GET /me
          </div>
          <ConnectionPulseLineView containerRef={containerRef2} from={authRef} to={requestRef} color="var(--color-info)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Vertically Offset Nodes"
        description="The connector works between elements at different vertical positions, not just a straight horizontal line"
        code={`<div ref={containerRef} style={{ position: 'relative', height: 100 }}>
  <div ref={nodeARef} style={{ position: 'absolute', top: 0, left: 0, width: 60, height: 28, border: '1px solid var(--color-success)', borderRadius: 6 }} />
  <div ref={nodeBRef} style={{ position: 'absolute', bottom: 0, right: 0, width: 60, height: 28, border: '1px solid var(--color-success)', borderRadius: 6 }} />
  <ConnectionPulseLineView containerRef={containerRef} from={nodeARef} to={nodeBRef} color="var(--color-success)" />
</div>`}
      >
        <div ref={containerRef3} style={{ position: 'relative', height: 100 }}>
          <div ref={nodeARef} style={{ position: 'absolute', top: 0, left: 0, width: 60, height: 28, border: '1px solid var(--color-success)', borderRadius: 6 }} />
          <div ref={nodeBRef} style={{ position: 'absolute', bottom: 0, right: 0, width: 60, height: 28, border: '1px solid var(--color-success)', borderRadius: 6 }} />
          <ConnectionPulseLineView containerRef={containerRef3} from={nodeARef} to={nodeBRef} color="var(--color-success)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Webhook Delivery to Handler"
        description="Highlighting the live data flow from an incoming webhook event to the collection that handles it"
        code={`<div ref={containerRef} style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', height: 60 }}>
  <div ref={webhookRef} style={{ width: 90, height: 32, border: '1px solid var(--color-warning)', borderRadius: 6, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    Webhook
  </div>
  <div ref={handlerRef} style={{ width: 90, height: 32, border: '1px solid var(--color-warning)', borderRadius: 6, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    Handler
  </div>
  <ConnectionPulseLineView containerRef={containerRef} from={webhookRef} to={handlerRef} color="var(--color-warning)" />
</div>`}
      >
        <div ref={containerRef4} style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', height: 60 }}>
          <div ref={webhookRef} style={{ width: 90, height: 32, border: '1px solid var(--color-warning)', borderRadius: 6, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Webhook
          </div>
          <div ref={handlerRef} style={{ width: 90, height: 32, border: '1px solid var(--color-warning)', borderRadius: 6, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Handler
          </div>
          <ConnectionPulseLineView containerRef={containerRef4} from={webhookRef} to={handlerRef} color="var(--color-warning)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Edge Case: Refs Not Yet Mounted"
        description="When containerRef/from/to elements aren't mounted yet, the component renders null instead of throwing"
        code={`function Preview() {
  const containerRef = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);
  // On first paint before refs attach, ConnectionPulseLineView returns null safely.
  return (
    <div ref={containerRef} style={{ position: 'relative', height: 40 }}>
      <ConnectionPulseLineView containerRef={containerRef} from={fromRef} to={toRef} />
    </div>
  );
}`}
      >
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
          Renders <code>null</code> until all three refs (container, from, to) resolve to mounted DOM elements — safe to render speculatively before content is ready.
        </div>
      </ExampleCard>
    </div>
  );
}
