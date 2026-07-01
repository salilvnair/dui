import { DocSection, FeatureGrid, DocNote, InlineCode } from '../../../shared/DocComponents';

export function IconsGalleryDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Overview"
        description="All DUI icons live in a single file. The gallery panel IS the documentation — browse it to find icons.">
        <FeatureGrid features={[
          { label: 'Single source file', color: 'var(--color-primary)' },
          { label: 'Named <Name>Icon convention', color: 'var(--color-success)' },
          { label: 'size prop (default 14)', color: 'var(--color-info)' },
          { label: 'style prop for color overrides', color: 'var(--color-warning)' },
          { label: 'Inline SVG components', color: '#a855f7' },
          { label: 'strokeWidth built-in (2)', color: '#ec4899' },
          { label: 'currentColor for theming', color: '#14b8a6' },
        ]} />
      </DocSection>

      <DocSection title="Source location">
        <DocNote type="info">
          All icons are defined in <InlineCode>src/icons/daakia-icons.tsx</InlineCode>. This is the ONLY file in the DUI project that contains inline SVG elements. Do not write SVG anywhere else.
        </DocNote>
      </DocSection>

      <DocSection title="Icon API">
        <DocNote type="tip">
          Every icon component accepts these props:
          <br />• <code>size?: number</code> — sets both width and height (default: 14)
          <br />• <code>style?: CSSProperties</code> — inline styles (use to set color, e.g. <code>{'{ color: "var(--color-primary)" }'}</code>)
          <br />• <code>className?: string</code> — extra CSS class
          <br /><br />
          Icons use <code>currentColor</code> for stroke, so set <code>color</code> on the icon or a parent to theme them.
        </DocNote>
      </DocSection>

      <DocSection title="Naming convention">
        <DocNote type="info">
          All icons follow the <code>{'<Name>Icon'}</code> naming pattern. Examples: <InlineCode>SearchIcon</InlineCode>, <InlineCode>ChevronDownIcon</InlineCode>, <InlineCode>TrashIcon</InlineCode>, <InlineCode>CheckCircleIcon</InlineCode>, <InlineCode>SparkleIcon</InlineCode>. Import from <code>../../../icons</code> (relative to the component file).
        </DocNote>
      </DocSection>

      <DocSection title="Adding new icons">
        <DocNote type="warning">
          To add a new icon: open <InlineCode>src/icons/daakia-icons.tsx</InlineCode>, add a new exported function component following the existing pattern, then import it wherever needed. Never write a raw SVG element in any other file.
        </DocNote>
      </DocSection>
    </div>
  );
}
