#!/bin/bash

# PlantNxt SSL Certificate Setup Script

DOMAIN_NAME="app.plantnxt.com"
REGION="us-east-1"  # ACM certificates for CloudFront must be in us-east-1

echo "🔒 Setting up SSL certificate for $DOMAIN_NAME..."

# 1. Request SSL certificate
echo "📜 Requesting SSL certificate..."

CERTIFICATE_ARN=$(aws acm request-certificate \
    --domain-name $DOMAIN_NAME \
    --validation-method DNS \
    --region $REGION \
    --query 'CertificateArn' \
    --output text)

if [ $? -eq 0 ]; then
    echo "✅ SSL certificate requested: $CERTIFICATE_ARN"
else
    echo "❌ Failed to request SSL certificate"
    exit 1
fi

# 2. Get validation records
echo "🔍 Getting DNS validation records..."

VALIDATION_RECORDS=$(aws acm describe-certificate \
    --certificate-arn $CERTIFICATE_ARN \
    --region $REGION \
    --query 'Certificate.DomainValidationOptions[0].ResourceRecord')

echo "📋 DNS Validation Records:"
echo "$VALIDATION_RECORDS"

# 3. Save certificate ARN for future use
echo $CERTIFICATE_ARN > .ssl-certificate-arn

echo ""
echo "🎉 SSL certificate setup completed!"
echo "📋 Next steps:"
echo "1. Add the DNS validation records to your domain registrar"
echo "2. Wait for certificate validation (can take 5-30 minutes)"
echo "3. Run: aws acm describe-certificate --certificate-arn $CERTIFICATE_ARN --region $REGION"
echo "4. Check status: aws acm list-certificates --region $REGION"
echo ""
echo "🔗 Certificate ARN: $CERTIFICATE_ARN"
