import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch, FaCalendarAlt, FaUser, FaDollarSign, FaStar } from 'react-icons/fa';

interface SearchBarProps {
  initialLocation?: string;
  initialCheckin?: Date;
  initialCheckout?: Date;
  initialAdults?: number;
  initialMinPrice?: number;
  initialMaxPrice?: number;
  initialMinRating?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  initialLocation = '',
  initialCheckin,
  initialCheckout,
  initialAdults = 2,
  initialMinPrice,
  initialMaxPrice,
  initialMinRating,
}) => {
  const router = useRouter();
  const [location, setLocation] = useState(initialLocation);
  const [checkin, setCheckin] = useState<Date | null>(initialCheckin || null);
  const [checkout, setCheckout] = useState<Date | null>(initialCheckout || null);
  const [adults, setAdults] = useState(initialAdults);
  const [minPrice, setMinPrice] = useState<number | undefined>(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(initialMaxPrice);
  const [minRating, setMinRating] = useState<number | undefined>(initialMinRating);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchParams = new URLSearchParams();
    if (location) searchParams.set('location', location);
    if (checkin) searchParams.set('checkin', checkin.toISOString().split('T')[0]);
    if (checkout) searchParams.set('checkout', checkout.toISOString().split('T')[0]);
    if (adults) searchParams.set('adults', adults.toString());
    if (minPrice) searchParams.set('min_price', minPrice.toString());
    if (maxPrice) searchParams.set('max_price', maxPrice.toString());
    if (minRating) searchParams.set('min_rating', minRating.toString());
    
    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-4xl mx-auto my-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <div className="relative">
              <input
                type="text"
                className="input-field pl-10"
                placeholder="Where are you going?"
                value={location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
            <div className="relative">
              <DatePicker
                selected={checkin}
                onChange={(date) => setCheckin(date)}
                selectsStart
                startDate={checkin}
                endDate={checkout}
                className="input-field pl-10 w-full"
                placeholderText="Check-in date"
                dateFormat="yyyy-MM-dd"
              />
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
            <div className="relative">
              <DatePicker
                selected={checkout}
                onChange={(date) => setCheckout(date)}
                selectsEnd
                startDate={checkin}
                endDate={checkout}
                minDate={checkin}
                className="input-field pl-10 w-full"
                placeholderText="Check-out date"
                dateFormat="yyyy-MM-dd"
              />
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          
          <div className="flex-0">
            <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="16"
                className="input-field pl-10 w-24"
                value={adults}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAdults(parseInt(e.target.value))}
              />
              <FaUser className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-4 border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  className="input-field pl-10"
                  placeholder="Minimum price"
                  value={minPrice || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinPrice(e.target.value ? parseInt(e.target.value) : undefined)}
                />
                <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  className="input-field pl-10"
                  placeholder="Maximum price"
                  value={maxPrice || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxPrice(e.target.value ? parseInt(e.target.value) : undefined)}
                />
                <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Rating</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  className="input-field pl-10"
                  placeholder="Minimum rating"
                  value={minRating || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinRating(e.target.value ? parseFloat(e.target.value) : undefined)}
                />
                <FaStar className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <button
            type="button"
            className="text-airbnb-pink hover:underline"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Hide advanced filters' : 'Show advanced filters'}
          </button>
          
          <button type="submit" className="btn-primary flex items-center">
            <FaSearch className="mr-2" />
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar; 