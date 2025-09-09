import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'urisnap-theme' }) {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    
    console.log('ThemeProvider: Applying theme', theme);
    
    // Remove previous theme classes from both html and body
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');
    
    let effectiveTheme = theme;
    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      console.log('ThemeProvider: System theme detected as', effectiveTheme);
    }
    
    // Apply theme to html element for Tailwind V4
    if (effectiveTheme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
    } else {
      root.classList.add('light');  
      body.classList.add('light');
    }
    
    // Set color-scheme for better browser behavior
    root.style.colorScheme = effectiveTheme;
    
    // Also set data attribute for more reliable targeting
    root.setAttribute('data-theme', effectiveTheme);
    
    console.log('ThemeProvider: Applied theme classes:', root.className);
    console.log('ThemeProvider: Body classes:', body.className);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleSystemThemeChange = () => {
        console.log('ThemeProvider: System theme changed');
        // Trigger re-render by updating the theme
        setTheme('system');
      };
      
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme) => {
      console.log('ThemeProvider: Setting theme to', newTheme);
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};