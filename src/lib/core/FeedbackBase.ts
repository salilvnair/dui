import type { DuiSize, DuiRadius, DuiWidth } from './DuiTypes';
import { useDui, resolveBorderRadius, resolveWidth } from './DuiContext';
import { DUI_THICKNESS, DUI_RING_DIAMETER, DUI_CHIP_HEIGHT, DUI_FONT_SIZE, DUI_GAP, DUI_PADDING_X, DUI_DEFAULT_RADIUS } from './DuiTokens';

export interface FeedbackBaseConfig {
  /** Progress bar height / ring stroke width (px) */
  thickness: number;
  /** Ring diameter (px) — ProgressRingView */
  ringDiameter: number;
  /** Notification badge diameter (px) */
  badgeSize: number;
  fontSize: string;
  gap: string;
  paddingX: string;
  borderRadius: string;
  width: string;
  color: string | undefined;
}

/** Local override props that any feedback/status component can accept. */
export interface FeedbackContainerProps {
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
}

/**
 * Category base for: SnackbarView, BannerView, ProgressBarView, ProgressRingView,
 * SkeletonView, NotificationBadgeView, and any future feedback/status component.
 * Falls back to DuiProvider values when no local prop is given.
 */
export function useFeedbackBase(
  sizeProp?: DuiSize,
  overrides: FeedbackContainerProps = {}
): FeedbackBaseConfig {
  const ctx = useDui();
  const s = sizeProp ?? ctx.size;
  const sizeRadius = DUI_DEFAULT_RADIUS[s];
  return {
    thickness:    DUI_THICKNESS[s],
    ringDiameter: DUI_RING_DIAMETER[s],
    badgeSize:    DUI_CHIP_HEIGHT[s],
    fontSize:     DUI_FONT_SIZE[s],
    gap:          DUI_GAP[s],
    paddingX:     DUI_PADDING_X[s],
    borderRadius: resolveBorderRadius(overrides.borderRadius ?? ctx.borderRadius, sizeRadius),
    width:        resolveWidth(overrides.width ?? ctx.width),
    color:        overrides.color ?? ctx.color,
  };
}
