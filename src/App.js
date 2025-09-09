import { Suspense, lazy } from 'react';
import { useAppState } from './hooks/useAppState';
import { EnhancedLoadingScreen } from './components/enhanced/EnhancedLoadingScreen';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { EnhancedDashboard } from './components/enhanced/EnhancedDashboard';
import { CameraCapture } from './components/camera/CameraCapture';
import { AnalysisResults } from './components/analysis/AnalysisResults';
import { UserProfile } from './components/profile/UserProfile';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { toast, Toaster } from 'sonner';

// Lazy load components for better performance
const LazyAnalysisResults = lazy(() => import('./components/analysis/AnalysisResults').then(module => ({ default: module.AnalysisResults })));
const LazyCameraCapture = lazy(() => import('./components/camera/CameraCapture').then(module => ({ default: module.CameraCapture })));

export default function App() {
  const { state, actions } = useAppState();

  // Enhanced handlers with better UX
  const handleLogin = async (email, password) => {
    try {
      await actions.login(email, password);
    } catch (error) {
      // Error is already handled in the action
    }
  };

  const handleSignup = async (email, password, name) => {
    try {
      await actions.signup(email, password, name);
    } catch (error) {
      // Error is already handled in the action
    }
  };

  const handleCameraCapture = (imageData) => {
    actions.captureImage(imageData);
    
    // Simulate analysis completion and add to history
    setTimeout(() => {
      const mockResults = {
        overallScore: 85 + Math.floor(Math.random() * 15),
        status: Math.random() > 0.8 ? 'elevated' : 'normal',
        parameters: {
          glucose: { value: 'Negative', status: 'normal' },
          protein: { value: 'Trace', status: 'normal' },
          ketones: { value: 'Negative', status: 'normal' },
          blood: { value: 'Negative', status: 'normal' },
          pH: { value: '6.5', status: 'normal' },
          specificGravity: { value: '1.020', status: 'normal' },
        }
      };
      actions.addAnalysis(mockResults);
    }, 3000);
  };

  const handleNewAnalysis = () => {
    actions.clearCapturedImage();
    actions.setState('camera');
  };

  const handleBackToDashboard = () => {
    actions.clearCapturedImage();
    actions.setState('dashboard');
  };

  const handleExportData = () => {
    // Mock data export
    const dataToExport = {
      user: state.user,
      analyses: state.analysisHistory,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `urisnap-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Health data exported successfully!');
  };

  const renderCurrentView = () => {
    switch (state.currentState) {
      case 'loading':
        return <EnhancedLoadingScreen />;

      case 'onboarding':
        return <OnboardingFlow onComplete={actions.completeOnboarding} />;

      case 'login':
        return (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToSignup={() => actions.setState('signup')}
            error={state.authError}
            loading={state.authLoading}
          />
        );

      case 'signup':
        return (
          <SignupForm
            onSignup={handleSignup}
            onSwitchToLogin={() => actions.setState('login')}
            error={state.authError}
            loading={state.authLoading}
          />
        );

      case 'dashboard':
        return state.user ? (
          <EnhancedDashboard
            user={state.user}
            analysisHistory={state.analysisHistory}
            onStartAnalysis={() => actions.setState('camera')}
            onLogout={actions.logout}
            onViewProfile={() => actions.setState('profile')}
          />
        ) : null;

      case 'camera':
        return (
          <Suspense fallback={<EnhancedLoadingScreen />}>
            <CameraCapture
              onCapture={handleCameraCapture}
              onCancel={() => actions.setState('dashboard')}
            />
          </Suspense>
        );

      case 'results':
        return state.capturedImage ? (
          <Suspense fallback={<EnhancedLoadingScreen />}>
            <AnalysisResults
              imageData={state.capturedImage}
              onNewAnalysis={handleNewAnalysis}
              onBackToDashboard={handleBackToDashboard}
            />
          </Suspense>
        ) : null;

      case 'profile':
        return state.user ? (
          <UserProfile
            user={state.user}
            settings={state.settings}
            onBack={() => actions.setState('dashboard')}
            onUpdateSettings={actions.updateSettings}
            onExportData={handleExportData}
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="urisnap-theme">
      <div className="min-h-screen bg-background transition-colors duration-300">
        {renderCurrentView()}
      </div>
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
        closeButton
        richColors
      />
    </ThemeProvider>
  );
}