import { useState } from 'react';
import { SettingsRowView, ToggleSwitchView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function SettingsRowViewExamples() {
  const [twoFactor, setTwoFactor] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div>
      <ExampleCard
        title="Toggle Control"
        description="The most common pairing — label + description + a ToggleSwitchView control"
        code={`const [enabled, setEnabled] = useState(true);
<SettingsRowView
  label="Two-factor auth"
  description="Require a code at sign-in."
  control={<ToggleSwitchView checked={enabled} onChange={setEnabled} />}
/>`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <SettingsRowView
            label="Two-factor auth"
            description="Require a code at sign-in."
            control={<ToggleSwitchView checked={twoFactor} onChange={setTwoFactor} />}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Without Description"
        description="description is optional — the row still aligns cleanly with just a label"
        code={`<SettingsRowView label="Email notifications" control={<ToggleSwitchView checked={enabled} onChange={setEnabled} />} />`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <SettingsRowView
            label="Email notifications"
            control={<ToggleSwitchView checked={notifications} onChange={setNotifications} />}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Text Value Control"
        description="control accepts any ReactNode, not just a toggle — here it's a plain value string"
        code={`<SettingsRowView label="Workspace ID" description="Used for API scoping." control={<code>ws_9f21c8</code>} />`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <SettingsRowView
            label="Workspace ID"
            description="Used for API scoping."
            control={<code style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>ws_9f21c8</code>}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Stacked Rows (settings list)"
        description="Multiple rows stacked to build a settings page section without SettingsSectionView's border"
        code={`<div>
  <SettingsRowView label="Auto-save requests" control={<ToggleSwitchView checked={autoSave} onChange={setAutoSave} />} />
  <SettingsRowView label="Dark mode" description="Follow system theme." control={<ToggleSwitchView checked={true} onChange={() => {}} />} />
</div>`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <SettingsRowView label="Auto-save requests" control={<ToggleSwitchView checked={autoSave} onChange={setAutoSave} />} />
          <div style={{ borderTop: '1px solid var(--color-surface-border)' }}>
            <SettingsRowView label="Dark mode" description="Follow system theme." control={<ToggleSwitchView checked={true} onChange={() => {}} />} />
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="Row padding and font size scale with the DUI size system"
        code={`<SettingsRowView size="sm" label="Compact row" control={<ToggleSwitchView checked={true} onChange={() => {}} />} />
<SettingsRowView size="lg" label="Large row" control={<ToggleSwitchView checked={true} onChange={() => {}} />} />`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <SettingsRowView size="sm" label="Compact row" control={<ToggleSwitchView checked={true} onChange={() => {}} />} />
          <div style={{ borderTop: '1px solid var(--color-surface-border)' }}>
            <SettingsRowView size="lg" label="Large row" control={<ToggleSwitchView checked={true} onChange={() => {}} />} />
          </div>
        </div>
      </ExampleCard>
    </div>
  );
}
