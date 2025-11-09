#!/bin/bash

# FinoGlob Landing Page Deployment Script
# This script helps you deploy trdflwfinoglob.html to various platforms

echo "================================"
echo "FinoGlob Landing Page Deployment"
echo "================================"
echo ""
echo "Choose deployment platform:"
echo "1) Vercel (Recommended)"
echo "2) Netlify"
echo "3) GitHub Pages"
echo "4) Test Locally"
echo ""
read -p "Enter choice [1-4]: " choice

case $choice in
  1)
    echo ""
    echo "🚀 Deploying to Vercel..."
    echo ""

    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        echo "❌ Vercel CLI not found. Installing..."
        npm install -g vercel
    fi

    echo "📦 Starting deployment..."
    vercel --prod --name finoglob-landing

    echo ""
    echo "✅ Deployment complete!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Go to Vercel Dashboard: https://vercel.com/dashboard"
    echo "2. Navigate to your project settings"
    echo "3. Click 'Domains' → 'Add Domain'"
    echo "4. Enter: finoglob.yourdomain.com"
    echo "5. Update your DNS with the provided records"
    echo ""
    ;;

  2)
    echo ""
    echo "🚀 Deploying to Netlify..."
    echo ""

    # Check if Netlify CLI is installed
    if ! command -v netlify &> /dev/null; then
        echo "❌ Netlify CLI not found. Installing..."
        npm install -g netlify-cli
    fi

    # Login to Netlify
    echo "🔐 Logging in to Netlify..."
    netlify login

    # Deploy
    echo "📦 Starting deployment..."
    netlify deploy --prod --dir=. --site-name=finoglob-landing

    echo ""
    echo "✅ Deployment complete!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Go to Netlify Dashboard"
    echo "2. Navigate to Site Settings → Domain Management"
    echo "3. Click 'Add custom domain'"
    echo "4. Enter: finoglob.yourdomain.com"
    echo "5. Update your DNS with the provided records"
    echo ""
    ;;

  3)
    echo ""
    echo "🚀 Preparing for GitHub Pages..."
    echo ""

    # Create a copy as index.html
    cp trdflwfinoglob.html index.html

    echo "✅ Created index.html"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Create a new GitHub repository named 'finoglob-landing'"
    echo "2. Initialize git in a new folder:"
    echo "   mkdir finoglob-landing && cd finoglob-landing"
    echo "   git init"
    echo "3. Copy index.html to the new folder"
    echo "4. Commit and push:"
    echo "   git add index.html"
    echo "   git commit -m 'Initial commit'"
    echo "   git branch -M main"
    echo "   git remote add origin https://github.com/yourusername/finoglob-landing.git"
    echo "   git push -u origin main"
    echo "5. Enable GitHub Pages:"
    echo "   - Go to repository Settings"
    echo "   - Scroll to 'Pages'"
    echo "   - Source: main branch"
    echo "   - Save"
    echo "6. Add custom domain in Pages settings"
    echo ""
    ;;

  4)
    echo ""
    echo "🧪 Starting local test server..."
    echo ""
    echo "Opening http://localhost:8000/trdflwfinoglob.html in your browser..."
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""

    # Start simple HTTP server
    if command -v python3 &> /dev/null; then
        python3 -m http.server 8000
    elif command -v python &> /dev/null; then
        python -m SimpleHTTPServer 8000
    else
        echo "❌ Python not found. Please install Python to run local server."
        echo "Alternatively, open trdflwfinoglob.html directly in your browser."
    fi
    ;;

  *)
    echo "❌ Invalid choice. Please run the script again and choose 1-4."
    exit 1
    ;;
esac

echo ""
echo "🎉 Done!"
echo ""
