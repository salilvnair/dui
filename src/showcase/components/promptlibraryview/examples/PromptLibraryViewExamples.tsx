import { useState } from 'react';
import { PromptLibraryListView, PromptLibraryEditorView } from '@/dui';
import type { PromptLibrarySection, PromptLibraryVariable } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const SECTIONS: PromptLibrarySection[] = [
  {
    id: 'built-in',
    title: 'Built-in Prompts',
    categories: [
      {
        id: 'rest',
        title: 'REST',
        items: [
          { id: 'rest-agent', title: 'REST API Agent', description: 'Generate REST requests', protocol: 'REST', protocolColor: 'var(--color-protocol-rest)' },
          { id: 'curl-convert', title: 'cURL Converter', description: 'Convert cURL to Daakia request', protocol: 'REST', protocolColor: 'var(--color-protocol-rest)' },
        ],
      },
      {
        id: 'graphql',
        title: 'GraphQL',
        items: [
          { id: 'gql-builder', title: 'GraphQL Query Builder', description: 'Natural language to GQL', protocol: 'GraphQL', protocolColor: 'var(--color-protocol-gql)' },
          { id: 'schema-explain', title: 'Schema Explainer', description: 'Explain GQL schema in plain English', protocol: 'GraphQL', protocolColor: 'var(--color-protocol-gql)' },
        ],
      },
    ],
  },
  {
    id: 'custom',
    title: 'My Prompts',
    categories: [
      {
        id: 'my',
        title: 'Custom',
        items: [
          { id: 'auth-gen', title: 'Auth Header Generator', isCustom: true, protocol: 'REST', protocolColor: 'var(--color-protocol-rest)' },
        ],
      },
    ],
  },
];

const EMPTY_SECTIONS: PromptLibrarySection[] = [
  {
    id: 'built-in',
    title: 'Built-in Prompts',
    categories: [
      {
        id: 'rest',
        title: 'REST',
        items: [],
      },
    ],
  },
];

const EDITOR_VARIABLES: PromptLibraryVariable[] = [
  { pill: '{{url}}', insert: '{{url}}', title: 'Active request URL' },
  { pill: '{{method}}', insert: '{{method}}', title: 'HTTP method' },
  { pill: '{{responseBody}}', insert: '{{responseBody}}', title: 'Last response body' },
  { pill: '{{curlCommand}}', insert: '{{curlCommand}}', title: 'cURL equivalent' },
];

export function PromptLibraryViewExamples() {
  const [activeId, setActiveId] = useState<string | undefined>('rest-agent');
  const [search, setSearch] = useState('');
  const [editorContent, setEditorContent] = useState(
    'You are a REST API expert. Given {{url}} and {{method}}, generate a well-formed HTTP request with appropriate headers and body.'
  );
  const [viewMode, setViewMode] = useState<'preview' | 'edit'>('preview');

  return (
    <div>
      <ExampleCard
        title="Full List with Search"
        description="Grouped library with search filter across all categories"
        code={`<PromptLibraryListView sections={sections} activeId={activeId} onSelect={setActiveId} search={search} onSearchChange={setSearch} />`}
      >
        <div style={{ height: 280, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <PromptLibraryListView
            sections={SECTIONS}
            activeId={activeId}
            onSelect={setActiveId}
            search={search}
            onSearchChange={setSearch}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Editor View — Single Prompt"
        description="Preview and edit a prompt with variable pills — switch between Preview and Edit tabs"
        code={`<PromptLibraryEditorView title="REST API Agent" content={content} onContentChange={setContent} variables={variables} viewMode={viewMode} onViewModeChange={setViewMode} />`}
      >
        <div style={{ height: 300 }}>
          <PromptLibraryEditorView
            title="REST API Agent"
            description="Generate REST requests from a plain-English description"
            avatarColor="var(--color-protocol-rest)"
            content={editorContent}
            onContentChange={setEditorContent}
            variables={EDITOR_VARIABLES}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onSave={() => alert('Saved!')}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Empty Search Results"
        description="Filtered state when no prompts match the query"
        code={`<PromptLibraryListView sections={sections} search="nonexistent" onSearchChange={setSearch} />`}
      >
        <div style={{ height: 180 }}>
          <PromptLibraryListView
            sections={EMPTY_SECTIONS}
            search="nonexistent query"
            onSearchChange={() => {}}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="New Prompt Editor"
        description="Empty editor ready for creating a new custom prompt"
        code={`<PromptLibraryEditorView title="New Prompt" content="" isCustom viewMode="edit" onContentChange={setContent} />`}
      >
        <div style={{ height: 240 }}>
          <PromptLibraryEditorView
            title="New Prompt"
            description="Write a custom prompt for your workflow"
            avatarColor="var(--color-primary)"
            content=""
            onContentChange={() => {}}
            variables={EDITOR_VARIABLES}
            viewMode="edit"
            onViewModeChange={() => {}}
            isCustom
            onSave={() => alert('Created!')}
          />
        </div>
      </ExampleCard>
    </div>
  );
}
