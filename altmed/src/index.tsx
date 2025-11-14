import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import './index.css';
import App from './App';

// Configure Amplify - will be populated after first deployment
try {
  // Try to load amplify_outputs.json (generated after deployment)
  const outputs = require('../amplify_outputs.json');
  Amplify.configure(outputs);
} catch (error) {
  // If file doesn't exist yet, app will work in demo mode
  console.log('Amplify outputs not found - running in demo mode. Deploy backend to enable AWS features.');
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 