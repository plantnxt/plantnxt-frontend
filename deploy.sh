#!/bin/bash

# PlantNxt Frontend Deployment Script
# This script builds, deploys to S3, and invalidates CloudFront cache

BUCKET_NAME="plantnxt-frontend-mvp"
DISTRIBUTION_ID="E3MDQB8GQ3EHOC"
REGION="ap-south-1"

echo "🚀 Starting PlantNxt Frontend Deployment..."
echo ""

# Step 1: Build the project
echo "📦 Step 1: Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix the errors and try again."
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""

# Step 2: Deploy to S3
echo "☁️  Step 2: Deploying to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete --region $REGION

if [ $? -ne 0 ]; then
    echo "❌ S3 deployment failed!"
    exit 1
fi

echo "✅ S3 deployment completed successfully!"
echo ""

# Step 3: Invalidate CloudFront cache
echo "🔄 Step 3: Invalidating CloudFront cache..."
INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*" \
    --query 'Invalidation.Id' \
    --output text)

if [ $? -ne 0 ]; then
    echo "❌ CloudFront invalidation failed!"
    exit 1
fi

echo "✅ CloudFront invalidation created: $INVALIDATION_ID"
echo ""

# Step 4: Show deployment summary
echo "🎉 Deployment completed successfully!"
echo ""
echo "📊 Deployment Summary:"
echo "   - S3 Bucket: $BUCKET_NAME"
echo "   - CloudFront Distribution: $DISTRIBUTION_ID"
echo "   - Invalidation ID: $INVALIDATION_ID"
echo ""
echo "🌐 Your sites:"
echo "   - S3 Direct: http://$BUCKET_NAME.s3-website.$REGION.amazonaws.com"
echo "   - CloudFront: https://dqqjlrzb16096.cloudfront.net"
echo "   - Custom Domain: https://app.plantnxt.com"
echo ""
echo "⏰ Cache invalidation takes 5-15 minutes to complete globally."
echo "   You can monitor progress in the AWS Console."
echo ""
echo "🔗 Monitor invalidation:"
echo "   aws cloudfront get-invalidation --distribution-id $DISTRIBUTION_ID --id $INVALIDATION_ID"
