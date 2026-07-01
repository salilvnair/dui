import { StageCheck, StageSpin, StagePulse } from '@/dui';
import { Row } from '../../../shared/Row';

export function StageViewLive() {
  return (
    <div>
      <Row label="StageCheck — completed step" align="flex-start" code={`<StageCheck label="Request validated" sublabel="Headers, body, auth all passed" color="var(--color-success)" size={20} />\n<StageCheck label="Token refreshed" color="var(--color-success)" size={20} />\n<StageCheck label="Connection established" color="var(--color-info)" size={20} />`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          <StageCheck label="Request validated" sublabel="Headers, body, auth all passed" color="var(--color-success)" size={20} />
          <StageCheck label="Token refreshed" color="var(--color-success)" size={20} />
          <StageCheck label="Connection established" color="var(--color-info)" size={20} />
        </div>
      </Row>
      <Row label="StageSpin — in-progress step" align="flex-start" code={`<StageSpin label="Sending request…" sublabel="Awaiting server response" color="var(--color-primary)" size={20} />\n<StageSpin label="Refreshing schema" color="var(--color-protocol-graphql)" size={20} />\n<StageSpin label="Connecting to broker" color="var(--color-protocol-mqtt)" size={20} />`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          <StageSpin label="Sending request…" sublabel="Awaiting server response" color="var(--color-primary)" size={20} />
          <StageSpin label="Refreshing schema" color="var(--color-protocol-graphql)" size={20} />
          <StageSpin label="Connecting to broker" color="var(--color-protocol-mqtt)" size={20} />
        </div>
      </Row>
      <Row label="StagePulse — pending / waiting step" align="flex-start" code={`<StagePulse label="Awaiting queue" sublabel="Will start after previous step completes" size={20} />\n<StagePulse label="Rate limit window" color="var(--color-warning)" size={20} />\n<StagePulse label="Idle" size={20} />`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          <StagePulse label="Awaiting queue" sublabel="Will start after previous step completes" size={20} />
          <StagePulse label="Rate limit window" color="var(--color-warning)" size={20} />
          <StagePulse label="Idle" size={20} />
        </div>
      </Row>
      <Row label="Multi-step pipeline example" align="flex-start" code={`<StageCheck label="Auth pre-flight check" color="var(--color-success)" size={18} />\n<StageCheck label="Request serialized"   color="var(--color-success)" size={18} />\n<StageSpin  label="HTTP round-trip"       sublabel="250ms elapsed" color="var(--color-primary)" size={18} />\n<StagePulse label="Response validation"  size={18} />\n<StagePulse label="Store & notify"       size={18} />`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
          <StageCheck label="Auth pre-flight check" color="var(--color-success)" size={18} />
          <StageCheck label="Request serialized" color="var(--color-success)" size={18} />
          <StageSpin label="HTTP round-trip" sublabel="250ms elapsed" color="var(--color-primary)" size={18} />
          <StagePulse label="Response validation" size={18} />
          <StagePulse label="Store & notify" size={18} />
        </div>
      </Row>
      <Row label="Sizes" gap={20} code={`<StageCheck color="var(--color-success)" size={14} />\n<StageCheck color="var(--color-success)" size={20} />\n<StageSpin  color="var(--color-primary)" size={14} />\n<StageSpin  color="var(--color-primary)" size={20} />\n<StagePulse size={14} />\n<StagePulse size={20} />`}>
        <StageCheck color="var(--color-success)" size={14} />
        <StageCheck color="var(--color-success)" size={18} />
        <StageCheck color="var(--color-success)" size={20} />
        <StageCheck color="var(--color-success)" size={24} />
        <StageSpin color="var(--color-primary)" size={14} />
        <StageSpin color="var(--color-primary)" size={18} />
        <StageSpin color="var(--color-primary)" size={20} />
        <StageSpin color="var(--color-primary)" size={24} />
        <StagePulse size={14} />
        <StagePulse size={18} />
        <StagePulse size={20} />
        <StagePulse size={24} />
      </Row>
    </div>
  );
}
