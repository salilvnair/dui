import { useState } from 'react';
import { EmojiPickerView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function EmojiPickerViewExamples() {
  const [emoji, setEmoji] = useState<string | null>('🚀');
  const [reaction, setReaction] = useState<string | null>(null);
  const [workspaceEmoji, setWorkspaceEmoji] = useState<string | null>('🔥');
  const [disabledEmoji] = useState<string | null>('🔒');

  return (
    <div>
      <ExampleCard
        title="Default Emoji Picker"
        description="Categorized emoji grid with a search-by-category field"
        code={`const [emoji, setEmoji] = useState<string | null>('🚀');

<EmojiPickerView value={emoji} onChange={setEmoji} />`}
      >
        <EmojiPickerView value={emoji} onChange={setEmoji} />
      </ExampleCard>

      <ExampleCard
        title="Interactive: Request Comment Reaction"
        description="Pick a reaction emoji for a team comment on a shared request — starts empty"
        code={`const [reaction, setReaction] = useState<string | null>(null);

<EmojiPickerView value={reaction} onChange={setReaction} />
{reaction ? \`You reacted with \${reaction}\` : 'No reaction yet'}`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
          <EmojiPickerView value={reaction} onChange={setReaction} />
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            {reaction ? `You reacted with ${reaction}` : 'No reaction yet'}
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="xs / sm / md / lg trigger sizes for different UI densities"
        code={`<EmojiPickerView value={emoji} onChange={setEmoji} size="xs" />
<EmojiPickerView value={emoji} onChange={setEmoji} size="sm" />
<EmojiPickerView value={emoji} onChange={setEmoji} size="md" />
<EmojiPickerView value={emoji} onChange={setEmoji} size="lg" />`}
      >
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <EmojiPickerView value={emoji} onChange={setEmoji} size="xs" />
          <EmojiPickerView value={emoji} onChange={setEmoji} size="sm" />
          <EmojiPickerView value={emoji} onChange={setEmoji} size="md" />
          <EmojiPickerView value={emoji} onChange={setEmoji} size="lg" />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Workspace Emoji with Accent Color"
        description="Emoji shortcut used as a fun workspace icon in a team switcher, tinted with the workspace's brand color"
        code={`const [workspaceEmoji, setWorkspaceEmoji] = useState<string | null>('🔥');

<EmojiPickerView
  value={workspaceEmoji}
  onChange={setWorkspaceEmoji}
  color="var(--color-warning)"
/>`}
      >
        <EmojiPickerView
          value={workspaceEmoji}
          onChange={setWorkspaceEmoji}
          color="var(--color-warning)"
        />
      </ExampleCard>

      <ExampleCard
        title="Disabled State"
        description="Locked emoji badge for a read-only shared environment"
        code={`<EmojiPickerView value="🔒" onChange={() => {}} disabled />`}
      >
        <EmojiPickerView value={disabledEmoji} onChange={() => {}} disabled />
      </ExampleCard>
    </div>
  );
}
