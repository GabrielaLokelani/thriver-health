# Backend Deployment Guide

## Current Status
✅ Backend code structure created (`amplify/` directory)
✅ Frontend configured to use backend when available
✅ Service layer abstraction ready for backend integration

## Node.js Version Requirement

The Amplify backend CLI requires **Node.js 20+**. 

### To update Node.js:

1. **Using nvm (recommended)**:
   ```bash
   nvm install 20
   nvm use 20
   ```

2. **Or using Homebrew**:
   ```bash
   brew install node@20
   ```

3. **Verify version**:
   ```bash
   node --version  # Should show v20.x.x or higher
   ```

## Deployment Steps

### 1. Update Node.js (if needed)
Make sure you're using Node.js 20+ as shown above.

### 2. Install Dependencies
```bash
# In root directory
npm install

# In altmed/ directory (frontend)
cd altmed
npm install
```

### 3. Deploy Backend via Amplify Console

The backend will automatically deploy when you push to GitHub:

1. **Commit and push your changes**:
   ```bash
   git add .
   git commit -m "Add Amplify backend configuration"
   git push origin main
   ```

2. **Amplify Console will**:
   - Detect the `amplify/` directory
   - Run `npx ampx pipeline-deploy` in the backend phase
   - Generate `amplify_outputs.json` after successful deployment
   - Deploy the frontend with the backend configuration

### 4. Verify Deployment

After deployment completes:
- Check Amplify Console for deployment status
- Verify `amplify_outputs.json` is generated (in root directory)
- Frontend will automatically detect and use the backend

## What Gets Deployed

### Authentication (Cognito)
- User sign-up and login
- Email/password authentication
- Session management

### Data (DynamoDB)
- `UserProfile` table - User health profiles
- `WellnessEntry` table - Daily wellness journal entries
- `MetricDataEntry` table - Custom tracking metrics
- `UserSettings` table - User preferences

All tables use owner-based authorization (users can only access their own data).

## Fallback Behavior

If the backend is not deployed:
- Frontend runs in **demo mode** using localStorage
- All data is stored locally in the browser
- No errors occur - graceful degradation

Once backend is deployed:
- Frontend automatically switches to using DynamoDB
- Existing localStorage data can be migrated (manual process)
- All new data goes to the backend

## Troubleshooting

### Backend deployment fails
- Check Node.js version (must be 20+)
- Verify AWS credentials are configured
- Check Amplify Console logs for errors

### Frontend can't find backend
- Ensure `amplify_outputs.json` exists after deployment
- Check that `aws-amplify` package is installed in frontend
- Verify Amplify configuration in `src/index.tsx`

### Type errors
- Backend types are generated after deployment
- TypeScript may show errors until backend is deployed
- These won't affect runtime if backend isn't available

