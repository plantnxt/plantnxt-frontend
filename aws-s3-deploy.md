# AWS S3 Deployment Guide

## Prerequisites

1. **AWS CLI installed and configured**
2. **S3 bucket created** with proper permissions
3. **CloudFront distribution** (optional, for CDN)

## Quick Deployment

### 1. Build and Deploy

```bash
# Build the application
npm run build

# Deploy to S3
npm run deploy:s3
```

### 2. Manual Deployment

```bash
# Build
npm run build

# Sync to S3 (replace with your bucket name)
aws s3 sync dist/ s3://your-bucket-name --delete

# Optional: Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## S3 Bucket Configuration

### 1. Create S3 Bucket

```bash
aws s3 mb s3://your-bucket-name
```

### 2. Configure for Static Website Hosting

```bash
aws s3 website s3://your-bucket-name --index-document index.html --error-document index.html
```

### 3. Set Bucket Policy for Public Read

```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "PublicReadGetObject",
			"Effect": "Allow",
			"Principal": "*",
			"Action": "s3:GetObject",
			"Resource": "arn:aws:s3:::your-bucket-name/*"
		}
	]
}
```

### 4. Enable CORS (if needed)

```json
[
	{
		"AllowedHeaders": ["*"],
		"AllowedMethods": ["GET"],
		"AllowedOrigins": ["*"],
		"ExposeHeaders": []
	}
]
```

## CloudFront Setup (Recommended)

### 1. Create CloudFront Distribution

- **Origin Domain**: Your S3 bucket
- **Viewer Protocol Policy**: Redirect HTTP to HTTPS
- **Default Root Object**: index.html
- **Error Pages**: Redirect 403/404 to index.html (for SPA routing)

### 2. Custom Domain (Optional)

- **SSL Certificate**: Request via ACM
- **Alternate Domain Names**: your-domain.com, www.your-domain.com

## Environment Variables

Create `.env.production` for production builds:

```env
VITE_API_URL=https://api.plantnxt.com
VITE_APP_ENV=production
```

## GitHub Actions (Optional)

Add to `.github/workflows/deploy.yml`:

```yaml
- name: Deploy to S3
  run: |
    aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} --delete
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    AWS_DEFAULT_REGION: us-east-1
```

## Troubleshooting

### Common Issues

1. **403 Forbidden**: Check bucket policy and CORS settings
2. **404 on refresh**: Configure CloudFront error pages
3. **Build errors**: Ensure all dependencies are installed

### Useful Commands

```bash
# List bucket contents
aws s3 ls s3://your-bucket-name

# Check bucket policy
aws s3api get-bucket-policy --bucket your-bucket-name

# Test website endpoint
curl http://your-bucket-name.s3-website-region.amazonaws.com
```
