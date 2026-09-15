import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function FileBrowserViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Files, directories, symlinks with their targets', color: 'var(--color-primary)' },
          { label: 'Selection and a separate arrival flash', color: 'var(--color-success)' },
          { label: 'Badges with tones, and a detail line', color: 'var(--color-info)' },
          { label: 'Right-click rows, and right-click the empty space', color: 'var(--color-warning)' },
          { label: 'Dense mode, and its own skeleton while loading', color: '#a855f7' },
          { label: 'Columns that can be dropped for search results', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="A directory listing. Selection and arrival are two different states with two different colours, which matters in a pane where a file appears while you are reading it — the row that arrived should not look like the row you chose."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'entries', type: 'FileBrowserEntry[]', required: true, description: 'The rows.' },
          { name: 'onSelect', type: '(entry) => void', description: 'Selecting a row. Single click, the way a file manager behaves.' },
          { name: 'onOpen', type: '(entry) => void', description: 'A folder was opened, or a file activated.' },
          { name: 'selectedId', type: 'string', description: 'Which row is chosen.' },
          { name: 'highlightId', type: 'string', description: 'Which row just arrived — flashed, then scrolled into view.' },
          { name: 'match', type: 'string', description: 'Highlight this substring in the names.' },
          { name: 'onParent', type: '() => void', description: 'Offer a .. row. Omit at the root rather than disabling it.' },
          { name: 'onContextMenu', type: '(entry, e) => void', description: 'Right-click on a row.' },
          { name: 'onEmptyContextMenu', type: '(e) => void', description: 'Right-click on the empty space — which is still the directory.' },
          { name: 'actions', type: 'FileBrowserAction[]', description: 'Per-row controls.' },
          { name: 'onAction', type: '(actionId, entry) => void', description: 'One was used.' },
          { name: 'showSize / showModified', type: 'boolean', description: 'Drop a column. A search hit has no size to show.' },
          { name: 'dense', type: 'boolean', description: 'Tighter rows and smaller chips, for a list inside a dialog.' },
          { name: 'loading', type: 'boolean', description: 'Draws its own table skeleton.' },
          { name: 'emptyText', type: 'ReactNode', description: 'Shown in place of the rows when there are none.' },
          { name: 'footer', type: 'ReactNode', description: 'A summary line under the rows — counts, the command that ran.' },
          { name: 'showHeader', type: 'boolean', description: 'Column header row.' },
          { name: 'selectionColor / flashColor', type: 'string', description: 'The two states, tinted separately.' },
          { name: 'size', type: 'DuiSize', description: 'Shared size scale.' },
          { name: 'accentColor', type: 'string', description: 'Accent.' },
        ]} />
      </DocSection>

      <DocSection title="FileBrowserEntry">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Stable key.' },
          { name: 'name', type: 'string', required: true, description: 'Displayed name.' },
          { name: 'kind', type: "'file' | 'dir' | 'link' | 'other'", required: true, description: 'Drives the icon.' },
          { name: 'size', type: 'number', description: 'Bytes, formatted for you.' },
          { name: 'modified', type: 'string', description: 'Already-formatted timestamp.' },
          { name: 'detail', type: 'string', description: 'A dimmed second line.' },
          { name: 'badge', type: 'string', description: 'A chip on the row.' },
          { name: 'badgeTone', type: 'FileBrowserTone', description: 'neutral, info, success, warning, danger, accent.' },
          { name: 'linkTarget', type: 'string', description: 'Where a symlink points — drawn as a chain.' },
          { name: 'disabledReason', type: 'string', description: 'Why this row cannot be used.' },
        ]} />
      </DocSection>
    </div>
  );
}
