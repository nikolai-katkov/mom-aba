# AWS Setup Guide

Everything you need before running `npm run deploy`.

## 1. Create an AWS Account

1. Go to https://aws.amazon.com and create an account
2. Enable MFA on the root account (Security Credentials > MFA)

## 2. Create an IAM User for Deployment

1. Go to IAM > Users > Create user
2. Name: `neuron-deploy` (or whatever you prefer)
3. Attach policy: `AdministratorAccess` (simplest for CDK bootstrap; scope down later)
4. Create access key: Use case "Command Line Interface (CLI)"
5. Save the Access Key ID and Secret Access Key

## 3. Install and Configure AWS CLI

Install AWS CLI v2:

```bash
# macOS
brew install awscli

# Or download from https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
```

Configure credentials:

```bash
aws configure
```

Enter:

- AWS Access Key ID: (from step 2)
- AWS Secret Access Key: (from step 2)
- Default region: `eu-central-1`
- Default output format: `json`

Verify:

```bash
aws sts get-caller-identity
```

You should see your account ID and IAM user ARN.

## 4. Bootstrap CDK

CDK needs a one-time bootstrap to create its staging resources (S3 bucket, IAM roles):

```bash
npx cdk bootstrap aws://YOUR_ACCOUNT_ID/eu-central-1
```

Replace `YOUR_ACCOUNT_ID` with the 12-digit number from `aws sts get-caller-identity`.

## 5. Deploy

```bash
npm run deploy
```

This runs: lint > test > build > cdk deploy.

On success, the terminal prints the CloudFront URL. Share it with your customer.

## 6. Useful Commands

```bash
npm run cdk:diff    # Preview what will change before deploying
npm run cdk:synth   # Generate CloudFormation template without deploying
npm run destroy     # Tear down all AWS resources
```

## Troubleshooting

**"Unable to resolve AWS account"** — Run `aws sts get-caller-identity` to verify credentials are configured.

**"CDKToolkit stack not found"** — You need to bootstrap first (step 4).

**"Access Denied"** — The IAM user is missing permissions. Use `AdministratorAccess` for now.

**Deploy succeeds but site shows "Access Denied"** — Wait a few minutes for CloudFront to propagate, then hard-refresh.
