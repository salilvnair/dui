import type { DuiSize, DuiRadius } from './DuiTypes';
import { useDui, resolveBorderRadius } from './DuiContext';
import { DUI_FONT_SIZE, DUI_DEFAULT_RADIUS } from './DuiTokens';

export interface MediaBaseConfig {
  fontSize: string;
  borderRadius: string;
  /** Default aspect ratio (width / height) when none is explicitly given. */
  aspectRatio: number;
  color: string | undefined;
}

/** Local override props that any media/file surface component can accept. */
export interface MediaContainerProps {
  borderRadius?: DuiRadius | number;
  aspectRatio?: number;
  color?: string;
}

/**
 * Category base for: AspectRatioView, ImageGalleryView, ImageCropperView,
 * VideoPlayerView, AudioPlayerView, and any future image/video/audio/file
 * surface component. Falls back to DuiProvider values when no local prop is given.
 */
export function useMediaBase(
  sizeProp?: DuiSize,
  overrides: MediaContainerProps = {}
): MediaBaseConfig {
  const ctx = useDui();
  const s = sizeProp ?? ctx.size;
  const sizeRadius = DUI_DEFAULT_RADIUS[s];
  return {
    fontSize:     DUI_FONT_SIZE[s],
    borderRadius: resolveBorderRadius(overrides.borderRadius ?? ctx.borderRadius, sizeRadius),
    aspectRatio:  overrides.aspectRatio ?? 16 / 9,
    color:        overrides.color ?? ctx.color,
  };
}
