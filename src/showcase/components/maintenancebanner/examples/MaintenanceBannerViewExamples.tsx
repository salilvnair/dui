import { useState } from 'react';
import { MaintenanceBannerView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function MaintenanceBannerViewExamples() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <ExampleCard
        title="Basic Maintenance Notice"
        description="Non-dismissible notice for an upcoming maintenance window"
        code={`<MaintenanceBannerView open window="July 4, 2AM-4AM UTC" />`}
      >
        <MaintenanceBannerView open window="July 4, 2AM-4AM UTC" />
      </ExampleCard>

      <ExampleCard
        title="Dismissible Banner"
        description="Interactive — clicking Dismiss hides the banner and reveals a button to bring it back"
        code={`function Preview() {
  const [open, setOpen] = useState(true);
  return <MaintenanceBannerView open={open} window="July 4, 2AM-4AM UTC" onDismiss={() => setOpen(false)} />;
}`}
      >
        <div>
          <MaintenanceBannerView open={open} window="July 4, 2AM-4AM UTC" onDismiss={() => setOpen(false)} />
          {!open && (
            <button type="button" onClick={() => setOpen(true)} style={{ marginTop: 8, fontSize: 12, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>
              Show banner again
            </button>
          )}
        </div>
      </ExampleCard>

      <ExampleCard
        title="API Platform Maintenance Window"
        description="Realistic Daakia-style downtime notice referencing specific services"
        code={`<MaintenanceBannerView open window="July 10, 11PM-1AM UTC — mock servers and webhook delivery" />`}
      >
        <MaintenanceBannerView open window="July 10, 11PM-1AM UTC — mock servers and webhook delivery" />
      </ExampleCard>

      <ExampleCard
        title="Compact Size"
        description="size='sm' fits a narrower top strip in a compact layout"
        code={`<MaintenanceBannerView open window="Aug 1, 12AM-2AM UTC" size="sm" />`}
      >
        <MaintenanceBannerView open window="Aug 1, 12AM-2AM UTC" size="sm" />
      </ExampleCard>

      <ExampleCard
        title="Closed State (No Render)"
        description="Edge case — open=false renders nothing, so it can be toggled off entirely once maintenance passes"
        code={`<MaintenanceBannerView open={false} window="July 4, 2AM-4AM UTC" />`}
      >
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
          (Nothing renders below — open is false)
        </div>
        <MaintenanceBannerView open={false} window="July 4, 2AM-4AM UTC" />
      </ExampleCard>
    </div>
  );
}
