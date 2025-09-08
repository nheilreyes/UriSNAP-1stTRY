import { useState } from 'react';
import { Button } from '../ui/button.js';
import { Input } from '../ui/input.js';
import { Label } from '../ui/label.js';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card.js';
import { Alert, AlertDescription } from '../ui/alert.js';
import { ThemeToggle } from '../theme/ThemeToggle.js';
import { Eye, EyeOff, Activity } from 'lucide-react';

export function LoginForm({ onLogin, onSwitchToSignup, error, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>
      
      {/* Header */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary p-4 rounded-full">
              <Activity className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Welcome to UriSNAP</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to access your urine analysis dashboard
          </p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
                  className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8">
        <div className="text-center">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <Button variant="link" className="p-0 h-auto" onClick={onSwitchToSignup}>
              Sign up here
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}