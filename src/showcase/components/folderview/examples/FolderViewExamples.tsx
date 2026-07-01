import { useState } from 'react';
import { FolderView, ChipView } from '@/dui';
import type { FolderNode, FolderAction } from '@/dui';
import { PlusIcon, TrashIcon, RenameIcon, PlayIcon } from '@/icons/daakia-icons';
import { ExampleCard } from '../../../shared/ExampleCard';

// ── Sample data ───────────────────────────────────────────────────────────────

type RequestItem = { id: string; method: string; name: string; url: string };

const REST_TREE: FolderNode<RequestItem>[] = [
  {
    id: 'auth',
    label: 'Auth',
    items: [
      { id: 'r1', method: 'POST',   name: 'Login',          url: '/auth/login' },
      { id: 'r2', method: 'POST',   name: 'Refresh Token',  url: '/auth/refresh' },
      { id: 'r3', method: 'DELETE', name: 'Logout',         url: '/auth/logout' },
    ],
  },
  {
    id: 'users',
    label: 'Users',
    items: [
      { id: 'r4', method: 'GET',    name: 'List Users',     url: '/users' },
      { id: 'r5', method: 'POST',   name: 'Create User',    url: '/users' },
      { id: 'r6', method: 'GET',    name: 'Get User',       url: '/users/:id' },
      { id: 'r7', method: 'PUT',    name: 'Update User',    url: '/users/:id' },
      { id: 'r8', method: 'DELETE', name: 'Delete User',    url: '/users/:id' },
    ],
  },
  {
    id: 'orders',
    label: 'Orders',
    children: [
      {
        id: 'orders-core',
        label: 'Core',
        items: [
          { id: 'r9',  method: 'GET',  name: 'List Orders',  url: '/orders' },
          { id: 'r10', method: 'POST', name: 'Place Order',  url: '/orders' },
        ],
      },
    ],
    items: [],
  },
];

const NESTED_TREE: FolderNode<RequestItem>[] = [
  {
    id: 'v1',
    label: 'v1 — Public',
    children: [
      {
        id: 'v1-health',
        label: 'Health',
        items: [{ id: 'h1', method: 'GET', name: 'Ping', url: '/v1/health' }],
      },
      {
        id: 'v1-users',
        label: 'Users',
        children: [
          {
            id: 'v1-users-admin',
            label: 'Admin',
            items: [{ id: 'a1', method: 'DELETE', name: 'Purge All', url: '/v1/admin/users' }],
          },
        ],
        items: [{ id: 'u1', method: 'GET', name: 'List', url: '/v1/users' }],
      },
    ],
    items: [],
  },
];

const METHOD_COLOR: Record<string, string> = {
  GET:    'var(--color-method-get)',
  POST:   'var(--color-method-post)',
  PUT:    'var(--color-method-put)',
  PATCH:  'var(--color-method-patch)',
  DELETE: 'var(--color-method-delete)',
};

function renderRequest(item: RequestItem) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 0' }}>
      <ChipView label={item.method} color={METHOD_COLOR[item.method] ?? 'var(--color-text-muted)'} size="xs" />
      <span style={{ fontSize: 12, color: 'var(--color-text-primary)' }}>{item.name}</span>
      <span style={{ fontSize: 11, color: 'var(--color-text-muted)', marginLeft: 'auto', fontFamily: 'monospace' }}>{item.url}</span>
    </div>
  );
}

const FOLDER_ACTIONS: FolderAction<RequestItem>[] = [
  {
    id: 'add',
    icon: <PlusIcon size={12} />,
    tooltip: 'Add request',
    onClick: () => {},
  },
  {
    id: 'rename',
    icon: <RenameIcon size={12} />,
    tooltip: 'Rename folder',
    onClick: () => {},
  },
  {
    id: 'delete',
    icon: <TrashIcon size={12} />,
    tooltip: 'Delete folder',
    onClick: () => {},
  },
];

export function FolderViewExamples() {
  const [expanded1, setExpanded1] = useState(new Set(['auth', 'users']));
  const [expanded2, setExpanded2] = useState(new Set<string>());
  const [expanded3, setExpanded3] = useState(new Set(['v1', 'v1-users']));

  const toggle1 = (id: string) =>
    setExpanded1(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const toggle2 = (id: string) =>
    setExpanded2(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const toggle3 = (id: string) =>
    setExpanded3(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  return (
    <div>
      <ExampleCard
        title="REST Collection Tree"
        description="Folders containing request items — Auth / Users / Orders — with hover actions"
        code={`<FolderView
  nodes={restTree}
  renderItem={renderRequest}
  expandedIds={expanded}
  onToggle={toggle}
  folderActions={folderActions}
  accentColor="var(--color-primary)"
/>`}
      >
        <div style={{ background: 'var(--color-panel)', borderRadius: 6, border: '1px solid var(--color-surface-border)', overflow: 'hidden' }}>
          <FolderView
            nodes={REST_TREE}
            renderItem={renderRequest}
            expandedIds={expanded1}
            onToggle={toggle1}
            folderActions={FOLDER_ACTIONS}
            accentColor="var(--color-primary)"
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Empty Folder State"
        description="All folders collapsed — clicking opens them; custom emptyLabel shown when no nodes exist"
        code={`<FolderView
  nodes={[]}
  renderItem={renderRequest}
  expandedIds={new Set()}
  onToggle={() => {}}
  emptyLabel="No requests yet — add one above"
/>`}
      >
        <div style={{ background: 'var(--color-panel)', borderRadius: 6, border: '1px solid var(--color-surface-border)', overflow: 'hidden', minHeight: 80 }}>
          <FolderView
            nodes={[]}
            renderItem={renderRequest}
            expandedIds={new Set()}
            onToggle={() => {}}
            emptyLabel="No requests yet — add one above"
            accentColor="var(--color-primary)"
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Context Menu on Right-Click"
        description="contextMenuItems prop adds a right-click context menu to each folder node"
        code={`<FolderView
  nodes={restTree}
  renderItem={renderRequest}
  expandedIds={expanded}
  onToggle={toggle}
  contextMenuItems={node => [
    { id: 'run',    label: 'Run All',        icon: <PlayIcon size={12} />,   onClick: () => {} },
    { id: 'rename', label: 'Rename Folder',  icon: <RenameIcon size={12} />, onClick: () => {} },
    { id: 'delete', label: 'Delete Folder',  icon: <TrashIcon size={12} />,  onClick: () => {} },
  ]}
/>`}
      >
        <div style={{ background: 'var(--color-panel)', borderRadius: 6, border: '1px solid var(--color-surface-border)', overflow: 'hidden' }}>
          <FolderView
            nodes={REST_TREE.slice(0, 2)}
            renderItem={renderRequest}
            expandedIds={expanded2}
            onToggle={toggle2}
            accentColor="var(--color-primary)"
            contextMenuItems={() => [
              { id: 'run',    label: 'Run All',       icon: <PlayIcon    size={12} />, onClick: () => {} },
              { id: 'rename', label: 'Rename Folder', icon: <RenameIcon  size={12} />, onClick: () => {} },
              { id: 'delete', label: 'Delete Folder', icon: <TrashIcon   size={12} />, onClick: () => {} },
            ]}
          />
        </div>
        <div style={{ marginTop: 6, fontSize: 11, color: 'var(--color-text-muted)' }}>Right-click a folder to see the context menu</div>
      </ExampleCard>

      <ExampleCard
        title="Nested Folder Structure — 3 Levels Deep"
        description="v1 → Users → Admin — deeply nested with expand/collapse at every level"
        code={`<FolderView
  nodes={nestedTree}
  renderItem={renderRequest}
  expandedIds={expanded}
  onToggle={toggle}
  accentColor="var(--color-protocol-graphql)"
/>`}
      >
        <div style={{ background: 'var(--color-panel)', borderRadius: 6, border: '1px solid var(--color-surface-border)', overflow: 'hidden' }}>
          <FolderView
            nodes={NESTED_TREE}
            renderItem={renderRequest}
            expandedIds={expanded3}
            onToggle={toggle3}
            accentColor="var(--color-protocol-graphql)"
          />
        </div>
      </ExampleCard>
    </div>
  );
}
