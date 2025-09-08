import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '../ui/button.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card.js';
import { Alert, AlertDescription } from '../ui/alert.js';
import { ThemeToggle } from '../theme/ThemeToggle.js';
import { Camera, RotateCcw, Check, X, Upload, AlertTriangle } from 'lucide-react';

export function CameraCapture({ onCapture, onCancel }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [error, setError] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const requestCameraPermission = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported in this browser');
      }

      // Try to get camera stream with fallback options
      let stream;
      try {
        // Try with environment camera first (back camera)
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });
      } catch {
        // Fallback to any available camera
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });
      }
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      
      setHasPermission(true);
      setError('');
    } catch (err) {
      console.error('Camera permission denied:', err);
      setHasPermission(false);
      
      // Provide specific error messages based on error type
      if (err.name === 'NotAllowedError') {
        setError('Camera permission was denied. Please allow camera access in your browser settings and try again.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found on this device. You can upload a photo instead.');
      } else if (err.name === 'NotSupportedError') {
        setError('Camera is not supported in this browser. You can upload a photo instead.');
      } else if (err.message?.includes('not supported')) {
        setError('Camera is not supported in this browser. You can upload a photo instead.');
      } else {
        setError('Unable to access camera. You can upload a photo instead.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(video, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageData);
  }, []);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
  }, []);

  const confirmCapture = useCallback(() => {
    if (capturedImage) {
      stopCamera();
      onCapture(capturedImage);
    }
  }, [capturedImage, onCapture, stopCamera]);

  const handleCancel = useCallback(() => {
    stopCamera();
    onCancel();
  }, [onCancel, stopCamera]);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        setCapturedImage(result);
        setShowFileUpload(false);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const triggerFileUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  useEffect(() => {
    // Only auto-request camera permission, don't automatically show file upload
    requestCameraPermission();
    return () => stopCamera();
  }, [requestCameraPermission, stopCamera]);

  if (hasPermission === null || isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
        <div className="text-center space-y-6">
          <div className="bg-primary/10 p-6 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
            <Camera className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Requesting Camera Access</h2>
            <p className="text-muted-foreground mt-2">Please allow camera permissions to continue</p>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    );
  }

  if (hasPermission === false) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        {/* Header */}
        <div className="px-6 py-6 border-b">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <X className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Camera Access</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12">
          <div className="text-center space-y-6">
            <div className="bg-yellow-100 p-6 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
              <AlertTriangle className="h-10 w-10 text-yellow-600" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold">Camera Access Required</h2>
              <p className="text-muted-foreground mt-2">We need access to your camera to analyze urine samples</p>
            </div>

            {error && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-4">
              <Button onClick={requestCameraPermission} className="w-full h-12">
                <Camera className="h-5 w-5 mr-2" />
                Try Camera Again
              </Button>
              
              <div className="text-center">
                <span className="text-sm text-muted-foreground">or</span>
              </div>
              
              <Button onClick={triggerFileUpload} variant="outline" className="w-full h-12">
                <Upload className="h-5 w-5 mr-2" />
                Upload Photo Instead
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg text-left">
              <p className="font-medium text-sm mb-2">Camera Permission Help:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Click the camera icon in your browser's address bar</li>
                <li>• Select "Allow" for camera permissions</li>
                <li>• Refresh the page if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 py-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <X className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Capture Sample</h1>
              <p className="text-sm text-muted-foreground">Position sample in center with good lighting</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button onClick={triggerFileUpload} variant="outline" size="sm">
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Camera/Image View */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 relative bg-black">
          {capturedImage ? (
            <img 
              src={capturedImage} 
              alt="Captured urine sample" 
              className="w-full h-full object-contain"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Overlay guide */}
          {!capturedImage && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-2 border-white border-dashed rounded-lg w-64 h-64 flex items-center justify-center">
                <span className="text-white text-sm bg-black bg-opacity-60 px-3 py-2 rounded-lg">
                  Position sample here
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 bg-background border-t">
          {capturedImage ? (
            <div className="flex space-x-4">
              <Button onClick={retakePhoto} variant="outline" className="flex-1 h-12">
                <RotateCcw className="h-5 w-5 mr-2" />
                Retake
              </Button>
              <Button onClick={confirmCapture} className="flex-1 h-12">
                <Check className="h-5 w-5 mr-2" />
                Analyze Sample
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Button 
                onClick={capturePhoto} 
                size="lg" 
                className="h-16 w-16 rounded-full p-0"
              >
                <Camera className="h-8 w-8" />
              </Button>
            </div>
          )}
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}