import axios from 'axios';
import { useState, useEffect } from 'react';
import { Listing, ListingsResponse, SearchParams } from '@/interfaces/listing';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useListings = (searchParams?: SearchParams) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [nextPage, setNextPage] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        // Construct query parameters
        const params: Record<string, string> = {};
        if (searchParams?.location) params.location = searchParams.location;
        if (searchParams?.checkin) params.checkin = searchParams.checkin;
        if (searchParams?.checkout) params.checkout = searchParams.checkout;
        if (searchParams?.adults) params.adults = searchParams.adults.toString();
        if (searchParams?.min_price) params.min_price = searchParams.min_price.toString();
        if (searchParams?.max_price) params.max_price = searchParams.max_price.toString();
        if (searchParams?.min_rating) params.min_rating = searchParams.min_rating.toString();

        const response = await api.get<ListingsResponse>('/listings/', { params });
        setListings(response.data.results);
        setTotal(response.data.count);
        setNextPage(response.data.next);
        setError(null);
      } catch (err) {
        console.error('Error fetching listings:', err);
        setError('Failed to fetch listings. Please try again later.');
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [searchParams]);

  const loadMore = async () => {
    if (!nextPage) return;
    
    setLoading(true);
    try {
      const response = await axios.get<ListingsResponse>(nextPage);
      setListings(prev => [...prev, ...response.data.results]);
      setNextPage(response.data.next);
    } catch (err) {
      console.error('Error loading more listings:', err);
      setError('Failed to load more listings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return { listings, loading, error, total, loadMore, hasMore: !!nextPage };
};

export const useListing = (id: number) => {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const response = await api.get<Listing>(`/listings/${id}/`);
        setListing(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching listing details:', err);
        setError('Failed to fetch listing details. Please try again later.');
        setListing(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchListing();
    }
  }, [id]);

  return { listing, loading, error };
}; 