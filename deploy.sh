#!/bin/bash

# Page Inventory Analytics Tool - Deployment Script

echo "🚀 Page Inventory Analytics Tool - Deployment Helper"
echo "=================================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

echo ""
echo "🌐 Choose your hosting platform:"
echo "1. Heroku (Recommended for beginners)"
echo "2. Railway"
echo "3. DigitalOcean App Platform"
echo "4. Render"
echo "5. Exit"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Deploying to Heroku..."
        echo ""
        echo "📋 Prerequisites:"
        echo "- Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli"
        echo "- Login to Heroku: heroku login"
        echo ""
        read -p "Have you installed and logged into Heroku CLI? (y/n): " heroku_ready
        
        if [ "$heroku_ready" = "y" ]; then
            echo ""
            read -p "Enter your Heroku app name: " app_name
            
            echo "🔧 Creating Heroku app..."
            heroku create $app_name
            
            echo "🔑 Setting environment variables..."
            echo "Please set your environment variables:"
            echo "heroku config:set GA_PROPERTY_ID=your_property_id"
            echo "heroku config:set GEMINI_API_KEY=your_gemini_api_key"
            echo "heroku config:set SECRET_KEY=your_secret_key_here"
            echo "heroku config:set CREDENTIALS_JSON=\"\$(cat credentials.json)\""
            echo ""
            read -p "Press Enter after setting environment variables..."
            
            echo "🚀 Deploying to Heroku..."
            git push heroku main
            
            echo "🌐 Opening your app..."
            heroku open
            
            echo "✅ Deployment complete! Your app is live at: https://$app_name.herokuapp.com"
        else
            echo "❌ Please install and login to Heroku CLI first"
        fi
        ;;
    2)
        echo ""
        echo "🚂 Deploying to Railway..."
        echo ""
        echo "📋 Steps:"
        echo "1. Go to https://railway.app/"
        echo "2. Connect your GitHub repository"
        echo "3. Set environment variables in the Railway dashboard"
        echo "4. Deploy automatically"
        echo ""
        echo "✅ Railway deployment guide ready!"
        ;;
    3)
        echo ""
        echo "☁️ Deploying to DigitalOcean App Platform..."
        echo ""
        echo "📋 Steps:"
        echo "1. Go to https://cloud.digitalocean.com/apps"
        echo "2. Connect your GitHub repository"
        echo "3. Configure environment variables"
        echo "4. Deploy"
        echo ""
        echo "✅ DigitalOcean deployment guide ready!"
        ;;
    4)
        echo ""
        echo "🎨 Deploying to Render..."
        echo ""
        echo "📋 Steps:"
        echo "1. Go to https://render.com/"
        echo "2. Create a new Web Service"
        echo "3. Connect your GitHub repository"
        echo "4. Set environment variables"
        echo "5. Deploy"
        echo ""
        echo "✅ Render deployment guide ready!"
        ;;
    5)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please try again."
        ;;
esac

echo ""
echo "📚 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo "🔧 For troubleshooting, check the deployment guide"
echo ""
echo "🎉 Your Page Inventory Analytics Tool is ready for deployment!" 