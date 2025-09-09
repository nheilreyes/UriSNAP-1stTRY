import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Progress } from '../ui/progress';
import { ThemeToggle } from '../theme/ThemeToggle';
import { 
  Eye, 
  EyeOff, 
  Activity, 
  Mail, 
  Lock, 
  User,
  Shield, 
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Heart,
  Star,
  Check,
  X
} from 'lucide-react';

export function SignupForm({ onSignup, onSwitchToLogin, error, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: [], color: 'text-gray-400' });
  const [passwordsMatch, setPasswordsMatch] = useState(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Email validation
  useEffect(() => {
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailValid(emailRegex.test(formData.email));
    } else {
      setEmailValid(null);
    }
  }, [formData.email]);

  // Password strength calculation
  useEffect(() => {
    const password = formData.password;
    if (!password) {
      setPasswordStrength({ score: 0, feedback: [], color: 'text-gray-400' });
      return;
    }

    let score = 0;
    const feedback = [];

    if (password.length >= 8) score += 25;
    else feedback.push('8+ characters');

    if (/[A-Z]/.test(password)) score += 25;
    else feedback.push('Uppercase letter');

    if (/\d/.test(password)) score += 25;
    else feedback.push('Number');

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 25;
    else feedback.push('Special character');

    let color = 'text-red-500';
    if (score >= 75) color = 'text-green-500';
    else if (score >= 50) color = 'text-yellow-500';
    else if (score >= 25) color = 'text-orange-500';

    setPasswordStrength({ score, feedback, color });
  }, [formData.password]);

  // Password confirmation
  useEffect(() => {
    if (formData.confirmPassword) {
      setPasswordsMatch(formData.password === formData.confirmPassword);
    } else {
      setPasswordsMatch(null);
    }
  }, [formData.password, formData.confirmPassword]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup(formData.email, formData.password, formData.name);
  };

  const isFormValid = emailValid && 
                     passwordStrength.score >= 75 && 
                     passwordsMatch && 
                     formData.name.length >= 2 && 
                     agreedToTerms;

  const getPasswordStrengthLabel = (score) => {
    if (score >= 75) return 'Strong';
    if (score >= 50) return 'Good';
    if (score >= 25) return 'Fair';
    return 'Weak';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-green-500/5">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/5 rounded-full blur-2xl animate-pulse-glow" />
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
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl shadow-lg inline-block relative">
              <Activity className="h-8 w-8 text-white" />
              <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full animate-bounce">
                New
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold">Join UriSNAP</h1>
              <p className="text-muted-foreground text-sm">
                Start your health journey today
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-muted/30 rounded-lg">
                <Heart className="h-4 w-4 text-red-500 mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Track Health</p>
              </div>
              <div className="text-center p-2 bg-muted/30 rounded-lg">
                <Shield className="h-4 w-4 text-green-500 mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">HIPAA Secure</p>
              </div>
              <div className="text-center p-2 bg-muted/30 rounded-lg">
                <Star className="h-4 w-4 text-yellow-500 mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">AI Insights</p>
              </div>
              <div className="text-center p-2 bg-muted/30 rounded-lg">
                <Activity className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">50K+ Users</p>
              </div>
            </div>
          </div>

          {/* Signup Card */}
          <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm animate-slide-up">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="h-12 text-base"
                    required
                  />
                  {formData.name.length > 0 && formData.name.length < 2 && (
                    <p className="text-xs text-red-500">Name must be at least 2 characters</p>
                  )}
                </div>

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
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
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
                      placeholder="Create strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
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
                  
                  {/* Password Strength */}
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Progress value={passwordStrength.score} className="flex-1 h-1.5" />
                        <span className={`text-xs ${passwordStrength.color}`}>
                          {getPasswordStrengthLabel(passwordStrength.score)}
                        </span>
                      </div>
                      
                      {passwordStrength.feedback.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          Need: {passwordStrength.feedback.join(', ')}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`h-12 text-base pr-12 ${
                        passwordsMatch === true ? 'border-green-500' :
                        passwordsMatch === false ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {passwordsMatch === false && (
                    <p className="text-xs text-red-500">Passwords do not match</p>
                  )}
                  {passwordsMatch === true && (
                    <p className="text-xs text-green-600">Passwords match ✓</p>
                  )}
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked)}
                    className="mt-0.5"
                  />
                  <div>
                    <Label htmlFor="terms" className="text-xs cursor-pointer">
                      I agree to Terms & Privacy Policy
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      HIPAA compliant & secure
                    </p>
                  </div>
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
                    isFormValid ? 'bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg' : ''
                  }`}
                  disabled={loading || !isFormValid}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Create Account</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>

                {/* Form Progress */}
                {!isFormValid && (
                  <div className="text-xs text-center space-y-2">
                    <p className="text-muted-foreground">Complete to continue:</p>
                    <div className="flex justify-center space-x-3">
                      <div className={`flex items-center space-x-1 ${formData.name.length >= 2 ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {formData.name.length >= 2 ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        <span>Name</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${emailValid ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {emailValid ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        <span>Email</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${passwordStrength.score >= 75 ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {passwordStrength.score >= 75 ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        <span>Password</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${agreedToTerms ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {agreedToTerms ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        <span>Terms</span>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center space-y-4 animate-slide-up">
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" />
              <span>256-bit SSL • HIPAA compliant</span>
            </div>
            
            <div className="space-y-3">
              <p className="text-muted-foreground text-sm">Already have an account?</p>
              <Button 
                variant="outline" 
                onClick={onSwitchToLogin}
                className="w-full h-12"
              >
                <ArrowRight className="h-4 w-4 mr-2 transform rotate-180" />
                Sign In Instead
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex justify-center space-x-3">
              <Badge variant="secondary" className="text-xs">🚀 Fast Setup</Badge>
              <Badge variant="secondary" className="text-xs">📱 Mobile Ready</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}