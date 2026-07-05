import type { DuiSize } from './DuiTypes';
import { useDui } from './DuiContext';
import { DUI_AVATAR_DIAMETER, DUI_DOT_SIZE, DUI_FONT_SIZE } from './DuiTokens';

export interface AvatarBaseConfig {
  /** Avatar circle diameter (px) */
  diameter: number;
  /** Presence/status dot diameter (px) */
  dotSize: number;
  fontSize: string;
  color: string | undefined;
  activeColor: string | undefined;
}

/** Local override props that any avatar/presence component can accept. */
export interface AvatarContainerProps {
  color?: string;
  activeColor?: string;
}

/**
 * Category base for: AvatarView, AvatarGroupView, PresenceDotView,
 * AvatarUploadView, and any future identity/presence component.
 * Falls back to DuiProvider values when no local prop is given.
 */
export function useAvatarBase(
  sizeProp?: DuiSize,
  overrides: AvatarContainerProps = {}
): AvatarBaseConfig {
  const ctx = useDui();
  const s = sizeProp ?? ctx.size;
  return {
    diameter:    DUI_AVATAR_DIAMETER[s],
    dotSize:     DUI_DOT_SIZE[s],
    fontSize:    DUI_FONT_SIZE[s],
    color:       overrides.color ?? ctx.color,
    activeColor: overrides.activeColor ?? ctx.activeColor,
  };
}
