import { useState } from 'react';
import { IconPickerView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function IconPickerViewExamples() {
  const [icon, setIcon] = useState<string | null>('SparkleIcon');
  const [teamIcon, setTeamIcon] = useState<string | null>(null);
  const [envIcon, setEnvIcon] = useState<string | null>('GlobeIcon');
  const [disabledIcon] = useState<string | null>('LockIcon');

  return (
    <div>
      <ExampleCard
        title="Default Icon Picker"
        description="Searchable grid over every icon registered in the DUI icon set"
        code={`const [icon, setIcon] = useState<string | null>('SparkleIcon');

<IconPickerView value={icon} onChange={setIcon} />`}
      >
        <IconPickerView value={icon} onChange={setIcon} />
      </ExampleCard>

      <ExampleCard
        title="Interactive: Empty to Selected"
        description="Starts with no icon chosen; picking one updates the trigger label and preview"
        code={`const [teamIcon, setTeamIcon] = useState<string | null>(null);

<IconPickerView value={teamIcon} onChange={setTeamIcon} />
{teamIcon ? \`Selected: \${teamIcon}\` : 'No icon chosen yet'}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
          <IconPickerView value={teamIcon} onChange={setTeamIcon} />
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            {teamIcon ? `Selected: ${teamIcon}` : 'No icon chosen yet'}
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="xs / sm / md / lg trigger sizes for different UI densities"
        code={`<IconPickerView value={icon} onChange={setIcon} size="xs" />
<IconPickerView value={icon} onChange={setIcon} size="sm" />
<IconPickerView value={icon} onChange={setIcon} size="md" />
<IconPickerView value={icon} onChange={setIcon} size="lg" />`}
      >
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <IconPickerView value={icon} onChange={setIcon} size="xs" />
          <IconPickerView value={icon} onChange={setIcon} size="sm" />
          <IconPickerView value={icon} onChange={setIcon} size="md" />
          <IconPickerView value={icon} onChange={setIcon} size="lg" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Collection Icon with Accent Color"
        description="Assign a custom icon and accent color to an API collection, matching the collection's brand color"
        code={`const [envIcon, setEnvIcon] = useState<string | null>('GlobeIcon');

<IconPickerView
  value={envIcon}
  onChange={setEnvIcon}
  color="var(--color-protocol-rest)"
  width="sm"
/>`}
      >
        <IconPickerView
          value={envIcon}
          onChange={setEnvIcon}
          color="var(--color-protocol-rest)"
          width="sm"
        />
      </ExampleCard>

      <ExampleCard
        title="Disabled State"
        description="Locked icon for a system-managed workspace that cannot be re-branded"
        code={`<IconPickerView value="LockIcon" onChange={() => {}} disabled />`}
      >
        <IconPickerView value={disabledIcon} onChange={() => {}} disabled />
      </ExampleCard>
    </div>
  );
}
