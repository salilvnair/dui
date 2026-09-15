/**
 * BadgeChipView, and the fifty looks it can wear.
 *
 * The skins are read from `BADGE_CHIP_SKINS` rather than listed here, so this
 * panel cannot fall behind the library the way the whole component did — it
 * shipped with fifty variants and a provider-wide switch, and none of it was
 * reachable from the showcase at all.
 */
import { useState } from 'react';
import { BadgeChipView, DuiProvider, SegmentedControlView, BADGE_CHIP_SKINS } from '@/dui';
import type { BadgeChipVariant } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';

const TONES: { label: string; tone: string }[] = [
  { label: 'primary', tone: 'var(--color-primary)' },
  { label: 'success', tone: 'var(--color-success)' },
  { label: 'warning', tone: 'var(--color-warning)' },
  { label: 'error', tone: 'var(--color-error)' },
  { label: 'info', tone: 'var(--color-info)' },
  { label: 'muted', tone: 'var(--color-text-muted)' },
];

/** The families the fifty fall into, for a sheet you can actually scan. */
const FAMILIES: { title: string; note: string; match: (id: string) => boolean }[] = [
  { title: 'Fills and tints', note: 'A surface, at varying strength', match: id => /^(embossed|flat|soft|quiet|tint-strong|ghost|surface|recessed|solid|solid-soft|solid-muted|solid-pill)$/.test(id) },
  { title: 'Outlines', note: 'A border and nothing behind it', match: id => /^(hairline|outline-strong|outline-dashed|outline-tinted|ring)$/.test(id) },
  { title: 'Corners', note: 'The same chip from square to pill', match: id => /^(rect|tag|rounded|rounded-lg|pill|pill-outline|pill-quiet)$/.test(id) },
  { title: 'Chips you already know', note: 'The shapes other design systems settled on', match: id => /^(mui-|m3-|ant-|github-|stripe-|linear-|shadcn-|bootstrap|lozenge|tailwind-|chakra-|notion-)/.test(id) },
  { title: 'With a marker', note: 'A dot or a rule instead of a box', match: id => /^(dot|dot-pill|dot-outline|rail|underline|bracketed|text)$/.test(id) },
];

export function BadgeChipViewExamples() {
  const [variant, setVariant] = useState<BadgeChipVariant>('embossed');

  return (
    <>
      <ExampleCard
        title="All fifty skins"
        description="The look is data — badge-chip-skins.ts — not a stylesheet. `variant` picks one."
        code={`<BadgeChipView variant="mui-filled" tone="var(--color-primary)">RUNNING</BadgeChipView>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {FAMILIES.map(family => {
            const skins = BADGE_CHIP_SKINS.filter(s => family.match(s.id));
            if (!skins.length) return null;
            return (
              <div key={family.title}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {family.title}
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>{family.note}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                  {skins.map(s => (
                    <BadgeChipView key={s.id} variant={s.id} tone="var(--color-primary)" title={s.id}>
                      {s.id}
                    </BadgeChipView>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ExampleCard>

      <ExampleCard
        title="One tone per chip"
        description="`tone` is a colour, and it drives the text, the fill, the border and the highlight together"
        code={`<BadgeChipView tone="var(--color-success)">200 OK</BadgeChipView>`}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          {TONES.map(t => (
            <BadgeChipView key={t.label} tone={t.tone}>{t.label}</BadgeChipView>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Sizes"
        description="2xs annotates something; the rest label it"
        code={`<BadgeChipView size="2xs">beta</BadgeChipView>`}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          {(['2xs', 'xs', 'sm', 'md'] as const).map(size => (
            <BadgeChipView key={size} size={size} tone="var(--color-primary)">{size}</BadgeChipView>
          ))}
        </div>
      </ExampleCard>

      <ExampleCard
        title="Change every chip at once"
        description="DuiProvider's chipVariant sets the default for everything below it — pick a skin and watch the row follow"
        code={`<DuiProvider chipVariant="github-label">
  {/* every BadgeChipView below now wears that skin */}
</DuiProvider>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SegmentedControlView
            size="sm"
            value={variant}
            onChange={v => setVariant(v as BadgeChipVariant)}
            options={[
              { value: 'embossed', label: 'embossed' },
              { value: 'mui-outlined', label: 'mui-outlined' },
              { value: 'github-label', label: 'github-label' },
              { value: 'lozenge', label: 'lozenge' },
              { value: 'dot', label: 'dot' },
            ]}
          />
          <DuiProvider chipVariant={variant}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
              <BadgeChipView tone="var(--color-success)">200 OK</BadgeChipView>
              <BadgeChipView tone="var(--color-warning)">deprecated</BadgeChipView>
              <BadgeChipView tone="var(--color-error)">failed</BadgeChipView>
              <BadgeChipView tone="var(--color-info)">draft</BadgeChipView>
            </div>
          </DuiProvider>
        </div>
      </ExampleCard>

      <ExampleCard
        title="No box at all"
        description="`plain` keeps the text and drops the surface — the `text` skin under an older name"
        code={`<BadgeChipView plain tone="var(--color-text-muted)">optional</BadgeChipView>`}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          <BadgeChipView plain tone="var(--color-text-muted)">optional</BadgeChipView>
          <BadgeChipView plain tone="var(--color-primary)">internal</BadgeChipView>
          <BadgeChipView variant="text" tone="var(--color-success)">text skin</BadgeChipView>
        </div>
      </ExampleCard>
    </>
  );
}
