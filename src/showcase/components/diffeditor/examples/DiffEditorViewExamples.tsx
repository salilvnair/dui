import { DiffEditorView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const ORIGINAL = [
  'export function applyTheme(mode) {',
  '  document.documentElement.setAttribute("data-theme", mode);',
  '}',
].join('\n');

const MODIFIED = [
  'export function applyTheme(mode) {',
  '  if (mode === "system") {',
  '    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;',
  '    mode = dark ? "dark" : "light";',
  '  }',
  '  document.documentElement.setAttribute("data-theme", mode);',
  '  applyMonacoTheme(mode);',
  '}',
].join('\n');

export function DiffEditorViewExamples() {
  return (
    <>
      <ExampleCard
        title="Side by side"
        description="Monaco's diff engine when it is installed, and LineDiffView when it is not — same component either way"
        code={'<DiffEditorView original={a} modified={b} language="javascript" height={260} />'}
      >
        <div style={{ width: '100%' }}>
          <DiffEditorView original={ORIGINAL} modified={MODIFIED} language="javascript" height={260} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Inline"
        description="renderSideBySide={false} stacks the two, for a narrow pane"
        code={'<DiffEditorView renderSideBySide={false} … />'}
      >
        <div style={{ width: '100%' }}>
          <DiffEditorView
            original={ORIGINAL}
            modified={MODIFIED}
            language="javascript"
            renderSideBySide={false}
            wordWrap
            height={240}
          />
        </div>
      </ExampleCard>
    </>
  );
}
