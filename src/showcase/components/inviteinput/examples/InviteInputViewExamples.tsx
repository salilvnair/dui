import { useState } from 'react';
import { InviteInputView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function InviteInputViewExamples() {
  const [emails1, setEmails1] = useState<string[]>(['jordan@daakia.app']);
  const [emails2, setEmails2] = useState<string[]>([]);
  const [emails3, setEmails3] = useState<string[]>(['priya@daakia.app', 'alex@daakia.app']);

  return (
    <div>
      <ExampleCard
        title="Basic Invite Chips"
        description="Prefilled with one email chip — type and press Enter to add more"
        code={`function Preview() {
  const [emails, setEmails] = useState(['jordan@daakia.app']);
  return <InviteInputView emails={emails} onChange={setEmails} />;
}`}
      >
        <InviteInputView emails={emails1} onChange={setEmails1} />
      </ExampleCard>

      <ExampleCard
        title="Empty State with Placeholder"
        description="Empty invite list shows the placeholder text prompting entry"
        code={`const [emails, setEmails] = useState<string[]>([]);

<InviteInputView emails={emails} onChange={setEmails} placeholder="Invite teammates by email…" />`}
      >
        <InviteInputView emails={emails2} onChange={setEmails2} placeholder="Invite teammates by email…" />
      </ExampleCard>

      <ExampleCard
        title="Workspace Invite Form"
        description="Realistic team-invite form field with several members already added and a live count"
        code={`const [emails, setEmails] = useState(['priya@daakia.app', 'alex@daakia.app']);

<InviteInputView emails={emails} onChange={setEmails} placeholder="Add more teammates…" />
<div>{emails.length} invite{emails.length === 1 ? '' : 's'} pending</div>`}
      >
        <div>
          <InviteInputView emails={emails3} onChange={setEmails3} placeholder="Add more teammates…" />
          <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
            {emails3.length} invite{emails3.length === 1 ? '' : 's'} pending
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Custom Color & Border Radius"
        description="Themed for a workspace-branded invite modal"
        code={`<InviteInputView emails={emails} onChange={setEmails} color="var(--color-protocol-graphql)" borderRadius="lg" />`}
      >
        <InviteInputView emails={['sam@daakia.app']} onChange={() => {}} color="var(--color-protocol-graphql)" borderRadius="lg" />
      </ExampleCard>

      <ExampleCard
        title="Disabled State"
        description="Locked input, e.g. while an invite request is submitting to the server"
        code={`<InviteInputView emails={['jordan@daakia.app', 'priya@daakia.app']} onChange={() => {}} disabled />`}
      >
        <InviteInputView emails={['jordan@daakia.app', 'priya@daakia.app']} onChange={() => {}} disabled />
      </ExampleCard>
    </div>
  );
}
