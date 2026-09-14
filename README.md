<div align="center">

# @salilvnair/dui

**Daakia UI** — a React 19 + TypeScript component library of **238 components**,
every colour a CSS variable, and a Monaco-backed editor you only pay for if you
use it.

[![npm version](https://img.shields.io/npm/v/@salilvnair/dui.svg)](https://www.npmjs.com/package/@salilvnair/dui)
[![npm downloads](https://img.shields.io/npm/dm/@salilvnair/dui.svg)](https://www.npmjs.com/package/@salilvnair/dui)
[![license](https://img.shields.io/npm/l/@salilvnair/dui.svg)](https://github.com/salilvnair/dui/blob/main/LICENSE)
[![types](https://img.shields.io/badge/types-included-3178c6.svg)](#typescript)

**[Live demo](https://salilvnair.com/framework/dui/)** ·
[Component catalog](#component-catalog) ·
[Theming](#theming) ·
[Changelog](./CHANGELOG.md)

</div>

![DUI — 238 components, a live playground, live retheming, light and dark](https://raw.githubusercontent.com/salilvnair/dui/main/media/dui-showcase.gif)

<sub>Ninety seconds of it. The full walkthrough is
[here as an mp4](https://raw.githubusercontent.com/salilvnair/dui/main/media/dui-showcase.mp4),
and the thing itself is [live](https://salilvnair.com/framework/dui/) — every
component has a playground, examples you can copy, and a props table.</sub>

---

## Table of contents

- [Why this exists](#why-this-exists)
- [Install](#install)
- [Quick start](#quick-start)
- [What you get](#what-you-get)
  - [A playground on every component](#a-playground-on-every-component)
  - [Every colour is a variable](#every-colour-is-a-variable)
  - [Light and dark, both first-class](#light-and-dark-both-first-class)
  - [Every prop documented, in the app](#every-prop-documented-in-the-app)
- [Component catalog](#component-catalog)
- [Theming](#theming)
- [The code editor — Monaco is optional](#the-code-editor--monaco-is-optional)
- [Extending MarkdownView's language support](#extending-markdownviews-language-support)
- [TypeScript](#typescript)
- [Local development](#local-development)
- [Screenshots, video and the demo site](#screenshots-video-and-the-demo-site)
- [Publishing to npm](#publishing-to-npm)
- [License](#license)

---

## Why this exists

DUI was extracted from [daakia](https://github.com/salilvnair/daakia) and ck8t
so the two could stop maintaining the same forty components twice. That origin
is visible in what it is good at — dense, professional, tool-shaped UI: tables
that sort, panels that split, an editor that takes breakpoints, a file browser,
a props table, a request flow. It is not a marketing-site kit.

Three things follow from being a library two real apps depend on:

- **Nothing is a hard dependency that does not have to be.** Monaco,
  vis-network and the rest are optional peers. `dist/index.js` contains zero
  references to any of them, and that is
  [checked at release](#publishing-to-npm), not just claimed.
- **Retheming is a colour change, not a fork.** Every token is a
  `--color-*` custom property. Override a variable on `:root`, or on one
  container to theme a single panel differently.
- **One size prop, threaded through everything.** `xxs`–`xxxl` set once on
  `<DuiProvider>`, overridable per instance, consistent between a button and
  the select next to it.

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
import { DuiProvider, ButtonView, TextInputView } from '@salilvnair/dui';
import '@salilvnair/dui/style.css';

export function App() {
  const [value, setValue] = useState('');
  return (
    <DuiProvider size="md">
      <TextInputView placeholder="Search…" value={value} onChange={setValue} />
      <ButtonView variant="primary" onClick={handleSubmit}>Submit</ButtonView>
    </DuiProvider>
  );
}
```

`DuiProvider` is optional — every component works standalone with sensible
defaults. Wrap your app in it when you want one place to set the default size
or accent colour for the whole tree.

---

## What you get

### A playground on every component

Every one of the 238 components opens on an editable JSX snippet with a live
preview under it. Change a prop, see it, copy the line out.

![Editing the JSX for ButtonView and the preview updating live](https://raw.githubusercontent.com/salilvnair/dui/main/media/sections/playground.gif)

### Every colour is a variable

Theming is not a config file you rebuild — it is a CSS custom property. The
showcase exposes the variables each component reads, so you can drag one and
watch what it touches before writing a line.

![Dragging the accent variable and the chips repainting as it moves](https://raw.githubusercontent.com/salilvnair/dui/main/media/sections/theming.gif)

### Light and dark, both first-class

Not a dark theme with a light afterthought. Every token is defined for both
grounds, and the switch is a `data-theme` attribute.

![The same panel on the light ground and back to dark](https://raw.githubusercontent.com/salilvnair/dui/main/media/sections/themes.gif)

<details>
<summary>The catalog on the light ground</summary>

Every group has a light contact sheet too, in
[`media/sheets-light/`](https://github.com/salilvnair/dui/tree/main/media/sheets-light) —
the same components, the same captures, the other theme. Two of them:

![Inputs, on the light ground](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets-light/inputs.png)

![Display, on the light ground](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets-light/display.png)

Or add `?theme=light` to any component's address in the
[live demo](https://salilvnair.com/framework/dui/#/chips?theme=light).

</details>

### Every prop documented, in the app

Each component carries its own props table — name, type, default, and what it
does — beside the examples rather than in a separate site that drifts.

![Scrolling the props table for TextInputView](https://raw.githubusercontent.com/salilvnair/dui/main/media/sections/docs.gif)

### And the rest of it

<table>
<tr>
<td width="50%">

**Tables and data grids** — sorting, sticky headers, editable cells, column
visibility, pagination, virtualisation.

![A data table sorting, with the source shown under it](https://raw.githubusercontent.com/salilvnair/dui/main/media/sections/data.gif)

</td>
<td width="50%">

**Dashboards** — stat cards, sparklines, heatmap calendars, a kanban board.

![Stat cards, a sparkline, a heatmap calendar and a kanban board](https://raw.githubusercontent.com/salilvnair/dui/main/media/sections/dashboards.gif)

</td>
</tr>
<tr>
<td width="50%">

**Overlays** — modals that stack themselves, drawers off any edge, popovers,
tooltips, action sheets, a spotlight tour.

![A modal opening over the examples and closing on Escape](https://raw.githubusercontent.com/salilvnair/dui/main/media/sections/overlays.gif)

</td>
<td width="50%">

**Motion** — loaders, streaming text, a command orb, and the signature series.

![A constellation loader, a breathing loader, streaming text and a command orb](https://raw.githubusercontent.com/salilvnair/dui/main/media/sections/motion.gif)

</td>
</tr>
</table>

**The editor**, with Monaco installed or without it — see
[Monaco is optional](#the-code-editor--monaco-is-optional).

![EditorView with Monaco, and the plain-text fallback beside it](https://raw.githubusercontent.com/salilvnair/dui/main/media/sections/editor.gif)

**All 238 of them, searchable** — the showcase's sidebar is the fastest way to
find the component you half-remember.

![Searching the sidebar for "table", then for "picker"](https://raw.githubusercontent.com/salilvnair/dui/main/media/sections/catalog.gif)

---

## Component catalog

<!-- catalog:start -->

<!-- Generated by `npm run catalog` from media/components.dark.json — do not edit by hand. -->

**238 components** across 18 groups.
Every name links to that component running in the live demo; every group opens to a
contact sheet and a table of what is in it.

<details>
<summary><b>Inputs</b> (16)</summary>

![Inputs — TextInputView, SelectInputView, SelectTextInputView, TagInputView, CheckboxView, ToggleSwitchView, ThemeCardSelectorView, EditorView, DebugEditorView, SearchInputView, DurationInputView, HighlightedInputView, KeyValueTableView, MergedInputView, PickerView, SegmentedControlView](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets/inputs.png)

| Component | What it is |
| --- | --- |
| [`TextInputView`](https://salilvnair.com/framework/dui/#/textinput) | Standard text input — sizes match ButtonView and SelectInputView exactly. |
| [`SelectInputView`](https://salilvnair.com/framework/dui/#/selectinput) | Portal dropdown with keyboard nav — replaces all StyledDropdown usages. |
| [`SelectTextInputView`](https://salilvnair.com/framework/dui/#/selecttextinput) | Combined method selector + URL input in one bordered pill — URL bar pattern. |
| [`TagInputView`](https://salilvnair.com/framework/dui/#/taginput) | Multi-value tag input — Enter or comma to add, Backspace to remove. |
| [`CheckboxView`](https://salilvnair.com/framework/dui/#/checkbox) | Checkbox — checked / unchecked / indeterminate / disabled — with accent colors. |
| [`ToggleSwitchView`](https://salilvnair.com/framework/dui/#/toggle) | On/off toggle with sm/md/lg sizes, accent color, label positions, disabled state. |
| [`ThemeCardSelectorView`](https://salilvnair.com/framework/dui/#/themecardselector) | Card-based theme picker with color swatch previews and checkmark selection. |
| [`EditorView`](https://salilvnair.com/framework/dui/#/editor) | Monaco editor wrapper — simplified props — JSON / GQL / XML / YAML etc. |
| [`DebugEditorView`](https://salilvnair.com/framework/dui/#/debugeditor) | Monaco editor with breakpoint gutter, paused-line highlight, and variable-hover tooltips. |
| [`SearchInputView`](https://salilvnair.com/framework/dui/#/searchinput) | URL-bar style search input with optional prefix icon and suffix clear button. |
| [`DurationInputView`](https://salilvnair.com/framework/dui/#/durationinput) | Number input with ms / s / m / hr unit selector dropdown. |
| [`HighlightedInputView`](https://salilvnair.com/framework/dui/#/highlightedinput) | {{variable}} highlighted URL input with autocomplete dropdown — the Daakia URL bar. |
| [`KeyValueTableView`](https://salilvnair.com/framework/dui/#/keyvaluetable) | KV table — toolbar · add/delete/bulk-clear · enable toggle · maskSensitive · autocompleteKeys · showDescription · pin… |
| [`MergedInputView`](https://salilvnair.com/framework/dui/#/mergedinput) | Unified single-border input bar — merge select dropdowns, text inputs, inline buttons, and dividers into one pill. |
| [`PickerView`](https://salilvnair.com/framework/dui/#/picker) | Scrollable wheel picker — single column or multi-column (hour/min/AM-PM) — momentum scroll, snap, and depth-fade anim… |
| [`SegmentedControlView`](https://salilvnair.com/framework/dui/#/segmentedcontrol) | Pill-shaped segmented control — solid sliding indicator with a springy bounce transition — pill / rounded / pointy sh… |

</details>

<details>
<summary><b>Date & Time</b> (5)</summary>

![Date & Time — CalendarView, DateInputView, DateRangePickerView, TimeWheelView, CountdownRingView](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets/date-time.png)

| Component | What it is |
| --- | --- |
| [`CalendarView`](https://salilvnair.com/framework/dui/#/calendar) | Month grid calendar — single / range / multi select, min/max bounds, animated month transitions. |
| [`DateInputView`](https://salilvnair.com/framework/dui/#/dateinput) | Text field trigger + CalendarView popover — the standard date field pattern. |
| [`DateRangePickerView`](https://salilvnair.com/framework/dui/#/daterangepicker) | Range calendar + quick presets (Today / Last 7 days / Last 30 days / This month). |
| [`TimeWheelView`](https://salilvnair.com/framework/dui/#/timewheel) | Prop-driven wrapper over PickerView columns for hour/minute/AM-PM — 12h or 24h mode, configurable minute step. |
| [`CountdownRingView`](https://salilvnair.com/framework/dui/#/countdownring) | Circular countdown ring + digit readout — target Date or durationSeconds, onComplete callback. |

</details>

<details>
<summary><b>Form & Selection</b> (14)</summary>

![Form & Selection — RadioGroupView, RadioCardView, RatingView, OtpInputView, PhoneInputView, ColorPickerView, IconPickerView, EmojiPickerView, FileDropzoneView, AvatarUploadView, MaskedInputView, TransferListView, StepperInputView, SwitchGroupView](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets/form-selection.png)

| Component | What it is |
| --- | --- |
| [`RadioGroupView`](https://salilvnair.com/framework/dui/#/radiogroup) | Radio list with optional descriptions — vertical or horizontal layout. |
| [`RadioCardView`](https://salilvnair.com/framework/dui/#/radiocard) | Big selectable cards — plan pickers, mode selectors — grid layout via `columns`. |
| [`RatingView`](https://salilvnair.com/framework/dui/#/rating) | Star or heart rating input — half-step precision, hover preview, read-only mode. |
| [`OtpInputView`](https://salilvnair.com/framework/dui/#/otpinput) | Auto-advance OTP/PIN boxes — paste splits across cells, onComplete callback. |
| [`PhoneInputView`](https://salilvnair.com/framework/dui/#/phoneinput) | Country-code select + number field in one bordered pill. |
| [`ColorPickerView`](https://salilvnair.com/framework/dui/#/colorpicker) | Swatch grid + native hue canvas + hex input, popover trigger. |
| [`IconPickerView`](https://salilvnair.com/framework/dui/#/iconpicker) | Searchable grid over every DUI icon — popover trigger. |
| [`EmojiPickerView`](https://salilvnair.com/framework/dui/#/emojipicker) | Categorized emoji grid with search — popover trigger. |
| [`FileDropzoneView`](https://salilvnair.com/framework/dui/#/filedropzone) | Drag-drop upload zone — per-file progress bars, remove action. |
| [`AvatarUploadView`](https://salilvnair.com/framework/dui/#/avatarupload) | Circular avatar preview with a camera-overlay upload button. |
| [`MaskedInputView`](https://salilvnair.com/framework/dui/#/maskedinput) | Pattern-masked text input — `9`=digit, `A`=letter, `*`=any, literal separators auto-insert. |
| [`TransferListView`](https://salilvnair.com/framework/dui/#/transferlist) | Dual listbox — available ↔ selected — move one or move-all controls. |
| [`StepperInputView`](https://salilvnair.com/framework/dui/#/stepperinput) | Numeric +/- stepper — iOS UIStepper pattern — min/max/step. |
| [`SwitchGroupView`](https://salilvnair.com/framework/dui/#/switchgroup) | Settings.app-style grouped toggle rows — section header, per-row description, disabled state. |

</details>

<details>
<summary><b>Feedback & Status</b> (10)</summary>

![Feedback & Status — SnackbarView, BannerView, ProgressRingView, ProgressBarView, SkeletonView, NotificationBadgeView, AvatarView, AvatarGroupView, PresenceDotView, ConfettiBurstView](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets/feedback-status.png)

| Component | What it is |
| --- | --- |
| [`SnackbarView`](https://salilvnair.com/framework/dui/#/snackbar) | Single-line bottom bar + action, auto-dismiss timer pauses on hover — distinct from the stacked-corner ToastView. |
| [`BannerView`](https://salilvnair.com/framework/dui/#/banner) | Persistent dismissible top strip — info / success / warning / danger variants. |
| [`ProgressRingView`](https://salilvnair.com/framework/dui/#/progressring) | Circular determinate/indeterminate progress — distinct from GaugeView (metric gauge). |
| [`ProgressBarView`](https://salilvnair.com/framework/dui/#/progressbar) | Linear progress — buffer fill and striped-indeterminate variants. |
| [`SkeletonView`](https://salilvnair.com/framework/dui/#/skeleton) | Composable shimmer primitives — text / block / avatar / row — for custom loading layouts. |
| [`NotificationBadgeView`](https://salilvnair.com/framework/dui/#/notificationbadge) | Dot/count badge overlay anchor for icons and avatars. |
| [`AvatarView`](https://salilvnair.com/framework/dui/#/avatar) | Image or initials fallback, with an optional presence-status dot. |
| [`AvatarGroupView`](https://salilvnair.com/framework/dui/#/avatargroup) | Stacked overlapping avatars with a "+N" overflow bubble. |
| [`PresenceDotView`](https://salilvnair.com/framework/dui/#/presencedot) | Tiny online/away/busy/offline status primitive. |
| [`ConfettiBurstView`](https://salilvnair.com/framework/dui/#/confettiburst) | Canvas confetti burst triggered imperatively via ref — fire() from any event handler. |

</details>

<details>
<summary><b>Buttons</b> (4)</summary>

![Buttons — ButtonView, IconButtonView, DropDownButtonView, AIButtonView](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets/buttons.png)

| Component | What it is |
| --- | --- |
| [`ButtonView`](https://salilvnair.com/framework/dui/#/button) | Standard button — primary / secondary / ghost / danger — all sizes. |
| [`IconButtonView`](https://salilvnair.com/framework/dui/#/iconbutton) | Square icon-only buttons — ghost / filled — toggle support — all sizes. |
| [`DropDownButtonView`](https://salilvnair.com/framework/dui/#/dropdownbutton) | Split button — primary action + chevron dropdown — Save as, Export as, etc. |
| [`AIButtonView`](https://salilvnair.com/framework/dui/#/aibutton) | AI action button — generate · fuzz · explain · fix · ask · suggest — loading state. |

</details>

<details>
<summary><b>Navigation</b> (9)</summary>

![Navigation — TabView, TabBarView, ContextMenuView, SideNavView, SettingsNavView, BreadcrumbView, PaginationView, DockView, FabView](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets/navigation.png)

| Component | What it is |
| --- | --- |
| [`TabView`](https://salilvnair.com/framework/dui/#/tabs) | pill · underline variants — sliding indicator, badges, dots — all with accentColor. |
| [`TabBarView`](https://salilvnair.com/framework/dui/#/tabbar) | Editor-style protocol tab bar — store-free, drag-free, scroll arrows, dirty dot. |
| [`ContextMenuView`](https://salilvnair.com/framework/dui/#/contextmenu) | Recursive context menu with submenus — portal rendered — collection tree style. |
| [`SideNavView`](https://salilvnair.com/framework/dui/#/sidenav) | Collapsible left sidebar nav with nested items and icon-only collapse mode. |
| [`SettingsNavView`](https://salilvnair.com/framework/dui/#/settingsnav) | Settings-style grouped nav with badges, descriptions, active state. |
| [`BreadcrumbView`](https://salilvnair.com/framework/dui/#/breadcrumb) | Path breadcrumb trail with overflow-collapse into a "…" for long paths. |
| [`PaginationView`](https://salilvnair.com/framework/dui/#/pagination) | Page number control with ellipsis collapse for long ranges. |
| [`DockView`](https://salilvnair.com/framework/dui/#/dock) | Floating icon dock — icons magnify as the cursor approaches. |
| [`FabView`](https://salilvnair.com/framework/dui/#/fab) | Floating action button — standard, extended (with label), or speed-dial with sub-actions. |

</details>

<details>
<summary><b>Display</b> (19)</summary>

![Display — ChipView, StatusIndicatorView, LoaderView, EmptyStateView, ColoredTextView, StatsCardView, DottedCardView, DataTableView, CodeBlockView, PromptCardView, PromptLibraryView, StageCheck/Spin/Pulse, HudView, JsonTreeView, ExpandableLogEntryView, CopyButtonView, MarkdownView, FormDataTableView, YamlKeyChip](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets/display.png)

| Component | What it is |
| --- | --- |
| [`ChipView`](https://salilvnair.com/framework/dui/#/chips) | Colored badge chips for methods, protocols, status codes, filter tags. |
| [`StatusIndicatorView`](https://salilvnair.com/framework/dui/#/statusindicator) | Connection status dot — idle · connecting · connected · disconnected · error. |
| [`LoaderView`](https://salilvnair.com/framework/dui/#/loader) | Loading states — spinner · dots · skeleton · pulse · progress-bar. |
| [`EmptyStateView`](https://salilvnair.com/framework/dui/#/emptystate) | Empty state placeholder with icon, title, message, and optional CTA button. |
| [`ColoredTextView`](https://salilvnair.com/framework/dui/#/coloredtext) | Token-colored text — HTTP status lines, gRPC codes, SOAP faults. |
| [`StatsCardView`](https://salilvnair.com/framework/dui/#/statscard) | Colorful metric card — value, unit, trend (up/down/neutral), subValue. |
| [`DottedCardView`](https://salilvnair.com/framework/dui/#/dottedcard) | Dotted-border expandable card — useful for optional config sections. |
| [`DataTableView`](https://salilvnair.com/framework/dui/#/datatable) | Generic sortable table — columns, striped rows, empty state, row click. |
| [`CodeBlockView`](https://salilvnair.com/framework/dui/#/codeblock) | Read-only code block — language label, copy button, optional line numbers. |
| [`PromptCardView`](https://salilvnair.com/framework/dui/#/promptcard) | Single prompt library row card — colored avatar initials, title, description, protocol badge, CUSTOM badge, hover act… |
| [`PromptLibraryView`](https://salilvnair.com/framework/dui/#/promptlibrary) | Full Prompt Library panel — list (search + sections + categories) + editor (avatar header + tabs + preview/edit toggl… |
| [`StageCheck/Spin/Pulse`](https://salilvnair.com/framework/dui/#/stageview) | Step-level status indicators — completed (check), active (spin), pending (pulse) — for multi-step pipelines and reque… |
| [`HudView`](https://salilvnair.com/framework/dui/#/hudview) | Generic floating draggable toolbar — store-free counterpart of DebugHud. |
| [`JsonTreeView`](https://salilvnair.com/framework/dui/#/jsontree) | Recursive JSON / object / array value tree with editor-style token colors. |
| [`ExpandableLogEntryView`](https://salilvnair.com/framework/dui/#/logentry) | Expandable log row with icon, title, colored badge, timestamp chip, and chevron. |
| [`CopyButtonView`](https://salilvnair.com/framework/dui/#/copybutton) | Icon-only button that copies text to clipboard. |
| [`MarkdownView`](https://salilvnair.com/framework/dui/#/markdownview) | Renders Markdown (GFM) with syntax-highlighted code blocks, inline code, tables, task lists, blockquotes, and copy-bu… |
| [`FormDataTableView`](https://salilvnair.com/framework/dui/#/formdatatable) | Multipart/form-data key-value table with file upload support. |
| [`YamlKeyChip`](https://salilvnair.com/framework/dui/#/yamlkeychip) | Compact type-labeled chip for YAML/JSON keys. |

</details>

<details>
<summary><b>Overlays</b> (9)</summary>

![Overlays — ModalView, InfoPopupView, ToastView, PopoverView, TooltipView, DrawerView, ActionSheetView, BottomSheetView, SpotlightTourView](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets/overlays.png)

| Component | What it is |
| --- | --- |
| [`ModalView`](https://salilvnair.com/framework/dui/#/modal) | Configurable modal — sm/md/lg/xl — never closes on backdrop click. |
| [`InfoPopupView`](https://salilvnair.com/framework/dui/#/infopopup) | Help popup anchored near a ? |
| [`ToastView`](https://salilvnair.com/framework/dui/#/toast) | Toast notification stack — success · error · warning · info — auto-dismiss. |
| [`PopoverView`](https://salilvnair.com/framework/dui/#/popover) | Generic anchored floating-content primitive — the positioning engine behind SelectInputView/InfoPopupView, exposed st… |
| [`TooltipView`](https://salilvnair.com/framework/dui/#/tooltip) | Hover/focus tooltip primitive — top/bottom/left/right placement, configurable delay. |
| [`DrawerView`](https://salilvnair.com/framework/dui/#/drawer) | Slide-in overlay panel from any edge, with backdrop — navigation-drawer pattern. |
| [`ActionSheetView`](https://salilvnair.com/framework/dui/#/actionsheet) | Bottom list of actions + destructive styling + cancel. |
| [`BottomSheetView`](https://salilvnair.com/framework/dui/#/bottomsheet) | Drag-to-dismiss mobile sheet — distinct from the persistent, resizable BottomPanelView. |
| [`SpotlightTourView`](https://salilvnair.com/framework/dui/#/spotlighttour) | Coach-mark onboarding — spotlight cutout around a target selector + step tooltip + progress dots. |

</details>

<details>
<summary><b>Layout</b> (22)</summary>

![Layout — ResizablePanelView, SplitPanelView, BottomPanelView, FeatureCategoryView, CollapsibleSectionView, SpacerView, FolderView, DebugView, HeroView, LevelView, MediaObjectView, TileGridView, PanelListView, NavbarView, AffixView, AnchorView, StickyHeaderView, AspectRatioView, MasonryGridView, ScrollAreaView, BackToTopView, WatermarkView](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets/layout.png)

| Component | What it is |
| --- | --- |
| [`ResizablePanelView`](https://salilvnair.com/framework/dui/#/resizablepanel) | Single-pane panel with bottom-edge drag handle to resize height — no store dependency. |
| [`SplitPanelView`](https://salilvnair.com/framework/dui/#/splitpanel) | Split-pane container — horizontal or vertical — drag pill, double-click to reset. |
| [`BottomPanelView`](https://salilvnair.com/framework/dui/#/bottompanel) | DevTools-style resizable bottom panel with tab bar and collapse toggle. |
| [`FeatureCategoryView`](https://salilvnair.com/framework/dui/#/featurecategory) | Expandable feature category with toggle switches and enabled count badge. |
| [`CollapsibleSectionView`](https://salilvnair.com/framework/dui/#/collapsiblesection) | Expandable section with chevron toggle, colored chip title, count badge, and a right-side action slot. |
| [`SpacerView`](https://salilvnair.com/framework/dui/#/spacerview) | Thin divider line for separating groups in icon rails, toolbars, or any flex container. |
| [`FolderView`](https://salilvnair.com/framework/dui/#/folderview) | Generic folder tree component with expand/collapse, hover action buttons, DUI ContextMenuView on 3-dot, and DUI Modal… |
| [`DebugView`](https://salilvnair.com/framework/dui/#/debugview) | Editor-style Run & Debug sidebar panel — Variables (scoped tree), Watch expressions, Call Stack, Breakpoints. |
| [`HeroView`](https://salilvnair.com/framework/dui/#/hero) | Banner section — title/subtitle/CTA, size-driven min-height. |
| [`LevelView`](https://salilvnair.com/framework/dui/#/level) | Space-between horizontal toolbar row primitive. |
| [`MediaObjectView`](https://salilvnair.com/framework/dui/#/mediaobject) | Avatar/icon + content + actions row. |
| [`TileGridView`](https://salilvnair.com/framework/dui/#/tilegrid) | Nested ancestor/parent/child tile grid. |
| [`PanelListView`](https://salilvnair.com/framework/dui/#/panellist) | Heading + tabs + filterable block list. |
| [`NavbarView`](https://salilvnair.com/framework/dui/#/navbar) | Top app bar — brand, link menu, burger collapse on narrow widths. |
| [`AffixView`](https://salilvnair.com/framework/dui/#/affix) | Sticky-on-scroll wrapper — pins once it reaches offsetTop. |
| [`AnchorView`](https://salilvnair.com/framework/dui/#/anchor) | Scroll-spy in-page navigation — highlights the section in view, click to jump. |
| [`StickyHeaderView`](https://salilvnair.com/framework/dui/#/stickyheader) | Sticky section header that grows a shadow once pinned. |
| [`AspectRatioView`](https://salilvnair.com/framework/dui/#/aspectratio) | Fixed aspect-ratio box for image/video containers. |
| [`MasonryGridView`](https://salilvnair.com/framework/dui/#/masonrygrid) | Pinterest-style column-balanced layout — pure CSS columns, no JS measurement. |
| [`ScrollAreaView`](https://salilvnair.com/framework/dui/#/scrollarea) | Custom accent-tinted scrollbar container primitive. |
| [`BackToTopView`](https://salilvnair.com/framework/dui/#/backtotop) | Floating scroll-to-top button — fades in past a scroll threshold. |
| [`WatermarkView`](https://salilvnair.com/framework/dui/#/watermark) | Repeated diagonal text/logo overlay. |

</details>

<details>
<summary><b>Data & Enterprise</b> (14)</summary>

![Data & Enterprise — DescriptionsView, StatisticView, ResultView, CascaderView, ComboBoxView, ListView, VirtualizedListView, StickyTableHeaderView, TablePaginationView, FilterBarView, SortableHeaderView, EditableCellView, DataGridToolbarView, ColumnVisibilityMenuView](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets/data-enterprise.png)

| Component | What it is |
| --- | --- |
| [`DescriptionsView`](https://salilvnair.com/framework/dui/#/descriptions) | Read-only label/value grid for entity detail views. |
| [`StatisticView`](https://salilvnair.com/framework/dui/#/statistic) | Inline animated big-number stat with prefix/suffix. |
| [`ResultView`](https://salilvnair.com/framework/dui/#/result) | Full-page outcome state — success / error / 404 / 403 / warning / info. |
| [`CascaderView`](https://salilvnair.com/framework/dui/#/cascader) | Multi-level cascading select — region/category trees. |
| [`ComboBoxView`](https://salilvnair.com/framework/dui/#/combobox) | Free-text input + filtered dropdown suggestions — autocomplete pattern. |
| [`ListView`](https://salilvnair.com/framework/dui/#/listview) | Generic avatar/title/subtitle/action list primitive. |
| [`VirtualizedListView`](https://salilvnair.com/framework/dui/#/virtualizedlist) | Windowed rendering for large lists — only mounts rows in (or near) the viewport. |
| [`StickyTableHeaderView`](https://salilvnair.com/framework/dui/#/stickytableheader) | Sticky header + optional frozen first column for wide/tall tables. |
| [`TablePaginationView`](https://salilvnair.com/framework/dui/#/tablepagination) | Rows-per-page selector + page-number footer. |
| [`FilterBarView`](https://salilvnair.com/framework/dui/#/filterbar) | Chip-based row of active filters with a clear-all action. |
| [`SortableHeaderView`](https://salilvnair.com/framework/dui/#/sortableheader) | Clickable table column header with a sort-direction arrow indicator. |
| [`EditableCellView`](https://salilvnair.com/framework/dui/#/editablecell) | Click-to-edit table cell — Enter commits, Escape cancels. |
| [`DataGridToolbarView`](https://salilvnair.com/framework/dui/#/datagridtoolbar) | Table toolbar — search + column-visibility + density cycle + export. |
| [`ColumnVisibilityMenuView`](https://salilvnair.com/framework/dui/#/columnvisibility) | Checkbox menu to toggle table column visibility. |

</details>

<details>
<summary><b>Advanced Selection</b> (13)</summary>

![Advanced Selection — KbdView, WizardStepperView, AccordionGroupView, SegmentedProgressBarView, ChecklistView, PriorityPickerView, TagCloudView, RangeSliderView, VoteWidgetView, LikeButtonView, BookmarkButtonView, FollowButtonView, ShortcutRecorderView](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets/advanced-selection.png)

| Component | What it is |
| --- | --- |
| [`KbdView`](https://salilvnair.com/framework/dui/#/kbd) | Hotkey hint chip, composes multiple keys with a "+" separator. |
| [`WizardStepperView`](https://salilvnair.com/framework/dui/#/wizardstepper) | Multi-step form wizard progress header. |
| [`AccordionGroupView`](https://salilvnair.com/framework/dui/#/accordiongroup) | Managed single/multi-open accordion group, built on CollapsibleSectionView. |
| [`SegmentedProgressBarView`](https://salilvnair.com/framework/dui/#/segmentedprogressbar) | Multi-segment progress — e.g. |
| [`ChecklistView`](https://salilvnair.com/framework/dui/#/checklist) | Todo-style checklist — strikethrough + faded once complete. |
| [`PriorityPickerView`](https://salilvnair.com/framework/dui/#/prioritypicker) | Low/medium/high/urgent selector with color-coded dots. |
| [`TagCloudView`](https://salilvnair.com/framework/dui/#/tagcloud) | Weighted tag cloud — font size scales with relative weight. |
| [`RangeSliderView`](https://salilvnair.com/framework/dui/#/rangeslider) | Dual-handle min/max range — distinct from the single-handle SliderView. |
| [`VoteWidgetView`](https://salilvnair.com/framework/dui/#/votewidget) | Upvote/downvote counter control. |
| [`LikeButtonView`](https://salilvnair.com/framework/dui/#/likebutton) | Animated heart/like toggle button — pop animation on like. |
| [`BookmarkButtonView`](https://salilvnair.com/framework/dui/#/bookmarkbutton) | Animated bookmark/save toggle button. |
| [`FollowButtonView`](https://salilvnair.com/framework/dui/#/followbutton) | Follow/following state-toggle button — reveals "Unfollow" on hover. |
| [`ShortcutRecorderView`](https://salilvnair.com/framework/dui/#/shortcutrecorder) | Captures a keybinding — click to record, press keys, renders via KbdView. |

</details>

<details>
<summary><b>Communication & Content</b> (14)</summary>

![Communication & Content — MessageBubbleView, ChatInputView, TypingIndicatorView, CommentThreadView, NotificationCenterView, AlertDialogView, FeedbackWidgetView, NpsSurveyView, ShareSheetView, ContactCardView, ArticleCardView, FaqAccordionView, MessageBannerView, QuoteBlockView](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets/communication-content.png)

| Component | What it is |
| --- | --- |
| [`MessageBubbleView`](https://salilvnair.com/framework/dui/#/messagebubble) | Chat message bubble — sent (right, filled) / received (left, neutral). |
| [`ChatInputView`](https://salilvnair.com/framework/dui/#/chatinput) | Message composer — auto-growing textarea + attach + send. |
| [`TypingIndicatorView`](https://salilvnair.com/framework/dui/#/typingindicator) | Animated "…is typing" dots. |
| [`CommentThreadView`](https://salilvnair.com/framework/dui/#/commentthread) | Nested comment thread with reply action — GitHub/PR-style. |
| [`NotificationCenterView`](https://salilvnair.com/framework/dui/#/notificationcenter) | Bell icon + dropdown notification list, unread-count badge. |
| [`AlertDialogView`](https://salilvnair.com/framework/dui/#/alertdialog) | Pre-built confirm/cancel dialog with danger styling — the standard "Are you sure?" pattern. |
| [`FeedbackWidgetView`](https://salilvnair.com/framework/dui/#/feedbackwidget) | Thumbs up/down + optional comment micro-survey. |
| [`NpsSurveyView`](https://salilvnair.com/framework/dui/#/npssurvey) | 0-10 Net Promoter Score picker with an optional follow-up text field. |
| [`ShareSheetView`](https://salilvnair.com/framework/dui/#/sharesheet) | Social share row + copy-link field. |
| [`ContactCardView`](https://salilvnair.com/framework/dui/#/contactcard) | Avatar + name + role + contact-icon row card. |
| [`ArticleCardView`](https://salilvnair.com/framework/dui/#/articlecard) | Image + title + excerpt + meta preview card — blog/article listing. |
| [`FaqAccordionView`](https://salilvnair.com/framework/dui/#/faqaccordion) | Pre-styled Q&A accordion, built directly on AccordionGroupView. |
| [`MessageBannerView`](https://salilvnair.com/framework/dui/#/messagebanner) | Inline success/error/info/warning message strip. |
| [`QuoteBlockView`](https://salilvnair.com/framework/dui/#/quoteblock) | Styled blockquote with an optional avatar + attribution line. |

</details>

<details>
<summary><b>Enterprise & Settings</b> (24)</summary>

![Enterprise & Settings — SettingsRowView, SettingsSectionView, OnboardingChecklistView, KeyValueListView, EnvironmentBadgeView, VersionBadgeView, LicenseBadgeView, UsageMeterView, PermissionMatrixView, AuditLogRowView, WebhookStatusView, ApiKeyRowView, RateLimitMeterView, EmptyInboxView, FeatureSpotlightBadgeView, CookieConsentBannerView, MaintenanceBannerView, TrialCountdownBannerView, TeamMemberRowView, InviteInputView, RoleSelectView, IntegrationCardView, StatusPageRowView, ChangelogEntryView](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets/enterprise-settings.png)

| Component | What it is |
| --- | --- |
| [`SettingsRowView`](https://salilvnair.com/framework/dui/#/settingsrow) | Label + description + control row — the standard settings-page primitive. |
| [`SettingsSectionView`](https://salilvnair.com/framework/dui/#/settingssection) | Grouped settings card with a header — pairs with SettingsRowView. |
| [`OnboardingChecklistView`](https://salilvnair.com/framework/dui/#/onboardingchecklist) | Collapsible "getting started" progress checklist. |
| [`KeyValueListView`](https://salilvnair.com/framework/dui/#/keyvaluelist) | Lightweight label:value stacked list — no edit, no toolbar. |
| [`EnvironmentBadgeView`](https://salilvnair.com/framework/dui/#/environmentbadge) | Colored environment chip with an optional pulsing live indicator. |
| [`VersionBadgeView`](https://salilvnair.com/framework/dui/#/versionbadge) | Version number chip with an "update available" dot indicator. |
| [`LicenseBadgeView`](https://salilvnair.com/framework/dui/#/licensebadge) | Plan/tier ribbon badge — Free / Pro / Enterprise. |
| [`UsageMeterView`](https://salilvnair.com/framework/dui/#/usagemeter) | Quota bar (used/limit) with warning-color thresholds. |
| [`PermissionMatrixView`](https://salilvnair.com/framework/dui/#/permissionmatrix) | Role x permission checkbox grid. |
| [`AuditLogRowView`](https://salilvnair.com/framework/dui/#/auditlogrow) | Timestamped actor+action+target log row — audit trail primitive. |
| [`WebhookStatusView`](https://salilvnair.com/framework/dui/#/webhookstatus) | Webhook endpoint health row — last delivery, status code, retry action. |
| [`ApiKeyRowView`](https://salilvnair.com/framework/dui/#/apikeyrow) | Masked API key row with reveal/copy/revoke actions. |
| [`RateLimitMeterView`](https://salilvnair.com/framework/dui/#/ratelimitmeter) | Requests-remaining ring gauge with a reset countdown label. |
| [`EmptyInboxView`](https://salilvnair.com/framework/dui/#/emptyinbox) | Zero-notifications empty state — pre-styled variant of EmptyStateView. |
| [`FeatureSpotlightBadgeView`](https://salilvnair.com/framework/dui/#/featurespotlightbadge) | Pulsing "New" badge for recently shipped features. |
| [`CookieConsentBannerView`](https://salilvnair.com/framework/dui/#/cookieconsentbanner) | Fixed bottom cookie-consent bar with accept/customize actions. |
| [`MaintenanceBannerView`](https://salilvnair.com/framework/dui/#/maintenancebanner) | Scheduled-downtime notice strip. |
| [`TrialCountdownBannerView`](https://salilvnair.com/framework/dui/#/trialcountdownbanner) | "N days left in trial" strip with an upgrade CTA. |
| [`TeamMemberRowView`](https://salilvnair.com/framework/dui/#/teammemberrow) | Avatar + name + role + remove-action row — team management list item. |
| [`InviteInputView`](https://salilvnair.com/framework/dui/#/inviteinput) | Email-chip input specialized for multi-invite forms. |
| [`RoleSelectView`](https://salilvnair.com/framework/dui/#/roleselect) | Role dropdown with a per-option description shown beneath the label. |
| [`IntegrationCardView`](https://salilvnair.com/framework/dui/#/integrationcard) | Logo + name + connect/disconnect card — integrations/marketplace listing. |
| [`StatusPageRowView`](https://salilvnair.com/framework/dui/#/statuspagerow) | Service + uptime% + status-dot row — status page primitive. |
| [`ChangelogEntryView`](https://salilvnair.com/framework/dui/#/changelogentry) | Version + date + change-type badges + description block. |

</details>

<details>
<summary><b>Media & Files</b> (12)</summary>

![Media & Files — ImageGalleryView, ImageCropperView, VideoPlayerView, AudioWaveformView, AudioPlayerView, PdfViewerView, FileIconView, FileListView, DragHandleView, SignaturePadView, BarcodeView, ImageZoomView](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets/media-files.png)

| Component | What it is |
| --- | --- |
| [`ImageGalleryView`](https://salilvnair.com/framework/dui/#/imagegallery) | Grid gallery with a click-to-open lightbox — prev/next navigation, Escape to close. |
| [`ImageCropperView`](https://salilvnair.com/framework/dui/#/imagecropper) | Drag-crop + zoom image editor — fixed crop frame, pannable/zoomable image. |
| [`VideoPlayerView`](https://salilvnair.com/framework/dui/#/videoplayer) | Custom video controls wrapper — play/pause, seek, volume. |
| [`AudioWaveformView`](https://salilvnair.com/framework/dui/#/audiowaveform) | Static or animated waveform visualization primitive. |
| [`AudioPlayerView`](https://salilvnair.com/framework/dui/#/audioplayer) | Waveform + play/pause/seek audio player. |
| [`PdfViewerView`](https://salilvnair.com/framework/dui/#/pdfviewer) | Paginated PDF preview wrapper — browser native iframe renderer (needs a real PDF URL in production). |
| [`FileIconView`](https://salilvnair.com/framework/dui/#/fileicon) | Extension-based file-type icon + name + size row. |
| [`FileListView`](https://salilvnair.com/framework/dui/#/filelist) | Uploaded-files list with per-row progress and remove action. |
| [`DragHandleView`](https://salilvnair.com/framework/dui/#/draghandle) | Grab-handle primitive for reorderable lists — six-dot grip icon. |
| [`SignaturePadView`](https://salilvnair.com/framework/dui/#/signaturepad) | Canvas signature capture — draw with mouse/touch/pen, exports a PNG data URL. |
| [`BarcodeView`](https://salilvnair.com/framework/dui/#/barcode) | Deterministic bar-pattern generator, visually representative — not a scannable encoder. |
| [`ImageZoomView`](https://salilvnair.com/framework/dui/#/imagezoom) | Click-to-zoom lightbox for a single image. |

</details>

<details>
<summary><b>Data Display & Wow</b> (15)</summary>

![Data Display & Wow — TimelineView, ActivityFeedView, KanbanBoardView, SparklineView, HeatmapCalendarView, ComparisonSliderView, CarouselView, QRCodeView, StatTrendCardView, PricingCardView, TestimonialCardView, RatingBreakdownView, TreeSelectView, RichTextToolbarView, MentionInputView](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets/data-display-wow.png)

| Component | What it is |
| --- | --- |
| [`TimelineView`](https://salilvnair.com/framework/dui/#/timeline) | Event trail with icon nodes — vertical (default) or horizontal. |
| [`ActivityFeedView`](https://salilvnair.com/framework/dui/#/activityfeed) | Chronological activity feed, entries grouped by day. |
| [`KanbanBoardView`](https://salilvnair.com/framework/dui/#/kanbanboard) | Draggable columns + cards board, native HTML5 drag-and-drop. |
| [`SparklineView`](https://salilvnair.com/framework/dui/#/sparkline) | Tiny inline SVG trend line, no axes — for table cells / stat cards. |
| [`HeatmapCalendarView`](https://salilvnair.com/framework/dui/#/heatmapcalendar) | GitHub-style contribution heatmap — day cells shaded by count, tooltip on hover. |
| [`ComparisonSliderView`](https://salilvnair.com/framework/dui/#/comparisonslider) | Before/after drag slider for image comparison. |
| [`CarouselView`](https://salilvnair.com/framework/dui/#/carousel) | Swipeable card carousel with dot indicators — autoplay pauses on hover. |
| [`QRCodeView`](https://salilvnair.com/framework/dui/#/qrcode) | QR-style module grid with finder-pattern corners — visual, not spec-compliant/scannable. |
| [`StatTrendCardView`](https://salilvnair.com/framework/dui/#/stattrendcard) | Animated count-up number + sparkline trend — distinct from the static StatsCardView. |
| [`PricingCardView`](https://salilvnair.com/framework/dui/#/pricingcard) | Plan comparison card with a "popular" ribbon. |
| [`TestimonialCardView`](https://salilvnair.com/framework/dui/#/testimonialcard) | Quote + avatar testimonial card. |
| [`RatingBreakdownView`](https://salilvnair.com/framework/dui/#/ratingbreakdown) | 5-star rating distribution bars — App Store-style rating breakdown. |
| [`TreeSelectView`](https://salilvnair.com/framework/dui/#/treeselect) | Checkbox-driven hierarchical select — tri-state parent checkboxes over a folder-style tree. |
| [`RichTextToolbarView`](https://salilvnair.com/framework/dui/#/richtexttoolbar) | Formatting toolbar primitive — bold/italic/underline/link/list/code. |
| [`MentionInputView`](https://salilvnair.com/framework/dui/#/mentioninput) | @mention autocomplete textarea. |

</details>

<details>
<summary><b>Fun & Micro-interactions</b> (10)</summary>

![Fun & Micro-interactions — GradientTextView, TypewriterTextView, CountUpNumberView, MagneticButtonView, TiltCardView, ParticleBackgroundView, GlowBorderView, RevealOnScrollView, FloatingLabelInputView, PulseDotView](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets/fun-micro-interactions.png)

| Component | What it is |
| --- | --- |
| [`GradientTextView`](https://salilvnair.com/framework/dui/#/gradienttext) | Animated gradient-shifting text. |
| [`TypewriterTextView`](https://salilvnair.com/framework/dui/#/typewritertext) | Animated typing-effect text. |
| [`CountUpNumberView`](https://salilvnair.com/framework/dui/#/countupnumber) | Standalone animated number count-up primitive. |
| [`MagneticButtonView`](https://salilvnair.com/framework/dui/#/magneticbutton) | Cursor-attraction hover button effect. |
| [`TiltCardView`](https://salilvnair.com/framework/dui/#/tiltcard) | 3D perspective tilt-on-hover card. |
| [`ParticleBackgroundView`](https://salilvnair.com/framework/dui/#/particlebackground) | Subtle animated particle/dot background. |
| [`GlowBorderView`](https://salilvnair.com/framework/dui/#/glowborder) | Animated gradient glowing-border wrapper. |
| [`RevealOnScrollView`](https://salilvnair.com/framework/dui/#/revealonscroll) | Fade/slide-in-on-scroll wrapper. |
| [`FloatingLabelInputView`](https://salilvnair.com/framework/dui/#/floatinglabelinput) | Floating-label input, distinct from TextInputView's static placeholder. |
| [`PulseDotView`](https://salilvnair.com/framework/dui/#/pulsedot) | Attention-grabbing pulsing dot primitive — complements StatusIndicatorView. |

</details>

<details>
<summary><b>DUI Signature Series</b> (22)</summary>

![DUI Signature Series — RequestFlowView, LatencyPulseView, AIStreamingTextView, CommandOrbView, TimeTravelSliderView, DiffMorphView, SchemaBlueprintView, LiveCursorPresenceView, UndoRedoTimelineView, DialKnobInputView, HoldToConfirmView, MorphingIconButtonView, StackedSwipeCardView, NetworkWeatherView, ConstellationLoaderView, HoloCardView, GhostTypingPlaceholderView, ConnectionPulseLineView, StackedToastDeckView, PathRevealView, SpectrumSliderView, BreathingLoaderView](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets/dui-signature-series.png)

| Component | What it is |
| --- | --- |
| [`RequestFlowView`](https://salilvnair.com/framework/dui/#/requestflow) | Animated network waterfall — particles travel a DNS→TCP→TLS→Request→Response pipe, speed/color mapped to real phase t… |
| [`LatencyPulseView`](https://salilvnair.com/framework/dui/#/latencypulse) | EKG/vitals-monitor style live pulse line for request latency — a metric that visually "beats" instead of a static lin… |
| [`AIStreamingTextView`](https://salilvnair.com/framework/dui/#/aistreamingtext) | Token-by-token LLM output renderer — per-token fade-in, thinking shimmer, soft blink cursor. |
| [`CommandOrbView`](https://salilvnair.com/framework/dui/#/commandorb) | Floating, breathing circular AI-assistant orb — idle pulse → thinking ripple → speaking waveform, expands into a chat… |
| [`TimeTravelSliderView`](https://salilvnair.com/framework/dui/#/timetravelslider) | Scrub a draggable playhead across a sparkline of past states — a time-travel state scrubber, generalized into a reusa… |
| [`DiffMorphView`](https://salilvnair.com/framework/dui/#/diffmorph) | Old→new text FLIP-animates unchanged words into their new position while changed words fade/strike — an edit visually… |
| [`SchemaBlueprintView`](https://salilvnair.com/framework/dui/#/schemablueprint) | JSON Schema / OpenAPI spec rendered as an architectural blueprint — graph-paper background, dashed right-angle connec… |
| [`LiveCursorPresenceView`](https://salilvnair.com/framework/dui/#/livecursorpresence) | Collaborative cursors with name tags, overlaid on arbitrary content. |
| [`UndoRedoTimelineView`](https://salilvnair.com/framework/dui/#/undoredotimeline) | History rendered as a branching git-log graph — jump to any node, diverging edits show as visible branches instead of… |
| [`DialKnobInputView`](https://salilvnair.com/framework/dui/#/dialknobinput) | Rotary analog knob (drag in a circle) with snap-ticks and a haptic-style micro-bounce at each notch — for tactile num… |
| [`HoldToConfirmView`](https://salilvnair.com/framework/dui/#/holdtoconfirm) | Press-and-hold with a radial fill that must complete before the destructive action fires — replaces "type DELETE to c… |
| [`MorphingIconButtonView`](https://salilvnair.com/framework/dui/#/morphingiconbutton) | The icon itself SVG-path-morphs between two states (play↔pause, menu↔close, sun↔moon) instead of a crossfade/swap. |
| [`StackedSwipeCardView`](https://salilvnair.com/framework/dui/#/stackedswipecard) | Swipeable card stack for one-at-a-time approve/reject flows. |
| [`NetworkWeatherView`](https://salilvnair.com/framework/dui/#/networkweather) | System health/error-rate expressed as literal weather (sunny → cloudy → stormy) instead of a number or status dot. |
| [`ConstellationLoaderView`](https://salilvnair.com/framework/dui/#/constellationloader) | Loading dots drift and connect into shifting constellation lines — ties back to NetworkGraphView's node-link visual i… |
| [`HoloCardView`](https://salilvnair.com/framework/dui/#/holocard) | A card with a mouse-position-reactive holographic/iridescent sheen — pure premium-feel "wow" for pricing/feature call… |
| [`GhostTypingPlaceholderView`](https://salilvnair.com/framework/dui/#/ghosttypingplaceholder) | An input placeholder that types out rotating example queries, pauses, then backspaces into the next one. |
| [`ConnectionPulseLineView`](https://salilvnair.com/framework/dui/#/connectionpulseline) | A dashed/gradient SVG line connecting two arbitrary DOM elements, with a traveling pulse dot — visually links spatial… |
| [`StackedToastDeckView`](https://salilvnair.com/framework/dui/#/stackedtoastdeck) | Toasts don't stack vertically — older ones shrink and recede behind the newest like a physical card deck; click the d… |
| [`PathRevealView`](https://salilvnair.com/framework/dui/#/pathreveal) | Generic SVG stroke-draw reveal primitive — any path/diagram/signature "draws itself" on mount instead of just fading in. |
| [`SpectrumSliderView`](https://salilvnair.com/framework/dui/#/spectrumslider) | The slider track itself is a live rendered gradient spectrum, and the handle shows a magnified live-color preview bub… |
| [`BreathingLoaderView`](https://salilvnair.com/framework/dui/#/breathingloader) | An ultra-minimal loading state — a single circle slowly scales/fades in a breathing rhythm — a calmer alternative to… |

</details>

<details>
<summary><b>More</b> (6)</summary>

![More — DuiProvider (Size), LiveColorCustomizer, Patterns, Icons Gallery, Theme Customization, Add Theme Variable](https://raw.githubusercontent.com/salilvnair/dui/main/media/sheets/more.png)

| Component | What it is |
| --- | --- |
| [`DuiProvider (Size)`](https://salilvnair.com/framework/dui/#/duiprovider) | Wrap any subtree with <DuiProvider size="sm\|md\|lg\|xl"> and ALL nested DUI components inherit that size — no prop dril… |
| [`LiveColorCustomizer`](https://salilvnair.com/framework/dui/#/livecolorpanel) | Interactive color editor that applies CSS custom property changes directly to the document root in real time. |
| [`Patterns`](https://salilvnair.com/framework/dui/#/patterns) | How DUI components assemble into actual Daakia UI — URL bar · tabs · tree. |
| [`Icons Gallery`](https://salilvnair.com/framework/dui/#/iconsgallery) | All Daakia icons — searchable by name — click to copy icon name. |
| [`Theme Customization`](https://salilvnair.com/framework/dui/#/themeconfig) | Export / upload YAML theme files — all 63 CSS color vars, live hot-swap, no rebuild. |
| [`Add Theme Variable`](https://salilvnair.com/framework/dui/#/themeaddvar) | Step-by-step guide: register a new CSS color variable in SCHEMA, declare it in index.css, use it in any DUI component… |

</details>

<!-- catalog:end -->

Every component ships full TypeScript prop types — explore them via your
editor's autocomplete, in the [live demo](https://salilvnair.com/framework/dui/),
or by browsing `src/lib` in this repo.

---

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

Override any subset on `:root` (global) or on a wrapping element (scoped — e.g.
to theme one panel differently). Programmatic helpers live under the `theme/*`
subpath exports:

```ts
import { SCHEMA } from '@salilvnair/dui/theme/core';        // token schema (group/key/cssVar/comment)
import { generateYaml } from '@salilvnair/dui/theme/utils';  // export the current theme as YAML
import { ThemeVarEditor } from '@salilvnair/dui/theme/editor'; // UI for adding a new theme variable
```

Light and dark are the same mechanism: `dist/style.css` defines both sets and
`document.documentElement`'s `data-theme` attribute chooses between them.

## The code editor — Monaco is optional

`EditorView`, `DiffEditorView`, and `DebugEditorView` do **not** require
`@monaco-editor/react` or `monaco-editor` to be installed. Without them, these
components render a lightweight plain-text fallback (a styled `<textarea>` and
a small line-diff view) — fully functional for basic editing, just without
IntelliSense, breakpoints, or Monaco's diff engine.

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
automatically starts rendering the Monaco-backed version the moment this import
has run; skip it and everything still works, just without Monaco.

**Why not auto-install Monaco, or fall back to a CDN?** `@monaco-editor/react`
defaults to lazy-loading Monaco assets from a public CDN when you don't
self-host — a reasonable default for a plain public web page, but wrong for
CSP-restricted environments (webviews, offline apps, intranets) where that CDN
is unreachable. Rather than silently guess, this library requires an explicit
opt-in (`monaco-setup`) and never attempts the CDN path at all.

**Bundle boundary, verified, not assumed:** `dist/index.js` (the main entry —
everything except `EditorView` internals) contains zero references to
`@monaco-editor/react` or `monaco-editor`. Only `dist/monaco-setup.js` does.
This is checked as part of the release process, not just documented — see
[Publishing](#publishing-to-npm).

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

It registers on its own highlight.js instance, so it will not reconfigure a
parser your app is already using elsewhere.

## TypeScript

Full type declarations ship in `dist/`, generated from source — no
`@types/@salilvnair__dui` needed. `peerDependencies` cover `react`, `react-dom`,
and `zustand`; `@monaco-editor/react`, `monaco-editor`, `vis-data` and
`vis-network` are `peerDependenciesMeta.optional` peers (see above).

## Local development

```bash
git clone https://github.com/salilvnair/dui.git
cd dui
npm install
npm run dev            # the showcase at localhost:5173
```

Every panel has an address, so you can go straight to one:

| URL | What it opens |
| --- | --- |
| `#/chips` | ChipView, on the Live tab |
| `#/chips/examples` | …its examples |
| `#/chips/docs` | …its props table |
| `#/chips?theme=light` | …on the light ground |
| `#/chips?capture=1` | the component alone, no chrome — what the catalog images are of, and what the demo site embeds |

```bash
npm run build           # builds the showcase app
npm run build:demo      # the same, into demo-dist/ — this is what the demo site serves
npm run build:lib       # builds the publishable library into dist/
npm test                # vitest
```

### How the showcase is split

Worth knowing before adding a component, because two things here are easy to
undo by accident.

**Panels are lazily imported.** Each component's live view, examples and props
table load the first time somebody opens that panel, and Rollup groups the
three into one chunk per component — 236 of them, a median of 7 KB each. Adding
a panel means adding a `slot(() => import('…'))` entry to `PANELS`, not an
import at the top of the file. The eager version cost 11.4 MB before anything
could render.

**Monaco's workers are fetched, not inlined, in the showcase.** The published
`monaco-setup` builds them into the bundle as blobs, because a consumer inside
a VS Code webview cannot fetch a worker past the CSP. A web page can, and
should: inlining put `ts.worker` — the whole TypeScript compiler — base64'd
into the chunk that has to arrive first, about 8 MB of it. The showcase
therefore imports `showcase/monacoSetup`, which pairs the same
`monaco-setup.core` with ordinary `?worker` imports. **Do not point the
showcase back at `@/monaco-setup`.**

Together those took the first load from 15.7 MB to 5.9 MB (3.75 → 1.48 MB
gzipped). Monaco itself is 4.2 MB of what remains and is still eager, because
the panel the showcase opens on renders a live editor.

## Screenshots, video and the demo site

Everything under `media/` is generated. Nothing in it is edited by hand, and
the scripts that make it live in `scripts/`.

| Command | What it does |
| --- | --- |
| `npm run shots` | Photographs all 238 components into `media/components/` and writes `media/components.dark.json` |
| `npm run shots:light` | The same on the light ground (gitignored — an intermediate for the light sheets) |
| `npm run sheets` | One contact sheet per group into `media/sheets/` — what the catalog above embeds |
| `npm run catalog` | Rewrites the catalog block in this README from the manifest |
| `npm run demo-video` | Records each segment against the running showcase and stitches the mp4 |
| `npm run demo-video:gif:short` | The short loop at the top of this file |
| `npm run demo-video:publish` | Copies the finished video and per-section GIFs into `media/` |
| `npm run showcase` | All of the video steps, in order |

The capture and video scripts drive the **running** showcase, so start it first:

```bash
npm run dev -- --port 5180
```

Two rules the scripts enforce, both learned the hard way:

- **The component list comes from the app, not from the script.** The showcase
  publishes its sidebar as `window.__DUI_SHOWCASE__`; a hand-maintained copy of
  238 ids goes stale silently, and the failure mode is a new component that
  simply never gets photographed.
- **No unverified footage survives.** Every video segment asserts something is
  on screen before its clip is kept. A step that quietly did nothing still
  records perfectly good video of the app in the wrong state, and nothing
  downstream can tell.

`npm run catalog -- --check` fails if the README's catalog no longer matches the
manifest, which is the version worth running in CI.

## Publishing to npm

> This section is for library maintainers.

### Prerequisites

1. Node.js 18+ and npm 9+
2. Publish access to the `@salilvnair` scope: `npm login`

### Step 1 — Bump the version and write the changelog

```bash
npm version patch   # bug fix:      1.0.0 -> 1.0.1
npm version minor   # new feature:  1.0.0 -> 1.1.0
npm version major   # breaking:     1.0.0 -> 2.0.0
```

Move the `Unreleased` entries in [CHANGELOG.md](./CHANGELOG.md) under the new
version before tagging, so the tag and the notes agree.

### Step 2 — Build

`prepublishOnly` runs this automatically on `npm publish`, but build first to
inspect the output:

```bash
npm run build:lib
```

Verify `dist/` contains (at minimum): `index.js`, `index.d.ts`,
`monaco-setup.js`, `monaco-setup.d.ts`, `style.css`, `theme/*.js`.

**Sanity-check the Monaco boundary** — the one thing worth manually
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
`src/`, and no `media/`.

### Step 4 — Test the tarball locally

```bash
npm pack
# creates salilvnair-dui-X.Y.Z.tgz

# in a consumer app:
npm install /path/to/salilvnair-dui-X.Y.Z.tgz
```

Confirm both paths work: a component that never imports Monaco (the build
should succeed with `@monaco-editor/react`/`monaco-editor` absent from
node_modules), and — with those installed plus `@salilvnair/dui/monaco-setup`
imported — a real Monaco-backed `EditorView`.

### Step 5 — Publish

Scoped packages default to private, so `--access public` is required:

```bash
npm publish --access public
# rehearsal first:
npm publish --dry-run --access public
```

### Step 6 — Push tags, and refresh the demo site

```bash
git push && git push --tags
```

The demo at <https://salilvnair.com/framework/dui/> is a static build of the
showcase living in the
[salilvnair.github.io](https://github.com/salilvnair/salilvnair.github.io)
repo. Refresh it from there:

```bash
npm run sync-dui-demo   # in salilvnair.github.io
```

### Release checklist

- [ ] `npm version` bumped, and `CHANGELOG.md` updated
- [ ] `npm run build:lib` succeeds
- [ ] `npm pack --dry-run` shows only `dist/`, `README.md`, `LICENSE`
- [ ] Monaco boundary check: `@monaco-editor/react`/`monaco-editor` only referenced from `monaco-setup.js` + its chunk, never `index.js`
- [ ] Tarball tested in a consumer app, both without and with Monaco installed
- [ ] `npm run shots && npm run sheets && npm run catalog` if components were added
- [ ] `npm publish --access public` completed
- [ ] `git push && git push --tags`
- [ ] Demo site re-synced

### Troubleshooting

**Consumer's build fails resolving `@monaco-editor/react` even though they never use `EditorView`**
→ Something reintroduced a static import of it into `index.js`. Re-run the
Monaco boundary grep in Step 2 — this is the one regression this package must
never ship.

**Consumer's Monaco editor works in dev but hits a blocked CDN in production**
→ They installed the Monaco packages but never imported
`@salilvnair/dui/monaco-setup`. `EditorView` never falls back to the CDN loader
on its own — it only ever renders the plain-text fallback or the self-hosted
Monaco registered by `monaco-setup`.

**`npm run shots` says the showcase is not answering**
→ The capture scripts drive the running app rather than rendering components in
isolation. Start `npm run dev -- --port 5180` first, or pass
`DUI_SHOWCASE_URL` if it is somewhere else.

## License

MIT © [Salil V Nair](https://github.com/salilvnair) — see [LICENSE](./LICENSE).
