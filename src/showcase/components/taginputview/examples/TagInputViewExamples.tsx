import { useState } from 'react';
import { TagInputView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function TagInputViewExamples() {
  const [envTags, setEnvTags] = useState<string[]>(['NODE_ENV', 'API_KEY', 'BASE_URL']);
  const [labelTags, setLabelTags] = useState<string[]>([]);
  const [prepopTags, setPrepopTags] = useState<string[]>(['authentication', 'users', 'v2']);
  const [limitTags, setLimitTags] = useState<string[]>(['prod', 'staging']);
  const [accentTags, setAccentTags] = useState<string[]>(['REST', 'GraphQL']);

  return (
    <div>
      <ExampleCard
        title="Environment Variable Tags"
        description="Tag-style input for naming environment variables — press Enter or comma to add"
        code={`<TagInputView tags={tags} onChange={setTags} placeholder="Add variable name…" />`}
      >
        <TagInputView
          tags={envTags}
          onChange={setEnvTags}
          placeholder="Add variable name…"
        />
      </ExampleCard>

      <ExampleCard
        title="Request Labels"
        description="Free-form labels to organise requests in a collection"
        code={`<TagInputView tags={tags} onChange={setTags} placeholder="Add label…" />`}
      >
        <TagInputView
          tags={labelTags}
          onChange={setLabelTags}
          placeholder="Add label (e.g. auth, beta, deprecated)…"
        />
      </ExampleCard>

      <ExampleCard
        title="Pre-populated Tags — Remove with Backspace"
        description="Tags pre-filled from saved data; delete any tag by pressing Backspace"
        code={`<TagInputView tags={['authentication', 'users', 'v2']} onChange={setTags} />`}
      >
        <TagInputView
          tags={prepopTags}
          onChange={setPrepopTags}
          placeholder="Add tag…"
        />
      </ExampleCard>

      <ExampleCard
        title="Max Tags Limit"
        description="Caps at 3 tags — input disappears once limit is reached"
        code={`<TagInputView tags={tags} onChange={setTags} maxTags={3} />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <TagInputView
            tags={limitTags}
            onChange={setLimitTags}
            placeholder="Add environment (max 3)…"
            maxTags={3}
          />
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            {limitTags.length}/3 environments added
          </span>
        </div>
      </ExampleCard>

      <ExampleCard
        title="With Accent Color"
        description="Protocol-branded tags using accentColor"
        code={`<TagInputView tags={tags} onChange={setTags} accentColor="var(--color-protocol-rest)" />`}
      >
        <TagInputView
          tags={accentTags}
          onChange={setAccentTags}
          placeholder="Add protocol…"
          accentColor="var(--color-protocol-rest)"
        />
      </ExampleCard>
    </div>
  );
}
