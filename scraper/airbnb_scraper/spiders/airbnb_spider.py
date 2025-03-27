import scrapy
import json
import re
import datetime
import requests
from urllib.parse import urlencode, quote


class AirbnbSpiderSpider(scrapy.Spider):
    name = "airbnb_spider"
    allowed_domains = ["airbnb.com"]
    
    def __init__(self, location='new york', checkin=None, checkout=None, adults=2, *args, **kwargs):
        super(AirbnbSpiderSpider, self).__init__(*args, **kwargs)
        self.location = location
        
        # Set default dates if not provided (2 weeks from now, staying for 5 days)
        if not checkin or not checkout:
            today = datetime.date.today()
            future_date = today + datetime.timedelta(days=14)
            checkout_date = future_date + datetime.timedelta(days=5)
            self.checkin = future_date.strftime("%Y-%m-%d")
            self.checkout = checkout_date.strftime("%Y-%m-%d")
        else:
            self.checkin = checkin
            self.checkout = checkout
            
        self.adults = str(adults)
        self.backend_url = 'http://localhost:8000/api/listings/'  # Django backend URL
    
    def start_requests(self):
        # Build the search URL
        params = {
            'query': self.location,
            'checkin': self.checkin,
            'checkout': self.checkout,
            'adults': self.adults
        }
        search_url = f"https://www.airbnb.com/s/{quote(self.location)}/homes?{urlencode(params)}"
        yield scrapy.Request(url=search_url, callback=self.parse_search_results)
    
    def parse_search_results(self, response):
        # Extract API data using regex pattern
        data_pattern = re.compile(r'<!--(\{"data":.*?\})-->')
        matches = data_pattern.findall(response.text)
        
        listing_urls = []
        
        # Try to parse the API data
        if matches:
            for match in matches:
                try:
                    json_data = json.loads(match)
                    api_data = json_data.get('data', {})
                    
                    # Extract listings from the API data - the exact path will need to be adjusted
                    # This is a placeholder as the actual structure needs inspection
                    presentation_data = api_data.get('presentation', {})
                    explore_section = presentation_data.get('exploreV3', {}).get('sections', [])
                    
                    for section in explore_section:
                        if 'sectionId' in section and section.get('sectionId') == 'EXPLORE_ANYTHING_SECTION':
                            items = section.get('items', [])
                            for item in items:
                                if 'listing' in item:
                                    listing_id = item.get('listing', {}).get('id')
                                    if listing_id:
                                        listing_url = f"https://www.airbnb.com/rooms/{listing_id}"
                                        listing_urls.append(listing_url)
                except json.JSONDecodeError:
                    self.logger.error("Failed to parse JSON data")
                    continue
        
        # If we couldn't extract from API data, try the regular HTML parsing
        if not listing_urls:
            # Extract listing URLs from the search results page
            listing_links = response.css('div[data-testid="card-container"] a::attr(href)').getall()
            for link in listing_links:
                if '/rooms/' in link:
                    full_url = f"https://www.airbnb.com{link}"
                    listing_urls.append(full_url)
        
        # Follow each listing URL
        for url in listing_urls:
            yield scrapy.Request(url=url, callback=self.parse_listing)
        
        # Check for pagination
        next_page = response.css('a[aria-label="Next"]::attr(href)').get()
        if next_page:
            next_url = f"https://www.airbnb.com{next_page}"
            yield scrapy.Request(url=next_url, callback=self.parse_search_results)
    
    def parse_listing(self, response):
        # Extract listing data using both API data and HTML parsing
        
        # Try to extract the JSON data embedded in the page
        data_pattern = re.compile(r'<script id="data-state" data-state="(.+?)"')
        match = data_pattern.search(response.text)
        
        listing_data = {}
        
        # Initialize default values
        listing_data = {
            'title': '',
            'location': '',
            'address': '',
            'price_per_night': 0,
            'currency': 'USD',
            'total_price': 0,
            'image_urls': [],
            'rating': None,
            'description': '',
            'number_of_reviews': 0,
            'amenities': [],
            'host_name': '',
            'host_image': '',
            'host_since': '',
            'property_type': ''
        }
        
        if match:
            try:
                json_str = match.group(1)
                json_str = json_str.replace('&quot;', '"')
                data = json.loads(json_str)
                
                # The structure of the data will need to be determined by inspecting the actual response
                # This is a placeholder structure
                pdp_data = data.get('niobeClientData', {}).get('__niobe_denormalized', {})
                
                # Extract listing details
                for key in pdp_data:
                    if 'pdpHomes' in key:
                        pdp_homes = pdp_data[key]
                        metadata = pdp_homes.get('metadata', {})
                        sections = pdp_homes.get('pdpSections', {})
                        
                        # Basic info
                        listing_data['title'] = metadata.get('sharingConfig', {}).get('title', '')
                        listing_data['property_type'] = metadata.get('sharingConfig', {}).get('propertyType', '')
                        listing_data['description'] = metadata.get('sharingConfig', {}).get('description', '')
                        
                        # Location
                        location_data = metadata.get('loggingContext', {}).get('eventDataLogging', {})
                        listing_data['location'] = location_data.get('localized_city', '') or location_data.get('city', '')
                        listing_data['address'] = location_data.get('location', {}).get('address', '')
                        
                        # Price
                        price_data = metadata.get('bookingPriceData', {})
                        listing_data['price_per_night'] = price_data.get('displayRateAmount', 0)
                        listing_data['currency'] = price_data.get('rateCurrency', 'USD')
                        listing_data['total_price'] = price_data.get('displayTotalPriceAmount', 0)
                        
                        # Ratings
                        listing_data['rating'] = metadata.get('reviewsModule', {}).get('overallRating', None)
                        listing_data['number_of_reviews'] = metadata.get('reviewsModule', {}).get('reviewCount', 0)
                        
                        # Host
                        host_data = metadata.get('hostProfile', {})
                        listing_data['host_name'] = host_data.get('name', '')
                        listing_data['host_image'] = host_data.get('pictureUrl', '')
                        listing_data['host_since'] = host_data.get('memberSince', '')
                        
                        # Images
                        photos = []
                        photos_data = metadata.get('photos', [])
                        for photo in photos_data:
                            photo_url = photo.get('pictureUrl', '')
                            if photo_url:
                                photos.append(photo_url)
                        listing_data['image_urls'] = photos
                        
                        # Amenities
                        amenities_data = []
                        for section in sections:
                            if 'sectionId' in section and section.get('sectionId') == 'AMENITIES_DEFAULT':
                                amenities_data = section.get('amenities', [])
                                break
                        
                        amenities = []
                        for amenity in amenities_data:
                            amenity_name = amenity.get('title', '')
                            if amenity_name:
                                amenities.append(amenity_name)
                        listing_data['amenities'] = amenities
            
            except json.JSONDecodeError:
                self.logger.error("Failed to parse JSON data")
        
        # If we couldn't extract data from JSON, fall back to HTML parsing
        if not listing_data['title']:
            # Title
            listing_data['title'] = response.css('h1::text').get('') or response.css('._fecoyn4::text').get('')
            
            # Location
            location_element = response.css('._152qbzi::text').get('')
            if location_element:
                listing_data['location'] = location_element
            
            # Price
            price_element = response.css('._tyxjp1::text').get('') or response.css('._1y74zjx::text').get('')
            if price_element:
                # Extract numeric price from string like "$150"
                price_match = re.search(r'(\d+)', price_element)
                if price_match:
                    listing_data['price_per_night'] = int(price_match.group(1))
                # Extract currency symbol
                currency_match = re.search(r'([^\d\s]+)', price_element)
                if currency_match:
                    listing_data['currency'] = currency_match.group(1)
            
            # Images
            image_urls = response.css('picture source::attr(srcset)').getall()
            cleaned_urls = []
            for url_set in image_urls:
                urls = url_set.split(',')
                if urls:
                    # Get the largest image (usually the last in the set)
                    largest_url = urls[-1].strip().split(' ')[0]
                    cleaned_urls.append(largest_url)
            listing_data['image_urls'] = list(set(cleaned_urls))  # Remove duplicates
            
            # Reviews count and rating
            reviews_count = response.css('._s65ijh7::text').get()
            if reviews_count:
                count_match = re.search(r'(\d+)', reviews_count)
                if count_match:
                    listing_data['number_of_reviews'] = int(count_match.group(1))
            
            rating = response.css('._12oal24::text').get()
            if rating:
                try:
                    listing_data['rating'] = float(rating)
                except (ValueError, TypeError):
                    pass
            
            # Description
            description = ' '.join(response.css('._1xzp5ma::text').getall() or response.css('._1fmyluo3::text').getall())
            if description:
                listing_data['description'] = description
            
            # Amenities
            amenities = response.css('._gw4xx4::text').getall()
            if amenities:
                listing_data['amenities'] = amenities
            
            # Host information
            host_name = response.css('._f47qa6::text').get() or response.css('._14i3z6h::text').get()
            if host_name:
                listing_data['host_name'] = host_name
            
            host_image = response.css('._9bezani::attr(src)').get()
            if host_image:
                listing_data['host_image'] = host_image
        
        # Send data to the Django backend
        self.send_to_backend(listing_data)
        
        # Also yield the item for Scrapy's built-in output
        yield listing_data
    
    def send_to_backend(self, listing_data):
        try:
            headers = {'Content-Type': 'application/json'}
            response = requests.post(self.backend_url, json=listing_data, headers=headers)
            if response.status_code == 201:
                self.logger.info(f"Successfully sent data to backend: {listing_data['title']}")
            else:
                self.logger.error(f"Failed to send data: {response.status_code} - {response.text}")
        except Exception as e:
            self.logger.error(f"Error sending data to backend: {str(e)}")
