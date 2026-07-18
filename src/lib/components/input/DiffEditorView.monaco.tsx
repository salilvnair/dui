import { DiffEditor, type DiffOnMount } from '@monaco-editor/react';
import { useAppTheme } from '../../../hooks/useAppTheme';
import type { DiffEditorViewProps } from './DiffEditorView';

// This file is only ever reached by '@salilvnair/dui/monaco-setup' — see
// EditorView.monaco.tsx for why that makes a plain top-level import safe.

export function DiffEditorViewMonacoImpl({
  original,
  modified,
  language = 'sql',
  height = 300,
  readOnly = true,
  renderSideBySide = true,
  wordWrap = false,
  fontSize = 12,
  theme,
  onMount,
}: DiffEditorViewProps) {
  const appTheme = useAppTheme();
  const resolvedTheme = theme ?? (appTheme === 'light' ? 'vs' : 'vs-dark');
  const h = typeof height === 'number' ? `${height}px` : height;

  return (
    <DiffEditor
      height={h}
      language={language}
      theme={resolvedTheme}
      original={original}
      modified={modified}
      onMount={onMount as DiffOnMount | undefined}
      options={{
        readOnly,
        renderSideBySide,
        // Monaco silently drops to inline/unified rendering below its own
        // width threshold regardless of renderSideBySide — this diff editor
        // is often mounted inside narrow panels (e.g. Merkle's expanded
        // table row), so pin side-by-side explicitly instead of letting it
        // auto-collapse.
        useInlineViewWhenSpaceIsLimited: false,
        wordWrap: wordWrap ? 'on' : 'off',
        fontSize,
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
        folding: true,
        ignoreTrimWhitespace: false,
      }}
    />
  );
}
