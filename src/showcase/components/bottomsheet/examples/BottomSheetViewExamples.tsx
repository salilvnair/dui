import { useState } from 'react';
import { BottomSheetView, ButtonView, SwitchGroupView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function BottomSheetViewExamples() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [optsOpen, setOptsOpen] = useState(false);
  const [checked, setChecked] = useState<string[]>(['ssl']);
  const [tallOpen, setTallOpen] = useState(false);
  const [shortOpen, setShortOpen] = useState(false);
  const [noTitleOpen, setNoTitleOpen] = useState(false);

  return (
    <div>
      <ExampleCard
        title="Basic Bottom Sheet"
        description="Drag-to-dismiss mobile sheet — distinct from the persistent, resizable BottomPanelView"
        code={`function Preview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ButtonView onClick={() => setOpen(true)}>Open</ButtonView>
      <BottomSheetView open={open} title="Request Options" onClose={() => setOpen(false)}>
        ...
      </BottomSheetView>
    </>
  );
}`}
      >
        <ButtonView onClick={() => setBasicOpen(true)}>Open</ButtonView>
        <BottomSheetView open={basicOpen} title="Request Options" onClose={() => setBasicOpen(false)}>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Drag the handle down to dismiss, or tap the backdrop.</div>
        </BottomSheetView>
      </ExampleCard>

      <ExampleCard
        title="Request Options Form (interactive)"
        description="Real form content inside the sheet — toggles persist after closing and reopening"
        code={`<BottomSheetView open={open} title="Request Options" onClose={() => setOpen(false)}>
  <SwitchGroupView items={items} checked={checked} onChange={setChecked} />
</BottomSheetView>`}
      >
        <ButtonView onClick={() => setOptsOpen(true)} variant="secondary">Edit Options</ButtonView>
        <BottomSheetView open={optsOpen} title="Request Options" onClose={() => setOptsOpen(false)}>
          <SwitchGroupView
            items={[{ value: 'ssl', label: 'Verify SSL' }, { value: 'redirects', label: 'Follow redirects' }]}
            checked={checked}
            onChange={setChecked}
          />
        </BottomSheetView>
      </ExampleCard>

      <ExampleCard
        title="Tall Sheet (heightRatio)"
        description="heightRatio controls the fraction of viewport height the sheet occupies — 0.85 for a near-fullscreen mobile view"
        code={`<BottomSheetView open={open} title="Response Body" heightRatio={0.85} onClose={() => setOpen(false)}>
  ...
</BottomSheetView>`}
      >
        <ButtonView onClick={() => setTallOpen(true)} variant="ghost">Open Response Body</ButtonView>
        <BottomSheetView open={tallOpen} title="Response Body" heightRatio={0.85} onClose={() => setTallOpen(false)}>
          <pre style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{'{ "id": 1, "name": "Salil Vasa Nair" }'}</pre>
        </BottomSheetView>
      </ExampleCard>

      <ExampleCard
        title="Short Sheet (heightRatio)"
        description="A compact heightRatio for a small quick-pick sheet, e.g. selecting an HTTP method"
        code={`<BottomSheetView open={open} title="Select Method" heightRatio={0.3} onClose={() => setOpen(false)}>
  ...
</BottomSheetView>`}
      >
        <ButtonView onClick={() => setShortOpen(true)} variant="ghost">Select Method</ButtonView>
        <BottomSheetView open={shortOpen} title="Select Method" heightRatio={0.3} onClose={() => setShortOpen(false)}>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>GET, POST, PUT, PATCH, DELETE</div>
        </BottomSheetView>
      </ExampleCard>

      <ExampleCard
        title="No Title (edge case)"
        description="Omitting title renders just the drag handle and content, no header row"
        code={`<BottomSheetView open={open} onClose={() => setOpen(false)}>
  ...
</BottomSheetView>`}
      >
        <ButtonView onClick={() => setNoTitleOpen(true)} variant="ghost">Open (no title)</ButtonView>
        <BottomSheetView open={noTitleOpen} onClose={() => setNoTitleOpen(false)}>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Bare content, no header.</div>
        </BottomSheetView>
      </ExampleCard>
    </div>
  );
}
