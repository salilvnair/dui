# @salilvnair/dui

**Daakia UI** — a React 19 + TypeScript component library shared across
[daakia](https://github.com/salilvnair) and ck8t. 65+ components, a
CSS-variable theme system, and a Monaco-backed code editor that's entirely
optional — install it only if you use it.

[![npm version](https://img.shields.io/npm/v/@salilvnair/dui.svg)](https://www.npmjs.com/package/@salilvnair/dui)
[![license](https://img.shields.io/npm/l/@salilvnair/dui.svg)](https://github.com/salilvnair/dui/blob/main/LICENSE)

Repository: **https://github.com/salilvnair/dui**

---

## Table of contents

- [Features](#features)
- [Install](#install)
- [Quick start](#quick-start)
- [Component catalog](#component-catalog)
- [Theming](#theming)
- [The code editor — Monaco is optional](#the-code-editor--monaco-is-optional)
- [Extending MarkdownView's language support](#extending-markdownviews-language-support)
- [TypeScript](#typescript)
- [Local development](#local-development)
- [Publishing to npm](#publishing-to-npm)
- [License](#license)

---

## Features

- **65+ components** — inputs, buttons, navigation, display, overlays,
  layout, and a full debug/editor toolkit (see [catalog](#component-catalog))
- **CSS-variable theming** — every color is a `--color-*` custom property;
  retheme by overriding variables on `:root` or any container, no rebuild
- **Size system** — one `size` prop (`xxs`–`xxxl`) threaded through every
  component via `<DuiProvider>`, or override per-instance
- **Optional Monaco editor** — `EditorView`/`DiffEditorView`/`DebugEditorView`
  render a plain-text fallback out of the box; Monaco is a genuinely optional
  peer dependency, not a hard requirement (see below — this is the part of
  the library most worth understanding before you adopt it)
- **Tree-shakeable ESM** — compiled output, real `.d.ts` types, multi-entry
  build so `import '@salilvnair/dui/monaco-setup'` is the *only* way Monaco
  code ever enters your bundle

## Install

```bash
npm install @salilvnair/dui react react-dom zustand
```

Import the stylesheet once, in your app's entry point:

```ts
import '@salilvnair/dui/style.css';
```

## Quick start

```tsx
import { DuiProvider, ButtonView, TextInputView, TabView } from '@salilvnair/dui';
import '@salilvnair/dui/style.css';

export function App() {
  return (
    <DuiProvider size="md">
      <TextInputView placeholder="Search…" value={value} onChange={setValue} />
      <ButtonView onClick={handleSubmit}>Submit</ButtonView>
    </DuiProvider>
  );
}
```

`DuiProvider` is optional — every component works standalone with sensible
defaults. Wrap your app in it when you want a single place to set the
default `size` or accent color for the whole tree.

## Component catalog

<details>
<summary><b>Inputs</b> (14)</summary>

`TextInputView` · `MultilineInputView` · `SelectInputView` ·
`SelectTextInputView` · `SegmentedControlView` · `TagInputView` ·
`CheckboxView` · `ToggleSwitchView` · `SliderView` · `DurationInputView` ·
`HighlightedInputView` · `SearchInputView` · `KeyValueTableView` ·
`MergedInputView`

</details>

<details>
<summary><b>Editor / Debug toolkit</b></summary>

`EditorView` · `DebugEditorView` · `DiffEditorView` · `DebugView` — see
[Monaco is optional](#the-code-editor--monaco-is-optional) before adopting these.

</details>

<details>
<summary><b>Buttons</b> (4)</summary>

`ButtonView` · `IconButtonView` · `DropDownButtonView` · `SplitButtonView` ·
`SegmentedView` · `AIButtonView`

</details>

<details>
<summary><b>Navigation</b> (5)</summary>

`TabView` · `TabBarView` · `PilledTabView` · `ContextMenuView` ·
`SideNavView` · `SettingsNavView`

</details>

<details>
<summary><b>Display</b> (19)</summary>

`ChipView` · `StatusIndicatorView` · `LoaderView` · `EmptyStateView` ·
`ColoredTextView` · `StatsCardView` · `DottedCardView` · `DataTableView` ·
`CodeBlockView` · `MarkdownView` · `PromptCardView` · `PromptLibraryListView` ·
`PromptLibraryEditorView` · `StageView` · `HudView` · `JsonTreeView` ·
`ExpandableLogEntryView` · `CopyButtonView` · `YamlKeyChip` ·
`FeatureCategoryView`

</details>

<details>
<summary><b>Overlays</b> (3)</summary>

`ModalView` · `InfoPopupView` · `ToastView`

</details>

<details>
<summary><b>Layout</b> (8)</summary>

`ResizablePanelView` · `SplitPanelView` · `BottomPanelView` · `FolderView` ·
`CollapsibleSectionView` · `SpacerView` · `SettingsNavView` · `SideNavView`

</details>

<details>
<summary><b>More</b></summary>

`DuiProvider` (size/theme context) · `LiveColorCustomizer` ·
`ThemeCardSelectorView` · `FormDataTableView` · `RearrangeView` ·
`HiddenKeyValueItemView` · full icon set (`@salilvnair/dui` re-exports every
icon used internally)

</details>

Every component ships full TypeScript prop types — explore them via your
editor's autocomplete, or browse `src/lib` in the
[repo](https://github.com/salilvnair/dui).

## Theming

All design tokens are CSS custom properties, defined via Tailwind v4's
CSS-first `@theme` syntax and shipped in `dist/style.css`:

```css
:root {
  --color-primary: #6366f1;
  --color-surface: #1e1e1e;
  --color-surface-border: #414141;
  /* … */
}
```

Override any subset on `:root` (global) or on a wrapping element (scoped —
e.g. to theme one panel differently). Programmatic helpers live under the
`theme/*` subpath exports:

```ts
import { SCHEMA } from '@salilvnair/dui/theme/core';       // token schema (group/key/cssVar/comment)
import { generateYaml } from '@salilvnair/dui/theme/utils'; // export current theme as YAML
import { ThemeVarEditor } from '@salilvnair/dui/theme/editor'; // UI for adding a new theme variable
```

## The code editor — Monaco is optional

`EditorView`, `DiffEditorView`, and `DebugEditorView` do **not** require
`@monaco-editor/react` or `monaco-editor` to be installed. Without them,
these components render a lightweight plain-text fallback (a styled
`<textarea>` and a small line-diff view) — fully functional for basic
editing, just without IntelliSense, breakpoints, or Monaco's diff engine.

```tsx
import { EditorView } from '@salilvnair/dui';

// Works immediately, zero extra installs — renders the plain-text fallback.
<EditorView value={code} onChange={setCode} language="json" />
```

To get the real Monaco-backed editor:

```bash
npm install @monaco-editor/react monaco-editor
```

```ts
// once, at app bootstrap — before any EditorView renders
import '@salilvnair/dui/monaco-setup';
```

That import self-hosts Monaco: inline workers (no CDN — works under a strict
CSP, e.g. inside a VS Code extension webview), a VS Code–accurate dark/light
theme, and registration of the real editor implementation. `EditorView`
automatically starts rendering the Monaco-backed version the moment this
import has run; skip it and everything still works, just without Monaco.

**Why not auto-install Monaco, or fall back to a CDN?** `@monaco-editor/react`
defaults to lazy-loading Monaco assets from a public CDN when you don't
self-host — a reasonable default for a plain public web page, but wrong for
CSP-restricted environments (webviews, offline apps, intranets) where that
CDN is unreachable. Rather than silently guess, this library requires an
explicit opt-in (`monaco-setup`) and never attempts the CDN path at all.

**Bundle boundary, verified, not assumed:** `dist/index.js` (the main entry —
everything except `EditorView` internals) contains zero references to
`@monaco-editor/react` or `monaco-editor`. Only `dist/monaco-setup.js`
does. This is checked as part of the release process, not just documented —
see [Publishing](#publishing-to-npm).

## Extending MarkdownView's language support

`MarkdownView` ships syntax highlighting for a curated set of ~16 languages
(js/ts/json/xml/html/css/bash/yaml/python/sql/ruby/rust/csharp/kotlin/graphql/markdown)
via `highlight.js/lib/core`, rather than highlight.js's full ~190-language
bundle, to keep the library small. Add more without waiting on a release:

```ts
import { registerMarkdownLanguage } from '@salilvnair/dui';
import lua from 'highlight.js/lib/languages/lua';

registerMarkdownLanguage('lua', lua); // once, at app startup
```

## TypeScript

Full type declarations ship in `dist/`, generated from source — no
`@types/@salilvnair__dui` needed. `peerDependencies` cover `react`,
`react-dom`, and `zustand`; `@monaco-editor/react` and `monaco-editor` are
`peerDependenciesMeta.optional` peers (see above).

## Local development

```bash
git clone https://github.com/salilvnair/dui.git
cd dui
npm install
npm run dev            # showcase app at localhost:5173
```

Open `http://localhost:5173/#dui` for the component showcase — every
component has a live playground, examples, and prop docs.

```bash
npm run build           # builds the showcase app (for deploying docs/demo)
npm run build:lib       # builds the publishable library into dist/
```

## Publishing to npm

> This section is for library maintainers.

### Prerequisites

1. Node.js 18+ and npm 9+
2. Publish access to the `@salilvnair` scope: `npm login`

### Step 1 — Bump the version

```bash
npm version patch   # bug fix:      1.0.0 -> 1.0.1
npm version minor    # new feature:  1.0.0 -> 1.1.0
npm version major   # breaking:     1.0.0 -> 2.0.0
```

### Step 2 — Build

`prepublishOnly` runs this automatically on `npm publish`, but build first to
inspect the output:

```bash
npm run build:lib
```

Verify `dist/` contains (at minimum): `index.js`, `index.d.ts`,
`monaco-setup.js`, `monaco-setup.d.ts`, `style.css`, `theme/*.js`.

**Sanity-check the Monaco boundary** — this is the one thing worth manually
re-verifying after any build config change: `dist/index.js` must contain no
`@monaco-editor/react` or `monaco-editor` import. Only `dist/monaco-setup.js`
(and its `dist/chunks/*` dependency) should reference them:

```bash
grep -l "monaco-editor" dist/*.js dist/chunks/*.js
# should list only monaco-setup.js and its chunk — never index.js
```

### Step 3 — Verify what will be published

```bash
npm pack --dry-run
```

Only `dist/`, `README.md`, `LICENSE`, and `package.json` should appear — no
`src/`.

### Step 4 — Test the tarball locally

```bash
npm pack
# creates salilvnair-dui-X.Y.Z.tgz

# in a consumer app:
npm install /path/to/salilvnair-dui-X.Y.Z.tgz
```

Confirm both paths work: a component that never imports Monaco (build should
succeed with `@monaco-editor/react`/`monaco-editor` absent from
node_modules), and — with those installed plus `@salilvnair/dui/monaco-setup`
imported — a real Monaco-backed `EditorView`.

### Step 5 — Publish

Scoped packages default to private, so `--access public` is required:

```bash
npm publish --access public
# rehearsal first:
npm publish --dry-run --access public
```

### Step 6 — Push tags

```bash
git push && git push --tags
```

### Release checklist

- [ ] `npm version` bumped
- [ ] `npm run build:lib` succeeds
- [ ] `npm pack --dry-run` shows only `dist/`, `README.md`, `LICENSE`
- [ ] Monaco boundary check: `@monaco-editor/react`/`monaco-editor` only referenced from `monaco-setup.js` + its chunk, never `index.js`
- [ ] Tarball tested in a consumer app, both without and with Monaco installed
- [ ] `npm publish --access public` completed
- [ ] `git push && git push --tags`

### Troubleshooting

**Consumer's build fails resolving `@monaco-editor/react` even though they never use `EditorView`**
→ Something reintroduced a static import of it into `index.js`. Re-run the
Monaco boundary grep in Step 2 — this is the one regression this package
must never ship.

**Consumer's Monaco editor works in dev but hits a blocked CDN in production**
→ They installed the Monaco packages but never imported
`@salilvnair/dui/monaco-setup`. `EditorView` never falls back to the CDN
loader on its own — it only ever renders the plain-text fallback or the
self-hosted Monaco registered by `monaco-setup`.

## License

MIT © [Salil V Nair](https://github.com/salilvnair) — see [LICENSE](./LICENSE).
