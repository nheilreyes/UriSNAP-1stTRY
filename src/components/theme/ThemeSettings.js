import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card.js';
import { Button } from '../ui/button.js';
import { Badge } from '../ui/badge.js';
import { useTheme } from './ThemeProvider.js';
import { Sun, Moon, Monitor, Check } from 'lucide-react';

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      name: 'light',
      label: 'Light',
      icon: Sun,
      description: 'Clean and bright interface'
    },
    {
      name: 'dark',
      label: 'Dark',
      icon: Moon,
      description: 'Easy on the eyes in low light'
    },
    {
      name: 'system',
      label: 'System',
      icon: Monitor,
      description: 'Follows your device preference'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sun className="h-5 w-5 mr-2" />
          Theme Preference
        </CardTitle>
        <CardDescription>
          Choose how UriSNAP appears to you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            const isSelected = theme === themeOption.name;
            
            return (
              <Button
                key={themeOption.name}
                variant={isSelected ? "default" : "outline"}
                onClick={() => setTheme(themeOption.name)}
                className={`h-auto p-4 justify-start transition-all duration-200 ${
                  isSelected ? 'ring-2 ring-primary/20' : 'hover:bg-accent/50'
                }`}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className={`p-2 rounded-lg ${
                    isSelected 
                      ? 'bg-primary-foreground/10' 
                      : 'bg-muted'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{themeOption.label}</span>
                      {isSelected && (
                        <Badge variant="secondary" className="px-2 py-0.5">
                          <Check className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {themeOption.description}
                    </p>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Tip:</strong> Your theme preference is automatically saved and will be remembered for future visits.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}