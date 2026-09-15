import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import type { ComponentType } from 'react';
import { LivePlayground } from './panels/LivePlayground';
import { ChipView, SideNavView, SegmentedControlView, SplitPanelView } from '@/dui';
import type { LiveColorVar, SideNavItem } from '@/dui';
import { applyMonacoThemeWhenReady } from './monaco';
import { ShowcasePanel } from './ShowcasePanel';
import { parseHash, formatHash } from './deepLink';
import type { ShowcaseTabId } from './deepLink';

/* Home takes props, so it is an ordinary lazy component rather than a `slot`,
   which is typed for the prop-less panels in the map. */
const HomePanel = lazy(() => import('./panels/HomePanel').then(m => ({ default: m.HomePanel })));

// ── Icons ─────────────────────────────────────────────────────────────────────
import {
  TrashIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  SparkleIcon,
  MoreHorizontalIcon,
  WandIcon,
  CodeIcon,
  FilterIcon,
  GlobeIcon,
  CheckIcon,
  LayersIcon,
  PanelRightIcon,
  SidebarLeftIcon,
  DotIcon,
  CheckCircleIcon,
  GaugeIcon,
  TerminalIcon,
  DocumentIcon,
  CodeBracketsIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  FolderIcon,
  SpinnerIcon,
  SunIcon,
  MoonIcon,
  MonitorIcon,
  KeyIcon,
  PlusSquareIcon,
  PlayIcon,
  InfoCircleIcon,
  RefreshIcon,
  CalendarIcon,
  ClockIcon,
  ImageIcon,
  VideoIcon,
  MusicIcon,
  ArchiveIcon,
  HeartIcon,
  BookmarkIcon,
  NetworkIcon,
} from '@/icons';

// ─── Batch Examples & Docs imports (auto-wired) ─────────────────────────────
import { FloatingLabelInputViewExamples } from './components/floatinglabelinput/examples/FloatingLabelInputViewExamples';
import { FloatingLabelInputViewDocs } from './components/floatinglabelinput/docs/FloatingLabelInputViewDocs';
import { ConstellationLoaderViewExamples } from './components/constellationloader/examples/ConstellationLoaderViewExamples';
import { ConstellationLoaderViewDocs } from './components/constellationloader/docs/ConstellationLoaderViewDocs';
import { StackedToastDeckViewExamples } from './components/stackedtoastdeck/examples/StackedToastDeckViewExamples';
import { StackedToastDeckViewDocs } from './components/stackedtoastdeck/docs/StackedToastDeckViewDocs';

// ─── Types ────────────────────────────────────────────────────────────────────

type CategoryId =
  | 'home'
  | 'badgechip'
  | 'chips' | 'textinput' | 'selectinput' | 'selecttextinput' | 'button'
  | 'iconbutton' | 'dropdownbutton' | 'contextmenu'
  | 'tabs' | 'tabbar' | 'editor' | 'patterns'
  | 'toggle' | 'checkbox' | 'modal' | 'loader' | 'emptystate'
  | 'statusindicator' | 'infopopup' | 'resizablepanel' | 'splitpanel' | 'dottedcard'
  | 'coloredtext' | 'statscard' | 'datatable' | 'codeblock' | 'aibutton'
  | 'sidenav' | 'settingsnav' | 'themecardselector' | 'featurecategory'
  | 'taginput' | 'bottompanel' | 'toast' | 'promptcard' | 'promptlibrary' | 'iconsgallery' | 'themeconfig' | 'themeaddvar' | 'stageview'
  | 'searchinput' | 'durationinput' | 'highlightedinput' | 'keyvaluetable'
  | 'mergedinput' | 'duiprovider' | 'hudview' | 'picker' | 'segmentedcontrol'
  | 'collapsiblesection' | 'jsontree' | 'logentry'
  | 'copybutton' | 'markdownview' | 'formdatatable' | 'yamlkeychip' | 'livecolorpanel' | 'spacerview'
  | 'folderview' | 'debugeditor' | 'debugview'
  | 'calendar' | 'dateinput' | 'daterangepicker' | 'timewheel' | 'countdownring'
  | 'radiogroup' | 'radiocard' | 'rating' | 'otpinput' | 'phoneinput'
  | 'colorpicker' | 'iconpicker' | 'emojipicker' | 'filedropzone' | 'avatarupload'
  | 'maskedinput' | 'transferlist' | 'stepperinput' | 'switchgroup'
  | 'snackbar' | 'banner' | 'progressring' | 'progressbar' | 'skeleton'
  | 'notificationbadge' | 'avatar' | 'avatargroup' | 'presencedot' | 'confettiburst'
  | 'popover' | 'tooltip' | 'drawer' | 'actionsheet' | 'bottomsheet'
  | 'spotlighttour' | 'fab' | 'dock' | 'breadcrumb' | 'pagination'
  | 'hero' | 'level' | 'mediaobject' | 'tilegrid' | 'panellist'
  | 'navbar' | 'affix' | 'anchor' | 'stickyheader' | 'aspectratio'
  | 'masonrygrid' | 'scrollarea' | 'backtotop' | 'watermark'
  | 'descriptions' | 'statistic' | 'result' | 'cascader' | 'combobox'
  | 'listview' | 'virtualizedlist' | 'stickytableheader' | 'tablepagination' | 'filterbar'
  | 'sortableheader' | 'editablecell' | 'datagridtoolbar' | 'columnvisibility'
  | 'kbd' | 'wizardstepper' | 'accordiongroup' | 'segmentedprogressbar' | 'checklist'
  | 'prioritypicker' | 'tagcloud' | 'rangeslider' | 'votewidget' | 'likebutton'
  | 'bookmarkbutton' | 'followbutton' | 'shortcutrecorder'
  | 'messagebubble' | 'chatinput' | 'typingindicator' | 'commentthread' | 'notificationcenter'
  | 'alertdialog' | 'feedbackwidget' | 'npssurvey' | 'sharesheet' | 'contactcard'
  | 'articlecard' | 'faqaccordion' | 'messagebanner' | 'quoteblock'
  | 'settingsrow' | 'settingssection' | 'onboardingchecklist' | 'keyvaluelist'
  | 'environmentbadge' | 'versionbadge' | 'licensebadge' | 'usagemeter'
  | 'permissionmatrix' | 'auditlogrow' | 'webhookstatus' | 'apikeyrow'
  | 'ratelimitmeter' | 'emptyinbox' | 'featurespotlightbadge' | 'cookieconsentbanner'
  | 'maintenancebanner' | 'trialcountdownbanner' | 'teammemberrow' | 'inviteinput'
  | 'roleselect' | 'integrationcard' | 'statuspagerow' | 'changelogentry'
  | 'imagegallery' | 'imagecropper' | 'videoplayer' | 'audiowaveform' | 'audioplayer'
  | 'pdfviewer' | 'fileicon' | 'filelist' | 'draghandle' | 'signaturepad'
  | 'barcode' | 'imagezoom'
  | 'timeline' | 'activityfeed' | 'kanbanboard' | 'sparkline' | 'heatmapcalendar'
  | 'comparisonslider' | 'carousel' | 'qrcode' | 'stattrendcard' | 'pricingcard'
  | 'testimonialcard' | 'ratingbreakdown' | 'treeselect' | 'richtexttoolbar' | 'mentioninput'
  | 'gradienttext' | 'typewritertext' | 'countupnumber' | 'magneticbutton' | 'tiltcard'
  | 'particlebackground' | 'glowborder' | 'revealonscroll' | 'floatinglabelinput' | 'pulsedot'
  | 'requestflow' | 'latencypulse' | 'aistreamingtext' | 'commandorb' | 'timetravelslider'
  | 'diffmorph' | 'schemablueprint' | 'livecursorpresence' | 'undoredotimeline' | 'dialknobinput'
  | 'holdtoconfirm' | 'morphingiconbutton' | 'stackedswipecard' | 'networkweather' | 'constellationloader'
  | 'holocard' | 'ghosttypingplaceholder' | 'connectionpulseline' | 'stackedtoastdeck' | 'pathreveal'
  | 'spectrumslider' | 'breathingloader';

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
      { id: 'picker',            label: 'PickerView',            icon: <ChevronDownIcon size={13} /> },
      { id: 'segmentedcontrol',  label: 'SegmentedControlView',  icon: <LayersIcon size={13} /> },
    ],
  },
  {
    title: 'Date & Time',
    items: [
      { id: 'calendar',         label: 'CalendarView',         icon: <CalendarIcon size={13} /> },
      { id: 'dateinput',        label: 'DateInputView',        icon: <CalendarIcon size={13} /> },
      { id: 'daterangepicker',  label: 'DateRangePickerView',  icon: <CalendarIcon size={13} /> },
      { id: 'timewheel',        label: 'TimeWheelView',        icon: <ClockIcon size={13} /> },
      { id: 'countdownring',    label: 'CountdownRingView',    icon: <ClockIcon size={13} /> },
    ],
  },
  {
    title: 'Form & Selection',
    items: [
      { id: 'radiogroup',     label: 'RadioGroupView',     icon: <CheckCircleIcon size={13} /> },
      { id: 'radiocard',      label: 'RadioCardView',      icon: <CheckCircleIcon size={13} /> },
      { id: 'rating',         label: 'RatingView',         icon: <SparkleIcon size={13} /> },
      { id: 'otpinput',       label: 'OtpInputView',       icon: <KeyIcon size={13} /> },
      { id: 'phoneinput',     label: 'PhoneInputView',     icon: <KeyIcon size={13} /> },
      { id: 'colorpicker',    label: 'ColorPickerView',    icon: <SunIcon size={13} /> },
      { id: 'iconpicker',     label: 'IconPickerView',     icon: <SearchIcon size={13} /> },
      { id: 'emojipicker',    label: 'EmojiPickerView',    icon: <SparkleIcon size={13} /> },
      { id: 'filedropzone',   label: 'FileDropzoneView',   icon: <FolderIcon size={13} /> },
      { id: 'avatarupload',   label: 'AvatarUploadView',   icon: <SunIcon size={13} /> },
      { id: 'maskedinput',    label: 'MaskedInputView',    icon: <KeyIcon size={13} /> },
      { id: 'transferlist',   label: 'TransferListView',   icon: <LayersIcon size={13} /> },
      { id: 'stepperinput',   label: 'StepperInputView',   icon: <PlusIcon size={13} /> },
      { id: 'switchgroup',    label: 'SwitchGroupView',    icon: <RefreshIcon size={13} /> },
    ],
  },
  {
    title: 'Feedback & Status',
    items: [
      { id: 'snackbar',           label: 'SnackbarView',           icon: <InfoCircleIcon size={13} /> },
      { id: 'banner',             label: 'BannerView',             icon: <InfoCircleIcon size={13} /> },
      { id: 'progressring',       label: 'ProgressRingView',       icon: <GaugeIcon size={13} /> },
      { id: 'progressbar',        label: 'ProgressBarView',        icon: <GaugeIcon size={13} /> },
      { id: 'skeleton',           label: 'SkeletonView',           icon: <SpinnerIcon size={13} /> },
      { id: 'notificationbadge',  label: 'NotificationBadgeView',  icon: <CheckCircleIcon size={13} /> },
      { id: 'avatar',             label: 'AvatarView',             icon: <SunIcon size={13} /> },
      { id: 'avatargroup',        label: 'AvatarGroupView',        icon: <LayersIcon size={13} /> },
      { id: 'presencedot',        label: 'PresenceDotView',        icon: <DotIcon size={13} /> },
      { id: 'confettiburst',      label: 'ConfettiBurstView',      icon: <SparkleIcon size={13} /> },
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
      { id: 'breadcrumb',  label: 'BreadcrumbView',  icon: <ChevronRightIcon size={13} /> },
      { id: 'pagination',  label: 'PaginationView',  icon: <MoreHorizontalIcon size={13} /> },
      { id: 'dock',        label: 'DockView',        icon: <LayersIcon size={13} /> },
      { id: 'fab',         label: 'FabView',         icon: <PlusIcon size={13} /> },
    ],
  },
  {
    title: 'Display',
    items: [
      { id: 'chips',           label: 'ChipView',             icon: <DotIcon size={13} /> },
      { id: 'badgechip',       label: 'BadgeChipView',        icon: <DotIcon size={13} /> },
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
      { id: 'popover',       label: 'PopoverView',       icon: <InfoCircleIcon size={13} /> },
      { id: 'tooltip',       label: 'TooltipView',       icon: <InfoCircleIcon size={13} /> },
      { id: 'drawer',        label: 'DrawerView',        icon: <PanelRightIcon size={13} /> },
      { id: 'actionsheet',   label: 'ActionSheetView',   icon: <MoreHorizontalIcon size={13} /> },
      { id: 'bottomsheet',   label: 'BottomSheetView',   icon: <PanelRightIcon size={13} /> },
      { id: 'spotlighttour', label: 'SpotlightTourView', icon: <SparkleIcon size={13} /> },
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
      { id: 'hero',               label: 'HeroView',               icon: <DocumentIcon size={13} /> },
      { id: 'level',              label: 'LevelView',              icon: <LayersIcon size={13} /> },
      { id: 'mediaobject',        label: 'MediaObjectView',        icon: <LayersIcon size={13} /> },
      { id: 'tilegrid',           label: 'TileGridView',           icon: <LayersIcon size={13} /> },
      { id: 'panellist',          label: 'PanelListView',          icon: <FilterIcon size={13} /> },
      { id: 'navbar',             label: 'NavbarView',             icon: <PanelRightIcon size={13} /> },
      { id: 'affix',              label: 'AffixView',              icon: <PanelRightIcon size={13} /> },
      { id: 'anchor',             label: 'AnchorView',             icon: <ChevronRightIcon size={13} /> },
      { id: 'stickyheader',       label: 'StickyHeaderView',       icon: <PanelRightIcon size={13} /> },
      { id: 'aspectratio',        label: 'AspectRatioView',        icon: <DocumentIcon size={13} /> },
      { id: 'masonrygrid',        label: 'MasonryGridView',        icon: <LayersIcon size={13} /> },
      { id: 'scrollarea',         label: 'ScrollAreaView',         icon: <PanelRightIcon size={13} /> },
      { id: 'backtotop',          label: 'BackToTopView',          icon: <PlayIcon size={13} /> },
      { id: 'watermark',          label: 'WatermarkView',          icon: <DocumentIcon size={13} /> },
    ],
  },
  {
    title: 'Data & Enterprise',
    items: [
      { id: 'descriptions',        label: 'DescriptionsView',        icon: <FilterIcon size={13} /> },
      { id: 'statistic',           label: 'StatisticView',           icon: <GaugeIcon size={13} /> },
      { id: 'result',              label: 'ResultView',              icon: <CheckCircleIcon size={13} /> },
      { id: 'cascader',            label: 'CascaderView',            icon: <ChevronRightIcon size={13} /> },
      { id: 'combobox',            label: 'ComboBoxView',            icon: <FilterIcon size={13} /> },
      { id: 'listview',            label: 'ListView',                icon: <LayersIcon size={13} /> },
      { id: 'virtualizedlist',     label: 'VirtualizedListView',     icon: <LayersIcon size={13} /> },
      { id: 'stickytableheader',   label: 'StickyTableHeaderView',   icon: <LayersIcon size={13} /> },
      { id: 'tablepagination',     label: 'TablePaginationView',     icon: <MoreHorizontalIcon size={13} /> },
      { id: 'filterbar',           label: 'FilterBarView',           icon: <FilterIcon size={13} /> },
      { id: 'sortableheader',      label: 'SortableHeaderView',      icon: <ChevronDownIcon size={13} /> },
      { id: 'editablecell',        label: 'EditableCellView',        icon: <DocumentIcon size={13} /> },
      { id: 'datagridtoolbar',     label: 'DataGridToolbarView',     icon: <SearchIcon size={13} /> },
      { id: 'columnvisibility',    label: 'ColumnVisibilityMenuView', icon: <LayersIcon size={13} /> },
    ],
  },
  {
    title: 'Advanced Selection',
    items: [
      { id: 'kbd',                 label: 'KbdView',                 icon: <TerminalIcon size={13} /> },
      { id: 'wizardstepper',       label: 'WizardStepperView',       icon: <LayersIcon size={13} /> },
      { id: 'accordiongroup',      label: 'AccordionGroupView',      icon: <ChevronRightIcon size={13} /> },
      { id: 'segmentedprogressbar', label: 'SegmentedProgressBarView', icon: <GaugeIcon size={13} /> },
      { id: 'checklist',           label: 'ChecklistView',           icon: <CheckIcon size={13} /> },
      { id: 'prioritypicker',      label: 'PriorityPickerView',      icon: <DotIcon size={13} /> },
      { id: 'tagcloud',            label: 'TagCloudView',            icon: <LayersIcon size={13} /> },
      { id: 'rangeslider',         label: 'RangeSliderView',         icon: <GaugeIcon size={13} /> },
      { id: 'votewidget',          label: 'VoteWidgetView',          icon: <ChevronDownIcon size={13} /> },
      { id: 'likebutton',          label: 'LikeButtonView',          icon: <SparkleIcon size={13} /> },
      { id: 'bookmarkbutton',      label: 'BookmarkButtonView',      icon: <SparkleIcon size={13} /> },
      { id: 'followbutton',        label: 'FollowButtonView',        icon: <PlusIcon size={13} /> },
      { id: 'shortcutrecorder',    label: 'ShortcutRecorderView',    icon: <TerminalIcon size={13} /> },
    ],
  },
  {
    title: 'Communication & Content',
    items: [
      { id: 'messagebubble',      label: 'MessageBubbleView',      icon: <DocumentIcon size={13} /> },
      { id: 'chatinput',          label: 'ChatInputView',          icon: <KeyIcon size={13} /> },
      { id: 'typingindicator',    label: 'TypingIndicatorView',    icon: <DotIcon size={13} /> },
      { id: 'commentthread',      label: 'CommentThreadView',      icon: <LayersIcon size={13} /> },
      { id: 'notificationcenter', label: 'NotificationCenterView', icon: <InfoCircleIcon size={13} /> },
      { id: 'alertdialog',        label: 'AlertDialogView',        icon: <PlusSquareIcon size={13} /> },
      { id: 'feedbackwidget',     label: 'FeedbackWidgetView',     icon: <CheckCircleIcon size={13} /> },
      { id: 'npssurvey',          label: 'NpsSurveyView',          icon: <GaugeIcon size={13} /> },
      { id: 'sharesheet',         label: 'ShareSheetView',         icon: <MoreHorizontalIcon size={13} /> },
      { id: 'contactcard',        label: 'ContactCardView',        icon: <DocumentIcon size={13} /> },
      { id: 'articlecard',        label: 'ArticleCardView',        icon: <DocumentIcon size={13} /> },
      { id: 'faqaccordion',       label: 'FaqAccordionView',       icon: <ChevronRightIcon size={13} /> },
      { id: 'messagebanner',      label: 'MessageBannerView',      icon: <InfoCircleIcon size={13} /> },
      { id: 'quoteblock',         label: 'QuoteBlockView',         icon: <DocumentIcon size={13} /> },
    ],
  },
  {
    title: 'Enterprise & Settings',
    items: [
      { id: 'settingsrow',           label: 'SettingsRowView',           icon: <SettingsIcon size={13} /> },
      { id: 'settingssection',       label: 'SettingsSectionView',       icon: <SettingsIcon size={13} /> },
      { id: 'onboardingchecklist',   label: 'OnboardingChecklistView',   icon: <CheckIcon size={13} /> },
      { id: 'keyvaluelist',          label: 'KeyValueListView',          icon: <FilterIcon size={13} /> },
      { id: 'environmentbadge',      label: 'EnvironmentBadgeView',      icon: <GlobeIcon size={13} /> },
      { id: 'versionbadge',          label: 'VersionBadgeView',          icon: <DotIcon size={13} /> },
      { id: 'licensebadge',          label: 'LicenseBadgeView',          icon: <SparkleIcon size={13} /> },
      { id: 'usagemeter',            label: 'UsageMeterView',            icon: <GaugeIcon size={13} /> },
      { id: 'permissionmatrix',      label: 'PermissionMatrixView',      icon: <LayersIcon size={13} /> },
      { id: 'auditlogrow',           label: 'AuditLogRowView',           icon: <DocumentIcon size={13} /> },
      { id: 'webhookstatus',         label: 'WebhookStatusView',         icon: <CheckCircleIcon size={13} /> },
      { id: 'apikeyrow',             label: 'ApiKeyRowView',             icon: <KeyIcon size={13} /> },
      { id: 'ratelimitmeter',        label: 'RateLimitMeterView',        icon: <GaugeIcon size={13} /> },
      { id: 'emptyinbox',            label: 'EmptyInboxView',            icon: <FolderIcon size={13} /> },
      { id: 'featurespotlightbadge', label: 'FeatureSpotlightBadgeView', icon: <SparkleIcon size={13} /> },
      { id: 'cookieconsentbanner',   label: 'CookieConsentBannerView',   icon: <InfoCircleIcon size={13} /> },
      { id: 'maintenancebanner',     label: 'MaintenanceBannerView',     icon: <InfoCircleIcon size={13} /> },
      { id: 'trialcountdownbanner',  label: 'TrialCountdownBannerView',  icon: <ClockIcon size={13} /> },
      { id: 'teammemberrow',         label: 'TeamMemberRowView',         icon: <SunIcon size={13} /> },
      { id: 'inviteinput',           label: 'InviteInputView',           icon: <KeyIcon size={13} /> },
      { id: 'roleselect',            label: 'RoleSelectView',            icon: <ChevronDownIcon size={13} /> },
      { id: 'integrationcard',       label: 'IntegrationCardView',       icon: <GlobeIcon size={13} /> },
      { id: 'statuspagerow',         label: 'StatusPageRowView',         icon: <CheckCircleIcon size={13} /> },
      { id: 'changelogentry',        label: 'ChangelogEntryView',        icon: <DocumentIcon size={13} /> },
    ],
  },
  {
    title: 'Media & Files',
    items: [
      { id: 'imagegallery',   label: 'ImageGalleryView',   icon: <ImageIcon size={13} /> },
      { id: 'imagecropper',   label: 'ImageCropperView',   icon: <ImageIcon size={13} /> },
      { id: 'videoplayer',    label: 'VideoPlayerView',    icon: <VideoIcon size={13} /> },
      { id: 'audiowaveform',  label: 'AudioWaveformView',  icon: <MusicIcon size={13} /> },
      { id: 'audioplayer',    label: 'AudioPlayerView',    icon: <MusicIcon size={13} /> },
      { id: 'pdfviewer',      label: 'PdfViewerView',      icon: <DocumentIcon size={13} /> },
      { id: 'fileicon',       label: 'FileIconView',       icon: <ArchiveIcon size={13} /> },
      { id: 'filelist',       label: 'FileListView',       icon: <ArchiveIcon size={13} /> },
      { id: 'draghandle',     label: 'DragHandleView',     icon: <MoreHorizontalIcon size={13} /> },
      { id: 'signaturepad',   label: 'SignaturePadView',   icon: <DocumentIcon size={13} /> },
      { id: 'barcode',        label: 'BarcodeView',        icon: <LayersIcon size={13} /> },
      { id: 'imagezoom',      label: 'ImageZoomView',      icon: <ImageIcon size={13} /> },
    ],
  },
  {
    title: 'Data Display & Wow',
    items: [
      { id: 'timeline',          label: 'TimelineView',          icon: <ClockIcon size={13} /> },
      { id: 'activityfeed',      label: 'ActivityFeedView',      icon: <LayersIcon size={13} /> },
      { id: 'kanbanboard',       label: 'KanbanBoardView',       icon: <LayersIcon size={13} /> },
      { id: 'sparkline',         label: 'SparklineView',         icon: <GaugeIcon size={13} /> },
      { id: 'heatmapcalendar',   label: 'HeatmapCalendarView',   icon: <CalendarIcon size={13} /> },
      { id: 'comparisonslider',  label: 'ComparisonSliderView',  icon: <ImageIcon size={13} /> },
      { id: 'carousel',          label: 'CarouselView',          icon: <ChevronRightIcon size={13} /> },
      { id: 'qrcode',            label: 'QRCodeView',            icon: <LayersIcon size={13} /> },
      { id: 'stattrendcard',     label: 'StatTrendCardView',     icon: <GaugeIcon size={13} /> },
      { id: 'pricingcard',       label: 'PricingCardView',       icon: <SparkleIcon size={13} /> },
      { id: 'testimonialcard',   label: 'TestimonialCardView',   icon: <HeartIcon size={13} /> },
      { id: 'ratingbreakdown',   label: 'RatingBreakdownView',   icon: <SparkleIcon size={13} /> },
      { id: 'treeselect',        label: 'TreeSelectView',        icon: <FolderIcon size={13} /> },
      { id: 'richtexttoolbar',   label: 'RichTextToolbarView',   icon: <CodeIcon size={13} /> },
      { id: 'mentioninput',      label: 'MentionInputView',      icon: <BookmarkIcon size={13} /> },
    ],
  },
  {
    title: 'Fun & Micro-interactions',
    items: [
      { id: 'gradienttext',        label: 'GradientTextView',        icon: <SparkleIcon size={13} /> },
      { id: 'typewritertext',      label: 'TypewriterTextView',      icon: <CodeIcon size={13} /> },
      { id: 'countupnumber',       label: 'CountUpNumberView',       icon: <GaugeIcon size={13} /> },
      { id: 'magneticbutton',      label: 'MagneticButtonView',      icon: <SparkleIcon size={13} /> },
      { id: 'tiltcard',            label: 'TiltCardView',            icon: <LayersIcon size={13} /> },
      { id: 'particlebackground',  label: 'ParticleBackgroundView',  icon: <SparkleIcon size={13} /> },
      { id: 'glowborder',          label: 'GlowBorderView',          icon: <SparkleIcon size={13} /> },
      { id: 'revealonscroll',      label: 'RevealOnScrollView',      icon: <ChevronDownIcon size={13} /> },
      { id: 'floatinglabelinput',  label: 'FloatingLabelInputView',  icon: <KeyIcon size={13} /> },
      { id: 'pulsedot',            label: 'PulseDotView',            icon: <DotIcon size={13} /> },
    ],
  },
  {
    title: 'DUI Signature Series',
    items: [
      { id: 'requestflow',           label: 'RequestFlowView',           icon: <NetworkIcon size={13} /> },
      { id: 'latencypulse',          label: 'LatencyPulseView',          icon: <GaugeIcon size={13} /> },
      { id: 'aistreamingtext',       label: 'AIStreamingTextView',       icon: <SparkleIcon size={13} /> },
      { id: 'commandorb',            label: 'CommandOrbView',            icon: <SparkleIcon size={13} /> },
      { id: 'timetravelslider',      label: 'TimeTravelSliderView',      icon: <ClockIcon size={13} /> },
      { id: 'diffmorph',             label: 'DiffMorphView',             icon: <CodeIcon size={13} /> },
      { id: 'schemablueprint',       label: 'SchemaBlueprintView',       icon: <CodeBracketsIcon size={13} /> },
      { id: 'livecursorpresence',    label: 'LiveCursorPresenceView',    icon: <LayersIcon size={13} /> },
      { id: 'undoredotimeline',      label: 'UndoRedoTimelineView',      icon: <RefreshIcon size={13} /> },
      { id: 'dialknobinput',         label: 'DialKnobInputView',         icon: <GaugeIcon size={13} /> },
      { id: 'holdtoconfirm',         label: 'HoldToConfirmView',         icon: <CheckCircleIcon size={13} /> },
      { id: 'morphingiconbutton',    label: 'MorphingIconButtonView',    icon: <RefreshIcon size={13} /> },
      { id: 'stackedswipecard',      label: 'StackedSwipeCardView',      icon: <LayersIcon size={13} /> },
      { id: 'networkweather',        label: 'NetworkWeatherView',        icon: <GlobeIcon size={13} /> },
      { id: 'constellationloader',   label: 'ConstellationLoaderView',   icon: <SparkleIcon size={13} /> },
      { id: 'holocard',              label: 'HoloCardView',              icon: <SparkleIcon size={13} /> },
      { id: 'ghosttypingplaceholder', label: 'GhostTypingPlaceholderView', icon: <SearchIcon size={13} /> },
      { id: 'connectionpulseline',   label: 'ConnectionPulseLineView',   icon: <NetworkIcon size={13} /> },
      { id: 'stackedtoastdeck',      label: 'StackedToastDeckView',      icon: <LayersIcon size={13} /> },
      { id: 'pathreveal',            label: 'PathRevealView',            icon: <CodeIcon size={13} /> },
      { id: 'spectrumslider',        label: 'SpectrumSliderView',        icon: <GaugeIcon size={13} /> },
      { id: 'breathingloader',       label: 'BreathingLoaderView',       icon: <DotIcon size={13} /> },
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

const NAV_ITEMS: SideNavItem[] = [
  /* A plain row above the groups, deliberately outside SIDEBAR_GROUPS: the
     count in the header and the catalog the capture scripts read are both
     derived from that list, and Home is a page rather than a component. */
  { id: 'home', label: 'Home', icon: <SparkleIcon size={13} /> },
  ...SIDEBAR_GROUPS.map(g => ({
    id: g.title,
    label: g.title,
    isGroup: true,
    count: g.items.length,
    children: g.items.map(i => ({ id: i.id, label: i.label, icon: i.icon })),
  })),
];

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

/**
 * One panel's content, fetched the first time somebody looks at it.
 *
 * Every live view, example set and props table used to be imported at the top
 * of this file — around seven hundred static imports — so opening the showcase
 * downloaded all 238 components before it could draw the one you asked for.
 *
 * `slot` defers that. The import runs when the panel is first rendered, and
 * React caches the result, so switching away and back does not fetch again.
 *
 * The `.then(m => m.X)` is the awkward part: these modules use named exports
 * and `React.lazy` wants a default, so each one is unwrapped into the shape it
 * expects. `as never` because the named export is typed by its own props and
 * every slot here is rendered without any.
 */
function slot(load: () => Promise<ComponentType<never>>): ComponentType {
  return lazy(() => load().then(C => ({ default: C as ComponentType })));
}

/**
 * What sits in a panel while its chunk is in flight.
 *
 * Deliberately a fixed height rather than a spinner: a panel that collapses to
 * nothing and then springs open shifts everything under it, and on a fast
 * connection the whole thing is over in under a frame anyway.
 *
 * `data-panel-pending` is how the screenshot and demo-video runs know to wait.
 * They used to settle for a fixed number of milliseconds after switching
 * panels, which was fine when every component was already in the bundle and is
 * not now — a chunk that arrives a beat late would otherwise be photographed
 * as the word "Loading…". Waiting for this marker to leave the DOM is exact,
 * and it is faster than the timeout it replaces.
 */
function PanelPending() {
  return (
    <div
      data-panel-pending
      style={{
        minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, color: 'var(--color-text-muted)',
      }}
    >
      Loading…
    </div>
  );
}


const PANELS: Record<CategoryId, {
  title: string;
  desc: string;
  /* Components rather than elements: nothing is built until it is shown. */
  liveContent: ComponentType;
  examples?: ComponentType;
  docs?: ComponentType;
  vars?: LiveColorVar[];
  code?: string;
  noExamplesHeader?: boolean;
}> = {
  /* The body is rendered specially — no breadcrumb, no tabs — so only the
     title and description here are used, by the document title and nothing
     else. `liveContent` is required by the type and never drawn. */
  badgechip:         { title: 'BadgeChipView',          desc: 'The pill that labels a thing — fifty skins, chosen by `variant` or set for the whole product by DuiProvider.', vars: VARS_ACCENT, liveContent: slot(() => import('./components/badgechip/examples/BadgeChipViewExamples').then(m => m.BadgeChipViewExamples)), examples: slot(() => import('./components/badgechip/examples/BadgeChipViewExamples').then(m => m.BadgeChipViewExamples)), docs: slot(() => import('./components/badgechip/docs/BadgeChipViewDocs').then(m => m.BadgeChipViewDocs)), noExamplesHeader: true, code: `<BadgeChipView variant="github-label" tone="var(--color-success)">200 OK</BadgeChipView>` },
  home:              { title: 'DUI',                    desc: 'The component library behind daakia and ck8t.', liveContent: slot(() => import('./panels/HomePanel').then(m => m.HomePanel)), noExamplesHeader: true },
  chips:             { title: 'ChipView',              desc: 'Colored badge chips for methods, protocols, status codes, filter tags.',            vars: VARS_CHIP,       liveContent: slot(() => import('./components/chipsview/live/ChipsViewLive').then(m => m.ChipsViewLive)), examples: slot(() => import('./components/chipsview/examples/ChipsViewExamples').then(m => m.ChipsViewExamples)), docs: slot(() => import('./components/chipsview/docs/ChipsViewDocs').then(m => m.ChipsViewDocs)),             code: `<ChipView label="GET"  color="var(--color-success)" />\n<ChipView label="POST" color="var(--color-primary)" />\n<ChipView label="404"  color="var(--color-error)"   size="sm" />\n<ChipView label="beta" color="var(--color-warning)"  size="xs" />` },
  textinput:         { title: 'TextInputView',          desc: 'Standard text input — sizes match ButtonView and SelectInputView exactly.',         vars: VARS_INPUT,      liveContent: slot(() => import('./components/textinputview/live/TextInputViewLive').then(m => m.TextInputViewLive)), examples: slot(() => import('./components/textinputview/examples/TextInputViewExamples').then(m => m.TextInputViewExamples)), docs: slot(() => import('./components/textinputview/docs/TextInputViewDocs').then(m => m.TextInputViewDocs)),         code: `function Preview() {\n  const [val, setVal] = useState('');\n  return (\n    <TextInputView\n      placeholder="Enter URL…"\n      value={val}\n      onChange={e => setVal(e.target.value)}\n      size="md"\n      iconLeft={<GlobeIcon size={13} />}\n      style={{ width: 260 }}\n    />\n  );\n}` },
  selecttextinput:   { title: 'SelectTextInputView',    desc: 'Combined method selector + URL input in one bordered pill — URL bar pattern.',  vars: VARS_INPUT,  liveContent: slot(() => import('./components/selecttextinputview/live/SelectTextInputViewLive').then(m => m.SelectTextInputViewLive)), examples: slot(() => import('./components/selecttextinputview/examples/SelectTextInputViewExamples').then(m => m.SelectTextInputViewExamples)), docs: slot(() => import('./components/selecttextinputview/docs/SelectTextInputViewDocs').then(m => m.SelectTextInputViewDocs)),   code: `function Preview() {\n  const [method, setMethod] = useState('GET');\n  const [url, setUrl] = useState('https://api.example.com/users');\n  const opts = [\n    { value: 'GET',    label: 'GET',    color: 'var(--color-method-get)' },\n    { value: 'POST',   label: 'POST',   color: 'var(--color-method-post)' },\n    { value: 'DELETE', label: 'DELETE', color: 'var(--color-method-delete)' },\n  ];\n  return (\n    <SelectTextInputView\n      selectValue={method}\n      selectOptions={opts}\n      onSelectChange={setMethod}\n      inputValue={url}\n      onInputChange={setUrl}\n      placeholder="Enter URL or paste text"\n    />\n  );\n}` },
  selectinput:       { title: 'SelectInputView',        desc: 'Portal dropdown with keyboard nav — replaces all StyledDropdown usages.',           vars: VARS_INPUT,      liveContent: slot(() => import('./components/selectinputview/live/SelectInputViewLive').then(m => m.SelectInputViewLive)), examples: slot(() => import('./components/selectinputview/examples/SelectInputViewExamples').then(m => m.SelectInputViewExamples)), docs: slot(() => import('./components/selectinputview/docs/SelectInputViewDocs').then(m => m.SelectInputViewDocs)),       code: `function Preview() {\n  const [method, setMethod] = useState('GET');\n  const options = [\n    { value: 'GET',    label: 'GET',    color: 'var(--color-method-get)' },\n    { value: 'POST',   label: 'POST',   color: 'var(--color-method-post)' },\n    { value: 'DELETE', label: 'DELETE', color: 'var(--color-method-delete)' },\n  ];\n  return (\n    <SelectInputView\n      value={method}\n      options={options}\n      onChange={setMethod}\n      size="md"\n      style={{ width: 130 }}\n    />\n  );\n}` },
  button:            { title: 'ButtonView',             desc: 'Standard button — primary / secondary / ghost / danger — all sizes.',              vars: VARS_BTN,        liveContent: slot(() => import('./components/buttonview/live/ButtonViewLive').then(m => m.ButtonViewLive)), examples: slot(() => import('./components/buttonview/examples/ButtonViewExamples').then(m => m.ButtonViewExamples)), docs: slot(() => import('./components/buttonview/docs/ButtonViewDocs').then(m => m.ButtonViewDocs)),            code: `<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>\n  <ButtonView label="Send Request" variant="primary" size="md" onClick={send} />\n  <ButtonView label="Cancel"       variant="ghost"   size="md" onClick={cancel} />\n  <ButtonView label="Delete"       variant="danger"  size="sm" onClick={del} />\n</div>` },
  iconbutton:        { title: 'IconButtonView',         desc: 'Square icon-only buttons — ghost / filled — toggle support — all sizes.',          vars: VARS_ICONBTN,    liveContent: slot(() => import('./components/iconbuttonview/live/IconButtonViewLive').then(m => m.IconButtonViewLive)), examples: slot(() => import('./components/iconbuttonview/examples/IconButtonViewExamples').then(m => m.IconButtonViewExamples)), docs: slot(() => import('./components/iconbuttonview/docs/IconButtonViewDocs').then(m => m.IconButtonViewDocs)),        code: `function Preview() {\n  const [copied, setCopied] = useState(false);\n  const handleClick = () => {\n    setCopied(true);\n    setTimeout(() => setCopied(false), 1500);\n  };\n  return (\n    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>\n      <IconButtonView\n        icon={copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}\n        variant="ghost"\n        size="sm"\n        title={copied ? 'Copied!' : 'Copy'}\n        onClick={handleClick}\n        active={copied}\n      />\n    </div>\n  );\n}` },
  dropdownbutton:    { title: 'DropDownButtonView',     desc: 'Split button — primary action + chevron dropdown — Save as, Export as, etc.',      vars: VARS_BTN,        liveContent: slot(() => import('./components/dropdownbuttonview/live/DropDownButtonViewLive').then(m => m.DropDownButtonViewLive)), examples: slot(() => import('./components/dropdownbuttonview/examples/DropDownButtonViewExamples').then(m => m.DropDownButtonViewExamples)), docs: slot(() => import('./components/dropdownbuttonview/docs/DropDownButtonViewDocs').then(m => m.DropDownButtonViewDocs)),    code: `<DropDownButtonView\n  label="Save"\n  onClick={save}\n  items={[\n    { label: 'Save as JSON', onClick: saveJson },\n    { label: 'Save as YAML', onClick: saveYaml },\n  ]}\n/>` },
  contextmenu:       { title: 'ContextMenuView',        desc: 'Recursive context menu with submenus — portal rendered — collection tree style.',   vars: VARS_ACCENT,     liveContent: slot(() => import('./components/contextmenuview/live/ContextMenuViewLive').then(m => m.ContextMenuViewLive)), examples: slot(() => import('./components/contextmenuview/examples/ContextMenuViewExamples').then(m => m.ContextMenuViewExamples)), docs: slot(() => import('./components/contextmenuview/docs/ContextMenuViewDocs').then(m => m.ContextMenuViewDocs)),       code: `function Preview() {\n  const [anchor, setAnchor] = useState(null);\n  const [open, setOpen] = useState(false);\n  return (\n    <div>\n      <ButtonView\n        variant="secondary"\n        onClick={e => { setAnchor(e.currentTarget); setOpen(true); }}\n      >\n        Open context menu\n      </ButtonView>\n      <ContextMenuView\n        anchorEl={anchor}\n        open={open}\n        onClose={() => setOpen(false)}\n        items={[\n          { id: 'new',    label: 'New Request', icon: <PlusIcon size={13} />, onClick: () => {} },\n          { id: 'delete', label: 'Delete',      icon: <TrashIcon size={13} />, danger: true, onClick: () => {} },\n        ]}\n      />\n    </div>\n  );\n}` },
  tabs:              { title: 'TabView',                desc: 'pill · underline variants — sliding indicator, badges, dots — all with accentColor.',  vars: VARS_PILLTAB,   liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.TabsPanel)), examples: slot(() => import('./components/tabview/examples/TabViewExamples').then(m => m.TabViewExamples)), docs: slot(() => import('./components/tabview/docs/TabViewDocs').then(m => m.TabViewDocs)),              code: `function Preview() {\n  const [active, setActive] = useState('params');\n  return (\n    <TabView\n      variant="pill"\n      tabs={[\n        { id: 'params',  label: 'Params',  badge: 2 },\n        { id: 'headers', label: 'Headers', badge: 4 },\n        { id: 'body',    label: 'Body' },\n        { id: 'auth',    label: 'Auth', dot: true, dotColor: 'var(--color-success)' },\n      ]}\n      activeTab={active}\n      onChange={setActive}\n    />\n  );\n}` },
  tabbar:            { title: 'TabBarView',             desc: 'Editor-style protocol tab bar — store-free, drag-free, scroll arrows, dirty dot.', vars: VARS_ACCENT,     liveContent: slot(() => import('./components/tabbarview/live/TabBarViewLive').then(m => m.TabBarViewLive)), examples: slot(() => import('./components/tabbarview/examples/TabBarViewExamples').then(m => m.TabBarViewExamples)), docs: slot(() => import('./components/tabbarview/docs/TabBarViewDocs').then(m => m.TabBarViewDocs)),            code: `function Preview() {\n  const [tabs, setTabs] = useState([\n    { id: '1', label: 'GET /users', type: 'request', protocol: 'rest',    method: 'GET' },\n    { id: '2', label: 'getUsers',   type: 'request', protocol: 'graphql' },\n  ]);\n  const [activeId, setActiveId] = useState('1');\n  return (\n    <TabBarView\n      tabs={tabs}\n      activeTabId={activeId}\n      onTabClick={setActiveId}\n      onTabClose={id => setTabs(t => t.filter(x => x.id !== id))}\n      onAddTab={() => {}}\n      accentColor="var(--color-protocol-rest)"\n    />\n  );\n}` },
  editor:            { title: 'EditorView',             desc: 'Monaco editor wrapper — simplified props — JSON / GQL / XML / YAML etc.',           vars: VARS_ACCENT,     liveContent: slot(() => import('./components/editorview/live/EditorViewLive').then(m => m.EditorViewLive)), examples: slot(() => import('./components/editorview/examples/EditorViewExamples').then(m => m.EditorViewExamples)), docs: slot(() => import('./components/editorview/docs/EditorViewDocs').then(m => m.EditorViewDocs)),            code: `function Preview() {\n  const [body, setBody] = useState('{ "name": "Alice", "role": "admin" }');\n  return (\n    <EditorView\n      value={body}\n      onChange={setBody}\n      language="json"\n      height={300}\n      readOnly={false}\n    />\n  );\n}` },
  patterns:          { title: 'Real-world Patterns',    desc: 'How DUI components assemble into actual Daakia UI — URL bar · tabs · tree.',        liveContent: slot(() => import('./components/patterns/live/PatternsLive').then(m => m.PatternsLive)), examples: slot(() => import('./components/patterns/examples/PatternsExamples').then(m => m.PatternsExamples)), docs: slot(() => import('./components/patterns/docs/PatternsDocs').then(m => m.PatternsDocs)), noExamplesHeader: true },
  toggle:            { title: 'ToggleSwitchView',       desc: 'On/off toggle with sm/md/lg sizes, accent color, label positions, disabled state.', vars: VARS_TOGGLE,     liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ToggleSwitchPanel)), examples: slot(() => import('./components/toggleswitchview/examples/ToggleSwitchViewExamples').then(m => m.ToggleSwitchViewExamples)), docs: slot(() => import('./components/toggleswitchview/docs/ToggleSwitchViewDocs').then(m => m.ToggleSwitchViewDocs)),      code: `function Preview() {\n  const [enabled, setEnabled] = useState(true);\n  return (\n    <ToggleSwitchView\n      checked={enabled}\n      onChange={setEnabled}\n      label="Enable SSL"\n      size="md"\n    />\n  );\n}` },
  checkbox:          { title: 'CheckboxView',           desc: 'Checkbox — checked / unchecked / indeterminate / disabled — with accent colors.',   vars: VARS_ACCENT,     liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.CheckboxPanel)), examples: slot(() => import('./components/checkboxview/examples/CheckboxViewExamples').then(m => m.CheckboxViewExamples)), docs: slot(() => import('./components/checkboxview/docs/CheckboxViewDocs').then(m => m.CheckboxViewDocs)),          code: `function Preview() {\n  const [checked, setChecked] = useState(false);\n  return (\n    <CheckboxView\n      checked={checked}\n      onChange={setChecked}\n      label="Include auth headers"\n    />\n  );\n}` },
  modal:             { title: 'ModalView',              desc: 'Configurable modal — sm/md/lg/xl — never closes on backdrop click.',                vars: VARS_MODAL,      liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ModalPanel)), examples: slot(() => import('./components/modalview/examples/ModalViewExamples').then(m => m.ModalViewExamples)), docs: slot(() => import('./components/modalview/docs/ModalViewDocs').then(m => m.ModalViewDocs)),             code: `function Preview() {\n  const [isOpen, setIsOpen] = useState(false);\n  return (\n    <div>\n      <ButtonView variant="danger" size="sm" onClick={() => setIsOpen(true)}>\n        Delete Collection\n      </ButtonView>\n      <ModalView\n        open={isOpen}\n        onClose={() => setIsOpen(false)}\n        title="Confirm Delete"\n        size="sm"\n      >\n        <p>Are you sure?</p>\n        <ButtonView label="Delete" variant="danger" onClick={() => setIsOpen(false)} />\n      </ModalView>\n    </div>\n  );\n}` },
  loader:            { title: 'LoaderView',             desc: 'Loading states — spinner · dots · skeleton · pulse · progress-bar.',               vars: VARS_LOADER,     liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.LoaderPanel)), examples: slot(() => import('./components/loaderview/examples/LoaderViewExamples').then(m => m.LoaderViewExamples)), docs: slot(() => import('./components/loaderview/docs/LoaderViewDocs').then(m => m.LoaderViewDocs)),            code: `<LoaderView variant="spinner" size="md" />\n<LoaderView variant="dots"    size="sm" />\n<LoaderView variant="skeleton" width={240} height={16} />` },
  emptystate:        { title: 'EmptyStateView',         desc: 'Empty state placeholder with icon, title, message, and optional CTA button.',       vars: VARS_EMPTY,      liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.EmptyStatePanel)), examples: slot(() => import('./components/emptystateview/examples/EmptyStateViewExamples').then(m => m.EmptyStateViewExamples)), docs: slot(() => import('./components/emptystateview/docs/EmptyStateViewDocs').then(m => m.EmptyStateViewDocs)),        code: `<EmptyStateView\n  icon={<FolderIcon size={32} />}\n  title="No collections yet"\n  message="Create your first collection to get started."\n  action={{ label: 'New Collection', onClick: create }}\n/>` },
  statusindicator:   { title: 'StatusIndicatorView',    desc: 'Connection status dot — idle · connecting · connected · disconnected · error.',     vars: VARS_STATUS,     liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.StatusIndicatorPanel)), examples: slot(() => import('./components/statusindicatorview/examples/StatusIndicatorViewExamples').then(m => m.StatusIndicatorViewExamples)), docs: slot(() => import('./components/statusindicatorview/docs/StatusIndicatorViewDocs').then(m => m.StatusIndicatorViewDocs)),   code: `<StatusIndicatorView status="connected"    label="Connected" />\n<StatusIndicatorView status="connecting"  label="Connecting…" />\n<StatusIndicatorView status="error"       label="Connection failed" />` },
  infopopup:         { title: 'InfoPopupView',          desc: 'Help popup anchored near a ? icon — title · items · footer · wiki link.',          vars: VARS_ACCENT,     liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.InfoPopupPanel)), examples: slot(() => import('./components/infopopupview/examples/InfoPopupViewExamples').then(m => m.InfoPopupViewExamples)), docs: slot(() => import('./components/infopopupview/docs/InfoPopupViewDocs').then(m => m.InfoPopupViewDocs)),         code: `function Preview() {\n  const [isOpen, setIsOpen] = useState(false);\n  const [anchor, setAnchor] = useState(null);\n  return (\n    <span ref={setAnchor}>\n      <ButtonView onClick={() => setIsOpen(true)}>Show info</ButtonView>\n      <InfoPopupView\n        open={isOpen}\n        onClose={() => setIsOpen(false)}\n        anchorEl={anchor}\n        title="Bearer Token"\n        description="Sent as the Authorization header on every request."\n      />\n    </span>\n  );\n}` },
  resizablepanel:    { title: 'ResizablePanelView',     desc: 'Single-pane panel with bottom-edge drag handle to resize height — no store dependency.', vars: VARS_RESIZE, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ResizablePanelPanel)), examples: slot(() => import('./components/resizablepanelview/examples/ResizablePanelViewExamples').then(m => m.ResizablePanelViewExamples)), docs: slot(() => import('./components/resizablepanelview/docs/ResizablePanelViewDocs').then(m => m.ResizablePanelViewDocs)),   code: `<ResizablePanelView defaultHeight={200} minHeight={80} maxHeight={400}>
  <div style={{ padding: 12 }}>Resizable content goes here.</div>
</ResizablePanelView>` },
  splitpanel:        { title: 'SplitPanelView',         desc: 'Split-pane container — horizontal or vertical — drag pill, double-click to reset.',  vars: VARS_RESIZE,    liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.SplitPanelPanel)), examples: slot(() => import('./components/splitpanelview/examples/SplitPanelViewExamples').then(m => m.SplitPanelViewExamples)), docs: slot(() => import('./components/splitpanelview/docs/SplitPanelViewDocs').then(m => m.SplitPanelViewDocs)),        code: `<SplitPanelView
  direction="vertical"
  defaultSplit={60}
  first={<div style={{ padding: 12 }}>Request</div>}
  second={<div style={{ padding: 12 }}>Response</div>}
/>` },
  dottedcard:        { title: 'DottedCardView',         desc: 'Dotted-border expandable card — useful for optional config sections.',              vars: VARS_ACCENT,     liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.DottedCardPanel)), examples: slot(() => import('./components/dottedcardview/examples/DottedCardViewExamples').then(m => m.DottedCardViewExamples)), docs: slot(() => import('./components/dottedcardview/docs/DottedCardViewDocs').then(m => m.DottedCardViewDocs)),        code: `<DottedCardView title="Advanced Options">\n  <TextInputView placeholder="Proxy URL" />\n</DottedCardView>` },
  coloredtext:       { title: 'ColoredTextView',        desc: 'Token-colored text — HTTP status lines, gRPC codes, SOAP faults.',                  vars: VARS_STATUS,     liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ColoredTextPanel)), examples: slot(() => import('./components/coloredtextview/examples/ColoredTextViewExamples').then(m => m.ColoredTextViewExamples)), docs: slot(() => import('./components/coloredtextview/docs/ColoredTextViewDocs').then(m => m.ColoredTextViewDocs)),       code: `<ColoredTextView\n  tokens={[\n    { text: '200', color: 'success' },\n    { text: ' OK', color: 'muted' },\n  ]}\n/>` },
  statscard:         { title: 'StatsCardView',          desc: 'Colorful metric card — value, unit, trend (up/down/neutral), subValue.',            vars: VARS_STATSCARD,  liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.StatsCardPanel)), examples: slot(() => import('./components/statscardview/examples/StatsCardViewExamples').then(m => m.StatsCardViewExamples)), docs: slot(() => import('./components/statscardview/docs/StatsCardViewDocs').then(m => m.StatsCardViewDocs)),         code: `<StatsCardView\n  label="Response Time"\n  value="142"\n  unit="ms"\n  trend="down"\n  color="var(--color-success)"\n/>` },
  datatable:         { title: 'DataTableView',          desc: 'Generic sortable table — columns, striped rows, empty state, row click.',           vars: VARS_TABLE,      liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.DataTablePanel)), examples: slot(() => import('./components/datatableview/examples/DataTableViewExamples').then(m => m.DataTableViewExamples)), docs: slot(() => import('./components/datatableview/docs/DataTableViewDocs').then(m => m.DataTableViewDocs)),         code: `<DataTableView\n  columns={[{ key: 'name', label: 'Name', sortable: true }]}\n  rows={requests}\n  keyField="name"\n/>` },
  codeblock:         { title: 'CodeBlockView',          desc: 'Read-only code block — language label, copy button, optional line numbers.',        vars: VARS_CODE,       liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.CodeBlockPanel)), examples: slot(() => import('./components/codeblockview/examples/CodeBlockViewExamples').then(m => m.CodeBlockViewExamples)), docs: slot(() => import('./components/codeblockview/docs/CodeBlockViewDocs').then(m => m.CodeBlockViewDocs)),         code: `<CodeBlockView\n  language="json"\n  code={responseBody}\n  showLineNumbers\n  showCopy\n/>` },
  aibutton:          { title: 'AIButtonView',           desc: 'AI action button — generate · fuzz · explain · fix · ask · suggest — loading state.', vars: VARS_AIBTN,   liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.AIButtonPanel)), examples: slot(() => import('./components/aibuttonview/examples/AIButtonViewExamples').then(m => m.AIButtonViewExamples)), docs: slot(() => import('./components/aibuttonview/docs/AIButtonViewDocs').then(m => m.AIButtonViewDocs)),          code: `function Preview() {\n  const [loading, setLoading] = useState(false);\n  const handleClick = () => { setLoading(true); setTimeout(() => setLoading(false), 1200); };\n  return <AIButtonView action="generate" onClick={handleClick} loading={loading} />;\n}` },
  sidenav:           { title: 'SideNavView',            desc: 'Collapsible left sidebar nav with nested items and icon-only collapse mode.',        vars: VARS_SIDENAV,    liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.SideNavPanel)), examples: slot(() => import('./components/sidenavview/examples/SideNavViewExamples').then(m => m.SideNavViewExamples)), docs: slot(() => import('./components/sidenavview/docs/SideNavViewDocs').then(m => m.SideNavViewDocs)),           code: `function Preview() {\n  const navItems = [{ id: 'requests', label: 'Requests' }, { id: 'environments', label: 'Environments' }];\n  const [activeId, setActiveId] = useState('requests');\n  return <SideNavView items={navItems} activeId={activeId} onSelect={setActiveId} />;\n}` },
  settingsnav:       { title: 'SettingsNavView',        desc: 'Settings-style grouped nav with badges, descriptions, active state.',               vars: VARS_SIDENAV,    liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.SettingsNavPanel)), examples: slot(() => import('./components/settingsnavview/examples/SettingsNavViewExamples').then(m => m.SettingsNavViewExamples)), docs: slot(() => import('./components/settingsnavview/docs/SettingsNavViewDocs').then(m => m.SettingsNavViewDocs)),       code: `function Preview() {\n  const settingsGroups = [{ id: 'general', title: 'General', items: [{ id: 'profile', label: 'Profile' }] }];\n  const [activeId, setActiveId] = useState('profile');\n  return <SettingsNavView groups={settingsGroups} activeId={activeId} onSelect={setActiveId} />;\n}` },
  themecardselector: { title: 'ThemeCardSelectorView',  desc: 'Card-based theme picker with color swatch previews and checkmark selection.',        vars: VARS_ACCENT,     liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ThemeCardSelectorPanel)), examples: slot(() => import('./components/themecardselectorview/examples/ThemeCardSelectorViewExamples').then(m => m.ThemeCardSelectorViewExamples)), docs: slot(() => import('./components/themecardselectorview/docs/ThemeCardSelectorViewDocs').then(m => m.ThemeCardSelectorViewDocs)), code: `function Preview() {\n  const themes = [{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }];\n  const [selectedTheme, setSelectedTheme] = useState('dark');\n  return <ThemeCardSelectorView options={themes} value={selectedTheme} onChange={setSelectedTheme} />;\n}` },
  featurecategory:   { title: 'FeatureCategoryView',    desc: 'Expandable feature category with toggle switches and enabled count badge.',          vars: VARS_TOGGLE,     liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.FeatureCategoryPanel)), examples: slot(() => import('./components/featurecategoryview/examples/FeatureCategoryViewExamples').then(m => m.FeatureCategoryViewExamples)), docs: slot(() => import('./components/featurecategoryview/docs/FeatureCategoryViewDocs').then(m => m.FeatureCategoryViewDocs)),   code: `function Preview() {\n  const [features, setFeatures] = useState([{ id: 'autocomplete', label: 'Autocomplete', enabled: true }, { id: 'explain', label: 'Explain response', enabled: false }]);\n  const toggle = id => setFeatures(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));\n  return <FeatureCategoryView categoryLabel="AI Features" features={features} onToggle={toggle} />;\n}` },
  taginput:          { title: 'TagInputView',           desc: 'Multi-value tag input — Enter or comma to add, Backspace to remove.',               vars: VARS_TAG,        liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.TagInputPanel)), examples: slot(() => import('./components/taginputview/examples/TagInputViewExamples').then(m => m.TagInputViewExamples)), docs: slot(() => import('./components/taginputview/docs/TagInputViewDocs').then(m => m.TagInputViewDocs)),          code: `<TagInputView\n  tags={tags}\n  onChange={setTags}\n  placeholder="Add tag…"\n/>` },
  bottompanel:       { title: 'BottomPanelView',        desc: 'DevTools-style resizable bottom panel with tab bar and collapse toggle.',            vars: VARS_ACCENT,     liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.BottomPanelPanel)), examples: slot(() => import('./components/bottompanelview/examples/BottomPanelViewExamples').then(m => m.BottomPanelViewExamples)), docs: slot(() => import('./components/bottompanelview/docs/BottomPanelViewDocs').then(m => m.BottomPanelViewDocs)),       code: `<BottomPanelView tabs={[{ id: 'console', label: 'Console', content: <div style={{ padding: 12 }}>Logs appear here.</div> }]} minHeight={120} />` },
  toast:             { title: 'ToastView',              desc: 'Toast notification stack — success · error · warning · info — auto-dismiss.',        vars: VARS_STATUS,     liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ToastPanel)), examples: slot(() => import('./components/toastview/examples/ToastViewExamples').then(m => m.ToastViewExamples)), docs: slot(() => import('./components/toastview/docs/ToastViewDocs').then(m => m.ToastViewDocs)),             code: `function Preview() {\n  const [toasts, setToasts] = useState([]);\n  const show = () => setToasts(prev => [...prev, { id: String(Date.now()), variant: 'success', title: 'Saved!' }]);\n  return (\n    <>\n      <ButtonView onClick={show}>Show toast</ButtonView>\n      <ToastView toasts={toasts} onDismiss={id => setToasts(prev => prev.filter(t => t.id !== id))} position="bottom-right" />\n    </>\n  );\n}` },
  promptcard:        { title: 'PromptCardView',         desc: 'Single prompt library row card — colored avatar initials, title, description, protocol badge, CUSTOM badge, hover actions.',  vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.PromptCardPanel)), examples: slot(() => import('./components/promptcardview/examples/PromptCardViewExamples').then(m => m.PromptCardViewExamples)), docs: slot(() => import('./components/promptcardview/docs/PromptCardViewDocs').then(m => m.PromptCardViewDocs)), code: `function Preview() {\n  const handleUse = () => {};\n  return (\n    <PromptCardView\n      id="p1"\n      title="REST API Agent"\n      description="Builds structured HTTP requests"\n      protocol="REST"\n      protocolColor="var(--color-protocol-rest)"\n      onUse={handleUse}\n    />\n  );\n}` },
  promptlibrary:     { title: 'PromptLibraryView',      desc: 'Full Prompt Library panel — list (search + sections + categories) + editor (avatar header + tabs + preview/edit toggle + save).',  liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.PromptLibraryPanel)), examples: slot(() => import('./components/promptlibraryview/examples/PromptLibraryViewExamples').then(m => m.PromptLibraryViewExamples)), docs: slot(() => import('./components/promptlibraryview/docs/PromptLibraryViewDocs').then(m => m.PromptLibraryViewDocs)), code: `function Preview() {\n  const data = [{ id: 's1', title: 'REST', prompts: [{ id: 'p1', title: 'List Users' }] }];\n  const [id, setId] = useState('p1');\n  const [text, setText] = useState('Fetch all users from /api/users');\n  return (\n    <>\n      <PromptLibraryListView sections={data} activeId={id} onSelect={setId} />\n      <PromptLibraryEditorView content={text} onContentChange={setText} />\n    </>\n  );\n}` },
  stageview:         { title: 'StageCheck / StageSpin / StagePulse', desc: 'Step-level status indicators — completed (check), active (spin), pending (pulse) — for multi-step pipelines and request flows.', vars: VARS_STAGE, liveContent: slot(() => import('./components/stageview/live/StageViewLive').then(m => m.StageViewLive)), examples: slot(() => import('./components/stageview/examples/StageViewExamples').then(m => m.StageViewExamples)), docs: slot(() => import('./components/stageview/docs/StageViewDocs').then(m => m.StageViewDocs)), code: `<StageCheck label="Auth verified"   sublabel="Token valid" />\n<StageSpin  label="Sending request" sublabel="Waiting…" />\n<StagePulse label="Parse response"  sublabel="Queued" />` },
  iconsgallery:      { title: 'Icons Gallery',          desc: 'All Daakia icons — searchable by name — click to copy icon name.',                   liveContent: slot(() => import('./panels/IconsGalleryPanel').then(m => m.IconsGalleryPanel)), examples: slot(() => import('./components/iconsgallery/examples/IconsGalleryExamples').then(m => m.IconsGalleryExamples)), docs: slot(() => import('./components/iconsgallery/docs/IconsGalleryDocs').then(m => m.IconsGalleryDocs)), noExamplesHeader: true },
  themeconfig:       { title: 'Theme Customization',    desc: 'Export / upload YAML theme files — all 63 CSS color vars, live hot-swap, no rebuild.', liveContent: slot(() => import('./panels/ThemeCustomizationPanel').then(m => m.ThemeCustomizationPanel)), noExamplesHeader: true },
  themeaddvar:       { title: 'Add Theme Variable',     desc: 'Step-by-step guide: register a new CSS color variable in SCHEMA, declare it in index.css, use it in any DUI component, and test it live.', liveContent: slot(() => import('./panels/ThemeAddVarGuidePanel').then(m => m.ThemeAddVarGuidePanel)), noExamplesHeader: true },
  searchinput:       { title: 'SearchInputView',        desc: 'URL-bar style search input with optional prefix icon and suffix clear button.',        vars: VARS_INPUT,      liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.SearchInputPanel)), examples: slot(() => import('./components/searchinputview/examples/SearchInputViewExamples').then(m => m.SearchInputViewExamples)), docs: slot(() => import('./components/searchinputview/docs/SearchInputViewDocs').then(m => m.SearchInputViewDocs)),       code: `<SearchInputView\n  value={q}\n  onChange={setQ}\n  placeholder="Search collections…"\n/>` },
  durationinput:     { title: 'DurationInputView',      desc: 'Number input with ms / s / m / hr unit selector dropdown.',                           vars: VARS_DUR,        liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.DurationInputPanel)), examples: slot(() => import('./components/durationinputview/examples/DurationInputViewExamples').then(m => m.DurationInputViewExamples)), docs: slot(() => import('./components/durationinputview/docs/DurationInputViewDocs').then(m => m.DurationInputViewDocs)),     code: `<DurationInputView value={timeout} onChange={setTimeout} />` },
  highlightedinput:  { title: 'HighlightedInputView',   desc: '{{variable}} highlighted URL input with autocomplete dropdown — the Daakia URL bar.',   vars: VARS_INPUT,  liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.HighlightedInputPanel)), examples: slot(() => import('./components/highlightedinputview/examples/HighlightedInputViewExamples').then(m => m.HighlightedInputViewExamples)), docs: slot(() => import('./components/highlightedinputview/docs/HighlightedInputViewDocs').then(m => m.HighlightedInputViewDocs)),  code: `<HighlightedInputView\n  value={url}\n  onChange={setUrl}\n  placeholder="https://api.example.com/{{env}}/users"\n/>` },
  keyvaluetable:     { title: 'KeyValueTableView',      desc: 'KV table — toolbar · add/delete/bulk-clear · enable toggle · maskSensitive · autocompleteKeys · showDescription · pinnedTopRows.',  vars: VARS_TABLE, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.KeyValueTablePanel)), examples: slot(() => import('./components/keyvaluetableview/examples/KeyValueTableViewExamples').then(m => m.KeyValueTableViewExamples)), docs: slot(() => import('./components/keyvaluetableview/docs/KeyValueTableViewDocs').then(m => m.KeyValueTableViewDocs)), code: `<KeyValueTableView\n  rows={rows}\n  onChange={setRows}\n  label="Request Headers"\n  maskSensitive\n  accentColor="var(--color-protocol-rest)"\n/>` },
  mergedinput:       { title: 'MergedInputView',         desc: 'Unified single-border input bar — merge select dropdowns, text inputs, inline buttons, and dividers into one pill.',  vars: VARS_INPUT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.MergedInputViewPanel)), examples: slot(() => import('./components/mergedinputview/examples/MergedInputViewExamples').then(m => m.MergedInputViewExamples)), docs: slot(() => import('./components/mergedinputview/docs/MergedInputViewDocs').then(m => m.MergedInputViewDocs)), code: `function Preview() {\n  const soapVersions = [{ value: '1.1', label: 'SOAP 1.1' }, { value: '1.2', label: 'SOAP 1.2' }];\n  const [version, setVersion] = useState('1.2');\n  const [url, setUrl] = useState('https://api.example.com/service');\n  return (\n    <MergedInputView\n      segments={[\n        { type: 'select', value: version, options: soapVersions, onChange: setVersion },\n        { type: 'divider' },\n        { type: 'text', value: url, onChange: setUrl },\n      ]}\n    />\n  );\n}` },
  picker:            { title: 'PickerView',              desc: 'Scrollable wheel picker — single column or multi-column (hour/min/AM-PM) — momentum scroll, snap, and depth-fade animation.', vars: VARS_INPUT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.PickerPanel)), examples: slot(() => import('./components/picker/examples/PickerViewExamples').then(m => m.PickerViewExamples)), docs: slot(() => import('./components/picker/docs/PickerViewDocs').then(m => m.PickerViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [method, setMethod] = useState('GET');\n  return (\n    <PickerView\n      options={[\n        { value: 'GET',  label: 'GET' },\n        { value: 'POST', label: 'POST' },\n        { value: 'PUT',  label: 'PUT' },\n      ]}\n      value={method}\n      onChange={setMethod}\n      size="md"\n    />\n  );\n}` },
  segmentedcontrol:  { title: 'SegmentedControlView',    desc: 'Pill-shaped segmented control — solid sliding indicator with a springy bounce transition — pill / rounded / pointy shapes.', vars: VARS_PILLTAB, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.SegmentedControlPanel)), examples: slot(() => import('./components/segmentedcontrol/examples/SegmentedControlViewExamples').then(m => m.SegmentedControlViewExamples)), docs: slot(() => import('./components/segmentedcontrol/docs/SegmentedControlViewDocs').then(m => m.SegmentedControlViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState('opt1');\n  return (\n    <SegmentedControlView\n      options={[\n        { value: 'opt1', label: 'Option 1' },\n        { value: 'opt2', label: 'Option 2' },\n        { value: 'opt3', label: 'Option 3' },\n      ]}\n      value={value}\n      onChange={setValue}\n      variant="pill"\n    />\n  );\n}` },
  duiprovider:       { title: 'DuiProvider — Size System', desc: 'Wrap any subtree with <DuiProvider size="sm|md|lg|xl"> and ALL nested DUI components inherit that size — no prop drilling.', vars: VARS_ACCENT, liveContent: slot(() => import('./components/duiprovider/live/DuiProviderLive').then(m => m.DuiProviderLive)), examples: slot(() => import('./components/duiprovider/examples/DuiProviderExamples').then(m => m.DuiProviderExamples)), docs: slot(() => import('./components/duiprovider/docs/DuiProviderDocs').then(m => m.DuiProviderDocs)), noExamplesHeader: true },
  calendar:          { title: 'CalendarView',             desc: 'Month grid calendar — single / range / multi select, min/max bounds, animated month transitions.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.CalendarPanel)), examples: slot(() => import('./components/calendar/examples/CalendarViewExamples').then(m => m.CalendarViewExamples)), docs: slot(() => import('./components/calendar/docs/CalendarViewDocs').then(m => m.CalendarViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [date, setDate] = useState('2026-07-02');\n  return (\n    <CalendarView\n      mode="single"\n      value={date}\n      onChange={setDate}\n    />\n  );\n}` },
  dateinput:         { title: 'DateInputView',             desc: 'Text field trigger + CalendarView popover — the standard date field pattern.', vars: VARS_INPUT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.DateInputPanel)), examples: slot(() => import('./components/dateinput/examples/DateInputViewExamples').then(m => m.DateInputViewExamples)), docs: slot(() => import('./components/dateinput/docs/DateInputViewDocs').then(m => m.DateInputViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [date, setDate] = useState(null);\n  return (\n    <DateInputView\n      value={date}\n      onChange={setDate}\n      placeholder="Select date…"\n    />\n  );\n}` },
  daterangepicker:   { title: 'DateRangePickerView',       desc: 'Range calendar + quick presets (Today / Last 7 days / Last 30 days / This month).', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.DateRangePickerPanel)), examples: slot(() => import('./components/daterangepicker/examples/DateRangePickerViewExamples').then(m => m.DateRangePickerViewExamples)), docs: slot(() => import('./components/daterangepicker/docs/DateRangePickerViewDocs').then(m => m.DateRangePickerViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [range, setRange] = useState(['2026-06-26', '2026-07-02']);\n  return (\n    <DateRangePickerView\n      value={range}\n      onChange={setRange}\n    />\n  );\n}` },
  timewheel:         { title: 'TimeWheelView',             desc: 'Prop-driven wrapper over PickerView columns for hour/minute/AM-PM — 12h or 24h mode, configurable minute step.', vars: VARS_INPUT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.TimeWheelPanel)), examples: slot(() => import('./components/timewheel/examples/TimeWheelViewExamples').then(m => m.TimeWheelViewExamples)), docs: slot(() => import('./components/timewheel/docs/TimeWheelViewDocs').then(m => m.TimeWheelViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [time, setTime] = useState({ hour: 9, minute: 30, meridiem: 'AM' });\n  return (\n    <TimeWheelView\n      value={time}\n      onChange={setTime}\n    />\n  );\n}` },
  countdownring:     { title: 'CountdownRingView',         desc: 'Circular countdown ring + digit readout — target Date or durationSeconds, onComplete callback.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.CountdownRingPanel)), examples: slot(() => import('./components/countdownring/examples/CountdownRingViewExamples').then(m => m.CountdownRingViewExamples)), docs: slot(() => import('./components/countdownring/docs/CountdownRingViewDocs').then(m => m.CountdownRingViewDocs)), noExamplesHeader: true, code: `<CountdownRingView\n  durationSeconds={60}\n  label="Session expires"\n  onComplete={() => alert('Expired!')}\n/>` },
  radiogroup:        { title: 'RadioGroupView',            desc: 'Radio list with optional descriptions — vertical or horizontal layout.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.RadioGroupPanel)), examples: slot(() => import('./components/radiogroup/examples/RadioGroupViewExamples').then(m => m.RadioGroupViewExamples)), docs: slot(() => import('./components/radiogroup/docs/RadioGroupViewDocs').then(m => m.RadioGroupViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState('json');\n  return (\n    <RadioGroupView\n      options={[{ value: 'json', label: 'JSON' }, { value: 'form', label: 'Form Data' }]}\n      value={value}\n      onChange={setValue}\n    />\n  );\n}` },
  radiocard:         { title: 'RadioCardView',             desc: 'Big selectable cards — plan pickers, mode selectors — grid layout via `columns`.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.RadioCardPanel)), examples: slot(() => import('./components/radiocard/examples/RadioCardViewExamples').then(m => m.RadioCardViewExamples)), docs: slot(() => import('./components/radiocard/docs/RadioCardViewDocs').then(m => m.RadioCardViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [plan, setPlan] = useState('pro');\n  return (\n    <RadioCardView\n      columns={2}\n      options={[{ value: 'free', label: 'Free' }, { value: 'pro', label: 'Pro' }]}\n      value={plan}\n      onChange={setPlan}\n    />\n  );\n}` },
  rating:            { title: 'RatingView',                desc: 'Star or heart rating input — half-step precision, hover preview, read-only mode.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.RatingPanel)), examples: slot(() => import('./components/rating/examples/RatingViewExamples').then(m => m.RatingViewExamples)), docs: slot(() => import('./components/rating/docs/RatingViewDocs').then(m => m.RatingViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState(3);\n  return <RatingView value={value} onChange={setValue} allowHalf />;\n}` },
  otpinput:          { title: 'OtpInputView',               desc: 'Auto-advance OTP/PIN boxes — paste splits across cells, onComplete callback.', vars: VARS_INPUT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.OtpInputPanel)), examples: slot(() => import('./components/otpinput/examples/OtpInputViewExamples').then(m => m.OtpInputViewExamples)), docs: slot(() => import('./components/otpinput/docs/OtpInputViewDocs').then(m => m.OtpInputViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [otp, setOtp] = useState('');\n  return <OtpInputView value={otp} onChange={setOtp} length={6} onComplete={code => console.log(code)} />;\n}` },
  phoneinput:        { title: 'PhoneInputView',             desc: 'Country-code select + number field in one bordered pill.', vars: VARS_INPUT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.PhoneInputPanel)), examples: slot(() => import('./components/phoneinput/examples/PhoneInputViewExamples').then(m => m.PhoneInputViewExamples)), docs: slot(() => import('./components/phoneinput/docs/PhoneInputViewDocs').then(m => m.PhoneInputViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [country, setCountry] = useState('US');\n  const [number, setNumber] = useState('');\n  return (\n    <PhoneInputView\n      countryCode={country}\n      onCountryChange={setCountry}\n      number={number}\n      onNumberChange={setNumber}\n    />\n  );\n}` },
  colorpicker:       { title: 'ColorPickerView',            desc: 'Swatch grid + native hue canvas + hex input, popover trigger.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ColorPickerPanel)), examples: slot(() => import('./components/colorpicker/examples/ColorPickerViewExamples').then(m => m.ColorPickerViewExamples)), docs: slot(() => import('./components/colorpicker/docs/ColorPickerViewDocs').then(m => m.ColorPickerViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [color, setColor] = useState('#6366F1');\n  return <ColorPickerView value={color} onChange={setColor} />;\n}` },
  iconpicker:        { title: 'IconPickerView',             desc: 'Searchable grid over every DUI icon — popover trigger.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.IconPickerPanel)), examples: slot(() => import('./components/iconpicker/examples/IconPickerViewExamples').then(m => m.IconPickerViewExamples)), docs: slot(() => import('./components/iconpicker/docs/IconPickerViewDocs').then(m => m.IconPickerViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [iconName, setIconName] = useState('SparkleIcon');\n  return <IconPickerView value={iconName} onChange={setIconName} />;\n}` },
  emojipicker:       { title: 'EmojiPickerView',             desc: 'Categorized emoji grid with search — popover trigger.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.EmojiPickerPanel)), examples: slot(() => import('./components/emojipicker/examples/EmojiPickerViewExamples').then(m => m.EmojiPickerViewExamples)), docs: slot(() => import('./components/emojipicker/docs/EmojiPickerViewDocs').then(m => m.EmojiPickerViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [emoji, setEmoji] = useState('🚀');\n  return <EmojiPickerView value={emoji} onChange={setEmoji} />;\n}` },
  filedropzone:      { title: 'FileDropzoneView',            desc: 'Drag-drop upload zone — per-file progress bars, remove action.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.FileDropzonePanel)), examples: slot(() => import('./components/filedropzone/examples/FileDropzoneViewExamples').then(m => m.FileDropzoneViewExamples)), docs: slot(() => import('./components/filedropzone/docs/FileDropzoneViewDocs').then(m => m.FileDropzoneViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [files, setFiles] = useState([]);\n  return (\n    <FileDropzoneView\n      files={files}\n      onFilesAdded={fs => setFiles(prev => [...prev, ...fs.map(file => ({ file, progress: 100 }))])}\n      onRemove={i => setFiles(prev => prev.filter((_, idx) => idx !== i))}\n    />\n  );\n}` },
  avatarupload:      { title: 'AvatarUploadView',            desc: 'Circular avatar preview with a camera-overlay upload button.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.AvatarUploadPanel)), examples: slot(() => import('./components/avatarupload/examples/AvatarUploadViewExamples').then(m => m.AvatarUploadViewExamples)), docs: slot(() => import('./components/avatarupload/docs/AvatarUploadViewDocs').then(m => m.AvatarUploadViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [src, setSrc] = useState(null);\n  return <AvatarUploadView src={src} onFileSelected={f => setSrc(URL.createObjectURL(f))} initials="SV" />;\n}` },
  maskedinput:       { title: 'MaskedInputView',             desc: 'Pattern-masked text input — `9`=digit, `A`=letter, `*`=any, literal separators auto-insert.', vars: VARS_INPUT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.MaskedInputPanel)), examples: slot(() => import('./components/maskedinput/examples/MaskedInputViewExamples').then(m => m.MaskedInputViewExamples)), docs: slot(() => import('./components/maskedinput/docs/MaskedInputViewDocs').then(m => m.MaskedInputViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [phone, setPhone] = useState('');\n  return <MaskedInputView mask="999-999-9999" value={phone} onChange={setPhone} />;\n}` },
  transferlist:      { title: 'TransferListView',            desc: 'Dual listbox — available ↔ selected — move one or move-all controls.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.TransferListPanel)), examples: slot(() => import('./components/transferlist/examples/TransferListViewExamples').then(m => m.TransferListViewExamples)), docs: slot(() => import('./components/transferlist/docs/TransferListViewDocs').then(m => m.TransferListViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [selected, setSelected] = useState(['read']);\n  const permissions = [{ value: 'read', label: 'Read' }, { value: 'write', label: 'Write' }];\n  return <TransferListView items={permissions} value={selected} onChange={setSelected} />;\n}` },
  stepperinput:      { title: 'StepperInputView',            desc: 'Numeric +/- stepper — iOS UIStepper pattern — min/max/step.', vars: VARS_INPUT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.StepperInputPanel)), examples: slot(() => import('./components/stepperinput/examples/StepperInputViewExamples').then(m => m.StepperInputViewExamples)), docs: slot(() => import('./components/stepperinput/docs/StepperInputViewDocs').then(m => m.StepperInputViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState(3);\n  return <StepperInputView value={value} onChange={setValue} min={0} max={10} />;\n}` },
  switchgroup:       { title: 'SwitchGroupView',             desc: 'Settings.app-style grouped toggle rows — section header, per-row description, disabled state.', vars: VARS_TOGGLE, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.SwitchGroupPanel)), examples: slot(() => import('./components/switchgroup/examples/SwitchGroupViewExamples').then(m => m.SwitchGroupViewExamples)), docs: slot(() => import('./components/switchgroup/docs/SwitchGroupViewDocs').then(m => m.SwitchGroupViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [checked, setChecked] = useState(['ssl']);\n  const items = [{ value: 'ssl', label: 'Verify SSL' }, { value: 'redirects', label: 'Follow redirects' }];\n  return <SwitchGroupView title="Request Options" items={items} checked={checked} onChange={setChecked} />;\n}` },
  snackbar:          { title: 'SnackbarView',                desc: 'Single-line bottom bar + action, auto-dismiss timer pauses on hover — distinct from the stacked-corner ToastView.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.SnackbarPanel)), examples: slot(() => import('./components/snackbar/examples/SnackbarViewExamples').then(m => m.SnackbarViewExamples)), docs: slot(() => import('./components/snackbar/docs/SnackbarViewDocs').then(m => m.SnackbarViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [open, setOpen] = useState(true);\n  return (\n    <SnackbarView\n      open={open}\n      message="Environment saved"\n      actionLabel="Undo"\n      onAction={() => {}}\n      onClose={() => setOpen(false)}\n    />\n  );\n}` },
  banner:            { title: 'BannerView',                  desc: 'Persistent dismissible top strip — info / success / warning / danger variants.', vars: VARS_STATUS, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.BannerPanel)), examples: slot(() => import('./components/banner/examples/BannerViewExamples').then(m => m.BannerViewExamples)), docs: slot(() => import('./components/banner/docs/BannerViewDocs').then(m => m.BannerViewDocs)), noExamplesHeader: true, code: `<BannerView\n  open={true}\n  variant="info"\n  message="A new version is available."\n  actionLabel="Refresh"\n  onAction={() => {}}\n/>` },
  progressring:      { title: 'ProgressRingView',             desc: 'Circular determinate/indeterminate progress — distinct from GaugeView (metric gauge).', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ProgressRingPanel)), examples: slot(() => import('./components/progressring/examples/ProgressRingViewExamples').then(m => m.ProgressRingViewExamples)), docs: slot(() => import('./components/progressring/docs/ProgressRingViewDocs').then(m => m.ProgressRingViewDocs)), noExamplesHeader: true, code: `<ProgressRingView value={70} />\n<ProgressRingView />  {/* indeterminate */}` },
  progressbar:       { title: 'ProgressBarView',              desc: 'Linear progress — buffer fill and striped-indeterminate variants.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ProgressBarPanel)), examples: slot(() => import('./components/progressbar/examples/ProgressBarViewExamples').then(m => m.ProgressBarViewExamples)), docs: slot(() => import('./components/progressbar/docs/ProgressBarViewDocs').then(m => m.ProgressBarViewDocs)), noExamplesHeader: true, code: `<ProgressBarView value={45} buffer={70} />` },
  skeleton:          { title: 'SkeletonView',                 desc: 'Composable shimmer primitives — text / block / avatar / row — for custom loading layouts.', vars: VARS_LOADER, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.SkeletonPanel)), examples: slot(() => import('./components/skeleton/examples/SkeletonViewExamples').then(m => m.SkeletonViewExamples)), docs: slot(() => import('./components/skeleton/docs/SkeletonViewDocs').then(m => m.SkeletonViewDocs)), noExamplesHeader: true, code: `<SkeletonView variant="row" />` },
  notificationbadge: { title: 'NotificationBadgeView',        desc: 'Dot/count badge overlay anchor for icons and avatars.', vars: VARS_STATUS, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.NotificationBadgePanel)), examples: slot(() => import('./components/notificationbadge/examples/NotificationBadgeViewExamples').then(m => m.NotificationBadgeViewExamples)), docs: slot(() => import('./components/notificationbadge/docs/NotificationBadgeViewDocs').then(m => m.NotificationBadgeViewDocs)), noExamplesHeader: true, code: `<NotificationBadgeView count={3}>\n  <IconButtonView icon={<BellIcon />} />\n</NotificationBadgeView>` },
  avatar:            { title: 'AvatarView',                   desc: 'Image or initials fallback, with an optional presence-status dot.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.AvatarPanel)), examples: slot(() => import('./components/avatar/examples/AvatarViewExamples').then(m => m.AvatarViewExamples)), docs: slot(() => import('./components/avatar/docs/AvatarViewDocs').then(m => m.AvatarViewDocs)), noExamplesHeader: true, code: `<AvatarView name="Salil Vasa Nair" status="online" />` },
  avatargroup:       { title: 'AvatarGroupView',               desc: 'Stacked overlapping avatars with a "+N" overflow bubble.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.AvatarGroupPanel)), examples: slot(() => import('./components/avatargroup/examples/AvatarGroupViewExamples').then(m => m.AvatarGroupViewExamples)), docs: slot(() => import('./components/avatargroup/docs/AvatarGroupViewDocs').then(m => m.AvatarGroupViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const members = [{ name: 'Salil Vasa Nair' }, { name: 'Jordan Lee' }, { name: 'Amara Okafor' }, { name: 'Priya Sharma' }, { name: 'Tomas Ruiz' }];\n  return <AvatarGroupView members={members} max={4} />;\n}` },
  presencedot:       { title: 'PresenceDotView',               desc: 'Tiny online/away/busy/offline status primitive.', vars: VARS_STATUS, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.PresenceDotPanel)), examples: slot(() => import('./components/presencedot/examples/PresenceDotViewExamples').then(m => m.PresenceDotViewExamples)), docs: slot(() => import('./components/presencedot/docs/PresenceDotViewDocs').then(m => m.PresenceDotViewDocs)), noExamplesHeader: true, code: `<PresenceDotView status="online" />` },
  confettiburst:     { title: 'ConfettiBurstView',             desc: 'Canvas confetti burst triggered imperatively via ref — fire() from any event handler.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ConfettiBurstPanel)), examples: slot(() => import('./components/confettiburst/examples/ConfettiBurstViewExamples').then(m => m.ConfettiBurstViewExamples)), docs: slot(() => import('./components/confettiburst/docs/ConfettiBurstViewDocs').then(m => m.ConfettiBurstViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const ref = useRef(null);\n  return (\n    <>\n      <ButtonView onClick={() => ref.current.fire()}>Celebrate</ButtonView>\n      <ConfettiBurstView ref={ref} />\n    </>\n  );\n}` },
  popover:           { title: 'PopoverView',                  desc: 'Generic anchored floating-content primitive — the positioning engine behind SelectInputView/InfoPopupView, exposed standalone.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.PopoverPanel)), examples: slot(() => import('./components/popover/examples/PopoverViewExamples').then(m => m.PopoverViewExamples)), docs: slot(() => import('./components/popover/docs/PopoverViewDocs').then(m => m.PopoverViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [open, setOpen] = useState(false);\n  const [anchor, setAnchor] = useState(null);\n  return (\n    <span ref={setAnchor}>\n      <ButtonView onClick={() => setOpen(true)}>Open</ButtonView>\n      <PopoverView open={open} anchorEl={anchor} onClose={() => setOpen(false)}>\n        Any content here\n      </PopoverView>\n    </span>\n  );\n}` },
  tooltip:           { title: 'TooltipView',                  desc: 'Hover/focus tooltip primitive — top/bottom/left/right placement, configurable delay.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.TooltipPanel)), examples: slot(() => import('./components/tooltip/examples/TooltipViewExamples').then(m => m.TooltipViewExamples)), docs: slot(() => import('./components/tooltip/docs/TooltipViewDocs').then(m => m.TooltipViewDocs)), noExamplesHeader: true, code: `<TooltipView content="Copy to clipboard" placement="top">\n  <span><IconButtonView icon={<CopyIcon />} /></span>\n</TooltipView>` },
  drawer:            { title: 'DrawerView',                   desc: 'Slide-in overlay panel from any edge, with backdrop — navigation-drawer pattern.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.DrawerPanel)), examples: slot(() => import('./components/drawer/examples/DrawerViewExamples').then(m => m.DrawerViewExamples)), docs: slot(() => import('./components/drawer/docs/DrawerViewDocs').then(m => m.DrawerViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <ButtonView onClick={() => setOpen(true)}>Open</ButtonView>\n      <DrawerView open={open} edge="right" title="Environment" onClose={() => setOpen(false)}>\n        ...\n      </DrawerView>\n    </>\n  );\n}` },
  actionsheet:       { title: 'ActionSheetView',               desc: 'Bottom list of actions + destructive styling + cancel.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ActionSheetPanel)), examples: slot(() => import('./components/actionsheet/examples/ActionSheetViewExamples').then(m => m.ActionSheetViewExamples)), docs: slot(() => import('./components/actionsheet/docs/ActionSheetViewDocs').then(m => m.ActionSheetViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <ButtonView onClick={() => setOpen(true)}>Open</ButtonView>\n      <ActionSheetView\n        open={open}\n        items={[{ label: 'Duplicate', onClick: () => {} }, { label: 'Delete', danger: true, onClick: () => {} }]}\n        onClose={() => setOpen(false)}\n      />\n    </>\n  );\n}` },
  bottomsheet:       { title: 'BottomSheetView',               desc: 'Drag-to-dismiss mobile sheet — distinct from the persistent, resizable BottomPanelView.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.BottomSheetPanel)), examples: slot(() => import('./components/bottomsheet/examples/BottomSheetViewExamples').then(m => m.BottomSheetViewExamples)), docs: slot(() => import('./components/bottomsheet/docs/BottomSheetViewDocs').then(m => m.BottomSheetViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <ButtonView onClick={() => setOpen(true)}>Open</ButtonView>\n      <BottomSheetView open={open} title="Request Options" onClose={() => setOpen(false)}>\n        ...\n      </BottomSheetView>\n    </>\n  );\n}` },
  spotlighttour:     { title: 'SpotlightTourView',             desc: 'Coach-mark onboarding — spotlight cutout around a target selector + step tooltip + progress dots.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.SpotlightTourPanel)), examples: slot(() => import('./components/spotlighttour/examples/SpotlightTourViewExamples').then(m => m.SpotlightTourViewExamples)), docs: slot(() => import('./components/spotlighttour/docs/SpotlightTourViewDocs').then(m => m.SpotlightTourViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [open, setOpen] = useState(false);\n  const [step, setStep] = useState(0);\n  const steps = [{ target: '#send-btn', title: 'Send requests', content: 'Build and fire HTTP requests from here.' }];\n  return (\n    <>\n      <ButtonView id="send-btn" onClick={() => setOpen(true)}>Send</ButtonView>\n      <SpotlightTourView\n        open={open}\n        steps={steps}\n        stepIndex={step}\n        onNext={() => setStep(s => s + 1)}\n        onPrev={() => setStep(s => s - 1)}\n        onClose={() => setOpen(false)}\n      />\n    </>\n  );\n}` },
  fab:               { title: 'FabView',                       desc: 'Floating action button — standard, extended (with label), or speed-dial with sub-actions.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.FabPanel)), examples: slot(() => import('./components/fab/examples/FabViewExamples').then(m => m.FabViewExamples)), docs: slot(() => import('./components/fab/docs/FabViewDocs').then(m => m.FabViewDocs)), noExamplesHeader: true, code: `<FabView\n  actions={[\n    { icon: <FolderIcon />, label: 'New Folder', onClick: () => {} },\n    { icon: <DownloadIcon />, label: 'Import', onClick: () => {} },\n  ]}\n/>` },
  dock:              { title: 'DockView',                      desc: 'Floating icon dock — icons magnify as the cursor approaches.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.DockPanel)), examples: slot(() => import('./components/dock/examples/DockViewExamples').then(m => m.DockViewExamples)), docs: slot(() => import('./components/dock/docs/DockViewDocs').then(m => m.DockViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [active, setActive] = useState('server');\n  const items = [\n    { id: 'server', icon: <ServerIcon size={18} />, label: 'Servers', active: active === 'server' },\n    { id: 'globe', icon: <GlobeIcon size={18} />, label: 'Network', active: active === 'globe' },\n  ];\n  return <DockView items={items} onSelect={setActive} />;\n}` },
  breadcrumb:        { title: 'BreadcrumbView',                desc: 'Path breadcrumb trail with overflow-collapse into a "…" for long paths.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.BreadcrumbPanel)), examples: slot(() => import('./components/breadcrumb/examples/BreadcrumbViewExamples').then(m => m.BreadcrumbViewExamples)), docs: slot(() => import('./components/breadcrumb/docs/BreadcrumbViewDocs').then(m => m.BreadcrumbViewDocs)), noExamplesHeader: true, code: `<BreadcrumbView items={[{ label: 'Workspace', onClick: () => {} }, { label: 'Users API' }]} />` },
  pagination:        { title: 'PaginationView',                desc: 'Page number control with ellipsis collapse for long ranges.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.PaginationPanel)), examples: slot(() => import('./components/pagination/examples/PaginationViewExamples').then(m => m.PaginationViewExamples)), docs: slot(() => import('./components/pagination/docs/PaginationViewDocs').then(m => m.PaginationViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [page, setPage] = useState(1);\n  return <PaginationView page={page} totalPages={40} onChange={setPage} />;\n}` },
  hero:              { title: 'HeroView',                      desc: 'Banner section — title/subtitle/CTA, size-driven min-height.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.HeroPanel)), examples: slot(() => import('./components/hero/examples/HeroViewExamples').then(m => m.HeroViewExamples)), docs: slot(() => import('./components/hero/docs/HeroViewDocs').then(m => m.HeroViewDocs)), noExamplesHeader: true, code: `<HeroView\n  title="Build APIs faster"\n  subtitle="Design, test, and document APIs in one workspace."\n  actions={<ButtonView variant="primary">Get Started</ButtonView>}\n/>` },
  level:             { title: 'LevelView',                     desc: 'Space-between horizontal toolbar row primitive.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.LevelPanel)), examples: slot(() => import('./components/level/examples/LevelViewExamples').then(m => m.LevelViewExamples)), docs: slot(() => import('./components/level/docs/LevelViewDocs').then(m => m.LevelViewDocs)), noExamplesHeader: true, code: `<LevelView left={<span>142 requests</span>} right={<ButtonView size="sm">Export</ButtonView>} />` },
  mediaobject:       { title: 'MediaObjectView',                desc: 'Avatar/icon + content + actions row.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.MediaObjectPanel)), examples: slot(() => import('./components/mediaobject/examples/MediaObjectViewExamples').then(m => m.MediaObjectViewExamples)), docs: slot(() => import('./components/mediaobject/docs/MediaObjectViewDocs').then(m => m.MediaObjectViewDocs)), noExamplesHeader: true, code: `<MediaObjectView media={<AvatarView name="Jordan Lee" />} actions={<IconButtonView icon={<MoreHorizontalIcon />} />}>\n  <b>Jordan Lee</b> commented on your request\n</MediaObjectView>` },
  tilegrid:          { title: 'TileGridView',                  desc: 'Nested ancestor/parent/child tile grid.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.TileGridPanel)), examples: slot(() => import('./components/tilegrid/examples/TileGridViewExamples').then(m => m.TileGridViewExamples)), docs: slot(() => import('./components/tilegrid/docs/TileGridViewDocs').then(m => m.TileGridViewDocs)), noExamplesHeader: true, code: `<TileGridView nodes={[{ content: <div>A</div>, weight: 2 }, { vertical: true, children: [{ content: <div>B</div> }, { content: <div>C</div> }] }]} />` },
  panellist:         { title: 'PanelListView',                 desc: 'Heading + tabs + filterable block list.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.PanelListPanel)), examples: slot(() => import('./components/panellist/examples/PanelListViewExamples').then(m => m.PanelListViewExamples)), docs: slot(() => import('./components/panellist/docs/PanelListViewDocs').then(m => m.PanelListViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [tab, setTab] = useState('collections');\n  return (\n    <PanelListView\n      heading="Workspace"\n      tabs={[{ id: 'collections', label: 'Collections' }, { id: 'history', label: 'History' }]}\n      activeTab={tab}\n      onTabChange={setTab}\n      items={[{ value: 'users', label: 'Users API' }, { value: 'orders', label: 'Orders API' }]}\n    />\n  );\n}` },
  navbar:            { title: 'NavbarView',                    desc: 'Top app bar — brand, link menu, burger collapse on narrow widths.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.NavbarPanel)), examples: slot(() => import('./components/navbar/examples/NavbarViewExamples').then(m => m.NavbarViewExamples)), docs: slot(() => import('./components/navbar/docs/NavbarViewDocs').then(m => m.NavbarViewDocs)), noExamplesHeader: true, code: `<NavbarView\n  brand="Daakia"\n  links={[{ id: 'requests', label: 'Requests', active: true }, { id: 'docs', label: 'Docs' }]}\n  right={<ButtonView size="sm">Sign in</ButtonView>}\n/>` },
  affix:             { title: 'AffixView',                     desc: 'Sticky-on-scroll wrapper — pins once it reaches offsetTop.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.AffixPanel)), examples: slot(() => import('./components/affix/examples/AffixViewExamples').then(m => m.AffixViewExamples)), docs: slot(() => import('./components/affix/docs/AffixViewDocs').then(m => m.AffixViewDocs)), noExamplesHeader: true, code: `<AffixView offsetTop={0}>\n  <div>Pinned toolbar</div>\n</AffixView>` },
  anchor:            { title: 'AnchorView',                    desc: 'Scroll-spy in-page navigation — highlights the section in view, click to jump.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.AnchorPanel)), examples: slot(() => import('./components/anchor/examples/AnchorViewExamples').then(m => m.AnchorViewExamples)), docs: slot(() => import('./components/anchor/docs/AnchorViewDocs').then(m => m.AnchorViewDocs)), noExamplesHeader: true, code: `<AnchorView links={[{ id: 'intro', label: 'Introduction' }, { id: 'auth', label: 'Authentication' }]} />` },
  stickyheader:      { title: 'StickyHeaderView',               desc: 'Sticky section header that grows a shadow once pinned.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.StickyHeaderPanel)), examples: slot(() => import('./components/stickyheader/examples/StickyHeaderViewExamples').then(m => m.StickyHeaderViewExamples)), docs: slot(() => import('./components/stickyheader/docs/StickyHeaderViewDocs').then(m => m.StickyHeaderViewDocs)), noExamplesHeader: true, code: `<StickyHeaderView>Response Headers</StickyHeaderView>` },
  aspectratio:       { title: 'AspectRatioView',                desc: 'Fixed aspect-ratio box for image/video containers.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.AspectRatioPanel)), examples: slot(() => import('./components/aspectratio/examples/AspectRatioViewExamples').then(m => m.AspectRatioViewExamples)), docs: slot(() => import('./components/aspectratio/docs/AspectRatioViewDocs').then(m => m.AspectRatioViewDocs)), noExamplesHeader: true, code: `<AspectRatioView ratio={16 / 9}>\n  <img src="https://picsum.photos/seed/aspect/640/360" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />\n</AspectRatioView>` },
  masonrygrid:       { title: 'MasonryGridView',                desc: 'Pinterest-style column-balanced layout — pure CSS columns, no JS measurement.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.MasonryGridPanel)), examples: slot(() => import('./components/masonrygrid/examples/MasonryGridViewExamples').then(m => m.MasonryGridViewExamples)), docs: slot(() => import('./components/masonrygrid/docs/MasonryGridViewDocs').then(m => m.MasonryGridViewDocs)), noExamplesHeader: true, code: `<MasonryGridView columns={3}>\n  <div>Card 1</div>\n  <div>Card 2</div>\n  <div>Card 3</div>\n</MasonryGridView>` },
  scrollarea:        { title: 'ScrollAreaView',                 desc: 'Custom accent-tinted scrollbar container primitive.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ScrollAreaPanel)), examples: slot(() => import('./components/scrollarea/examples/ScrollAreaViewExamples').then(m => m.ScrollAreaViewExamples)), docs: slot(() => import('./components/scrollarea/docs/ScrollAreaViewDocs').then(m => m.ScrollAreaViewDocs)), noExamplesHeader: true, code: `<ScrollAreaView maxHeight={140}>\n  <div>Row 1</div>\n  <div>Row 2</div>\n</ScrollAreaView>` },
  backtotop:         { title: 'BackToTopView',                  desc: 'Floating scroll-to-top button — fades in past a scroll threshold.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.BackToTopPanel)), examples: slot(() => import('./components/backtotop/examples/BackToTopViewExamples').then(m => m.BackToTopViewExamples)), docs: slot(() => import('./components/backtotop/docs/BackToTopViewDocs').then(m => m.BackToTopViewDocs)), noExamplesHeader: true, code: `<BackToTopView threshold={240} />` },
  watermark:         { title: 'WatermarkView',                  desc: 'Repeated diagonal text/logo overlay.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.WatermarkPanel)), examples: slot(() => import('./components/watermark/examples/WatermarkViewExamples').then(m => m.WatermarkViewExamples)), docs: slot(() => import('./components/watermark/docs/WatermarkViewDocs').then(m => m.WatermarkViewDocs)), noExamplesHeader: true, code: `<WatermarkView text="CONFIDENTIAL">\n  <div>Protected content</div>\n</WatermarkView>` },
  descriptions:      { title: 'DescriptionsView',               desc: 'Read-only label/value grid for entity detail views.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.DescriptionsPanel)), examples: slot(() => import('./components/descriptions/examples/DescriptionsViewExamples').then(m => m.DescriptionsViewExamples)), docs: slot(() => import('./components/descriptions/docs/DescriptionsViewDocs').then(m => m.DescriptionsViewDocs)), noExamplesHeader: true, code: `<DescriptionsView title="Request Details" items={[{ label: 'Method', value: 'POST' }, { label: 'Status', value: '200 OK' }]} />` },
  statistic:         { title: 'StatisticView',                  desc: 'Inline animated big-number stat with prefix/suffix.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.StatisticPanel)), examples: slot(() => import('./components/statistic/examples/StatisticViewExamples').then(m => m.StatisticViewExamples)), docs: slot(() => import('./components/statistic/docs/StatisticViewDocs').then(m => m.StatisticViewDocs)), noExamplesHeader: true, code: `<StatisticView label="Requests today" value={1420} />` },
  result:            { title: 'ResultView',                     desc: 'Full-page outcome state — success / error / 404 / 403 / warning / info.', vars: VARS_STATUS, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ResultPanel)), examples: slot(() => import('./components/result/examples/ResultViewExamples').then(m => m.ResultViewExamples)), docs: slot(() => import('./components/result/docs/ResultViewDocs').then(m => m.ResultViewDocs)), noExamplesHeader: true, code: `<ResultView status="success" title="Request sent" subtitle="Delivered successfully." />` },
  cascader:          { title: 'CascaderView',                   desc: 'Multi-level cascading select — region/category trees.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.CascaderPanel)), examples: slot(() => import('./components/cascader/examples/CascaderViewExamples').then(m => m.CascaderViewExamples)), docs: slot(() => import('./components/cascader/docs/CascaderViewDocs').then(m => m.CascaderViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [path, setPath] = useState(['us', 'ca']);\n  const regions = [{ value: 'us', label: 'United States', children: [{ value: 'ca', label: 'California' }, { value: 'ny', label: 'New York' }] }];\n  return <CascaderView options={regions} value={path} onChange={setPath} />;\n}` },
  combobox:          { title: 'ComboBoxView',                   desc: 'Free-text input + filtered dropdown suggestions — autocomplete pattern.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ComboBoxPanel)), examples: slot(() => import('./components/combobox/examples/ComboBoxViewExamples').then(m => m.ComboBoxViewExamples)), docs: slot(() => import('./components/combobox/docs/ComboBoxViewDocs').then(m => m.ComboBoxViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState('GET');\n  return <ComboBoxView options={[{ value: 'GET', label: 'GET' }, { value: 'POST', label: 'POST' }]} value={value} onChange={setValue} />;\n}` },
  listview:          { title: 'ListView',                       desc: 'Generic avatar/title/subtitle/action list primitive.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ListViewPanel)), examples: slot(() => import('./components/listview/examples/ListViewExamples').then(m => m.ListViewExamples)), docs: slot(() => import('./components/listview/docs/ListViewDocs').then(m => m.ListViewDocs)), noExamplesHeader: true, code: `<ListView items={[{ id: '1', title: 'Users API', subtitle: '12 requests' }]} />` },
  virtualizedlist:   { title: 'VirtualizedListView',            desc: 'Windowed rendering for large lists — only mounts rows in (or near) the viewport.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.VirtualizedListPanel)), examples: slot(() => import('./components/virtualizedlist/examples/VirtualizedListViewExamples').then(m => m.VirtualizedListViewExamples)), docs: slot(() => import('./components/virtualizedlist/docs/VirtualizedListViewDocs').then(m => m.VirtualizedListViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const items = Array.from({ length: 5000 }, (_, i) => 'Row ' + (i + 1));\n  return <VirtualizedListView items={items} itemHeight={28} height={200} renderItem={item => <div>{item}</div>} />;\n}` },
  stickytableheader: { title: 'StickyTableHeaderView',          desc: 'Sticky header + optional frozen first column for wide/tall tables.', vars: VARS_TABLE, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.StickyTableHeaderPanel)), examples: slot(() => import('./components/stickytableheader/examples/StickyTableHeaderViewExamples').then(m => m.StickyTableHeaderViewExamples)), docs: slot(() => import('./components/stickytableheader/docs/StickyTableHeaderViewDocs').then(m => m.StickyTableHeaderViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const rows = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];\n  return (\n    <StickyTableHeaderView\n      keyField="id"\n      rows={rows}\n      columns={[{ key: 'name', label: 'Name', render: r => r.name }]}\n    />\n  );\n}` },
  tablepagination:   { title: 'TablePaginationView',            desc: 'Rows-per-page selector + page-number footer.', vars: VARS_TABLE, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.TablePaginationPanel)), examples: slot(() => import('./components/tablepagination/examples/TablePaginationViewExamples').then(m => m.TablePaginationViewExamples)), docs: slot(() => import('./components/tablepagination/docs/TablePaginationViewDocs').then(m => m.TablePaginationViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [page, setPage] = useState(1);\n  const [rowsPerPage, setRowsPerPage] = useState(10);\n  return <TablePaginationView page={page} totalRows={247} rowsPerPage={rowsPerPage} onPageChange={setPage} onRowsPerPageChange={setRowsPerPage} />;\n}` },
  filterbar:         { title: 'FilterBarView',                  desc: 'Chip-based row of active filters with a clear-all action.', vars: VARS_CHIP, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.FilterBarPanel)), examples: slot(() => import('./components/filterbar/examples/FilterBarViewExamples').then(m => m.FilterBarViewExamples)), docs: slot(() => import('./components/filterbar/docs/FilterBarViewDocs').then(m => m.FilterBarViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [filters, setFilters] = useState([{ key: 'method', label: 'Method: GET' }]);\n  return (\n    <FilterBarView\n      filters={filters}\n      onRemove={key => setFilters(f => f.filter(x => x.key !== key))}\n      onClearAll={() => setFilters([])}\n    />\n  );\n}` },
  sortableheader:    { title: 'SortableHeaderView',             desc: 'Clickable table column header with a sort-direction arrow indicator.', vars: VARS_TABLE, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.SortableHeaderPanel)), examples: slot(() => import('./components/sortableheader/examples/SortableHeaderViewExamples').then(m => m.SortableHeaderViewExamples)), docs: slot(() => import('./components/sortableheader/docs/SortableHeaderViewDocs').then(m => m.SortableHeaderViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [direction, setDirection] = useState('asc');\n  return <SortableHeaderView label="Name" direction={direction} onClick={() => setDirection(d => d === 'asc' ? 'desc' : 'asc')} />;\n}` },
  editablecell:      { title: 'EditableCellView',               desc: 'Click-to-edit table cell — Enter commits, Escape cancels.', vars: VARS_TABLE, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.EditableCellPanel)), examples: slot(() => import('./components/editablecell/examples/EditableCellViewExamples').then(m => m.EditableCellViewExamples)), docs: slot(() => import('./components/editablecell/docs/EditableCellViewDocs').then(m => m.EditableCellViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState('Users API');\n  return <EditableCellView value={value} onChange={setValue} />;\n}` },
  datagridtoolbar:   { title: 'DataGridToolbarView',            desc: 'Table toolbar — search + column-visibility + density cycle + export.', vars: VARS_TABLE, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.DataGridToolbarPanel)), examples: slot(() => import('./components/datagridtoolbar/examples/DataGridToolbarViewExamples').then(m => m.DataGridToolbarViewExamples)), docs: slot(() => import('./components/datagridtoolbar/docs/DataGridToolbarViewDocs').then(m => m.DataGridToolbarViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [search, setSearch] = useState('');\n  const [visible, setVisible] = useState(['name']);\n  return (\n    <DataGridToolbarView\n      search={search}\n      onSearchChange={setSearch}\n      columns={[{ key: 'name', label: 'Name' }]}\n      visibleColumns={visible}\n      onVisibleColumnsChange={setVisible}\n      onExport={() => {}}\n    />\n  );\n}` },
  columnvisibility:  { title: 'ColumnVisibilityMenuView',       desc: 'Checkbox menu to toggle table column visibility.', vars: VARS_TABLE, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ColumnVisibilityPanel)), examples: slot(() => import('./components/columnvisibility/examples/ColumnVisibilityMenuViewExamples').then(m => m.ColumnVisibilityMenuViewExamples)), docs: slot(() => import('./components/columnvisibility/docs/ColumnVisibilityMenuViewDocs').then(m => m.ColumnVisibilityMenuViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [visible, setVisible] = useState(['name', 'status']);\n  return <ColumnVisibilityMenuView columns={[{ key: 'name', label: 'Name' }, { key: 'status', label: 'Status' }]} visible={visible} onChange={setVisible} />;\n}` },
  kbd:               { title: 'KbdView',                        desc: 'Hotkey hint chip, composes multiple keys with a "+" separator.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.KbdPanel)), examples: slot(() => import('./components/kbd/examples/KbdViewExamples').then(m => m.KbdViewExamples)), docs: slot(() => import('./components/kbd/docs/KbdViewDocs').then(m => m.KbdViewDocs)), noExamplesHeader: true, code: `<KbdView keys={['⌘', 'K']} />` },
  wizardstepper:     { title: 'WizardStepperView',               desc: 'Multi-step form wizard progress header.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.WizardStepperPanel)), examples: slot(() => import('./components/wizardstepper/examples/WizardStepperViewExamples').then(m => m.WizardStepperViewExamples)), docs: slot(() => import('./components/wizardstepper/docs/WizardStepperViewDocs').then(m => m.WizardStepperViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [active, setActive] = useState('auth');\n  const steps = [{ id: 'connect', label: 'Connect' }, { id: 'auth', label: 'Authenticate' }];\n  return <WizardStepperView steps={steps} activeStep={active} onStepClick={setActive} />;\n}` },
  accordiongroup:    { title: 'AccordionGroupView',              desc: 'Managed single/multi-open accordion group, built on CollapsibleSectionView.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.AccordionGroupPanel)), examples: slot(() => import('./components/accordiongroup/examples/AccordionGroupViewExamples').then(m => m.AccordionGroupViewExamples)), docs: slot(() => import('./components/accordiongroup/docs/AccordionGroupViewDocs').then(m => m.AccordionGroupViewDocs)), noExamplesHeader: true, code: `<AccordionGroupView items={[{ id: 'a', title: 'Headers', children: <div>...</div> }]} defaultOpen={['a']} />` },
  segmentedprogressbar: { title: 'SegmentedProgressBarView',     desc: 'Multi-segment progress — e.g. upload/pipeline stages, each independently colored.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.SegmentedProgressBarPanel)), examples: slot(() => import('./components/segmentedprogressbar/examples/SegmentedProgressBarViewExamples').then(m => m.SegmentedProgressBarViewExamples)), docs: slot(() => import('./components/segmentedprogressbar/docs/SegmentedProgressBarViewDocs').then(m => m.SegmentedProgressBarViewDocs)), noExamplesHeader: true, code: `<SegmentedProgressBarView segments={[{ label: 'Upload', status: 'done' }, { label: 'Scan', status: 'active' }]} />` },
  checklist:         { title: 'ChecklistView',                  desc: 'Todo-style checklist — strikethrough + faded once complete.', vars: VARS_TOGGLE, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ChecklistPanel)), examples: slot(() => import('./components/checklist/examples/ChecklistViewExamples').then(m => m.ChecklistViewExamples)), docs: slot(() => import('./components/checklist/docs/ChecklistViewDocs').then(m => m.ChecklistViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [items, setItems] = useState([{ id: '1', label: 'Send first request', checked: false }]);\n  return <ChecklistView items={items} onToggle={id => setItems(prev => prev.map(i => i.id === id ? { ...i, checked: !i.checked } : i))} />;\n}` },
  prioritypicker:    { title: 'PriorityPickerView',              desc: 'Low/medium/high/urgent selector with color-coded dots.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.PriorityPickerPanel)), examples: slot(() => import('./components/prioritypicker/examples/PriorityPickerViewExamples').then(m => m.PriorityPickerViewExamples)), docs: slot(() => import('./components/prioritypicker/docs/PriorityPickerViewDocs').then(m => m.PriorityPickerViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [priority, setPriority] = useState('high');\n  return <PriorityPickerView value={priority} onChange={setPriority} />;\n}` },
  tagcloud:          { title: 'TagCloudView',                   desc: 'Weighted tag cloud — font size scales with relative weight.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.TagCloudPanel)), examples: slot(() => import('./components/tagcloud/examples/TagCloudViewExamples').then(m => m.TagCloudViewExamples)), docs: slot(() => import('./components/tagcloud/docs/TagCloudViewDocs').then(m => m.TagCloudViewDocs)), noExamplesHeader: true, code: `<TagCloudView tags={[{ label: 'rest', weight: 40 }, { label: 'graphql', weight: 20 }]} />` },
  rangeslider:       { title: 'RangeSliderView',                 desc: 'Dual-handle min/max range — distinct from the single-handle SliderView.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.RangeSliderPanel)), examples: slot(() => import('./components/rangeslider/examples/RangeSliderViewExamples').then(m => m.RangeSliderViewExamples)), docs: slot(() => import('./components/rangeslider/docs/RangeSliderViewDocs').then(m => m.RangeSliderViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [range, setRange] = useState([20, 80]);\n  return <RangeSliderView value={range} onChange={setRange} showValue />;\n}` },
  votewidget:        { title: 'VoteWidgetView',                  desc: 'Upvote/downvote counter control.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.VoteWidgetPanel)), examples: slot(() => import('./components/votewidget/examples/VoteWidgetViewExamples').then(m => m.VoteWidgetViewExamples)), docs: slot(() => import('./components/votewidget/docs/VoteWidgetViewDocs').then(m => m.VoteWidgetViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [score, setScore] = useState(42);\n  const [vote, setVote] = useState(null);\n  return <VoteWidgetView score={score} userVote={vote} onVote={v => { setVote(v); setScore(s => s + 1); }} />;\n}` },
  likebutton:        { title: 'LikeButtonView',                  desc: 'Animated heart/like toggle button — pop animation on like.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.LikeButtonPanel)), examples: slot(() => import('./components/likebutton/examples/LikeButtonViewExamples').then(m => m.LikeButtonViewExamples)), docs: slot(() => import('./components/likebutton/docs/LikeButtonViewDocs').then(m => m.LikeButtonViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [liked, setLiked] = useState(false);\n  return <LikeButtonView liked={liked} onChange={setLiked} count={128} />;\n}` },
  bookmarkbutton:    { title: 'BookmarkButtonView',               desc: 'Animated bookmark/save toggle button.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.BookmarkButtonPanel)), examples: slot(() => import('./components/bookmarkbutton/examples/BookmarkButtonViewExamples').then(m => m.BookmarkButtonViewExamples)), docs: slot(() => import('./components/bookmarkbutton/docs/BookmarkButtonViewDocs').then(m => m.BookmarkButtonViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [saved, setSaved] = useState(false);\n  return <BookmarkButtonView saved={saved} onChange={setSaved} />;\n}` },
  followbutton:      { title: 'FollowButtonView',                 desc: 'Follow/following state-toggle button — reveals "Unfollow" on hover.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.FollowButtonPanel)), examples: slot(() => import('./components/followbutton/examples/FollowButtonViewExamples').then(m => m.FollowButtonViewExamples)), docs: slot(() => import('./components/followbutton/docs/FollowButtonViewDocs').then(m => m.FollowButtonViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [following, setFollowing] = useState(false);\n  return <FollowButtonView following={following} onChange={setFollowing} />;\n}` },
  shortcutrecorder:  { title: 'ShortcutRecorderView',             desc: 'Captures a keybinding — click to record, press keys, renders via KbdView.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ShortcutRecorderPanel)), examples: slot(() => import('./components/shortcutrecorder/examples/ShortcutRecorderViewExamples').then(m => m.ShortcutRecorderViewExamples)), docs: slot(() => import('./components/shortcutrecorder/docs/ShortcutRecorderViewDocs').then(m => m.ShortcutRecorderViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [keys, setKeys] = useState(['⌘', 'K']);\n  return <ShortcutRecorderView value={keys} onChange={setKeys} />;\n}` },
  messagebubble:     { title: 'MessageBubbleView',                desc: 'Chat message bubble — sent (right, filled) / received (left, neutral).', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.MessageBubblePanel)), examples: slot(() => import('./components/messagebubble/examples/MessageBubbleViewExamples').then(m => m.MessageBubbleViewExamples)), docs: slot(() => import('./components/messagebubble/docs/MessageBubbleViewDocs').then(m => m.MessageBubbleViewDocs)), noExamplesHeader: true, code: `<MessageBubbleView variant="sent" timestamp="10:02 AM">Sounds good, sending now.</MessageBubbleView>` },
  chatinput:         { title: 'ChatInputView',                    desc: 'Message composer — auto-growing textarea + attach + send.', vars: VARS_INPUT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ChatInputPanel)), examples: slot(() => import('./components/chatinput/examples/ChatInputViewExamples').then(m => m.ChatInputViewExamples)), docs: slot(() => import('./components/chatinput/docs/ChatInputViewDocs').then(m => m.ChatInputViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [msg, setMsg] = useState('');\n  return <ChatInputView value={msg} onChange={setMsg} onSend={() => setMsg('')} />;\n}` },
  typingindicator:   { title: 'TypingIndicatorView',               desc: 'Animated "…is typing" dots.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.TypingIndicatorPanel)), examples: slot(() => import('./components/typingindicator/examples/TypingIndicatorViewExamples').then(m => m.TypingIndicatorViewExamples)), docs: slot(() => import('./components/typingindicator/docs/TypingIndicatorViewDocs').then(m => m.TypingIndicatorViewDocs)), noExamplesHeader: true, code: `<TypingIndicatorView label="Jordan is typing…" />` },
  commentthread:     { title: 'CommentThreadView',                 desc: 'Nested comment thread with reply action — GitHub/PR-style.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.CommentThreadPanel)), examples: slot(() => import('./components/commentthread/examples/CommentThreadViewExamples').then(m => m.CommentThreadViewExamples)), docs: slot(() => import('./components/commentthread/docs/CommentThreadViewDocs').then(m => m.CommentThreadViewDocs)), noExamplesHeader: true, code: `<CommentThreadView comments={[{ id: '1', author: 'Jordan', timestamp: '2h ago', content: 'LGTM' }]} onReply={() => {}} />` },
  notificationcenter: { title: 'NotificationCenterView',            desc: 'Bell icon + dropdown notification list, unread-count badge.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.NotificationCenterPanel)), examples: slot(() => import('./components/notificationcenter/examples/NotificationCenterViewExamples').then(m => m.NotificationCenterViewExamples)), docs: slot(() => import('./components/notificationcenter/docs/NotificationCenterViewDocs').then(m => m.NotificationCenterViewDocs)), noExamplesHeader: true, code: `<NotificationCenterView notifications={[{ id: '1', title: 'Deploy succeeded', timestamp: '5m ago' }]} />` },
  alertdialog:       { title: 'AlertDialogView',                   desc: 'Pre-built confirm/cancel dialog with danger styling — the standard "Are you sure?" pattern.', vars: VARS_MODAL, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.AlertDialogPanel)), examples: slot(() => import('./components/alertdialog/examples/AlertDialogViewExamples').then(m => m.AlertDialogViewExamples)), docs: slot(() => import('./components/alertdialog/docs/AlertDialogViewDocs').then(m => m.AlertDialogViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <ButtonView variant="danger" onClick={() => setOpen(true)}>Delete</ButtonView>\n      <AlertDialogView open={open} title="Delete collection?" message="This can't be undone." danger onConfirm={() => setOpen(false)} onCancel={() => setOpen(false)} />\n    </>\n  );\n}` },
  feedbackwidget:    { title: 'FeedbackWidgetView',                 desc: 'Thumbs up/down + optional comment micro-survey.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.FeedbackWidgetPanel)), examples: slot(() => import('./components/feedbackwidget/examples/FeedbackWidgetViewExamples').then(m => m.FeedbackWidgetViewExamples)), docs: slot(() => import('./components/feedbackwidget/docs/FeedbackWidgetViewDocs').then(m => m.FeedbackWidgetViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [vote, setVote] = useState(null);\n  return <FeedbackWidgetView vote={vote} onVote={setVote} />;\n}` },
  npssurvey:         { title: 'NpsSurveyView',                     desc: '0-10 Net Promoter Score picker with an optional follow-up text field.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.NpsSurveyPanel)), examples: slot(() => import('./components/npssurvey/examples/NpsSurveyViewExamples').then(m => m.NpsSurveyViewExamples)), docs: slot(() => import('./components/npssurvey/docs/NpsSurveyViewDocs').then(m => m.NpsSurveyViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [score, setScore] = useState(null);\n  return <NpsSurveyView score={score} onScoreChange={setScore} />;\n}` },
  sharesheet:        { title: 'ShareSheetView',                    desc: 'Social share row + copy-link field.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ShareSheetPanel)), examples: slot(() => import('./components/sharesheet/examples/ShareSheetViewExamples').then(m => m.ShareSheetViewExamples)), docs: slot(() => import('./components/sharesheet/docs/ShareSheetViewDocs').then(m => m.ShareSheetViewDocs)), noExamplesHeader: true, code: `<ShareSheetView url="https://daakia.app/s/abc123" />` },
  contactcard:       { title: 'ContactCardView',                    desc: 'Avatar + name + role + contact-icon row card.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ContactCardPanel)), examples: slot(() => import('./components/contactcard/examples/ContactCardViewExamples').then(m => m.ContactCardViewExamples)), docs: slot(() => import('./components/contactcard/docs/ContactCardViewDocs').then(m => m.ContactCardViewDocs)), noExamplesHeader: true, code: `<ContactCardView name="Jordan Lee" role="Platform Engineer" />` },
  articlecard:       { title: 'ArticleCardView',                    desc: 'Image + title + excerpt + meta preview card — blog/article listing.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ArticleCardPanel)), examples: slot(() => import('./components/articlecard/examples/ArticleCardViewExamples').then(m => m.ArticleCardViewExamples)), docs: slot(() => import('./components/articlecard/docs/ArticleCardViewDocs').then(m => m.ArticleCardViewDocs)), noExamplesHeader: true, code: `<ArticleCardView title="What's new in v2.0" excerpt="Faster requests, smarter mocks." meta="5 min read" />` },
  faqaccordion:      { title: 'FaqAccordionView',                   desc: 'Pre-styled Q&A accordion, built directly on AccordionGroupView.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.FaqAccordionPanel)), examples: slot(() => import('./components/faqaccordion/examples/FaqAccordionViewExamples').then(m => m.FaqAccordionViewExamples)), docs: slot(() => import('./components/faqaccordion/docs/FaqAccordionViewDocs').then(m => m.FaqAccordionViewDocs)), noExamplesHeader: true, code: `<FaqAccordionView faqs={[{ id: '1', question: 'How do I import a collection?', answer: 'Go to Import → select your file.' }]} />` },
  messagebanner:     { title: 'MessageBannerView',                  desc: 'Inline success/error/info/warning message strip.', vars: VARS_STATUS, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.MessageBannerPanel)), examples: slot(() => import('./components/messagebanner/examples/MessageBannerViewExamples').then(m => m.MessageBannerViewExamples)), docs: slot(() => import('./components/messagebanner/docs/MessageBannerViewDocs').then(m => m.MessageBannerViewDocs)), noExamplesHeader: true, code: `<MessageBannerView variant="success">Environment saved.</MessageBannerView>` },
  quoteblock:        { title: 'QuoteBlockView',                     desc: 'Styled blockquote with an optional avatar + attribution line.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.QuoteBlockPanel)), examples: slot(() => import('./components/quoteblock/examples/QuoteBlockViewExamples').then(m => m.QuoteBlockViewExamples)), docs: slot(() => import('./components/quoteblock/docs/QuoteBlockViewDocs').then(m => m.QuoteBlockViewDocs)), noExamplesHeader: true, code: `<QuoteBlockView attribution="Jordan Lee" role="Platform Engineer">Daakia cut our API testing time in half.</QuoteBlockView>` },
  hudview:           { title: 'HudView', desc: 'Generic floating draggable toolbar — store-free counterpart of DebugHud. Pass items[] and an optional status string.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.HudViewPanel)), examples: slot(() => import('./components/hudview/examples/HudViewExamples').then(m => m.HudViewExamples)), docs: slot(() => import('./components/hudview/docs/HudViewDocs').then(m => m.HudViewDocs)), code: `<HudView
  items={[
    { id: 'continue', icon: <PlayIcon size={13} />, title: 'Continue (F5)' },
    { id: 'stop',     icon: <RefreshIcon size={13} />, title: 'Stop' },
  ]}
  status="Paused — Line 42"
/>` },
  collapsiblesection: { title: 'CollapsibleSectionView', desc: 'Expandable section with chevron toggle, colored chip title, count badge, and a right-side action slot.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.CollapsibleSectionPanel)), examples: slot(() => import('./components/collapsiblesectionview/examples/CollapsibleSectionViewExamples').then(m => m.CollapsibleSectionViewExamples)), docs: slot(() => import('./components/collapsiblesectionview/docs/CollapsibleSectionViewDocs').then(m => m.CollapsibleSectionViewDocs)), code: `function Preview() {\n  const [expanded, setExpanded] = useState(true);\n  return (\n    <CollapsibleSectionView\n      title="Variables"\n      expanded={expanded}\n      onToggle={() => setExpanded(v => !v)}\n      accentColor="var(--color-debug-key)"\n      badge={3}\n    >\n      <div style={{ padding: 8 }}>baseUrl, apiKey, timeout</div>\n    </CollapsibleSectionView>\n  );\n}` },
  jsontree:           { title: 'JsonTreeView', desc: 'Recursive JSON / object / array value tree with editor-style token colors. Expandable nodes with configurable default depth.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.JsonTreeViewPanel)), examples: slot(() => import('./components/jsontreeview/examples/JsonTreeViewExamples').then(m => m.JsonTreeViewExamples)), docs: slot(() => import('./components/jsontreeview/docs/JsonTreeViewDocs').then(m => m.JsonTreeViewDocs)), code: `<JsonTreeView\n  data={{ user: { id: 1, name: 'Alice', roles: ['admin'] } }}\n  defaultExpandDepth={2}\n/>` },
  logentry:           { title: 'ExpandableLogEntryView', desc: 'Expandable log row with icon, title, colored badge, timestamp chip, and chevron.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ExpandableLogEntryPanel)), examples: slot(() => import('./components/expandablelogentryview/examples/ExpandableLogEntryViewExamples').then(m => m.ExpandableLogEntryViewExamples)), docs: slot(() => import('./components/expandablelogentryview/docs/ExpandableLogEntryViewDocs').then(m => m.ExpandableLogEntryViewDocs)), code: `<ExpandableLogEntryView\n  icon={<ArrowUpRightIcon size={13} />}\n  title="Request Sent"\n  badge="POST"\n  badgeColor="var(--color-method-post)"\n  timestamp={Date.now()}\n/>` },
  copybutton:         { title: 'CopyButtonView', desc: 'Icon-only button that copies text to clipboard. Shows CopyIcon → CheckIcon swap for 1500ms on success.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.CopyButtonPanel)), examples: slot(() => import('./components/copybuttonview/examples/CopyButtonViewExamples').then(m => m.CopyButtonViewExamples)), docs: slot(() => import('./components/copybuttonview/docs/CopyButtonViewDocs').then(m => m.CopyButtonViewDocs)), code: `<CopyButtonView text="some text to copy" />\n<CopyButtonView text="token" size="xs" />` },
  markdownview:       { title: 'MarkdownView', desc: 'Renders Markdown (GFM) with syntax-highlighted code blocks, inline code, tables, task lists, blockquotes, and copy-buttons on each code block.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.MarkdownViewPanel)), examples: slot(() => import('./components/markdownview/examples/MarkdownViewExamples').then(m => m.MarkdownViewExamples)), docs: slot(() => import('./components/markdownview/docs/MarkdownViewDocs').then(m => m.MarkdownViewDocs)), code: `<MarkdownView content={"## Hello\\n\\nInline \`code\` and a code block:\\n\\n\`\`\`ts\\nconst x = 1;\\n\`\`\`"} />` },
  formdatatable:      { title: 'FormDataTableView', desc: 'Multipart/form-data key-value table with file upload support. Rows have: enabled toggle, key input, type dropdown (Text | File), value/file picker.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.FormDataTablePanel)), examples: slot(() => import('./components/formdatatableview/examples/FormDataTableViewExamples').then(m => m.FormDataTableViewExamples)), docs: slot(() => import('./components/formdatatableview/docs/FormDataTableViewDocs').then(m => m.FormDataTableViewDocs)), code: `function Preview() {\n  const [rows, setRows] = useState([{ id: '1', enabled: true, key: 'avatar', type: 'file', value: '' }]);\n  return <FormDataTableView rows={rows} onChange={setRows} label="Form Data" />;\n}` },
  yamlkeychip:        { title: 'YamlKeyChip', desc: 'Compact type-labeled chip for YAML/JSON keys. Shows the key name with a small colored type badge.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.YamlKeyChipPanel)), examples: slot(() => import('./components/yamlkeychip/examples/YamlKeyChipExamples').then(m => m.YamlKeyChipExamples)), docs: slot(() => import('./components/yamlkeychip/docs/YamlKeyChipDocs').then(m => m.YamlKeyChipDocs)), code: `<YamlKeyChip yamlKey="brand.primary" />\n<YamlKeyChip yamlKey="component_button.primary_bg" color="var(--color-success)" />` },
  livecolorpanel:     { title: 'LiveColorCustomizer', desc: 'Interactive color editor that applies CSS custom property changes directly to the document root in real time.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.LiveColorCustomizerPanel)), examples: slot(() => import('./components/livecolorpanel/examples/LiveColorCustomizerExamples').then(m => m.LiveColorCustomizerExamples)), docs: slot(() => import('./components/livecolorpanel/docs/LiveColorCustomizerDocs').then(m => m.LiveColorCustomizerDocs)), noExamplesHeader: true },
  spacerview:         { title: 'SpacerView', desc: 'Thin divider line for separating groups in icon rails, toolbars, or any flex container.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.SpacerViewPanel)), examples: slot(() => import('./components/spacerview/examples/SpacerViewExamples').then(m => m.SpacerViewExamples)), docs: slot(() => import('./components/spacerview/docs/SpacerViewDocs').then(m => m.SpacerViewDocs)), code: `<SpacerView orientation="vertical" spacing="md" />` },
  folderview:         { title: 'FolderView', desc: 'Generic folder tree component with expand/collapse, hover action buttons, DUI ContextMenuView on 3-dot, and DUI ModalView runner popup.', vars: VARS_ACCENT, liveContent: slot(() => import('./components/folderview/live/FolderViewLive').then(m => m.FolderViewLive)), examples: slot(() => import('./components/folderview/examples/FolderViewExamples').then(m => m.FolderViewExamples)), docs: slot(() => import('./components/folderview/docs/FolderViewDocs').then(m => m.FolderViewDocs)), code: `function Preview() {\n  const nodes = [{ id: 'f1', name: 'Users API', type: 'folder', children: [{ id: 'r1', name: 'GET /users', type: 'item' }] }];\n  return (\n    <FolderView\n      nodes={nodes}\n      accentColor="var(--color-protocol-rest)"\n      renderItem={(item, _node, depth) => <div style={{ paddingLeft: depth * 12 }}>{item.name}</div>}\n    />\n  );\n}` },
  debugeditor:        { title: 'DebugEditorView', desc: 'Monaco editor with breakpoint gutter, paused-line highlight, and variable-hover tooltips. Fully abstract — consumer provides the adapter.', vars: VARS_ACCENT, liveContent: slot(() => import('./components/debugeditor/live/DebugEditorViewLive').then(m => m.DebugEditorViewLive)), examples: slot(() => import('./components/debugeditor/examples/DebugEditorViewExamples').then(m => m.DebugEditorViewExamples)), docs: slot(() => import('./components/debugeditor/docs/DebugEditorViewDocs').then(m => m.DebugEditorViewDocs)), code: `function Preview() {\n  const [code, setCode] = useState('function add(a, b) {\n  return a + b;\n}');\n  const breakpoints = [1];\n  const pausedLine = 1;\n  const toggleBp = () => {};\n  return (\n    <DebugEditorView\n      value={code}\n      onChange={setCode}\n      language="javascript"\n      height={200}\n      breakpoints={breakpoints}\n      pausedLine={pausedLine}\n      adapter={{ onToggleBreakpoint: toggleBp }}\n    />\n  );\n}` },
  debugview:          { title: 'DebugView', desc: 'Editor-style Run & Debug sidebar panel — Variables (scoped tree), Watch expressions, Call Stack, Breakpoints. Fully abstract, no daakia store dependency.', vars: VARS_ACCENT, liveContent: slot(() => import('./components/debugview/live/DebugViewLive').then(m => m.DebugViewLive)), examples: slot(() => import('./components/debugview/examples/DebugViewExamples').then(m => m.DebugViewExamples)), docs: slot(() => import('./components/debugview/docs/DebugViewDocs').then(m => m.DebugViewDocs)), code: `function Preview() {\n  const session = { variables: [{ name: 'total', value: '42' }], callStack: [{ id: 'f1', label: 'main()' }], breakpoints: [] };\n  const [watchExprs, setWatchExprs] = useState([]);\n  return (\n    <DebugView\n      session={session}\n      watchExpressions={watchExprs}\n      actions={{\n        onContinue: () => {}, onStop: () => {}, onStepOver: () => {}, onStepInto: () => {},\n        onAddWatchExpression: expr => setWatchExprs(prev => [...prev, expr]),\n        onRemoveWatchExpression: expr => setWatchExprs(prev => prev.filter(e => e !== expr)),\n      }}\n    />\n  );\n}` },

  // ─── Sprint 7 · Batch L — Enterprise, Settings & SaaS ───────────────────────
  settingsrow:           { title: 'SettingsRowView',           desc: 'Label + description + control row — the standard settings-page primitive.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.SettingsRowPanel)), examples: slot(() => import('./components/settingsrow/examples/SettingsRowViewExamples').then(m => m.SettingsRowViewExamples)), docs: slot(() => import('./components/settingsrow/docs/SettingsRowViewDocs').then(m => m.SettingsRowViewDocs)), noExamplesHeader: true, code: `<SettingsRowView label="Two-factor auth" description="Require a code at sign-in." control={<ToggleSwitchView checked />} />` },
  settingssection:       { title: 'SettingsSectionView',       desc: 'Grouped settings card with a header — pairs with SettingsRowView.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.SettingsSectionPanel)), examples: slot(() => import('./components/settingssection/examples/SettingsSectionViewExamples').then(m => m.SettingsSectionViewExamples)), docs: slot(() => import('./components/settingssection/docs/SettingsSectionViewDocs').then(m => m.SettingsSectionViewDocs)), noExamplesHeader: true, code: `<SettingsSectionView title="Security" description="Manage sign-in and access.">\n  <SettingsRowView label="Two-factor auth" control={<ToggleSwitchView checked />} />\n</SettingsSectionView>` },
  onboardingchecklist:   { title: 'OnboardingChecklistView',   desc: 'Collapsible "getting started" progress checklist.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.OnboardingChecklistPanel)), examples: slot(() => import('./components/onboardingchecklist/examples/OnboardingChecklistViewExamples').then(m => m.OnboardingChecklistViewExamples)), docs: slot(() => import('./components/onboardingchecklist/docs/OnboardingChecklistViewDocs').then(m => m.OnboardingChecklistViewDocs)), noExamplesHeader: true, code: `<OnboardingChecklistView steps={[{ id: '1', label: 'Create workspace', done: true }, { id: '2', label: 'Send first request', done: false }]} />` },
  keyvaluelist:          { title: 'KeyValueListView',          desc: 'Lightweight label:value stacked list — no edit, no toolbar.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.KeyValueListPanel)), examples: slot(() => import('./components/keyvaluelist/examples/KeyValueListViewExamples').then(m => m.KeyValueListViewExamples)), docs: slot(() => import('./components/keyvaluelist/docs/KeyValueListViewDocs').then(m => m.KeyValueListViewDocs)), noExamplesHeader: true, code: `<KeyValueListView entries={[{ key: 'Plan', value: 'Pro' }, { key: 'Seats', value: '12' }]} />` },
  environmentbadge:      { title: 'EnvironmentBadgeView',      desc: 'Colored environment chip with an optional pulsing live indicator.', vars: VARS_STATUS, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.EnvironmentBadgePanel)), examples: slot(() => import('./components/environmentbadge/examples/EnvironmentBadgeViewExamples').then(m => m.EnvironmentBadgeViewExamples)), docs: slot(() => import('./components/environmentbadge/docs/EnvironmentBadgeViewDocs').then(m => m.EnvironmentBadgeViewDocs)), noExamplesHeader: true, code: `<EnvironmentBadgeView env="prod" live />` },
  versionbadge:          { title: 'VersionBadgeView',          desc: 'Version number chip with an "update available" dot indicator.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.VersionBadgePanel)), examples: slot(() => import('./components/versionbadge/examples/VersionBadgeViewExamples').then(m => m.VersionBadgeViewExamples)), docs: slot(() => import('./components/versionbadge/docs/VersionBadgeViewDocs').then(m => m.VersionBadgeViewDocs)), noExamplesHeader: true, code: `<VersionBadgeView version="2.4.1" updateAvailable onClick={() => {}} />` },
  licensebadge:          { title: 'LicenseBadgeView',          desc: 'Plan/tier ribbon badge — Free / Pro / Enterprise.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.LicenseBadgePanel)), examples: slot(() => import('./components/licensebadge/examples/LicenseBadgeViewExamples').then(m => m.LicenseBadgeViewExamples)), docs: slot(() => import('./components/licensebadge/docs/LicenseBadgeViewDocs').then(m => m.LicenseBadgeViewDocs)), noExamplesHeader: true, code: `<LicenseBadgeView tier="enterprise" />` },
  usagemeter:            { title: 'UsageMeterView',            desc: 'Quota bar (used/limit) with warning-color thresholds.', vars: VARS_STATUS, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.UsageMeterPanel)), examples: slot(() => import('./components/usagemeter/examples/UsageMeterViewExamples').then(m => m.UsageMeterViewExamples)), docs: slot(() => import('./components/usagemeter/docs/UsageMeterViewDocs').then(m => m.UsageMeterViewDocs)), noExamplesHeader: true, code: `<UsageMeterView used={82} limit={100} label="API calls" />` },
  permissionmatrix:      { title: 'PermissionMatrixView',      desc: 'Role x permission checkbox grid.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.PermissionMatrixPanel)), examples: slot(() => import('./components/permissionmatrix/examples/PermissionMatrixViewExamples').then(m => m.PermissionMatrixViewExamples)), docs: slot(() => import('./components/permissionmatrix/docs/PermissionMatrixViewDocs').then(m => m.PermissionMatrixViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [matrix, setMatrix] = useState([[true, true, false], [true, false, false]]);\n  return <PermissionMatrixView roles={['Viewer', 'Editor']} permissions={['Read', 'Write', 'Delete']} matrix={matrix} onChange={(ri, pi, v) => setMatrix(m => m.map((row, i) => i === ri ? row.map((c, j) => j === pi ? v : c) : row))} />;\n}` },
  auditlogrow:           { title: 'AuditLogRowView',           desc: 'Timestamped actor+action+target log row — audit trail primitive.', vars: VARS_TABLE, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.AuditLogRowPanel)), examples: slot(() => import('./components/auditlogrow/examples/AuditLogRowViewExamples').then(m => m.AuditLogRowViewExamples)), docs: slot(() => import('./components/auditlogrow/docs/AuditLogRowViewDocs').then(m => m.AuditLogRowViewDocs)), noExamplesHeader: true, code: `<AuditLogRowView timestamp="2026-07-02 09:14" actor="Jordan Lee" action="deleted" target="Users API" />` },
  webhookstatus:         { title: 'WebhookStatusView',         desc: 'Webhook endpoint health row — last delivery, status code, retry action.', vars: VARS_STATUS, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.WebhookStatusPanel)), examples: slot(() => import('./components/webhookstatus/examples/WebhookStatusViewExamples').then(m => m.WebhookStatusViewExamples)), docs: slot(() => import('./components/webhookstatus/docs/WebhookStatusViewDocs').then(m => m.WebhookStatusViewDocs)), noExamplesHeader: true, code: `<WebhookStatusView url="https://api.example.com/hooks/deploy" health="healthy" statusCode={200} lastDelivery="2m ago" onRetry={() => {}} />` },
  apikeyrow:             { title: 'ApiKeyRowView',             desc: 'Masked API key row with reveal/copy/revoke actions.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ApiKeyRowPanel)), examples: slot(() => import('./components/apikeyrow/examples/ApiKeyRowViewExamples').then(m => m.ApiKeyRowViewExamples)), docs: slot(() => import('./components/apikeyrow/docs/ApiKeyRowViewDocs').then(m => m.ApiKeyRowViewDocs)), noExamplesHeader: true, code: `<ApiKeyRowView label="Production" apiKey="sk_live_••••••••••••" onRevoke={() => {}} />` },
  ratelimitmeter:        { title: 'RateLimitMeterView',        desc: 'Requests-remaining ring gauge with a reset countdown label.', vars: VARS_STATUS, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.RateLimitMeterPanel)), examples: slot(() => import('./components/ratelimitmeter/examples/RateLimitMeterViewExamples').then(m => m.RateLimitMeterViewExamples)), docs: slot(() => import('./components/ratelimitmeter/docs/RateLimitMeterViewDocs').then(m => m.RateLimitMeterViewDocs)), noExamplesHeader: true, code: `<RateLimitMeterView remaining={342} limit={1000} resetLabel="in 12m" />` },
  emptyinbox:            { title: 'EmptyInboxView',            desc: 'Zero-notifications empty state — pre-styled variant of EmptyStateView.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.EmptyInboxPanel)), examples: slot(() => import('./components/emptyinbox/examples/EmptyInboxViewExamples').then(m => m.EmptyInboxViewExamples)), docs: slot(() => import('./components/emptyinbox/docs/EmptyInboxViewDocs').then(m => m.EmptyInboxViewDocs)), noExamplesHeader: true, code: `<EmptyInboxView />` },
  featurespotlightbadge: { title: 'FeatureSpotlightBadgeView', desc: 'Pulsing "New" badge for recently shipped features.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.FeatureSpotlightBadgePanel)), examples: slot(() => import('./components/featurespotlightbadge/examples/FeatureSpotlightBadgeViewExamples').then(m => m.FeatureSpotlightBadgeViewExamples)), docs: slot(() => import('./components/featurespotlightbadge/docs/FeatureSpotlightBadgeViewDocs').then(m => m.FeatureSpotlightBadgeViewDocs)), noExamplesHeader: true, code: `<FeatureSpotlightBadgeView label="New" />` },
  cookieconsentbanner:   { title: 'CookieConsentBannerView',   desc: 'Fixed bottom cookie-consent bar with accept/customize actions.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.CookieConsentBannerPanel)), examples: slot(() => import('./components/cookieconsentbanner/examples/CookieConsentBannerViewExamples').then(m => m.CookieConsentBannerViewExamples)), docs: slot(() => import('./components/cookieconsentbanner/docs/CookieConsentBannerViewDocs').then(m => m.CookieConsentBannerViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [open, setOpen] = useState(true);\n  return <CookieConsentBannerView open={open} onAccept={() => setOpen(false)} onCustomize={() => {}} />;\n}` },
  maintenancebanner:     { title: 'MaintenanceBannerView',     desc: 'Scheduled-downtime notice strip.', vars: VARS_STATUS, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.MaintenanceBannerPanel)), examples: slot(() => import('./components/maintenancebanner/examples/MaintenanceBannerViewExamples').then(m => m.MaintenanceBannerViewExamples)), docs: slot(() => import('./components/maintenancebanner/docs/MaintenanceBannerViewDocs').then(m => m.MaintenanceBannerViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [open, setOpen] = useState(true);\n  return <MaintenanceBannerView open={open} window="July 4, 2AM-4AM UTC" onDismiss={() => setOpen(false)} />;\n}` },
  trialcountdownbanner:  { title: 'TrialCountdownBannerView',  desc: '"N days left in trial" strip with an upgrade CTA.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.TrialCountdownBannerPanel)), examples: slot(() => import('./components/trialcountdownbanner/examples/TrialCountdownBannerViewExamples').then(m => m.TrialCountdownBannerViewExamples)), docs: slot(() => import('./components/trialcountdownbanner/docs/TrialCountdownBannerViewDocs').then(m => m.TrialCountdownBannerViewDocs)), noExamplesHeader: true, code: `<TrialCountdownBannerView daysLeft={3} onUpgrade={() => {}} />` },
  teammemberrow:         { title: 'TeamMemberRowView',         desc: 'Avatar + name + role + remove-action row — team management list item.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.TeamMemberRowPanel)), examples: slot(() => import('./components/teammemberrow/examples/TeamMemberRowViewExamples').then(m => m.TeamMemberRowViewExamples)), docs: slot(() => import('./components/teammemberrow/docs/TeamMemberRowViewDocs').then(m => m.TeamMemberRowViewDocs)), noExamplesHeader: true, code: `<TeamMemberRowView name="Jordan Lee" role="Platform Engineer" onRemove={remove} />` },
  inviteinput:           { title: 'InviteInputView',           desc: 'Email-chip input specialized for multi-invite forms.', vars: VARS_TAG, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.InviteInputPanel)), examples: slot(() => import('./components/inviteinput/examples/InviteInputViewExamples').then(m => m.InviteInputViewExamples)), docs: slot(() => import('./components/inviteinput/docs/InviteInputViewDocs').then(m => m.InviteInputViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [emails, setEmails] = useState(['jordan@daakia.app']);\n  return <InviteInputView emails={emails} onChange={setEmails} />;\n}` },
  roleselect:            { title: 'RoleSelectView',            desc: 'Role dropdown with a per-option description shown beneath the label.', vars: VARS_INPUT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.RoleSelectPanel)), examples: slot(() => import('./components/roleselect/examples/RoleSelectViewExamples').then(m => m.RoleSelectViewExamples)), docs: slot(() => import('./components/roleselect/docs/RoleSelectViewDocs').then(m => m.RoleSelectViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [role, setRole] = useState('editor');\n  return <RoleSelectView options={[{ value: 'viewer', label: 'Viewer', description: 'Read-only access' }, { value: 'editor', label: 'Editor', description: 'Can edit content' }]} value={role} onChange={setRole} />;\n}` },
  integrationcard:       { title: 'IntegrationCardView',       desc: 'Logo + name + connect/disconnect card — integrations/marketplace listing.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.IntegrationCardPanel)), examples: slot(() => import('./components/integrationcard/examples/IntegrationCardViewExamples').then(m => m.IntegrationCardViewExamples)), docs: slot(() => import('./components/integrationcard/docs/IntegrationCardViewDocs').then(m => m.IntegrationCardViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [connected, setConnected] = useState(false);\n  return <IntegrationCardView logo={<GlobeIcon size={18} />} name="Team Chat" connected={connected} onConnect={() => setConnected(true)} onDisconnect={() => setConnected(false)} />;\n}` },
  statuspagerow:         { title: 'StatusPageRowView',         desc: 'Service + uptime% + status-dot row — status page primitive.', vars: VARS_STATUS, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.StatusPageRowPanel)), examples: slot(() => import('./components/statuspagerow/examples/StatusPageRowViewExamples').then(m => m.StatusPageRowViewExamples)), docs: slot(() => import('./components/statuspagerow/docs/StatusPageRowViewDocs').then(m => m.StatusPageRowViewDocs)), noExamplesHeader: true, code: `<StatusPageRowView service="API" status="operational" uptime={99.98} />` },
  changelogentry:        { title: 'ChangelogEntryView',        desc: 'Version + date + change-type badges + description block.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ChangelogEntryPanel)), examples: slot(() => import('./components/changelogentry/examples/ChangelogEntryViewExamples').then(m => m.ChangelogEntryViewExamples)), docs: slot(() => import('./components/changelogentry/docs/ChangelogEntryViewDocs').then(m => m.ChangelogEntryViewDocs)), noExamplesHeader: true, code: `<ChangelogEntryView version="2.4.0" date="July 2, 2026" changes={[{ type: 'feature', description: 'Added mock servers' }]} />` },

  // ─── Sprint 7 · Batch I — Media & Files ─────────────────────────────────────
  imagegallery:  { title: 'ImageGalleryView',  desc: 'Grid gallery with a click-to-open lightbox — prev/next navigation, Escape to close.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ImageGalleryPanel)), examples: slot(() => import('./components/imagegallery/examples/ImageGalleryViewExamples').then(m => m.ImageGalleryViewExamples)), docs: slot(() => import('./components/imagegallery/docs/ImageGalleryViewDocs').then(m => m.ImageGalleryViewDocs)), noExamplesHeader: true, code: `<ImageGalleryView images={[{ src: 'https://picsum.photos/seed/1/300/200', alt: 'Photo' }]} columns={3} />` },
  imagecropper:  { title: 'ImageCropperView',  desc: 'Drag-crop + zoom image editor — fixed crop frame, pannable/zoomable image.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ImageCropperPanel)), examples: slot(() => import('./components/imagecropper/examples/ImageCropperViewExamples').then(m => m.ImageCropperViewExamples)), docs: slot(() => import('./components/imagecropper/docs/ImageCropperViewDocs').then(m => m.ImageCropperViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState({ x: 0, y: 0, zoom: 1.2 });\n  return <ImageCropperView src="https://picsum.photos/seed/2/600/400" value={value} onChange={setValue} height={220} />;\n}` },
  videoplayer:   { title: 'VideoPlayerView',   desc: 'Custom video controls wrapper — play/pause, seek, volume.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.VideoPlayerPanel)), examples: slot(() => import('./components/videoplayer/examples/VideoPlayerViewExamples').then(m => m.VideoPlayerViewExamples)), docs: slot(() => import('./components/videoplayer/docs/VideoPlayerViewDocs').then(m => m.VideoPlayerViewDocs)), noExamplesHeader: true, code: `<VideoPlayerView src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" />` },
  audiowaveform: { title: 'AudioWaveformView', desc: 'Static or animated waveform visualization primitive.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.AudioWaveformPanel)), examples: slot(() => import('./components/audiowaveform/examples/AudioWaveformViewExamples').then(m => m.AudioWaveformViewExamples)), docs: slot(() => import('./components/audiowaveform/docs/AudioWaveformViewDocs').then(m => m.AudioWaveformViewDocs)), noExamplesHeader: true, code: `<AudioWaveformView progress={0.4} animated />` },
  audioplayer:   { title: 'AudioPlayerView',   desc: 'Waveform + play/pause/seek audio player.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.AudioPlayerPanel)), examples: slot(() => import('./components/audioplayer/examples/AudioPlayerViewExamples').then(m => m.AudioPlayerViewExamples)), docs: slot(() => import('./components/audioplayer/docs/AudioPlayerViewDocs').then(m => m.AudioPlayerViewDocs)), noExamplesHeader: true, code: `<AudioPlayerView src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" />` },
  pdfviewer:     { title: 'PdfViewerView',     desc: 'Paginated PDF preview wrapper — browser native iframe renderer (needs a real PDF URL in production).', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.PdfViewerPanel)), examples: slot(() => import('./components/pdfviewer/examples/PdfViewerViewExamples').then(m => m.PdfViewerViewExamples)), docs: slot(() => import('./components/pdfviewer/docs/PdfViewerViewDocs').then(m => m.PdfViewerViewDocs)), noExamplesHeader: true, code: `<PdfViewerView src="https://example.com/document.pdf" totalPages={5} height={480} />` },
  fileicon:      { title: 'FileIconView',      desc: 'Extension-based file-type icon + name + size row.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.FileIconPanel)), examples: slot(() => import('./components/fileicon/examples/FileIconViewExamples').then(m => m.FileIconViewExamples)), docs: slot(() => import('./components/fileicon/docs/FileIconViewDocs').then(m => m.FileIconViewDocs)), noExamplesHeader: true, code: `<FileIconView name="report.pdf" bytes={204800} />` },
  filelist:      { title: 'FileListView',      desc: 'Uploaded-files list with per-row progress and remove action.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.FileListPanel)), examples: slot(() => import('./components/filelist/examples/FileListViewExamples').then(m => m.FileListViewExamples)), docs: slot(() => import('./components/filelist/docs/FileListViewDocs').then(m => m.FileListViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [files, setFiles] = useState([{ id: '1', name: 'hero.png', bytes: 102400, progress: 100 }]);\n  return <FileListView files={files} onRemove={id => setFiles(f => f.filter(x => x.id !== id))} />;\n}` },
  draghandle:    { title: 'DragHandleView',    desc: 'Grab-handle primitive for reorderable lists — six-dot grip icon.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.DragHandlePanel)), examples: slot(() => import('./components/draghandle/examples/DragHandleViewExamples').then(m => m.DragHandleViewExamples)), docs: slot(() => import('./components/draghandle/docs/DragHandleViewDocs').then(m => m.DragHandleViewDocs)), noExamplesHeader: true, code: `<DragHandleView />` },
  signaturepad:  { title: 'SignaturePadView',  desc: 'Canvas signature capture — draw with mouse/touch/pen, exports a PNG data URL.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.SignaturePadPanel)), examples: slot(() => import('./components/signaturepad/examples/SignaturePadViewExamples').then(m => m.SignaturePadViewExamples)), docs: slot(() => import('./components/signaturepad/docs/SignaturePadViewDocs').then(m => m.SignaturePadViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [dataUrl, setDataUrl] = useState(null);\n  return <SignaturePadView onChange={setDataUrl} height={160} />;\n}` },
  barcode:       { title: 'BarcodeView',       desc: 'Deterministic bar-pattern generator, visually representative — not a scannable encoder.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.BarcodePanel)), examples: slot(() => import('./components/barcode/examples/BarcodeViewExamples').then(m => m.BarcodeViewExamples)), docs: slot(() => import('./components/barcode/docs/BarcodeViewDocs').then(m => m.BarcodeViewDocs)), noExamplesHeader: true, code: `<BarcodeView value="8901234567890" />` },
  imagezoom:     { title: 'ImageZoomView',     desc: 'Click-to-zoom lightbox for a single image.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ImageZoomPanel)), examples: slot(() => import('./components/imagezoom/examples/ImageZoomViewExamples').then(m => m.ImageZoomViewExamples)), docs: slot(() => import('./components/imagezoom/docs/ImageZoomViewDocs').then(m => m.ImageZoomViewDocs)), noExamplesHeader: true, code: `<ImageZoomView src="https://picsum.photos/seed/3/500/400" alt="Product photo" />` },

  // ─── Sprint 7 · Batch E — Data Display & "Wow" ──────────────────────────────
  timeline:         { title: 'TimelineView',         desc: 'Event trail with icon nodes — vertical (default) or horizontal.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.TimelinePanel)), examples: slot(() => import('./components/timeline/examples/TimelineViewExamples').then(m => m.TimelineViewExamples)), docs: slot(() => import('./components/timeline/docs/TimelineViewDocs').then(m => m.TimelineViewDocs)), noExamplesHeader: true, code: `<TimelineView entries={[{ id: '1', title: 'Request sent', timestamp: '10:02 AM' }]} />` },
  activityfeed:     { title: 'ActivityFeedView',     desc: 'Chronological activity feed, entries grouped by day.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ActivityFeedPanel)), examples: slot(() => import('./components/activityfeed/examples/ActivityFeedViewExamples').then(m => m.ActivityFeedViewExamples)), docs: slot(() => import('./components/activityfeed/docs/ActivityFeedViewDocs').then(m => m.ActivityFeedViewDocs)), noExamplesHeader: true, code: `<ActivityFeedView entries={[{ id: '1', actor: 'Jordan Lee', action: 'deployed Users API', timestamp: '9:14 AM', day: '2026-07-02' }]} />` },
  kanbanboard:      { title: 'KanbanBoardView',      desc: 'Draggable columns + cards board, native HTML5 drag-and-drop.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.KanbanBoardPanel)), examples: slot(() => import('./components/kanbanboard/examples/KanbanBoardViewExamples').then(m => m.KanbanBoardViewExamples)), docs: slot(() => import('./components/kanbanboard/docs/KanbanBoardViewDocs').then(m => m.KanbanBoardViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [columns, setColumns] = useState([{ id: 'todo', title: 'To Do', cards: [{ id: 'c1', title: 'Design auth flow' }] }]);\n  return <KanbanBoardView columns={columns} onChange={setColumns} />;\n}` },
  sparkline:        { title: 'SparklineView',        desc: 'Tiny inline SVG trend line, no axes — for table cells / stat cards.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.SparklinePanel)), examples: slot(() => import('./components/sparkline/examples/SparklineViewExamples').then(m => m.SparklineViewExamples)), docs: slot(() => import('./components/sparkline/docs/SparklineViewDocs').then(m => m.SparklineViewDocs)), noExamplesHeader: true, code: `<SparklineView data={[4, 8, 6, 9, 12, 10, 14]} width={100} height={28} />` },
  heatmapcalendar:  { title: 'HeatmapCalendarView',  desc: 'GitHub-style contribution heatmap — day cells shaded by count, tooltip on hover.', vars: VARS_STATUS, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.HeatmapCalendarPanel)), examples: slot(() => import('./components/heatmapcalendar/examples/HeatmapCalendarViewExamples').then(m => m.HeatmapCalendarViewExamples)), docs: slot(() => import('./components/heatmapcalendar/docs/HeatmapCalendarViewDocs').then(m => m.HeatmapCalendarViewDocs)), noExamplesHeader: true, code: `<HeatmapCalendarView data={[{ date: '2026-07-01', count: 4 }, { date: '2026-07-02', count: 1 }]} />` },
  comparisonslider: { title: 'ComparisonSliderView', desc: 'Before/after drag slider for image comparison.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ComparisonSliderPanel)), examples: slot(() => import('./components/comparisonslider/examples/ComparisonSliderViewExamples').then(m => m.ComparisonSliderViewExamples)), docs: slot(() => import('./components/comparisonslider/docs/ComparisonSliderViewDocs').then(m => m.ComparisonSliderViewDocs)), noExamplesHeader: true, code: `<ComparisonSliderView beforeSrc="https://picsum.photos/seed/4/500/300" afterSrc="https://picsum.photos/seed/5/500/300" beforeLabel="Before" afterLabel="After" />` },
  carousel:         { title: 'CarouselView',         desc: 'Swipeable card carousel with dot indicators — autoplay pauses on hover.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.CarouselPanel)), examples: slot(() => import('./components/carousel/examples/CarouselViewExamples').then(m => m.CarouselViewExamples)), docs: slot(() => import('./components/carousel/docs/CarouselViewDocs').then(m => m.CarouselViewDocs)), noExamplesHeader: true, code: `<CarouselView slides={[<div key="1">Slide 1</div>, <div key="2">Slide 2</div>]} autoplay />` },
  qrcode:           { title: 'QRCodeView',           desc: 'QR-style module grid with finder-pattern corners — visual, not spec-compliant/scannable.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.QRCodePanel)), examples: slot(() => import('./components/qrcode/examples/QRCodeViewExamples').then(m => m.QRCodeViewExamples)), docs: slot(() => import('./components/qrcode/docs/QRCodeViewDocs').then(m => m.QRCodeViewDocs)), noExamplesHeader: true, code: `<QRCodeView value="https://daakia.app" size={140} />` },
  stattrendcard:    { title: 'StatTrendCardView',    desc: 'Animated count-up number + sparkline trend — distinct from the static StatsCardView.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.StatTrendCardPanel)), examples: slot(() => import('./components/stattrendcard/examples/StatTrendCardViewExamples').then(m => m.StatTrendCardViewExamples)), docs: slot(() => import('./components/stattrendcard/docs/StatTrendCardViewDocs').then(m => m.StatTrendCardViewDocs)), noExamplesHeader: true, code: `<StatTrendCardView label="Requests today" value={1842} trend={[900, 1100, 1400, 1700, 1842]} />` },
  pricingcard:      { title: 'PricingCardView',      desc: 'Plan comparison card with a "popular" ribbon.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.PricingCardPanel)), examples: slot(() => import('./components/pricingcard/examples/PricingCardViewExamples').then(m => m.PricingCardViewExamples)), docs: slot(() => import('./components/pricingcard/docs/PricingCardViewDocs').then(m => m.PricingCardViewDocs)), noExamplesHeader: true, code: `<PricingCardView planName="Pro" price="$29" features={['Unlimited requests', 'Team collaboration']} popular />` },
  testimonialcard:  { title: 'TestimonialCardView',  desc: 'Quote + avatar testimonial card.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.TestimonialCardPanel)), examples: slot(() => import('./components/testimonialcard/examples/TestimonialCardViewExamples').then(m => m.TestimonialCardViewExamples)), docs: slot(() => import('./components/testimonialcard/docs/TestimonialCardViewDocs').then(m => m.TestimonialCardViewDocs)), noExamplesHeader: true, code: `<TestimonialCardView quote="Daakia cut our testing time in half." author="Jordan Lee" role="Platform Engineer" />` },
  ratingbreakdown:  { title: 'RatingBreakdownView',  desc: '5-star rating distribution bars — App Store-style rating breakdown.', vars: VARS_STATUS, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.RatingBreakdownPanel)), examples: slot(() => import('./components/ratingbreakdown/examples/RatingBreakdownViewExamples').then(m => m.RatingBreakdownViewExamples)), docs: slot(() => import('./components/ratingbreakdown/docs/RatingBreakdownViewDocs').then(m => m.RatingBreakdownViewDocs)), noExamplesHeader: true, code: `<RatingBreakdownView counts={[2, 4, 10, 28, 56]} />` },
  treeselect:       { title: 'TreeSelectView',       desc: 'Checkbox-driven hierarchical select — tri-state parent checkboxes over a folder-style tree.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.TreeSelectPanel)), examples: slot(() => import('./components/treeselect/examples/TreeSelectViewExamples').then(m => m.TreeSelectViewExamples)), docs: slot(() => import('./components/treeselect/docs/TreeSelectViewDocs').then(m => m.TreeSelectViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState(['ca']);\n  return <TreeSelectView nodes={[{ id: 'us', label: 'United States', children: [{ id: 'ca', label: 'California' }] }]} value={value} onChange={setValue} />;\n}` },
  richtexttoolbar:  { title: 'RichTextToolbarView',  desc: 'Formatting toolbar primitive — bold/italic/underline/link/list/code.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.RichTextToolbarPanel)), examples: slot(() => import('./components/richtexttoolbar/examples/RichTextToolbarViewExamples').then(m => m.RichTextToolbarViewExamples)), docs: slot(() => import('./components/richtexttoolbar/docs/RichTextToolbarViewDocs').then(m => m.RichTextToolbarViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [active, setActive] = useState(['bold']);\n  return <RichTextToolbarView active={active} onAction={a => setActive(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])} />;\n}` },
  mentioninput:     { title: 'MentionInputView',     desc: '@mention autocomplete textarea.', vars: VARS_INPUT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.MentionInputPanel)), examples: slot(() => import('./components/mentioninput/examples/MentionInputViewExamples').then(m => m.MentionInputViewExamples)), docs: slot(() => import('./components/mentioninput/docs/MentionInputViewDocs').then(m => m.MentionInputViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState('');\n  return <MentionInputView value={value} onChange={setValue} users={[{ id: '1', label: 'Jordan Lee' }]} />;\n}` },
  gradienttext:        { title: 'GradientTextView',        desc: 'Animated gradient-shifting text.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.GradientTextPanel)), examples: slot(() => import('./components/gradienttext/examples/GradientTextViewExamples').then(m => m.GradientTextViewExamples)), docs: slot(() => import('./components/gradienttext/docs/GradientTextViewDocs').then(m => m.GradientTextViewDocs)), noExamplesHeader: true, code: `<GradientTextView>Ship faster with Daakia</GradientTextView>` },
  typewritertext:      { title: 'TypewriterTextView',      desc: 'Animated typing-effect text.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.TypewriterTextPanel)), examples: slot(() => import('./components/typewritertext/examples/TypewriterTextViewExamples').then(m => m.TypewriterTextViewExamples)), docs: slot(() => import('./components/typewritertext/docs/TypewriterTextViewDocs').then(m => m.TypewriterTextViewDocs)), noExamplesHeader: true, code: `<TypewriterTextView text={['Build APIs.', 'Test flows.', 'Ship faster.']} />` },
  countupnumber:       { title: 'CountUpNumberView',       desc: 'Standalone animated number count-up primitive.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.CountUpNumberPanel)), examples: slot(() => import('./components/countupnumber/examples/CountUpNumberViewExamples').then(m => m.CountUpNumberViewExamples)), docs: slot(() => import('./components/countupnumber/docs/CountUpNumberViewDocs').then(m => m.CountUpNumberViewDocs)), noExamplesHeader: true, code: `<CountUpNumberView value={1284} suffix=" reqs" />` },
  magneticbutton:      { title: 'MagneticButtonView',      desc: 'Cursor-attraction hover button effect.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.MagneticButtonPanel)), examples: slot(() => import('./components/magneticbutton/examples/MagneticButtonViewExamples').then(m => m.MagneticButtonViewExamples)), docs: slot(() => import('./components/magneticbutton/docs/MagneticButtonViewDocs').then(m => m.MagneticButtonViewDocs)), noExamplesHeader: true, code: `<MagneticButtonView onClick={() => {}}>Hover me</MagneticButtonView>` },
  tiltcard:            { title: 'TiltCardView',            desc: '3D perspective tilt-on-hover card.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.TiltCardPanel)), examples: slot(() => import('./components/tiltcard/examples/TiltCardViewExamples').then(m => m.TiltCardViewExamples)), docs: slot(() => import('./components/tiltcard/docs/TiltCardViewDocs').then(m => m.TiltCardViewDocs)), noExamplesHeader: true, code: `<TiltCardView>...</TiltCardView>` },
  particlebackground:  { title: 'ParticleBackgroundView',  desc: 'Subtle animated particle/dot background.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ParticleBackgroundPanel)), examples: slot(() => import('./components/particlebackground/examples/ParticleBackgroundViewExamples').then(m => m.ParticleBackgroundViewExamples)), docs: slot(() => import('./components/particlebackground/docs/ParticleBackgroundViewDocs').then(m => m.ParticleBackgroundViewDocs)), noExamplesHeader: true, code: `<ParticleBackgroundView height={160} />` },
  glowborder:          { title: 'GlowBorderView',          desc: 'Animated gradient glowing-border wrapper.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.GlowBorderPanel)), examples: slot(() => import('./components/glowborder/examples/GlowBorderViewExamples').then(m => m.GlowBorderViewExamples)), docs: slot(() => import('./components/glowborder/docs/GlowBorderViewDocs').then(m => m.GlowBorderViewDocs)), noExamplesHeader: true, code: `<GlowBorderView>...</GlowBorderView>` },
  revealonscroll:      { title: 'RevealOnScrollView',      desc: 'Fade/slide-in-on-scroll wrapper.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.RevealOnScrollPanel)), examples: slot(() => import('./components/revealonscroll/examples/RevealOnScrollViewExamples').then(m => m.RevealOnScrollViewExamples)), docs: slot(() => import('./components/revealonscroll/docs/RevealOnScrollViewDocs').then(m => m.RevealOnScrollViewDocs)), noExamplesHeader: true, code: `<RevealOnScrollView direction="up">...</RevealOnScrollView>` },
  floatinglabelinput:  { title: 'FloatingLabelInputView',  desc: "Floating-label input, distinct from TextInputView's static placeholder.", vars: VARS_INPUT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.FloatingLabelInputPanel)), examples: slot(() => import('./components/floatinglabelinput/examples/FloatingLabelInputViewExamples').then(m => m.FloatingLabelInputViewExamples)), docs: slot(() => import('./components/floatinglabelinput/docs/FloatingLabelInputViewDocs').then(m => m.FloatingLabelInputViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState('');\n  return <FloatingLabelInputView label="Workspace name" value={value} onChange={setValue} />;\n}` },
  pulsedot:            { title: 'PulseDotView',            desc: 'Attention-grabbing pulsing dot primitive — complements StatusIndicatorView.', vars: VARS_STATUS, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.PulseDotPanel)), examples: slot(() => import('./components/pulsedot/examples/PulseDotViewExamples').then(m => m.PulseDotViewExamples)), docs: slot(() => import('./components/pulsedot/docs/PulseDotViewDocs').then(m => m.PulseDotViewDocs)), noExamplesHeader: true, code: `<PulseDotView />` },
  requestflow:            { title: 'RequestFlowView',            desc: 'Animated network waterfall — particles travel a DNS→TCP→TLS→Request→Response pipe, speed/color mapped to real phase timing.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.RequestFlowPanel)), examples: slot(() => import('./components/requestflow/examples/RequestFlowViewExamples').then(m => m.RequestFlowViewExamples)), docs: slot(() => import('./components/requestflow/docs/RequestFlowViewDocs').then(m => m.RequestFlowViewDocs)), noExamplesHeader: true, code: `<RequestFlowView phases={[{ id: 'dns', label: 'DNS', duration: 20, color: 'var(--color-primary)' }, { id: 'tcp', label: 'TCP', duration: 40, color: 'var(--color-warning)' }, { id: 'tls', label: 'TLS', duration: 60, color: 'var(--color-success)' }, { id: 'req', label: 'Request', duration: 30, color: 'var(--color-primary)' }, { id: 'res', label: 'Response', duration: 90, color: 'var(--color-error)' }]} />` },
  latencypulse:           { title: 'LatencyPulseView',           desc: 'EKG/vitals-monitor style live pulse line for request latency — a metric that visually "beats" instead of a static line chart.', vars: VARS_STATUS, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.LatencyPulsePanel)), examples: slot(() => import('./components/latencypulse/examples/LatencyPulseViewExamples').then(m => m.LatencyPulseViewExamples)), docs: slot(() => import('./components/latencypulse/docs/LatencyPulseViewDocs').then(m => m.LatencyPulseViewDocs)), noExamplesHeader: true, code: `<LatencyPulseView latencyMs={180} />` },
  aistreamingtext:        { title: 'AIStreamingTextView',        desc: 'Token-by-token LLM output renderer — per-token fade-in, thinking shimmer, soft blink cursor.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.AIStreamingTextPanel)), examples: slot(() => import('./components/aistreamingtext/examples/AIStreamingTextViewExamples').then(m => m.AIStreamingTextViewExamples)), docs: slot(() => import('./components/aistreamingtext/docs/AIStreamingTextViewDocs').then(m => m.AIStreamingTextViewDocs)), noExamplesHeader: true, code: `<AIStreamingTextView text="Here's a summary of your API traffic." streaming />` },
  commandorb:             { title: 'CommandOrbView',             desc: 'Floating, breathing circular AI-assistant orb — idle pulse → thinking ripple → speaking waveform, expands into a chat panel.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.CommandOrbPanel)), examples: slot(() => import('./components/commandorb/examples/CommandOrbViewExamples').then(m => m.CommandOrbViewExamples)), docs: slot(() => import('./components/commandorb/docs/CommandOrbViewDocs').then(m => m.CommandOrbViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [state, setState] = useState('idle');\n  return <CommandOrbView state={state} onClick={() => setState(s => s === 'idle' ? 'thinking' : s === 'thinking' ? 'speaking' : 'idle')} />;\n}` },
  timetravelslider:       { title: 'TimeTravelSliderView',       desc: 'Scrub a draggable playhead across a sparkline of past states — a time-travel state scrubber, generalized into a reusable primitive.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.TimeTravelSliderPanel)), examples: slot(() => import('./components/timetravelslider/examples/TimeTravelSliderViewExamples').then(m => m.TimeTravelSliderViewExamples)), docs: slot(() => import('./components/timetravelslider/docs/TimeTravelSliderViewDocs').then(m => m.TimeTravelSliderViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const states = [12, 18, 15, 30, 42, 38, 50];\n  const [index, setIndex] = useState(states.length - 1);\n  return <TimeTravelSliderView states={states} index={index} onScrub={setIndex} toValue={s => s} toLabel={s => 'Value: ' + s} />;\n}` },
  diffmorph:              { title: 'DiffMorphView',              desc: 'Old→new text FLIP-animates unchanged words into their new position while changed words fade/strike — an edit visually "reflows".', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.DiffMorphPanel)), examples: slot(() => import('./components/diffmorph/examples/DiffMorphViewExamples').then(m => m.DiffMorphViewExamples)), docs: slot(() => import('./components/diffmorph/docs/DiffMorphViewDocs').then(m => m.DiffMorphViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [text, setText] = useState('The quick brown fox jumps over the lazy dog');\n  return (\n    <div>\n      <DiffMorphView text={text} />\n      <ButtonView size="sm" style={{ marginTop: 8 }} onClick={() => setText('The quick red fox leaps over the sleepy dog')}>Edit</ButtonView>\n    </div>\n  );\n}` },
  schemablueprint:        { title: 'SchemaBlueprintView',        desc: 'JSON Schema / OpenAPI spec rendered as an architectural blueprint — graph-paper background, dashed right-angle connectors.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.SchemaBlueprintPanel)), examples: slot(() => import('./components/schemablueprint/examples/SchemaBlueprintViewExamples').then(m => m.SchemaBlueprintViewExamples)), docs: slot(() => import('./components/schemablueprint/docs/SchemaBlueprintViewDocs').then(m => m.SchemaBlueprintViewDocs)), noExamplesHeader: true, code: `<SchemaBlueprintView nodes={[{ id: 'user', title: 'User', fields: [{ name: 'id', type: 'string' }, { name: 'orgId', type: 'ref' }], connectsTo: ['org'] }, { id: 'org', title: 'Organization', fields: [{ name: 'id', type: 'string' }] }]} />` },
  livecursorpresence:     { title: 'LiveCursorPresenceView',     desc: 'Collaborative cursors with name tags, overlaid on arbitrary content.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.LiveCursorPresencePanel)), examples: slot(() => import('./components/livecursorpresence/examples/LiveCursorPresenceViewExamples').then(m => m.LiveCursorPresenceViewExamples)), docs: slot(() => import('./components/livecursorpresence/docs/LiveCursorPresenceViewDocs').then(m => m.LiveCursorPresenceViewDocs)), noExamplesHeader: true, code: `<LiveCursorPresenceView cursors={[{ id: '1', name: 'Jordan', x: 0.3, y: 0.4 }, { id: '2', name: 'Priya', x: 0.7, y: 0.6 }]}>\n  <div style={{ height: 160, border: '1px solid var(--color-surface-border)', borderRadius: 8 }} />\n</LiveCursorPresenceView>` },
  undoredotimeline:       { title: 'UndoRedoTimelineView',       desc: "History rendered as a branching git-log graph — jump to any node, diverging edits show as visible branches instead of discarding redo state.", vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.UndoRedoTimelinePanel)), examples: slot(() => import('./components/undoredotimeline/examples/UndoRedoTimelineViewExamples').then(m => m.UndoRedoTimelineViewExamples)), docs: slot(() => import('./components/undoredotimeline/docs/UndoRedoTimelineViewDocs').then(m => m.UndoRedoTimelineViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const nodes = [{ id: 'a', label: 'Initial' }, { id: 'b', label: 'Add header', parentId: 'a' }, { id: 'c', label: 'Add auth', parentId: 'b' }, { id: 'd', label: 'Revert header', parentId: 'a' }];\n  const [active, setActive] = useState('c');\n  return <UndoRedoTimelineView nodes={nodes} activeId={active} onSelect={setActive} />;\n}` },
  dialknobinput:          { title: 'DialKnobInputView',          desc: 'Rotary analog knob (drag in a circle) with snap-ticks and a haptic-style micro-bounce at each notch — for tactile numeric tuning.', vars: VARS_INPUT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.DialKnobInputPanel)), examples: slot(() => import('./components/dialknobinput/examples/DialKnobInputViewExamples').then(m => m.DialKnobInputViewExamples)), docs: slot(() => import('./components/dialknobinput/docs/DialKnobInputViewDocs').then(m => m.DialKnobInputViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState(30);\n  return <DialKnobInputView value={value} onChange={setValue} label="Timeout (s)" />;\n}` },
  holdtoconfirm:          { title: 'HoldToConfirmView',          desc: 'Press-and-hold with a radial fill that must complete before the destructive action fires — replaces "type DELETE to confirm" modals.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.HoldToConfirmPanel)), examples: slot(() => import('./components/holdtoconfirm/examples/HoldToConfirmViewExamples').then(m => m.HoldToConfirmViewExamples)), docs: slot(() => import('./components/holdtoconfirm/docs/HoldToConfirmViewDocs').then(m => m.HoldToConfirmViewDocs)), noExamplesHeader: true, code: `<HoldToConfirmView onConfirm={() => {}}>Hold to delete</HoldToConfirmView>` },
  morphingiconbutton:     { title: 'MorphingIconButtonView',     desc: 'The icon itself SVG-path-morphs between two states (play↔pause, menu↔close, sun↔moon) instead of a crossfade/swap.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.MorphingIconButtonPanel)), examples: slot(() => import('./components/morphingiconbutton/examples/MorphingIconButtonViewExamples').then(m => m.MorphingIconButtonViewExamples)), docs: slot(() => import('./components/morphingiconbutton/docs/MorphingIconButtonViewDocs').then(m => m.MorphingIconButtonViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [active, setActive] = useState(false);\n  return <MorphingIconButtonView preset="play-pause" active={active} onClick={() => setActive(a => !a)} />;\n}` },
  stackedswipecard:       { title: 'StackedSwipeCardView',       desc: 'Swipeable card stack for one-at-a-time approve/reject flows.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.StackedSwipeCardPanel)), examples: slot(() => import('./components/stackedswipecard/examples/StackedSwipeCardViewExamples').then(m => m.StackedSwipeCardViewExamples)), docs: slot(() => import('./components/stackedswipecard/docs/StackedSwipeCardViewDocs').then(m => m.StackedSwipeCardViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [items, setItems] = useState(['Request #1', 'Request #2', 'Request #3']);\n  return (\n    <StackedSwipeCardView\n      items={items}\n      renderItem={item => <div>{item}</div>}\n      onSwipe={item => setItems(prev => prev.filter(i => i !== item))}\n    />\n  );\n}` },
  networkweather:         { title: 'NetworkWeatherView',         desc: 'System health/error-rate expressed as literal weather (sunny → cloudy → stormy) instead of a number or status dot.', vars: VARS_STATUS, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.NetworkWeatherPanel)), examples: slot(() => import('./components/networkweather/examples/NetworkWeatherViewExamples').then(m => m.NetworkWeatherViewExamples)), docs: slot(() => import('./components/networkweather/docs/NetworkWeatherViewDocs').then(m => m.NetworkWeatherViewDocs)), noExamplesHeader: true, code: `<NetworkWeatherView condition="stormy" />` },
  constellationloader:    { title: 'ConstellationLoaderView',    desc: "Loading dots drift and connect into shifting constellation lines — ties back to NetworkGraphView's node-link visual identity.", vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ConstellationLoaderPanel)), examples: slot(() => import('./components/constellationloader/examples/ConstellationLoaderViewExamples').then(m => m.ConstellationLoaderViewExamples)), docs: slot(() => import('./components/constellationloader/docs/ConstellationLoaderViewDocs').then(m => m.ConstellationLoaderViewDocs)), noExamplesHeader: true, code: `<ConstellationLoaderView />` },
  holocard:               { title: 'HoloCardView',               desc: 'A card with a mouse-position-reactive holographic/iridescent sheen — pure premium-feel "wow" for pricing/feature callouts.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.HoloCardPanel)), examples: slot(() => import('./components/holocard/examples/HoloCardViewExamples').then(m => m.HoloCardViewExamples)), docs: slot(() => import('./components/holocard/docs/HoloCardViewDocs').then(m => m.HoloCardViewDocs)), noExamplesHeader: true, code: `<HoloCardView>\n  <div style={{ fontWeight: 700 }}>Pro Plan</div>\n  <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Move your mouse over this card.</div>\n</HoloCardView>` },
  ghosttypingplaceholder: { title: 'GhostTypingPlaceholderView', desc: 'An input placeholder that types out rotating example queries, pauses, then backspaces into the next one.', vars: VARS_INPUT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.GhostTypingPlaceholderPanel)), examples: slot(() => import('./components/ghosttypingplaceholder/examples/GhostTypingPlaceholderViewExamples').then(m => m.GhostTypingPlaceholderViewExamples)), docs: slot(() => import('./components/ghosttypingplaceholder/docs/GhostTypingPlaceholderViewDocs').then(m => m.GhostTypingPlaceholderViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState('');\n  return <GhostTypingPlaceholderView value={value} onChange={setValue} examples={['search users by email…', 'filter by status: active…', 'jump to request #4521…']} />;\n}` },
  connectionpulseline:    { title: 'ConnectionPulseLineView',    desc: 'A dashed/gradient SVG line connecting two arbitrary DOM elements, with a traveling pulse dot — visually links spatially separate but logically related UI.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.ConnectionPulseLinePanel)), examples: slot(() => import('./components/connectionpulseline/examples/ConnectionPulseLineViewExamples').then(m => m.ConnectionPulseLineViewExamples)), docs: slot(() => import('./components/connectionpulseline/docs/ConnectionPulseLineViewDocs').then(m => m.ConnectionPulseLineViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const containerRef = useRef(null);\n  const fromRef = useRef(null);\n  const toRef = useRef(null);\n  return (\n    <div ref={containerRef} style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', height: 60 }}>\n      <div ref={fromRef} style={{ width: 60, height: 32, border: '1px solid var(--color-surface-border)', borderRadius: 6 }} />\n      <div ref={toRef} style={{ width: 60, height: 32, border: '1px solid var(--color-surface-border)', borderRadius: 6 }} />\n      <ConnectionPulseLineView containerRef={containerRef} from={fromRef} to={toRef} />\n    </div>\n  );\n}` },
  stackedtoastdeck:       { title: 'StackedToastDeckView',       desc: "Toasts don't stack vertically — older ones shrink and recede behind the newest like a physical card deck; click the deck to fan them back out.", vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.StackedToastDeckPanel)), examples: slot(() => import('./components/stackedtoastdeck/examples/StackedToastDeckViewExamples').then(m => m.StackedToastDeckViewExamples)), docs: slot(() => import('./components/stackedtoastdeck/docs/StackedToastDeckViewDocs').then(m => m.StackedToastDeckViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [toasts, setToasts] = useState([{ id: '1', content: 'Deploy succeeded' }, { id: '2', content: 'New comment on PR #42' }, { id: '3', content: 'Webhook delivered' }]);\n  return <StackedToastDeckView toasts={toasts} onDismiss={id => setToasts(prev => prev.filter(t => t.id !== id))} />;\n}` },
  pathreveal:             { title: 'PathRevealView',             desc: 'Generic SVG stroke-draw reveal primitive — any path/diagram/signature "draws itself" on mount instead of just fading in.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.PathRevealPanel)), examples: slot(() => import('./components/pathreveal/examples/PathRevealViewExamples').then(m => m.PathRevealViewExamples)), docs: slot(() => import('./components/pathreveal/docs/PathRevealViewDocs').then(m => m.PathRevealViewDocs)), noExamplesHeader: true, code: `<PathRevealView d="M10 50 Q 30 10 50 50 T 90 50" viewBox="0 0 100 100" width={120} height={80} />` },
  spectrumslider:         { title: 'SpectrumSliderView',         desc: 'The slider track itself is a live rendered gradient spectrum, and the handle shows a magnified live-color preview bubble as you drag.', vars: VARS_INPUT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.SpectrumSliderPanel)), examples: slot(() => import('./components/spectrumslider/examples/SpectrumSliderViewExamples').then(m => m.SpectrumSliderViewExamples)), docs: slot(() => import('./components/spectrumslider/docs/SpectrumSliderViewDocs').then(m => m.SpectrumSliderViewDocs)), noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState(50);\n  return <SpectrumSliderView value={value} onChange={setValue} />;\n}` },
  breathingloader:        { title: 'BreathingLoaderView',        desc: 'An ultra-minimal loading state — a single circle slowly scales/fades in a breathing rhythm — a calmer alternative to a spinner.', vars: VARS_ACCENT, liveContent: slot(() => import('./panels/NewComponentPanels').then(m => m.BreathingLoaderPanel)), examples: slot(() => import('./components/breathingloader/examples/BreathingLoaderViewExamples').then(m => m.BreathingLoaderViewExamples)), docs: slot(() => import('./components/breathingloader/docs/BreathingLoaderViewDocs').then(m => m.BreathingLoaderViewDocs)), noExamplesHeader: true, code: `<BreathingLoaderView label="Syncing…" />` },
};

// ─── Theme ────────────────────────────────────────────────────────────────────

type DuiThemeMode = 'light' | 'dark' | 'system';

function applyTheme(mode: DuiThemeMode) {
  if (mode === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    applyMonacoThemeWhenReady(isDark ? 'dark' : 'light');
  } else {
    document.documentElement.setAttribute('data-theme', mode);
    applyMonacoThemeWhenReady(mode);
  }
}

const THEME_OPTIONS: { id: DuiThemeMode; label: string; icon: React.ReactNode }[] = [
  { id: 'light',  label: 'Light',  icon: <SunIcon size={12} /> },
  { id: 'dark',   label: 'Dark',   icon: <MoonIcon size={12} /> },
  { id: 'system', label: 'System', icon: <MonitorIcon size={12} /> },
];

// ─── Main showcase ────────────────────────────────────────────────────────────

/**
 * Is the window at least this wide?
 *
 * The header carries three pieces of text that are nice to have and not worth
 * crowding the controls for, so they come and go with the width. A hook rather
 * than a CSS class because `index.css` is the published stylesheet — a rule
 * that exists only for this demo page does not belong in what consumers ship.
 */
function useMinWidth(px: number) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= px,
  );
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${px}px)`);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [px]);
  return matches;
}

/** The opening address, read once so the first paint is already the right panel. */
function initialRoute() {
  const route = parseHash(typeof window === 'undefined' ? '' : window.location.hash);
  const category = route.category && route.category in PANELS
    ? (route.category as CategoryId)
    : 'home';
  return {
    category,
    tab: route.tab,
    theme: route.theme ?? 'dark' as DuiThemeMode,
    capture: route.capture,
  };
}

export function DuiShowcase() {
  const opening = initialRoute();
  const [activeCategory, setActiveCategory] = useState<CategoryId>(opening.category);
  const [activeTab, setActiveTab] = useState<ShowcaseTabId>(opening.tab);
  const [themeMode, setThemeMode] = useState<DuiThemeMode>(opening.theme);
  const [capture, setCapture] = useState(opening.capture);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  /* Percent, because that is what SplitPanelView speaks. 18 of 1440px is about
     260px — a little wider than the old fixed rail, which was already clipping
     the longer component names. */
  const [navSplit, setNavSplit] = useState(18);
  const wide = useMinWidth(720);
  const roomy = useMinWidth(1040);
  const panel = PANELS[activeCategory];
  /* Capitalised bindings, because JSX only renders a component through one.
     Each is a lazy component; none of them fetches anything until rendered. */
  const LiveContent = panel.liveContent;
  const Examples = panel.examples;
  const Docs = panel.docs;

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

  /*
    ── The address bar, both ways ──

    Writing: every selection lands in the hash, so the URL a reader copies is
    the panel they are looking at. `replaceState` rather than assigning to
    `location.hash`, because clicking down a sidebar of two hundred components
    should not bury the page they arrived from under two hundred back presses.

    Reading: `hashchange` covers a pasted link, the back button, and — the
    reason this exists — a capture script setting `location.hash` between
    frames without reloading the app each time.
  */
  useEffect(() => {
    const next = formatHash({
      category: activeCategory,
      tab: activeTab,
      theme: themeMode === 'dark' ? null : themeMode,
      capture,
    });
    if (window.location.hash !== next) {
      window.history.replaceState(null, '', next);
    }
  }, [activeCategory, activeTab, themeMode]);

  useEffect(() => {
    const onHashChange = () => {
      const route = parseHash(window.location.hash);
      if (route.category && route.category in PANELS) setActiveCategory(route.category as CategoryId);
      setActiveTab(route.tab);
      setCapture(route.capture);
      const theme = route.theme ?? 'dark';
      setThemeMode(theme);
      applyTheme(theme);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  /*
    What the screenshot and demo-video runs enumerate.

    They need the same list the sidebar draws, and the alternative — a copy of
    two hundred and thirty-eight ids in a script — is a list that silently goes
    stale the first time a component is added. Publishing the real one costs a
    few lines and cannot drift.
  */
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__DUI_SHOWCASE__ = {
      total: TOTAL_COMPONENT_COUNT,
      groups: SIDEBAR_GROUPS.map(g => ({
        title: g.title,
        items: g.items.map(i => ({
          id: i.id,
          label: i.label,
          title: PANELS[i.id]?.title ?? i.label,
          desc: PANELS[i.id]?.desc ?? '',
          hasExamples: Boolean(PANELS[i.id]?.examples),
          hasDocs: Boolean(PANELS[i.id]?.docs),
        })),
      })),
    };
  }, []);

  /*
    ── Capture mode ──

    One component, on the page, with nothing else on it.

    The catalog images were first taken of the ordinary panel, and every one of
    them came out as a picture of the same breadcrumb, the same three tabs and
    the same code editor, with the component itself a small thing near the
    bottom. Two hundred and thirty-eight of those tell a reader nothing. This
    draws the examples alone, so the photograph is of the component — and the
    site can embed a single component in a frame using the same address.

    `data-capture-body` is what the screenshot clips to, and it is sized by its
    content rather than the window, so a small component yields a small image
    instead of a chip marooned in nine hundred pixels of background.
  */
  if (capture) {
    /* Examples first, the live view as a fallback — a handful of panels have
       only one of the two. Named here rather than inlined because it is a
       component, and JSX needs a capitalised binding to render one. */
    const CaptureBody = panel.examples ?? panel.liveContent ?? (() => (
      <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 13 }}>
        {panel.title}
      </div>
    ));
    return (
      <div
        data-showcase-capture
        style={{
          minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          background: 'var(--color-panel)', color: 'var(--color-text-primary)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        }}
      >
        <div data-capture-body style={{ width: '100%', maxWidth: 880, padding: '28px 32px' }}>
          <Suspense fallback={<PanelPending />}>
            <CaptureBody />
          </Suspense>
        </div>
      </div>
    );
  }

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

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.02em' }}>DUI</span>
          <ChipView label="v1.0" color="var(--color-primary)" size="sm" />
        </div>
        {wide && <>
          <div style={{ width: 1, height: 16, background: 'var(--color-surface-border)' }} />
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Daakia UI Component Library</span>
        </>}

        <div style={{ flex: 1 }} />

        {/*
          ── The right-hand side ──

          This used to be the theme switcher followed by three outlined chips in
          three different colours. Two things were wrong with it. The chips were
          decoration in three competing hues sitting next to an already-coloured
          control, so the eye had five things to sort out in one 44px row. And
          the switcher — the only thing here you can actually operate — was
          buried in the middle of them, with ornament between it and the edge
          where a control belongs.

          So the facts are quiet text, the control sits at the edge, and the one
          number worth reading is the only thing with any weight on it.
        */}
        {roomy && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 11, color: 'var(--color-text-muted)', whiteSpace: 'nowrap',
          }}>
            <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
              {TOTAL_COMPONENT_COUNT} components
            </span>
            <span aria-hidden>·</span>
            <span>React 19</span>
            <span aria-hidden>·</span>
            <span>Tailwind v4</span>
          </div>
        )}

        <SegmentedControlView
          size="sm"
          variant="pill"
          value={themeMode}
          onChange={v => handleTheme(v as DuiThemeMode)}
          options={THEME_OPTIONS.map(opt => ({ value: opt.id, label: opt.label, icon: opt.icon }))}
        />
      </div>

      {/* ── Body ── */}
      {/*
        The nav and the panel are a SplitPanelView, so the sidebar can be
        dragged to whatever width the component names need — a showcase of 238
        components with names like `SegmentedProgressBarView` in a fixed 232px
        rail is a showcase that truncates half its own catalog.

        It is also the library demonstrating itself: the divider, the drag, the
        double-click reset and the collapse are all SplitPanelView doing what it
        does for any consumer, on the page that exists to show what it does.

        `collapsedSide="first"` is what the header's toggle drives, and it hides
        the nav rather than narrowing it to an icon rail — which is what that
        button's own tooltip has always said it does.
      */}
      <SplitPanelView
        direction="horizontal"
        accentColor="var(--color-primary)"
        split={navSplit}
        onResize={setNavSplit}
        minFirst={190}
        minSecond={460}
        collapsed={!sidebarOpen}
        collapsedSide="first"
        style={{ flex: 1, minHeight: 0 }}
        first={
          <SideNavView
            items={NAV_ITEMS}
            activeId={activeCategory}
            onSelect={id => setActiveCategory(id as CategoryId)}
            collapsible={false}
            searchable
            searchPlaceholder="Search components…"
            emptyText="No matches"
            /* The prop SideNavView documents for exactly this: fill the
               resizable container instead of setting a width of its own, so
               the divider is what decides how wide the nav is. */
            fillContainer
            style={{
              height: '100%',
              background: 'var(--color-surface)',
              borderRight: '1px solid var(--color-surface-border)',
            }}
          />
        }
        second={
        <>

        {/* ── Content ── */}
        {/*
          `data-showcase-content` is what the screenshot run clips to: the panel
          without the chrome around it.

          `height: 100%`, not `flex: 1`. SplitPanelView's pane is `height: 100%`
          with `overflow: hidden` and is not itself a flex container, so `flex: 1`
          resolved to nothing, this div grew to its content's full height, and the
          pane quietly clipped the overflow — a long component just stopped,
          with no scrollbar to say there was more.
        */}
        <div data-showcase-content style={{ height: '100%', overflow: 'auto', padding: '36px 48px 64px' }}>
          <div data-showcase-column style={{ maxWidth: 880, margin: '0 auto' }}>

            {/*
              Home is a page, not a panel: no breadcrumb telling you where you
              are when you have not gone anywhere yet, and no Live/Examples/Docs
              tabs over a thing that has no props.
            */}
            {activeCategory === 'home' ? (
              <Suspense fallback={<PanelPending />}>
                <HomePanel
                  total={TOTAL_COMPONENT_COUNT}
                  groups={SIDEBAR_GROUPS.length}
                  onOpen={id => setActiveCategory(id as CategoryId)}
                />
              </Suspense>
            ) : (
            <>

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
              tab={activeTab}
              onTabChange={setActiveTab}
              live={
                <>
                  {panel.code && (
                    <LivePlayground
                      key={`pg-${activeCategory}`}
                      code={panel.code}
                      content={<Suspense fallback={<PanelPending />}><LiveContent /></Suspense>}
                      themeMode={themeMode}
                      vars={panel.vars}
                    />
                  )}
                  {LiveContent && (
                    panel.noExamplesHeader
                      ? <div style={{ marginTop: 20 }}>
                          <Suspense fallback={<PanelPending />}><LiveContent /></Suspense>
                        </div>
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
                          <Suspense fallback={<PanelPending />}><LiveContent /></Suspense>
                        </>
                  )}
                </>
              }
              examples={Examples && <Suspense fallback={<PanelPending />}><Examples /></Suspense>}
              docs={Docs
                ? <Suspense fallback={<PanelPending />}><Docs /></Suspense>
                : (
                  <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 13 }}>
                    Documentation coming soon.
                  </div>
                )}
            />
            </>
            )}
          </div>
        </div>
        </>
        }
      />
    </div>
  );
}
