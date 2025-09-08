import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card.js';
import { Badge } from '../ui/badge.js';
import { Button } from '../ui/button.js';
import { Progress } from '../ui/progress.js';
import { Separator } from '../ui/separator.js';
import { ThemeToggle } from '../theme/ThemeToggle.js';
import { Activity, AlertCircle, CheckCircle, Home, Download } from 'lucide-react';

export function AnalysisResults({ imageData, onNewAnalysis, onBackToDashboard }) {
  // Mock analysis results - in a real app, this would come from your analysis API
  const analysisResults = [
    {
      parameter: 'Glucose',
      value: 0,
      unit: 'mg/dL',
      normalRange: '0 mg/dL',
      status: 'normal',
      description: 'No glucose detected in urine sample'
    },
    {
      parameter: 'Protein',
      value: 15,
      unit: 'mg/dL',
      normalRange: '0-20 mg/dL',
      status: 'normal',
      description: 'Protein levels within normal range'
    },
    {
      parameter: 'Ketones',
      value: 5,
      unit: 'mg/dL',
      normalRange: '0-5 mg/dL',
      status: 'normal',
      description: 'Ketone levels normal'
    },
    {
      parameter: 'Blood',
      value: 2,
      unit: 'RBC/hpf',
      normalRange: '0-3 RBC/hpf',
      status: 'normal',
      description: 'Minimal red blood cells detected'
    },
    {
      parameter: 'pH Level',
      value: 6.5,
      unit: '',
      normalRange: '4.6-8.0',
      status: 'normal',
      description: 'pH level within normal acidic range'
    },
    {
      parameter: 'Specific Gravity',
      value: 1.020,
      unit: '',
      normalRange: '1.005-1.030',
      status: 'normal',
      description: 'Normal urine concentration'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'elevated':
      case 'low':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

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

  const normalCount = analysisResults.filter(r => r.status === 'normal').length;
  const totalCount = analysisResults.length;
  const overallScore = (normalCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-6 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBackToDashboard} className="text-primary-foreground hover:bg-primary-foreground/10">
              <Home className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Analysis Results</h1>
              <p className="text-primary-foreground/70 text-sm">
                {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle variant="ghost" size="sm" />
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
              <Download className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Overall Score */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <Activity className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">{overallScore.toFixed(0)}%</div>
                <p className="text-green-700 font-medium">Overall Health Score</p>
                <Badge className="bg-green-100 text-green-800 mt-2" variant="secondary">
                  {normalCount}/{totalCount} parameters normal
                </Badge>
              </div>
              <Progress value={overallScore} className="h-2 bg-green-100" />
              <p className="text-sm text-green-700">
                {overallScore === 100 
                  ? "Excellent! All parameters are within normal ranges."
                  : "Most parameters are normal. Review any flagged items below."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sample Image */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Analyzed Sample</CardTitle>
            <CardDescription>Original captured image</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <img 
                src={imageData} 
                alt="Analyzed urine sample" 
                className="w-full max-w-sm rounded-lg border shadow-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Detailed Analysis</CardTitle>
            <CardDescription>Individual parameter measurements</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <div className="space-y-1">
              {analysisResults.map((result, index) => (
                <div key={result.parameter} className="px-6 py-4 hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(result.status)}
                      <div className="flex-1">
                        <h4 className="font-medium">{result.parameter}</h4>
                        <p className="text-sm text-muted-foreground">{result.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-lg">
                          {result.value}{result.unit}
                        </span>
                        <Badge variant="secondary" className={getStatusColor(result.status)}>
                          {result.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Normal: {result.normalRange}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="space-y-4">
          <Button onClick={onNewAnalysis} className="w-full h-12">
            <Activity className="h-5 w-5 mr-2" />
            Start New Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}