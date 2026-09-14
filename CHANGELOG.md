# Changelog

Every published release of `@salilvnair/dui`, newest first.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and
the project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Dates are the day the version was tagged.

> **A note on the early numbers.** `1.0.3` and `1.0.5` were bumped locally but
> never reached npm, and `1.0.9` went out without a version commit behind it.
> The published set is `1.0.0`, `1.0.1`, `1.0.2`, `1.0.4`, `1.0.6`–`1.0.11`, and
> the sections below describe what actually shipped rather than what was
> numbered. Anything reconstructed from the commit range rather than from a
> release commit says so.

---

## [Unreleased]

### Added

- **Addressable components.** Every panel in the showcase now has a URL:
  `#/chips`, `#/chips/docs`, `#/chips?theme=light`. The README, the demo site
  and the capture scripts all link straight to a component instead of saying
  "open the showcase and find it".
- **Capture mode** — `#/<id>?capture=1` draws one component's examples with no
  header, sidebar or tab bar around it. It is what the catalog images are
  photographs of, and what the demo site embeds one component at a time.
- **`npm run shots`** — a Playwright run that photographs all 238 components in
  both grounds, writing `media/components/`, `media/components-light/` and a
  manifest the demo site reads.
- **`npm run sheets`** — one contact sheet per group, for the README.
- **`npm run showcase`** — the demo video end to end: record each segment
  against the running app, stitch, and cut a short GIF for the README.

### Changed

- The README is rebuilt around the catalog: a demo video at the top, a contact
  sheet and a table per group, and a live link on every component name. It also
  stops claiming 65 components, which it had said since there were 65.
- **The showcase loads a component at a time.** Its ~700 static panel imports
  are now lazy, grouped one chunk per component. The main chunk went from
  11.4 MB to 435 KB.
- **Monaco's workers are no longer inlined into the showcase.** Inlining is
  right for a VS Code webview, whose CSP forbids fetching a worker, and wrong
  for a web page: it put the entire TypeScript compiler, base64-encoded, into
  the chunk that has to arrive before the first paint. The published
  `@salilvnair/dui/monaco-setup` still inlines them and is unchanged; the
  showcase pairs the same shared core with fetched workers. Between the two
  changes the demo's first load went from 15.7 MB to 5.9 MB.

- **The showcase's sidebar is a `SplitPanelView`**, so it can be dragged to
  whatever width the component names need — a catalog of 238 components with
  names like `SegmentedProgressBarView` was truncating itself in a fixed 232px
  rail. The header's toggle now hides the nav outright rather than narrowing it
  to an icon rail, which is what that button's tooltip always claimed it did.

### Fixed

- **The accent scrollbar had never rendered.** Its three rules in `index.css`
  read `var(--color-accent)` with no fallback, unlike every other use of that
  hook in the same file. `--color-accent` is not defined by the library — it is
  there for a host app to override — so `color-mix()` received an empty value,
  which makes the declaration invalid, which drops it, which left every scroll
  container in the library showing the browser's default grey. Now falls back
  to `--color-primary`, and the thumb is inset into its gutter so it reads as a
  pill rather than a bar against the edge.
- `dist/monaco-setup.d.ts` is generated as a re-export of
  `./monaco-setup.core`, so the core's declarations now ship alongside it.
  Without them the runtime bundle works and every TypeScript consumer of
  `@salilvnair/dui/monaco-setup` fails to resolve the module — a break that is
  invisible until someone type-checks against the package.

---

## [1.0.11] — 2026-09-14

### Fixed

- **`LoaderView`** — a loader that fills its panel can set its own measure. The
  size prop was being read as the spinner's size and the panel's at once, so a
  loader asked to fill a large panel drew a very large spinner in it.

---

## [1.0.10] — 2026-09-14

### Fixed

- **`StepperInputView`** — the field is now wide enough for its own maximum, and
  typing into it works. It was sized from the current value, so stepping from 9
  to 10 reflowed the control, and the input rejected intermediate states that
  every real edit passes through.

---

## [1.0.9] — 2026-09-13

> Published without a release commit; reconstructed from the commit range.

### Added

- **`SearchInputView` history.** The box offers what you searched before, and
  the whole history can be cleared from its heading.
- **`ChipView` skins** — fifty looks, from one `skin` prop.

### Fixed

- **`ChipView`** — an icon in a chip sits on the same line as the word.
- **`MarkdownView`** — escapes only what would actually be markup, rather than
  every angle bracket it met.

---

## [1.0.8] — 2026-09-12

### Added

- **Test markers on everything.** Every interactive component takes a `testId`
  and lands it on its root as `data-testid`, so a consumer's test suite can
  address the library rather than guessing at class names.
- **`EditorView`** can stop closing brackets for you — `autoClosingBrackets:
  'never'` is honoured by the tag auto-close as well as by Monaco's own.
- **`BottomSheetView`** — a sheet off any edge, not only the bottom.

### Fixed

- The test marker goes on the container, not on every item inside it.
- **`MarkdownView`** stops editing other people's parsers — it registers its
  languages on its own highlight.js instance.

### Note

- Versioned straight to `1.0.8`: `1.0.7` was already on npm.

---

## [1.0.7] — 2026-08-25

### Added

- **`DropDownButtonView`** gains `primaryDisabled`, so the primary action and
  the menu beside it can be disabled independently.
- **`MarkdownEditorView`** — a rich editor over one Markdown document, with a
  flat pair of view switches rather than a segmented control.
- **`LineDiffView`** — two texts side by side with the changed lines marked.
- **`SplitPanelView`** can collapse either side.
- **`ChipView`** gains a dismiss control of its own and a label that can be
  capped.
- **`SelectInputView`** can size its menu apart from its trigger, and the menu
  says which row is chosen.
- **Tracker primitives** — the pieces a board is built from, including an issue
  card for something that has not arrived yet.
- **`TimeZoneSelectView`**, and the conversion that makes one useful.
- **`FileBrowserView`** and **`PathBreadcrumbView`**, with selection, an arrival
  highlight, a dense mode, right-click rows, symlink chains, and a skeleton it
  draws itself.
- **`BadgeChipView`** — the pill everything else was writing out by hand.
- **`SearchFieldView`**, the filter box's sibling that runs something.
- **`IconSize`**, so an icon size is a role rather than a guess.
- **`ContextMenuView`** — an optional description line on an item, and a
  submenu that stops growing at its parent's width.
- **`EditorView`** — Copy JSON Path and Copy XPath, with a path submenu at every
  level, and the path scanners exported for use outside the component.
- **Charts** — sunburst, donut, flame graph, the two lane charts, and
  `FindingCardView`.
- **Terminal palettes** for both grounds, as a file, with swatches you can name.

### Fixed

- **`MarkdownEditorView`** — Link and Image were asked for with a dialog the
  host may forbid; they now ask in-page.
- **`EditorView`** — Ctrl+V is given back to the browser.
- **`SelectInputView`** flips using the height the menu will be, not the height
  of its content.
- **`ButtonView`** — a label inside a fixed height never wraps.
- **`SideNavView`** — `accentColor` tints the active row.
- **`SplitPanelView`** draws the divider, not only the grab handle.
- **Inputs** honour `fullWidth={false}`, and a field's focus colour follows the
  screen it is on.
- An empty list no longer scrolls, and a skeleton no longer fills one.

---

## [1.0.6] — 2026-08-17

### Added

- Variable-token support across the input components.
- A fan-stack layout.
- Network graph rendering via the optional `vis-network` peer.

---

## [1.0.4] — 2026-07-30

### Fixed

- **`HighlightedInputView`** — its dropdown matches `SelectTextInputView`'s
  pixel for pixel.
- Corrected a ref type, and simplified the smooth-scroll config.

---

## [1.0.2] — 2026-07-18

### Added

- A `fill` prop, and `CommandChip` is exported.
- New icons, and theme-driven CSS across the component set.

### Fixed

- Alignment, the theme flash on first paint, and disabled states.

---

## [1.0.1] — 2026-07-01

### Added

- Optional `vis-network` support, new icons, a HUD legend, and tab enhancements.
- The README.

---

## [1.0.0] — 2026-07-01

First publish. The component library extracted from
[daakia](https://github.com/salilvnair/daakia) and ck8t so both could share it:
CSS-variable theming, a size system threaded through every component, and a
Monaco-backed editor that is a genuinely optional peer dependency.

---

[Unreleased]: https://github.com/salilvnair/dui/compare/v1.0.11...HEAD
[1.0.11]: https://github.com/salilvnair/dui/compare/v1.0.10...v1.0.11
[1.0.10]: https://github.com/salilvnair/dui/compare/v1.0.8...v1.0.10
[1.0.9]: https://github.com/salilvnair/dui/compare/v1.0.8...v1.0.10
[1.0.8]: https://github.com/salilvnair/dui/releases/tag/v1.0.8
[1.0.7]: https://github.com/salilvnair/dui/releases/tag/v1.0.7
[1.0.6]: https://github.com/salilvnair/dui/releases/tag/v1.0.6
[1.0.4]: https://github.com/salilvnair/dui/releases/tag/v1.0.4
[1.0.2]: https://github.com/salilvnair/dui/releases/tag/v1.0.2
[1.0.1]: https://github.com/salilvnair/dui/releases/tag/v1.0.1
[1.0.0]: https://github.com/salilvnair/dui/releases/tag/v1.0.0
