import { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen.js';
import { LoginForm } from './components/auth/LoginForm.js';
import { SignupForm } from './components/auth/SignupForm.js';
import { Dashboard } from './components/dashboard/Dashboard.js';
import { CameraCapture } from './components/camera/CameraCapture.js';
import { AnalysisResults } from './components/analysis/AnalysisResults.js';
import { ThemeProvider } from './components/theme/ThemeProvider.js';
import { toast, Toaster } from 'sonner';

export default function App() {
  const [currentState, setCurrentState] = useState('loading');
  const [user, setUser] = useState(null);
  const [capturedImage, setCapturedImage] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // App initialization
  useEffect(() => {
    const initializeApp = async () => {
      // Simulate app initialization (checking for saved user session, etc.)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check for saved user session (in a real app, this would check localStorage/sessionStorage)
      // For now, just transition to login
      setCurrentState('login');
    };

    initializeApp();
  }, []);

  // Mock authentication functions
  const handleLogin = async (email, password) => {
    setAuthLoading(true);
    setAuthError('');
    
    // Simulate API call
    setTimeout(() => {
      if (email && password.length >= 6) {
        const userData = {
          name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          email: email
        };
        setUser(userData);
        setCurrentState('dashboard');
        toast('Successfully signed in!');
      } else {
        setAuthError('Invalid email or password. Password must be at least 6 characters.');
      }
      setAuthLoading(false);
    }, 1000);
  };

  const handleSignup = async (email, password, name) => {
    setAuthLoading(true);
    setAuthError('');
    
    // Simulate API call
    setTimeout(() => {
      if (email && password.length >= 6 && name.length >= 2) {
        const userData = { name, email };
        setUser(userData);
        setCurrentState('dashboard');
        toast('Account created successfully!');
      } else {
        setAuthError('Please check all fields. Password must be at least 6 characters.');
      }
      setAuthLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentState('login');
    setCapturedImage('');
    toast('Signed out successfully');
  };

  const handleStartAnalysis = () => {
    setCurrentState('camera');
  };

  const handleCameraCapture = (imageData) => {
    setCapturedImage(imageData);
    setCurrentState('results');
    toast('Sample captured! Analyzing...');
  };

  const handleCameraCancel = () => {
    setCurrentState('dashboard');
  };

  const handleNewAnalysis = () => {
    setCapturedImage('');
    setCurrentState('camera');
  };

  const handleBackToDashboard = () => {
    setCapturedImage('');
    setCurrentState('dashboard');
  };

  const renderCurrentView = () => {
    switch (currentState) {
      case 'loading':
        return <LoadingScreen />;

      case 'login':
        return (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentState('signup')}
            error={authError}
            loading={authLoading}
          />
        );

      case 'signup':
        return (
          <SignupForm
            onSignup={handleSignup}
            onSwitchToLogin={() => setCurrentState('login')}
            error={authError}
            loading={authLoading}
          />
        );

      case 'dashboard':
        return user ? (
          <Dashboard
            user={user}
            onStartAnalysis={handleStartAnalysis}
            onLogout={handleLogout}
          />
        ) : null;

      case 'camera':
        return (
          <CameraCapture
            onCapture={handleCameraCapture}
            onCancel={handleCameraCancel}
          />
        );

      case 'results':
        return capturedImage ? (
          <AnalysisResults
            imageData={capturedImage}
            onNewAnalysis={handleNewAnalysis}
            onBackToDashboard={handleBackToDashboard}
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
      <Toaster position="top-center" />
    </ThemeProvider>
  );
}