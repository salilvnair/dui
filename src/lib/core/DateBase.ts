import type { DuiSize, DuiRadius, DuiWidth } from './DuiTypes';
import { useDui, resolveBorderRadius, resolveWidth } from './DuiContext';
import { DUI_CELL_SIZE, DUI_RING_DIAMETER, DUI_FONT_SIZE, DUI_GAP, DUI_PADDING_X, DUI_DEFAULT_RADIUS } from './DuiTokens';

export interface DateBaseConfig {
  cellSize: number;
  ringDiameter: number;
  fontSize: string;
  gap: string;
  borderRadius: string;
  paddingX: string;
  width: string;
  color: string | undefined;
}

/** Local override props that any date/time component can accept. */
export interface DateContainerProps {
  width?: DuiWidth;
  borderRadius?: DuiRadius | number;
  color?: string;
}

/**
 * Category base for: CalendarView, DateInputView, DateRangePickerView,
 * CountdownRingView, and any future date/time component.
 * Falls back to DuiProvider values when no local prop is given.
 */
export function useDateBase(
  sizeProp?: DuiSize,
  overrides: DateContainerProps = {}
): DateBaseConfig {
  const ctx = useDui();
  const s = sizeProp ?? ctx.size;
  const sizeRadius = DUI_DEFAULT_RADIUS[s];
  return {
    cellSize:     DUI_CELL_SIZE[s],
    ringDiameter: DUI_RING_DIAMETER[s],
    fontSize:     DUI_FONT_SIZE[s],
    gap:          DUI_GAP[s],
    borderRadius: resolveBorderRadius(overrides.borderRadius ?? ctx.borderRadius, sizeRadius),
    paddingX:     DUI_PADDING_X[s],
    width:        resolveWidth(overrides.width ?? ctx.width),
    color:        overrides.color ?? ctx.color,
  };
}
