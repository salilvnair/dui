import { DocSection, PropTable, FeatureGrid, EnumTable, DocNote } from '../../../shared/DocComponents';

export function AvatarUploadViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Circular click-to-upload avatar', color: 'var(--color-primary)' },
          { label: 'Camera icon badge overlay', color: 'var(--color-success)' },
          { label: 'Initials fallback when no image', color: 'var(--color-info)' },
          { label: 'Image-only file filter (accept="image/*")', color: 'var(--color-warning)' },
          { label: 'Custom accent color', color: '#a855f7' },
          { label: 'DuiProvider size context aware', color: '#ec4899' },
          { label: 'Disabled state', color: '#14b8a6' },
          { label: 'Diameter driven by DUI_HEIGHT.card tokens', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'src', type: 'string | null', description: 'Preview image URL. When null/undefined, the empty state (initials or camera icon) is shown instead.' },
          { name: 'onFileSelected', type: '(file: File) => void', required: true, description: 'Called with the chosen File when the user picks an image via the native file dialog.' },
          { name: 'initials', type: 'string', description: 'Fallback text (e.g. user initials) shown in the empty state when no src is set. If omitted, a camera icon is shown instead.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the click handler; the file dialog cannot be opened and the input itself is disabled.' },
          { name: 'size', type: 'DuiSize', default: 'context', description: 'Controls the avatar diameter (via DUI_HEIGHT.card tokens) and proportional icon/font sizes. Falls back to DuiProvider context when omitted.' },
          { name: 'color', type: 'string', default: 'context.activeColor ?? var(--color-primary)', description: 'Accent color for the empty-state background tint, initials text, and camera badge.' },
          { name: 'className', type: 'string', description: 'Additional class name applied to the outer wrapper.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline style override applied to the outer wrapper.' },
        ]} />
      </DocSection>

      <DocSection title="DuiSize enum">
        <EnumTable name="DuiSize" values={[
          { value: 'xxs', description: 'Smallest diameter.', color: '#f97316' },
          { value: 'xs', description: 'Extra small.', color: '#ec4899' },
          { value: 'sm', description: 'Small — table row avatars.', color: 'var(--color-success)' },
          { value: 'md', description: 'Default medium size.', color: 'var(--color-primary)' },
          { value: 'lg', description: 'Large — profile cards.', color: 'var(--color-info)' },
          { value: 'xl', description: 'Extra large — profile headers.', color: '#a855f7' },
          { value: 'xxl', description: 'Very large.', color: '#14b8a6' },
          { value: 'xxxl', description: 'Largest preset.', color: 'var(--color-warning)' },
        ]} />
      </DocSection>

      <DocNote type="info">
        AvatarUploadView never uploads anything itself — onFileSelected just hands back the raw File. Typical usage creates a local object URL for instant preview (as in the examples) while the actual upload happens asynchronously in the background.
      </DocNote>

      <DocNote type="tip">
        Object URLs created with URL.createObjectURL should be revoked with URL.revokeObjectURL when the component unmounts or the preview changes, to avoid leaking memory in long-lived forms.
      </DocNote>
      
      <DocSection
        title="DUI Sizing & Theming"
        description="AvatarUploadView reads <code>size</code>, <code>color</code>, and related style props directly from the DuiProvider context via useDui() rather than through a shared category base hook. Omitting a local size or color prop falls back to the nearest <DuiProvider> value."
      >
        <FeatureGrid features={[
          { label: 'useDui() context read', color: 'var(--color-primary)' },
          { label: 'Falls back to DuiProvider context', color: 'var(--color-success)' },
          { label: 'size / color overrides', color: 'var(--color-info)' },
        ]} />
        <DocNote type="info">
          AvatarUploadView derives its own local size map from the resolved <code>size</code> value rather than sharing one of the category base hooks (e.g. useInputBase, useButtonBase). Behavior is still provider-aware: change <code>{'<DuiProvider size="...">'}</code> to restyle this component along with the rest of the tree.
        </DocNote>
      </DocSection>
      </div>
  );
}
