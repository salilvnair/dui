import { useState, useRef, type CSSProperties } from 'react';
import { useMediaBase } from '../../core/MediaBase';
import { SliderView } from '../input/SliderView';
import './ImageCropperView.css';

export interface ImageCropperValue {
  /** Pan offset as a fraction of container size, e.g. -0.5..0.5 */
  x: number;
  y: number;
  zoom: number;
}

export interface ImageCropperViewProps {
  src: string;
  value: ImageCropperValue;
  onChange: (value: ImageCropperValue) => void;
  /** Crop frame aspect ratio, width/height. Default 1 (square). */
  aspectRatio?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
}

/** Drag-crop + zoom image editor — a fixed crop frame with a pannable/zoomable image behind it. */
export function ImageCropperView({
  src,
  value,
  onChange,
  aspectRatio = 1,
  height = 260,
  className = '',
  style,
}: ImageCropperViewProps) {
  const base = useMediaBase(undefined, { aspectRatio });
  const containerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startX: number; startY: number; origX: number; origY: number; dragging: boolean }>({ startX: 0, startY: 0, origX: 0, origY: 0, dragging: false });

  const onPointerDown = (e: React.PointerEvent) => {
    dragState.current = { startX: e.clientX, startY: e.clientY, origX: value.x, origY: value.y, dragging: true };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.dragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dx = (e.clientX - dragState.current.startX) / rect.width;
    const dy = (e.clientY - dragState.current.startY) / rect.height;
    onChange({ ...value, x: dragState.current.origX + dx, y: dragState.current.origY + dy });
  };
  const onPointerUp = () => { dragState.current.dragging = false; };

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 10, ...style }}>
      <div
        ref={containerRef}
        className="dui_imagecropper__frame"
        style={{ height, aspectRatio: base.aspectRatio, borderRadius: base.borderRadius }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <img
          src={src}
          alt=""
          draggable={false}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: `translate(-50%, -50%) translate(${value.x * 100}%, ${value.y * 100}%) scale(${value.zoom})`,
            maxWidth: 'none', height: '100%', userSelect: 'none',
          }}
        />
        <div className="dui_imagecropper__grid" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>Zoom</span>
        <SliderView value={value.zoom} onChange={z => onChange({ ...value, zoom: z })} min={1} max={3} step={0.05} width="100%" />
      </div>
    </div>
  );
}
