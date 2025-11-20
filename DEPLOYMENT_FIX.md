# Backend Deployment Fix

## Issue
The deployment failed with:
- `Invalid AttributeDataType input` for the `name` attribute
- `User pool attributes cannot be changed after a user pool has been created`

## Solution Applied
1. **Removed `name` from Cognito user attributes** - Only `email` is required now
2. **Name storage** - User's name will be stored in the `UserProfile` DynamoDB table instead of Cognito attributes

## If Deployment Still Fails

If you still get errors about user pool attributes, you may need to delete the existing user pool:

### Option 1: Delete via AWS Console
1. Go to AWS Console → Cognito → User Pools
2. Find the user pool created by Amplify (name will include `amplify-`)
3. Delete the user pool
4. Redeploy

### Option 2: Remove and Re-add Auth
1. Temporarily remove `defineAuth` from `amplify/backend.ts`
2. Deploy (this will delete the user pool)
3. Add `defineAuth` back
4. Deploy again

**Warning**: Deleting the user pool will delete all users!

## Current Auth Configuration
- **Email**: Required (standard Cognito attribute)
- **Name**: Stored in UserProfile table (not in Cognito)

This is actually a better design as it keeps authentication simple and user data in the database.

