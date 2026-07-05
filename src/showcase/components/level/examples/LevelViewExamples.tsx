import { useState } from 'react';
import { LevelView, ButtonView, ChipView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function LevelViewExamples() {
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <ExampleCard
        title="Default Toolbar Row"
        description="Request count on the left, an export action on the right"
        code={`<LevelView left={<span>142 requests</span>} right={<ButtonView size="sm">Export</ButtonView>} />`}
      >
        <LevelView left={<span>142 requests</span>} right={<ButtonView size="sm">Export</ButtonView>} />
      </ExampleCard>

      <ExampleCard
        title="Interactive Save Bar"
        description="Left shows dirty-state text, right toggles between Save/Saved on click"
        code={`const [saved, setSaved] = useState(false);
<LevelView
  left={<span>{saved ? 'All changes saved' : 'Unsaved changes'}</span>}
  right={<ButtonView size="sm" variant={saved ? 'ghost' : 'primary'} onClick={() => setSaved(true)}>{saved ? 'Saved' : 'Save'}</ButtonView>}
/>`}
      >
        <LevelView
          left={
            <span style={{ color: saved ? 'var(--color-success)' : 'var(--color-text-muted)', fontSize: 12.5 }}>
              {saved ? 'All changes saved' : 'Unsaved changes'}
            </span>
          }
          right={
            <ButtonView size="sm" variant={saved ? 'ghost' : 'primary'} onClick={() => setSaved(true)}>
              {saved ? 'Saved' : 'Save'}
            </ButtonView>
          }
        />
      </ExampleCard>

      <ExampleCard
        title="Multiple Items Per Side"
        description="left/right accept any ReactNode — pass a fragment for multiple grouped items"
        code={`<LevelView
  left={<><ChipView label="GET" color="var(--color-method-get)" size="sm" /><span>/api/users</span></>}
  right={<><ButtonView size="sm" variant="ghost">Duplicate</ButtonView><ButtonView size="sm" variant="primary">Send</ButtonView></>}
/>`}
      >
        <LevelView
          left={
            <>
              <ChipView label="GET" color="var(--color-method-get)" size="sm" />
              <span style={{ fontSize: 12.5, fontFamily: 'monospace' }}>/api/users</span>
            </>
          }
          right={
            <>
              <ButtonView size="sm" variant="ghost">Duplicate</ButtonView>
              <ButtonView size="sm" variant="primary">Send</ButtonView>
            </>
          }
        />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="size controls the gap between grouped items on each side"
        code={`<LevelView size="xs" left={<span>Environment: Staging</span>} right={<ChipView label="Active" color="var(--color-success)" active size="xs" />} />
<LevelView size="lg" left={<span>Environment: Production</span>} right={<ChipView label="Active" color="var(--color-error)" active size="lg" />} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <LevelView
            size="xs"
            left={<span style={{ fontSize: 11 }}>Environment: Staging</span>}
            right={<ChipView label="Active" color="var(--color-success)" active size="xs" />}
          />
          <LevelView
            size="lg"
            left={<span style={{ fontSize: 14 }}>Environment: Production</span>}
            right={<ChipView label="Active" color="var(--color-error)" active size="sm" />}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="One Side Only"
        description="left or right can be omitted — the row still spans full width for consistent toolbar alignment"
        code={`<LevelView left={<span>No webhooks configured</span>} />
<LevelView right={<ButtonView size="sm" variant="primary">Add Webhook</ButtonView>} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <LevelView left={<span style={{ color: 'var(--color-text-muted)', fontSize: 12.5 }}>No webhooks configured</span>} />
          <LevelView right={<ButtonView size="sm" variant="primary">Add Webhook</ButtonView>} />
        </div>
      </ExampleCard>
    </div>
  );
}
