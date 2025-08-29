# DNS Setup Guide for app.plantnxt.com

## Overview

This guide will help you configure DNS records to point `app.plantnxt.com` to your CloudFront distribution.

## Step 1: Get CloudFront Distribution Domain

After running the CloudFront setup script, you'll get a domain like:

```
d1234567890abc.cloudfront.net
```

## Step 2: Configure DNS Records

### Option A: Using CNAME Record (Recommended)

Add this CNAME record in your domain registrar's DNS settings:

| Type  | Name | Value                         |
| ----- | ---- | ----------------------------- |
| CNAME | app  | d1234567890abc.cloudfront.net |

### Option B: Using A Record with Alias (if supported)

| Type | Name | Value                                 |
| ---- | ---- | ------------------------------------- |
| A    | app  | d1234567890abc.cloudfront.net (Alias) |

## Step 3: SSL Certificate Validation

When you run the SSL certificate setup script, you'll get DNS validation records like:

| Type  | Name                  | Value                        |
| ----- | --------------------- | ---------------------------- |
| CNAME | \_abc123.plantnxt.com | \_def456.acm-validations.aws |

Add these validation records to your DNS.

## Step 4: Verify Setup

1. **Check DNS propagation** (can take up to 48 hours):

   ```bash
   nslookup app.plantnxt.com
   ```

2. **Test HTTPS access**:

   ```bash
   curl -I https://app.plantnxt.com
   ```

3. **Check SSL certificate**:
   ```bash
   openssl s_client -connect app.plantnxt.com:443 -servername app.plantnxt.com
   ```

## Common DNS Providers

### Cloudflare

1. Go to DNS settings
2. Add CNAME record: `app` → `your-cloudfront-domain.cloudfront.net`
3. Enable "Proxy status" for HTTPS

### GoDaddy

1. Go to DNS Management
2. Add CNAME record: `app` → `your-cloudfront-domain.cloudfront.net`

### Namecheap

1. Go to Advanced DNS
2. Add CNAME record: `app` → `your-cloudfront-domain.cloudfront.net`

### Route 53

1. Create hosted zone for `plantnxt.com`
2. Add CNAME record: `app` → `your-cloudfront-domain.cloudfront.net`

## Troubleshooting

### DNS Not Resolving

- Wait for DNS propagation (up to 48 hours)
- Check if CNAME record is correct
- Verify domain registrar settings

### SSL Certificate Issues

- Ensure validation records are added to DNS
- Wait for certificate validation (5-30 minutes)
- Check certificate status in AWS ACM

### CloudFront Not Working

- Verify CloudFront distribution is enabled
- Check origin configuration
- Ensure S3 bucket is accessible
