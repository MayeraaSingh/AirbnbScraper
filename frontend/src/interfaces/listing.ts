export interface Listing {
  id: number;
  title: string;
  location: string;
  address: string;
  price_per_night: number | string;
  currency: string;
  total_price: number | string;
  image_urls: string[];
  rating: number | null;
  description: string;
  number_of_reviews: number;
  amenities: string[];
  host_name: string;
  host_image: string | null;
  host_since: string;
  property_type: string;
  created_at: string;
  updated_at: string;
}

export interface ListingsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Listing[];
}

export interface SearchParams {
  location?: string;
  checkin?: string;
  checkout?: string;
  adults?: number;
  min_price?: number;
  max_price?: number;
  min_rating?: number;
} 