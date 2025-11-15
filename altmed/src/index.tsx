import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import './index.css';
import App from './App';
import { AuthProvider } from './hooks/useAuth';

// Configure Amplify - will be populated after first deployment
let isAmplifyConfigured = false;
try {
  // Try to load amplify_outputs.json (generated after deployment)
  const outputs = require('../amplify_outputs.json');
  Amplify.configure(outputs);
  isAmplifyConfigured = true;
  console.log('✅ Amplify backend configured successfully');
} catch (error) {
  // If file doesn't exist yet, app will work in demo mode
  console.warn('⚠️ Amplify outputs not found - running in demo mode. Deploy backend to enable AWS features.');
  console.warn('To deploy backend: Go to Amplify Console → Backend → Deploy backend');
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