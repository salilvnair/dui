/**
 * The page the showcase opens on.
 *
 * Landing on `TextInputView` told a first-time reader nothing: not what this
 * library is, not how big it is, not how to install it, and not why it makes
 * the choices it does. They had to infer all of that from a text field.
 *
 * So this is the front door. It is also, deliberately, built out of the
 * library's own components — the chips, the code blocks, the callout, the
 * buttons are all the real things. A component library whose own front page
 * needs bespoke markup is telling on itself.
 */
import type { ReactNode } from 'react';
import { ChipView, ButtonView, CodeBlockView, CalloutView, BadgeChipView } from '@/dui';
import { SparkleIcon, CodeBracketsIcon, WandIcon, LayersIcon, PaletteIcon, CheckCircleIcon } from '@/icons';

const REPO = 'https://github.com/salilvnair/dui';
const NPM = 'https://www.npmjs.com/package/@salilvnair/dui';

interface HomePanelProps {
  /** Total components, read from the sidebar rather than written down twice. */
  total: number;
  groups: number;
  /** Jump to a panel — the feature cards are navigation, not decoration. */
  onOpen: (id: string) => void;
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{
      flex: '1 1 140px', minWidth: 140,
      padding: '14px 16px',
      border: '1px solid var(--color-surface-border)',
      borderRadius: 10,
      background: 'var(--color-surface)',
    }}>
      <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-text-primary)' }}>
        {value}
      </div>
      <div style={{ marginTop: 2, fontSize: 11, color: 'var(--color-text-muted)' }}>{label}</div>
    </div>
  );
}

function Feature({ icon, title, children, onOpen, cta }: {
  icon: ReactNode; title: string; children: ReactNode;
  onOpen?: () => void; cta?: string;
}) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 8,
      padding: 16,
      border: '1px solid var(--color-surface-border)',
      borderRadius: 10,
      background: 'var(--color-surface)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-primary)' }}>
        {icon}
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>{title}</span>
      </div>
      <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: 'var(--color-text-muted)' }}>{children}</p>
      {onOpen && cta && (
        <button
          type="button"
          onClick={onOpen}
          style={{
            alignSelf: 'flex-start', marginTop: 2,
            border: 'none', background: 'transparent', cursor: 'pointer',
            padding: 0, fontSize: 11, fontWeight: 600, color: 'var(--color-primary)',
          }}
        >
          {cta} →
        </button>
      )}
    </div>
  );
}

export function HomePanel({ total, groups, onOpen }: HomePanelProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* ── Hero ── */}
      <div style={{
        padding: '36px 32px',
        borderRadius: 14,
        border: '1px solid var(--color-surface-border)',
        background:
          'radial-gradient(1200px 300px at 20% -20%, color-mix(in srgb, var(--color-primary) 18%, transparent), transparent), var(--color-surface)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--color-text-primary)' }}>
            DUI
          </span>
          <ChipView label="MIT" color="var(--color-success)" size="sm" />
          <ChipView label="React 19" color="var(--color-info)" size="sm" />
        </div>

        <p style={{ margin: 0, maxWidth: 620, fontSize: 15, lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
          The component library behind <b>daakia</b> and <b>ck8t</b>, extracted so both could stop
          building the same forty components twice. Dense, professional, tool-shaped UI — tables that
          sort, panels that split, an editor that takes breakpoints — with every colour a CSS variable
          and nothing you are forced to keep.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 22 }}>
          <ButtonView variant="primary" onClick={() => onOpen('textinput')}>
            Browse the components
          </ButtonView>
          <ButtonView variant="secondary" onClick={() => window.open(REPO, '_blank', 'noopener')}>
            GitHub
          </ButtonView>
          <ButtonView variant="ghost" onClick={() => window.open(NPM, '_blank', 'noopener')}>
            npm
          </ButtonView>
        </div>
      </div>

      {/* ── The numbers ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <Stat value={String(total)} label="components" />
        <Stat value={String(groups)} label="groups" />
        <Stat value="0" label="required dependencies beyond React" />
        <Stat value="100%" label="TypeScript, types included" />
      </div>

      {/* ── Install ── */}
      <div>
        <h2 style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)' }}>
          Install
        </h2>
        <CodeBlockView
          language="bash"
          code={'npm install @salilvnair/dui react react-dom zustand'}
          showCopyButton
        />
        <div style={{ height: 10 }} />
        <CodeBlockView
          language="tsx"
          title="App.tsx"
          showCopyButton
          code={`import { DuiProvider, ButtonView, TextInputView } from '@salilvnair/dui';
import '@salilvnair/dui/style.css';

export function App() {
  const [value, setValue] = useState('');
  return (
    <DuiProvider size="md">
      <TextInputView placeholder="Search…" value={value} onChange={setValue} />
      <ButtonView variant="primary">Submit</ButtonView>
    </DuiProvider>
  );
}`}
        />
      </div>

      {/* ── What makes it different ── */}
      <div>
        <h2 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)' }}>
          What makes it different
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 12,
        }}>
          <Feature
            icon={<PaletteIcon size={14} />}
            title="Retheming is a colour change"
            onOpen={() => onOpen('themeconfig')}
            cta="Theme customization"
          >
            Every token is a <code>--color-*</code> custom property. Override one on <code>:root</code>,
            or on a single container to theme one panel differently. No rebuild, no fork.
          </Feature>

          <Feature
            icon={<LayersIcon size={14} />}
            title="One size prop, everywhere"
            onOpen={() => onOpen('duiprovider')}
            cta="DuiProvider"
          >
            <code>xxs</code>–<code>xxxl</code>, set once on <code>DuiProvider</code> and inherited by
            every component below it. A button and the select beside it agree, without being told twice.
          </Feature>

          <Feature
            icon={<CodeBracketsIcon size={14} />}
            title="Monaco is genuinely optional"
            onOpen={() => onOpen('editor')}
            cta="EditorView"
          >
            <code>EditorView</code> renders a plain-text fallback until you opt in. The main entry
            contains zero references to Monaco, and that is checked at release rather than claimed.
          </Feature>

          <Feature
            icon={<SparkleIcon size={14} />}
            title="Built for dense tools"
            onOpen={() => onOpen('datatable')}
            cta="DataTableView"
          >
            Sortable tables, sticky headers, editable cells, split panels, a file browser, a props
            table. It came out of an API client and a workflow builder, and it shows.
          </Feature>

          <Feature
            icon={<WandIcon size={14} />}
            title="Fifty chip skins, from data"
            onOpen={() => onOpen('badgechip')}
            cta="BadgeChipView"
          >
            The look of a chip is a value, not a stylesheet — MUI, Material 3, Ant, GitHub, Stripe,
            shadcn, Bootstrap and more. <code>DuiProvider</code>’s <code>chipVariant</code> changes
            every chip in the product at once.
          </Feature>

          <Feature
            icon={<CheckCircleIcon size={14} />}
            title="Every prop documented, in here"
            onOpen={() => onOpen('textinput')}
            cta="See a props table"
          >
            Each panel carries a live playground, copyable examples and a full props table — beside
            the component, rather than in a separate site that drifts out of date.
          </Feature>
        </div>
      </div>

      {/* ── A taste of the chip skins, since they are the newest thing ── */}
      <div>
        <h2 style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)' }}>
          The same chip, eight ways
        </h2>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center',
          padding: 16, borderRadius: 10,
          border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)',
        }}>
          {/* Real skin ids from badge-chip-skins.ts, and `tone` is a colour
              rather than a semantic name — it is mixed into the surface. */}
          {(['embossed', 'soft', 'outline-strong', 'mui-filled', 'm3-assist', 'github-label', 'stripe-badge', 'shadcn-outline'] as const).map(v => (
            <BadgeChipView key={v} variant={v} tone="var(--color-primary)">{v}</BadgeChipView>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onOpen('badgechip')}
          style={{
            marginTop: 10, border: 'none', background: 'transparent', cursor: 'pointer',
            padding: 0, fontSize: 11, fontWeight: 600, color: 'var(--color-primary)',
          }}
        >
          All fifty →
        </button>
      </div>

      <CalloutView variant="info" title="Everything here is the real component">
        This page, the sidebar, the search box, the resizable divider and the code blocks below are
        all DUI components rendering themselves. What you see is what you install.
      </CalloutView>
    </div>
  );
}
