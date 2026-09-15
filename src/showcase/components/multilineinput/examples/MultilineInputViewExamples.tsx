import { useState } from 'react';
import { MultilineInputView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function MultilineInputViewExamples() {
  const [body, setBody] = useState('{\n  "name": "Ada"\n}');
  const [notes, setNotes] = useState('');

  return (
    <>
      <ExampleCard
        title="A plain textarea, sized like every other DUI input"
        description="Same heights, same border, same focus ring as TextInputView"
        code={'<MultilineInputView value={body} onChange={e => setBody(e.target.value)} rows={5} />'}
      >
        <MultilineInputView
          value={body}
          onChange={e => setBody(e.target.value)}
          rows={5}
          style={{ width: 380 }}
        />
      </ExampleCard>

      <ExampleCard
        title="Resizable"
        description="Off by default, because a box the reader can drag out of the layout is usually a bug"
        code={'<MultilineInputView resize="vertical" rows={3} />'}
      >
        <MultilineInputView
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Drag the corner…"
          rows={3}
          resize="vertical"
          style={{ width: 380 }}
        />
      </ExampleCard>

      <ExampleCard
        title="Error state"
        description="A red border, matching the single-line input"
        code={'<MultilineInputView error />'}
      >
        <MultilineInputView
          value="not valid json"
          onChange={() => {}}
          error
          rows={2}
          style={{ width: 380 }}
        />
      </ExampleCard>
    </>
  );
}
