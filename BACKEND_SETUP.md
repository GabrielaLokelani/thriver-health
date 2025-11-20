# Backend Setup Guide

## Overview
This project uses AWS Amplify Gen 2 for backend infrastructure. The backend includes:
- **Authentication**: AWS Cognito for user sign-up, login, and session management
- **Data**: DynamoDB tables for user profiles, wellness entries, metric data, and settings

## Backend Structure

```
amplify/
├── backend.ts          # Main backend definition
├── auth/
│   └── resource.ts     # Cognito authentication configuration
└── data/
    └── resource.ts     # DynamoDB schema definitions
```

## Deployment

### Prerequisites
1. AWS Account with appropriate permissions
2. AWS CLI configured with credentials
3. Node.js 18+ installed

### Steps to Deploy Backend

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Deploy backend to Amplify Console**:
   - The backend will automatically deploy when you push to your connected GitHub branch
   - Amplify Console will detect the `amplify/` directory and deploy it

3. **After deployment**:
   - Amplify will generate `amplify_outputs.json` in the root directory
   - The frontend will automatically detect this file and use the backend
   - If the file doesn't exist, the app will run in demo mode with localStorage

## Data Models

### UserProfile
- Stores user's health profile, diagnosis, medications, treatments, and tracking metrics
- Each user has one profile (owner-based access)

### WellnessEntry
- Daily wellness journal entries
- Tracks mood, energy, sleep, stress, and notes
- Owner-based access

### MetricDataEntry
- Custom tracking metrics (e.g., PSA levels, blood pressure)
- Owner-based access

### UserSettings
- User preferences and settings
- Owner-based access

## Frontend Integration

The frontend automatically switches between localStorage and backend based on whether `amplify_outputs.json` exists:

- **With backend**: Uses `AmplifyDataService` to interact with DynamoDB via Amplify Data
- **Without backend**: Uses `storage` utility with localStorage

All data access goes through the service layer (`src/services/dataService.ts`), so components don't need to know which storage method is being used.

## Authentication

Authentication is handled through AWS Cognito:
- Email/password sign-up and login
- Required fields: email, name
- Session management handled by Amplify

The frontend uses `useAuth` hook which wraps Amplify Auth when backend is available, or falls back to localStorage-based auth in demo mode.

## Next Steps

1. Push changes to GitHub to trigger Amplify deployment
2. Wait for backend deployment to complete
3. Verify `amplify_outputs.json` is generated
4. Test authentication and data operations

