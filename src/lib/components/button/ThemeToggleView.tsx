import { SunIcon, MoonIcon } from '../../../icons';
import { IconButtonView, type IconButtonSize } from './IconButtonView';

export interface ThemeToggleViewProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
  size?: IconButtonSize;
  sunColor?: string;
  moonColor?: string;
  className?: string;
}

/** Sun/moon icon-swap button — no app-specific theme logic, just renders
 * the icon for the *current* theme and calls onToggle on click. */
export function ThemeToggleView({
  theme,
  onToggle,
  size = 'default',
  sunColor = '#F59E0B',
  moonColor = '#818CF8',
  className = '',
}: ThemeToggleViewProps) {
  return (
    <IconButtonView
      icon={theme === 'dark' ? <SunIcon size={16} style={{ color: sunColor }} /> : <MoonIcon size={15} style={{ color: moonColor }} />}
      onClick={onToggle}
      tooltip={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      size={size}
      className={className}
    />
  );
}
