/**
 * Fifty ways to draw the same chip.
 *
 * The chip started as one look — a raised face with a light top edge, a dark
 * inner bottom edge and a drop shadow. That reads well alone in a dense
 * monospace row and badly in a line of five, where every chip looks like a
 * button you could press and none of them are. Rather than argue the point
 * once and bake in a second opinion, the look is a value.
 *
 * Each entry here is DATA, not a style function, and that is deliberate: the
 * same table drives the component and the gallery that photographs it, so the
 * sheet you choose from cannot drift from what the app renders.
 *
 * ── What a skin may and may not decide ──
 *
 * It decides the surface: fill, border, corner, depth, and how the text is set
 * — caps or not, mono or not, weight, tracking. It does NOT decide the chip's
 * height or font size; those come from `size`, so a row of chips in different
 * skins still lines up on one baseline. A skin that wanted to be taller would
 * be a different size, not a different skin.
 *
 * ── Where they come from ──
 *
 * Several are modelled on chips people already know from the web — Material's
 * assist and filter chips, MUI's filled and outlined, Ant's tag, a GitHub
 * label, a Tailwind badge with its inset ring, an Atlassian lozenge. They are
 * named for what they look like rather than who ships them, with the lineage
 * in the note, because the point is to recognise the shape, not to clone a
 * product.
 */

/** Where the fill comes from, when it is not a percentage of the tone. */
export type ChipFill =
  | number          // a percentage of the tone, mixed into transparency
  | 'neutral'       // a white wash — the tone stays in the text alone
  | 'surface'       // the panel's own raised surface
  | 'sunken';       // darker than the surface, for a recessed well

export interface ChipSkin {
  id: string;
  /** What to call it in a picker. */
  label: string;
  /** One line: what it is, and where the shape is from. */
  note: string;

  fill?: ChipFill;
  /** Border strength as a percentage of the tone. */
  border?: number;
  borderWidth?: number;
  borderStyle?: 'solid' | 'dashed';
  /**
   * A saturated fill, as a percentage of the tone, with ink on top instead of
   * the tone in the text. `ink` says which way the text goes.
   */
  solid?: number;
  ink?: 'dark' | 'light';
  /** An inset ring, the Tailwind badge trick: a border that costs no layout. */
  ring?: number;

  /** Corner. A number is px; `pill` is fully round; omitted takes the size's. */
  radius?: number | 'pill';
  /** Raised like the original, or sunk into the surface. */
  depth?: 'raised' | 'inset' | 'lift';

  /** Uppercase, and mono. Both default true — a label, not a sentence. */
  caps?: boolean;
  mono?: boolean;
  weight?: number;
  /** Letter-spacing in em. */
  tracking?: number;
  /** Added to the size's horizontal padding. */
  padX?: number;

  /** A tone-coloured dot before the text. */
  dot?: boolean;
  /** Square brackets around the text, which is the box. */
  brackets?: boolean;
  /** A rule under the text instead of a box around it. */
  underline?: boolean;
  /** A 2px tone edge on the left, square corners. */
  rail?: boolean;
  /** No box at all: the colour carries it. */
  bare?: boolean;
}

export const BADGE_CHIP_SKINS = [
  // ── where it started ──────────────────────────────────────────────────────
  { id: 'embossed', label: 'Embossed', note: 'The original: lit top edge, dark inner bottom, drop shadow.',
    fill: 20, border: 42, depth: 'raised' },

  // ── flat tints ────────────────────────────────────────────────────────────
  { id: 'flat', label: 'Flat tint', note: 'Fill and text, nothing else.', fill: 22 },
  { id: 'soft', label: 'Soft', note: 'A lighter tint, still boxed.', fill: 14, radius: 6 },
  { id: 'quiet', label: 'Quiet', note: 'Soft fill with a soft hairline. No depth.', fill: 12, border: 28 },
  { id: 'tint-strong', label: 'Strong tint', note: 'The tint turned up, no border.', fill: 34 },
  { id: 'ghost', label: 'Ghost', note: 'A neutral wash; the tone lives in the text.', fill: 'neutral' },
  { id: 'surface', label: 'Surface', note: 'The panel surface with a hairline, like a small card.',
    fill: 'surface', border: 22 },
  { id: 'recessed', label: 'Recessed', note: 'A well in the surface rather than a raised face.',
    fill: 'sunken', depth: 'inset' },

  // ── solids ────────────────────────────────────────────────────────────────
  { id: 'solid', label: 'Solid', note: 'Full tone with dark ink. The loudest of them.',
    solid: 100, ink: 'dark' },
  { id: 'solid-soft', label: 'Solid, softened', note: 'The tone at three quarters.',
    solid: 74, ink: 'dark' },
  { id: 'solid-muted', label: 'Solid, muted', note: 'Half tone with light text.',
    solid: 52, ink: 'light' },
  { id: 'solid-pill', label: 'Solid pill', note: 'Full tone, fully round.',
    solid: 100, ink: 'dark', radius: 'pill' },

  // ── outlines ──────────────────────────────────────────────────────────────
  { id: 'hairline', label: 'Hairline', note: 'Outline only, no fill.', border: 48 },
  { id: 'outline-strong', label: 'Strong outline', note: 'A heavier rule, still hollow.',
    border: 62, borderWidth: 1.5 },
  { id: 'outline-dashed', label: 'Dashed outline', note: 'Hollow and provisional — good for a draft state.',
    border: 55, borderStyle: 'dashed' },
  { id: 'outline-tinted', label: 'Tinted outline', note: 'A hairline over a faint wash.',
    fill: 9, border: 44 },
  { id: 'ring', label: 'Inset ring', note: 'The border drawn inside, so the box never grows.',
    fill: 10, ring: 26, radius: 6 },

  // ── corners, from square to round ─────────────────────────────────────────
  { id: 'rect', label: 'Square', note: 'No corner at all.', fill: 16, border: 30, radius: 0 },
  { id: 'tag', label: 'Tag', note: 'Two-pixel corners. Terminal-ish.', fill: 16, border: 34, radius: 2 },
  { id: 'rounded', label: 'Rounded', note: 'Six-pixel corners, the web default.',
    fill: 16, border: 30, radius: 6 },
  { id: 'rounded-lg', label: 'Rounded, large', note: 'Ten pixels: a rounded rectangle, clearly.',
    fill: 16, border: 30, radius: 10 },
  { id: 'pill', label: 'Pill', note: 'Fully round, tinted.', fill: 18, radius: 'pill', padX: 2 },
  { id: 'pill-outline', label: 'Pill, outlined', note: 'Fully round and hollow.',
    border: 46, radius: 'pill', padX: 2 },
  { id: 'pill-quiet', label: 'Pill, quiet', note: 'Round, faint fill, faint edge.',
    fill: 11, border: 26, radius: 'pill', padX: 2 },

  // ── the ones people already know ──────────────────────────────────────────
  { id: 'mui-filled', label: 'Filled, sentence case', note: 'MUI’s filled chip: round, tinted, not shouted.',
    fill: 16, radius: 'pill', padX: 3, caps: false, mono: false, weight: 500, tracking: 0 },
  { id: 'mui-outlined', label: 'Outlined, sentence case', note: 'MUI’s outlined chip.',
    border: 40, radius: 'pill', padX: 3, caps: false, mono: false, weight: 500, tracking: 0 },
  { id: 'mui-solid', label: 'Filled solid, sentence case', note: 'MUI’s coloured chip, ink on tone.',
    solid: 100, ink: 'dark', radius: 'pill', padX: 3, caps: false, mono: false, weight: 500, tracking: 0 },
  { id: 'm3-assist', label: 'Assist', note: 'Material 3 assist chip: 8px corner, surface, thin outline.',
    fill: 'surface', border: 26, radius: 8, padX: 2, caps: false, mono: false, weight: 500, tracking: 0 },
  { id: 'm3-filter', label: 'Filter', note: 'Material 3 filter chip: 8px corner, tinted, no outline.',
    fill: 20, radius: 8, padX: 2, caps: false, mono: false, weight: 500, tracking: 0 },
  { id: 'm3-input', label: 'Input', note: 'Material 3 input chip: outlined over a faint wash.',
    fill: 8, border: 34, radius: 8, padX: 2, caps: false, mono: false, weight: 500, tracking: 0 },
  { id: 'm3-elevated', label: 'Elevated', note: 'Material 3 elevated chip: a card shadow, no outline.',
    fill: 'surface', radius: 8, depth: 'lift', padX: 2, caps: false, mono: false, weight: 500, tracking: 0 },
  { id: 'ant-tag', label: 'Tag, light', note: 'Ant Design’s tag: 2px corner, pale fill, tone border.',
    fill: 10, border: 38, radius: 2, caps: false, mono: false, weight: 400, tracking: 0 },
  { id: 'github-label', label: 'Issue label', note: 'A GitHub label: round, tinted, tone border.',
    fill: 18, border: 30, radius: 'pill', padX: 2, caps: false, mono: false, weight: 500, tracking: 0 },
  { id: 'stripe-badge', label: 'Dashboard badge', note: 'Stripe’s badge: 4px corner, pale, quiet weight.',
    fill: 13, radius: 4, caps: false, mono: false, weight: 500, tracking: 0 },
  { id: 'linear-badge', label: 'Tracker badge', note: 'Linear’s: surface fill, neutral edge, tone text.',
    fill: 'surface', border: 18, radius: 4, caps: false, mono: false, weight: 500, tracking: 0 },
  { id: 'shadcn-outline', label: 'Outline, round', note: 'shadcn’s outline badge.',
    border: 42, radius: 'pill', padX: 2, caps: false, mono: false, weight: 500, tracking: 0 },
  { id: 'shadcn-solid', label: 'Default, round', note: 'shadcn’s default badge, ink on tone.',
    solid: 100, ink: 'dark', radius: 'pill', padX: 2, caps: false, mono: false, weight: 500, tracking: 0 },
  { id: 'bootstrap', label: 'Badge, square-ish', note: 'Bootstrap’s badge: 4px corner, solid.',
    solid: 92, ink: 'dark', radius: 4, caps: false, mono: false, weight: 600, tracking: 0 },
  { id: 'bootstrap-pill', label: 'Badge, pill', note: 'Bootstrap’s rounded-pill badge.',
    solid: 92, ink: 'dark', radius: 'pill', padX: 2, caps: false, mono: false, weight: 600, tracking: 0 },
  { id: 'lozenge', label: 'Lozenge', note: 'Atlassian’s: tiny, bold, uppercase, 3px corner.',
    fill: 26, radius: 3, weight: 700, tracking: 0.06 },
  { id: 'tailwind-badge', label: 'Ring badge', note: 'A Tailwind badge: pale fill, inset ring, 6px corner.',
    fill: 11, ring: 22, radius: 6, caps: false, mono: false, weight: 500, tracking: 0 },
  { id: 'chakra-subtle', label: 'Subtle', note: 'Chakra’s subtle tag: 6px corner, tinted, sentence case.',
    fill: 18, radius: 6, caps: false, mono: false, weight: 500, tracking: 0 },
  { id: 'notion-pill', label: 'Property pill', note: 'A Notion property: round, flat tint, no edge.',
    fill: 24, radius: 'pill', padX: 2, caps: false, mono: false, weight: 400, tracking: 0 },

  // ── marks instead of boxes ────────────────────────────────────────────────
  { id: 'dot', label: 'Dot and text', note: 'A state mark, then the word. No box.',
    bare: true, dot: true, weight: 600, tracking: 0.05 },
  { id: 'dot-pill', label: 'Dot in a pill', note: 'The mark inside a neutral round box.',
    fill: 'neutral', radius: 'pill', padX: 3, dot: true, caps: false, mono: false, weight: 500, tracking: 0 },
  { id: 'dot-outline', label: 'Dot, outlined', note: 'The mark inside a hollow round box.',
    border: 34, radius: 'pill', padX: 3, dot: true, caps: false, mono: false, weight: 500, tracking: 0 },
  { id: 'rail', label: 'Left rail', note: 'Square, with the tone as an edge down the left.',
    fill: 13, rail: true },
  { id: 'underline', label: 'Underline', note: 'A rule under the word instead of a box.',
    bare: true, underline: true },
  { id: 'bracketed', label: 'Bracketed', note: 'No box; the brackets are the box.',
    bare: true, brackets: true },
  { id: 'text', label: 'Text only', note: 'The colour, and nothing else.', bare: true },
] as const satisfies readonly ChipSkin[];

export type BadgeChipVariant = (typeof BADGE_CHIP_SKINS)[number]['id'];

/** Looked up by id, for the component and for anything that lists them. */
export const CHIP_SKIN_BY_ID: Record<string, ChipSkin> =
  Object.fromEntries(BADGE_CHIP_SKINS.map(s => [s.id, s as ChipSkin]));

export const DEFAULT_CHIP_VARIANT: BadgeChipVariant = 'embossed';
