import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Activity, 
  Camera, 
  Shield, 
  TrendingUp, 
  Users, 
  Zap,
  ChevronRight,
  Star,
  Heart,
  Brain
} from 'lucide-react';

export function OnboardingFlow({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to UriSNAP",
      subtitle: "Your Personal Health Companion",
      content: (
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-8 rounded-3xl">
              <Activity className="h-16 w-16 text-primary mx-auto animate-pulse-glow" />
            </div>
            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Beta
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Revolutionary Urinalysis</h2>
            <p className="text-muted-foreground text-lg">
              Monitor your health with instant, accurate urine analysis using advanced AI technology
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center">
              <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Instant Results</p>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Medical Grade</p>
            </div>
            <div className="text-center">
              <Brain className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-sm font-medium">AI Powered</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "How It Works",
      subtitle: "Simple 3-Step Process",
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl">
              <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">Capture Sample</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Use your phone's camera to take a photo of your urine sample in good lighting
                </p>
              </div>
              <Camera className="h-6 w-6 text-blue-500 flex-shrink-0" />
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-xl">
              <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-green-900 dark:text-green-100">AI Analysis</h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Our advanced AI analyzes color, clarity, and other visual indicators instantly
                </p>
              </div>
              <Brain className="h-6 w-6 text-green-500 flex-shrink-0" />
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-xl">
              <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-purple-900 dark:text-purple-100">Get Results</h3>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Receive detailed health insights, trends, and personalized recommendations
                </p>
              </div>
              <TrendingUp className="h-6 w-6 text-purple-500 flex-shrink-0" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Track Your Health",
      subtitle: "Comprehensive Health Monitoring",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-2 border-dashed border-primary/20">
              <CardContent className="p-4 text-center">
                <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Health Score</h4>
                <p className="text-xs text-muted-foreground">Track overall wellness</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-dashed border-primary/20">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Trends</h4>
                <p className="text-xs text-muted-foreground">Monitor changes</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-6 rounded-xl">
            <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
              What We Monitor
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Glucose levels</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Protein content</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Ketones</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Blood traces</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>pH balance</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span>Specific gravity</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Privacy & Security",
      subtitle: "Your Data is Protected",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Shield className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Medical-Grade Security</h3>
            <p className="text-muted-foreground">
              Your health data is encrypted and stored securely with HIPAA-compliant protocols
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm">End-to-end encryption</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm">No data sharing without consent</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm">Local data processing</span>
            </div>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Medical Disclaimer:</strong> UriSNAP is for informational purposes only. 
              Always consult with healthcare professionals for medical advice.
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress Header */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="text-xs">
            Step {currentStep + 1} of {steps.length}
          </Badge>
          <Button variant="ghost" size="sm" onClick={onComplete}>
            Skip
          </Button>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">{currentStepData.title}</h1>
            <p className="text-muted-foreground">{currentStepData.subtitle}</p>
          </div>
          
          <div className="mb-8">
            {currentStepData.content}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="px-6 py-6 border-t bg-muted/30">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="min-w-[100px]"
          >
            Previous
          </Button>
          
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
          
          <Button 
            onClick={handleNext}
            className="min-w-[100px]"
          >
            {currentStep === steps.length - 1 ? (
              'Get Started'
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}