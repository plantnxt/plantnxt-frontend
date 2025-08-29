#!/bin/bash

# PlantNxt Frontend S3 Deployment Script

# Configuration
BUCKET_NAME="plantnxt-frontend-mvp"
REGION="us-east-1"
DISTRIBUTION_ID="your-cloudfront-distribution-id"

echo "🚀 Deploying PlantNxt Frontend to AWS S3..."

# Build the application
echo "📦 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"

# Deploy to S3
echo "☁️  Uploading to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete --region $REGION

if [ $? -ne 0 ]; then
    echo "❌ S3 upload failed!"
    exit 1
fi

echo "✅ S3 upload completed!"

# Invalidate CloudFront cache (if distribution ID is provided)
if [ ! -z "$DISTRIBUTION_ID" ]; then
    echo "🔄 Invalidating CloudFront cache..."
    aws cloudfront create-invalidation \
        --distribution-id $DISTRIBUTION_ID \
        --paths "/*" \
        --region $REGION

    if [ $? -eq 0 ]; then
        echo "✅ CloudFront cache invalidated!"
    else
        echo "⚠️  CloudFront invalidation failed, but deployment succeeded"
    fi
fi

echo "🎉 Deployment completed successfully!"
echo "🌐 Your app should be available at: https://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
echo "🔗 Or your custom domain if configured"
