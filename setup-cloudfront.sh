#!/bin/bash

# PlantNxt CloudFront Setup Script for Custom Domain

BUCKET_NAME="plantnxt-frontend-mvp"
DOMAIN_NAME="app.plantnxt.com"
REGION="ap-south-1"

echo "🌐 Setting up CloudFront distribution for $DOMAIN_NAME..."

# 1. Create CloudFront distribution
echo "📡 Creating CloudFront distribution..."

DISTRIBUTION_CONFIG=$(cat <<EOF
{
    "CallerReference": "$(date +%s)",
    "Comment": "PlantNxt Frontend Distribution",
    "DefaultRootObject": "index.html",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-$BUCKET_NAME",
                "DomainName": "$BUCKET_NAME.s3-website.$REGION.amazonaws.com",
                "CustomOriginConfig": {
                    "HTTPPort": 80,
                    "HTTPSPort": 443,
                    "OriginProtocolPolicy": "http-only"
                }
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-$BUCKET_NAME",
        "ViewerProtocolPolicy": "redirect-to-https",
        "TrustedSigners": {
            "Enabled": false,
            "Quantity": 0
        },
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {
                "Forward": "none"
            }
        },
        "MinTTL": 0,
        "DefaultTTL": 86400,
        "MaxTTL": 31536000
    },
    "CustomErrorResponses": {
        "Quantity": 2,
        "Items": [
            {
                "ErrorCode": 403,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 0
            },
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 0
            }
        ]
    },
    "Enabled": true,
    "PriceClass": "PriceClass_100"
}
EOF
)

# Create the distribution
DISTRIBUTION_ID=$(aws cloudfront create-distribution \
    --distribution-config "$DISTRIBUTION_CONFIG" \
    --query 'Distribution.Id' \
    --output text)

if [ $? -eq 0 ]; then
    echo "✅ CloudFront distribution created: $DISTRIBUTION_ID"
else
    echo "❌ Failed to create CloudFront distribution"
    exit 1
fi

# 2. Get the CloudFront domain name
CLOUDFRONT_DOMAIN=$(aws cloudfront get-distribution \
    --id $DISTRIBUTION_ID \
    --query 'Distribution.DomainName' \
    --output text)

echo "🌐 CloudFront domain: $CLOUDFRONT_DOMAIN"

# 3. Save distribution ID to file for future use
echo $DISTRIBUTION_ID > .cloudfront-distribution-id

echo ""
echo "🎉 CloudFront setup completed!"
echo "📋 Next steps:"
echo "1. Request SSL certificate in ACM for $DOMAIN_NAME"
echo "2. Update DNS to point $DOMAIN_NAME to $CLOUDFRONT_DOMAIN"
echo "3. Update CloudFront distribution with custom domain"
echo ""
echo "🔗 Distribution ID: $DISTRIBUTION_ID"
echo "🌐 CloudFront URL: https://$CLOUDFRONT_DOMAIN"
