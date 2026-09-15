import { DocSection, PropTable, FeatureGrid, DocNote, InlineCode } from '../../../shared/DocComponents';

export function BadgeChipViewDocs() {
  return (
    <div style={{ maxWidth: 860 }}>
      <DocSection title="Features">
        <FeatureGrid features={[
          { label: '50 skins, chosen by `variant`', color: 'var(--color-primary)' },
          { label: 'One `tone` drives text, fill, border and highlight', color: 'var(--color-success)' },
          { label: 'Provider-wide default via DuiProvider chipVariant', color: 'var(--color-info)' },
          { label: '4 sizes — 2xs annotates, xs/sm/md label', color: 'var(--color-warning)' },
          { label: 'Ink flips automatically on a saturated fill', color: '#a855f7' },
          { label: '`plain` for text with no surface', color: '#ec4899' },
        ]} />
      </DocSection>

      <DocSection
        title="Overview"
        description="The small pill that labels a thing — a status, a protocol, an environment. It had one look: a raised face with a lit top edge and a drop shadow, which reads well alone in a dense row and badly in a line of five, where every chip looks like a button you could press and none of them are. So the look became data. badge-chip-skins.ts holds fifty of them and this component interprets one."
      >
        <></>
      </DocSection>

      <DocSection title="Props">
        <PropTable props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'The chip’s label. A flex row, so an icon beside the word sits on the same line as it.' },
          { name: 'tone', type: 'string', default: 'var(--color-text-muted)', description: 'The chip’s colour, as a CSS colour or variable. One value rather than a palette per part: a chip whose border and text disagree stops reading as a single object.' },
          { name: 'variant', type: 'BadgeChipVariant', default: "provider’s chipVariant, else 'embossed'", description: 'Which of the fifty skins. See the Skins section below.' },
          { name: 'size', type: "'2xs' | 'xs' | 'sm' | 'md'", default: "'xs'", description: '2xs is for a chip that annotates something rather than labelling it.' },
          { name: 'plain', type: 'boolean', default: 'false', description: 'Drop the tint and the border, keeping only the text. The `text` skin under an older name — it wins over `variant` when both are given.' },
          { name: 'title', type: 'string', description: 'Native tooltip, for a label that had to be abbreviated.' },
          { name: 'className', type: 'string', description: 'Additional class names on the root.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles on the root.' },
        ]} />
      </DocSection>

      <DocSection
        title="Skins"
        description="Every id accepted by `variant`, grouped by what it is doing. Import BADGE_CHIP_SKINS to enumerate them at runtime, or CHIP_SKIN_BY_ID to look one up."
      >
        <PropTable props={[
          { name: 'Fills and tints', type: 'embossed · flat · soft · quiet · tint-strong · ghost · surface · recessed · solid · solid-soft · solid-muted · solid-pill', description: 'A surface behind the label, at varying strength. `embossed` is the default and the original look.' },
          { name: 'Outlines', type: 'hairline · outline-strong · outline-dashed · outline-tinted · ring', description: 'A border and nothing behind it.' },
          { name: 'Corners', type: 'rect · tag · rounded · rounded-lg · pill · pill-outline · pill-quiet', description: 'The same chip from square through to fully round.' },
          { name: 'Borrowed', type: 'mui-filled · mui-outlined · mui-solid · m3-assist · m3-filter · m3-input · m3-elevated · ant-tag · github-label · stripe-badge · linear-badge · shadcn-outline · shadcn-solid · bootstrap · bootstrap-pill · lozenge · tailwind-badge · chakra-subtle · notion-pill', description: 'The shapes other design systems settled on, for a product that has to sit beside one of them.' },
          { name: 'With a marker', type: 'dot · dot-pill · dot-outline · rail · underline · bracketed · text', description: 'A dot, a rule or brackets instead of a box.' },
        ]} />
      </DocSection>

      <DocSection title="Changing every chip at once">
        <DocNote type="info">
          <InlineCode>DuiProvider</InlineCode>’s <InlineCode>chipVariant</InlineCode> sets the default
          for every chip below it, so a product picks its chip language in one place rather than at
          twenty call sites. A <InlineCode>variant</InlineCode> on an individual chip still wins —
          use that for the one status pill that genuinely needs to look different.
        </DocNote>
      </DocSection>

      <DocSection title="Ink on a fill">
        <DocNote type="tip">
          On a saturated fill the label colour is computed rather than inherited: dark ink for a light
          tone, light ink for a dimmed one. That is why a <InlineCode>solid</InlineCode> chip stays
          readable on both the light and dark grounds without the caller passing a second colour.
        </DocNote>
      </DocSection>
    </div>
  );
}
