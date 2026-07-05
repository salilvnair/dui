import { useRef, useState, useEffect, type CSSProperties } from 'react';
import { useMediaBase } from '../../core/MediaBase';
import { PlayIcon, PauseIcon, VolumeIcon, VolumeMuteIcon } from '../../../icons';
import './VideoPlayerView.css';

export interface VideoPlayerViewProps {
  src: string;
  poster?: string;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

function formatTime(t: number): string {
  if (!isFinite(t)) return '0:00';
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

/** Custom video controls wrapper — play/pause, seek, volume. */
export function VideoPlayerView({
  src,
  poster,
  color,
  className = '',
  style,
}: VideoPlayerViewProps) {
  const base = useMediaBase(undefined, { aspectRatio: 16 / 9 });
  const accent = color ?? 'var(--color-primary)';
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setTime(v.currentTime);
    const onMeta = () => setDuration(v.duration);
    const onEnd = () => setPlaying(false);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('loadedmetadata', onMeta);
    v.addEventListener('ended', onEnd);
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('loadedmetadata', onMeta);
      v.removeEventListener('ended', onEnd);
    };
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.pause(); else v.play();
    setPlaying(!playing);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Number(e.target.value);
    setTime(v.currentTime);
  };

  return (
    <div className={`dui_videoplayer ${className}`} style={{ position: 'relative', aspectRatio: base.aspectRatio, borderRadius: base.borderRadius, overflow: 'hidden', background: '#000', ...style }}>
      <video ref={videoRef} src={src} poster={poster} muted={muted} onClick={toggle} style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }} />
      <div className="dui_videoplayer__controls">
        <button type="button" onClick={toggle} className="dui_videoplayer__btn" aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
        </button>
        <span style={{ fontSize: 11, color: '#fff', minWidth: 36 }}>{formatTime(time)}</span>
        <input
          type="range" min={0} max={duration || 0} step={0.1} value={time} onChange={seek}
          className="dui_videoplayer__seek" style={{ '--dui-video-accent': accent } as CSSProperties}
        />
        <span style={{ fontSize: 11, color: '#fff', minWidth: 36 }}>{formatTime(duration)}</span>
        <button type="button" onClick={() => setMuted(m => !m)} className="dui_videoplayer__btn" aria-label={muted ? 'Unmute' : 'Mute'}>
          {muted ? <VolumeMuteIcon size={15} /> : <VolumeIcon size={15} />}
        </button>
      </div>
    </div>
  );
}
