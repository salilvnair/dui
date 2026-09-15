import { useState } from 'react';
import { MarkdownEditorView, ButtonView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const START = [
  '# Release notes',
  '',
  'The chip had **one look**. Now the look is _data_.',
  '',
  '- fifty skins',
  '- one provider-wide switch',
  '',
  'See [the panel](#/badgechip).',
].join('\n');

export function MarkdownEditorViewExamples() {
  const [md, setMd] = useState(START);
  const [mode, setMode] = useState<'rich' | 'markdown'>('rich');

  return (
    <>
      <ExampleCard
        title="One document, two ways to edit it"
        description="Rich text and raw Markdown over the same value — the switch is a flat pair, not a segmented control"
        code={'<MarkdownEditorView value={md} onChange={setMd} />'}
      >
        <div style={{ width: '100%' }}>
          <MarkdownEditorView value={md} onChange={setMd} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Controlled mode, and your own toolbar controls"
        description="toolbarRight takes anything — a Save button, a word count"
        code={'<MarkdownEditorView mode={mode} onModeChange={setMode} toolbarRight={<ButtonView size="xs">Save</ButtonView>} />'}
      >
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <MarkdownEditorView
            value={md}
            onChange={setMd}
            mode={mode}
            onModeChange={setMode}
            toolbarRight={<ButtonView size="xs" variant="secondary">Save</ButtonView>}
          />
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>mode: {mode}</div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Read only"
        description="The toolbar goes with it — a read-only editor with a Bold button is a lie"
        code={'<MarkdownEditorView readOnly value={md} onChange={() => {}} />'}
      >
        <div style={{ width: '100%' }}>
          <MarkdownEditorView readOnly value={START} onChange={() => {}} showModeToggle={false} />
        </div>
      </ExampleCard>
    </>
  );
}
