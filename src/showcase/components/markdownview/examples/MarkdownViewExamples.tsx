import { MarkdownView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const AI_RESPONSE = `## Summary

The \`/api/users\` endpoint returns a paginated list of users.

### Authentication

Pass your API key in the \`Authorization\` header:

\`\`\`http
Authorization: Bearer YOUR_API_KEY
\`\`\`

### Response

\`\`\`json
{
  "data": [{ "id": 1, "name": "Alice" }],
  "total": 42,
  "page": 1
}
\`\`\`

> **Tip:** Use \`?limit=10&offset=0\` query params for pagination.
`;

const GQL_SCHEMA_DOC = `## User Type

Represents an authenticated user in the system.

\`\`\`graphql
type User {
  id: ID!
  name: String!
  email: String!
  roles: [Role!]!
  createdAt: DateTime!
}

enum Role {
  ADMIN
  EDITOR
  VIEWER
}
\`\`\`

### Fields

| Field | Type | Description |
|-------|------|-------------|
| \`id\` | \`ID!\` | Unique identifier |
| \`name\` | \`String!\` | Display name |
| \`email\` | \`String!\` | Login email |
| \`roles\` | \`[Role!]!\` | Assigned roles |
`;

const ENDPOINT_DESCRIPTION = `## POST /api/orders

Creates a new order for the authenticated user.

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| \`items\` | \`array\` | ✅ | List of order line items |
| \`coupon\` | \`string\` | ❌ | Discount coupon code |
| \`shipping\` | \`object\` | ✅ | Shipping address |

### Status Codes

- **201 Created** — Order placed successfully
- **400 Bad Request** — Validation error (missing items)
- **402 Payment Required** — Payment method failed
- **429 Too Many Requests** — Rate limit exceeded
`;

const README_CONTENT = `# daakia-client

![Version](https://img.shields.io/badge/version-2.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A powerful API client for VS Code.

## Features

- REST, GraphQL, WebSocket, gRPC, SOAP support
- AI-powered query builder
- Environment variables & secret management
- Mock server with OpenAPI import

## Quick Start

1. Install the extension from the VS Code Marketplace
2. Open the Command Palette → **Daakia: New Request**
3. Enter your endpoint and press **Send**

[View full docs →](https://daakia.dev/docs)
`;

const TASK_LIST = `## Sprint 4 — Done

- [x] Migrate modals to DUI ModalView
- [x] Add CopyButtonView to response toolbar
- [x] Wire up MarkdownView for AI responses
- [ ] Add streaming support to MarkdownView
- [ ] Export response as PDF

## Notes

All completed tasks were reviewed and merged to \`main\` on 2024-06-15.
`;

const CODE_ONLY = `\`\`\`typescript
import { DaakiaClient } from 'daakia-client';

const client = new DaakiaClient({
  baseUrl: 'https://api.example.com',
  apiKey: process.env.API_KEY,
});

const users = await client.get('/users', {
  params: { limit: 10, page: 1 },
});

console.log(users.data);
\`\`\``;

export function MarkdownViewExamples() {
  return (
    <div>
      <ExampleCard
        title="AI Response with Headers and Code Blocks"
        description="Typical AI assistant reply — headers, inline code, fenced blocks, and a blockquote"
        code={`<MarkdownView content={aiResponse} />`}
      >
        <MarkdownView content={AI_RESPONSE} />
      </ExampleCard>

      <ExampleCard
        title="GraphQL Schema Documentation"
        description="Schema type definition with a field reference table"
        code={`<MarkdownView content={gqlSchemaDoc} />`}
      >
        <MarkdownView content={GQL_SCHEMA_DOC} />
      </ExampleCard>

      <ExampleCard
        title="Endpoint Description with a Table"
        description="REST endpoint docs — request body table and status code list"
        code={`<MarkdownView content={endpointDescription} />`}
      >
        <MarkdownView content={ENDPOINT_DESCRIPTION} />
      </ExampleCard>

      <ExampleCard
        title="README-Style Content"
        description="Badges, feature list, numbered steps, and an external link"
        code={`<MarkdownView content={readmeContent} />`}
      >
        <MarkdownView content={README_CONTENT} />
      </ExampleCard>

      <ExampleCard
        title="Task List with Checkboxes"
        description="GFM task list — completed items are checked, pending are open"
        code={`<MarkdownView content={taskList} />`}
      >
        <MarkdownView content={TASK_LIST} />
      </ExampleCard>

      <ExampleCard
        title="Pure Code Block Response"
        description="When the AI returns only a code snippet — no prose"
        code={`<MarkdownView content={codeOnly} />`}
      >
        <MarkdownView content={CODE_ONLY} />
      </ExampleCard>
    </div>
  );
}
