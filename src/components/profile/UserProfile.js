import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { ThemeToggle } from '../theme/ThemeToggle';
import { ThemeSettings } from '../theme/ThemeSettings';
import { 
  User as UserIcon, 
  Mail, 
  Calendar, 
  TrendingUp, 
  Settings, 
  Download,
  Award,
  Target,
  ArrowLeft,
  Edit3,
  Save,
  X
} from 'lucide-react';

export function UserProfile({ user, settings, onBack, onUpdateSettings, onExportData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);

  const handleSave = () => {
    // In a real app, this would update the user profile
    setIsEditing(false);
  };

  const getHealthScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100 border-green-200';
    if (score >= 80) return 'text-blue-600 bg-blue-100 border-blue-200';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  const getHealthScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    return 'Needs Attention';
  };

  const achievements = [
    { id: 1, name: 'First Analysis', description: 'Completed your first health check', unlocked: user.totalAnalyses > 0 },
    { id: 2, name: 'Health Explorer', description: 'Completed 5 analyses', unlocked: user.totalAnalyses >= 5 },
    { id: 3, name: 'Consistency King', description: 'Weekly analyses for a month', unlocked: false },
    { id: 4, name: 'Health Champion', description: 'Maintained excellent health score', unlocked: user.healthScore >= 90 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Profile & Settings</h1>
              <p className="text-primary-foreground/70 text-sm">Manage your account and preferences</p>
            </div>
          </div>
          <ThemeToggle variant="ghost" size="sm" />
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Profile Information
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input
                      id="name"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Joined</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Total Analyses</p>
                  <p className="text-sm text-muted-foreground">{user.totalAnalyses}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Health Overview</CardTitle>
            <CardDescription>Your current health status and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`p-4 rounded-xl border-2 ${getHealthScoreColor(user.healthScore)}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Current Health Score</p>
                  <div className="text-3xl font-bold mt-1">{user.healthScore}%</div>
                  <p className="text-sm mt-1">{getHealthScoreLabel(user.healthScore)}</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="mb-2">
                    {user.lastAnalysis ? `Last: ${new Date(user.lastAnalysis).toLocaleDateString()}` : 'No recent data'}
                  </Badge>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-6 rounded-full ${
                          i < Math.floor(user.healthScore / 20) ? 'bg-current' : 'bg-current/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Achievements
            </CardTitle>
            <CardDescription>Track your health journey milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.unlocked
                      ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                      : 'bg-muted/50 border-muted'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      achievement.unlocked ? 'bg-green-500' : 'bg-muted-foreground'
                    }`}>
                      <Award className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${achievement.unlocked ? '' : 'text-muted-foreground'}`}>
                        {achievement.name}
                      </h4>
                      <p className={`text-sm ${achievement.unlocked ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.unlocked && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Unlocked
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <ThemeSettings />

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Export and manage your health data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={onExportData} variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export Health Data
            </Button>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Data Retention</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Your data is automatically retained for {settings.dataRetention} days
              </p>
              <Badge variant="outline">
                {settings.exportFormat.toUpperCase()} Format
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Security</CardTitle>
            <CardDescription>Control how your data is used</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">Analytics</p>
                <p className="text-sm text-muted-foreground">Help improve the app</p>
              </div>
              <Badge variant={settings.privacy.analytics ? "default" : "secondary"}>
                {settings.privacy.analytics ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">Crash Reporting</p>
                <p className="text-sm text-muted-foreground">Automatic error reports</p>
              </div>
              <Badge variant={settings.privacy.crashReporting ? "default" : "secondary"}>
                {settings.privacy.crashReporting ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}