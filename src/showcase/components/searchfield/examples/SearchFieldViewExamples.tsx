import { useState } from 'react';
import { SearchFieldView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function SearchFieldViewExamples() {
  const [q, setQ] = useState('');
  const [ran, setRan] = useState<string | null>(null);
  const [recent, setRecent] = useState(['status:500', 'POST /api/users', 'latency > 500ms']);

  return (
    <>
      <ExampleCard
        title="A box that runs something"
        description="Unlike a filter, this one waits for Enter — onSearch is the action"
        code={'<SearchFieldView value={q} onChange={setQ} onSearch={run} placeholder="Search requests…" />'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
          <SearchFieldView value={q} onChange={setQ} onSearch={setRan} placeholder="Search requests…" width={300} />
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            {ran ? 'ran: ' + ran : 'press Enter to run'}
          </div>
        </div>
      </ExampleCard>

      <ExampleCard
        title="What you searched before"
        description="Suggestions appear on focus, each one droppable, with a clear-all on the heading"
        code={'<SearchFieldView suggestions={recent} onPick={setQ} onForget={forget} onClearAll={clearAll} />'}
      >
        <SearchFieldView
          value={q}
          onChange={setQ}
          onSearch={setRan}
          placeholder="Focus me"
          width={300}
          suggestionsLabel="Recent"
          suggestions={recent}
          onPick={setQ}
          onForget={v => setRecent(r => r.filter(x => x !== v))}
          onClearAll={() => setRecent([])}
        />
      </ExampleCard>

      <ExampleCard
        title="Suggestions with detail"
        description="A suggestion can carry a meta line instead of being a bare string"
        code={'suggestions={[{ value: "status:500", meta: "12 matches" }]}'}
      >
        <SearchFieldView
          value={q}
          onChange={setQ}
          placeholder="Focus me"
          width={300}
          suggestionsLabel="Saved searches"
          suggestions={[
            { value: 'status:500', meta: '12 matches' },
            { value: 'method:POST', meta: '48 matches' },
            { value: 'duration>1s', meta: '3 matches' },
          ]}
          onPick={setQ}
        />
      </ExampleCard>
    </>
  );
}
