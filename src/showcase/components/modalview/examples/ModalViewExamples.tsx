import { useState } from 'react';
import { ModalView, ButtonView, TextInputView } from '@/dui';
import { TrashIcon, PlusIcon, DownloadIcon } from '@/icons/daakia-icons';
import { ExampleCard } from '../../../shared/ExampleCard';

// ─── Delete Confirmation ──────────────────────────────────────────────────────
function DeleteConfirmDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ButtonView variant="danger" size="sm" iconLeft={<TrashIcon size={11} />} onClick={() => setOpen(true)}>
        Delete Collection
      </ButtonView>
      <ModalView
        open={open}
        onClose={() => setOpen(false)}
        title="Delete Collection?"
        subtitle="This action cannot be undone."
        size="sm"
        headerColor="var(--color-error)"
        footerRight={
          <>
            <ButtonView variant="danger" size="md" onClick={() => setOpen(false)}>Delete</ButtonView>
          </>
        }
      >
        <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          The collection <strong style={{ color: 'var(--color-text-primary)' }}>My API Tests</strong> and all
          its requests will be permanently deleted.
        </p>
      </ModalView>
    </>
  );
}

// ─── New Collection Form ──────────────────────────────────────────────────────
function NewCollectionFormDemo() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  return (
    <>
      <ButtonView variant="primary" size="sm" iconLeft={<PlusIcon size={11} />} onClick={() => setOpen(true)}>
        New Collection
      </ButtonView>
      <ModalView
        open={open}
        onClose={() => setOpen(false)}
        title="New Collection"
        subtitle="Group requests by project or API"
        size="md"
        footerRight={
          <ButtonView variant="primary" size="md" disabled={!name.trim()} onClick={() => setOpen(false)}>
            Create
          </ButtonView>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Collection name</div>
            <TextInputView
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Payments API"
              size="md"
            />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Base URL (optional)</div>
            <TextInputView
              placeholder="https://api.example.com"
              size="md"
            />
          </div>
        </div>
      </ModalView>
    </>
  );
}

// ─── Image Preview (no footer) ────────────────────────────────────────────────
function ImagePreviewDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ButtonView variant="secondary" size="sm" onClick={() => setOpen(true)}>Preview Response</ButtonView>
      <ModalView
        open={open}
        onClose={() => setOpen(false)}
        title="Response Preview"
        size="lg"
        noPadding
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: 280, background: 'var(--color-panel)',
          color: 'var(--color-text-muted)', fontSize: 13,
        }}>
          [Image / media preview renders here]
        </div>
      </ModalView>
    </>
  );
}

// ─── Import from URL ──────────────────────────────────────────────────────────
function ImportFromUrlDemo() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  return (
    <>
      <ButtonView variant="secondary" size="sm" iconLeft={<DownloadIcon size={11} />} onClick={() => setOpen(true)}>
        Import from URL
      </ButtonView>
      <ModalView
        open={open}
        onClose={() => setOpen(false)}
        title="Import Collection"
        subtitle="Enter an OpenAPI / Postman JSON URL"
        size="md"
        footerLeft={
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
            Supports OpenAPI 3.x, Postman v2.1
          </span>
        }
        footerRight={
          <ButtonView variant="primary" size="md" disabled={!url.trim()} onClick={() => setOpen(false)}>
            Import
          </ButtonView>
        }
      >
        <div>
          <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>Collection URL</div>
          <TextInputView
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://petstore.swagger.io/v2/swagger.json"
            size="md"
          />
        </div>
      </ModalView>
    </>
  );
}

// ─── Nested Modals ────────────────────────────────────────────────────────────
function NestedModalsDemo() {
  const [outer, setOuter] = useState(false);
  const [inner, setInner] = useState(false);
  return (
    <>
      <ButtonView variant="ghost" size="sm" onClick={() => setOuter(true)}>Open Outer Modal</ButtonView>
      <ModalView
        open={outer}
        onClose={() => setOuter(false)}
        title="Outer Modal"
        size="md"
        footerRight={
          <ButtonView variant="primary" size="md" onClick={() => setInner(true)}>
            Open Inner Modal
          </ButtonView>
        }
      >
        <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-secondary)' }}>
          Click the button below to open an inner modal stacked on top.
        </p>
        <ModalView
          open={inner}
          onClose={() => setInner(false)}
          title="Inner Modal (z-index auto-stacked)"
          size="sm"
          headerColor="var(--color-protocol-graphql)"
          footerRight={
            <ButtonView variant="primary" size="md" onClick={() => setInner(false)}>Got it</ButtonView>
          }
        >
          <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-secondary)' }}>
            This modal auto-stacks above the outer one via the <code>_mountLayer</code> counter in ModalView.
          </p>
        </ModalView>
      </ModalView>
    </>
  );
}

// ─── Size Variants ────────────────────────────────────────────────────────────
function SizeVariantsDemo() {
  const [openSize, setOpenSize] = useState<string | null>(null);
  const sizes = ['sm', 'md', 'lg', 'xl'] as const;
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {sizes.map(s => (
        <ButtonView key={s} variant="secondary" size="sm" onClick={() => setOpenSize(s)}>
          {s.toUpperCase()}
        </ButtonView>
      ))}
      {sizes.map(s => (
        <ModalView
          key={s}
          open={openSize === s}
          onClose={() => setOpenSize(null)}
          title={`Size: ${s.toUpperCase()}`}
          subtitle={`maxWidth: ${s === 'sm' ? '420px' : s === 'md' ? '560px' : s === 'lg' ? '720px' : '920px'}`}
          size={s}
          footerRight={
            <ButtonView variant="primary" size="md" onClick={() => setOpenSize(null)}>Close</ButtonView>
          }
        >
          <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-secondary)' }}>
            This modal uses <code>size=&quot;{s}&quot;</code>.
          </p>
        </ModalView>
      ))}
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function ModalViewExamples() {
  return (
    <div>
      <ExampleCard
        title="Delete Confirmation"
        description="Danger modal — sm size, error header tint, no cancel button"
        code={`<ModalView open={open} onClose={close} title="Delete Collection?" size="sm" headerColor="var(--color-error)"
  footerRight={<ButtonView variant="danger" size="md">Delete</ButtonView>}>
  <p>Confirmation message here.</p>
</ModalView>`}
      >
        <DeleteConfirmDemo />
      </ExampleCard>

      <ExampleCard
        title="New Collection Form"
        description="md modal with TextInputView fields and a disabled-until-valid submit"
        code={`<ModalView open={open} onClose={close} title="New Collection" size="md"
  footerRight={<ButtonView variant="primary" size="md" disabled={!name}>Create</ButtonView>}>
  <TextInputView label="Collection name" value={name} onChange={...} />
</ModalView>`}
      >
        <NewCollectionFormDemo />
      </ExampleCard>

      <ExampleCard
        title="Image / Media Preview"
        description="lg modal, noPadding, no footer — full-bleed content area"
        code={`<ModalView open={open} onClose={close} title="Response Preview" size="lg" noPadding>
  <div style={{ height: 280 }}>…media…</div>
</ModalView>`}
      >
        <ImagePreviewDemo />
      </ExampleCard>

      <ExampleCard
        title="Import from URL"
        description="With footerLeft hint text and footerRight action button"
        code={`<ModalView open={open} onClose={close} title="Import Collection"
  footerLeft={<span>Supports OpenAPI 3.x</span>}
  footerRight={<ButtonView variant="primary" size="md">Import</ButtonView>}>
  <TextInputView label="URL" ... />
</ModalView>`}
      >
        <ImportFromUrlDemo />
      </ExampleCard>

      <ExampleCard
        title="Nested Modals"
        description="Inner ModalView auto-stacks via _mountLayer counter — no manual z-index needed"
        code={`// Inner ModalView rendered inside outer ModalView body
<ModalView open={outer} onClose={closeOuter} title="Outer Modal">
  <ModalView open={inner} onClose={closeInner} title="Inner Modal" headerColor="var(--color-protocol-graphql)">
    Stacks automatically above outer.
  </ModalView>
</ModalView>`}
      >
        <NestedModalsDemo />
      </ExampleCard>

      <ExampleCard
        title="Size Variants"
        description="sm (420px) · md (560px) · lg (720px) · xl (920px)"
        code={`<ModalView size="sm" ...>...</ModalView>
<ModalView size="md" ...>...</ModalView>
<ModalView size="lg" ...>...</ModalView>
<ModalView size="xl" ...>...</ModalView>`}
      >
        <SizeVariantsDemo />
      </ExampleCard>
    </div>
  );
}
