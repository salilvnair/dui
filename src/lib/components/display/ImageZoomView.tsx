import { useState, useEffect, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '../../../icons';
import './ImageGalleryView.css';

export interface ImageZoomViewProps {
  src: string;
  alt?: string;
  thumbnailStyle?: CSSProperties;
  className?: string;
  style?: CSSProperties;
}

/** Click-to-zoom lightbox for a single image. */
export function ImageZoomView({
  src,
  alt,
  thumbnailStyle,
  className = '',
  style,
}: ImageZoomViewProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <>
      <img
        src={src}
        alt={alt ?? ''}
        onClick={() => setOpen(true)}
        className={className}
        style={{ cursor: 'zoom-in', ...thumbnailStyle, ...style }}
      />
      {open && createPortal(
        <div className="dui_imagegallery__lightbox" onClick={() => setOpen(false)}>
          <button type="button" className="dui_imagegallery__close" onClick={() => setOpen(false)} aria-label="Close"><CloseIcon size={20} /></button>
          <img src={src} alt={alt ?? ''} className="dui_imagegallery__image" style={{ cursor: 'zoom-out' }} />
        </div>,
        document.body
      )}
    </>
  );
}
