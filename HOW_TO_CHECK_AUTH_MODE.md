# How to Check if You're Using Amplify Auth or localStorage

## Quick Check Methods

### 1. **Check Browser Console** (Easiest)

Open your browser's Developer Console (F12 or Cmd+Option+I) and look for these messages:

#### ✅ **Using Amplify Auth (Cognito):**
```
✅ Amplify Gen 2 backend configured successfully
🔐 Auth Service: Using AWS Amplify Auth (Cognito)
☁️ Sign up: Using AWS Amplify Auth (Cognito)
☁️ Sign in: Using AWS Amplify Auth (Cognito)
```

#### ⚠️ **Using localStorage (Demo Mode):**
```
⚠️ Running in demo mode - Amplify backend not connected
⚠️ Auth Service: Amplify not configured - using localStorage demo mode
📦 Sign up: Using localStorage (demo mode)
📦 Sign in: Using localStorage (demo mode)
```

### 2. **Check Network Tab**

1. Open Developer Tools (F12)
2. Go to the **Network** tab
3. Try to sign up or sign in
4. Look for requests:

#### ✅ **Using Amplify:**
- You'll see requests to:
  - `cognito-idp.us-east-1.amazonaws.com` (Cognito)
  - `wu25czurjzehtd4awnkuwmbnyu.appsync-api.us-east-1.amazonaws.com` (AppSync/Data)

#### ⚠️ **Using localStorage:**
- No network requests for auth
- Only local JavaScript execution

### 3. **Check localStorage**

1. Open Developer Tools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click on **Local Storage** → your domain
4. Look for these keys:

#### ✅ **Using Amplify:**
- You'll see Cognito-related keys like:
  - `CognitoIdentityServiceProvider.*`
  - `aws-amplify-cache-*`
- **No** `altmed_auth_user` or `altmed_users` keys

#### ⚠️ **Using localStorage:**
- You'll see:
  - `altmed_auth_user` (current user)
  - `altmed_users` (all users list)
  - `altmed_cred_*` (user credentials)

### 4. **Check AWS Cognito Console**

1. Go to [AWS Cognito Console](https://console.aws.amazon.com/cognito/)
2. Select your User Pool (should match the ID in `amplify_outputs.json`)
3. Go to **Users** tab
4. Try signing up a new user

#### ✅ **Using Amplify:**
- New users will appear in the Cognito Users list
- You'll see user details, email verification status, etc.

#### ⚠️ **Using localStorage:**
- No users will appear in Cognito
- Users only exist in browser localStorage

### 5. **Check User ID Format**

After signing in, check the user ID:

#### ✅ **Using Amplify:**
- User ID looks like: `us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` (UUID format)
- Or: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

#### ⚠️ **Using localStorage:**
- User ID looks like: `user_1234567890_abc123xyz` (timestamp-based)

## Common Issues

### Issue: Still seeing localStorage messages

**Possible causes:**
1. `amplify_outputs.json` not in correct location
   - Should be at: `altmed/amplify_outputs.json`
   - Check: `ls altmed/amplify_outputs.json`

2. Dev server not restarted
   - Solution: Stop and restart `npm start`

3. Browser cache
   - Solution: Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

4. File not being loaded
   - Check console for import errors
   - Verify file exists and is valid JSON

### Issue: Mixed messages (some Amplify, some localStorage)

This shouldn't happen, but if you see both:
- Check that `amplify_outputs.json` is valid JSON
- Verify Amplify.configure() was called successfully
- Check for any errors in the console

## Test It Now

1. **Open your app** in the browser
2. **Open Console** (F12)
3. **Try signing up** a new user
4. **Look for the log messages**:
   - `☁️ Sign up: Using AWS Amplify Auth (Cognito)` = ✅ Working!
   - `📦 Sign up: Using localStorage (demo mode)` = ⚠️ Need to fix

## Quick Fix Checklist

If you're still using localStorage:

- [ ] `amplify_outputs.json` exists at `altmed/amplify_outputs.json`
- [ ] File is valid JSON (no syntax errors)
- [ ] Dev server restarted after adding the file
- [ ] Console shows: `✅ Amplify Gen 2 backend configured successfully`
- [ ] No errors in console about missing file

---

**Need help?** Check the console messages - they'll tell you exactly what's happening!



