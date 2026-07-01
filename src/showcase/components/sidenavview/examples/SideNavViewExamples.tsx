import { useState } from 'react';
import { SideNavView } from '@/dui';
import type { SideNavItem } from '@/dui';
import {
  CollectionsFolderIcon,
  ClockIcon,
  SettingsIcon,
  FolderIcon,
  ServerIcon,
  PlayIcon,
} from '@/icons/daakia-icons';
import { ExampleCard } from '../../../shared/ExampleCard';

// ─── Sample nav items ─────────────────────────────────────────────────────────
const fullNavItems: SideNavItem[] = [
  {
    id: 'collections-group',
    label: 'Collections',
    isGroup: true,
    count: 3,
    children: [
      { id: 'my-apis',       label: 'My APIs',          icon: <CollectionsFolderIcon size={13} />, badge: 2 },
      { id: 'payment-api',   label: 'Payment API',      icon: <CollectionsFolderIcon size={13} /> },
      { id: 'user-service',  label: 'User Service',     icon: <CollectionsFolderIcon size={13} /> },
    ],
  },
  {
    id: 'history-group',
    label: 'History',
    isGroup: true,
    count: 2,
    children: [
      { id: 'recent',        label: 'Recent Requests',  icon: <ClockIcon size={13} /> },
      { id: 'favorites',     label: 'Favorites',        icon: <PlayIcon size={13} /> },
    ],
  },
  {
    id: 'environments-group',
    label: 'Environments',
    isGroup: true,
    children: [
      { id: 'env-dev',       label: 'Development',      icon: <ServerIcon size={13} />, badge: 'active' },
      { id: 'env-staging',   label: 'Staging',          icon: <ServerIcon size={13} /> },
      { id: 'env-prod',      label: 'Production',       icon: <ServerIcon size={13} /> },
    ],
  },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon size={13} /> },
];

const simpleNavItems: SideNavItem[] = [
  { id: 'rest',      label: 'REST',      icon: <PlayIcon size={13} /> },
  { id: 'graphql',   label: 'GraphQL',   icon: <CollectionsFolderIcon size={13} /> },
  { id: 'websocket', label: 'WebSocket', icon: <ServerIcon size={13} /> },
  { id: 'grpc',      label: 'gRPC',      icon: <ServerIcon size={13} /> },
  { id: 'soap',      label: 'SOAP',      icon: <FolderIcon size={13} /> },
  { id: 'settings',  label: 'Settings',  icon: <SettingsIcon size={13} /> },
];

// ─── Full sidebar with nested items ───────────────────────────────────────────
function FullSidebarDemo() {
  const [activeId, setActiveId] = useState('my-apis');
  return (
    <div style={{ height: 360, display: 'flex' }}>
      <SideNavView
        items={fullNavItems}
        activeId={activeId}
        onSelect={setActiveId}
        width={200}
        accentColor="var(--color-protocol-rest)"
        defaultOpenIds={['collections-group', 'history-group', 'environments-group']}
      />
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, color: 'var(--color-text-muted)',
        background: 'var(--color-panel)',
        borderLeft: '1px solid var(--color-panel-border)',
      }}>
        Active: <strong style={{ marginLeft: 6, color: 'var(--color-text-primary)' }}>{activeId}</strong>
      </div>
    </div>
  );
}

// ─── Collapsed icon-only mode ─────────────────────────────────────────────────
function CollapsedSidebarDemo() {
  const [collapsed, setCollapsed] = useState(true);
  const [activeId, setActiveId] = useState('rest');
  return (
    <div style={{ height: 280, display: 'flex' }}>
      <SideNavView
        items={simpleNavItems}
        activeId={activeId}
        onSelect={setActiveId}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        width={160}
        collapsedWidth={44}
        accentColor="var(--color-protocol-graphql)"
      />
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, color: 'var(--color-text-muted)',
        background: 'var(--color-panel)',
        borderLeft: '1px solid var(--color-panel-border)',
      }}>
        {collapsed ? 'Sidebar collapsed (icon-only)' : `Active: ${activeId}`}
      </div>
    </div>
  );
}

// ─── Active item highlight ─────────────────────────────────────────────────────
function ActiveItemDemo() {
  const [activeId, setActiveId] = useState('graphql');
  return (
    <div style={{ height: 240, display: 'flex' }}>
      <SideNavView
        items={simpleNavItems}
        activeId={activeId}
        onSelect={setActiveId}
        collapsible={false}
        width={160}
        accentColor="var(--color-protocol-graphql)"
      />
    </div>
  );
}

// ─── Nested expand / collapse ─────────────────────────────────────────────────
function NestedExpandDemo() {
  const [activeId, setActiveId] = useState('payment-api');
  return (
    <div style={{ height: 320, display: 'flex' }}>
      <SideNavView
        items={fullNavItems}
        activeId={activeId}
        onSelect={setActiveId}
        collapsible={false}
        width={200}
        accentColor="var(--color-protocol-rest)"
        defaultOpenIds={['collections-group']}
      />
    </div>
  );
}

// ─── With badge counts ────────────────────────────────────────────────────────
function BadgeCountsDemo() {
  const [activeId, setActiveId] = useState('my-apis');
  return (
    <div style={{ height: 240, display: 'flex' }}>
      <SideNavView
        items={[
          { id: 'my-apis',      label: 'My APIs',      icon: <CollectionsFolderIcon size={13} />, badge: 2 },
          { id: 'payment-api',  label: 'Payment API',  icon: <CollectionsFolderIcon size={13} />, badge: 7 },
          { id: 'env-dev',      label: 'Development',  icon: <ServerIcon size={13} />,            badge: 'active' },
          { id: 'env-staging',  label: 'Staging',      icon: <ServerIcon size={13} /> },
          { id: 'settings',     label: 'Settings',     icon: <SettingsIcon size={13} /> },
        ]}
        activeId={activeId}
        onSelect={setActiveId}
        collapsible={false}
        width={180}
        accentColor="var(--color-protocol-rest)"
      />
    </div>
  );
}

// ─── Searchable sidebar ───────────────────────────────────────────────────────
function SearchableSidebarDemo() {
  const [activeId, setActiveId] = useState('my-apis');
  return (
    <div style={{ height: 320, display: 'flex' }}>
      <SideNavView
        items={fullNavItems}
        activeId={activeId}
        onSelect={setActiveId}
        searchable
        searchPlaceholder="Search collections…"
        collapsible={false}
        width={200}
        accentColor="var(--color-protocol-rest)"
        defaultOpenIds={['collections-group', 'history-group', 'environments-group']}
      />
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function SideNavViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Full Sidebar with Nested Groups"
        description="Group headers with count · nested leaf items · badge pills · active highlight"
        code={`<SideNavView
  items={[
    { id: 'collections-group', label: 'Collections', isGroup: true, count: 3, children: [...] },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon size={13} /> },
  ]}
  activeId={activeId}
  onSelect={setActiveId}
  accentColor="var(--color-protocol-rest)"
/>`}
      >
        <FullSidebarDemo />
      </ExampleCard>

      <ExampleCard
        title="Collapsed Icon-Only Mode"
        description="collapsed + onCollapsedChange — toggle shows only icon squares at collapsedWidth=44"
        code={`<SideNavView
  items={simpleItems}
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
  collapsedWidth={44}
  width={160}
/>`}
      >
        <CollapsedSidebarDemo />
      </ExampleCard>

      <ExampleCard
        title="Active Item Highlight"
        description="Click any item — accentColor drives the active background and text"
        code={`<SideNavView items={protocols} activeId={activeId} onSelect={setActiveId}
  accentColor="var(--color-protocol-graphql)" />`}
      >
        <ActiveItemDemo />
      </ExampleCard>

      <ExampleCard
        title="Nested Group Expand / Collapse"
        description="Click a group header to toggle its children — chevron animates"
        code={`<SideNavView items={nestedItems} defaultOpenIds={['collections-group']}
  onSelect={setActiveId} />`}
      >
        <NestedExpandDemo />
      </ExampleCard>

      <ExampleCard
        title="Badge Counts"
        description="badge={number} shows accent pill · badge=&quot;active&quot; shows text badge"
        code={`{ id: 'my-apis', label: 'My APIs', badge: 2 }
{ id: 'env-dev', label: 'Development', badge: 'active' }`}
      >
        <BadgeCountsDemo />
      </ExampleCard>

      <ExampleCard
        title="Searchable Sidebar"
        description="searchable=true — live-filters all leaf items; shows total count when not filtering"
        code={`<SideNavView items={fullNavItems} searchable searchPlaceholder="Search collections…" />`}
      >
        <SearchableSidebarDemo />
      </ExampleCard>
    </div>
  );
}
