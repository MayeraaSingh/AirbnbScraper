import argparse
import os
import sys
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from airbnb_scraper.spiders.airbnb_spider import AirbnbSpiderSpider

def main():
    # Set up argument parser
    parser = argparse.ArgumentParser(description='Run Airbnb scraper with parameters')
    parser.add_argument('--location', type=str, default='new york', help='Location to search for listings')
    parser.add_argument('--checkin', type=str, help='Check-in date (YYYY-MM-DD)')
    parser.add_argument('--checkout', type=str, help='Check-out date (YYYY-MM-DD)')
    parser.add_argument('--adults', type=int, default=2, help='Number of adults')
    
    args = parser.parse_args()
    
    # Get the project settings
    settings = get_project_settings()
    
    # Configure settings
    settings['LOG_LEVEL'] = 'INFO'
    
    # Create and start the crawler process
    process = CrawlerProcess(settings)
    process.crawl(
        AirbnbSpiderSpider,
        location=args.location,
        checkin=args.checkin,
        checkout=args.checkout,
        adults=args.adults
    )
    
    process.start()

if __name__ == "__main__":
    main() 