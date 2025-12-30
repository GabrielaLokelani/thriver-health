# AWS IAM Setup Guide for Local Development

This guide will help you set up AWS credentials for running the Amplify backend locally.

## Prerequisites

1. **AWS Account Access**: You need access to the AWS account where the Amplify backend will be deployed
2. **IAM Permissions**: Someone with admin access needs to create an IAM user for you

## Step 1: Create IAM User in AWS Console

### Option A: If you have AWS Console access

1. Go to [AWS IAM Console](https://console.aws.amazon.com/iam/)
2. Click **Users** → **Create user**
3. Enter username: `thriver-dev-local` (or your preferred name)
4. Select **Provide user access to the AWS Management Console** (optional, for console access)
5. Click **Next**

### Option B: Request IAM User from GabrielaLokelani

If you don't have AWS Console access, ask GabrielaLokelani to:
1. Create an IAM user for you
2. Attach the following policies:
   - `AmplifyBackendDeploy-full-access` (if exists)
   - OR attach these managed policies:
     - `AWSAmplifyServiceRolePolicy`
     - `AmazonCognitoPowerUser` (for Auth)
     - `AmazonDynamoDBFullAccess` (for Data)
     - `AmazonS3FullAccess` (for Storage, if needed)
   - OR create a custom policy with these permissions (see below)

### Required IAM Permissions

The IAM user needs these permissions for Amplify Gen 2 development:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "amplify:*",
        "cognito-idp:*",
        "cognito-identity:*",
        "dynamodb:*",
        "s3:*",
        "iam:*",
        "lambda:*",
        "apigateway:*",
        "appsync:*",
        "cloudformation:*",
        "logs:*"
      ],
      "Resource": "*"
    }
  ]
}
```

**Note**: For production, restrict these permissions to specific resources. This is for local development only.

## Step 2: Create Access Keys

1. In IAM Console, select your user
2. Go to **Security credentials** tab
3. Scroll to **Access keys** section
4. Click **Create access key**
5. Choose **Command Line Interface (CLI)**
6. Click **Next** → **Create access key**
7. **IMPORTANT**: Download the CSV file or copy:
   - **Access Key ID**
   - **Secret Access Key**

⚠️ **Security Warning**: Never commit these keys to git! They will be stored locally only.

## Step 3: Install AWS CLI

### macOS (using Homebrew)
```bash
brew install awscli
```

### macOS (using installer)
```bash
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

### Verify installation
```bash
aws --version
```

## Step 4: Configure AWS Credentials

Run this command and enter your credentials when prompted:

```bash
aws configure
```

You'll be asked for:
1. **AWS Access Key ID**: [Paste your Access Key ID]
2. **AWS Secret Access Key**: [Paste your Secret Access Key]
3. **Default region name**: `us-east-1` (or your preferred region)
4. **Default output format**: `json`

This creates:
- `~/.aws/credentials` (your access keys)
- `~/.aws/config` (region and output format)

## Step 5: Verify Configuration

Test your credentials:

```bash
aws sts get-caller-identity
```

You should see your IAM user ARN and account ID.

## Step 6: Set Up Amplify Sandbox

Navigate to your project directory:

```bash
cd /Users/kriskadzielawa/Desktop/thriver-health/altmed
```

Initialize Amplify (if not already done):

```bash
npx ampx sandbox
```

This will:
- Create a local Amplify backend
- Generate `amplify_outputs.json` in your project root
- Start a local development environment

## Step 7: Configure Environment Variables (Optional)

You can also set AWS credentials as environment variables:

```bash
export AWS_ACCESS_KEY_ID=your-access-key-id
export AWS_SECRET_ACCESS_KEY=your-secret-access-key
export AWS_DEFAULT_REGION=us-east-1
```

Add to your `~/.zshrc` or `~/.bash_profile` for persistence:

```bash
echo 'export AWS_ACCESS_KEY_ID=your-access-key-id' >> ~/.zshrc
echo 'export AWS_SECRET_ACCESS_KEY=your-secret-access-key' >> ~/.zshrc
echo 'export AWS_DEFAULT_REGION=us-east-1' >> ~/.zshrc
source ~/.zshrc
```

## Troubleshooting

### Permission Denied Errors
- Verify IAM user has correct policies attached
- Check that access keys are correct
- Ensure region matches where resources are deployed

### Amplify Sandbox Issues
- Make sure AWS CLI is configured: `aws configure list`
- Check AWS credentials: `aws sts get-caller-identity`
- Verify you have permissions for Amplify, Cognito, and DynamoDB

### Multiple AWS Accounts
If you work with multiple AWS accounts, use named profiles:

```bash
aws configure --profile thriver-dev
```

Then use:
```bash
export AWS_PROFILE=thriver-dev
npx ampx sandbox
```

## Security Best Practices

1. ✅ **Never commit** `~/.aws/credentials` or `amplify_outputs.json` to git
2. ✅ **Rotate access keys** regularly (every 90 days)
3. ✅ **Use least privilege** - only grant necessary permissions
4. ✅ **Use IAM roles** in production instead of access keys when possible
5. ✅ **Enable MFA** on your IAM user if console access is enabled

## Next Steps

Once configured:
1. Run `npx ampx sandbox` to start local backend
2. The `amplify_outputs.json` file will be generated automatically
3. Your frontend will connect to the local Amplify backend
4. Test authentication, data operations, etc.

## Need Help?

- [AWS CLI Documentation](https://docs.aws.amazon.com/cli/)
- [Amplify Gen 2 Documentation](https://docs.amplify.aws/)
- [IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)

