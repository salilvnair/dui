import { useRef, useEffect, useState, type CSSProperties } from 'react';
import { useMediaBase } from '../../core/MediaBase';

export interface SignaturePadViewProps {
  onChange?: (dataUrl: string | null) => void;
  strokeColor?: string;
  height?: number;
  className?: string;
  style?: CSSProperties;
}

/** Canvas signature capture — draw with mouse/touch/pen, exports a PNG data URL. */
export function SignaturePadView({
  onChange,
  strokeColor,
  height = 160,
  className = '',
  style,
}: SignaturePadViewProps) {
  const base = useMediaBase();
  const color = strokeColor ?? 'var(--color-text-primary)';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) { ctx.scale(dpr, dpr); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 2; ctx.strokeStyle = getComputedStyle(canvas).color; }
  }, []);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    const ctx = canvasRef.current?.getContext('2d');
    const { x, y } = getPos(e);
    ctx?.beginPath();
    ctx?.moveTo(x, y);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext('2d');
    const { x, y } = getPos(e);
    ctx?.lineTo(x, y);
    ctx?.stroke();
    setEmpty(false);
  };
  const onPointerUp = () => {
    drawing.current = false;
    if (canvasRef.current) onChange?.(empty ? null : canvasRef.current.toDataURL('image/png'));
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setEmpty(true);
    onChange?.(null);
  };

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{ width: '100%', height, borderRadius: base.borderRadius, border: '1.5px dashed var(--color-surface-border)', background: 'var(--color-surface)', color, touchAction: 'none', cursor: 'crosshair' }}
      />
      <button type="button" onClick={clear} style={{ alignSelf: 'flex-start', border: 'none', background: 'transparent', color: 'var(--color-text-muted)', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
        Clear
      </button>
    </div>
  );
}
