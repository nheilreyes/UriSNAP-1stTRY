import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Skeleton } from '../ui/skeleton';
import { ThemeToggle } from '../theme/ThemeToggle';
import { 
  Activity, 
  Camera, 
  History, 
  Settings, 
  LogOut, 
  TrendingUp,
  Calendar,
  FileText,
  Bell,
  Award,
  Target,
  Zap,
  Heart,
  BarChart3,
  Plus,
  ChevronRight,
  Star,
  Trophy
} from 'lucide-react';

export function EnhancedDashboard({ 
  user, 
  analysisHistory, 
  onStartAnalysis, 
  onLogout, 
  onViewProfile 
}) {
  const [isLoading, setIsLoading] = useState(false);

  // Calculate streak and insights
  const currentStreak = calculateHealthStreak(analysisHistory);
  const weeklyTrend = calculateWeeklyTrend(analysisHistory);
  const nextGoal = getNextGoal(user);

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-400';
      case 'elevated':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-400';
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-950/20 dark:text-gray-400';
    }
  };

  const getHealthScoreColor = (score) => {
    if (score >= 90) return 'from-green-500 to-emerald-600';
    if (score >= 80) return 'from-blue-500 to-cyan-600';
    if (score >= 70) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const handleQuickStart = async () => {
    setIsLoading(true);
    // Simulate quick start preparation
    setTimeout(() => {
      setIsLoading(false);
      onStartAnalysis();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header - Mobile Optimized */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          {/* User Info - Responsive */}
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <Avatar className="h-10 w-10 sm:h-14 sm:w-14 bg-primary-foreground/10 text-primary-foreground border-2 border-primary-foreground/20 flex-shrink-0">
              <AvatarFallback className="bg-primary-foreground/10 text-primary-foreground text-sm sm:text-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              {/* Mobile Layout */}
              <div className="block sm:hidden">
                <h1 className="text-base font-bold truncate">Hi, {user.name.split(' ')[0]}!</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="text-xs bg-primary-foreground/10 border-primary-foreground/30">
                    {user.totalAnalyses} tests
                  </Badge>
                  {currentStreak > 0 && (
                    <Badge variant="secondary" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 text-xs">
                      🔥 {currentStreak}d
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Desktop Layout */}
              <div className="hidden sm:block">
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h1>
                  {currentStreak > 0 && (
                    <Badge variant="secondary" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
                      🔥 {currentStreak} day streak
                    </Badge>
                  )}
                </div>
                <p className="text-primary-foreground/70 text-sm truncate">{user.email}</p>
                <div className="flex items-center space-x-3 mt-1">
                  <Badge variant="outline" className="text-xs bg-primary-foreground/10 border-primary-foreground/30">
                    {user.totalAnalyses} analyses
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-primary-foreground/10 border-primary-foreground/30">
                    Member since {new Date(user.joinDate).getFullYear()}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons - Mobile Optimized */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            {/* Bell - Hidden on extra small screens */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary-foreground hover:bg-primary-foreground/10 hidden xs:flex h-9 w-9 sm:h-10 sm:w-10"
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            
            {/* Theme Toggle */}
            <div className="flex-shrink-0">
              <ThemeToggle variant="ghost" size="sm" className="h-9 w-9 sm:h-10 sm:w-10" />
            </div>
            
            {/* Logout */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onLogout} 
              className="text-primary-foreground hover:bg-primary-foreground/10 h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - Mobile Optimized */}
      <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Health Score Hero Card */}
        <Card className="relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${getHealthScoreColor(user.healthScore)} opacity-5`} />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-muted-foreground">Current Health Score</p>
                  {weeklyTrend > 0 && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      ↗ +{weeklyTrend}% this week
                    </Badge>
                  )}
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {user.healthScore}%
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-muted-foreground">
                    {user.healthScore >= 90 ? '🎉 Excellent health!' : 
                     user.healthScore >= 80 ? '👍 Good health' :
                     user.healthScore >= 70 ? '⚠️ Fair health' : '⚠️ Needs attention'}
                  </p>
                </div>
                <Progress value={user.healthScore} className="w-48 h-2" />
              </div>
              <div className="text-center">
                <div className={`bg-gradient-to-br ${getHealthScoreColor(user.healthScore)} p-4 rounded-full opacity-20`}>
                  <Heart className="h-12 w-12 text-primary" />
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onViewProfile}
                  className="mt-3"
                >
                  View Details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Primary CTA */}
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Start New Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Capture and analyze a new sample
                  </p>
                </div>
                <Button 
                  onClick={handleQuickStart} 
                  size="lg" 
                  className="w-full h-12"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                      Preparing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Quick Start
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Goals Card */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center">
                    <Target className="h-5 w-5 mr-2 text-blue-500" />
                    Health Goals
                  </h3>
                  <Badge variant="outline">
                    {user.totalAnalyses}/10 this month
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Weekly analysis goal</span>
                    <span className="font-medium">3/7 days</span>
                  </div>
                  <Progress value={43} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {nextGoal}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Award className="h-4 w-4 mr-2" />
                  View All Goals
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Analyses */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <History className="h-5 w-5 mr-2" />
                  Recent Analyses
                </CardTitle>
                <CardDescription>Your latest health check results</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Trends
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-0">
            {analysisHistory.length > 0 ? (
              <div className="space-y-1">
                {analysisHistory.slice(0, 5).map((analysis) => (
                  <div key={analysis.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Activity className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            {new Date(analysis.date).toLocaleDateString()}
                          </span>
                          <Badge variant="outline" className="text-xs">{analysis.time}</Badge>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <p className="text-sm text-muted-foreground">
                            Health Score: {analysis.healthScore}%
                          </p>
                          {analysis.healthScore >= 90 && (
                            <Star className="h-3 w-3 text-yellow-500" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(analysis.status)} variant="secondary">
                        {analysis.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-6">
                <div className="bg-muted/50 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Activity className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-medium">No analyses yet</p>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  Start your health journey with your first analysis
                </p>
                <Button onClick={onStartAnalysis} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Analysis
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Insights & Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Health Insights */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Health Insights
              </CardTitle>
              <CardDescription>Personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-500 p-1 rounded-full">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                        Improving Trend
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Your health score has improved by {weeklyTrend}% this week. Great job!
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500 p-1 rounded-full">
                      <Heart className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                        Hydration Tip
                      </h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Based on your recent analyses, consider increasing water intake
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                Your Progress
              </CardTitle>
              <CardDescription>Key metrics at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-500 p-2 rounded-full">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Current Streak</p>
                      <p className="text-sm text-muted-foreground">Consecutive days</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{currentStreak}</p>
                    <p className="text-xs text-muted-foreground">days</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-500 p-2 rounded-full">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Best Score</p>
                      <p className="text-sm text-muted-foreground">Personal record</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      {Math.max(...analysisHistory.map(a => a.healthScore), user.healthScore)}%
                    </p>
                    <p className="text-xs text-muted-foreground">score</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Quick Access */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Settings & Preferences</p>
                  <p className="text-sm text-muted-foreground">Manage your account and privacy</p>
                </div>
              </div>
              <Button variant="outline" onClick={onViewProfile}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper functions
function calculateHealthStreak(history) {
  // Simple streak calculation - consecutive days with analyses
  if (history.length === 0) return 0;
  
  const sortedHistory = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  let streak = 0;
  let currentDate = new Date();
  
  for (const analysis of sortedHistory) {
    const analysisDate = new Date(analysis.date);
    const dayDiff = Math.floor((currentDate.getTime() - analysisDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (dayDiff <= streak + 1) {
      streak++;
      currentDate = analysisDate;
    } else {
      break;
    }
  }
  
  return Math.min(streak, 30); // Cap at 30 days
}

function calculateWeeklyTrend(history) {
  // Calculate week-over-week health score improvement
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const recentAnalyses = history.filter(a => new Date(a.date) >= oneWeekAgo);
  if (recentAnalyses.length === 0) return 0;
  
  const avgScore = recentAnalyses.reduce((sum, a) => sum + a.healthScore, 0) / recentAnalyses.length;
  const previousScore = 85; // Mock previous score
  
  return Math.round(avgScore - previousScore);
}

function getNextGoal(user) {
  if (user.totalAnalyses === 0) return "Complete your first analysis to start tracking goals!";
  if (user.totalAnalyses < 5) return "Complete 5 analyses to unlock trend insights";
  if (user.totalAnalyses < 10) return "Reach 10 analyses this month for a special achievement";
  return "Maintain your excellent analysis routine!";
}