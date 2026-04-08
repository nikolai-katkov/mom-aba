# AWS Setup Guide

Everything you need before running `npm run deploy`.

## 1. Create a Managed Account via AWS Organizations

You already have a personal root AWS account. Create a dedicated member account for this project:

1. Sign in to your root account at https://console.aws.amazon.com
2. Go to **AWS Organizations** (create the organization if you haven't already)
3. Click **Add an AWS account** > **Create an AWS account**
4. Account name: `neuron` (or whatever you prefer)
5. Email: use a `+` alias like `you+neuron@gmail.com` (must be unique across all AWS accounts)
6. Wait a few minutes for the account to be created

## 2. Set Up Access to the New Account

### Option A: IAM Identity Center (Recommended)

1. Go to **IAM Identity Center** (in the management account)
2. Enable it if not already enabled
3. Create a user for yourself (or use the existing one)
4. Create a permission set with `AdministratorAccess` (scope down later)
5. Assign yourself to the new `neuron` account with that permission set
6. Configure the CLI:

```bash
aws configure sso
```

Enter:

- SSO session name: `neuron`
- SSO start URL: (from IAM Identity Center settings)
- SSO region: `eu-central-1`
- Choose the `neuron` account and `AdministratorAccess` role
- CLI default region: `eu-central-1`
- CLI default output: `json`
- CLI profile name: `neuron`

Then log in:

```bash
aws sso login --profile neuron
```

Set it as default for this project:

```bash
export AWS_PROFILE=neuron
```

### Option B: Assume Role with Access Keys

1. In the management (root) account, create an IAM user with access keys
2. In the new `neuron` account, note the `OrganizationAccountAccessRole` that was created automatically
3. Add this to `~/.aws/config`:

```ini
[profile neuron]
role_arn = arn:aws:iam::NEURON_ACCOUNT_ID:role/OrganizationAccountAccessRole
source_profile = default
region = eu-central-1
output = json
```

Replace `NEURON_ACCOUNT_ID` with the 12-digit ID of the new member account.

## 3. Verify Access

```bash
aws sts get-caller-identity --profile neuron
```

You should see the `neuron` account ID (not your root account ID).

## 4. Bootstrap CDK

CDK needs a one-time bootstrap to create its staging resources (S3 bucket, IAM roles):

```bash
npx cdk bootstrap aws://NEURON_ACCOUNT_ID/eu-central-1 --profile neuron
```

Replace `NEURON_ACCOUNT_ID` with the 12-digit number from the previous step.

## 5. Deploy

```bash
export AWS_PROFILE=neuron
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

**"Unable to resolve AWS account"** -- Run `aws sts get-caller-identity --profile neuron` to verify credentials are configured.

**"Token has expired"** -- Re-authenticate with `aws sso login --profile neuron`.

**"CDKToolkit stack not found"** -- You need to bootstrap first (step 4).

**"Access Denied"** -- The IAM role/permission set is missing permissions. Use `AdministratorAccess` for now.

**Deploy succeeds but site shows "Access Denied"** -- Wait a few minutes for CloudFront to propagate, then hard-refresh.
