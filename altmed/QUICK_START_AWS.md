# Quick Start: AWS Setup for Local Development

## Immediate Next Steps

### 1. Install AWS CLI

Since Homebrew isn't installed, use the macOS installer:

```bash
# Download AWS CLI
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "/tmp/AWSCLIV2.pkg"

# Install it
sudo installer -pkg /tmp/AWSCLIV2.pkg -target /

# Verify installation
aws --version
```

### 2. Get IAM Credentials

**Option A: If you have AWS Console access**
1. Go to https://console.aws.amazon.com/iam/
2. Create a new IAM user (see AWS_SETUP_GUIDE.md for details)
3. Create access keys for the user

**Option B: Request from GabrielaLokelani**
Ask them to:
1. Create an IAM user named `thriver-dev-local` (or similar)
2. Attach Amplify/Cognito/DynamoDB permissions
3. Create access keys and share them securely

### 3. Configure AWS Credentials

Once you have access keys:

```bash
aws configure
```

Enter:
- Access Key ID
- Secret Access Key  
- Region: `us-east-1` (or your preferred region)
- Output format: `json`

### 4. Test Configuration

```bash
aws sts get-caller-identity
```

Should return your IAM user details.

### 5. Start Amplify Sandbox

```bash
cd /Users/kriskadzielawa/Desktop/thriver-health/altmed
npx ampx sandbox
```

This will:
- Create local Amplify backend
- Generate `amplify_outputs.json`
- Start development environment

## What You Need from GabrielaLokelani

If you don't have AWS Console access, ask for:

1. **IAM User** with these permissions:
   - Amplify (full access)
   - Cognito (for authentication)
   - DynamoDB (for data storage)
   - CloudFormation (for infrastructure)

2. **Access Keys**:
   - Access Key ID
   - Secret Access Key

3. **AWS Account Region** (usually `us-east-1`)

## Security Reminder

⚠️ **Never commit these to git:**
- `~/.aws/credentials`
- `amplify_outputs.json`
- Any `.env` files with AWS keys

They're already in `.gitignore`, but double-check!

## Full Documentation

See `AWS_SETUP_GUIDE.md` for detailed instructions.

