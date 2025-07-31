# Page Inventory Analytics Tool

A powerful Python tool for analyzing website page performance using Google Analytics data. This tool fetches analytics data for multiple departments/sections of a website and generates comprehensive Excel reports with AI-powered insights.

## Features

- **Batch Processing**: Analyze multiple department URLs in one run
- **Comprehensive Analytics**: Track page views, users, bounce rate, engagement time, and more
- **AI-Powered Insights**: Uses Google Gemini AI to provide actionable recommendations
- **Excel Reports**: Generates detailed Excel files with multiple sheets
- **Flexible Naming**: Multiple options for naming output files
- **Error Handling**: Robust error handling with detailed progress reporting

## What the Tool Does

1. **Fetches Google Analytics Data**: Retrieves analytics for the last 365 days
2. **Processes Page Data**: Normalizes URLs and cleans page titles
3. **Identifies Performance Issues**: Flags pages with low views, high bounce rates, or poor engagement
4. **Generates Top 20 Lists**: Shows most visited pages in each department
5. **Creates Review Lists**: Identifies pages that need attention
6. **Provides AI Insights**: Uses Gemini AI to analyze patterns and provide recommendations
7. **Exports to Excel**: Creates formatted Excel files with multiple sheets

## Prerequisites

- Python 3.7 or higher
- Google Analytics account with API access
- Google Analytics service account credentials

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

## Usage

### Running the Tool

```bash
python3 script.py
```

### Step-by-Step Process

1. **Enter URLs**: Type each department URL, press Enter after each, then press Enter twice when done
2. **Choose Naming**: Select how you want files named:
   - **Auto**: Uses department name from URL (e.g., `biophysics_analytics.xlsx`)
   - **Prefix**: Adds custom prefix (e.g., `my_prefix_biophysics.xlsx`)
   - **Custom**: Specify custom name for each file
3. **Wait for Processing**: The tool will process each URL and create separate Excel files
4. **Review Results**: See which files were created successfully

### Example Usage

```
=== PAGE INVENTORY TOOL ===

Enter department URLs (one per line, press Enter twice when done):
URL (or press Enter to finish): https://www.example.com/department1/
URL (or press Enter to finish): https://www.example.com/department2/
URL (or press Enter to finish): 

File naming options:
1. Use department name from URL (e.g., 'biophysics_analytics.xlsx')
2. Use custom prefix (e.g., 'my_prefix_biophysics.xlsx')
3. Use custom name for each file

Choose option (1-3): 1

Processing 2 departments...
Date range: 2024-01-15 to today

Processing: https://www.example.com/department1/
Department path: /department1/
✓ Successfully created: department1_analytics.xlsx

Processing: https://www.example.com/department2/
Department path: /department2/
✓ Successfully created: department2_analytics.xlsx

=== PROCESSING COMPLETE ===
Successfully created: 2 files
Failed: 0 URLs
```

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

### Google Analytics Property ID
The tool is configured for a specific Google Analytics property. To use it with your own property:

1. Find your Google Analytics Property ID
2. Update the `PROPERTY_ID` variable in `script.py` (line 485)

### API Key for AI Insights
The tool uses Google Gemini AI for generating insights. The API key is hardcoded in the script. For production use, consider:

1. Using environment variables for the API key
2. Implementing your own API key management
3. Updating the API key in the `get_ai_insights()` function

## Performance Thresholds

The tool uses these thresholds to identify problematic pages:

- **Low Page Views**: ≤25 views
- **High Bounce Rate**: ≥45%
- **Long Engagement**: >60 seconds per view

These can be adjusted in the `analyze_pages()` function.

## Error Handling

The tool includes comprehensive error handling:

- **Individual URL Processing**: If one URL fails, others continue
- **API Error Handling**: Graceful handling of Google Analytics and Gemini API errors
- **File Generation Errors**: Detailed error messages for Excel file creation issues
- **Progress Reporting**: Shows which files were created successfully and which failed

## Security Notes

- **Credentials**: The `credentials.json` file is excluded from version control
- **API Keys**: Consider using environment variables for API keys in production
- **Data Privacy**: Ensure compliance with your organization's data privacy policies

## Troubleshooting

### Common Issues

1. **"credentials.json not found"**
   - Ensure the credentials file is in the project directory
   - Check that the file is named exactly `credentials.json`

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

### Version 2.0
- Added batch processing for multiple URLs
- Implemented flexible file naming options
- Added comprehensive error handling
- Improved progress reporting
- Enhanced AI insights integration

### Version 1.0
- Initial release with single URL processing
- Basic Excel report generation
- Google Analytics integration 