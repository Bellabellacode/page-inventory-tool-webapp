# Page Inventory Analytics Tool - Deployment Guide

This guide will help you deploy your web application to various hosting platforms.

## 🚀 **Quick Start: Heroku (Recommended)**

### **Step 1: Install Heroku CLI**
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

### **Step 2: Login to Heroku**
```bash
heroku login
```

### **Step 3: Create Heroku App**
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Create Heroku app
heroku create your-app-name
```

### **Step 4: Set Environment Variables**
```bash
# Set your environment variables
heroku config:set GA_PROPERTY_ID=your_property_id
heroku config:set GEMINI_API_KEY=your_gemini_api_key
heroku config:set SECRET_KEY=your_secret_key_here
```

### **Step 5: Add Credentials File**
```bash
# Add your Google Analytics credentials
heroku config:set CREDENTIALS_JSON="$(cat credentials.json)"
```

### **Step 6: Deploy**
```bash
git push heroku main
```

### **Step 7: Open Your App**
```bash
heroku open
```

## 🌐 **Alternative Hosting Options**

### **Option 2: Railway**

1. **Go to**: https://railway.app/
2. **Connect your GitHub repository**
3. **Set environment variables** in the Railway dashboard
4. **Deploy automatically**

### **Option 3: DigitalOcean App Platform**

1. **Go to**: https://cloud.digitalocean.com/apps
2. **Connect your GitHub repository**
3. **Configure environment variables**
4. **Deploy**

### **Option 4: Render**

1. **Go to**: https://render.com/
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Set environment variables**
5. **Deploy**

## 🔧 **Environment Variables Setup**

### **Required Variables**
```bash
# Google Analytics
GA_PROPERTY_ID=your_property_id
CREDENTIALS_JSON=your_credentials_json_content

# AI Insights (Optional)
GEMINI_API_KEY=your_gemini_api_key

# Flask Security
SECRET_KEY=your_secret_key_here
```

### **Optional Variables**
```bash
# Performance Thresholds
LOW_VIEWS_THRESHOLD=25
HIGH_BOUNCE_RATE_THRESHOLD=45.0
LONG_ENGAGEMENT_THRESHOLD=60.0
```

## 📁 **File Structure for Deployment**

Your project should have these files:
```
page-inventory-tool/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── Procfile             # Heroku deployment file
├── runtime.txt          # Python version
├── credentials.json     # Google Analytics credentials
├── templates/           # HTML templates
│   └── index.html
├── static/             # CSS and JS files
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
└── .gitignore          # Git ignore file
```

## 🔒 **Security Considerations**

### **Environment Variables**
- Never commit sensitive data to version control
- Use environment variables for all API keys and secrets
- Rotate keys regularly

### **Credentials Management**
- Store Google Analytics credentials securely
- Use service accounts with minimal required permissions
- Monitor API usage and quotas

### **HTTPS**
- Enable HTTPS on your hosting platform
- Use secure cookies and sessions
- Implement proper CORS policies if needed

## 🚀 **Production Deployment Checklist**

### **Before Deployment**
- [ ] Test locally with production settings
- [ ] Set all required environment variables
- [ ] Configure Google Analytics credentials
- [ ] Set up Gemini API key (if using AI insights)
- [ ] Test file upload/download functionality
- [ ] Verify error handling works correctly

### **After Deployment**
- [ ] Test the live application
- [ ] Verify Google Analytics connection
- [ ] Test AI insights functionality
- [ ] Check file download capabilities
- [ ] Monitor application logs
- [ ] Set up monitoring and alerts

## 🔍 **Troubleshooting**

### **Common Issues**

1. **"Build failed"**
   - Check `requirements.txt` for correct dependencies
   - Verify Python version in `runtime.txt`
   - Check build logs for specific errors

2. **"Environment variables not found"**
   - Verify all environment variables are set
   - Check variable names match exactly
   - Restart the application after setting variables

3. **"Google Analytics connection failed"**
   - Verify credentials are properly set
   - Check service account permissions
   - Ensure Google Analytics Data API is enabled

4. **"AI insights disabled"**
   - Verify `GEMINI_API_KEY` is set
   - Check API key validity
   - Monitor API usage quotas

### **Logs and Debugging**
```bash
# Heroku logs
heroku logs --tail

# Railway logs
railway logs

# DigitalOcean logs
# Check in the App Platform dashboard
```

## 📊 **Monitoring and Maintenance**

### **Performance Monitoring**
- Monitor response times
- Track API usage and quotas
- Monitor file generation and download success rates

### **Regular Maintenance**
- Update dependencies regularly
- Monitor Google Analytics API changes
- Keep API keys secure and rotate as needed
- Backup configuration and credentials

## 🎯 **Next Steps**

1. **Choose your hosting platform** (Heroku recommended for beginners)
2. **Follow the deployment steps** for your chosen platform
3. **Set up environment variables** with your actual values
4. **Test the deployed application**
5. **Share the URL** with your team!

## 📞 **Support**

If you encounter issues:
1. Check the troubleshooting section above
2. Review the hosting platform's documentation
3. Check application logs for specific error messages
4. Verify all environment variables are set correctly

Your Page Inventory Analytics Tool is now ready for production deployment! 🚀 