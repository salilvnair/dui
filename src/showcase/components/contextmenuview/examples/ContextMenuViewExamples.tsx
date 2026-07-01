import { useState } from 'react';
import { ContextMenuView, ButtonView, ChipView } from '@/dui';
import type { ContextMenuItem } from '@/dui';
import {
  PlusIcon, TrashIcon, CopyIcon, RenameIcon, FolderIcon, CloseIcon, CloseAllIcon,
  MoreHorizontalIcon,
} from '@/icons/daakia-icons';
import { ExampleCard } from '../../../shared/ExampleCard';

const COLLECTION_ITEMS: ContextMenuItem[] = [
  { id: 'new-req',    label: 'New Request',  icon: <PlusIcon size={13} />,   onClick: () => alert('New Request') },
  { id: 'new-folder', label: 'New Folder',   icon: <FolderIcon size={13} />, onClick: () => alert('New Folder') },
  { id: 'sep1', label: '', separator: true },
  { id: 'rename',     label: 'Rename',       icon: <RenameIcon size={13} />, shortcut: '⌘R', onClick: () => alert('Rename') },
  { id: 'duplicate',  label: 'Duplicate',    icon: <CopyIcon size={13} />,   onClick: () => alert('Duplicate') },
  { id: 'sep2', label: '', separator: true },
  { id: 'delete',     label: 'Delete',       icon: <TrashIcon size={13} />,  danger: true, shortcut: '⌫', onClick: () => alert('Delete') },
];

const REQUEST_ITEMS: ContextMenuItem[] = [
  { id: 'open-tab', label: 'Open in new tab', onClick: () => alert('New tab') },
  { id: 'rename',   label: 'Rename',  icon: <RenameIcon size={13} />, shortcut: '⌘R', onClick: () => alert('Rename') },
  {
    id: 'export', label: 'Export as…', icon: <CopyIcon size={13} />,
    children: [
      { id: 'json', label: 'JSON',  onClick: () => alert('JSON') },
      { id: 'curl', label: 'cURL',  onClick: () => alert('cURL') },
      { id: 'har',  label: 'HAR',   onClick: () => alert('HAR') },
    ],
  },
  { id: 'sep', label: '', separator: true },
  { id: 'delete', label: 'Delete', icon: <TrashIcon size={13} />, danger: true, onClick: () => alert('Delete') },
];

const TAB_ITEMS: ContextMenuItem[] = [
  { id: 'close',       label: 'Close Tab',       icon: <CloseIcon size={13} />,    shortcut: '⌘W', onClick: () => alert('Close') },
  { id: 'close-other', label: 'Close Others',    onClick: () => alert('Close Others') },
  { id: 'close-all',   label: 'Close All',       icon: <CloseAllIcon size={13} />, onClick: () => alert('Close All') },
  { id: 'sep', label: '', separator: true },
  { id: 'pin',         label: 'Pin Tab',         onClick: () => alert('Pin') },
  { id: 'rename',      label: 'Rename Tab',      icon: <RenameIcon size={13} />,   onClick: () => alert('Rename') },
];

const SIMPLE_ITEMS: ContextMenuItem[] = [
  { id: 'copy',    label: 'Copy',   icon: <CopyIcon size={13} />,    onClick: () => alert('Copy') },
  { id: 'rename',  label: 'Rename', icon: <RenameIcon size={13} />,  onClick: () => alert('Rename') },
  { id: 'delete',  label: 'Delete', icon: <TrashIcon size={13} />,   danger: true, onClick: () => alert('Delete') },
];

export function ContextMenuViewExamples() {
  const [openCollection, setOpenCollection]   = useState(false);
  const [elCollection, setElCollection]       = useState<HTMLElement | null>(null);
  const [openRequest, setOpenRequest]         = useState(false);
  const [elRequest, setElRequest]             = useState<HTMLElement | null>(null);
  const [openTab, setOpenTab]                 = useState(false);
  const [elTab, setElTab]                     = useState<HTMLElement | null>(null);
  const [openRightClick, setOpenRightClick]   = useState(false);
  const [elRightClick, setElRightClick]       = useState<HTMLElement | null>(null);
  const [openSimple, setOpenSimple]           = useState(false);
  const [elSimple, setElSimple]               = useState<HTMLElement | null>(null);

  const requestRows = [
    { id: 'r1', label: 'GET /api/users',         method: 'GET',    color: 'var(--color-method-get)' },
    { id: 'r2', label: 'POST /api/auth/login',   method: 'POST',   color: 'var(--color-method-post)' },
    { id: 'r3', label: 'PUT /api/users/:id',     method: 'PUT',    color: 'var(--color-method-put)' },
    { id: 'r4', label: 'DELETE /api/sessions',   method: 'DELETE', color: 'var(--color-method-delete)' },
  ];

  return (
    <div>
      <ExampleCard
        title="Collection Tree Right-Click Menu"
        description="New Request / New Folder / Rename / Duplicate / Delete — right-click a row to open"
        code={`const items: ContextMenuItem[] = [
  { id: 'new-req',    label: 'New Request', icon: <PlusIcon size={13} /> },
  { id: 'new-folder', label: 'New Folder',  icon: <FolderIcon size={13} /> },
  { id: 'sep', label: '', separator: true },
  { id: 'rename',     label: 'Rename',      icon: <RenameIcon size={13} />, shortcut: '⌘R' },
  { id: 'delete',     label: 'Delete',      icon: <TrashIcon size={13} />,  danger: true },
];

<div onContextMenu={e => { e.preventDefault(); setAnchor(e.currentTarget); setOpen(true); }}>
  Collection Folder
</div>
<ContextMenuView items={items} anchorEl={anchor} open={open} onClose={() => setOpen(false)} />`}
        noPad
      >
        <div style={{ width: '100%' }}>
          {requestRows.map(row => (
            <div
              key={row.id}
              onContextMenu={e => {
                e.preventDefault();
                setElRightClick(e.currentTarget as HTMLElement);
                setOpenRightClick(true);
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '7px 16px', cursor: 'pointer',
                borderBottom: '1px solid color-mix(in srgb, var(--color-surface-border) 40%, transparent)',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-hover)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
            >
              <ChipView label={row.method} color={row.color} size="xs" />
              <span style={{ flex: 1, fontSize: 12, color: 'var(--color-text-secondary)' }}>{row.label}</span>
              <button
                type="button"
                onMouseDown={e => { e.stopPropagation(); setElRightClick(e.currentTarget as HTMLElement); setOpenRightClick(v => !v); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '2px 4px', borderRadius: 4, display: 'flex', alignItems: 'center' }}
              >
                <MoreHorizontalIcon size={14} />
              </button>
            </div>
          ))}
          <div style={{ padding: '6px 16px', fontSize: 10, color: 'var(--color-text-muted)' }}>
            Right-click any row or click ⋯ to open the context menu
          </div>
          <ContextMenuView
            items={COLLECTION_ITEMS}
            anchorEl={elRightClick}
            open={openRightClick}
            onClose={() => setOpenRightClick(false)}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Request Item Context Menu with Submenu"
        description="Includes an Export As… submenu with JSON / cURL / HAR options"
        code={`<ButtonView variant="secondary" onClick={e => { setAnchor(e.currentTarget); setOpen(true); }}>
  Open Request Menu ▾
</ButtonView>
<ContextMenuView items={REQUEST_ITEMS} anchorEl={anchor} open={open} onClose={() => setOpen(false)} />`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ButtonView
            variant="secondary"
            onClick={e => { setElRequest(e.currentTarget); setOpenRequest(v => !v); }}
          >
            Open Request Menu ▾
          </ButtonView>
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Hover "Export as…" for submenu</span>
          <ContextMenuView
            items={REQUEST_ITEMS}
            anchorEl={elRequest}
            open={openRequest}
            onClose={() => setOpenRequest(false)}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Tab Context Menu"
        description="Close / Close Others / Close All / Pin / Rename — standard tab bar right-click"
        code={`const TAB_ITEMS: ContextMenuItem[] = [
  { id: 'close',       label: 'Close Tab',    icon: <CloseIcon size={13} />,    shortcut: '⌘W' },
  { id: 'close-other', label: 'Close Others' },
  { id: 'close-all',   label: 'Close All',    icon: <CloseAllIcon size={13} /> },
  { id: 'sep', label: '', separator: true },
  { id: 'pin',         label: 'Pin Tab' },
];`}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <ButtonView
            variant="secondary"
            onClick={e => { setElTab(e.currentTarget); setOpenTab(v => !v); }}
          >
            Tab Options ▾
          </ButtonView>
          <ContextMenuView
            items={TAB_ITEMS}
            anchorEl={elTab}
            open={openTab}
            onClose={() => setOpenTab(false)}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Simple 3-Item Menu"
        description="Minimal menu — Copy / Rename / Delete, no submenus"
        code={`<ContextMenuView
  items={[
    { id: 'copy',   label: 'Copy',   icon: <CopyIcon size={13} /> },
    { id: 'rename', label: 'Rename', icon: <RenameIcon size={13} /> },
    { id: 'delete', label: 'Delete', icon: <TrashIcon size={13} />, danger: true },
  ]}
  anchorEl={anchor}
  open={open}
  onClose={() => setOpen(false)}
  width="sm"
/>`}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <ButtonView
            variant="ghost"
            size="sm"
            onClick={e => { setElCollection(e.currentTarget); setOpenCollection(v => !v); }}
          >
            Open Simple Menu ▾
          </ButtonView>
          <ButtonView
            variant="ghost"
            size="sm"
            onClick={e => { setElSimple(e.currentTarget); setOpenSimple(v => !v); }}
          >
            md width
          </ButtonView>
          <ContextMenuView
            items={SIMPLE_ITEMS}
            anchorEl={elCollection}
            open={openCollection}
            onClose={() => setOpenCollection(false)}
            width="sm"
          />
          <ContextMenuView
            items={SIMPLE_ITEMS}
            anchorEl={elSimple}
            open={openSimple}
            onClose={() => setOpenSimple(false)}
            width="md"
          />
        </div>
      </ExampleCard>
    </div>
  );
}
