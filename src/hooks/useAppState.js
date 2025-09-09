import { useReducer, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

const initialState = {
  currentState: 'loading',
  user: null,
  capturedImage: '',
  authLoading: false,
  authError: '',
  isFirstTime: true,
  analysisHistory: [],
  settings: {
    notifications: true,
    reminders: true,
    dataRetention: 365,
    exportFormat: 'pdf',
    privacy: {
      analytics: true,
      crashReporting: true,
    },
  },
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_STATE':
      return { ...state, currentState: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CAPTURED_IMAGE':
      return { ...state, capturedImage: action.payload };
    case 'SET_AUTH_LOADING':
      return { ...state, authLoading: action.payload };
    case 'SET_AUTH_ERROR':
      return { ...state, authError: action.payload };
    case 'SET_FIRST_TIME':
      return { ...state, isFirstTime: action.payload };
    case 'ADD_ANALYSIS':
      return { 
        ...state, 
        analysisHistory: [action.payload, ...state.analysisHistory],
        user: state.user ? {
          ...state.user,
          totalAnalyses: state.user.totalAnalyses + 1,
          lastAnalysis: action.payload.date,
          healthScore: action.payload.healthScore,
        } : null
      };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case 'LOAD_PERSISTED_STATE':
      return { ...state, ...action.payload };
    case 'CLEAR_USER_DATA':
      return { 
        ...state, 
        user: null, 
        capturedImage: '', 
        analysisHistory: [],
        currentState: 'login'
      };
    default:
      return state;
  }
}

const STORAGE_KEY = 'urisnap-app-state';

export function useAppState() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load persisted state on mount
  useEffect(() => {
    const loadPersistedState = async () => {
      try {
        const savedState = localStorage.getItem(STORAGE_KEY);
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          dispatch({ type: 'LOAD_PERSISTED_STATE', payload: parsedState });
          
          // Check if user was logged in
          if (parsedState.user) {
            dispatch({ type: 'SET_STATE', payload: 'dashboard' });
          } else if (!parsedState.isFirstTime) {
            dispatch({ type: 'SET_STATE', payload: 'login' });
          } else {
            dispatch({ type: 'SET_STATE', payload: 'onboarding' });
          }
        } else {
          dispatch({ type: 'SET_STATE', payload: 'onboarding' });
        }
      } catch (error) {
        console.error('Failed to load persisted state:', error);
        dispatch({ type: 'SET_STATE', payload: 'onboarding' });
      }
    };

    // Simulate app initialization delay
    setTimeout(loadPersistedState, 2000);
  }, []);

  // Persist state changes
  useEffect(() => {
    const stateToSave = {
      user: state.user,
      isFirstTime: state.isFirstTime,
      analysisHistory: state.analysisHistory,
      settings: state.settings,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [state.user, state.isFirstTime, state.analysisHistory, state.settings]);

  // Actions
  const actions = {
    setState: useCallback((newState) => {
      dispatch({ type: 'SET_STATE', payload: newState });
    }, []),

    login: useCallback(async (email, password) => {
      dispatch({ type: 'SET_AUTH_LOADING', payload: true });
      dispatch({ type: 'SET_AUTH_ERROR', payload: '' });
      
      // Simulate API call
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email && password.length >= 6) {
            const userData = {
              id: Math.random().toString(36).substr(2, 9),
              name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
              email: email,
              joinDate: new Date().toISOString(),
              totalAnalyses: Math.floor(Math.random() * 10),
              healthScore: 85 + Math.floor(Math.random() * 15),
              preferences: {
                notifications: true,
                darkMode: 'system',
                language: 'en',
                units: 'metric',
              },
            };
            dispatch({ type: 'SET_USER', payload: userData });
            dispatch({ type: 'SET_STATE', payload: 'dashboard' });
            toast.success('Welcome back! Successfully signed in.');
            resolve();
          } else {
            dispatch({ type: 'SET_AUTH_ERROR', payload: 'Invalid email or password. Password must be at least 6 characters.' });
            reject(new Error('Invalid credentials'));
          }
          dispatch({ type: 'SET_AUTH_LOADING', payload: false });
        }, 1500);
      });
    }, []),

    signup: useCallback(async (email, password, name) => {
      dispatch({ type: 'SET_AUTH_LOADING', payload: true });
      dispatch({ type: 'SET_AUTH_ERROR', payload: '' });
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email && password.length >= 6 && name.length >= 2) {
            const userData = {
              id: Math.random().toString(36).substr(2, 9),
              name,
              email,
              joinDate: new Date().toISOString(),
              totalAnalyses: 0,
              healthScore: 0,
              preferences: {
                notifications: true,
                darkMode: 'system',
                language: 'en',
                units: 'metric',
              },
            };
            dispatch({ type: 'SET_USER', payload: userData });
            dispatch({ type: 'SET_STATE', payload: 'dashboard' });
            toast.success('🎉 Welcome to UriSNAP! Your account has been created successfully.');
            resolve();
          } else {
            dispatch({ type: 'SET_AUTH_ERROR', payload: 'Please check all fields. Password must be at least 6 characters.' });
            reject(new Error('Invalid signup data'));
          }
          dispatch({ type: 'SET_AUTH_LOADING', payload: false });
        }, 1500);
      });
    }, []),

    logout: useCallback(() => {
      dispatch({ type: 'CLEAR_USER_DATA' });
      toast.success('Signed out successfully. See you next time!');
    }, []),

    completeOnboarding: useCallback(() => {
      dispatch({ type: 'SET_FIRST_TIME', payload: false });
      dispatch({ type: 'SET_STATE', payload: 'login' });
    }, []),

    captureImage: useCallback((imageData) => {
      dispatch({ type: 'SET_CAPTURED_IMAGE', payload: imageData });
      dispatch({ type: 'SET_STATE', payload: 'results' });
      toast.success('📸 Sample captured! Analyzing your results...');
    }, []),

    addAnalysis: useCallback((results) => {
      const analysis = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        imageData: state.capturedImage,
        results,
        healthScore: results.overallScore || 85,
        status: results.status || 'normal',
      };
      dispatch({ type: 'ADD_ANALYSIS', payload: analysis });
    }, [state.capturedImage]),

    clearCapturedImage: useCallback(() => {
      dispatch({ type: 'SET_CAPTURED_IMAGE', payload: '' });
    }, []),

    updateSettings: useCallback((newSettings) => {
      dispatch({ type: 'UPDATE_SETTINGS', payload: newSettings });
      toast.success('Settings updated successfully');
    }, []),
  };

  return { state, actions };
}