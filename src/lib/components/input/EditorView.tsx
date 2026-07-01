import type { DuiSize } from '../../core/DuiTypes';
import type { ContextMenuItem } from '../modal/ContextMenuView';
import { useMonacoRuntimeStatus, getMonacoEditorImpl } from '../../monaco-runtime';
import { EditorViewFallback } from './EditorView.fallback';

/**
 * 'native' — Monaco's built-in context menu (default).
 * 'dui'    — suppress Monaco's menu, show DUI's ContextMenuView instead.
 * 'none'   — suppress the context menu entirely (e.g. a REPL input where
 *            right-click doesn't make sense).
 */
export type EditorContextMenuMode = 'native' | 'dui' | 'none';

// ─── Monaco option enums — use these instead of raw strings ──────────────────
// Pure value/type declarations — zero Monaco import, always safe to re-export
// from the main entry regardless of whether the consumer has Monaco installed.

export const EditorLineNumbers = { ON: 'on', OFF: 'off', RELATIVE: 'relative', INTERVAL: 'interval' } as const;
export type EditorLineNumbers = typeof EditorLineNumbers[keyof typeof EditorLineNumbers];

export const EditorWordWrap = { OFF: 'off', ON: 'on', WORD_WRAP_COLUMN: 'wordWrapColumn', BOUNDED: 'bounded' } as const;
export type EditorWordWrap = typeof EditorWordWrap[keyof typeof EditorWordWrap];

export const EditorCursorStyle = { LINE: 'line', BLOCK: 'block', UNDERLINE: 'underline', LINE_THIN: 'line-thin', BLOCK_OUTLINE: 'block-outline', UNDERLINE_THIN: 'underline-thin' } as const;
export type EditorCursorStyle = typeof EditorCursorStyle[keyof typeof EditorCursorStyle];

export const EditorCursorBlinking = { BLINK: 'blink', SMOOTH: 'smooth', PHASE: 'phase', EXPAND: 'expand', SOLID: 'solid' } as const;
export type EditorCursorBlinking = typeof EditorCursorBlinking[keyof typeof EditorCursorBlinking];

export const EditorRenderWhitespace = { NONE: 'none', BOUNDARY: 'boundary', SELECTION: 'selection', TRAILING: 'trailing', ALL: 'all' } as const;
export type EditorRenderWhitespace = typeof EditorRenderWhitespace[keyof typeof EditorRenderWhitespace];

export const EditorFoldingControls = { ALWAYS: 'always', NEVER: 'never', MOUSEOVER: 'mouseover' } as const;
export type EditorFoldingControls = typeof EditorFoldingControls[keyof typeof EditorFoldingControls];

export const EditorMatchBrackets = { NEVER: 'never', NEAR: 'near', ALWAYS: 'always' } as const;
export type EditorMatchBrackets = typeof EditorMatchBrackets[keyof typeof EditorMatchBrackets];

export const EditorAutoIndent = { NONE: 'none', KEEP: 'keep', BRACKETS: 'brackets', ADVANCED: 'advanced', FULL: 'full' } as const;
export type EditorAutoIndent = typeof EditorAutoIndent[keyof typeof EditorAutoIndent];

export const EditorAcceptSuggestion = { ON: 'on', OFF: 'off', SMART: 'smart' } as const;
export type EditorAcceptSuggestion = typeof EditorAcceptSuggestion[keyof typeof EditorAcceptSuggestion];

/**
 * Consumer-facing Monaco editor options. Use the DUI enum constants for
 * value-based fields (e.g. EditorCursorStyle.BLOCK, EditorLineNumbers.RELATIVE).
 * Ignored entirely while running in fallback mode (see EditorView.fallback.tsx).
 *
 * DUI always retains control of: contextmenu, automaticLayout, glyphMargin,
 * fixedOverflowWidgets (structural internals — not overridable).
 */
export interface EditorOptions {
  // ── Display
  lineNumbers?: EditorLineNumbers;
  /** Width reserved for line-number decorations, in px. Set 0 to remove the gutter entirely. */
  lineDecorationsWidth?: number;
  /** Minimum character width reserved for line numbers. */
  lineNumbersMinChars?: number;
  lineHeight?: number;
  letterSpacing?: number;
  rulers?: number[];
  renderWhitespace?: EditorRenderWhitespace;
  /**
   * Current-line highlight style. Defaults to 'line' when glyphMargin is
   * active (debugSupported with a breakpoint handler) and 'none' otherwise —
   * pass explicitly to override either way.
   */
  renderLineHighlight?: 'none' | 'gutter' | 'line' | 'all';
  /** Override the monospace font stack (defaults to Menlo/Monaco/Courier New). */
  fontFamily?: string;
  // ── Minimap & scrolling
  minimap?: boolean;
  scrollBeyondLastLine?: boolean;
  smoothScrolling?: boolean;
  mouseWheelZoom?: boolean;
  /** Scrollbar visibility + thickness. Defaults to 6px, always visible. */
  scrollbar?: {
    vertical?: 'auto' | 'visible' | 'hidden';
    horizontal?: 'auto' | 'visible' | 'hidden';
    verticalScrollbarSize?: number;
    horizontalScrollbarSize?: number;
  };
  // ── Cursor
  cursorStyle?: EditorCursorStyle;
  cursorBlinking?: EditorCursorBlinking;
  // ── Editing
  tabSize?: number;
  wordWrap?: EditorWordWrap;
  formatOnPaste?: boolean;
  formatOnType?: boolean;
  autoIndent?: EditorAutoIndent;
  // ── Folding & brackets
  folding?: boolean;
  showFoldingControls?: EditorFoldingControls;
  matchBrackets?: EditorMatchBrackets;
  bracketPairColorization?: boolean;
  // ── Intelligence
  quickSuggestions?: boolean;
  suggestOnTriggerCharacters?: boolean;
  acceptSuggestionOnEnter?: EditorAcceptSuggestion;
  parameterHints?: boolean;
  hover?: boolean;
  codeLens?: boolean;
  inlayHints?: boolean;
  /** Which suggestion-list sections to show. Merged over DUI's defaults (all true). */
  suggest?: {
    showKeywords?: boolean;
    showSnippets?: boolean;
    showValues?: boolean;
    showProperties?: boolean;
    showIcons?: boolean;
  };
  // ── Misc
  colorDecorators?: boolean;
  linkedEditing?: boolean;
  copyWithSyntaxHighlighting?: boolean;
  padding?: { top?: number; bottom?: number };
}

export type EditorLanguage =
  | 'javascript' | 'typescript' | 'json' | 'xml' | 'html'
  | 'css' | 'graphql' | 'python' | 'yaml' | 'sql' | 'plaintext' | 'markdown' | 'java';

export interface EditorViewProps {
  value: string;
  onChange?: (value: string) => void;
  language?: EditorLanguage;
  height?: string | number;
  minHeight?: number;
  readOnly?: boolean;
  /** Placeholder shown when value is empty */
  placeholder?: string;
  wordWrap?: boolean;
  /**
   * DUI size token — sets editor font size via EDITOR_FONT_SIZE scale (md=12, lg=13, xl=14…).
   * Ignored when `fontSize` is provided explicitly.
   */
  size?: DuiSize;
  /** Explicit font size in px — takes precedence over `size`. Defaults to 12 (md). */
  fontSize?: number;
  className?: string;
  /** Adds a rounded border matching CodeEditor appearance */
  bordered?: boolean;
  /**
   * Opt-in to full debug feature set: breakpoint gutter, variable hover,
   * navigate-to-line from RunAndDebugPanel, dk/console completions.
   * When false (default) none of these hooks or store subscriptions are active.
   * No effect in fallback mode — breakpoints are a Monaco glyph-margin concept.
   */
  debugSupported?: boolean;
  // ─── Debug props — only used when debugSupported=true (Monaco mode) ────────
  breakpoints?: number[];
  disabledBreakpoints?: number[];
  conditionalBreakpointLines?: number[];
  /** Currently paused line — shows yellow highlight */
  pausedLine?: number | null;
  onToggleBreakpoint?: (line: number) => void;
  onGlyphContextMenu?: (line: number, pos: { x: number; y: number }) => void;
  /** Receives editor + monaco instances after mount (e.g. for AI autocomplete). Not called in fallback mode. */
  onEditorMount?: (editor: any, monaco: any) => void;
  /**
   * Accent color for the Monaco scrollbar thumb. Accepts any CSS color value
   * including CSS variables (e.g. `var(--color-protocol-soap)`). When omitted
   * the global `--color-accent` is used automatically via CSS fallback.
   */
  accentColor?: string;
  /**
   * 'native' — use Monaco's built-in context menu (default).
   * 'dui'    — suppress Monaco's menu and show DUI ContextMenuView instead.
   *            Requires contextMenuItems to be provided.
   */
  contextMenuMode?: EditorContextMenuMode;
  /**
   * Items for the DUI ContextMenuView. Only used when contextMenuMode='dui'.
   * Supports icons, colors, danger styling, separators, and infinite submenus.
   */
  contextMenuItems?: ContextMenuItem[];
  /**
   * Fine-grained Monaco editor options. Consumer values are merged over DUI
   * defaults. Use the exported enum constants for value fields:
   *   cursorStyle={EditorCursorStyle.BLOCK}
   *   lineNumbers={EditorLineNumbers.RELATIVE}
   * DUI always retains: contextmenu, automaticLayout, glyphMargin, fixedOverflowWidgets.
   */
  editorOptions?: EditorOptions;
}

export type { ContextMenuItem as EditorContextMenuItem } from '../modal/ContextMenuView';

// ─── Public export — dispatcher ───────────────────────────────────────────────

/**
 * DUI's code editor. Renders the real Monaco-backed editor once the consumer
 * has installed '@monaco-editor/react' + 'monaco-editor' and imported
 * '@salilvnair/dui/monaco-setup' once at app bootstrap (self-hosted — no CDN;
 * that subpath registers the Monaco implementation into monaco-runtime.ts).
 * Until then, renders a lightweight plain-text fallback so '@salilvnair/dui'
 * never requires Monaco as a hard dependency — this file has no reference to
 * '@monaco-editor/react' or 'monaco-editor' anywhere in its module graph.
 */
export function EditorView(props: EditorViewProps) {
  const monacoStatus = useMonacoRuntimeStatus();
  const MonacoEditorView = monacoStatus === 'ready' ? getMonacoEditorImpl() : null;

  if (MonacoEditorView) return <MonacoEditorView {...props} />;
  return <EditorViewFallback {...props} />;
}
