import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import './index.css';
import App from './App';
import { AuthProvider } from './hooks/useAuth';

// Configure Amplify - will be populated after first deployment
// Note: For now, app runs in demo mode using localStorage
// Backend deployment in Amplify Console Gen 2 is still being rolled out
// When backend is deployed, amplify_outputs.json will be generated automatically
try {
  const outputs = require('./amplify_outputs.json');
  if (outputs && outputs.version) {
    Amplify.configure(outputs);
    console.log('✅ Amplify backend configured successfully');
  } else {
    console.warn('⚠️ Amplify outputs file exists but is empty - running in demo mode');
  }
} catch (error) {
  // App will work in demo mode using localStorage
  console.log('ℹ️ Running in demo mode - using localStorage for data persistence');
  console.log('Backend will be deployed when Amplify Console Gen 2 backend deployment is available');
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
); 