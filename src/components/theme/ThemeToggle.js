import { Button } from '../ui/button';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle({ variant = 'ghost', size = 'sm', showLabel = false, className = '' }) {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    console.log('ThemeToggle: Current theme:', theme);
    if (theme === 'light') {
      console.log('ThemeToggle: Switching to dark');
      setTheme('dark');
    } else if (theme === 'dark') {
      console.log('ThemeToggle: Switching to system');
      setTheme('system');
    } else {
      console.log('ThemeToggle: Switching to light');
      setTheme('light');
    }
  };

  const getIcon = () => {
    const iconClass = size === 'sm' ? 'h-4 w-4 sm:h-5 sm:w-5' : 'h-5 w-5';
    switch (theme) {
      case 'light':
        return <Sun className={iconClass} />;
      case 'dark':
        return <Moon className={iconClass} />;
      default:
        return <Monitor className={iconClass} />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      default:
        return 'System';
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={cycleTheme}
      className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${className}`}
    >
      <div className="relative flex items-center space-x-2">
        <div className="transition-transform duration-300 hover:rotate-12">
          {getIcon()}
        </div>
        {showLabel && (
          <span className="text-sm font-medium">
            {getLabel()}
          </span>
        )}
      </div>
    </Button>
  );
}

export function ThemeToggleCompact() {
  return <ThemeToggle variant="ghost" size="sm" />;
}

export function ThemeToggleWithLabel() {
  return <ThemeToggle variant="outline" size="sm" showLabel={true} />;
}