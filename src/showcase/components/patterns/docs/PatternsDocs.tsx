import { DocSection, FeatureGrid, DocNote, InlineCode } from '../../../shared/DocComponents';

export function PatternsDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Overview"
        description="This panel shows how DUI primitives combine into the real Daakia UI patterns. These are not standalone components — they are assembly recipes.">
        <FeatureGrid features={[
          { label: 'URL bar assembly', color: 'var(--color-primary)' },
          { label: 'Tab bar pattern', color: 'var(--color-success)' },
          { label: 'Sidebar layout', color: 'var(--color-info)' },
          { label: 'Settings layout', color: 'var(--color-warning)' },
          { label: 'Response panel', color: '#a855f7' },
          { label: 'Form data pattern', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="URL bar pattern">
        <DocNote type="info">
          The Daakia URL bar is a <InlineCode>MergedInputView</InlineCode> with segments:
          <br /><code>[select:method] + [divider] + [HighlightedInputView:url] + [button:Send]</code>
          <br />The entire bar shares one border and one focus ring.
          Alternatively, use <InlineCode>SelectTextInputView</InlineCode> for method + URL pairs that don't need a custom URL input.
        </DocNote>
      </DocSection>

      <DocSection title="Tab bar pattern">
        <DocNote type="tip">
          Protocol-level tabs (REST, GraphQL, WebSocket, gRPC, SOAP) use <InlineCode>TabView</InlineCode> with <code>variant="underline"</code>. Sub-section tabs within a panel (Headers, Body, Auth) use <code>variant="chip"</code>. Never build a custom tab row with raw buttons.
        </DocNote>
      </DocSection>

      <DocSection title="Sidebar layout">
        <DocNote type="info">
          The collection sidebar uses <InlineCode>SideNavView</InlineCode> with <code>searchable</code> and <code>collapsible</code> enabled. Each collection is a <code>isGroup</code> nav item with request items as children. The <code>FolderView</code> component handles the folder tree inside the expanded sidebar pane.
        </DocNote>
      </DocSection>

      <DocSection title="Settings panel layout">
        <DocNote type="tip">
          Settings panels use a two-column layout: <InlineCode>SettingsNavView</InlineCode> on the left and the settings content on the right. Wrap both in a <InlineCode>DuiProvider size="sm"</InlineCode> to make all inputs compact without per-component props.
        </DocNote>
      </DocSection>

      <DocSection title="Response panel pattern">
        <DocNote type="info">
          Response data flows through: <InlineCode>TabView</InlineCode> (Pretty / Raw / Headers / Cookies) → <InlineCode>JsonTreeView</InlineCode> (structured JSON) or <InlineCode>MarkdownView</InlineCode> (text/html) or <InlineCode>KeyValueTableView</InlineCode> (headers). The <InlineCode>BottomPanelView</InlineCode> wraps logs and debug output.
        </DocNote>
      </DocSection>

      <DocSection title="Key assembly rules">
        <DocNote type="warning">
          Never build custom header rows with raw <code>button</code> elements. Always use <InlineCode>ButtonView</InlineCode> or <InlineCode>IconButtonView</InlineCode>. Never build custom dropdowns — use <InlineCode>SelectInputView</InlineCode> or the <code>select</code> segment in <InlineCode>MergedInputView</InlineCode>.
        </DocNote>
      </DocSection>
    </div>
  );
}
