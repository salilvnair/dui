import { useState } from 'react';
import { ChipView, ButtonView, ContextMenuView } from '@/dui';
import type { ContextMenuItem } from '@/dui';
import {
  RenameIcon, CopyIcon, ExportIcon, TrashIcon, FolderIcon, PlusIcon, MoreHorizontalIcon,
} from '@/icons/daakia-icons';
import { Row } from '../../../shared/Row';

const CONTEXT_ITEMS: ContextMenuItem[] = [
  { id: 'rename',    label: 'Rename',    icon: <RenameIcon size={13} />, shortcut: '⌘R', onClick: () => alert('Rename') },
  { id: 'duplicate', label: 'Duplicate', icon: <CopyIcon size={13} />,   onClick: () => alert('Duplicate') },
  { id: 'sep1', label: '', separator: true },
  {
    id: 'export', label: 'Export as…', icon: <ExportIcon size={13} />,
    children: [
      { id: 'export-json', label: 'JSON', onClick: () => alert('Export JSON') },
      { id: 'export-curl', label: 'cURL', onClick: () => alert('Export cURL') },
      { id: 'export-har',  label: 'HAR',  onClick: () => alert('Export HAR') },
    ],
  },
  { id: 'sep2', label: '', separator: true },
  { id: 'delete', label: 'Delete', icon: <TrashIcon size={13} />, danger: true, shortcut: '⌫', onClick: () => alert('Delete!') },
];

const COLLECTION_ITEMS: ContextMenuItem[] = [
  { id: 'new-req', label: 'New Request', icon: <PlusIcon size={13} />, onClick: () => alert('New Request') },
  {
    id: 'new-folder', label: 'New Folder', icon: <FolderIcon size={13} />,
    children: [
      { id: 'folder-rest', label: 'REST Collection', onClick: () => alert('REST') },
      {
        id: 'folder-gql', label: 'GraphQL Collection',
        children: [
          { id: 'gql-introspect', label: 'With Introspection', onClick: () => alert('GQL+Introspect') },
          { id: 'gql-manual',     label: 'Manual Schema',      onClick: () => alert('GQL Manual') },
        ],
      },
    ],
  },
  { id: 'sep1', label: '', separator: true },
  { id: 'rename',    label: 'Rename',    icon: <RenameIcon size={13} />, shortcut: '⌘R', onClick: () => alert('Rename') },
  { id: 'duplicate', label: 'Duplicate', icon: <CopyIcon size={13} />,                   onClick: () => alert('Duplicate') },
  { id: 'sep2', label: '', separator: true },
  {
    id: 'export', label: 'Export as…', icon: <ExportIcon size={13} />,
    children: [
      { id: 'export-json',     label: 'JSON',         onClick: () => alert('JSON') },
      { id: 'export-openapi',  label: 'OpenAPI 3.0',  onClick: () => alert('OpenAPI') },
      {
        id: 'export-more', label: 'More formats…',
        children: [
          { id: 'export-curl',    label: 'cURL',         onClick: () => alert('cURL') },
          { id: 'export-har',     label: 'HAR',          onClick: () => alert('HAR') },
          { id: 'export-postman', label: 'Postman v2.1', onClick: () => alert('Postman') },
        ],
      },
    ],
  },
  { id: 'delete', label: 'Delete', icon: <TrashIcon size={13} />, danger: true, shortcut: '⌫', onClick: () => alert('Delete!') },
];

export function ContextMenuViewLive() {
  const [open1, setOpen1] = useState(false);
  const [el1, setEl1] = useState<HTMLElement | null>(null);
  const [open2, setOpen2] = useState(false);
  const [el2, setEl2] = useState<HTMLElement | null>(null);
  const [open3, setOpen3] = useState(false);
  const [el3, setEl3] = useState<HTMLElement | null>(null);
  const [openColl, setOpenColl] = useState(false);
  const [elColl, setElColl] = useState<HTMLElement | null>(null);
  const [openPos, setOpenPos] = useState(false);
  const [elPos, setElPos] = useState<HTMLElement | null>(null);

  const widthItems: ContextMenuItem[] = [
    { id: 'a', label: 'Rename',    icon: <RenameIcon size={13} />, onClick: () => alert('Rename') },
    { id: 'b', label: 'Duplicate', icon: <CopyIcon size={13} />,   onClick: () => alert('Duplicate') },
    { id: 'c', label: 'Delete',    icon: <TrashIcon size={13} />,  danger: true, onClick: () => alert('Delete') },
  ];

  const treeItems = [
    { id: 'f1', name: 'User Service', method: 'GET',    color: 'var(--color-method-get)' },
    { id: 'f2', name: 'Create Order', method: 'POST',   color: 'var(--color-method-post)' },
    { id: 'f3', name: 'Update Cart',  method: 'PUT',    color: 'var(--color-method-put)' },
    { id: 'f4', name: 'Delete Item',  method: 'DELETE', color: 'var(--color-method-delete)' },
  ];

  return (
    <div>
      <Row label="Standard context menu (with submenu)" gap={12} code={`<ButtonView variant="secondary" onClick={e => { setAnchor(e.currentTarget); setOpen(true); }}>\n  Open Context Menu ▾\n</ButtonView>\n<ContextMenuView\n  items={CONTEXT_ITEMS}\n  anchorEl={anchor}\n  open={open}\n  onClose={() => setOpen(false)}\n/>`}>
        <ButtonView variant="secondary" onClick={e => { setEl1(e.currentTarget); setOpen1(v => !v); }}>
          Open Context Menu ▾
        </ButtonView>
        <ContextMenuView items={CONTEXT_ITEMS} anchorEl={el1} open={open1} onClose={() => setOpen1(false)} />
        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Hover "Export as…" for JSON / cURL / HAR submenu</span>
      </Row>

      <Row label="Collection tree — 3-level nested submenu (right-click a row)" noPad code={`// 3-level nesting: New Folder > GraphQL Collection > With Introspection\n// Export as… > More formats… > cURL / HAR / Postman\nconst COLLECTION_ITEMS: ContextMenuItem[] = [\n  { id: 'new-folder', label: 'New Folder', icon: <FolderIcon />,\n    children: [\n      { id: 'folder-gql', label: 'GraphQL Collection',\n        children: [\n          { id: 'gql-introspect', label: 'With Introspection', onClick: handleCreate },\n        ],\n      },\n    ],\n  },\n];`}>
        <div style={{ width: '100%' }}>
          {treeItems.map(item => (
            <div
              key={item.id}
              onContextMenu={e => { e.preventDefault(); setElColl(e.currentTarget as HTMLElement); setOpenColl(true); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '7px 16px', cursor: 'pointer',
                borderBottom: '1px solid color-mix(in srgb, var(--color-surface-border) 40%, transparent)',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-hover)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
            >
              <ChipView label={item.method} color={item.color} size="xs" />
              <span style={{ flex: 1, fontSize: 12, color: 'var(--color-text-secondary)' }}>{item.name}</span>
              <button
                type="button"
                onMouseDown={e => { e.stopPropagation(); setElColl(e.currentTarget as HTMLElement); setOpenColl(v => !v); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '2px 4px', borderRadius: 4, display: 'flex', alignItems: 'center' }}
              >
                <MoreHorizontalIcon size={14} />
              </button>
            </div>
          ))}
          <div style={{ padding: '6px 16px', fontSize: 10, color: 'var(--color-text-muted)' }}>
            Right-click any row or click ⋯ — hover "New Folder" then "GraphQL Collection" to see 3-level depth
          </div>
          <ContextMenuView items={COLLECTION_ITEMS} anchorEl={elColl} open={openColl} onClose={() => setOpenColl(false)} />
        </div>
      </Row>

      <Row label='width sizes  "sm" / "md" / "lg"' gap={12} code={`<ContextMenuView items={items} anchorEl={el} open={open} onClose={close} width="sm" />\n<ContextMenuView items={items} anchorEl={el} open={open} onClose={close} width="md" />`}>
        <ButtonView variant="secondary" size="sm" onClick={e => { setEl2(e.currentTarget); setOpen2(v => !v); }}>sm menu</ButtonView>
        <ButtonView variant="secondary" size="sm" onClick={e => { setEl3(e.currentTarget); setOpen3(v => !v); }}>md menu</ButtonView>
        <ContextMenuView items={widthItems} anchorEl={el2} open={open2} onClose={() => setOpen2(false)} width="sm" />
        <ContextMenuView items={widthItems} anchorEl={el3} open={open3} onClose={() => setOpen3(false)} width="md" />
      </Row>

      <Row label="Features" code={`// Portal-rendered, recursive submenus, danger items, separators, shortcuts\n<ContextMenuView\n  items={[\n    { id: 'rename', label: 'Rename',    icon: <RenameIcon />, shortcut: '⌘R' },\n    { id: 'sep',    label: '',          separator: true },\n    { id: 'delete', label: 'Delete',    icon: <TrashIcon />,  danger: true },\n    { id: 'export', label: 'Export as…', children: [...] },\n  ]}\n/>`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: 'var(--color-text-secondary)' }}>
          {[
            '✓ Portal-rendered — always on top',
            '✓ Recursive submenu support — 3+ levels deep',
            '✓ Auto-repositions toward available viewport space',
            '✓ danger=true → red label (Delete item)',
            '✓ separator=true → horizontal rule divider',
            '✓ shortcut badge on the right',
            '✓ Escape key or outside click closes menu',
            '✓ onContextMenu / ⋯ button patterns both supported',
          ].map(f => <div key={f}>{f}</div>)}
        </div>
      </Row>

      <Row label="Position-aware — menu auto-opens toward available viewport space" align="flex-start" code={`// No extra props needed — ContextMenuView detects available space automatically\n<ContextMenuView items={items} anchorEl={anchor} open={open} onClose={close} />`}>
        <div style={{ width: '100%', height: 160, position: 'relative', background: 'color-mix(in srgb, var(--color-surface-border) 20%, transparent)', borderRadius: 8 }}>
          {([
            { label: 'Top-Left ▾',     style: { top: 8, left: 8 } as React.CSSProperties },
            { label: 'Top-Right ▾',    style: { top: 8, right: 8 } as React.CSSProperties },
            { label: 'Bottom-Left ▾',  style: { bottom: 8, left: 8 } as React.CSSProperties },
            { label: 'Bottom-Right ▾', style: { bottom: 8, right: 8 } as React.CSSProperties },
          ]).map(({ label, style: s }) => (
            <button
              key={label}
              type="button"
              onClick={e => { setElPos(e.currentTarget); setOpenPos(v => !v); }}
              style={{
                position: 'absolute', ...s,
                padding: '4px 9px', borderRadius: 5, border: '1px solid var(--color-surface-border)',
                background: 'var(--color-surface)', cursor: 'pointer',
                color: 'var(--color-text-secondary)', fontSize: 11, fontFamily: 'inherit',
              }}
            >{label}</button>
          ))}
          <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 10, color: 'var(--color-text-muted)', textAlign: 'center', pointerEvents: 'none' }}>
            Click any corner button —<br />menu direction auto-adjusts
          </span>
          <ContextMenuView items={widthItems} anchorEl={elPos} open={openPos} onClose={() => setOpenPos(false)} />
        </div>
      </Row>
    </div>
  );
}
