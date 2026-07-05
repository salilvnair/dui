import { useState } from 'react';
import { TransferListView } from '@/dui';
import type { TransferItem } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const PERMISSIONS: TransferItem[] = [
  { value: 'read', label: 'Read' },
  { value: 'write', label: 'Write' },
  { value: 'delete', label: 'Delete' },
  { value: 'admin', label: 'Admin' },
  { value: 'billing', label: 'Billing' },
];

const ENV_VARS: TransferItem[] = [
  { value: 'BASE_URL', label: 'BASE_URL' },
  { value: 'API_KEY', label: 'API_KEY' },
  { value: 'AUTH_TOKEN', label: 'AUTH_TOKEN' },
  { value: 'CLIENT_ID', label: 'CLIENT_ID' },
  { value: 'CLIENT_SECRET', label: 'CLIENT_SECRET' },
  { value: 'TIMEOUT_MS', label: 'TIMEOUT_MS' },
  { value: 'RETRY_COUNT', label: 'RETRY_COUNT' },
];

const TEAM_MEMBERS: TransferItem[] = [
  { value: 'u1', label: 'Ananya Rao — Backend' },
  { value: 'u2', label: 'Devika Shah — Frontend' },
  { value: 'u3', label: 'Marco Lin — QA' },
  { value: 'u4', label: 'Priya Nair — DevOps' },
  { value: 'u5', label: 'Sam Okafor — PM' },
  { value: 'u6', label: 'Yuki Tanaka — Design' },
];

export function TransferListViewExamples() {
  const [selectedPerms, setSelectedPerms] = useState<string[]>(['read', 'write']);
  const [exportedVars, setExportedVars] = useState<string[]>(['BASE_URL', 'API_KEY']);
  const [webhookScopes, setWebhookScopes] = useState<string[]>(['read']);
  const [reviewers, setReviewers] = useState<string[]>(['u1', 'u3']);
  const [emptySelection, setEmptySelection] = useState<string[]>([]);

  return (
    <div>
      <ExampleCard
        title="Role Permission Assignment"
        description="Default use case — assign permission scopes to a role"
        code={`const [selected, setSelected] = useState<string[]>(['read', 'write']);
const permissions = [
  { value: 'read', label: 'Read' },
  { value: 'write', label: 'Write' },
  { value: 'delete', label: 'Delete' },
  { value: 'admin', label: 'Admin' },
  { value: 'billing', label: 'Billing' },
];

<TransferListView items={permissions} value={selected} onChange={setSelected} />`}
      >
        <TransferListView items={PERMISSIONS} value={selectedPerms} onChange={setSelectedPerms} style={{ width: 460 }} />
      </ExampleCard>

      <ExampleCard
        title="Environment Variables to Export (interactive)"
        description="Pick which environment variables get exported to a shared collection, with a live summary"
        code={`const [exported, setExported] = useState<string[]>(['BASE_URL', 'API_KEY']);

<TransferListView
  items={envVars}
  value={exported}
  onChange={setExported}
  leftTitle="Not exported"
  rightTitle="Exported"
/>
<p>{exported.length} of {envVars.length} variables will be shared</p>`}
      >
        <TransferListView
          items={ENV_VARS}
          value={exportedVars}
          onChange={setExportedVars}
          leftTitle="Not exported"
          rightTitle="Exported"
          style={{ width: 460 }}
        />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          {exportedVars.length} of {ENV_VARS.length} variables will be shared with this collection.
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size & Color Variants"
        description="Compact vs. default sizing, and custom accent colors for the transfer controls"
        code={`<TransferListView items={items} value={value} onChange={setValue} size="sm" height={160} />
<TransferListView items={items} value={value} onChange={setValue} color="var(--color-warning)" />
<TransferListView items={items} value={value} onChange={setValue} color="var(--color-success)" borderRadius="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>size="sm", height=160</div>
            <TransferListView items={PERMISSIONS} value={selectedPerms} onChange={setSelectedPerms} size="sm" height={160} style={{ width: 420 }} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>color="var(--color-warning)"</div>
            <TransferListView items={PERMISSIONS} value={selectedPerms} onChange={setSelectedPerms} color="var(--color-warning)" height={160} style={{ width: 420 }} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>color="var(--color-success)", borderRadius="lg"</div>
            <TransferListView items={PERMISSIONS} value={selectedPerms} onChange={setSelectedPerms} color="var(--color-success)" borderRadius="lg" height={160} style={{ width: 420 }} />
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Webhook Scopes & Reviewer Assignment"
        description="Two domain-realistic transfer lists: webhook event scopes, and PR reviewers picked from a team"
        code={`const [scopes, setScopes] = useState<string[]>(['read']);
const [reviewers, setReviewers] = useState<string[]>(['u1', 'u3']);

<TransferListView
  items={[
    { value: 'read', label: 'request.completed' },
    { value: 'write', label: 'request.failed' },
    { value: 'delete', label: 'collection.deleted' },
  ]}
  value={scopes}
  onChange={setScopes}
  leftTitle="Available events"
  rightTitle="Subscribed"
/>

<TransferListView
  items={teamMembers}
  value={reviewers}
  onChange={setReviewers}
  leftTitle="Team"
  rightTitle="Reviewers"
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Webhook event subscriptions</div>
            <TransferListView
              items={[
                { value: 'read', label: 'request.completed' },
                { value: 'write', label: 'request.failed' },
                { value: 'delete', label: 'collection.deleted' },
                { value: 'admin', label: 'environment.updated' },
              ]}
              value={webhookScopes}
              onChange={setWebhookScopes}
              leftTitle="Available events"
              rightTitle="Subscribed"
              style={{ width: 460 }}
            />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Assign PR reviewers</div>
            <TransferListView
              items={TEAM_MEMBERS}
              value={reviewers}
              onChange={setReviewers}
              leftTitle="Team"
              rightTitle="Reviewers"
              color="var(--color-info)"
              style={{ width: 460 }}
            />
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Empty Selection (edge case)"
        description="Nothing selected yet on the right — Selected panel shows the built-in 'Empty' placeholder"
        code={`const [selection, setSelection] = useState<string[]>([]);

<TransferListView items={items} value={selection} onChange={setSelection} />`}
      >
        <TransferListView items={PERMISSIONS} value={emptySelection} onChange={setEmptySelection} style={{ width: 460 }} />
      </ExampleCard>
    </div>
  );
}
