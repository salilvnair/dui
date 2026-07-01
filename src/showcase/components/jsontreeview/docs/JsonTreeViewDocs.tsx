import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function JsonTreeViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Recursive JSON tree explorer', color: 'var(--color-primary)' },
          { label: 'Click to expand/collapse nodes', color: 'var(--color-success)' },
          { label: 'Configurable auto-expand depth', color: 'var(--color-info)' },
          { label: 'Max depth guard (prevents infinite trees)', color: 'var(--color-warning)' },
          { label: 'Type-colored values (string/number/bool/null)', color: '#a855f7' },
          { label: 'Inline preview when collapsed', color: '#ec4899' },
          { label: 'Array length indicator', color: '#14b8a6' },
          { label: 'Optional root name label', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'data', type: 'unknown', required: true, description: 'Any JavaScript value to display (object, array, primitive, null).' },
          { name: 'name', type: 'string', description: 'Optional label shown as the root key (e.g. "response").' },
          { name: 'defaultExpandDepth', type: 'number', default: '2', description: 'Nodes at depth less than this value start expanded.' },
          { name: 'maxDepth', type: 'number', default: '8', description: 'Rendering stops at this depth to prevent infinite tree explosion.' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root element.' },
        ]} />
      </DocSection>

      <DocSection title="Value type colors">
        <PropTable props={[
          { name: 'string', type: 'CSS class', description: "dui_json-tree__value--string — themed via CSS variable." },
          { name: 'number', type: 'CSS class', description: 'dui_json-tree__value--number — typically green/teal.' },
          { name: 'boolean', type: 'CSS class', description: 'dui_json-tree__value--boolean — typically blue.' },
          { name: 'null', type: 'CSS class', description: 'dui_json-tree__value--null — typically grey.' },
          { name: 'object', type: 'CSS class', description: 'dui_json-tree__value--object — shown as {…} when collapsed.' },
          { name: 'array', type: 'CSS class', description: 'dui_json-tree__value--array — shown as (N) [x, y, …] when collapsed.' },
          { name: 'fn', type: 'CSS class', description: "dui_json-tree__value--fn — strings starting with '<' are treated as function/JSX previews." },
        ]} />
      </DocSection>

      <DocSection title="Collapsed preview format">
        <DocNote type="info">
          When a node is collapsed, JsonTreeView shows a compact inline preview: objects show up to 3 key-value pairs (<code>{'{ name: "x", age: 5, … }'}</code>), arrays show up to 4 items (<code>(10) [1, 2, 3, 4, …]</code>). String values longer than 60 characters are truncated with an ellipsis.
        </DocNote>
      </DocSection>
    </div>
  );
}
