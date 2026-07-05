import { useState } from 'react';
import { AccordionGroupView, type AccordionGroupItem } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const requestSections: AccordionGroupItem[] = [
  { id: 'headers', title: 'Headers', badge: 4, children: <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Content-Type, Authorization, Accept, X-Request-Id</div> },
  { id: 'params', title: 'Query Params', badge: 2, children: <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>page=1, limit=25</div> },
  { id: 'body', title: 'Body', children: <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{'{ "name": "New Endpoint" }'}</div> },
  { id: 'auth', title: 'Authorization', children: <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Bearer token (inherited from collection)</div> },
];

export function AccordionGroupViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Basic Single-Open Accordion"
        description="Default behavior: opening one section closes the others"
        code={`<AccordionGroupView
  items={[{ id: 'a', title: 'Headers', children: <div>...</div> }]}
  defaultOpen={['a']}
/>`}
      >
        <AccordionGroupView items={requestSections.slice(0, 2)} defaultOpen={['headers']} />
      </ExampleCard>

      <ExampleCard
        title="Request Panel Sections (multi-open)"
        description="A real request-builder layout — Headers, Query Params, Body, and Auth as independently toggleable sections"
        code={`<AccordionGroupView
  items={[
    { id: 'headers', title: 'Headers', badge: 4, children: <HeaderList /> },
    { id: 'params', title: 'Query Params', badge: 2, children: <ParamList /> },
    { id: 'body', title: 'Body', children: <BodyEditor /> },
    { id: 'auth', title: 'Authorization', children: <AuthPanel /> },
  ]}
  multiple
  defaultOpen={['headers']}
/>`}
      >
        <AccordionGroupView items={requestSections} multiple defaultOpen={['headers']} />
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="accentColor tints badges and the expand indicator"
        code={`<AccordionGroupView items={items} accentColor="var(--color-success)" defaultOpen={['headers']} />`}
      >
        <AccordionGroupView items={requestSections.slice(0, 2)} accentColor="var(--color-success)" defaultOpen={['headers']} />
      </ExampleCard>

      <ExampleCard
        title="Environment Variables Grouped by Scope"
        description="Domain-realistic use — Global, Collection, and Environment-scoped variables in collapsible groups"
        code={`<AccordionGroupView
  items={[
    { id: 'global', title: 'Global Variables', badge: 3, children: <VarTable scope="global" /> },
    { id: 'collection', title: 'Collection Variables', badge: 6, children: <VarTable scope="collection" /> },
    { id: 'env', title: 'Environment Variables', badge: 12, children: <VarTable scope="env" /> },
  ]}
  defaultOpen={['env']}
/>`}
      >
        <AccordionGroupView
          items={[
            { id: 'global', title: 'Global Variables', badge: 3, children: <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>BASE_URL, API_VERSION, TIMEOUT_MS</div> },
            { id: 'collection', title: 'Collection Variables', badge: 6, children: <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>6 collection-scoped variables</div> },
            { id: 'env', title: 'Environment Variables', badge: 12, children: <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>12 variables in "Production"</div> },
          ]}
          defaultOpen={['env']}
        />
      </ExampleCard>

      <ExampleCard
        title="All Collapsed (edge case)"
        description="defaultOpen omitted — every section starts closed"
        code={`<AccordionGroupView items={requestSections} />`}
      >
        <AccordionGroupView items={requestSections} />
      </ExampleCard>
    </div>
  );
}
