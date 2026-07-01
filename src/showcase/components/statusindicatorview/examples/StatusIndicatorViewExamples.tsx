import { StatusIndicatorView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

type StatusState = 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error';

// ─── All WebSocket states in sequence ─────────────────────────────────────────
function WebSocketStatesDemo() {
  const states: StatusState[] = ['idle', 'connecting', 'connected', 'disconnected', 'error'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {states.map(status => (
        <StatusIndicatorView
          key={status}
          status={status}
          label={status === 'idle' ? 'Idle — not connected' : undefined}
          subtext={
            status === 'connecting' ? 'wss://echo.example.com' :
            status === 'connected'  ? 'wss://echo.example.com · 3 messages' :
            status === 'error'      ? 'Connection refused (ECONNREFUSED)' : undefined
          }
          size="md"
        />
      ))}
    </div>
  );
}

// ─── gRPC stream status ───────────────────────────────────────────────────────
function GrpcStreamStatusDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <StatusIndicatorView status="idle"        label="Stream idle"       size="sm" accentColor="var(--color-protocol-grpc)" />
      <StatusIndicatorView status="connecting"  label="Opening stream"    size="sm" accentColor="var(--color-protocol-grpc)" />
      <StatusIndicatorView status="connected"   label="Streaming"         size="sm" accentColor="var(--color-protocol-grpc)" subtext="14 messages received" />
      <StatusIndicatorView status="disconnected" label="Stream closed"    size="sm" accentColor="var(--color-protocol-grpc)" />
      <StatusIndicatorView status="error"       label="Stream error"      size="sm" accentColor="var(--color-protocol-grpc)" subtext="Status code: UNAVAILABLE" />
    </div>
  );
}

// ─── All statuses in a labeled row ────────────────────────────────────────────
function AllStatusesRowDemo() {
  const states: StatusState[] = ['idle', 'connecting', 'connected', 'disconnected', 'error'];
  return (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
      {states.map(status => (
        <StatusIndicatorView key={status} status={status} size="sm" />
      ))}
    </div>
  );
}

// ─── Inline in a tab bar label ────────────────────────────────────────────────
function InlineTabBarDemo() {
  return (
    <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--color-surface-border)' }}>
      {[
        { label: 'REST', status: 'connected' as StatusState, color: 'var(--color-protocol-rest)' },
        { label: 'WebSocket', status: 'connecting' as StatusState, color: 'var(--color-protocol-websocket)' },
        { label: 'gRPC', status: 'idle' as StatusState, color: 'var(--color-protocol-grpc)' },
      ].map(tab => (
        <div key={tab.label} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', fontSize: 12, fontWeight: 500,
          color: 'var(--color-text-secondary)',
          borderBottom: '2px solid transparent',
          cursor: 'pointer',
        }}>
          {tab.label}
          <StatusIndicatorView
            status={tab.status}
            showLabel={false}
            size="sm"
            accentColor={tab.color}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Custom accentColor per status ────────────────────────────────────────────
function CustomAccentDemo() {
  const pairs: { status: StatusState; color: string; label: string }[] = [
    { status: 'idle',         color: 'var(--color-protocol-soap)',      label: 'SOAP idle' },
    { status: 'connecting',   color: 'var(--color-protocol-mqtt)',      label: 'MQTT connecting' },
    { status: 'connected',    color: 'var(--color-success)',            label: 'Connected (success)' },
    { status: 'disconnected', color: 'var(--color-text-muted)',         label: 'Disconnected' },
    { status: 'error',        color: 'var(--color-error)',              label: 'Error' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {pairs.map(({ status, color, label }) => (
        <StatusIndicatorView key={label} status={status} label={label} accentColor={color} size="md" />
      ))}
    </div>
  );
}

// ─── Size comparison ──────────────────────────────────────────────────────────
function SizesDemo() {
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
      <StatusIndicatorView status="connected" size="sm" label="sm connected" />
      <StatusIndicatorView status="connected" size="md" label="md connected" />
      <StatusIndicatorView status="connected" size="lg" label="lg connected" />
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function StatusIndicatorViewExamples() {
  return (
    <div>
      <ExampleCard
        title="WebSocket Connection States"
        description="All five states: idle → connecting → connected → disconnected → error"
        code={`<StatusIndicatorView status="idle" />
<StatusIndicatorView status="connecting" subtext="wss://echo.example.com" />
<StatusIndicatorView status="connected"  subtext="3 messages" />
<StatusIndicatorView status="disconnected" />
<StatusIndicatorView status="error" subtext="ECONNREFUSED" />`}
      >
        <WebSocketStatesDemo />
      </ExampleCard>

      <ExampleCard
        title="gRPC Stream Status"
        description="sm size with gRPC accent color across all states"
        code={`<StatusIndicatorView status="streaming" size="sm" accentColor="var(--color-protocol-grpc)" />`}
      >
        <GrpcStreamStatusDemo />
      </ExampleCard>

      <ExampleCard
        title="All Statuses — Labeled Row"
        description="Quick at-a-glance comparison of all five states in sm size"
        code={`const states = ['idle','connecting','connected','disconnected','error'];
states.map(s => <StatusIndicatorView key={s} status={s} size="sm" />)`}
      >
        <AllStatusesRowDemo />
      </ExampleCard>

      <ExampleCard
        title="Inline in Tab Bar"
        description="showLabel=false — dot only, no text, sits beside the tab label"
        code={`<StatusIndicatorView status="connected" showLabel={false} size="sm" accentColor="var(--color-protocol-rest)" />`}
      >
        <InlineTabBarDemo />
      </ExampleCard>

      <ExampleCard
        title="Custom accentColor per Protocol"
        description="Override the default palette to match each protocol's theme color"
        code={`<StatusIndicatorView status="idle"      accentColor="var(--color-protocol-soap)" label="SOAP idle" />
<StatusIndicatorView status="connected" accentColor="var(--color-success)"       label="Connected" />`}
      >
        <CustomAccentDemo />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm · md · lg — dot and font scale together"
        code={`<StatusIndicatorView status="connected" size="sm" />
<StatusIndicatorView status="connected" size="md" />
<StatusIndicatorView status="connected" size="lg" />`}
      >
        <SizesDemo />
      </ExampleCard>
    </div>
  );
}
