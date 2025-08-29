#!/bin/bash

# PlantNxt Domain Setup Script
echo "🌐 Setting up app.plantnxt.com domain access..."

# Check if we're on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "📱 Detected macOS"

    # Check if the domain is already in hosts file
    if grep -q "app.plantnxt.com" /etc/hosts; then
        echo "✅ app.plantnxt.com is already configured in /etc/hosts"
    else
        echo "📝 Adding app.plantnxt.com to /etc/hosts..."
        echo "127.0.0.1 app.plantnxt.com" | sudo tee -a /etc/hosts
        echo "✅ Added app.plantnxt.com -> 127.0.0.1"
    fi
else
    echo "⚠️  This script is designed for macOS"
    echo "📝 For other systems, manually add to /etc/hosts:"
    echo "   127.0.0.1 app.plantnxt.com"
fi

echo ""
echo "🌍 Domain Setup Options:"
echo ""
echo "1. Local Development (recommended for now):"
echo "   - Add to /etc/hosts: 127.0.0.1 app.plantnxt.com"
echo "   - Access via: http://app.plantnxt.com:5173/"
echo ""
echo "2. Production Setup:"
echo "   - Configure DNS: A record app.plantnxt.com → Your server IP"
echo "   - Set up nginx with SSL"
echo "   - Access via: https://app.plantnxt.com/"
echo ""
echo "3. Test the setup:"
echo "   - Start the server: npm start"
echo "   - Open browser to: http://app.plantnxt.com:5173/"
echo ""
echo "📋 Next steps:"
echo "   - Run: npm start"
echo "   - Open: http://app.plantnxt.com:5173/"
