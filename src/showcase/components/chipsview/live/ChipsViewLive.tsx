import { useState } from 'react';
import { ChipView } from '@/dui';
import { Row } from '../../../shared/Row';

const PROTOCOLS = [
  { label: 'REST',      color: 'var(--color-protocol-rest)',      badge: 'REST' },
  { label: 'GraphQL',   color: 'var(--color-protocol-graphql)',   badge: 'GQL' },
  { label: 'WebSocket', color: 'var(--color-protocol-websocket)', badge: 'WS'  },
  { label: 'gRPC',      color: 'var(--color-protocol-grpc)',      badge: 'gRPC' },
  { label: 'SOAP',      color: 'var(--color-protocol-soap)',      badge: 'SOAP' },
  { label: 'MQTT',      color: 'var(--color-protocol-mqtt)',      badge: 'MQTT' },
  { label: 'SSE',       color: 'var(--color-protocol-sse)',       badge: 'SSE'  },
  { label: 'MCP',       color: 'var(--color-protocol-mcp)',       badge: 'MCP'  },
  { label: 'AI',        color: 'var(--color-protocol-ai)',        badge: 'AI'   },
];

export function ChipsViewLive() {
  const [aiOn, setAiOn] = useState(false);
  const [aiMode, setAiMode] = useState<'on-demand' | 'auto'>('on-demand');
  const [snippetsOn, setSnippetsOn] = useState(false);
  return (
    <div>
      <Row label="AI autocomplete toggle + mode badge (Scripts editor toolbar)" code={`// AI toggle chip — active state uses protocol-ai color\n<ChipView\n  label="AI"\n  size="xs"\n  color="var(--color-protocol-ai)"\n  active={aiEnabled}\n  onClick={() => setAiEnabled(e => !e)}\n/>\n// Mode badge — switches between shortcut hint and "auto"\n{aiEnabled && (\n  <ChipView\n    label={mode === 'on-demand' ? '⌃⌥Space' : 'auto'}\n    size="xs"\n    color="var(--color-protocol-ai)"\n    onClick={() => setMode(m => m === 'on-demand' ? 'auto' : 'on-demand')}\n  />\n)}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <ChipView label="AI" size="xs" color="var(--color-protocol-ai)" active={aiOn} onClick={() => { setAiOn(v => !v); if (!aiOn) setAiMode('on-demand'); }} />
          {aiOn && (
            <ChipView
              label={aiMode === 'on-demand' ? '⌃⌥Space' : 'auto'}
              size="xs"
              color="var(--color-protocol-ai)"
              onClick={() => setAiMode(m => m === 'on-demand' ? 'auto' : 'on-demand')}
            />
          )}
        </div>
      </Row>
      <Row label="Snippets toggle chip (Scripts editor toolbar)" code={`<ChipView\n  label="Snippets"\n  size="xs"\n  color="var(--color-primary)"\n  active={snippetsOn}\n  onClick={() => setSnippetsOn(v => !v)}\n/>`}>
        <ChipView label="Snippets" size="xs" color="var(--color-primary)" active={snippetsOn} onClick={() => setSnippetsOn(v => !v)} />
      </Row>
      <Row label="Protocol chips" code={`{PROTOCOLS.map(p => (\n  <ChipView key={p.label} label={p.badge} color={p.color} size="sm" />\n))}`}>
        {PROTOCOLS.map(p => <ChipView key={p.label} label={p.badge} color={p.color} size="sm" />)}
      </Row>
      <Row label="HTTP method chips" code={`<ChipView label="GET"    color="var(--color-method-get)"    size="sm" />\n<ChipView label="POST"   color="var(--color-method-post)"   size="sm" />\n<ChipView label="DELETE" color="var(--color-method-delete)" size="sm" />`}>
        <ChipView label="GET"    color="var(--color-method-get)"    size="sm" />
        <ChipView label="POST"   color="var(--color-method-post)"   size="sm" />
        <ChipView label="PUT"    color="var(--color-method-put)"    size="sm" />
        <ChipView label="PATCH"  color="var(--color-method-patch)"  size="sm" />
        <ChipView label="DELETE" color="var(--color-method-delete)" size="sm" />
        <ChipView label="HEAD"   color="var(--color-method-head)"   size="sm" />
      </Row>
      <Row label="Status code chips" code={`<ChipView label="200 OK"          color="var(--color-success)" active />\n<ChipView label="404 Not Found"   color="var(--color-warning)" active />\n<ChipView label="500 Error"       color="var(--color-error)"   active />`}>
        <ChipView label="200 OK"           color="var(--color-success)" active />
        <ChipView label="201 Created"      color="var(--color-success)" />
        <ChipView label="400 Bad Request"  color="var(--color-warning)" />
        <ChipView label="404 Not Found"    color="var(--color-warning)" active />
        <ChipView label="500 Error"        color="var(--color-error)"   active />
      </Row>
      <Row label="Sizes  (xs / sm / md)" code={`<ChipView label="xs" size="xs" color="var(--color-primary)" />\n<ChipView label="sm" size="sm" color="var(--color-primary)" />\n<ChipView label="md" size="md" color="var(--color-primary)" />`}>
        <ChipView label="xs" size="xs" color="var(--color-primary)" />
        <ChipView label="sm" size="sm" color="var(--color-primary)" />
        <ChipView label="md" size="md" color="var(--color-primary)" />
      </Row>
      <Row label="Active (filled) vs outlined" code={`<ChipView label="Active"   color="var(--color-success)" active />\n<ChipView label="Outlined" color="var(--color-success)" />\n<ChipView label="Active"   color="var(--color-error)" active />\n<ChipView label="Outlined" color="var(--color-error)" />`}>
        <ChipView label="Active"   color="var(--color-protocol-graphql)" active />
        <ChipView label="Outlined" color="var(--color-protocol-graphql)" />
        <ChipView label="Active"   color="var(--color-success)" active />
        <ChipView label="Outlined" color="var(--color-success)" />
        <ChipView label="Active"   color="var(--color-error)" active />
        <ChipView label="Outlined" color="var(--color-error)" />
      </Row>
      <Row label="rounded=true vs rounded=false" code={`<ChipView label="rounded" rounded    color="var(--color-info)" />\n<ChipView label="pointy"  rounded={false} color="var(--color-info)" />`}>
        <ChipView label="rounded" rounded color="var(--color-info)" />
        <ChipView label="pointy" rounded={false} color="var(--color-info)" />
      </Row>
    </div>
  );
}
