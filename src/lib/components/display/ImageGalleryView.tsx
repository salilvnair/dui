import { useState, useEffect, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import type { DuiSize } from '../../core/DuiTypes';
import { useMediaBase } from '../../core/MediaBase';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from '../../../icons';
import './ImageGalleryView.css';

export interface GalleryImage {
  src: string;
  alt?: string;
}

export interface ImageGalleryViewProps {
  images: GalleryImage[];
  columns?: number;
  size?: DuiSize;
  className?: string;
  style?: CSSProperties;
}

/** Grid gallery with a click-to-open lightbox — prev/next navigation, Escape to close. */
export function ImageGalleryView({
  images,
  columns = 3,
  size,
  className = '',
  style,
}: ImageGalleryViewProps) {
  const base = useMediaBase(size);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    if (openIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIdx(null);
      if (e.key === 'ArrowRight') setOpenIdx(i => (i === null ? null : (i + 1) % images.length));
      if (e.key === 'ArrowLeft') setOpenIdx(i => (i === null ? null : (i - 1 + images.length) % images.length));
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [openIdx, images.length]);

  return (
    <div className={className} style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 8, ...style }}>
      {images.map((img, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setOpenIdx(i)}
          style={{
            border: '1px solid var(--color-surface-border)', padding: 0, cursor: 'pointer', aspectRatio: 1,
            borderRadius: base.borderRadius, overflow: 'hidden',
            background: `var(--color-surface) center/cover no-repeat url(${img.src})`,
          }}
          aria-label={img.alt ?? `Image ${i + 1}`}
        />
      ))}

      {openIdx !== null && createPortal(
        <div className="dui_imagegallery__lightbox" onClick={() => setOpenIdx(null)}>
          <button type="button" className="dui_imagegallery__close" onClick={() => setOpenIdx(null)} aria-label="Close"><CloseIcon size={20} /></button>
          {images.length > 1 && (
            <button type="button" className="dui_imagegallery__nav dui_imagegallery__nav--left" onClick={e => { e.stopPropagation(); setOpenIdx(i => (i === null ? null : (i - 1 + images.length) % images.length)); }} aria-label="Previous">
              <ChevronLeftIcon size={24} />
            </button>
          )}
          <img src={images[openIdx].src} alt={images[openIdx].alt ?? ''} className="dui_imagegallery__image" onClick={e => e.stopPropagation()} />
          {images.length > 1 && (
            <button type="button" className="dui_imagegallery__nav dui_imagegallery__nav--right" onClick={e => { e.stopPropagation(); setOpenIdx(i => (i === null ? null : (i + 1) % images.length)); }} aria-label="Next">
              <ChevronRightIcon size={24} />
            </button>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}
