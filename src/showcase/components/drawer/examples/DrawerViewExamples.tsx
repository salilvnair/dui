import { useState } from 'react';
import { DrawerView, ButtonView, SwitchGroupView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function DrawerViewExamples() {
  const [rightOpen, setRightOpen] = useState(false);
  const [envOpts, setEnvOpts] = useState<string[]>(['ssl']);
  const [envOpen, setEnvOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);
  const [wideOpen, setWideOpen] = useState(false);

  return (
    <div>
      <ExampleCard
        title="Right Drawer with Title"
        description="Slide-in panel from the right edge, with a backdrop — the navigation-drawer pattern"
        code={`function Preview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ButtonView onClick={() => setOpen(true)}>Open</ButtonView>
      <DrawerView open={open} edge="right" title="Environment" onClose={() => setOpen(false)}>
        ...
      </DrawerView>
    </>
  );
}`}
      >
        <ButtonView onClick={() => setRightOpen(true)}>Open</ButtonView>
        <DrawerView open={rightOpen} edge="right" title="Environment" onClose={() => setRightOpen(false)}>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Production environment variables and settings.</div>
        </DrawerView>
      </ExampleCard>

      <ExampleCard
        title="Environment Editor (interactive)"
        description="A real settings form living inside the drawer body — closes on save"
        code={`<DrawerView open={open} edge="right" title="Edit Environment" onClose={() => setOpen(false)}>
  <SwitchGroupView title="Request Options" items={items} checked={checked} onChange={setChecked} />
  <ButtonView onClick={() => setOpen(false)}>Save</ButtonView>
</DrawerView>`}
      >
        <ButtonView onClick={() => setEnvOpen(true)} variant="secondary">Edit Environment</ButtonView>
        <DrawerView open={envOpen} edge="right" title="Edit Environment" onClose={() => setEnvOpen(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SwitchGroupView
              title="Request Options"
              items={[{ value: 'ssl', label: 'Verify SSL' }, { value: 'redirects', label: 'Follow redirects' }]}
              checked={envOpts}
              onChange={setEnvOpts}
            />
            <ButtonView onClick={() => setEnvOpen(false)}>Save</ButtonView>
          </div>
        </DrawerView>
      </ExampleCard>

      <ExampleCard
        title="Left Edge"
        description="edge='left' for a navigation-style drawer, e.g. a collections sidebar overlay on mobile"
        code={`<DrawerView open={open} edge="left" title="Collections" onClose={() => setOpen(false)}>
  ...
</DrawerView>`}
      >
        <ButtonView onClick={() => setLeftOpen(true)} variant="ghost">Open Collections</ButtonView>
        <DrawerView open={leftOpen} edge="left" title="Collections" onClose={() => setLeftOpen(false)}>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Users API, Auth Service, Webhooks…</div>
        </DrawerView>
      </ExampleCard>

      <ExampleCard
        title="Bottom Edge with Custom Height"
        description="edge='bottom' with a size in vh, e.g. a console/logs panel"
        code={`<DrawerView open={open} edge="bottom" title="Console" size="40vh" onClose={() => setOpen(false)}>
  ...
</DrawerView>`}
      >
        <ButtonView onClick={() => setBottomOpen(true)} variant="ghost">Open Console</ButtonView>
        <DrawerView open={bottomOpen} edge="bottom" title="Console" size="40vh" onClose={() => setBottomOpen(false)}>
          <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>[12:04:01] GET /users 200 OK 84ms</div>
        </DrawerView>
      </ExampleCard>

      <ExampleCard
        title="Custom Width (no title)"
        description="Numeric size in px and no title — content fills the panel directly"
        code={`<DrawerView open={open} edge="right" size={480} onClose={() => setOpen(false)}>
  ...
</DrawerView>`}
      >
        <ButtonView onClick={() => setWideOpen(true)} variant="ghost">Open Wide Panel</ButtonView>
        <DrawerView open={wideOpen} edge="right" size={480} onClose={() => setWideOpen(false)}>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>A wider 480px panel with no header.</div>
        </DrawerView>
      </ExampleCard>
    </div>
  );
}
