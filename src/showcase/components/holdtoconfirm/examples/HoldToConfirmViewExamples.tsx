import { useState } from 'react';
import { HoldToConfirmView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function HoldToConfirmViewExamples() {
  const [deleted, setDeleted] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [envDropped, setEnvDropped] = useState(false);

  const pushLog = (msg: string) => setLog(prev => [msg, ...prev].slice(0, 4));

  return (
    <div>
      <ExampleCard
        title="Delete Request Confirmation"
        description="Default use — replaces a 'type DELETE to confirm' modal for destructive actions"
        code={`<HoldToConfirmView onConfirm={() => deleteRequest(id)}>
  Hold to delete
</HoldToConfirmView>`}
      >
        <HoldToConfirmView onConfirm={() => setDeleted(true)}>
          {deleted ? 'Deleted' : 'Hold to delete'}
        </HoldToConfirmView>
      </ExampleCard>

      <ExampleCard
        title="Interactive Action Log"
        description="Stateful example — the confirm handler appends to a running activity log"
        code={`const [log, setLog] = useState<string[]>([]);

<HoldToConfirmView onConfirm={() => setLog(l => ['Collection cleared', ...l])}>
  Hold to clear collection
</HoldToConfirmView>`}
      >
        <HoldToConfirmView onConfirm={() => pushLog(`Collection cleared @ ${new Date().toLocaleTimeString()}`)}>
          Hold to clear collection
        </HoldToConfirmView>
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          {log.length === 0 ? 'No actions yet' : log.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Duration and Color"
        description="Shorter hold + severity color variants"
        code={`<HoldToConfirmView onConfirm={() => {}} duration={400} color="var(--color-warning)">
  Hold to archive (fast)
</HoldToConfirmView>
<HoldToConfirmView onConfirm={() => {}} duration={1800} color="var(--color-error)">
  Hold to purge (slow)
</HoldToConfirmView>`}
      >
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <HoldToConfirmView onConfirm={() => {}} duration={400} color="var(--color-warning)">
            Hold to archive (fast)
          </HoldToConfirmView>
          <HoldToConfirmView onConfirm={() => {}} duration={1800} color="var(--color-error)">
            Hold to purge (slow)
          </HoldToConfirmView>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Revoke Team API Key"
        description="API-testing domain use case — irreversible workspace action gated behind a hold"
        code={`<HoldToConfirmView
  onConfirm={() => revokeApiKey(keyId)}
  color="var(--color-error)"
  size="sm"
>
  Hold to revoke key
</HoldToConfirmView>`}
      >
        <HoldToConfirmView
          onConfirm={() => setEnvDropped(true)}
          color="var(--color-error)"
          size="sm"
        >
          {envDropped ? 'Key revoked' : 'Hold to revoke key'}
        </HoldToConfirmView>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="Edge case — smallest and largest sizes for dense toolbars vs prominent danger zones"
        code={`<HoldToConfirmView onConfirm={() => {}} size="xs">Hold</HoldToConfirmView>
<HoldToConfirmView onConfirm={() => {}} size="xl">Hold to delete workspace</HoldToConfirmView>`}
      >
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <HoldToConfirmView onConfirm={() => {}} size="xs">Hold</HoldToConfirmView>
          <HoldToConfirmView onConfirm={() => {}} size="xl">Hold to delete workspace</HoldToConfirmView>
        </div>
      </ExampleCard>
    </div>
  );
}
