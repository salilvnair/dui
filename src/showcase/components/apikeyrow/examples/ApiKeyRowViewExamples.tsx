import { useState } from 'react';
import { ApiKeyRowView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function ApiKeyRowViewExamples() {
  const [revoked, setRevoked] = useState(false);

  return (
    <div>
      <ExampleCard
        title="Basic Masked Key Row"
        description="Default row — key is masked until the reveal icon is clicked"
        code={`<ApiKeyRowView label="Production" apiKey="sk_live_••••••••••••" onRevoke={revoke} />`}
      >
        <ApiKeyRowView label="Production" apiKey="sk_live_••••••••••••" onRevoke={() => {}} />
      </ExampleCard>

      <ExampleCard
        title="Interactive Revoke Flow"
        description="Revoking swaps the row for a confirmation message — a realistic settings-page interaction"
        code={`const [revoked, setRevoked] = useState(false);

{revoked ? (
  <div>Key revoked. Generate a new one to restore access.</div>
) : (
  <ApiKeyRowView label="Staging" apiKey="sk_test_4eC39HqLyjWDarjt" onRevoke={() => setRevoked(true)} />
)}`}
      >
        {revoked ? (
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', padding: '8px 0' }}>
            Key revoked. Generate a new one to restore access.
          </div>
        ) : (
          <ApiKeyRowView label="Staging" apiKey="sk_test_4eC39HqLyjWDarjt" onRevoke={() => setRevoked(true)} />
        )}
      </ExampleCard>

      <ExampleCard
        title="API Key List (Settings Page)"
        description="Multiple keys with different labels and lifetimes stacked in a settings panel"
        code={`<ApiKeyRowView label="Production"  apiKey="sk_live_••••••••••••abcd" onRevoke={revoke} />
<ApiKeyRowView label="Staging"     apiKey="sk_test_4eC39HqLyjWDarjt" onRevoke={revoke} />
<ApiKeyRowView label="CI Pipeline" apiKey="sk_ci_9f8e7d6c5b4a3f2e" onRevoke={revoke} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ApiKeyRowView label="Production" apiKey="sk_live_••••••••••••abcd" onRevoke={() => {}} />
          <ApiKeyRowView label="Staging" apiKey="sk_test_4eC39HqLyjWDarjt" onRevoke={() => {}} />
          <ApiKeyRowView label="CI Pipeline" apiKey="sk_ci_9f8e7d6c5b4a3f2e" onRevoke={() => {}} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Compact Size, No Revoke"
        description="size='sm' with onRevoke omitted — read-only key row for a viewer role"
        code={`<ApiKeyRowView label="Read-only key" apiKey="sk_view_1a2b3c4d5e6f7g8h" size="sm" />`}
      >
        <ApiKeyRowView label="Read-only key" apiKey="sk_view_1a2b3c4d5e6f7g8h" size="sm" />
      </ExampleCard>

      <ExampleCard
        title="Short Key (Edge Case Masking)"
        description="Keys of 8 characters or fewer are fully masked with dots instead of a prefix/suffix reveal"
        code={`<ApiKeyRowView label="Legacy token" apiKey="ab12cd" onRevoke={revoke} />`}
      >
        <ApiKeyRowView label="Legacy token" apiKey="ab12cd" onRevoke={() => {}} />
      </ExampleCard>
    </div>
  );
}
