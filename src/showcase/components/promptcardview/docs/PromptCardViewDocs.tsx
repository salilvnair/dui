import { DocSection, PropTable, FeatureGrid, DocNote } from '../../../shared/DocComponents';

export function PromptCardViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: 'Initials avatar auto-generated', color: 'var(--color-primary)' },
          { label: 'Hover action buttons (Use/Copy/Edit/Delete)', color: 'var(--color-success)' },
          { label: 'Protocol chip with color', color: 'var(--color-info)' },
          { label: 'CUSTOM badge for user prompts', color: 'var(--color-warning)' },
          { label: 'Selected state with accent tint', color: '#a855f7' },
          { label: 'Copy-to-clipboard with checkmark feedback', color: '#ec4899' },
          { label: 'Fine-grained color overrides via colors prop', color: '#14b8a6' },
          { label: 'Description preview in muted text', color: '#f97316' },
        ]} />
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'id', type: 'string', required: true, description: 'Unique prompt identifier. Passed to all action callbacks.' },
          { name: 'title', type: 'string', required: true, description: 'Prompt title. First two words are used to generate the avatar initials.' },
          { name: 'content', type: 'string', required: true, description: 'Full prompt content. Shown as preview text if description is absent.' },
          { name: 'description', type: 'string', description: 'Short description shown below the title. Overrides content as preview text.' },
          { name: 'protocol', type: 'string', description: 'Protocol label (e.g. "REST", "GraphQL"). Shown as a chip on the right.' },
          { name: 'protocolColor', type: 'string', description: 'CSS color for the protocol chip.' },
          { name: 'isCustom', type: 'boolean', default: 'false', description: 'When true, shows a muted CUSTOM badge next to the title.' },
          { name: 'selected', type: 'boolean', default: 'false', description: 'Highlights the card with accent tint background.' },
          { name: 'accentColor', type: 'string', description: 'Accent color used for the avatar background and selected tint.' },
          { name: 'onUse', type: '(id: string) => void', description: 'Shows a SparkleIcon action button on hover.' },
          { name: 'onCopy', type: '(id: string) => void', description: 'Shows a CopyIcon action button on hover. Transitions to CheckIcon for 1.5s.' },
          { name: 'onEdit', type: '(id: string) => void', description: 'Shows a RenameIcon action button on hover.' },
          { name: 'onDelete', type: '(id: string) => void', description: 'Shows a TrashIcon action button on hover (danger-colored).' },
          { name: 'onClick', type: '(id: string) => void', description: 'Called when the card itself is clicked.' },
          { name: 'colors', type: 'PromptCardColors', description: 'Fine-grained color overrides for every part of the card.' },
          { name: 'className', type: 'string', description: 'Extra CSS class on the root element.' },
        ]} />
      </DocSection>

      <DocSection title="colors overrides">
        <PropTable props={[
          { name: 'colors.avatarBg', type: 'string', description: 'Avatar background color.' },
          { name: 'colors.avatarText', type: 'string', description: 'Avatar initials/icon color.' },
          { name: 'colors.titleText', type: 'string', description: 'Title text color.' },
          { name: 'colors.bodyText', type: 'string', description: 'Description / content preview color.' },
          { name: 'colors.customBadgeBg', type: 'string', description: 'CUSTOM chip background color.' },
          { name: 'colors.customBadgeText', type: 'string', description: 'CUSTOM chip text color.' },
          { name: 'colors.chipColor', type: 'string', description: 'Protocol chip color override.' },
          { name: 'colors.actionIconColor', type: 'string', description: 'Default action icon color.' },
          { name: 'colors.actionDeleteColor', type: 'string', description: 'Delete action icon color (default: var(--color-error)).' },
          { name: 'colors.rowBg', type: 'string', description: 'Card background.' },
          { name: 'colors.rowBgHover', type: 'string', description: 'Card hover background.' },
          { name: 'colors.rowBgSelected', type: 'string', description: 'Card selected background.' },
        ]} />
      </DocSection>

      <DocSection title="Notes">
        <DocNote type="tip">
          Action buttons only appear on hover. They render in order: Use → Copy → Edit → Delete. Omit any callback to hide that action button.
        </DocNote>
      </DocSection>
    </div>
  );
}
