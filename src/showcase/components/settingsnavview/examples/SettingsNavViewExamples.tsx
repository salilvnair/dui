import { useState } from 'react';
import { SettingsNavView } from '@/dui';
import type { SettingsNavGroup } from '@/dui';
import {
  SettingsIcon,
  SunIcon,
  KeyIcon,
  GlobeIcon,
  CpuIcon,
  LayersIcon,
  SparkleIcon,
} from '@/icons/daakia-icons';
import { ExampleCard } from '../../../shared/ExampleCard';

const FULL_GROUPS: SettingsNavGroup[] = [
  {
    title: 'General',
    items: [
      { id: 'general', label: 'General', icon: <SettingsIcon size={13} /> },
      { id: 'themes', label: 'Themes', icon: <SunIcon size={13} /> },
    ],
  },
  {
    title: 'Security',
    items: [
      { id: 'auth', label: 'Auth', icon: <KeyIcon size={13} /> },
      { id: 'network', label: 'Network', icon: <GlobeIcon size={13} /> },
    ],
  },
  {
    title: 'Developer',
    items: [
      { id: 'advanced', label: 'Advanced', icon: <CpuIcon size={13} /> },
    ],
  },
];

const BADGE_GROUPS: SettingsNavGroup[] = [
  {
    items: [
      { id: 'connections', label: 'Connections', badge: '3 active', icon: <GlobeIcon size={13} /> },
      { id: 'interceptors', label: 'Interceptors', badge: '1 on', icon: <LayersIcon size={13} /> },
      { id: 'ai', label: 'AI Providers', badge: '2', icon: <SparkleIcon size={13} /> },
      { id: 'proxies', label: 'Proxies', icon: <ServerIcon size={13} /> },
    ],
  },
];

import { ServerIcon } from '@/icons/daakia-icons';

const DESC_GROUPS: SettingsNavGroup[] = [
  {
    title: 'Preferences',
    items: [
      {
        id: 'appearance',
        label: 'Appearance',
        description: 'Theme, font and layout',
        icon: <SunIcon size={13} />,
      },
      {
        id: 'keys',
        label: 'Keyboard Shortcuts',
        description: 'Custom bindings & hotkeys',
        icon: <KeyIcon size={13} />,
      },
      {
        id: 'network',
        label: 'Network',
        description: 'Proxy and certificate settings',
        icon: <GlobeIcon size={13} />,
      },
    ],
  },
];

const COMPACT_GROUPS: SettingsNavGroup[] = [
  {
    items: [
      { id: 'g', label: 'General', icon: <SettingsIcon size={12} /> },
      { id: 't', label: 'Themes', icon: <SunIcon size={12} /> },
      { id: 'a', label: 'Auth', icon: <KeyIcon size={12} /> },
      { id: 'n', label: 'Network', icon: <GlobeIcon size={12} /> },
      { id: 'adv', label: 'Advanced', icon: <CpuIcon size={12} /> },
    ],
  },
];

export function SettingsNavViewExamples() {
  const [active1, setActive1] = useState('general');
  const [active2, setActive2] = useState('connections');
  const [active3, setActive3] = useState('appearance');
  const [active4, setActive4] = useState('g');

  return (
    <div>
      <ExampleCard
        title="Full Settings Sidebar"
        description="General / Themes / Auth / Network / Advanced with group headers"
        code={`<SettingsNavView groups={FULL_GROUPS} activeId={activeId} onSelect={setActiveId} />`}
      >
        <div style={{ width: 200 }}>
          <SettingsNavView groups={FULL_GROUPS} activeId={active1} onSelect={setActive1} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="With Badge Counts"
        description="Show live counts next to items (e.g. '3 active')"
        code={`<SettingsNavView groups={BADGE_GROUPS} activeId={activeId} onSelect={setActiveId} />`}
      >
        <div style={{ width: 200 }}>
          <SettingsNavView groups={BADGE_GROUPS} activeId={active2} onSelect={setActive2} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Active Item Selection"
        description="Highlighted active item with accent color indicator"
        code={`<SettingsNavView groups={groups} activeId="auth" accentColor="var(--color-protocol-rest)" />`}
      >
        <div style={{ width: 200 }}>
          <SettingsNavView
            groups={FULL_GROUPS}
            activeId="auth"
            accentColor="var(--color-protocol-rest)"
            onSelect={() => {}}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="With Descriptions"
        description="Each item shows a subtitle below the label"
        code={`<SettingsNavView groups={DESC_GROUPS} activeId={activeId} onSelect={setActiveId} />`}
      >
        <div style={{ width: 220 }}>
          <SettingsNavView groups={DESC_GROUPS} activeId={active3} onSelect={setActive3} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Compact Size Variant"
        description="size='sm' for tighter sidebar layouts"
        code={`<SettingsNavView groups={groups} size="sm" activeId={activeId} onSelect={setActiveId} />`}
      >
        <div style={{ width: 180 }}>
          <SettingsNavView groups={COMPACT_GROUPS} size="sm" activeId={active4} onSelect={setActive4} />
        </div>
      </ExampleCard>
    </div>
  );
}
