import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

export function LoadingScreen() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        {/* Logo Container */}
        <div className="relative">
          {/* Animated Background Circle */}
          <div className="absolute inset-0 animate-pulse-glow">
            <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto"></div>
          </div>
          
          {/* Main Logo */}
          <div className="relative z-10 bg-primary p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center shadow-lg">
            <Activity className="h-12 w-12 text-primary-foreground animate-pulse" />
          </div>
          
          {/* Rotating Ring */}
          <div className="absolute inset-0 animate-spin">
            <div className="w-24 h-24 border-2 border-primary/20 border-t-primary rounded-full mx-auto"></div>
          </div>
        </div>

        {/* App Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            UriSNAP
          </h1>
          <p className="text-muted-foreground">
            Intelligent Urine Analysis Platform
          </p>
        </div>

        {/* Loading Animation */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-1">
            <div className="text-sm text-muted-foreground">
              Loading{dots}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-48 mx-auto">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-xs text-muted-foreground/60">
          Version 1.0.0
        </div>
      </div>
    </div>
  );
}