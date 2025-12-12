# Amplify Gen 2 Setup Guide

## Current Status
✅ Backend deployed (Amplify Gen 2)
✅ Auth and Data resources configured
⏳ Frontend still using localStorage (demo mode)
⏳ Need to connect frontend to Amplify backend

## Next Steps

### 1. Get `amplify_outputs.json`

**Option A: Download from Amplify Console**
1. Go to AWS Amplify Console
2. Select your app
3. Click on your deployed branch (e.g., `main`)
4. Go to "Deployments" tab
5. Scroll to "Deployed backend resources"
6. Click "Download amplify_outputs.json"
7. Place it at: `altmed/amplify_outputs.json`

**Option B: Use Cloud Sandbox (Recommended for Local Dev)**
```bash
# From the root directory (where amplify/ folder is)
npx ampx sandbox
```
This will:
- Create an isolated backend environment
- Generate `amplify_outputs.json` automatically
- Update the file when you make backend changes

### 2. Update Frontend to Use Amplify Auth

Your current setup uses localStorage for auth. You need to:
1. Update `authService.ts` to use Amplify Auth
2. Update `index.tsx` to properly configure Amplify
3. Use Amplify's Authenticator component or custom auth hooks

### 3. Test the Connection

After getting `amplify_outputs.json`:
1. Restart your dev server
2. Try signing up/signing in
3. Check that data is saved to your Amplify backend

## File Structure
```
altmed/
├── amplify/              # Gen 2 backend resources
│   ├── auth/
│   ├── data/
│   └── backend.ts
├── altmed/              # React frontend
│   ├── src/
│   ├── amplify_outputs.json  # ← Place here after download
│   └── package.json
└── package.json        # Root package.json
```

## Commands

**Start Cloud Sandbox:**
```bash
npx ampx sandbox
```

**Start Frontend Dev Server:**
```bash
cd altmed
npm start
```

**Deploy Backend Changes:**
```bash
# Commit and push to trigger Amplify deployment
git add .
git commit -m "Update backend"
git push
```




