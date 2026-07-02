import { useState } from 'react';
import { TabView } from '@/dui';
import type { TabItem } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const REQUEST_TABS: TabItem[] = [
  { id: 'params',  label: 'Params',  badge: 3 },
  { id: 'headers', label: 'Headers', badge: 6 },
  { id: 'body',    label: 'Body' },
  { id: 'auth',    label: 'Auth',    dot: true, dotColor: 'var(--color-success)' },
  { id: 'scripts', label: 'Scripts' },
];

const SETTINGS_TABS: TabItem[] = [
  { id: 'overview',  label: 'Overview' },
  { id: 'history',   label: 'History',  badge: 12 },
  { id: 'settings',  label: 'Settings' },
  { id: 'docs',      label: 'Docs' },
];

const WS_TABS: TabItem[] = [
  { id: 'messages', label: 'Messages', badge: 4 },
  { id: 'connect',  label: 'Connect',  dot: true, dotColor: 'var(--color-success)' },
  { id: 'headers',  label: 'Headers' },
];

export function TabViewExamples() {
  const [reqTab, setReqTab]         = useState('params');
  const [settingsTab, setSettingsTab] = useState('overview');
  const [wsTab, setWsTab]           = useState('messages');
  const [chipTab, setChipTab]       = useState('rest');
  const [sizeTab, setSizeTab]       = useState('a');

  const sizeTabs: TabItem[] = [
    { id: 'a', label: 'Tab A' },
    { id: 'b', label: 'Tab B' },
    { id: 'c', label: 'Tab C' },
  ];

  const protocolTabs: TabItem[] = [
    { id: 'rest',      label: 'REST' },
    { id: 'graphql',   label: 'GraphQL' },
    { id: 'websocket', label: 'WebSocket' },
    { id: 'grpc',      label: 'gRPC' },
    { id: 'soap',      label: 'SOAP' },
  ];

  const protocolColors: Record<string, string> = {
    rest:      'var(--color-protocol-rest)',
    graphql:   'var(--color-protocol-graphql)',
    websocket: 'var(--color-protocol-websocket)',
    grpc:      'var(--color-protocol-grpc)',
    soap:      'var(--color-protocol-soap)',
  };

  return (
    <div>
      <ExampleCard
        title="Pill Variant — Request Tabs"
        description="Params / Headers / Body / Auth — the standard request section tabs"
        code={`const tabs = [
  { id: 'params',  label: 'Params',  badge: 3 },
  { id: 'headers', label: 'Headers', badge: 6 },
  { id: 'body',    label: 'Body' },
  { id: 'auth',    label: 'Auth', dot: true, dotColor: 'var(--color-success)' },
];

<TabView
  tabs={tabs}
  activeTab={activeTab}
  onChange={setActiveTab}
  variant="pill"
  accentColor="var(--color-protocol-rest)"
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <TabView
            tabs={REQUEST_TABS}
            activeTab={reqTab}
            onChange={setReqTab}
            variant="pill"
            accentColor="var(--color-protocol-rest)"
          />
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            Active: <strong style={{ color: 'var(--color-text-primary)' }}>{reqTab}</strong>
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Underline Variant — Overview / History / Settings"
        description="Underline style is better for page-level navigation sections"
        code={`<TabView
  tabs={SETTINGS_TABS}
  activeTab={settingsTab}
  onChange={setSettingsTab}
  variant="underline"
/>`}
      >
        <TabView
          tabs={SETTINGS_TABS}
          activeTab={settingsTab}
          onChange={setSettingsTab}
          variant="underline"
        />
      </ExampleCard>

      <ExampleCard
        title="Right-aligned tab — align: 'right'"
        description="Mark any tab align:'right' to push it (and anything after it) to the far end of the row"
        code={`const tabs = [
  { id: 'params',  label: 'Params',  badge: 3 },
  { id: 'headers', label: 'Headers', badge: 6 },
  { id: 'body',    label: 'Body' },
  { id: 'auth',    label: 'Auth', align: 'right' },
];

<TabView
  tabs={tabs}
  activeTab={activeTab}
  onChange={setActiveTab}
  variant="underline"
/>`}
      >
        <TabView
          tabs={[
            { id: 'params',  label: 'Params',  badge: 3 },
            { id: 'headers', label: 'Headers', badge: 6 },
            { id: 'body',    label: 'Body' },
            { id: 'auth',    label: 'Auth', align: 'right' },
          ]}
          activeTab={reqTab}
          onChange={setReqTab}
          variant="underline"
        />
      </ExampleCard>

      <ExampleCard
        title="With Active Dot — WebSocket Live Status"
        description="dot=true + dotColor shows a status indicator — e.g. connected WebSocket"
        code={`const tabs = [
  { id: 'messages', label: 'Messages', badge: 4 },
  { id: 'connect',  label: 'Connect',  dot: true, dotColor: 'var(--color-success)' },
  { id: 'headers',  label: 'Headers' },
];

<TabView
  tabs={tabs}
  activeTab={wsTab}
  onChange={setWsTab}
  accentColor="var(--color-protocol-websocket)"
/>`}
      >
        <TabView
          tabs={WS_TABS}
          activeTab={wsTab}
          onChange={setWsTab}
          accentColor="var(--color-protocol-websocket)"
        />
      </ExampleCard>

      <ExampleCard
        title="Protocol Selector with accentColor"
        description="Use accentColor to match the active protocol's brand color"
        code={`const protocolColors = {
  rest:    'var(--color-protocol-rest)',
  graphql: 'var(--color-protocol-graphql)',
};

<TabView
  tabs={protocolTabs}
  activeTab={chipTab}
  onChange={setChipTab}
  accentColor={protocolColors[chipTab]}
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <TabView
            tabs={protocolTabs}
            activeTab={chipTab}
            onChange={setChipTab}
            accentColor={protocolColors[chipTab]}
          />
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            Protocol: <strong style={{ color: protocolColors[chipTab] }}>{chipTab}</strong>
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="xs / sm / default / md / lg — scale tabs to fit your toolbar"
        code={`<TabView tabs={tabs} activeTab={t} onChange={setT} size="xs" />
<TabView tabs={tabs} activeTab={t} onChange={setT} size="sm" />
<TabView tabs={tabs} activeTab={t} onChange={setT} />
<TabView tabs={tabs} activeTab={t} onChange={setT} size="md" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(['xs', 'sm', 'default', 'md', 'lg'] as const).map(sz => (
            <TabView
              key={sz}
              tabs={sizeTabs}
              activeTab={sizeTab}
              onChange={setSizeTab}
              size={sz === 'default' ? undefined : sz}
              accentColor="var(--color-primary)"
            />
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Chip Variant"
        description="chip variant renders each tab as a pill chip — suits filter-style tab rows"
        code={`<TabView
  tabs={tabs}
  activeTab={reqTab}
  onChange={setReqTab}
  variant="chip"
  accentColor="var(--color-protocol-rest)"
/>`}
      >
        <TabView
          tabs={REQUEST_TABS}
          activeTab={reqTab}
          onChange={setReqTab}
          variant="chip"
          accentColor="var(--color-protocol-rest)"
        />
      </ExampleCard>
    </div>
  );
}
