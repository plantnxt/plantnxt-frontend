#!/bin/bash

# PlantNxt Custom Domain Test Script

DOMAIN="app.plantnxt.com"
CLOUDFRONT_DOMAIN="dqqjlrzb16096.cloudfront.net"

echo "🌐 Testing PlantNxt Custom Domain: $DOMAIN"
echo ""

# Test 1: Local DNS
echo "📋 Test 1: Local DNS Resolution"
nslookup $DOMAIN
echo ""

# Test 2: Google DNS
echo "📋 Test 2: Google DNS (8.8.8.8)"
nslookup $DOMAIN 8.8.8.8
echo ""

# Test 3: Cloudflare DNS
echo "📋 Test 3: Cloudflare DNS (1.1.1.1)"
nslookup $DOMAIN 1.1.1.1
echo ""

# Test 4: Direct CloudFront access
echo "📋 Test 4: Direct CloudFront Access"
curl -I https://$CLOUDFRONT_DOMAIN
echo ""

# Test 5: Custom domain with forced IP
echo "📋 Test 5: Custom Domain with Forced IP (Google DNS)"
curl -I --resolve $DOMAIN:443:3.164.182.52 https://$DOMAIN
echo ""

echo "🎯 If Test 5 works but others don't, it's a DNS propagation issue."
echo "   The site will be accessible once DNS propagates globally."
echo ""
echo "🌐 Working URLs:"
echo "   - CloudFront: https://$CLOUDFRONT_DOMAIN"
echo "   - Custom Domain: https://$DOMAIN (after DNS propagation)"
