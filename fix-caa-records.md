# 🔧 Fix CAA Records for Amazon SSL Certificate

## 🚨 Problem Identified

Your SSL certificate validation failed because your domain `plantnxt.com` has CAA (Certificate Authority Authorization) records that **don't allow Amazon** to issue certificates.

## 📋 Current CAA Records

Your domain currently allows these certificate authorities:

- `letsencrypt.org`
- `sectigo.com`
- `comodoca.com`
- `digicert.com`
- `pki.goog`
- `globalsign.com`

**❌ Amazon/ACM is NOT allowed**

## 🔧 Solution: Add Amazon to CAA Records

### Step 1: Add Amazon CAA Records

Go to your domain registrar's DNS settings and add these CAA records:

| Type | Name           | Value                      |
| ---- | -------------- | -------------------------- |
| CAA  | `plantnxt.com` | `0 issue "amazon.com"`     |
| CAA  | `plantnxt.com` | `0 issuewild "amazon.com"` |

### Step 2: Wait for DNS Propagation

CAA record changes can take up to 24 hours to propagate globally.

### Step 3: Request New SSL Certificate

After adding the CAA records, run:

```bash
./setup-ssl-certificate.sh
```

## 🌐 Domain Registrar Instructions

### Cloudflare

1. Go to DNS settings
2. Add CAA record: `plantnxt.com` → `0 issue "amazon.com"`
3. Add CAA record: `plantnxt.com` → `0 issuewild "amazon.com"`

### GoDaddy

1. Go to DNS Management
2. Add CAA record: `plantnxt.com` → `0 issue "amazon.com"`
3. Add CAA record: `plantnxt.com` → `0 issuewild "amazon.com"`

### Namecheap

1. Go to Advanced DNS
2. Add CAA record: `plantnxt.com` → `0 issue "amazon.com"`
3. Add CAA record: `plantnxt.com` → `0 issuewild "amazon.com"`

### Route 53

1. Go to Hosted Zones → `plantnxt.com`
2. Create Record: CAA → `plantnxt.com` → `0 issue "amazon.com"`
3. Create Record: CAA → `plantnxt.com` → `0 issuewild "amazon.com"`

## 🔍 Verify CAA Records

After adding the records, verify with:

```bash
dig CAA plantnxt.com
```

You should see `amazon.com` in the results.

## 📊 Current Status

- ✅ **S3 Bucket**: Working
- ✅ **CloudFront**: Working
- ❌ **SSL Certificate**: Failed (CAA restriction)
- ⏳ **Custom Domain**: Waiting for SSL

## 🎯 Next Steps

1. **Add Amazon CAA records** to your domain
2. **Wait for DNS propagation** (up to 24 hours)
3. **Request new SSL certificate**
4. **Add custom domain CNAME**
5. **Test https://app.plantnxt.com**
