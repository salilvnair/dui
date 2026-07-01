import { useState, useEffect, useCallback } from 'react';
import {
  ToggleSwitchPanel, CheckboxPanel, ModalPanel, LoaderPanel, EmptyStatePanel,
  StatusIndicatorPanel, InfoPopupPanel, ResizablePanelPanel, SplitPanelPanel, DottedCardPanel,
  ColoredTextPanel, StatsCardPanel, DataTablePanel, CodeBlockPanel, AIButtonPanel,
  SideNavPanel, SettingsNavPanel, ThemeCardSelectorPanel, FeatureCategoryPanel,
  TagInputPanel, BottomPanelPanel, ToastPanel, PromptCardPanel, PromptLibraryPanel,
  SearchInputPanel, DurationInputPanel, TabsPanel,
  HighlightedInputPanel, KeyValueTablePanel, MergedInputViewPanel,
  HudViewPanel, CollapsibleSectionPanel, JsonTreeViewPanel, ExpandableLogEntryPanel,
  CopyButtonPanel, MarkdownViewPanel, FormDataTablePanel,
  YamlKeyChipPanel, LiveColorCustomizerPanel, SpacerViewPanel,
} from './panels/NewComponentPanels';
import { IconsGalleryPanel } from './panels/IconsGalleryPanel';
import { ThemeCustomizationPanel } from './panels/ThemeCustomizationPanel';
import { ThemeAddVarGuidePanel } from './panels/ThemeAddVarGuidePanel';
import { LivePlayground } from './panels/LivePlayground';
import { ChipView, SideNavView } from '@/dui';
import type { LiveColorVar, SideNavItem } from '@/dui';
import { applyMonacoTheme } from '@/monaco-setup';
import { ShowcasePanel } from './ShowcasePanel';

// ── Extracted live panels ──────────────────────────────────────────────────────
import { ChipsViewLive }          from './components/chipsview/live/ChipsViewLive';
import { TextInputViewLive }      from './components/textinputview/live/TextInputViewLive';
import { SelectInputViewLive }    from './components/selectinputview/live/SelectInputViewLive';
import { SelectTextInputViewLive } from './components/selecttextinputview/live/SelectTextInputViewLive';
import { ButtonViewLive }         from './components/buttonview/live/ButtonViewLive';
import { IconButtonViewLive }     from './components/iconbuttonview/live/IconButtonViewLive';
import { DropDownButtonViewLive } from './components/dropdownbuttonview/live/DropDownButtonViewLive';
import { ContextMenuViewLive }    from './components/contextmenuview/live/ContextMenuViewLive';
import { PatternsLive }           from './components/patterns/live/PatternsLive';
import { TabBarViewLive }         from './components/tabbarview/live/TabBarViewLive';
import { StageViewLive }          from './components/stageview/live/StageViewLive';
import { DuiProviderLive }        from './components/duiprovider/live/DuiProviderLive';
import { FolderViewLive }         from './components/folderview/live/FolderViewLive';
import { DebugEditorViewLive }    from './components/debugeditor/live/DebugEditorViewLive';
import { DebugViewLive }          from './components/debugview/live/DebugViewLive';
import { EditorViewLive }         from './components/editorview/live/EditorViewLive';

// ── Examples components ───────────────────────────────────────────────────────
import { ChipsViewExamples }              from './components/chipsview/examples/ChipsViewExamples';
import { TextInputViewExamples }          from './components/textinputview/examples/TextInputViewExamples';
import { SelectInputViewExamples }        from './components/selectinputview/examples/SelectInputViewExamples';
import { SelectTextInputViewExamples }    from './components/selecttextinputview/examples/SelectTextInputViewExamples';
import { ButtonViewExamples }             from './components/buttonview/examples/ButtonViewExamples';
import { IconButtonViewExamples }         from './components/iconbuttonview/examples/IconButtonViewExamples';
import { DropDownButtonViewExamples }     from './components/dropdownbuttonview/examples/DropDownButtonViewExamples';
import { ContextMenuViewExamples }        from './components/contextmenuview/examples/ContextMenuViewExamples';
import { TabViewExamples }                from './components/tabview/examples/TabViewExamples';
import { TabBarViewExamples }             from './components/tabbarview/examples/TabBarViewExamples';
import { EditorViewExamples }             from './components/editorview/examples/EditorViewExamples';
import { PatternsExamples }               from './components/patterns/examples/PatternsExamples';
import { ToggleSwitchViewExamples }       from './components/toggleswitchview/examples/ToggleSwitchViewExamples';
import { CheckboxViewExamples }           from './components/checkboxview/examples/CheckboxViewExamples';
import { ModalViewExamples }              from './components/modalview/examples/ModalViewExamples';
import { LoaderViewExamples }             from './components/loaderview/examples/LoaderViewExamples';
import { EmptyStateViewExamples }         from './components/emptystateview/examples/EmptyStateViewExamples';
import { StatusIndicatorViewExamples }    from './components/statusindicatorview/examples/StatusIndicatorViewExamples';
import { InfoPopupViewExamples }          from './components/infopopupview/examples/InfoPopupViewExamples';
import { ResizablePanelViewExamples }     from './components/resizablepanelview/examples/ResizablePanelViewExamples';
import { SplitPanelViewExamples }         from './components/splitpanelview/examples/SplitPanelViewExamples';
import { DottedCardViewExamples }         from './components/dottedcardview/examples/DottedCardViewExamples';
import { ColoredTextViewExamples }        from './components/coloredtextview/examples/ColoredTextViewExamples';
import { StatsCardViewExamples }          from './components/statscardview/examples/StatsCardViewExamples';
import { DataTableViewExamples }          from './components/datatableview/examples/DataTableViewExamples';
import { CodeBlockViewExamples }          from './components/codeblockview/examples/CodeBlockViewExamples';
import { AIButtonViewExamples }           from './components/aibuttonview/examples/AIButtonViewExamples';
import { SideNavViewExamples }            from './components/sidenavview/examples/SideNavViewExamples';
import { SettingsNavViewExamples }        from './components/settingsnavview/examples/SettingsNavViewExamples';
import { ThemeCardSelectorViewExamples }  from './components/themecardselectorview/examples/ThemeCardSelectorViewExamples';
import { FeatureCategoryViewExamples }    from './components/featurecategoryview/examples/FeatureCategoryViewExamples';
import { TagInputViewExamples }           from './components/taginputview/examples/TagInputViewExamples';
import { BottomPanelViewExamples }        from './components/bottompanelview/examples/BottomPanelViewExamples';
import { ToastViewExamples }              from './components/toastview/examples/ToastViewExamples';
import { PromptCardViewExamples }         from './components/promptcardview/examples/PromptCardViewExamples';
import { PromptLibraryViewExamples }      from './components/promptlibraryview/examples/PromptLibraryViewExamples';
import { StageViewExamples }              from './components/stageview/examples/StageViewExamples';
import { IconsGalleryExamples }           from './components/iconsgallery/examples/IconsGalleryExamples';
import { SearchInputViewExamples }        from './components/searchinputview/examples/SearchInputViewExamples';
import { DurationInputViewExamples }      from './components/durationinputview/examples/DurationInputViewExamples';
import { HighlightedInputViewExamples }   from './components/highlightedinputview/examples/HighlightedInputViewExamples';
import { KeyValueTableViewExamples }      from './components/keyvaluetableview/examples/KeyValueTableViewExamples';
import { MergedInputViewExamples }        from './components/mergedinputview/examples/MergedInputViewExamples';
import { DuiProviderExamples }            from './components/duiprovider/examples/DuiProviderExamples';
import { HudViewExamples }                from './components/hudview/examples/HudViewExamples';
import { CollapsibleSectionViewExamples } from './components/collapsiblesectionview/examples/CollapsibleSectionViewExamples';
import { JsonTreeViewExamples }           from './components/jsontreeview/examples/JsonTreeViewExamples';
import { ExpandableLogEntryViewExamples } from './components/expandablelogentryview/examples/ExpandableLogEntryViewExamples';
import { CopyButtonViewExamples }         from './components/copybuttonview/examples/CopyButtonViewExamples';
import { MarkdownViewExamples }           from './components/markdownview/examples/MarkdownViewExamples';
import { FormDataTableViewExamples }      from './components/formdatatableview/examples/FormDataTableViewExamples';
import { YamlKeyChipExamples }            from './components/yamlkeychip/examples/YamlKeyChipExamples';
import { LiveColorCustomizerExamples }    from './components/livecolorpanel/examples/LiveColorCustomizerExamples';
import { SpacerViewExamples }             from './components/spacerview/examples/SpacerViewExamples';
import { FolderViewExamples }             from './components/folderview/examples/FolderViewExamples';
import { DebugEditorViewExamples }        from './components/debugeditor/examples/DebugEditorViewExamples';
import { DebugViewExamples }              from './components/debugview/examples/DebugViewExamples';

// ── Docs components ───────────────────────────────────────────────────────────
import { ChipsViewDocs }              from './components/chipsview/docs/ChipsViewDocs';
import { TextInputViewDocs }          from './components/textinputview/docs/TextInputViewDocs';
import { SelectInputViewDocs }        from './components/selectinputview/docs/SelectInputViewDocs';
import { SelectTextInputViewDocs }    from './components/selecttextinputview/docs/SelectTextInputViewDocs';
import { ButtonViewDocs }             from './components/buttonview/docs/ButtonViewDocs';
import { IconButtonViewDocs }         from './components/iconbuttonview/docs/IconButtonViewDocs';
import { DropDownButtonViewDocs }     from './components/dropdownbuttonview/docs/DropDownButtonViewDocs';
import { ContextMenuViewDocs }        from './components/contextmenuview/docs/ContextMenuViewDocs';
import { TabViewDocs }                from './components/tabview/docs/TabViewDocs';
import { TabBarViewDocs }             from './components/tabbarview/docs/TabBarViewDocs';
import { EditorViewDocs }             from './components/editorview/docs/EditorViewDocs';
import { PatternsDocs }               from './components/patterns/docs/PatternsDocs';
import { ToggleSwitchViewDocs }       from './components/toggleswitchview/docs/ToggleSwitchViewDocs';
import { CheckboxViewDocs }           from './components/checkboxview/docs/CheckboxViewDocs';
import { ModalViewDocs }              from './components/modalview/docs/ModalViewDocs';
import { LoaderViewDocs }             from './components/loaderview/docs/LoaderViewDocs';
import { EmptyStateViewDocs }         from './components/emptystateview/docs/EmptyStateViewDocs';
import { StatusIndicatorViewDocs }    from './components/statusindicatorview/docs/StatusIndicatorViewDocs';
import { InfoPopupViewDocs }          from './components/infopopupview/docs/InfoPopupViewDocs';
import { ResizablePanelViewDocs }     from './components/resizablepanelview/docs/ResizablePanelViewDocs';
import { SplitPanelViewDocs }         from './components/splitpanelview/docs/SplitPanelViewDocs';
import { DottedCardViewDocs }         from './components/dottedcardview/docs/DottedCardViewDocs';
import { ColoredTextViewDocs }        from './components/coloredtextview/docs/ColoredTextViewDocs';
import { StatsCardViewDocs }          from './components/statscardview/docs/StatsCardViewDocs';
import { DataTableViewDocs }          from './components/datatableview/docs/DataTableViewDocs';
import { CodeBlockViewDocs }          from './components/codeblockview/docs/CodeBlockViewDocs';
import { AIButtonViewDocs }           from './components/aibuttonview/docs/AIButtonViewDocs';
import { SideNavViewDocs }            from './components/sidenavview/docs/SideNavViewDocs';
import { SettingsNavViewDocs }        from './components/settingsnavview/docs/SettingsNavViewDocs';
import { ThemeCardSelectorViewDocs }  from './components/themecardselectorview/docs/ThemeCardSelectorViewDocs';
import { FeatureCategoryViewDocs }    from './components/featurecategoryview/docs/FeatureCategoryViewDocs';
import { TagInputViewDocs }           from './components/taginputview/docs/TagInputViewDocs';
import { BottomPanelViewDocs }        from './components/bottompanelview/docs/BottomPanelViewDocs';
import { ToastViewDocs }              from './components/toastview/docs/ToastViewDocs';
import { PromptCardViewDocs }         from './components/promptcardview/docs/PromptCardViewDocs';
import { PromptLibraryViewDocs }      from './components/promptlibraryview/docs/PromptLibraryViewDocs';
import { StageViewDocs }              from './components/stageview/docs/StageViewDocs';
import { IconsGalleryDocs }           from './components/iconsgallery/docs/IconsGalleryDocs';
import { SearchInputViewDocs }        from './components/searchinputview/docs/SearchInputViewDocs';
import { DurationInputViewDocs }      from './components/durationinputview/docs/DurationInputViewDocs';
import { HighlightedInputViewDocs }   from './components/highlightedinputview/docs/HighlightedInputViewDocs';
import { KeyValueTableViewDocs }      from './components/keyvaluetableview/docs/KeyValueTableViewDocs';
import { MergedInputViewDocs }        from './components/mergedinputview/docs/MergedInputViewDocs';
import { DuiProviderDocs }            from './components/duiprovider/docs/DuiProviderDocs';
import { HudViewDocs }                from './components/hudview/docs/HudViewDocs';
import { CollapsibleSectionViewDocs } from './components/collapsiblesectionview/docs/CollapsibleSectionViewDocs';
import { JsonTreeViewDocs }           from './components/jsontreeview/docs/JsonTreeViewDocs';
import { ExpandableLogEntryViewDocs } from './components/expandablelogentryview/docs/ExpandableLogEntryViewDocs';
import { CopyButtonViewDocs }         from './components/copybuttonview/docs/CopyButtonViewDocs';
import { MarkdownViewDocs }           from './components/markdownview/docs/MarkdownViewDocs';
import { FormDataTableViewDocs }      from './components/formdatatableview/docs/FormDataTableViewDocs';
import { YamlKeyChipDocs }            from './components/yamlkeychip/docs/YamlKeyChipDocs';
import { LiveColorCustomizerDocs }    from './components/livecolorpanel/docs/LiveColorCustomizerDocs';
import { SpacerViewDocs }             from './components/spacerview/docs/SpacerViewDocs';
import { FolderViewDocs }             from './components/folderview/docs/FolderViewDocs';
import { DebugEditorViewDocs }        from './components/debugeditor/docs/DebugEditorViewDocs';
import { DebugViewDocs }              from './components/debugview/docs/DebugViewDocs';

// ── Icons ─────────────────────────────────────────────────────────────────────
import {
  TrashIcon, PlusIcon, SearchIcon, SettingsIcon, SparkleIcon,
  MoreHorizontalIcon, WandIcon, CodeIcon, FilterIcon, GlobeIcon,
  CheckIcon, LayersIcon, PanelRightIcon, SidebarLeftIcon, SidebarRightIcon, DotIcon, CheckCircleIcon,
  GaugeIcon, TerminalIcon, DocumentIcon, CodeBracketsIcon,
  ChevronDownIcon, ChevronRightIcon, FolderIcon, SpinnerIcon, SunIcon, KeyIcon,
  PlusSquareIcon, FilePlusIcon, FolderPlusIcon, PlayIcon, InfoCircleIcon, RefreshIcon,
} from '@/icons';

// ─── Types ────────────────────────────────────────────────────────────────────

type CategoryId =
  | 'chips' | 'textinput' | 'selectinput' | 'selecttextinput' | 'button'
  | 'iconbutton' | 'dropdownbutton' | 'contextmenu'
  | 'tabs' | 'tabbar' | 'editor' | 'patterns'
  | 'toggle' | 'checkbox' | 'modal' | 'loader' | 'emptystate'
  | 'statusindicator' | 'infopopup' | 'resizablepanel' | 'splitpanel' | 'dottedcard'
  | 'coloredtext' | 'statscard' | 'datatable' | 'codeblock' | 'aibutton'
  | 'sidenav' | 'settingsnav' | 'themecardselector' | 'featurecategory'
  | 'taginput' | 'bottompanel' | 'toast' | 'promptcard' | 'promptlibrary' | 'iconsgallery' | 'themeconfig' | 'themeaddvar' | 'stageview'
  | 'searchinput' | 'durationinput' | 'highlightedinput' | 'keyvaluetable'
  | 'mergedinput' | 'duiprovider' | 'hudview'
  | 'collapsiblesection' | 'jsontree' | 'logentry'
  | 'copybutton' | 'markdownview' | 'formdatatable' | 'yamlkeychip' | 'livecolorpanel' | 'spacerview'
  | 'folderview' | 'debugeditor' | 'debugview';

interface SidebarItem { id: CategoryId; label: string; icon: React.ReactNode }
interface SidebarGroup { title: string; items: SidebarItem[] }

// ─── Sidebar nav ──────────────────────────────────────────────────────────────

const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    title: 'Inputs',
    items: [
      { id: 'textinput',         label: 'TextInputView',         icon: <KeyIcon size={13} /> },
      { id: 'selectinput',       label: 'SelectInputView',       icon: <FilterIcon size={13} /> },
      { id: 'selecttextinput',   label: 'SelectTextInputView',   icon: <GlobeIcon size={13} /> },
      { id: 'taginput',          label: 'TagInputView',          icon: <PlusIcon size={13} /> },
      { id: 'checkbox',          label: 'CheckboxView',          icon: <CheckIcon size={13} /> },
      { id: 'toggle',            label: 'ToggleSwitchView',      icon: <RefreshIcon size={13} /> },
      { id: 'themecardselector', label: 'ThemeCardSelectorView', icon: <SunIcon size={13} /> },
      { id: 'editor',            label: 'EditorView',            icon: <CodeIcon size={13} /> },
      { id: 'debugeditor',       label: 'DebugEditorView',       icon: <TerminalIcon size={13} /> },
      { id: 'searchinput',       label: 'SearchInputView',       icon: <SearchIcon size={13} /> },
      { id: 'durationinput',     label: 'DurationInputView',     icon: <TerminalIcon size={13} /> },
      { id: 'highlightedinput',  label: 'HighlightedInputView',  icon: <GlobeIcon size={13} /> },
      { id: 'keyvaluetable',     label: 'KeyValueTableView',     icon: <FilterIcon size={13} /> },
      { id: 'mergedinput',       label: 'MergedInputView',       icon: <LayersIcon size={13} /> },
    ],
  },
  {
    title: 'Buttons',
    items: [
      { id: 'button',         label: 'ButtonView',         icon: <PlayIcon size={13} /> },
      { id: 'iconbutton',     label: 'IconButtonView',     icon: <SparkleIcon size={13} /> },
      { id: 'dropdownbutton', label: 'DropDownButtonView', icon: <ChevronDownIcon size={13} /> },
      { id: 'aibutton',       label: 'AIButtonView',       icon: <WandIcon size={13} /> },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { id: 'tabs',        label: 'TabView',         icon: <LayersIcon size={13} /> },
      { id: 'tabbar',      label: 'TabBarView',      icon: <LayersIcon size={13} /> },
      { id: 'contextmenu', label: 'ContextMenuView', icon: <MoreHorizontalIcon size={13} /> },
      { id: 'sidenav',     label: 'SideNavView',     icon: <PanelRightIcon size={13} /> },
      { id: 'settingsnav', label: 'SettingsNavView', icon: <SettingsIcon size={13} /> },
    ],
  },
  {
    title: 'Display',
    items: [
      { id: 'chips',           label: 'ChipView',             icon: <DotIcon size={13} /> },
      { id: 'statusindicator', label: 'StatusIndicatorView',  icon: <CheckCircleIcon size={13} /> },
      { id: 'loader',          label: 'LoaderView',           icon: <SpinnerIcon size={13} /> },
      { id: 'emptystate',      label: 'EmptyStateView',       icon: <FolderIcon size={13} /> },
      { id: 'coloredtext',     label: 'ColoredTextView',      icon: <CodeBracketsIcon size={13} /> },
      { id: 'statscard',       label: 'StatsCardView',        icon: <GaugeIcon size={13} /> },
      { id: 'dottedcard',      label: 'DottedCardView',       icon: <DocumentIcon size={13} /> },
      { id: 'datatable',       label: 'DataTableView',        icon: <LayersIcon size={13} /> },
      { id: 'codeblock',       label: 'CodeBlockView',        icon: <CodeBracketsIcon size={13} /> },
      { id: 'promptcard',      label: 'PromptCardView',       icon: <SparkleIcon size={13} /> },
      { id: 'promptlibrary',   label: 'PromptLibraryView',    icon: <SparkleIcon size={13} /> },
      { id: 'stageview',       label: 'StageCheck/Spin/Pulse',icon: <CheckCircleIcon size={13} /> },
      { id: 'hudview',         label: 'HudView',              icon: <PlayIcon size={13} /> },
      { id: 'jsontree',        label: 'JsonTreeView',         icon: <CodeBracketsIcon size={13} /> },
      { id: 'logentry',        label: 'ExpandableLogEntryView', icon: <LayersIcon size={13} /> },
      { id: 'copybutton',      label: 'CopyButtonView',       icon: <CodeBracketsIcon size={13} /> },
      { id: 'markdownview',    label: 'MarkdownView',         icon: <DocumentIcon size={13} /> },
      { id: 'formdatatable',   label: 'FormDataTableView',    icon: <LayersIcon size={13} /> },
      { id: 'yamlkeychip',     label: 'YamlKeyChip',          icon: <CodeBracketsIcon size={13} /> },
    ],
  },
  {
    title: 'Overlays',
    items: [
      { id: 'modal',     label: 'ModalView',     icon: <PlusSquareIcon size={13} /> },
      { id: 'infopopup', label: 'InfoPopupView', icon: <InfoCircleIcon size={13} /> },
      { id: 'toast',     label: 'ToastView',     icon: <InfoCircleIcon size={13} /> },
    ],
  },
  {
    title: 'Layout',
    items: [
      { id: 'resizablepanel',     label: 'ResizablePanelView',     icon: <PanelRightIcon size={13} /> },
      { id: 'splitpanel',         label: 'SplitPanelView',         icon: <SidebarLeftIcon size={13} /> },
      { id: 'bottompanel',        label: 'BottomPanelView',        icon: <TerminalIcon size={13} /> },
      { id: 'featurecategory',    label: 'FeatureCategoryView',    icon: <FilterIcon size={13} /> },
      { id: 'collapsiblesection', label: 'CollapsibleSectionView', icon: <ChevronRightIcon size={13} /> },
      { id: 'spacerview',         label: 'SpacerView',             icon: <LayersIcon size={13} /> },
      { id: 'folderview',         label: 'FolderView',             icon: <FolderIcon size={13} /> },
      { id: 'debugview',          label: 'DebugView',              icon: <PlayIcon size={13} /> },
    ],
  },
  {
    title: 'More',
    items: [
      { id: 'duiprovider',    label: 'DuiProvider (Size)',  icon: <LayersIcon size={13} /> },
      { id: 'livecolorpanel', label: 'LiveColorCustomizer', icon: <WandIcon size={13} /> },
      { id: 'patterns',       label: 'Patterns',            icon: <CodeBracketsIcon size={13} /> },
      { id: 'iconsgallery',   label: 'Icons Gallery',       icon: <SearchIcon size={13} /> },
      { id: 'themeconfig',    label: 'Theme Customization', icon: <WandIcon size={13} /> },
      { id: 'themeaddvar',    label: 'Add Theme Variable',  icon: <CodeBracketsIcon size={13} /> },
    ],
  },
];

const NAV_ITEMS: SideNavItem[] = SIDEBAR_GROUPS.map(g => ({
  id: g.title,
  label: g.title,
  isGroup: true,
  count: g.items.length,
  children: g.items.map(i => ({ id: i.id, label: i.label, icon: i.icon })),
}));

const TOTAL_COMPONENT_COUNT = SIDEBAR_GROUPS.reduce((s, g) => s + g.items.length, 0);

// ─── Color vars for LivePlayground ────────────────────────────────────────────

const VARS_ACCENT   = [{ cssVar: '--color-primary',              yamlKey: 'brand.primary',                          label: 'Accent' }];
const VARS_INPUT    = [{ cssVar: '--color-input-bg',             yamlKey: 'component_input.bg',                     label: 'Input bg' },
                       { cssVar: '--color-input-border',         yamlKey: 'component_input.border',                 label: 'Border' },
                       { cssVar: '--color-primary',              yamlKey: 'brand.primary',                          label: 'Accent' }];
const VARS_BTN      = [{ cssVar: '--color-btn-primary-bg',       yamlKey: 'component_button.primary_bg',            label: 'Primary bg' },
                       { cssVar: '--color-btn-primary-hover',    yamlKey: 'component_button.primary_hover',         label: 'Primary hover' },
                       { cssVar: '--color-btn-secondary-bg',     yamlKey: 'component_button.secondary_bg',          label: 'Secondary bg' },
                       { cssVar: '--color-btn-secondary-border', yamlKey: 'component_button.secondary_border',      label: 'Secondary border' },
                       { cssVar: '--color-btn-danger-bg',        yamlKey: 'component_button.danger_bg',             label: 'Danger bg' }];
const VARS_ICONBTN  = [{ cssVar: '--color-iconbtn-bg-hover',     yamlKey: 'component_icon_button.bg_hover',         label: 'Hover bg' },
                       { cssVar: '--color-iconbtn-bg-active',    yamlKey: 'component_icon_button.bg_active',        label: 'Active bg' },
                       { cssVar: '--color-iconbtn-border',       yamlKey: 'component_icon_button.border',           label: 'Border' }];
const VARS_CHIP     = [{ cssVar: '--color-primary',              yamlKey: 'brand.primary',                          label: 'Accent' },
                       { cssVar: '--color-chip-active-text',     yamlKey: 'component_chip.active_text',             label: 'Active text' }];
const VARS_TOGGLE   = [{ cssVar: '--color-toggle-on',            yamlKey: 'component_toggle.on',                    label: 'Track on' },
                       { cssVar: '--color-toggle-thumb',         yamlKey: 'component_toggle.thumb',                 label: 'Thumb' }];
const VARS_TAG      = [{ cssVar: '--color-tag-bg',               yamlKey: 'component_tag_input.bg',                 label: 'Tag bg' },
                       { cssVar: '--color-tag-text',             yamlKey: 'component_tag_input.text',               label: 'Tag text' },
                       { cssVar: '--color-tag-border',           yamlKey: 'component_tag_input.border',             label: 'Border' },
                       { cssVar: '--color-tag-remove-hover',     yamlKey: 'component_tag_input.remove_hover',       label: 'Remove hover' }];
const VARS_PILLTAB  = [{ cssVar: '--color-pilltab-track-bg',     yamlKey: 'component_pill_tabs.track_bg',           label: 'Track bg' },
                       { cssVar: '--color-pilltab-indicator-bg', yamlKey: 'component_pill_tabs.indicator_bg',       label: 'Indicator bg' },
                       { cssVar: '--color-pilltab-text-active',  yamlKey: 'component_pill_tabs.text_active',        label: 'Active text' }];
const VARS_DUR      = [{ cssVar: '--color-dur-segment-bg',       yamlKey: 'component_duration.segment_bg',          label: 'Segment bg' },
                       { cssVar: '--color-dur-segment-hover',    yamlKey: 'component_duration.segment_hover',       label: 'Hover' },
                       { cssVar: '--color-dur-segment-selected', yamlKey: 'component_duration.segment_selected',    label: 'Selected' }];
const VARS_TABLE    = [{ cssVar: '--color-table-stripe',         yamlKey: 'component_table.stripe',                 label: 'Row stripe' },
                       { cssVar: '--color-table-header-bg',      yamlKey: 'component_table.header_bg',              label: 'Header bg' },
                       { cssVar: '--color-table-border',         yamlKey: 'component_table.border',                 label: 'Border' }];
const VARS_CODE     = [{ cssVar: '--color-codeblock-bg',         yamlKey: 'component_code_block.bg',                label: 'Block bg' },
                       { cssVar: '--color-codeblock-border',     yamlKey: 'component_code_block.border',            label: 'Border' }];
const VARS_SIDENAV  = [{ cssVar: '--color-sidenav-active-bg',    yamlKey: 'component_sidenav.active_bg',            label: 'Active bg' },
                       { cssVar: '--color-sidenav-active-text',  yamlKey: 'component_sidenav.active_text',          label: 'Active text' },
                       { cssVar: '--color-sidenav-hover-bg',     yamlKey: 'component_sidenav.hover_bg',             label: 'Hover bg' }];
const VARS_RESIZE   = [{ cssVar: '--color-resizable-grip',       yamlKey: 'component_resizable.grip',               label: 'Grip' },
                       { cssVar: '--color-resizable-grip-hover', yamlKey: 'component_resizable.grip_hover',         label: 'Grip hover' }];
const VARS_STAGE    = [{ cssVar: '--color-stage-check',          yamlKey: 'component_stage.check',                  label: 'Check' },
                       { cssVar: '--color-stage-spin',           yamlKey: 'component_stage.spin',                   label: 'Spin' },
                       { cssVar: '--color-stage-pulse',          yamlKey: 'component_stage.pulse',                  label: 'Pulse' }];
const VARS_LOADER   = [{ cssVar: '--color-loader-accent',        yamlKey: 'component_loader.accent',                label: 'Accent' },
                       { cssVar: '--color-loader-track',         yamlKey: 'component_loader.track',                 label: 'Track' }];
const VARS_MODAL    = [{ cssVar: '--color-modal-backdrop',       yamlKey: 'component_modal.backdrop',               label: 'Backdrop' },
                       { cssVar: '--color-modal-header-tint',    yamlKey: 'component_modal.header_tint',            label: 'Header tint' }];
const VARS_AIBTN    = [{ cssVar: '--color-aibtn-bg',             yamlKey: 'component_ai_button.bg',                 label: 'AI btn bg' },
                       { cssVar: '--color-aibtn-border',         yamlKey: 'component_ai_button.border',             label: 'Border' },
                       { cssVar: '--color-aibtn-text',           yamlKey: 'component_ai_button.text',               label: 'Text' }];
const VARS_STATSCARD= [{ cssVar: '--color-statscard-bg',         yamlKey: 'component_stats_card.bg',                label: 'Card bg' },
                       { cssVar: '--color-statscard-border',     yamlKey: 'component_stats_card.border',            label: 'Border' },
                       { cssVar: '--color-statscard-trend-up',   yamlKey: 'component_stats_card.trend_up',          label: 'Trend up' },
                       { cssVar: '--color-statscard-trend-down', yamlKey: 'component_stats_card.trend_down',        label: 'Trend down' }];
const VARS_EMPTY    = [{ cssVar: '--color-emptystate-icon',      yamlKey: 'component_empty_state.icon',             label: 'Icon' },
                       { cssVar: '--color-emptystate-title',     yamlKey: 'component_empty_state.title',            label: 'Title' },
                       { cssVar: '--color-emptystate-desc',      yamlKey: 'component_empty_state.desc',             label: 'Desc' }];
const VARS_STATUS   = [{ cssVar: '--color-success',              yamlKey: 'semantic.success',                       label: 'Success' },
                       { cssVar: '--color-error',                yamlKey: 'semantic.error',                         label: 'Error' },
                       { cssVar: '--color-warning',              yamlKey: 'semantic.warning',                       label: 'Warning' },
                       { cssVar: '--color-info',                 yamlKey: 'semantic.info',                          label: 'Info' }];

// ─── Panel map ────────────────────────────────────────────────────────────────

const PANELS: Record<CategoryId, {
  title: string;
  desc: string;
  liveContent: React.ReactNode;
  examples?: React.ReactNode;
  docs?: React.ReactNode;
  vars?: LiveColorVar[];
  code?: string;
  noExamplesHeader?: boolean;
}> = {
  chips:             { title: 'ChipView',              desc: 'Colored badge chips for methods, protocols, status codes, filter tags.',            vars: VARS_CHIP,       liveContent: <ChipsViewLive />, examples: <ChipsViewExamples />, docs: <ChipsViewDocs />,             code: `<ChipView label="GET"  color="var(--color-success)" />\n<ChipView label="POST" color="var(--color-primary)" />\n<ChipView label="404"  color="var(--color-error)"   size="sm" />\n<ChipView label="beta" color="var(--color-warning)"  size="xs" />` },
  textinput:         { title: 'TextInputView',          desc: 'Standard text input — sizes match ButtonView and SelectInputView exactly.',         vars: VARS_INPUT,      liveContent: <TextInputViewLive />, examples: <TextInputViewExamples />, docs: <TextInputViewDocs />,         code: `function Preview() {\n  const [val, setVal] = useState('');\n  return (\n    <TextInputView\n      placeholder="Enter URL…"\n      value={val}\n      onChange={e => setVal(e.target.value)}\n      size="md"\n      iconLeft={<GlobeIcon size={13} />}\n      style={{ width: 260 }}\n    />\n  );\n}` },
  selecttextinput:   { title: 'SelectTextInputView',    desc: 'Combined method selector + URL input in one bordered pill — Postman URL bar pattern.',  vars: VARS_INPUT,  liveContent: <SelectTextInputViewLive />, examples: <SelectTextInputViewExamples />, docs: <SelectTextInputViewDocs />,   code: `function Preview() {\n  const [method, setMethod] = useState('GET');\n  const [url, setUrl] = useState('https://api.example.com/users');\n  const opts = [\n    { value: 'GET',    label: 'GET',    color: 'var(--color-method-get)' },\n    { value: 'POST',   label: 'POST',   color: 'var(--color-method-post)' },\n    { value: 'DELETE', label: 'DELETE', color: 'var(--color-method-delete)' },\n  ];\n  return (\n    <SelectTextInputView\n      selectValue={method}\n      selectOptions={opts}\n      onSelectChange={setMethod}\n      inputValue={url}\n      onInputChange={setUrl}\n      placeholder="Enter URL or paste text"\n    />\n  );\n}` },
  selectinput:       { title: 'SelectInputView',        desc: 'Portal dropdown with keyboard nav — replaces all StyledDropdown usages.',           vars: VARS_INPUT,      liveContent: <SelectInputViewLive />, examples: <SelectInputViewExamples />, docs: <SelectInputViewDocs />,       code: `function Preview() {\n  const [method, setMethod] = useState('GET');\n  const options = [\n    { value: 'GET',    label: 'GET',    color: 'var(--color-method-get)' },\n    { value: 'POST',   label: 'POST',   color: 'var(--color-method-post)' },\n    { value: 'DELETE', label: 'DELETE', color: 'var(--color-method-delete)' },\n  ];\n  return (\n    <SelectInputView\n      value={method}\n      options={options}\n      onChange={setMethod}\n      size="md"\n      style={{ width: 130 }}\n    />\n  );\n}` },
  button:            { title: 'ButtonView',             desc: 'Standard button — primary / secondary / ghost / danger — all sizes.',              vars: VARS_BTN,        liveContent: <ButtonViewLive />, examples: <ButtonViewExamples />, docs: <ButtonViewDocs />,            code: `<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>\n  <ButtonView label="Send Request" variant="primary" size="md" onClick={send} />\n  <ButtonView label="Cancel"       variant="ghost"   size="md" onClick={cancel} />\n  <ButtonView label="Delete"       variant="danger"  size="sm" onClick={del} />\n</div>` },
  iconbutton:        { title: 'IconButtonView',         desc: 'Square icon-only buttons — ghost / filled — toggle support — all sizes.',          vars: VARS_ICONBTN,    liveContent: <IconButtonViewLive />, examples: <IconButtonViewExamples />, docs: <IconButtonViewDocs />,        code: `function Preview() {\n  const [copied, setCopied] = useState(false);\n  const handleClick = () => {\n    setCopied(true);\n    setTimeout(() => setCopied(false), 1500);\n  };\n  return (\n    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>\n      <IconButtonView\n        icon={copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}\n        variant="ghost"\n        size="sm"\n        title={copied ? 'Copied!' : 'Copy'}\n        onClick={handleClick}\n        active={copied}\n      />\n    </div>\n  );\n}` },
  dropdownbutton:    { title: 'DropDownButtonView',     desc: 'Split button — primary action + chevron dropdown — Save as, Export as, etc.',      vars: VARS_BTN,        liveContent: <DropDownButtonViewLive />, examples: <DropDownButtonViewExamples />, docs: <DropDownButtonViewDocs />,    code: `<DropDownButtonView\n  label="Save"\n  onClick={save}\n  items={[\n    { label: 'Save as JSON', onClick: saveJson },\n    { label: 'Save as YAML', onClick: saveYaml },\n  ]}\n/>` },
  contextmenu:       { title: 'ContextMenuView',        desc: 'Recursive context menu with submenus — portal rendered — collection tree style.',   vars: VARS_ACCENT,     liveContent: <ContextMenuViewLive />, examples: <ContextMenuViewExamples />, docs: <ContextMenuViewDocs />,       code: `function Preview() {\n  const [anchor, setAnchor] = useState(null);\n  const [open, setOpen] = useState(false);\n  return (\n    <div>\n      <ButtonView\n        variant="secondary"\n        onClick={e => { setAnchor(e.currentTarget); setOpen(true); }}\n      >\n        Open context menu\n      </ButtonView>\n      <ContextMenuView\n        anchorEl={anchor}\n        open={open}\n        onClose={() => setOpen(false)}\n        items={[\n          { id: 'new',    label: 'New Request', icon: <PlusIcon size={13} />, onClick: () => {} },\n          { id: 'delete', label: 'Delete',      icon: <TrashIcon size={13} />, danger: true, onClick: () => {} },\n        ]}\n      />\n    </div>\n  );\n}` },
  tabs:              { title: 'TabView',                desc: 'pill · underline variants — sliding indicator, badges, dots — all with accentColor.',  vars: VARS_PILLTAB,   liveContent: <TabsPanel />, examples: <TabViewExamples />, docs: <TabViewDocs />,              code: `function Preview() {\n  const [active, setActive] = useState('params');\n  return (\n    <TabView\n      variant="pill"\n      tabs={[\n        { id: 'params',  label: 'Params',  badge: 2 },\n        { id: 'headers', label: 'Headers', badge: 4 },\n        { id: 'body',    label: 'Body' },\n        { id: 'auth',    label: 'Auth', dot: true, dotColor: 'var(--color-success)' },\n      ]}\n      activeTab={active}\n      onChange={setActive}\n    />\n  );\n}` },
  tabbar:            { title: 'TabBarView',             desc: 'VS Code-style protocol tab bar — store-free, drag-free, scroll arrows, dirty dot.', vars: VARS_ACCENT,     liveContent: <TabBarViewLive />, examples: <TabBarViewExamples />, docs: <TabBarViewDocs />,            code: `function Preview() {\n  const [tabs, setTabs] = useState([\n    { id: '1', label: 'GET /users', type: 'request', protocol: 'rest',    method: 'GET' },\n    { id: '2', label: 'getUsers',   type: 'request', protocol: 'graphql' },\n  ]);\n  const [activeId, setActiveId] = useState('1');\n  return (\n    <TabBarView\n      tabs={tabs}\n      activeTabId={activeId}\n      onTabClick={setActiveId}\n      onTabClose={id => setTabs(t => t.filter(x => x.id !== id))}\n      onAddTab={() => {}}\n      accentColor="var(--color-protocol-rest)"\n    />\n  );\n}` },
  editor:            { title: 'EditorView',             desc: 'Monaco editor wrapper — simplified props — JSON / GQL / XML / YAML etc.',           vars: VARS_ACCENT,     liveContent: <EditorViewLive />, examples: <EditorViewExamples />, docs: <EditorViewDocs />,            code: `function Preview() {\n  const [body, setBody] = useState('{ "name": "Alice", "role": "admin" }');\n  return (\n    <EditorView\n      value={body}\n      onChange={setBody}\n      language="json"\n      height={300}\n      readOnly={false}\n    />\n  );\n}` },
  patterns:          { title: 'Real-world Patterns',    desc: 'How DUI components assemble into actual Daakia UI — URL bar · tabs · tree.',        liveContent: <PatternsLive />, examples: <PatternsExamples />, docs: <PatternsDocs />, noExamplesHeader: true },
  toggle:            { title: 'ToggleSwitchView',       desc: 'On/off toggle with sm/md/lg sizes, accent color, label positions, disabled state.', vars: VARS_TOGGLE,     liveContent: <ToggleSwitchPanel />, examples: <ToggleSwitchViewExamples />, docs: <ToggleSwitchViewDocs />,      code: `function Preview() {\n  const [enabled, setEnabled] = useState(true);\n  return (\n    <ToggleSwitchView\n      checked={enabled}\n      onChange={setEnabled}\n      label="Enable SSL"\n      size="md"\n    />\n  );\n}` },
  checkbox:          { title: 'CheckboxView',           desc: 'Checkbox — checked / unchecked / indeterminate / disabled — with accent colors.',   vars: VARS_ACCENT,     liveContent: <CheckboxPanel />, examples: <CheckboxViewExamples />, docs: <CheckboxViewDocs />,          code: `function Preview() {\n  const [checked, setChecked] = useState(false);\n  return (\n    <CheckboxView\n      checked={checked}\n      onChange={setChecked}\n      label="Include auth headers"\n    />\n  );\n}` },
  modal:             { title: 'ModalView',              desc: 'Configurable modal — sm/md/lg/xl — never closes on backdrop click.',                vars: VARS_MODAL,      liveContent: <ModalPanel />, examples: <ModalViewExamples />, docs: <ModalViewDocs />,             code: `function Preview() {\n  const [isOpen, setIsOpen] = useState(false);\n  return (\n    <div>\n      <ButtonView variant="danger" size="sm" onClick={() => setIsOpen(true)}>\n        Delete Collection\n      </ButtonView>\n      <ModalView\n        open={isOpen}\n        onClose={() => setIsOpen(false)}\n        title="Confirm Delete"\n        size="sm"\n      >\n        <p>Are you sure?</p>\n        <ButtonView label="Delete" variant="danger" onClick={() => setIsOpen(false)} />\n      </ModalView>\n    </div>\n  );\n}` },
  loader:            { title: 'LoaderView',             desc: 'Loading states — spinner · dots · skeleton · pulse · progress-bar.',               vars: VARS_LOADER,     liveContent: <LoaderPanel />, examples: <LoaderViewExamples />, docs: <LoaderViewDocs />,            code: `<LoaderView variant="spinner" size="md" />\n<LoaderView variant="dots"    size="sm" />\n<LoaderView variant="skeleton" width={240} height={16} />` },
  emptystate:        { title: 'EmptyStateView',         desc: 'Empty state placeholder with icon, title, message, and optional CTA button.',       vars: VARS_EMPTY,      liveContent: <EmptyStatePanel />, examples: <EmptyStateViewExamples />, docs: <EmptyStateViewDocs />,        code: `<EmptyStateView\n  icon={<FolderIcon size={32} />}\n  title="No collections yet"\n  message="Create your first collection to get started."\n  action={{ label: 'New Collection', onClick: create }}\n/>` },
  statusindicator:   { title: 'StatusIndicatorView',    desc: 'Connection status dot — idle · connecting · connected · disconnected · error.',     vars: VARS_STATUS,     liveContent: <StatusIndicatorPanel />, examples: <StatusIndicatorViewExamples />, docs: <StatusIndicatorViewDocs />,   code: `<StatusIndicatorView status="connected"    label="Connected" />\n<StatusIndicatorView status="connecting"  label="Connecting…" />\n<StatusIndicatorView status="error"       label="Connection failed" />` },
  infopopup:         { title: 'InfoPopupView',          desc: 'Help popup anchored near a ? icon — title · items · footer · wiki link.',          vars: VARS_ACCENT,     liveContent: <InfoPopupPanel />, examples: <InfoPopupViewExamples />, docs: <InfoPopupViewDocs />,         code: `<InfoPopupView\n  open={isOpen}\n  onClose={() => setIsOpen(false)}\n  anchorEl={anchor}\n  title="Bearer Token"\n  description="Sent as the Authorization header on every request."\n/>` },
  resizablepanel:    { title: 'ResizablePanelView',     desc: 'Single-pane panel with bottom-edge drag handle to resize height — no store dependency.', vars: VARS_RESIZE, liveContent: <ResizablePanelPanel />, examples: <ResizablePanelViewExamples />, docs: <ResizablePanelViewDocs />,   code: `<ResizablePanelView defaultHeight={200} minHeight={80} maxHeight={400}>\n  {children}\n</ResizablePanelView>` },
  splitpanel:        { title: 'SplitPanelView',         desc: 'Split-pane container — horizontal or vertical — drag pill, double-click to reset.',  vars: VARS_RESIZE,    liveContent: <SplitPanelPanel />, examples: <SplitPanelViewExamples />, docs: <SplitPanelViewDocs />,        code: `<SplitPanelView\n  direction="vertical"\n  defaultSplit={60}\n  first={<RequestPanel />}\n  second={<ResponsePanel />}\n/>` },
  dottedcard:        { title: 'DottedCardView',         desc: 'Dotted-border expandable card — useful for optional config sections.',              vars: VARS_ACCENT,     liveContent: <DottedCardPanel />, examples: <DottedCardViewExamples />, docs: <DottedCardViewDocs />,        code: `<DottedCardView title="Advanced Options">\n  <TextInputView placeholder="Proxy URL" />\n</DottedCardView>` },
  coloredtext:       { title: 'ColoredTextView',        desc: 'Token-colored text — HTTP status lines, gRPC codes, SOAP faults.',                  vars: VARS_STATUS,     liveContent: <ColoredTextPanel />, examples: <ColoredTextViewExamples />, docs: <ColoredTextViewDocs />,       code: `<ColoredTextView\n  tokens={[\n    { text: '200', color: 'success' },\n    { text: ' OK', color: 'muted' },\n  ]}\n/>` },
  statscard:         { title: 'StatsCardView',          desc: 'Colorful metric card — value, unit, trend (up/down/neutral), subValue.',            vars: VARS_STATSCARD,  liveContent: <StatsCardPanel />, examples: <StatsCardViewExamples />, docs: <StatsCardViewDocs />,         code: `<StatsCardView\n  label="Response Time"\n  value="142"\n  unit="ms"\n  trend="down"\n  color="var(--color-success)"\n/>` },
  datatable:         { title: 'DataTableView',          desc: 'Generic sortable table — columns, striped rows, empty state, row click.',           vars: VARS_TABLE,      liveContent: <DataTablePanel />, examples: <DataTableViewExamples />, docs: <DataTableViewDocs />,         code: `<DataTableView\n  columns={[{ key: 'name', label: 'Name', sortable: true }]}\n  rows={requests}\n  keyField="name"\n/>` },
  codeblock:         { title: 'CodeBlockView',          desc: 'Read-only code block — language label, copy button, optional line numbers.',        vars: VARS_CODE,       liveContent: <CodeBlockPanel />, examples: <CodeBlockViewExamples />, docs: <CodeBlockViewDocs />,         code: `<CodeBlockView\n  language="json"\n  code={responseBody}\n  showLineNumbers\n  showCopy\n/>` },
  aibutton:          { title: 'AIButtonView',           desc: 'AI action button — generate · fuzz · explain · fix · ask · suggest — loading state.', vars: VARS_AIBTN,   liveContent: <AIButtonPanel />, examples: <AIButtonViewExamples />, docs: <AIButtonViewDocs />,          code: `<AIButtonView action="generate" onClick={handleClick} loading={loading} />` },
  sidenav:           { title: 'SideNavView',            desc: 'Collapsible left sidebar nav with nested items and icon-only collapse mode.',        vars: VARS_SIDENAV,    liveContent: <SideNavPanel />, examples: <SideNavViewExamples />, docs: <SideNavViewDocs />,           code: `<SideNavView\n  items={navItems}\n  activeId={activeId}\n  onSelect={setActiveId}\n/>` },
  settingsnav:       { title: 'SettingsNavView',        desc: 'Settings-style grouped nav with badges, descriptions, active state.',               vars: VARS_SIDENAV,    liveContent: <SettingsNavPanel />, examples: <SettingsNavViewExamples />, docs: <SettingsNavViewDocs />,       code: `<SettingsNavView\n  groups={settingsGroups}\n  activeId={activeId}\n  onSelect={setActiveId}\n/>` },
  themecardselector: { title: 'ThemeCardSelectorView',  desc: 'Card-based theme picker with color swatch previews and checkmark selection.',        vars: VARS_ACCENT,     liveContent: <ThemeCardSelectorPanel />, examples: <ThemeCardSelectorViewExamples />, docs: <ThemeCardSelectorViewDocs />, code: `<ThemeCardSelectorView\n  options={themes}\n  value={selectedTheme}\n  onChange={setSelectedTheme}\n/>` },
  featurecategory:   { title: 'FeatureCategoryView',    desc: 'Expandable feature category with toggle switches and enabled count badge.',          vars: VARS_TOGGLE,     liveContent: <FeatureCategoryPanel />, examples: <FeatureCategoryViewExamples />, docs: <FeatureCategoryViewDocs />,   code: `<FeatureCategoryView\n  categoryLabel="AI Features"\n  features={features}\n/>` },
  taginput:          { title: 'TagInputView',           desc: 'Multi-value tag input — Enter or comma to add, Backspace to remove.',               vars: VARS_TAG,        liveContent: <TagInputPanel />, examples: <TagInputViewExamples />, docs: <TagInputViewDocs />,          code: `<TagInputView\n  tags={tags}\n  onChange={setTags}\n  placeholder="Add tag…"\n/>` },
  bottompanel:       { title: 'BottomPanelView',        desc: 'DevTools-style resizable bottom panel with tab bar and collapse toggle.',            vars: VARS_ACCENT,     liveContent: <BottomPanelPanel />, examples: <BottomPanelViewExamples />, docs: <BottomPanelViewDocs />,       code: `<BottomPanelView tabs={[{ id: 'console', label: 'Console', content: <Console /> }]} minHeight={120} />` },
  toast:             { title: 'ToastView',              desc: 'Toast notification stack — success · error · warning · info — auto-dismiss.',        vars: VARS_STATUS,     liveContent: <ToastPanel />, examples: <ToastViewExamples />, docs: <ToastViewDocs />,             code: `// Toast is triggered via store\nuseToastStore.getState().show({ type: 'success', message: 'Saved!' })` },
  promptcard:        { title: 'PromptCardView',         desc: 'Single prompt library row card — colored avatar initials, title, description, protocol badge, CUSTOM badge, hover actions.',  vars: VARS_ACCENT, liveContent: <PromptCardPanel />, examples: <PromptCardViewExamples />, docs: <PromptCardViewDocs />, code: `<PromptCardView\n  id="p1"\n  title="REST API Agent"\n  description="Builds structured HTTP requests"\n  protocol="REST"\n  protocolColor="var(--color-protocol-rest)"\n  onUse={handleUse}\n/>` },
  promptlibrary:     { title: 'PromptLibraryView',      desc: 'Full Prompt Library panel — list (search + sections + categories) + editor (avatar header + tabs + preview/edit toggle + save).',  liveContent: <PromptLibraryPanel />, examples: <PromptLibraryViewExamples />, docs: <PromptLibraryViewDocs />, code: `<PromptLibraryListView sections={data} activeId={id} onSelect={setId} />\n<PromptLibraryEditorView content={text} onContentChange={setText} />` },
  stageview:         { title: 'StageCheck / StageSpin / StagePulse', desc: 'Step-level status indicators — completed (check), active (spin), pending (pulse) — for multi-step pipelines and request flows.', vars: VARS_STAGE, liveContent: <StageViewLive />, examples: <StageViewExamples />, docs: <StageViewDocs />, code: `<StageCheck label="Auth verified"   sublabel="Token valid" />\n<StageSpin  label="Sending request" sublabel="Waiting…" />\n<StagePulse label="Parse response"  sublabel="Queued" />` },
  iconsgallery:      { title: 'Icons Gallery',          desc: 'All Daakia icons — searchable by name — click to copy icon name.',                   liveContent: <IconsGalleryPanel />, examples: <IconsGalleryExamples />, docs: <IconsGalleryDocs />, noExamplesHeader: true },
  themeconfig:       { title: 'Theme Customization',    desc: 'Export / upload YAML theme files — all 63 CSS color vars, live hot-swap, no rebuild.', liveContent: <ThemeCustomizationPanel />, noExamplesHeader: true },
  themeaddvar:       { title: 'Add Theme Variable',     desc: 'Step-by-step guide: register a new CSS color variable in SCHEMA, declare it in index.css, use it in any DUI component, and test it live.', liveContent: <ThemeAddVarGuidePanel />, noExamplesHeader: true },
  searchinput:       { title: 'SearchInputView',        desc: 'URL-bar style search input with optional prefix icon and suffix clear button.',        vars: VARS_INPUT,      liveContent: <SearchInputPanel />, examples: <SearchInputViewExamples />, docs: <SearchInputViewDocs />,       code: `<SearchInputView\n  value={q}\n  onChange={setQ}\n  placeholder="Search collections…"\n/>` },
  durationinput:     { title: 'DurationInputView',      desc: 'Number input with ms / s / m / hr unit selector dropdown.',                           vars: VARS_DUR,        liveContent: <DurationInputPanel />, examples: <DurationInputViewExamples />, docs: <DurationInputViewDocs />,     code: `<DurationInputView value={timeout} onChange={setTimeout} />` },
  highlightedinput:  { title: 'HighlightedInputView',   desc: '{{variable}} highlighted URL input with autocomplete dropdown — the Daakia URL bar.',   vars: VARS_INPUT,  liveContent: <HighlightedInputPanel />, examples: <HighlightedInputViewExamples />, docs: <HighlightedInputViewDocs />,  code: `<HighlightedInputView\n  value={url}\n  onChange={setUrl}\n  placeholder="https://api.example.com/{{env}}/users"\n/>` },
  keyvaluetable:     { title: 'KeyValueTableView',      desc: 'KV table — toolbar · add/delete/bulk-clear · enable toggle · maskSensitive · autocompleteKeys · showDescription · pinnedTopRows.',  vars: VARS_TABLE, liveContent: <KeyValueTablePanel />, examples: <KeyValueTableViewExamples />, docs: <KeyValueTableViewDocs />, code: `<KeyValueTableView\n  rows={rows}\n  onChange={setRows}\n  label="Request Headers"\n  maskSensitive\n  accentColor="var(--color-protocol-rest)"\n/>` },
  mergedinput:       { title: 'MergedInputView',         desc: 'Unified single-border input bar — merge select dropdowns, text inputs, inline buttons, and dividers into one pill.',  vars: VARS_INPUT, liveContent: <MergedInputViewPanel />, examples: <MergedInputViewExamples />, docs: <MergedInputViewDocs />, code: `<MergedInputView\n  segments={[\n    { type: 'select', value: version, options: soapVersions, onChange: setVersion },\n    { type: 'divider' },\n    { type: 'text', value: url, onChange: setUrl },\n  ]}\n/>` },
  duiprovider:       { title: 'DuiProvider — Size System', desc: 'Wrap any subtree with <DuiProvider size="sm|md|lg|xl"> and ALL nested DUI components inherit that size — no prop drilling.', vars: VARS_ACCENT, liveContent: <DuiProviderLive />, examples: <DuiProviderExamples />, docs: <DuiProviderDocs />, noExamplesHeader: true },
  hudview:           { title: 'HudView', desc: 'Generic floating draggable toolbar — store-free counterpart of DebugHud. Pass items[] and an optional status string.', vars: VARS_ACCENT, liveContent: <HudViewPanel />, examples: <HudViewExamples />, docs: <HudViewDocs />, code: `<HudView\n  items={[\n    { id: 'continue', icon: <PlayIcon size={13} />, title: 'Continue (F5)' },\n    { id: 'stop',     icon: <StopIcon size={13} />, title: 'Stop' },\n  ]}\n  status="Paused — Line 42"\n/>` },
  collapsiblesection: { title: 'CollapsibleSectionView', desc: 'Expandable section with chevron toggle, colored chip title, count badge, and a right-side action slot.', vars: VARS_ACCENT, liveContent: <CollapsibleSectionPanel />, examples: <CollapsibleSectionViewExamples />, docs: <CollapsibleSectionViewDocs />, code: `<CollapsibleSectionView\n  title="Variables"\n  expanded={expanded}\n  onToggle={() => setExpanded(v => !v)}\n  accentColor="var(--color-debug-key)"\n  badge={3}\n>` },
  jsontree:           { title: 'JsonTreeView', desc: 'Recursive JSON / object / array value tree with VS Code-style token colors. Expandable nodes with configurable default depth.', vars: VARS_ACCENT, liveContent: <JsonTreeViewPanel />, examples: <JsonTreeViewExamples />, docs: <JsonTreeViewDocs />, code: `<JsonTreeView\n  data={{ user: { id: 1, name: 'Alice', roles: ['admin'] } }}\n  defaultExpandDepth={2}\n/>` },
  logentry:           { title: 'ExpandableLogEntryView', desc: 'Expandable log row with icon, title, colored badge, timestamp chip, and chevron.', vars: VARS_ACCENT, liveContent: <ExpandableLogEntryPanel />, examples: <ExpandableLogEntryViewExamples />, docs: <ExpandableLogEntryViewDocs />, code: `<ExpandableLogEntryView\n  icon={<ArrowUpRightIcon size={13} />}\n  title="Request Sent"\n  badge="POST"\n  badgeColor="var(--color-method-post)"\n  timestamp={Date.now()}\n/>` },
  copybutton:         { title: 'CopyButtonView', desc: 'Icon-only button that copies text to clipboard. Shows CopyIcon → CheckIcon swap for 1500ms on success.', vars: VARS_ACCENT, liveContent: <CopyButtonPanel />, examples: <CopyButtonViewExamples />, docs: <CopyButtonViewDocs />, code: `<CopyButtonView text="some text to copy" />\n<CopyButtonView text="token" size="xs" />` },
  markdownview:       { title: 'MarkdownView', desc: 'Renders Markdown (GFM) with syntax-highlighted code blocks, inline code, tables, task lists, blockquotes, and copy-buttons on each code block.', vars: VARS_ACCENT, liveContent: <MarkdownViewPanel />, examples: <MarkdownViewExamples />, docs: <MarkdownViewDocs />, code: `<MarkdownView content={"## Hello\\n\\nInline \`code\` and a code block:\\n\\n\`\`\`ts\\nconst x = 1;\\n\`\`\`"} />` },
  formdatatable:      { title: 'FormDataTableView', desc: 'Multipart/form-data key-value table with file upload support. Rows have: enabled toggle, key input, type dropdown (Text | File), value/file picker.', vars: VARS_ACCENT, liveContent: <FormDataTablePanel />, examples: <FormDataTableViewExamples />, docs: <FormDataTableViewDocs />, code: `<FormDataTableView\n  rows={rows}\n  onChange={setRows}\n  label="Form Data"\n/>` },
  yamlkeychip:        { title: 'YamlKeyChip', desc: 'Compact type-labeled chip for YAML/JSON keys. Shows the key name with a small colored type badge.', vars: VARS_ACCENT, liveContent: <YamlKeyChipPanel />, examples: <YamlKeyChipExamples />, docs: <YamlKeyChipDocs />, code: `<YamlKeyChip yamlKey="brand.primary" />\n<YamlKeyChip yamlKey="component_button.primary_bg" color="var(--color-success)" />` },
  livecolorpanel:     { title: 'LiveColorCustomizer', desc: 'Interactive color editor that applies CSS custom property changes directly to the document root in real time.', vars: VARS_ACCENT, liveContent: <LiveColorCustomizerPanel />, examples: <LiveColorCustomizerExamples />, docs: <LiveColorCustomizerDocs />, noExamplesHeader: true },
  spacerview:         { title: 'SpacerView', desc: 'macOS/iOS-style thin divider line for separating groups in icon rails, toolbars, or any flex container.', vars: VARS_ACCENT, liveContent: <SpacerViewPanel />, examples: <SpacerViewExamples />, docs: <SpacerViewDocs />, code: `<SpacerView orientation="vertical" spacing="md" />` },
  folderview:         { title: 'FolderView', desc: 'Generic folder tree component with expand/collapse, hover action buttons, DUI ContextMenuView on 3-dot, and DUI ModalView runner popup.', vars: VARS_ACCENT, liveContent: <FolderViewLive />, examples: <FolderViewExamples />, docs: <FolderViewDocs />, code: `<FolderView\n  nodes={nodes}\n  accentColor="var(--color-protocol-rest)"\n  renderItem={(item, _node, depth) => <RequestRow item={item} depth={depth} />}\n  folderActions={folderActions}\n  contextMenuItems={node => menuItems(node)}\n/>` },
  debugeditor:        { title: 'DebugEditorView', desc: 'Monaco editor with breakpoint gutter, paused-line highlight, and variable-hover tooltips. Fully abstract — consumer provides the adapter.', vars: VARS_ACCENT, liveContent: <DebugEditorViewLive />, examples: <DebugEditorViewExamples />, docs: <DebugEditorViewDocs />, code: `<DebugEditorView\n  value={code}\n  onChange={setCode}\n  language="javascript"\n  height={200}\n  breakpoints={breakpoints}\n  pausedLine={pausedLine}\n  adapter={{ onToggleBreakpoint: toggleBp }}\n/>` },
  debugview:          { title: 'DebugView', desc: 'VS Code-style Run & Debug sidebar panel — Variables (scoped tree), Watch expressions, Call Stack, Breakpoints. Fully abstract, no daakia store dependency.', vars: VARS_ACCENT, liveContent: <DebugViewLive />, examples: <DebugViewExamples />, docs: <DebugViewDocs />, code: `<DebugView\n  session={session}\n  watchExpressions={watchExprs}\n  actions={{\n    onContinue, onStop, onStepOver, onStepInto,\n    onAddWatchExpression, onRemoveWatchExpression,\n  }}\n/>` },
};

// ─── Theme ────────────────────────────────────────────────────────────────────

type DuiThemeMode = 'light' | 'dark' | 'system';

function applyTheme(mode: DuiThemeMode) {
  if (mode === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    applyMonacoTheme(isDark ? 'dark' : 'light');
  } else {
    document.documentElement.setAttribute('data-theme', mode);
    applyMonacoTheme(mode);
  }
}

const THEME_OPTIONS: { id: DuiThemeMode; label: string; icon: string }[] = [
  { id: 'light',  label: 'Light',  icon: '☀️' },
  { id: 'dark',   label: 'Dark',   icon: '🌙' },
  { id: 'system', label: 'System', icon: '💻' },
];

// ─── Main showcase ────────────────────────────────────────────────────────────

export function DuiShowcase() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('textinput');
  const [themeMode, setThemeMode] = useState<DuiThemeMode>('dark');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const panel = PANELS[activeCategory];

  const handleTheme = useCallback((mode: DuiThemeMode) => {
    setThemeMode(mode);
    applyTheme(mode);
  }, []);

  useEffect(() => {
    if (themeMode !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => applyTheme('system');
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, [themeMode]);

  useEffect(() => { applyTheme(themeMode); }, []);

  return (
    <div style={{
      height: '100vh', display: 'flex', flexDirection: 'column',
      background: 'var(--color-panel)', color: 'var(--color-text-primary)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    }}>

      {/* ── Header ── */}
      <div style={{
        height: 44, flexShrink: 0, display: 'flex', alignItems: 'center',
        gap: 10, padding: '0 16px 0 12px',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-surface-border)',
        zIndex: 200,
      }}>
        <button
          type="button"
          title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          onClick={() => setSidebarOpen(v => !v)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 28, height: 28, border: 'none', background: 'transparent',
            borderRadius: 6, cursor: 'pointer',
            color: sidebarOpen ? 'var(--color-primary)' : 'var(--color-text-muted)',
            transition: 'color 120ms',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-hover)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
        >
          <SidebarLeftIcon size={14} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.02em' }}>DUI</span>
          <ChipView label="v1.0" color="var(--color-primary)" size="xs" />
        </div>
        <div style={{ width: 1, height: 16, background: 'var(--color-surface-border)' }} />
        <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Daakia UI Component Library</span>

        <div style={{ flex: 1 }} />

        {/* Theme switcher */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 2,
          background: 'var(--color-panel)',
          border: '1px solid var(--color-surface-border)',
          borderRadius: 8, padding: 2,
        }}>
          {THEME_OPTIONS.map(opt => {
            const isActive = themeMode === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleTheme(opt.id)}
                title={`${opt.label} theme`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 3,
                  padding: '3px 8px', borderRadius: 6,
                  fontSize: 11, fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer', border: 'none',
                  background: isActive ? 'var(--color-surface)' : 'transparent',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                  transition: 'all 140ms',
                }}
              >
                <span>{opt.icon}</span>
                {opt.label}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
          <ChipView label="React 19"      color="var(--color-info)"    size="xs" />
          <ChipView label="Tailwind v4"   color="var(--color-success)" size="xs" />
          <ChipView label={`${TOTAL_COMPONENT_COUNT} components`} color="var(--color-primary)" size="xs" />
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        <SideNavView
          items={NAV_ITEMS}
          activeId={activeCategory}
          onSelect={id => setActiveCategory(id as CategoryId)}
          collapsed={!sidebarOpen}
          onCollapsedChange={v => setSidebarOpen(!v)}
          collapsible={false}
          searchable
          searchPlaceholder="Search components…"
          emptyText="No matches"
          width={232}
          collapsedWidth={52}
          style={{
            background: 'var(--color-surface)',
            borderRight: '1px solid var(--color-surface-border)',
          }}
        />

        {/* ── Content ── */}
        <div style={{ flex: 1, overflow: 'auto', padding: '36px 48px 64px' }}>
          <div style={{ maxWidth: 880, margin: '0 auto' }}>

            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
              <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>DUI</span>
              <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>›</span>
              <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
                {SIDEBAR_GROUPS.find(g => g.items.some(i => i.id === activeCategory))?.title}
              </span>
              <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>›</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-primary)' }}>{panel.title}</span>
            </div>

            {/* Section heading */}
            <div style={{ marginBottom: 32, paddingBottom: 20, borderBottom: '1px solid var(--color-surface-border)' }}>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--color-text-primary)' }}>
                {panel.title}
              </h1>
              <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.6, maxWidth: 640 }}>
                {panel.desc}
              </p>
            </div>

            {/* ShowcasePanel wraps Live + Docs tabs */}
            <ShowcasePanel
              live={
                <>
                  {panel.code && (
                    <LivePlayground
                      key={`pg-${activeCategory}`}
                      code={panel.code}
                      content={panel.liveContent}
                      themeMode={themeMode}
                      vars={panel.vars}
                    />
                  )}
                  {panel.liveContent && (
                    panel.noExamplesHeader
                      ? <div style={{ marginTop: 20 }}>{panel.liveContent}</div>
                      : <>
                          <div style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            margin: '28px 0 16px',
                          }}>
                            <div style={{ flex: 1, height: 1, background: 'var(--color-surface-border)' }} />
                            <span style={{
                              fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                              textTransform: 'uppercase', color: 'var(--color-text-muted)',
                              whiteSpace: 'nowrap',
                            }}>
                              Examples
                            </span>
                            <div style={{ flex: 1, height: 1, background: 'var(--color-surface-border)' }} />
                          </div>
                          {panel.liveContent}
                        </>
                  )}
                </>
              }
              examples={panel.examples}
              docs={panel.docs ?? (
                <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 13 }}>
                  Documentation coming soon.
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
