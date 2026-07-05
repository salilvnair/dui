import { useState } from 'react';
import { SettingsSectionView, SettingsRowView, ToggleSwitchView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function SettingsSectionViewExamples() {
  const [twoFactor, setTwoFactor] = useState(true);
  const [sso, setSso] = useState(false);
  const [emailDigest, setEmailDigest] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);

  return (
    <div>
      <ExampleCard
        title="Security Section"
        description="A grouped card with a title, description, and stacked SettingsRowView children"
        code={`<SettingsSectionView title="Security" description="Manage sign-in and access.">
  <SettingsRowView label="Two-factor auth" control={<ToggleSwitchView checked={true} onChange={() => {}} />} />
</SettingsSectionView>`}
      >
        <SettingsSectionView title="Security" description="Manage sign-in and access.">
          <SettingsRowView label="Two-factor auth" control={<ToggleSwitchView checked={twoFactor} onChange={setTwoFactor} />} />
        </SettingsSectionView>
      </ExampleCard>

      <ExampleCard
        title="Multiple Rows (auto-dividers)"
        description="Array children automatically get a top border between siblings"
        code={`<SettingsSectionView title="Access Control">
  <SettingsRowView label="Two-factor auth" control={<ToggleSwitchView checked={twoFactor} onChange={setTwoFactor} />} />
  <SettingsRowView label="Single sign-on (SSO)" description="Require SSO for all members." control={<ToggleSwitchView checked={sso} onChange={setSso} />} />
</SettingsSectionView>`}
      >
        <SettingsSectionView title="Access Control">
          <SettingsRowView label="Two-factor auth" control={<ToggleSwitchView checked={twoFactor} onChange={setTwoFactor} />} />
          <SettingsRowView label="Single sign-on (SSO)" description="Require SSO for all members." control={<ToggleSwitchView checked={sso} onChange={setSso} />} />
        </SettingsSectionView>
      </ExampleCard>

      <ExampleCard
        title="Notifications Section"
        description="A realistic multi-row settings section for a notification preferences page"
        code={`<SettingsSectionView title="Notifications" description="Choose how you want to be notified.">
  <SettingsRowView label="Weekly email digest" control={<ToggleSwitchView checked={emailDigest} onChange={setEmailDigest} />} />
  <SettingsRowView label="Push alerts for failed requests" control={<ToggleSwitchView checked={pushAlerts} onChange={setPushAlerts} />} />
</SettingsSectionView>`}
      >
        <SettingsSectionView title="Notifications" description="Choose how you want to be notified.">
          <SettingsRowView label="Weekly email digest" control={<ToggleSwitchView checked={emailDigest} onChange={setEmailDigest} />} />
          <SettingsRowView label="Push alerts for failed requests" control={<ToggleSwitchView checked={pushAlerts} onChange={setPushAlerts} />} />
        </SettingsSectionView>
      </ExampleCard>

      <ExampleCard
        title="Without Description"
        description="The section description is optional — title alone still renders a clean header"
        code={`<SettingsSectionView title="Danger Zone">
  <SettingsRowView label="Delete workspace" control={<span style={{ color: 'var(--color-error)' }}>Irreversible</span>} />
</SettingsSectionView>`}
      >
        <SettingsSectionView title="Danger Zone">
          <SettingsRowView label="Delete workspace" control={<span style={{ color: 'var(--color-error)', fontSize: 12, fontWeight: 700 }}>Irreversible</span>} />
        </SettingsSectionView>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="Header padding and font size scale with the DUI size system"
        code={`<SettingsSectionView title="Compact" size="sm">
  <SettingsRowView size="sm" label="Row" control={<ToggleSwitchView checked={true} onChange={() => {}} />} />
</SettingsSectionView>`}
      >
        <SettingsSectionView title="Compact" size="sm">
          <SettingsRowView size="sm" label="Row" control={<ToggleSwitchView checked={true} onChange={() => {}} />} />
        </SettingsSectionView>
      </ExampleCard>
    </div>
  );
}
