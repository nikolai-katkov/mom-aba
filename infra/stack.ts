import * as cdk from 'aws-cdk-lib'
import type { Construct } from 'constructs'

export class MomAbaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Bucket 1 — App code (HTML, JS, CSS). Small payload, deployed via Lambda.
    const siteBucket = new cdk.aws_s3.Bucket(this, 'SiteBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL,
      encryption: cdk.aws_s3.BucketEncryption.S3_MANAGED,
    })

    // Bucket 2 — Media assets (videos, vocabulary images). Synced via aws s3 sync, no Lambda.
    const mediaBucket = new cdk.aws_s3.Bucket(this, 'MediaBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL,
      encryption: cdk.aws_s3.BucketEncryption.S3_MANAGED,
    })

    const siteOrigin = cdk.aws_cloudfront_origins.S3BucketOrigin.withOriginAccessControl(siteBucket)
    const mediaOrigin =
      cdk.aws_cloudfront_origins.S3BucketOrigin.withOriginAccessControl(mediaBucket)

    const mediaBehavior: cdk.aws_cloudfront.BehaviorOptions = {
      origin: mediaOrigin,
      viewerProtocolPolicy: cdk.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      cachePolicy: cdk.aws_cloudfront.CachePolicy.CACHING_OPTIMIZED,
    }

    const distribution = new cdk.aws_cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: siteOrigin,
        viewerProtocolPolicy: cdk.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cdk.aws_cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
      additionalBehaviors: {
        '/assets/video/*': mediaBehavior,
        '/images/*': mediaBehavior,
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(0),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(0),
        },
      ],
    })

    // Deploy only code files via BucketDeployment (tiny payload, no media)
    new cdk.aws_s3_deployment.BucketDeployment(this, 'DeploySite', {
      sources: [cdk.aws_s3_deployment.Source.asset('./dist')],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'],
      memoryLimit: 128,
    })

    new cdk.CfnOutput(this, 'SiteUrl', {
      value: `https://${distribution.distributionDomainName}`,
      description: 'CloudFront distribution URL',
    })

    new cdk.CfnOutput(this, 'MediaBucketName', {
      value: mediaBucket.bucketName,
      description: 'S3 bucket for media assets (sync via aws s3 sync)',
    })

    new cdk.CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
      description: 'CloudFront distribution ID (for cache invalidation)',
    })
  }
}
