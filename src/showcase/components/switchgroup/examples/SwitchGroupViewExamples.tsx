import { useState } from 'react';
import { SwitchGroupView } from '@/dui';
import type { SwitchGroupItem } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { LockIcon, RefreshIcon, CookieIcon, ClockIcon, WifiIcon } from '../../../../icons';

export function SwitchGroupViewExamples() {
  const [requestOpts, setRequestOpts] = useState<string[]>(['ssl']);
  const [notifOpts, setNotifOpts] = useState<string[]>(['fail', 'slow']);
  const [envOpts, setEnvOpts] = useState<string[]>(['autosave']);
  const [proxyOpts, setProxyOpts] = useState<string[]>([]);

  const notifItems: SwitchGroupItem[] = [
    { value: 'fail', label: 'Request failed', description: 'Notify on 4xx/5xx or network error' },
    { value: 'slow', label: 'Slow response', description: 'Notify when a request exceeds 2s' },
    { value: 'complete', label: 'Collection run complete' },
  ];

  return (
    <div>
      <ExampleCard
        title="Default Grouped Toggles"
        description="Settings.app-style rows with a section header"
        code={`const [checked, setChecked] = useState(['ssl']);
const items = [
  { value: 'ssl', label: 'Verify SSL' },
  { value: 'redirects', label: 'Follow redirects' },
];

<SwitchGroupView title="Request Options" items={items} checked={checked} onChange={setChecked} />`}
      >
        <SwitchGroupView
          title="Request Options"
          items={[{ value: 'ssl', label: 'Verify SSL' }, { value: 'redirects', label: 'Follow redirects' }]}
          checked={['ssl']}
          onChange={() => {}}
        />
      </ExampleCard>

      <ExampleCard
        title="Request Options with Descriptions and Icons (interactive)"
        description="Per-row description text plus a leading icon, toggle to see live state"
        code={`const [checked, setChecked] = useState(['ssl']);
const items = [
  { value: 'ssl', label: 'Verify SSL', description: 'Reject requests with invalid certificates', icon: <LockIcon /> },
  { value: 'redirects', label: 'Follow redirects', icon: <RefreshIcon /> },
  { value: 'cookies', label: 'Send cookies', description: 'Include cookie jar on every request', icon: <CookieIcon /> },
];

<SwitchGroupView title="Request Options" items={items} checked={checked} onChange={setChecked} />`}
      >
        <SwitchGroupView
          title="Request Options"
          items={[
            { value: 'ssl', label: 'Verify SSL', description: 'Reject requests with invalid certificates', icon: <LockIcon size={16} /> },
            { value: 'redirects', label: 'Follow redirects', icon: <RefreshIcon size={16} /> },
            { value: 'cookies', label: 'Send cookies', description: 'Include cookie jar on every request', icon: <CookieIcon size={16} /> },
          ]}
          checked={requestOpts}
          onChange={setRequestOpts}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Enabled: {requestOpts.length > 0 ? requestOpts.join(', ') : 'none'}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Notification Preferences"
        description="A second independent group — common pattern for a settings drawer"
        code={`const [checked, setChecked] = useState(['fail', 'slow']);
const items = [
  { value: 'fail', label: 'Request failed', description: 'Notify on 4xx/5xx or network error' },
  { value: 'slow', label: 'Slow response', description: 'Notify when a request exceeds 2s' },
  { value: 'complete', label: 'Collection run complete' },
];

<SwitchGroupView title="Notifications" items={items} checked={checked} onChange={setChecked} color="var(--color-info)" />`}
      >
        <SwitchGroupView title="Notifications" items={notifItems} checked={notifOpts} onChange={setNotifOpts} color="var(--color-info)" />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm / md / lg for different UI densities"
        code={`<SwitchGroupView size="sm" title="Environment" items={items} checked={checked} onChange={setChecked} />
<SwitchGroupView size="lg" title="Environment" items={items} checked={checked} onChange={setChecked} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SwitchGroupView
            size="sm"
            title="Environment"
            items={[{ value: 'autosave', label: 'Auto-save requests', icon: <ClockIcon size={14} /> }]}
            checked={envOpts}
            onChange={setEnvOpts}
          />
          <SwitchGroupView
            size="lg"
            title="Environment"
            items={[{ value: 'autosave', label: 'Auto-save requests', icon: <ClockIcon size={18} /> }]}
            checked={envOpts}
            onChange={setEnvOpts}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Disabled Row (proxy unavailable offline)"
        description="Per-item disabled state — dims the row and blocks toggling"
        code={`const items = [
  { value: 'proxy', label: 'Use system proxy', icon: <WifiIcon />, disabled: true, description: 'Unavailable while offline' },
];

<SwitchGroupView title="Network" items={items} checked={[]} onChange={() => {}} />`}
      >
        <SwitchGroupView
          title="Network"
          items={[{ value: 'proxy', label: 'Use system proxy', icon: <WifiIcon size={16} />, disabled: true, description: 'Unavailable while offline' }]}
          checked={proxyOpts}
          onChange={setProxyOpts}
        />
      </ExampleCard>
    </div>
  );
}
