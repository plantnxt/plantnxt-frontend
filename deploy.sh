#!/bin/bash

# PlantNxt Frontend Deployment Script
echo "🚀 Building PlantNxt frontend for app.plantnxt.com..."

# Build the application
npm run build

echo "✅ Build completed successfully!"
echo "📁 Build output: ./dist/"
echo ""
echo "🌐 To deploy to app.plantnxt.com:"
echo "1. Upload the contents of ./dist/ to your web server"
echo "2. Configure your web server to serve from the root directory"
echo "3. Set up SSL certificate for app.plantnxt.com"
echo ""
echo "📋 Next steps:"
echo "- Configure DNS: Point app.plantnxt.com to your server IP"
echo "- Set up reverse proxy (nginx/Apache) to serve the static files"
echo "- Configure SSL with Let's Encrypt or your preferred provider"
