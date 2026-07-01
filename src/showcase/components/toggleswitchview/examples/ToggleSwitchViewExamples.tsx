import { useState } from 'react';
import { ToggleSwitchView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ToggleSwitchViewExamples() {
  const [ssl,         setSsl]         = useState(true);
  const [redirects,   setRedirects]   = useState(true);
  const [autoSave,    setAutoSave]    = useState(false);
  const [prettyPrint, setPrettyPrint] = useState(true);
  const [proxyEnabled, setProxyEnabled] = useState(false);

  return (
    <div>
      <ExampleCard
        title="Enable SSL Verification"
        description="Security setting toggle in the request config panel"
        code={`const [ssl, setSsl] = useState(true);

<ToggleSwitchView
  checked={ssl}
  onChange={setSsl}
  label="Verify SSL certificates"
  accentColor="var(--color-success)"
/>`}
      >
        <ToggleSwitchView
          checked={ssl}
          onChange={setSsl}
          label="Verify SSL certificates"
          accentColor="var(--color-success)"
        />
      </ExampleCard>

      <ExampleCard
        title="Follow Redirects"
        description="HTTP client setting — automatically follow 3xx redirect responses"
        code={`<ToggleSwitchView
  checked={redirects}
  onChange={setRedirects}
  label="Follow redirects"
/>`}
      >
        <ToggleSwitchView
          checked={redirects}
          onChange={setRedirects}
          label="Follow redirects"
        />
      </ExampleCard>

      <ExampleCard
        title="Auto-Save Response"
        description="Toggle whether the response is automatically saved to history"
        code={`<ToggleSwitchView
  checked={autoSave}
  onChange={setAutoSave}
  label="Save response automatically"
  accentColor="var(--color-protocol-rest)"
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ToggleSwitchView
            checked={autoSave}
            onChange={setAutoSave}
            label="Save response automatically"
            accentColor="var(--color-protocol-rest)"
          />
          <ToggleSwitchView
            checked={prettyPrint}
            onChange={setPrettyPrint}
            label="Pretty-print JSON responses"
            accentColor="var(--color-protocol-rest)"
          />
          <ToggleSwitchView
            checked={proxyEnabled}
            onChange={setProxyEnabled}
            label="Route through proxy"
            accentColor="var(--color-warning)"
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm / md / lg — pick the size that fits your settings layout"
        code={`<ToggleSwitchView checked={v} onChange={setV} size="sm"  label="sm toggle" />
<ToggleSwitchView checked={v} onChange={setV} size="md"  label="md toggle (default)" />
<ToggleSwitchView checked={v} onChange={setV} size="lg"  label="lg toggle" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ToggleSwitchView checked={ssl} onChange={setSsl} size="sm"  label="sm — compact" />
          <ToggleSwitchView checked={ssl} onChange={setSsl} size="md"  label="md — default" />
          <ToggleSwitchView checked={ssl} onChange={setSsl} size="lg"  label="lg — prominent" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Label Position — Left vs Right"
        description="labelPosition='left' places the label before the switch track"
        code={`<ToggleSwitchView checked={v} onChange={setV} label="Label on right (default)" labelPosition="right" />
<ToggleSwitchView checked={v} onChange={setV} label="Label on left"           labelPosition="left" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ToggleSwitchView
            checked={redirects}
            onChange={setRedirects}
            label="Label on right (default)"
            labelPosition="right"
          />
          <ToggleSwitchView
            checked={redirects}
            onChange={setRedirects}
            label="Label on left"
            labelPosition="left"
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled State"
        description="Non-interactive toggle — locked by policy or read-only context"
        code={`<ToggleSwitchView checked={true}  onChange={() => {}} disabled label="Enforced ON (policy)" />
<ToggleSwitchView checked={false} onChange={() => {}} disabled label="Locked OFF" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ToggleSwitchView checked={true}  onChange={() => {}} disabled label="Enforced ON (policy)" />
          <ToggleSwitchView checked={false} onChange={() => {}} disabled label="Locked OFF" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Protocol-Colored Toggles"
        description="accentColor matches the current protocol — used in per-protocol settings panels"
        code={`<ToggleSwitchView checked={v} onChange={setV} label="REST: Enable cache" accentColor="var(--color-protocol-rest)" />
<ToggleSwitchView checked={v} onChange={setV} label="GQL: Introspection" accentColor="var(--color-protocol-graphql)" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'REST: Enable response caching',   color: 'var(--color-protocol-rest)' },
            { label: 'GQL: Send introspection query',   color: 'var(--color-protocol-graphql)' },
            { label: 'WS: Auto-reconnect on drop',      color: 'var(--color-protocol-websocket)' },
            { label: 'gRPC: Use TLS / mTLS',            color: 'var(--color-protocol-grpc)' },
          ].map(({ label, color }, i) => (
            <ToggleSwitchView
              key={label}
              checked={i % 2 === 0}
              onChange={() => {}}
              label={label}
              accentColor={color}
            />
          ))}
        </div>
      </ExampleCard>
    </div>
  );
}
