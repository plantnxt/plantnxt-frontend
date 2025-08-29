#!/bin/bash

# PlantNxt Deployment Status Checker

BUCKET_NAME="plantnxt-frontend-mvp"
DISTRIBUTION_ID="E3MDQB8GQ3EHOC"
REGION="ap-south-1"

echo "🔍 Checking PlantNxt Deployment Status..."
echo ""

# Check S3 bucket
echo "📦 S3 Bucket Status:"
aws s3 ls s3://$BUCKET_NAME/ --recursive --summarize | grep "Total Objects"
echo ""

# Check CloudFront distribution status
echo "🌐 CloudFront Distribution Status:"
aws cloudfront get-distribution --id $DISTRIBUTION_ID --query 'Distribution.Status' --output text
echo ""

# Check recent invalidations
echo "🔄 Recent CloudFront Invalidations:"
aws cloudfront list-invalidations --distribution-id $DISTRIBUTION_ID --max-items 3 --query 'InvalidationList.Items[0:3].{Id:Id,Status:Status,CreateTime:CreateTime}' --output table
echo ""

# Test site accessibility
echo "🌐 Site Accessibility Test:"
echo "   - S3 Direct: $(curl -s -o /dev/null -w "%{http_code}" http://$BUCKET_NAME.s3-website.$REGION.amazonaws.com)"
echo "   - CloudFront: $(curl -s -o /dev/null -w "%{http_code}" https://dqqjlrzb16096.cloudfront.net)"
echo "   - Custom Domain: $(curl -s -o /dev/null -w "%{http_code}" https://app.plantnxt.com)"
echo ""

echo "📊 Status Summary:"
echo "   - S3: http://$BUCKET_NAME.s3-website.$REGION.amazonaws.com"
echo "   - CloudFront: https://dqqjlrzb16096.cloudfront.net"
echo "   - Custom Domain: https://app.plantnxt.com"
