import { useState } from 'react';
import { FabView } from '@/dui';
import { ExampleCard } from '../../../shared/ExampleCard';
import { FolderIcon, DownloadIcon, PlusIcon, SendIcon } from '../../../../icons';

export function FabViewExamples() {
  const [lastAction, setLastAction] = useState('');

  return (
    <div>
      <ExampleCard
        title="Speed Dial (multi-action)"
        description="actions renders a fanned-out menu of sub-actions on click, with a rotating close icon"
        code={`<FabView
  actions={[
    { icon: <FolderIcon />, label: 'New Folder', onClick: () => {} },
    { icon: <DownloadIcon />, label: 'Import', onClick: () => {} },
  ]}
/>`}
      >
        <div style={{ position: 'relative', height: 140 }}>
          <FabView
            actions={[
              { icon: <FolderIcon size={18} />, label: 'New Folder', onClick: () => setLastAction('New Folder') },
              { icon: <DownloadIcon size={18} />, label: 'Import', onClick: () => setLastAction('Import') },
            ]}
          />
        </div>
      </ExampleCard>

      <ExampleCard
        title="New Request Speed Dial (interactive)"
        description="A realistic collections-panel action — new request, new folder, import — tracking the last selection"
        code={`const [last, setLast] = useState('');

<FabView
  icon={<PlusIcon />}
  actions={[
    { icon: <SendIcon />, label: 'New Request', onClick: () => setLast('New Request') },
    { icon: <FolderIcon />, label: 'New Folder', onClick: () => setLast('New Folder') },
    { icon: <DownloadIcon />, label: 'Import Collection', onClick: () => setLast('Import Collection') },
  ]}
/>`}
      >
        <div style={{ position: 'relative', height: 180 }}>
          <FabView
            icon={<PlusIcon size={20} />}
            actions={[
              { icon: <SendIcon size={18} />, label: 'New Request', onClick: () => setLastAction('New Request') },
              { icon: <FolderIcon size={18} />, label: 'New Folder', onClick: () => setLastAction('New Folder') },
              { icon: <DownloadIcon size={18} />, label: 'Import Collection', onClick: () => setLastAction('Import Collection') },
            ]}
          />
        </div>
        {lastAction && <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Last: {lastAction}</div>}
      </ExampleCard>

      <ExampleCard
        title="Extended FAB (with label)"
        description="A label prop renders text beside the icon instead of a bare round button"
        code={`<FabView icon={<SendIcon />} label="New Request" onClick={() => {}} />`}
      >
        <div style={{ position: 'relative', height: 80 }}>
          <FabView icon={<SendIcon size={18} />} label="New Request" onClick={() => setLastAction('Extended click')} />
        </div>
      </ExampleCard>

      <ExampleCard
        title="Position Variants"
        description="position controls which viewport corner the FAB anchors to"
        code={`<FabView position="bottom-right" onClick={() => {}} />
<FabView position="bottom-left" onClick={() => {}} />`}
      >
        <div style={{ position: 'relative', height: 80 }}>
          <FabView position="bottom-left" onClick={() => setLastAction('Bottom-left click')} />
        </div>
        <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Default position is bottom-right (see other examples above).</div>
      </ExampleCard>

      <ExampleCard
        title="Custom Color, Single Action"
        description="A plain single-action FAB (no actions array) with a custom accent color"
        code={`<FabView icon={<PlusIcon />} color="var(--color-success)" onClick={() => {}} />`}
      >
        <div style={{ position: 'relative', height: 80 }}>
          <FabView icon={<PlusIcon size={20} />} color="var(--color-success)" onClick={() => setLastAction('Green FAB click')} />
        </div>
      </ExampleCard>
    </div>
  );
}
