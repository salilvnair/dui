import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote, SizeReference } from '../../../shared/DocComponents';

export function TabBarViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Browser-style horizontal tab bar', color: 'var(--color-primary)' },
          { label: 'Protocol color badges (REST, GQL, WS, gRPC, SOAP, AI, MCP)', color: 'var(--color-success)' },
          { label: 'HTTP method color labels (GET, POST, PUT…)', color: 'var(--color-info)' },
          { label: 'Realtime protocol sub-badges (WS, SSE, SIO, MQTT)', color: 'var(--color-warning)' },
          { label: 'Scroll left/right when tabs overflow', color: '#a855f7' },
          { label: 'Active top-border indicator per tab', color: '#ec4899' },
          { label: 'Dirty (unsaved) dot indicator', color: '#14b8a6' },
          { label: 'Pinned tab (no close button)', color: '#f97316' },
          { label: 'Add tab button', color: 'var(--color-primary)' },
          { label: 'Settings and mock-server special tab types', color: 'var(--color-success)' },
          { label: 'DuiProvider size context', color: 'var(--color-info)' },
          { label: 'Raw pixel height override', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'tabs', type: 'TabBarTab[]', required: true, description: 'Array of tab objects to render.' },
          { name: 'activeTabId', type: 'string', required: true, description: 'The id of the currently active tab.' },
          { name: 'onTabClick', type: '(id: string) => void', required: true, description: 'Called when the user clicks a tab to switch to it.' },
          { name: 'onTabClose', type: '(id: string) => void', description: 'Called when the close (×) button is clicked on a tab. The close button is hidden for pinned tabs.' },
          { name: 'onAddTab', type: '() => void', description: 'When provided, shows a + button after all tabs to create a new tab.' },
          { name: 'accentColor', type: 'string', default: 'var(--color-primary)', description: 'Fallback accent color for tabs that have no protocol or type set.' },
          { name: 'size', type: 'DuiSize', description: 'Falls back to DuiProvider context when omitted. Uses nav heights (taller than input heights for click comfort).' },
          { name: 'height', type: 'number', description: 'Raw pixel height override. Prefer size for token-aligned sizing.' },
          { name: 'className', type: 'string', description: 'Additional class names for the root container div.' },
        ]} />
      </DocSection>

      <DocSection title="TabBarTab shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique identifier for the tab.' },
          { name: 'label', type: 'string', required: true, description: 'Display label of the tab.' },
          { name: 'type', type: 'TabBarTabType', description: "Special tab type. 'settings' shows a gear icon. 'mock-server' shows a server icon. These two types are non-closeable." },
          { name: 'protocol', type: 'TabBarProtocol', description: 'Protocol badge shown before the label. Drives the top-border accent color.' },
          { name: 'method', type: 'string', description: "HTTP method for REST tabs (e.g. 'GET', 'POST'). Shown as a colored monospace label instead of a protocol badge." },
          { name: 'dirty', type: 'boolean', description: 'When true, shows a small colored dot to the right of the label to indicate unsaved changes.' },
          { name: 'pinned', type: 'boolean', description: 'When true, hides the close button and shows a 📌 pin indicator.' },
          { name: 'rtProtocol', type: 'RealtimeProtocol', description: "Realtime sub-protocol for websocket tabs. Drives the badge label: 'WS', 'SSE', 'SIO', 'MQTT'." },
        ]} />
      </DocSection>

      <DocSection title="TabBarProtocol enum">
        <EnumTable name="TabBarProtocol" values={[
          { value: 'rest', description: 'REST — var(--color-protocol-rest)', color: 'var(--color-protocol-rest)' },
          { value: 'graphql', description: 'GraphQL — var(--color-protocol-graphql)', color: '#ec4899' },
          { value: 'websocket', description: 'WebSocket — var(--color-protocol-websocket)', color: '#14b8a6' },
          { value: 'grpc', description: 'gRPC — var(--color-protocol-grpc)', color: '#f97316' },
          { value: 'soap', description: 'SOAP — var(--color-protocol-soap)', color: '#a855f7' },
          { value: 'ai', description: 'AI — var(--color-protocol-ai)', color: 'var(--color-primary)' },
          { value: 'mcp', description: 'MCP — var(--color-protocol-mcp)', color: 'var(--color-info)' },
        ]} />
      </DocSection>

      <DocSection title="Sizes (nav heights — taller than input heights)">
        <SizeReference sizes={[
          { size: 'xs', height: '28px', font: '10px', desc: 'Dense nav' },
          { size: 'sm', height: '32px', font: '11px', desc: 'Compact' },
          { size: 'md', height: '36px', font: '12px', desc: 'Default' },
          { size: 'lg', height: '40px', font: '13px', desc: 'Large' },
          { size: 'xl', height: '44px', font: '14px', desc: 'XL nav' },
        ]} />
      </DocSection>

      <DocNote type="info">
        The tab list scrolls horizontally when there are too many tabs to fit. Scroll arrow buttons appear automatically at the left and right edges when scrolling is possible, detected by a ResizeObserver.
      </DocNote>

      <DocNote type="tip">
        For simple in-panel tab switching without close buttons or protocol badges, use TabView instead. TabBarView is specifically designed for the application chrome tab row at the top of the workspace.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="TabBarView reads <code>size</code>, <code>color</code>, and related style props directly from the DuiProvider context via useDui() rather than through a shared category base hook. Omitting a local size or color prop falls back to the nearest <DuiProvider> value."
      >
        <FeatureGrid features={[
          { label: 'useDui() context read', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / color overrides', color: 'var(--color-info)' },
        ]} />
        <DocNote type="info">
          TabBarView derives its own local size map from the resolved <code>size</code> value rather than sharing one of the category base hooks (e.g. useInputBase, useButtonBase). Behavior is still provider-aware: change <code>{'<DuiProvider size="...">'}</code> to restyle this component along with the rest of the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
