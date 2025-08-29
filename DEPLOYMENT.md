# PlantNxt Frontend Deployment Guide

## Domain: app.plantnxt.com

### Prerequisites

- Domain `plantnxt.com` registered and DNS access
- Web server (nginx/Apache) with SSL support
- Node.js 18+ for building

### Quick Deployment

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Upload to server:**

   - Upload contents of `./dist/` to your web server
   - Place files in `/var/www/app.plantnxt.com/` (or your preferred directory)

3. **Configure DNS:**

   - Add A record: `app.plantnxt.com` → Your server IP
   - Or CNAME: `app.plantnxt.com` → `your-server.com`

4. **Configure Web Server:**

   - Use the provided `nginx.conf` as a template
   - Update SSL certificate paths
   - Restart nginx: `sudo systemctl restart nginx`

5. **SSL Certificate:**
   ```bash
   # Using Let's Encrypt (recommended)
   sudo certbot --nginx -d app.plantnxt.com
   ```

### Development vs Production

**Development (localhost):**

```bash
npm run dev
# Access: http://localhost:5173/
```

**Production (app.plantnxt.com):**

```bash
npm run build
# Deploy dist/ contents to web server
# Access: https://app.plantnxt.com/
```

### Environment Variables

For production, you may want to set:

- `VITE_API_URL=https://api.plantnxt.com` (when backend is ready)
- `VITE_APP_ENV=production`

### Troubleshooting

- **404 errors on refresh:** Ensure nginx `try_files` directive is configured
- **SSL issues:** Check certificate paths and permissions
- **Build errors:** Ensure all dependencies are installed (`npm install`)

### Next Steps

1. Set up backend API at `api.plantnxt.com`
2. Configure CORS and authentication
3. Set up monitoring and analytics
4. Configure CI/CD pipeline
