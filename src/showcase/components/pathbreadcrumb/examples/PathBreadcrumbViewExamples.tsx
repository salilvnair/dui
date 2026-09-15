import { useState } from 'react';
import { PathBreadcrumbView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

export function PathBreadcrumbViewExamples() {
  const [path, setPath] = useState('/home/salil/workspace/git/salilvnair/dui/src/lib');
  const [editing, setEditing] = useState(false);

  return (
    <>
      <ExampleCard
        title="Where you are, and a way back"
        description="Click any segment to go there. Past maxVisible the middle collapses to an ellipsis."
        code={'<PathBreadcrumbView path={path} onNavigate={setPath} />'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
          <PathBreadcrumbView path={path} onNavigate={setPath} />
          <code style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{path}</code>
        </div>
      </ExampleCard>

      <ExampleCard
        title="Type a path instead"
        description="Double-click, or drive it from outside with editing — Enter submits"
        code={'<PathBreadcrumbView editing={editing} onEditingChange={setEditing} onSubmit={setPath} />'}
      >
        <PathBreadcrumbView
          path={path}
          onNavigate={setPath}
          editing={editing}
          onEditingChange={setEditing}
          onSubmit={p => { setPath(p); setEditing(false); }}
          placeholder="/absolute/path"
        />
      </ExampleCard>

      <ExampleCard
        title="Roots and collapsing"
        description="rootLabel names the leading slash — a share, a drive, a bucket"
        code={'<PathBreadcrumbView rootLabel="C:" maxVisible={3} />'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
          <PathBreadcrumbView path="/" rootLabel="root" />
          <PathBreadcrumbView path="/Users/salil/Documents/work" rootLabel="Macintosh HD" />
          <PathBreadcrumbView path={path} maxVisible={3} color="var(--color-success)" />
        </div>
      </ExampleCard>
    </>
  );
}
