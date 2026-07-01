import { CodeBlockView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

// ─── Sample code strings ──────────────────────────────────────────────────────
const jsonExample = `{
  "user": {
    "id": 42,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "roles": ["admin", "editor"],
    "active": true
  },
  "meta": {
    "requestId": "req_abc123",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}`;

const yamlExample = `server:
  host: api.example.com
  port: 8443
  tls:
    enabled: true
    cert: /etc/ssl/certs/server.crt
    key:  /etc/ssl/private/server.key

database:
  url: postgres://user:pass@db:5432/myapp
  pool_size: 10
  max_overflow: 20`;

const graphqlExample = `query GetUserProfile($userId: ID!, $includeOrders: Boolean = false) {
  user(id: $userId) {
    id
    name
    email
    avatar
    orders @include(if: $includeOrders) {
      id
      total
      status
      createdAt
    }
  }
}`;

const curlExample = `curl -X POST https://api.example.com/v1/users \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiJ9...' \\
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "editor"
  }'`;

const smallCodeExample = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`;

// ─── Export ───────────────────────────────────────────────────────────────────
export function CodeBlockViewExamples() {
  return (
    <div>
      <ExampleCard
        title="JSON Response Block"
        description="language=&quot;json&quot; · showCopyButton (default) · syntax-highlighted"
        code={`<CodeBlockView code={jsonResponse} language="json" />`}
      >
        <CodeBlockView code={jsonExample} language="json" />
      </ExampleCard>

      <ExampleCard
        title="YAML Config Example"
        description="language=&quot;yaml&quot; · common for environment config or OpenAPI specs"
        code={`<CodeBlockView code={yamlConfig} language="yaml" maxHeight="220px" />`}
      >
        <CodeBlockView code={yamlExample} language="yaml" maxHeight="220px" />
      </ExampleCard>

      <ExampleCard
        title="GraphQL Query Block"
        description="language=&quot;graphql&quot; via auto-highlight · operations with variables and directives"
        code={`<CodeBlockView code={gqlQuery} language="graphql" maxHeight="220px" />`}
      >
        <CodeBlockView code={graphqlExample} maxHeight="220px" />
      </ExampleCard>

      <ExampleCard
        title="cURL Command Block"
        description="language=&quot;bash&quot; · copyable cURL snippet generated from request"
        code={`<CodeBlockView code={curlCommand} language="bash" />`}
      >
        <CodeBlockView code={curlExample} language="bash" />
      </ExampleCard>

      <ExampleCard
        title="Line Numbers Enabled"
        description="showLineNumbers=true — useful for long responses where line references matter"
        code={`<CodeBlockView code={jsonResponse} language="json" showLineNumbers />`}
      >
        <CodeBlockView code={jsonExample} language="json" showLineNumbers maxHeight="260px" />
      </ExampleCard>

      <ExampleCard
        title="Small Inline Code Block (no copy)"
        description="showCopyButton=false · compact token / key display"
        code={`<CodeBlockView code={token} showCopyButton={false} maxHeight="60px" />`}
      >
        <CodeBlockView
          code={smallCodeExample}
          showCopyButton={false}
          maxHeight="60px"
          accentColor="var(--color-protocol-rest)"
        />
      </ExampleCard>

      <ExampleCard
        title="Protocol-Accented Block"
        description="accentColor overrides the default header border/accent to match a protocol theme"
        code={`<CodeBlockView code={query} language="graphql"
  accentColor="var(--color-protocol-graphql)" />`}
      >
        <CodeBlockView
          code={graphqlExample}
          language="graphql"
          accentColor="var(--color-protocol-graphql)"
          maxHeight="180px"
        />
      </ExampleCard>
    </div>
  );
}
