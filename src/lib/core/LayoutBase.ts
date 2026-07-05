import type { DuiSize, DuiRadius, DuiWidth } from './DuiTypes';
import { useDui, resolveBorderRadius, resolveWidth } from './DuiContext';
import { DUI_FONT_SIZE, DUI_GAP, DUI_PADDING_X, DUI_DEFAULT_RADIUS } from './DuiTokens';

export interface LayoutBaseConfig {
  fontSize: string;
  gap: string;
  padding: string;
  borderRadius: string;
  width: string;
  color: string | undefined;
}

/** Local override props that any structural/layout component can accept. */
export interface LayoutContainerProps {
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
}

/**
 * Category base for: HeroView, LevelView, MediaObjectView, TileGridView,
 * PanelListView, NavbarView, StickyHeaderView, and any future structural
 * container component. Falls back to DuiProvider values when no local prop is given.
 */
export function useLayoutBase(
  sizeProp?: DuiSize,
  overrides: LayoutContainerProps = {}
): LayoutBaseConfig {
  const ctx = useDui();
  const s = sizeProp ?? ctx.size;
  const sizeRadius = DUI_DEFAULT_RADIUS[s];
  const padding = s === 'sm' ? '12px' : s === 'md' ? '16px' : s === 'lg' ? '24px' : '32px';
  return {
    fontSize:     DUI_FONT_SIZE[s],
    gap:          DUI_GAP[s],
    padding,
    borderRadius: resolveBorderRadius(overrides.borderRadius ?? ctx.borderRadius, sizeRadius),
    width:        resolveWidth(overrides.width ?? ctx.width),
    color:        overrides.color ?? ctx.color,
  };
}
