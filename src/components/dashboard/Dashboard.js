import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card.js';
import { Button } from '../ui/button.js';
import { Badge } from '../ui/badge.js';
import { Avatar, AvatarFallback } from '../ui/avatar.js';
import { ThemeToggle } from '../theme/ThemeToggle.js';
import { 
  Activity, 
  Camera, 
  History, 
  Settings, 
  LogOut, 
  TrendingUp,
  Calendar,
  FileText
} from 'lucide-react';

export function Dashboard({ user, onStartAnalysis, onLogout }) {
  // Mock data for recent analyses
  const recentAnalyses = [
    {
      id: 1,
      date: '2024-01-15',
      time: '10:30 AM',
      status: 'normal',
      score: 95
    },
    {
      id: 2,
      date: '2024-01-10',
      time: '2:15 PM',
      status: 'normal',
      score: 92
    },
    {
      id: 3,
      date: '2024-01-05',
      time: '9:45 AM',
      status: 'elevated',
      score: 78
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'elevated':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-6 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 bg-primary-foreground/10 text-primary-foreground">
              <AvatarFallback className="bg-primary-foreground/10 text-primary-foreground">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">Welcome back, {user.name.split(' ')[0]}</h1>
              <p className="text-primary-foreground/70 text-sm">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle variant="ghost" size="sm" />
            <Button variant="ghost" size="sm" onClick={onLogout} className="text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Health Score Card */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Health Score</p>
                <div className="text-4xl font-bold text-green-600 mt-1">95%</div>
                <p className="text-sm text-green-700 mt-1">Excellent health</p>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Action */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Start New Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Capture and analyze a new urine sample to monitor your health
                </p>
              </div>
              <Button onClick={onStartAnalysis} size="lg" className="w-full h-14">
                <Camera className="h-5 w-5 mr-2" />
                Capture Sample
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Analyses */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center">
              <History className="h-5 w-5 mr-2" />
              Recent Analyses
            </CardTitle>
            <CardDescription>Your latest urine test results</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            {recentAnalyses.length > 0 ? (
              <div className="space-y-1">
                {recentAnalyses.map((analysis) => (
                  <div key={analysis.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
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
                        <p className="text-sm text-muted-foreground">
                          Health Score: {analysis.score}%
                        </p>
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
                <p className="text-sm text-muted-foreground mt-1">
                  Start your first analysis to see results here
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Health Tips */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Health Tips
            </CardTitle>
            <CardDescription>Recommendations for optimal urinary health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-semibold mb-2 text-blue-900">Stay Hydrated</h4>
                <p className="text-sm text-blue-700">
                  Drink 8-10 glasses of water daily for optimal kidney function
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h4 className="font-semibold mb-2 text-green-900">Regular Testing</h4>
                <p className="text-sm text-green-700">
                  Monitor your health with weekly urine analysis for best results
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <h4 className="font-semibold mb-2 text-purple-900">Balanced Diet</h4>
                <p className="text-sm text-purple-700">
                  Maintain a healthy diet low in processed foods and excess sugar
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                <h4 className="font-semibold mb-2 text-orange-900">Consult Doctor</h4>
                <p className="text-sm text-orange-700">
                  Always consult healthcare professionals for concerning results
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Quick Access */}
        <Card>
          <CardContent className="p-6">
            <Button variant="outline" className="w-full h-12 justify-start">
              <Settings className="h-5 w-5 mr-3" />
              Settings & Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}