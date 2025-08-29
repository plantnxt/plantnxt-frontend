#!/bin/bash

# PlantNxt SSL Certificate Status Checker

CERTIFICATE_ARN="arn:aws:acm:us-east-1:501235162113:certificate/d736bf55-f695-4e37-a5c2-22639550e076"
DOMAIN_NAME="app.plantnxt.com"

echo "🔒 Checking SSL certificate status for $DOMAIN_NAME..."
echo ""

# Get certificate status
STATUS=$(aws acm describe-certificate \
    --certificate-arn $CERTIFICATE_ARN \
    --region us-east-1 \
    --query 'Certificate.Status' \
    --output text)

echo "📋 Certificate Status: $STATUS"
echo ""

if [ "$STATUS" = "ISSUED" ]; then
    echo "✅ SSL Certificate is VALIDATED!"
    echo ""
    echo "🎉 Next Steps:"
    echo "1. Add CNAME record for custom domain:"
    echo "   Type: CNAME"
    echo "   Name: app"
    echo "   Value: dqqjlrzb16096.cloudfront.net"
    echo ""
    echo "2. Wait for DNS propagation (up to 48 hours)"
    echo "3. Test: https://$DOMAIN_NAME"
    echo ""
    echo "🌐 Your site will be accessible at:"
    echo "   https://$DOMAIN_NAME"
elif [ "$STATUS" = "PENDING_VALIDATION" ]; then
    echo "⏳ SSL Certificate is still PENDING VALIDATION"
    echo ""
    echo "📋 Validation Details:"
    aws acm describe-certificate \
        --certificate-arn $CERTIFICATE_ARN \
        --region us-east-1 \
        --query 'Certificate.DomainValidationOptions[0].ResourceRecord' \
        --output table
    echo ""
    echo "🔍 DNS Record Check:"
    nslookup _84b3fb2fd17942a1a264bab6cccce63b.app.plantnxt.com
    echo ""
    echo "⏰ Validation usually takes 5-30 minutes after DNS is set up correctly."
    echo "   Run this script again in a few minutes: ./check-ssl-status.sh"
else
    echo "❌ Certificate Status: $STATUS"
    echo "   Please check the certificate details in AWS Console."
fi
