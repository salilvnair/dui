import { useState } from 'react';
import { RadioCardView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { SparkleIcon, LockIcon, GlobeIcon } from '@/icons';

export function RadioCardViewExamples() {
  const [plan, setPlan] = useState('pro');
  const [authMethod, setAuthMethod] = useState('bearer');
  const [region, setRegion] = useState('us-east');
  const [accent, setAccent] = useState('team');
  const [readOnlyChoice] = useState('archived');

  return (
    <div>
      <ExampleCard
        title="Default Single-Column List"
        description="Stacked radio cards for a simple environment picker"
        code={`const [env, setEnv] = useState('staging');

<RadioCardView
  value={env}
  onChange={setEnv}
  options={[
    { value: 'dev', label: 'Development', description: 'Local mock server' },
    { value: 'staging', label: 'Staging', description: 'Shared QA environment' },
    { value: 'prod', label: 'Production', description: 'Live traffic — use with care' },
  ]}
/>`}
      >
        <RadioCardView
          value={region}
          onChange={setRegion}
          options={[
            { value: 'us-east', label: 'US East', description: 'N. Virginia — lowest latency for US clients' },
            { value: 'eu-west', label: 'EU West', description: 'Ireland — GDPR compliant storage' },
            { value: 'ap-south', label: 'AP South', description: 'Mumbai — best for APAC traffic' },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Interactive Auth Method Picker"
        description="Stateful selection with a live summary readout below the cards"
        code={`const [authMethod, setAuthMethod] = useState('bearer');

<RadioCardView
  value={authMethod}
  onChange={setAuthMethod}
  columns={3}
  options={[
    { value: 'none', label: 'No Auth', icon: <GlobeIcon size={16} /> },
    { value: 'bearer', label: 'Bearer Token', icon: <LockIcon size={16} /> },
    { value: 'apikey', label: 'API Key', icon: <SparkleIcon size={16} /> },
  ]}
/>
<p>Selected: {authMethod}</p>`}
      >
        <RadioCardView
          value={authMethod}
          onChange={setAuthMethod}
          columns={3}
          options={[
            { value: 'none', label: 'No Auth', description: 'Public endpoint', icon: <GlobeIcon size={16} /> },
            { value: 'bearer', label: 'Bearer Token', description: 'Authorization header', icon: <LockIcon size={16} /> },
            { value: 'apikey', label: 'API Key', description: 'x-api-key header', icon: <SparkleIcon size={16} /> },
          ]}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Auth mode: <strong style={{ color: 'var(--color-text-primary)' }}>{authMethod}</strong>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Columns, Size & Accent Color Showcase"
        description="Grid layout via columns, size prop, and a custom accentColor"
        code={`<RadioCardView
  value={accent}
  onChange={setAccent}
  columns={2}
  size="lg"
  accentColor="var(--color-protocol-graphql)"
  options={[
    { value: 'solo', label: 'Solo Workspace' },
    { value: 'team', label: 'Team Workspace' },
  ]}
/>`}
      >
        <RadioCardView
          value={accent}
          onChange={setAccent}
          columns={2}
          size="lg"
          accentColor="var(--color-protocol-graphql)"
          options={[
            { value: 'solo', label: 'Solo Workspace', description: 'Just you, private collections' },
            { value: 'team', label: 'Team Workspace', description: 'Shared collections & environments' },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Billing Plan Selector"
        description="Domain-realistic pricing-tier picker for an API testing tool's upgrade flow"
        code={`const [plan, setPlan] = useState('pro');

<RadioCardView
  columns={3}
  value={plan}
  onChange={setPlan}
  options={[
    { value: 'free', label: 'Free', description: '100 requests/mo, 3 collections' },
    { value: 'pro', label: 'Pro', description: 'Unlimited requests, mock servers', icon: <SparkleIcon size={16} /> },
    { value: 'team', label: 'Team', description: 'Shared workspaces, RBAC, SSO' },
  ]}
/>`}
      >
        <RadioCardView
          columns={3}
          value={plan}
          onChange={setPlan}
          options={[
            { value: 'free', label: 'Free', description: '100 requests/mo, 3 collections' },
            { value: 'pro', label: 'Pro', description: 'Unlimited requests, mock servers', icon: <SparkleIcon size={16} /> },
            { value: 'team', label: 'Team', description: 'Shared workspaces, RBAC, SSO' },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Disabled Option (Edge Case)"
        description="Individual options can be disabled — e.g. a plan tier unavailable for the current billing cycle"
        code={`<RadioCardView
  value={choice}
  onChange={setChoice}
  options={[
    { value: 'active', label: 'Active Collection' },
    { value: 'archived', label: 'Archived Collection', description: 'Read-only, cannot be edited', disabled: true },
  ]}
/>`}
      >
        <RadioCardView
          value={readOnlyChoice}
          onChange={() => {}}
          options={[
            { value: 'active', label: 'Active Collection', description: 'Currently syncing with remote' },
            { value: 'archived', label: 'Archived Collection', description: 'Read-only, cannot be edited', disabled: true },
          ]}
        />
      </ExampleCard>
    </div>
  );
}
