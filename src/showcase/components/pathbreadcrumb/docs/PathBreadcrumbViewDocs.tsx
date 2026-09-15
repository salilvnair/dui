import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function PathBreadcrumbViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Every segment is a link back to that level', color: 'var(--color-primary)' },
          { label: 'Collapses the middle past maxVisible', color: 'var(--color-success)' },
          { label: 'Double-click to type a path instead', color: 'var(--color-info)' },
          { label: 'rootLabel names the leading slash', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The path bar above a file listing. Distinct from BreadcrumbView, which is for a navigation trail through an app; this one is for an actual filesystem path, and it can become an editable text box because that is how people really move around a deep tree."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'path', type: 'string', required: true, description: 'An absolute, slash-separated path. A single slash renders as one root segment.' },
          { name: 'onNavigate', type: '(path: string) => void', description: 'A segment was clicked; the argument is the absolute path of that segment.' },
          { name: 'onSubmit', type: '(path: string) => void', description: 'A typed path was committed with Enter.' },
          { name: 'editing', type: 'boolean', description: 'Controlled editing state.' },
          { name: 'onEditingChange', type: '(editing: boolean) => void', description: 'The component wants to start or stop editing.' },
          { name: 'rootLabel', type: 'string', description: 'Label for the leading slash. Some filesystems want a share or drive name.' },
          { name: 'maxVisible', type: 'number', default: '5', description: 'Collapse the middle into an ellipsis past this many segments.' },
          { name: 'color', type: 'string', description: 'Colour of the segment the path currently ends at.' },
          { name: 'placeholder', type: 'string', description: 'Placeholder while editing.' },
          { name: 'size', type: 'DuiSize', description: 'Shared size scale.' },
          { name: 'className', type: 'string', description: 'Additional classes.' },
        ]} />
      </DocSection>
    </div>
  );
}
