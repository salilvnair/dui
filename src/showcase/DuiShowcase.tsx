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
  YamlKeyChipPanel, LiveColorCustomizerPanel, SpacerViewPanel, PickerPanel, SegmentedControlPanel,
  CalendarPanel, DateInputPanel, DateRangePickerPanel, TimeWheelPanel, CountdownRingPanel,
  RadioGroupPanel, RadioCardPanel, RatingPanel, OtpInputPanel, PhoneInputPanel,
  ColorPickerPanel, IconPickerPanel, EmojiPickerPanel, FileDropzonePanel, AvatarUploadPanel,
  MaskedInputPanel, TransferListPanel, StepperInputPanel, SwitchGroupPanel,
  SnackbarPanel, BannerPanel, ProgressRingPanel, ProgressBarPanel, SkeletonPanel,
  NotificationBadgePanel, AvatarPanel, AvatarGroupPanel, PresenceDotPanel, ConfettiBurstPanel,
  PopoverPanel, TooltipPanel, DrawerPanel, ActionSheetPanel, BottomSheetPanel,
  SpotlightTourPanel, FabPanel, DockPanel, BreadcrumbPanel, PaginationPanel,
  HeroPanel, LevelPanel, MediaObjectPanel, TileGridPanel, PanelListPanel,
  NavbarPanel, AffixPanel, AnchorPanel, StickyHeaderPanel, AspectRatioPanel,
  MasonryGridPanel, ScrollAreaPanel, BackToTopPanel, WatermarkPanel,
  DescriptionsPanel, StatisticPanel, ResultPanel, CascaderPanel, ComboBoxPanel,
  ListViewPanel, VirtualizedListPanel, StickyTableHeaderPanel, TablePaginationPanel, FilterBarPanel,
  SortableHeaderPanel, EditableCellPanel, DataGridToolbarPanel, ColumnVisibilityPanel,
  KbdPanel, WizardStepperPanel, AccordionGroupPanel, SegmentedProgressBarPanel, ChecklistPanel,
  PriorityPickerPanel, TagCloudPanel, RangeSliderPanel, VoteWidgetPanel, LikeButtonPanel,
  BookmarkButtonPanel, FollowButtonPanel, ShortcutRecorderPanel,
  MessageBubblePanel, ChatInputPanel, TypingIndicatorPanel, CommentThreadPanel, NotificationCenterPanel,
  AlertDialogPanel, FeedbackWidgetPanel, NpsSurveyPanel, ShareSheetPanel, ContactCardPanel,
  ArticleCardPanel, FaqAccordionPanel, MessageBannerPanel, QuoteBlockPanel,
  SettingsRowPanel, SettingsSectionPanel, OnboardingChecklistPanel, KeyValueListPanel,
  EnvironmentBadgePanel, VersionBadgePanel, LicenseBadgePanel, UsageMeterPanel,
  PermissionMatrixPanel, AuditLogRowPanel, WebhookStatusPanel, ApiKeyRowPanel,
  RateLimitMeterPanel, EmptyInboxPanel, FeatureSpotlightBadgePanel, CookieConsentBannerPanel,
  MaintenanceBannerPanel, TrialCountdownBannerPanel, TeamMemberRowPanel, InviteInputPanel,
  RoleSelectPanel, IntegrationCardPanel, StatusPageRowPanel, ChangelogEntryPanel,
  ImageGalleryPanel, ImageCropperPanel, VideoPlayerPanel, AudioWaveformPanel, AudioPlayerPanel,
  PdfViewerPanel, FileIconPanel, FileListPanel, DragHandlePanel, SignaturePadPanel,
  BarcodePanel, ImageZoomPanel,
  TimelinePanel, ActivityFeedPanel, KanbanBoardPanel, SparklinePanel, HeatmapCalendarPanel,
  ComparisonSliderPanel, CarouselPanel, QRCodePanel, StatTrendCardPanel, PricingCardPanel,
  TestimonialCardPanel, RatingBreakdownPanel, TreeSelectPanel, RichTextToolbarPanel, MentionInputPanel,
  GradientTextPanel, TypewriterTextPanel, CountUpNumberPanel, MagneticButtonPanel, TiltCardPanel,
  ParticleBackgroundPanel, GlowBorderPanel, RevealOnScrollPanel, FloatingLabelInputPanel, PulseDotPanel,
  RequestFlowPanel, LatencyPulsePanel, AIStreamingTextPanel, CommandOrbPanel, TimeTravelSliderPanel,
  DiffMorphPanel, SchemaBlueprintPanel, LiveCursorPresencePanel, UndoRedoTimelinePanel, DialKnobInputPanel,
  HoldToConfirmPanel, MorphingIconButtonPanel, StackedSwipeCardPanel, NetworkWeatherPanel, ConstellationLoaderPanel,
  HoloCardPanel, GhostTypingPlaceholderPanel, ConnectionPulseLinePanel, StackedToastDeckPanel, PathRevealPanel,
  SpectrumSliderPanel, BreathingLoaderPanel,
} from './panels/NewComponentPanels';
import { IconsGalleryPanel } from './panels/IconsGalleryPanel';
import { ThemeCustomizationPanel } from './panels/ThemeCustomizationPanel';
import { ThemeAddVarGuidePanel } from './panels/ThemeAddVarGuidePanel';
import { LivePlayground } from './panels/LivePlayground';
import { ChipView, SideNavView, SegmentedControlView } from '@/dui';
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
  ChevronDownIcon, ChevronRightIcon, FolderIcon, SpinnerIcon, SunIcon, MoonIcon, MonitorIcon, KeyIcon,
  PlusSquareIcon, FilePlusIcon, FolderPlusIcon, PlayIcon, InfoCircleIcon, RefreshIcon,
  CalendarIcon, ClockIcon,
  ImageIcon, VideoIcon, MusicIcon, ArchiveIcon, HeartIcon, BookmarkIcon,
  NetworkIcon,
} from '@/icons';

// ─── Batch Examples & Docs imports (auto-wired) ─────────────────────────────
import { PickerViewExamples } from './components/picker/examples/PickerViewExamples';
import { PickerViewDocs } from './components/picker/docs/PickerViewDocs';
import { SegmentedControlViewExamples } from './components/segmentedcontrol/examples/SegmentedControlViewExamples';
import { SegmentedControlViewDocs } from './components/segmentedcontrol/docs/SegmentedControlViewDocs';
import { CalendarViewExamples } from './components/calendar/examples/CalendarViewExamples';
import { CalendarViewDocs } from './components/calendar/docs/CalendarViewDocs';
import { DateInputViewExamples } from './components/dateinput/examples/DateInputViewExamples';
import { DateInputViewDocs } from './components/dateinput/docs/DateInputViewDocs';
import { DateRangePickerViewExamples } from './components/daterangepicker/examples/DateRangePickerViewExamples';
import { DateRangePickerViewDocs } from './components/daterangepicker/docs/DateRangePickerViewDocs';
import { TimeWheelViewExamples } from './components/timewheel/examples/TimeWheelViewExamples';
import { TimeWheelViewDocs } from './components/timewheel/docs/TimeWheelViewDocs';
import { CountdownRingViewExamples } from './components/countdownring/examples/CountdownRingViewExamples';
import { CountdownRingViewDocs } from './components/countdownring/docs/CountdownRingViewDocs';
import { RadioGroupViewExamples } from './components/radiogroup/examples/RadioGroupViewExamples';
import { RadioGroupViewDocs } from './components/radiogroup/docs/RadioGroupViewDocs';
import { RadioCardViewExamples } from './components/radiocard/examples/RadioCardViewExamples';
import { RadioCardViewDocs } from './components/radiocard/docs/RadioCardViewDocs';
import { RatingViewExamples } from './components/rating/examples/RatingViewExamples';
import { RatingViewDocs } from './components/rating/docs/RatingViewDocs';
import { OtpInputViewExamples } from './components/otpinput/examples/OtpInputViewExamples';
import { OtpInputViewDocs } from './components/otpinput/docs/OtpInputViewDocs';
import { PhoneInputViewExamples } from './components/phoneinput/examples/PhoneInputViewExamples';
import { PhoneInputViewDocs } from './components/phoneinput/docs/PhoneInputViewDocs';
import { ColorPickerViewExamples } from './components/colorpicker/examples/ColorPickerViewExamples';
import { ColorPickerViewDocs } from './components/colorpicker/docs/ColorPickerViewDocs';
import { IconPickerViewExamples } from './components/iconpicker/examples/IconPickerViewExamples';
import { IconPickerViewDocs } from './components/iconpicker/docs/IconPickerViewDocs';
import { EmojiPickerViewExamples } from './components/emojipicker/examples/EmojiPickerViewExamples';
import { EmojiPickerViewDocs } from './components/emojipicker/docs/EmojiPickerViewDocs';
import { FileDropzoneViewExamples } from './components/filedropzone/examples/FileDropzoneViewExamples';
import { FileDropzoneViewDocs } from './components/filedropzone/docs/FileDropzoneViewDocs';
import { AvatarUploadViewExamples } from './components/avatarupload/examples/AvatarUploadViewExamples';
import { AvatarUploadViewDocs } from './components/avatarupload/docs/AvatarUploadViewDocs';
import { MaskedInputViewExamples } from './components/maskedinput/examples/MaskedInputViewExamples';
import { MaskedInputViewDocs } from './components/maskedinput/docs/MaskedInputViewDocs';
import { TransferListViewExamples } from './components/transferlist/examples/TransferListViewExamples';
import { TransferListViewDocs } from './components/transferlist/docs/TransferListViewDocs';
import { StepperInputViewExamples } from './components/stepperinput/examples/StepperInputViewExamples';
import { StepperInputViewDocs } from './components/stepperinput/docs/StepperInputViewDocs';
import { SwitchGroupViewExamples } from './components/switchgroup/examples/SwitchGroupViewExamples';
import { SwitchGroupViewDocs } from './components/switchgroup/docs/SwitchGroupViewDocs';
import { SnackbarViewExamples } from './components/snackbar/examples/SnackbarViewExamples';
import { SnackbarViewDocs } from './components/snackbar/docs/SnackbarViewDocs';
import { BannerViewExamples } from './components/banner/examples/BannerViewExamples';
import { BannerViewDocs } from './components/banner/docs/BannerViewDocs';
import { ProgressRingViewExamples } from './components/progressring/examples/ProgressRingViewExamples';
import { ProgressRingViewDocs } from './components/progressring/docs/ProgressRingViewDocs';
import { ProgressBarViewExamples } from './components/progressbar/examples/ProgressBarViewExamples';
import { ProgressBarViewDocs } from './components/progressbar/docs/ProgressBarViewDocs';
import { SkeletonViewExamples } from './components/skeleton/examples/SkeletonViewExamples';
import { SkeletonViewDocs } from './components/skeleton/docs/SkeletonViewDocs';
import { NotificationBadgeViewExamples } from './components/notificationbadge/examples/NotificationBadgeViewExamples';
import { NotificationBadgeViewDocs } from './components/notificationbadge/docs/NotificationBadgeViewDocs';
import { AvatarViewExamples } from './components/avatar/examples/AvatarViewExamples';
import { AvatarViewDocs } from './components/avatar/docs/AvatarViewDocs';
import { AvatarGroupViewExamples } from './components/avatargroup/examples/AvatarGroupViewExamples';
import { AvatarGroupViewDocs } from './components/avatargroup/docs/AvatarGroupViewDocs';
import { PresenceDotViewExamples } from './components/presencedot/examples/PresenceDotViewExamples';
import { PresenceDotViewDocs } from './components/presencedot/docs/PresenceDotViewDocs';
import { ConfettiBurstViewExamples } from './components/confettiburst/examples/ConfettiBurstViewExamples';
import { ConfettiBurstViewDocs } from './components/confettiburst/docs/ConfettiBurstViewDocs';
import { PopoverViewExamples } from './components/popover/examples/PopoverViewExamples';
import { PopoverViewDocs } from './components/popover/docs/PopoverViewDocs';
import { TooltipViewExamples } from './components/tooltip/examples/TooltipViewExamples';
import { TooltipViewDocs } from './components/tooltip/docs/TooltipViewDocs';
import { DrawerViewExamples } from './components/drawer/examples/DrawerViewExamples';
import { DrawerViewDocs } from './components/drawer/docs/DrawerViewDocs';
import { ActionSheetViewExamples } from './components/actionsheet/examples/ActionSheetViewExamples';
import { ActionSheetViewDocs } from './components/actionsheet/docs/ActionSheetViewDocs';
import { BottomSheetViewExamples } from './components/bottomsheet/examples/BottomSheetViewExamples';
import { BottomSheetViewDocs } from './components/bottomsheet/docs/BottomSheetViewDocs';
import { SpotlightTourViewExamples } from './components/spotlighttour/examples/SpotlightTourViewExamples';
import { SpotlightTourViewDocs } from './components/spotlighttour/docs/SpotlightTourViewDocs';
import { FabViewExamples } from './components/fab/examples/FabViewExamples';
import { FabViewDocs } from './components/fab/docs/FabViewDocs';
import { DockViewExamples } from './components/dock/examples/DockViewExamples';
import { DockViewDocs } from './components/dock/docs/DockViewDocs';
import { BreadcrumbViewExamples } from './components/breadcrumb/examples/BreadcrumbViewExamples';
import { BreadcrumbViewDocs } from './components/breadcrumb/docs/BreadcrumbViewDocs';
import { PaginationViewExamples } from './components/pagination/examples/PaginationViewExamples';
import { PaginationViewDocs } from './components/pagination/docs/PaginationViewDocs';
import { HeroViewExamples } from './components/hero/examples/HeroViewExamples';
import { HeroViewDocs } from './components/hero/docs/HeroViewDocs';
import { LevelViewExamples } from './components/level/examples/LevelViewExamples';
import { LevelViewDocs } from './components/level/docs/LevelViewDocs';
import { MediaObjectViewExamples } from './components/mediaobject/examples/MediaObjectViewExamples';
import { MediaObjectViewDocs } from './components/mediaobject/docs/MediaObjectViewDocs';
import { TileGridViewExamples } from './components/tilegrid/examples/TileGridViewExamples';
import { TileGridViewDocs } from './components/tilegrid/docs/TileGridViewDocs';
import { PanelListViewExamples } from './components/panellist/examples/PanelListViewExamples';
import { PanelListViewDocs } from './components/panellist/docs/PanelListViewDocs';
import { NavbarViewExamples } from './components/navbar/examples/NavbarViewExamples';
import { NavbarViewDocs } from './components/navbar/docs/NavbarViewDocs';
import { AffixViewExamples } from './components/affix/examples/AffixViewExamples';
import { AffixViewDocs } from './components/affix/docs/AffixViewDocs';
import { AnchorViewExamples } from './components/anchor/examples/AnchorViewExamples';
import { AnchorViewDocs } from './components/anchor/docs/AnchorViewDocs';
import { StickyHeaderViewExamples } from './components/stickyheader/examples/StickyHeaderViewExamples';
import { StickyHeaderViewDocs } from './components/stickyheader/docs/StickyHeaderViewDocs';
import { AspectRatioViewExamples } from './components/aspectratio/examples/AspectRatioViewExamples';
import { AspectRatioViewDocs } from './components/aspectratio/docs/AspectRatioViewDocs';
import { MasonryGridViewExamples } from './components/masonrygrid/examples/MasonryGridViewExamples';
import { MasonryGridViewDocs } from './components/masonrygrid/docs/MasonryGridViewDocs';
import { ScrollAreaViewExamples } from './components/scrollarea/examples/ScrollAreaViewExamples';
import { ScrollAreaViewDocs } from './components/scrollarea/docs/ScrollAreaViewDocs';
import { BackToTopViewExamples } from './components/backtotop/examples/BackToTopViewExamples';
import { BackToTopViewDocs } from './components/backtotop/docs/BackToTopViewDocs';
import { WatermarkViewExamples } from './components/watermark/examples/WatermarkViewExamples';
import { WatermarkViewDocs } from './components/watermark/docs/WatermarkViewDocs';
import { DescriptionsViewExamples } from './components/descriptions/examples/DescriptionsViewExamples';
import { DescriptionsViewDocs } from './components/descriptions/docs/DescriptionsViewDocs';
import { StatisticViewExamples } from './components/statistic/examples/StatisticViewExamples';
import { StatisticViewDocs } from './components/statistic/docs/StatisticViewDocs';
import { ResultViewExamples } from './components/result/examples/ResultViewExamples';
import { ResultViewDocs } from './components/result/docs/ResultViewDocs';
import { CascaderViewExamples } from './components/cascader/examples/CascaderViewExamples';
import { CascaderViewDocs } from './components/cascader/docs/CascaderViewDocs';
import { ComboBoxViewExamples } from './components/combobox/examples/ComboBoxViewExamples';
import { ComboBoxViewDocs } from './components/combobox/docs/ComboBoxViewDocs';
import { ListViewExamples } from './components/listview/examples/ListViewExamples';
import { ListViewDocs } from './components/listview/docs/ListViewDocs';
import { VirtualizedListViewExamples } from './components/virtualizedlist/examples/VirtualizedListViewExamples';
import { VirtualizedListViewDocs } from './components/virtualizedlist/docs/VirtualizedListViewDocs';
import { StickyTableHeaderViewExamples } from './components/stickytableheader/examples/StickyTableHeaderViewExamples';
import { StickyTableHeaderViewDocs } from './components/stickytableheader/docs/StickyTableHeaderViewDocs';
import { TablePaginationViewExamples } from './components/tablepagination/examples/TablePaginationViewExamples';
import { TablePaginationViewDocs } from './components/tablepagination/docs/TablePaginationViewDocs';
import { FilterBarViewExamples } from './components/filterbar/examples/FilterBarViewExamples';
import { FilterBarViewDocs } from './components/filterbar/docs/FilterBarViewDocs';
import { SortableHeaderViewExamples } from './components/sortableheader/examples/SortableHeaderViewExamples';
import { SortableHeaderViewDocs } from './components/sortableheader/docs/SortableHeaderViewDocs';
import { EditableCellViewExamples } from './components/editablecell/examples/EditableCellViewExamples';
import { EditableCellViewDocs } from './components/editablecell/docs/EditableCellViewDocs';
import { DataGridToolbarViewExamples } from './components/datagridtoolbar/examples/DataGridToolbarViewExamples';
import { DataGridToolbarViewDocs } from './components/datagridtoolbar/docs/DataGridToolbarViewDocs';
import { ColumnVisibilityMenuViewExamples } from './components/columnvisibility/examples/ColumnVisibilityMenuViewExamples';
import { ColumnVisibilityMenuViewDocs } from './components/columnvisibility/docs/ColumnVisibilityMenuViewDocs';
import { KbdViewExamples } from './components/kbd/examples/KbdViewExamples';
import { KbdViewDocs } from './components/kbd/docs/KbdViewDocs';
import { WizardStepperViewExamples } from './components/wizardstepper/examples/WizardStepperViewExamples';
import { WizardStepperViewDocs } from './components/wizardstepper/docs/WizardStepperViewDocs';
import { AccordionGroupViewExamples } from './components/accordiongroup/examples/AccordionGroupViewExamples';
import { AccordionGroupViewDocs } from './components/accordiongroup/docs/AccordionGroupViewDocs';
import { SegmentedProgressBarViewExamples } from './components/segmentedprogressbar/examples/SegmentedProgressBarViewExamples';
import { SegmentedProgressBarViewDocs } from './components/segmentedprogressbar/docs/SegmentedProgressBarViewDocs';
import { ChecklistViewExamples } from './components/checklist/examples/ChecklistViewExamples';
import { ChecklistViewDocs } from './components/checklist/docs/ChecklistViewDocs';
import { PriorityPickerViewExamples } from './components/prioritypicker/examples/PriorityPickerViewExamples';
import { PriorityPickerViewDocs } from './components/prioritypicker/docs/PriorityPickerViewDocs';
import { TagCloudViewExamples } from './components/tagcloud/examples/TagCloudViewExamples';
import { TagCloudViewDocs } from './components/tagcloud/docs/TagCloudViewDocs';
import { RangeSliderViewExamples } from './components/rangeslider/examples/RangeSliderViewExamples';
import { RangeSliderViewDocs } from './components/rangeslider/docs/RangeSliderViewDocs';
import { VoteWidgetViewExamples } from './components/votewidget/examples/VoteWidgetViewExamples';
import { VoteWidgetViewDocs } from './components/votewidget/docs/VoteWidgetViewDocs';
import { LikeButtonViewExamples } from './components/likebutton/examples/LikeButtonViewExamples';
import { LikeButtonViewDocs } from './components/likebutton/docs/LikeButtonViewDocs';
import { BookmarkButtonViewExamples } from './components/bookmarkbutton/examples/BookmarkButtonViewExamples';
import { BookmarkButtonViewDocs } from './components/bookmarkbutton/docs/BookmarkButtonViewDocs';
import { FollowButtonViewExamples } from './components/followbutton/examples/FollowButtonViewExamples';
import { FollowButtonViewDocs } from './components/followbutton/docs/FollowButtonViewDocs';
import { ShortcutRecorderViewExamples } from './components/shortcutrecorder/examples/ShortcutRecorderViewExamples';
import { ShortcutRecorderViewDocs } from './components/shortcutrecorder/docs/ShortcutRecorderViewDocs';
import { MessageBubbleViewExamples } from './components/messagebubble/examples/MessageBubbleViewExamples';
import { MessageBubbleViewDocs } from './components/messagebubble/docs/MessageBubbleViewDocs';
import { ChatInputViewExamples } from './components/chatinput/examples/ChatInputViewExamples';
import { ChatInputViewDocs } from './components/chatinput/docs/ChatInputViewDocs';
import { TypingIndicatorViewExamples } from './components/typingindicator/examples/TypingIndicatorViewExamples';
import { TypingIndicatorViewDocs } from './components/typingindicator/docs/TypingIndicatorViewDocs';
import { CommentThreadViewExamples } from './components/commentthread/examples/CommentThreadViewExamples';
import { CommentThreadViewDocs } from './components/commentthread/docs/CommentThreadViewDocs';
import { NotificationCenterViewExamples } from './components/notificationcenter/examples/NotificationCenterViewExamples';
import { NotificationCenterViewDocs } from './components/notificationcenter/docs/NotificationCenterViewDocs';
import { AlertDialogViewExamples } from './components/alertdialog/examples/AlertDialogViewExamples';
import { AlertDialogViewDocs } from './components/alertdialog/docs/AlertDialogViewDocs';
import { FeedbackWidgetViewExamples } from './components/feedbackwidget/examples/FeedbackWidgetViewExamples';
import { FeedbackWidgetViewDocs } from './components/feedbackwidget/docs/FeedbackWidgetViewDocs';
import { NpsSurveyViewExamples } from './components/npssurvey/examples/NpsSurveyViewExamples';
import { NpsSurveyViewDocs } from './components/npssurvey/docs/NpsSurveyViewDocs';
import { ShareSheetViewExamples } from './components/sharesheet/examples/ShareSheetViewExamples';
import { ShareSheetViewDocs } from './components/sharesheet/docs/ShareSheetViewDocs';
import { ContactCardViewExamples } from './components/contactcard/examples/ContactCardViewExamples';
import { ContactCardViewDocs } from './components/contactcard/docs/ContactCardViewDocs';
import { ArticleCardViewExamples } from './components/articlecard/examples/ArticleCardViewExamples';
import { ArticleCardViewDocs } from './components/articlecard/docs/ArticleCardViewDocs';
import { FaqAccordionViewExamples } from './components/faqaccordion/examples/FaqAccordionViewExamples';
import { FaqAccordionViewDocs } from './components/faqaccordion/docs/FaqAccordionViewDocs';
import { MessageBannerViewExamples } from './components/messagebanner/examples/MessageBannerViewExamples';
import { MessageBannerViewDocs } from './components/messagebanner/docs/MessageBannerViewDocs';
import { QuoteBlockViewExamples } from './components/quoteblock/examples/QuoteBlockViewExamples';
import { QuoteBlockViewDocs } from './components/quoteblock/docs/QuoteBlockViewDocs';
import { SettingsRowViewExamples } from './components/settingsrow/examples/SettingsRowViewExamples';
import { SettingsRowViewDocs } from './components/settingsrow/docs/SettingsRowViewDocs';
import { SettingsSectionViewExamples } from './components/settingssection/examples/SettingsSectionViewExamples';
import { SettingsSectionViewDocs } from './components/settingssection/docs/SettingsSectionViewDocs';
import { OnboardingChecklistViewExamples } from './components/onboardingchecklist/examples/OnboardingChecklistViewExamples';
import { OnboardingChecklistViewDocs } from './components/onboardingchecklist/docs/OnboardingChecklistViewDocs';
import { KeyValueListViewExamples } from './components/keyvaluelist/examples/KeyValueListViewExamples';
import { KeyValueListViewDocs } from './components/keyvaluelist/docs/KeyValueListViewDocs';
import { EnvironmentBadgeViewExamples } from './components/environmentbadge/examples/EnvironmentBadgeViewExamples';
import { EnvironmentBadgeViewDocs } from './components/environmentbadge/docs/EnvironmentBadgeViewDocs';
import { VersionBadgeViewExamples } from './components/versionbadge/examples/VersionBadgeViewExamples';
import { VersionBadgeViewDocs } from './components/versionbadge/docs/VersionBadgeViewDocs';
import { LicenseBadgeViewExamples } from './components/licensebadge/examples/LicenseBadgeViewExamples';
import { LicenseBadgeViewDocs } from './components/licensebadge/docs/LicenseBadgeViewDocs';
import { UsageMeterViewExamples } from './components/usagemeter/examples/UsageMeterViewExamples';
import { UsageMeterViewDocs } from './components/usagemeter/docs/UsageMeterViewDocs';
import { PermissionMatrixViewExamples } from './components/permissionmatrix/examples/PermissionMatrixViewExamples';
import { PermissionMatrixViewDocs } from './components/permissionmatrix/docs/PermissionMatrixViewDocs';
import { AuditLogRowViewExamples } from './components/auditlogrow/examples/AuditLogRowViewExamples';
import { AuditLogRowViewDocs } from './components/auditlogrow/docs/AuditLogRowViewDocs';
import { WebhookStatusViewExamples } from './components/webhookstatus/examples/WebhookStatusViewExamples';
import { WebhookStatusViewDocs } from './components/webhookstatus/docs/WebhookStatusViewDocs';
import { ApiKeyRowViewExamples } from './components/apikeyrow/examples/ApiKeyRowViewExamples';
import { ApiKeyRowViewDocs } from './components/apikeyrow/docs/ApiKeyRowViewDocs';
import { RateLimitMeterViewExamples } from './components/ratelimitmeter/examples/RateLimitMeterViewExamples';
import { RateLimitMeterViewDocs } from './components/ratelimitmeter/docs/RateLimitMeterViewDocs';
import { EmptyInboxViewExamples } from './components/emptyinbox/examples/EmptyInboxViewExamples';
import { EmptyInboxViewDocs } from './components/emptyinbox/docs/EmptyInboxViewDocs';
import { FeatureSpotlightBadgeViewExamples } from './components/featurespotlightbadge/examples/FeatureSpotlightBadgeViewExamples';
import { FeatureSpotlightBadgeViewDocs } from './components/featurespotlightbadge/docs/FeatureSpotlightBadgeViewDocs';
import { CookieConsentBannerViewExamples } from './components/cookieconsentbanner/examples/CookieConsentBannerViewExamples';
import { CookieConsentBannerViewDocs } from './components/cookieconsentbanner/docs/CookieConsentBannerViewDocs';
import { MaintenanceBannerViewExamples } from './components/maintenancebanner/examples/MaintenanceBannerViewExamples';
import { MaintenanceBannerViewDocs } from './components/maintenancebanner/docs/MaintenanceBannerViewDocs';
import { TrialCountdownBannerViewExamples } from './components/trialcountdownbanner/examples/TrialCountdownBannerViewExamples';
import { TrialCountdownBannerViewDocs } from './components/trialcountdownbanner/docs/TrialCountdownBannerViewDocs';
import { TeamMemberRowViewExamples } from './components/teammemberrow/examples/TeamMemberRowViewExamples';
import { TeamMemberRowViewDocs } from './components/teammemberrow/docs/TeamMemberRowViewDocs';
import { InviteInputViewExamples } from './components/inviteinput/examples/InviteInputViewExamples';
import { InviteInputViewDocs } from './components/inviteinput/docs/InviteInputViewDocs';
import { RoleSelectViewExamples } from './components/roleselect/examples/RoleSelectViewExamples';
import { RoleSelectViewDocs } from './components/roleselect/docs/RoleSelectViewDocs';
import { IntegrationCardViewExamples } from './components/integrationcard/examples/IntegrationCardViewExamples';
import { IntegrationCardViewDocs } from './components/integrationcard/docs/IntegrationCardViewDocs';
import { StatusPageRowViewExamples } from './components/statuspagerow/examples/StatusPageRowViewExamples';
import { StatusPageRowViewDocs } from './components/statuspagerow/docs/StatusPageRowViewDocs';
import { ChangelogEntryViewExamples } from './components/changelogentry/examples/ChangelogEntryViewExamples';
import { ChangelogEntryViewDocs } from './components/changelogentry/docs/ChangelogEntryViewDocs';
import { ImageGalleryViewExamples } from './components/imagegallery/examples/ImageGalleryViewExamples';
import { ImageGalleryViewDocs } from './components/imagegallery/docs/ImageGalleryViewDocs';
import { ImageCropperViewExamples } from './components/imagecropper/examples/ImageCropperViewExamples';
import { ImageCropperViewDocs } from './components/imagecropper/docs/ImageCropperViewDocs';
import { VideoPlayerViewExamples } from './components/videoplayer/examples/VideoPlayerViewExamples';
import { VideoPlayerViewDocs } from './components/videoplayer/docs/VideoPlayerViewDocs';
import { AudioWaveformViewExamples } from './components/audiowaveform/examples/AudioWaveformViewExamples';
import { AudioWaveformViewDocs } from './components/audiowaveform/docs/AudioWaveformViewDocs';
import { AudioPlayerViewExamples } from './components/audioplayer/examples/AudioPlayerViewExamples';
import { AudioPlayerViewDocs } from './components/audioplayer/docs/AudioPlayerViewDocs';
import { PdfViewerViewExamples } from './components/pdfviewer/examples/PdfViewerViewExamples';
import { PdfViewerViewDocs } from './components/pdfviewer/docs/PdfViewerViewDocs';
import { FileIconViewExamples } from './components/fileicon/examples/FileIconViewExamples';
import { FileIconViewDocs } from './components/fileicon/docs/FileIconViewDocs';
import { FileListViewExamples } from './components/filelist/examples/FileListViewExamples';
import { FileListViewDocs } from './components/filelist/docs/FileListViewDocs';
import { DragHandleViewExamples } from './components/draghandle/examples/DragHandleViewExamples';
import { DragHandleViewDocs } from './components/draghandle/docs/DragHandleViewDocs';
import { SignaturePadViewExamples } from './components/signaturepad/examples/SignaturePadViewExamples';
import { SignaturePadViewDocs } from './components/signaturepad/docs/SignaturePadViewDocs';
import { BarcodeViewExamples } from './components/barcode/examples/BarcodeViewExamples';
import { BarcodeViewDocs } from './components/barcode/docs/BarcodeViewDocs';
import { ImageZoomViewExamples } from './components/imagezoom/examples/ImageZoomViewExamples';
import { ImageZoomViewDocs } from './components/imagezoom/docs/ImageZoomViewDocs';
import { TimelineViewExamples } from './components/timeline/examples/TimelineViewExamples';
import { TimelineViewDocs } from './components/timeline/docs/TimelineViewDocs';
import { ActivityFeedViewExamples } from './components/activityfeed/examples/ActivityFeedViewExamples';
import { ActivityFeedViewDocs } from './components/activityfeed/docs/ActivityFeedViewDocs';
import { KanbanBoardViewExamples } from './components/kanbanboard/examples/KanbanBoardViewExamples';
import { KanbanBoardViewDocs } from './components/kanbanboard/docs/KanbanBoardViewDocs';
import { SparklineViewExamples } from './components/sparkline/examples/SparklineViewExamples';
import { SparklineViewDocs } from './components/sparkline/docs/SparklineViewDocs';
import { HeatmapCalendarViewExamples } from './components/heatmapcalendar/examples/HeatmapCalendarViewExamples';
import { HeatmapCalendarViewDocs } from './components/heatmapcalendar/docs/HeatmapCalendarViewDocs';
import { ComparisonSliderViewExamples } from './components/comparisonslider/examples/ComparisonSliderViewExamples';
import { ComparisonSliderViewDocs } from './components/comparisonslider/docs/ComparisonSliderViewDocs';
import { CarouselViewExamples } from './components/carousel/examples/CarouselViewExamples';
import { CarouselViewDocs } from './components/carousel/docs/CarouselViewDocs';
import { QRCodeViewExamples } from './components/qrcode/examples/QRCodeViewExamples';
import { QRCodeViewDocs } from './components/qrcode/docs/QRCodeViewDocs';
import { StatTrendCardViewExamples } from './components/stattrendcard/examples/StatTrendCardViewExamples';
import { StatTrendCardViewDocs } from './components/stattrendcard/docs/StatTrendCardViewDocs';
import { PricingCardViewExamples } from './components/pricingcard/examples/PricingCardViewExamples';
import { PricingCardViewDocs } from './components/pricingcard/docs/PricingCardViewDocs';
import { TestimonialCardViewExamples } from './components/testimonialcard/examples/TestimonialCardViewExamples';
import { TestimonialCardViewDocs } from './components/testimonialcard/docs/TestimonialCardViewDocs';
import { RatingBreakdownViewExamples } from './components/ratingbreakdown/examples/RatingBreakdownViewExamples';
import { RatingBreakdownViewDocs } from './components/ratingbreakdown/docs/RatingBreakdownViewDocs';
import { TreeSelectViewExamples } from './components/treeselect/examples/TreeSelectViewExamples';
import { TreeSelectViewDocs } from './components/treeselect/docs/TreeSelectViewDocs';
import { RichTextToolbarViewExamples } from './components/richtexttoolbar/examples/RichTextToolbarViewExamples';
import { RichTextToolbarViewDocs } from './components/richtexttoolbar/docs/RichTextToolbarViewDocs';
import { MentionInputViewExamples } from './components/mentioninput/examples/MentionInputViewExamples';
import { MentionInputViewDocs } from './components/mentioninput/docs/MentionInputViewDocs';
import { GradientTextViewExamples } from './components/gradienttext/examples/GradientTextViewExamples';
import { GradientTextViewDocs } from './components/gradienttext/docs/GradientTextViewDocs';
import { TypewriterTextViewExamples } from './components/typewritertext/examples/TypewriterTextViewExamples';
import { TypewriterTextViewDocs } from './components/typewritertext/docs/TypewriterTextViewDocs';
import { CountUpNumberViewExamples } from './components/countupnumber/examples/CountUpNumberViewExamples';
import { CountUpNumberViewDocs } from './components/countupnumber/docs/CountUpNumberViewDocs';
import { MagneticButtonViewExamples } from './components/magneticbutton/examples/MagneticButtonViewExamples';
import { MagneticButtonViewDocs } from './components/magneticbutton/docs/MagneticButtonViewDocs';
import { TiltCardViewExamples } from './components/tiltcard/examples/TiltCardViewExamples';
import { TiltCardViewDocs } from './components/tiltcard/docs/TiltCardViewDocs';
import { ParticleBackgroundViewExamples } from './components/particlebackground/examples/ParticleBackgroundViewExamples';
import { ParticleBackgroundViewDocs } from './components/particlebackground/docs/ParticleBackgroundViewDocs';
import { GlowBorderViewExamples } from './components/glowborder/examples/GlowBorderViewExamples';
import { GlowBorderViewDocs } from './components/glowborder/docs/GlowBorderViewDocs';
import { RevealOnScrollViewExamples } from './components/revealonscroll/examples/RevealOnScrollViewExamples';
import { RevealOnScrollViewDocs } from './components/revealonscroll/docs/RevealOnScrollViewDocs';
import { FloatingLabelInputViewExamples } from './components/floatinglabelinput/examples/FloatingLabelInputViewExamples';
import { FloatingLabelInputViewDocs } from './components/floatinglabelinput/docs/FloatingLabelInputViewDocs';
import { PulseDotViewExamples } from './components/pulsedot/examples/PulseDotViewExamples';
import { PulseDotViewDocs } from './components/pulsedot/docs/PulseDotViewDocs';
import { RequestFlowViewExamples } from './components/requestflow/examples/RequestFlowViewExamples';
import { RequestFlowViewDocs } from './components/requestflow/docs/RequestFlowViewDocs';
import { LatencyPulseViewExamples } from './components/latencypulse/examples/LatencyPulseViewExamples';
import { LatencyPulseViewDocs } from './components/latencypulse/docs/LatencyPulseViewDocs';
import { AIStreamingTextViewExamples } from './components/aistreamingtext/examples/AIStreamingTextViewExamples';
import { AIStreamingTextViewDocs } from './components/aistreamingtext/docs/AIStreamingTextViewDocs';
import { CommandOrbViewExamples } from './components/commandorb/examples/CommandOrbViewExamples';
import { CommandOrbViewDocs } from './components/commandorb/docs/CommandOrbViewDocs';
import { TimeTravelSliderViewExamples } from './components/timetravelslider/examples/TimeTravelSliderViewExamples';
import { TimeTravelSliderViewDocs } from './components/timetravelslider/docs/TimeTravelSliderViewDocs';
import { DiffMorphViewExamples } from './components/diffmorph/examples/DiffMorphViewExamples';
import { DiffMorphViewDocs } from './components/diffmorph/docs/DiffMorphViewDocs';
import { SchemaBlueprintViewExamples } from './components/schemablueprint/examples/SchemaBlueprintViewExamples';
import { SchemaBlueprintViewDocs } from './components/schemablueprint/docs/SchemaBlueprintViewDocs';
import { LiveCursorPresenceViewExamples } from './components/livecursorpresence/examples/LiveCursorPresenceViewExamples';
import { LiveCursorPresenceViewDocs } from './components/livecursorpresence/docs/LiveCursorPresenceViewDocs';
import { UndoRedoTimelineViewExamples } from './components/undoredotimeline/examples/UndoRedoTimelineViewExamples';
import { UndoRedoTimelineViewDocs } from './components/undoredotimeline/docs/UndoRedoTimelineViewDocs';
import { DialKnobInputViewExamples } from './components/dialknobinput/examples/DialKnobInputViewExamples';
import { DialKnobInputViewDocs } from './components/dialknobinput/docs/DialKnobInputViewDocs';
import { HoldToConfirmViewExamples } from './components/holdtoconfirm/examples/HoldToConfirmViewExamples';
import { HoldToConfirmViewDocs } from './components/holdtoconfirm/docs/HoldToConfirmViewDocs';
import { MorphingIconButtonViewExamples } from './components/morphingiconbutton/examples/MorphingIconButtonViewExamples';
import { MorphingIconButtonViewDocs } from './components/morphingiconbutton/docs/MorphingIconButtonViewDocs';
import { StackedSwipeCardViewExamples } from './components/stackedswipecard/examples/StackedSwipeCardViewExamples';
import { StackedSwipeCardViewDocs } from './components/stackedswipecard/docs/StackedSwipeCardViewDocs';
import { NetworkWeatherViewExamples } from './components/networkweather/examples/NetworkWeatherViewExamples';
import { NetworkWeatherViewDocs } from './components/networkweather/docs/NetworkWeatherViewDocs';
import { ConstellationLoaderViewExamples } from './components/constellationloader/examples/ConstellationLoaderViewExamples';
import { ConstellationLoaderViewDocs } from './components/constellationloader/docs/ConstellationLoaderViewDocs';
import { HoloCardViewExamples } from './components/holocard/examples/HoloCardViewExamples';
import { HoloCardViewDocs } from './components/holocard/docs/HoloCardViewDocs';
import { GhostTypingPlaceholderViewExamples } from './components/ghosttypingplaceholder/examples/GhostTypingPlaceholderViewExamples';
import { GhostTypingPlaceholderViewDocs } from './components/ghosttypingplaceholder/docs/GhostTypingPlaceholderViewDocs';
import { ConnectionPulseLineViewExamples } from './components/connectionpulseline/examples/ConnectionPulseLineViewExamples';
import { ConnectionPulseLineViewDocs } from './components/connectionpulseline/docs/ConnectionPulseLineViewDocs';
import { StackedToastDeckViewExamples } from './components/stackedtoastdeck/examples/StackedToastDeckViewExamples';
import { StackedToastDeckViewDocs } from './components/stackedtoastdeck/docs/StackedToastDeckViewDocs';
import { PathRevealViewExamples } from './components/pathreveal/examples/PathRevealViewExamples';
import { PathRevealViewDocs } from './components/pathreveal/docs/PathRevealViewDocs';
import { SpectrumSliderViewExamples } from './components/spectrumslider/examples/SpectrumSliderViewExamples';
import { SpectrumSliderViewDocs } from './components/spectrumslider/docs/SpectrumSliderViewDocs';
import { BreathingLoaderViewExamples } from './components/breathingloader/examples/BreathingLoaderViewExamples';
import { BreathingLoaderViewDocs } from './components/breathingloader/docs/BreathingLoaderViewDocs';

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
  selecttextinput:   { title: 'SelectTextInputView',    desc: 'Combined method selector + URL input in one bordered pill — URL bar pattern.',  vars: VARS_INPUT,  liveContent: <SelectTextInputViewLive />, examples: <SelectTextInputViewExamples />, docs: <SelectTextInputViewDocs />,   code: `function Preview() {\n  const [method, setMethod] = useState('GET');\n  const [url, setUrl] = useState('https://api.example.com/users');\n  const opts = [\n    { value: 'GET',    label: 'GET',    color: 'var(--color-method-get)' },\n    { value: 'POST',   label: 'POST',   color: 'var(--color-method-post)' },\n    { value: 'DELETE', label: 'DELETE', color: 'var(--color-method-delete)' },\n  ];\n  return (\n    <SelectTextInputView\n      selectValue={method}\n      selectOptions={opts}\n      onSelectChange={setMethod}\n      inputValue={url}\n      onInputChange={setUrl}\n      placeholder="Enter URL or paste text"\n    />\n  );\n}` },
  selectinput:       { title: 'SelectInputView',        desc: 'Portal dropdown with keyboard nav — replaces all StyledDropdown usages.',           vars: VARS_INPUT,      liveContent: <SelectInputViewLive />, examples: <SelectInputViewExamples />, docs: <SelectInputViewDocs />,       code: `function Preview() {\n  const [method, setMethod] = useState('GET');\n  const options = [\n    { value: 'GET',    label: 'GET',    color: 'var(--color-method-get)' },\n    { value: 'POST',   label: 'POST',   color: 'var(--color-method-post)' },\n    { value: 'DELETE', label: 'DELETE', color: 'var(--color-method-delete)' },\n  ];\n  return (\n    <SelectInputView\n      value={method}\n      options={options}\n      onChange={setMethod}\n      size="md"\n      style={{ width: 130 }}\n    />\n  );\n}` },
  button:            { title: 'ButtonView',             desc: 'Standard button — primary / secondary / ghost / danger — all sizes.',              vars: VARS_BTN,        liveContent: <ButtonViewLive />, examples: <ButtonViewExamples />, docs: <ButtonViewDocs />,            code: `<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>\n  <ButtonView label="Send Request" variant="primary" size="md" onClick={send} />\n  <ButtonView label="Cancel"       variant="ghost"   size="md" onClick={cancel} />\n  <ButtonView label="Delete"       variant="danger"  size="sm" onClick={del} />\n</div>` },
  iconbutton:        { title: 'IconButtonView',         desc: 'Square icon-only buttons — ghost / filled — toggle support — all sizes.',          vars: VARS_ICONBTN,    liveContent: <IconButtonViewLive />, examples: <IconButtonViewExamples />, docs: <IconButtonViewDocs />,        code: `function Preview() {\n  const [copied, setCopied] = useState(false);\n  const handleClick = () => {\n    setCopied(true);\n    setTimeout(() => setCopied(false), 1500);\n  };\n  return (\n    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>\n      <IconButtonView\n        icon={copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}\n        variant="ghost"\n        size="sm"\n        title={copied ? 'Copied!' : 'Copy'}\n        onClick={handleClick}\n        active={copied}\n      />\n    </div>\n  );\n}` },
  dropdownbutton:    { title: 'DropDownButtonView',     desc: 'Split button — primary action + chevron dropdown — Save as, Export as, etc.',      vars: VARS_BTN,        liveContent: <DropDownButtonViewLive />, examples: <DropDownButtonViewExamples />, docs: <DropDownButtonViewDocs />,    code: `<DropDownButtonView\n  label="Save"\n  onClick={save}\n  items={[\n    { label: 'Save as JSON', onClick: saveJson },\n    { label: 'Save as YAML', onClick: saveYaml },\n  ]}\n/>` },
  contextmenu:       { title: 'ContextMenuView',        desc: 'Recursive context menu with submenus — portal rendered — collection tree style.',   vars: VARS_ACCENT,     liveContent: <ContextMenuViewLive />, examples: <ContextMenuViewExamples />, docs: <ContextMenuViewDocs />,       code: `function Preview() {\n  const [anchor, setAnchor] = useState(null);\n  const [open, setOpen] = useState(false);\n  return (\n    <div>\n      <ButtonView\n        variant="secondary"\n        onClick={e => { setAnchor(e.currentTarget); setOpen(true); }}\n      >\n        Open context menu\n      </ButtonView>\n      <ContextMenuView\n        anchorEl={anchor}\n        open={open}\n        onClose={() => setOpen(false)}\n        items={[\n          { id: 'new',    label: 'New Request', icon: <PlusIcon size={13} />, onClick: () => {} },\n          { id: 'delete', label: 'Delete',      icon: <TrashIcon size={13} />, danger: true, onClick: () => {} },\n        ]}\n      />\n    </div>\n  );\n}` },
  tabs:              { title: 'TabView',                desc: 'pill · underline variants — sliding indicator, badges, dots — all with accentColor.',  vars: VARS_PILLTAB,   liveContent: <TabsPanel />, examples: <TabViewExamples />, docs: <TabViewDocs />,              code: `function Preview() {\n  const [active, setActive] = useState('params');\n  return (\n    <TabView\n      variant="pill"\n      tabs={[\n        { id: 'params',  label: 'Params',  badge: 2 },\n        { id: 'headers', label: 'Headers', badge: 4 },\n        { id: 'body',    label: 'Body' },\n        { id: 'auth',    label: 'Auth', dot: true, dotColor: 'var(--color-success)' },\n      ]}\n      activeTab={active}\n      onChange={setActive}\n    />\n  );\n}` },
  tabbar:            { title: 'TabBarView',             desc: 'Editor-style protocol tab bar — store-free, drag-free, scroll arrows, dirty dot.', vars: VARS_ACCENT,     liveContent: <TabBarViewLive />, examples: <TabBarViewExamples />, docs: <TabBarViewDocs />,            code: `function Preview() {\n  const [tabs, setTabs] = useState([\n    { id: '1', label: 'GET /users', type: 'request', protocol: 'rest',    method: 'GET' },\n    { id: '2', label: 'getUsers',   type: 'request', protocol: 'graphql' },\n  ]);\n  const [activeId, setActiveId] = useState('1');\n  return (\n    <TabBarView\n      tabs={tabs}\n      activeTabId={activeId}\n      onTabClick={setActiveId}\n      onTabClose={id => setTabs(t => t.filter(x => x.id !== id))}\n      onAddTab={() => {}}\n      accentColor="var(--color-protocol-rest)"\n    />\n  );\n}` },
  editor:            { title: 'EditorView',             desc: 'Monaco editor wrapper — simplified props — JSON / GQL / XML / YAML etc.',           vars: VARS_ACCENT,     liveContent: <EditorViewLive />, examples: <EditorViewExamples />, docs: <EditorViewDocs />,            code: `function Preview() {\n  const [body, setBody] = useState('{ "name": "Alice", "role": "admin" }');\n  return (\n    <EditorView\n      value={body}\n      onChange={setBody}\n      language="json"\n      height={300}\n      readOnly={false}\n    />\n  );\n}` },
  patterns:          { title: 'Real-world Patterns',    desc: 'How DUI components assemble into actual Daakia UI — URL bar · tabs · tree.',        liveContent: <PatternsLive />, examples: <PatternsExamples />, docs: <PatternsDocs />, noExamplesHeader: true },
  toggle:            { title: 'ToggleSwitchView',       desc: 'On/off toggle with sm/md/lg sizes, accent color, label positions, disabled state.', vars: VARS_TOGGLE,     liveContent: <ToggleSwitchPanel />, examples: <ToggleSwitchViewExamples />, docs: <ToggleSwitchViewDocs />,      code: `function Preview() {\n  const [enabled, setEnabled] = useState(true);\n  return (\n    <ToggleSwitchView\n      checked={enabled}\n      onChange={setEnabled}\n      label="Enable SSL"\n      size="md"\n    />\n  );\n}` },
  checkbox:          { title: 'CheckboxView',           desc: 'Checkbox — checked / unchecked / indeterminate / disabled — with accent colors.',   vars: VARS_ACCENT,     liveContent: <CheckboxPanel />, examples: <CheckboxViewExamples />, docs: <CheckboxViewDocs />,          code: `function Preview() {\n  const [checked, setChecked] = useState(false);\n  return (\n    <CheckboxView\n      checked={checked}\n      onChange={setChecked}\n      label="Include auth headers"\n    />\n  );\n}` },
  modal:             { title: 'ModalView',              desc: 'Configurable modal — sm/md/lg/xl — never closes on backdrop click.',                vars: VARS_MODAL,      liveContent: <ModalPanel />, examples: <ModalViewExamples />, docs: <ModalViewDocs />,             code: `function Preview() {\n  const [isOpen, setIsOpen] = useState(false);\n  return (\n    <div>\n      <ButtonView variant="danger" size="sm" onClick={() => setIsOpen(true)}>\n        Delete Collection\n      </ButtonView>\n      <ModalView\n        open={isOpen}\n        onClose={() => setIsOpen(false)}\n        title="Confirm Delete"\n        size="sm"\n      >\n        <p>Are you sure?</p>\n        <ButtonView label="Delete" variant="danger" onClick={() => setIsOpen(false)} />\n      </ModalView>\n    </div>\n  );\n}` },
  loader:            { title: 'LoaderView',             desc: 'Loading states — spinner · dots · skeleton · pulse · progress-bar.',               vars: VARS_LOADER,     liveContent: <LoaderPanel />, examples: <LoaderViewExamples />, docs: <LoaderViewDocs />,            code: `<LoaderView variant="spinner" size="md" />\n<LoaderView variant="dots"    size="sm" />\n<LoaderView variant="skeleton" width={240} height={16} />` },
  emptystate:        { title: 'EmptyStateView',         desc: 'Empty state placeholder with icon, title, message, and optional CTA button.',       vars: VARS_EMPTY,      liveContent: <EmptyStatePanel />, examples: <EmptyStateViewExamples />, docs: <EmptyStateViewDocs />,        code: `<EmptyStateView\n  icon={<FolderIcon size={32} />}\n  title="No collections yet"\n  message="Create your first collection to get started."\n  action={{ label: 'New Collection', onClick: create }}\n/>` },
  statusindicator:   { title: 'StatusIndicatorView',    desc: 'Connection status dot — idle · connecting · connected · disconnected · error.',     vars: VARS_STATUS,     liveContent: <StatusIndicatorPanel />, examples: <StatusIndicatorViewExamples />, docs: <StatusIndicatorViewDocs />,   code: `<StatusIndicatorView status="connected"    label="Connected" />\n<StatusIndicatorView status="connecting"  label="Connecting…" />\n<StatusIndicatorView status="error"       label="Connection failed" />` },
  infopopup:         { title: 'InfoPopupView',          desc: 'Help popup anchored near a ? icon — title · items · footer · wiki link.',          vars: VARS_ACCENT,     liveContent: <InfoPopupPanel />, examples: <InfoPopupViewExamples />, docs: <InfoPopupViewDocs />,         code: `function Preview() {\n  const [isOpen, setIsOpen] = useState(false);\n  const [anchor, setAnchor] = useState(null);\n  return (\n    <span ref={setAnchor}>\n      <ButtonView onClick={() => setIsOpen(true)}>Show info</ButtonView>\n      <InfoPopupView\n        open={isOpen}\n        onClose={() => setIsOpen(false)}\n        anchorEl={anchor}\n        title="Bearer Token"\n        description="Sent as the Authorization header on every request."\n      />\n    </span>\n  );\n}` },
  resizablepanel:    { title: 'ResizablePanelView',     desc: 'Single-pane panel with bottom-edge drag handle to resize height — no store dependency.', vars: VARS_RESIZE, liveContent: <ResizablePanelPanel />, examples: <ResizablePanelViewExamples />, docs: <ResizablePanelViewDocs />,   code: `<ResizablePanelView defaultHeight={200} minHeight={80} maxHeight={400}>
  <div style={{ padding: 12 }}>Resizable content goes here.</div>
</ResizablePanelView>` },
  splitpanel:        { title: 'SplitPanelView',         desc: 'Split-pane container — horizontal or vertical — drag pill, double-click to reset.',  vars: VARS_RESIZE,    liveContent: <SplitPanelPanel />, examples: <SplitPanelViewExamples />, docs: <SplitPanelViewDocs />,        code: `<SplitPanelView
  direction="vertical"
  defaultSplit={60}
  first={<div style={{ padding: 12 }}>Request</div>}
  second={<div style={{ padding: 12 }}>Response</div>}
/>` },
  dottedcard:        { title: 'DottedCardView',         desc: 'Dotted-border expandable card — useful for optional config sections.',              vars: VARS_ACCENT,     liveContent: <DottedCardPanel />, examples: <DottedCardViewExamples />, docs: <DottedCardViewDocs />,        code: `<DottedCardView title="Advanced Options">\n  <TextInputView placeholder="Proxy URL" />\n</DottedCardView>` },
  coloredtext:       { title: 'ColoredTextView',        desc: 'Token-colored text — HTTP status lines, gRPC codes, SOAP faults.',                  vars: VARS_STATUS,     liveContent: <ColoredTextPanel />, examples: <ColoredTextViewExamples />, docs: <ColoredTextViewDocs />,       code: `<ColoredTextView\n  tokens={[\n    { text: '200', color: 'success' },\n    { text: ' OK', color: 'muted' },\n  ]}\n/>` },
  statscard:         { title: 'StatsCardView',          desc: 'Colorful metric card — value, unit, trend (up/down/neutral), subValue.',            vars: VARS_STATSCARD,  liveContent: <StatsCardPanel />, examples: <StatsCardViewExamples />, docs: <StatsCardViewDocs />,         code: `<StatsCardView\n  label="Response Time"\n  value="142"\n  unit="ms"\n  trend="down"\n  color="var(--color-success)"\n/>` },
  datatable:         { title: 'DataTableView',          desc: 'Generic sortable table — columns, striped rows, empty state, row click.',           vars: VARS_TABLE,      liveContent: <DataTablePanel />, examples: <DataTableViewExamples />, docs: <DataTableViewDocs />,         code: `<DataTableView\n  columns={[{ key: 'name', label: 'Name', sortable: true }]}\n  rows={requests}\n  keyField="name"\n/>` },
  codeblock:         { title: 'CodeBlockView',          desc: 'Read-only code block — language label, copy button, optional line numbers.',        vars: VARS_CODE,       liveContent: <CodeBlockPanel />, examples: <CodeBlockViewExamples />, docs: <CodeBlockViewDocs />,         code: `<CodeBlockView\n  language="json"\n  code={responseBody}\n  showLineNumbers\n  showCopy\n/>` },
  aibutton:          { title: 'AIButtonView',           desc: 'AI action button — generate · fuzz · explain · fix · ask · suggest — loading state.', vars: VARS_AIBTN,   liveContent: <AIButtonPanel />, examples: <AIButtonViewExamples />, docs: <AIButtonViewDocs />,          code: `function Preview() {\n  const [loading, setLoading] = useState(false);\n  const handleClick = () => { setLoading(true); setTimeout(() => setLoading(false), 1200); };\n  return <AIButtonView action="generate" onClick={handleClick} loading={loading} />;\n}` },
  sidenav:           { title: 'SideNavView',            desc: 'Collapsible left sidebar nav with nested items and icon-only collapse mode.',        vars: VARS_SIDENAV,    liveContent: <SideNavPanel />, examples: <SideNavViewExamples />, docs: <SideNavViewDocs />,           code: `function Preview() {\n  const navItems = [{ id: 'requests', label: 'Requests' }, { id: 'environments', label: 'Environments' }];\n  const [activeId, setActiveId] = useState('requests');\n  return <SideNavView items={navItems} activeId={activeId} onSelect={setActiveId} />;\n}` },
  settingsnav:       { title: 'SettingsNavView',        desc: 'Settings-style grouped nav with badges, descriptions, active state.',               vars: VARS_SIDENAV,    liveContent: <SettingsNavPanel />, examples: <SettingsNavViewExamples />, docs: <SettingsNavViewDocs />,       code: `function Preview() {\n  const settingsGroups = [{ id: 'general', title: 'General', items: [{ id: 'profile', label: 'Profile' }] }];\n  const [activeId, setActiveId] = useState('profile');\n  return <SettingsNavView groups={settingsGroups} activeId={activeId} onSelect={setActiveId} />;\n}` },
  themecardselector: { title: 'ThemeCardSelectorView',  desc: 'Card-based theme picker with color swatch previews and checkmark selection.',        vars: VARS_ACCENT,     liveContent: <ThemeCardSelectorPanel />, examples: <ThemeCardSelectorViewExamples />, docs: <ThemeCardSelectorViewDocs />, code: `function Preview() {\n  const themes = [{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }];\n  const [selectedTheme, setSelectedTheme] = useState('dark');\n  return <ThemeCardSelectorView options={themes} value={selectedTheme} onChange={setSelectedTheme} />;\n}` },
  featurecategory:   { title: 'FeatureCategoryView',    desc: 'Expandable feature category with toggle switches and enabled count badge.',          vars: VARS_TOGGLE,     liveContent: <FeatureCategoryPanel />, examples: <FeatureCategoryViewExamples />, docs: <FeatureCategoryViewDocs />,   code: `function Preview() {\n  const [features, setFeatures] = useState([{ id: 'autocomplete', label: 'Autocomplete', enabled: true }, { id: 'explain', label: 'Explain response', enabled: false }]);\n  const toggle = id => setFeatures(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));\n  return <FeatureCategoryView categoryLabel="AI Features" features={features} onToggle={toggle} />;\n}` },
  taginput:          { title: 'TagInputView',           desc: 'Multi-value tag input — Enter or comma to add, Backspace to remove.',               vars: VARS_TAG,        liveContent: <TagInputPanel />, examples: <TagInputViewExamples />, docs: <TagInputViewDocs />,          code: `<TagInputView\n  tags={tags}\n  onChange={setTags}\n  placeholder="Add tag…"\n/>` },
  bottompanel:       { title: 'BottomPanelView',        desc: 'DevTools-style resizable bottom panel with tab bar and collapse toggle.',            vars: VARS_ACCENT,     liveContent: <BottomPanelPanel />, examples: <BottomPanelViewExamples />, docs: <BottomPanelViewDocs />,       code: `<BottomPanelView tabs={[{ id: 'console', label: 'Console', content: <div style={{ padding: 12 }}>Logs appear here.</div> }]} minHeight={120} />` },
  toast:             { title: 'ToastView',              desc: 'Toast notification stack — success · error · warning · info — auto-dismiss.',        vars: VARS_STATUS,     liveContent: <ToastPanel />, examples: <ToastViewExamples />, docs: <ToastViewDocs />,             code: `function Preview() {\n  const [toasts, setToasts] = useState([]);\n  const show = () => setToasts(prev => [...prev, { id: String(Date.now()), variant: 'success', title: 'Saved!' }]);\n  return (\n    <>\n      <ButtonView onClick={show}>Show toast</ButtonView>\n      <ToastView toasts={toasts} onDismiss={id => setToasts(prev => prev.filter(t => t.id !== id))} position="bottom-right" />\n    </>\n  );\n}` },
  promptcard:        { title: 'PromptCardView',         desc: 'Single prompt library row card — colored avatar initials, title, description, protocol badge, CUSTOM badge, hover actions.',  vars: VARS_ACCENT, liveContent: <PromptCardPanel />, examples: <PromptCardViewExamples />, docs: <PromptCardViewDocs />, code: `function Preview() {\n  const handleUse = () => {};\n  return (\n    <PromptCardView\n      id="p1"\n      title="REST API Agent"\n      description="Builds structured HTTP requests"\n      protocol="REST"\n      protocolColor="var(--color-protocol-rest)"\n      onUse={handleUse}\n    />\n  );\n}` },
  promptlibrary:     { title: 'PromptLibraryView',      desc: 'Full Prompt Library panel — list (search + sections + categories) + editor (avatar header + tabs + preview/edit toggle + save).',  liveContent: <PromptLibraryPanel />, examples: <PromptLibraryViewExamples />, docs: <PromptLibraryViewDocs />, code: `function Preview() {\n  const data = [{ id: 's1', title: 'REST', prompts: [{ id: 'p1', title: 'List Users' }] }];\n  const [id, setId] = useState('p1');\n  const [text, setText] = useState('Fetch all users from /api/users');\n  return (\n    <>\n      <PromptLibraryListView sections={data} activeId={id} onSelect={setId} />\n      <PromptLibraryEditorView content={text} onContentChange={setText} />\n    </>\n  );\n}` },
  stageview:         { title: 'StageCheck / StageSpin / StagePulse', desc: 'Step-level status indicators — completed (check), active (spin), pending (pulse) — for multi-step pipelines and request flows.', vars: VARS_STAGE, liveContent: <StageViewLive />, examples: <StageViewExamples />, docs: <StageViewDocs />, code: `<StageCheck label="Auth verified"   sublabel="Token valid" />\n<StageSpin  label="Sending request" sublabel="Waiting…" />\n<StagePulse label="Parse response"  sublabel="Queued" />` },
  iconsgallery:      { title: 'Icons Gallery',          desc: 'All Daakia icons — searchable by name — click to copy icon name.',                   liveContent: <IconsGalleryPanel />, examples: <IconsGalleryExamples />, docs: <IconsGalleryDocs />, noExamplesHeader: true },
  themeconfig:       { title: 'Theme Customization',    desc: 'Export / upload YAML theme files — all 63 CSS color vars, live hot-swap, no rebuild.', liveContent: <ThemeCustomizationPanel />, noExamplesHeader: true },
  themeaddvar:       { title: 'Add Theme Variable',     desc: 'Step-by-step guide: register a new CSS color variable in SCHEMA, declare it in index.css, use it in any DUI component, and test it live.', liveContent: <ThemeAddVarGuidePanel />, noExamplesHeader: true },
  searchinput:       { title: 'SearchInputView',        desc: 'URL-bar style search input with optional prefix icon and suffix clear button.',        vars: VARS_INPUT,      liveContent: <SearchInputPanel />, examples: <SearchInputViewExamples />, docs: <SearchInputViewDocs />,       code: `<SearchInputView\n  value={q}\n  onChange={setQ}\n  placeholder="Search collections…"\n/>` },
  durationinput:     { title: 'DurationInputView',      desc: 'Number input with ms / s / m / hr unit selector dropdown.',                           vars: VARS_DUR,        liveContent: <DurationInputPanel />, examples: <DurationInputViewExamples />, docs: <DurationInputViewDocs />,     code: `<DurationInputView value={timeout} onChange={setTimeout} />` },
  highlightedinput:  { title: 'HighlightedInputView',   desc: '{{variable}} highlighted URL input with autocomplete dropdown — the Daakia URL bar.',   vars: VARS_INPUT,  liveContent: <HighlightedInputPanel />, examples: <HighlightedInputViewExamples />, docs: <HighlightedInputViewDocs />,  code: `<HighlightedInputView\n  value={url}\n  onChange={setUrl}\n  placeholder="https://api.example.com/{{env}}/users"\n/>` },
  keyvaluetable:     { title: 'KeyValueTableView',      desc: 'KV table — toolbar · add/delete/bulk-clear · enable toggle · maskSensitive · autocompleteKeys · showDescription · pinnedTopRows.',  vars: VARS_TABLE, liveContent: <KeyValueTablePanel />, examples: <KeyValueTableViewExamples />, docs: <KeyValueTableViewDocs />, code: `<KeyValueTableView\n  rows={rows}\n  onChange={setRows}\n  label="Request Headers"\n  maskSensitive\n  accentColor="var(--color-protocol-rest)"\n/>` },
  mergedinput:       { title: 'MergedInputView',         desc: 'Unified single-border input bar — merge select dropdowns, text inputs, inline buttons, and dividers into one pill.',  vars: VARS_INPUT, liveContent: <MergedInputViewPanel />, examples: <MergedInputViewExamples />, docs: <MergedInputViewDocs />, code: `function Preview() {\n  const soapVersions = [{ value: '1.1', label: 'SOAP 1.1' }, { value: '1.2', label: 'SOAP 1.2' }];\n  const [version, setVersion] = useState('1.2');\n  const [url, setUrl] = useState('https://api.example.com/service');\n  return (\n    <MergedInputView\n      segments={[\n        { type: 'select', value: version, options: soapVersions, onChange: setVersion },\n        { type: 'divider' },\n        { type: 'text', value: url, onChange: setUrl },\n      ]}\n    />\n  );\n}` },
  picker:            { title: 'PickerView',              desc: 'Scrollable wheel picker — single column or multi-column (hour/min/AM-PM) — momentum scroll, snap, and depth-fade animation.', vars: VARS_INPUT, liveContent: <PickerPanel />, examples: <PickerViewExamples />, docs: <PickerViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [method, setMethod] = useState('GET');\n  return (\n    <PickerView\n      options={[\n        { value: 'GET',  label: 'GET' },\n        { value: 'POST', label: 'POST' },\n        { value: 'PUT',  label: 'PUT' },\n      ]}\n      value={method}\n      onChange={setMethod}\n      size="md"\n    />\n  );\n}` },
  segmentedcontrol:  { title: 'SegmentedControlView',    desc: 'Pill-shaped segmented control — solid sliding indicator with a springy bounce transition — pill / rounded / pointy shapes.', vars: VARS_PILLTAB, liveContent: <SegmentedControlPanel />, examples: <SegmentedControlViewExamples />, docs: <SegmentedControlViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState('opt1');\n  return (\n    <SegmentedControlView\n      options={[\n        { value: 'opt1', label: 'Option 1' },\n        { value: 'opt2', label: 'Option 2' },\n        { value: 'opt3', label: 'Option 3' },\n      ]}\n      value={value}\n      onChange={setValue}\n      variant="pill"\n    />\n  );\n}` },
  duiprovider:       { title: 'DuiProvider — Size System', desc: 'Wrap any subtree with <DuiProvider size="sm|md|lg|xl"> and ALL nested DUI components inherit that size — no prop drilling.', vars: VARS_ACCENT, liveContent: <DuiProviderLive />, examples: <DuiProviderExamples />, docs: <DuiProviderDocs />, noExamplesHeader: true },
  calendar:          { title: 'CalendarView',             desc: 'Month grid calendar — single / range / multi select, min/max bounds, animated month transitions.', vars: VARS_ACCENT, liveContent: <CalendarPanel />, examples: <CalendarViewExamples />, docs: <CalendarViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [date, setDate] = useState('2026-07-02');\n  return (\n    <CalendarView\n      mode="single"\n      value={date}\n      onChange={setDate}\n    />\n  );\n}` },
  dateinput:         { title: 'DateInputView',             desc: 'Text field trigger + CalendarView popover — the standard date field pattern.', vars: VARS_INPUT, liveContent: <DateInputPanel />, examples: <DateInputViewExamples />, docs: <DateInputViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [date, setDate] = useState(null);\n  return (\n    <DateInputView\n      value={date}\n      onChange={setDate}\n      placeholder="Select date…"\n    />\n  );\n}` },
  daterangepicker:   { title: 'DateRangePickerView',       desc: 'Range calendar + quick presets (Today / Last 7 days / Last 30 days / This month).', vars: VARS_ACCENT, liveContent: <DateRangePickerPanel />, examples: <DateRangePickerViewExamples />, docs: <DateRangePickerViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [range, setRange] = useState(['2026-06-26', '2026-07-02']);\n  return (\n    <DateRangePickerView\n      value={range}\n      onChange={setRange}\n    />\n  );\n}` },
  timewheel:         { title: 'TimeWheelView',             desc: 'Prop-driven wrapper over PickerView columns for hour/minute/AM-PM — 12h or 24h mode, configurable minute step.', vars: VARS_INPUT, liveContent: <TimeWheelPanel />, examples: <TimeWheelViewExamples />, docs: <TimeWheelViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [time, setTime] = useState({ hour: 9, minute: 30, meridiem: 'AM' });\n  return (\n    <TimeWheelView\n      value={time}\n      onChange={setTime}\n    />\n  );\n}` },
  countdownring:     { title: 'CountdownRingView',         desc: 'Circular countdown ring + digit readout — target Date or durationSeconds, onComplete callback.', vars: VARS_ACCENT, liveContent: <CountdownRingPanel />, examples: <CountdownRingViewExamples />, docs: <CountdownRingViewDocs />, noExamplesHeader: true, code: `<CountdownRingView\n  durationSeconds={60}\n  label="Session expires"\n  onComplete={() => alert('Expired!')}\n/>` },
  radiogroup:        { title: 'RadioGroupView',            desc: 'Radio list with optional descriptions — vertical or horizontal layout.', vars: VARS_ACCENT, liveContent: <RadioGroupPanel />, examples: <RadioGroupViewExamples />, docs: <RadioGroupViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState('json');\n  return (\n    <RadioGroupView\n      options={[{ value: 'json', label: 'JSON' }, { value: 'form', label: 'Form Data' }]}\n      value={value}\n      onChange={setValue}\n    />\n  );\n}` },
  radiocard:         { title: 'RadioCardView',             desc: 'Big selectable cards — plan pickers, mode selectors — grid layout via `columns`.', vars: VARS_ACCENT, liveContent: <RadioCardPanel />, examples: <RadioCardViewExamples />, docs: <RadioCardViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [plan, setPlan] = useState('pro');\n  return (\n    <RadioCardView\n      columns={2}\n      options={[{ value: 'free', label: 'Free' }, { value: 'pro', label: 'Pro' }]}\n      value={plan}\n      onChange={setPlan}\n    />\n  );\n}` },
  rating:            { title: 'RatingView',                desc: 'Star or heart rating input — half-step precision, hover preview, read-only mode.', vars: VARS_ACCENT, liveContent: <RatingPanel />, examples: <RatingViewExamples />, docs: <RatingViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState(3);\n  return <RatingView value={value} onChange={setValue} allowHalf />;\n}` },
  otpinput:          { title: 'OtpInputView',               desc: 'Auto-advance OTP/PIN boxes — paste splits across cells, onComplete callback.', vars: VARS_INPUT, liveContent: <OtpInputPanel />, examples: <OtpInputViewExamples />, docs: <OtpInputViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [otp, setOtp] = useState('');\n  return <OtpInputView value={otp} onChange={setOtp} length={6} onComplete={code => console.log(code)} />;\n}` },
  phoneinput:        { title: 'PhoneInputView',             desc: 'Country-code select + number field in one bordered pill.', vars: VARS_INPUT, liveContent: <PhoneInputPanel />, examples: <PhoneInputViewExamples />, docs: <PhoneInputViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [country, setCountry] = useState('US');\n  const [number, setNumber] = useState('');\n  return (\n    <PhoneInputView\n      countryCode={country}\n      onCountryChange={setCountry}\n      number={number}\n      onNumberChange={setNumber}\n    />\n  );\n}` },
  colorpicker:       { title: 'ColorPickerView',            desc: 'Swatch grid + native hue canvas + hex input, popover trigger.', vars: VARS_ACCENT, liveContent: <ColorPickerPanel />, examples: <ColorPickerViewExamples />, docs: <ColorPickerViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [color, setColor] = useState('#6366F1');\n  return <ColorPickerView value={color} onChange={setColor} />;\n}` },
  iconpicker:        { title: 'IconPickerView',             desc: 'Searchable grid over every DUI icon — popover trigger.', vars: VARS_ACCENT, liveContent: <IconPickerPanel />, examples: <IconPickerViewExamples />, docs: <IconPickerViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [iconName, setIconName] = useState('SparkleIcon');\n  return <IconPickerView value={iconName} onChange={setIconName} />;\n}` },
  emojipicker:       { title: 'EmojiPickerView',             desc: 'Categorized emoji grid with search — popover trigger.', vars: VARS_ACCENT, liveContent: <EmojiPickerPanel />, examples: <EmojiPickerViewExamples />, docs: <EmojiPickerViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [emoji, setEmoji] = useState('🚀');\n  return <EmojiPickerView value={emoji} onChange={setEmoji} />;\n}` },
  filedropzone:      { title: 'FileDropzoneView',            desc: 'Drag-drop upload zone — per-file progress bars, remove action.', vars: VARS_ACCENT, liveContent: <FileDropzonePanel />, examples: <FileDropzoneViewExamples />, docs: <FileDropzoneViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [files, setFiles] = useState([]);\n  return (\n    <FileDropzoneView\n      files={files}\n      onFilesAdded={fs => setFiles(prev => [...prev, ...fs.map(file => ({ file, progress: 100 }))])}\n      onRemove={i => setFiles(prev => prev.filter((_, idx) => idx !== i))}\n    />\n  );\n}` },
  avatarupload:      { title: 'AvatarUploadView',            desc: 'Circular avatar preview with a camera-overlay upload button.', vars: VARS_ACCENT, liveContent: <AvatarUploadPanel />, examples: <AvatarUploadViewExamples />, docs: <AvatarUploadViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [src, setSrc] = useState(null);\n  return <AvatarUploadView src={src} onFileSelected={f => setSrc(URL.createObjectURL(f))} initials="SV" />;\n}` },
  maskedinput:       { title: 'MaskedInputView',             desc: 'Pattern-masked text input — `9`=digit, `A`=letter, `*`=any, literal separators auto-insert.', vars: VARS_INPUT, liveContent: <MaskedInputPanel />, examples: <MaskedInputViewExamples />, docs: <MaskedInputViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [phone, setPhone] = useState('');\n  return <MaskedInputView mask="999-999-9999" value={phone} onChange={setPhone} />;\n}` },
  transferlist:      { title: 'TransferListView',            desc: 'Dual listbox — available ↔ selected — move one or move-all controls.', vars: VARS_ACCENT, liveContent: <TransferListPanel />, examples: <TransferListViewExamples />, docs: <TransferListViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [selected, setSelected] = useState(['read']);\n  const permissions = [{ value: 'read', label: 'Read' }, { value: 'write', label: 'Write' }];\n  return <TransferListView items={permissions} value={selected} onChange={setSelected} />;\n}` },
  stepperinput:      { title: 'StepperInputView',            desc: 'Numeric +/- stepper — iOS UIStepper pattern — min/max/step.', vars: VARS_INPUT, liveContent: <StepperInputPanel />, examples: <StepperInputViewExamples />, docs: <StepperInputViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState(3);\n  return <StepperInputView value={value} onChange={setValue} min={0} max={10} />;\n}` },
  switchgroup:       { title: 'SwitchGroupView',             desc: 'Settings.app-style grouped toggle rows — section header, per-row description, disabled state.', vars: VARS_TOGGLE, liveContent: <SwitchGroupPanel />, examples: <SwitchGroupViewExamples />, docs: <SwitchGroupViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [checked, setChecked] = useState(['ssl']);\n  const items = [{ value: 'ssl', label: 'Verify SSL' }, { value: 'redirects', label: 'Follow redirects' }];\n  return <SwitchGroupView title="Request Options" items={items} checked={checked} onChange={setChecked} />;\n}` },
  snackbar:          { title: 'SnackbarView',                desc: 'Single-line bottom bar + action, auto-dismiss timer pauses on hover — distinct from the stacked-corner ToastView.', vars: VARS_ACCENT, liveContent: <SnackbarPanel />, examples: <SnackbarViewExamples />, docs: <SnackbarViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [open, setOpen] = useState(true);\n  return (\n    <SnackbarView\n      open={open}\n      message="Environment saved"\n      actionLabel="Undo"\n      onAction={() => {}}\n      onClose={() => setOpen(false)}\n    />\n  );\n}` },
  banner:            { title: 'BannerView',                  desc: 'Persistent dismissible top strip — info / success / warning / danger variants.', vars: VARS_STATUS, liveContent: <BannerPanel />, examples: <BannerViewExamples />, docs: <BannerViewDocs />, noExamplesHeader: true, code: `<BannerView\n  open={true}\n  variant="info"\n  message="A new version is available."\n  actionLabel="Refresh"\n  onAction={() => {}}\n/>` },
  progressring:      { title: 'ProgressRingView',             desc: 'Circular determinate/indeterminate progress — distinct from GaugeView (metric gauge).', vars: VARS_ACCENT, liveContent: <ProgressRingPanel />, examples: <ProgressRingViewExamples />, docs: <ProgressRingViewDocs />, noExamplesHeader: true, code: `<ProgressRingView value={70} />\n<ProgressRingView />  {/* indeterminate */}` },
  progressbar:       { title: 'ProgressBarView',              desc: 'Linear progress — buffer fill and striped-indeterminate variants.', vars: VARS_ACCENT, liveContent: <ProgressBarPanel />, examples: <ProgressBarViewExamples />, docs: <ProgressBarViewDocs />, noExamplesHeader: true, code: `<ProgressBarView value={45} buffer={70} />` },
  skeleton:          { title: 'SkeletonView',                 desc: 'Composable shimmer primitives — text / block / avatar / row — for custom loading layouts.', vars: VARS_LOADER, liveContent: <SkeletonPanel />, examples: <SkeletonViewExamples />, docs: <SkeletonViewDocs />, noExamplesHeader: true, code: `<SkeletonView variant="row" />` },
  notificationbadge: { title: 'NotificationBadgeView',        desc: 'Dot/count badge overlay anchor for icons and avatars.', vars: VARS_STATUS, liveContent: <NotificationBadgePanel />, examples: <NotificationBadgeViewExamples />, docs: <NotificationBadgeViewDocs />, noExamplesHeader: true, code: `<NotificationBadgeView count={3}>\n  <IconButtonView icon={<BellIcon />} />\n</NotificationBadgeView>` },
  avatar:            { title: 'AvatarView',                   desc: 'Image or initials fallback, with an optional presence-status dot.', vars: VARS_ACCENT, liveContent: <AvatarPanel />, examples: <AvatarViewExamples />, docs: <AvatarViewDocs />, noExamplesHeader: true, code: `<AvatarView name="Salil Vasa Nair" status="online" />` },
  avatargroup:       { title: 'AvatarGroupView',               desc: 'Stacked overlapping avatars with a "+N" overflow bubble.', vars: VARS_ACCENT, liveContent: <AvatarGroupPanel />, examples: <AvatarGroupViewExamples />, docs: <AvatarGroupViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const members = [{ name: 'Salil Vasa Nair' }, { name: 'Jordan Lee' }, { name: 'Amara Okafor' }, { name: 'Priya Sharma' }, { name: 'Tomas Ruiz' }];\n  return <AvatarGroupView members={members} max={4} />;\n}` },
  presencedot:       { title: 'PresenceDotView',               desc: 'Tiny online/away/busy/offline status primitive.', vars: VARS_STATUS, liveContent: <PresenceDotPanel />, examples: <PresenceDotViewExamples />, docs: <PresenceDotViewDocs />, noExamplesHeader: true, code: `<PresenceDotView status="online" />` },
  confettiburst:     { title: 'ConfettiBurstView',             desc: 'Canvas confetti burst triggered imperatively via ref — fire() from any event handler.', vars: VARS_ACCENT, liveContent: <ConfettiBurstPanel />, examples: <ConfettiBurstViewExamples />, docs: <ConfettiBurstViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const ref = useRef(null);\n  return (\n    <>\n      <ButtonView onClick={() => ref.current.fire()}>Celebrate</ButtonView>\n      <ConfettiBurstView ref={ref} />\n    </>\n  );\n}` },
  popover:           { title: 'PopoverView',                  desc: 'Generic anchored floating-content primitive — the positioning engine behind SelectInputView/InfoPopupView, exposed standalone.', vars: VARS_ACCENT, liveContent: <PopoverPanel />, examples: <PopoverViewExamples />, docs: <PopoverViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [open, setOpen] = useState(false);\n  const [anchor, setAnchor] = useState(null);\n  return (\n    <span ref={setAnchor}>\n      <ButtonView onClick={() => setOpen(true)}>Open</ButtonView>\n      <PopoverView open={open} anchorEl={anchor} onClose={() => setOpen(false)}>\n        Any content here\n      </PopoverView>\n    </span>\n  );\n}` },
  tooltip:           { title: 'TooltipView',                  desc: 'Hover/focus tooltip primitive — top/bottom/left/right placement, configurable delay.', vars: VARS_ACCENT, liveContent: <TooltipPanel />, examples: <TooltipViewExamples />, docs: <TooltipViewDocs />, noExamplesHeader: true, code: `<TooltipView content="Copy to clipboard" placement="top">\n  <span><IconButtonView icon={<CopyIcon />} /></span>\n</TooltipView>` },
  drawer:            { title: 'DrawerView',                   desc: 'Slide-in overlay panel from any edge, with backdrop — navigation-drawer pattern.', vars: VARS_ACCENT, liveContent: <DrawerPanel />, examples: <DrawerViewExamples />, docs: <DrawerViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <ButtonView onClick={() => setOpen(true)}>Open</ButtonView>\n      <DrawerView open={open} edge="right" title="Environment" onClose={() => setOpen(false)}>\n        ...\n      </DrawerView>\n    </>\n  );\n}` },
  actionsheet:       { title: 'ActionSheetView',               desc: 'Bottom list of actions + destructive styling + cancel.', vars: VARS_ACCENT, liveContent: <ActionSheetPanel />, examples: <ActionSheetViewExamples />, docs: <ActionSheetViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <ButtonView onClick={() => setOpen(true)}>Open</ButtonView>\n      <ActionSheetView\n        open={open}\n        items={[{ label: 'Duplicate', onClick: () => {} }, { label: 'Delete', danger: true, onClick: () => {} }]}\n        onClose={() => setOpen(false)}\n      />\n    </>\n  );\n}` },
  bottomsheet:       { title: 'BottomSheetView',               desc: 'Drag-to-dismiss mobile sheet — distinct from the persistent, resizable BottomPanelView.', vars: VARS_ACCENT, liveContent: <BottomSheetPanel />, examples: <BottomSheetViewExamples />, docs: <BottomSheetViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <ButtonView onClick={() => setOpen(true)}>Open</ButtonView>\n      <BottomSheetView open={open} title="Request Options" onClose={() => setOpen(false)}>\n        ...\n      </BottomSheetView>\n    </>\n  );\n}` },
  spotlighttour:     { title: 'SpotlightTourView',             desc: 'Coach-mark onboarding — spotlight cutout around a target selector + step tooltip + progress dots.', vars: VARS_ACCENT, liveContent: <SpotlightTourPanel />, examples: <SpotlightTourViewExamples />, docs: <SpotlightTourViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [open, setOpen] = useState(false);\n  const [step, setStep] = useState(0);\n  const steps = [{ target: '#send-btn', title: 'Send requests', content: 'Build and fire HTTP requests from here.' }];\n  return (\n    <>\n      <ButtonView id="send-btn" onClick={() => setOpen(true)}>Send</ButtonView>\n      <SpotlightTourView\n        open={open}\n        steps={steps}\n        stepIndex={step}\n        onNext={() => setStep(s => s + 1)}\n        onPrev={() => setStep(s => s - 1)}\n        onClose={() => setOpen(false)}\n      />\n    </>\n  );\n}` },
  fab:               { title: 'FabView',                       desc: 'Floating action button — standard, extended (with label), or speed-dial with sub-actions.', vars: VARS_ACCENT, liveContent: <FabPanel />, examples: <FabViewExamples />, docs: <FabViewDocs />, noExamplesHeader: true, code: `<FabView\n  actions={[\n    { icon: <FolderIcon />, label: 'New Folder', onClick: () => {} },\n    { icon: <DownloadIcon />, label: 'Import', onClick: () => {} },\n  ]}\n/>` },
  dock:              { title: 'DockView',                      desc: 'Floating icon dock — icons magnify as the cursor approaches.', vars: VARS_ACCENT, liveContent: <DockPanel />, examples: <DockViewExamples />, docs: <DockViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [active, setActive] = useState('server');\n  const items = [\n    { id: 'server', icon: <ServerIcon size={18} />, label: 'Servers', active: active === 'server' },\n    { id: 'globe', icon: <GlobeIcon size={18} />, label: 'Network', active: active === 'globe' },\n  ];\n  return <DockView items={items} onSelect={setActive} />;\n}` },
  breadcrumb:        { title: 'BreadcrumbView',                desc: 'Path breadcrumb trail with overflow-collapse into a "…" for long paths.', vars: VARS_ACCENT, liveContent: <BreadcrumbPanel />, examples: <BreadcrumbViewExamples />, docs: <BreadcrumbViewDocs />, noExamplesHeader: true, code: `<BreadcrumbView items={[{ label: 'Workspace', onClick: () => {} }, { label: 'Users API' }]} />` },
  pagination:        { title: 'PaginationView',                desc: 'Page number control with ellipsis collapse for long ranges.', vars: VARS_ACCENT, liveContent: <PaginationPanel />, examples: <PaginationViewExamples />, docs: <PaginationViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [page, setPage] = useState(1);\n  return <PaginationView page={page} totalPages={40} onChange={setPage} />;\n}` },
  hero:              { title: 'HeroView',                      desc: 'Banner section — title/subtitle/CTA, size-driven min-height.', vars: VARS_ACCENT, liveContent: <HeroPanel />, examples: <HeroViewExamples />, docs: <HeroViewDocs />, noExamplesHeader: true, code: `<HeroView\n  title="Build APIs faster"\n  subtitle="Design, test, and document APIs in one workspace."\n  actions={<ButtonView variant="primary">Get Started</ButtonView>}\n/>` },
  level:             { title: 'LevelView',                     desc: 'Space-between horizontal toolbar row primitive.', vars: VARS_ACCENT, liveContent: <LevelPanel />, examples: <LevelViewExamples />, docs: <LevelViewDocs />, noExamplesHeader: true, code: `<LevelView left={<span>142 requests</span>} right={<ButtonView size="sm">Export</ButtonView>} />` },
  mediaobject:       { title: 'MediaObjectView',                desc: 'Avatar/icon + content + actions row.', vars: VARS_ACCENT, liveContent: <MediaObjectPanel />, examples: <MediaObjectViewExamples />, docs: <MediaObjectViewDocs />, noExamplesHeader: true, code: `<MediaObjectView media={<AvatarView name="Jordan Lee" />} actions={<IconButtonView icon={<MoreHorizontalIcon />} />}>\n  <b>Jordan Lee</b> commented on your request\n</MediaObjectView>` },
  tilegrid:          { title: 'TileGridView',                  desc: 'Nested ancestor/parent/child tile grid.', vars: VARS_ACCENT, liveContent: <TileGridPanel />, examples: <TileGridViewExamples />, docs: <TileGridViewDocs />, noExamplesHeader: true, code: `<TileGridView nodes={[{ content: <div>A</div>, weight: 2 }, { vertical: true, children: [{ content: <div>B</div> }, { content: <div>C</div> }] }]} />` },
  panellist:         { title: 'PanelListView',                 desc: 'Heading + tabs + filterable block list.', vars: VARS_ACCENT, liveContent: <PanelListPanel />, examples: <PanelListViewExamples />, docs: <PanelListViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [tab, setTab] = useState('collections');\n  return (\n    <PanelListView\n      heading="Workspace"\n      tabs={[{ id: 'collections', label: 'Collections' }, { id: 'history', label: 'History' }]}\n      activeTab={tab}\n      onTabChange={setTab}\n      items={[{ value: 'users', label: 'Users API' }, { value: 'orders', label: 'Orders API' }]}\n    />\n  );\n}` },
  navbar:            { title: 'NavbarView',                    desc: 'Top app bar — brand, link menu, burger collapse on narrow widths.', vars: VARS_ACCENT, liveContent: <NavbarPanel />, examples: <NavbarViewExamples />, docs: <NavbarViewDocs />, noExamplesHeader: true, code: `<NavbarView\n  brand="Daakia"\n  links={[{ id: 'requests', label: 'Requests', active: true }, { id: 'docs', label: 'Docs' }]}\n  right={<ButtonView size="sm">Sign in</ButtonView>}\n/>` },
  affix:             { title: 'AffixView',                     desc: 'Sticky-on-scroll wrapper — pins once it reaches offsetTop.', vars: VARS_ACCENT, liveContent: <AffixPanel />, examples: <AffixViewExamples />, docs: <AffixViewDocs />, noExamplesHeader: true, code: `<AffixView offsetTop={0}>\n  <div>Pinned toolbar</div>\n</AffixView>` },
  anchor:            { title: 'AnchorView',                    desc: 'Scroll-spy in-page navigation — highlights the section in view, click to jump.', vars: VARS_ACCENT, liveContent: <AnchorPanel />, examples: <AnchorViewExamples />, docs: <AnchorViewDocs />, noExamplesHeader: true, code: `<AnchorView links={[{ id: 'intro', label: 'Introduction' }, { id: 'auth', label: 'Authentication' }]} />` },
  stickyheader:      { title: 'StickyHeaderView',               desc: 'Sticky section header that grows a shadow once pinned.', vars: VARS_ACCENT, liveContent: <StickyHeaderPanel />, examples: <StickyHeaderViewExamples />, docs: <StickyHeaderViewDocs />, noExamplesHeader: true, code: `<StickyHeaderView>Response Headers</StickyHeaderView>` },
  aspectratio:       { title: 'AspectRatioView',                desc: 'Fixed aspect-ratio box for image/video containers.', vars: VARS_ACCENT, liveContent: <AspectRatioPanel />, examples: <AspectRatioViewExamples />, docs: <AspectRatioViewDocs />, noExamplesHeader: true, code: `<AspectRatioView ratio={16 / 9}>\n  <img src="https://picsum.photos/seed/aspect/640/360" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />\n</AspectRatioView>` },
  masonrygrid:       { title: 'MasonryGridView',                desc: 'Pinterest-style column-balanced layout — pure CSS columns, no JS measurement.', vars: VARS_ACCENT, liveContent: <MasonryGridPanel />, examples: <MasonryGridViewExamples />, docs: <MasonryGridViewDocs />, noExamplesHeader: true, code: `<MasonryGridView columns={3}>\n  <div>Card 1</div>\n  <div>Card 2</div>\n  <div>Card 3</div>\n</MasonryGridView>` },
  scrollarea:        { title: 'ScrollAreaView',                 desc: 'Custom accent-tinted scrollbar container primitive.', vars: VARS_ACCENT, liveContent: <ScrollAreaPanel />, examples: <ScrollAreaViewExamples />, docs: <ScrollAreaViewDocs />, noExamplesHeader: true, code: `<ScrollAreaView maxHeight={140}>\n  <div>Row 1</div>\n  <div>Row 2</div>\n</ScrollAreaView>` },
  backtotop:         { title: 'BackToTopView',                  desc: 'Floating scroll-to-top button — fades in past a scroll threshold.', vars: VARS_ACCENT, liveContent: <BackToTopPanel />, examples: <BackToTopViewExamples />, docs: <BackToTopViewDocs />, noExamplesHeader: true, code: `<BackToTopView threshold={240} />` },
  watermark:         { title: 'WatermarkView',                  desc: 'Repeated diagonal text/logo overlay.', vars: VARS_ACCENT, liveContent: <WatermarkPanel />, examples: <WatermarkViewExamples />, docs: <WatermarkViewDocs />, noExamplesHeader: true, code: `<WatermarkView text="CONFIDENTIAL">\n  <div>Protected content</div>\n</WatermarkView>` },
  descriptions:      { title: 'DescriptionsView',               desc: 'Read-only label/value grid for entity detail views.', vars: VARS_ACCENT, liveContent: <DescriptionsPanel />, examples: <DescriptionsViewExamples />, docs: <DescriptionsViewDocs />, noExamplesHeader: true, code: `<DescriptionsView title="Request Details" items={[{ label: 'Method', value: 'POST' }, { label: 'Status', value: '200 OK' }]} />` },
  statistic:         { title: 'StatisticView',                  desc: 'Inline animated big-number stat with prefix/suffix.', vars: VARS_ACCENT, liveContent: <StatisticPanel />, examples: <StatisticViewExamples />, docs: <StatisticViewDocs />, noExamplesHeader: true, code: `<StatisticView label="Requests today" value={1420} />` },
  result:            { title: 'ResultView',                     desc: 'Full-page outcome state — success / error / 404 / 403 / warning / info.', vars: VARS_STATUS, liveContent: <ResultPanel />, examples: <ResultViewExamples />, docs: <ResultViewDocs />, noExamplesHeader: true, code: `<ResultView status="success" title="Request sent" subtitle="Delivered successfully." />` },
  cascader:          { title: 'CascaderView',                   desc: 'Multi-level cascading select — region/category trees.', vars: VARS_ACCENT, liveContent: <CascaderPanel />, examples: <CascaderViewExamples />, docs: <CascaderViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [path, setPath] = useState(['us', 'ca']);\n  const regions = [{ value: 'us', label: 'United States', children: [{ value: 'ca', label: 'California' }, { value: 'ny', label: 'New York' }] }];\n  return <CascaderView options={regions} value={path} onChange={setPath} />;\n}` },
  combobox:          { title: 'ComboBoxView',                   desc: 'Free-text input + filtered dropdown suggestions — autocomplete pattern.', vars: VARS_ACCENT, liveContent: <ComboBoxPanel />, examples: <ComboBoxViewExamples />, docs: <ComboBoxViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState('GET');\n  return <ComboBoxView options={[{ value: 'GET', label: 'GET' }, { value: 'POST', label: 'POST' }]} value={value} onChange={setValue} />;\n}` },
  listview:          { title: 'ListView',                       desc: 'Generic avatar/title/subtitle/action list primitive.', vars: VARS_ACCENT, liveContent: <ListViewPanel />, examples: <ListViewExamples />, docs: <ListViewDocs />, noExamplesHeader: true, code: `<ListView items={[{ id: '1', title: 'Users API', subtitle: '12 requests' }]} />` },
  virtualizedlist:   { title: 'VirtualizedListView',            desc: 'Windowed rendering for large lists — only mounts rows in (or near) the viewport.', vars: VARS_ACCENT, liveContent: <VirtualizedListPanel />, examples: <VirtualizedListViewExamples />, docs: <VirtualizedListViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const items = Array.from({ length: 5000 }, (_, i) => 'Row ' + (i + 1));\n  return <VirtualizedListView items={items} itemHeight={28} height={200} renderItem={item => <div>{item}</div>} />;\n}` },
  stickytableheader: { title: 'StickyTableHeaderView',          desc: 'Sticky header + optional frozen first column for wide/tall tables.', vars: VARS_TABLE, liveContent: <StickyTableHeaderPanel />, examples: <StickyTableHeaderViewExamples />, docs: <StickyTableHeaderViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const rows = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];\n  return (\n    <StickyTableHeaderView\n      keyField="id"\n      rows={rows}\n      columns={[{ key: 'name', label: 'Name', render: r => r.name }]}\n    />\n  );\n}` },
  tablepagination:   { title: 'TablePaginationView',            desc: 'Rows-per-page selector + page-number footer.', vars: VARS_TABLE, liveContent: <TablePaginationPanel />, examples: <TablePaginationViewExamples />, docs: <TablePaginationViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [page, setPage] = useState(1);\n  const [rowsPerPage, setRowsPerPage] = useState(10);\n  return <TablePaginationView page={page} totalRows={247} rowsPerPage={rowsPerPage} onPageChange={setPage} onRowsPerPageChange={setRowsPerPage} />;\n}` },
  filterbar:         { title: 'FilterBarView',                  desc: 'Chip-based row of active filters with a clear-all action.', vars: VARS_CHIP, liveContent: <FilterBarPanel />, examples: <FilterBarViewExamples />, docs: <FilterBarViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [filters, setFilters] = useState([{ key: 'method', label: 'Method: GET' }]);\n  return (\n    <FilterBarView\n      filters={filters}\n      onRemove={key => setFilters(f => f.filter(x => x.key !== key))}\n      onClearAll={() => setFilters([])}\n    />\n  );\n}` },
  sortableheader:    { title: 'SortableHeaderView',             desc: 'Clickable table column header with a sort-direction arrow indicator.', vars: VARS_TABLE, liveContent: <SortableHeaderPanel />, examples: <SortableHeaderViewExamples />, docs: <SortableHeaderViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [direction, setDirection] = useState('asc');\n  return <SortableHeaderView label="Name" direction={direction} onClick={() => setDirection(d => d === 'asc' ? 'desc' : 'asc')} />;\n}` },
  editablecell:      { title: 'EditableCellView',               desc: 'Click-to-edit table cell — Enter commits, Escape cancels.', vars: VARS_TABLE, liveContent: <EditableCellPanel />, examples: <EditableCellViewExamples />, docs: <EditableCellViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState('Users API');\n  return <EditableCellView value={value} onChange={setValue} />;\n}` },
  datagridtoolbar:   { title: 'DataGridToolbarView',            desc: 'Table toolbar — search + column-visibility + density cycle + export.', vars: VARS_TABLE, liveContent: <DataGridToolbarPanel />, examples: <DataGridToolbarViewExamples />, docs: <DataGridToolbarViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [search, setSearch] = useState('');\n  const [visible, setVisible] = useState(['name']);\n  return (\n    <DataGridToolbarView\n      search={search}\n      onSearchChange={setSearch}\n      columns={[{ key: 'name', label: 'Name' }]}\n      visibleColumns={visible}\n      onVisibleColumnsChange={setVisible}\n      onExport={() => {}}\n    />\n  );\n}` },
  columnvisibility:  { title: 'ColumnVisibilityMenuView',       desc: 'Checkbox menu to toggle table column visibility.', vars: VARS_TABLE, liveContent: <ColumnVisibilityPanel />, examples: <ColumnVisibilityMenuViewExamples />, docs: <ColumnVisibilityMenuViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [visible, setVisible] = useState(['name', 'status']);\n  return <ColumnVisibilityMenuView columns={[{ key: 'name', label: 'Name' }, { key: 'status', label: 'Status' }]} visible={visible} onChange={setVisible} />;\n}` },
  kbd:               { title: 'KbdView',                        desc: 'Hotkey hint chip, composes multiple keys with a "+" separator.', vars: VARS_ACCENT, liveContent: <KbdPanel />, examples: <KbdViewExamples />, docs: <KbdViewDocs />, noExamplesHeader: true, code: `<KbdView keys={['⌘', 'K']} />` },
  wizardstepper:     { title: 'WizardStepperView',               desc: 'Multi-step form wizard progress header.', vars: VARS_ACCENT, liveContent: <WizardStepperPanel />, examples: <WizardStepperViewExamples />, docs: <WizardStepperViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [active, setActive] = useState('auth');\n  const steps = [{ id: 'connect', label: 'Connect' }, { id: 'auth', label: 'Authenticate' }];\n  return <WizardStepperView steps={steps} activeStep={active} onStepClick={setActive} />;\n}` },
  accordiongroup:    { title: 'AccordionGroupView',              desc: 'Managed single/multi-open accordion group, built on CollapsibleSectionView.', vars: VARS_ACCENT, liveContent: <AccordionGroupPanel />, examples: <AccordionGroupViewExamples />, docs: <AccordionGroupViewDocs />, noExamplesHeader: true, code: `<AccordionGroupView items={[{ id: 'a', title: 'Headers', children: <div>...</div> }]} defaultOpen={['a']} />` },
  segmentedprogressbar: { title: 'SegmentedProgressBarView',     desc: 'Multi-segment progress — e.g. upload/pipeline stages, each independently colored.', vars: VARS_ACCENT, liveContent: <SegmentedProgressBarPanel />, examples: <SegmentedProgressBarViewExamples />, docs: <SegmentedProgressBarViewDocs />, noExamplesHeader: true, code: `<SegmentedProgressBarView segments={[{ label: 'Upload', status: 'done' }, { label: 'Scan', status: 'active' }]} />` },
  checklist:         { title: 'ChecklistView',                  desc: 'Todo-style checklist — strikethrough + faded once complete.', vars: VARS_TOGGLE, liveContent: <ChecklistPanel />, examples: <ChecklistViewExamples />, docs: <ChecklistViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [items, setItems] = useState([{ id: '1', label: 'Send first request', checked: false }]);\n  return <ChecklistView items={items} onToggle={id => setItems(prev => prev.map(i => i.id === id ? { ...i, checked: !i.checked } : i))} />;\n}` },
  prioritypicker:    { title: 'PriorityPickerView',              desc: 'Low/medium/high/urgent selector with color-coded dots.', vars: VARS_ACCENT, liveContent: <PriorityPickerPanel />, examples: <PriorityPickerViewExamples />, docs: <PriorityPickerViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [priority, setPriority] = useState('high');\n  return <PriorityPickerView value={priority} onChange={setPriority} />;\n}` },
  tagcloud:          { title: 'TagCloudView',                   desc: 'Weighted tag cloud — font size scales with relative weight.', vars: VARS_ACCENT, liveContent: <TagCloudPanel />, examples: <TagCloudViewExamples />, docs: <TagCloudViewDocs />, noExamplesHeader: true, code: `<TagCloudView tags={[{ label: 'rest', weight: 40 }, { label: 'graphql', weight: 20 }]} />` },
  rangeslider:       { title: 'RangeSliderView',                 desc: 'Dual-handle min/max range — distinct from the single-handle SliderView.', vars: VARS_ACCENT, liveContent: <RangeSliderPanel />, examples: <RangeSliderViewExamples />, docs: <RangeSliderViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [range, setRange] = useState([20, 80]);\n  return <RangeSliderView value={range} onChange={setRange} showValue />;\n}` },
  votewidget:        { title: 'VoteWidgetView',                  desc: 'Upvote/downvote counter control.', vars: VARS_ACCENT, liveContent: <VoteWidgetPanel />, examples: <VoteWidgetViewExamples />, docs: <VoteWidgetViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [score, setScore] = useState(42);\n  const [vote, setVote] = useState(null);\n  return <VoteWidgetView score={score} userVote={vote} onVote={v => { setVote(v); setScore(s => s + 1); }} />;\n}` },
  likebutton:        { title: 'LikeButtonView',                  desc: 'Animated heart/like toggle button — pop animation on like.', vars: VARS_ACCENT, liveContent: <LikeButtonPanel />, examples: <LikeButtonViewExamples />, docs: <LikeButtonViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [liked, setLiked] = useState(false);\n  return <LikeButtonView liked={liked} onChange={setLiked} count={128} />;\n}` },
  bookmarkbutton:    { title: 'BookmarkButtonView',               desc: 'Animated bookmark/save toggle button.', vars: VARS_ACCENT, liveContent: <BookmarkButtonPanel />, examples: <BookmarkButtonViewExamples />, docs: <BookmarkButtonViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [saved, setSaved] = useState(false);\n  return <BookmarkButtonView saved={saved} onChange={setSaved} />;\n}` },
  followbutton:      { title: 'FollowButtonView',                 desc: 'Follow/following state-toggle button — reveals "Unfollow" on hover.', vars: VARS_ACCENT, liveContent: <FollowButtonPanel />, examples: <FollowButtonViewExamples />, docs: <FollowButtonViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [following, setFollowing] = useState(false);\n  return <FollowButtonView following={following} onChange={setFollowing} />;\n}` },
  shortcutrecorder:  { title: 'ShortcutRecorderView',             desc: 'Captures a keybinding — click to record, press keys, renders via KbdView.', vars: VARS_ACCENT, liveContent: <ShortcutRecorderPanel />, examples: <ShortcutRecorderViewExamples />, docs: <ShortcutRecorderViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [keys, setKeys] = useState(['⌘', 'K']);\n  return <ShortcutRecorderView value={keys} onChange={setKeys} />;\n}` },
  messagebubble:     { title: 'MessageBubbleView',                desc: 'Chat message bubble — sent (right, filled) / received (left, neutral).', vars: VARS_ACCENT, liveContent: <MessageBubblePanel />, examples: <MessageBubbleViewExamples />, docs: <MessageBubbleViewDocs />, noExamplesHeader: true, code: `<MessageBubbleView variant="sent" timestamp="10:02 AM">Sounds good, sending now.</MessageBubbleView>` },
  chatinput:         { title: 'ChatInputView',                    desc: 'Message composer — auto-growing textarea + attach + send.', vars: VARS_INPUT, liveContent: <ChatInputPanel />, examples: <ChatInputViewExamples />, docs: <ChatInputViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [msg, setMsg] = useState('');\n  return <ChatInputView value={msg} onChange={setMsg} onSend={() => setMsg('')} />;\n}` },
  typingindicator:   { title: 'TypingIndicatorView',               desc: 'Animated "…is typing" dots.', vars: VARS_ACCENT, liveContent: <TypingIndicatorPanel />, examples: <TypingIndicatorViewExamples />, docs: <TypingIndicatorViewDocs />, noExamplesHeader: true, code: `<TypingIndicatorView label="Jordan is typing…" />` },
  commentthread:     { title: 'CommentThreadView',                 desc: 'Nested comment thread with reply action — GitHub/PR-style.', vars: VARS_ACCENT, liveContent: <CommentThreadPanel />, examples: <CommentThreadViewExamples />, docs: <CommentThreadViewDocs />, noExamplesHeader: true, code: `<CommentThreadView comments={[{ id: '1', author: 'Jordan', timestamp: '2h ago', content: 'LGTM' }]} onReply={() => {}} />` },
  notificationcenter: { title: 'NotificationCenterView',            desc: 'Bell icon + dropdown notification list, unread-count badge.', vars: VARS_ACCENT, liveContent: <NotificationCenterPanel />, examples: <NotificationCenterViewExamples />, docs: <NotificationCenterViewDocs />, noExamplesHeader: true, code: `<NotificationCenterView notifications={[{ id: '1', title: 'Deploy succeeded', timestamp: '5m ago' }]} />` },
  alertdialog:       { title: 'AlertDialogView',                   desc: 'Pre-built confirm/cancel dialog with danger styling — the standard "Are you sure?" pattern.', vars: VARS_MODAL, liveContent: <AlertDialogPanel />, examples: <AlertDialogViewExamples />, docs: <AlertDialogViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [open, setOpen] = useState(false);\n  return (\n    <>\n      <ButtonView variant="danger" onClick={() => setOpen(true)}>Delete</ButtonView>\n      <AlertDialogView open={open} title="Delete collection?" message="This can't be undone." danger onConfirm={() => setOpen(false)} onCancel={() => setOpen(false)} />\n    </>\n  );\n}` },
  feedbackwidget:    { title: 'FeedbackWidgetView',                 desc: 'Thumbs up/down + optional comment micro-survey.', vars: VARS_ACCENT, liveContent: <FeedbackWidgetPanel />, examples: <FeedbackWidgetViewExamples />, docs: <FeedbackWidgetViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [vote, setVote] = useState(null);\n  return <FeedbackWidgetView vote={vote} onVote={setVote} />;\n}` },
  npssurvey:         { title: 'NpsSurveyView',                     desc: '0-10 Net Promoter Score picker with an optional follow-up text field.', vars: VARS_ACCENT, liveContent: <NpsSurveyPanel />, examples: <NpsSurveyViewExamples />, docs: <NpsSurveyViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [score, setScore] = useState(null);\n  return <NpsSurveyView score={score} onScoreChange={setScore} />;\n}` },
  sharesheet:        { title: 'ShareSheetView',                    desc: 'Social share row + copy-link field.', vars: VARS_ACCENT, liveContent: <ShareSheetPanel />, examples: <ShareSheetViewExamples />, docs: <ShareSheetViewDocs />, noExamplesHeader: true, code: `<ShareSheetView url="https://daakia.app/s/abc123" />` },
  contactcard:       { title: 'ContactCardView',                    desc: 'Avatar + name + role + contact-icon row card.', vars: VARS_ACCENT, liveContent: <ContactCardPanel />, examples: <ContactCardViewExamples />, docs: <ContactCardViewDocs />, noExamplesHeader: true, code: `<ContactCardView name="Jordan Lee" role="Platform Engineer" />` },
  articlecard:       { title: 'ArticleCardView',                    desc: 'Image + title + excerpt + meta preview card — blog/article listing.', vars: VARS_ACCENT, liveContent: <ArticleCardPanel />, examples: <ArticleCardViewExamples />, docs: <ArticleCardViewDocs />, noExamplesHeader: true, code: `<ArticleCardView title="What's new in v2.0" excerpt="Faster requests, smarter mocks." meta="5 min read" />` },
  faqaccordion:      { title: 'FaqAccordionView',                   desc: 'Pre-styled Q&A accordion, built directly on AccordionGroupView.', vars: VARS_ACCENT, liveContent: <FaqAccordionPanel />, examples: <FaqAccordionViewExamples />, docs: <FaqAccordionViewDocs />, noExamplesHeader: true, code: `<FaqAccordionView faqs={[{ id: '1', question: 'How do I import a collection?', answer: 'Go to Import → select your file.' }]} />` },
  messagebanner:     { title: 'MessageBannerView',                  desc: 'Inline success/error/info/warning message strip.', vars: VARS_STATUS, liveContent: <MessageBannerPanel />, examples: <MessageBannerViewExamples />, docs: <MessageBannerViewDocs />, noExamplesHeader: true, code: `<MessageBannerView variant="success">Environment saved.</MessageBannerView>` },
  quoteblock:        { title: 'QuoteBlockView',                     desc: 'Styled blockquote with an optional avatar + attribution line.', vars: VARS_ACCENT, liveContent: <QuoteBlockPanel />, examples: <QuoteBlockViewExamples />, docs: <QuoteBlockViewDocs />, noExamplesHeader: true, code: `<QuoteBlockView attribution="Jordan Lee" role="Platform Engineer">Daakia cut our API testing time in half.</QuoteBlockView>` },
  hudview:           { title: 'HudView', desc: 'Generic floating draggable toolbar — store-free counterpart of DebugHud. Pass items[] and an optional status string.', vars: VARS_ACCENT, liveContent: <HudViewPanel />, examples: <HudViewExamples />, docs: <HudViewDocs />, code: `<HudView
  items={[
    { id: 'continue', icon: <PlayIcon size={13} />, title: 'Continue (F5)' },
    { id: 'stop',     icon: <RefreshIcon size={13} />, title: 'Stop' },
  ]}
  status="Paused — Line 42"
/>` },
  collapsiblesection: { title: 'CollapsibleSectionView', desc: 'Expandable section with chevron toggle, colored chip title, count badge, and a right-side action slot.', vars: VARS_ACCENT, liveContent: <CollapsibleSectionPanel />, examples: <CollapsibleSectionViewExamples />, docs: <CollapsibleSectionViewDocs />, code: `function Preview() {\n  const [expanded, setExpanded] = useState(true);\n  return (\n    <CollapsibleSectionView\n      title="Variables"\n      expanded={expanded}\n      onToggle={() => setExpanded(v => !v)}\n      accentColor="var(--color-debug-key)"\n      badge={3}\n    >\n      <div style={{ padding: 8 }}>baseUrl, apiKey, timeout</div>\n    </CollapsibleSectionView>\n  );\n}` },
  jsontree:           { title: 'JsonTreeView', desc: 'Recursive JSON / object / array value tree with editor-style token colors. Expandable nodes with configurable default depth.', vars: VARS_ACCENT, liveContent: <JsonTreeViewPanel />, examples: <JsonTreeViewExamples />, docs: <JsonTreeViewDocs />, code: `<JsonTreeView\n  data={{ user: { id: 1, name: 'Alice', roles: ['admin'] } }}\n  defaultExpandDepth={2}\n/>` },
  logentry:           { title: 'ExpandableLogEntryView', desc: 'Expandable log row with icon, title, colored badge, timestamp chip, and chevron.', vars: VARS_ACCENT, liveContent: <ExpandableLogEntryPanel />, examples: <ExpandableLogEntryViewExamples />, docs: <ExpandableLogEntryViewDocs />, code: `<ExpandableLogEntryView\n  icon={<ArrowUpRightIcon size={13} />}\n  title="Request Sent"\n  badge="POST"\n  badgeColor="var(--color-method-post)"\n  timestamp={Date.now()}\n/>` },
  copybutton:         { title: 'CopyButtonView', desc: 'Icon-only button that copies text to clipboard. Shows CopyIcon → CheckIcon swap for 1500ms on success.', vars: VARS_ACCENT, liveContent: <CopyButtonPanel />, examples: <CopyButtonViewExamples />, docs: <CopyButtonViewDocs />, code: `<CopyButtonView text="some text to copy" />\n<CopyButtonView text="token" size="xs" />` },
  markdownview:       { title: 'MarkdownView', desc: 'Renders Markdown (GFM) with syntax-highlighted code blocks, inline code, tables, task lists, blockquotes, and copy-buttons on each code block.', vars: VARS_ACCENT, liveContent: <MarkdownViewPanel />, examples: <MarkdownViewExamples />, docs: <MarkdownViewDocs />, code: `<MarkdownView content={"## Hello\\n\\nInline \`code\` and a code block:\\n\\n\`\`\`ts\\nconst x = 1;\\n\`\`\`"} />` },
  formdatatable:      { title: 'FormDataTableView', desc: 'Multipart/form-data key-value table with file upload support. Rows have: enabled toggle, key input, type dropdown (Text | File), value/file picker.', vars: VARS_ACCENT, liveContent: <FormDataTablePanel />, examples: <FormDataTableViewExamples />, docs: <FormDataTableViewDocs />, code: `function Preview() {\n  const [rows, setRows] = useState([{ id: '1', enabled: true, key: 'avatar', type: 'file', value: '' }]);\n  return <FormDataTableView rows={rows} onChange={setRows} label="Form Data" />;\n}` },
  yamlkeychip:        { title: 'YamlKeyChip', desc: 'Compact type-labeled chip for YAML/JSON keys. Shows the key name with a small colored type badge.', vars: VARS_ACCENT, liveContent: <YamlKeyChipPanel />, examples: <YamlKeyChipExamples />, docs: <YamlKeyChipDocs />, code: `<YamlKeyChip yamlKey="brand.primary" />\n<YamlKeyChip yamlKey="component_button.primary_bg" color="var(--color-success)" />` },
  livecolorpanel:     { title: 'LiveColorCustomizer', desc: 'Interactive color editor that applies CSS custom property changes directly to the document root in real time.', vars: VARS_ACCENT, liveContent: <LiveColorCustomizerPanel />, examples: <LiveColorCustomizerExamples />, docs: <LiveColorCustomizerDocs />, noExamplesHeader: true },
  spacerview:         { title: 'SpacerView', desc: 'Thin divider line for separating groups in icon rails, toolbars, or any flex container.', vars: VARS_ACCENT, liveContent: <SpacerViewPanel />, examples: <SpacerViewExamples />, docs: <SpacerViewDocs />, code: `<SpacerView orientation="vertical" spacing="md" />` },
  folderview:         { title: 'FolderView', desc: 'Generic folder tree component with expand/collapse, hover action buttons, DUI ContextMenuView on 3-dot, and DUI ModalView runner popup.', vars: VARS_ACCENT, liveContent: <FolderViewLive />, examples: <FolderViewExamples />, docs: <FolderViewDocs />, code: `function Preview() {\n  const nodes = [{ id: 'f1', name: 'Users API', type: 'folder', children: [{ id: 'r1', name: 'GET /users', type: 'item' }] }];\n  return (\n    <FolderView\n      nodes={nodes}\n      accentColor="var(--color-protocol-rest)"\n      renderItem={(item, _node, depth) => <div style={{ paddingLeft: depth * 12 }}>{item.name}</div>}\n    />\n  );\n}` },
  debugeditor:        { title: 'DebugEditorView', desc: 'Monaco editor with breakpoint gutter, paused-line highlight, and variable-hover tooltips. Fully abstract — consumer provides the adapter.', vars: VARS_ACCENT, liveContent: <DebugEditorViewLive />, examples: <DebugEditorViewExamples />, docs: <DebugEditorViewDocs />, code: `function Preview() {\n  const [code, setCode] = useState('function add(a, b) {\n  return a + b;\n}');\n  const breakpoints = [1];\n  const pausedLine = 1;\n  const toggleBp = () => {};\n  return (\n    <DebugEditorView\n      value={code}\n      onChange={setCode}\n      language="javascript"\n      height={200}\n      breakpoints={breakpoints}\n      pausedLine={pausedLine}\n      adapter={{ onToggleBreakpoint: toggleBp }}\n    />\n  );\n}` },
  debugview:          { title: 'DebugView', desc: 'Editor-style Run & Debug sidebar panel — Variables (scoped tree), Watch expressions, Call Stack, Breakpoints. Fully abstract, no daakia store dependency.', vars: VARS_ACCENT, liveContent: <DebugViewLive />, examples: <DebugViewExamples />, docs: <DebugViewDocs />, code: `function Preview() {\n  const session = { variables: [{ name: 'total', value: '42' }], callStack: [{ id: 'f1', label: 'main()' }], breakpoints: [] };\n  const [watchExprs, setWatchExprs] = useState([]);\n  return (\n    <DebugView\n      session={session}\n      watchExpressions={watchExprs}\n      actions={{\n        onContinue: () => {}, onStop: () => {}, onStepOver: () => {}, onStepInto: () => {},\n        onAddWatchExpression: expr => setWatchExprs(prev => [...prev, expr]),\n        onRemoveWatchExpression: expr => setWatchExprs(prev => prev.filter(e => e !== expr)),\n      }}\n    />\n  );\n}` },

  // ─── Sprint 7 · Batch L — Enterprise, Settings & SaaS ───────────────────────
  settingsrow:           { title: 'SettingsRowView',           desc: 'Label + description + control row — the standard settings-page primitive.', vars: VARS_ACCENT, liveContent: <SettingsRowPanel />, examples: <SettingsRowViewExamples />, docs: <SettingsRowViewDocs />, noExamplesHeader: true, code: `<SettingsRowView label="Two-factor auth" description="Require a code at sign-in." control={<ToggleSwitchView checked />} />` },
  settingssection:       { title: 'SettingsSectionView',       desc: 'Grouped settings card with a header — pairs with SettingsRowView.', vars: VARS_ACCENT, liveContent: <SettingsSectionPanel />, examples: <SettingsSectionViewExamples />, docs: <SettingsSectionViewDocs />, noExamplesHeader: true, code: `<SettingsSectionView title="Security" description="Manage sign-in and access.">\n  <SettingsRowView label="Two-factor auth" control={<ToggleSwitchView checked />} />\n</SettingsSectionView>` },
  onboardingchecklist:   { title: 'OnboardingChecklistView',   desc: 'Collapsible "getting started" progress checklist.', vars: VARS_ACCENT, liveContent: <OnboardingChecklistPanel />, examples: <OnboardingChecklistViewExamples />, docs: <OnboardingChecklistViewDocs />, noExamplesHeader: true, code: `<OnboardingChecklistView steps={[{ id: '1', label: 'Create workspace', done: true }, { id: '2', label: 'Send first request', done: false }]} />` },
  keyvaluelist:          { title: 'KeyValueListView',          desc: 'Lightweight label:value stacked list — no edit, no toolbar.', vars: VARS_ACCENT, liveContent: <KeyValueListPanel />, examples: <KeyValueListViewExamples />, docs: <KeyValueListViewDocs />, noExamplesHeader: true, code: `<KeyValueListView entries={[{ key: 'Plan', value: 'Pro' }, { key: 'Seats', value: '12' }]} />` },
  environmentbadge:      { title: 'EnvironmentBadgeView',      desc: 'Colored environment chip with an optional pulsing live indicator.', vars: VARS_STATUS, liveContent: <EnvironmentBadgePanel />, examples: <EnvironmentBadgeViewExamples />, docs: <EnvironmentBadgeViewDocs />, noExamplesHeader: true, code: `<EnvironmentBadgeView env="prod" live />` },
  versionbadge:          { title: 'VersionBadgeView',          desc: 'Version number chip with an "update available" dot indicator.', vars: VARS_ACCENT, liveContent: <VersionBadgePanel />, examples: <VersionBadgeViewExamples />, docs: <VersionBadgeViewDocs />, noExamplesHeader: true, code: `<VersionBadgeView version="2.4.1" updateAvailable onClick={() => {}} />` },
  licensebadge:          { title: 'LicenseBadgeView',          desc: 'Plan/tier ribbon badge — Free / Pro / Enterprise.', vars: VARS_ACCENT, liveContent: <LicenseBadgePanel />, examples: <LicenseBadgeViewExamples />, docs: <LicenseBadgeViewDocs />, noExamplesHeader: true, code: `<LicenseBadgeView tier="enterprise" />` },
  usagemeter:            { title: 'UsageMeterView',            desc: 'Quota bar (used/limit) with warning-color thresholds.', vars: VARS_STATUS, liveContent: <UsageMeterPanel />, examples: <UsageMeterViewExamples />, docs: <UsageMeterViewDocs />, noExamplesHeader: true, code: `<UsageMeterView used={82} limit={100} label="API calls" />` },
  permissionmatrix:      { title: 'PermissionMatrixView',      desc: 'Role x permission checkbox grid.', vars: VARS_ACCENT, liveContent: <PermissionMatrixPanel />, examples: <PermissionMatrixViewExamples />, docs: <PermissionMatrixViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [matrix, setMatrix] = useState([[true, true, false], [true, false, false]]);\n  return <PermissionMatrixView roles={['Viewer', 'Editor']} permissions={['Read', 'Write', 'Delete']} matrix={matrix} onChange={(ri, pi, v) => setMatrix(m => m.map((row, i) => i === ri ? row.map((c, j) => j === pi ? v : c) : row))} />;\n}` },
  auditlogrow:           { title: 'AuditLogRowView',           desc: 'Timestamped actor+action+target log row — audit trail primitive.', vars: VARS_TABLE, liveContent: <AuditLogRowPanel />, examples: <AuditLogRowViewExamples />, docs: <AuditLogRowViewDocs />, noExamplesHeader: true, code: `<AuditLogRowView timestamp="2026-07-02 09:14" actor="Jordan Lee" action="deleted" target="Users API" />` },
  webhookstatus:         { title: 'WebhookStatusView',         desc: 'Webhook endpoint health row — last delivery, status code, retry action.', vars: VARS_STATUS, liveContent: <WebhookStatusPanel />, examples: <WebhookStatusViewExamples />, docs: <WebhookStatusViewDocs />, noExamplesHeader: true, code: `<WebhookStatusView url="https://api.example.com/hooks/deploy" health="healthy" statusCode={200} lastDelivery="2m ago" onRetry={() => {}} />` },
  apikeyrow:             { title: 'ApiKeyRowView',             desc: 'Masked API key row with reveal/copy/revoke actions.', vars: VARS_ACCENT, liveContent: <ApiKeyRowPanel />, examples: <ApiKeyRowViewExamples />, docs: <ApiKeyRowViewDocs />, noExamplesHeader: true, code: `<ApiKeyRowView label="Production" apiKey="sk_live_••••••••••••" onRevoke={() => {}} />` },
  ratelimitmeter:        { title: 'RateLimitMeterView',        desc: 'Requests-remaining ring gauge with a reset countdown label.', vars: VARS_STATUS, liveContent: <RateLimitMeterPanel />, examples: <RateLimitMeterViewExamples />, docs: <RateLimitMeterViewDocs />, noExamplesHeader: true, code: `<RateLimitMeterView remaining={342} limit={1000} resetLabel="in 12m" />` },
  emptyinbox:            { title: 'EmptyInboxView',            desc: 'Zero-notifications empty state — pre-styled variant of EmptyStateView.', vars: VARS_ACCENT, liveContent: <EmptyInboxPanel />, examples: <EmptyInboxViewExamples />, docs: <EmptyInboxViewDocs />, noExamplesHeader: true, code: `<EmptyInboxView />` },
  featurespotlightbadge: { title: 'FeatureSpotlightBadgeView', desc: 'Pulsing "New" badge for recently shipped features.', vars: VARS_ACCENT, liveContent: <FeatureSpotlightBadgePanel />, examples: <FeatureSpotlightBadgeViewExamples />, docs: <FeatureSpotlightBadgeViewDocs />, noExamplesHeader: true, code: `<FeatureSpotlightBadgeView label="New" />` },
  cookieconsentbanner:   { title: 'CookieConsentBannerView',   desc: 'Fixed bottom cookie-consent bar with accept/customize actions.', vars: VARS_ACCENT, liveContent: <CookieConsentBannerPanel />, examples: <CookieConsentBannerViewExamples />, docs: <CookieConsentBannerViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [open, setOpen] = useState(true);\n  return <CookieConsentBannerView open={open} onAccept={() => setOpen(false)} onCustomize={() => {}} />;\n}` },
  maintenancebanner:     { title: 'MaintenanceBannerView',     desc: 'Scheduled-downtime notice strip.', vars: VARS_STATUS, liveContent: <MaintenanceBannerPanel />, examples: <MaintenanceBannerViewExamples />, docs: <MaintenanceBannerViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [open, setOpen] = useState(true);\n  return <MaintenanceBannerView open={open} window="July 4, 2AM-4AM UTC" onDismiss={() => setOpen(false)} />;\n}` },
  trialcountdownbanner:  { title: 'TrialCountdownBannerView',  desc: '"N days left in trial" strip with an upgrade CTA.', vars: VARS_ACCENT, liveContent: <TrialCountdownBannerPanel />, examples: <TrialCountdownBannerViewExamples />, docs: <TrialCountdownBannerViewDocs />, noExamplesHeader: true, code: `<TrialCountdownBannerView daysLeft={3} onUpgrade={() => {}} />` },
  teammemberrow:         { title: 'TeamMemberRowView',         desc: 'Avatar + name + role + remove-action row — team management list item.', vars: VARS_ACCENT, liveContent: <TeamMemberRowPanel />, examples: <TeamMemberRowViewExamples />, docs: <TeamMemberRowViewDocs />, noExamplesHeader: true, code: `<TeamMemberRowView name="Jordan Lee" role="Platform Engineer" onRemove={remove} />` },
  inviteinput:           { title: 'InviteInputView',           desc: 'Email-chip input specialized for multi-invite forms.', vars: VARS_TAG, liveContent: <InviteInputPanel />, examples: <InviteInputViewExamples />, docs: <InviteInputViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [emails, setEmails] = useState(['jordan@daakia.app']);\n  return <InviteInputView emails={emails} onChange={setEmails} />;\n}` },
  roleselect:            { title: 'RoleSelectView',            desc: 'Role dropdown with a per-option description shown beneath the label.', vars: VARS_INPUT, liveContent: <RoleSelectPanel />, examples: <RoleSelectViewExamples />, docs: <RoleSelectViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [role, setRole] = useState('editor');\n  return <RoleSelectView options={[{ value: 'viewer', label: 'Viewer', description: 'Read-only access' }, { value: 'editor', label: 'Editor', description: 'Can edit content' }]} value={role} onChange={setRole} />;\n}` },
  integrationcard:       { title: 'IntegrationCardView',       desc: 'Logo + name + connect/disconnect card — integrations/marketplace listing.', vars: VARS_ACCENT, liveContent: <IntegrationCardPanel />, examples: <IntegrationCardViewExamples />, docs: <IntegrationCardViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [connected, setConnected] = useState(false);\n  return <IntegrationCardView logo={<GlobeIcon size={18} />} name="Team Chat" connected={connected} onConnect={() => setConnected(true)} onDisconnect={() => setConnected(false)} />;\n}` },
  statuspagerow:         { title: 'StatusPageRowView',         desc: 'Service + uptime% + status-dot row — status page primitive.', vars: VARS_STATUS, liveContent: <StatusPageRowPanel />, examples: <StatusPageRowViewExamples />, docs: <StatusPageRowViewDocs />, noExamplesHeader: true, code: `<StatusPageRowView service="API" status="operational" uptime={99.98} />` },
  changelogentry:        { title: 'ChangelogEntryView',        desc: 'Version + date + change-type badges + description block.', vars: VARS_ACCENT, liveContent: <ChangelogEntryPanel />, examples: <ChangelogEntryViewExamples />, docs: <ChangelogEntryViewDocs />, noExamplesHeader: true, code: `<ChangelogEntryView version="2.4.0" date="July 2, 2026" changes={[{ type: 'feature', description: 'Added mock servers' }]} />` },

  // ─── Sprint 7 · Batch I — Media & Files ─────────────────────────────────────
  imagegallery:  { title: 'ImageGalleryView',  desc: 'Grid gallery with a click-to-open lightbox — prev/next navigation, Escape to close.', vars: VARS_ACCENT, liveContent: <ImageGalleryPanel />, examples: <ImageGalleryViewExamples />, docs: <ImageGalleryViewDocs />, noExamplesHeader: true, code: `<ImageGalleryView images={[{ src: 'https://picsum.photos/seed/1/300/200', alt: 'Photo' }]} columns={3} />` },
  imagecropper:  { title: 'ImageCropperView',  desc: 'Drag-crop + zoom image editor — fixed crop frame, pannable/zoomable image.', vars: VARS_ACCENT, liveContent: <ImageCropperPanel />, examples: <ImageCropperViewExamples />, docs: <ImageCropperViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState({ x: 0, y: 0, zoom: 1.2 });\n  return <ImageCropperView src="https://picsum.photos/seed/2/600/400" value={value} onChange={setValue} height={220} />;\n}` },
  videoplayer:   { title: 'VideoPlayerView',   desc: 'Custom video controls wrapper — play/pause, seek, volume.', vars: VARS_ACCENT, liveContent: <VideoPlayerPanel />, examples: <VideoPlayerViewExamples />, docs: <VideoPlayerViewDocs />, noExamplesHeader: true, code: `<VideoPlayerView src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" />` },
  audiowaveform: { title: 'AudioWaveformView', desc: 'Static or animated waveform visualization primitive.', vars: VARS_ACCENT, liveContent: <AudioWaveformPanel />, examples: <AudioWaveformViewExamples />, docs: <AudioWaveformViewDocs />, noExamplesHeader: true, code: `<AudioWaveformView progress={0.4} animated />` },
  audioplayer:   { title: 'AudioPlayerView',   desc: 'Waveform + play/pause/seek audio player.', vars: VARS_ACCENT, liveContent: <AudioPlayerPanel />, examples: <AudioPlayerViewExamples />, docs: <AudioPlayerViewDocs />, noExamplesHeader: true, code: `<AudioPlayerView src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" />` },
  pdfviewer:     { title: 'PdfViewerView',     desc: 'Paginated PDF preview wrapper — browser native iframe renderer (needs a real PDF URL in production).', vars: VARS_ACCENT, liveContent: <PdfViewerPanel />, examples: <PdfViewerViewExamples />, docs: <PdfViewerViewDocs />, noExamplesHeader: true, code: `<PdfViewerView src="https://example.com/document.pdf" totalPages={5} height={480} />` },
  fileicon:      { title: 'FileIconView',      desc: 'Extension-based file-type icon + name + size row.', vars: VARS_ACCENT, liveContent: <FileIconPanel />, examples: <FileIconViewExamples />, docs: <FileIconViewDocs />, noExamplesHeader: true, code: `<FileIconView name="report.pdf" bytes={204800} />` },
  filelist:      { title: 'FileListView',      desc: 'Uploaded-files list with per-row progress and remove action.', vars: VARS_ACCENT, liveContent: <FileListPanel />, examples: <FileListViewExamples />, docs: <FileListViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [files, setFiles] = useState([{ id: '1', name: 'hero.png', bytes: 102400, progress: 100 }]);\n  return <FileListView files={files} onRemove={id => setFiles(f => f.filter(x => x.id !== id))} />;\n}` },
  draghandle:    { title: 'DragHandleView',    desc: 'Grab-handle primitive for reorderable lists — six-dot grip icon.', vars: VARS_ACCENT, liveContent: <DragHandlePanel />, examples: <DragHandleViewExamples />, docs: <DragHandleViewDocs />, noExamplesHeader: true, code: `<DragHandleView />` },
  signaturepad:  { title: 'SignaturePadView',  desc: 'Canvas signature capture — draw with mouse/touch/pen, exports a PNG data URL.', vars: VARS_ACCENT, liveContent: <SignaturePadPanel />, examples: <SignaturePadViewExamples />, docs: <SignaturePadViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [dataUrl, setDataUrl] = useState(null);\n  return <SignaturePadView onChange={setDataUrl} height={160} />;\n}` },
  barcode:       { title: 'BarcodeView',       desc: 'Deterministic bar-pattern generator, visually representative — not a scannable encoder.', vars: VARS_ACCENT, liveContent: <BarcodePanel />, examples: <BarcodeViewExamples />, docs: <BarcodeViewDocs />, noExamplesHeader: true, code: `<BarcodeView value="8901234567890" />` },
  imagezoom:     { title: 'ImageZoomView',     desc: 'Click-to-zoom lightbox for a single image.', vars: VARS_ACCENT, liveContent: <ImageZoomPanel />, examples: <ImageZoomViewExamples />, docs: <ImageZoomViewDocs />, noExamplesHeader: true, code: `<ImageZoomView src="https://picsum.photos/seed/3/500/400" alt="Product photo" />` },

  // ─── Sprint 7 · Batch E — Data Display & "Wow" ──────────────────────────────
  timeline:         { title: 'TimelineView',         desc: 'Event trail with icon nodes — vertical (default) or horizontal.', vars: VARS_ACCENT, liveContent: <TimelinePanel />, examples: <TimelineViewExamples />, docs: <TimelineViewDocs />, noExamplesHeader: true, code: `<TimelineView entries={[{ id: '1', title: 'Request sent', timestamp: '10:02 AM' }]} />` },
  activityfeed:     { title: 'ActivityFeedView',     desc: 'Chronological activity feed, entries grouped by day.', vars: VARS_ACCENT, liveContent: <ActivityFeedPanel />, examples: <ActivityFeedViewExamples />, docs: <ActivityFeedViewDocs />, noExamplesHeader: true, code: `<ActivityFeedView entries={[{ id: '1', actor: 'Jordan Lee', action: 'deployed Users API', timestamp: '9:14 AM', day: '2026-07-02' }]} />` },
  kanbanboard:      { title: 'KanbanBoardView',      desc: 'Draggable columns + cards board, native HTML5 drag-and-drop.', vars: VARS_ACCENT, liveContent: <KanbanBoardPanel />, examples: <KanbanBoardViewExamples />, docs: <KanbanBoardViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [columns, setColumns] = useState([{ id: 'todo', title: 'To Do', cards: [{ id: 'c1', title: 'Design auth flow' }] }]);\n  return <KanbanBoardView columns={columns} onChange={setColumns} />;\n}` },
  sparkline:        { title: 'SparklineView',        desc: 'Tiny inline SVG trend line, no axes — for table cells / stat cards.', vars: VARS_ACCENT, liveContent: <SparklinePanel />, examples: <SparklineViewExamples />, docs: <SparklineViewDocs />, noExamplesHeader: true, code: `<SparklineView data={[4, 8, 6, 9, 12, 10, 14]} width={100} height={28} />` },
  heatmapcalendar:  { title: 'HeatmapCalendarView',  desc: 'GitHub-style contribution heatmap — day cells shaded by count, tooltip on hover.', vars: VARS_STATUS, liveContent: <HeatmapCalendarPanel />, examples: <HeatmapCalendarViewExamples />, docs: <HeatmapCalendarViewDocs />, noExamplesHeader: true, code: `<HeatmapCalendarView data={[{ date: '2026-07-01', count: 4 }, { date: '2026-07-02', count: 1 }]} />` },
  comparisonslider: { title: 'ComparisonSliderView', desc: 'Before/after drag slider for image comparison.', vars: VARS_ACCENT, liveContent: <ComparisonSliderPanel />, examples: <ComparisonSliderViewExamples />, docs: <ComparisonSliderViewDocs />, noExamplesHeader: true, code: `<ComparisonSliderView beforeSrc="https://picsum.photos/seed/4/500/300" afterSrc="https://picsum.photos/seed/5/500/300" beforeLabel="Before" afterLabel="After" />` },
  carousel:         { title: 'CarouselView',         desc: 'Swipeable card carousel with dot indicators — autoplay pauses on hover.', vars: VARS_ACCENT, liveContent: <CarouselPanel />, examples: <CarouselViewExamples />, docs: <CarouselViewDocs />, noExamplesHeader: true, code: `<CarouselView slides={[<div key="1">Slide 1</div>, <div key="2">Slide 2</div>]} autoplay />` },
  qrcode:           { title: 'QRCodeView',           desc: 'QR-style module grid with finder-pattern corners — visual, not spec-compliant/scannable.', vars: VARS_ACCENT, liveContent: <QRCodePanel />, examples: <QRCodeViewExamples />, docs: <QRCodeViewDocs />, noExamplesHeader: true, code: `<QRCodeView value="https://daakia.app" size={140} />` },
  stattrendcard:    { title: 'StatTrendCardView',    desc: 'Animated count-up number + sparkline trend — distinct from the static StatsCardView.', vars: VARS_ACCENT, liveContent: <StatTrendCardPanel />, examples: <StatTrendCardViewExamples />, docs: <StatTrendCardViewDocs />, noExamplesHeader: true, code: `<StatTrendCardView label="Requests today" value={1842} trend={[900, 1100, 1400, 1700, 1842]} />` },
  pricingcard:      { title: 'PricingCardView',      desc: 'Plan comparison card with a "popular" ribbon.', vars: VARS_ACCENT, liveContent: <PricingCardPanel />, examples: <PricingCardViewExamples />, docs: <PricingCardViewDocs />, noExamplesHeader: true, code: `<PricingCardView planName="Pro" price="$29" features={['Unlimited requests', 'Team collaboration']} popular />` },
  testimonialcard:  { title: 'TestimonialCardView',  desc: 'Quote + avatar testimonial card.', vars: VARS_ACCENT, liveContent: <TestimonialCardPanel />, examples: <TestimonialCardViewExamples />, docs: <TestimonialCardViewDocs />, noExamplesHeader: true, code: `<TestimonialCardView quote="Daakia cut our testing time in half." author="Jordan Lee" role="Platform Engineer" />` },
  ratingbreakdown:  { title: 'RatingBreakdownView',  desc: '5-star rating distribution bars — App Store-style rating breakdown.', vars: VARS_STATUS, liveContent: <RatingBreakdownPanel />, examples: <RatingBreakdownViewExamples />, docs: <RatingBreakdownViewDocs />, noExamplesHeader: true, code: `<RatingBreakdownView counts={[2, 4, 10, 28, 56]} />` },
  treeselect:       { title: 'TreeSelectView',       desc: 'Checkbox-driven hierarchical select — tri-state parent checkboxes over a folder-style tree.', vars: VARS_ACCENT, liveContent: <TreeSelectPanel />, examples: <TreeSelectViewExamples />, docs: <TreeSelectViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState(['ca']);\n  return <TreeSelectView nodes={[{ id: 'us', label: 'United States', children: [{ id: 'ca', label: 'California' }] }]} value={value} onChange={setValue} />;\n}` },
  richtexttoolbar:  { title: 'RichTextToolbarView',  desc: 'Formatting toolbar primitive — bold/italic/underline/link/list/code.', vars: VARS_ACCENT, liveContent: <RichTextToolbarPanel />, examples: <RichTextToolbarViewExamples />, docs: <RichTextToolbarViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [active, setActive] = useState(['bold']);\n  return <RichTextToolbarView active={active} onAction={a => setActive(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])} />;\n}` },
  mentioninput:     { title: 'MentionInputView',     desc: '@mention autocomplete textarea.', vars: VARS_INPUT, liveContent: <MentionInputPanel />, examples: <MentionInputViewExamples />, docs: <MentionInputViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState('');\n  return <MentionInputView value={value} onChange={setValue} users={[{ id: '1', label: 'Jordan Lee' }]} />;\n}` },
  gradienttext:        { title: 'GradientTextView',        desc: 'Animated gradient-shifting text.', vars: VARS_ACCENT, liveContent: <GradientTextPanel />, examples: <GradientTextViewExamples />, docs: <GradientTextViewDocs />, noExamplesHeader: true, code: `<GradientTextView>Ship faster with Daakia</GradientTextView>` },
  typewritertext:      { title: 'TypewriterTextView',      desc: 'Animated typing-effect text.', vars: VARS_ACCENT, liveContent: <TypewriterTextPanel />, examples: <TypewriterTextViewExamples />, docs: <TypewriterTextViewDocs />, noExamplesHeader: true, code: `<TypewriterTextView text={['Build APIs.', 'Test flows.', 'Ship faster.']} />` },
  countupnumber:       { title: 'CountUpNumberView',       desc: 'Standalone animated number count-up primitive.', vars: VARS_ACCENT, liveContent: <CountUpNumberPanel />, examples: <CountUpNumberViewExamples />, docs: <CountUpNumberViewDocs />, noExamplesHeader: true, code: `<CountUpNumberView value={1284} suffix=" reqs" />` },
  magneticbutton:      { title: 'MagneticButtonView',      desc: 'Cursor-attraction hover button effect.', vars: VARS_ACCENT, liveContent: <MagneticButtonPanel />, examples: <MagneticButtonViewExamples />, docs: <MagneticButtonViewDocs />, noExamplesHeader: true, code: `<MagneticButtonView onClick={() => {}}>Hover me</MagneticButtonView>` },
  tiltcard:            { title: 'TiltCardView',            desc: '3D perspective tilt-on-hover card.', vars: VARS_ACCENT, liveContent: <TiltCardPanel />, examples: <TiltCardViewExamples />, docs: <TiltCardViewDocs />, noExamplesHeader: true, code: `<TiltCardView>...</TiltCardView>` },
  particlebackground:  { title: 'ParticleBackgroundView',  desc: 'Subtle animated particle/dot background.', vars: VARS_ACCENT, liveContent: <ParticleBackgroundPanel />, examples: <ParticleBackgroundViewExamples />, docs: <ParticleBackgroundViewDocs />, noExamplesHeader: true, code: `<ParticleBackgroundView height={160} />` },
  glowborder:          { title: 'GlowBorderView',          desc: 'Animated gradient glowing-border wrapper.', vars: VARS_ACCENT, liveContent: <GlowBorderPanel />, examples: <GlowBorderViewExamples />, docs: <GlowBorderViewDocs />, noExamplesHeader: true, code: `<GlowBorderView>...</GlowBorderView>` },
  revealonscroll:      { title: 'RevealOnScrollView',      desc: 'Fade/slide-in-on-scroll wrapper.', vars: VARS_ACCENT, liveContent: <RevealOnScrollPanel />, examples: <RevealOnScrollViewExamples />, docs: <RevealOnScrollViewDocs />, noExamplesHeader: true, code: `<RevealOnScrollView direction="up">...</RevealOnScrollView>` },
  floatinglabelinput:  { title: 'FloatingLabelInputView',  desc: "Floating-label input, distinct from TextInputView's static placeholder.", vars: VARS_INPUT, liveContent: <FloatingLabelInputPanel />, examples: <FloatingLabelInputViewExamples />, docs: <FloatingLabelInputViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState('');\n  return <FloatingLabelInputView label="Workspace name" value={value} onChange={setValue} />;\n}` },
  pulsedot:            { title: 'PulseDotView',            desc: 'Attention-grabbing pulsing dot primitive — complements StatusIndicatorView.', vars: VARS_STATUS, liveContent: <PulseDotPanel />, examples: <PulseDotViewExamples />, docs: <PulseDotViewDocs />, noExamplesHeader: true, code: `<PulseDotView />` },
  requestflow:            { title: 'RequestFlowView',            desc: 'Animated network waterfall — particles travel a DNS→TCP→TLS→Request→Response pipe, speed/color mapped to real phase timing.', vars: VARS_ACCENT, liveContent: <RequestFlowPanel />, examples: <RequestFlowViewExamples />, docs: <RequestFlowViewDocs />, noExamplesHeader: true, code: `<RequestFlowView phases={[{ id: 'dns', label: 'DNS', duration: 20, color: 'var(--color-primary)' }, { id: 'tcp', label: 'TCP', duration: 40, color: 'var(--color-warning)' }, { id: 'tls', label: 'TLS', duration: 60, color: 'var(--color-success)' }, { id: 'req', label: 'Request', duration: 30, color: 'var(--color-primary)' }, { id: 'res', label: 'Response', duration: 90, color: 'var(--color-error)' }]} />` },
  latencypulse:           { title: 'LatencyPulseView',           desc: 'EKG/vitals-monitor style live pulse line for request latency — a metric that visually "beats" instead of a static line chart.', vars: VARS_STATUS, liveContent: <LatencyPulsePanel />, examples: <LatencyPulseViewExamples />, docs: <LatencyPulseViewDocs />, noExamplesHeader: true, code: `<LatencyPulseView latencyMs={180} />` },
  aistreamingtext:        { title: 'AIStreamingTextView',        desc: 'Token-by-token LLM output renderer — per-token fade-in, thinking shimmer, soft blink cursor.', vars: VARS_ACCENT, liveContent: <AIStreamingTextPanel />, examples: <AIStreamingTextViewExamples />, docs: <AIStreamingTextViewDocs />, noExamplesHeader: true, code: `<AIStreamingTextView text="Here's a summary of your API traffic." streaming />` },
  commandorb:             { title: 'CommandOrbView',             desc: 'Floating, breathing circular AI-assistant orb — idle pulse → thinking ripple → speaking waveform, expands into a chat panel.', vars: VARS_ACCENT, liveContent: <CommandOrbPanel />, examples: <CommandOrbViewExamples />, docs: <CommandOrbViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [state, setState] = useState('idle');\n  return <CommandOrbView state={state} onClick={() => setState(s => s === 'idle' ? 'thinking' : s === 'thinking' ? 'speaking' : 'idle')} />;\n}` },
  timetravelslider:       { title: 'TimeTravelSliderView',       desc: 'Scrub a draggable playhead across a sparkline of past states — a time-travel state scrubber, generalized into a reusable primitive.', vars: VARS_ACCENT, liveContent: <TimeTravelSliderPanel />, examples: <TimeTravelSliderViewExamples />, docs: <TimeTravelSliderViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const states = [12, 18, 15, 30, 42, 38, 50];\n  const [index, setIndex] = useState(states.length - 1);\n  return <TimeTravelSliderView states={states} index={index} onScrub={setIndex} toValue={s => s} toLabel={s => 'Value: ' + s} />;\n}` },
  diffmorph:              { title: 'DiffMorphView',              desc: 'Old→new text FLIP-animates unchanged words into their new position while changed words fade/strike — an edit visually "reflows".', vars: VARS_ACCENT, liveContent: <DiffMorphPanel />, examples: <DiffMorphViewExamples />, docs: <DiffMorphViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [text, setText] = useState('The quick brown fox jumps over the lazy dog');\n  return (\n    <div>\n      <DiffMorphView text={text} />\n      <ButtonView size="sm" style={{ marginTop: 8 }} onClick={() => setText('The quick red fox leaps over the sleepy dog')}>Edit</ButtonView>\n    </div>\n  );\n}` },
  schemablueprint:        { title: 'SchemaBlueprintView',        desc: 'JSON Schema / OpenAPI spec rendered as an architectural blueprint — graph-paper background, dashed right-angle connectors.', vars: VARS_ACCENT, liveContent: <SchemaBlueprintPanel />, examples: <SchemaBlueprintViewExamples />, docs: <SchemaBlueprintViewDocs />, noExamplesHeader: true, code: `<SchemaBlueprintView nodes={[{ id: 'user', title: 'User', fields: [{ name: 'id', type: 'string' }, { name: 'orgId', type: 'ref' }], connectsTo: ['org'] }, { id: 'org', title: 'Organization', fields: [{ name: 'id', type: 'string' }] }]} />` },
  livecursorpresence:     { title: 'LiveCursorPresenceView',     desc: 'Collaborative cursors with name tags, overlaid on arbitrary content.', vars: VARS_ACCENT, liveContent: <LiveCursorPresencePanel />, examples: <LiveCursorPresenceViewExamples />, docs: <LiveCursorPresenceViewDocs />, noExamplesHeader: true, code: `<LiveCursorPresenceView cursors={[{ id: '1', name: 'Jordan', x: 0.3, y: 0.4 }, { id: '2', name: 'Priya', x: 0.7, y: 0.6 }]}>\n  <div style={{ height: 160, border: '1px solid var(--color-surface-border)', borderRadius: 8 }} />\n</LiveCursorPresenceView>` },
  undoredotimeline:       { title: 'UndoRedoTimelineView',       desc: "History rendered as a branching git-log graph — jump to any node, diverging edits show as visible branches instead of discarding redo state.", vars: VARS_ACCENT, liveContent: <UndoRedoTimelinePanel />, examples: <UndoRedoTimelineViewExamples />, docs: <UndoRedoTimelineViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const nodes = [{ id: 'a', label: 'Initial' }, { id: 'b', label: 'Add header', parentId: 'a' }, { id: 'c', label: 'Add auth', parentId: 'b' }, { id: 'd', label: 'Revert header', parentId: 'a' }];\n  const [active, setActive] = useState('c');\n  return <UndoRedoTimelineView nodes={nodes} activeId={active} onSelect={setActive} />;\n}` },
  dialknobinput:          { title: 'DialKnobInputView',          desc: 'Rotary analog knob (drag in a circle) with snap-ticks and a haptic-style micro-bounce at each notch — for tactile numeric tuning.', vars: VARS_INPUT, liveContent: <DialKnobInputPanel />, examples: <DialKnobInputViewExamples />, docs: <DialKnobInputViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState(30);\n  return <DialKnobInputView value={value} onChange={setValue} label="Timeout (s)" />;\n}` },
  holdtoconfirm:          { title: 'HoldToConfirmView',          desc: 'Press-and-hold with a radial fill that must complete before the destructive action fires — replaces "type DELETE to confirm" modals.', vars: VARS_ACCENT, liveContent: <HoldToConfirmPanel />, examples: <HoldToConfirmViewExamples />, docs: <HoldToConfirmViewDocs />, noExamplesHeader: true, code: `<HoldToConfirmView onConfirm={() => {}}>Hold to delete</HoldToConfirmView>` },
  morphingiconbutton:     { title: 'MorphingIconButtonView',     desc: 'The icon itself SVG-path-morphs between two states (play↔pause, menu↔close, sun↔moon) instead of a crossfade/swap.', vars: VARS_ACCENT, liveContent: <MorphingIconButtonPanel />, examples: <MorphingIconButtonViewExamples />, docs: <MorphingIconButtonViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [active, setActive] = useState(false);\n  return <MorphingIconButtonView preset="play-pause" active={active} onClick={() => setActive(a => !a)} />;\n}` },
  stackedswipecard:       { title: 'StackedSwipeCardView',       desc: 'Swipeable card stack for one-at-a-time approve/reject flows.', vars: VARS_ACCENT, liveContent: <StackedSwipeCardPanel />, examples: <StackedSwipeCardViewExamples />, docs: <StackedSwipeCardViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [items, setItems] = useState(['Request #1', 'Request #2', 'Request #3']);\n  return (\n    <StackedSwipeCardView\n      items={items}\n      renderItem={item => <div>{item}</div>}\n      onSwipe={item => setItems(prev => prev.filter(i => i !== item))}\n    />\n  );\n}` },
  networkweather:         { title: 'NetworkWeatherView',         desc: 'System health/error-rate expressed as literal weather (sunny → cloudy → stormy) instead of a number or status dot.', vars: VARS_STATUS, liveContent: <NetworkWeatherPanel />, examples: <NetworkWeatherViewExamples />, docs: <NetworkWeatherViewDocs />, noExamplesHeader: true, code: `<NetworkWeatherView condition="stormy" />` },
  constellationloader:    { title: 'ConstellationLoaderView',    desc: "Loading dots drift and connect into shifting constellation lines — ties back to NetworkGraphView's node-link visual identity.", vars: VARS_ACCENT, liveContent: <ConstellationLoaderPanel />, examples: <ConstellationLoaderViewExamples />, docs: <ConstellationLoaderViewDocs />, noExamplesHeader: true, code: `<ConstellationLoaderView />` },
  holocard:               { title: 'HoloCardView',               desc: 'A card with a mouse-position-reactive holographic/iridescent sheen — pure premium-feel "wow" for pricing/feature callouts.', vars: VARS_ACCENT, liveContent: <HoloCardPanel />, examples: <HoloCardViewExamples />, docs: <HoloCardViewDocs />, noExamplesHeader: true, code: `<HoloCardView>\n  <div style={{ fontWeight: 700 }}>Pro Plan</div>\n  <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Move your mouse over this card.</div>\n</HoloCardView>` },
  ghosttypingplaceholder: { title: 'GhostTypingPlaceholderView', desc: 'An input placeholder that types out rotating example queries, pauses, then backspaces into the next one.', vars: VARS_INPUT, liveContent: <GhostTypingPlaceholderPanel />, examples: <GhostTypingPlaceholderViewExamples />, docs: <GhostTypingPlaceholderViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState('');\n  return <GhostTypingPlaceholderView value={value} onChange={setValue} examples={['search users by email…', 'filter by status: active…', 'jump to request #4521…']} />;\n}` },
  connectionpulseline:    { title: 'ConnectionPulseLineView',    desc: 'A dashed/gradient SVG line connecting two arbitrary DOM elements, with a traveling pulse dot — visually links spatially separate but logically related UI.', vars: VARS_ACCENT, liveContent: <ConnectionPulseLinePanel />, examples: <ConnectionPulseLineViewExamples />, docs: <ConnectionPulseLineViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const containerRef = useRef(null);\n  const fromRef = useRef(null);\n  const toRef = useRef(null);\n  return (\n    <div ref={containerRef} style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', height: 60 }}>\n      <div ref={fromRef} style={{ width: 60, height: 32, border: '1px solid var(--color-surface-border)', borderRadius: 6 }} />\n      <div ref={toRef} style={{ width: 60, height: 32, border: '1px solid var(--color-surface-border)', borderRadius: 6 }} />\n      <ConnectionPulseLineView containerRef={containerRef} from={fromRef} to={toRef} />\n    </div>\n  );\n}` },
  stackedtoastdeck:       { title: 'StackedToastDeckView',       desc: "Toasts don't stack vertically — older ones shrink and recede behind the newest like a physical card deck; click the deck to fan them back out.", vars: VARS_ACCENT, liveContent: <StackedToastDeckPanel />, examples: <StackedToastDeckViewExamples />, docs: <StackedToastDeckViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [toasts, setToasts] = useState([{ id: '1', content: 'Deploy succeeded' }, { id: '2', content: 'New comment on PR #42' }, { id: '3', content: 'Webhook delivered' }]);\n  return <StackedToastDeckView toasts={toasts} onDismiss={id => setToasts(prev => prev.filter(t => t.id !== id))} />;\n}` },
  pathreveal:             { title: 'PathRevealView',             desc: 'Generic SVG stroke-draw reveal primitive — any path/diagram/signature "draws itself" on mount instead of just fading in.', vars: VARS_ACCENT, liveContent: <PathRevealPanel />, examples: <PathRevealViewExamples />, docs: <PathRevealViewDocs />, noExamplesHeader: true, code: `<PathRevealView d="M10 50 Q 30 10 50 50 T 90 50" viewBox="0 0 100 100" width={120} height={80} />` },
  spectrumslider:         { title: 'SpectrumSliderView',         desc: 'The slider track itself is a live rendered gradient spectrum, and the handle shows a magnified live-color preview bubble as you drag.', vars: VARS_INPUT, liveContent: <SpectrumSliderPanel />, examples: <SpectrumSliderViewExamples />, docs: <SpectrumSliderViewDocs />, noExamplesHeader: true, code: `function Preview() {\n  const [value, setValue] = useState(50);\n  return <SpectrumSliderView value={value} onChange={setValue} />;\n}` },
  breathingloader:        { title: 'BreathingLoaderView',        desc: 'An ultra-minimal loading state — a single circle slowly scales/fades in a breathing rhythm — a calmer alternative to a spinner.', vars: VARS_ACCENT, liveContent: <BreathingLoaderPanel />, examples: <BreathingLoaderViewExamples />, docs: <BreathingLoaderViewDocs />, noExamplesHeader: true, code: `<BreathingLoaderView label="Syncing…" />` },
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

const THEME_OPTIONS: { id: DuiThemeMode; label: string; icon: React.ReactNode }[] = [
  { id: 'light',  label: 'Light',  icon: <SunIcon size={12} /> },
  { id: 'dark',   label: 'Dark',   icon: <MoonIcon size={12} /> },
  { id: 'system', label: 'System', icon: <MonitorIcon size={12} /> },
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '-0.02em' }}>DUI</span>
          <ChipView label="v1.0" color="var(--color-primary)" size="sm" />
        </div>
        <div style={{ width: 1, height: 16, background: 'var(--color-surface-border)' }} />
        <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Daakia UI Component Library</span>

        <div style={{ flex: 1 }} />

        {/* Theme switcher */}
        <SegmentedControlView
          size="sm"
          variant="pill"
          value={themeMode}
          onChange={v => handleTheme(v as DuiThemeMode)}
          options={THEME_OPTIONS.map(opt => ({ value: opt.id, label: opt.label, icon: opt.icon }))}
        />

        <div style={{ display: 'flex', gap: 6, marginLeft: 8 }}>
          <ChipView label="React 19"      color="var(--color-info)"    size="sm" />
          <ChipView label="Tailwind v4"   color="var(--color-success)" size="sm" />
          <ChipView label={`${TOTAL_COMPONENT_COUNT} components`} color="var(--color-primary)" size="sm" />
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
