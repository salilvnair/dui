import Editor, { type OnMount } from '@monaco-editor/react';
import { useRef, useMemo, useEffect } from 'react';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { getDkCompletions, DK_TYPE_DEFS } from '../../../services/dk-repl';
import { initGraphQLCompletionProvider } from '../../../services/graphql-completion';
import { useEditorBase } from '../../core/EditorBase';
import { EditorShell } from './EditorView.shell';
import type { EditorViewProps, EditorLanguage, EditorOptions, EditorContextMenuMode } from './EditorView';

// ─── Debug-only imports — only loaded when debugSupported=true ─────────────────
import { useBreakpointGutter } from '../../../hooks/useBreakpointGutter';
import { useDebugVariableHover } from '../../../hooks/useDebugVariableHover';
import { useDebugStore } from '../../../store/debug-store';

// This file is only ever reached by '@salilvnair/dui/monaco-setup' — a
// separate, explicit opt-in subpath, never referenced (statically or via
// lazy()) from the main package entry. That's what makes a plain top-level
// import safe here: importing monaco-setup already requires Monaco installed.
// See monaco-runtime.ts for why an in-place lazy()/dynamic-import approach
// inside the always-loaded EditorView.tsx does not work.

let dkLibRegistered = false;

const EXT_MAP: Partial<Record<EditorLanguage, string>> = {
  javascript: '.js', typescript: '.ts', json: '.json', xml: '.xml',
  html: '.html', css: '.css', graphql: '.graphql', python: '.py',
  yaml: '.yaml', sql: '.sql', markdown: '.md', plaintext: '.txt', proto: '.proto',
};

function formatXml(xml: string): string {
  const INDENT = '  ';
  let depth = 0;
  let result = '';
  const tokens = xml.replace(/>\s*</g, '><').split(/(?<=>)(?=<)/);
  for (const token of tokens) {
    const isClosing = /^<\//.test(token);
    const isSelfClosing = /\/>$/.test(token) || /^<!/.test(token) || /^<\?/.test(token);
    if (isClosing) depth = Math.max(0, depth - 1);
    result += INDENT.repeat(depth) + token.trim() + '\n';
    if (!isClosing && !isSelfClosing && /^<[^/!?]/.test(token)) depth++;
  }
  return result.trimEnd();
}

function formatYaml(yaml: string): string {
  return yaml
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function formatSql(sql: string): string {
  const CLAUSE_RE = /\b(SELECT|DISTINCT|FROM|WHERE|INNER JOIN|LEFT JOIN|RIGHT JOIN|FULL OUTER JOIN|FULL JOIN|CROSS JOIN|JOIN|ON|AND|OR|NOT|ORDER BY|GROUP BY|HAVING|LIMIT|OFFSET|UNION ALL|UNION|INTERSECT|EXCEPT|INSERT INTO|VALUES|UPDATE|SET|DELETE FROM|CREATE TABLE|DROP TABLE|ALTER TABLE|WITH)\b/gi;
  return sql
    .replace(/\s+/g, ' ')
    .replace(CLAUSE_RE, '\n$1')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
}

// ─── Simple variant — no debug hooks at all ───────────────────────────────────

function EditorViewSimple({
  value, onChange, language = 'json', height = '200px', minHeight,
  readOnly = false, placeholder, wordWrap = true, size, fontSize,
  className = '', bordered = false, onEditorMount, contextMenuMode = 'native', contextMenuItems, editorOptions, accentColor,
}: EditorViewProps) {
  const base = useEditorBase(size);
  const resolvedFontSize = fontSize ?? base.fontSize;
  const theme = useAppTheme();
  const editorRef = useRef<any>(null);
  const disposablesRef = useRef<any[]>([]);
  const modelPath = useMemo(
    () => `inmemory://daakia/${crypto.randomUUID()}${EXT_MAP[language] || '.txt'}`,
    [language],
  );
  const resolvedHeight = typeof height === 'number' ? `${height}px` : height;
  const containerHeight = minHeight ? `max(${resolvedHeight}, ${minHeight}px)` : resolvedHeight;

  useEffect(() => {
    return () => {
      disposablesRef.current.forEach(d => d?.dispose?.());
      disposablesRef.current = [];
      const editor = editorRef.current;
      if (editor) { const m = editor.getModel(); if (m) m.dispose(); }
    };
  }, []);

  // No manual model.setValue() sync here — the controlled `value` prop on
  // <Editor> below already keeps the model in sync on every change (that's
  // what "controlled" means for @monaco-editor/react, readOnly or not). A
  // redundant manual setValue() bypass used to live here; it fired in a
  // separate, later effect than the library's own internal sync, triggering
  // a second, out-of-band re-tokenization pass — which is what caused
  // readOnly editors (e.g. Daakia's response JSON viewer) to briefly render
  // monochrome and only pick up real syntax colors a moment later.

  const handleMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    disposablesRef.current = [];
    mountCommon(editor, monacoInstance, { language, value, placeholder, onEditorMount, contextMenuMode });
  };

  const resolvedTheme = theme === 'light' ? 'daakia-light' : 'daakia-dark';

  return (
    <EditorShell bordered={bordered} containerHeight={containerHeight} contextMenuMode={contextMenuMode} contextMenuItems={contextMenuItems} accentColor={accentColor}>
      <Editor
        height="100%"
        language={language}
        path={modelPath}
        value={value}
        theme={resolvedTheme}
        onChange={v => onChange?.(v ?? '')}
        onMount={handleMount}
        options={buildOptions({ readOnly, fontSize: resolvedFontSize, wordWrap, glyphMargin: false, contextMenuMode, editorOptions, theme: resolvedTheme })}
      />
    </EditorShell>
  );
}

// ─── Debug variant — subscribes to debug store + breakpoint hooks ─────────────

function EditorViewDebug({
  value, onChange, language = 'json', height = '200px', minHeight,
  readOnly = false, placeholder, wordWrap = true, size, fontSize,
  className = '', bordered = false,
  breakpoints, disabledBreakpoints, conditionalBreakpointLines, pausedLine,
  onToggleBreakpoint, onGlyphContextMenu, onEditorMount, contextMenuMode = 'native', contextMenuItems, editorOptions, accentColor,
}: EditorViewProps) {
  const base = useEditorBase(size);
  const resolvedFontSize = fontSize ?? base.fontSize;
  const theme = useAppTheme();
  const editorRef = useRef<any>(null);
  const disposablesRef = useRef<any[]>([]);
  const modelPath = useMemo(
    () => `inmemory://daakia/${crypto.randomUUID()}${EXT_MAP[language] || '.txt'}`,
    [language],
  );
  const resolvedHeight = typeof height === 'number' ? `${height}px` : height;
  const containerHeight = minHeight ? `max(${resolvedHeight}, ${minHeight}px)` : resolvedHeight;

  // Debug hooks — always called here (React rules), never called in Simple variant
  const { attach: attachBreakpointGutter } = useBreakpointGutter({
    breakpoints, disabledBreakpoints, conditionalBreakpointLines, pausedLine,
    onToggleBreakpoint, onGlyphContextMenu,
  });
  const { attach: attachDebugHover } = useDebugVariableHover();
  const navigateLine = useDebugStore(s => s.navigateLine);

  useEffect(() => {
    return () => {
      disposablesRef.current.forEach(d => d?.dispose?.());
      disposablesRef.current = [];
      const editor = editorRef.current;
      if (editor) { const m = editor.getModel(); if (m) m.dispose(); }
    };
  }, []);

  // See EditorViewSimple above — no manual model.setValue() sync needed;
  // the controlled `value` prop on <Editor> below already handles it, and a
  // redundant bypass here caused the same delayed-tokenization symptom.

  useEffect(() => {
    if (!navigateLine || !editorRef.current || !breakpoints) return;
    editorRef.current.revealLineInCenter(navigateLine);
    editorRef.current.setPosition({ lineNumber: navigateLine, column: 1 });
    useDebugStore.getState().setNavigateLine(null);
  }, [navigateLine, breakpoints]);

  const handleMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    disposablesRef.current = [];
    // Attach debug features
    attachBreakpointGutter(editor, monacoInstance);
    attachDebugHover(editor, monacoInstance);
    mountCommon(editor, monacoInstance, { language, value, placeholder, onEditorMount, contextMenuMode });
  };

  const resolvedTheme = theme === 'light' ? 'daakia-light' : 'daakia-dark';

  return (
    <EditorShell bordered={bordered} containerHeight={containerHeight} contextMenuMode={contextMenuMode} contextMenuItems={contextMenuItems} accentColor={accentColor}>
      <Editor
        height="100%"
        language={language}
        path={modelPath}
        value={value}
        theme={resolvedTheme}
        onChange={v => onChange?.(v ?? '')}
        onMount={handleMount}
        options={buildOptions({ readOnly, fontSize: resolvedFontSize, wordWrap, glyphMargin: !!onToggleBreakpoint, contextMenuMode, editorOptions, theme: resolvedTheme })}
      />
    </EditorShell>
  );
}

// ─── Public export — registered into monaco-runtime by monaco-setup.ts ──────

export function EditorViewMonacoImpl({ debugSupported = false, className = '', ...rest }: EditorViewProps) {
  if (debugSupported) return <EditorViewDebug className={className} {...rest} />;
  return <EditorViewSimple className={className} {...rest} />;
}

// ─── Shared Monaco options builder ───────────────────────────────────────────

function buildOptions({ readOnly, fontSize, wordWrap, glyphMargin, contextMenuMode = 'native', editorOptions, theme }: {
  readOnly: boolean;
  fontSize: number;
  wordWrap: boolean;
  glyphMargin: boolean;
  contextMenuMode?: EditorContextMenuMode;
  editorOptions?: EditorOptions;
  theme: string;
}) {
  const o = editorOptions ?? {};
  return {
    // Baked into construction options (not just the top-level <Editor theme=""> prop)
    // so Monaco applies it before its first paint — @monaco-editor/react creates the
    // editor first and only calls the global setTheme() afterward as a separate step,
    // which is what caused a flash of the default white 'vs' theme on every remount
    // (tab switch, subtab switch, new-tab-then-close) before this fix.
    theme,
    // ── Consumer-overridable defaults ────────────────────────────────────────
    lineNumbers: (o.lineNumbers ?? 'on') as 'on' | 'off' | 'relative' | 'interval',
    minimap: { enabled: o.minimap ?? false },
    scrollBeyondLastLine: o.scrollBeyondLastLine ?? false,
    smoothScrolling: o.smoothScrolling ?? false,
    mouseWheelZoom: o.mouseWheelZoom ?? false,
    folding: o.folding ?? true,
    showFoldingControls: (o.showFoldingControls ?? 'mouseover') as 'always' | 'never' | 'mouseover',
    tabSize: o.tabSize ?? 2,
    formatOnPaste: o.formatOnPaste ?? true,
    formatOnType: o.formatOnType ?? true,
    autoIndent: (o.autoIndent ?? 'full') as 'none' | 'keep' | 'brackets' | 'advanced' | 'full',
    renderWhitespace: (o.renderWhitespace ?? 'selection') as 'none' | 'boundary' | 'selection' | 'trailing' | 'all',
    matchBrackets: (o.matchBrackets ?? 'always') as 'never' | 'near' | 'always',
    bracketPairColorization: { enabled: o.bracketPairColorization ?? true },
    colorDecorators: o.colorDecorators ?? true,
    linkedEditing: o.linkedEditing ?? true,
    copyWithSyntaxHighlighting: o.copyWithSyntaxHighlighting ?? true,
    quickSuggestions: o.quickSuggestions ?? true,
    suggestOnTriggerCharacters: o.suggestOnTriggerCharacters ?? true,
    acceptSuggestionOnEnter: (o.acceptSuggestionOnEnter ?? 'on') as 'on' | 'off' | 'smart',
    hover: { enabled: o.hover ?? true },
    parameterHints: { enabled: o.parameterHints ?? true },
    codeLens: o.codeLens ?? false,
    inlayHints: { enabled: (o.inlayHints ?? false) ? 'on' as const : 'off' as const },
    padding: { top: o.padding?.top ?? 8, bottom: o.padding?.bottom ?? 8 },
    ...(o.cursorStyle && { cursorStyle: o.cursorStyle as any }),
    ...(o.cursorBlinking && { cursorBlinking: o.cursorBlinking as any }),
    ...(o.lineHeight && { lineHeight: o.lineHeight }),
    ...(o.letterSpacing && { letterSpacing: o.letterSpacing }),
    ...(o.rulers && { rulers: o.rulers }),
    ...(o.lineDecorationsWidth !== undefined && { lineDecorationsWidth: o.lineDecorationsWidth }),
    ...(o.lineNumbersMinChars !== undefined && { lineNumbersMinChars: o.lineNumbersMinChars }),
    // ── Prop-level overrides (top-level EditorView props win over editorOptions) ─
    readOnly,
    fontSize,
    wordWrap: (o.wordWrap ?? (wordWrap ? 'on' : 'off')) as 'off' | 'on' | 'wordWrapColumn' | 'bounded',
    // ── DUI structural — never overridable ──────────────────────────────────
    automaticLayout: true,
    glyphMargin,
    renderLineHighlight: (o.renderLineHighlight ?? (glyphMargin ? 'line' : 'none')) as 'none' | 'gutter' | 'line' | 'all',
    fixedOverflowWidgets: true,
    contextmenu: contextMenuMode === 'native',
    overviewRulerLanes: 0,
    hideCursorInOverviewRuler: true,
    overviewRulerBorder: false,
    scrollbar: {
      vertical: o.scrollbar?.vertical ?? 'auto',
      horizontal: o.scrollbar?.horizontal ?? 'auto',
      verticalScrollbarSize: o.scrollbar?.verticalScrollbarSize ?? 6,
      horizontalScrollbarSize: o.scrollbar?.horizontalScrollbarSize ?? 6,
    },
    fontFamily: o.fontFamily ?? 'Menlo, Monaco, "Courier New", monospace',
    autoClosingBrackets: 'always' as const,
    autoClosingQuotes: 'always' as const,
    autoClosingDelete: 'always' as const,
    autoSurround: 'languageDefined' as const,
    guides: { bracketPairs: true, indentation: true },
    suggest: {
      showKeywords: o.suggest?.showKeywords ?? true,
      showSnippets: o.suggest?.showSnippets ?? true,
      showValues: o.suggest?.showValues ?? true,
      showProperties: o.suggest?.showProperties ?? true,
      ...(o.suggest?.showIcons !== undefined && { showIcons: o.suggest.showIcons }),
    },
  };
}

// ─── Shared mount logic (everything that isn't debug-specific) ────────────────

function mountCommon(
  editor: any,
  monacoInstance: any,
  { language, value, placeholder, onEditorMount, contextMenuMode = 'native' }: {
    language: EditorLanguage;
    value: string;
    placeholder?: string;
    onEditorMount?: (editor: any, monaco: any) => void;
    contextMenuMode?: EditorContextMenuMode;
  },
) {
  // Layout fixes for flex/overflow containers
  const relayout = () => editor.layout();
  relayout();
  requestAnimationFrame(relayout);
  setTimeout(relayout, 50);
  setTimeout(relayout, 200);
  const parent = editor.getContainerDomNode().parentElement;
  if (parent) {
    const ro = new ResizeObserver(relayout);
    ro.observe(parent);
    editor.onDidDispose(() => ro.disconnect());
  }

  editor.updateOptions({
    autoClosingBrackets: 'always', autoClosingQuotes: 'always',
    autoClosingDelete: 'always', autoSurround: 'languageDefined', autoIndent: 'full',
  });

  // Clipboard overrides — modern Clipboard API (webview-compatible)
  const KM = monacoInstance.KeyMod;
  const KC = monacoInstance.KeyCode;

  editor.addAction({
    id: 'daakia.clipboard.copy', label: 'Copy',
    keybindings: [KM.CtrlCmd | KC.KeyC],
    run: (ed: any) => {
      const sel = ed.getSelection();
      if (sel && !sel.isEmpty()) {
        navigator.clipboard.writeText(ed.getModel()?.getValueInRange(sel) || '');
      } else {
        const pos = ed.getPosition();
        if (pos) navigator.clipboard.writeText((ed.getModel()?.getLineContent(pos.lineNumber) || '') + '\n');
      }
    },
  });

  editor.addAction({
    id: 'daakia.clipboard.cut', label: 'Cut',
    keybindings: [KM.CtrlCmd | KC.KeyX],
    run: (ed: any) => {
      const sel = ed.getSelection();
      if (sel && !sel.isEmpty()) {
        navigator.clipboard.writeText(ed.getModel()?.getValueInRange(sel) || '');
        ed.executeEdits('cut', [{ range: sel, text: '' }]);
      } else {
        const pos = ed.getPosition();
        if (pos) {
          const model = ed.getModel();
          if (model) {
            navigator.clipboard.writeText(model.getLineContent(pos.lineNumber) + '\n');
            ed.executeEdits('cut', [{ range: new monacoInstance.Range(pos.lineNumber, 1, pos.lineNumber + 1, 1), text: '' }]);
          }
        }
      }
    },
  });

  editor.addAction({
    id: 'daakia.clipboard.paste', label: 'Paste',
    keybindings: [KM.CtrlCmd | KC.KeyV],
    run: async (ed: any) => {
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          const sel = ed.getSelection();
          if (sel) ed.executeEdits('paste', [{ range: sel, text, forceMoveMarkers: true }]);
        }
      } catch { /* clipboard permission denied */ }
    },
  });

  editor.addAction({
    id: 'daakia.clipboard.selectAll', label: 'Select All',
    keybindings: [KM.CtrlCmd | KC.KeyA],
    run: (ed: any) => { const m = ed.getModel(); if (m) ed.setSelection(m.getFullModelRange()); },
  });

  // Format Document — Shift+Alt+F
  editor.addAction({
    id: 'daakia.format.document', label: 'Format Document',
    keybindings: [KM.Shift | KM.Alt | KC.KeyF],
    contextMenuGroupId: 'modification', contextMenuOrder: 1.5,
    run: async (ed: any) => {
      const model = ed.getModel();
      if (!model) return;
      const langId = model.getLanguageId();
      if (langId === 'xml' || langId === 'html') {
        try {
          const raw = model.getValue();
          const formatted = formatXml(raw);
          if (formatted !== raw) ed.executeEdits('daakia.format', [{ range: model.getFullModelRange(), text: formatted }]);
        } catch { /* malformed XML */ }
      } else if (langId === 'yaml') {
        try {
          const raw = model.getValue();
          const formatted = formatYaml(raw);
          if (formatted !== raw) ed.executeEdits('daakia.format', [{ range: model.getFullModelRange(), text: formatted }]);
        } catch { /* malformed YAML */ }
      } else if (langId === 'sql') {
        try {
          const raw = model.getValue();
          const formatted = formatSql(raw);
          if (formatted !== raw) ed.executeEdits('daakia.format', [{ range: model.getFullModelRange(), text: formatted }]);
        } catch { /* malformed SQL */ }
      } else {
        await ed.getAction('editor.action.formatDocument')?.run();
      }
    },
  });

  // Find & Replace — Ctrl+Shift+H
  editor.addAction({
    id: 'daakia.findAndReplace', label: 'Find and Replace',
    keybindings: [KM.CtrlCmd | KM.Shift | KC.KeyH],
    contextMenuGroupId: 'navigation', contextMenuOrder: 1.5,
    run: () => editor.getAction('editor.action.startFindReplaceAction')?.run(),
  });

  // Auto-closing config per language
  const model = editor.getModel();
  if (model) {
    const langId = model.getLanguageId();
    if (langId === 'xml' || langId === 'html') {
      monacoInstance.languages.setLanguageConfiguration(langId, {
        autoClosingPairs: [
          { open: '{', close: '}' }, { open: '[', close: ']' }, { open: '(', close: ')' },
          { open: '"', close: '"', notIn: ['string'] },
          { open: "'", close: "'", notIn: ['string', 'comment'] },
          { open: '<', close: '>', notIn: ['string'] },
        ],
        brackets: [['{', '}'], ['[', ']'], ['(', ')'], ['<', '>']],
        surroundingPairs: [
          { open: '{', close: '}' }, { open: '[', close: ']' }, { open: '(', close: ')' },
          { open: '"', close: '"' }, { open: "'", close: "'" }, { open: '<', close: '>' },
        ],
        onEnterRules: [
          {
            beforeText: /<([_:\w][_:\w\-.\d]*)([^/>]*(?!\/)>)\s*$/i,
            afterText: /^<\/([_:\w][_:\w\-.\d]*)\s*>$/i,
            action: { indentAction: monacoInstance.languages.IndentAction.IndentOutdent },
          },
          {
            beforeText: /<([_:\w][_:\w\-.\d]*)([^/>]*(?!\/)>)\s*$/i,
            action: { indentAction: monacoInstance.languages.IndentAction.Indent },
          },
        ],
        wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\$\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
      });
      monacoInstance.languages.registerCompletionItemProvider(langId, {
        triggerCharacters: ['/'],
        provideCompletionItems: (mdl: any, position: any) => {
          const textUntilPosition = mdl.getValueInRange({
            startLineNumber: 1, startColumn: 1,
            endLineNumber: position.lineNumber, endColumn: position.column,
          });
          const match = textUntilPosition.match(/<\/\s*$/);
          if (match) {
            const openTags: string[] = [];
            const tagRegex = /<\/?([_:\w][_:\w\-.\d]*)[^>]*\/?>/g;
            let m;
            while ((m = tagRegex.exec(textUntilPosition.slice(0, -2))) !== null) {
              if (m[0].startsWith('</')) openTags.pop();
              else if (!m[0].endsWith('/>')) openTags.push(m[1]);
            }
            const lastOpen = openTags[openTags.length - 1];
            if (lastOpen) {
              return {
                suggestions: [{
                  label: `/${lastOpen}>`,
                  kind: monacoInstance.languages.CompletionItemKind.Keyword,
                  insertText: `${lastOpen}>`,
                  range: {
                    startLineNumber: position.lineNumber, startColumn: position.column,
                    endLineNumber: position.lineNumber, endColumn: position.column,
                  },
                }],
              };
            }
          }
          return { suggestions: [] };
        },
      });
    } else {
      monacoInstance.languages.setLanguageConfiguration(langId, {
        autoClosingPairs: [
          { open: '{', close: '}' }, { open: '[', close: ']' }, { open: '(', close: ')' },
          { open: '"', close: '"', notIn: ['string'] },
          { open: "'", close: "'", notIn: ['string', 'comment'] },
        ],
        brackets: [['{', '}'], ['[', ']'], ['(', ')']],
        surroundingPairs: [
          { open: '{', close: '}' }, { open: '[', close: ']' }, { open: '(', close: ')' },
          { open: '"', close: '"' }, { open: "'", close: "'" },
        ],
      });
    }
  }

  // GraphQL tokenizer + completion
  const langs = monacoInstance.languages.getLanguages();
  if (!langs.some((l: any) => l.id === 'graphql')) {
    monacoInstance.languages.register({ id: 'graphql' });
    monacoInstance.languages.setMonarchTokensProvider('graphql', {
      keywords: ['type', 'input', 'enum', 'union', 'interface', 'scalar', 'schema', 'query', 'mutation', 'subscription', 'fragment', 'on', 'extend', 'implements', 'directive', 'repeatable'],
      typeKeywords: ['String', 'Int', 'Float', 'Boolean', 'ID'],
      operators: ['!', '=', '|', '&', '...'],
      symbols: /[=!|&]+/,
      tokenizer: {
        root: [
          [/#.*$/, 'comment'], [/"([^"\\]|\\.)*"/, 'string'], [/"""[\s\S]*?"""/, 'string'],
          [/\b(type|input|enum|union|interface|scalar|schema|extend|implements|directive|repeatable)\b/, 'keyword'],
          [/\b(query|mutation|subscription|fragment|on)\b/, 'keyword.control'],
          [/\b(String|Int|Float|Boolean|ID)\b/, 'type.identifier'],
          [/\b[A-Z][a-zA-Z0-9_]*\b/, 'type.identifier'],
          [/\b[a-z_][a-zA-Z0-9_]*(?=\s*[:(])/, 'variable'],
          [/\b[a-z_][a-zA-Z0-9_]*\b/, 'identifier'],
          [/[{}()\[\]]/, '@brackets'], [/[!:=|&]/, 'operator'],
          [/\$[a-zA-Z_]\w*/, 'variable'], [/@[a-zA-Z_]\w*/, 'annotation'],
        ],
      },
    } as any);
  }
  if (language === 'graphql') initGraphQLCompletionProvider(monacoInstance);

  // dk + console intellisense — JavaScript editors only
  if (language === 'javascript') {
    if (!dkLibRegistered) {
      monacoInstance.languages.typescript.javascriptDefaults.addExtraLib(DK_TYPE_DEFS, 'dk-globals.d.ts');
      dkLibRegistered = true;
    }
    monacoInstance.languages.registerCompletionItemProvider('javascript', {
      triggerCharacters: ['.'],
      provideCompletionItems: (mdl: any, pos: any) => {
        const textUntilPosition = mdl.getValueInRange({
          startLineNumber: pos.lineNumber, startColumn: 1,
          endLineNumber: pos.lineNumber, endColumn: pos.column,
        });
        const suggestions = getDkCompletions(textUntilPosition, monacoInstance, pos);
        if (suggestions.length > 0) return { suggestions };
        const range = { startLineNumber: pos.lineNumber, endLineNumber: pos.lineNumber, startColumn: pos.column, endColumn: pos.column };
        if (/\bconsole\.\s*$/.test(textUntilPosition)) {
          return {
            suggestions: [
              { label: 'log', kind: monacoInstance.languages.CompletionItemKind.Function, insertText: 'log(${1})', insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Log output', range },
              { label: 'info', kind: monacoInstance.languages.CompletionItemKind.Function, insertText: 'info(${1})', insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Info output', range },
              { label: 'warn', kind: monacoInstance.languages.CompletionItemKind.Function, insertText: 'warn(${1})', insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Warning output', range },
              { label: 'error', kind: monacoInstance.languages.CompletionItemKind.Function, insertText: 'error(${1})', insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Error output', range },
              { label: 'debug', kind: monacoInstance.languages.CompletionItemKind.Function, insertText: 'debug(${1})', insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet, detail: 'Debug output', range },
            ],
          };
        }
        return { suggestions: [] };
      },
    });
  }

  if (!value && placeholder) editor.updateOptions({ placeholder });
  onEditorMount?.(editor, monacoInstance);
  editor.updateOptions({ contextmenu: contextMenuMode === 'native' });
}
