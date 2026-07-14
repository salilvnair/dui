// ─── DUI — Daakia UI Component Library ───────────────────────────────────────
// Unified, theme-aware component set for all Daakia screens.
// All components use existing editor-style CSS variables — zero extra config needed.

// ─── Core: size system, context, and category base hooks ─────────────────────
export type { DuiSize, DuiRadius, DuiWidth, DuiFontStyle, DuiConfig } from './core/DuiTypes';
export { DUI_HEIGHT, DUI_CHIP_HEIGHT, DUI_TOGGLE, DUI_CHECKBOX, DUI_ICON_SIZE, DUI_FONT_SIZE, DUI_EDITOR_FONT_SIZE, DUI_PADDING_X, DUI_GAP, DUI_RADIUS_MAP, DUI_DEFAULT_RADIUS, DUI_WIDTH_MAP, DUI_SELECT_ITEM_PY } from './core/DuiTokens';
export { DuiProvider, useDui, useDuiStyle, resolveBorderRadius, resolveWidth } from './core/DuiContext';
export type { InputBaseConfig, InputContainerProps } from './core/InputBase';
export { useInputBase } from './core/InputBase';
export type { ButtonBaseConfig, ButtonContainerProps } from './core/ButtonBase';
export { useButtonBase } from './core/ButtonBase';
export type { NavBaseConfig, NavContainerProps } from './core/NavBase';
export { useNavBase } from './core/NavBase';
export type { ChipBaseConfig, ChipContainerProps } from './core/ChipBase';
export { useChipBase } from './core/ChipBase';
export type { ToggleBaseConfig, ToggleContainerProps } from './core/ToggleBase';
export { useToggleBase } from './core/ToggleBase';
export type { MenuBaseConfig, MenuContainerProps } from './core/MenuBase';
export { useMenuBase } from './core/MenuBase';
export type { TabBaseConfig, TabContainerProps } from './core/TabBase';
export { useTabBase } from './core/TabBase';
export type { TableBaseConfig, TableContainerProps } from './core/TableBase';
export { useTableBase } from './core/TableBase';
export type { DisplayBaseConfig, DisplayContainerProps } from './core/DisplayBase';
export { useDisplayBase } from './core/DisplayBase';
export type { OverlayBaseConfig, OverlayContainerProps } from './core/OverlayBase';
export { useOverlayBase } from './core/OverlayBase';
export type { CardBaseConfig, CardContainerProps } from './core/CardBase';
export { useCardBase } from './core/CardBase';
export type { EditorBaseConfig, EditorContainerProps } from './core/EditorBase';
export { useEditorBase } from './core/EditorBase';
export type { SelectBaseConfig, SelectContainerProps } from './core/SelectBase';
export { useSelectBase } from './core/SelectBase';
export type { DateBaseConfig, DateContainerProps } from './core/DateBase';
export { useDateBase } from './core/DateBase';
export type { FeedbackBaseConfig, FeedbackContainerProps } from './core/FeedbackBase';
export { useFeedbackBase } from './core/FeedbackBase';
export type { AvatarBaseConfig, AvatarContainerProps } from './core/AvatarBase';
export { useAvatarBase } from './core/AvatarBase';
export type { LayoutBaseConfig, LayoutContainerProps } from './core/LayoutBase';
export { useLayoutBase } from './core/LayoutBase';
export type { MediaBaseConfig, MediaContainerProps } from './core/MediaBase';
export { useMediaBase } from './core/MediaBase';
export { DUI_CELL_SIZE, DUI_RING_DIAMETER, DUI_THICKNESS, DUI_AVATAR_DIAMETER, DUI_DOT_SIZE } from './core/DuiTokens';

export { ChipView } from './components/chips/ChipView';
export type { ChipViewProps, ChipViewSize } from './components/chips/ChipView';

export { ButtonView } from './components/button/ButtonView';
export type { ButtonViewProps, ButtonVariant, ButtonSize } from './components/button/ButtonView';

export { SegmentedView } from './components/button/SegmentedView';
export type { SegmentedViewProps, SegmentedOption } from './components/button/SegmentedView';

export { IconButtonView } from './components/button/IconButtonView';
export type { IconButtonViewProps, IconButtonSize, IconButtonVariant } from './components/button/IconButtonView';

export { DropDownButtonView } from './components/button/DropDownButtonView';
export type { DropDownButtonViewProps } from './components/button/DropDownButtonView';

export { TextInputView } from './components/input/TextInputView';
export type { TextInputViewProps, TextInputSize } from './components/input/TextInputView';

export { MultilineInputView } from './components/input/MultilineInputView';
export type { MultilineInputViewProps } from './components/input/MultilineInputView';

export { InlineEditTextView } from './components/input/InlineEditTextView';
export type { InlineEditTextViewProps } from './components/input/InlineEditTextView';

export { SelectInputView } from './components/input/SelectInputView';
export type { SelectInputViewProps, SelectOption, SelectInputSize } from './components/input/SelectInputView';

export { SelectTextInputView } from './components/input/SelectTextInputView';
export type { SelectTextInputViewProps, SelectTextOption, MockServerSuggestion } from './components/input/SelectTextInputView';

export { SegmentedControlView } from './components/input/SegmentedControlView';
export type { SegmentedControlViewProps, SegmentedControlOption, SegmentedControlVariant } from './components/input/SegmentedControlView';

export { HiddenKeyValueItemView } from './components/input/HiddenKeyValueItemView';
export type { HiddenKeyValueItemViewProps } from './components/input/HiddenKeyValueItemView';

// ─── Sprint 7 · Batch B — Form & Selection ─────────────────────────────────────

export { RadioGroupView } from './components/input/RadioGroupView';
export type { RadioGroupViewProps, RadioOption } from './components/input/RadioGroupView';

export { RadioCardView } from './components/input/RadioCardView';
export type { RadioCardViewProps, RadioCardOption } from './components/input/RadioCardView';

export { RatingView } from './components/input/RatingView';
export type { RatingViewProps } from './components/input/RatingView';

export { OtpInputView } from './components/input/OtpInputView';
export type { OtpInputViewProps } from './components/input/OtpInputView';

export { PhoneInputView, DEFAULT_PHONE_COUNTRIES } from './components/input/PhoneInputView';
export type { PhoneInputViewProps, PhoneCountry } from './components/input/PhoneInputView';

export { ColorPickerView } from './components/input/ColorPickerView';
export type { ColorPickerViewProps } from './components/input/ColorPickerView';

export { IconPickerView } from './components/input/IconPickerView';
export type { IconPickerViewProps } from './components/input/IconPickerView';

export { EmojiPickerView } from './components/input/EmojiPickerView';
export type { EmojiPickerViewProps } from './components/input/EmojiPickerView';

export { FileDropzoneView } from './components/input/FileDropzoneView';
export type { FileDropzoneViewProps, FileDropzoneEntry } from './components/input/FileDropzoneView';

export { AvatarUploadView } from './components/input/AvatarUploadView';
export type { AvatarUploadViewProps } from './components/input/AvatarUploadView';

export { MaskedInputView, applyMask } from './components/input/MaskedInputView';
export type { MaskedInputViewProps } from './components/input/MaskedInputView';

export { TransferListView } from './components/input/TransferListView';
export type { TransferListViewProps, TransferItem } from './components/input/TransferListView';

export { StepperInputView } from './components/input/StepperInputView';
export type { StepperInputViewProps } from './components/input/StepperInputView';

export { SwitchGroupView } from './components/input/SwitchGroupView';
export type { SwitchGroupViewProps, SwitchGroupItem } from './components/input/SwitchGroupView';

// ─── Sprint 7 · Batch C — Feedback & Status ────────────────────────────────────

export { SnackbarView } from './components/display/SnackbarView';
export type { SnackbarViewProps } from './components/display/SnackbarView';

export { BannerView } from './components/display/BannerView';
export type { BannerViewProps, BannerVariant } from './components/display/BannerView';

export { ProgressRingView } from './components/display/ProgressRingView';
export type { ProgressRingViewProps } from './components/display/ProgressRingView';

export { ProgressBarView } from './components/display/ProgressBarView';
export type { ProgressBarViewProps } from './components/display/ProgressBarView';

export { SkeletonView } from './components/display/SkeletonView';
export type { SkeletonViewProps, SkeletonVariant } from './components/display/SkeletonView';

export { NotificationBadgeView } from './components/display/NotificationBadgeView';
export type { NotificationBadgeViewProps } from './components/display/NotificationBadgeView';

export { AvatarView } from './components/display/AvatarView';
export type { AvatarViewProps } from './components/display/AvatarView';

export { AvatarGroupView } from './components/display/AvatarGroupView';
export type { AvatarGroupViewProps, AvatarGroupMember } from './components/display/AvatarGroupView';

export { PresenceDotView } from './components/display/PresenceDotView';
export type { PresenceDotViewProps, PresenceStatus } from './components/display/PresenceDotView';

export { ConfettiBurstView } from './components/display/ConfettiBurstView';
export type { ConfettiBurstViewProps, ConfettiBurstHandle } from './components/display/ConfettiBurstView';

// ─── Sprint 7 · Batch D — Overlays & Navigation ────────────────────────────────

export { PopoverView } from './components/modal/PopoverView';
export type { PopoverViewProps, PopoverPlacement } from './components/modal/PopoverView';

export { TooltipView } from './components/modal/TooltipView';
export type { TooltipViewProps, TooltipPlacement } from './components/modal/TooltipView';

export { DrawerView } from './components/modal/DrawerView';
export type { DrawerViewProps, DrawerEdge } from './components/modal/DrawerView';

export { ActionSheetView } from './components/modal/ActionSheetView';
export type { ActionSheetViewProps, ActionSheetItem } from './components/modal/ActionSheetView';

export { BottomSheetView } from './components/modal/BottomSheetView';
export type { BottomSheetViewProps } from './components/modal/BottomSheetView';

export { SpotlightTourView } from './components/modal/SpotlightTourView';
export type { SpotlightTourViewProps, SpotlightTourStep } from './components/modal/SpotlightTourView';

export { FabView } from './components/button/FabView';
export type { FabViewProps, FabAction } from './components/button/FabView';

export { DockView } from './components/layout/DockView';
export type { DockViewProps, DockItem } from './components/layout/DockView';

export { BreadcrumbView } from './components/layout/BreadcrumbView';
export type { BreadcrumbViewProps, BreadcrumbItem } from './components/layout/BreadcrumbView';

export { PaginationView } from './components/layout/PaginationView';
export type { PaginationViewProps } from './components/layout/PaginationView';

// ─── Sprint 7 · Batch F — Layout & Structural ──────────────────────────────────

export { HeroView } from './components/layout/HeroView';
export type { HeroViewProps } from './components/layout/HeroView';

export { LevelView } from './components/layout/LevelView';
export type { LevelViewProps } from './components/layout/LevelView';

export { MediaObjectView } from './components/layout/MediaObjectView';
export type { MediaObjectViewProps } from './components/layout/MediaObjectView';

export { TileGridView } from './components/layout/TileGridView';
export type { TileGridViewProps, TileNode } from './components/layout/TileGridView';

export { PanelListView } from './components/layout/PanelListView';
export type { PanelListViewProps, PanelListItem, PanelListTab } from './components/layout/PanelListView';

export { NavbarView } from './components/layout/NavbarView';
export type { NavbarViewProps, NavbarLink } from './components/layout/NavbarView';

export { AffixView } from './components/layout/AffixView';
export type { AffixViewProps } from './components/layout/AffixView';

export { AnchorView } from './components/layout/AnchorView';
export type { AnchorViewProps, AnchorLink } from './components/layout/AnchorView';

export { StickyHeaderView } from './components/layout/StickyHeaderView';
export type { StickyHeaderViewProps } from './components/layout/StickyHeaderView';

export { AspectRatioView } from './components/layout/AspectRatioView';
export type { AspectRatioViewProps } from './components/layout/AspectRatioView';

export { MasonryGridView } from './components/layout/MasonryGridView';
export type { MasonryGridViewProps } from './components/layout/MasonryGridView';

export { ScrollAreaView } from './components/layout/ScrollAreaView';
export type { ScrollAreaViewProps } from './components/layout/ScrollAreaView';

export { BackToTopView } from './components/layout/BackToTopView';
export type { BackToTopViewProps } from './components/layout/BackToTopView';

export { WatermarkView } from './components/layout/WatermarkView';
export type { WatermarkViewProps } from './components/layout/WatermarkView';

// ─── Sprint 7 · Batch G — Data & Enterprise ────────────────────────────────────

export { DescriptionsView } from './components/display/DescriptionsView';
export type { DescriptionsViewProps, DescriptionItem } from './components/display/DescriptionsView';

export { StatisticView } from './components/display/StatisticView';
export type { StatisticViewProps } from './components/display/StatisticView';

export { ResultView } from './components/display/ResultView';
export type { ResultViewProps, ResultStatus } from './components/display/ResultView';

export { CascaderView } from './components/input/CascaderView';
export type { CascaderViewProps, CascaderOption } from './components/input/CascaderView';

export { ComboBoxView } from './components/input/ComboBoxView';
export type { ComboBoxViewProps, ComboBoxOption } from './components/input/ComboBoxView';

export { ListView } from './components/display/ListView';
export type { ListViewProps, ListViewItem } from './components/display/ListView';

export { VirtualizedListView } from './components/display/VirtualizedListView';
export type { VirtualizedListViewProps } from './components/display/VirtualizedListView';

export { StickyTableHeaderView } from './components/display/StickyTableHeaderView';
export type { StickyTableHeaderViewProps, StickyTableColumn } from './components/display/StickyTableHeaderView';

export { TablePaginationView } from './components/display/TablePaginationView';
export type { TablePaginationViewProps } from './components/display/TablePaginationView';

export { FilterBarView } from './components/display/FilterBarView';
export type { FilterBarViewProps, FilterBarFilter } from './components/display/FilterBarView';

export { SortableHeaderView } from './components/display/SortableHeaderView';
export type { SortableHeaderViewProps, SortDirection } from './components/display/SortableHeaderView';

export { EditableCellView } from './components/display/EditableCellView';
export type { EditableCellViewProps } from './components/display/EditableCellView';

export { DataGridToolbarView } from './components/display/DataGridToolbarView';
export type { DataGridToolbarViewProps, DataGridDensity } from './components/display/DataGridToolbarView';

export { ColumnVisibilityMenuView } from './components/display/ColumnVisibilityMenuView';
export type { ColumnVisibilityMenuViewProps, ColumnVisibilityOption } from './components/display/ColumnVisibilityMenuView';

// ─── Sprint 7 · Batch J — Advanced Selection & Wizards ─────────────────────────

export { KbdView } from './components/display/KbdView';
export type { KbdViewProps } from './components/display/KbdView';

export { WizardStepperView } from './components/input/WizardStepperView';
export type { WizardStepperViewProps, WizardStep } from './components/input/WizardStepperView';

export { AccordionGroupView } from './components/layout/AccordionGroupView';
export type { AccordionGroupViewProps, AccordionGroupItem } from './components/layout/AccordionGroupView';

export { SegmentedProgressBarView } from './components/display/SegmentedProgressBarView';
export type { SegmentedProgressBarViewProps, ProgressSegment, SegmentStatus } from './components/display/SegmentedProgressBarView';

export { ChecklistView } from './components/input/ChecklistView';
export type { ChecklistViewProps, ChecklistItem } from './components/input/ChecklistView';

export { PriorityPickerView } from './components/input/PriorityPickerView';
export type { PriorityPickerViewProps, PriorityLevel } from './components/input/PriorityPickerView';

export { TagCloudView } from './components/display/TagCloudView';
export type { TagCloudViewProps, TagCloudEntry } from './components/display/TagCloudView';

export { RangeSliderView } from './components/input/RangeSliderView';
export type { RangeSliderViewProps } from './components/input/RangeSliderView';

export { VoteWidgetView } from './components/button/VoteWidgetView';
export type { VoteWidgetViewProps } from './components/button/VoteWidgetView';

export { LikeButtonView } from './components/button/LikeButtonView';
export type { LikeButtonViewProps } from './components/button/LikeButtonView';

export { BookmarkButtonView } from './components/button/BookmarkButtonView';
export type { BookmarkButtonViewProps } from './components/button/BookmarkButtonView';

export { FollowButtonView } from './components/button/FollowButtonView';
export type { FollowButtonViewProps } from './components/button/FollowButtonView';

export { ShortcutRecorderView } from './components/input/ShortcutRecorderView';
export type { ShortcutRecorderViewProps } from './components/input/ShortcutRecorderView';

// ─── Sprint 7 · Batch H — Communication & Content ──────────────────────────────

export { MessageBubbleView } from './components/display/MessageBubbleView';
export type { MessageBubbleViewProps } from './components/display/MessageBubbleView';

export { ChatInputView } from './components/input/ChatInputView';
export type { ChatInputViewProps } from './components/input/ChatInputView';

export { TypingIndicatorView } from './components/display/TypingIndicatorView';
export type { TypingIndicatorViewProps } from './components/display/TypingIndicatorView';

export { CommentThreadView } from './components/display/CommentThreadView';
export type { CommentThreadViewProps, CommentNode } from './components/display/CommentThreadView';

export { NotificationCenterView } from './components/modal/NotificationCenterView';
export type { NotificationCenterViewProps, NotificationItem } from './components/modal/NotificationCenterView';

export { AlertDialogView } from './components/modal/AlertDialogView';
export type { AlertDialogViewProps } from './components/modal/AlertDialogView';

export { FeedbackWidgetView } from './components/input/FeedbackWidgetView';
export type { FeedbackWidgetViewProps } from './components/input/FeedbackWidgetView';

export { NpsSurveyView } from './components/input/NpsSurveyView';
export type { NpsSurveyViewProps } from './components/input/NpsSurveyView';

export { ShareSheetView } from './components/display/ShareSheetView';
export type { ShareSheetViewProps, ShareTarget } from './components/display/ShareSheetView';

export { ContactCardView } from './components/display/ContactCardView';
export type { ContactCardViewProps } from './components/display/ContactCardView';

export { ArticleCardView } from './components/display/ArticleCardView';
export type { ArticleCardViewProps } from './components/display/ArticleCardView';

export { FaqAccordionView } from './components/layout/FaqAccordionView';
export type { FaqAccordionViewProps, FaqEntry } from './components/layout/FaqAccordionView';

export { MessageBannerView } from './components/display/MessageBannerView';
export type { MessageBannerViewProps, MessageBannerVariant } from './components/display/MessageBannerView';

export { QuoteBlockView } from './components/display/QuoteBlockView';
export type { QuoteBlockViewProps } from './components/display/QuoteBlockView';

// ─── Sprint 7 · Batch L — Enterprise, Settings & SaaS ──────────────────────────

export { SettingsRowView } from './components/layout/SettingsRowView';
export type { SettingsRowViewProps } from './components/layout/SettingsRowView';

export { SettingsSectionView } from './components/layout/SettingsSectionView';
export type { SettingsSectionViewProps } from './components/layout/SettingsSectionView';

export { KeyValueListView } from './components/display/KeyValueListView';
export type { KeyValueListViewProps, KeyValueListEntry } from './components/display/KeyValueListView';

export { EnvironmentBadgeView } from './components/display/EnvironmentBadgeView';
export type { EnvironmentBadgeViewProps, EnvironmentKind } from './components/display/EnvironmentBadgeView';

export { VersionBadgeView } from './components/display/VersionBadgeView';
export type { VersionBadgeViewProps } from './components/display/VersionBadgeView';

export { LicenseBadgeView } from './components/display/LicenseBadgeView';
export type { LicenseBadgeViewProps, LicenseTier } from './components/display/LicenseBadgeView';

export { UsageMeterView } from './components/display/UsageMeterView';
export type { UsageMeterViewProps } from './components/display/UsageMeterView';

export { PermissionMatrixView } from './components/display/PermissionMatrixView';
export type { PermissionMatrixViewProps } from './components/display/PermissionMatrixView';

export { AuditLogRowView } from './components/display/AuditLogRowView';
export type { AuditLogRowViewProps } from './components/display/AuditLogRowView';

export { WebhookStatusView } from './components/display/WebhookStatusView';
export type { WebhookStatusViewProps, WebhookHealth } from './components/display/WebhookStatusView';

export { ApiKeyRowView } from './components/display/ApiKeyRowView';
export type { ApiKeyRowViewProps } from './components/display/ApiKeyRowView';

export { RateLimitMeterView } from './components/display/RateLimitMeterView';
export type { RateLimitMeterViewProps } from './components/display/RateLimitMeterView';

export { EmptyInboxView } from './components/display/EmptyInboxView';
export type { EmptyInboxViewProps } from './components/display/EmptyInboxView';

export { OnboardingChecklistView } from './components/layout/OnboardingChecklistView';
export type { OnboardingChecklistViewProps, OnboardingStep } from './components/layout/OnboardingChecklistView';

export { FeatureSpotlightBadgeView } from './components/display/FeatureSpotlightBadgeView';
export type { FeatureSpotlightBadgeViewProps } from './components/display/FeatureSpotlightBadgeView';

export { CookieConsentBannerView } from './components/display/CookieConsentBannerView';
export type { CookieConsentBannerViewProps } from './components/display/CookieConsentBannerView';

export { MaintenanceBannerView } from './components/display/MaintenanceBannerView';
export type { MaintenanceBannerViewProps } from './components/display/MaintenanceBannerView';

export { TrialCountdownBannerView } from './components/display/TrialCountdownBannerView';
export type { TrialCountdownBannerViewProps } from './components/display/TrialCountdownBannerView';

export { TeamMemberRowView } from './components/display/TeamMemberRowView';
export type { TeamMemberRowViewProps } from './components/display/TeamMemberRowView';

export { InviteInputView } from './components/input/InviteInputView';
export type { InviteInputViewProps } from './components/input/InviteInputView';

export { RoleSelectView } from './components/input/RoleSelectView';
export type { RoleSelectViewProps, RoleOption } from './components/input/RoleSelectView';

export { IntegrationCardView } from './components/display/IntegrationCardView';
export type { IntegrationCardViewProps } from './components/display/IntegrationCardView';

export { StatusPageRowView } from './components/display/StatusPageRowView';
export type { StatusPageRowViewProps, ServiceStatus } from './components/display/StatusPageRowView';

export { ChangelogEntryView } from './components/display/ChangelogEntryView';
export type { ChangelogEntryViewProps, ChangeType } from './components/display/ChangelogEntryView';

// ─── Sprint 7 · Batch I — Media & Files ────────────────────────────────────────

export { ImageGalleryView } from './components/display/ImageGalleryView';
export type { ImageGalleryViewProps, GalleryImage } from './components/display/ImageGalleryView';

export { ImageCropperView } from './components/display/ImageCropperView';
export type { ImageCropperViewProps, ImageCropperValue } from './components/display/ImageCropperView';

export { VideoPlayerView } from './components/display/VideoPlayerView';
export type { VideoPlayerViewProps } from './components/display/VideoPlayerView';

export { AudioPlayerView } from './components/display/AudioPlayerView';
export type { AudioPlayerViewProps } from './components/display/AudioPlayerView';

export { AudioWaveformView } from './components/display/AudioWaveformView';
export type { AudioWaveformViewProps } from './components/display/AudioWaveformView';

export { PdfViewerView } from './components/display/PdfViewerView';
export type { PdfViewerViewProps } from './components/display/PdfViewerView';

export { FileIconView } from './components/display/FileIconView';
export type { FileIconViewProps } from './components/display/FileIconView';

export { FileListView } from './components/display/FileListView';
export type { FileListViewProps, FileListEntry } from './components/display/FileListView';

export { DragHandleView } from './components/display/DragHandleView';
export type { DragHandleViewProps } from './components/display/DragHandleView';

export { SignaturePadView } from './components/display/SignaturePadView';
export type { SignaturePadViewProps } from './components/display/SignaturePadView';

export { BarcodeView } from './components/display/BarcodeView';
export type { BarcodeViewProps } from './components/display/BarcodeView';

export { ImageZoomView } from './components/display/ImageZoomView';
export type { ImageZoomViewProps } from './components/display/ImageZoomView';

// ─── Sprint 7 · Batch E — Data Display & "Wow" ─────────────────────────────────

export { TimelineView } from './components/display/TimelineView';
export type { TimelineViewProps, TimelineEntry } from './components/display/TimelineView';

export { ActivityFeedView } from './components/display/ActivityFeedView';
export type { ActivityFeedViewProps, ActivityEntry } from './components/display/ActivityFeedView';

export { KanbanBoardView } from './components/display/KanbanBoardView';
export type { KanbanBoardViewProps, KanbanColumn, KanbanCard } from './components/display/KanbanBoardView';

export { SparklineView } from './components/display/SparklineView';
export type { SparklineViewProps } from './components/display/SparklineView';

export { HeatmapCalendarView } from './components/display/HeatmapCalendarView';
export type { HeatmapCalendarViewProps, HeatmapDay } from './components/display/HeatmapCalendarView';

export { ComparisonSliderView } from './components/display/ComparisonSliderView';
export type { ComparisonSliderViewProps } from './components/display/ComparisonSliderView';

export { CarouselView } from './components/display/CarouselView';
export type { CarouselViewProps } from './components/display/CarouselView';

export { QRCodeView } from './components/display/QRCodeView';
export type { QRCodeViewProps } from './components/display/QRCodeView';

export { StatTrendCardView } from './components/display/StatTrendCardView';
export type { StatTrendCardViewProps } from './components/display/StatTrendCardView';

export { PricingCardView } from './components/display/PricingCardView';
export type { PricingCardViewProps } from './components/display/PricingCardView';

export { TestimonialCardView } from './components/display/TestimonialCardView';
export type { TestimonialCardViewProps } from './components/display/TestimonialCardView';

export { RatingBreakdownView } from './components/display/RatingBreakdownView';
export type { RatingBreakdownViewProps } from './components/display/RatingBreakdownView';

export { TreeSelectView } from './components/input/TreeSelectView';
export type { TreeSelectViewProps, TreeSelectNode } from './components/input/TreeSelectView';

export { RichTextToolbarView } from './components/input/RichTextToolbarView';
export type { RichTextToolbarViewProps, RichTextAction } from './components/input/RichTextToolbarView';

export { MentionInputView } from './components/input/MentionInputView';
export type { MentionInputViewProps, MentionUser } from './components/input/MentionInputView';

// ─── Sprint 7 · Batch K — Fun / "Wow" & Micro-interactions ─────────────────────

export { GradientTextView } from './components/display/GradientTextView';
export type { GradientTextViewProps } from './components/display/GradientTextView';

export { TypewriterTextView } from './components/display/TypewriterTextView';
export type { TypewriterTextViewProps } from './components/display/TypewriterTextView';

export { CountUpNumberView } from './components/display/CountUpNumberView';
export type { CountUpNumberViewProps } from './components/display/CountUpNumberView';

export { MagneticButtonView } from './components/display/MagneticButtonView';
export type { MagneticButtonViewProps } from './components/display/MagneticButtonView';

export { TiltCardView } from './components/display/TiltCardView';
export type { TiltCardViewProps } from './components/display/TiltCardView';

export { ParticleBackgroundView } from './components/display/ParticleBackgroundView';
export type { ParticleBackgroundViewProps } from './components/display/ParticleBackgroundView';

export { GlowBorderView } from './components/display/GlowBorderView';
export type { GlowBorderViewProps } from './components/display/GlowBorderView';

export { RevealOnScrollView } from './components/display/RevealOnScrollView';
export type { RevealOnScrollViewProps } from './components/display/RevealOnScrollView';

export { FloatingLabelInputView } from './components/input/FloatingLabelInputView';
export type { FloatingLabelInputViewProps } from './components/input/FloatingLabelInputView';

export { PulseDotView } from './components/display/PulseDotView';
export type { PulseDotViewProps } from './components/display/PulseDotView';

// ─── Sprint 7 · Batch M — DUI Signature Series ─────────────────────────────────

export { RequestFlowView } from './components/display/RequestFlowView';
export type { RequestFlowViewProps, RequestFlowPhase } from './components/display/RequestFlowView';

export { LatencyPulseView } from './components/display/LatencyPulseView';
export type { LatencyPulseViewProps } from './components/display/LatencyPulseView';

export { AIStreamingTextView } from './components/display/AIStreamingTextView';
export type { AIStreamingTextViewProps } from './components/display/AIStreamingTextView';

export { CommandOrbView } from './components/display/CommandOrbView';
export type { CommandOrbViewProps, CommandOrbState } from './components/display/CommandOrbView';

export { TimeTravelSliderView } from './components/input/TimeTravelSliderView';
export type { TimeTravelSliderViewProps } from './components/input/TimeTravelSliderView';

export { DiffMorphView } from './components/display/DiffMorphView';
export type { DiffMorphViewProps } from './components/display/DiffMorphView';

export { SchemaBlueprintView } from './components/display/SchemaBlueprintView';
export type { SchemaBlueprintViewProps, SchemaBlueprintNode, SchemaBlueprintField } from './components/display/SchemaBlueprintView';

export { LiveCursorPresenceView } from './components/display/LiveCursorPresenceView';
export type { LiveCursorPresenceViewProps, LiveCursor } from './components/display/LiveCursorPresenceView';

export { UndoRedoTimelineView } from './components/display/UndoRedoTimelineView';
export type { UndoRedoTimelineViewProps, UndoRedoNode } from './components/display/UndoRedoTimelineView';

export { DialKnobInputView } from './components/input/DialKnobInputView';
export type { DialKnobInputViewProps } from './components/input/DialKnobInputView';

export { HoldToConfirmView } from './components/button/HoldToConfirmView';
export type { HoldToConfirmViewProps } from './components/button/HoldToConfirmView';

export { MorphingIconButtonView } from './components/button/MorphingIconButtonView';
export type { MorphingIconButtonViewProps, MorphIconPreset } from './components/button/MorphingIconButtonView';

export { StackedSwipeCardView } from './components/display/StackedSwipeCardView';
export type { StackedSwipeCardViewProps } from './components/display/StackedSwipeCardView';

export { NetworkWeatherView } from './components/display/NetworkWeatherView';
export type { NetworkWeatherViewProps, NetworkWeatherCondition } from './components/display/NetworkWeatherView';

export { ConstellationLoaderView } from './components/display/ConstellationLoaderView';
export type { ConstellationLoaderViewProps } from './components/display/ConstellationLoaderView';

export { HoloCardView } from './components/display/HoloCardView';
export type { HoloCardViewProps } from './components/display/HoloCardView';

export { GhostTypingPlaceholderView } from './components/input/GhostTypingPlaceholderView';
export type { GhostTypingPlaceholderViewProps } from './components/input/GhostTypingPlaceholderView';

export { ConnectionPulseLineView } from './components/display/ConnectionPulseLineView';
export type { ConnectionPulseLineViewProps } from './components/display/ConnectionPulseLineView';

export { StackedToastDeckView } from './components/modal/StackedToastDeckView';
export type { StackedToastDeckViewProps, ToastDeckEntry } from './components/modal/StackedToastDeckView';

export { PathRevealView } from './components/display/PathRevealView';
export type { PathRevealViewProps } from './components/display/PathRevealView';

export { SpectrumSliderView } from './components/input/SpectrumSliderView';
export type { SpectrumSliderViewProps } from './components/input/SpectrumSliderView';

export { BreathingLoaderView } from './components/display/BreathingLoaderView';
export type { BreathingLoaderViewProps } from './components/display/BreathingLoaderView';

export { TabView } from './components/input/TabView';
export type { TabViewProps, TabItem, TabVariant } from './components/input/TabView';

export { EditorView, EditorLineNumbers, EditorWordWrap, EditorCursorStyle, EditorCursorBlinking, EditorRenderWhitespace, EditorFoldingControls, EditorMatchBrackets, EditorAutoIndent, EditorAcceptSuggestion } from './components/input/EditorView';
export type { EditorViewProps, EditorLanguage, EditorContextMenuMode, EditorOptions } from './components/input/EditorView';

export { DebugEditorView } from './components/input/DebugEditorView';
export type { DebugEditorViewProps, DebugEditorAdapter } from './components/input/DebugEditorView';

export { DiffEditorView } from './components/input/DiffEditorView';
export type { DiffEditorViewProps } from './components/input/DiffEditorView';

export { ContextMenuView } from './components/modal/ContextMenuView';
export type { ContextMenuViewProps, ContextMenuItem, ContextMenuWidth } from './components/modal/ContextMenuView';

export { TabBarView } from './components/tabs/TabBarView';
export type { TabBarViewProps, TabBarTab, TabBarProtocol, TabBarTabType, RealtimeProtocol } from './components/tabs/TabBarView';

export { PilledTabView } from './components/tabs/PilledTabView';
export type { PilledTabViewProps, PilledTab } from './components/tabs/PilledTabView';

// ─── D1.21-D1.43 — Extended DUI Library ──────────────────────────────────────

export { ToggleSwitchView } from './components/input/ToggleSwitchView';
export type { ToggleSwitchViewProps } from './components/input/ToggleSwitchView';

export { CheckboxView } from './components/input/CheckboxView';
export type { CheckboxViewProps, CheckboxSize } from './components/input/CheckboxView';

export { RearrangeView } from './components/rearrange/RearrangeView';
export type { RearrangeViewProps, RearrangeItem } from './components/rearrange/RearrangeView';

export { SortableView } from './components/rearrange/SortableView';
export type { SortableViewProps, SortableRow } from './components/rearrange/SortableView';

export { SliderView } from './components/input/SliderView';
export type { SliderViewProps } from './components/input/SliderView';

export { CommandPaletteView } from './components/modal/CommandPaletteView';
export type { CommandPaletteViewProps, PaletteCommand } from './components/modal/CommandPaletteView';

export { ModalView } from './components/modal/ModalView';
export type { ModalViewProps, ModalSize, ModalMode } from './components/modal/ModalView';

export { LoaderView } from './components/display/LoaderView';
export type { LoaderViewProps, LoaderVariant } from './components/display/LoaderView';

export { EmptyStateView } from './components/display/EmptyStateView';
export type { EmptyStateViewProps } from './components/display/EmptyStateView';

export { StatusIndicatorView } from './components/display/StatusIndicatorView';
export type { StatusIndicatorViewProps, StatusState, StatusSize } from './components/display/StatusIndicatorView';

export { InfoPopupView } from './components/modal/InfoPopupView';
export type { InfoPopupViewProps } from './components/modal/InfoPopupView';

export { SplitPanelView } from './components/layout/SplitPanelView';
export type { SplitPanelViewProps, SplitDirection } from './components/layout/SplitPanelView';

export { ResizablePanelView } from './components/layout/ResizablePanelView';
export type { ResizablePanelViewProps } from './components/layout/ResizablePanelView';

export { DottedCardView } from './components/display/DottedCardView';
export type { DottedCardViewProps } from './components/display/DottedCardView';

export { ColoredTextView } from './components/display/ColoredTextView';
export type { ColoredTextViewProps, ColorToken } from './components/display/ColoredTextView';

export { StatsCardView } from './components/display/StatsCardView';
export type { StatsCardViewProps } from './components/display/StatsCardView';

export { DataTableView } from './components/display/DataTableView';
export type { DataTableViewProps, DataTableColumn } from './components/display/DataTableView';

export { CodeBlockView } from './components/display/CodeBlockView';
export type { CodeBlockViewProps } from './components/display/CodeBlockView';

export { CalloutView } from './components/display/CalloutView';
export type { CalloutViewProps, CalloutVariant } from './components/display/CalloutView';

export { InfoView } from './components/display/InfoView';
export type { InfoViewProps } from './components/display/InfoView';

export { GaugeView } from './components/display/GaugeView';
export type { GaugeViewProps } from './components/display/GaugeView';

export { InspectorPanelView, InspectorSectionView } from './components/display/InspectorPanelView';
export type { InspectorPanelViewProps, InspectorSectionViewProps } from './components/display/InspectorPanelView';

export { TerminalBlockView } from './components/display/TerminalBlockView';
export type { TerminalBlockViewProps } from './components/display/TerminalBlockView';

export { ThemeToggleView } from './components/button/ThemeToggleView';
export type { ThemeToggleViewProps } from './components/button/ThemeToggleView';

export { NetworkGraphView } from './components/display/NetworkGraphView';
export type { NetworkGraphViewProps, NetworkGraphNode, NetworkGraphEdge } from './components/display/NetworkGraphView';

export { AIButtonView } from './components/button/AIButtonView';
export type { AIButtonViewProps, AIButtonAction } from './components/button/AIButtonView';

export { SideNavView, filterItems, countLeaves } from './components/layout/SideNavView';
export type { SideNavViewProps, SideNavItem } from './components/layout/SideNavView';

export { FolderView } from './components/layout/FolderView';
export type { FolderViewProps, FolderNode, FolderAction, FolderRunnerTab, FolderRunnerConfig, DropPosition, MoveSummaryEntry } from './components/layout/FolderView';

export { DebugView } from './components/layout/DebugView';
export type { DebugViewProps, DebugSession, DebugActions, DebugVariable, DebugCallFrame, DebugBreakpoint } from './components/layout/DebugView';

export { SettingsNavView } from './components/layout/SettingsNavView';
export type { SettingsNavViewProps, SettingsNavGroup, SettingsNavItem } from './components/layout/SettingsNavView';

export { ThemeCardSelectorView } from './components/input/ThemeCardSelectorView';
export type { ThemeCardSelectorViewProps, ThemeOption } from './components/input/ThemeCardSelectorView';

export { FeatureCategoryView } from './components/display/FeatureCategoryView';
export type { FeatureCategoryViewProps, FeatureItem } from './components/display/FeatureCategoryView';

export { TagInputView } from './components/input/TagInputView';
export type { TagInputViewProps } from './components/input/TagInputView';

export { BottomPanelView } from './components/layout/BottomPanelView';
export type { BottomPanelViewProps, BottomPanelTab } from './components/layout/BottomPanelView';

export { ToastView, useToast } from './components/display/ToastView';
export type { ToastViewProps, Toast, ToastVariant } from './components/display/ToastView';

export { PromptCardView } from './components/display/PromptCardView';
export type { PromptCardViewProps } from './components/display/PromptCardView';

export { PromptLibraryListView } from './components/display/PromptLibraryListView';
export type { PromptLibraryListViewProps, PromptLibraryItem, PromptLibraryCategory, PromptLibrarySection } from './components/display/PromptLibraryListView';

export { PromptLibraryEditorView } from './components/display/PromptLibraryEditorView';
export type { PromptLibraryEditorViewProps, PromptLibraryVariable, PromptLibraryEditorTab } from './components/display/PromptLibraryEditorView';

export { StageCheck, StageSpin, StagePulse } from './components/display/StageView';
export type { StageViewBaseProps } from './components/display/StageView';

export { YamlKeyChip } from './components/display/YamlKeyChip';
export type { YamlKeyChipProps } from './components/display/YamlKeyChip';

export { LiveColorCustomizer } from './components/display/LiveColorCustomizer';
export type { LiveColorCustomizerProps, LiveColorVar } from './components/display/LiveColorCustomizer';

// ─── E6.176 — Superset DUI components matching shared/controls ───────────────

export { SearchInputView } from './components/input/SearchInputView';
export type { SearchInputViewProps } from './components/input/SearchInputView';

export { DurationInputView } from './components/input/DurationInputView';
export type { DurationInputViewProps, DurationUnit } from './components/input/DurationInputView';


export { SplitButtonView } from './components/button/SplitButtonView';
export type { SplitButtonViewProps, SplitButtonViewItem, SplitButtonViewVariant } from './components/button/SplitButtonView';

export { HighlightedInputView } from './components/input/HighlightedInputView';
export type { HighlightedInputViewProps } from './components/input/HighlightedInputView';

export { KeyValueTableView } from './components/input/KeyValueTableView';
export type { KeyValueTableViewProps, KeyValueTableRow, PinnedKeyValueRow } from './components/input/KeyValueTableView';

export { KeyValueTableRowView } from './components/input/KeyValueTableRowView';
export type { KeyValueTableRowViewProps } from './components/input/KeyValueTableRowView';

export { MergedInputView, MergeDivider } from './components/input/MergedInputView';
export type { MergedInputViewProps, MergedInputSegment, MergedSelectOption, MergedInputSize } from './components/input/MergedInputView';

export { HudView } from './components/display/HudView';
export type { HudViewProps, HudItem } from './components/display/HudView';

export { CollapsibleSectionView } from './components/layout/CollapsibleSectionView';
export type { CollapsibleSectionViewProps } from './components/layout/CollapsibleSectionView';

export { JsonTreeView } from './components/display/JsonTreeView';
export type { JsonTreeViewProps } from './components/display/JsonTreeView';

export { ExpandableLogEntryView } from './components/display/ExpandableLogEntryView';
export type { ExpandableLogEntryViewProps } from './components/display/ExpandableLogEntryView';

export { CopyButtonView } from './components/display/CopyButtonView';
export type { CopyButtonViewProps } from './components/display/CopyButtonView';

export { MarkdownView, registerMarkdownLanguage } from './components/display/MarkdownView';
export type { MarkdownViewProps } from './components/display/MarkdownView';

export { FormDataTableView } from './components/input/FormDataTableView';
export type { FormDataTableViewProps, FormDataRow } from './components/input/FormDataTableView';

export { SpacerView } from './components/layout/SpacerView';
export type { SpacerViewProps } from './components/layout/SpacerView';

export { PickerView } from './components/input/PickerView';
export type { PickerViewProps, PickerOption, PickerColumn } from './components/input/PickerView';

// ─── Sprint 7, Batch A — Date & Time ──────────────────────────────────────────

export { CalendarView } from './components/input/CalendarView';
export type { CalendarViewProps, CalendarMode, CalendarRangeStyle, IsoDate } from './components/input/CalendarView';

export { DateInputView } from './components/input/DateInputView';
export type { DateInputViewProps } from './components/input/DateInputView';

export { DateTimeInputView } from './components/input/DateTimeInputView';
export type { DateTimeInputViewProps, IsoDateTime } from './components/input/DateTimeInputView';

export { DateRangePickerView, DEFAULT_DATE_RANGE_PRESETS } from './components/input/DateRangePickerView';
export type { DateRangePickerViewProps, DateRangePreset, DateRangePickerVariant } from './components/input/DateRangePickerView';

export { TimeWheelView } from './components/input/TimeWheelView';
export type { TimeWheelViewProps, TimeWheelValue } from './components/input/TimeWheelView';

export { CountdownRingView } from './components/display/CountdownRingView';
export type { CountdownRingViewProps } from './components/display/CountdownRingView';
