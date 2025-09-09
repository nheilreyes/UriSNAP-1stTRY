import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { ThemeToggle } from '../theme/ThemeToggle';
import { 
  Eye, 
  EyeOff, 
  Activity, 
  Mail, 
  Lock, 
  Shield, 
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Users,
  Award,
  Zap
} from 'lucide-react';

export function LoginForm({ onLogin, onSwitchToSignup, error, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(null);

  // Email validation
  useEffect(() => {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailValid(emailRegex.test(email));
    } else {
      setEmailValid(null);
    }
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const isFormValid = emailValid && password.length >= 6;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl animate-pulse-glow" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-4 relative z-10">
        <div></div>
        <ThemeToggle />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-4 py-6 relative z-10">
        <div className="w-full max-w-sm mx-auto space-y-6">
          
          {/* Logo and Brand */}
          <div className="text-center space-y-4 animate-slide-up">
            <div className="bg-gradient-to-br from-primary to-primary/80 p-4 rounded-2xl shadow-lg inline-block relative">
              <Activity className="h-8 w-8 text-primary-foreground" />
              <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                Live
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-muted-foreground text-sm">
                Continue your health journey
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex justify-center space-x-4 text-xs">
              <div className="text-center">
                <Shield className="h-4 w-4 text-green-600 mx-auto mb-1" />
                <p className="text-muted-foreground">Secure</p>
              </div>
              <div className="text-center">
                <Users className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                <p className="text-muted-foreground">50K+ Users</p>
              </div>
              <div className="text-center">
                <Award className="h-4 w-4 text-purple-600 mx-auto mb-1" />
                <p className="text-muted-foreground">Medical Grade</p>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm animate-slide-up">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`h-12 text-base transition-all ${
                        emailValid === true ? 'border-green-500' :
                        emailValid === false ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {emailValid === true && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {emailValid === false && <AlertCircle className="h-4 w-4 text-red-500" />}
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 text-base pr-12"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {password && password.length < 6 && (
                    <p className="text-xs text-red-500">Password must be at least 6 characters</p>
                  )}
                </div>

                {/* Error Display */}
                {error && (
                  <Alert variant="destructive" className="animate-slide-up">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">{error}</AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className={`w-full h-12 text-base transition-all ${
                    isFormValid ? 'bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg' : ''
                  }`}
                  disabled={loading || !isFormValid}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Sign In</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>

                {/* Demo Button */}
                <Button 
                  type="button"
                  variant="outline"
                  className="w-full h-12 text-sm"
                  onClick={() => {
                    setEmail('demo@urisnap.com');
                    setPassword('demo123');
                  }}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Try Demo Account
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center space-y-4 animate-slide-up">
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" />
              <span>Your data is encrypted and secure</span>
            </div>
            
            <div className="space-y-3">
              <p className="text-muted-foreground text-sm">New to UriSNAP?</p>
              <Button 
                variant="outline" 
                onClick={onSwitchToSignup}
                className="w-full h-12 group"
              >
                Create Your Account
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex justify-center space-x-3">
              <Badge variant="secondary" className="text-xs">⭐ 4.9/5</Badge>
              <Badge variant="secondary" className="text-xs">🩺 Doctor Approved</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}