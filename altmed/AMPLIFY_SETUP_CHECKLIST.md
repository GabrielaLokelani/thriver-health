# AWS Amplify Setup Checklist

✅ **COMPLETED:**
- [x] Install aws-amplify and @aws-amplify/ui-react packages
- [x] Update .gitignore for Amplify files
- [x] Create API service layer (`src/services/api.ts`)
- [x] Create Auth service layer (`src/services/auth.ts`)

## 🎯 NEXT STEPS - Follow Along:

### Step 1: Install Amplify CLI (5 minutes)

Run this command in your terminal:

```bash
npm install -g @aws-amplify/cli
```

Then configure it with your AWS account:

```bash
amplify configure
```

**This will:**
1. Open AWS Console in your browser
2. Ask you to create an IAM user (if you don't have one)
3. Download credentials
4. Configure CLI with your credentials

**Important:** Choose region `us-east-1` (N. Virginia) - it's the most feature-complete

### Step 2: Initialize Amplify in Your Project (10 minutes)

From the `/altmed` directory, run:

```bash
cd /Users/gabrielakadzielawa/Desktop/altmed/altmed
amplify init
```

**Answer the prompts:**
```
? Enter a name for the project: thriverhealth
? Initialize the project with the above configuration? No
? Enter a name for the environment: dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building: javascript
? What javascript framework are you using: react
? Source Directory Path: src
? Distribution Directory Path: build
? Build Command: npm run build
? Start Command: npm start
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use: default (or your AWS profile name)
```

**This creates:**
- `/amplify` folder with your backend config
- `src/aws-exports.js` (auto-generated, git-ignored)
- CloudFormation stack in AWS

### Step 3: Add Authentication (15 minutes)

```bash
amplify add auth
```

**Answer the prompts:**
```
? Do you want to use the default authentication and security configuration? Default configuration
? How do you want users to be able to sign in? Email
? Do you want to configure advanced settings? No, I am done.
```

**This creates:**
- Amazon Cognito User Pool
- User authentication flows (sign up, sign in, forgot password)
- Secure token management

### Step 4: Add API & Database (20 minutes)

```bash
amplify add api
```

**Answer the prompts:**
```
? Select from one of the below mentioned services: REST
? Provide a friendly name for your resource to be used as a label for this category in the project: thriverapi
? Provide a path (e.g., /book/{isbn}): /api
? Choose a Lambda source: Create a new Lambda function
? Provide an AWS Lambda function name: thriverapifunction
? Choose the runtime that you want to use: NodeJS
? Choose the function template that you want to use: CRUD function for DynamoDB (Integration with API Gateway)
? Do you want to access other resources in this project from your Lambda function? No
? Do you want to invoke this function on a recurring schedule? No
? Do you want to enable Lambda layers for this function? No
? Do you want to configure advanced settings? No
? Do you want to edit the local lambda function now? No
? Restrict API access? Yes
? Who should have access? Authenticated users only
? What kind of access do you want for Authenticated users? create, read, update, delete
? Do you want to add another path? No
```

**This creates:**
- API Gateway REST API
- Lambda function for CRUD operations
- DynamoDB table
- IAM roles and policies

### Step 5: Deploy Everything! (10 minutes)

```bash
amplify push
```

**Answer the prompts:**
```
? Are you sure you want to continue? Yes
? Do you want to generate code for your newly created GraphQL API? No
```

**This will:**
- ☁️ Create all resources in AWS
- 🔐 Set up authentication
- 🗄️ Create DynamoDB tables
- 🔌 Deploy Lambda functions
- 📡 Configure API Gateway
- 📝 Generate `src/aws-exports.js`

**Expected wait time:** 5-8 minutes (grab a coffee ☕)

### Step 6: Verify Deployment

After `amplify push` completes, check:

```bash
amplify status
```

You should see:
```
Current Environment: dev

| Category | Resource name        | Operation | Provider plugin   |
| -------- | -------------------- | --------- | ----------------- |
| Auth     | thriverhealthXXXXX   | No Change | awscloudformation |
| Api      | thriverapi           | No Change | awscloudformation |
| Function | thriverapifunction   | No Change | awscloudformation |
```

### Step 7: Test Your Backend

```bash
amplify console
```

Select:
- `Amplify Console` to see deployment
- `API Gateway` to test endpoints
- `CloudWatch` to view logs

---

## 🎉 Once Setup is Complete, I'll Help You:

1. **Configure the React app** to use Amplify
2. **Update the frontend code** to replace localStorage with API calls
3. **Create Lambda functions** for:
   - User profiles CRUD
   - Wellness tracking
   - Metrics data
   - AI journal processing
4. **Add additional tables** for all data types
5. **Set up hosting** for production deployment

## 🆘 Need Help?

Common issues:
- **"Region not configured"**: Run `aws configure` and set region to `us-east-1`
- **"Access denied"**: Check your IAM user has admin permissions
- **"Resource already exists"**: Delete stack in CloudFormation console and retry
- **Build fails**: Check Node version matches (18.x recommended)

## 📞 Ready for Next Step?

After running the commands above, tell me:
1. ✅ "Amplify CLI configured"
2. ✅ "Project initialized"
3. ✅ "Auth added"
4. ✅ "API added"
5. ✅ "Deployed successfully"

Then I'll integrate it into your React app! 🚀

