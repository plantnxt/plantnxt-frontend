#!/bin/bash

# PlantNxt CloudFront Custom Domain Update Script

DISTRIBUTION_ID="E3MDQB8GQ3EHOC"
DOMAIN_NAME="app.plantnxt.com"
BUCKET_NAME="plantnxt-frontend-mvp"
REGION="ap-south-1"

echo "🌐 Updating CloudFront distribution with custom domain: $DOMAIN_NAME"

# Get current distribution config
echo "📋 Getting current distribution configuration..."
aws cloudfront get-distribution-config --id $DISTRIBUTION_ID > /tmp/distribution-config.json

if [ $? -ne 0 ]; then
    echo "❌ Failed to get distribution configuration"
    exit 1
fi

# Extract ETag
ETAG=$(cat /tmp/distribution-config.json | jq -r '.ETag')

# Check if we have a valid SSL certificate
CERT_ARN=$(aws acm list-certificates --region us-east-1 --query "CertificateSummaryList[?DomainName=='$DOMAIN_NAME' && Status=='ISSUED'].CertificateArn" --output text)

if [ -z "$CERT_ARN" ]; then
    echo "❌ No valid SSL certificate found for $DOMAIN_NAME"
    echo "   Please ensure the SSL certificate is validated first."
    exit 1
fi

echo "✅ Found SSL certificate: $CERT_ARN"

# Update the configuration with custom domain
echo "🔧 Updating configuration with custom domain..."

# Create updated config - extract only the DistributionConfig part and remove default certificate
jq --arg domain "$DOMAIN_NAME" --arg cert_arn "$CERT_ARN" '
    .DistributionConfig |
    .Aliases.Items = [$domain] |
    .Aliases.Quantity = 1 |
    .ViewerCertificate.ACMCertificateArn = $cert_arn |
    .ViewerCertificate.SSLSupportMethod = "sni-only" |
    .ViewerCertificate.MinimumProtocolVersion = "TLSv1.2_2021" |
    .ViewerCertificate.CertificateSource = "acm" |
    del(.ViewerCertificate.CloudFrontDefaultCertificate)
' /tmp/distribution-config.json > /tmp/final-config.json

# Update the distribution
echo "🚀 Updating CloudFront distribution..."
aws cloudfront update-distribution \
    --id $DISTRIBUTION_ID \
    --distribution-config file:///tmp/final-config.json \
    --if-match $ETAG

if [ $? -eq 0 ]; then
    echo "✅ CloudFront distribution updated successfully!"
    echo ""
    echo "🌐 Your site will be accessible at:"
    echo "   https://$DOMAIN_NAME"
    echo ""
    echo "⏰ Distribution update takes 5-15 minutes to deploy globally."
    echo "   You can monitor progress in the AWS Console."
else
    echo "❌ Failed to update CloudFront distribution"
    exit 1
fi

# Clean up
rm -f /tmp/distribution-config.json /tmp/final-config.json
