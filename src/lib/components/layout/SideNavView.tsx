import { useState, useMemo } from 'react';
import { SidebarLeftIcon, SidebarRightIcon, ChevronDownIcon, SearchIcon } from '../../../icons';
import type { DuiSize } from '../../core/DuiTypes';
import { useNavBase } from '../../core/NavBase';
import './SideNavView.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SideNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  /** Accent-colored pill badge — e.g. "New", 3 */
  badge?: number | string;
  /** Plain muted count shown right of group header label */
  count?: number;
  /** When true: renders as uppercase section header (non-selectable, collapsible) */
  isGroup?: boolean;
  /**
   * A group's entries — or, on an entry that is not a group, the pages under
   * it: the entry becomes a branch that expands under its own chevron, its
   * pages indented beneath it, and it opens by itself when one of them is the
   * active one. Branches nest.
   */
  children?: SideNavItem[];
}

export interface SideNavViewProps {
  items: SideNavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  /** Controlled collapsed state — overrides internal state when provided */
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  defaultOpenIds?: string[];
  width?: number;
  collapsedWidth?: number;
  /** When true, fills 100% of the parent's width instead of a fixed pixel `width` — for use inside a resizable container like SplitPanelView, which controls sizing itself. */
  fillContainer?: boolean;
  accentColor?: string;
  /** Render a search box above the nav items */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Message shown when no items match the search */
  emptyText?: string;
  /** Falls back to DuiProvider context when omitted. */
  size?: DuiSize;
  className?: string;
  style?: React.CSSProperties;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** A non-group entry with pages under it. */
export function isBranch(item: SideNavItem): boolean {
  return !item.isGroup && (item.children?.length ?? 0) > 0;
}

/** The selectable entries — a group or a branch counts what is under it, not itself. */
export function countLeaves(items: SideNavItem[]): number {
  return items.reduce((s, item) =>
    s + (item.isGroup || isBranch(item) ? countLeaves(item.children ?? []) : 1), 0);
}

/** Whether `id` is this entry or somewhere under it. */
export function containsId(item: SideNavItem, id: string | undefined): boolean {
  if (id === undefined) return false;
  if (item.id === id) return true;
  return (item.children ?? []).some(c => containsId(c, id));
}

export function filterItems(items: SideNavItem[], q: string): SideNavItem[] {
  if (!q) return items;
  const hit = (s: string) => s.toLowerCase().includes(q.toLowerCase());
  return items.reduce<SideNavItem[]>((acc, item) => {
    if (item.isGroup) {
      const filteredChildren = filterItems(item.children ?? [], q);
      if (filteredChildren.length > 0) acc.push({ ...item, children: filteredChildren });
    } else if (isBranch(item)) {
      /* A branch whose own name matches keeps all its pages; otherwise the pages that match. */
      if (hit(item.label)) acc.push(item);
      else {
        const filteredChildren = filterItems(item.children ?? [], q);
        if (filteredChildren.length > 0) acc.push({ ...item, children: filteredChildren });
      }
    } else if (hit(item.label)) {
      acc.push(item);
    }
    return acc;
  }, []);
}

/** How far each level of a branch indents its pages. */
const BRANCH_INDENT = 14;

/** How long a group or a branch takes to open or close. */
const EXPAND_MS = 200;

/**
 * Opens and closes its children by height, smoothly — grid rows from 0fr to
 * 1fr, which animates to the content's own height without measuring it.
 * Closed content is `visibility: hidden` once the animation ends, so it drops
 * out of the tab order rather than being focusable while invisible.
 */
function Expand({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div
      className="dui_side-nav__expand"
      style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        opacity: open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
        transition: `grid-template-rows ${EXPAND_MS}ms ease, opacity ${EXPAND_MS}ms ease, visibility 0s linear ${open ? '0ms' : `${EXPAND_MS}ms`}`,
      }}
    >
      <div style={{ overflow: 'hidden', minHeight: 0 }}>{children}</div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SideNavView({
  items,
  activeId,
  onSelect,
  collapsible = true,
  defaultCollapsed = false,
  collapsed: collapsedProp,
  onCollapsedChange,
  defaultOpenIds,
  width = 200,
  collapsedWidth = 44,
  fillContainer = false,
  accentColor,
  searchable = false,
  searchPlaceholder = 'Search…',
  emptyText = 'No results',
  size,
  className = '',
  style,
}: SideNavViewProps) {
  const base = useNavBase(size);

  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => {
    if (defaultOpenIds !== undefined) return new Set(defaultOpenIds);
    return new Set(items.filter(i => i.isGroup).map(i => i.id));
  });
  const [search, setSearch] = useState('');
  /* Branches the reader closed while one of their pages was active — without
     this, a branch holding the active page could never be folded. */
  const [closedBranches, setClosedBranches] = useState<Set<string>>(() => new Set());

  const isControlled  = collapsedProp !== undefined;
  const collapsed     = isControlled ? collapsedProp : internalCollapsed;
  const accent        = accentColor || 'var(--color-primary)';
  const q             = search.trim();
  const isFiltering   = q.length > 0;

  // Derive numeric item height for collapsed icon square sizing
  const itemH = parseInt(base.itemHeight, 10);
  const iconSquare = Math.max(itemH - 6, 24);

  const totalLeaves    = useMemo(() => countLeaves(items), [items]);
  const filteredItems  = useMemo(() => filterItems(items, q), [items, q]);
  const filteredLeaves = useMemo(() => countLeaves(filteredItems), [filteredItems]);

  const handleCollapse = (v: boolean) => {
    if (!isControlled) setInternalCollapsed(v);
    onCollapsedChange?.(v);
  };

  const toggleGroup = (id: string) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const branchOpen = (item: SideNavItem) =>
    isFiltering || ((openGroups.has(item.id) || containsId(item, activeId)) && !closedBranches.has(item.id));

  const toggleBranch = (item: SideNavItem) => {
    const open = branchOpen(item);
    setOpenGroups(prev => {
      const next = new Set(prev);
      if (open) next.delete(item.id); else next.add(item.id);
      return next;
    });
    setClosedBranches(prev => {
      const next = new Set(prev);
      if (open) next.add(item.id); else next.delete(item.id);
      return next;
    });
  };

  // ── Item renderer ──────────────────────────────────────────────────────────

  const renderLeafItem = (item: SideNavItem, depth = 0) => {
    const isActive = item.id === activeId;
    // An accent given to this nav should tint its active row. Without this the
    // row fell back to the app-wide sidenav token, so a section-coloured nav
    // still highlighted in some other colour and `accentColor` looked broken.
    const activeBg = accentColor
      ? `color-mix(in srgb, ${accentColor} 18%, transparent)`
      : 'var(--color-sidenav-active-bg)';
    const activeFg = accentColor ?? 'var(--color-sidenav-active-text)';
    const branch = isBranch(item);
    const open = branch && branchOpen(item);
    /* A folded branch holding the active page takes the accent colour, so
       where you are still shows. */
    const holdsActive = branch && !isActive && containsId(item, activeId);
    const indent = depth * BRANCH_INDENT;

    if (branch && collapsed) {
      /* An icon rail has no room for a tree: the pages stand in for their branch. */
      return <div key={item.id}>{(item.children ?? []).map(c => renderLeafItem(c, depth))}</div>;
    }

    const row = (
      <div
        key={item.id}
        title={collapsed ? item.label : undefined}
        onClick={() => (branch ? toggleBranch(item) : onSelect?.(item.id))}
        data-nav-id={item.id}
        role={branch ? 'button' : undefined}
        aria-expanded={branch ? open : undefined}
        className={`dui_side-nav__item${isActive ? ' dui_side-nav__item--active' : ''}${branch ? ' dui_side-nav__item--branch' : ''}`}
        style={collapsed ? {
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: iconSquare, height: iconSquare, borderRadius: 8, margin: '1px auto',
          cursor: 'pointer',
          background: isActive ? activeBg : 'transparent',
          color: isActive ? activeFg : 'var(--color-text-secondary)',
        } : {
          display: 'flex', alignItems: 'center', gap: base.gap,
          height: base.itemHeight, borderRadius: base.borderRadius,
          padding: `0 8px 0 calc(${base.paddingX} + ${indent}px)`,
          cursor: 'pointer', marginBottom: 1,
          background: isActive ? activeBg : 'transparent',
          color: isActive || holdsActive ? activeFg : 'var(--color-text-secondary)',
        }}
      >
        {item.icon && (
          <span style={{
            flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: base.iconSize,
            /* A branch's pages sit a step below it: the icon a little smaller… */
            ...(depth > 0 && !collapsed ? { transform: 'scale(0.86)', opacity: isActive ? 1 : 0.9 } : {}),
          }}>
            {item.icon}
          </span>
        )}
        {!collapsed && (
          <>
            <span style={{
              /* …and the name a pixel smaller. */
              flex: 1, fontSize: depth > 0 ? `calc(${base.fontSize} - 1px)` : base.fontSize,
              fontWeight: isActive ? 600 : 400,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {item.label}
            </span>
            {item.badge !== undefined && (
              <span style={{
                fontSize: '10px', padding: '1px 5px', borderRadius: 99,
                background: `color-mix(in srgb, ${accent} 15%, transparent)`,
                color: accent, fontWeight: 600, flexShrink: 0,
              }}>
                {item.badge}
              </span>
            )}
            {branch && (
              <ChevronDownIcon
                size={10}
                style={{
                  flexShrink: 0, color: 'var(--color-text-muted)',
                  transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 180ms ease',
                }}
              />
            )}
          </>
        )}
      </div>
    );

    if (!branch) return row;
    return (
      <div key={item.id}>
        {row}
        {/* The pages, indented under the branch. */}
        <Expand open={open}>
          {(item.children ?? []).map(c => renderLeafItem(c, depth + 1))}
        </Expand>
      </div>
    );
  };

  const renderGroupItem = (item: SideNavItem) => {
    const isOpen = openGroups.has(item.id);
    const filteredChildCount = item.children?.length ?? 0;
    const displayCount = isFiltering ? filteredChildCount : (item.count ?? filteredChildCount);
    const children = item.children ?? [];

    if (collapsed) {
      return <div key={item.id} style={{ marginBottom: 8 }}>{children.map(c => renderLeafItem(c))}</div>;
    }

    return (
      <div key={item.id} style={{ marginBottom: 4 }}>
        <button
          type="button"
          onClick={() => toggleGroup(item.id)}
          style={{
            width: '100%', background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 5,
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--color-text-muted)',
            padding: '10px 8px 4px', fontFamily: 'inherit',
          }}
        >
          <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
          {displayCount > 0 && (
            <span style={{
              fontSize: '11px', fontWeight: 500,
              color: 'var(--color-text-muted)',
              flexShrink: 0, textTransform: 'none', letterSpacing: 0,
            }}>
              {displayCount}
            </span>
          )}
          <ChevronDownIcon
            size={10}
            style={{
              transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 180ms ease',
              flexShrink: 0,
            }}
          />
        </button>
        <Expand open={isOpen || isFiltering}>
          {children.map(c => renderLeafItem(c))}
        </Expand>
      </div>
    );
  };

  const renderItem = (item: SideNavItem) =>
    item.isGroup ? renderGroupItem(item) : renderLeafItem(item);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      className={className}
      style={{
        width: collapsed ? collapsedWidth : (fillContainer ? '100%' : width),
        minWidth: collapsed ? collapsedWidth : (fillContainer ? undefined : width),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-panel)',
        borderRight: '1px solid var(--color-panel-border)',
        transition: 'width 200ms ease, min-width 200ms ease',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Search box */}
      {searchable && !collapsed && (
        <div style={{ padding: '10px 10px 8px', flexShrink: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            height: '28px', padding: '0 8px',
            borderRadius: '6px',
            border: '1px solid var(--color-input-border)',
            background: 'var(--color-input-bg)',
          }}>
            <SearchIcon size={11} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              style={{
                flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
                fontSize: '11px', color: 'var(--color-text-primary)', fontFamily: 'inherit',
              }}
            />
            {isFiltering ? (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="dui_side-nav__clear-btn"
                style={{
                  border: 'none', cursor: 'pointer', padding: 0, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                  background: 'transparent', color: 'var(--color-text-muted)',
                }}
                title="Clear search"
              >
                <span style={{ fontSize: '12px', lineHeight: 1, fontWeight: 500 }}>✕</span>
              </button>
            ) : (
              <span style={{
                fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)',
                flexShrink: 0, padding: '1px 6px', borderRadius: 4,
                background: 'color-mix(in srgb, var(--color-text-primary) 7%, transparent)',
              }}>
                {totalLeaves}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Nav items */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: collapsed ? '4px 4px 16px' : '4px 6px 16px',
      }}>
        {filteredItems.map(renderItem)}
        {isFiltering && filteredLeaves === 0 && (
          <div style={{
            padding: '20px 8px', fontSize: '11px',
            color: 'var(--color-text-muted)', textAlign: 'center',
          }}>
            {emptyText}
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      {collapsible && !isControlled && (
        <div style={{
          borderTop: '1px solid var(--color-panel-border)',
          display: 'flex', alignItems: 'center',
          padding: '4px 6px', flexShrink: 0,
        }}>
          <button
            type="button"
            onClick={() => handleCollapse(!collapsed)}
            className="dui_side-nav__collapse-btn"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 28, height: 28, borderRadius: 6, flexShrink: 0,
              background: 'transparent', border: 'none',
              color: 'var(--color-text-muted)', cursor: 'pointer',
            }}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <SidebarRightIcon size={14} /> : <SidebarLeftIcon size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}
