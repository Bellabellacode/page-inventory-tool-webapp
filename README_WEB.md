# Page Inventory Analytics Tool - Web Application

A modern web application for analyzing website page performance using Google Analytics data. This tool provides a user-friendly interface to fetch analytics data for multiple departments/sections of a website and generates comprehensive Excel reports with AI-powered insights.

## Features

- **Modern Web Interface**: Clean, responsive design with Bootstrap 5
- **Batch Processing**: Analyze multiple department URLs in one session
- **Real-time Progress**: Visual progress indicators during processing
- **Flexible File Naming**: Multiple options for naming output files
- **AI-Powered Insights**: Uses Google Gemini AI to provide actionable recommendations
- **Comprehensive Excel Reports**: Generates detailed Excel files with multiple sheets
- **Error Handling**: Robust error handling with detailed progress reporting
- **Download Management**: Automatic file bundling and download handling

## What the Web App Does

1. **Web Interface**: Provides an intuitive web form for entering URLs and configuration
2. **Fetches Google Analytics Data**: Retrieves analytics for the last 365 days
3. **Processes Page Data**: Normalizes URLs and cleans page titles
4. **Identifies Performance Issues**: Flags pages with low views, high bounce rates, or poor engagement
5. **Generates Top 20 Lists**: Shows most visited pages in each department
6. **Creates Review Lists**: Identifies pages that need attention
7. **Provides AI Insights**: Uses Gemini AI to analyze patterns and provide recommendations
8. **Exports to Excel**: Creates formatted Excel files with multiple sheets
9. **Handles Downloads**: Automatically bundles multiple files into a ZIP archive

## Prerequisites

- Python 3.7 or higher
- Google Analytics account with API access
- Google Analytics service account credentials
- Google Gemini API key (optional, for AI insights)

## Installation

1. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd page-inventory-tool
   ```

2. **Install required dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up Google Analytics credentials**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google Analytics Data API
   - Create a service account
   - Download the JSON credentials file
   - Rename it to `credentials.json` and place it in the project directory

4. **Configure environment variables** (optional)
   Create a `.env` file in the project directory:
   ```env
   GA_PROPERTY_ID=your_property_id
   CREDENTIALS_PATH=credentials.json
   GEMINI_API_KEY=your_gemini_api_key
   SECRET_KEY=your_secret_key
   ```

## Running the Web Application

1. **Start the Flask server**
   ```bash
   python app.py
   ```

2. **Open your web browser**
   Navigate to `http://localhost:5000`

3. **Use the web interface**
   - Enter department URLs (one per line)
   - Choose file naming options
   - Click "Process Analytics"
   - Download the generated reports

## Web Interface Features

### URL Input
- Multi-line text area for entering department URLs
- Real-time validation and feedback
- Support for multiple URLs in one session

### File Naming Options
- **Auto**: Uses department name from URL (e.g., `biophysics_analytics.xlsx`)
- **Custom Prefix**: Adds custom prefix to filenames
- **Custom Names**: Specify custom name for each file

### Progress Tracking
- Real-time progress bar
- Status messages during processing
- Visual feedback for each step

### Results Display
- Success/error indicators for each URL
- Statistics summary for successful reports
- Download links for generated files

## Output Files

Each generated Excel file contains:

### 1. Summary Sheet
- AI-generated insights and recommendations
- Overall statistics and trends
- Actionable advice for improving the department

### 2. Top 20 Pages
- Most visited pages in the department
- Sorted by page views (descending)

### 3. Pages to Review
- Pages with performance issues:
  - Low page views (≤25)
  - High bounce rate (≥45%)
  - Long engagement time (>60 seconds per view)
- Includes suggested actions for each issue

### 4. All Pages
- Complete analytics data for every tracked page
- All metrics and calculated fields

## Configuration

### Environment Variables

Create a `.env` file in the project directory:

```env
# Google Analytics Property ID
GA_PROPERTY_ID=319028439

# Path to Google Analytics credentials file
CREDENTIALS_PATH=credentials.json

# Google Gemini API key for AI insights (optional)
GEMINI_API_KEY=your_gemini_api_key

# Flask secret key for sessions
SECRET_KEY=your_secret_key_here

# Performance thresholds (optional)
LOW_VIEWS_THRESHOLD=25
HIGH_BOUNCE_RATE_THRESHOLD=45.0
LONG_ENGAGEMENT_THRESHOLD=60.0
```

### Google Analytics Property ID
The tool is configured for a specific Google Analytics property. To use it with your own property:

1. Find your Google Analytics Property ID
2. Update the `GA_PROPERTY_ID` environment variable or modify the default in `app.py`

### API Key for AI Insights
The tool uses Google Gemini AI for generating insights. To enable AI insights:

1. Get a Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Set the `GEMINI_API_KEY` environment variable

## Performance Thresholds

The tool uses these thresholds to identify problematic pages:

- **Low Page Views**: ≤25 views
- **High Bounce Rate**: ≥45%
- **Long Engagement**: >60 seconds per view

These can be adjusted via environment variables.

## Error Handling

The web application includes comprehensive error handling:

- **Individual URL Processing**: If one URL fails, others continue
- **API Error Handling**: Graceful handling of Google Analytics and Gemini API errors
- **File Generation Errors**: Detailed error messages for Excel file creation issues
- **Progress Reporting**: Shows which files were created successfully and which failed
- **User-friendly Messages**: Clear error messages displayed in the web interface

## Security Notes

- **Credentials**: The `credentials.json` file is excluded from version control
- **API Keys**: Use environment variables for API keys in production
- **Data Privacy**: Ensure compliance with your organization's data privacy policies
- **Session Management**: Files are stored temporarily and cleaned up automatically

## Troubleshooting

### Common Issues

1. **"credentials.json not found"**
   - Ensure the credentials file is in the project directory
   - Check that the file is named exactly `credentials.json`
   - Verify the `CREDENTIALS_PATH` environment variable

2. **"No data found for URL"**
   - Verify the URL path exists in Google Analytics
   - Check that the property ID is correct
   - Ensure the service account has proper permissions

3. **"Gemini API error"**
   - The AI insights feature may fail temporarily
   - Excel files will still be created without AI summary
   - Check API key validity and quotas

4. **"Error processing URL"**
   - Check URL format and validity
   - Ensure the department path exists in Google Analytics
   - Verify network connectivity

5. **Web interface not loading**
   - Check that Flask is running on the correct port
   - Verify all dependencies are installed
   - Check browser console for JavaScript errors

## Deployment

### Local Development
```bash
python app.py
```

### Production Deployment
For production deployment, consider:

1. **Using a production WSGI server** like Gunicorn:
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

2. **Setting up a reverse proxy** with Nginx

3. **Using environment variables** for all sensitive configuration

4. **Implementing proper logging** and monitoring

5. **Setting up SSL/TLS** for secure connections

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
1. Check the troubleshooting section above
2. Review the error messages for specific guidance
3. Ensure all prerequisites are met
4. Verify Google Analytics setup and permissions

## Changelog

### Version 3.0 (Web Application)
- Converted to modern web application using Flask
- Added responsive Bootstrap 5 interface
- Implemented real-time progress tracking
- Added comprehensive error handling and user feedback
- Enhanced file download management with ZIP bundling
- Improved user experience with dynamic form interactions

### Version 2.0 (Command Line)
- Added batch processing for multiple URLs
- Implemented flexible file naming options
- Added comprehensive error handling
- Improved progress reporting
- Enhanced AI insights integration

### Version 1.0 (Initial Release)
- Initial release with single URL processing
- Basic Excel report generation
- Google Analytics integration 