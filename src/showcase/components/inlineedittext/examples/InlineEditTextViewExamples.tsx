import { useState } from 'react';
import { InlineEditTextView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function InlineEditTextViewExamples() {
  const [title, setTitle] = useState('List all users');
  const [note, setNote] = useState('Returns a paged collection.');
  const [slow, setSlow] = useState('Saved to a server');

  return (
    <>
      <ExampleCard
        title="Double-click to edit"
        description="Reads as text until you touch it. Enter saves, Escape abandons."
        code={'<InlineEditTextView value={title} onSave={setTitle} multiline={false} />'}
      >
        <InlineEditTextView value={title} onSave={setTitle} multiline={false} />
      </ExampleCard>

      <ExampleCard
        title="Multiline"
        description="The box grows with the content — Shift+Enter inserts a newline, Enter saves"
        code={'<InlineEditTextView value={note} onSave={setNote} />'}
      >
        <InlineEditTextView value={note} onSave={setNote} />
      </ExampleCard>

      <ExampleCard
        title="Saving takes a moment"
        description="onSave may be async — the display dims until it resolves, so nobody edits over an in-flight write"
        code={'<InlineEditTextView value={v} onSave={async next => { await api.save(next); setV(next); }} />'}
      >
        <InlineEditTextView
          value={slow}
          multiline={false}
          onSave={async next => {
            await new Promise(r => setTimeout(r, 900));
            setSlow(next);
          }}
        />
      </ExampleCard>

      <ExampleCard
        title="Disabled"
        description="Still readable, no longer editable"
        code={'<InlineEditTextView value={v} onSave={setV} disabled />'}
      >
        <InlineEditTextView value="Read-only field" onSave={() => {}} disabled multiline={false} />
      </ExampleCard>
    </>
  );
}
