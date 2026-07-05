import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function DebugEditorViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Overview">
        <DocNote type="info">
          DebugEditorView wraps <strong>EditorView</strong> (the DUI Monaco editor) with <code>debugSupported=true</code> always set. It exposes a pluggable <strong>DebugEditorAdapter</strong> interface so consumers supply their own breakpoint callbacks without importing daakia-specific stores.
        </DocNote>
      </DocSection>

      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Monaco editor with debug gutter', color: 'var(--color-primary)' },
          { label: 'Breakpoint toggle on gutter click', color: 'var(--color-success)' },
          { label: 'Disabled breakpoints (greyed out)', color: 'var(--color-info)' },
          { label: 'Conditional breakpoints (amber)', color: 'var(--color-warning)' },
          { label: 'Paused line highlight (yellow bar)', color: '#a855f7' },
          { label: 'Right-click glyph context menu', color: '#ec4899' },
          { label: 'Adapter pattern (no store coupling)', color: '#14b8a6' },
          { label: 'EditorMount callback for plugins', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="DebugEditorAdapter">
        <PropTable props={[
          { name: 'onToggleBreakpoint', type: '(line: number) => void', description: 'Called when the user clicks in the breakpoint gutter to toggle a breakpoint.' },
          { name: 'onGlyphContextMenu', type: '(line: number, pos: { x, y }) => void', description: 'Called when the user right-clicks a glyph in the gutter (for conditional breakpoints, etc.).' },
          { name: 'onEditorMount', type: '(editor: unknown, monaco: unknown) => void', description: 'Called after Monaco mounts. Use to attach AI autocomplete or other Monaco plugins.' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'adapter', type: 'DebugEditorAdapter', description: 'Pluggable debug adapter — consumer supplies all callbacks.' },
          { name: 'breakpoints', type: 'number[]', description: 'Active breakpoint line numbers (shown with red dot in gutter).' },
          { name: 'disabledBreakpoints', type: 'number[]', description: 'Line numbers with disabled breakpoints (shown grey).' },
          { name: 'conditionalBreakpointLines', type: 'number[]', description: 'Line numbers with conditional breakpoints (shown amber).' },
          { name: 'pausedLine', type: 'number | null', description: 'Currently paused line. Rendered with a yellow highlight bar.' },
          { name: '...EditorViewProps', type: 'EditorViewProps', description: 'All other EditorView props (language, value, onChange, theme, etc.) pass through.' },
        ]} />
      </DocSection>

      <DocSection title="Notes">
        <DocNote type="tip">
          DebugEditorView is a thin adapter layer. The heavy lifting is in <code>EditorView</code>. If you need a plain Monaco editor without debug features, use <code>EditorView</code> directly.
        </DocNote>
        <DocNote type="warning">
          The <code>debugSupported</code>, <code>onToggleBreakpoint</code>, <code>onGlyphContextMenu</code>, and <code>onEditorMount</code> props are stripped from the pass-through to prevent double-binding. Always use the <code>adapter</code> prop for these callbacks.
        </DocNote>
      </DocSection>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="DebugEditorView does not read size, width, color, or borderRadius from the DuiProvider context — it is not part of the sized-component system and has no size prop to fall back to a provider default."
      >
        <DocNote type="info">
          DebugEditorView is unaffected by <code>{'<DuiProvider>'}</code> size/color context. Style it directly via its own props (and CSS variables where documented above) rather than expecting provider-level sizing to apply.
        </DocNote>
      </DocSection>
      </div>
  );
}
