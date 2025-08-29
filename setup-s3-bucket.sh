#!/bin/bash

# PlantNxt S3 Bucket Setup Script

BUCKET_NAME="plantnxt-frontend-mvp"
REGION="us-east-1"

echo "🔧 Setting up S3 bucket: $BUCKET_NAME"

# 1. Configure bucket for static website hosting
echo "📝 Configuring static website hosting..."
aws s3api put-bucket-website \
    --bucket $BUCKET_NAME \
    --website-configuration '{
        "IndexDocument": {"Suffix": "index.html"},
        "ErrorDocument": {"Key": "index.html"}
    }' \
    --region $REGION

if [ $? -eq 0 ]; then
    echo "✅ Static website hosting configured!"
else
    echo "❌ Failed to configure static website hosting"
    exit 1
fi

# 2. Apply bucket policy for public read access
echo "🔐 Applying bucket policy..."
aws s3api put-bucket-policy \
    --bucket $BUCKET_NAME \
    --policy file://bucket-policy.json \
    --region $REGION

if [ $? -eq 0 ]; then
    echo "✅ Bucket policy applied!"
else
    echo "❌ Failed to apply bucket policy"
    exit 1
fi

# 3. Configure CORS for SPA routing (optional)
echo "🌐 Configuring CORS..."
aws s3api put-bucket-cors \
    --bucket $BUCKET_NAME \
    --cors-configuration file://cors-config.json \
    --region $REGION

if [ $? -eq 0 ]; then
    echo "✅ CORS configured!"
else
    echo "⚠️  CORS configuration failed (continuing anyway)"
fi

# 4. Get website endpoint
echo "🌍 Getting website endpoint..."
WEBSITE_ENDPOINT=$(aws s3api get-bucket-website --bucket $BUCKET_NAME --region $REGION --query 'WebsiteEndpoint' --output text)

echo "🎉 S3 bucket setup completed!"
echo "🌐 Website endpoint: http://$WEBSITE_ENDPOINT"
echo ""
echo "📋 Next steps:"
echo "1. Run: npm run deploy:s3"
echo "2. Visit: http://$WEBSITE_ENDPOINT"
echo "3. Set up CloudFront for HTTPS (optional)"
