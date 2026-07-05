import { useState } from 'react';
import { BannerView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { WarningTriangleIcon } from '../../../../icons';

export function BannerViewExamples() {
  const [updateOpen, setUpdateOpen] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const [rateLimitOpen, setRateLimitOpen] = useState(true);
  const [downOpen, setDownOpen] = useState(true);

  return (
    <div>
      <ExampleCard
        title="Info Banner with Action"
        description="Persistent top strip announcing a new version"
        code={`<BannerView
  open={true}
  variant="info"
  message="A new version is available."
  actionLabel="Refresh"
  onAction={() => {}}
/>`}
      >
        <BannerView open={true} variant="info" message="A new version is available." actionLabel="Refresh" onAction={() => {}} />
      </ExampleCard>

      <ExampleCard
        title="Dismissible Update Banner (interactive)"
        description="onDismiss shows a close button — click it to dismiss, and re-show it below"
        code={`const [open, setOpen] = useState(true);

<BannerView
  open={open}
  variant="success"
  message="Collection 'Users API' synced successfully."
  onDismiss={() => setOpen(false)}
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <BannerView
            open={updateOpen}
            variant="success"
            message="Collection 'Users API' synced successfully."
            onDismiss={() => { setUpdateOpen(false); setDismissed(true); }}
          />
          {dismissed && !updateOpen && (
            <button
              type="button"
              onClick={() => { setUpdateOpen(true); setDismissed(false); }}
              style={{ alignSelf: 'flex-start', fontSize: 11, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Show again
            </button>
          )}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Rate Limit Warning"
        description="Warning variant with action — realistic for an API client hitting a rate limit"
        code={`<BannerView
  open={true}
  variant="warning"
  message="You are approaching your API rate limit (920/1000 requests this hour)."
  actionLabel="Upgrade plan"
  onAction={() => {}}
  onDismiss={() => {}}
/>`}
      >
        <BannerView
          open={rateLimitOpen}
          variant="warning"
          message="You are approaching your API rate limit (920/1000 requests this hour)."
          actionLabel="Upgrade plan"
          onAction={() => {}}
          onDismiss={() => setRateLimitOpen(false)}
        />
      </ExampleCard>

      <ExampleCard
        title="Danger Banner with Custom Icon"
        description="danger variant with an explicit icon override instead of the default InfoCircleIcon"
        code={`<BannerView
  open={true}
  variant="danger"
  icon={<WarningTriangleIcon size={16} />}
  message="Mock server is unreachable — requests will fail until it's restarted."
  actionLabel="Restart"
  onAction={() => {}}
/>`}
      >
        <BannerView
          open={downOpen}
          variant="danger"
          icon={<WarningTriangleIcon size={16} />}
          message="Mock server is unreachable — requests will fail until it's restarted."
          actionLabel="Restart"
          onAction={() => {}}
          onDismiss={() => setDownOpen(false)}
        />
      </ExampleCard>

      <ExampleCard
        title="All Variants Stacked"
        description="info / success / warning / danger side by side"
        code={`<BannerView open variant="info"    message="Informational message." />
<BannerView open variant="success" message="Something completed successfully." />
<BannerView open variant="warning" message="Something needs attention." />
<BannerView open variant="danger"  message="Something failed." />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <BannerView open variant="info" message="Informational message." />
          <BannerView open variant="success" message="Something completed successfully." />
          <BannerView open variant="warning" message="Something needs attention." />
          <BannerView open variant="danger" message="Something failed." />
        </div>
      </ExampleCard>
    </div>
  );
}
