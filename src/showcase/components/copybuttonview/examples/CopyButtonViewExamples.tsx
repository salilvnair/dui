import { CopyButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const RESPONSE_BODY = JSON.stringify({
  userId: 42,
  name: 'Alice Nakamura',
  email: 'alice@example.com',
  roles: ['admin', 'editor'],
}, null, 2);

const CURL_COMMAND = `curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer eyJhbGci..." \\
  -d '{"name":"Alice","email":"alice@example.com"}'`;

const API_TOKEN = 'sk-daakia-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

export function CopyButtonViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Copy Response Body"
        description="Standalone copy button next to a JSON response panel"
        code={`<CopyButtonView text={responseBody} size="md" title="Copy response body" />`}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <pre style={{ flex: 1, margin: 0, padding: '10px 12px', fontSize: 11.5, fontFamily: 'monospace', background: 'var(--color-panel)', borderRadius: 6, border: '1px solid var(--color-surface-border)', color: 'var(--color-text-secondary)', overflow: 'auto', maxHeight: 140 }}>
            {RESPONSE_BODY}
          </pre>
          <CopyButtonView text={RESPONSE_BODY} size="md" title="Copy response body" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Copy cURL Command"
        description="Copies the equivalent cURL for the current request — useful in Share toolbar"
        code={`<CopyButtonView text={curlCommand} size="md" title="Copy as cURL" />`}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <pre style={{ flex: 1, margin: 0, padding: '10px 12px', fontSize: 11, fontFamily: 'monospace', background: 'var(--color-panel)', borderRadius: 6, border: '1px solid var(--color-surface-border)', color: 'var(--color-text-secondary)', overflow: 'auto' }}>
            {CURL_COMMAND}
          </pre>
          <CopyButtonView text={CURL_COMMAND} size="md" title="Copy as cURL" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Copy API Token (Masked)"
        description="Token is masked in the UI but the full value is copied to clipboard"
        code={`<CopyButtonView text={apiToken} size="sm" accentColor="var(--color-warning)" title="Copy API token" />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'var(--color-panel)', borderRadius: 6, border: '1px solid var(--color-surface-border)' }}>
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>sk-daakia-••••••••••••••••••••••••••••••••</span>
          <CopyButtonView text={API_TOKEN} size="sm" accentColor="var(--color-warning)" title="Copy API token" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants — xs / sm / md"
        description="Copy button at every DUI size to fit different toolbar densities"
        code={`<CopyButtonView text="xs" size="xs" />
<CopyButtonView text="sm" size="sm" />
<CopyButtonView text="md" size="md" />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {(['xs', 'sm', 'md'] as const).map(size => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <CopyButtonView text={`copy ${size}`} size={size} title={`Copy (${size})`} />
              <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>{size}</span>
            </div>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Inline with Code Snippet"
        description="Copy button embedded in a code block header — standard pattern for code panels"
        code={`<div className="code-block-header">
  <span>javascript</span>
  <CopyButtonView text={snippet} size="xs" />
</div>`}
      >
        <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--color-surface-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px', background: 'color-mix(in srgb, var(--color-surface-border) 40%, transparent)' }}>
            <span style={{ fontSize: 11, color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>javascript</span>
            <CopyButtonView text={`fetch('/api/users').then(r => r.json()).then(console.log)`} size="xs" title="Copy snippet" />
          </div>
          <pre style={{ margin: 0, padding: '10px 14px', fontSize: 12, fontFamily: 'monospace', background: 'var(--color-panel)', color: 'var(--color-text-secondary)' }}>
            {"fetch('/api/users')\n  .then(r => r.json())\n  .then(console.log)"}
          </pre>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Multiple Copy Buttons in a Toolbar"
        description="Share toolbar with separate copy actions for different formats"
        code={`<CopyButtonView text={url}      size="xs" title="Copy URL"      accentColor="var(--color-primary)"  />
<CopyButtonView text={curl}     size="xs" title="Copy cURL"     accentColor="var(--color-info)"     />
<CopyButtonView text={response} size="xs" title="Copy response" accentColor="var(--color-success)"  />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 10px', background: 'var(--color-panel)', borderRadius: 6, border: '1px solid var(--color-surface-border)', width: 'fit-content' }}>
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)', marginRight: 6 }}>Copy as:</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CopyButtonView text="https://api.example.com/users"   size="xs" title="Copy URL"      accentColor="var(--color-primary)" />
            <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>URL</span>
          </div>
          <div style={{ width: 1, height: 14, background: 'var(--color-surface-border)', margin: '0 4px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CopyButtonView text={CURL_COMMAND} size="xs" title="Copy cURL" accentColor="var(--color-info)" />
            <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>cURL</span>
          </div>
          <div style={{ width: 1, height: 14, background: 'var(--color-surface-border)', margin: '0 4px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CopyButtonView text={RESPONSE_BODY} size="xs" title="Copy response" accentColor="var(--color-success)" />
            <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>Response</span>
          </div>
        </div>
      </ExampleCard>
    </div>
  );
}
