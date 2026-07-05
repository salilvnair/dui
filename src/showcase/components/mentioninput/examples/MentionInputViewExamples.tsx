import { useState } from 'react';
import { MentionInputView, type MentionUser } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const TEAM: MentionUser[] = [
  { id: '1', label: 'Jordan Lee' },
  { id: '2', label: 'Priya Nair' },
  { id: '3', label: 'Marcus Chen' },
  { id: '4', label: 'Sofia Ramirez' },
  { id: '5', label: 'devops-bot' },
];

export function MentionInputViewExamples() {
  const [value, setValue] = useState('');
  const [reviewValue, setReviewValue] = useState('Looks good, cc @');
  const [errorValue, setErrorValue] = useState('@unknownperson please review this endpoint');

  return (
    <div>
      <ExampleCard
        title="Basic Comment Composer"
        description="Default textarea with @mention autocomplete, as used under a request/response panel"
        code={`const [value, setValue] = useState('');

<MentionInputView
  value={value}
  onChange={setValue}
  users={[{ id: '1', label: 'Jordan Lee' }, { id: '2', label: 'Priya Nair' }]}
/>`}
      >
        <MentionInputView value={value} onChange={setValue} users={TEAM} />
      </ExampleCard>

      <ExampleCard
        title="Review Thread Reply (interactive)"
        description="Pre-filled draft — type @ to trigger the mention menu and pick a teammate"
        code={`const [value, setValue] = useState('Looks good, cc @');

<MentionInputView value={value} onChange={setValue} users={team} rows={2} />`}
      >
        <MentionInputView value={reviewValue} onChange={setReviewValue} users={TEAM} rows={2} />
        <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-muted)' }}>
          Raw value: <code>{reviewValue}</code>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm / md / lg for different panel densities"
        code={`<MentionInputView size="sm" value="" onChange={() => {}} users={team} rows={1} />
<MentionInputView size="md" value="" onChange={() => {}} users={team} rows={1} />
<MentionInputView size="lg" value="" onChange={() => {}} users={team} rows={1} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <MentionInputView size="sm" value="" onChange={() => {}} users={TEAM} rows={1} placeholder="Small…" />
          <MentionInputView size="md" value="" onChange={() => {}} users={TEAM} rows={1} placeholder="Medium…" />
          <MentionInputView size="lg" value="" onChange={() => {}} users={TEAM} rows={1} placeholder="Large…" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Webhook Failure Escalation"
        description="Custom accent color and rounded borderRadius, tagging on-call for a failed webhook delivery"
        code={`<MentionInputView
  value="Webhook delivery failed 3x for /orders/created — @"
  onChange={() => {}}
  users={[{ id: '5', label: 'devops-bot' }]}
  color="var(--color-error)"
  borderRadius="lg"
  rows={2}
/>`}
      >
        <MentionInputView
          value="Webhook delivery failed 3x for /orders/created — @"
          onChange={() => {}}
          users={TEAM}
          color="var(--color-error)"
          borderRadius="lg"
          rows={2}
        />
      </ExampleCard>

      <ExampleCard
        title="Disabled State"
        description="Locked composer — e.g. a closed/archived review thread"
        code={`<MentionInputView
  value="@unknownperson please review this endpoint"
  onChange={() => {}}
  users={team}
  disabled
/>`}
      >
        <MentionInputView value={errorValue} onChange={setErrorValue} users={TEAM} disabled />
      </ExampleCard>
    </div>
  );
}
