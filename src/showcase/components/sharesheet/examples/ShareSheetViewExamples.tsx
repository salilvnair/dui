import { useState } from 'react';
import { ShareSheetView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { LinkIcon, ShareIcon } from '../../../../icons';

export function ShareSheetViewExamples() {
  const [copiedCount, setCopiedCount] = useState(0);

  return (
    <div>
      <ExampleCard
        title="Copy Link Only"
        description="Minimal share sheet — just a URL field with a copy button, no targets"
        code={`<ShareSheetView url="https://daakia.app/s/abc123" />`}
      >
        <ShareSheetView url="https://daakia.app/s/abc123" />
      </ExampleCard>

      <ExampleCard
        title="Shared Collection Link"
        description="Sharing a request collection with teammates — a realistic API-testing use case"
        code={`<ShareSheetView url="https://daakia.app/collections/payments-api/share/9f21c" />`}
      >
        <ShareSheetView url="https://daakia.app/collections/payments-api/share/9f21c" />
      </ExampleCard>

      <ExampleCard
        title="With Share Targets"
        description="Add targets (e.g. Email, Team Chat) alongside the copy-link field"
        code={`<ShareSheetView
  url="https://daakia.app/s/abc123"
  targets={[
    { id: 'direct', label: 'Direct', icon: <LinkIcon size={18} />, onClick: () => openDirect() },
    { id: 'share', label: 'Share', icon: <ShareIcon size={18} />, onClick: () => {} },
  ]}
/>`}
      >
        <ShareSheetView
          url="https://daakia.app/s/abc123"
          targets={[
            { id: 'direct', label: 'Direct', icon: <LinkIcon size={18} />, onClick: () => {} },
            { id: 'share', label: 'Share', icon: <ShareIcon size={18} />, onClick: () => {} },
          ]}
        />
      </ExampleCard>

      <ExampleCard
        title="Custom Accent Color"
        description="Tint the target icon circles and copy button with a theme color"
        code={`<ShareSheetView url="https://daakia.app/s/abc123" color="var(--color-info)" />`}
      >
        <ShareSheetView url="https://daakia.app/s/abc123" color="var(--color-info)" />
      </ExampleCard>

      <ExampleCard
        title="onCopy Callback (analytics hook)"
        description="Fire an analytics event or toast whenever the link is copied"
        code={`<ShareSheetView
  url="https://daakia.app/s/abc123"
  onCopy={() => trackEvent('share_link_copied')}
/>`}
      >
        <ShareSheetView url="https://daakia.app/s/abc123" onCopy={() => setCopiedCount(c => c + 1)} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Copy button clicked {copiedCount} time{copiedCount === 1 ? '' : 's'}.
        </div>
      </ExampleCard>
    </div>
  );
}
