import { useState } from 'react';
import { RequestFlowView, ButtonView, type RequestFlowPhase } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const STANDARD_PHASES: RequestFlowPhase[] = [
  { id: 'dns', label: 'DNS', duration: 20, color: 'var(--color-primary)' },
  { id: 'tcp', label: 'TCP', duration: 40, color: 'var(--color-warning)' },
  { id: 'tls', label: 'TLS', duration: 60, color: 'var(--color-success)' },
  { id: 'req', label: 'Request', duration: 30, color: 'var(--color-primary)' },
  { id: 'res', label: 'Response', duration: 90, color: 'var(--color-error)' },
];

export function RequestFlowViewExamples() {
  const [phases, setPhases] = useState<RequestFlowPhase[]>(STANDARD_PHASES);

  const simulateSlowRequest = () => {
    setPhases([
      { id: 'dns', label: 'DNS', duration: 10, color: 'var(--color-primary)' },
      { id: 'tcp', label: 'TCP', duration: 30, color: 'var(--color-warning)' },
      { id: 'tls', label: 'TLS', duration: 45, color: 'var(--color-success)' },
      { id: 'req', label: 'Request', duration: 20, color: 'var(--color-primary)' },
      { id: 'res', label: 'Response', duration: 620, color: 'var(--color-error)' },
    ]);
  };

  return (
    <div>
      <ExampleCard
        title="Standard Request Waterfall"
        description="DNS → TCP → TLS → Request → Response, particle speed mapped to each phase's duration"
        code={`<RequestFlowView phases={[
  { id: 'dns', label: 'DNS', duration: 20, color: 'var(--color-primary)' },
  { id: 'tcp', label: 'TCP', duration: 40, color: 'var(--color-warning)' },
  { id: 'tls', label: 'TLS', duration: 60, color: 'var(--color-success)' },
  { id: 'req', label: 'Request', duration: 30, color: 'var(--color-primary)' },
  { id: 'res', label: 'Response', duration: 90, color: 'var(--color-error)' },
]} />`}
      >
        <RequestFlowView phases={STANDARD_PHASES} />
      </ExampleCard>

      <ExampleCard
        title="Live Request Simulation (interactive)"
        description="Swap phase data to simulate a slow backend response — the response segment dominates"
        code={`const [phases, setPhases] = useState(standardPhases);

<RequestFlowView phases={phases} />
<ButtonView onClick={() => setPhases(slowResponsePhases)}>Simulate slow response</ButtonView>`}
      >
        <RequestFlowView phases={phases} />
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          <ButtonView size="sm" onClick={simulateSlowRequest}>Simulate slow response</ButtonView>
          <ButtonView size="sm" variant="ghost" onClick={() => setPhases(STANDARD_PHASES)}>Reset</ButtonView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Particle Count Variants"
        description="particleCount controls how many particles are in flight simultaneously"
        code={`<RequestFlowView phases={phases} particleCount={1} />
<RequestFlowView phases={phases} particleCount={6} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <RequestFlowView phases={STANDARD_PHASES} particleCount={1} width={400} />
          <RequestFlowView phases={STANDARD_PHASES} particleCount={6} width={400} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Cached Response (no network phases)"
        description="Edge case — a single short phase representing a cache hit, skipping DNS/TCP/TLS"
        code={`<RequestFlowView phases={[{ id: 'cache', label: 'Cache Hit', duration: 4, color: 'var(--color-success)' }]} width={300} />`}
      >
        <RequestFlowView phases={[{ id: 'cache', label: 'Cache Hit', duration: 4, color: 'var(--color-success)' }]} width={300} />
      </ExampleCard>

      <ExampleCard
        title="GraphQL Request Waterfall"
        description="Compact width variant for a request-detail side panel"
        code={`<RequestFlowView
  width={320}
  phases={[
    { id: 'tls', label: 'TLS', duration: 25, color: 'var(--color-success)' },
    { id: 'req', label: 'Query', duration: 15, color: 'var(--color-protocol-graphql)' },
    { id: 'res', label: 'Response', duration: 55, color: 'var(--color-protocol-graphql)' },
  ]}
/>`}
      >
        <RequestFlowView
          width={320}
          phases={[
            { id: 'tls', label: 'TLS', duration: 25, color: 'var(--color-success)' },
            { id: 'req', label: 'Query', duration: 15, color: 'var(--color-protocol-graphql)' },
            { id: 'res', label: 'Response', duration: 55, color: 'var(--color-protocol-graphql)' },
          ]}
        />
      </ExampleCard>
    </div>
  );
}
