import { useState } from 'react';
import { BreadcrumbView } from '@/dui';
import type { BreadcrumbItem } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function BreadcrumbViewExamples() {
  const [lastClicked, setLastClicked] = useState('');

  const deepPath: BreadcrumbItem[] = [
    { label: 'Workspace', onClick: () => setLastClicked('Workspace') },
    { label: 'Users API', onClick: () => setLastClicked('Users API') },
    { label: 'v2', onClick: () => setLastClicked('v2') },
    { label: 'Auth', onClick: () => setLastClicked('Auth') },
    { label: 'Login', onClick: () => setLastClicked('Login') },
    { label: 'POST /login' },
  ];

  return (
    <div>
      <ExampleCard
        title="Basic Breadcrumb"
        description="A simple 2-level path trail"
        code={`<BreadcrumbView items={[{ label: 'Workspace', onClick: () => {} }, { label: 'Users API' }]} />`}
      >
        <BreadcrumbView items={[{ label: 'Workspace', onClick: () => {} }, { label: 'Users API' }]} />
      </ExampleCard>

      <ExampleCard
        title="Clickable Path Navigation (interactive)"
        description="Every non-final item is clickable — click any segment to 'navigate' there"
        code={`const [last, setLast] = useState('');

<BreadcrumbView items={[
  { label: 'Workspace', onClick: () => setLast('Workspace') },
  { label: 'Users API', onClick: () => setLast('Users API') },
  { label: 'Auth' },
]} />`}
      >
        <BreadcrumbView items={[
          { label: 'Workspace', onClick: () => setLastClicked('Workspace') },
          { label: 'Users API', onClick: () => setLastClicked('Users API') },
          { label: 'Auth' },
        ]} />
        {lastClicked && <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>Navigated to: {lastClicked}</div>}
      </ExampleCard>

      <ExampleCard
        title="Deep Path with Overflow Collapse"
        description="More than maxVisible items collapse the middle into a '…' — click it to expand"
        code={`<BreadcrumbView
  items={[
    { label: 'Workspace' }, { label: 'Users API' }, { label: 'v2' },
    { label: 'Auth' }, { label: 'Login' }, { label: 'POST /login' },
  ]}
  maxVisible={4}
/>`}
      >
        <BreadcrumbView items={deepPath} maxVisible={4} />
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="color tints the final (active) breadcrumb segment"
        code={`<BreadcrumbView items={[{ label: 'Collections' }, { label: 'Users API' }]} color="var(--color-success)" />`}
      >
        <BreadcrumbView items={[{ label: 'Collections', onClick: () => {} }, { label: 'Users API' }]} color="var(--color-success)" />
      </ExampleCard>

      <ExampleCard
        title="Single Item (edge case)"
        description="A single-segment path — no separator or collapse logic kicks in"
        code={`<BreadcrumbView items={[{ label: 'Workspace' }]} />`}
      >
        <BreadcrumbView items={[{ label: 'Workspace' }]} />
      </ExampleCard>
    </div>
  );
}
