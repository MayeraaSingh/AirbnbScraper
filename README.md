# Airbnb Scraper

A full-stack application for scraping and displaying Airbnb listings with a modern, responsive UI.

## Screenshots

## Project Architecture

```
AirbnbScraper/
├── backend/             # Django REST Framework backend
│   ├── airbnb_project/  # Django project settings
│   ├── listings_api/    # API app for handling listings data
│   └── manage.py
├── frontend/            # Next.js & Tailwind CSS frontend
│   ├── src/             # Source code
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── interfaces/  # TypeScript interfaces
│   │   └── pages/       # Next.js pages
│   ├── public/          # Static assets
│   └── package.json     # Frontend dependencies
├── scraper/             # Scrapy-based scraper for Airbnb
│   ├── airbnb_scraper/  # Scrapy project
│   ├── run_scraper.py   # Script to run the scraper
├── requirements.txt     # Backend dependencies
└── README.md            # Project documentation
```

## Features

### Backend API (Django REST Framework)
- `GET /api/listings/` - Returns all Airbnb listings from the database with pagination
- `POST /api/listings/` - Inserts new Airbnb listing(s) into the database (accepts both single object and list of objects)
- `GET /api/listings/{id}/` - Returns a specific listing by ID
- Additional standard REST endpoints (PUT, PATCH, DELETE) for managing listings

### Scraper (Scrapy)
- Web scraper that extracts Airbnb listing data with the following information:
  - Listing title and property type
  - Location and address
  - Price information (per night, total, currency)
  - Images (URLs)
  - Ratings and number of reviews
  - Full description
  - Available amenities
  - Host information (name, image, host since)
- Handles pagination to scrape multiple pages of search results
- Identifies and extracts data from Airbnb's API calls
- POST requests to Django backend to store scraped data

### Frontend (Next.js & Tailwind CSS)
- Responsive Airbnb-like UI built with Tailwind CSS
- Search results page with filtering options:
  - Location
  - Check-in/Check-out dates
  - Number of guests
  - Price range
  - Rating filter
- Detailed listing page showing:
  - Image gallery
  - Property details and amenities
  - Host information
  - Pricing information
- Server-side rendering for SEO optimization
- Pagination support for viewing more listings

## Technologies Used

### Backend
- Python 3.8+
- Django 5.1+
- Django REST Framework
- SQLite (development) / MySQL (production)
- CORS headers for cross-origin requests

### Frontend
- Node.js 14+
- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS
- Axios for API requests
- React Icons

### Scraper
- Scrapy 2.8+
- Requests
- JSON

## Environment Setup

### Prerequisites
- Python 3.8+ with pip
- Node.js 14+ with npm
- Git

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd AirbnbScraper
   ```

2. Create a virtual environment (recommended):
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Navigate to the backend directory:
   ```bash
   cd backend
   ```

5. Run migrations:
   ```bash
   python manage.py migrate
   ```

6. Create a superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```

7. Start the Django server:
   ```bash
   python manage.py runserver
   ```
   
   The API will be available at http://127.0.0.1:8000/api/

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at http://localhost:3000

### Scraper Setup

1. Navigate to the scraper directory:
   ```bash
   cd ../scraper
   ```

2. Run the scraper:
   ```bash
   python run_scraper.py --location "new york" --checkin "2023-10-10" --checkout "2023-10-15" --adults 2
   ```

   Or with default parameters:
   ```bash
   python run_scraper.py
   ```

## API Documentation

### Endpoints

- **GET** `/api/listings/` - Get all listings with pagination
  - Query Parameters:
    - `location` (string): Filter by location
    - `min_price` (number): Filter by minimum price per night
    - `max_price` (number): Filter by maximum price per night
    - `min_rating` (number): Filter by minimum rating
    - `adults` (number): Filter by number of adults
    - `checkin` (YYYY-MM-DD): Filter by check-in date
    - `checkout` (YYYY-MM-DD): Filter by check-out date

- **POST** `/api/listings/` - Create new listing(s)
  - Body: Single Listing object or array of Listing objects

- **GET** `/api/listings/{id}/` - Get a specific listing by ID

- **PUT/PATCH** `/api/listings/{id}/` - Update a specific listing

- **DELETE** `/api/listings/{id}/` - Delete a specific listing

### Listing Object Schema

```json
{
  "id": 1,
  "title": "Beachfront Villa",
  "location": "Malibu, CA",
  "address": "123 Beachside Drive",
  "price_per_night": 350.00,
  "currency": "USD",
  "total_price": 1750.00,
  "image_urls": ["https://example.com/image1.jpg"],
  "rating": 4.87,
  "description": "Beautiful beachfront villa with stunning ocean views",
  "number_of_reviews": 45,
  "amenities": ["Wi-Fi", "Pool"],
  "host_name": "John Smith",
  "host_image": "https://example.com/host.jpg",
  "host_since": "January 2019",
  "property_type": "Villa",
  "created_at": "2023-10-10T14:23:26.423977Z",
  "updated_at": "2023-10-10T14:23:26.423977Z"
}
```