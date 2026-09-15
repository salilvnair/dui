import { useState } from 'react';
import { FileBrowserView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const ENTRIES = [
  { id: 'src', name: 'src', kind: 'dir' as const, modified: '2 days ago' },
  { id: 'node_modules', name: 'node_modules', kind: 'dir' as const, detail: '1,284 packages', modified: '1 week ago' },
  { id: 'link', name: 'plan', kind: 'link' as const, linkTarget: '../daakia-private/plan', modified: '3 days ago' },
  { id: 'pkg', name: 'package.json', kind: 'file' as const, size: 2789, modified: '4 hours ago', badge: 'modified', badgeTone: 'warning' as const },
  { id: 'readme', name: 'README.md', kind: 'file' as const, size: 30177, modified: 'yesterday' },
  { id: 'lock', name: 'package-lock.json', kind: 'file' as const, size: 530943, modified: 'yesterday', badge: 'generated', badgeTone: 'neutral' as const },
  { id: 'env', name: '.env', kind: 'file' as const, size: 118, modified: '1 month ago', badge: 'secret', badgeTone: 'danger' as const },
];

export function FileBrowserViewExamples() {
  const [selected, setSelected] = useState('pkg');
  const [match, setMatch] = useState('');

  return (
    <>
      <ExampleCard
        title="A directory"
        description="Single click selects, the way a file manager behaves. Kinds, badges and symlink targets all read at a glance."
        code={'<FileBrowserView entries={entries} selectedId={id} onSelect={e => setId(e.id)} onParent={up} />'}
      >
        <div style={{ width: '100%' }}>
          <FileBrowserView
            entries={ENTRIES}
            selectedId={selected}
            onSelect={e => setSelected(e.id)}
            onParent={() => {}}
            footer={ENTRIES.length + ' entries'}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Search results"
        description="match highlights the hit; size and modified are dropped, because a search result has neither"
        code={'<FileBrowserView match={q} showSize={false} showModified={false} dense />'}
      >
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input
            value={match}
            onChange={e => setMatch(e.target.value)}
            placeholder="type json, src, env…"
            style={{
              alignSelf: 'flex-start', width: 220, padding: '5px 9px', fontSize: 12,
              borderRadius: 6, border: '1px solid var(--color-input-border)',
              background: 'var(--color-input-bg)', color: 'var(--color-text-primary)',
            }}
          />
          <FileBrowserView
            entries={match ? ENTRIES.filter(e => e.name.toLowerCase().includes(match.toLowerCase())) : ENTRIES}
            match={match}
            dense
            showSize={false}
            showModified={false}
            emptyText="Nothing matched"
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Empty, and loading"
        description="A directory below the root can be empty too — that is not an error state"
        code={'<FileBrowserView entries={[]} emptyText="This folder is empty" onParent={up} />'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          <FileBrowserView entries={[]} emptyText="This folder is empty" onParent={() => {}} />
          <FileBrowserView entries={[]} loading />
        </div>
      </ExampleCard>
    </>
  );
}
