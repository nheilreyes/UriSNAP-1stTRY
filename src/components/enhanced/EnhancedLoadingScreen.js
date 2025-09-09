import { useEffect, useState } from 'react';
import { Activity, Heart, Zap } from 'lucide-react';
import { Progress } from '../ui/progress';

export function EnhancedLoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    { label: 'Initializing UriSNAP', icon: Activity },
    { label: 'Loading AI Models', icon: Zap },
    { label: 'Checking Health Systems', icon: Heart },
    { label: 'Ready to Analyze', icon: Activity },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + Math.random() * 15;
        
        // Update step based on progress
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
        setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1));
        
        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(newProgress, 95);
      });
    }, 200);

    return () => clearInterval(timer);
  }, [loadingSteps.length]);

  const CurrentIcon = loadingSteps[currentStep]?.icon || Activity;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-8 max-w-sm">
        {/* Animated Logo */}
        <div className="relative">
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-8 rounded-3xl animate-pulse-glow">
            <CurrentIcon className="h-16 w-16 text-primary mx-auto transition-all duration-500" />
          </div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 -z-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary/20 rounded-full animate-bounce"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s',
                }}
              />
            ))}
          </div>
        </div>

        {/* Brand */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            UriSNAP
          </h1>
          <p className="text-muted-foreground mt-2">Medical-Grade Urinalysis</p>
        </div>

        {/* Progress */}
        <div className="space-y-4 w-full">
          <Progress value={progress} className="h-2" />
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-primary">
              {loadingSteps[currentStep]?.label}
            </p>
            <p className="text-xs text-muted-foreground">
              {Math.round(progress)}% Complete
            </p>
          </div>
        </div>

        {/* Loading steps indicator */}
        <div className="flex justify-center space-x-2">
          {loadingSteps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div
                key={index}
                className={`p-2 rounded-full transition-all duration-300 ${
                  index <= currentStep 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <StepIcon className="h-4 w-4" />
              </div>
            );
          })}
        </div>

        {/* Tips */}
        <div className="bg-muted/50 p-4 rounded-xl">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Tip:</strong> For best results, ensure good lighting when capturing samples
          </p>
        </div>
      </div>
    </div>
  );
}