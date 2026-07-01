import { useState, useRef } from 'react';
import { TabBarView } from '@/dui';
import type { TabBarTab } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const MIXED_TABS: TabBarTab[] = [
  { id: 't1', label: 'GET /api/users',       type: 'request', protocol: 'rest',      method: 'GET' },
  { id: 't2', label: 'POST /api/auth/login', type: 'request', protocol: 'rest',      method: 'POST', dirty: true },
  { id: 't3', label: 'getUsers',             type: 'request', protocol: 'graphql' },
  { id: 't4', label: 'Echo server',          type: 'request', protocol: 'websocket', rtProtocol: 'websocket' },
  { id: 't5', label: 'UserService.GetUser',  type: 'request', protocol: 'grpc' },
];

function makeTab(id: string, n: number): TabBarTab {
  return { id, label: `GET /api/endpoint-${n}`, type: 'request', protocol: 'rest', method: 'GET' };
}

export function TabBarViewExamples() {
  const [activeTab,  setActiveTab]  = useState('t1');
  const [tabs,       setTabs]       = useState(MIXED_TABS);
  const [singleTab,  setSingleTab]  = useState('s1');
  const [overflowTab, setOverflowTab] = useState('o1');
  const [overflowTabs, setOverflowTabs] = useState<TabBarTab[]>(() =>
    Array.from({ length: 12 }, (_, i) => makeTab(`o${i + 1}`, i + 1))
  );

  const nextId = useRef(6);

  const closeTab = (id: string) => {
    const next = tabs.filter(t => t.id !== id);
    setTabs(next);
    if (activeTab === id && next.length > 0) setActiveTab(next[0].id);
  };

  const addTab = () => {
    const id = `t${nextId.current++}`;
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;
    const m = methods[Math.floor(Math.random() * methods.length)];
    setTabs(prev => [...prev, { id, label: `${m} /api/new-${nextId.current - 1}`, type: 'request', protocol: 'rest', method: m, dirty: true }]);
    setActiveTab(id);
  };

  return (
    <div>
      <ExampleCard
        title="REST Request Tabs with Method Color"
        description="Protocol badge + method color on each tab — dirty dot for unsaved changes"
        code={`const tabs = [
  { id: 't1', label: 'GET /api/users',  type: 'request', protocol: 'rest', method: 'GET' },
  { id: 't2', label: 'POST /api/login', type: 'request', protocol: 'rest', method: 'POST', dirty: true },
];

<TabBarView
  tabs={tabs}
  activeTabId={activeTab}
  onTabClick={setActiveTab}
  onTabClose={closeTab}
  onAddTab={addTab}
  accentColor="var(--color-protocol-rest)"
/>`}
        noPad
      >
        <div style={{ width: '100%' }}>
          <TabBarView
            tabs={tabs}
            activeTabId={activeTab}
            onTabClick={setActiveTab}
            onTabClose={closeTab}
            onAddTab={addTab}
            accentColor="var(--color-protocol-rest)"
          />
          <div style={{ padding: '8px 14px', fontSize: 11, color: 'var(--color-text-muted)' }}>
            Active: <strong style={{ color: 'var(--color-text-primary)' }}>{tabs.find(t => t.id === activeTab)?.label}</strong>
            <span style={{ marginLeft: 10, opacity: 0.6 }}>({tabs.length} tabs)</span>
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Multi-Protocol Tabs"
        description="REST, GraphQL, WebSocket, and gRPC tabs side by side with protocol badges"
        code={`const tabs = [
  { id: 't1', label: 'GET /users',    protocol: 'rest',      method: 'GET' },
  { id: 't2', label: 'getUsers',      protocol: 'graphql' },
  { id: 't3', label: 'Echo server',   protocol: 'websocket', rtProtocol: 'websocket' },
  { id: 't4', label: 'GetUser',       protocol: 'grpc' },
];`}
        noPad
      >
        <TabBarView
          tabs={MIXED_TABS}
          activeTabId="t3"
          onTabClick={() => {}}
          accentColor="var(--color-protocol-websocket)"
        />
      </ExampleCard>

      <ExampleCard
        title="Dirty / Modified Indicator"
        description="Amber dot on unsaved tabs — appears before the tab label"
        code={`// dirty=true adds an amber dot to the tab
const tabs = [
  { id: 't1', label: 'Clean tab',    protocol: 'rest', method: 'GET' },
  { id: 't2', label: 'Unsaved tab',  protocol: 'rest', method: 'POST', dirty: true },
];`}
        noPad
      >
        <TabBarView
          tabs={[
            { id: 'clean', label: 'GET /clean',        type: 'request', protocol: 'rest', method: 'GET' },
            { id: 'dirty', label: 'POST /unsaved',     type: 'request', protocol: 'rest', method: 'POST', dirty: true },
            { id: 'dirty2', label: 'DELETE /modified', type: 'request', protocol: 'rest', method: 'DELETE', dirty: true },
          ]}
          activeTabId="dirty"
          onTabClick={() => {}}
          accentColor="var(--color-protocol-rest)"
        />
      </ExampleCard>

      <ExampleCard
        title="Overflow Scroll Arrows"
        description="Scroll arrows appear automatically when tabs overflow — click to scroll"
        code={`// Add enough tabs to exceed the container width
// TabBarView automatically shows ‹ › scroll arrows
const tabs = Array.from({ length: 12 }, (_, i) =>
  ({ id: \`o\${i}\`, label: \`GET /endpoint-\${i}\`, protocol: 'rest', method: 'GET' })
);`}
        noPad
      >
        <div style={{ width: '100%' }}>
          <TabBarView
            tabs={overflowTabs}
            activeTabId={overflowTab}
            onTabClick={setOverflowTab}
            onTabClose={id => {
              const next = overflowTabs.filter(t => t.id !== id);
              setOverflowTabs(next);
              if (overflowTab === id && next.length > 0) setOverflowTab(next[0].id);
            }}
            accentColor="var(--color-protocol-rest)"
          />
          <div style={{ padding: '6px 14px', fontSize: 10, color: 'var(--color-text-muted)' }}>
            {overflowTabs.length} tabs — scroll with the ‹ › arrows
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Single Tab — Non-Closeable"
        description="When only one tab remains, the close button is hidden"
        code={`<TabBarView
  tabs={[{ id: 's1', label: 'GET /users', protocol: 'rest', method: 'GET' }]}
  activeTabId="s1"
  onTabClick={() => {}}
  accentColor="var(--color-protocol-rest)"
/>`}
        noPad
      >
        <TabBarView
          tabs={[{ id: 's1', label: 'GET /users', type: 'request', protocol: 'rest', method: 'GET' }]}
          activeTabId={singleTab}
          onTabClick={setSingleTab}
          accentColor="var(--color-protocol-rest)"
        />
      </ExampleCard>
    </div>
  );
}
