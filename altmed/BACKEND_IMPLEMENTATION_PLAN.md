# Backend Implementation Plan - AWS Integration

## Current State
✅ Complete React frontend with localStorage
✅ API service layer created (`src/services/api.ts`)
✅ Auth service layer created (`src/services/auth.ts`)
✅ Setup guide created (`AWS_SETUP_GUIDE.md`)

## Next Steps

### Phase 1: AWS Account Setup & Dependencies (30 minutes)

1. **Install AWS Amplify CLI globally**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

2. **Install project dependencies**
   ```bash
   cd /Users/gabrielakadzielawa/Desktop/altmed/altmed
   npm install aws-amplify @aws-amplify/ui-react
   ```

3. **Initialize Amplify in your project**
   ```bash
   amplify init
   ```
   - Project name: `thriverhealth`
   - Environment: `dev`
   - Framework: `react`
   - Source directory: `src`
   - Distribution directory: `build`

### Phase 2: Add AWS Services (1 hour)

1. **Add Authentication (Cognito)**
   ```bash
   amplify add auth
   ```
   - Choose: Default configuration
   - Sign-in method: Email
   - Advanced settings: Default

2. **Add API (API Gateway + Lambda)**
   ```bash
   amplify add api
   ```
   - Select: REST
   - API name: `thriverapi`
   - Create Lambda functions for:
     - User profiles CRUD
     - Wellness entries CRUD
     - Metrics data CRUD
     - AI processing endpoint

3. **Add Storage (DynamoDB)**
   ```bash
   amplify add storage
   ```
   - Type: NoSQL Database
   - Tables needed:
     - `UserProfiles`
     - `WellnessEntries`
     - `MetricData`
     - `JournalEntries`
     - `AIConversations`

4. **Deploy Everything**
   ```bash
   amplify push
   ```
   This creates all AWS resources and generates `src/aws-exports.js`

### Phase 3: Update Frontend Code (2-3 hours)

#### 1. Configure Amplify in App (`src/index.tsx`)

```typescript
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);
```

#### 2. Update Auth Service (`src/services/auth.ts`)

Uncomment AWS Amplify Auth calls:
```typescript
import { Auth } from 'aws-amplify';

// Replace demo mode with:
await Auth.signIn(email, password);
await Auth.signUp({ username: email, password, attributes: { email, name } });
await Auth.signOut();
```

#### 3. Update API Service (`src/services/api.ts`)

Replace fetch calls with Amplify API:
```typescript
import { API } from 'aws-amplify';

const apiName = 'thriverapi';

// Example:
export const profileAPI = {
  async create(profile: UserProfile) {
    return await API.post(apiName, '/profile', {
      body: profile
    });
  },
  async get(userId: string) {
    return await API.get(apiName, `/profile/${userId}`, {});
  },
  // ... etc
};
```

#### 4. Create Auth Context Hook (`src/hooks/useAuth.tsx`)

```typescript
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(authService.getState());

  useEffect(() => {
    return authService.subscribe(setAuthState);
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

#### 5. Add Protected Routes (`src/components/ProtectedRoute.tsx`)

```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

#### 6. Update Storage Utils (`src/utils/storage.ts`)

Replace localStorage with API calls:
```typescript
import { profileAPI, wellnessAPI, metricsAPI } from '../services/api';
import { authService } from '../services/auth';

export const storage = {
  async getUserProfile() {
    const user = await authService.getCurrentUser();
    if (!user) return null;
    return await profileAPI.get(user.id);
  },
  
  async saveUserProfile(profile: UserProfile) {
    return await profileAPI.create(profile);
  },
  
  // ... similar for other methods
};
```

### Phase 4: Lambda Functions (2-3 hours)

Create Lambda functions in `amplify/backend/function/`:

#### 1. User Profile Lambda (`profileFunction/src/index.js`)

```javascript
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { httpMethod, path, body } = event;
  const userId = event.requestContext.authorizer.claims.sub;
  
  try {
    switch (httpMethod) {
      case 'POST':
        return await createProfile(userId, JSON.parse(body));
      case 'GET':
        return await getProfile(userId);
      case 'PUT':
        return await updateProfile(userId, JSON.parse(body));
      case 'DELETE':
        return await deleteProfile(userId);
      default:
        return { statusCode: 400, body: 'Unsupported method' };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

async function createProfile(userId, profile) {
  await dynamo.put({
    TableName: process.env.USER_PROFILES_TABLE,
    Item: {
      userId,
      ...profile,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }).promise();
  
  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'Profile created', userId })
  };
}

// ... other CRUD functions
```

#### 2. AI Processing Lambda (`aiProcessingFunction/src/index.js`)

```javascript
// This will integrate with OpenAI or AWS Bedrock
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

exports.handler = async (event) => {
  const { journalEntry } = JSON.parse(event.body);
  
  // Call AI model to extract structured data
  const extractedData = await processWithAI(journalEntry);
  
  return {
    statusCode: 200,
    body: JSON.stringify(extractedData)
  };
};

async function processWithAI(text) {
  // Implement AI extraction logic
  // Return structured data (diagnosis, medications, etc.)
}
```

### Phase 5: Environment Variables

Create `.env` file (add to .gitignore):
```env
REACT_APP_API_URL=https://your-api-gateway-url.amazonaws.com/dev
REACT_APP_AWS_REGION=us-east-1
REACT_APP_USER_POOL_ID=your-cognito-pool-id
REACT_APP_USER_POOL_CLIENT_ID=your-app-client-id
```

### Phase 6: Testing & Migration (1-2 hours)

1. **Test authentication flow**
   - Sign up new user
   - Verify email
   - Sign in
   - Sign out

2. **Test API endpoints**
   - Create profile
   - Update profile
   - Get profile
   - CRUD operations for wellness/metrics

3. **Migrate existing localStorage data** (optional)
   - Export current data
   - Import to database
   - Verify integrity

### Phase 7: Deployment & Monitoring

1. **Deploy to Amplify Console**
   ```bash
   amplify add hosting
   amplify publish
   ```

2. **Set up monitoring**
   - CloudWatch logs for Lambdas
   - API Gateway metrics
   - DynamoDB metrics
   - Set up alarms for errors

3. **Configure CI/CD**
   - Connect GitHub repository
   - Auto-deploy on push to main
   - Separate dev/staging/prod environments

## File Structure After Setup

```
altmed/
├── amplify/
│   ├── backend/
│   │   ├── api/
│   │   │   └── thriverapi/
│   │   ├── auth/
│   │   │   └── thriverauthXXXXX/
│   │   ├── function/
│   │   │   ├── profileFunction/
│   │   │   ├── wellnessFunction/
│   │   │   ├── metricsFunction/
│   │   │   └── aiProcessingFunction/
│   │   └── storage/
│   │       └── thrivertables/
│   ├── team-provider-info.json
│   └── cli.json
├── src/
│   ├── services/
│   │   ├── api.ts (✅ Created)
│   │   └── auth.ts (✅ Created)
│   ├── hooks/
│   │   └── useAuth.tsx (TODO)
│   ├── components/
│   │   ├── ProtectedRoute.tsx (TODO)
│   │   └── AuthForms/
│   │       ├── Login.tsx (TODO)
│   │       ├── SignUp.tsx (TODO)
│   │       └── ForgotPassword.tsx (TODO)
│   ├── aws-exports.js (Generated by Amplify)
│   └── ...existing files
├── .env (TODO - create)
├── .gitignore (Update)
└── package.json (Update)
```

## Cost Breakdown

### Development (Free Tier)
- **Cognito**: 50,000 MAUs free
- **Lambda**: 1M requests/month, 400,000 GB-seconds free
- **API Gateway**: 1M API calls/month free (12 months)
- **DynamoDB**: 25GB storage, 25 WCU/RCU free
- **CloudWatch**: 5GB logs free

**Total for dev**: $0-5/month

### Production (1000 users)
- **Cognito**: ~$5-10/month
- **Lambda**: ~$5-15/month
- **API Gateway**: ~$3.50/month (1M requests @ $3.50/million)
- **DynamoDB**: ~$5-10/month (on-demand pricing)
- **S3 + CloudFront**: ~$5/month
- **CloudWatch**: ~$3/month

**Total for production**: ~$25-50/month

## Timeline

- **Phase 1** (AWS Setup): 30 min
- **Phase 2** (Add Services): 1 hour
- **Phase 3** (Frontend Updates): 2-3 hours
- **Phase 4** (Lambda Functions): 2-3 hours
- **Phase 5** (Environment Config): 15 min
- **Phase 6** (Testing): 1-2 hours
- **Phase 7** (Deployment): 1 hour

**Total**: ~8-11 hours

## Benefits of This Architecture

✅ **Serverless** - No server management, scales automatically
✅ **Secure** - Built-in authentication with Cognito
✅ **Cost-effective** - Pay only for what you use
✅ **Scalable** - Can handle thousands of users
✅ **Fast** - Low latency with CloudFront CDN
✅ **Reliable** - 99.99% uptime SLA
✅ **Manageable** - Infrastructure as code with Amplify

## Ready to Start?

Run these commands to begin:

```bash
# 1. Install Amplify CLI
npm install -g @aws-amplify/cli

# 2. Configure AWS credentials
amplify configure

# 3. Install dependencies
cd /Users/gabrielakadzielawa/Desktop/altmed/altmed
npm install aws-amplify @aws-amplify/ui-react

# 4. Initialize Amplify
amplify init

# 5. Follow AWS_SETUP_GUIDE.md for next steps
```

Let me know when you're ready to proceed with any phase!

