import { useState } from 'react';
import { FolderView } from '@/dui';
import type { FolderNode, FolderAction } from '@/dui';
import {
  FilePlusIcon, FolderPlusIcon, PlayIcon, MoreVerticalIcon,
} from '@/icons/daakia-icons';

export interface DemoRequest { method: string; name: string; }

const FOLDER_METHOD_COLORS: Record<string, string> = {
  GET:    'var(--color-method-get)',
  POST:   'var(--color-method-post)',
  PUT:    'var(--color-method-put)',
  PATCH:  'var(--color-method-patch)',
  DELETE: 'var(--color-method-delete)',
};

const FOLDER_DEMO_NODES: FolderNode<DemoRequest>[] = [
  {
    id: 'users', label: 'Users API', items: [],
    children: [
      { id: 'auth', label: 'Auth', items: [
        { method: 'POST', name: 'Login' },
        { method: 'POST', name: 'Logout' },
        { method: 'POST', name: 'Refresh Token' },
      ]},
      { id: 'crud', label: 'Users CRUD', items: [
        { method: 'GET',    name: 'Get All Users' },
        { method: 'POST',   name: 'Create User' },
        { method: 'PUT',    name: 'Update User' },
        { method: 'DELETE', name: 'Delete User' },
      ]},
    ],
  },
  {
    id: 'payments', label: 'Payments', items: [
      { method: 'POST', name: 'Create Charge' },
      { method: 'GET',  name: 'Transaction History' },
      { method: 'POST', name: 'Issue Refund' },
    ],
  },
  {
    id: 'webhooks', label: 'Webhooks', items: [
      { method: 'POST',   name: 'Subscribe' },
      { method: 'DELETE', name: 'Unsubscribe' },
    ],
  },
];

const FOLDER_DEMO_ACTIONS: FolderAction<DemoRequest>[] = [
  { id: 'file-plus',   icon: <FilePlusIcon size={12} />,     tooltip: 'New Request',    onClick: () => {} },
  { id: 'folder-plus', icon: <FolderPlusIcon size={12} />,   tooltip: 'New Folder',     onClick: () => {} },
  { id: 'run',         icon: <PlayIcon size={12} />,          tooltip: 'Run Collection', onClick: () => {} },
  { id: 'more',        icon: <MoreVerticalIcon size={12} />,  tooltip: 'More Options',   onClick: () => {} },
];

export function FolderViewLive() {
  const [lastMove, setLastMove] = useState<string | null>(null);

  const handleMove = (dragId: string, targetId: string, position: 'before' | 'inside' | 'after') => {
    setLastMove(`Moved "${dragId}" ${position} "${targetId}"`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ border: '1px solid var(--color-surface-border)', borderRadius: 8, overflow: 'hidden', width: '100%', background: 'var(--color-bg)' }}>
        <FolderView
          nodes={FOLDER_DEMO_NODES}
          accentColor="var(--color-protocol-rest)"
          defaultExpandedIds={new Set(['users', 'auth', 'payments'])}
          draggable
          onMove={handleMove}
          confirmFolderMove
          renderItem={(item, _node, depth) => (
            <div
              className="flex items-center gap-2 py-1 rounded-md hover:bg-[var(--color-item-hover-bg)] cursor-pointer group/req"
              style={{ paddingLeft: `${(depth + 1) * 12 + 8}px`, paddingRight: 8 }}
            >
              <span style={{
                fontSize: 9, fontWeight: 700,
                color: FOLDER_METHOD_COLORS[item.method] || 'var(--color-text-muted)',
                width: 36, flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                {item.method}
              </span>
              <span style={{ fontSize: 11.5, color: 'var(--color-text-primary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.name}
              </span>
              <button type="button"
                className="opacity-0 group-hover/req:opacity-100 flex items-center justify-center w-5 h-5 rounded hover:bg-[var(--color-icon-hover-bg)]"
                style={{ color: 'var(--color-text-muted)', border: 'none', background: 'none', cursor: 'pointer', flexShrink: 0, padding: 0 }}
              >
                <MoreVerticalIcon size={11} />
              </button>
            </div>
          )}
          folderActions={FOLDER_DEMO_ACTIONS}
          contextMenuItems={(node) => [
            { id: 'new-request',  label: 'New Request',  onClick: () => {} },
            { id: 'new-folder',   label: 'New Folder',   onClick: () => {} },
            { id: 'rename',       label: 'Rename',       onClick: () => {} },
            { id: 'duplicate',    label: 'Duplicate',    onClick: () => {} },
            { id: 'sep', label: '', separator: true },
            { id: 'delete', label: 'Delete', danger: true, onClick: () => alert(`Delete "${node.label}"`) },
          ]}
        />
      </div>
      {lastMove && (
        <div style={{ fontSize: 11, color: 'var(--color-text-muted)', padding: '4px 8px', background: 'var(--color-surface)', borderRadius: 6, border: '1px solid var(--color-surface-border)' }}>
          ↳ {lastMove}
        </div>
      )}
      <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
        Drag folders to reorder or nest. Blue line = before/after, ring = drop inside.
        <code style={{ marginLeft: 6, fontSize: 10, background: 'var(--color-surface)', padding: '1px 5px', borderRadius: 4, border: '1px solid var(--color-surface-border)' }}>confirmFolderMove</code> shows a confirm modal before moving.
      </div>
    </div>
  );
}
