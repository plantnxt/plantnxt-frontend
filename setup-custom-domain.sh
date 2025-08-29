#!/bin/bash

# PlantNxt Custom Domain Setup Script
# This script sets up CloudFront and SSL for app.plantnxt.com

DOMAIN_NAME="app.plantnxt.com"
BUCKET_NAME="plantnxt-frontend-mvp"
REGION="ap-south-1"

echo "🌐 Setting up custom domain: $DOMAIN_NAME"

# Step 1: Create CloudFront distribution
echo "📡 Step 1: Creating CloudFront distribution..."
./setup-cloudfront.sh

if [ $? -ne 0 ]; then
    echo "❌ CloudFront setup failed"
    exit 1
fi

# Step 2: Request SSL certificate
echo "🔒 Step 2: Requesting SSL certificate..."
./setup-ssl-certificate.sh

if [ $? -ne 0 ]; then
    echo "❌ SSL certificate setup failed"
    exit 1
fi

# Step 3: Get CloudFront domain
DISTRIBUTION_ID=$(cat .cloudfront-distribution-id 2>/dev/null)
if [ -z "$DISTRIBUTION_ID" ]; then
    echo "❌ CloudFront distribution ID not found"
    exit 1
fi

CLOUDFRONT_DOMAIN=$(aws cloudfront get-distribution \
    --id $DISTRIBUTION_ID \
    --query 'Distribution.DomainName' \
    --output text)

echo ""
echo "🎉 Custom domain setup completed!"
echo ""
echo "📋 Next Steps:"
echo "1. Add DNS CNAME record:"
echo "   Type: CNAME"
echo "   Name: app"
echo "   Value: $CLOUDFRONT_DOMAIN"
echo ""
echo "2. Add SSL validation records (from the certificate setup output)"
echo ""
echo "3. Wait for DNS propagation and SSL validation"
echo ""
echo "4. Test your site:"
echo "   - CloudFront: https://$CLOUDFRONT_DOMAIN"
echo "   - Custom domain: https://$DOMAIN_NAME (after DNS setup)"
echo ""
echo "🔗 Distribution ID: $DISTRIBUTION_ID"
echo "🌐 CloudFront URL: https://$CLOUDFRONT_DOMAIN"
