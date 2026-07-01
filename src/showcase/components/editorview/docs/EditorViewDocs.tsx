import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, InlineCode } from '../../../shared/DocComponents';

export function EditorViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>

      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Monaco Editor core', color: 'var(--color-primary)' },
          { label: '12 languages', color: 'var(--color-info)' },
          { label: 'Read-only mode', color: 'var(--color-text-muted)' },
          { label: 'DUI context menu', color: 'var(--color-success)' },
          { label: 'Native context menu', color: 'var(--color-text-muted)' },
          { label: 'EditorOptions API', color: '#a855f7' },
          { label: '9 Monaco enums', color: '#ec4899' },
          { label: 'Auto-layout', color: 'var(--color-warning)' },
          { label: 'Theme sync', color: 'var(--color-success)' },
          { label: 'dk.* IntelliSense', color: '#14b8a6' },
          { label: 'GraphQL completions', color: 'var(--color-primary)' },
          { label: 'XML auto-format', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocNote type="tip">
        Use <InlineCode>contextMenuMode="dui"</InlineCode> with <InlineCode>contextMenuItems</InlineCode> to replace Monaco's default right-click menu with DUI's recursive ContextMenuView — supports icons, submenus, danger items, and separators.
      </DocNote>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'value',            type: 'string',                  required: true,  description: 'Current editor content — controlled.' },
          { name: 'onChange',         type: '(val: string) => void',                    description: 'Called on every change with the new full content string.' },
          { name: 'language',         type: 'EditorLanguage',          default: "'json'",      description: 'Syntax highlighting language. See EditorLanguage enum below.' },
          { name: 'height',           type: 'string | number',         default: '300',         description: "Editor container height. Pass a number (pixels) or a CSS string like '200px' or '40vh'." },
          { name: 'readOnly',         type: 'boolean',                 default: 'false',       description: 'Disable all editing. Editor becomes a styled read-only viewer.' },
          { name: 'fontSize',         type: 'number',                  default: '12',          description: 'Editor font size in pixels.' },
          { name: 'wordWrap',         type: "'on' | 'off'",            default: "'off'",       description: "Quick soft word-wrap toggle. Overridden by editorOptions.wordWrap if both are set — use one or the other." },
          { name: 'glyphMargin',      type: 'boolean',                 default: 'false',       description: 'Reserve space for the glyph margin column. Required when using DebugEditorView breakpoint glyphs.' },
          { name: 'placeholder',      type: 'string',                  description: 'Placeholder text shown when the editor is empty.' },
          { name: 'contextMenuMode',  type: 'EditorContextMenuMode',   default: "'native'",    description: "Controls right-click menu. 'native' = Monaco default. 'dui' = suppress Monaco menu and show DUI ContextMenuView at cursor position." },
          { name: 'contextMenuItems', type: 'ContextMenuItem[]',       description: "Menu items for DUI context menu. Only active when contextMenuMode='dui'. Supports icons, separators, danger, submenus." },
          { name: 'editorOptions',    type: 'EditorOptions',           description: 'Fine-grained Monaco editor options. Consumer values override DUI defaults. DUI always controls: automaticLayout, contextmenu, fixedOverflowWidgets, glyphMargin.' },
          { name: 'accentColor',      type: 'string',                  description: 'CSS color for cursor and selection highlight.' },
          { name: 'style',            type: 'CSSProperties',           description: 'Style applied to the editor container div.' },
          { name: 'className',        type: 'string',                  description: 'CSS class name for the editor container.' },
        ]} />
      </DocSection>

      <DocSection title="EditorLanguage" description="Syntax highlighting languages supported by MonacoEditor.">
        <EnumTable name="EditorLanguage" values={[
          { value: 'json',        description: 'JSON — default language' },
          { value: 'javascript',  description: 'JavaScript (.js)' },
          { value: 'typescript',  description: 'TypeScript (.ts)' },
          { value: 'graphql',     description: 'GraphQL schema + queries', color: '#e535ab' },
          { value: 'xml',         description: 'XML / SOAP / HTML' },
          { value: 'html',        description: 'HTML markup' },
          { value: 'css',         description: 'CSS stylesheets' },
          { value: 'yaml',        description: 'YAML configuration' },
          { value: 'python',      description: 'Python (.py)' },
          { value: 'markdown',    description: 'Markdown text' },
          { value: 'plaintext',   description: 'No highlighting' },
          { value: 'java',        description: 'Java source' },
        ]} />
      </DocSection>

      <DocSection title="EditorContextMenuMode" description="Controls which context menu appears on right-click.">
        <EnumTable name="EditorContextMenuMode" values={[
          { value: 'native', description: "Monaco's default context menu (Format, Find, etc.)", color: 'var(--color-text-muted)' },
          { value: 'dui',    description: 'Suppress Monaco menu — show DUI ContextMenuView with contextMenuItems', color: 'var(--color-success)' },
        ]} />
      </DocSection>

      <DocSection title="EditorOptions" description="All fields are optional. Consumer values override DUI defaults. Structural options (automaticLayout, contextmenu, fixedOverflowWidgets, glyphMargin) are always controlled by DUI and cannot be overridden.">
        <PropTable props={[
          // Display
          { name: 'lineNumbers',                 type: 'EditorLineNumbers',         default: "'on'",         description: "Line number display mode." },
          { name: 'lineHeight',                  type: 'number',                    description: 'Line height in pixels.' },
          { name: 'letterSpacing',               type: 'number',                    description: 'Letter spacing in pixels.' },
          { name: 'rulers',                      type: 'number[]',                  description: 'Column ruler positions (e.g. [80, 120]).' },
          { name: 'renderWhitespace',            type: 'EditorRenderWhitespace',    default: "'none'",       description: 'Whitespace character rendering.' },
          // Minimap & scroll
          { name: 'minimap',                     type: 'boolean',                   default: 'false',        description: 'Show Monaco minimap.' },
          { name: 'scrollBeyondLastLine',        type: 'boolean',                   default: 'false',        description: 'Allow scrolling past the last line.' },
          { name: 'smoothScrolling',             type: 'boolean',                   default: 'false',        description: 'Smooth animated scrolling.' },
          { name: 'mouseWheelZoom',              type: 'boolean',                   default: 'false',        description: 'Ctrl+scroll to zoom font size.' },
          // Cursor
          { name: 'cursorStyle',                 type: 'EditorCursorStyle',         default: "'line'",       description: 'Shape of the text cursor.' },
          { name: 'cursorBlinking',              type: 'EditorCursorBlinking',      default: "'blink'",      description: 'Cursor blink animation style.' },
          // Editing
          { name: 'tabSize',                     type: 'number',                    default: '2',            description: 'Number of spaces per tab character.' },
          { name: 'wordWrap',                    type: 'EditorWordWrap',            default: "'off'",        description: 'Word wrap behavior.' },
          { name: 'formatOnPaste',               type: 'boolean',                   default: 'false',        description: 'Auto-format content on paste.' },
          { name: 'formatOnType',                type: 'boolean',                   default: 'false',        description: 'Auto-format as user types.' },
          { name: 'autoIndent',                  type: 'EditorAutoIndent',          default: "'keep'",       description: 'Auto-indent strategy.' },
          // Folding
          { name: 'folding',                     type: 'boolean',                   default: 'true',         description: 'Enable code folding.' },
          { name: 'showFoldingControls',         type: 'EditorFoldingControls',     default: "'mouseover'",  description: 'When to show folding arrows.' },
          { name: 'matchBrackets',               type: 'EditorMatchBrackets',       default: "'always'",     description: 'Bracket matching highlight.' },
          { name: 'bracketPairColorization',     type: 'boolean',                   default: 'true',         description: 'Color-code bracket pairs.' },
          // Intelligence
          { name: 'quickSuggestions',            type: 'boolean',                   default: 'true',         description: 'IntelliSense auto-trigger suggestions.' },
          { name: 'suggestOnTriggerCharacters',  type: 'boolean',                   default: 'true',         description: 'Show suggestions on trigger chars (., (, etc.).' },
          { name: 'acceptSuggestionOnEnter',     type: 'EditorAcceptSuggestion',    default: "'on'",         description: 'Accept suggestion on Enter key.' },
          { name: 'parameterHints',              type: 'boolean',                   default: 'true',         description: 'Show function parameter hints.' },
          { name: 'hover',                       type: 'boolean',                   default: 'true',         description: 'Show hover tooltip on token.' },
          { name: 'codeLens',                    type: 'boolean',                   default: 'false',        description: 'Show CodeLens annotations above code.' },
          { name: 'inlayHints',                  type: 'boolean',                   default: 'false',        description: 'Show inline type/value hints.' },
          // Misc
          { name: 'colorDecorators',             type: 'boolean',                   default: 'true',         description: 'Color swatch decorators for CSS color values.' },
          { name: 'linkedEditing',               type: 'boolean',                   default: 'false',        description: 'Linked renaming (rename tag opens closing tag).' },
          { name: 'copyWithSyntaxHighlighting',  type: 'boolean',                   default: 'true',         description: 'Include syntax highlighting when copying to clipboard.' },
          { name: 'padding',                     type: '{ top?: number; bottom?: number }', description: 'Editor content padding in pixels.' },
        ]} />
      </DocSection>

      <DocSection title="Monaco Enums" description="Use these const enum objects instead of raw strings for type-safety and IntelliSense.">
        <EnumTable name="EditorLineNumbers" values={[
          { value: 'EditorLineNumbers.ON',       description: 'Show absolute line numbers', color: 'var(--color-success)' },
          { value: 'EditorLineNumbers.OFF',      description: 'Hide line numbers', color: 'var(--color-text-muted)' },
          { value: 'EditorLineNumbers.RELATIVE', description: 'Show relative line numbers (vim-style)', color: 'var(--color-primary)' },
          { value: 'EditorLineNumbers.INTERVAL', description: 'Show numbers at intervals only', color: 'var(--color-info)' },
        ]} />
        <EnumTable name="EditorCursorStyle" values={[
          { value: 'EditorCursorStyle.LINE',          description: 'Thin vertical bar (default)', color: 'var(--color-primary)' },
          { value: 'EditorCursorStyle.BLOCK',         description: 'Full block cursor', color: '#a855f7' },
          { value: 'EditorCursorStyle.UNDERLINE',     description: 'Underline cursor', color: 'var(--color-info)' },
          { value: 'EditorCursorStyle.LINE_THIN',     description: 'Thinner line', color: 'var(--color-text-muted)' },
          { value: 'EditorCursorStyle.BLOCK_OUTLINE', description: 'Block outline only', color: 'var(--color-warning)' },
          { value: 'EditorCursorStyle.UNDERLINE_THIN',description: 'Thin underline', color: 'var(--color-text-muted)' },
        ]} />
        <EnumTable name="EditorCursorBlinking" values={[
          { value: 'EditorCursorBlinking.BLINK',  description: 'Standard on/off blink', color: 'var(--color-primary)' },
          { value: 'EditorCursorBlinking.SMOOTH', description: 'Fade in/out blink', color: 'var(--color-success)' },
          { value: 'EditorCursorBlinking.PHASE',  description: 'Phase animation', color: '#a855f7' },
          { value: 'EditorCursorBlinking.EXPAND', description: 'Expand animation', color: 'var(--color-warning)' },
          { value: 'EditorCursorBlinking.SOLID',  description: 'No blinking — always visible', color: 'var(--color-info)' },
        ]} />
        <EnumTable name="EditorWordWrap" values={[
          { value: 'EditorWordWrap.OFF',              description: 'No word wrap (default)', color: 'var(--color-text-muted)' },
          { value: 'EditorWordWrap.ON',               description: 'Wrap at viewport width', color: 'var(--color-success)' },
          { value: 'EditorWordWrap.WORD_WRAP_COLUMN', description: 'Wrap at wordWrapColumn setting', color: 'var(--color-primary)' },
          { value: 'EditorWordWrap.BOUNDED',          description: 'Wrap at min(viewport, wordWrapColumn)', color: 'var(--color-info)' },
        ]} />
        <EnumTable name="EditorRenderWhitespace" values={[
          { value: 'EditorRenderWhitespace.NONE',      description: 'Hidden (default)', color: 'var(--color-text-muted)' },
          { value: 'EditorRenderWhitespace.BOUNDARY',  description: 'Only leading/trailing', color: 'var(--color-warning)' },
          { value: 'EditorRenderWhitespace.SELECTION', description: 'Only in selected text', color: 'var(--color-info)' },
          { value: 'EditorRenderWhitespace.TRAILING',  description: 'Only trailing whitespace', color: '#ec4899' },
          { value: 'EditorRenderWhitespace.ALL',       description: 'All whitespace visible', color: 'var(--color-success)' },
        ]} />
        <EnumTable name="EditorFoldingControls" values={[
          { value: 'EditorFoldingControls.ALWAYS',     description: 'Always show fold arrows', color: 'var(--color-primary)' },
          { value: 'EditorFoldingControls.NEVER',      description: 'Hide fold arrows entirely', color: 'var(--color-text-muted)' },
          { value: 'EditorFoldingControls.MOUSEOVER',  description: 'Show on hover (default)', color: 'var(--color-success)' },
        ]} />
        <EnumTable name="EditorAutoIndent" values={[
          { value: 'EditorAutoIndent.NONE',      description: 'No auto-indent', color: 'var(--color-text-muted)' },
          { value: 'EditorAutoIndent.KEEP',      description: 'Keep current indentation (default)', color: 'var(--color-info)' },
          { value: 'EditorAutoIndent.BRACKETS',  description: 'Indent inside brackets', color: 'var(--color-primary)' },
          { value: 'EditorAutoIndent.ADVANCED',  description: 'Language-aware advanced indent', color: 'var(--color-warning)' },
          { value: 'EditorAutoIndent.FULL',      description: 'Full language-specific indent', color: 'var(--color-success)' },
        ]} />
        <EnumTable name="EditorAcceptSuggestion" values={[
          { value: 'EditorAcceptSuggestion.ON',    description: 'Enter always accepts suggestion (default)', color: 'var(--color-success)' },
          { value: 'EditorAcceptSuggestion.OFF',   description: 'Enter never accepts', color: 'var(--color-text-muted)' },
          { value: 'EditorAcceptSuggestion.SMART', description: 'Enter accepts only when suggestion is first', color: 'var(--color-primary)' },
        ]} />
      </DocSection>

      <DocNote type="warning">
        <strong>DUI-owned options</strong> — these are always set by DUI and cannot be overridden via <InlineCode>editorOptions</InlineCode>:{' '}
        <InlineCode>automaticLayout</InlineCode>, <InlineCode>contextmenu</InlineCode>, <InlineCode>fixedOverflowWidgets</InlineCode>, <InlineCode>glyphMargin</InlineCode>.
        They are structural requirements of the DUI editor shell and breakpoint gutter.
      </DocNote>

      <DocNote type="info">
        <strong>DebugEditorView</strong> is a specialized variant of EditorView that adds breakpoint gutter clicks, paused-line highlight, and variable-hover tooltips. See the DebugEditorView panel for its own props and adapter API.
      </DocNote>

    </div>
  );
}
