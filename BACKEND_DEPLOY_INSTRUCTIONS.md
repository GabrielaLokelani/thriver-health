# How to Deploy Backend in Amplify Console

## Step-by-Step Instructions

1. **Go to AWS Amplify Console:**
   - https://console.aws.amazon.com/amplify
   - Sign in if needed

2. **Select Your App:**
   - Click on "thriver-health" app

3. **Find Backend Section:**
   - Look in the LEFT SIDEBAR for "Backend" (should be between "Deployments" and "Data")
   - If you DON'T see "Backend" in the sidebar:
     - Click "App settings" (gear icon) in left sidebar
     - Look for "Backend" or "Backend environments" section
     - OR go to the main app page and look for a "Backend" card/button

4. **Deploy Backend:**
   - If you see "Backend" section, click it
   - You should see "Deploy backend" button or similar
   - Click it and wait 5-10 minutes

5. **If Backend Section Doesn't Exist:**
   - The app might need to be reconnected to detect the backend
   - Try: App settings → General → Look for "Backend" or "Connect backend"
   - OR: Create a new deployment by pushing a commit (this sometimes triggers backend detection)

## Alternative: Use AWS CLI (if Console doesn't work)

If the Console UI doesn't work, you can deploy via CLI:

```bash
cd /Users/gabrielakadzielawa/Desktop/altmed
npx ampx sandbox --once
```

This will deploy to a sandbox environment. Then you can promote it to production.

## What Should Happen:

- Backend deployment takes 5-10 minutes
- `amplify_outputs.json` will be generated automatically
- You'll see Auth, Data, and Functions resources created
- Your app will then connect to AWS

