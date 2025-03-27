import requests
import json

"""
Test script to send a sample Airbnb listing to the Django REST API
"""

# API endpoint
API_URL = "http://localhost:8000/api/listings/"

# Sample Airbnb listing
sample_listing = {
    "title": "Beautiful Apartment in Downtown",
    "location": "New York",
    "address": "123 Main St, New York, NY",
    "price_per_night": 149.99,
    "currency": "$",
    "total_price": 799.95,
    "image_urls": [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
    ],
    "rating": 4.85,
    "description": "This is a beautiful apartment located in the heart of downtown with amazing views of the city skyline.",
    "number_of_reviews": 52,
    "amenities": [
        "Wi-Fi",
        "Air conditioning",
        "Kitchen",
        "Washer",
        "Dryer"
    ],
    "host_name": "John Doe",
    "host_image": "https://example.com/host.jpg",
    "host_since": "January 2020",
    "property_type": "Apartment"
}

def test_post_listing():
    """Send a POST request to create a new listing"""
    headers = {"Content-Type": "application/json"}
    
    try:
        response = requests.post(API_URL, json=sample_listing, headers=headers)
        
        if response.status_code == 201:
            print(f"Success! Created listing with ID: {response.json().get('id')}")
            print(f"Response: {json.dumps(response.json(), indent=2)}")
        else:
            print(f"Error: {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"Exception: {str(e)}")

def test_get_listings():
    """Send a GET request to retrieve all listings"""
    try:
        response = requests.get(API_URL)
        
        if response.status_code == 200:
            listings = response.json()
            print(f"Success! Retrieved {len(listings.get('results', []))} listings")
            print(f"Response: {json.dumps(listings, indent=2)}")
        else:
            print(f"Error: {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"Exception: {str(e)}")

if __name__ == "__main__":
    print("Testing POST request to create a new listing...")
    test_post_listing()
    
    print("\nTesting GET request to retrieve all listings...")
    test_get_listings() 