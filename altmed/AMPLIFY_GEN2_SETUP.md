# 🚀 Amplify Gen 2 Setup for Thriver Health

## ✅ What I've Already Created:

1. ✅ **Data Models** (`amplify/data/resource.ts`) - All your models:
   - UserProfile
   - WellnessEntry
   - MetricDataEntry
   - JournalEntry
   - AIConversation

2. ✅ **Auth Configuration** (`amplify/auth/resource.ts`) - Email/password auth

3. ✅ **AI Processing Function** (`amplify/functions/processJournal/`) - Lambda for journal processing

4. ✅ **Backend Entry Point** (`amplify/backend.ts`) - Ties everything together

5. ✅ **App Configuration** (`src/index.tsx`) - Amplify configured (works in demo mode until deployed)

---

## 🎯 Next Steps - Deploy Your Backend:

### **Step 1: Set Up AWS Credentials** (5 minutes)

If you haven't already, configure AWS credentials:

```bash
aws configure
```

**Enter:**
- AWS Access Key ID: (from your CSV file)
- AWS Secret Access Key: (from your CSV file)
- Default region: `us-east-1`
- Default output format: `json`

**OR** if you have the credentials CSV file, you can set them as environment variables:

```bash
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_DEFAULT_REGION="us-east-1"
```

### **Step 2: Deploy Cloud Sandbox** (5-10 minutes)

This creates a temporary backend for development:

```bash
cd /Users/gabrielakadzielawa/Desktop/altmed/altmed
npx ampx sandbox
```

**What this does:**
- ✅ Creates Cognito User Pool
- ✅ Creates DynamoDB tables
- ✅ Deploys Lambda functions
- ✅ Generates `amplify_outputs.json`
- ✅ Sets up API endpoints

**Wait for:** "Sandbox deployment complete!" (~5-10 minutes)

### **Step 3: Verify Deployment**

After sandbox deploys, you'll see:
- ✅ `amplify_outputs.json` file created in root
- ✅ All backend resources ready
- ✅ Your app can now connect to AWS!

---

## 📋 What Happens Next:

### **After Sandbox Deploys:**

1. **Your app automatically connects** - The `amplify_outputs.json` file is loaded in `src/index.tsx`

2. **Test authentication:**
   - Users can sign up with email/password
   - Sign in/out works
   - All data is user-isolated

3. **Data operations work:**
   - Create/read/update/delete user profiles
   - Save wellness entries
   - Track metrics
   - Store journal entries
   - AI chat conversations

---

## 🔄 Development Workflow:

### **Local Development:**
```bash
# Terminal 1: Run sandbox (backend)
npx ampx sandbox

# Terminal 2: Run React app (frontend)
npm start
```

The sandbox runs continuously and auto-updates when you change backend code.

### **Make Backend Changes:**

Edit files in `amplify/`:
- `amplify/data/resource.ts` - Change data models
- `amplify/auth/resource.ts` - Change auth settings
- `amplify/functions/*/handler.ts` - Update Lambda functions

Sandbox **auto-deploys** changes! ✨

---

## 🚀 Deploy to Production:

When ready for production:

1. **Connect to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit with Amplify Gen 2"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Deploy via Amplify Console:**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
   - Click "New app" > "Host web app"
   - Connect GitHub repository
   - Select branch: `main`
   - Amplify auto-detects Gen 2 and deploys!

3. **Production backend:**
   - Amplify creates production backend automatically
   - Separate from sandbox (safe!)
   - Production database, auth, functions

---

## 📁 Project Structure:

```
altmed/
├── amplify/
│   ├── backend.ts              # Main backend entry
│   ├── auth/
│   │   └── resource.ts         # Auth config
│   ├── data/
│   │   └── resource.ts         # Data models
│   └── functions/
│       └── processJournal/
│           ├── resource.ts     # Function config
│           ├── handler.ts      # Lambda code
│           └── package.json    # Function deps
├── src/
│   ├── index.tsx               # Amplify configured here
│   └── ...
├── amplify_outputs.json        # Generated after deploy
└── package.json
```

---

## 🎯 Key Features Ready:

✅ **User Authentication** - Email/password sign up/in  
✅ **User Profiles** - Full health profile storage  
✅ **Wellness Tracking** - Daily wellness entries  
✅ **Metrics** - Health metrics with history  
✅ **Journal Entries** - Onboarding and daily journals  
✅ **AI Conversations** - Chat history storage  
✅ **AI Processing** - Lambda function for journal extraction  
✅ **Per-User Data** - All data isolated by user  
✅ **Type Safety** - Full TypeScript support  

---

## 🔧 Next: Update Frontend Code

After sandbox deploys, I'll help you:

1. **Replace localStorage** with Amplify Data API calls
2. **Add authentication UI** (sign up/in pages)
3. **Update all components** to use AWS backend
4. **Connect AI processing** to real Lambda function
5. **Add real-time features** (optional)

---

## ⚡ Quick Start Command:

```bash
# Run this now:
cd /Users/gabrielakadzielawa/Desktop/altmed/altmed
npx ampx sandbox
```

**Then tell me when it's done!** 🎉

---

## 🆘 Troubleshooting:

**"No AWS credentials found":**
- Run `aws configure` or set environment variables

**"Region not configured":**
- Set `AWS_DEFAULT_REGION=us-east-1`

**"Permission denied":**
- Check IAM user has `AmplifyBackendDeployFullAccess` policy

**Sandbox fails:**
- Check AWS credentials are valid
- Ensure you have permissions in AWS Console
- Try `npx ampx sandbox --once` for single deploy

---

## 📞 Ready?

Run `npx ampx sandbox` and let me know when it completes! 🚀

