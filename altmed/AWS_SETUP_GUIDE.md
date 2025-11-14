# AWS Backend Setup Guide for Thriver Health

## Prerequisites
- AWS Account
- AWS CLI installed and configured
- Node.js and npm installed

## Step 1: Install AWS Amplify CLI

```bash
npm install -g @aws-amplify/cli
amplify configure
```

## Step 2: Initialize Amplify in Your Project

From the `/altmed` directory:

```bash
cd /Users/gabrielakadzielawa/Desktop/altmed/altmed
amplify init
```

**Configuration options:**
- Project name: `thriverhealth`
- Environment: `dev`
- Default editor: `Visual Studio Code` (or your preference)
- App type: `javascript`
- Framework: `react`
- Source directory: `src`
- Distribution directory: `build`
- Build command: `npm run build`
- Start command: `npm start`

## Step 3: Add Authentication (Cognito)

```bash
amplify add auth
```

**Configuration:**
- Default configuration with username
- Email for sign-in
- Password requirements: Default
- Enable MFA: Optional (recommend "No" for now)

## Step 4: Add API (API Gateway + Lambda)

```bash
amplify add api
```

**Configuration:**
- Select: `REST`
- API name: `thriverapi`
- Path: `/api`
- Lambda source: `Create a new Lambda function`
- Function name: `thriverapifunction`
- Runtime: `NodeJS`
- Template: `CRUD function for DynamoDB`

## Step 5: Add Database (DynamoDB)

```bash
amplify add storage
```

**Configuration:**
- Select: `NoSQL Database`
- Resource name: `thrivertables`
- Table name: `UserProfiles`
- Partition key: `userId` (String)
- Sort key: `createdAt` (String)
- Add indexes: Yes
  - GSI name: `email-index`
  - Partition key: `email`

Create additional tables for:
- `WellnessEntries`
- `MetricData`
- `Testimonials`
- `Goals`

## Step 6: Deploy to AWS

```bash
amplify push
```

This will:
- Create CloudFormation stack
- Provision all AWS resources
- Generate configuration files
- Deploy your infrastructure

## Step 7: Install Amplify Libraries in Your React App

```bash
npm install aws-amplify @aws-amplify/ui-react
```

## Environment Variables

Amplify will create `src/aws-exports.js` automatically. Add to `.gitignore`:

```
src/aws-exports.js
```

## Database Schema

### UserProfiles Table
```javascript
{
  userId: String (Partition Key),
  email: String (GSI),
  name: String,
  dateOfBirth: String,
  sex: String,
  location: String,
  diagnosis: Object,
  medications: Array,
  treatments: Array,
  trackingMetrics: Array,
  lifestyle: Object,
  goals: Object,
  createdAt: String (Sort Key),
  updatedAt: String
}
```

### WellnessEntries Table
```javascript
{
  entryId: String (Partition Key),
  userId: String (GSI),
  date: String,
  energy: Number,
  sleep: Number,
  stress: Number,
  mood: Number,
  notes: String,
  createdAt: String
}
```

### MetricData Table
```javascript
{
  dataId: String (Partition Key),
  userId: String (GSI),
  metricName: String,
  value: Number,
  unit: String,
  date: String,
  notes: String,
  tags: Array
}
```

## API Endpoints to Create

1. **User Profile**
   - `POST /api/profile` - Create profile
   - `GET /api/profile/{userId}` - Get profile
   - `PUT /api/profile/{userId}` - Update profile
   - `DELETE /api/profile/{userId}` - Delete profile

2. **Wellness Entries**
   - `POST /api/wellness` - Create entry
   - `GET /api/wellness/{userId}` - Get all entries
   - `GET /api/wellness/{userId}/{date}` - Get specific entry
   - `PUT /api/wellness/{entryId}` - Update entry

3. **Metrics**
   - `POST /api/metrics` - Add metric data
   - `GET /api/metrics/{userId}` - Get all metric data
   - `GET /api/metrics/{userId}/{metricName}` - Get specific metric history
   - `DELETE /api/metrics/{dataId}` - Delete metric data

4. **Journal Entries**
   - `POST /api/journal` - Create journal entry
   - `GET /api/journal/{userId}` - Get all journal entries

## Cost Estimates (Development)

**Free Tier Eligible:**
- Cognito: 50,000 MAUs free
- Lambda: 1M requests/month free
- API Gateway: 1M calls/month free (first 12 months)
- DynamoDB: 25 GB storage + 25 WCU/RCU free

**Expected Monthly Cost (after free tier):**
- ~$5-20/month for light usage
- ~$50-100/month for moderate usage (1000+ users)

## Security Best Practices

1. Enable MFA for production
2. Use environment variables for sensitive data
3. Implement rate limiting on API endpoints
4. Enable CloudWatch logging
5. Set up proper IAM roles and policies
6. Use HTTPS only (enforced by API Gateway)

## Next Steps After Setup

1. Update React app to use Amplify Auth
2. Replace localStorage calls with API calls
3. Implement real-time AI processing endpoint
4. Add file upload for profile photos
5. Set up CloudWatch monitoring
6. Configure CI/CD pipeline with Amplify Console

