import { useState } from 'react';
import { IntegrationCardView } from '@/dui';
import { GlobeIcon, BellIcon, ServerIcon } from '@/icons';
import { ExampleCard } from '../../../shared/ExampleCard';

export function IntegrationCardViewExamples() {
  const [chatConnected, setChatConnected] = useState(false);
  const [github, setGithub] = useState(true);

  return (
    <div>
      <ExampleCard
        title="Basic Card (Disconnected)"
        description="Default disconnected integration with a Connect CTA"
        code={`<IntegrationCardView logo={<GlobeIcon size={18} />} name="Team Chat" connected={false} onConnect={connect} onDisconnect={disconnect} />`}
      >
        <div style={{ maxWidth: 360 }}>
          <IntegrationCardView logo={<GlobeIcon size={18} />} name="Team Chat" connected={false} onConnect={() => {}} onDisconnect={() => {}} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Interactive Connect/Disconnect"
        description="Toggling state flips the button label and style — a real integrations marketplace interaction"
        code={`function Preview() {
  const [connected, setConnected] = useState(false);
  return (
    <IntegrationCardView
      logo={<GlobeIcon size={18} />}
      name="Team Chat"
      description="Send request failures to a channel"
      connected={connected}
      onConnect={() => setConnected(true)}
      onDisconnect={() => setConnected(false)}
    />
  );
}`}
      >
        <div style={{ maxWidth: 360 }}>
          <IntegrationCardView
            logo={<GlobeIcon size={18} />}
            name="Team Chat"
            description="Send request failures to a channel"
            connected={chatConnected}
            onConnect={() => setChatConnected(true)}
            onDisconnect={() => setChatConnected(false)}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Integrations Marketplace Grid"
        description="Multiple integration cards for an API-testing tool's integrations page"
        code={`<IntegrationCardView logo={<ServerIcon size={18} />} name="PostgreSQL" description="Query databases directly from requests" connected onConnect={connect} onDisconnect={disconnect} />
<IntegrationCardView logo={<BellIcon size={18} />} name="PagerDuty" description="Alert on-call for failing monitors" connected={false} onConnect={connect} onDisconnect={disconnect} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 360 }}>
          <IntegrationCardView logo={<ServerIcon size={18} />} name="PostgreSQL" description="Query databases directly from requests" connected={github} onConnect={() => setGithub(true)} onDisconnect={() => setGithub(false)} />
          <IntegrationCardView logo={<BellIcon size={18} />} name="PagerDuty" description="Alert on-call for failing monitors" connected={false} onConnect={() => {}} onDisconnect={() => {}} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="Themed Connect button for a specific integration brand"
        code={`<IntegrationCardView logo={<GlobeIcon size={18} />} name="GraphQL Hub" connected={false} onConnect={connect} onDisconnect={disconnect} color="var(--color-protocol-graphql)" />`}
      >
        <div style={{ maxWidth: 360 }}>
          <IntegrationCardView logo={<GlobeIcon size={18} />} name="GraphQL Hub" connected={false} onConnect={() => {}} onDisconnect={() => {}} color="var(--color-protocol-graphql)" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="No Description (Edge Case)"
        description="description is optional — the card collapses to just logo, name, and action"
        code={`<IntegrationCardView logo={<GlobeIcon size={18} />} name="Webhook Relay" connected onConnect={connect} onDisconnect={disconnect} />`}
      >
        <div style={{ maxWidth: 360 }}>
          <IntegrationCardView logo={<GlobeIcon size={18} />} name="Webhook Relay" connected onConnect={() => {}} onDisconnect={() => {}} />
        </div>
      </ExampleCard>
    </div>
  );
}
