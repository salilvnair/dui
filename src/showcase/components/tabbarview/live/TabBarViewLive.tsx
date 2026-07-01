import { useState, useRef } from 'react';
import { TabBarView } from '@/dui';
import type { TabBarTab } from '@/dui';
import { Row } from '../../../shared/Row';

const REST_TABS: TabBarTab[] = [
  { id: 't1', label: 'GET /api/users',        type: 'request', protocol: 'rest', method: 'GET' },
  { id: 't2', label: 'POST /api/auth/login',  type: 'request', protocol: 'rest', method: 'POST', dirty: true },
  { id: 't3', label: 'getUsers',              type: 'request', protocol: 'graphql' },
  { id: 't4', label: 'Echo server',           type: 'request', protocol: 'websocket', rtProtocol: 'websocket' },
  { id: 't5', label: 'MQTT broker',           type: 'request', protocol: 'websocket', rtProtocol: 'mqtt' },
  { id: 't6', label: 'UserService.GetUser',   type: 'request', protocol: 'grpc' },
  { id: 't7', label: 'Invoice.wsdl',          type: 'request', protocol: 'soap' },
  { id: 't8', label: 'Settings',    type: 'settings' },
  { id: 't9', label: 'Mock Server', type: 'mock-server' },
] as TabBarTab[];

export function TabBarViewLive() {
  const [activeTab, setActiveTab] = useState('t1');
  const [tabs, setTabs] = useState(REST_TABS);
  const nextId = useRef(10);

  return (
    <div>
      <Row label="Full tab bar — protocol badges · dirty dot · close on hover · add tab" noPad code={`// Each tab has a 'protocol' field — that's what drives the colored prefix badge\nconst tabs = [\n  { id: '1', label: 'GET /users',       type: 'request', protocol: 'rest',      method: 'GET'  },\n  { id: '2', label: 'POST /auth/login', type: 'request', protocol: 'rest',      method: 'POST', dirty: true },\n  { id: '3', label: 'getUsers',         type: 'request', protocol: 'graphql'                    },\n  { id: '4', label: 'Echo server',      type: 'request', protocol: 'websocket', rtProtocol: 'websocket' },\n];\n\n<TabBarView\n  tabs={tabs}\n  activeTabId={activeId}\n  onTabClick={setActiveId}\n  onTabClose={closeTab}\n  onAddTab={addTab}\n  accentColor="var(--color-protocol-rest)"\n/>`}>
        <div style={{ width: '100%' }}>
          <TabBarView
            tabs={tabs}
            activeTabId={activeTab}
            onTabClick={setActiveTab}
            onTabClose={id => {
              const next = tabs.filter(t => t.id !== id);
              setTabs(next);
              if (activeTab === id && next.length > 0) setActiveTab(next[0].id);
            }}
            onAddTab={() => {
              const id = `new-${nextId.current++}`;
              setTabs(t => [...t, { id, label: `Untitled ${nextId.current - 1}`, type: 'request', protocol: 'rest', method: 'GET', dirty: true }]);
              setActiveTab(id);
            }}
            accentColor="var(--color-protocol-rest)"
          />
          <div style={{ padding: '10px 14px', fontSize: '11px', color: 'var(--color-text-muted)' }}>
            Active: <strong style={{ color: 'var(--color-text-primary)' }}>{tabs.find(t => t.id === activeTab)?.label}</strong>
            <span style={{ marginLeft: '10px', opacity: 0.6 }}>({tabs.length} tabs)</span>
          </div>
        </div>
      </Row>

      <Row label="Protocol-colored accents — 'protocol' field controls badge label and color" align="flex-start" code={`// protocol field → badge label + color:\n//   'graphql'   → "GQL"  in var(--color-protocol-graphql)\n//   'grpc'      → "gRPC" in var(--color-protocol-grpc)\n//   'soap'      → "SOAP" in var(--color-protocol-soap)\n//   'websocket' → "WS" or rtProtocol badge (SSE, SIO, MQTT)\n<TabBarView tabs={gqlTabs}  activeTabId="g1" accentColor="var(--color-protocol-graphql)" height={32} />`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
          {([
            { tabs: [{ id: 'g1', label: 'getUsers query',   type: 'request', protocol: 'graphql' }], accent: 'var(--color-protocol-graphql)' },
            { tabs: [{ id: 'w1', label: 'SSE /events',      type: 'request', protocol: 'websocket', rtProtocol: 'sse' }], accent: 'var(--color-protocol-sse)' },
            { tabs: [{ id: 'r1', label: 'Realtime.Chat',    type: 'request', protocol: 'grpc' }], accent: 'var(--color-protocol-grpc)' },
          ] as { tabs: TabBarTab[]; accent: string }[]).map(({ tabs: t, accent }) => (
            <TabBarView key={t[0].id} tabs={t} activeTabId={t[0].id} onTabClick={() => {}} accentColor={accent} height={32} />
          ))}
        </div>
      </Row>

      <Row label="Features" code={`<TabBarView\n  tabs={tabs}           // TabBarTab[] — plain props, no store\n  activeTabId={id}\n  onTabClick={select}\n  onTabClose={close}    // shows × on hover\n  onAddTab={add}        // + button at right edge\n  accentColor="var(--color-protocol-rest)"\n/>`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '11px', color: 'var(--color-text-secondary)' }}>
          {[
            '✓ Active tab — 2px colored top border + subtle tinted background',
            '✓ Protocol badge — method color (GET/POST/…), GQL, WS, SSE, SIO, MQTT, gRPC, SOAP, AI, MCP',
            '✓ Dirty dot — amber dot when tab has unsaved changes',
            '✓ Pinned tab — 📌 icon replaces close button',
            '✓ Close on hover — × appears on tab hover; always visible for Settings/Mock Server',
            '✓ Add tab (+) — rightmost button with accent color',
            '✓ Scroll arrows — appear when tabs overflow horizontally',
            '✓ Decoupled from store — TabBarView takes plain props; no Zustand dependency',
          ].map(f => <div key={f}>{f}</div>)}
        </div>
      </Row>
    </div>
  );
}
