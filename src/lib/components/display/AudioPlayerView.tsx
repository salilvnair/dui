import { useRef, useState, useEffect, type CSSProperties } from 'react';
import { PlayIcon, PauseIcon } from '../../../icons';
import { AudioWaveformView } from './AudioWaveformView';

export interface AudioPlayerViewProps {
  src: string;
  samples?: number[];
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

/** Waveform + play/pause/seek audio player. */
export function AudioPlayerView({
  src,
  samples,
  color,
  className = '',
  style,
}: AudioPlayerViewProps) {
  const accent = color ?? 'var(--color-primary)';
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setTime(a.currentTime);
    const onMeta = () => setDuration(a.duration);
    const onEnd = () => setPlaying(false);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('ended', onEnd);
    return () => {
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onMeta);
      a.removeEventListener('ended', onEnd);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.pause(); else a.play();
    setPlaying(!playing);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    a.currentTime = ratio * duration;
  };

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 8, border: '1px solid var(--color-surface-border)', borderRadius: 10, ...style }}>
      <audio ref={audioRef} src={src} />
      <button type="button" onClick={toggle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '999px', border: 'none', background: accent, color: '#fff', cursor: 'pointer', flexShrink: 0 }} aria-label={playing ? 'Pause' : 'Play'}>
        {playing ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
      </button>
      <div style={{ flex: 1, cursor: 'pointer' }} onClick={handleSeek}>
        <AudioWaveformView samples={samples} progress={duration ? time / duration : 0} color={accent} height={32} />
      </div>
      <span style={{ fontSize: 11, color: 'var(--color-text-muted)', flexShrink: 0, minWidth: 70, textAlign: 'right' }}>{formatTime(time)} / {formatTime(duration)}</span>
    </div>
  );
}
