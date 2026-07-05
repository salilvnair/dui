import { useState } from 'react';
import { DockView } from '@/dui';
import type { DockItem } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { ServerIcon, NetworkIcon, FolderIcon, VariableIcon, SettingsIcon, TerminalIcon } from '../../../../icons';

export function DockViewExamples() {
  const [active, setActive] = useState('server');
  const [envActive, setEnvActive] = useState('collections');
  const [color, setColor] = useState('var(--color-primary)');

  const workspaceItems: DockItem[] = [
    { id: 'collections', icon: <FolderIcon size={18} />, label: 'Collections', active: envActive === 'collections' },
    { id: 'env', icon: <VariableIcon size={18} />, label: 'Environments', active: envActive === 'env' },
    { id: 'network', icon: <NetworkIcon size={18} />, label: 'Network', active: envActive === 'network' },
    { id: 'console', icon: <TerminalIcon size={18} />, label: 'Console', active: envActive === 'console' },
    { id: 'settings', icon: <SettingsIcon size={18} />, label: 'Settings', active: envActive === 'settings' },
  ];

  return (
    <div>
      <ExampleCard
        title="Basic Dock"
        description="Floating dock — icons magnify as the cursor approaches"
        code={`function Preview() {
  const [active, setActive] = useState('server');
  const items = [
    { id: 'server', icon: <ServerIcon size={18} />, label: 'Servers', active: active === 'server' },
    { id: 'globe', icon: <GlobeIcon size={18} />, label: 'Network', active: active === 'globe' },
  ];
  return <DockView items={items} onSelect={setActive} />;
}`}
      >
        <DockView
          items={[
            { id: 'server', icon: <ServerIcon size={18} />, label: 'Servers', active: active === 'server' },
            { id: 'globe', icon: <NetworkIcon size={18} />, label: 'Network', active: active === 'globe' },
          ]}
          onSelect={setActive}
        />
      </ExampleCard>

      <ExampleCard
        title="Workspace Navigation Dock (interactive)"
        description="5-item dock for switching between collections, environments, network, console, and settings"
        code={`const [active, setActive] = useState('collections');
const items = [
  { id: 'collections', icon: <FolderIcon />, label: 'Collections', active: active === 'collections' },
  { id: 'env', icon: <VariableIcon />, label: 'Environments', active: active === 'env' },
  { id: 'network', icon: <NetworkIcon />, label: 'Network', active: active === 'network' },
  { id: 'console', icon: <TerminalIcon />, label: 'Console', active: active === 'console' },
  { id: 'settings', icon: <SettingsIcon />, label: 'Settings', active: active === 'settings' },
];

<DockView items={items} onSelect={setActive} />`}
      >
        <DockView items={workspaceItems} onSelect={setEnvActive} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>Active: {envActive}</div>
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="color tints the active item's icon and its dot indicator"
        code={`<DockView items={items} onSelect={setActive} color="var(--color-success)" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {['var(--color-primary)', 'var(--color-success)', 'var(--color-warning)', '#a855f7'].map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                style={{ width: 18, height: 18, borderRadius: '50%', background: c, border: color === c ? '2px solid var(--color-text-primary)' : 'none', cursor: 'pointer' }}
              />
            ))}
          </div>
          <DockView
            items={[
              { id: 'server', icon: <ServerIcon size={18} />, label: 'Servers', active: true },
              { id: 'globe', icon: <NetworkIcon size={18} />, label: 'Network', active: false },
            ]}
            onSelect={() => {}}
            color={color}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Sizes"
        description="size scales icon size and thus the magnification base size of every dock item"
        code={`<DockView items={items} onSelect={setActive} size="sm" />
<DockView items={items} onSelect={setActive} size="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <DockView
            items={[{ id: 'a', icon: <ServerIcon size={14} />, label: 'Servers', active: true }, { id: 'b', icon: <NetworkIcon size={14} />, label: 'Network' }]}
            onSelect={() => {}}
            size="sm"
          />
          <DockView
            items={[{ id: 'a', icon: <ServerIcon size={22} />, label: 'Servers', active: true }, { id: 'b', icon: <NetworkIcon size={22} />, label: 'Network' }]}
            onSelect={() => {}}
            size="lg"
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Single Item (edge case)"
        description="A dock with only one item still renders and magnifies correctly on hover"
        code={`<DockView items={[{ id: 'only', icon: <ServerIcon />, label: 'Servers', active: true }]} onSelect={() => {}} />`}
      >
        <DockView items={[{ id: 'only', icon: <ServerIcon size={18} />, label: 'Servers', active: true }]} onSelect={() => {}} />
      </ExampleCard>
    </div>
  );
}
