import { StageCheck, StageSpin, StagePulse } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function StageViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Full Request Pipeline"
        description="Auth verified ✓ → Sending ⟳ → Parse queued ●"
        code={`<StageCheck label="Auth verified" sublabel="Bearer token valid" />\n<StageSpin label="Sending request…" sublabel="POST /api/users" />\n<StagePulse label="Awaiting parse" sublabel="In queue" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <StageCheck label="Auth verified" sublabel="Bearer token is valid" />
          <StageSpin label="Sending request…" sublabel="POST /api/users" />
          <StagePulse label="Awaiting response parse" sublabel="In queue" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="All Three States in a Labeled Row"
        description="Side-by-side comparison of Check / Spin / Pulse"
        code={`<StageCheck label="Done" />\n<StageSpin label="Active" />\n<StagePulse label="Pending" />`}
      >
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <StageCheck label="Done" sublabel="Completed" />
          <StageSpin label="Active" sublabel="In progress" />
          <StagePulse label="Pending" sublabel="Waiting" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="WebSocket Handshake Stages"
        description="Multi-step WebSocket connection flow"
        code={`<StageCheck label="TCP connected" />\n<StageCheck label="HTTP Upgrade sent" />\n<StageSpin label="Waiting for 101 Switching Protocols…" />\n<StagePulse label="Subscribe to channels" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <StageCheck label="TCP connected" sublabel="Port 443 open" color="var(--color-success)" />
          <StageCheck label="HTTP Upgrade sent" sublabel="Upgrade: websocket" color="var(--color-success)" />
          <StageSpin label="Waiting for 101 Switching Protocols…" color="var(--color-protocol-ws)" />
          <StagePulse label="Subscribe to channels" sublabel="Pending handshake" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Mock Server Startup Stages"
        description="Shows startup progress for the mock server"
        code={`<StageCheck label="Port scan complete" />\n<StageCheck label="Routes registered" />\n<StageSpin label="Starting HTTP listener…" />\n<StagePulse label="Ready to accept connections" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <StageCheck label="Port scan complete" sublabel=":4000 is free" />
          <StageCheck label="Routes registered" sublabel="12 endpoints loaded" />
          <StageSpin label="Starting HTTP listener…" color="var(--color-protocol-mock)" />
          <StagePulse label="Ready to accept connections" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Error Stage"
        description="StageCheck with red color signals a failed step"
        code={`<StageCheck label="Auth failed" sublabel="401 Unauthorized" color="var(--color-error)" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <StageCheck label="Request prepared" sublabel="Headers set" />
          <StageCheck label="Auth failed" sublabel="401 Unauthorized — check your token" color="var(--color-error)" />
          <StagePulse label="Retry pending" sublabel="Will retry in 3s" />
        </div>
      </ExampleCard>
    </div>
  );
}
