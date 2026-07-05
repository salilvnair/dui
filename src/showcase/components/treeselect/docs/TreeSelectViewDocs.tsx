import { DocSection, PropTable, FeatureGrid, DocNote, SizeReference } from '../../../shared/DocComponents';

export function TreeSelectViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Tri-state parent checkboxes', color: 'var(--color-primary)' },
          { label: 'Arbitrary nesting depth', color: 'var(--color-success)' },
          { label: 'Expand / collapse per branch', color: 'var(--color-info)' },
          { label: 'Auto-expanded top level', color: 'var(--color-warning)' },
          { label: 'Fully controlled value array', color: '#a855f7' },
          { label: 'DUI select size + color context', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'nodes', type: 'TreeSelectNode[]', required: true, description: 'Root-level tree nodes to render.' },
          { name: 'value', type: 'string[]', required: true, description: 'Array of checked node ids (leaf and/or parent ids). This is a flat list of every checked id, not just leaves.' },
          { name: 'onChange', type: '(value: string[]) => void', required: true, description: 'Called with the new full set of checked ids whenever a checkbox is toggled. Toggling a parent adds/removes all of its descendant ids in one call.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Row height and font size. Falls back to DuiProvider context when omitted.' },
          { name: 'color', type: 'string', default: 'var(--color-primary)', description: 'Fill color for checked/indeterminate checkboxes.' },
          { name: 'className', type: 'string', description: 'Additional class names applied to the outer container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer container.' },
        ]} />
      </DocSection>

      <DocSection title="TreeSelectNode shape">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique identifier for the node, used in the value array.' },
          { name: 'label', type: 'string', required: true, description: 'Display text for the node row.' },
          { name: 'children', type: 'TreeSelectNode[]', description: 'Nested child nodes. Nodes without children render as plain leaves with no expand/collapse toggle.' },
        ]} />
      </DocSection>

      <DocNote type="info">
        A parent's checkbox shows a filled (checked) state only when every descendant id is present in value, an indeterminate (dash-like partial fill) state when some but not all are present, and an empty state otherwise — this is computed on every render from `value`, not stored separately.
      </DocNote>

      <DocNote type="warning">
        value stores every checked id, including parent ids that are only "checked" because all their children are checked. If you only care about leaf selections, filter value against your known leaf id set before using it downstream.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="TreeSelectView reads its dimensions from the shared select category base hook (useSelectBase). Omitting size, width, borderRadius, or color on TreeSelectView falls back to the nearest <DuiProvider> context value, so a single provider-level change can restyle every select-category component at once."
      >
        <FeatureGrid features={[
          { label: 'useSelectBase', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / width / borderRadius / color', color: 'var(--color-info)' },
        ]} />
        <SizeReference sizes={[
          { size: 'xxs', height: '16px', font: '8px', desc: 'item padY 2px' },
          { size: 'xs', height: '20px', font: '9px', desc: 'item padY 3px' },
          { size: 'sm', height: '24px', font: '10px', desc: 'item padY 4px' },
          { size: 'md', height: '28px', font: '11px', desc: 'item padY 5px' },
          { size: 'lg', height: '36px', font: '12px', desc: 'item padY 7px' },
          { size: 'xl', height: '40px', font: '13px', desc: 'item padY 9px' },
          { size: 'xxl', height: '48px', font: '14px', desc: 'item padY 11px' },
          { size: 'xxxl', height: '56px', font: '16px', desc: 'item padY 14px' },
        ]} />
        <DocNote type="info">
          These values come from the Select category tokens in <code>DuiTokens.ts</code>. Set a local <code>size</code> prop to override the provider default for this instance only, or change <code>{'<DuiProvider size="...">'}</code> to restyle every select-category component in the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
