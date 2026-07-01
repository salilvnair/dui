import { useState } from 'react';
import { BottomPanelView } from '@/dui';
import type { BottomPanelTab } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

function LogLine({ level, text }: { level: 'info' | 'warn' | 'error'; text: string }) {
  const color =
    level === 'error' ? 'var(--color-error)' :
    level === 'warn' ? 'var(--color-warning)' :
    'var(--color-text-secondary)';
  return (
    <div style={{ fontSize: 11, fontFamily: 'monospace', color, lineHeight: 1.6 }}>
      [{level.toUpperCase()}] {text}
    </div>
  );
}

const DEVTOOLS_TABS: BottomPanelTab[] = [
  {
    id: 'console',
    label: 'Console',
    content: (
      <div>
        <LogLine level="info" text="GET https://api.example.com/users → 200 OK (142ms)" />
        <LogLine level="warn" text="Authorization header missing — falling back to API key" />
        <LogLine level="error" text="POST /items failed: 422 Unprocessable Entity" />
        <LogLine level="info" text="Environment switched to Production" />
      </div>
    ),
  },
  {
    id: 'network',
    label: 'Network',
    content: (
      <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>
        <div>200  GET  /users  142ms  2.1KB</div>
        <div>201  POST /users  88ms   540B</div>
        <div>422  POST /items  61ms   312B</div>
      </div>
    ),
  },
  {
    id: 'problems',
    label: 'Problems',
    content: (
      <div>
        <LogLine level="error" text="Missing required header: Content-Type" />
        <LogLine level="warn" text="Response body is not valid JSON" />
      </div>
    ),
  },
];

const RESPONSE_TABS: BottomPanelTab[] = [
  {
    id: 'body',
    label: 'Body',
    content: (
      <pre style={{ margin: 0, fontSize: 11, color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>
        {`{\n  "id": 1,\n  "name": "Alice",\n  "email": "alice@example.com"\n}`}
      </pre>
    ),
  },
  {
    id: 'headers',
    label: 'Headers',
    content: (
      <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>
        <div>content-type: application/json</div>
        <div>x-request-id: abc-123</div>
        <div>cache-control: no-cache</div>
      </div>
    ),
  },
  {
    id: 'cookies',
    label: 'Cookies',
    content: (
      <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
        No cookies returned.
      </div>
    ),
  },
];

const LOGS_TABS: BottomPanelTab[] = [
  {
    id: 'app',
    label: 'App Logs',
    content: (
      <div>
        <LogLine level="info" text="[12:01:04] Extension host ready" />
        <LogLine level="info" text="[12:01:05] Loaded 12 collections" />
        <LogLine level="warn" text="[12:01:06] SQLite vacuum skipped — DB in use" />
      </div>
    ),
  },
  {
    id: 'mock',
    label: 'Mock Server',
    content: (
      <div>
        <LogLine level="info" text="[12:01:10] Mock server started on :4000" />
        <LogLine level="info" text="[12:01:14] GET /users → 200 (mock)" />
      </div>
    ),
  },
];

const COLLAPSED_TABS: BottomPanelTab[] = [
  {
    id: 'output',
    label: 'Output',
    content: <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>Panel is expanded now.</div>,
  },
];

export function BottomPanelViewExamples() {
  return (
    <div>
      <ExampleCard
        title="DevTools Panel"
        description="Console / Network / Problems tabs — drag the top edge to resize"
        code={`<BottomPanelView tabs={DEVTOOLS_TABS} defaultHeight={160} />`}
        noPad
      >
        <BottomPanelView tabs={DEVTOOLS_TABS} defaultHeight={160} />
      </ExampleCard>

      <ExampleCard
        title="Response Panel"
        description="Body / Headers / Cookies — typical API response view at the bottom of the screen"
        code={`<BottomPanelView tabs={RESPONSE_TABS} defaultHeight={140} accentColor="var(--color-protocol-rest)" />`}
        noPad
      >
        <BottomPanelView
          tabs={RESPONSE_TABS}
          defaultHeight={140}
          accentColor="var(--color-protocol-rest)"
        />
      </ExampleCard>

      <ExampleCard
        title="Logs Viewer Panel"
        description="App Logs / Mock Server tabs showing timestamped output"
        code={`<BottomPanelView tabs={LOGS_TABS} defaultHeight={130} />`}
        noPad
      >
        <BottomPanelView tabs={LOGS_TABS} defaultHeight={130} />
      </ExampleCard>

      <ExampleCard
        title="Collapsed by Default"
        description="Panel starts collapsed — click a tab to expand it"
        code={`<BottomPanelView tabs={tabs} defaultCollapsed />`}
        noPad
      >
        <BottomPanelView tabs={COLLAPSED_TABS} defaultCollapsed />
      </ExampleCard>
    </div>
  );
}
