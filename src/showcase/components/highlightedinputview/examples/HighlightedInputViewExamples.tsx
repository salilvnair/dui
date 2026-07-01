import { useState } from 'react';
import { HighlightedInputView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const ENV_SUGGESTIONS = [
  'https://{{baseUrl}}/users/{{userId}}',
  'https://{{baseUrl}}/auth/token',
  'https://{{apiGateway}}/v2/products',
  'https://{{host}}:{{port}}/health',
];

export function HighlightedInputViewExamples() {
  const [url1, setUrl1] = useState('https://{{baseUrl}}/users/{{userId}}');
  const [url2, setUrl2] = useState('');
  const [url3, setUrl3] = useState('https://{{apiGateway}}/v2/products/{{productId}}?category={{category}}');
  const [url4] = useState('https://{{host}}/api/v1/orders/{{orderId}}');
  const [url5, setUrl5] = useState('https://{{scheme}}://{{host}}:{{port}}/{{version}}/{{resource}}');

  return (
    <div>
      <ExampleCard
        title="REST URL with Variable Highlights"
        description="{{baseUrl}} and {{userId}} are highlighted inline — edit freely"
        code={`<HighlightedInputView value={url} onChange={setUrl} placeholder="Enter URL…" borderRadius={6} />`}
      >
        <HighlightedInputView
          value={url1}
          onChange={setUrl1}
          placeholder="https://{{baseUrl}}/users/{{userId}}"
          borderRadius={6}
          height={32}
        />
      </ExampleCard>

      <ExampleCard
        title="With Environment Suggestions Dropdown"
        description="Type a URL to see matching suggestions from the environment history"
        code={`<HighlightedInputView value={url} onChange={setUrl} suggestions={ENV_SUGGESTIONS} borderRadius={6} />`}
      >
        <HighlightedInputView
          value={url2}
          onChange={setUrl2}
          placeholder="Type a URL to see suggestions…"
          suggestions={ENV_SUGGESTIONS}
          borderRadius={6}
          height={32}
        />
      </ExampleCard>

      <ExampleCard
        title="Multi-Variable URL"
        description="Several variables in one URL — each highlighted independently"
        code={`<HighlightedInputView value="https://{{apiGateway}}/v2/products/{{productId}}?category={{category}}" onChange={setUrl} />`}
      >
        <HighlightedInputView
          value={url3}
          onChange={setUrl3}
          placeholder="Enter URL…"
          borderRadius={6}
          height={32}
        />
      </ExampleCard>

      <ExampleCard
        title="Read-Only Highlighted URL"
        description="Disabled state — highlights are visible but not editable"
        code={`<HighlightedInputView value={url} onChange={() => {}} disabled />`}
      >
        <HighlightedInputView
          value={url4}
          onChange={() => {}}
          disabled
          borderRadius={6}
          height={32}
        />
      </ExampleCard>

      <ExampleCard
        title="Dense Multi-Variable URL"
        description="Every segment of the URL path is a variable"
        code={`<HighlightedInputView value="https://{{scheme}}://{{host}}:{{port}}/{{version}}/{{resource}}" onChange={setUrl} />`}
      >
        <HighlightedInputView
          value={url5}
          onChange={setUrl5}
          placeholder="Enter URL…"
          borderRadius={6}
          height={32}
        />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="size prop sets input height via DUI size scale — xs through lg"
        code={`<HighlightedInputView value={url} size="xs" />
<HighlightedInputView value={url} size="sm" />
<HighlightedInputView value={url} size="md" />
<HighlightedInputView value={url} size="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(['xs', 'sm', 'md', 'lg'] as const).map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 10, color: 'var(--color-text-muted)', width: 20 }}>{s}</span>
              <div style={{ flex: 1 }}>
                <HighlightedInputView
                  value="https://{{baseUrl}}/users/{{userId}}"
                  onChange={() => {}}
                  size={s}
                  borderRadius={6}
                />
              </div>
            </div>
          ))}
        </div>
      </ExampleCard>
    </div>
  );
}
