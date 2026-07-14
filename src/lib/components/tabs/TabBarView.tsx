import { useState, useRef, useCallback, useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { PlusIcon, CloseIcon, ChevronLeftIcon, ChevronRightIcon, SettingsIcon, ServerIcon, PinIcon } from '../../../icons';
import type { DuiSize } from '../../core/DuiTypes';
import { useDui } from '../../core/DuiContext';
import { DUI_HEIGHT, DUI_FONT_SIZE, DUI_ICON_SIZE } from '../../core/DuiTokens';
import '../../shared/css/Shared.css';
import './TabBarView.css';

// ─── Types ─────────────────────────────────────────────────────────────────────

export type TabBarProtocol = 'rest' | 'graphql' | 'websocket' | 'grpc' | 'soap' | 'ai' | 'mcp';
export type TabBarTabType = 'request' | 'settings' | 'mock-server' | 'daakia-ai';
export type RealtimeProtocol = 'websocket' | 'sse' | 'socketio' | 'mqtt';

export interface TabBarTab {
  id: string;
  label: string;
  type?: TabBarTabType;
  protocol?: TabBarProtocol;
  method?: string;
  dirty?: boolean;
  pinned?: boolean;
  rtProtocol?: RealtimeProtocol;
  /** Per-tab color override — takes priority over type/protocol-derived
   * colors and the shared `accentColor` prop. Opt-in only. */
  accentColor?: string;
  /** Force the close (×) button always visible instead of hover-reveal —
   * same treatment `type: 'settings'`/`'mock-server'` already get. Opt-in
   * only, for plain/untyped tabs that behave like closable documents. */
  alwaysShowClose?: boolean;
  /** Suppresses the close button entirely WITHOUT the 📌 pinned badge —
   * for tabs that must stay open but aren't conceptually "pinned" (e.g. a
   * permanent home/builder tab). `pinned` is a decorative state of its own;
   * use `noClose` when you just want no close affordance and no badge. */
  noClose?: boolean;
  /** Leading glyph before the label — pass a DUI icon, colored by the caller.
   * Takes priority over the type/protocol-derived badge. Opt-in only. */
  icon?: ReactNode;
  /** Hover preview — arbitrary content (e.g. a mini document thumbnail)
   * shown in a floating card under the tab after a short hover delay.
   * Rendered through a portal so the scrollable tab strip can't clip it. */
  preview?: ReactNode;
}

export interface TabBarViewProps {
  tabs: TabBarTab[];
  activeTabId: string;
  onTabClick: (id: string) => void;
  onTabClose?: (id: string) => void;
  onAddTab?: () => void;
  /** Right-click on a tab — caller owns the resulting context menu (e.g. DUI's own ContextMenuView). */
  onTabContextMenu?: (id: string, e: React.MouseEvent) => void;
  /** Inline rename — when set to a tab's id, that tab's label becomes an editable input. */
  renamingId?: string;
  renameValue?: string;
  onRenameChange?: (value: string) => void;
  onRenameCommit?: () => void;
  onRenameCancel?: () => void;
  accentColor?: string;
  /** Falls back to DuiProvider size when omitted. Overrides `height`. */
  size?: DuiSize;
  /** Raw pixel height — prefer `size` for token-aligned sizing. */
  height?: number;
  className?: string;
}

// ─── Protocol badge helpers ────────────────────────────────────────────────────

const METHOD_COLORS: Record<string, string> = {
  GET:     'var(--color-method-get)',
  POST:    'var(--color-method-post)',
  PUT:     'var(--color-method-put)',
  PATCH:   'var(--color-method-patch)',
  DELETE:  'var(--color-method-delete)',
  HEAD:    'var(--color-method-head)',
  OPTIONS: 'var(--color-method-options)',
};

const PROTOCOL_BADGE: Record<TabBarProtocol, { label: string; color: string }> = {
  rest:      { label: 'REST',  color: 'var(--color-protocol-rest)' },
  graphql:   { label: 'GQL',   color: 'var(--color-protocol-graphql)' },
  websocket: { label: 'WS',    color: 'var(--color-protocol-websocket)' },
  grpc:      { label: 'gRPC',  color: 'var(--color-protocol-grpc)' },
  soap:      { label: 'SOAP',  color: 'var(--color-protocol-soap)' },
  ai:        { label: 'AI',    color: 'var(--color-protocol-ai)' },
  mcp:       { label: 'MCP',   color: 'var(--color-protocol-mcp)' },
};

const RT_BADGE: Record<RealtimeProtocol, { label: string; color: string }> = {
  websocket: { label: 'WS',   color: 'var(--color-protocol-websocket)' },
  sse:       { label: 'SSE',  color: 'var(--color-protocol-sse)' },
  socketio:  { label: 'SIO',  color: 'var(--color-protocol-socketio)' },
  mqtt:      { label: 'MQTT', color: 'var(--color-protocol-mqtt)' },
};

function getTabAccent(tab: TabBarTab, accentColor: string): string {
  if (tab.accentColor)            return tab.accentColor;
  if (tab.type === 'settings')    return 'var(--color-settings)';
  if (tab.type === 'mock-server') return 'var(--color-mock-server)';
  if (tab.type === 'daakia-ai')   return 'var(--color-protocol-ai)';
  if (tab.protocol)               return PROTOCOL_BADGE[tab.protocol]?.color || accentColor;
  return accentColor;
}

function TabProtocolBadge({ tab }: { tab: TabBarTab }) {
  // Caller-supplied icon wins over every derived badge (U59-style colored tabs).
  if (tab.icon) {
    return <span style={{ display: 'inline-flex', flexShrink: 0 }}>{tab.icon}</span>;
  }
  if (tab.type === 'settings') {
    return <SettingsIcon size={12} style={{ color: 'var(--color-settings)', flexShrink: 0 }} />;
  }
  if (tab.type === 'mock-server') {
    return <ServerIcon size={12} style={{ color: 'var(--color-mock-server)', flexShrink: 0 }} />;
  }
  if (tab.protocol === 'rest' && tab.method) {
    const color = METHOD_COLORS[tab.method.toUpperCase()] || 'var(--color-text-muted)';
    return (
      <span style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 700, color, flexShrink: 0, lineHeight: 1 }}>
        {tab.method.toUpperCase().slice(0, 6)}
      </span>
    );
  }
  if (tab.protocol === 'websocket') {
    const rt = RT_BADGE[tab.rtProtocol || 'websocket'] || RT_BADGE.websocket;
    return <span style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 700, color: rt.color, flexShrink: 0, lineHeight: 1 }}>{rt.label}</span>;
  }
  if (tab.protocol) {
    const b = PROTOCOL_BADGE[tab.protocol];
    return <span style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 700, color: b.color, flexShrink: 0, lineHeight: 1 }}>{b.label}</span>;
  }
  return null;
}

// ─── TabBarView ────────────────────────────────────────────────────────────────

export function TabBarView({
  tabs,
  activeTabId,
  onTabClick,
  onTabClose,
  onAddTab,
  onTabContextMenu,
  renamingId,
  renameValue,
  onRenameChange,
  onRenameCommit,
  onRenameCancel,
  accentColor = 'var(--color-primary)',
  size,
  height,
  className = '',
}: TabBarViewProps) {
  const ctx = useDui();
  const s = size ?? ctx.size;
  // TabBar uses nav heights (taller than inputs for click comfort)
  const resolvedHeight = height ?? DUI_HEIGHT.nav[s];
  const fontSize = DUI_FONT_SIZE[s];
  const iconSize = DUI_ICON_SIZE[s];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  // Hover preview: armed after a short delay, positioned under the hovered tab,
  // portaled to <body> so the overflow-x tab strip can't clip it.
  const [preview, setPreview] = useState<{ id: string; x: number; y: number } | null>(null);
  const previewTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const armPreview = (tab: TabBarTab, el: HTMLElement) => {
    if (!tab.preview) return;
    if (previewTimer.current) clearTimeout(previewTimer.current);
    const rect = el.getBoundingClientRect();
    previewTimer.current = setTimeout(() => {
      setPreview({ id: tab.id, x: rect.left + rect.width / 2, y: rect.bottom + 6 });
    }, 350);
  };
  const disarmPreview = () => {
    if (previewTimer.current) clearTimeout(previewTimer.current);
    previewTimer.current = null;
    setPreview(null);
  };
  useEffect(() => () => { if (previewTimer.current) clearTimeout(previewTimer.current); }, []);
  const previewTab = preview ? tabs.find(t => t.id === preview.id) : undefined;

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll);
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => { el.removeEventListener('scroll', checkScroll); ro.disconnect(); };
  }, [checkScroll, tabs.length]);

  const scrollTabs = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -150 : 150, behavior: 'smooth' });
  };

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        height: `${resolvedHeight}px`,
        flexShrink: 0,
        background: 'var(--color-panel)',
        borderBottom: '1px solid var(--color-panel-border)',
      }}
    >
      {/* Scroll left */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollTabs('left')}
          title="Scroll tabs left"
          className="dui_tab-bar__scroll-btn"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '24px', height: '100%', flexShrink: 0, cursor: 'pointer',
            color: 'var(--color-text-muted)', background: 'transparent', border: 'none',
          }}
        >
          <ChevronLeftIcon size={11} />
        </button>
      )}

      {/* Scrollable tab list */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex', alignItems: 'center', height: '100%',
          flex: 1, minWidth: 0, overflowX: 'auto',
        }}
        className="scrollbar-none"
      >
        {tabs.map(tab => {
          const isActive = tab.id === activeTabId;
          const tabAccent = getTabAccent(tab, accentColor);
          // Always-visible close is opt-in only (alwaysShowClose) — a tab's
          // `type` alone (e.g. 'settings') no longer forces it; every tab
          // defaults to the same hover-to-reveal close affordance.
          const isNonCloseable = tab.type === 'mock-server' || !!tab.alwaysShowClose;
          const isRenaming = renamingId === tab.id;

          return (
            <div
              key={tab.id}
              className={`dui_tab-bar__tab group${isActive ? ' dui_tab-bar__tab--active' : ''}`}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '100%',
                padding: '0 12px',
                borderRight: '1px solid var(--color-panel-border)',
                cursor: 'pointer',
                userSelect: 'none',
                flexShrink: 0,
                maxWidth: isRenaming ? '260px' : '200px',
                minWidth: isRenaming ? '180px' : '80px',
                background: isActive
                  ? `color-mix(in srgb, ${tabAccent} 5%, transparent)`
                  : 'transparent',
              }}
              onClick={() => { disarmPreview(); onTabClick(tab.id); }}
              onContextMenu={e => { e.preventDefault(); onTabContextMenu?.(tab.id, e); }}
              onMouseEnter={e => armPreview(tab, e.currentTarget)}
              onMouseLeave={disarmPreview}
            >
              {/* Active top border */}
              {isActive && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '2px', background: tabAccent, zIndex: 10,
                }} />
              )}

              {/* Protocol badge */}
              <TabProtocolBadge tab={tab} />

              {/* Label / inline rename */}
              {isRenaming ? (
                <input
                  autoFocus
                  value={renameValue ?? ''}
                  onChange={e => onRenameChange?.(e.target.value)}
                  onBlur={() => onRenameCommit?.()}
                  onKeyDown={e => {
                    if (e.key === 'Enter') onRenameCommit?.();
                    if (e.key === 'Escape') onRenameCancel?.();
                  }}
                  onClick={e => e.stopPropagation()}
                  style={{
                    flex: 1, minWidth: 0, fontSize, color: 'var(--color-text-primary)',
                    background: 'var(--color-input-bg, var(--color-surface))',
                    border: `1px solid ${tabAccent}`, borderRadius: '4px',
                    padding: '1px 4px', outline: 'none',
                  }}
                />
              ) : (
                <span style={{
                  flex: 1, fontSize, color: 'var(--color-text-primary)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {tab.label}
                </span>
              )}

              {/* Dirty dot */}
              {tab.dirty && !tab.pinned && (
                <span style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: tabAccent, flexShrink: 0,
                }} />
              )}

              {/* Pinned — angled like a real pushpin, tinted with the tab's own accent */}
              {tab.pinned && (
                <PinIcon size={11} style={{ color: tabAccent, transform: 'rotate(45deg)', flexShrink: 0 }} />
              )}

              {/* Close button */}
              {!tab.pinned && !tab.noClose && (
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); onTabClose?.(tab.id); }}
                  title="Close tab"
                  className={`dui_tab-bar__close-btn${isNonCloseable ? ' dui_tab-bar__close-btn--always' : ''}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: `${iconSize + 6}px`, height: `${iconSize + 6}px`, borderRadius: '4px',
                    cursor: 'pointer', flexShrink: 0,
                    color: 'var(--color-error)',
                    background: 'transparent', border: 'none',
                  }}
                >
                  <CloseIcon size={iconSize + 4} />
                </button>
              )}
            </div>
          );
        })}

        {/* Add tab button */}
        {onAddTab && (
          <button
            type="button"
            onClick={onAddTab}
            title="New Tab"
            className="dui_tab-bar__add-btn"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '36px', height: '100%', flexShrink: 0,
              color: accentColor, background: 'transparent', border: 'none', cursor: 'pointer',
            }}
          >
            <PlusIcon size={15} />
          </button>
        )}
      </div>

      {/* Hover preview card */}
      {previewTab?.preview && preview && createPortal(
        <div
          className="dui_tab-bar__preview"
          style={{
            position: 'fixed',
            left: preview.x,
            top: preview.y,
            transform: 'translateX(-50%)',
            zIndex: 9999,
            pointerEvents: 'none',
            background: 'var(--color-panel)',
            border: '1px solid var(--color-panel-border)',
            borderRadius: '10px',
            padding: '6px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
          }}
        >
          {previewTab.preview}
        </div>,
        document.body,
      )}

      {/* Scroll right */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollTabs('right')}
          title="Scroll tabs right"
          className="dui_tab-bar__scroll-btn"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '24px', height: '100%', flexShrink: 0,
            color: 'var(--color-text-muted)', background: 'transparent', border: 'none', cursor: 'pointer',
          }}
        >
          <ChevronRightIcon size={11} />
        </button>
      )}
    </div>
  );
}
