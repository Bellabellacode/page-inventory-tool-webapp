#!/usr/bin/env python3
"""
Page Inventory Analytics Tool - Web Application Startup Script

This script starts the Flask web application for the Page Inventory Analytics Tool.
"""

import os
import sys
from app import app

def main():
    """Start the Flask web application"""
    print("=" * 60)
    print("Page Inventory Analytics Tool - Web Application")
    print("=" * 60)
    print()
    
    # Check if credentials file exists
    credentials_path = os.getenv('CREDENTIALS_PATH', 'credentials.json')
    if not os.path.exists(credentials_path):
        print("⚠️  Warning: credentials.json not found!")
        print("   Please ensure you have set up Google Analytics credentials.")
        print("   See README_WEB.md for setup instructions.")
        print()
    
    # Check if required environment variables are set
    property_id = os.getenv('GA_PROPERTY_ID')
    if not property_id:
        print("ℹ️  Using default Google Analytics Property ID")
        print("   Set GA_PROPERTY_ID environment variable to use your own property")
        print()
    
    gemini_key = os.getenv('GEMINI_API_KEY')
    if not gemini_key:
        print("ℹ️  AI insights will be disabled (GEMINI_API_KEY not set)")
        print("   Set GEMINI_API_KEY environment variable to enable AI insights")
        print()
    
    print("🚀 Starting web application...")
    print("📱 Open your browser and go to: http://localhost:5000")
    print("⏹️  Press Ctrl+C to stop the server")
    print()
    
    try:
        # Start the Flask application
        app.run(
            debug=True,
            host='0.0.0.0',
            port=5000,
            use_reloader=True
        )
    except KeyboardInterrupt:
        print("\n👋 Web application stopped.")
    except Exception as e:
        print(f"\n❌ Error starting web application: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main() 