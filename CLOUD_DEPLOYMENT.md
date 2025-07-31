# Cloud Deployment Guide

## Environment Variables Setup

For Vercel, Railway, or any other cloud platform, you need to set these environment variables:

### Required Variables:

1. **GA_PROPERTY_ID**
   - Value: `319028439`
   - Description: Your Google Analytics Property ID

2. **GEMINI_API_KEY**
   - Value: `AIzaSyCJZYaI9TyOPbJvhjmH4mLcJp7h0qNd_zI`
   - Description: Your Google Gemini API key for AI insights

3. **SECRET_KEY**
   - Value: `page-inventory-tool-secret-key-2024`
   - Description: Flask secret key for session management

4. **CREDENTIALS_JSON**
   - Value: Copy the entire content of your `credentials.json` file
   - Description: Google Analytics service account credentials

### How to Get CREDENTIALS_JSON:

1. Open your `credentials.json` file
2. Copy ALL the content (including the curly braces)
3. Paste it as the value for `CREDENTIALS_JSON`

Example:
```
CREDENTIALS_JSON={"type":"service_account","project_id":"your-project","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}
```

### Platform-Specific Instructions:

#### Vercel:
1. Go to your project in Vercel
2. Click "Settings" → "Environment Variables"
3. Add each variable with its value
4. Redeploy your app

#### Railway:
1. Go to your project in Railway
2. Click "Variables" tab
3. Add each variable with its value
4. Railway will automatically redeploy

### Testing:
After setting the variables, your app should work without the "credentials not found" error. 