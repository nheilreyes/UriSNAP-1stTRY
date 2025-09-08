import { Button } from '../ui/button.js';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider.js';

export function ThemeToggle({ variant = 'ghost', size = 'sm', showLabel = false }) {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5" />;
      case 'dark':
        return <Moon className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
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
      className="relative overflow-hidden transition-all duration-300 hover:scale-105"
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