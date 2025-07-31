# Google Analytics Credentials Setup Guide

To use the Page Inventory Analytics Tool, you need to set up Google Analytics API credentials.

## Step-by-Step Setup

### 1. Go to Google Cloud Console
Visit [https://console.cloud.google.com/](https://console.cloud.google.com/)

### 2. Create or Select a Project
- Create a new project or select an existing one
- Note your Project ID (you'll need this later)

### 3. Enable the Google Analytics Data API
- In the left sidebar, click "APIs & Services" > "Library"
- Search for "Google Analytics Data API"
- Click on it and press "Enable"

### 4. Create a Service Account
- Go to "APIs & Services" > "Credentials"
- Click "Create Credentials" > "Service Account"
- Fill in the service account details:
  - **Name**: `page-inventory-analytics`
  - **Description**: `Service account for Page Inventory Analytics Tool`
- Click "Create and Continue"

### 5. Grant Permissions (Optional)
- For "Grant this service account access to project", you can skip this step
- Click "Continue"

### 6. Create and Download the Key
- Click "Done" to finish creating the service account
- Find your service account in the list and click on it
- Go to the "Keys" tab
- Click "Add Key" > "Create new key"
- Choose "JSON" format
- Click "Create"

### 7. Download and Place the Credentials File
- The JSON file will automatically download
- Rename it to `credentials.json`
- Place it in the root directory of this project (same folder as `app.py`)

### 8. Grant Google Analytics Access
- Go to your Google Analytics account
- Navigate to Admin > Property > Property Access Management
- Click the "+" button to add a user
- Enter the service account email (found in the credentials.json file)
- Grant "Viewer" permissions
- Click "Add"

## File Structure
Your project should now look like this:
```
page-inventory-tool/
├── app.py
├── credentials.json          ← Your credentials file
├── templates/
├── static/
└── ...
```

## Testing the Setup
1. Start the web application: `python3 app.py`
2. Open your browser to `http://localhost:5000`
3. Enter a test URL and try processing
4. If successful, you'll see the analytics data being processed

## Troubleshooting

### "credentials.json not found"
- Make sure the file is named exactly `credentials.json`
- Ensure it's in the same directory as `app.py`
- Check that the file has the correct JSON format

### "Permission denied" errors
- Verify the service account has access to your Google Analytics property
- Check that the Google Analytics Data API is enabled
- Ensure the service account email is added to your GA property

### "No data found" errors
- Verify the URLs you're testing actually exist in your Google Analytics
- Check that the Property ID is correct
- Ensure the date range contains data

## Security Notes
- Never commit `credentials.json` to version control
- The file is already in `.gitignore` for security
- Keep your credentials file secure and don't share it

## Environment Variables (Optional)
You can also set the credentials path via environment variable:
```bash
export CREDENTIALS_PATH=/path/to/your/credentials.json
```

Or create a `.env` file:
```env
CREDENTIALS_PATH=credentials.json
GA_PROPERTY_ID=your_property_id
``` 