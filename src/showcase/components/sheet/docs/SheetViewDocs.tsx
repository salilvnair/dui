import { DocSection, PropTable, FeatureGrid } from '../../../shared/DocComponents';

export function SheetViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Any edge — left, right, top, bottom', color: 'var(--color-primary)' },
          { label: 'Draggable handle to resize', color: 'var(--color-success)' },
          { label: 'Title row, or a header node of your own', color: 'var(--color-info)' },
          { label: 'Backdrop close can be refused', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="A panel that slides in from an edge. DrawerView commits to a side; this one does not, which is what you want when the same content is a right-hand sidebar on a wide screen and a bottom sheet on a narrow one."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'open', type: 'boolean', required: true, description: 'Whether it is showing.' },
          { name: 'onClose', type: '() => void', required: true, description: 'Escape, the backdrop, or the close control.' },
          { name: 'edge', type: "'left' | 'right' | 'top' | 'bottom'", description: 'Which edge it comes in from.' },
          { name: 'size', type: 'number | string', description: 'Width for left and right, height for top and bottom.' },
          { name: 'title', type: 'ReactNode', description: 'The title row.' },
          { name: 'header', type: 'ReactNode', description: 'Replaces the whole title row, for a header that is more than a string.' },
          { name: 'footer', type: 'ReactNode', description: 'A pinned footer — usually the actions.' },
          { name: 'handle', type: 'boolean', default: 'true', description: 'The handle, and the drag with it.' },
          { name: 'backdropClose', type: 'boolean', default: 'true', description: 'Clicking the backdrop closes it.' },
          { name: 'children', type: 'ReactNode', description: 'The body.' },
          { name: 'testId', type: 'string', description: 'Lands on the root as data-testid.' },
        ]} />
      </DocSection>
    </div>
  );
}
