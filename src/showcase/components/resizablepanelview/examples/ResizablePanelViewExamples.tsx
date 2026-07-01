import { ResizablePanelView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function PanelContent({ label, color }: { label: string; color?: string }) {
  return (
    <div style={{
      height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, color: color || 'var(--color-text-muted)',
      background: 'var(--color-panel)',
      fontFamily: 'monospace',
    }}>
      {label}
    </div>
  );
}

// ─── Response panel ───────────────────────────────────────────────────────────
function ResponsePanelDemo() {
  return (
    <ResizablePanelView defaultHeight={160} minHeight={60} maxHeight={400}>
      <PanelContent label="Response body (drag bottom edge to resize)" color="var(--color-protocol-rest)" />
    </ResizablePanelView>
  );
}

// ─── Code snippet panel ───────────────────────────────────────────────────────
function CodeSnippetPanelDemo() {
  return (
    <ResizablePanelView defaultHeight={120} minHeight={50} maxHeight={300} borderRadius={4}>
      <div style={{
        height: '100%', overflowY: 'auto',
        padding: '10px 14px',
        background: 'var(--color-codeblock-bg)',
        fontFamily: 'monospace', fontSize: 12,
        color: 'var(--color-text-primary)',
        lineHeight: 1.6,
      }}>
        <div style={{ color: 'var(--color-protocol-graphql)' }}>query GetUser($id: ID!) {'{'}</div>
        <div style={{ paddingLeft: 16, color: 'var(--color-text-secondary)' }}>user(id: $id) {'{'}</div>
        <div style={{ paddingLeft: 32, color: 'var(--color-text-muted)' }}>id</div>
        <div style={{ paddingLeft: 32, color: 'var(--color-text-muted)' }}>name</div>
        <div style={{ paddingLeft: 32, color: 'var(--color-text-muted)' }}>email</div>
        <div style={{ paddingLeft: 16, color: 'var(--color-text-secondary)' }}>{'}'}</div>
        <div style={{ color: 'var(--color-protocol-graphql)' }}>{'}'}</div>
      </div>
    </ResizablePanelView>
  );
}

// ─── Log output panel ─────────────────────────────────────────────────────────
function LogOutputPanelDemo() {
  const logs = [
    { time: '10:42:01', level: 'INFO',  msg: 'WebSocket connected to wss://echo.example.com' },
    { time: '10:42:02', level: 'SEND',  msg: '{"type":"subscribe","channel":"updates"}' },
    { time: '10:42:03', level: 'RECV',  msg: '{"type":"ack","status":"ok"}' },
    { time: '10:42:05', level: 'RECV',  msg: '{"type":"event","data":{"id":1,"value":42}}' },
    { time: '10:42:10', level: 'WARN',  msg: 'Heartbeat timeout — sending ping' },
    { time: '10:42:10', level: 'RECV',  msg: '{"type":"pong"}' },
  ];
  const levelColor = (l: string) =>
    l === 'SEND' ? 'var(--color-info)' :
    l === 'RECV' ? 'var(--color-success)' :
    l === 'WARN' ? 'var(--color-warning)' : 'var(--color-text-muted)';

  return (
    <ResizablePanelView defaultHeight={150} minHeight={60} maxHeight={360}>
      <div style={{ height: '100%', overflowY: 'auto', padding: '8px 12px', background: 'var(--color-panel)' }}>
        {logs.map((log, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, fontSize: 11, lineHeight: 1.7, fontFamily: 'monospace' }}>
            <span style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}>{log.time}</span>
            <span style={{ color: levelColor(log.level), flexShrink: 0, minWidth: 36, fontWeight: 600 }}>{log.level}</span>
            <span style={{ color: 'var(--color-text-secondary)' }}>{log.msg}</span>
          </div>
        ))}
      </div>
    </ResizablePanelView>
  );
}

// ─── defaultHeight 200 vs 300 comparison ──────────────────────────────────────
function DefaultHeightComparisonDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: 6 }}>
          defaultHeight=200
        </div>
        <ResizablePanelView defaultHeight={200} minHeight={60} maxHeight={400}>
          <PanelContent label="200px default — drag to resize" />
        </ResizablePanelView>
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: 6 }}>
          defaultHeight=300
        </div>
        <ResizablePanelView defaultHeight={300} minHeight={60} maxHeight={400}>
          <PanelContent label="300px default — drag to resize" />
        </ResizablePanelView>
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function ResizablePanelViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Response Panel"
        description="Drag the bottom edge to resize — minHeight=60, maxHeight=400"
        code={`<ResizablePanelView defaultHeight={160} minHeight={60} maxHeight={400}>
  <ResponseBody />
</ResizablePanelView>`}
      >
        <ResponsePanelDemo />
      </ExampleCard>

      <ExampleCard
        title="Code Snippet Panel"
        description="Resizable GraphQL query editor area with sharper border radius"
        code={`<ResizablePanelView defaultHeight={120} minHeight={50} maxHeight={300} borderRadius={4}>
  <CodeEditor />
</ResizablePanelView>`}
      >
        <CodeSnippetPanelDemo />
      </ExampleCard>

      <ExampleCard
        title="Log Output Panel"
        description="WebSocket message log with color-coded levels — drag to reveal more rows"
        code={`<ResizablePanelView defaultHeight={150} minHeight={60} maxHeight={360}>
  <LogList />
</ResizablePanelView>`}
      >
        <LogOutputPanelDemo />
      </ExampleCard>

      <ExampleCard
        title="defaultHeight Comparison"
        description="200px vs 300px starting heights — both independently resizable"
        code={`<ResizablePanelView defaultHeight={200} ...>...</ResizablePanelView>
<ResizablePanelView defaultHeight={300} ...>...</ResizablePanelView>`}
      >
        <DefaultHeightComparisonDemo />
      </ExampleCard>
    </div>
  );
}
