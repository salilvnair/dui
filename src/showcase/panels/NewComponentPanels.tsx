import { useState, useRef } from 'react';
import {
  ToggleSwitchView, CheckboxView, ModalView, LoaderView, EmptyStateView, ButtonView, IconButtonView,
  StatusIndicatorView, InfoPopupView, ResizablePanelView, SplitPanelView, DottedCardView,
  ColoredTextView, StatsCardView, DataTableView, CodeBlockView, AIButtonView,
  SideNavView, SettingsNavView, ThemeCardSelectorView, FeatureCategoryView,
  TagInputView, BottomPanelView, ToastView, PromptCardView,
  PromptLibraryListView, PromptLibraryEditorView, EditorView,
  SearchInputView, DurationInputView, TabView,
  HighlightedInputView, KeyValueTableView, HiddenKeyValueItemView,
  MergedInputView, MergeDivider,
  HudView,
  CollapsibleSectionView,
  JsonTreeView,
  ExpandableLogEntryView,
  CopyButtonView,
  MarkdownView,
  FormDataTableView,
  YamlKeyChip,
  LiveColorCustomizer,
  SpacerView,
  PickerView,
  SegmentedControlView,
  CalendarView,
  DateInputView,
  DateRangePickerView,
  TimeWheelView,
  CountdownRingView,
  RadioGroupView,
  RadioCardView,
  RatingView,
  OtpInputView,
  PhoneInputView,
  ColorPickerView,
  IconPickerView,
  EmojiPickerView,
  FileDropzoneView,
  AvatarUploadView,
  MaskedInputView,
  TransferListView,
  StepperInputView,
  SwitchGroupView,
  SnackbarView,
  BannerView,
  ProgressRingView,
  ProgressBarView,
  SkeletonView,
  NotificationBadgeView,
  AvatarView,
  AvatarGroupView,
  PresenceDotView,
  ConfettiBurstView,
  PopoverView,
  TooltipView,
  DrawerView,
  ActionSheetView,
  BottomSheetView,
  SpotlightTourView,
  FabView,
  DockView,
  BreadcrumbView,
  PaginationView,
  HeroView,
  LevelView,
  MediaObjectView,
  TileGridView,
  PanelListView,
  NavbarView,
  AffixView,
  AnchorView,
  StickyHeaderView,
  AspectRatioView,
  MasonryGridView,
  ScrollAreaView,
  BackToTopView,
  WatermarkView,
  DescriptionsView,
  StatisticView,
  ResultView,
  CascaderView,
  ComboBoxView,
  ListView,
  VirtualizedListView,
  StickyTableHeaderView,
  TablePaginationView,
  FilterBarView,
  SortableHeaderView,
  EditableCellView,
  DataGridToolbarView,
  ColumnVisibilityMenuView,
  KbdView,
  WizardStepperView,
  AccordionGroupView,
  SegmentedProgressBarView,
  ChecklistView,
  PriorityPickerView,
  TagCloudView,
  RangeSliderView,
  VoteWidgetView,
  LikeButtonView,
  BookmarkButtonView,
  FollowButtonView,
  ShortcutRecorderView,
  MessageBubbleView,
  ChatInputView,
  TypingIndicatorView,
  CommentThreadView,
  NotificationCenterView,
  AlertDialogView,
  FeedbackWidgetView,
  NpsSurveyView,
  ShareSheetView,
  ContactCardView,
  ArticleCardView,
  FaqAccordionView,
  MessageBannerView,
  QuoteBlockView,
  SettingsRowView,
  SettingsSectionView,
  OnboardingChecklistView,
  KeyValueListView,
  EnvironmentBadgeView,
  VersionBadgeView,
  LicenseBadgeView,
  UsageMeterView,
  PermissionMatrixView,
  AuditLogRowView,
  WebhookStatusView,
  ApiKeyRowView,
  RateLimitMeterView,
  EmptyInboxView,
  FeatureSpotlightBadgeView,
  CookieConsentBannerView,
  MaintenanceBannerView,
  TrialCountdownBannerView,
  TeamMemberRowView,
  InviteInputView,
  RoleSelectView,
  IntegrationCardView,
  StatusPageRowView,
  ChangelogEntryView,
  ImageGalleryView,
  ImageCropperView,
  VideoPlayerView,
  AudioWaveformView,
  AudioPlayerView,
  PdfViewerView,
  FileIconView,
  FileListView,
  DragHandleView,
  SignaturePadView,
  BarcodeView,
  ImageZoomView,
  TimelineView,
  ActivityFeedView,
  KanbanBoardView,
  SparklineView,
  HeatmapCalendarView,
  ComparisonSliderView,
  CarouselView,
  QRCodeView,
  StatTrendCardView,
  PricingCardView,
  TestimonialCardView,
  RatingBreakdownView,
  TreeSelectView,
  RichTextToolbarView,
  MentionInputView,
  GradientTextView,
  TypewriterTextView,
  CountUpNumberView,
  MagneticButtonView,
  TiltCardView,
  ParticleBackgroundView,
  GlowBorderView,
  RevealOnScrollView,
  FloatingLabelInputView,
  PulseDotView,
  RequestFlowView,
  LatencyPulseView,
  AIStreamingTextView,
  CommandOrbView,
  TimeTravelSliderView,
  DiffMorphView,
  SchemaBlueprintView,
  LiveCursorPresenceView,
  UndoRedoTimelineView,
  DialKnobInputView,
  HoldToConfirmView,
  MorphingIconButtonView,
  StackedSwipeCardView,
  NetworkWeatherView,
  ConstellationLoaderView,
  HoloCardView,
  GhostTypingPlaceholderView,
  ConnectionPulseLineView,
  StackedToastDeckView,
  PathRevealView,
  SpectrumSliderView,
  BreathingLoaderView,
} from '@/dui';
import type { SortDirection, PriorityLevel } from '@/dui';
import type { PickerColumn, SegmentedControlOption, IsoDate, TimeWheelValue, FileDropzoneEntry, ConfettiBurstHandle } from '@/dui';
import type { HudItem, FormDataRow, LiveColorVar } from '@/dui';
import type { MergedInputSegment } from '@/dui';
import type {
  ContextMenuItem, PromptLibrarySection, PromptLibraryEditorTab,
  KeyValueTableRow, PinnedKeyValueRow, TabItem,
} from '@/dui';
import type {
  EnvironmentKind, LicenseTier, WebhookHealth, ServiceStatus, ChangeType, RichTextAction,
  KanbanColumn, TreeSelectNode,
} from '@/dui';
import {
  SearchIcon, SettingsIcon, ServerIcon, LayersIcon, RestApiIcon,
  GraphQLIcon, SparkleIcon, TerminalIcon, OutputIcon, NetworkIcon,
  ClockIcon, GlobeIcon, CodeIcon, FolderIcon, DocumentIcon, CloseIcon,
  PlayIcon, SaveIcon, DownloadIcon, TrashIcon, CopyIcon, CheckIcon,
  SystemIcon, UserPromptIcon, UploadIcon, CodeBracketsIcon,
  StepOverIcon, StepIntoIcon, StepOutIcon, RestartIcon, StopSquareIcon, MuteBreakpointsIcon, RefreshIcon,
  ArrowUpRightIcon, ArrowDownLeftIcon, InfoCircleIcon, ChevronRightIcon,
  CheckCircleIcon, KeyIcon, ShareIcon, MoreHorizontalIcon,
} from '@/icons';

// ─── Layout helpers (local) ───────────────────────────────────────────────────

function Row({ label, children, gap = 10, align, code }: { label: string; children: React.ReactNode; gap?: number; code?: string; align?: string }) {
  const [showCode, setShowCode] = useState(false);
  return (
    <div style={{
      marginBottom: 16,
      border: '1px solid var(--color-surface-border)',
      borderRadius: 10,
      background: 'var(--color-surface)',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '10px 16px 8px',
        fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)',
        textTransform: 'uppercase', letterSpacing: '0.08em',
        borderBottom: '1px solid color-mix(in srgb, var(--color-surface-border) 60%, transparent)',
      }}>
        {label}
      </div>
      <div style={{ padding: '16px', display: 'flex', alignItems: align ?? 'center', flexWrap: 'wrap', gap }}>
        {children}
      </div>
      {code && (
        <div>
          <button
            type="button"
            onClick={() => setShowCode(v => !v)}
            style={{
              width: '100%', textAlign: 'left', padding: '6px 16px',
              fontSize: 10, fontWeight: 600, cursor: 'pointer',
              color: 'var(--color-text-muted)', background: 'transparent', border: 'none',
              borderTop: '1px solid color-mix(in srgb, var(--color-surface-border) 60%, transparent)',
              display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'inherit',
            }}
          >
            <CodeIcon size={10} />
            {showCode ? 'Hide code' : 'Show code'}
          </button>
          {showCode && (
            <CodeBlockView
              language="tsx"
              code={code}
              showCopyButton
              style={{ borderRadius: 0, borderTop: '1px solid var(--color-surface-border)' }}
            />
          )}
        </div>
      )}
    </div>
  );
}

function Block({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)',
      borderRadius: '8px', padding: '16px', ...style,
    }}>
      {children}
    </div>
  );
}

// ─── D1.21 — ToggleSwitchView ────────────────────────────────────────────────

export function ToggleSwitchPanel() {
  const [v1, setV1] = useState(true);
  const [v2, setV2] = useState(false);
  const [v3, setV3] = useState(true);
  return (
    <div>
      <Row label="Sizes sm / md / lg" code={`<ToggleSwitchView checked={v} onChange={setV} size="sm" label="Small" />\n<ToggleSwitchView checked={v} onChange={setV} size="md" label="Medium" />\n<ToggleSwitchView checked={v} onChange={setV} size="lg" label="Large" />`}>
        <ToggleSwitchView checked={v1} onChange={setV1} size="sm" label="Small" />
        <ToggleSwitchView checked={v1} onChange={setV1} size="md" label="Medium" />
        <ToggleSwitchView checked={v1} onChange={setV1} size="lg" label="Large" />
      </Row>
      <Row label="On / Off state" code={`<ToggleSwitchView checked={true}  onChange={setV} label="Enabled" />\n<ToggleSwitchView checked={false} onChange={setV} label="Disabled" />`}>
        <ToggleSwitchView checked={true} onChange={() => {}} label="Enabled" />
        <ToggleSwitchView checked={false} onChange={() => {}} label="Disabled" />
      </Row>
      <Row label="Disabled (dashed border)" code={`<ToggleSwitchView checked={false} onChange={() => {}} disabled label="Disabled off" />\n<ToggleSwitchView checked={true}  onChange={() => {}} disabled label="Disabled on" />`}>
        <ToggleSwitchView checked={false} onChange={() => {}} disabled label="Disabled off" />
        <ToggleSwitchView checked={true} onChange={() => {}} disabled label="Disabled on" />
      </Row>
      <Row label="Protocol accent colors" code={`<ToggleSwitchView checked={v} onChange={setV} accentColor="var(--color-protocol-rest)" />\n<ToggleSwitchView checked={v} onChange={setV} accentColor="var(--color-protocol-graphql)" />\n<ToggleSwitchView checked={v} onChange={setV} accentColor="var(--color-success)" />`}>
        {(['var(--color-protocol-rest)', 'var(--color-protocol-graphql)', 'var(--color-protocol-websocket)', 'var(--color-success)'] as const).map(color => (
          <ToggleSwitchView key={color} checked={v1} onChange={setV1} accentColor={color} />
        ))}
      </Row>
      <Row label="Label positions left / right" code={`<ToggleSwitchView checked={v} onChange={setV} label="Left label"  labelPosition="left" />\n<ToggleSwitchView checked={v} onChange={setV} label="Right label" labelPosition="right" />`}>
        <ToggleSwitchView checked={v2} onChange={setV2} label="Left label" labelPosition="left" />
        <ToggleSwitchView checked={v3} onChange={setV3} label="Right label" labelPosition="right" />
      </Row>
    </div>
  );
}

// ─── D1.22 — CheckboxView ────────────────────────────────────────────────────

export function CheckboxPanel() {
  const [c1, setC1] = useState(true);
  const [c2, setC2] = useState(false);
  const [pkce, setPkce] = useState(false);
  return (
    <div>
      <Row label="States checked / unchecked / indeterminate / disabled" code={`<CheckboxView checked={true}  onChange={setChecked} label="Checked" />\n<CheckboxView checked={false} onChange={setChecked} label="Unchecked" />\n<CheckboxView checked={false} indeterminate onChange={setChecked} label="Indeterminate" />\n<CheckboxView checked={false} onChange={() => {}} disabled label="Disabled" />`}>
        <CheckboxView checked={true}  onChange={() => {}} label="Checked" />
        <CheckboxView checked={false} onChange={() => {}} label="Unchecked" />
        <CheckboxView checked={false} indeterminate onChange={() => {}} label="Indeterminate" />
        <CheckboxView checked={false} onChange={() => {}} disabled label="Disabled" />
        <CheckboxView checked={true}  onChange={() => {}} disabled label="Disabled checked" />
      </Row>
      <Row label="Sizes xxs / xs / sm / md / lg — label font steps down one size for compact look" code={`<CheckboxView checked={checked} onChange={setChecked} size="xs"  label="Extra small" />\n<CheckboxView checked={checked} onChange={setChecked} size="sm"  label="Small" />\n<CheckboxView checked={checked} onChange={setChecked} size="md"  label="Medium" />\n<CheckboxView checked={checked} onChange={setChecked} size="lg"  label="Large" />`}>
        <CheckboxView checked={c1} onChange={setC1} size="xxs" label="XXS" />
        <CheckboxView checked={c1} onChange={setC1} size="xs"  label="Extra small" />
        <CheckboxView checked={c1} onChange={setC1} size="sm"  label="Small" />
        <CheckboxView checked={c1} onChange={setC1} size="md"  label="Medium" />
        <CheckboxView checked={c1} onChange={setC1} size="lg"  label="Large" />
      </Row>
      <Row label="Form field usage — checkbox inline in a settings row (like Auth → Use PKCE)" code={`// Inline in a label-row pattern\n<div style={{ display:'flex', alignItems:'center', gap:8 }}>\n  <span style={{ fontSize:12, color:'var(--color-text-muted)', width:120 }}>Use PKCE</span>\n  <CheckboxView checked={pkce} onChange={setPkce} size="md" label="Enable PKCE (S256)" />\n</div>`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '2px 4px' }}>
          <span style={{ fontSize: 12, color: 'var(--color-text-muted)', width: 120, flexShrink: 0 }}>Use PKCE</span>
          <CheckboxView checked={pkce} onChange={setPkce} size="md" label="Enable PKCE (S256)" />
        </div>
      </Row>
      <Row label="Protocol accent colors" code={`<CheckboxView checked={v} onChange={setV} accentColor="var(--color-protocol-rest)"    label="REST" />\n<CheckboxView checked={v} onChange={setV} accentColor="var(--color-protocol-graphql)" label="GQL" />\n<CheckboxView checked={v} onChange={setV} accentColor="var(--color-success)"          label="OK" />\n<CheckboxView checked={v} onChange={setV} accentColor="var(--color-warning)"          label="Warn" />`}>
        {(['var(--color-protocol-rest)', 'var(--color-protocol-graphql)', 'var(--color-success)', 'var(--color-warning)'] as const).map(color => (
          <CheckboxView key={color} checked={c2} onChange={setC2} accentColor={color} label="Check me" />
        ))}
      </Row>
    </div>
  );
}

// ─── D1.23 — ModalView ───────────────────────────────────────────────────────

export function ModalPanel() {
  const [openSm, setOpenSm] = useState(false);
  const [openMd, setOpenMd] = useState(false);
  const [openLg, setOpenLg] = useState(false);
  return (
    <div>
      <Row label="Sizes sm / md / lg — click X or Cancel to close (backdrop never closes)" code={`<ModalView\n  open={open}\n  onClose={() => setOpen(false)}\n  title="Confirm Delete"\n  size="sm"\n  footerRight={<ButtonView label="Confirm" variant="primary" onClick={confirm} />}\n>\n  Are you sure?\n</ModalView>`}>
        <Block style={{ display: 'flex', gap: '10px', padding: '16px' }}>
          <button type="button" onClick={() => setOpenSm(true)} style={{ padding: '6px 12px', borderRadius: 5, border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)', cursor: 'pointer', color: 'var(--color-text-primary)', fontSize: '12px' }}>Open SM modal</button>
          <button type="button" onClick={() => setOpenMd(true)} style={{ padding: '6px 12px', borderRadius: 5, border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)', cursor: 'pointer', color: 'var(--color-text-primary)', fontSize: '12px' }}>Open MD modal</button>
          <button type="button" onClick={() => setOpenLg(true)} style={{ padding: '6px 12px', borderRadius: 5, border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)', cursor: 'pointer', color: 'var(--color-text-primary)', fontSize: '12px' }}>Open LG modal</button>
        </Block>
      </Row>
      <ModalView
        open={openSm} onClose={() => setOpenSm(false)} size="sm" title="Small Modal"
        footerRight={<><ButtonView label="Cancel" onClick={() => setOpenSm(false)} /><ButtonView label="Confirm" variant="primary" onClick={() => setOpenSm(false)} /></>}
      >
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>This is a small modal (420px wide). Only the X button and footer buttons close it — backdrop click does nothing.</p>
      </ModalView>
      <ModalView
        open={openMd} onClose={() => setOpenMd(false)} size="md" title="Medium Modal"
        footerRight={<><ButtonView label="Cancel" onClick={() => setOpenMd(false)} /><ButtonView label="Save changes" variant="primary" onClick={() => setOpenMd(false)} /></>}
      >
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>Medium modal (560px). Press Escape or click X to close.</p>
      </ModalView>
      <ModalView
        open={openLg} onClose={() => setOpenLg(false)} size="lg" title="Large Modal — Request Details"
        footerLeft={<ButtonView label="Delete" variant="danger" onClick={() => setOpenLg(false)} />}
        footerRight={<><ButtonView label="Close" onClick={() => setOpenLg(false)} /><ButtonView label="Save" variant="primary" onClick={() => setOpenLg(false)} /></>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-secondary)' }}>Large modal (720px) with left + right footer buttons. Useful for request detail editors, schema viewers, config dialogs.</p>
          <div style={{ height: 2, background: 'var(--color-surface-border)', borderRadius: 1 }} />
          <p style={{ margin: 0, fontSize: '11px', color: 'var(--color-text-muted)' }}>Body content scrolls independently if taller than the modal height.</p>
        </div>
      </ModalView>
    </div>
  );
}

// ─── D1.24 — LoaderView ──────────────────────────────────────────────────────

export function LoaderPanel() {
  const [progress, setProgress] = useState(45);
  return (
    <div>
      <Row label="Variants — spinner · dots · skeleton · pulse · progress-bar" code={`<LoaderView variant="spinner"  label="Loading…" />\n<LoaderView variant="dots" />\n<LoaderView variant="skeleton" width={200} height={14} />\n<LoaderView variant="pulse" />`}>
        <Block style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap', padding: '24px' }}>
          <LoaderView variant="spinner" label="Spinner" />
          <LoaderView variant="dots" label="Dots" />
          <LoaderView variant="skeleton" />
          <LoaderView variant="pulse" />
        </Block>
      </Row>
      <Row label="Progress bar (drag slider)" code={`<LoaderView variant="progress-bar" progress={progress} label={\`\${progress}%\`} />`}>
        <Block style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', width: '100%' }}>
          <LoaderView variant="progress-bar" progress={progress} label={`${progress}%`} />
          <input type="range" min={0} max={100} value={progress} onChange={e => setProgress(+e.target.value)} style={{ width: '100%' }} />
        </Block>
      </Row>
      <Row label="Sizes sm / md / lg" code={`<LoaderView variant="spinner" size="sm" />\n<LoaderView variant="spinner" size="md" />\n<LoaderView variant="spinner" size="lg" />`}>
        <Block style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '20px' }}>
          <LoaderView variant="spinner" size="sm" />
          <LoaderView variant="spinner" size="md" />
          <LoaderView variant="spinner" size="lg" />
        </Block>
      </Row>
      <Row label="Protocol accent colors" code={`<LoaderView variant="spinner" accentColor="var(--color-protocol-rest)" />\n<LoaderView variant="spinner" accentColor="var(--color-protocol-graphql)" />`}>
        <Block style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '20px', flexWrap: 'wrap' }}>
          {['var(--color-protocol-rest)', 'var(--color-protocol-graphql)', 'var(--color-protocol-websocket)', 'var(--color-protocol-grpc)', 'var(--color-protocol-ai)'].map(c => (
            <LoaderView key={c} variant="spinner" accentColor={c} size="md" />
          ))}
        </Block>
      </Row>
    </div>
  );
}

// ─── D1.25 — EmptyStateView ──────────────────────────────────────────────────

export function EmptyStatePanel() {
  return (
    <div>
      <Row label="Standard empty state with action" code={`<EmptyStateView\n  icon={<FolderIcon size={32} />}\n  title="No collections yet"\n  message="Create your first collection to get started."\n  action={{ label: '+ New Collection', onClick: create }}\n/>`}>
        <Block style={{ width: '100%' }}>
          <EmptyStateView
            icon={<FolderIcon size={32} />}
            title="No collections yet"
            message="Create your first collection to organize your API requests."
            action={{ label: '+ New Collection', onClick: () => alert('New Collection') }}
          />
        </Block>
      </Row>
      <Row label="Compact (for panels/drawers)" code={`<EmptyStateView\n  icon={<DocumentIcon size={20} />}\n  title="No requests"\n  message="Hit Send to get a response"\n  compact\n/>`}>
        <Block style={{ width: '100%' }}>
          <EmptyStateView
            icon={<DocumentIcon size={20} />}
            title="No requests"
            message="Hit Send to get a response"
            compact
          />
        </Block>
      </Row>
      <Row label="Protocol color reference" code={`// Use these CSS variables for accentColor / color props throughout Daakia\n// var(--color-protocol-rest)\n// var(--color-protocol-graphql)\n// var(--color-protocol-websocket)\n// var(--color-protocol-grpc)\n// var(--color-protocol-soap)\n// var(--color-protocol-ai)\n// var(--color-protocol-mcp)`}>
        <Block style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', padding: '16px' }}>
          {[
            { label: 'REST',      cssVar: '--color-protocol-rest'      },
            { label: 'GraphQL',   cssVar: '--color-protocol-graphql'   },
            { label: 'WebSocket', cssVar: '--color-protocol-websocket'  },
            { label: 'SSE',       cssVar: '--color-protocol-sse'       },
            { label: 'Socket.IO', cssVar: '--color-protocol-socketio'  },
            { label: 'MQTT',      cssVar: '--color-protocol-mqtt'      },
            { label: 'gRPC',      cssVar: '--color-protocol-grpc'      },
            { label: 'SOAP',      cssVar: '--color-protocol-soap'      },
            { label: 'AI',        cssVar: '--color-protocol-ai'        },
            { label: 'MCP',       cssVar: '--color-protocol-mcp'       },
          ].map(({ label, cssVar }) => (
            <div key={cssVar} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', width: 72 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '8px',
                background: `var(${cssVar})`,
                border: '1px solid color-mix(in srgb, var(--color-text-primary) 10%, transparent)',
                flexShrink: 0,
              }} />
              <span style={{ fontSize: '10px', color: 'var(--color-text-primary)', fontWeight: 600, textAlign: 'center' }}>{label}</span>
              <span style={{ fontSize: '9px', color: 'var(--color-text-muted)', fontFamily: 'monospace', textAlign: 'center', wordBreak: 'break-all' }}>{cssVar}</span>
            </div>
          ))}
        </Block>
      </Row>
    </div>
  );
}

// ─── D1.26 — StatusIndicatorView ─────────────────────────────────────────────

export function StatusIndicatorPanel() {
  return (
    <div>
      <Row label="All states" code={`<StatusIndicatorView status="idle"         label="Idle" />\n<StatusIndicatorView status="connecting"   label="Connecting…" />\n<StatusIndicatorView status="connected"    label="Connected" />\n<StatusIndicatorView status="disconnected" label="Disconnected" />\n<StatusIndicatorView status="error"        label="Error" />`}>
        <Block style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center', padding: '20px' }}>
          <StatusIndicatorView status="idle"         label="Idle" />
          <StatusIndicatorView status="connecting"   label="Connecting…" />
          <StatusIndicatorView status="connected"    label="Connected" />
          <StatusIndicatorView status="disconnected" label="Disconnected" />
          <StatusIndicatorView status="error"        label="Error" />
        </Block>
      </Row>
      <Row label="With subtext" code={`<StatusIndicatorView status="connected" label="WebSocket" subtext="ws://localhost:8080" />\n<StatusIndicatorView status="error"     label="gRPC"      subtext="Connection refused" />`}>
        <Block style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '16px' }}>
          <StatusIndicatorView status="connected"  label="WebSocket" subtext="ws://localhost:8080" />
          <StatusIndicatorView status="error"      label="gRPC"      subtext="Connection refused" />
          <StatusIndicatorView status="connecting" label="MQTT"      subtext="mqtt://broker:1883" />
        </Block>
      </Row>
      <Row label="Protocol accent" code={`<StatusIndicatorView status="connected" label="REST" accentColor="var(--color-protocol-rest)" />\n<StatusIndicatorView status="connected" label="GQL"  accentColor="var(--color-protocol-graphql)" />`}>
        <Block style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '16px' }}>
          <StatusIndicatorView status="connected" label="REST" accentColor="var(--color-protocol-rest)" />
          <StatusIndicatorView status="connected" label="GQL"  accentColor="var(--color-protocol-graphql)" />
          <StatusIndicatorView status="connected" label="WS"   accentColor="var(--color-protocol-websocket)" />
        </Block>
      </Row>
    </div>
  );
}

// ─── D1.27 — InfoPopupView ───────────────────────────────────────────────────

export function InfoPopupPanel() {
  const [open1, setOpen1] = useState(false);
  const [anchor1, setAnchor1] = useState<HTMLElement | null>(null);
  return (
    <div>
      <Row label="Click ? to open info popup" code={`<InfoPopupView\n  open={open}\n  onClose={() => setOpen(false)}\n  anchorEl={anchorEl}\n  title="Rate Limit"\n  description="Max requests per second."\n  items={[\n    { code: 'rateLimit',  description: 'Max requests/sec' },\n    { code: 'statusCode', description: 'HTTP status when limited (429)' },\n  ]}\n  footer="Applies per-client IP."\n  wikiHref="#"\n/>`}>
        <Block style={{ display: 'flex', gap: '12px', padding: '16px', alignItems: 'center' }}>
          <button
            type="button"
            ref={el => setAnchor1(el)}
            onClick={() => setOpen1(v => !v)}
            style={{ width: 20, height: 20, borderRadius: '50%', border: '1px solid var(--color-surface-border)', background: 'var(--color-surface)', cursor: 'pointer', fontSize: '11px', color: 'var(--color-text-muted)' }}
          >?</button>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Hover for the Rate Limit info popup</span>
        </Block>
      </Row>
      <InfoPopupView
        open={open1}
        onClose={() => setOpen1(false)}
        anchorEl={anchor1}
        title="Rate Limit"
        description="Configure how many requests per second this mock endpoint should allow."
        items={[
          { code: 'rateLimit', description: 'Max requests per second' },
          { code: 'burstSize', description: 'Burst allowance above the limit' },
          { code: 'statusCode', description: 'HTTP status returned when limited (default 429)' },
        ]}
        footer="Rate limiting applies per-client IP address."
        wikiHref="#"
      />
    </div>
  );
}

// ─── D1.28 — SplitPanelView (formerly ResizablePanelView) ────────────────────

// ─── SplitPanelPanel helpers ──────────────────────────────────────────────────

function RequestPane() {
  const [activeTab, setActiveTab] = useState('params');
  const tabs = ['Params', 'Headers', 'Body', 'Auth', 'Scripts'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--color-panel)' }}>
      {/* URL bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px 8px',
        borderBottom: '1px solid var(--color-surface-border)',
        flexShrink: 0,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: 28, padding: '0 10px', borderRadius: 5,
          background: 'color-mix(in srgb, var(--color-success) 15%, transparent)',
          color: 'var(--color-success)', fontSize: 11, fontWeight: 800, letterSpacing: '0.04em',
          flexShrink: 0,
        }}>GET</div>
        <div style={{
          flex: 1, height: 28, background: 'var(--color-input-bg)',
          border: '1px solid var(--color-input-border)', borderRadius: 5,
          display: 'flex', alignItems: 'center', padding: '0 10px',
          fontSize: 12, color: 'var(--color-text-muted)',
        }}>
          https://api.example.com/users
        </div>
        <div style={{
          height: 28, padding: '0 14px', borderRadius: 5, background: 'var(--color-primary)',
          color: 'white', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center',
          cursor: 'pointer', flexShrink: 0,
        }}>Send</div>
      </div>

      {/* Sub-tabs */}
      <div style={{
        display: 'flex', gap: 0, padding: '0 12px', flexShrink: 0,
        borderBottom: '1px solid var(--color-surface-border)',
      }}>
        {tabs.map(t => {
          const id = t.toLowerCase();
          const isActive = activeTab === id;
          return (
            <button key={t} type="button" onClick={() => setActiveTab(id)} style={{
              padding: '7px 10px', fontSize: 12, fontWeight: isActive ? 600 : 400,
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
              background: 'transparent', border: 'none', cursor: 'pointer',
              borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
              marginBottom: -1, fontFamily: 'inherit',
            }}>{t}</button>
          );
        })}
      </div>

      {/* Params content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 12 }}>
        {activeTab === 'params' && (
          <div>
            {[
              { key: 'limit', value: '10', on: true },
              { key: 'offset', value: '0', on: true },
              { key: 'sort',  value: 'created_at', on: false },
            ].map((row, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4,
                padding: '5px 8px', borderRadius: 5,
                background: row.on ? 'transparent' : 'color-mix(in srgb, var(--color-text-muted) 4%, transparent)',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: row.on ? 'var(--color-success)' : 'var(--color-surface-border)', flexShrink: 0 }} />
                <span style={{ width: 80, fontSize: 11, color: row.on ? 'var(--color-text-primary)' : 'var(--color-text-muted)', fontWeight: 500 }}>{row.key}</span>
                <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>=</span>
                <span style={{ flex: 1, fontSize: 11, color: row.on ? 'var(--color-info)' : 'var(--color-text-muted)' }}>{row.value}</span>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'headers' && (
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            {[
              { k: 'Content-Type', v: 'application/json' },
              { k: 'Authorization', v: 'Bearer {{token}}' },
              { k: 'Accept', v: '*/*' },
            ].map((h, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4, padding: '4px 8px' }}>
                <span style={{ width: 120, fontWeight: 600, color: 'var(--color-text-secondary)' }}>{h.k}</span>
                <span style={{ color: 'var(--color-text-muted)' }}>{h.v}</span>
              </div>
            ))}
          </div>
        )}
        {(activeTab !== 'params' && activeTab !== 'headers') && (
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', paddingTop: 8 }}>No content for {activeTab}</div>
        )}
      </div>
    </div>
  );
}

function ResponsePane() {
  const [activeTab, setActiveTab] = useState('body');
  const tabs = ['Body', 'Headers', 'Cookies', 'Timeline'];
  const json = `{
  "data": [
    { "id": 1, "name": "Alice Chen",  "role": "admin",  "active": true },
    { "id": 2, "name": "Bob Tanaka",  "role": "editor", "active": true },
    { "id": 3, "name": "Carol Davis", "role": "viewer", "active": false }
  ],
  "meta": { "total": 3, "limit": 10, "offset": 0 }
}`;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--color-panel)' }}>
      {/* Status bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px 8px',
        borderBottom: '1px solid var(--color-surface-border)', flexShrink: 0,
      }}>
        <span style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: 22, padding: '0 8px', borderRadius: 5,
          background: 'color-mix(in srgb, var(--color-success) 15%, transparent)',
          color: 'var(--color-success)', fontSize: 11, fontWeight: 700,
        }}>200 OK</span>
        <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>142 ms</span>
        <div style={{ width: 1, height: 12, background: 'var(--color-surface-border)' }} />
        <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>1.2 KB</span>
      </div>

      {/* Sub-tabs */}
      <div style={{
        display: 'flex', gap: 0, padding: '0 12px', flexShrink: 0,
        borderBottom: '1px solid var(--color-surface-border)',
      }}>
        {tabs.map(t => {
          const id = t.toLowerCase();
          const isActive = activeTab === id;
          return (
            <button key={t} type="button" onClick={() => setActiveTab(id)} style={{
              padding: '7px 10px', fontSize: 12, fontWeight: isActive ? 600 : 400,
              color: isActive ? 'var(--color-success)' : 'var(--color-text-muted)',
              background: 'transparent', border: 'none', cursor: 'pointer',
              borderBottom: isActive ? '2px solid var(--color-success)' : '2px solid transparent',
              marginBottom: -1, fontFamily: 'inherit',
            }}>{t}</button>
          );
        })}
      </div>

      {/* Response body */}
      <div style={{ flex: 1, overflow: 'auto', padding: 12 }}>
        {activeTab === 'body' && (
          <pre style={{
            margin: 0, fontSize: 11, lineHeight: 1.6,
            color: 'var(--color-text-secondary)',
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
            whiteSpace: 'pre-wrap',
          }}>{json}</pre>
        )}
        {activeTab !== 'body' && (
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', paddingTop: 8 }}>No content for {activeTab}</div>
        )}
      </div>
    </div>
  );
}

export function SplitPanelPanel() {
  return (
    <div>
      <Row label="Horizontal split — request / response (drag pill, double-click to reset)" gap={0} code={`<SplitPanelView\n  direction="horizontal"\n  defaultSplit={45}      // % for first panel\n  minFirst={200}         // px minimum\n  minSecond={200}\n  accentColor="var(--color-protocol-rest)"\n  pillTooltip="Drag to resize\\nDouble-click to reset  Alt+/"\n  first={<RequestPanel />}\n  second={<ResponsePanel />}\n/>`}>
        <Block style={{ padding: 0, overflow: 'hidden', width: '100%' }}>
          <SplitPanelView
            direction="horizontal"
            defaultSplit={45}
            minFirst={200}
            minSecond={200}
            style={{ height: 320 }}
            accentColor="var(--color-protocol-rest)"
            pillTooltip="Drag to resize&#10;Double-click to reset  Alt+/"
            first={<RequestPane />}
            second={<ResponsePane />}
          />
        </Block>
      </Row>
      <Row label="Vertical split — editor top / console bottom" gap={0} code={`<SplitPanelView\n  direction="vertical"\n  defaultSplit={60}\n  minFirst={80}\n  minSecond={60}\n  pillTooltip="Drag to resize\\nDouble-click to reset"\n  first={<EditorPanel />}\n  second={<ConsolePanel />}\n/>`}>
        <Block style={{ padding: 0, overflow: 'hidden', width: '100%' }}>
          <SplitPanelView
            direction="vertical"
            defaultSplit={60}
            minFirst={80}
            minSecond={60}
            style={{ height: 260 }}
            pillTooltip="Drag to resize · Double-click to reset"
            first={
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--color-panel)' }}>
                <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--color-surface-border)', fontSize: 11, fontWeight: 600, color: 'var(--color-text-muted)', flexShrink: 0 }}>REQUEST BODY</div>
                <pre style={{ flex: 1, margin: 0, padding: '10px 12px', fontSize: 11, lineHeight: 1.6, color: 'var(--color-text-secondary)', fontFamily: 'Menlo, Monaco, "Courier New", monospace', overflow: 'auto' }}>{`{\n  "name": "Alice",\n  "email": "alice@example.com"\n}`}</pre>
              </div>
            }
            second={
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'color-mix(in srgb, var(--color-surface) 60%, var(--color-panel))' }}>
                <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--color-surface-border)', fontSize: 11, fontWeight: 600, color: 'var(--color-text-muted)', flexShrink: 0 }}>CONSOLE</div>
                <div style={{ flex: 1, overflow: 'auto', padding: '8px 12px' }}>
                  {[
                    { type: 'info',  text: 'Request started — POST /users' },
                    { type: 'ok',    text: 'Response 201 Created in 88ms' },
                    { type: 'warn',  text: 'Rate limit: 98/100 remaining' },
                  ].map((line, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4, fontSize: 11, fontFamily: 'Menlo, Monaco, monospace' }}>
                      <span style={{ color: line.type === 'ok' ? 'var(--color-success)' : line.type === 'warn' ? 'var(--color-warning)' : 'var(--color-info)', flexShrink: 0 }}>
                        {line.type === 'ok' ? '✓' : line.type === 'warn' ? '⚠' : 'i'}
                      </span>
                      <span style={{ color: 'var(--color-text-muted)' }}>{line.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        </Block>
      </Row>
    </div>
  );
}

// ─── D1.28b — ResizablePanelView (bottom-edge drag, single pane) ──────────────

export function ResizablePanelPanel() {
  return (
    <div>
      <Row label="Bottom-edge drag to resize height — ditto Daakia AuditLog response panel" gap={0} code={`<ResizablePanelView\n  defaultHeight={200}\n  minHeight={80}\n  maxHeight={500}\n>\n  {/* your content */}\n</ResizablePanelView>`}>
        <Block style={{ padding: '12px', width: '100%' }}>
          <ResizablePanelView defaultHeight={200} minHeight={80} maxHeight={500}>
            <div style={{
              height: '100%', display: 'flex', flexDirection: 'column',
              background: 'var(--color-panel)',
            }}>
              <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--color-surface-border)', fontSize: 11, fontWeight: 600, color: 'var(--color-text-muted)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>RESPONSE</span>
                <span style={{ marginLeft: 'auto', background: 'color-mix(in srgb, var(--color-success) 15%, transparent)', color: 'var(--color-success)', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 4 }}>200 OK</span>
                <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>142ms</span>
              </div>
              <pre style={{ flex: 1, margin: 0, padding: '10px 12px', fontSize: 11, lineHeight: 1.6, color: 'var(--color-text-secondary)', fontFamily: 'Menlo, Monaco, "Courier New", monospace', overflow: 'auto' }}>{`{\n  "users": [\n    { "id": 1, "name": "Alice" },\n    { "id": 2, "name": "Bob" }\n  ],\n  "total": 2\n}`}</pre>
            </div>
          </ResizablePanelView>
          <p style={{ margin: '8px 0 0', fontSize: 11, color: 'var(--color-text-muted)' }}>
            ↕ Drag the dashed grip at the bottom edge to resize
          </p>
        </Block>
      </Row>
      <Row label="Wrapping a SplitPanelView — drag outer edge to resize total height, pill to adjust split" gap={0} code={`<ResizablePanelView defaultHeight={240} minHeight={120} maxHeight={480}>\n  <SplitPanelView direction="horizontal" first={<Request />} second={<Response />} />\n</ResizablePanelView>`}>
        <Block style={{ padding: '12px', width: '100%' }}>
          <ResizablePanelView defaultHeight={240} minHeight={120} maxHeight={480}>
            <SplitPanelView
              direction="horizontal"
              defaultSplit={50}
              minFirst={120}
              minSecond={120}
              style={{ height: '100%' }}
              accentColor="var(--color-protocol-rest)"
              first={<RequestPane />}
              second={<ResponsePane />}
            />
          </ResizablePanelView>
          <p style={{ margin: '8px 0 0', fontSize: 11, color: 'var(--color-text-muted)' }}>
            ↕ Drag bottom grip to resize overall height · ↔ Drag center pill to adjust split
          </p>
        </Block>
      </Row>
    </div>
  );
}

// ─── D1.29 — DottedCardView ──────────────────────────────────────────────────

export function DottedCardPanel() {
  return (
    <div>
      <Row label="Collapsed / expanded with title slot" gap={12} code={`<DottedCardView title="REST Headers" defaultExpanded>\n  <p>Content here</p>\n</DottedCardView>\n\n<DottedCardView\n  title="GraphQL Variables"\n  defaultExpanded\n  accentColor="var(--color-protocol-graphql)"\n>\n  <p>Variables JSON here</p>\n</DottedCardView>`}>
        <DottedCardView title="REST Headers" style={{ width: '100%' }}>
          <p style={{ margin: 0, fontSize: '11px', color: 'var(--color-text-muted)' }}>Header key-value pairs for this request would appear here.</p>
        </DottedCardView>
        <DottedCardView title="GraphQL Variables" defaultExpanded accentColor="var(--color-protocol-graphql)" style={{ width: '100%' }}>
          <p style={{ margin: 0, fontSize: '11px', color: 'var(--color-text-muted)' }}>Variables JSON would go here.</p>
        </DottedCardView>
      </Row>
      <Row label="Protocol accent colors" gap={8} code={`<DottedCardView accentColor="var(--color-protocol-rest)"      title="REST"   />\n<DottedCardView accentColor="var(--color-protocol-graphql)"   title="GQL"    />\n<DottedCardView accentColor="var(--color-protocol-websocket)" title="WS"     />`}>
        <DottedCardView accentColor="var(--color-protocol-rest)"      title="REST"   style={{ flex: 1 }}><div style={{ height: 24 }} /></DottedCardView>
        <DottedCardView accentColor="var(--color-protocol-graphql)"   title="GQL"    style={{ flex: 1 }}><div style={{ height: 24 }} /></DottedCardView>
        <DottedCardView accentColor="var(--color-protocol-websocket)" title="WS"     style={{ flex: 1 }}><div style={{ height: 24 }} /></DottedCardView>
        <DottedCardView accentColor="var(--color-protocol-grpc)"      title="gRPC"   style={{ flex: 1 }}><div style={{ height: 24 }} /></DottedCardView>
      </Row>
    </div>
  );
}

// ─── D1.30 — ColoredTextView ─────────────────────────────────────────────────

export function ColoredTextPanel() {
  return (
    <div>
      <Row label="HTTP status line tokens" code={`<ColoredTextView tokens={[\n  { text: 'HTTP/1.1 ', color: 'var(--color-text-muted)', mono: true },\n  { text: '200',      color: 'var(--color-success)',    bold: true, mono: true },\n  { text: ' OK',      color: 'var(--color-success)',    mono: true },\n]} />`}>
        <Block>
          <ColoredTextView tokens={[
            { text: 'HTTP/1.1 ', color: 'var(--color-text-muted)', mono: true },
            { text: '200', color: 'var(--color-success)', bold: true, mono: true },
            { text: ' OK', color: 'var(--color-success)', mono: true },
          ]} />
        </Block>
      </Row>
      <Row label="Error response" code={`<ColoredTextView tokens={[\n  { text: 'HTTP/1.1 ', color: 'var(--color-text-muted)', mono: true },\n  { text: '404',       color: 'var(--color-error)',      bold: true, mono: true },\n  { text: ' Not Found', color: 'var(--color-error)',     mono: true },\n]} />`}>
        <Block>
          <ColoredTextView tokens={[
            { text: 'HTTP/1.1 ', color: 'var(--color-text-muted)', mono: true },
            { text: '404', color: 'var(--color-error)', bold: true, mono: true },
            { text: ' Not Found', color: 'var(--color-error)', mono: true },
          ]} />
        </Block>
      </Row>
      <Row label="Copyable token" code={`<ColoredTextView tokens={[\n  { text: 'Bearer ', color: 'var(--color-text-muted)', mono: true },\n  { text: 'eyJhbGci…', color: 'var(--color-protocol-rest)', mono: true, copyable: true },\n]} />`}>
        <Block>
          <ColoredTextView tokens={[
            { text: 'Bearer ', color: 'var(--color-text-muted)', mono: true },
            { text: 'eyJhbGciOi...', color: 'var(--color-protocol-rest)', mono: true, copyable: true },
          ]} />
        </Block>
      </Row>
      <Row label="gRPC status tokens" code={`<ColoredTextView tokens={[{ text: 'Status: ', mono: true, color: 'var(--color-text-muted)' }, { text: 'OK', mono: true, color: 'var(--color-success)', bold: true }]} />\n<ColoredTextView tokens={[{ text: 'Status: ', mono: true, color: 'var(--color-text-muted)' }, { text: 'UNAVAILABLE', mono: true, color: 'var(--color-error)', bold: true }]} />`}>
        <Block style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <ColoredTextView tokens={[{ text: 'Status: ', mono: true, color: 'var(--color-text-muted)' }, { text: 'OK', mono: true, color: 'var(--color-success)', bold: true }]} />
          <ColoredTextView tokens={[{ text: 'Status: ', mono: true, color: 'var(--color-text-muted)' }, { text: 'UNAVAILABLE', mono: true, color: 'var(--color-error)', bold: true }]} />
          <ColoredTextView tokens={[{ text: 'Status: ', mono: true, color: 'var(--color-text-muted)' }, { text: 'DEADLINE_EXCEEDED', mono: true, color: 'var(--color-warning)', bold: true }]} />
        </Block>
      </Row>
    </div>
  );
}

// ─── D1.31 — StatsCardView ───────────────────────────────────────────────────

export function StatsCardPanel() {
  return (
    <div>
      <Row label="Stats cards — requests/errors/latency metrics" code={`<StatsCardView\n  label="Response Time"\n  value="142"\n  unit="ms"\n  trend="down"\n  trendValue="8%"\n  accentColor="var(--color-success)"\n/>`}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <StatsCardView label="Total Requests" value="1,284" trend="up"      trendValue="12%" accentColor="var(--color-protocol-rest)"      style={{ width: 160 }} />
          <StatsCardView label="Avg Latency"    value="142"   unit="ms"  trend="down"    trendValue="8%"  accentColor="var(--color-success)"           style={{ width: 160 }} />
          <StatsCardView label="Error Rate"     value="2.4"   unit="%"   trend="up"      trendValue="0.3%" accentColor="var(--color-error)"            style={{ width: 160 }} />
          <StatsCardView label="Active Clients" value="37"               trend="neutral"              accentColor="var(--color-protocol-websocket)" style={{ width: 160 }} />
        </div>
      </Row>
      <Row label="With subValue" code={`<StatsCardView\n  label="Requests / sec"\n  value="48.2"\n  subValue="peak: 312/s"\n  accentColor="var(--color-protocol-grpc)"\n/>`}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <StatsCardView label="Requests / sec"    value="48.2" subValue="peak: 312/s"  accentColor="var(--color-protocol-grpc)"   style={{ width: 180 }} />
          <StatsCardView label="AI Tokens Used"    value="94.2k" subValue="$0.18 today"  accentColor="var(--color-protocol-ai)"    style={{ width: 180 }} />
        </div>
      </Row>
    </div>
  );
}

// ─── D1.32 — DataTableView ───────────────────────────────────────────────────

const TABLE_COLS = [
  { key: 'method', label: 'Method', width: '80px' },
  { key: 'path',   label: 'Path',   sortable: true },
  { key: 'status', label: 'Status', width: '80px', align: 'center' as const },
  { key: 'time',   label: 'Time',   width: '80px', align: 'right' as const, sortable: true },
];
const TABLE_ROWS = [
  { id: '1', method: 'GET',    path: '/api/users',       status: 200, time: '142ms' },
  { id: '2', method: 'POST',   path: '/api/auth/login',  status: 201, time: '89ms' },
  { id: '3', method: 'PUT',    path: '/api/users/42',    status: 200, time: '210ms' },
  { id: '4', method: 'DELETE', path: '/api/items/99',    status: 404, time: '54ms' },
  { id: '5', method: 'GET',    path: '/api/products',    status: 500, time: '1.2s' },
];

const REQ_1 = JSON.stringify({ headers: { Authorization: 'Bearer eyJhb...' }, params: { page: 1 } }, null, 2);
const RES_1 = JSON.stringify({ users: [{ id: 1, name: 'Alice', role: 'admin' }, { id: 2, name: 'Bob', role: 'viewer' }], total: 2 }, null, 2);
const REQ_2 = JSON.stringify({ email: 'alice@example.com', password: '••••••••' }, null, 2);
const RES_2 = JSON.stringify({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', expiresIn: 3600, userId: 1 }, null, 2);
const REQ_3 = JSON.stringify({ name: 'Alice Smith', email: 'alice.smith@example.com' }, null, 2);
const RES_3 = JSON.stringify({ id: 42, name: 'Alice Smith', updatedAt: '2026-06-10T12:00:00Z' }, null, 2);

const AUDIT_ROWS: Record<string, unknown>[] = [
  { id: '1', method: 'GET',    url: '/api/users',        status: 200, time: '142ms', request: null,  response: RES_1 },
  { id: '2', method: 'POST',   url: '/api/auth/login',   status: 201, time: '89ms',  request: REQ_2, response: RES_2 },
  { id: '3', method: 'PUT',    url: '/api/users/42',     status: 200, time: '210ms', request: REQ_3, response: RES_3 },
  { id: '4', method: 'DELETE', url: '/api/items/99',     status: 404, time: '54ms',  request: null,  response: JSON.stringify({ error: 'Not found', code: 'ITEM_NOT_FOUND' }, null, 2) },
  { id: '5', method: 'GET',    url: '/api/products',     status: 500, time: '1.2s',  request: null,  response: JSON.stringify({ error: 'Internal server error', traceId: 'abc-123' }, null, 2) },
];

function truncateJson(json: string | null, limit = 40) {
  if (!json) return '—';
  const flat = json.replace(/\s+/g, ' ').trim();
  return flat.length > limit ? `> {...} ${flat.length} chars` : flat;
}

function methodColor(m: string) {
  const map: Record<string, string> = {
    GET: 'var(--color-method-get)', POST: 'var(--color-method-post)',
    PUT: 'var(--color-method-put)', DELETE: 'var(--color-method-delete)',
    PATCH: 'var(--color-method-patch)',
  };
  return map[m] || 'var(--color-text-muted)';
}

function statusColor(s: number) {
  if (s < 300) return 'var(--color-success)';
  if (s < 400) return 'var(--color-info)';
  if (s < 500) return 'var(--color-warning)';
  return 'var(--color-error)';
}

const AUDIT_COLS = [
  { key: 'method', label: 'Method', width: '72px',
    renderCell: (r: Record<string, unknown>) => (
      <span style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 700, color: methodColor(r.method as string) }}>{r.method as string}</span>
    ) },
  { key: 'url', label: 'URL', sortable: true },
  { key: 'status', label: 'Status', width: '72px', align: 'center' as const,
    renderCell: (r: Record<string, unknown>) => (
      <span style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 600, color: statusColor(r.status as number) }}>{r.status as number}</span>
    ) },
  { key: 'time', label: 'Time', width: '72px', align: 'right' as const },
  { key: 'request', label: 'Request', width: '140px',
    renderCell: (r: Record<string, unknown>) => (
      <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>{truncateJson(r.request as string | null)}</span>
    ) },
  { key: 'response', label: 'Response', width: '140px',
    renderCell: (r: Record<string, unknown>) => (
      <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>{truncateJson(r.response as string | null)}</span>
    ) },
];

const DB_SETTINGS: Record<string, unknown>[] = [
  { id: '1', key: 'theme', value: JSON.stringify({ mode: 'dark', primary: '#6366f1', fontSize: 14, fontFamily: 'JetBrains Mono' }, null, 2) },
  { id: '2', key: 'ai_config', value: JSON.stringify({ provider: 'anthropic', model: 'claude-opus-4-8', temperature: 0.7, maxTokens: 4096 }, null, 2) },
  { id: '3', key: 'proxy', value: JSON.stringify({ enabled: false, host: '', port: 8080, bypassList: ['localhost', '127.0.0.1'] }, null, 2) },
  { id: '4', key: 'collections_meta', value: JSON.stringify({ count: 12, lastSync: '2026-06-10T08:00:00Z', autoSync: true }, null, 2) },
];

export function DataTablePanel() {
  const [jsonModal, setJsonModal] = useState<{ key: string; json: string } | null>(null);

  const DB_COLS = [
    { key: 'key', label: 'Key', width: '160px',
      renderCell: (r: Record<string, unknown>) => (
        <span style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 600, color: 'var(--color-text-primary)' }}>{r.key as string}</span>
      ) },
    { key: 'value', label: 'Value',
      renderCell: (r: Record<string, unknown>) => {
        const json = r.value as string;
        const flat = json.replace(/\s+/g, ' ').trim();
        return (
          <button
            type="button"
            onClick={() => setJsonModal({ key: r.key as string, json })}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              fontSize: 10, fontFamily: 'monospace', textAlign: 'left',
              color: 'var(--color-primary)', textDecoration: 'underline', textDecorationStyle: 'dotted',
            }}
          >
            {`> {...} ${flat.length} chars`}
          </button>
        );
      } },
  ];

  return (
    <div>
      <Row label="Basic sortable table" gap={0} code={`<DataTableView\n  columns={[\n    { key: 'method', label: 'Method', width: '80px' },\n    { key: 'path',   label: 'Path', sortable: true },\n    { key: 'status', label: 'Status', width: '80px', align: 'center' },\n  ]}\n  rows={requests}\n  keyField="id"\n  onRowClick={r => openRequest(r)}\n/>`}>
        <Block style={{ padding: 0, overflow: 'hidden', width: '100%' }}>
          <DataTableView columns={TABLE_COLS} rows={TABLE_ROWS} keyField="id" maxHeight="220px" onRowClick={r => alert(`Clicked: ${r.method} ${r.path}`)} />
        </Block>
      </Row>
      <Row label="Empty state" gap={0} code={`<DataTableView\n  columns={columns}\n  rows={[]}\n  keyField="id"\n  emptyTitle="No requests yet"\n  emptyMessage="Send a request to see the log here."\n/>`}>
        <Block style={{ padding: 0, overflow: 'hidden', width: '100%' }}>
          <DataTableView columns={TABLE_COLS} rows={[]} keyField="id" emptyTitle="No requests yet" emptyMessage="Send a request to see the log here." />
        </Block>
      </Row>

      <Row label="Audit Log — expandable rows (click ▶), drag bottom grip to resize, pill to adjust split" gap={0} code={`<DataTableView\n  columns={auditCols}\n  rows={auditRows}\n  keyField="id"\n  renderExpanded={row => (\n    <SplitPanelView\n      direction="horizontal"\n      first={<EditorView value={row.request} readOnly />}\n      second={<EditorView value={row.response} readOnly />}\n    />\n  )}\n/>`}>
        <Block style={{ padding: 0, width: '100%' }}>
          <DataTableView
            columns={AUDIT_COLS}
            rows={AUDIT_ROWS}
            keyField="id"
            renderExpanded={row => (
              <ResizablePanelView defaultHeight={220} minHeight={100} maxHeight={480} borderRadius={0}>
                <SplitPanelView
                  direction="horizontal"
                  defaultSplit={50}
                  minFirst={120}
                  minSecond={120}
                  style={{ height: '100%' }}
                  accentColor="var(--color-protocol-rest)"
                  first={
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ padding: '5px 12px', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-surface-border)', flexShrink: 0 }}>
                        Request
                      </div>
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <EditorView
                          value={(row.request as string | null) || '// No request body'}
                          language="json"
                          readOnly
                          height="100%"
                        />
                      </div>
                    </div>
                  }
                  second={
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ padding: '5px 12px', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-surface-border)', flexShrink: 0 }}>
                        Response
                      </div>
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <EditorView
                          value={(row.response as string | null) || '// No response body'}
                          language="json"
                          readOnly
                          height="100%"
                        />
                      </div>
                    </div>
                  }
                />
              </ResizablePanelView>
            )}
          />
        </Block>
      </Row>

      <Row label="DB Explorer — cells show JSON char count, click to open JSON Viewer modal" gap={0} code={`// Custom renderCell for clickable JSON preview\nconst cols = [\n  { key: 'key',   label: 'Key' },\n  { key: 'value', label: 'Value',\n    renderCell: r => <button onClick={() => openModal(r.value)}>{r.value.slice(0,40)}…</button> },\n];\n<DataTableView columns={cols} rows={settings} keyField="id" />`}>
        <Block style={{ padding: 0, overflow: 'hidden', width: '100%' }}>
          <DataTableView
            columns={DB_COLS}
            rows={DB_SETTINGS}
            keyField="id"
            maxHeight="200px"
          />
        </Block>
      </Row>

      {/* JSON Viewer modal */}
      <ModalView
        open={!!jsonModal}
        onClose={() => setJsonModal(null)}
        title="JSON Viewer"
        headerRight={jsonModal ? (
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
            {jsonModal.json.length.toLocaleString()} chars
          </span>
        ) : undefined}
        size="lg"
        noPadding
        elevated
      >
        {jsonModal && (
          <div style={{ height: 420 }}>
            <EditorView value={jsonModal.json} language="json" readOnly height="100%" />
          </div>
        )}
      </ModalView>
    </div>
  );
}

// ─── D1.33 — CodeBlockView ───────────────────────────────────────────────────

export function CodeBlockPanel() {
  return (
    <div>
      <Row label="JSON code block with line numbers + copy" gap={0} code={`<CodeBlockView\n  language="json"\n  code={responseBody}\n  showLineNumbers\n  showCopy\n/>`}>
        <Block style={{ padding: 0, overflow: 'hidden', width: '100%' }}>
          <CodeBlockView
            code={`{\n  "id": 42,\n  "name": "Alice",\n  "role": "admin"\n}`}
            language="json"
            showLineNumbers
          />
        </Block>
      </Row>
      <Row label="cURL snippet (no line numbers)" gap={0} code={`<CodeBlockView\n  language="bash"\n  code={\`curl -X POST https://api.example.com/users \\\\\n  -H 'Content-Type: application/json' \\\\\n  -d '{"name":"Alice"}'\`}\n/>`}>
        <Block style={{ padding: 0, overflow: 'hidden', width: '100%' }}>
          <CodeBlockView
            code={`curl -X POST https://api.example.com/users \\\n  -H 'Content-Type: application/json' \\\n  -d '{"name":"Alice"}'`}
            language="bash"
          />
        </Block>
      </Row>
      <Row label="Protocol colors" code={`<CodeBlockView code={query} language="graphql"  accentColor="var(--color-protocol-graphql)" />\n<CodeBlockView code={proto} language="protobuf" accentColor="var(--color-protocol-grpc)" />`}>
        <Block style={{ display: 'flex', gap: '8px', padding: '8px', flexWrap: 'wrap' }}>
          <CodeBlockView code={`query { users { id name } }`}      language="graphql"  accentColor="var(--color-protocol-graphql)"   style={{ flex: 1 }} />
          <CodeBlockView code={`message UserRequest { string id = 1; }`} language="protobuf" accentColor="var(--color-protocol-grpc)" style={{ flex: 1 }} />
        </Block>
      </Row>
    </div>
  );
}

// ─── D1.34 — AIButtonView ────────────────────────────────────────────────────

export function AIButtonPanel() {
  const [loading, setLoading] = useState(false);
  const simulate = () => { setLoading(true); setTimeout(() => setLoading(false), 1500); };
  return (
    <div>
      <Row label="Action variants" code={`<AIButtonView action="generate" />\n<AIButtonView action="fuzz" />\n<AIButtonView action="explain" />\n<AIButtonView action="fix" />\n<AIButtonView action="ask" />\n<AIButtonView action="suggest" />`}>
        <Block style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '16px', alignItems: 'center' }}>
          <AIButtonView action="generate" />
          <AIButtonView action="fuzz" />
          <AIButtonView action="explain" />
          <AIButtonView action="fix" />
          <AIButtonView action="ask" />
          <AIButtonView action="suggest" />
        </Block>
      </Row>
      <Row label="Loading state (click to simulate)" code={`<AIButtonView action="generate" loading={isGenerating} onClick={handleGenerate} />`}>
        <Block style={{ display: 'flex', gap: '8px', padding: '16px', alignItems: 'center' }}>
          <AIButtonView action="generate" loading={loading} onClick={simulate} />
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Click the button to see "Thinking…" for 1.5s</span>
        </Block>
      </Row>
      <Row label="Size scale — sm (24px) / xs (20px) / xxs (16px)" code={`<AIButtonView action="generate" size="sm" />\n<AIButtonView action="explain" size="xs" />\n<AIButtonView action="suggest" size="xxs" />`}>
        <Block style={{ display: 'flex', gap: '8px', padding: '16px', alignItems: 'center' }}>
          <AIButtonView action="generate" size="sm" />
          <AIButtonView action="explain" size="xs" />
          <AIButtonView action="suggest" size="xxs" />
        </Block>
      </Row>
      <Row label="compact prop → xs (20px)" code={`<AIButtonView action="generate" compact />\n<AIButtonView action="explain" compact />`}>
        <Block style={{ display: 'flex', gap: '8px', padding: '16px', alignItems: 'center' }}>
          <AIButtonView action="generate" compact />
          <AIButtonView action="explain" compact />
          <AIButtonView action="suggest" compact />
        </Block>
      </Row>
      <Row label="Protocol accent colors" code={`<AIButtonView action="generate" accentColor="var(--color-protocol-rest)" />\n<AIButtonView action="generate" accentColor="var(--color-protocol-graphql)" />\n<AIButtonView action="generate" accentColor="var(--color-protocol-grpc)" />`}>
        <Block style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '16px', alignItems: 'center' }}>
          {['var(--color-protocol-rest)', 'var(--color-protocol-graphql)', 'var(--color-protocol-grpc)', 'var(--color-protocol-soap)'].map(c => (
            <AIButtonView key={c} action="generate" accentColor={c} />
          ))}
        </Block>
      </Row>
    </div>
  );
}

// ─── D1.35 — SideNavView ─────────────────────────────────────────────────────

export function SideNavPanel() {
  const [active, setActive] = useState('collections');
  return (
    <div>
      <Row label="Collapsible sidebar — click toggle at bottom to collapse to icon-only" gap={0} code={`<SideNavView\n  items={[\n    { id: 'collections', label: 'Collections', icon: <FolderIcon size={14} /> },\n    { id: 'environments', label: 'Environments', icon: <GlobeIcon size={14} /> },\n    {\n      id: 'settings', label: 'Settings', icon: <SettingsIcon size={14} />,\n      children: [\n        { id: 'general', label: 'General' },\n        { id: 'themes',  label: 'Themes' },\n      ],\n    },\n  ]}\n  activeId={activeId}\n  onSelect={setActiveId}\n  defaultOpenIds={['settings']}\n/>`}>
        <Block style={{ padding: 0, overflow: 'hidden', height: 360, display: 'flex' }}>
          <SideNavView
            items={[
              { id: 'collections', label: 'Collections', icon: <FolderIcon size={14} /> },
              { id: 'environments', label: 'Environments', icon: <GlobeIcon size={14} /> },
              { id: 'history', label: 'History', icon: <ClockIcon size={14} /> },
              { id: 'search', label: 'Search', icon: <SearchIcon size={14} /> },
              {
                id: 'settings', label: 'Settings', icon: <SettingsIcon size={14} />,
                children: [
                  { id: 'general',   label: 'General',   icon: <SettingsIcon size={12} /> },
                  { id: 'themes',    label: 'Themes',    icon: <GlobeIcon size={12} /> },
                  { id: 'ai',        label: 'AI Config', icon: <SparkleIcon size={12} /> },
                ],
              },
            ]}
            activeId={active}
            onSelect={setActive}
            defaultOpenIds={['settings']}
          />
          <div style={{ flex: 1, padding: '16px', fontSize: '11px', color: 'var(--color-text-muted)', borderLeft: '1px solid var(--color-surface-border)' }}>
            Active: <strong style={{ color: 'var(--color-text-primary)' }}>{active}</strong>
          </div>
        </Block>
      </Row>
    </div>
  );
}

// ─── D1.36 — SettingsNavView ─────────────────────────────────────────────────

export function SettingsNavPanel() {
  const [active, setActive] = useState('general');
  return (
    <div>
      <Row label="Grouped settings navigation" gap={0} code={`<SettingsNavView\n  activeId={activeId}\n  onSelect={setActiveId}\n  groups={[\n    {\n      title: 'General',\n      items: [\n        { id: 'general',   label: 'General',   description: 'App preferences', icon: <SettingsIcon size={12} /> },\n        { id: 'shortcuts', label: 'Shortcuts',  badge: 'NEW' },\n      ],\n    },\n    {\n      title: 'AI & Copilot',\n      items: [\n        { id: 'ai-models', label: 'AI Models', icon: <SparkleIcon size={12} /> },\n      ],\n    },\n  ]}\n/>`}>
        <Block style={{ display: 'flex', gap: '0', padding: 0, overflow: 'hidden' }}>
          <div style={{ width: 220, borderRight: '1px solid var(--color-surface-border)', padding: '12px' }}>
            <SettingsNavView
              activeId={active}
              onSelect={setActive}
              groups={[
                {
                  title: 'General',
                  items: [
                    { id: 'general',    label: 'General',     description: 'App preferences',       icon: <SettingsIcon size={12} /> },
                    { id: 'themes',     label: 'Themes',      description: 'Colors & fonts',         icon: <GlobeIcon size={12} /> },
                    { id: 'shortcuts',  label: 'Shortcuts',   description: 'Keyboard bindings',      icon: <CodeIcon size={12} /> },
                  ],
                },
                {
                  title: 'AI & Copilot',
                  items: [
                    { id: 'ai-models',  label: 'AI Models',   description: 'Providers & API keys',   icon: <SparkleIcon size={12} />, badge: 'NEW' },
                    { id: 'ai-agents',  label: 'AI Agents',   description: 'Agent configurations',   icon: <ServerIcon size={12} /> },
                  ],
                },
                {
                  title: 'Advanced',
                  items: [
                    { id: 'proxy',      label: 'Proxy',       description: 'HTTP proxy settings',    icon: <NetworkIcon size={12} /> },
                    { id: 'mock',       label: 'Mock Server',                                         icon: <LayersIcon size={12} /> },
                  ],
                },
              ]}
            />
          </div>
          <div style={{ flex: 1, padding: '16px', fontSize: '11px', color: 'var(--color-text-muted)' }}>
            Active: <strong style={{ color: 'var(--color-text-primary)' }}>{active}</strong>
          </div>
        </Block>
      </Row>
    </div>
  );
}

// ─── D1.37 — ThemeCardSelectorView ───────────────────────────────────────────

export function ThemeCardSelectorPanel() {
  const [theme, setTheme] = useState('dark');
  return (
    <div>
      <Row label="Theme card picker" code={`<ThemeCardSelectorView\n  value={selectedTheme}\n  onChange={setTheme}\n  options={[\n    { value: 'dark',    label: 'Dark',    preview: { bg: '#1e1e1e', panel: '#252526', accent: '#0078d4', text: '#d4d4d4' } },\n    { value: 'light',   label: 'Light',   preview: { bg: '#f3f3f3', panel: '#ffffff', accent: '#0078d4', text: '#333333' } },\n    { value: 'monokai', label: 'Monokai', preview: { bg: '#272822', panel: '#3e3d32', accent: '#a6e22e', text: '#f8f8f2' } },\n  ]}\n/>`}>
        <ThemeCardSelectorView
          value={theme}
          onChange={setTheme}
          options={[
            { value: 'dark',  label: 'Dark',  description: 'Dark code-editor theme', preview: { bg: '#1e1e1e', panel: '#252526', accent: '#0078d4', text: '#d4d4d4' } },
            { value: 'light', label: 'Light', description: 'Light code-editor theme', preview: { bg: '#f3f3f3', panel: '#ffffff', accent: '#0078d4', text: '#333333' } },
            { value: 'monokai', label: 'Monokai', preview: { bg: '#272822', panel: '#3e3d32', accent: '#a6e22e', text: '#f8f8f2' } },
            { value: 'nord', label: 'Nord', preview: { bg: '#2e3440', panel: '#3b4252', accent: '#88c0d0', text: '#eceff4' } },
          ]}
        />
      </Row>
      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Selected: <strong>{theme}</strong></div>
    </div>
  );
}

// ─── D1.38 — FeatureCategoryView ─────────────────────────────────────────────

export function FeatureCategoryPanel() {
  const [restFeatures, setRestFeatures] = useState([
    { id: 'autoSave',    label: 'Auto-save',           description: 'Automatically save requests on change', enabled: true  },
    { id: 'aiSuggest',   label: 'AI Suggestions',      description: 'Show AI completions in the URL bar',     enabled: false },
    { id: 'responseFmt', label: 'Response Formatting', description: 'Auto-format JSON / XML responses',        enabled: true  },
    { id: 'history',     label: 'Request History',     description: 'Track all sent requests',                 enabled: true  },
  ]);
  const [aiFeatures, setAiFeatures] = useState([
    { id: 'explain', label: 'Explain Response', description: 'Let AI explain API responses',        enabled: true  },
    { id: 'fuzz',    label: 'Fuzz Testing',     description: 'AI-generated edge case tests',        enabled: false },
    { id: 'suggest', label: 'Smart Suggest',    description: 'Autocomplete headers and params',     enabled: true  },
    { id: 'audit',   label: 'Audit Logging',    description: 'Log all AI interactions to console',  enabled: false },
  ]);

  const toggleRest = (id: string) => setRestFeatures(fs => fs.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  const toggleAi   = (id: string) => setAiFeatures(fs => fs.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));

  const allAiEnabled = aiFeatures.every(f => f.enabled);
  const toggleAllAi  = (on: boolean) => setAiFeatures(fs => fs.map(f => ({ ...f, enabled: on })));

  return (
    <div>
      <Row label="With category toggle (right end) — turns ALL children on / off" gap={12} code={`<FeatureCategoryView\n  categoryLabel="AI Features"\n  categoryColor="var(--color-protocol-ai)"\n  categoryEnabled={allEnabled}\n  onCategoryToggle={enabled => toggleAll(enabled)}\n  features={features.map(f => ({ ...f, onToggle: () => toggle(f.id) }))}\n/>`}>
        <FeatureCategoryView
          categoryLabel="AI Features"
          categoryColor="var(--color-protocol-ai)"
          defaultExpanded
          categoryEnabled={allAiEnabled}
          onCategoryToggle={toggleAllAi}
          style={{ width: '100%' }}
          features={aiFeatures.map(f => ({ ...f, onToggle: () => toggleAi(f.id) }))}
        />
      </Row>
      <Row label="Without category toggle — individual row toggles only" gap={12} code={`<FeatureCategoryView\n  categoryLabel="REST Features"\n  categoryColor="var(--color-protocol-rest)"\n  features={features.map(f => ({ ...f, onToggle: () => toggle(f.id) }))}\n/>`}>
        <FeatureCategoryView
          categoryLabel="REST Features"
          categoryColor="var(--color-protocol-rest)"
          defaultExpanded
          style={{ width: '100%' }}
          features={restFeatures.map(f => ({ ...f, onToggle: () => toggleRest(f.id) }))}
        />
      </Row>
    </div>
  );
}

// ─── D1.39 — TagInputView ────────────────────────────────────────────────────

export function TagInputPanel() {
  const [tags1, setTags1] = useState(['rest', 'auth', 'v2']);
  const [tags2, setTags2] = useState<string[]>([]);
  return (
    <div>
      <Row label="Tag input — type and press Enter or comma to add" gap={0} code={`const [tags, setTags] = useState(['rest', 'auth', 'v2']);\n\n<TagInputView\n  tags={tags}\n  onChange={setTags}\n  accentColor="var(--color-protocol-rest)"\n/>`}>
        <Block style={{ width: '100%', maxWidth: 400 }}>
          <TagInputView tags={tags1} onChange={setTags1} accentColor="var(--color-protocol-rest)" />
        </Block>
      </Row>
      <Row label="Empty state (placeholder)" code={`<TagInputView\n  tags={[]}  onChange={setTags}\n  placeholder="Add environment tags…"\n  accentColor="var(--color-protocol-graphql)"\n/>`}>
        <Block style={{ width: '100%', maxWidth: 400 }}>
          <TagInputView tags={tags2} onChange={setTags2} placeholder="Add environment tags…" accentColor="var(--color-protocol-graphql)" />
        </Block>
      </Row>
      <Row label="With max tags (3)" code={`// maxTags prevents adding beyond the limit\n<TagInputView\n  tags={['tag1', 'tag2', 'tag3']}\n  onChange={setTags}\n  maxTags={3}\n  accentColor="var(--color-warning)"\n/>`}>
        <Block style={{ width: '100%', maxWidth: 400 }}>
          <TagInputView tags={['tag1', 'tag2', 'tag3']} onChange={() => {}} maxTags={3} accentColor="var(--color-warning)" />
        </Block>
      </Row>
      <Row label="Disabled" code={`<TagInputView\n  tags={['read-only', 'disabled']}\n  onChange={() => {}}\n  disabled\n/>`}>
        <Block style={{ width: '100%', maxWidth: 400 }}>
          <TagInputView tags={['read-only', 'disabled']} onChange={() => {}} disabled />
        </Block>
      </Row>
    </div>
  );
}

// ─── D1.40 — BottomPanelView ─────────────────────────────────────────────────

export function BottomPanelPanel() {
  return (
    <div>
      <Row label="DevTools-style bottom panel — drag to resize, click tab to collapse" gap={0} code={`<BottomPanelView\n  defaultHeight={120}\n  tabs={[\n    { id: 'console', label: 'Console', icon: <TerminalIcon size={11} />, content: <ConsoleOutput /> },\n    { id: 'network', label: 'Network', icon: <NetworkIcon size={11} />,  content: <NetworkLog /> },\n    { id: 'output',  label: 'Output',  icon: <OutputIcon size={11} />,   content: <OutputLog /> },\n  ]}\n/>`}>
        <Block style={{ padding: 0, overflow: 'hidden', height: 280, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: '12px 14px', fontSize: '11px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ opacity: 0.4 }}>▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓</span>
            <span>Request / Response area</span>
          </div>
          <BottomPanelView
            defaultHeight={120}
            tabs={[
              { id: 'console', label: 'Console', icon: <TerminalIcon size={11} />, content: <pre style={{ margin: 0, padding: '8px 12px', fontSize: '11px', color: 'var(--color-success)', fontFamily: 'monospace', lineHeight: 1.6 }}>{'[GET] /api/users → 200 OK (142ms)\n[POST] /api/auth → 201 Created (89ms)\n[DELETE] /api/session → 204 No Content (34ms)'}</pre> },
              { id: 'network', label: 'Network',  icon: <NetworkIcon size={11} />, content: <div style={{ padding: '8px 12px', fontSize: '11px', color: 'var(--color-text-muted)' }}>No network activity recorded.</div> },
              { id: 'output',  label: 'Output',   icon: <OutputIcon size={11} />,  content: <div style={{ padding: '8px 12px', fontSize: '11px', color: 'var(--color-text-muted)' }}>Extension output stream is empty.</div> },
            ]}
          />
        </Block>
      </Row>

      <Row label="Collapsed by default — click any tab label to expand" gap={0} code={`<BottomPanelView\n  defaultCollapsed={true}\n  defaultHeight={160}\n  tabs={[\n    { id: 'logs', label: 'Logs', content: <LogOutput /> },\n    { id: 'ai',   label: 'AI',   content: <AIOutput /> },\n  ]}\n/>`}>
        <Block style={{ padding: 0, overflow: 'hidden', height: 200, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: '12px 14px', fontSize: '11px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ opacity: 0.4 }}>▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓</span>
            <span>Main content area</span>
          </div>
          <BottomPanelView
            defaultCollapsed={true}
            defaultHeight={160}
            tabs={[
              { id: 'logs', label: 'Logs', icon: <DocumentIcon size={11} />, content: <pre style={{ margin: 0, padding: '8px 12px', fontSize: '11px', color: 'var(--color-text-secondary)', fontFamily: 'monospace', lineHeight: 1.6 }}>{'[INFO] Mock server started on :7070\n[WARN] No matching rule for GET /api/foo\n[INFO] Rule matched → 200 {"status":"ok"}'}</pre> },
              { id: 'ai',   label: 'AI',   icon: <SparkleIcon size={11} />,  content: <div style={{ padding: '8px 12px', fontSize: '11px', color: 'var(--color-text-muted)' }}>AI output will appear here after a request is sent.</div> },
            ]}
          />
        </Block>
      </Row>

      <Row label="Accent color — tab indicator inherits protocol color" gap={0} code={`<BottomPanelView\n  accentColor="var(--color-protocol-rest)"\n  defaultHeight={100}\n  tabs={[\n    { id: 'response', label: 'Response', content: <ResponseBody /> },\n    { id: 'headers',  label: 'Headers',  content: <ResponseHeaders /> },\n  ]}\n/>`}>
        <Block style={{ padding: 0, overflow: 'hidden', height: 220, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: '12px 14px', fontSize: '11px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ opacity: 0.4 }}>▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓</span>
            <span>Request editor</span>
          </div>
          <BottomPanelView
            accentColor="var(--color-protocol-rest)"
            defaultHeight={100}
            tabs={[
              { id: 'response', label: 'Response', icon: <CodeBracketsIcon size={11} />, content: <pre style={{ margin: 0, padding: '8px 12px', fontSize: '11px', color: 'var(--color-text-primary)', fontFamily: 'monospace', lineHeight: 1.6 }}>{'{\n  "id": 42,\n  "name": "Alice",\n  "role": "admin"\n}'}</pre> },
              { id: 'headers',  label: 'Headers',  icon: <LayersIcon size={11} />,       content: <pre style={{ margin: 0, padding: '8px 12px', fontSize: '11px', color: 'var(--color-text-secondary)', fontFamily: 'monospace', lineHeight: 1.6 }}>{'content-type: application/json\nx-request-id: a1b2c3d4'}</pre> },
            ]}
          />
        </Block>
      </Row>
    </div>
  );
}

// ─── D1.41 — ToastView ───────────────────────────────────────────────────────

export function ToastPanel() {
  const [toasts, setToasts] = useState<Array<{ id: string; variant: 'success' | 'error' | 'warning' | 'info'; title: string; message?: string; duration?: number }>>([]);
  const dismiss = (id: string) => setToasts(ts => ts.filter(t => t.id !== id));
  const add = (variant: 'success' | 'error' | 'warning' | 'info', title: string, message?: string) => {
    const id = `${Date.now()}`;
    setToasts(ts => [...ts, { id, variant, title, message, duration: 5000 }]);
  };
  return (
    <div>
      <Row label="Toast notifications — click to trigger each type" code={`const { toast } = useToast();\n\n// Success\ntoast({ message: 'Request saved', variant: 'success' });\n// Error\ntoast({ message: 'Connection failed', variant: 'error', duration: 5000 });\n// Warning\ntoast({ message: 'Rate limit exceeded', variant: 'warning' });\n// Info\ntoast({ message: 'Token refreshed', variant: 'info' });`}>
        <Block style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '16px' }}>
          <button type="button" onClick={() => add('success', 'Request saved', 'GET /api/users saved to collection.')} style={{ padding: '6px 12px', borderRadius: 5, border: '1px solid var(--color-success)', background: 'color-mix(in srgb, var(--color-success) 12%, transparent)', cursor: 'pointer', color: 'var(--color-success)', fontSize: '12px' }}>✓ Success</button>
          <button type="button" onClick={() => add('error', 'Request failed', 'Connection refused on port 8080.')} style={{ padding: '6px 12px', borderRadius: 5, border: '1px solid var(--color-error)', background: 'color-mix(in srgb, var(--color-error) 12%, transparent)', cursor: 'pointer', color: 'var(--color-error)', fontSize: '12px' }}>✕ Error</button>
          <button type="button" onClick={() => add('warning', 'Rate limit exceeded', 'Slow down — 429 Too Many Requests.')} style={{ padding: '6px 12px', borderRadius: 5, border: '1px solid var(--color-warning)', background: 'color-mix(in srgb, var(--color-warning) 12%, transparent)', cursor: 'pointer', color: 'var(--color-warning)', fontSize: '12px' }}>⚠ Warning</button>
          <button type="button" onClick={() => add('info', 'Auth token refreshed', 'Bearer token valid for 60 minutes.')} style={{ padding: '6px 12px', borderRadius: 5, border: '1px solid var(--color-primary)', background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)', cursor: 'pointer', color: 'var(--color-primary)', fontSize: '12px' }}>ℹ Info</button>
        </Block>
      </Row>
      <ToastView toasts={toasts} onDismiss={dismiss} position="bottom-right" />
    </div>
  );
}

// ─── D1.42 — PromptCardView (single row card) ────────────────────────────────

export function PromptCardPanel() {
  const [selected, setSelected] = useState<string | null>('p1');
  return (
    <div>
      <Row label="PromptCardView — single row card with avatar, badges, hover actions" code={`<PromptCardView\n  id="p1"\n  title="REST API Agent"\n  description="Builds structured HTTP requests from natural language"\n  content={description}\n  protocol="REST"\n  protocolColor="var(--color-protocol-rest)"\n  selected={activeId === 'p1'}\n  onUse={id => setActive(id)}\n  onCopy={id => copyPrompt(id)}\n  onEdit={id => openEditor(id)}\n  onDelete={id => deletePrompt(id)}\n/>`}>
        <div style={{ width: '100%', border: '1px solid var(--color-surface-border)', borderRadius: 8, overflow: 'hidden', background: 'var(--color-panel)' }}>
          {[
            { id: 'p1', title: 'REST API Agent',          description: 'Builds structured HTTP requests from natural language',   protocol: 'REST', protocolColor: 'var(--color-protocol-rest)',    hasAll: true  },
            { id: 'p2', title: 'Explain GraphQL response', description: 'Explains each field and identifies potential issues',     protocol: 'GQL',  protocolColor: 'var(--color-protocol-graphql)', hasAll: false },
            { id: 'p3', title: 'Mock server rule',         description: 'Generates Daakia mock rule with fault injection',         protocol: 'MOCK', protocolColor: 'var(--color-protocol-ai)',      hasAll: false },
            { id: 'p4', title: 'Generate test assertions', description: 'Creates dk.test() assertions from response body',        protocol: 'REST', protocolColor: 'var(--color-protocol-rest)',    hasAll: true, isCustom: true },
            { id: 'p5', title: 'cURL Agent',               description: 'Converts cURL commands to structured Daakia requests',   protocol: 'REST', protocolColor: 'var(--color-protocol-rest)',    hasAll: false },
          ].map(item => (
            <PromptCardView
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              content={item.description}
              protocol={item.protocol}
              protocolColor={item.protocolColor}
              isCustom={(item as any).isCustom}
              selected={selected === item.id}
              onUse={id => setSelected(id)}
              onEdit={item.hasAll ? id => alert(`Edit ${id}`) : undefined}
              onCopy={id => alert(`Copy ${id}`)}
              onDelete={item.hasAll ? id => alert(`Delete ${id}`) : undefined}
            />
          ))}
        </div>
      </Row>
    </div>
  );
}

// ─── D1.43 — PromptLibraryListView + PromptLibraryEditorView ─────────────────

const DEMO_SECTIONS: PromptLibrarySection[] = [
  {
    id: 'agents',
    title: 'Agent Prompts',
    categories: [
      {
        id: 'request-building',
        title: 'Request Building',
        items: [
          { id: 'rest-agent',    title: 'REST API Agent',    description: 'Builds structured HTTP requests from natural language',    avatarColor: '#6366f1', protocol: 'REST', protocolColor: 'var(--color-protocol-rest)' },
          { id: 'curl-agent',    title: 'cURL Agent',        description: 'Converts cURL commands to structured Daakia requests',    avatarColor: '#f59e0b', protocol: 'REST', protocolColor: 'var(--color-protocol-rest)' },
        ],
      },
      {
        id: 'mock-testing',
        title: 'Mock & Testing',
        items: [
          { id: 'mock-agent',    title: 'Mock Server Agent', description: 'Designs mock API endpoints with realistic data',          avatarColor: '#8b5cf6', protocol: 'MOCK', protocolColor: 'var(--color-protocol-ai)' },
          { id: 'test-agent',    title: 'Test Script Agent', description: 'Generates dk.* test assertions for API responses',        avatarColor: '#10b981', protocol: 'TEST', protocolColor: 'var(--color-protocol-websocket)' },
        ],
      },
      {
        id: 'knowledge',
        title: 'Knowledge & Chat',
        items: [
          { id: 'knowledge-agent', title: 'Knowledge Agent', description: 'Explains HTTP status codes, headers, and API patterns',   avatarColor: '#06b6d4', protocol: 'REST', protocolColor: 'var(--color-protocol-rest)' },
          { id: 'general-agent',   title: 'General Assistant', description: 'Fallback conversational assistant for API workflows',   avatarColor: '#ec4899', protocol: 'AI',   protocolColor: 'var(--color-protocol-ai)' },
        ],
      },
    ],
  },
  {
    id: 'ai-actions',
    title: 'AI Actions',
    categories: [
      {
        id: 'response-diagnostics',
        title: 'Response & Diagnostics',
        items: [
          { id: 'ask-ai-why',    title: 'Ask AI Why (Error Diagnosis)', description: 'Prompt used when "Ask AI why" is clicked on a failed response', avatarColor: '#ef4444', isCustom: false },
          { id: 'explain-ai',    title: 'Explain with AI',              description: 'Prompt used when "Explain" is clicked on response body',         avatarColor: '#3b82f6', isCustom: false },
          { id: 'followup-ai',   title: 'Follow-up with AI',            description: 'Prompt used when "Follow-up Requests" is triggered',             avatarColor: '#06b6d4', isCustom: false },
          { id: 'generate-test', title: 'Generate test assertions',     description: 'Creates dk.test() assertions from response body',                avatarColor: '#6366f1', isCustom: true },
        ],
      },
      {
        id: 'rest-toolkit',
        title: 'REST Toolkit',
        items: [
          { id: 'suggest-headers', title: 'Suggest Headers', description: 'User prompt sent when "Suggest headers" is clicked in REST request', avatarColor: '#8b5cf6' },
          { id: 'generate-body',   title: 'Generate Body',   description: 'Generates request body from schema or description',                   avatarColor: '#f59e0b', isCustom: true },
        ],
      },
    ],
  },
];

const TABS: PromptLibraryEditorTab[] = [
  { id: 'system', label: 'System', icon: <SystemIcon size={12} /> },
  { id: 'user',   label: 'User',   icon: <UserPromptIcon size={12} /> },
];

const DEMO_EDITOR_CONTENT: Record<string, { title: string; description: string; triggerLabel: string; avatarColor: string; isCustom?: boolean; variables: string[]; system: string; user: string }> = {
  'rest-agent': {
    title: 'REST API Agent',
    description: 'Builds structured HTTP requests from natural language',
    triggerLabel: 'Daakia AI chat → "Build Request" intent · triggered when asking AI to create or modify an HTTP request',
    avatarColor: '#6366f1',
    variables: ['{{userIntent}}', '{{currentUrl}}', '{{currentMethod}}', '{{envVars}}', '{{headers}}', '{{baseUrl}}'],
    system: `You are a REST API request builder for the Daakia API client.\n\nThe user wants: {{userIntent}}\nActive URL: {{currentUrl}}\nHTTP Method: {{currentMethod}}\nEnvironment variables: {{envVars}}\nCurrent headers: {{headers}}\n\nYour task:\n1. Determine the correct HTTP method, URL, headers, and body\n2. Return a structured JSON response with the request configuration\n3. Use environment variable references like {{baseUrl}} where appropriate\n4. Include Content-Type headers when a body is present\n5. Provide a brief explanation of what the request does\n\nReturn valid JSON with keys: method, url, headers, body, explanation`,
    user: `{{userIntent}}`,
  },
  'curl-agent': {
    title: 'cURL Agent',
    description: 'Converts cURL commands to structured Daakia requests',
    triggerLabel: 'Daakia AI chat → "Convert cURL" intent · triggered when pasting a cURL command into the AI chat',
    avatarColor: '#f59e0b',
    variables: ['{{curlCommand}}', '{{envVars}}'],
    system: `You are a cURL command converter for the Daakia API client.\n\ncURL command: {{curlCommand}}\nEnvironment variables: {{envVars}}\n\nConvert this cURL command to a structured Daakia request:\n1. Extract the HTTP method (from -X flag or infer from -d)\n2. Parse all headers (-H flags)\n3. Extract the request body (-d, --data, --data-raw)\n4. Identify the URL\n5. Replace hardcoded values with environment variable references where sensible\n\nReturn JSON with: method, url, headers (key-value pairs), body, and notes about assumptions.`,
    user: `Convert this cURL command:\n{{curlCommand}}\n\nAvailable environment variables:\n{{envVars}}`,
  },
  'mock-agent': {
    title: 'Mock Server Agent',
    description: 'Designs mock API endpoints with realistic data',
    triggerLabel: 'Daakia AI chat → "Create mock" intent · triggered when setting up mock server routes',
    avatarColor: '#8b5cf6',
    variables: ['{{routePath}}', '{{httpMethod}}', '{{schemaHint}}', '{{delay}}'],
    system: `You are a mock server designer for the Daakia API client.\n\nRoute: {{httpMethod}} {{routePath}}\nSchema hint: {{schemaHint}}\nResponse delay: {{delay}}ms\n\nDesign a realistic mock response:\n1. Match the expected data structure from the schema hint\n2. Use realistic fake data (names, emails, IDs)\n3. Include appropriate HTTP status codes and headers\n4. Add variability for list endpoints (3-7 items)\n\nReturn JSON with: statusCode, headers, body (as JSON object), delay.`,
    user: `Create a mock response for {{httpMethod}} {{routePath}}.\n\nSchema: {{schemaHint}}`,
  },
  'test-agent': {
    title: 'Test Script Agent',
    description: 'Generates dk.* test assertions for API responses',
    triggerLabel: 'Daakia AI chat → "Generate tests" context menu on response panel',
    avatarColor: '#10b981',
    variables: ['{{responseBody}}', '{{statusCode}}', '{{responseTime}}', '{{headers}}'],
    system: `You are a test script generator for the Daakia API client.\n\nResponse received:\n- Status: {{statusCode}}\n- Time: {{responseTime}}ms\n- Headers: {{headers}}\n- Body: {{responseBody}}\n\nGenerate dk.test() assertions using Daakia's test DSL.\nCover: status code, response time, body structure, data types, and business logic.`,
    user: `Generate test assertions for this response:\nStatus: {{statusCode}}\nBody: {{responseBody}}`,
  },
  'knowledge-agent': {
    title: 'Knowledge Agent',
    description: 'Explains HTTP status codes, headers, and API patterns',
    triggerLabel: 'Daakia AI chat → conversational mode · triggered on general API questions',
    avatarColor: '#06b6d4',
    variables: ['{{userQuestion}}', '{{context}}'],
    system: `You are a helpful API knowledge assistant embedded in Daakia.\n\nUser question: {{userQuestion}}\nContext: {{context}}\n\nProvide concise, accurate answers about:\n- HTTP status codes and their meanings\n- Common request/response headers\n- REST API design patterns\n- Authentication methods (Bearer, API Key, OAuth)\n- JSON schema concepts\n\nKeep answers focused and practical. Include code examples where helpful.`,
    user: `{{userQuestion}}`,
  },
  'general-agent': {
    title: 'General Assistant',
    description: 'Fallback conversational assistant for API workflows',
    triggerLabel: 'Daakia AI chat → fallback mode · triggered when no specific intent is matched',
    avatarColor: '#ec4899',
    variables: ['{{userMessage}}', '{{activeProtocol}}', '{{activeUrl}}'],
    system: `You are a general-purpose assistant for the Daakia API client.\n\nActive protocol: {{activeProtocol}}\nActive endpoint: {{activeUrl}}\n\nHelp the user with any API-related task. You have access to the current request context.\nIf the user's intent maps to a specific action (build request, convert cURL, generate tests), suggest it.`,
    user: `{{userMessage}}`,
  },
  'ask-ai-why': {
    title: 'Ask AI Why (Error Diagnosis)',
    description: 'Prompt used when "Ask AI why" is clicked on a failed response',
    triggerLabel: 'Response panel → "Ask AI why" button · triggered on 4xx/5xx status codes',
    avatarColor: '#ef4444',
    variables: ['{{statusCode}}', '{{responseBody}}', '{{requestUrl}}', '{{requestMethod}}', '{{requestHeaders}}', '{{requestBody}}'],
    system: `You are an API error diagnostic assistant.\n\nFailed request:\n- Method: {{requestMethod}} {{requestUrl}}\n- Request headers: {{requestHeaders}}\n- Request body: {{requestBody}}\n- Response status: {{statusCode}}\n- Response body: {{responseBody}}\n\nDiagnose the error:\n1. Explain what the {{statusCode}} status code means in this context\n2. Identify the likely root cause from the response body\n3. Suggest 2-3 concrete fixes the user can try\n4. Show corrected request if applicable`,
    user: `Why did I get a {{statusCode}} error?\n\nURL: {{requestUrl}}\nResponse: {{responseBody}}`,
  },
  'explain-ai': {
    title: 'Explain with AI',
    description: 'Prompt used when "Explain" is clicked on response body',
    triggerLabel: 'Response panel → "Explain" context menu · triggered on any response body',
    avatarColor: '#3b82f6',
    variables: ['{{responseBody}}', '{{requestUrl}}', '{{statusCode}}'],
    system: `You are an API response explainer.\n\nEndpoint: {{requestUrl}}\nStatus: {{statusCode}}\nResponse body: {{responseBody}}\n\nExplain this response in plain English:\n1. What each top-level field means\n2. Any notable patterns or conventions (pagination, error format, etc.)\n3. How this data might be used by a client application\n\nKeep the explanation concise and developer-friendly.`,
    user: `Explain this API response from {{requestUrl}}:\n{{responseBody}}`,
  },
  'followup-ai': {
    title: 'Follow-up with AI',
    description: 'Prompt used when "Follow-up Requests" is triggered',
    triggerLabel: 'Response panel → "Follow-up" action · triggered after reviewing a response',
    avatarColor: '#06b6d4',
    variables: ['{{responseBody}}', '{{requestUrl}}', '{{requestMethod}}', '{{userIntent}}'],
    system: `You are a follow-up request builder for the Daakia API client.\n\nPrevious request: {{requestMethod}} {{requestUrl}}\nResponse received: {{responseBody}}\nUser wants to: {{userIntent}}\n\nBuild the next logical API request based on the previous response.\nExtract relevant IDs or tokens from {{responseBody}} for use in the follow-up URL or body.`,
    user: `Based on the previous response, I want to {{userIntent}}.\n\nPrevious response: {{responseBody}}`,
  },
  'generate-test': {
    title: 'Generate test assertions',
    description: 'Creates dk.test() assertions from response body',
    triggerLabel: 'Daakia AI chat → "Generate tests" context menu on response panel',
    avatarColor: '#6366f1',
    isCustom: true,
    variables: ['{{responseBody}}', '{{statusCode}}', '{{headers}}'],
    system: `You are a test assertion generator for the Daakia API client.\nGenerate dk.test() assertions from the API response.`,
    user: `Response status: {{statusCode}}\nResponse headers: {{headers}}\nResponse body:\n{{responseBody}}\n\nGenerate comprehensive dk.test() assertions covering:\n- Status code validation\n- Key field presence\n- Data type checks\n- Business logic assertions`,
  },
  'suggest-headers': {
    title: 'Suggest Headers',
    description: 'Suggests appropriate headers for the current request',
    triggerLabel: 'REST request panel → "Suggest headers" button',
    avatarColor: '#8b5cf6',
    variables: ['{{currentUrl}}', '{{currentMethod}}', '{{currentBody}}', '{{envVars}}'],
    system: `You are a request header advisor for the Daakia API client.\n\nRequest: {{currentMethod}} {{currentUrl}}\nBody: {{currentBody}}\nEnvironment: {{envVars}}\n\nSuggest appropriate HTTP headers:\n1. Always include Content-Type when there is a body\n2. Include Accept headers based on expected response format\n3. Suggest Authorization header format if the URL suggests authentication\n4. Include Cache-Control for GET requests where caching makes sense\n\nReturn JSON array of { name, value, reason } objects.`,
    user: `What headers should I add to this {{currentMethod}} request to {{currentUrl}}?`,
  },
  'generate-body': {
    title: 'Generate Body',
    description: 'Generates request body from schema or description',
    triggerLabel: 'REST request panel → "Generate body" AI action',
    avatarColor: '#f59e0b',
    isCustom: true,
    variables: ['{{userIntent}}', '{{currentUrl}}', '{{currentMethod}}', '{{schemaOrHint}}'],
    system: `You are a request body generator for the Daakia API client.\n\nEndpoint: {{currentMethod}} {{currentUrl}}\nUser wants: {{userIntent}}\nSchema/hint: {{schemaOrHint}}\n\nGenerate a realistic, valid request body:\n1. Match the expected schema from {{schemaOrHint}}\n2. Use sensible realistic values (not foo/bar/test)\n3. Include all required fields\n4. Format as valid JSON\n\nReturn only the JSON body, no explanation.`,
    user: `Generate a request body for {{currentMethod}} {{currentUrl}}.\n\nIntent: {{userIntent}}\nSchema: {{schemaOrHint}}`,
  },
};

export function PromptLibraryPanel() {
  const [activeId, setActiveId] = useState<string>('curl-agent');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('system');
  const [viewMode, setViewMode] = useState<'preview' | 'edit'>('preview');
  const [contents, setContents] = useState<Record<string, { system: string; user: string }>>({});

  const editorData = DEMO_EDITOR_CONTENT[activeId];
  const contentKey = activeTab === 'system' ? 'system' : 'user';
  const rawContent = editorData
    ? (contents[activeId]?.[contentKey] ?? editorData[contentKey])
    : '';
  const [isDirty, setIsDirty] = useState(false);

  const handleSelect = (id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    setActiveTab('system');
    setViewMode('preview');
    setIsDirty(false);
  };

  const handleContentChange = (val: string) => {
    setContents(prev => ({
      ...prev,
      [activeId]: { ...(prev[activeId] ?? { system: editorData?.system ?? '', user: editorData?.user ?? '' }), [contentKey]: val },
    }));
    setIsDirty(true);
  };

  const handleSave = () => setIsDirty(false);

  return (
    <div>
      <Row label="PromptLibraryListView + PromptLibraryEditorView — full split view ditto Daakia" gap={0} code={`// Left panel\n<PromptLibraryListView\n  sections={sections}        // PromptLibrarySection[]\n  activeId={activeId}\n  onSelect={setActiveId}\n  search={search}\n  onSearchChange={setSearch}\n/>\n\n// Right panel\n<PromptLibraryEditorView\n  title={item.title}\n  description={item.description}\n  triggerLabel={item.triggerLabel}\n  avatarColor={item.avatarColor}\n  variables={[{ pill: '{{curlCommand}}', insert: '{{curlCommand}}' }]}\n  tabs={[{ id: 'system', label: 'System' }, { id: 'user', label: 'User' }]}\n  activeTabId={activeTab}\n  onTabChange={setActiveTab}\n  content={content}\n  onContentChange={setContent}\n  viewMode={viewMode}\n  onViewModeChange={setViewMode}\n  isDirty={dirty}\n  onSave={handleSave}\n/>`}>
        <Block style={{ padding: 0, overflow: 'hidden', width: '100%', height: 520, display: 'flex' }}>
          {/* Left: list panel */}
          <div style={{ width: 260, flexShrink: 0, borderRight: '1px solid var(--color-surface-border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <PromptLibraryListView
              sections={DEMO_SECTIONS}
              activeId={activeId}
              onSelect={handleSelect}
              search={search}
              onSearchChange={setSearch}
            />
          </div>
          {/* Right: editor panel */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {editorData ? (
              <PromptLibraryEditorView
                key={activeId}
                title={editorData.title}
                description={editorData.description}
                triggerLabel={editorData.triggerLabel}
                avatarColor={editorData.avatarColor}
                isCustom={editorData.isCustom}
                isDirty={isDirty}
                variables={editorData.variables.map(v => ({ pill: v, insert: v, title: `Variable: ${v}` }))}
                tabs={TABS}
                activeTabId={activeTab}
                onTabChange={id => { setActiveTab(id); setViewMode('preview'); }}
                content={rawContent}
                onContentChange={handleContentChange}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onSave={handleSave}
              />
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: 12 }}>
                Select a prompt to edit
              </div>
            )}
          </div>
        </Block>
      </Row>
    </div>
  );
}

// ─── E6.176 — SearchInputView ─────────────────────────────────────────────────

export function SearchInputPanel() {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  return (
    <div>
      <Row label="With prefix icon + clear suffix" code={`<SearchInputView\n  value={q}\n  onChange={setQ}\n  placeholder="Search collections…"\n  prefix={<SearchIcon size={11} />}\n  suffix={q ? <button onClick={() => setQ('')}><XIcon size={10} /></button> : null}\n/>`}>
        <SearchInputView
          value={q1}
          onChange={setQ1}
          placeholder="Search collections…"
          prefix={<SearchIcon size={11} />}
          suffix={q1 ? (
            <button type="button" onClick={() => setQ1('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', color: 'var(--color-text-muted)' }}>
              <CloseIcon size={10} />
            </button>
          ) : null}
          style={{ maxWidth: 280 }}
        />
        <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>Type to see clear button</span>
      </Row>
      <Row label="No prefix / suffix" code={`<SearchInputView value={q} onChange={setQ} placeholder="Filter by name…" />`}>
        <SearchInputView value={q2} onChange={setQ2} placeholder="Filter by name…" style={{ maxWidth: 240 }} />
      </Row>
      <Row label="Custom heights — 24px / 28px (default) / 32px" code={`<SearchInputView value="" onChange={() => {}} placeholder="24px" height={24} />\n<SearchInputView value="" onChange={() => {}} placeholder="28px (default)" />\n<SearchInputView value="" onChange={() => {}} placeholder="32px" height={32} />`}>
        <SearchInputView value="" onChange={() => {}} placeholder="24px" height={24} prefix={<SearchIcon size={10} />} style={{ maxWidth: 180 }} />
        <SearchInputView value="" onChange={() => {}} placeholder="28px (default)" height={28} prefix={<SearchIcon size={11} />} style={{ maxWidth: 200 }} />
        <SearchInputView value="" onChange={() => {}} placeholder="32px" height={32} prefix={<SearchIcon size={12} />} style={{ maxWidth: 220 }} />
      </Row>
    </div>
  );
}

// ─── E6.176 — DurationInputView ───────────────────────────────────────────────

export function DurationInputPanel() {
  const [v1, setV1] = useState(0);
  const [v2, setV2] = useState(5000);
  const [v3, setV3] = useState(120000);
  return (
    <div>
      <Row label="Default (starts at 0 ms)" align="flex-start" code={`<DurationInputView value={timeout} onChange={setTimeout} />\n// value is always in milliseconds\n// unit dropdown: ms → s → m → hr`}>
        <DurationInputView value={v1} onChange={setV1} />
        <span style={{ fontSize: 11, color: 'var(--color-text-muted)', alignSelf: 'center' }}>= {v1} ms</span>
      </Row>
      <Row label="Pre-set to 5 s — click unit dropdown to switch" align="flex-start" code={`// 5 seconds = 5000 ms\n<DurationInputView value={5000} onChange={v => console.log(v + 'ms')} />`}>
        <DurationInputView value={v2} onChange={setV2} />
        <span style={{ fontSize: 11, color: 'var(--color-text-muted)', alignSelf: 'center' }}>= {v2} ms</span>
      </Row>
      <Row label="Pre-set to 2 m" align="flex-start" code={`// 2 minutes = 120000 ms\n<DurationInputView value={120000} onChange={setTimeout} />`}>
        <DurationInputView value={v3} onChange={setV3} />
        <span style={{ fontSize: 11, color: 'var(--color-text-muted)', alignSelf: 'center' }}>= {v3} ms</span>
      </Row>
    </div>
  );
}

// ─── E6.176 — TabView ─────────────────────────────────────────────────────────

const PILL_TABS: TabItem[] = [
  { id: 'params',  label: 'Params',  badge: 3 },
  { id: 'headers', label: 'Headers', badge: 5 },
  { id: 'body',    label: 'Body',    dot: true, dotColor: 'var(--color-warning)' },
  { id: 'auth',    label: 'Auth' },
];

const SNIPPET_CATS = [
  { id: 'all',       label: 'All' },
  { id: 'tests',     label: 'Tests' },
  { id: 'variables', label: 'Variables' },
  { id: 'workflows', label: 'Workflows' },
  { id: 'response',  label: 'Response' },
  { id: 'request',   label: 'Request' },
];

export function TabsPanel() {
  const [a1, setA1] = useState('params');
  const [a2, setA2] = useState('params');
  const [a3, setA3] = useState('params');
  const [a4, setA4] = useState('params');
  const [snippetCat, setSnippetCat] = useState('all');
  return (
    <div>
      <Row label='variant="pill" (default) — sliding background indicator' code={`<TabView\n  tabs={[\n    { id: 'params',  label: 'Params',  badge: 3 },\n    { id: 'headers', label: 'Headers', badge: 5 },\n    { id: 'body',    label: 'Body',    dot: true, dotColor: 'var(--color-warning)' },\n    { id: 'auth',    label: 'Auth' },\n  ]}\n  activeTab={active}\n  onChange={setActive}\n  variant="pill"\n/>`}>
        <TabView tabs={PILL_TABS} activeTab={a1} onChange={setA1} />
      </Row>
      <Row label='variant="underline" — sliding underline indicator' code={`<TabView tabs={tabs} activeTab={active} onChange={setActive} variant="underline" />`}>
        <TabView tabs={PILL_TABS} activeTab={a2} onChange={setA2} variant="underline" />
      </Row>
      <Row label='variant="chip" — loose individual pill buttons, no track (Snippets filter style)' code={`<TabView\n  variant="chip"\n  tabs={[\n    { id: 'all', label: 'All' },\n    { id: 'tests', label: 'Tests' },\n    { id: 'variables', label: 'Variables' },\n    { id: 'workflows', label: 'Workflows' },\n    { id: 'response', label: 'Response' },\n    { id: 'request', label: 'Request' },\n  ]}\n  activeTab={active}\n  onChange={setActive}\n  accentColor="var(--color-primary)"\n/>`}>
        <TabView tabs={SNIPPET_CATS} activeTab={snippetCat} onChange={setSnippetCat} variant="chip" accentColor="var(--color-primary)" />
      </Row>
      <Row label="Protocol accent colors — pill variant" code={`<TabView tabs={restTabs} activeTab={active} onChange={setActive} accentColor="var(--color-protocol-rest)" />\n<TabView tabs={gqlTabs}  activeTab={active} onChange={setActive} accentColor="var(--color-protocol-graphql)" />`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <TabView tabs={[{ id: 'a', label: 'Request' }, { id: 'b', label: 'Response' }, { id: 'c', label: 'Scripts' }]} activeTab={a3} onChange={setA3} accentColor="var(--color-protocol-rest)" />
          <TabView tabs={[{ id: 'a', label: 'Query' }, { id: 'b', label: 'Variables' }, { id: 'c', label: 'Schema' }]} activeTab={a4} onChange={setA4} accentColor="var(--color-protocol-graphql)" />
        </div>
      </Row>
      <Row label="Size sm vs md" code={`<TabView tabs={tabs} activeTab={active} onChange={setActive} size="sm" />\n<TabView tabs={tabs} activeTab={active} onChange={setActive} size="md" />`}>
        <TabView tabs={PILL_TABS} activeTab={a1} onChange={setA1} size="sm" />
        <TabView tabs={PILL_TABS} activeTab={a1} onChange={setA1} size="md" />
      </Row>
    </div>
  );
}

// ─── E6.176 — HighlightedInputView ───────────────────────────────────────────

const URL_SUGGESTIONS = [
  'https://api.example.com/users',
  'https://api.example.com/products',
  'https://jsonplaceholder.typicode.com/posts',
  'https://httpbin.org/get',
  'https://httpbin.org/post',
];

export function HighlightedInputPanel() {
  const [url1, setUrl1] = useState('https://api.example.com/{{env}}/users/{{userId}}');
  const [url2, setUrl2] = useState('');
  const [url3, setUrl3] = useState('https://{{baseUrl}}/v{{version}}/items');
  return (
    <div>
      <Row label="URL bar style (height=36, borderRadius=0) — {{variable}} tokens highlighted" code={`<HighlightedInputView\n  value={url}\n  onChange={setUrl}\n  placeholder="https://api.example.com/{{env}}/users"\n  suggestions={urlHistory}\n/>`}>
        <div style={{ width: '100%', display: 'flex' }}>
          <HighlightedInputView
            value={url1}
            onChange={setUrl1}
            placeholder="Enter URL…"
            suggestions={URL_SUGGESTIONS}
            style={{ flex: 1 }}
          />
        </div>
      </Row>
      <Row label="Rounded variant (height=32, borderRadius=6) — for standalone use" code={`<HighlightedInputView\n  value={url}\n  onChange={setUrl}\n  height={32}\n  borderRadius={6}\n  placeholder="/{{version}}/users/{{id}}"\n/>`}>
        <div style={{ width: '100%', display: 'flex' }}>
          <HighlightedInputView
            value={url3}
            onChange={setUrl3}
            placeholder="https://{{baseUrl}}/…"
            height={32}
            borderRadius={6}
            suggestions={URL_SUGGESTIONS}
            style={{ flex: 1 }}
          />
        </div>
      </Row>
      <Row label="With autocomplete — start typing a URL to see suggestions" code={`<HighlightedInputView\n  value={url}\n  onChange={setUrl}\n  placeholder="https://…"\n  suggestions={urlHistory}  // string[]\n/>`}>
        <div style={{ width: '100%', display: 'flex' }}>
          <HighlightedInputView
            value={url2}
            onChange={setUrl2}
            placeholder="https://…"
            suggestions={URL_SUGGESTIONS}
            style={{ flex: 1 }}
          />
        </div>
      </Row>
    </div>
  );
}

// ─── E6.176 — KeyValueTableView ──────────────────────────────────────────────

function newKvRow(): KeyValueTableRow { return { id: crypto.randomUUID(), key: '', value: '', description: '', enabled: true }; }

const PINNED_ROWS: PinnedKeyValueRow[] = [
  { id: 'auth', key: 'Authorization', value: 'Bearer eyJhbGciOiJIUzI1NiJ9...', description: 'Set via Auth tab', masked: true, deletable: true },
  { id: 'ct',   key: 'Content-Type',  value: 'application/json',               description: 'Set by body type' },
];

export function KeyValueTablePanel() {
  const [headers, setHeaders] = useState<KeyValueTableRow[]>([
    { id: '1', key: 'Content-Type',  value: 'application/json', description: 'Sets the content type of the request body', enabled: true },
    { id: '2', key: 'Authorization', value: 'Bearer {{token}}', description: 'JWT auth token for protected endpoints',    enabled: true },
    { id: '3', key: 'X-Request-ID',  value: '{{requestId}}',    description: 'Unique request correlation ID',             enabled: false },
    newKvRow(),
  ]);
  const [params, setParams] = useState<KeyValueTableRow[]>([
    { id: 'p1', key: 'page',  value: '1',    enabled: true },
    { id: 'p2', key: 'limit', value: '20',   enabled: true },
    { id: 'p3', key: 'sort',  value: 'name', enabled: false },
    newKvRow(),
  ]);
  const [pinnedRows] = useState<PinnedKeyValueRow[]>(PINNED_ROWS);
  const [userRows, setUserRows] = useState<KeyValueTableRow[]>([
    { id: 'h1', key: 'X-Api-Key', value: '{{api_key}}', enabled: true },
    newKvRow(),
  ]);

  return (
    <div>
      {/* Request Headers — maskSensitive + autocompleteKeys + accentColor */}
      <Row label="Request Headers — maskSensitive · autocompleteKeys · InsertRowDivider on hover" gap={0} align="flex-start" code={`<KeyValueTableView\n  rows={headers}\n  onChange={setHeaders}\n  label="Request Headers"\n  maskSensitive\n  autocompleteKeys\n  accentColor="var(--color-protocol-rest)"\n  placeholder={{ key: 'Header', value: 'Value' }}\n/>`}>
        <KeyValueTableView
          rows={headers}
          onChange={setHeaders}
          label="Request Headers"
          maskSensitive
          autocompleteKeys
          accentColor="var(--color-protocol-rest)"
          placeholder={{ key: 'Header', value: 'Value' }}
        />
      </Row>

      {/* Query Parameters — different accent color */}
      <Row label="Query Parameters" gap={0} align="flex-start" code={`<KeyValueTableView\n  rows={params}\n  onChange={setParams}\n  label="Query Parameters"\n  accentColor="var(--color-protocol-graphql)"\n  placeholder={{ key: 'Parameter', value: 'Value' }}\n/>`}>
        <KeyValueTableView
          rows={params}
          onChange={setParams}
          label="Query Parameters"
          accentColor="var(--color-protocol-graphql)"
          placeholder={{ key: 'Parameter', value: 'Value' }}
        />
      </Row>

      {/* showDescription — 3-column Key / Value / Description layout */}
      <Row label="showDescription — 3-column layout · Key · Value · Description (stored in DB, not sent in request)" gap={0} align="flex-start" code={`<KeyValueTableView\n  rows={headers}\n  onChange={setHeaders}\n  showDescription\n  maskSensitive\n  label="Headers"\n  placeholder={{ key: 'Header', value: 'Value' }}\n/>`}>
        <KeyValueTableView
          rows={headers}
          onChange={setHeaders}
          showDescription
          maskSensitive
          label="Headers"
          placeholder={{ key: 'Header', value: 'Value' }}
        />
      </Row>

      {/* pinnedTopRows — computed system headers above editable list */}
      <Row label="pinnedTopRows — auto-computed rows · eye toggle · lock icon · dashed border · optional deletable" gap={0} align="flex-start" code={`const pinnedRows: PinnedKeyValueRow[] = [\n  { id: 'auth', key: 'Authorization', value: 'Bearer ...', masked: true, deletable: true },\n  { id: 'ct',   key: 'Content-Type',  value: 'application/json' },\n];\n<KeyValueTableView\n  rows={userRows}\n  onChange={setUserRows}\n  maskSensitive\n  pinnedTopRows={pinnedRows}\n  onPinnedRemove={id => removePinned(id)}\n  label="Headers"\n/>`}>
        <KeyValueTableView
          rows={userRows}
          onChange={setUserRows}
          maskSensitive
          pinnedTopRows={pinnedRows}
          onPinnedRemove={() => {}}
          label="Headers"
          accentColor="var(--color-protocol-rest)"
        />
      </Row>

      {/* HiddenKeyValueItemView — standalone read-only system rows */}
      <Row label="HiddenKeyValueItemView — lock icon · dashed border · masked · badge · delete action" align="flex-start" code={`<HiddenKeyValueItemView\n  keyValue="Authorization"\n  value="Bearer eyJhbGci..."\n  badge="auth"\n  badgeColor="var(--color-primary)"\n  masked\n  onDelete={() => clearAuth()}\n  deleteTitle="Clear auth"\n/>`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
          <HiddenKeyValueItemView
            keyValue="Authorization"
            value="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NSJ9"
            badge="auth"
            badgeColor="var(--color-primary)"
            masked
            onDelete={() => {}}
            deleteTitle="Clear auth (sets auth type to None)"
          />
          <HiddenKeyValueItemView
            keyValue="Cookie"
            value="session_id=abc123xyz; csrf_token=def456"
            badge="cookie"
            badgeColor="var(--color-warning)"
            masked
          />
          <HiddenKeyValueItemView
            keyValue="Content-Type"
            value="application/json"
          />
        </div>
      </Row>
    </div>
  );
}

// ─── MergedInputViewPanel ─────────────────────────────────────────────────────

const SOAP_VERSIONS = [
  { value: '1.1', label: 'SOAP 1.1', color: 'var(--color-protocol-soap, var(--color-error))' },
  { value: '1.2', label: 'SOAP 1.2', color: 'var(--color-protocol-soap, var(--color-error))' },
];

const GRPC_METHODS = [
  { value: 'UNARY',   label: 'Unary',    color: 'var(--color-protocol-grpc)' },
  { value: 'SERVER',  label: 'Server',   color: 'var(--color-protocol-grpc)' },
  { value: 'CLIENT',  label: 'Client',   color: 'var(--color-protocol-grpc)' },
  { value: 'BIDI',    label: 'BiDi',     color: 'var(--color-protocol-grpc)' },
];

export function MergedInputViewPanel() {
  const [soapVersion, setSoapVersion] = useState('1.1');
  const [soapUrl, setSoapUrl] = useState('');
  const [grpcMethod, setGrpcMethod] = useState('UNARY');
  const [grpcService, setGrpcService] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [customPrefix, setCustomPrefix] = useState('v1');
  const [showWsdlModal, setShowWsdlModal] = useState(false);

  const SOAP_SEGS: MergedInputSegment[] = [
    { type: 'select', value: soapVersion, options: SOAP_VERSIONS, onChange: setSoapVersion, width: 96 },
    { type: 'divider' },
    {
      type: 'button',
      label: 'WSDL',
      icon: <UploadIcon size={10} />,
      onClick: () => setShowWsdlModal(true),
      accentColor: 'var(--color-protocol-soap, var(--color-error))',
    },
    { type: 'divider' },
    { type: 'text', value: soapUrl, onChange: setSoapUrl, placeholder: 'https://service.example.com/endpoint' },
  ];

  const GRPC_SEGS: MergedInputSegment[] = [
    { type: 'select', value: grpcMethod, options: GRPC_METHODS, onChange: setGrpcMethod, width: 80 },
    { type: 'divider' },
    { type: 'text', value: grpcService, onChange: setGrpcService, placeholder: 'package.ServiceName/Method' },
  ];

  const CUSTOM_SEGS: MergedInputSegment[] = [
    {
      type: 'custom',
      width: 48,
      content: (
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--color-primary)',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={() => setCustomPrefix(p => p === 'v1' ? 'v2' : 'v1')}
        >
          {customPrefix}
        </div>
      ),
    },
    { type: 'divider' },
    { type: 'text', value: customUrl, onChange: setCustomUrl, placeholder: '/users/{{userId}}/profile' },
  ];

  return (
    <div>
      <Row
        label="SOAP URL bar — version selector + WSDL upload button + endpoint"
        align="flex-start"
        code={`<MergedInputView\n  segments={[\n    { type: 'select', value: version, options: SOAP_VERSIONS, onChange: setVersion, width: 96 },\n    { type: 'divider' },\n    { type: 'button', label: 'WSDL', icon: <UploadIcon size={10} />, onClick: openWsdl,\n      accentColor: 'var(--color-protocol-soap)' },\n    { type: 'divider' },\n    { type: 'text', value: url, onChange: setUrl, placeholder: 'https://service.example.com/endpoint' },\n  ]}\n  accentColor="var(--color-protocol-soap)"\n/>`}
      >
        <div style={{ width: '100%', maxWidth: 600 }}>
          <MergedInputView
            segments={SOAP_SEGS}
            accentColor="var(--color-protocol-soap, var(--color-error))"
          />
        </div>
      </Row>

      <Row
        label="gRPC bar — method selector + service path input"
        align="flex-start"
        code={`<MergedInputView\n  segments={[\n    { type: 'select', value: method, options: GRPC_METHODS, onChange: setMethod, width: 80 },\n    { type: 'divider' },\n    { type: 'text', value: service, onChange: setService, placeholder: 'package.ServiceName/Method' },\n  ]}\n  accentColor="var(--color-protocol-grpc)"\n/>`}
      >
        <div style={{ width: '100%', maxWidth: 600 }}>
          <MergedInputView
            segments={GRPC_SEGS}
            accentColor="var(--color-protocol-grpc)"
          />
        </div>
      </Row>

      <Row
        label="Custom content slot — clickable version badge + URL input"
        align="flex-start"
        code={`<MergedInputView\n  segments={[\n    { type: 'custom', width: 48, content: <VersionBadge /> },\n    { type: 'divider' },\n    { type: 'text', value: url, onChange: setUrl, placeholder: '/users/{{userId}}/profile' },\n  ]}\n/>`}
      >
        <div style={{ width: '100%', maxWidth: 600 }}>
          <MergedInputView segments={CUSTOM_SEGS} />
        </div>
      </Row>

      <Row
        label="Small size (sm)"
        align="flex-start"
        code={`<MergedInputView\n  segments={[\n    { type: 'select', value: version, options: SOAP_VERSIONS, onChange: setVersion, width: 80 },\n    { type: 'divider' },\n    { type: 'text', value: url, onChange: setUrl, placeholder: 'Endpoint URL' },\n  ]}\n  size="sm"\n  accentColor="var(--color-protocol-soap)"\n/>`}
      >
        <div style={{ width: '100%', maxWidth: 400 }}>
          <MergedInputView
            segments={[
              { type: 'select', value: soapVersion, options: SOAP_VERSIONS, onChange: setSoapVersion, width: 80 },
              { type: 'divider' },
              { type: 'text', value: soapUrl, onChange: setSoapUrl, placeholder: 'Endpoint URL' },
            ]}
            size="sm"
            accentColor="var(--color-protocol-soap, var(--color-error))"
          />
        </div>
      </Row>

      <Row
        label="Large size (lg)"
        align="flex-start"
        code={`<MergedInputView\n  segments={[\n    { type: 'select', value: method, options: GRPC_METHODS, onChange: setMethod, width: 90 },\n    { type: 'divider' },\n    { type: 'button', label: 'Proto', icon: <UploadIcon size={11} />,\n      onClick: openProto, accentColor: 'var(--color-protocol-grpc)' },\n    { type: 'divider' },\n    { type: 'text', value: service, onChange: setService, placeholder: 'localhost:50051' },\n  ]}\n  size="lg"\n  accentColor="var(--color-protocol-grpc)"\n/>`}
      >
        <div style={{ width: '100%', maxWidth: 700 }}>
          <MergedInputView
            segments={[
              { type: 'select', value: grpcMethod, options: GRPC_METHODS, onChange: setGrpcMethod, width: 90 },
              { type: 'divider' },
              { type: 'button', label: 'Proto', icon: <UploadIcon size={11} />, onClick: () => {}, accentColor: 'var(--color-protocol-grpc)' },
              { type: 'divider' },
              { type: 'text', value: grpcService, onChange: setGrpcService, placeholder: 'localhost:50051' },
            ]}
            size="lg"
            accentColor="var(--color-protocol-grpc)"
          />
        </div>
      </Row>

      <Row
        label="MergeDivider standalone (as visual separator reference)"
        code={`// MergeDivider is the thin vertical separator used between segments\nimport { MergeDivider } from './MergedInputView';\n\n<div style={{ display: 'flex', alignItems: 'center', gap: 8,\n  border: '1px solid var(--color-input-border)', borderRadius: 6,\n  background: 'var(--color-input-bg)', padding: '0 8px', height: 34 }}>\n  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-protocol-rest)' }}>GET</span>\n  <MergeDivider />\n  <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>https://api.example.com/users</span>\n</div>`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--color-input-border)', borderRadius: 6, background: 'var(--color-input-bg)', padding: '0 8px', height: 34 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-protocol-rest)' }}>GET</span>
          <MergeDivider />
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>https://api.example.com/users</span>
        </div>
      </Row>

      {showWsdlModal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-surface-border)',
              borderRadius: 10,
              padding: '24px 28px',
              minWidth: 320,
              maxWidth: 440,
              boxShadow: '0 16px 48px rgba(0,0,0,0.35)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-primary)' }}>Upload WSDL File</span>
              <button
                type="button"
                onClick={() => setShowWsdlModal(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 4 }}
              >
                <CloseIcon size={16} />
              </button>
            </div>
            <div
              style={{
                border: '2px dashed var(--color-input-border)',
                borderRadius: 8,
                padding: '32px 16px',
                textAlign: 'center',
                color: 'var(--color-text-muted)',
                fontSize: 12,
              }}
            >
              <UploadIcon size={24} style={{ marginBottom: 8, opacity: 0.5 }} />
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Drop your WSDL file here</div>
              <div style={{ fontSize: 11 }}>or click to browse — .wsdl / .xml</div>
            </div>
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button
                type="button"
                onClick={() => setShowWsdlModal(false)}
                style={{
                  fontSize: 11, padding: '5px 14px', borderRadius: 4,
                  border: '1px solid var(--color-btn-secondary-border)',
                  background: 'var(--color-btn-secondary-bg)',
                  color: 'var(--color-text-primary)', cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── HudView ─────────────────────────────────────────────────────────────────

const DEBUG_HUD_ITEMS: HudItem[] = [
  { id: 'continue', icon: <PlayIcon size={13} />, title: 'Continue (F5)' },
  { id: 'step-over', icon: <StepOverIcon size={13} />, title: 'Step Over (F10)', separator: true },
  { id: 'step-into', icon: <StepIntoIcon size={13} />, title: 'Step Into (F11)' },
  { id: 'step-out', icon: <StepOutIcon size={13} />, title: 'Step Out (Shift+F11)' },
  { id: 'restart', icon: <RestartIcon size={13} />, title: 'Restart (Ctrl+Shift+F5)', separator: true },
  { id: 'stop', icon: <StopSquareIcon size={13} />, title: 'Stop (Shift+F5)' },
];

const TOOLBAR_HUD_ITEMS: HudItem[] = [
  { id: 'save', icon: <SaveIcon size={13} />, title: 'Save' },
  { id: 'copy', icon: <CopyIcon size={13} />, title: 'Copy' },
  { id: 'refresh', icon: <RefreshIcon size={13} />, title: 'Refresh', separator: true },
  { id: 'download', icon: <DownloadIcon size={13} />, title: 'Download' },
  { id: 'trash', icon: <TrashIcon size={13} />, title: 'Delete', separator: true },
];

export function HudViewPanel() {
  const [muteActive, setMuteActive] = useState(false);

  const itemsWithMute: HudItem[] = [
    ...DEBUG_HUD_ITEMS,
    {
      id: 'mute',
      icon: <MuteBreakpointsIcon size={13} />,
      title: muteActive ? 'Unmute Breakpoints' : 'Mute Breakpoints',
      active: muteActive,
      separator: true,
      onClick: () => setMuteActive(v => !v),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Shared stage — all 3 HUDs visible at once, left / center / right */}
      <div style={{
        border: '1px dashed var(--color-surface-border)',
        borderRadius: 8,
        background: 'color-mix(in srgb, var(--color-text-primary) 2%, transparent)',
        padding: '28px 20px 16px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <span style={{
          position: 'absolute', top: 8, left: 12,
          fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'var(--color-text-muted)',
        }}>
          In real use these float fixed to the viewport and are draggable
        </span>

        {/* ① Debug HUD — left */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
          <HudView items={itemsWithMute} status={muteActive ? "Breakpoints muted" : "Paused — Line 42"} contained draggable={false} />
          <span style={{ fontSize: 9, color: 'var(--color-text-muted)' }}>① Debug — click bug icon to toggle mute</span>
        </div>

        {/* ② Toolbar HUD — center */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <HudView items={TOOLBAR_HUD_ITEMS} status="3 files selected" contained draggable={false} />
          <span style={{ fontSize: 9, color: 'var(--color-text-muted)' }}>② Toolbar — default accentColor</span>
        </div>

        {/* ③ Custom accent — right */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <HudView
            accentColor="var(--color-success)"
            items={[
              { id: 'play', icon: <PlayIcon size={13} />, title: 'Run' },
              { id: 'stop', icon: <StopSquareIcon size={13} />, title: 'Stop', disabled: true },
              { id: 'restart', icon: <RestartIcon size={13} />, title: 'Restart', separator: true },
            ]}
            status="Ready"
            contained draggable={false}
          />
          <span style={{ fontSize: 9, color: 'var(--color-text-muted)' }}>③ Custom accentColor</span>
        </div>
      </div>

      {/* ① code */}
      <Row
        label="① Debug HUD — store-free counterpart of DebugHud, draggable in real use"
        code={`const items: HudItem[] = [\n  { id: 'continue', icon: <PlayIcon size={13} />, title: 'Continue (F5)' },\n  { id: 'step-over', icon: <StepOverIcon size={13} />, title: 'Step Over (F10)', separator: true },\n  { id: 'step-into', icon: <StepIntoIcon size={13} />, title: 'Step Into (F11)' },\n  { id: 'restart', icon: <RestartIcon size={13} />, title: 'Restart', separator: true },\n  { id: 'stop', icon: <StopSquareIcon size={13} />, title: 'Stop (Shift+F5)' },\n  { id: 'mute', icon: <MuteBreakpointsIcon size={13} />, title: 'Mute BP', active: muted, onClick: () => setMuted(v => !v), separator: true },\n];\n\n// Drop anywhere — floats fixed to the viewport, drag the grip to reposition\n<HudView items={items} status="Paused — Line 42" />`}
      >
        <span style={{ fontSize: 11, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>See ① in the stage above</span>
      </Row>

      {/* ② code */}
      <Row
        label="② Generic toolbar — any icon + action set, uses --color-primary border"
        code={`<HudView\n  items={[\n    { id: 'save',     icon: <SaveIcon size={13} />,     title: 'Save' },\n    { id: 'copy',     icon: <CopyIcon size={13} />,     title: 'Copy' },\n    { id: 'refresh',  icon: <RefreshIcon size={13} />,  title: 'Refresh', separator: true },\n    { id: 'download', icon: <DownloadIcon size={13} />, title: 'Download' },\n    { id: 'trash',    icon: <TrashIcon size={13} />,    title: 'Delete', separator: true },\n  ]}\n  status="3 files selected"\n/>`}
      >
        <span style={{ fontSize: 11, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>See ② in the stage above</span>
      </Row>

      {/* ③ code */}
      <Row
        label="③ Custom accentColor — border + glow + active tint all inherit the color"
        code={`<HudView\n  accentColor="var(--color-success)"\n  items={[\n    { id: 'play',    icon: <PlayIcon size={13} />,        title: 'Run' },\n    { id: 'stop',    icon: <StopSquareIcon size={13} />,  title: 'Stop', disabled: true },\n    { id: 'restart', icon: <RestartIcon size={13} />,     title: 'Restart', separator: true },\n  ]}\n  status="Ready"\n/>`}
      >
        <span style={{ fontSize: 11, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>See ③ in the stage above</span>
      </Row>

    </div>
  );
}

// ─── CollapsibleSectionView ───────────────────────────────────────────────────

export function CollapsibleSectionPanel() {
  const [varExpanded, setVarExpanded] = useState(true);
  const [watchExpanded, setWatchExpanded] = useState(true);
  const [bpExpanded, setBpExpanded] = useState(true);
  const [plainExpanded, setPlainExpanded] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Row
        label="Colored chip title with badge — debugger-style sections"
        code={`<CollapsibleSectionView\n  title="Variables"\n  expanded={true}\n  onToggle={() => {}}\n  accentColor="var(--color-debug-key)"\n  badge={3}\n>\n  {/* content */}\n</CollapsibleSectionView>`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 6, overflow: 'hidden' }}>
          <CollapsibleSectionView title="Variables" expanded={varExpanded} onToggle={() => setVarExpanded(v => !v)} accentColor="var(--color-debug-key)" badge={3}>
            <div style={{ padding: '8px 16px', fontSize: 11, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>Local variables appear here during debug</div>
          </CollapsibleSectionView>
          <CollapsibleSectionView title="Watch" expanded={watchExpanded} onToggle={() => setWatchExpanded(v => !v)} accentColor="var(--color-warning)" badge={2}
            headerRight={
              <button type="button" style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4, border: 'none', background: 'transparent', color: 'var(--color-warning)', cursor: 'pointer', fontSize: 16, fontWeight: 700 }} title="Add expression">+</button>
            }
          >
            <div style={{ padding: '6px 16px', fontSize: 11, color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No expressions added</div>
          </CollapsibleSectionView>
          <CollapsibleSectionView title="Breakpoints" expanded={bpExpanded} onToggle={() => setBpExpanded(v => !v)} accentColor="var(--color-error)" badge={1}>
            <div style={{ padding: '6px 16px', fontSize: 11, color: 'var(--color-text-muted)' }}>Line 12 — pre-request.js</div>
          </CollapsibleSectionView>
        </div>
      </Row>

      <Row
        label="No accentColor — plain chevron section"
        code={`<CollapsibleSectionView\n  title="Settings"\n  expanded={true}\n  onToggle={() => {}}\n>\n  {/* content */}\n</CollapsibleSectionView>`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 6, overflow: 'hidden' }}>
          <CollapsibleSectionView title="Settings" expanded={plainExpanded} onToggle={() => setPlainExpanded(v => !v)}>
            <div style={{ padding: '8px 16px', fontSize: 11, color: 'var(--color-text-muted)' }}>Any content goes here</div>
          </CollapsibleSectionView>
        </div>
      </Row>
    </div>
  );
}

// ─── JsonTreeView ─────────────────────────────────────────────────────────────

const SAMPLE_JSON = {
  user: {
    id: 42,
    name: 'Alice',
    roles: ['admin', 'editor'],
    address: { city: 'Austin', zip: '78701' },
    active: true,
    notes: null,
  },
  meta: { version: '2.1.0', timestamp: 1718000000000 },
};

export function JsonTreeViewPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Row
        label="Object tree — defaultExpandDepth=2 (nested up to depth 2 open by default)"
        code={`<JsonTreeView\n  data={{\n    user: { id: 42, name: 'Alice', roles: ['admin', 'editor'], active: true, notes: null },\n    meta: { version: '2.1.0', timestamp: 1718000000000 },\n  }}\n  defaultExpandDepth={2}\n/>`}
      >
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)', borderRadius: 6, padding: '8px 4px' }}>
          <JsonTreeView data={SAMPLE_JSON} defaultExpandDepth={2} />
        </div>
      </Row>

      <Row
        label="Named root — single value with label"
        code={`<JsonTreeView name="response" data={{ status: 200, body: { ok: true } }} defaultExpandDepth={1} />`}
      >
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)', borderRadius: 6, padding: '8px 4px' }}>
          <JsonTreeView name="response" data={{ status: 200, body: { ok: true, items: [1, 2, 3] } }} defaultExpandDepth={1} />
        </div>
      </Row>

      <Row
        label="Primitive values — type color mapping"
        code={`<JsonTreeView data={{\n  str: 'hello world',\n  num: 3.14,\n  bool: false,\n  nil: null,\n  fn: '<Function: handler>',\n}} defaultExpandDepth={1} />`}
      >
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)', borderRadius: 6, padding: '8px 4px' }}>
          <JsonTreeView
            data={{ str: 'hello world', num: 3.14, bool: false, nil: null, fn: '<Function: handler>' }}
            defaultExpandDepth={1}
          />
        </div>
      </Row>
    </div>
  );
}

// ─── ExpandableLogEntryView ───────────────────────────────────────────────────

const NOW = Date.now();

export function ExpandableLogEntryPanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Row
        label="Network request log — Request Sent / Response Received / Summary"
        code={`<ExpandableLogEntryView\n  icon={<ArrowUpRightIcon size={13} />}\n  title="Request Sent"\n  badge="POST"\n  badgeColor="var(--color-method-post)"\n  timestamp={Date.now()}\n>\n  {/* detail content */}\n</ExpandableLogEntryView>`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 6, overflow: 'hidden' }}>
          <ExpandableLogEntryView
            icon={<ArrowUpRightIcon size={13} style={{ color: 'var(--color-protocol-websocket)' }} />}
            title="Request Sent"
            badge="POST"
            badgeColor="var(--color-method-post)"
            timestamp={NOW - 1200}
            defaultExpanded
          >
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-primary)' }}>
              POST https://api.example.com/v2/users
            </div>
          </ExpandableLogEntryView>
          <ExpandableLogEntryView
            icon={<ArrowDownLeftIcon size={13} style={{ color: 'var(--color-protocol-graphql)' }} />}
            title="Response Received"
            badge="201 Created"
            badgeColor="var(--color-success)"
            timestamp={NOW - 400}
          >
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>
              Content-Type: application/json · 342B
            </div>
          </ExpandableLogEntryView>
          <ExpandableLogEntryView
            icon={<InfoCircleIcon size={13} style={{ color: 'var(--color-success)' }} />}
            title="Completed"
            badge="812ms"
            badgeColor="var(--color-success)"
            timestamp={NOW}
          >
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Duration: 812ms · Size: 342B</div>
          </ExpandableLogEntryView>
        </div>
      </Row>

      <Row
        label="Error state — expanded by default (bad status)"
        code={`<ExpandableLogEntryView\n  icon={<InfoCircleIcon size={13} style={{ color: 'var(--color-error)' }} />}\n  title="Failed"\n  badge="ECONNREFUSED"\n  badgeColor="var(--color-error)"\n  timestamp={Date.now()}\n  defaultExpanded\n>\n  {/* error detail */}\n</ExpandableLogEntryView>`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 6, overflow: 'hidden' }}>
          <ExpandableLogEntryView
            icon={<InfoCircleIcon size={13} style={{ color: 'var(--color-error)' }} />}
            title="Failed"
            badge="ECONNREFUSED"
            badgeColor="var(--color-error)"
            timestamp={NOW}
            defaultExpanded
          >
            <pre style={{ fontSize: 10, color: 'var(--color-error)', fontFamily: 'monospace', margin: 0, padding: '6px 8px', background: 'color-mix(in srgb, var(--color-error) 6%, transparent)', borderRadius: 4 }}>
              AggregateError [ECONNREFUSED]: All promises were rejected
            </pre>
          </ExpandableLogEntryView>
        </div>
      </Row>

      <Row
        label="No timestamp — minimal usage"
        code={`<ExpandableLogEntryView\n  icon={<ChevronRightIcon size={13} />}\n  title="Step completed"\n  badge="42ms"\n  badgeColor="var(--color-primary)"\n>\n  {/* detail */}\n</ExpandableLogEntryView>`}
      >
        <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 6, overflow: 'hidden' }}>
          <ExpandableLogEntryView
            icon={<ChevronRightIcon size={13} style={{ color: 'var(--color-primary)' }} />}
            title="Step completed"
            badge="42ms"
            badgeColor="var(--color-primary)"
          >
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Pre-request script ran successfully</div>
          </ExpandableLogEntryView>
        </div>
      </Row>
    </div>
  );
}

// ─── CopyButtonView panel ─────────────────────────────────────────────────────

export function CopyButtonPanel() {
  return (
    <div>
      <Row label="Default — copies text on click (check to clipboard)">
        <CopyButtonView text="Hello, world!" />
        <CopyButtonView text="import { CopyButtonView } from 'dui';" />
        <CopyButtonView text="Bearer eyJhbGci..." title="Copy token" />
      </Row>
      <Row label="Accent colors">
        <CopyButtonView text="primary" accentColor="var(--color-primary)" title="Copy (primary)" />
        <CopyButtonView text="error" accentColor="var(--color-error)" title="Copy (error)" />
        <CopyButtonView text="warning" accentColor="var(--color-warning)" title="Copy (warning)" />
        <CopyButtonView text="success" accentColor="var(--color-success)" title="Copy (success)" />
      </Row>
      <Row label="DUI sizes (xxs → xl)">
        <CopyButtonView text="xxs" size="xxs" title="xxs" />
        <CopyButtonView text="xs" size="xs" title="xs" />
        <CopyButtonView text="sm" size="sm" title="sm" />
        <CopyButtonView text="md (default)" title="md" />
        <CopyButtonView text="lg" size="lg" title="lg" />
        <CopyButtonView text="xl" size="xl" title="xl" />
      </Row>
      <Row label="Inline usage — alongside a code snippet">
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)', borderRadius: 6, padding: '4px 8px' }}>
          <code style={{ fontSize: 11, color: 'var(--color-text-primary)', flex: 1 }}>npm install daakia</code>
          <CopyButtonView text="npm install daakia" size="sm" />
        </div>
      </Row>
    </div>
  );
}

// ─── MarkdownView panel ───────────────────────────────────────────────────────

const MD_SAMPLE = `## MarkdownView Demo

This is a **bold** statement and _italic_ emphasis.

### Code block (syntax highlighted)

\`\`\`typescript
interface DuiComponent {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}
\`\`\`

### Inline code

Use \`var(--color-primary)\` for accent colors.

### Table

| Prop | Type | Default |
|---|---|---|
| content | string | — |
| className | string | '' |
| style | CSSProperties | — |

### Task list

- [x] No hardcoded colors
- [x] No inline SVGs
- [ ] Deploy to production

> **Tip**: MarkdownView renders GFM (GitHub Flavored Markdown) with syntax highlighting via highlight.js.
`;

export function MarkdownViewPanel() {
  const [content, setContent] = useState(MD_SAMPLE);
  return (
    <div>
      <Row label="Rendered output — GFM + syntax highlighting + copy buttons" align="flex-start">
        <MarkdownView content={content} style={{ flex: 1, minWidth: 0 }} />
      </Row>
      <Row label="Live edit — modify the markdown" align="flex-start">
        <div style={{ display: 'flex', gap: 16, width: '100%', minWidth: 0 }}>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            style={{
              flex: 1, minWidth: 0, minHeight: 300, fontFamily: 'monospace', fontSize: 11,
              background: 'var(--color-surface)', color: 'var(--color-text-primary)',
              border: '1px solid var(--color-surface-border)', borderRadius: 6,
              padding: 12, resize: 'vertical', outline: 'none',
            }}
          />
          <MarkdownView content={content} style={{ flex: 1, minWidth: 0 }} />
        </div>
      </Row>
    </div>
  );
}

// ─── FormDataTableView panel ──────────────────────────────────────────────────

const INIT_ROWS: FormDataRow[] = [
  { id: '1', key: 'username', value: 'john_doe', type: 'text', enabled: true },
  { id: '2', key: 'token', value: 'abc123', type: 'text', enabled: true },
  { id: '3', key: 'avatar', value: '', type: 'file', enabled: true },
];

export function FormDataTablePanel() {
  const [rows, setRows] = useState<FormDataRow[]>(INIT_ROWS);
  const [disabledRows, setDisabledRows] = useState<FormDataRow[]>([
    { id: 'd1', key: 'field_a', value: 'value_a', type: 'text', enabled: false },
    { id: 'd2', key: 'upload', value: '', type: 'file', enabled: true },
  ]);

  return (
    <div>
      <Row label="Default — text + file rows with toolbar" align="flex-start">
        <div style={{ width: '100%' }}>
          <FormDataTableView rows={rows} onChange={setRows} label="Form Data" />
        </div>
      </Row>
      <Row label="Disabled rows — toggle enabled state" align="flex-start">
        <div style={{ width: '100%' }}>
          <FormDataTableView rows={disabledRows} onChange={setDisabledRows} label="With disabled row" />
        </div>
      </Row>
      <Row label="No toolbar (hideToolbar)" align="flex-start">
        <div style={{ width: '100%' }}>
          <FormDataTableView
            rows={[{ id: 'x1', key: 'api_key', value: 'sk-...', type: 'text', enabled: true }]}
            onChange={() => {}}
            hideToolbar
          />
        </div>
      </Row>
      <Row label="Custom accent color" align="flex-start">
        <div style={{ width: '100%' }}>
          <FormDataTableView
            rows={[
              { id: 'g1', key: 'file', value: '', type: 'file', enabled: true },
              { id: 'g2', key: 'name', value: '', type: 'text', enabled: true },
            ]}
            onChange={() => {}}
            accentColor="var(--color-graphql)"
            label="GraphQL Upload"
          />
        </div>
      </Row>
    </div>
  );
}

// ─── YamlKeyChip panel ────────────────────────────────────────────────────────

export function YamlKeyChipPanel() {
  return (
    <div>
      <Row label="Default — monospace theme-key badges">
        <YamlKeyChip yamlKey="brand.primary" />
        <YamlKeyChip yamlKey="component.button.bg" />
        <YamlKeyChip yamlKey="surface.elevated" />
        <YamlKeyChip yamlKey="text.muted" />
      </Row>
      <Row label="Custom accent colors">
        <YamlKeyChip yamlKey="rest.accent" color="var(--color-rest)" />
        <YamlKeyChip yamlKey="graphql.accent" color="var(--color-graphql)" />
        <YamlKeyChip yamlKey="success.token" color="var(--color-success)" />
        <YamlKeyChip yamlKey="error.token" color="var(--color-error)" />
        <YamlKeyChip yamlKey="warning.token" color="var(--color-warning)" />
      </Row>
      <Row label="Clickable — used inside LiveColorCustomizer">
        <YamlKeyChip yamlKey="brand.primary" color="var(--color-primary)" onClick={() => {}} />
        <YamlKeyChip yamlKey="surface.panel" color="var(--color-text-muted)" onClick={() => {}} />
      </Row>
      <Row label="Inline usage — alongside color swatches">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { key: 'brand.primary', color: 'var(--color-primary)', hex: '#6366f1' },
            { key: 'status.success', color: 'var(--color-success)', hex: '#22c55e' },
            { key: 'status.error', color: 'var(--color-error)', hex: '#ef4444' },
          ].map(({ key, color, hex }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, background: color, border: '1px solid var(--color-surface-border)', flexShrink: 0 }} />
              <YamlKeyChip yamlKey={key} color={color} />
              <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>{hex}</span>
            </div>
          ))}
        </div>
      </Row>
    </div>
  );
}

// ─── SpacerView panel ─────────────────────────────────────────────────────────

export function SpacerViewPanel() {
  return (
    <div>
      <Row
        label="Horizontal — divides groups in a vertical icon rail"
        code={`<SpacerView />\n// or explicitly:\n<SpacerView orientation="horizontal" spacing="md" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '6px 8px', background: 'var(--color-surface)', borderRadius: 8, border: '1px solid var(--color-surface-border)' }}>
          {['var(--color-protocol-rest)', 'var(--color-protocol-graphql)', 'var(--color-protocol-websocket)'].map((c, i) => (
            <div key={i} style={{ width: 36, height: 36, borderRadius: 8, background: `color-mix(in srgb, ${c} 20%, transparent)`, border: `1px solid color-mix(in srgb, ${c} 30%, transparent)`, flexShrink: 0 }} />
          ))}
          <SpacerView orientation="horizontal" spacing="md" />
          {['var(--color-protocol-ai)', 'var(--color-protocol-mcp)'].map((c, i) => (
            <div key={i} style={{ width: 36, height: 36, borderRadius: 8, background: `color-mix(in srgb, ${c} 20%, transparent)`, border: `1px solid color-mix(in srgb, ${c} 30%, transparent)`, flexShrink: 0 }} />
          ))}
        </div>
      </Row>

      <Row
        label="Vertical — divides groups in a horizontal toolbar"
        code={`<SpacerView orientation="vertical" spacing="md" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, padding: '6px 8px', background: 'var(--color-surface)', borderRadius: 8, border: '1px solid var(--color-surface-border)' }}>
          {['var(--color-method-get)', 'var(--color-method-post)', 'var(--color-method-put)'].map((c, i) => (
            <div key={i} style={{ width: 36, height: 28, borderRadius: 6, background: `color-mix(in srgb, ${c} 20%, transparent)`, border: `1px solid color-mix(in srgb, ${c} 30%, transparent)`, flexShrink: 0 }} />
          ))}
          <SpacerView orientation="vertical" spacing="md" />
          {['var(--color-method-delete)', 'var(--color-method-patch)'].map((c, i) => (
            <div key={i} style={{ width: 36, height: 28, borderRadius: 6, background: `color-mix(in srgb, ${c} 20%, transparent)`, border: `1px solid color-mix(in srgb, ${c} 30%, transparent)`, flexShrink: 0 }} />
          ))}
        </div>
      </Row>

      <Row
        label="Spacing sizes — sm / md / lg"
        code={`<SpacerView orientation="horizontal" spacing="sm" />\n<SpacerView orientation="horizontal" spacing="md" />\n<SpacerView orientation="horizontal" spacing="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 24 }}>
          {(['sm', 'md', 'lg'] as const).map(s => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--color-surface-border)', flexShrink: 0 }} />
              <SpacerView orientation="horizontal" spacing={s} />
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--color-surface-border)', flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: 'var(--color-text-muted)', marginTop: 4 }}>{s}</span>
            </div>
          ))}
        </div>
      </Row>

      <Row
        label="Real-world: sidebar icon rail with two groups"
        code={`// Icon rail — two groups separated by a spacer\n<div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>\n  <IconButtonView icon={<RestApiIcon size={14} />} title="REST" />\n  <IconButtonView icon={<GraphQLIcon size={14} />} title="GraphQL" />\n  <SpacerView />\n  <IconButtonView icon={<SettingsIcon size={14} />} title="Settings" />\n</div>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 6px', background: 'var(--color-panel)', borderRadius: 8, border: '1px solid var(--color-surface-border)', width: 48 }}>
          <div title="REST" style={{ width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'color-mix(in srgb, var(--color-protocol-rest) 15%, transparent)', color: 'var(--color-protocol-rest)', fontSize: 11, fontWeight: 700 }}>R</div>
          <div title="GQL" style={{ width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'color-mix(in srgb, var(--color-protocol-graphql) 12%, transparent)', color: 'var(--color-protocol-graphql)', fontSize: 11, fontWeight: 700 }}>G</div>
          <div title="WS" style={{ width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'color-mix(in srgb, var(--color-protocol-websocket) 12%, transparent)', color: 'var(--color-protocol-websocket)', fontSize: 11, fontWeight: 700 }}>W</div>
          <SpacerView orientation="horizontal" spacing="md" />
          <div title="Settings" style={{ width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'color-mix(in srgb, var(--color-text-muted) 10%, transparent)', color: 'var(--color-text-muted)', fontSize: 11, fontWeight: 700 }}>⚙</div>
          <div title="DevTools" style={{ width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'color-mix(in srgb, var(--color-text-muted) 10%, transparent)', color: 'var(--color-text-muted)', fontSize: 11, fontWeight: 700 }}>{'</>'}</div>
        </div>
      </Row>
    </div>
  );
}

// ─── LiveColorCustomizer panel ────────────────────────────────────────────────

const DEMO_VARS: LiveColorVar[] = [
  { cssVar: '--color-primary',      yamlKey: 'brand.primary',      label: 'Primary' },
  { cssVar: '--color-success',      yamlKey: 'status.success',     label: 'Success' },
  { cssVar: '--color-error',        yamlKey: 'status.error',       label: 'Error' },
  { cssVar: '--color-warning',      yamlKey: 'status.warning',     label: 'Warning' },
  { cssVar: '--color-text-primary', yamlKey: 'text.primary',       label: 'Text Primary' },
  { cssVar: '--color-text-muted',   yamlKey: 'text.muted',         label: 'Text Muted' },
  { cssVar: '--color-surface',      yamlKey: 'surface.default',    label: 'Surface' },
  { cssVar: '--color-panel',        yamlKey: 'surface.panel',      label: 'Panel' },
];

export function LiveColorCustomizerPanel() {
  return (
    <div>
      <Row label="Live color editor — changes apply immediately to the document" align="flex-start">
        <LiveColorCustomizer vars={DEMO_VARS} />
      </Row>
    </div>
  );
}

// ─── PickerView panel ──────────────────────────────────────────────────────────

const METHOD_OPTIONS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'].map(m => ({ value: m, label: m }));
const HOUR_OPTIONS   = Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }));
const MINUTE_OPTIONS = Array.from({ length: 60 }, (_, i) => ({ value: String(i).padStart(2, '0'), label: String(i).padStart(2, '0') }));
const MERIDIEM_OPTIONS = [{ value: 'AM', label: 'AM' }, { value: 'PM', label: 'PM' }];

export function PickerPanel() {
  const [method, setMethod] = useState('GET');
  const [hour, setHour] = useState('9');
  const [minute, setMinute] = useState('30');
  const [meridiem, setMeridiem] = useState('AM');
  const [sizeVal, setSizeVal] = useState('md');

  const timeColumns: PickerColumn[] = [
    { options: HOUR_OPTIONS, value: hour, onChange: setHour, label: 'Hour' },
    { options: MINUTE_OPTIONS, value: minute, onChange: setMinute, label: 'Min' },
    { options: MERIDIEM_OPTIONS, value: meridiem, onChange: setMeridiem, label: '' },
  ];

  return (
    <div>
      <Row
        label="Single column — HTTP method wheel"
        code={`<PickerView\n  options={methodOptions}\n  value={method}\n  onChange={setMethod}\n  size="md"\n/>`}
      >
        <PickerView options={METHOD_OPTIONS} value={method} onChange={setMethod} size="md" style={{ width: 140 }} />
      </Row>

      <Row
        label="Multi-column — wheel time picker (hour / minute / AM-PM)"
        code={`<PickerView\n  columns={[\n    { options: hours,   value: hour,   onChange: setHour,   label: 'Hour' },\n    { options: minutes, value: minute, onChange: setMinute, label: 'Min' },\n    { options: meridiem, value: meridiem, onChange: setMeridiem },\n  ]}\n  visibleRows={5}\n/>`}
      >
        <PickerView columns={timeColumns} visibleRows={5} style={{ width: 220 }} />
      </Row>

      <Row
        label="Sizes xs / sm / md / lg / xl"
        code={`<PickerView options={options} value={v} onChange={setV} size="xs" />\n<PickerView options={options} value={v} onChange={setV} size="lg" />`}
      >
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(sz => (
          <PickerView key={sz} options={METHOD_OPTIONS} value={sizeVal} onChange={setSizeVal} size={sz} style={{ width: 100 }} />
        ))}
      </Row>

      <Row
        label="Disabled state"
        code={`<PickerView options={options} value={value} onChange={() => {}} disabled />`}
      >
        <PickerView options={METHOD_OPTIONS} value="POST" onChange={() => {}} disabled style={{ width: 140 }} />
      </Row>

      <Row
        label="Custom accent color"
        code={`<PickerView options={options} value={v} onChange={setV} color="var(--color-success)" />`}
      >
        <PickerView options={METHOD_OPTIONS} value={method} onChange={setMethod} color="var(--color-success)" style={{ width: 140 }} />
      </Row>
    </div>
  );
}

// ─── SegmentedControlView panel ────────────────────────────────────────────────

const SEG_OPTIONS: SegmentedControlOption[] = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' },
  { value: 'opt3', label: 'Option 3' },
];

const SEG_PROTOCOL_OPTIONS: SegmentedControlOption[] = [
  { value: 'rest', label: 'REST' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'ws', label: 'WebSocket' },
];

export function SegmentedControlPanel() {
  const [pill, setPill] = useState('opt1');
  const [rounded, setRounded] = useState('opt1');
  const [pointy, setPointy] = useState('opt1');
  const [protocol, setProtocol] = useState('rest');
  const [sizeVal, setSizeVal] = useState('md');
  const [fullWidthVal, setFullWidthVal] = useState('opt1');
  const [withIcon, setWithIcon] = useState('rest');

  return (
    <div>
      <Row
        label="Variants — pill / rounded / pointy"
        code={`<SegmentedControlView options={options} value={v} onChange={setV} variant="pill" />\n<SegmentedControlView options={options} value={v} onChange={setV} variant="rounded" />\n<SegmentedControlView options={options} value={v} onChange={setV} variant="pointy" />`}
        align="flex-start"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <SegmentedControlView options={SEG_OPTIONS} value={pill} onChange={setPill} variant="pill" />
          <SegmentedControlView options={SEG_OPTIONS} value={rounded} onChange={setRounded} variant="rounded" accentColor="var(--color-success)" />
          <SegmentedControlView options={SEG_OPTIONS} value={pointy} onChange={setPointy} variant="pointy" accentColor="var(--color-warning)" />
        </div>
      </Row>

      <Row
        label="Sizes xs / sm / md / lg / xl"
        code={`<SegmentedControlView options={options} value={v} onChange={setV} size="xs" />\n<SegmentedControlView options={options} value={v} onChange={setV} size="lg" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(sz => (
            <SegmentedControlView key={sz} options={SEG_OPTIONS} value={sizeVal} onChange={setSizeVal} size={sz} />
          ))}
        </div>
      </Row>

      <Row
        label="Full width — protocol switcher pattern"
        code={`<SegmentedControlView\n  options={protocolOptions}\n  value={protocol}\n  onChange={setProtocol}\n  fullWidth\n/>`}
      >
        <div style={{ width: 320 }}>
          <SegmentedControlView options={SEG_PROTOCOL_OPTIONS} value={protocol} onChange={setProtocol} fullWidth />
        </div>
      </Row>

      <Row
        label="With icons + disabled segment"
        code={`<SegmentedControlView\n  options={[\n    { value: 'rest', label: 'REST', icon: <RestApiIcon size={12} /> },\n    { value: 'graphql', label: 'GraphQL', icon: <GraphQLIcon size={12} /> },\n    { value: 'ws', label: 'WS', disabled: true },\n  ]}\n  value={v}\n  onChange={setV}\n/>`}
      >
        <SegmentedControlView
          options={[
            { value: 'rest', label: 'REST', icon: <RestApiIcon size={12} /> },
            { value: 'graphql', label: 'GraphQL', icon: <GraphQLIcon size={12} /> },
            { value: 'ws', label: 'WS', disabled: true },
          ]}
          value={withIcon}
          onChange={setWithIcon}
        />
      </Row>

      <Row
        label="Disabled control"
        code={`<SegmentedControlView options={options} value={value} onChange={() => {}} disabled />`}
      >
        <SegmentedControlView options={SEG_OPTIONS} value="opt2" onChange={() => {}} disabled />
      </Row>
    </div>
  );
}

// ─── Sprint 7, Batch A — Date & Time panels ────────────────────────────────────

function todayIso(offsetDays = 0): IsoDate {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function CalendarPanel() {
  const [single, setSingle] = useState<IsoDate | null>(todayIso());
  const [range, setRange] = useState<[IsoDate | null, IsoDate | null]>([todayIso(-3), todayIso(2)]);
  const [multi, setMulti] = useState<IsoDate[]>([todayIso(), todayIso(4)]);

  return (
    <div>
      <Row
        label="Single select — click Month or Year to jump via a scrollable dropdown"
        code={`<CalendarView mode="single" value={date} onChange={setDate} />\n// The "July" and "2026" header controls are independent\n// dropdowns — click either to open a real scrollable popup\n// list and jump to any month/year instantly.`}
      >
        <CalendarView mode="single" value={single} onChange={v => setSingle(v as IsoDate)} />
      </Row>
      <Row
        label={'Range select — rangeStyle="block" (default): connected "snake" of boxes'}
        code={`<CalendarView mode="range" value={[start, end]} onChange={setRange} color="var(--color-success)" />`}
      >
        <CalendarView mode="range" value={range} onChange={v => setRange(v as [IsoDate | null, IsoDate | null])} color="var(--color-success)" />
      </Row>
      <Row
        label="Multi select"
        code={`<CalendarView mode="multi" value={dates} onChange={setDates} color="var(--color-warning)" />`}
      >
        <CalendarView mode="multi" value={multi} onChange={v => setMulti(v as IsoDate[])} color="var(--color-warning)" />
      </Row>
      <Row
        label="Min/max bounds + sizes"
        code={`<CalendarView mode="single" value={date} onChange={setDate} minDate={minIso} maxDate={maxIso} size="xs" />`}
      >
        <CalendarView mode="single" value={single} onChange={v => setSingle(v as IsoDate)} minDate={todayIso(-5)} maxDate={todayIso(10)} size="xs" />
      </Row>
    </div>
  );
}

export function DateInputPanel() {
  const [date, setDate] = useState<IsoDate | null>(todayIso());
  const [sizeVal, setSizeVal] = useState<IsoDate | null>(todayIso());

  return (
    <div>
      <Row
        label="Basic usage"
        code={`<DateInputView value={date} onChange={setDate} placeholder="Select date…" />`}
      >
        <DateInputView value={date} onChange={setDate} style={{ width: 200 }} />
      </Row>
      <Row
        label="Sizes xs / sm / md / lg / xl"
        code={`<DateInputView value={date} onChange={setDate} size="xs" />\n<DateInputView value={date} onChange={setDate} size="lg" />`}
      >
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(sz => (
          <DateInputView key={sz} value={sizeVal} onChange={setSizeVal} size={sz} style={{ width: 180 }} />
        ))}
      </Row>
      <Row
        label="Disabled + custom accent"
        code={`<DateInputView value={date} onChange={setDate} disabled />\n<DateInputView value={date} onChange={setDate} color="var(--color-success)" />`}
      >
        <DateInputView value={date} onChange={setDate} disabled style={{ width: 180 }} />
        <DateInputView value={date} onChange={setDate} color="var(--color-success)" style={{ width: 180 }} />
      </Row>
    </div>
  );
}

export function DateRangePickerPanel() {
  const [range, setRange] = useState<[IsoDate | null, IsoDate | null]>([todayIso(-6), todayIso()]);
  const [range2, setRange2] = useState<[IsoDate | null, IsoDate | null]>([todayIso(-6), todayIso()]);
  const [range3, setRange3] = useState<[IsoDate | null, IsoDate | null]>([todayIso(-6), todayIso()]);

  return (
    <div>
      <Row
        label={'variant="panel" (default) — presets sidebar + calendar, one box'}
        code={`<DateRangePickerView value={[start, end]} onChange={setRange} variant="panel" />`}
        align="flex-start"
      >
        <DateRangePickerView value={range} onChange={setRange} variant="panel" />
      </Row>
      <Row
        label={'variant="single" — one unified box, presets as a chip row above the calendar'}
        code={`<DateRangePickerView value={[start, end]} onChange={setRange} variant="single" color="var(--color-success)" />`}
        align="flex-start"
      >
        <DateRangePickerView value={range2} onChange={setRange2} variant="single" color="var(--color-success)" />
      </Row>
      <Row
        label={'rangeStyle="tint" — soft background instead of the default connected "block" snake'}
        code={`<DateRangePickerView value={[start, end]} onChange={setRange} presets={[]} rangeStyle="tint" color="var(--color-warning)" />`}
        align="flex-start"
      >
        <DateRangePickerView value={range3} onChange={setRange3} presets={[]} rangeStyle="tint" color="var(--color-warning)" />
      </Row>
    </div>
  );
}

export function TimeWheelPanel() {
  const [time12, setTime12] = useState<TimeWheelValue>({ hour: 9, minute: 30, meridiem: 'AM' });
  const [time24, setTime24] = useState<TimeWheelValue>({ hour: 14, minute: 45 });
  const [step5, setStep5] = useState<TimeWheelValue>({ hour: 6, minute: 15, meridiem: 'PM' });

  return (
    <div>
      <Row
        label="12-hour (default)"
        code={`<TimeWheelView value={{ hour: 9, minute: 30, meridiem: 'AM' }} onChange={setTime} />`}
      >
        <TimeWheelView value={time12} onChange={setTime12} style={{ width: 220 }} />
      </Row>
      <Row
        label="24-hour mode"
        code={`<TimeWheelView value={{ hour: 14, minute: 45 }} onChange={setTime} use24Hour />`}
      >
        <TimeWheelView value={time24} onChange={setTime24} use24Hour style={{ width: 160 }} />
      </Row>
      <Row
        label="5-minute step + custom accent"
        code={`<TimeWheelView value={time} onChange={setTime} minuteStep={5} color="var(--color-success)" />`}
      >
        <TimeWheelView value={step5} onChange={setStep5} minuteStep={5} color="var(--color-success)" style={{ width: 220 }} />
      </Row>
    </div>
  );
}

export function CountdownRingPanel() {
  return (
    <div>
      <Row
        label="Duration countdown (60s)"
        code={`<CountdownRingView durationSeconds={60} label="Session expires" />`}
      >
        <CountdownRingView durationSeconds={60} label="Session expires" />
      </Row>
      <Row
        label="Sizes xs / sm / md / lg / xl"
        code={`<CountdownRingView durationSeconds={120} size="xs" />\n<CountdownRingView durationSeconds={120} size="lg" />`}
      >
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(sz => (
          <CountdownRingView key={sz} durationSeconds={120} size={sz} />
        ))}
      </Row>
      <Row
        label="Target Date + custom accent"
        code={`<CountdownRingView target={new Date(Date.now() + 90_000)} color="var(--color-warning)" label="Rate limit reset" />`}
      >
        <CountdownRingView target={new Date(Date.now() + 90_000)} color="var(--color-warning)" label="Rate limit reset" />
      </Row>
    </div>
  );
}

// ─── Sprint 7 · Batch B — Form & Selection panels ──────────────────────────────

export function RadioGroupPanel() {
  const [v1, setV1] = useState('json');
  const [v2, setV2] = useState('get');
  return (
    <div>
      <Row label="With descriptions" code={`<RadioGroupView options={bodyTypes} value={value} onChange={setValue} />`}>
        <RadioGroupView
          value={v1}
          onChange={setV1}
          options={[
            { value: 'json', label: 'JSON', description: 'application/json request body' },
            { value: 'form', label: 'Form Data', description: 'multipart/form-data' },
            { value: 'raw', label: 'Raw', description: 'Plain text body' },
          ]}
        />
      </Row>
      <Row label="Horizontal, custom accent" code={`<RadioGroupView options={methods} value={value} onChange={setValue} direction="horizontal" accentColor="var(--color-success)" />`}>
        <RadioGroupView
          value={v2}
          onChange={setV2}
          direction="horizontal"
          accentColor="var(--color-success)"
          options={[{ value: 'get', label: 'GET' }, { value: 'post', label: 'POST' }, { value: 'delete', label: 'DELETE', disabled: true }]}
        />
      </Row>
    </div>
  );
}

export function RadioCardPanel() {
  const [plan, setPlan] = useState('pro');
  return (
    <div>
      <Row label="Plan selector — 3 columns" code={`<RadioCardView columns={3} options={plans} value={plan} onChange={setPlan} />`}>
        <div style={{ width: '100%' }}>
          <RadioCardView
            columns={3}
            value={plan}
            onChange={setPlan}
            options={[
              { value: 'free', label: 'Free', description: '100 requests/mo' },
              { value: 'pro', label: 'Pro', description: 'Unlimited requests', icon: <SparkleIcon size={16} /> },
              { value: 'team', label: 'Team', description: 'Shared workspaces' },
            ]}
          />
        </div>
      </Row>
    </div>
  );
}

export function RatingPanel() {
  const [v1, setV1] = useState(3);
  const [v2, setV2] = useState(3.5);
  return (
    <div>
      <Row label="Stars — whole steps" code={`<RatingView value={value} onChange={setValue} />`}>
        <RatingView value={v1} onChange={setV1} />
      </Row>
      <Row label="Half-steps + heart icon" code={`<RatingView value={value} onChange={setValue} allowHalf icon="heart" color="var(--color-error)" />`}>
        <RatingView value={v2} onChange={setV2} allowHalf icon="heart" color="var(--color-error)" />
      </Row>
      <Row label="Read-only" code={`<RatingView value={4.5} allowHalf readOnly />`}>
        <RatingView value={4.5} allowHalf readOnly />
      </Row>
    </div>
  );
}

export function OtpInputPanel() {
  const [otp, setOtp] = useState('');
  return (
    <div>
      <Row label="6-digit code — auto-advance, paste-splits, onComplete" code={`<OtpInputView value={otp} onChange={setOtp} length={6} onComplete={code => verify(code)} />`}>
        <OtpInputView value={otp} onChange={setOtp} length={6} onComplete={() => {}} />
      </Row>
      <Row label="4-digit, custom accent" code={`<OtpInputView value={otp} onChange={setOtp} length={4} color="var(--color-success)" />`}>
        <OtpInputView value="" onChange={() => {}} length={4} color="var(--color-success)" />
      </Row>
    </div>
  );
}

export function PhoneInputPanel() {
  const [country, setCountry] = useState('US');
  const [number, setNumber] = useState('');
  return (
    <div>
      <Row label="Country select + number" code={`<PhoneInputView countryCode={country} onCountryChange={setCountry} number={number} onNumberChange={setNumber} />`}>
        <PhoneInputView countryCode={country} onCountryChange={setCountry} number={number} onNumberChange={setNumber} style={{ width: 260 }} />
      </Row>
    </div>
  );
}

export function ColorPickerPanel() {
  const [color, setColor] = useState('#6366F1');
  return (
    <div>
      <Row label="Swatch grid + hex input" code={`<ColorPickerView value={color} onChange={setColor} />`}>
        <ColorPickerView value={color} onChange={setColor} />
      </Row>
    </div>
  );
}

export function IconPickerPanel() {
  const [icon, setIcon] = useState<string | null>('SparkleIcon');
  return (
    <div>
      <Row label="Searchable icon grid — all DUI icons" code={`<IconPickerView value={iconName} onChange={setIconName} />`}>
        <IconPickerView value={icon} onChange={setIcon} />
      </Row>
    </div>
  );
}

export function EmojiPickerPanel() {
  const [emoji, setEmoji] = useState<string | null>('🚀');
  return (
    <div>
      <Row label="Categorized grid + search" code={`<EmojiPickerView value={emoji} onChange={setEmoji} />`}>
        <EmojiPickerView value={emoji} onChange={setEmoji} />
      </Row>
    </div>
  );
}

export function FileDropzonePanel() {
  const [files, setFiles] = useState<FileDropzoneEntry[]>([]);
  return (
    <div>
      <Row label="Drag-drop + file list" code={`<FileDropzoneView files={files} onFilesAdded={addFiles} onRemove={removeFile} />`} align="flex-start">
        <div style={{ width: 360 }}>
          <FileDropzoneView
            files={files}
            onFilesAdded={fs => setFiles(prev => [...prev, ...fs.map(file => ({ file, progress: 100 }))])}
            onRemove={i => setFiles(prev => prev.filter((_, idx) => idx !== i))}
          />
        </div>
      </Row>
    </div>
  );
}

export function AvatarUploadPanel() {
  const [src, setSrc] = useState<string | null>(null);
  return (
    <div>
      <Row label="Circular avatar + camera overlay" code={`<AvatarUploadView src={avatarUrl} onFileSelected={file => upload(file)} initials="SV" />`}>
        <AvatarUploadView src={src} onFileSelected={f => setSrc(URL.createObjectURL(f))} initials="SV" />
      </Row>
    </div>
  );
}

export function MaskedInputPanel() {
  const [phone, setPhone] = useState('');
  const [card, setCard] = useState('');
  return (
    <div>
      <Row label={'Phone mask "999-999-9999"'} code={`<MaskedInputView mask="999-999-9999" value={phone} onChange={setPhone} />`}>
        <MaskedInputView mask="999-999-9999" value={phone} onChange={setPhone} />
      </Row>
      <Row label={'Card mask "9999 9999 9999 9999"'} code={`<MaskedInputView mask="9999 9999 9999 9999" value={card} onChange={setCard} />`}>
        <MaskedInputView mask="9999 9999 9999 9999" value={card} onChange={setCard} style={{ width: 220 }} />
      </Row>
    </div>
  );
}

export function TransferListPanel() {
  const [selected, setSelected] = useState<string[]>(['read', 'write']);
  const permissions = [
    { value: 'read', label: 'Read' },
    { value: 'write', label: 'Write' },
    { value: 'delete', label: 'Delete' },
    { value: 'admin', label: 'Admin' },
    { value: 'billing', label: 'Billing' },
  ];
  return (
    <div>
      <Row label="Permission assignment" code={`<TransferListView items={permissions} value={selected} onChange={setSelected} />`} align="flex-start">
        <TransferListView items={permissions} value={selected} onChange={setSelected} style={{ width: 420 }} />
      </Row>
    </div>
  );
}

export function StepperInputPanel() {
  const [v1, setV1] = useState(3);
  const [v2, setV2] = useState(30);
  return (
    <div>
      <Row label="Basic — min 0" code={`<StepperInputView value={value} onChange={setValue} min={0} max={10} />`}>
        <StepperInputView value={v1} onChange={setV1} min={0} max={10} />
      </Row>
      <Row label="Step 5 — timeout (seconds)" code={`<StepperInputView value={value} onChange={setValue} min={0} max={120} step={5} color="var(--color-warning)" />`}>
        <StepperInputView value={v2} onChange={setV2} min={0} max={120} step={5} color="var(--color-warning)" />
      </Row>
    </div>
  );
}

export function SwitchGroupPanel() {
  const [checked, setChecked] = useState<string[]>(['ssl', 'redirects']);
  return (
    <div>
      <Row label="Settings.app-style grouped toggles" code={`<SwitchGroupView title="Request Options" items={items} checked={checked} onChange={setChecked} />`} align="flex-start">
        <div style={{ width: 340 }}>
          <SwitchGroupView
            title="Request Options"
            checked={checked}
            onChange={setChecked}
            items={[
              { value: 'ssl', label: 'Verify SSL', description: 'Reject self-signed certificates', icon: <KeyIcon size={14} /> },
              { value: 'redirects', label: 'Follow redirects', description: 'Auto-follow 3xx responses' },
              { value: 'gzip', label: 'Accept gzip', description: 'Request compressed responses', disabled: true },
            ]}
          />
        </div>
      </Row>
    </div>
  );
}

// ─── Sprint 7 · Batch C — Feedback & Status panels ─────────────────────────────

export function SnackbarPanel() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Row label="Single-line bottom bar + action, auto-dismisses (pauses on hover)" code={`<SnackbarView open={open} message="Environment saved" actionLabel="Undo" onAction={undo} onClose={() => setOpen(false)} />`}>
        <ButtonView label="Show snackbar" variant="secondary" size="sm" onClick={() => setOpen(true)} />
        {open && (
          <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}>
            <SnackbarView open={open} message="Environment saved" actionLabel="Undo" onAction={() => {}} onClose={() => setOpen(false)} />
          </div>
        )}
      </Row>
    </div>
  );
}

export function BannerPanel() {
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);
  return (
    <div>
      <Row label="Info banner with action" code={`<BannerView open={open} variant="info" message="A new version is available." actionLabel="Refresh" onAction={refresh} onDismiss={() => setOpen(false)} />`}>
        <div style={{ width: '100%' }}>
          <BannerView open={open1} variant="info" message="A new version is available." actionLabel="Refresh" onAction={() => {}} onDismiss={() => setOpen1(false)} />
        </div>
      </Row>
      <Row label="Warning banner, no dismiss" code={`<BannerView open={open} variant="warning" message="Rate limit at 80% for this workspace." />`}>
        <div style={{ width: '100%' }}>
          <BannerView open={open2} variant="warning" message="Rate limit at 80% for this workspace." />
        </div>
      </Row>
    </div>
  );
}

export function ProgressRingPanel() {
  return (
    <div>
      <Row label="Determinate — 35% / 70% / 100%" code={`<ProgressRingView value={70} />`}>
        <ProgressRingView value={35} size="sm" />
        <ProgressRingView value={70} />
        <ProgressRingView value={100} color="var(--color-success)" />
      </Row>
      <Row label="Indeterminate (spinning)" code={`<ProgressRingView />`}>
        <ProgressRingView />
      </Row>
    </div>
  );
}

export function ProgressBarPanel() {
  return (
    <div>
      <Row label="Determinate, with buffer" code={`<ProgressBarView value={45} buffer={70} style={{ width: 240 }} />`}>
        <ProgressBarView value={45} buffer={70} style={{ width: 240 }} />
      </Row>
      <Row label="Indeterminate" code={`<ProgressBarView style={{ width: 240 }} />`}>
        <ProgressBarView style={{ width: 240 }} />
      </Row>
      <Row label="Sizes xs / md / xl" code={`<ProgressBarView value={60} size="xs" style={{ width: 200 }} />`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ProgressBarView value={60} size="xs" style={{ width: 200 }} />
          <ProgressBarView value={60} size="md" style={{ width: 200 }} />
          <ProgressBarView value={60} size="xl" style={{ width: 200 }} />
        </div>
      </Row>
    </div>
  );
}

export function SkeletonPanel() {
  return (
    <div>
      <Row label="Text lines" code={`<SkeletonView variant="text" lines={3} />`}>
        <div style={{ width: 260 }}><SkeletonView variant="text" lines={3} /></div>
      </Row>
      <Row label="Row — avatar + 2 lines" code={`<SkeletonView variant="row" />`}>
        <div style={{ width: 260 }}><SkeletonView variant="row" /></div>
      </Row>
      <Row label="Block + Avatar primitives" code={`<SkeletonView variant="block" height={80} />\n<SkeletonView variant="avatar" />`}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 120 }}><SkeletonView variant="block" height={60} /></div>
          <SkeletonView variant="avatar" />
        </div>
      </Row>
    </div>
  );
}

export function NotificationBadgePanel() {
  return (
    <div>
      <Row label="Count + dot + overflow (max)" code={`<NotificationBadgeView count={3}><IconButtonView icon={<BellIcon />} /></NotificationBadgeView>`}>
        <NotificationBadgeView count={3}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)' }} />
        </NotificationBadgeView>
        <NotificationBadgeView dot>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)' }} />
        </NotificationBadgeView>
        <NotificationBadgeView count={128} max={99}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)' }} />
        </NotificationBadgeView>
      </Row>
    </div>
  );
}

export function AvatarPanel() {
  return (
    <div>
      <Row label="Initials, image, with presence dot" code={`<AvatarView name="Salil Vasa Nair" status="online" />`}>
        <AvatarView name="Salil Vasa Nair" status="online" />
        <AvatarView name="Jordan Lee" status="away" color="var(--color-success)" />
        <AvatarView src="https://i.pravatar.cc/100?img=12" name="River Chen" status="busy" />
      </Row>
      <Row label="Sizes xs / md / xl" code={`<AvatarView name="AB" size="xl" />`}>
        <AvatarView initials="AB" size="xs" />
        <AvatarView initials="AB" size="md" />
        <AvatarView initials="AB" size="xl" />
      </Row>
    </div>
  );
}

export function AvatarGroupPanel() {
  const members = [
    { name: 'Salil Vasa Nair' },
    { name: 'Jordan Lee' },
    { src: 'https://i.pravatar.cc/100?img=12', name: 'River Chen' },
    { name: 'Amara Okafor' },
    { name: 'Priya Sharma' },
    { name: 'Tomas Ruiz' },
  ];
  return (
    <div>
      <Row label="Overlapping stack, max 4 + overflow" code={`<AvatarGroupView members={members} max={4} />`}>
        <AvatarGroupView members={members} max={4} />
      </Row>
    </div>
  );
}

export function PresenceDotPanel() {
  return (
    <div>
      <Row label="online / away / busy / offline" code={`<PresenceDotView status="online" />`}>
        <PresenceDotView status="online" />
        <PresenceDotView status="away" />
        <PresenceDotView status="busy" />
        <PresenceDotView status="offline" />
      </Row>
    </div>
  );
}

export function ConfettiBurstPanel() {
  const ref = useRef<ConfettiBurstHandle>(null);
  return (
    <div>
      <Row label="Imperative celebration burst — fire() from any event handler" code={`const ref = useRef(null);\n<ConfettiBurstView ref={ref} />\n<ButtonView onClick={() => ref.current.fire()}>Celebrate</ButtonView>`}>
        <ButtonView label="🎉 Celebrate" variant="primary" size="sm" onClick={e => ref.current?.fire({ x: e.clientX, y: e.clientY })} />
        <ConfettiBurstView ref={ref} />
      </Row>
    </div>
  );
}

// ─── Sprint 7 · Batch D — Overlays & Navigation panels ─────────────────────────

export function PopoverPanel() {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <div>
      <Row label="Generic anchored floating content" code={`const [anchor, setAnchor] = useState(null);\n<span ref={setAnchor}><ButtonView onClick={() => setOpen(true)}>Open</ButtonView></span>\n<PopoverView open={open} anchorEl={anchor} onClose={() => setOpen(false)}>\n  Any content here\n</PopoverView>`}>
        <span ref={setAnchor} style={{ display: 'inline-flex' }}>
          <ButtonView label="Open popover" variant="secondary" size="sm" onClick={() => setOpen(o => !o)} />
        </span>
        <PopoverView open={open} anchorEl={anchor} onClose={() => setOpen(false)}>
          <div style={{ width: 200, fontSize: 12, color: 'var(--color-text-primary)' }}>
            Any content can go here — forms, lists, menus.
          </div>
        </PopoverView>
      </Row>
    </div>
  );
}

export function TooltipPanel() {
  return (
    <div>
      <Row label="Hover/focus tooltip primitive — top / bottom / right (wrap non-ref-forwarding triggers in a span)" code={`<TooltipView content="Copy to clipboard" placement="top">\n  <span><ButtonView>Top</ButtonView></span>\n</TooltipView>`}>
        <TooltipView content="Copy to clipboard" placement="top">
          <span style={{ display: 'inline-flex' }}><ButtonView label="Top" variant="secondary" size="sm" /></span>
        </TooltipView>
        <TooltipView content="Delete this request" placement="bottom">
          <span style={{ display: 'inline-flex' }}><ButtonView label="Bottom" variant="secondary" size="sm" /></span>
        </TooltipView>
        <TooltipView content="Send to workspace" placement="right">
          <span style={{ display: 'inline-flex' }}><ButtonView label="Right" variant="secondary" size="sm" /></span>
        </TooltipView>
      </Row>
    </div>
  );
}

export function DrawerPanel() {
  const [edge, setEdge] = useState<'left' | 'right' | 'top' | 'bottom' | null>(null);
  return (
    <div>
      <Row label="Slide-in overlay, any edge" code={`<DrawerView open={open} edge="right" title="Environment" onClose={() => setOpen(false)}>\n  ...\n</DrawerView>`}>
        <ButtonView label="Left" variant="secondary" size="sm" onClick={() => setEdge('left')} />
        <ButtonView label="Right" variant="secondary" size="sm" onClick={() => setEdge('right')} />
        <ButtonView label="Top" variant="secondary" size="sm" onClick={() => setEdge('top')} />
        <ButtonView label="Bottom" variant="secondary" size="sm" onClick={() => setEdge('bottom')} />
        <DrawerView open={!!edge} edge={edge ?? 'right'} title="Environment" onClose={() => setEdge(null)}>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Drawer content — forms, settings, filters.</div>
        </DrawerView>
      </Row>
    </div>
  );
}

export function ActionSheetPanel() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Row label="Bottom sheet action list + cancel" code={`<ActionSheetView\n  open={open}\n  title="Manage request"\n  items={[\n    { label: 'Duplicate', onClick: duplicate },\n    { label: 'Delete', danger: true, onClick: del },\n  ]}\n  onClose={() => setOpen(false)}\n/>`}>
        <ButtonView label="Open action sheet" variant="secondary" size="sm" onClick={() => setOpen(true)} />
        <ActionSheetView
          open={open}
          title="Manage request"
          onClose={() => setOpen(false)}
          items={[
            { label: 'Duplicate', icon: <CopyIcon size={15} />, onClick: () => {} },
            { label: 'Share', icon: <ShareIcon size={15} />, onClick: () => {} },
            { label: 'Delete', icon: <TrashIcon size={15} />, danger: true, onClick: () => {} },
          ]}
        />
      </Row>
    </div>
  );
}

export function BottomSheetPanel() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Row label="Drag-to-dismiss mobile sheet — distinct from the persistent BottomPanelView" code={`<BottomSheetView open={open} title="Request Options" onClose={() => setOpen(false)}>\n  ...\n</BottomSheetView>`}>
        <ButtonView label="Open bottom sheet" variant="secondary" size="sm" onClick={() => setOpen(true)} />
        <BottomSheetView open={open} title="Request Options" onClose={() => setOpen(false)} heightRatio={0.4}>
          <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Drag the handle down to dismiss.</div>
        </BottomSheetView>
      </Row>
    </div>
  );
}

export function SpotlightTourPanel() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const steps = [
    { target: '#tour-target-1', title: 'Send requests', content: 'Build and fire off HTTP requests from here.' },
    { target: '#tour-target-2', title: 'Save to a collection', content: 'Organize related requests together.' },
  ];
  return (
    <div>
      <Row label="Coach-mark onboarding — spotlight cutout + step tooltip" code={`<SpotlightTourView open={open} steps={steps} stepIndex={step} onNext={...} onPrev={...} onClose={...} />`}>
        <ButtonView id="tour-target-1" label="Send" variant="primary" size="sm" onClick={() => setOpen(true)} />
        <ButtonView id="tour-target-2" label="Save" variant="secondary" size="sm" />
        <SpotlightTourView
          open={open}
          steps={steps}
          stepIndex={step}
          onNext={() => setStep(s => Math.min(steps.length - 1, s + 1))}
          onPrev={() => setStep(s => Math.max(0, s - 1))}
          onClose={() => { setOpen(false); setStep(0); }}
        />
      </Row>
    </div>
  );
}

export function FabPanel() {
  return (
    <div style={{ position: 'relative', height: 160 }}>
      <Row label="Standard FAB + speed-dial (relative-positioned demo box below)" code={`<FabView actions={[\n  { icon: <FolderIcon />, label: 'New Folder', onClick: newFolder },\n  { icon: <DownloadIcon />, label: 'Import', onClick: importFile },\n]} />`}>
        <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>See the floating buttons in the box below ↓</span>
      </Row>
      <div style={{ position: 'relative', height: 140, border: '1px dashed var(--color-surface-border)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
          <FabView
            actions={[
              { icon: <FolderIcon size={16} />, label: 'New Folder', onClick: () => {} },
              { icon: <DownloadIcon size={16} />, label: 'Import', onClick: () => {} },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export function DockPanel() {
  const [active, setActive] = useState('server');
  return (
    <div>
      <Row label="Magnify-on-hover dock" code={`<DockView items={items} onSelect={setActive} />`}>
        <DockView
          onSelect={setActive}
          items={[
            { id: 'server', icon: <ServerIcon size={18} />, label: 'Servers', active: active === 'server' },
            { id: 'globe', icon: <GlobeIcon size={18} />, label: 'Network', active: active === 'globe' },
            { id: 'settings', icon: <SettingsIcon size={18} />, label: 'Settings', active: active === 'settings' },
            { id: 'folder', icon: <FolderIcon size={18} />, label: 'Collections', active: active === 'folder' },
          ]}
        />
      </Row>
    </div>
  );
}

export function BreadcrumbPanel() {
  return (
    <div>
      <Row label="Full trail" code={`<BreadcrumbView items={[{ label: 'Workspace', onClick: go }, { label: 'Collections', onClick: go }, { label: 'Users API' }]} />`}>
        <BreadcrumbView items={[{ label: 'Workspace', onClick: () => {} }, { label: 'Collections', onClick: () => {} }, { label: 'Users API' }]} />
      </Row>
      <Row label="Overflow-collapse — long trail" code={`<BreadcrumbView items={longTrail} maxVisible={4} />`}>
        <BreadcrumbView
          maxVisible={4}
          items={[
            { label: 'Workspace', onClick: () => {} },
            { label: 'Collections', onClick: () => {} },
            { label: 'Public APIs', onClick: () => {} },
            { label: 'Weather', onClick: () => {} },
            { label: 'v2', onClick: () => {} },
            { label: 'Current Conditions' },
          ]}
        />
      </Row>
    </div>
  );
}

export function PaginationPanel() {
  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(12);
  return (
    <div>
      <Row label="Short range — no collapse" code={`<PaginationView page={page} totalPages={5} onChange={setPage} />`}>
        <PaginationView page={page} totalPages={5} onChange={setPage} />
      </Row>
      <Row label="Long range — ellipsis ⋯ collapse" code={`<PaginationView page={page} totalPages={40} onChange={setPage} />`}>
        <PaginationView page={page2} totalPages={40} onChange={setPage2} />
      </Row>
    </div>
  );
}

// ─── Sprint 7 · Batch F — Layout & Structural panels ───────────────────────────

export function HeroPanel() {
  return (
    <div>
      <Row label="Title + subtitle + CTA" code={`<HeroView\n  title="Build APIs faster"\n  subtitle="Design, test, and document HTTP, GraphQL, and gRPC APIs in one workspace."\n  actions={<ButtonView variant="primary">Get Started</ButtonView>}\n/>`}>
        <div style={{ width: '100%' }}>
          <HeroView
            title="Build APIs faster"
            subtitle="Design, test, and document HTTP, GraphQL, and gRPC APIs in one workspace."
            actions={<ButtonView variant="primary" label="Get Started" />}
            size="sm"
          />
        </div>
      </Row>
    </div>
  );
}

export function LevelPanel() {
  return (
    <div>
      <Row label="Toolbar row — left group / right group" code={`<LevelView\n  left={<span>142 requests</span>}\n  right={<ButtonView size="sm">Export</ButtonView>}\n/>`}>
        <div style={{ width: '100%', padding: 10, border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <LevelView
            left={<span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)' }}>142 requests</span>}
            right={<ButtonView label="Export" variant="secondary" size="sm" />}
          />
        </div>
      </Row>
    </div>
  );
}

export function MediaObjectPanel() {
  return (
    <div>
      <Row label="Avatar + content + actions" code={`<MediaObjectView media={<AvatarView name="Jordan Lee" />} actions={<IconButtonView icon={<MoreHorizontalIcon />} />}>\n  <b>Jordan Lee</b> commented on your request\n</MediaObjectView>`}>
        <div style={{ width: '100%' }}>
          <MediaObjectView
            media={<div style={{ width: 32, height: 32, borderRadius: '999px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 12 }}>JL</div>}
            actions={<IconButtonView icon={<MoreHorizontalIcon size={14} />} variant="ghost" size="sm" />}
          >
            <b>Jordan Lee</b> commented on your request — "Can we add a retry policy here?"
          </MediaObjectView>
        </div>
      </Row>
    </div>
  );
}

export function TileGridPanel() {
  return (
    <div>
      <Row label="Nested ancestor/parent/child grid" code={`<TileGridView nodes={[\n  { content: <Box>A</Box>, weight: 2 },\n  { children: [{ content: <Box>B</Box> }, { content: <Box>C</Box> }], vertical: true },\n]} />`}>
        <div style={{ width: '100%', height: 120 }}>
          <TileGridView
            nodes={[
              { content: <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)', borderRadius: 8, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>A</div>, weight: 2 },
              { vertical: true, children: [
                { content: <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)', borderRadius: 8, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>B</div> },
                { content: <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)', borderRadius: 8, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>C</div> },
              ] },
            ]}
          />
        </div>
      </Row>
    </div>
  );
}

export function PanelListPanel() {
  const [active, setActive] = useState('users');
  const [tab, setTab] = useState('collections');
  return (
    <div>
      <Row label="Heading + tabs + filterable list" code={`<PanelListView\n  heading="Workspace"\n  tabs={[{ id: 'collections', label: 'Collections' }, { id: 'history', label: 'History' }]}\n  activeTab={tab}\n  onTabChange={setTab}\n  items={items}\n/>`}>
        <div style={{ width: 280 }}>
          <PanelListView
            heading="Workspace"
            tabs={[{ id: 'collections', label: 'Collections' }, { id: 'history', label: 'History' }]}
            activeTab={tab}
            onTabChange={setTab}
            items={[
              { value: 'users', label: 'Users API', active: active === 'users', onClick: () => setActive('users') },
              { value: 'orders', label: 'Orders API', active: active === 'orders', onClick: () => setActive('orders') },
              { value: 'payments', label: 'Payments API', active: active === 'payments', onClick: () => setActive('payments') },
            ]}
          />
        </div>
      </Row>
    </div>
  );
}

export function NavbarPanel() {
  return (
    <div>
      <Row label="Brand + links + right slot" code={`<NavbarView\n  brand="Daakia"\n  links={[{ id: 'requests', label: 'Requests', active: true }, { id: 'docs', label: 'Docs' }]}\n  right={<ButtonView size="sm">Sign in</ButtonView>}\n/>`}>
        <div style={{ width: '100%' }}>
          <NavbarView
            brand="Daakia"
            links={[{ id: 'requests', label: 'Requests', active: true }, { id: 'docs', label: 'Docs' }, { id: 'settings', label: 'Settings' }]}
            right={<ButtonView label="Sign in" variant="secondary" size="sm" />}
          />
        </div>
      </Row>
    </div>
  );
}

export function AffixPanel() {
  return (
    <div>
      <Row label="Sticky-on-scroll wrapper — scroll this box" code={`<AffixView offsetTop={0}>\n  <div>Pinned toolbar</div>\n</AffixView>`}>
        <div style={{ width: '100%', height: 160, overflow: 'auto', border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <AffixView offsetTop={0}>
            <div style={{ background: 'var(--color-surface)', padding: 8, fontSize: 12, fontWeight: 700, borderBottom: '1px solid var(--color-surface-border)' }}>Pinned toolbar</div>
          </AffixView>
          <div style={{ padding: 12, fontSize: 12, color: 'var(--color-text-muted)', height: 320 }}>Scroll down — the toolbar above sticks to the top of this box.</div>
        </div>
      </Row>
    </div>
  );
}

export function AnchorPanel() {
  return (
    <div>
      <Row label="Scroll-spy in-page nav — click a link or scroll the box" code={`<AnchorView links={[{ id: 'intro', label: 'Introduction' }, { id: 'auth', label: 'Authentication' }]} />`}>
        <div style={{ display: 'flex', gap: 16, width: '100%' }}>
          <AnchorView links={[{ id: 'pl-intro', label: 'Introduction' }, { id: 'pl-auth', label: 'Authentication' }, { id: 'pl-errors', label: 'Errors' }]} />
          <div style={{ flex: 1, height: 160, overflow: 'auto', border: '1px solid var(--color-surface-border)', borderRadius: 8, padding: 12, fontSize: 12, color: 'var(--color-text-muted)' }}>
            <h4 id="pl-intro" style={{ color: 'var(--color-text-primary)' }}>Introduction</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div style={{ height: 100 }} />
            <h4 id="pl-auth" style={{ color: 'var(--color-text-primary)' }}>Authentication</h4>
            <p>Use a Bearer token in the Authorization header.</p>
            <div style={{ height: 100 }} />
            <h4 id="pl-errors" style={{ color: 'var(--color-text-primary)' }}>Errors</h4>
            <p>All errors return a standard JSON envelope.</p>
          </div>
        </div>
      </Row>
    </div>
  );
}

export function StickyHeaderPanel() {
  return (
    <div>
      <Row label="Sticky header, shadow grows once pinned — scroll this box" code={`<StickyHeaderView>Response Headers</StickyHeaderView>`}>
        <div style={{ width: '100%', height: 160, overflow: 'auto', border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <StickyHeaderView>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-primary)' }}>Response Headers</span>
          </StickyHeaderView>
          <div style={{ padding: 12, fontSize: 12, color: 'var(--color-text-muted)', height: 320 }}>Scroll down to see the shadow appear beneath the sticky header.</div>
        </div>
      </Row>
    </div>
  );
}

export function AspectRatioPanel() {
  return (
    <div>
      <Row label="16:9 (default) and 1:1" code={`<AspectRatioView ratio={16/9}>\n  <img src="..." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />\n</AspectRatioView>`}>
        <div style={{ width: 180 }}>
          <AspectRatioView>
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-success))' }} />
          </AspectRatioView>
        </div>
        <div style={{ width: 100 }}>
          <AspectRatioView ratio={1}>
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--color-warning), var(--color-error))' }} />
          </AspectRatioView>
        </div>
      </Row>
    </div>
  );
}

export function MasonryGridPanel() {
  const heights = [80, 120, 60, 100, 140, 70];
  return (
    <div>
      <Row label="Pinterest-style column-balanced layout" code={`<MasonryGridView columns={3}>\n  {cards.map(c => <Card key={c.id}>{c.content}</Card>)}\n</MasonryGridView>`} align="flex-start">
        <div style={{ width: '100%' }}>
          <MasonryGridView columns={3}>
            {heights.map((h, i) => (
              <div key={i} style={{ height: h, background: 'var(--color-surface)', border: '1px solid var(--color-surface-border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--color-text-muted)' }}>
                Card {i + 1}
              </div>
            ))}
          </MasonryGridView>
        </div>
      </Row>
    </div>
  );
}

export function ScrollAreaPanel() {
  return (
    <div>
      <Row label="Custom accent-tinted scrollbar" code={`<ScrollAreaView maxHeight={140}>\n  {longContent}\n</ScrollAreaView>`}>
        <div style={{ width: 260 }}>
          <ScrollAreaView maxHeight={120}>
            <div style={{ padding: 8, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 2 }}>
              {Array.from({ length: 20 }, (_, i) => <div key={i}>Row {i + 1}</div>)}
            </div>
          </ScrollAreaView>
        </div>
      </Row>
    </div>
  );
}

export function BackToTopPanel() {
  return (
    <div>
      <Row label="Floating scroll-to-top — appears past a scroll threshold (scroll the showcase page to see it)" code={`<BackToTopView threshold={240} />`}>
        <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Scroll this page down 240px+ to see the button appear in the bottom-right corner.</span>
        <BackToTopView threshold={240} />
      </Row>
    </div>
  );
}

export function WatermarkPanel() {
  return (
    <div>
      <Row label="Repeated diagonal text overlay" code={`<WatermarkView text="CONFIDENTIAL">\n  <div>Protected content</div>\n</WatermarkView>`}>
        <div style={{ width: '100%' }}>
          <WatermarkView text="DAAKIA · DEMO">
            <div style={{ height: 120, border: '1px solid var(--color-surface-border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--color-text-muted)' }}>
              Protected content sits beneath the watermark
            </div>
          </WatermarkView>
        </div>
      </Row>
    </div>
  );
}

// ─── Sprint 7 · Batch G — Data & Enterprise panels ─────────────────────────────

export function DescriptionsPanel() {
  return (
    <div>
      <Row label="Read-only entity detail grid" code={`<DescriptionsView\n  title="Request Details"\n  items={[{ label: 'Method', value: 'POST' }, { label: 'Status', value: '200 OK' }]}\n/>`}>
        <div style={{ width: '100%' }}>
          <DescriptionsView
            title="Request Details"
            items={[
              { label: 'Method', value: 'POST' },
              { label: 'Status', value: '200 OK' },
              { label: 'URL', value: 'api.example.com/users', span: 2 },
              { label: 'Duration', value: '142ms' },
              { label: 'Size', value: '2.4 KB' },
            ]}
          />
        </div>
      </Row>
    </div>
  );
}

export function StatisticPanel() {
  return (
    <div>
      <Row label="Animated count-up, prefix/suffix" code={`<StatisticView label="Requests today" value={1420} />\n<StatisticView label="Success rate" value={99.2} suffix="%" precision={1} />`}>
        <StatisticView label="Requests today" value={1420} />
        <StatisticView label="Success rate" value={99.2} suffix="%" precision={1} color="var(--color-success)" />
        <StatisticView label="Avg latency" value={142} suffix="ms" color="var(--color-warning)" />
      </Row>
    </div>
  );
}

export function ResultPanel() {
  return (
    <div>
      <Row label="success / error / 404" code={`<ResultView status="success" title="Request sent" subtitle="Your webhook was delivered successfully." />`}>
        <div style={{ width: '100%', display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
            <ResultView status="success" title="Request sent" subtitle="Delivered successfully." size="sm" />
          </div>
          <div style={{ flex: 1, border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
            <ResultView status="404" title="Not found" subtitle="This endpoint doesn't exist." size="sm" />
          </div>
        </div>
      </Row>
    </div>
  );
}

export function CascaderPanel() {
  const [path, setPath] = useState<string[]>(['us', 'ca']);
  return (
    <div>
      <Row label="Multi-level cascading select" code={`<CascaderView options={regions} value={path} onChange={setPath} />`}>
        <CascaderView
          value={path}
          onChange={setPath}
          options={[
            { value: 'us', label: 'United States', children: [
              { value: 'ca', label: 'California', children: [{ value: 'sf', label: 'San Francisco' }, { value: 'la', label: 'Los Angeles' }] },
              { value: 'ny', label: 'New York' },
            ] },
            { value: 'in', label: 'India', children: [{ value: 'ka', label: 'Karnataka' }, { value: 'mh', label: 'Maharashtra' }] },
          ]}
        />
      </Row>
    </div>
  );
}

export function ComboBoxPanel() {
  const [val, setVal] = useState('GET');
  return (
    <div>
      <Row label="Free-text + filtered suggestions" code={`<ComboBoxView options={methods} value={value} onChange={setValue} />`}>
        <ComboBoxView
          value={val}
          onChange={setVal}
          options={['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'].map(m => ({ value: m, label: m }))}
          style={{ width: 160 }}
        />
      </Row>
    </div>
  );
}

export function ListViewPanel() {
  return (
    <div>
      <Row label="Avatar/title/subtitle/action rows" code={`<ListView items={[{ id: '1', title: 'Users API', subtitle: '12 requests' }]} />`} align="flex-start">
        <div style={{ width: 280, border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <ListView
            items={[
              { id: '1', title: 'Users API', subtitle: '12 requests', avatar: <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--color-primary)' }} /> },
              { id: '2', title: 'Orders API', subtitle: '5 requests', avatar: <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--color-success)' }} /> },
              { id: '3', title: 'Payments API', subtitle: '3 requests', avatar: <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--color-warning)' }} /> },
            ]}
          />
        </div>
      </Row>
    </div>
  );
}

export function VirtualizedListPanel() {
  const items = Array.from({ length: 5000 }, (_, i) => `Row ${i + 1}`);
  return (
    <div>
      <Row label="5,000 rows — only visible ones are mounted" code={`<VirtualizedListView items={items} itemHeight={28} height={200} renderItem={item => <div>{item}</div>} />`} align="flex-start">
        <div style={{ width: 280, border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <VirtualizedListView
            items={items}
            itemHeight={28}
            height={180}
            renderItem={item => (
              <div style={{ padding: '4px 10px', fontSize: 12, color: 'var(--color-text-secondary)', borderBottom: '1px solid var(--color-surface-border)' }}>{item}</div>
            )}
          />
        </div>
      </Row>
    </div>
  );
}

export function StickyTableHeaderPanel() {
  const rows = Array.from({ length: 20 }, (_, i) => ({ id: i, name: `Item ${i + 1}`, status: i % 2 === 0 ? 'Active' : 'Paused', owner: 'Salil', updated: '2h ago' }));
  return (
    <div>
      <Row label="Sticky header + frozen first column — scroll the box" code={`<StickyTableHeaderView columns={columns} rows={rows} keyField="id" />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <StickyTableHeaderView
            keyField="id"
            maxHeight={180}
            rows={rows}
            columns={[
              { key: 'name', label: 'Name', render: r => r.name },
              { key: 'status', label: 'Status', render: r => r.status },
              { key: 'owner', label: 'Owner', render: r => r.owner },
              { key: 'updated', label: 'Updated', render: r => r.updated },
            ]}
          />
        </div>
      </Row>
    </div>
  );
}

export function TablePaginationPanel() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  return (
    <div>
      <Row label="Rows-per-page + page footer" code={`<TablePaginationView page={page} totalRows={247} rowsPerPage={rowsPerPage} onPageChange={setPage} onRowsPerPageChange={setRowsPerPage} />`}>
        <div style={{ width: '100%', border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <TablePaginationView page={page} totalRows={247} rowsPerPage={rowsPerPage} onPageChange={setPage} onRowsPerPageChange={setRowsPerPage} />
        </div>
      </Row>
    </div>
  );
}

export function FilterBarPanel() {
  const [filters, setFilters] = useState([
    { key: 'method', label: 'Method: GET' },
    { key: 'status', label: 'Status: 200' },
  ]);
  return (
    <div>
      <Row label="Active filters + clear all" code={`<FilterBarView filters={filters} onRemove={removeFilter} onClearAll={() => setFilters([])} />`}>
        <FilterBarView filters={filters} onRemove={key => setFilters(f => f.filter(x => x.key !== key))} onClearAll={() => setFilters([])} />
      </Row>
    </div>
  );
}

export function SortableHeaderPanel() {
  const [dir, setDir] = useState<SortDirection>('asc');
  return (
    <div>
      <Row label="Click to cycle asc → desc" code={`<SortableHeaderView label="Name" direction={direction} onClick={cycle} />`}>
        <SortableHeaderView
          label="Name"
          direction={dir}
          onClick={() => setDir(d => (d === 'asc' ? 'desc' : 'asc'))}
        />
      </Row>
    </div>
  );
}

export function EditableCellPanel() {
  const [val, setVal] = useState('Users API');
  return (
    <div>
      <Row label="Click to edit — Enter commits, Escape cancels" code={`<EditableCellView value={value} onChange={setValue} />`}>
        <div style={{ width: 160, border: '1px solid var(--color-surface-border)', borderRadius: 6 }}>
          <EditableCellView value={val} onChange={setVal} />
        </div>
      </Row>
    </div>
  );
}

export function DataGridToolbarPanel() {
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(['name', 'status']);
  const [density, setDensity] = useState<'compact' | 'default' | 'comfortable'>('default');
  return (
    <div>
      <Row label="Search + column visibility + density + export" code={`<DataGridToolbarView search={search} onSearchChange={setSearch} columns={columns} visibleColumns={visible} onVisibleColumnsChange={setVisible} density={density} onDensityChange={setDensity} onExport={exportCsv} />`} align="flex-start">
        <div style={{ width: '100%', border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <DataGridToolbarView
            search={search}
            onSearchChange={setSearch}
            columns={[{ key: 'name', label: 'Name' }, { key: 'status', label: 'Status' }, { key: 'owner', label: 'Owner' }]}
            visibleColumns={visible}
            onVisibleColumnsChange={setVisible}
            density={density}
            onDensityChange={setDensity}
            onExport={() => {}}
          />
        </div>
      </Row>
    </div>
  );
}

export function ColumnVisibilityPanel() {
  const [visible, setVisible] = useState(['name', 'status']);
  return (
    <div>
      <Row label="Checkbox menu to toggle table columns" code={`<ColumnVisibilityMenuView columns={columns} visible={visible} onChange={setVisible} />`}>
        <ColumnVisibilityMenuView
          columns={[{ key: 'name', label: 'Name' }, { key: 'status', label: 'Status' }, { key: 'owner', label: 'Owner' }, { key: 'updated', label: 'Updated' }]}
          visible={visible}
          onChange={setVisible}
        />
      </Row>
    </div>
  );
}

// ─── Sprint 7 · Batch J — Advanced Selection & Wizards panels ──────────────────

export function KbdPanel() {
  return (
    <div>
      <Row label="Single key + combo" code={`<KbdView keys="Esc" />\n<KbdView keys={['⌘', 'K']} />`}>
        <KbdView keys="Esc" />
        <KbdView keys={['⌘', 'K']} />
        <KbdView keys={['Ctrl', 'Shift', 'P']} />
      </Row>
    </div>
  );
}

export function WizardStepperPanel() {
  const [active, setActive] = useState('auth');
  const steps = [
    { id: 'connect', label: 'Connect' },
    { id: 'auth', label: 'Authenticate' },
    { id: 'configure', label: 'Configure' },
    { id: 'review', label: 'Review' },
  ];
  const idx = steps.findIndex(s => s.id === active);
  const completed = steps.slice(0, idx).map(s => s.id);
  return (
    <div>
      <Row label="Multi-step form wizard header" code={`<WizardStepperView steps={steps} activeStep={active} completedSteps={completed} onStepClick={setActive} />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <WizardStepperView steps={steps} activeStep={active} completedSteps={completed} onStepClick={setActive} />
        </div>
      </Row>
    </div>
  );
}

export function AccordionGroupPanel() {
  return (
    <div>
      <Row label="Single-open (default) accordion group" code={`<AccordionGroupView items={items} />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <AccordionGroupView
            items={[
              { id: 'a', title: 'Environment Variables', children: <span style={{ fontSize: 12 }}>Set per-environment values here.</span> },
              { id: 'b', title: 'Headers', children: <span style={{ fontSize: 12 }}>Default headers applied to every request.</span> },
              { id: 'c', title: 'Auth', children: <span style={{ fontSize: 12 }}>Bearer token, Basic, or OAuth 2.0.</span> },
            ]}
            defaultOpen={['a']}
          />
        </div>
      </Row>
    </div>
  );
}

export function SegmentedProgressBarPanel() {
  return (
    <div>
      <Row label="Upload pipeline stages" code={`<SegmentedProgressBarView segments={[{ label: 'Upload', status: 'done' }, { label: 'Scan', status: 'active' }, { label: 'Deploy', status: 'pending' }]} />`}>
        <div style={{ width: 260 }}>
          <SegmentedProgressBarView
            segments={[
              { label: 'Upload', status: 'done' },
              { label: 'Scan', status: 'active' },
              { label: 'Deploy', status: 'pending' },
            ]}
          />
        </div>
      </Row>
    </div>
  );
}

export function ChecklistPanel() {
  const [items, setItems] = useState([
    { id: '1', label: 'Create workspace', checked: true },
    { id: '2', label: 'Invite teammates', checked: true },
    { id: '3', label: 'Send first request', checked: false },
  ]);
  return (
    <div>
      <Row label="Todo-style checklist, strikethrough on complete" code={`<ChecklistView items={items} onToggle={toggleItem} />`} align="flex-start">
        <ChecklistView items={items} onToggle={id => setItems(prev => prev.map(i => i.id === id ? { ...i, checked: !i.checked } : i))} />
      </Row>
    </div>
  );
}

export function PriorityPickerPanel() {
  const [priority, setPriority] = useState<PriorityLevel>('high');
  return (
    <div>
      <Row label="Low / medium / high / urgent" code={`<PriorityPickerView value={priority} onChange={setPriority} />`}>
        <PriorityPickerView value={priority} onChange={setPriority} />
      </Row>
    </div>
  );
}

export function TagCloudPanel() {
  return (
    <div>
      <Row label="Font size scales with weight" code={`<TagCloudView tags={[{ label: 'rest', weight: 40 }, { label: 'graphql', weight: 22 }, { label: 'auth', weight: 15 }]} />`}>
        <TagCloudView
          tags={[
            { label: 'rest', weight: 40 },
            { label: 'graphql', weight: 22 },
            { label: 'auth', weight: 18 },
            { label: 'websocket', weight: 15 },
            { label: 'grpc', weight: 10 },
            { label: 'mock', weight: 6 },
          ]}
        />
      </Row>
    </div>
  );
}

export function RangeSliderPanel() {
  const [range, setRange] = useState<[number, number]>([20, 80]);
  return (
    <div>
      <Row label="Dual-handle min/max range" code={`<RangeSliderView value={range} onChange={setRange} showValue />`}>
        <RangeSliderView value={range} onChange={setRange} showValue />
      </Row>
    </div>
  );
}

export function VoteWidgetPanel() {
  const [score, setScore] = useState(42);
  const [vote, setVote] = useState<'up' | 'down' | null>(null);
  return (
    <div>
      <Row label="Upvote/downvote counter" code={`<VoteWidgetView score={score} userVote={vote} onVote={handleVote} />`}>
        <VoteWidgetView
          score={score}
          userVote={vote}
          onVote={v => {
            const delta = v === vote ? (v === 'up' ? -1 : 1) : v === 'up' ? (vote === 'down' ? 2 : 1) : (vote === 'up' ? -2 : -1);
            setScore(s => s + delta);
            setVote(v === vote ? null : v);
          }}
        />
      </Row>
    </div>
  );
}

export function LikeButtonPanel() {
  const [liked, setLiked] = useState(false);
  return (
    <div>
      <Row label="Animated heart toggle, pop on like" code={`<LikeButtonView liked={liked} onChange={setLiked} count={128} />`}>
        <LikeButtonView liked={liked} onChange={v => { setLiked(v); }} count={liked ? 129 : 128} />
      </Row>
    </div>
  );
}

export function BookmarkButtonPanel() {
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <Row label="Animated bookmark toggle" code={`<BookmarkButtonView saved={saved} onChange={setSaved} />`}>
        <BookmarkButtonView saved={saved} onChange={setSaved} />
      </Row>
    </div>
  );
}

export function FollowButtonPanel() {
  const [following, setFollowing] = useState(false);
  return (
    <div>
      <Row label={'Hover while following to reveal "Unfollow"'} code={`<FollowButtonView following={following} onChange={setFollowing} />`}>
        <FollowButtonView following={following} onChange={setFollowing} />
      </Row>
    </div>
  );
}

export function ShortcutRecorderPanel() {
  const [keys, setKeys] = useState(['⌘', 'K']);
  return (
    <div>
      <Row label="Click to record — press a key combo" code={`<ShortcutRecorderView value={keys} onChange={setKeys} />`}>
        <ShortcutRecorderView value={keys} onChange={setKeys} />
      </Row>
    </div>
  );
}

// ─── Sprint 7 · Batch H — Communication & Content panels ───────────────────────

export function MessageBubblePanel() {
  return (
    <div>
      <Row label="Sent (right) / received (left)" code={`<MessageBubbleView variant="sent" timestamp="10:02 AM">Sounds good, sending now.</MessageBubbleView>`} align="flex-start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
          <MessageBubbleView variant="received" timestamp="10:01 AM">Can you share the API response?</MessageBubbleView>
          <MessageBubbleView variant="sent" timestamp="10:02 AM">Sounds good, sending now.</MessageBubbleView>
        </div>
      </Row>
    </div>
  );
}

export function ChatInputPanel() {
  const [msg, setMsg] = useState('');
  return (
    <div>
      <Row label="Auto-growing composer + attach + send" code={`<ChatInputView value={msg} onChange={setMsg} onSend={send} onAttach={handleFiles} />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <ChatInputView value={msg} onChange={setMsg} onSend={() => setMsg('')} onAttach={() => {}} />
        </div>
      </Row>
    </div>
  );
}

export function TypingIndicatorPanel() {
  return (
    <div>
      <Row label="Animated dots" code={`<TypingIndicatorView label="Jordan is typing…" />`}>
        <TypingIndicatorView label="Jordan is typing…" />
      </Row>
    </div>
  );
}

export function CommentThreadPanel() {
  return (
    <div>
      <Row label="Nested replies" code={`<CommentThreadView comments={comments} onReply={handleReply} />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <CommentThreadView
            onReply={() => {}}
            comments={[
              { id: '1', author: 'Jordan Lee', timestamp: '2h ago', content: 'Should we add retry logic here?', replies: [
                { id: '2', author: 'Salil Vasa Nair', timestamp: '1h ago', content: 'Yes, exponential backoff sounds right.' },
              ] },
            ]}
          />
        </div>
      </Row>
    </div>
  );
}

export function NotificationCenterPanel() {
  return (
    <div>
      <Row label="Bell + dropdown list, unread badge" code={`<NotificationCenterView notifications={notifications} onMarkAllRead={markAllRead} />`}>
        <NotificationCenterView
          onMarkAllRead={() => {}}
          notifications={[
            { id: '1', title: 'Deploy succeeded', description: 'Production deploy #482 finished.', timestamp: '5m ago' },
            { id: '2', title: 'New comment', description: 'Jordan replied to your thread.', timestamp: '1h ago', read: true },
          ]}
        />
      </Row>
    </div>
  );
}

export function AlertDialogPanel() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Row label="Pre-built confirm/cancel, danger styling" code={`<AlertDialogView open={open} title="Delete collection?" message="This can't be undone." danger onConfirm={del} onCancel={() => setOpen(false)} />`}>
        <ButtonView label="Delete collection" variant="danger" size="sm" onClick={() => setOpen(true)} />
        <AlertDialogView
          open={open}
          title="Delete collection?"
          message="This will permanently delete the collection and all its requests. This can't be undone."
          danger
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </Row>
    </div>
  );
}

export function FeedbackWidgetPanel() {
  const [vote, setVote] = useState<'up' | 'down' | null>(null);
  const [comment, setComment] = useState('');
  return (
    <div>
      <Row label="Thumbs + optional comment" code={`<FeedbackWidgetView vote={vote} onVote={setVote} comment={comment} onCommentChange={setComment} onSubmit={submit} />`}>
        <FeedbackWidgetView vote={vote} onVote={setVote} comment={comment} onCommentChange={setComment} onSubmit={() => {}} />
      </Row>
    </div>
  );
}

export function NpsSurveyPanel() {
  const [score, setScore] = useState<number | null>(9);
  const [followUp, setFollowUp] = useState('');
  return (
    <div>
      <Row label="0-10 NPS score + follow-up" code={`<NpsSurveyView score={score} onScoreChange={setScore} followUp={followUp} onFollowUpChange={setFollowUp} onSubmit={submit} />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <NpsSurveyView score={score} onScoreChange={setScore} followUp={followUp} onFollowUpChange={setFollowUp} onSubmit={() => {}} />
        </div>
      </Row>
    </div>
  );
}

export function ShareSheetPanel() {
  return (
    <div>
      <Row label="Share targets + copy-link" code={`<ShareSheetView url="https://daakia.app/s/abc123" targets={targets} />`} align="flex-start">
        <ShareSheetView
          url="https://daakia.app/s/abc123"
          targets={[
            { id: 'globe', label: 'Web', icon: <GlobeIcon size={16} />, onClick: () => {} },
            { id: 'server', label: 'Team Chat', icon: <ServerIcon size={16} />, onClick: () => {} },
          ]}
        />
      </Row>
    </div>
  );
}

export function ContactCardPanel() {
  return (
    <div>
      <Row label="Avatar + name + role + contact icons" code={`<ContactCardView name="Jordan Lee" role="Platform Engineer" contacts={[{ icon: <MailIcon />, label: 'Email' }]} />`}>
        <ContactCardView
          name="Jordan Lee"
          role="Platform Engineer"
          contacts={[
            { icon: <GlobeIcon size={14} />, label: 'Website', onClick: () => {} },
            { icon: <ShareIcon size={14} />, label: 'Share', onClick: () => {} },
          ]}
        />
      </Row>
    </div>
  );
}

export function ArticleCardPanel() {
  return (
    <div>
      <Row label="Image + title + excerpt + meta" code={`<ArticleCardView image="..." title="What's new in v2.0" excerpt="Faster requests, smarter mocks." meta="5 min read" />`} align="flex-start">
        <div style={{ width: 260 }}>
          <ArticleCardView
            title="What's new in v2.0"
            excerpt="Faster requests, smarter mocks, and a redesigned collection tree."
            meta="5 min read · July 2, 2026"
            onClick={() => {}}
          />
        </div>
      </Row>
    </div>
  );
}

export function FaqAccordionPanel() {
  return (
    <div>
      <Row label="Pre-styled Q&A accordion" code={`<FaqAccordionView faqs={faqs} />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <FaqAccordionView
            faqs={[
              { id: '1', question: 'How do I import a saved collection?', answer: 'Go to Import → Collection and select your .json export.' },
              { id: '2', question: 'Can I self-host mock servers?', answer: 'Yes, mock servers run locally by default and can be deployed to any Node environment.' },
            ]}
          />
        </div>
      </Row>
    </div>
  );
}

export function MessageBannerPanel() {
  return (
    <div>
      <Row label="success / error / info / warning" code={`<MessageBannerView variant="success">Environment saved.</MessageBannerView>`} align="flex-start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
          <MessageBannerView variant="success">Environment saved successfully.</MessageBannerView>
          <MessageBannerView variant="error">Failed to connect — check your network.</MessageBannerView>
        </div>
      </Row>
    </div>
  );
}

export function QuoteBlockPanel() {
  return (
    <div>
      <Row label="Blockquote + attribution" code={`<QuoteBlockView attribution="Jordan Lee" role="Platform Engineer">Daakia cut our API testing time in half.</QuoteBlockView>`} align="flex-start">
        <div style={{ width: '100%' }}>
          <QuoteBlockView attribution="Jordan Lee" role="Platform Engineer at Acme Corp">
            Daakia cut our API testing time in half — the mock servers alone saved us a full sprint.
          </QuoteBlockView>
        </div>
      </Row>
    </div>
  );
}

// ─── Sprint 7 · Batch L — Enterprise, Settings & SaaS panels ───────────────────

export function SettingsRowPanel() {
  return (
    <div>
      <Row label="Label + description + control row" code={`<SettingsRowView label="Two-factor auth" description="Require a code at sign-in." control={<ToggleSwitchView checked />} />`} align="flex-start">
        <div style={{ width: '100%', border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
          <SettingsRowView label="Two-factor auth" description="Require a code at sign-in." control={<ToggleSwitchView checked onChange={() => {}} />} />
        </div>
      </Row>
    </div>
  );
}

export function SettingsSectionPanel() {
  return (
    <div>
      <Row label="Grouped settings card with a header" code={`<SettingsSectionView title="Security" description="Manage sign-in and access.">\n  <SettingsRowView label="Two-factor auth" control={<ToggleSwitchView checked />} />\n</SettingsSectionView>`} align="flex-start">
        <div style={{ width: '100%' }}>
          <SettingsSectionView title="Security" description="Manage sign-in and access.">
            <SettingsRowView label="Two-factor auth" control={<ToggleSwitchView checked onChange={() => {}} />} />
            <SettingsRowView label="Session timeout" control={<VersionBadgeView version="30m" />} />
          </SettingsSectionView>
        </div>
      </Row>
    </div>
  );
}

export function OnboardingChecklistPanel() {
  return (
    <div>
      <Row label="Collapsible getting-started checklist" code={`<OnboardingChecklistView steps={steps} />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <OnboardingChecklistView
            steps={[
              { id: '1', label: 'Create workspace', done: true },
              { id: '2', label: 'Invite teammates', done: true },
              { id: '3', label: 'Send first request', done: false },
            ]}
          />
        </div>
      </Row>
    </div>
  );
}

export function KeyValueListPanel() {
  return (
    <div>
      <Row label="Lightweight label:value stacked list" code={`<KeyValueListView entries={[{ key: 'Plan', value: 'Pro' }, { key: 'Seats', value: '12' }]} />`} align="flex-start">
        <div style={{ width: 260 }}>
          <KeyValueListView
            entries={[
              { key: 'Plan', value: 'Pro' },
              { key: 'Seats', value: '12' },
              { key: 'Renewal', value: 'Aug 1, 2026' },
            ]}
          />
        </div>
      </Row>
    </div>
  );
}

export function EnvironmentBadgePanel() {
  return (
    <div>
      <Row label="dev / staging / prod" code={`<EnvironmentBadgeView env="prod" live />`}>
        <EnvironmentBadgeView env="dev" />
        <EnvironmentBadgeView env="staging" />
        <EnvironmentBadgeView env="prod" live />
      </Row>
    </div>
  );
}

export function VersionBadgePanel() {
  return (
    <div>
      <Row label="Version chip with update-available dot" code={`<VersionBadgeView version="2.4.1" updateAvailable onClick={openChangelog} />`}>
        <VersionBadgeView version="2.4.1" />
        <VersionBadgeView version="2.3.0" updateAvailable onClick={() => {}} />
      </Row>
    </div>
  );
}

export function LicenseBadgePanel() {
  return (
    <div>
      <Row label="Free / Pro / Enterprise tier ribbon" code={`<LicenseBadgeView tier="enterprise" />`}>
        <LicenseBadgeView tier="free" />
        <LicenseBadgeView tier="pro" />
        <LicenseBadgeView tier="enterprise" />
      </Row>
    </div>
  );
}

export function UsageMeterPanel() {
  return (
    <div>
      <Row label="Quota bar with warning-color thresholds" code={`<UsageMeterView used={82} limit={100} label="API calls" />`} align="flex-start">
        <div style={{ width: 260 }}>
          <UsageMeterView used={82} limit={100} label="API calls" />
        </div>
      </Row>
    </div>
  );
}

export function PermissionMatrixPanel() {
  const [matrix, setMatrix] = useState([
    [true, true, false],
    [true, false, false],
    [true, true, true],
  ]);
  return (
    <div>
      <Row label="Role x permission checkbox grid" code={`<PermissionMatrixView roles={roles} permissions={permissions} matrix={matrix} onChange={handleChange} />`} align="flex-start">
        <PermissionMatrixView
          roles={['Viewer', 'Editor', 'Admin']}
          permissions={['Read', 'Write', 'Delete']}
          matrix={matrix}
          onChange={(ri, pi, v) => setMatrix(prev => prev.map((row, i) => i === ri ? row.map((c, j) => j === pi ? v : c) : row))}
        />
      </Row>
    </div>
  );
}

export function AuditLogRowPanel() {
  return (
    <div>
      <Row label="Timestamped actor+action+target row" code={`<AuditLogRowView timestamp="2026-07-02 09:14" actor="Jordan Lee" action="deleted" target="Users API" />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <AuditLogRowView timestamp="2026-07-02 09:14" actor="Jordan Lee" action="deleted" target="Users API" />
        </div>
      </Row>
    </div>
  );
}

export function WebhookStatusPanel() {
  return (
    <div>
      <Row label="Webhook endpoint health row" code={`<WebhookStatusView url="https://api.example.com/hooks/deploy" health="healthy" statusCode={200} lastDelivery="2m ago" onRetry={retry} />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <WebhookStatusView url="https://api.example.com/hooks/deploy" health="healthy" statusCode={200} lastDelivery="2m ago" onRetry={() => {}} />
        </div>
      </Row>
    </div>
  );
}

export function ApiKeyRowPanel() {
  return (
    <div>
      <Row label="Masked API key with reveal/copy/revoke" code={`<ApiKeyRowView label="Production" apiKey="sk_live_••••••••••••" onRevoke={revoke} />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <ApiKeyRowView label="Production" apiKey="sk_live_••••••••••••" onRevoke={() => {}} />
        </div>
      </Row>
    </div>
  );
}

export function RateLimitMeterPanel() {
  return (
    <div>
      <Row label="Requests-remaining ring gauge" code={`<RateLimitMeterView remaining={342} limit={1000} resetLabel="in 12m" />`}>
        <RateLimitMeterView remaining={342} limit={1000} resetLabel="in 12m" />
      </Row>
    </div>
  );
}

export function EmptyInboxPanel() {
  return (
    <div>
      <Row label="Zero-notifications empty state" code={`<EmptyInboxView />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <EmptyInboxView />
        </div>
      </Row>
    </div>
  );
}

export function FeatureSpotlightBadgePanel() {
  return (
    <div>
      <Row label={'Pulsing "New" badge'} code={`<FeatureSpotlightBadgeView label="New" />`}>
        <FeatureSpotlightBadgeView label="New" />
        <FeatureSpotlightBadgeView label="Beta" color="var(--color-info)" />
      </Row>
    </div>
  );
}

export function CookieConsentBannerPanel() {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <Row label="Fixed bottom cookie-consent bar" code={`function Preview() {\n  const [open, setOpen] = useState(true);\n  return (\n    <CookieConsentBannerView\n      open={open}\n      onAccept={() => setOpen(false)}\n      onCustomize={() => {}}\n    />\n  );\n}`} align="flex-start">
        <div style={{ width: '100%', position: 'relative', minHeight: 80 }}>
          <ButtonView label="Reopen banner" variant="secondary" size="sm" onClick={() => setOpen(true)} />
          <div style={{ position: 'relative', marginTop: 12 }}>
            <CookieConsentBannerView
              open={open}
              onAccept={() => setOpen(false)}
              onCustomize={() => {}}
              style={{ position: 'static', margin: 0, maxWidth: 'none' }}
            />
          </div>
        </div>
      </Row>
    </div>
  );
}

export function MaintenanceBannerPanel() {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <Row label="Scheduled-downtime notice strip" code={`function Preview() {\n  const [open, setOpen] = useState(true);\n  return <MaintenanceBannerView open={open} window="July 4, 2AM-4AM UTC" onDismiss={() => setOpen(false)} />;\n}`} align="flex-start">
        <div style={{ width: '100%' }}>
          <ButtonView label="Reopen banner" variant="secondary" size="sm" onClick={() => setOpen(true)} />
          <div style={{ marginTop: 12 }}>
            <MaintenanceBannerView open={open} window="July 4, 2AM-4AM UTC" onDismiss={() => setOpen(false)} />
          </div>
        </div>
      </Row>
    </div>
  );
}

export function TrialCountdownBannerPanel() {
  return (
    <div>
      <Row label="Days-left-in-trial strip with upgrade CTA" code={`<TrialCountdownBannerView daysLeft={3} onUpgrade={upgrade} />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <TrialCountdownBannerView daysLeft={3} onUpgrade={() => {}} />
        </div>
      </Row>
    </div>
  );
}

export function TeamMemberRowPanel() {
  return (
    <div>
      <Row label="Avatar + name + role + remove-action row" code={`<TeamMemberRowView name="Jordan Lee" role="Platform Engineer" onRemove={remove} />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <TeamMemberRowView name="Jordan Lee" role="Platform Engineer" onRemove={() => {}} />
        </div>
      </Row>
    </div>
  );
}

export function InviteInputPanel() {
  const [emails, setEmails] = useState(['jordan@daakia.app']);
  return (
    <div>
      <Row label="Email-chip input for multi-invite forms" code={`function Preview() {\n  const [emails, setEmails] = useState(['jordan@daakia.app']);\n  return <InviteInputView emails={emails} onChange={setEmails} />;\n}`} align="flex-start">
        <div style={{ width: '100%' }}>
          <InviteInputView emails={emails} onChange={setEmails} />
        </div>
      </Row>
    </div>
  );
}

export function RoleSelectPanel() {
  const [role, setRole] = useState('editor');
  return (
    <div>
      <Row label="Role dropdown with per-option description" code={`function Preview() {\n  const [role, setRole] = useState('editor');\n  return (\n    <RoleSelectView\n      options={[{ value: 'viewer', label: 'Viewer', description: 'Read-only access' }, { value: 'editor', label: 'Editor', description: 'Can edit content' }]}\n      value={role}\n      onChange={setRole}\n    />\n  );\n}`}>
        <RoleSelectView
          options={[
            { value: 'viewer', label: 'Viewer', description: 'Read-only access' },
            { value: 'editor', label: 'Editor', description: 'Can edit content' },
            { value: 'admin', label: 'Admin', description: 'Full workspace control' },
          ]}
          value={role}
          onChange={setRole}
        />
      </Row>
    </div>
  );
}

export function IntegrationCardPanel() {
  const [connected, setConnected] = useState(false);
  return (
    <div>
      <Row label="Logo + name + connect/disconnect card" code={`function Preview() {\n  const [connected, setConnected] = useState(false);\n  return (\n    <IntegrationCardView\n      logo={<GlobeIcon size={18} />}\n      name="Team Chat"\n      description="Send alerts to a channel"\n      connected={connected}\n      onConnect={() => setConnected(true)}\n      onDisconnect={() => setConnected(false)}\n    />\n  );\n}`} align="flex-start">
        <div style={{ width: 320 }}>
          <IntegrationCardView
            logo={<GlobeIcon size={18} />}
            name="Team Chat"
            description="Send alerts to a channel"
            connected={connected}
            onConnect={() => setConnected(true)}
            onDisconnect={() => setConnected(false)}
          />
        </div>
      </Row>
    </div>
  );
}

export function StatusPageRowPanel() {
  return (
    <div>
      <Row label="Service + uptime% + status-dot row" code={`<StatusPageRowView service="API" status="operational" uptime={99.98} />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <StatusPageRowView service="API" status="operational" uptime={99.98} />
          <StatusPageRowView service="Webhooks" status="degraded" uptime={97.2} />
        </div>
      </Row>
    </div>
  );
}

export function ChangelogEntryPanel() {
  return (
    <div>
      <Row label="Version + date + change-type badges" code={`<ChangelogEntryView version="2.4.0" date="July 2, 2026" changes={[{ type: 'feature', description: 'Added mock servers' }]} />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <ChangelogEntryView
            version="2.4.0"
            date="July 2, 2026"
            changes={[
              { type: 'feature', description: 'Added self-hosted mock servers' },
              { type: 'fix', description: 'Fixed OAuth token refresh race condition' },
            ]}
          />
        </div>
      </Row>
    </div>
  );
}

// ─── Sprint 7 · Batch I — Media & Files panels ──────────────────────────────────

export function ImageGalleryPanel() {
  return (
    <div>
      <Row label="Grid gallery with click-to-open lightbox" code={`<ImageGalleryView images={images} columns={3} />`} align="flex-start">
        <div style={{ width: '100%', maxWidth: 360 }}>
          <ImageGalleryView
            images={[1, 2, 3, 4, 5, 6].map(n => ({ src: `https://picsum.photos/seed/${n}/300/200`, alt: `Photo ${n}` }))}
            columns={3}
          />
        </div>
      </Row>
    </div>
  );
}

export function ImageCropperPanel() {
  const [value, setValue] = useState({ x: 0, y: 0, zoom: 1.2 });
  return (
    <div>
      <Row label="Drag-crop + zoom image editor" code={`function Preview() {\n  const [value, setValue] = useState({ x: 0, y: 0, zoom: 1.2 });\n  return <ImageCropperView src="..." value={value} onChange={setValue} height={220} />;\n}`} align="flex-start">
        <div style={{ width: 260 }}>
          <ImageCropperView src="https://picsum.photos/seed/crop/600/600" value={value} onChange={setValue} height={220} />
        </div>
      </Row>
    </div>
  );
}

export function VideoPlayerPanel() {
  return (
    <div>
      <Row label="Custom video controls wrapper" code={`<VideoPlayerView src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" />`} align="flex-start">
        <div style={{ width: 320 }}>
          <VideoPlayerView src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" />
        </div>
      </Row>
    </div>
  );
}

export function AudioWaveformPanel() {
  return (
    <div>
      <Row label="Static/animated waveform visualization" code={`<AudioWaveformView progress={0.4} animated />`} align="flex-start">
        <div style={{ width: 260 }}>
          <AudioWaveformView progress={0.4} animated />
        </div>
      </Row>
    </div>
  );
}

export function AudioPlayerPanel() {
  return (
    <div>
      <Row label="Waveform + play/pause/seek audio player" code={`<AudioPlayerView src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" />`} align="flex-start">
        <div style={{ width: 320 }}>
          <AudioPlayerView src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" />
        </div>
      </Row>
    </div>
  );
}

export function PdfViewerPanel() {
  return (
    <div>
      <Row label="Paginated PDF preview wrapper (needs a real PDF URL in production)" code={`<PdfViewerView src="https://example.com/document.pdf" totalPages={5} height={320} />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <PdfViewerView src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" totalPages={1} height={260} />
        </div>
      </Row>
    </div>
  );
}

export function FileIconPanel() {
  return (
    <div>
      <Row label="Extension-based file-type icon + name + size" code={`<FileIconView name="report.pdf" bytes={204800} />`}>
        <FileIconView name="hero.png" bytes={102400} />
        <FileIconView name="demo.mp4" bytes={5242880} />
        <FileIconView name="report.pdf" bytes={204800} />
        <FileIconView name="archive.zip" bytes={1048576} />
      </Row>
    </div>
  );
}

export function FileListPanel() {
  const [files, setFiles] = useState([
    { id: '1', name: 'hero.png', bytes: 102400, progress: 100 },
    { id: '2', name: 'demo.mp4', bytes: 5242880, progress: 60 },
    { id: '3', name: 'broken.zip', bytes: 1024, error: 'Upload failed' },
  ]);
  return (
    <div>
      <Row label="Uploaded-files list with per-row progress + remove" code={`function Preview() {\n  const [files, setFiles] = useState(initialFiles);\n  return <FileListView files={files} onRemove={id => setFiles(f => f.filter(x => x.id !== id))} />;\n}`} align="flex-start">
        <div style={{ width: '100%' }}>
          <FileListView files={files} onRemove={id => setFiles(f => f.filter(x => x.id !== id))} />
        </div>
      </Row>
    </div>
  );
}

export function DragHandlePanel() {
  return (
    <div>
      <Row label="Grab-handle primitive for reorderable lists" code={`<DragHandleView />`}>
        <DragHandleView />
      </Row>
    </div>
  );
}

export function SignaturePadPanel() {
  return (
    <div>
      <Row label="Canvas signature capture" code={`<SignaturePadView onChange={setDataUrl} height={140} />`} align="flex-start">
        <div style={{ width: 320 }}>
          <SignaturePadView onChange={() => {}} height={140} />
        </div>
      </Row>
    </div>
  );
}

export function BarcodePanel() {
  return (
    <div>
      <Row label="Deterministic bar-pattern generator (visual only)" code={`<BarcodeView value="8901234567890" />`}>
        <BarcodeView value="8901234567890" />
      </Row>
    </div>
  );
}

export function ImageZoomPanel() {
  return (
    <div>
      <Row label="Click-to-zoom lightbox for a single image" code={`<ImageZoomView src="..." alt="Product photo" thumbnailStyle={{ width: 120, height: 90, borderRadius: 8 }} />`}>
        <ImageZoomView src="https://picsum.photos/seed/zoom/600/400" alt="Product photo" thumbnailStyle={{ width: 120, height: 90, borderRadius: 8, objectFit: 'cover' }} />
      </Row>
    </div>
  );
}

// ─── Sprint 7 · Batch E — Data Display & "Wow" panels ───────────────────────────

export function TimelinePanel() {
  return (
    <div>
      <Row label="Event trail with icon nodes" code={`<TimelineView entries={entries} />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <TimelineView
            entries={[
              { id: '1', icon: <CheckIcon size={12} />, title: 'Request sent', timestamp: '10:02 AM', color: 'var(--color-success)' },
              { id: '2', icon: <ClockIcon size={12} />, title: 'Awaiting response', timestamp: '10:02 AM' },
              { id: '3', icon: <CheckIcon size={12} />, title: 'Response received', timestamp: '10:03 AM', color: 'var(--color-success)' },
            ]}
          />
        </div>
      </Row>
    </div>
  );
}

export function ActivityFeedPanel() {
  return (
    <div>
      <Row label="Chronological feed grouped by day" code={`<ActivityFeedView entries={entries} />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <ActivityFeedView
            entries={[
              { id: '1', actor: 'Jordan Lee', action: 'deployed Users API', timestamp: '9:14 AM', day: '2026-07-02' },
              { id: '2', actor: 'Salil Vasa Nair', action: 'merged PR #482', timestamp: '4:50 PM', day: '2026-07-01' },
            ]}
          />
        </div>
      </Row>
    </div>
  );
}

export function KanbanBoardPanel() {
  const [columns, setColumns] = useState<KanbanColumn[]>([
    { id: 'todo', title: 'To Do', color: 'var(--color-text-muted)', cards: [{ id: 'c1', title: 'Design auth flow' }, { id: 'c2', title: 'Write API docs' }] },
    { id: 'progress', title: 'In Progress', color: 'var(--color-primary)', cards: [{ id: 'c3', title: 'Build mock server' }] },
    { id: 'done', title: 'Done', color: 'var(--color-success)', cards: [{ id: 'c4', title: 'Set up CI' }] },
  ]);
  return (
    <div>
      <Row label="Draggable columns + cards board" code={`function Preview() {\n  const [columns, setColumns] = useState(initialColumns);\n  return <KanbanBoardView columns={columns} onChange={setColumns} />;\n}`} align="flex-start">
        <div style={{ width: '100%' }}>
          <KanbanBoardView columns={columns} onChange={setColumns} />
        </div>
      </Row>
    </div>
  );
}

export function SparklinePanel() {
  return (
    <div>
      <Row label="Tiny inline SVG trend line" code={`<SparklineView data={[4, 8, 6, 9, 12, 10, 14]} width={100} height={28} />`}>
        <SparklineView data={[4, 8, 6, 9, 12, 10, 14]} width={100} height={28} />
      </Row>
    </div>
  );
}

export function HeatmapCalendarPanel() {
  const data = Array.from({ length: 84 }, (_, i) => {
    const d = new Date(2026, 6, 2);
    d.setDate(d.getDate() - i);
    return { date: d.toISOString().slice(0, 10), count: Math.floor(Math.random() * 6) };
  });
  return (
    <div>
      <Row label="GitHub-style contribution heatmap" code={`<HeatmapCalendarView data={data} />`} align="flex-start">
        <HeatmapCalendarView data={data} />
      </Row>
    </div>
  );
}

export function ComparisonSliderPanel() {
  return (
    <div>
      <Row label="Before/after drag slider" code={`<ComparisonSliderView beforeSrc="..." afterSrc="..." beforeLabel="Before" afterLabel="After" />`} align="flex-start">
        <div style={{ width: '100%', maxWidth: 360 }}>
          <ComparisonSliderView
            beforeSrc="https://picsum.photos/seed/before/400/260"
            afterSrc="https://picsum.photos/seed/after/400/260"
            beforeLabel="Before"
            afterLabel="After"
          />
        </div>
      </Row>
    </div>
  );
}

export function CarouselPanel() {
  return (
    <div>
      <Row label="Swipeable card carousel with dot indicators" code={`<CarouselView slides={slides} autoplay />`} align="flex-start">
        <div style={{ width: '100%', maxWidth: 360 }}>
          <CarouselView
            autoplay
            slides={[
              <div key="1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'var(--color-surface)', borderRadius: 10, fontWeight: 700 }}>Slide 1</div>,
              <div key="2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'var(--color-surface)', borderRadius: 10, fontWeight: 700 }}>Slide 2</div>,
              <div key="3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'var(--color-surface)', borderRadius: 10, fontWeight: 700 }}>Slide 3</div>,
            ]}
          />
        </div>
      </Row>
    </div>
  );
}

export function QRCodePanel() {
  return (
    <div>
      <Row label="QR-style module grid (visual, not spec-scannable)" code={`<QRCodeView value="https://daakia.app" size={140} />`}>
        <QRCodeView value="https://daakia.app" size={140} />
      </Row>
    </div>
  );
}

export function StatTrendCardPanel() {
  return (
    <div>
      <Row label="Count-up number + sparkline trend" code={`<StatTrendCardView label="Requests today" value={1842} trend={[900, 1100, 1400, 1300, 1700, 1842]} />`} align="flex-start">
        <div style={{ width: 260 }}>
          <StatTrendCardView label="Requests today" value={1842} trend={[900, 1100, 1400, 1300, 1700, 1842]} />
        </div>
      </Row>
    </div>
  );
}

export function PricingCardPanel() {
  return (
    <div>
      <Row label="Plan comparison card with a popular ribbon" code={`<PricingCardView planName="Pro" price="$29" features={['Unlimited requests', 'Team collaboration']} popular actions={<ButtonView label="Choose Pro" />} />`} align="flex-start">
        <div style={{ width: 240 }}>
          <PricingCardView
            planName="Pro"
            price="$29"
            features={['Unlimited requests', 'Team collaboration', 'Priority support']}
            popular
            actions={<ButtonView label="Choose Pro" variant="primary" size="sm" onClick={() => {}} />}
          />
        </div>
      </Row>
    </div>
  );
}

export function TestimonialCardPanel() {
  return (
    <div>
      <Row label="Quote + avatar testimonial card" code={`<TestimonialCardView quote="Daakia cut our testing time in half." author="Jordan Lee" role="Platform Engineer" />`} align="flex-start">
        <div style={{ width: 300 }}>
          <TestimonialCardView quote="Daakia cut our testing time in half." author="Jordan Lee" role="Platform Engineer" />
        </div>
      </Row>
    </div>
  );
}

export function RatingBreakdownPanel() {
  return (
    <div>
      <Row label="5-star rating distribution bars" code={`<RatingBreakdownView counts={[2, 4, 10, 28, 56]} />`} align="flex-start">
        <div style={{ width: 260 }}>
          <RatingBreakdownView counts={[2, 4, 10, 28, 56]} />
        </div>
      </Row>
    </div>
  );
}

export function TreeSelectPanel() {
  const [value, setValue] = useState<string[]>(['ca']);
  return (
    <div>
      <Row label="Checkbox-driven hierarchical select" code={`function Preview() {\n  const [value, setValue] = useState(['ca']);\n  return <TreeSelectView nodes={nodes} value={value} onChange={setValue} />;\n}`} align="flex-start">
        <div style={{ width: '100%' }}>
          <TreeSelectView
            nodes={[
              { id: 'us', label: 'United States', children: [{ id: 'ca', label: 'California' }, { id: 'ny', label: 'New York' }] },
              { id: 'eu', label: 'Europe', children: [{ id: 'de', label: 'Germany' }, { id: 'fr', label: 'France' }] },
            ] as TreeSelectNode[]}
            value={value}
            onChange={setValue}
          />
        </div>
      </Row>
    </div>
  );
}

export function RichTextToolbarPanel() {
  const [active, setActive] = useState<RichTextAction[]>(['bold']);
  return (
    <div>
      <Row label="Formatting toolbar primitive" code={`function Preview() {\n  const [active, setActive] = useState(['bold']);\n  return (\n    <RichTextToolbarView\n      active={active}\n      onAction={a => setActive(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])}\n    />\n  );\n}`}>
        <RichTextToolbarView
          active={active}
          onAction={a => setActive(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])}
        />
      </Row>
    </div>
  );
}

export function MentionInputPanel() {
  const [value, setValue] = useState('Hey @Jordan, can you review this?');
  return (
    <div>
      <Row label="@mention autocomplete textarea" code={`function Preview() {\n  const [value, setValue] = useState('');\n  return <MentionInputView value={value} onChange={setValue} users={users} />;\n}`} align="flex-start">
        <div style={{ width: '100%' }}>
          <MentionInputView
            value={value}
            onChange={setValue}
            users={[{ id: '1', label: 'Jordan Lee' }, { id: '2', label: 'Salil Vasa Nair' }, { id: '3', label: 'Priya Nair' }]}
          />
        </div>
      </Row>
    </div>
  );
}

// ─── Sprint 7 · Batch K — Fun / "Wow" & Micro-interactions panels ─────────────

export function GradientTextPanel() {
  return (
    <div>
      <Row label="Animated gradient-shifting text" code={`<GradientTextView>Ship faster with Daakia</GradientTextView>`}>
        <GradientTextView>Ship faster with Daakia</GradientTextView>
      </Row>
    </div>
  );
}

export function TypewriterTextPanel() {
  return (
    <div>
      <Row label="Animated typing-effect text" code={`<TypewriterTextView text={['Build APIs.', 'Test flows.', 'Ship faster.']} />`}>
        <TypewriterTextView text={['Build APIs.', 'Test flows.', 'Ship faster.']} />
      </Row>
    </div>
  );
}

export function CountUpNumberPanel() {
  const [value, setValue] = useState(1284);
  return (
    <div>
      <Row label="Animated number count-up" code={`function Preview() {\n  const [value, setValue] = useState(1284);\n  return <CountUpNumberView value={value} suffix=" reqs" />;\n}`}>
        <CountUpNumberView value={value} suffix=" reqs" />
        <ButtonView size="sm" onClick={() => setValue(v => v + 500)}>+500</ButtonView>
      </Row>
    </div>
  );
}

export function MagneticButtonPanel() {
  return (
    <div>
      <Row label="Cursor-attraction hover button" code={`<MagneticButtonView onClick={() => {}}>Hover me</MagneticButtonView>`}>
        <MagneticButtonView onClick={() => {}}>Hover me</MagneticButtonView>
      </Row>
    </div>
  );
}

export function TiltCardPanel() {
  return (
    <div>
      <Row label="3D perspective tilt-on-hover card" code={`<TiltCardView>...</TiltCardView>`} align="flex-start">
        <div style={{ width: 220 }}>
          <TiltCardView>
            <div style={{ fontWeight: 700, fontSize: 13 }}>Webhook Delivery</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>Move your cursor over this card.</div>
          </TiltCardView>
        </div>
      </Row>
    </div>
  );
}

export function ParticleBackgroundPanel() {
  return (
    <div>
      <Row label="Subtle animated particle background" code={`<ParticleBackgroundView height={160} />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <ParticleBackgroundView height={160} />
        </div>
      </Row>
    </div>
  );
}

export function GlowBorderPanel() {
  return (
    <div>
      <Row label="Animated gradient glowing-border wrapper" code={`<GlowBorderView>...</GlowBorderView>`} align="flex-start">
        <div style={{ width: 220 }}>
          <GlowBorderView>
            <div style={{ fontWeight: 700, fontSize: 13 }}>API Key</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>sk_live_••••••••1234</div>
          </GlowBorderView>
        </div>
      </Row>
    </div>
  );
}

export function RevealOnScrollPanel() {
  return (
    <div>
      <Row label="Fade/slide-in-on-scroll wrapper" code={`<RevealOnScrollView direction="up">...</RevealOnScrollView>`} align="flex-start">
        <div style={{ width: '100%' }}>
          <RevealOnScrollView direction="up">
            <div style={{ padding: 12, border: '1px solid var(--color-surface-border)', borderRadius: 8 }}>
              Scroll this panel out of view and back in to replay.
            </div>
          </RevealOnScrollView>
        </div>
      </Row>
    </div>
  );
}

export function FloatingLabelInputPanel() {
  const [value, setValue] = useState('');
  return (
    <div>
      <Row label="Floating-label input" code={`function Preview() {\n  const [value, setValue] = useState('');\n  return <FloatingLabelInputView label="Workspace name" value={value} onChange={setValue} />;\n}`}>
        <FloatingLabelInputView label="Workspace name" value={value} onChange={setValue} />
      </Row>
    </div>
  );
}

export function PulseDotPanel() {
  return (
    <div>
      <Row label="Attention-grabbing pulsing dot" code={`<PulseDotView />`}>
        <PulseDotView />
        <PulseDotView color="var(--color-success)" />
        <PulseDotView color="var(--color-warning)" />
      </Row>
    </div>
  );
}

// ─── Sprint 7 · Batch M — DUI Signature Series panels ─────────────────────────

export function RequestFlowPanel() {
  return (
    <div>
      <Row label="Animated network waterfall" code={`<RequestFlowView phases={phases} />`} align="flex-start">
        <RequestFlowView
          phases={[
            { id: 'dns', label: 'DNS', duration: 20, color: 'var(--color-primary)' },
            { id: 'tcp', label: 'TCP', duration: 40, color: 'var(--color-warning)' },
            { id: 'tls', label: 'TLS', duration: 60, color: 'var(--color-success)' },
            { id: 'req', label: 'Request', duration: 30, color: 'var(--color-primary)' },
            { id: 'res', label: 'Response', duration: 90, color: 'var(--color-error)' },
          ]}
        />
      </Row>
    </div>
  );
}

export function LatencyPulsePanel() {
  return (
    <div>
      <Row label="EKG-style live latency pulse" code={`<LatencyPulseView latencyMs={180} />`}>
        <LatencyPulseView latencyMs={180} />
        <LatencyPulseView latencyMs={620} />
      </Row>
    </div>
  );
}

export function AIStreamingTextPanel() {
  return (
    <div>
      <Row label="Token-by-token LLM output renderer" code={`<AIStreamingTextView text="Here's a summary of your API traffic." streaming />`} align="flex-start">
        <AIStreamingTextView text="Here's a summary of your API traffic." streaming />
      </Row>
    </div>
  );
}

export function CommandOrbPanel() {
  const [state, setState] = useState<'idle' | 'thinking' | 'speaking' | 'open'>('idle');
  return (
    <div>
      <Row label="Breathing AI-assistant orb" code={`function Preview() {\n  const [state, setState] = useState('idle');\n  return <CommandOrbView state={state} onClick={() => setState(s => s === 'idle' ? 'thinking' : s === 'thinking' ? 'speaking' : 'idle')} />;\n}`}>
        <CommandOrbView state={state} onClick={() => setState(s => s === 'idle' ? 'thinking' : s === 'thinking' ? 'speaking' : 'idle')} />
      </Row>
    </div>
  );
}

export function TimeTravelSliderPanel() {
  const states = [12, 18, 15, 30, 42, 38, 50];
  const [index, setIndex] = useState(states.length - 1);
  return (
    <div>
      <Row label="Scrub a playhead across past states" code={`function Preview() {\n  const states = [12, 18, 15, 30, 42, 38, 50];\n  const [index, setIndex] = useState(states.length - 1);\n  return <TimeTravelSliderView states={states} index={index} onScrub={setIndex} toValue={s => s} toLabel={s => 'Value: ' + s} />;\n}`} align="flex-start">
        <TimeTravelSliderView states={states} index={index} onScrub={setIndex} toValue={s => s} toLabel={s => `Value: ${s}`} />
      </Row>
    </div>
  );
}

export function DiffMorphPanel() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog');
  return (
    <div>
      <Row label="FLIP-animated text morph diff" code={`function Preview() {\n  const [text, setText] = useState('...');\n  return <DiffMorphView text={text} />;\n}`} align="flex-start">
        <div style={{ width: '100%' }}>
          <DiffMorphView text={text} />
          <ButtonView size="sm" style={{ marginTop: 8 }} onClick={() => setText(t => t.includes('red') ? 'The quick brown fox jumps over the lazy dog' : 'The quick red fox leaps over the sleepy dog')}>
            Edit text
          </ButtonView>
        </div>
      </Row>
    </div>
  );
}

export function SchemaBlueprintPanel() {
  return (
    <div>
      <Row label="Blueprint-styled schema diagram" code={`<SchemaBlueprintView nodes={nodes} />`} align="flex-start">
        <div style={{ width: '100%' }}>
          <SchemaBlueprintView
            nodes={[
              { id: 'user', title: 'User', fields: [{ name: 'id', type: 'string' }, { name: 'orgId', type: 'ref' }], connectsTo: ['org'] },
              { id: 'org', title: 'Organization', fields: [{ name: 'id', type: 'string' }, { name: 'name', type: 'string' }] },
            ]}
          />
        </div>
      </Row>
    </div>
  );
}

export function LiveCursorPresencePanel() {
  return (
    <div>
      <Row label="Collaborative cursor overlay" code={`<LiveCursorPresenceView cursors={cursors}>...</LiveCursorPresenceView>`} align="flex-start">
        <div style={{ width: '100%' }}>
          <LiveCursorPresenceView cursors={[{ id: '1', name: 'Jordan', x: 0.3, y: 0.4 }, { id: '2', name: 'Priya', x: 0.7, y: 0.6 }]}>
            <div style={{ height: 160, border: '1px solid var(--color-surface-border)', borderRadius: 8 }} />
          </LiveCursorPresenceView>
        </div>
      </Row>
    </div>
  );
}

export function UndoRedoTimelinePanel() {
  const nodes = [
    { id: 'a', label: 'Initial' },
    { id: 'b', label: 'Add header', parentId: 'a' },
    { id: 'c', label: 'Add auth', parentId: 'b' },
    { id: 'd', label: 'Revert header', parentId: 'a' },
  ];
  const [active, setActive] = useState('c');
  return (
    <div>
      <Row label="Branching git-log-style history" code={`function Preview() {\n  const [active, setActive] = useState('c');\n  return <UndoRedoTimelineView nodes={nodes} activeId={active} onSelect={setActive} />;\n}`} align="flex-start">
        <UndoRedoTimelineView nodes={nodes} activeId={active} onSelect={setActive} />
      </Row>
    </div>
  );
}

export function DialKnobInputPanel() {
  const [value, setValue] = useState(30);
  return (
    <div>
      <Row label="Rotary snap-tick knob input" code={`function Preview() {\n  const [value, setValue] = useState(30);\n  return <DialKnobInputView value={value} onChange={setValue} label="Timeout (s)" />;\n}`}>
        <DialKnobInputView value={value} onChange={setValue} label="Timeout (s)" />
      </Row>
    </div>
  );
}

export function HoldToConfirmPanel() {
  return (
    <div>
      <Row label="Press-and-hold destructive confirm" code={`<HoldToConfirmView onConfirm={() => {}}>Hold to delete</HoldToConfirmView>`}>
        <HoldToConfirmView onConfirm={() => {}}>Hold to delete</HoldToConfirmView>
      </Row>
    </div>
  );
}

export function MorphingIconButtonPanel() {
  const [active, setActive] = useState(false);
  return (
    <div>
      <Row label="SVG path-morph icon toggle" code={`function Preview() {\n  const [active, setActive] = useState(false);\n  return <MorphingIconButtonView preset="play-pause" active={active} onClick={() => setActive(a => !a)} />;\n}`}>
        <MorphingIconButtonView preset="play-pause" active={active} onClick={() => setActive(a => !a)} />
        <MorphingIconButtonView preset="menu-close" active={active} onClick={() => setActive(a => !a)} />
        <MorphingIconButtonView preset="sun-moon" active={active} onClick={() => setActive(a => !a)} />
      </Row>
    </div>
  );
}

export function StackedSwipeCardPanel() {
  const [items, setItems] = useState(['Request #1', 'Request #2', 'Request #3']);
  return (
    <div>
      <Row label="Swipeable card-stack queue" code={`function Preview() {\n  const [items, setItems] = useState(['Request #1', 'Request #2', 'Request #3']);\n  return (\n    <StackedSwipeCardView\n      items={items}\n      renderItem={item => <div>{item}</div>}\n      onSwipe={item => setItems(prev => prev.filter(i => i !== item))}\n    />\n  );\n}`} align="flex-start">
        {items.length > 0 ? (
          <StackedSwipeCardView
            items={items}
            renderItem={item => <div style={{ fontWeight: 700 }}>{item}</div>}
            onSwipe={item => setItems(prev => prev.filter(i => i !== item))}
          />
        ) : (
          <ButtonView size="sm" onClick={() => setItems(['Request #1', 'Request #2', 'Request #3'])}>Reset</ButtonView>
        )}
      </Row>
    </div>
  );
}

export function NetworkWeatherPanel() {
  return (
    <div>
      <Row label="Weather metaphor for system health" code={`<NetworkWeatherView condition="stormy" />`}>
        <NetworkWeatherView condition="sunny" />
        <NetworkWeatherView condition="cloudy" />
        <NetworkWeatherView condition="stormy" />
      </Row>
    </div>
  );
}

export function ConstellationLoaderPanel() {
  return (
    <div>
      <Row label="Drifting constellation loader" code={`<ConstellationLoaderView />`}>
        <ConstellationLoaderView />
      </Row>
    </div>
  );
}

export function HoloCardPanel() {
  return (
    <div>
      <Row label="Mouse-reactive holographic card" code={`<HoloCardView>...</HoloCardView>`} align="flex-start">
        <div style={{ width: 220 }}>
          <HoloCardView>
            <div style={{ fontWeight: 700, fontSize: 13 }}>Pro Plan</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>Move your mouse over this card.</div>
          </HoloCardView>
        </div>
      </Row>
    </div>
  );
}

export function GhostTypingPlaceholderPanel() {
  const [value, setValue] = useState('');
  return (
    <div>
      <Row label="Rotating typewriter placeholder" code={`function Preview() {\n  const [value, setValue] = useState('');\n  return <GhostTypingPlaceholderView value={value} onChange={setValue} examples={examples} />;\n}`}>
        <GhostTypingPlaceholderView
          value={value}
          onChange={setValue}
          examples={['search users by email…', 'filter by status: active…', 'jump to request #4521…']}
        />
      </Row>
    </div>
  );
}

export function ConnectionPulseLinePanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <Row label="Traveling-pulse connector line" code={`function Preview() {\n  const containerRef = useRef(null);\n  const fromRef = useRef(null);\n  const toRef = useRef(null);\n  return (\n    <div ref={containerRef} style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', height: 60 }}>\n      <div ref={fromRef} style={{ width: 60, height: 32 }} />\n      <div ref={toRef} style={{ width: 60, height: 32 }} />\n      <ConnectionPulseLineView containerRef={containerRef} from={fromRef} to={toRef} />\n    </div>\n  );\n}`} align="flex-start">
        <div ref={containerRef} style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', width: '100%', height: 60 }}>
          <div ref={fromRef} style={{ width: 60, height: 32, border: '1px solid var(--color-surface-border)', borderRadius: 6 }} />
          <div ref={toRef} style={{ width: 60, height: 32, border: '1px solid var(--color-surface-border)', borderRadius: 6 }} />
          <ConnectionPulseLineView containerRef={containerRef} from={fromRef} to={toRef} />
        </div>
      </Row>
    </div>
  );
}

export function StackedToastDeckPanel() {
  const [toasts, setToasts] = useState([
    { id: '1', content: 'Deploy succeeded' },
    { id: '2', content: 'New comment on PR #42' },
    { id: '3', content: 'Webhook delivered' },
  ]);
  return (
    <div>
      <Row label="Physically stacked toast deck" code={`function Preview() {\n  const [toasts, setToasts] = useState([{ id: '1', content: 'Deploy succeeded' }]);\n  return <StackedToastDeckView toasts={toasts} onDismiss={id => setToasts(prev => prev.filter(t => t.id !== id))} />;\n}`} align="flex-start">
        <StackedToastDeckView toasts={toasts} onDismiss={id => setToasts(prev => prev.filter(t => t.id !== id))} />
      </Row>
    </div>
  );
}

export function PathRevealPanel() {
  return (
    <div>
      <Row label="SVG stroke-draw reveal primitive" code={`<PathRevealView d="M10 50 Q 30 10 50 50 T 90 50" viewBox="0 0 100 100" width={120} height={80} />`}>
        <PathRevealView d="M10 50 Q 30 10 50 50 T 90 50" viewBox="0 0 100 100" width={120} height={80} />
      </Row>
    </div>
  );
}

export function SpectrumSliderPanel() {
  const [value, setValue] = useState(50);
  return (
    <div>
      <Row label="Live-gradient spectrum slider" code={`function Preview() {\n  const [value, setValue] = useState(50);\n  return <SpectrumSliderView value={value} onChange={setValue} />;\n}`}>
        <SpectrumSliderView value={value} onChange={setValue} />
      </Row>
    </div>
  );
}

export function BreathingLoaderPanel() {
  return (
    <div>
      <Row label="Meditative breathing-circle loader" code={`<BreathingLoaderView label="Syncing…" />`}>
        <BreathingLoaderView label="Syncing…" />
      </Row>
    </div>
  );
}
