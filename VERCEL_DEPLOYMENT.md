# Vercel Deployment Guide

## 🚀 **Deploy to Vercel (Super Easy!)**

### **Step 1: Push to GitHub**
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/page-inventory-tool.git
git branch -M main
git push -u origin main
```

### **Step 2: Deploy to Vercel**

1. **Go to**: https://vercel.com/
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure environment variables** (see below)
6. **Click "Deploy"**

### **Step 3: Set Environment Variables**

In the Vercel dashboard, add these environment variables:

```
GA_PROPERTY_ID=319028439
GEMINI_API_KEY=AIzaSyCJZYaI9TyOPbJvhjmH4mLcJp7h0qNd_zI
SECRET_KEY=your-secret-key-change-this-in-production
CREDENTIALS_JSON=<paste your entire credentials.json content here>
```

### **Step 4: Your App is Live!**

Vercel will automatically deploy your app and give you a URL like:
`https://your-app-name.vercel.app`

## ✅ **Advantages of Vercel**

- ✅ **Free tier** available
- ✅ **Automatic deployments** from GitHub
- ✅ **No complex setup** required
- ✅ **HTTPS included**
- ✅ **Global CDN**
- ✅ **Easy environment variable management**

## 🔧 **Troubleshooting**

### **Common Issues**

1. **"Build failed"**
   - Check that `requirements.txt` is in the root directory
   - Verify Python version compatibility

2. **"Environment variables not found"**
   - Make sure all environment variables are set in Vercel dashboard
   - Check variable names match exactly

3. **"Google Analytics connection failed"**
   - Verify `CREDENTIALS_JSON` contains the full JSON content
   - Check that the credentials are valid

## 🎯 **Quick Start Commands**

```bash
# Push to GitHub
git add .
git commit -m "Deploy to Vercel"
git push origin main

# Then go to Vercel and deploy!
```

Your app will be live in minutes! 🚀 