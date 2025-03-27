import React from 'react';
import Image from 'next/image';
import { FaStar, FaUser, FaRegCalendar, FaHome, FaBed, FaBath, FaWifi } from 'react-icons/fa';
import { Listing } from '@/interfaces/listing';

interface ListingDetailProps {
  listing: Listing;
}

const ListingDetail: React.FC<ListingDetailProps> = ({ listing }) => {
  // Format price with currency
  const formattedPrice = (price: string | number) => {
    if (typeof price === 'string') {
      return price;
    }
    return `${listing.currency} ${price.toLocaleString()}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Listing Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">{listing.title}</h1>
        <div className="flex items-center flex-wrap gap-4">
          {listing.rating && (
            <div className="flex items-center">
              <FaStar className="text-airbnb-pink mr-1" />
              <span>{listing.rating}</span>
              <span className="mx-1">·</span>
              <span className="text-gray-700">{listing.number_of_reviews} reviews</span>
            </div>
          )}
          <div className="text-gray-700">
            <span>{listing.location}</span>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        {listing.image_urls && listing.image_urls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="relative h-64 md:h-96 rounded-tl-xl rounded-bl-xl overflow-hidden">
              <Image
                src={listing.image_urls[0]}
                alt={`${listing.title} - main image`}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {listing.image_urls.slice(1, 5).map((url, index) => (
                <div 
                  key={index} 
                  className={`relative h-32 md:h-47 overflow-hidden ${
                    index === 1 ? 'rounded-tr-xl' : ''
                  } ${index === 3 ? 'rounded-br-xl' : ''}`}
                >
                  <Image
                    src={url}
                    alt={`${listing.title} - image ${index + 2}`}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500">No images available</span>
          </div>
        )}
      </div>

      {/* Listing Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          {/* Host Section */}
          <div className="mb-6 pb-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {listing.property_type} hosted by {listing.host_name}
                </h2>
                {listing.host_since && (
                  <p className="text-gray-600 mt-1">Host since {listing.host_since}</p>
                )}
              </div>
              <div className="flex-shrink-0">
                {listing.host_image ? (
                  <div className="relative h-14 w-14 rounded-full overflow-hidden">
                    <Image
                      src={listing.host_image}
                      alt={listing.host_name}
                      className="object-cover"
                      fill
                      sizes="56px"
                    />
                  </div>
                ) : (
                  <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center">
                    <FaUser className="text-gray-400 text-2xl" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 pb-6 border-b">
            <h2 className="text-xl font-semibold mb-4">About this place</h2>
            <p className="text-gray-700 whitespace-pre-line">{listing.description}</p>
          </div>

          {/* Amenities */}
          {listing.amenities && listing.amenities.length > 0 && (
            <div className="mb-6 pb-6 border-b">
              <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {listing.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <FaWifi className="mr-3 text-gray-500" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Location info */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <p className="text-gray-700">{listing.address}</p>
          </div>
        </div>

        {/* Price Card */}
        <div className="col-span-1">
          <div className="sticky top-28 border rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xl font-semibold">
                  {formattedPrice(listing.price_per_night)}
                </span>
                <span className="text-gray-700"> night</span>
              </div>
              {listing.rating && (
                <div className="flex items-center">
                  <FaStar className="text-airbnb-pink mr-1" />
                  <span>{listing.rating}</span>
                </div>
              )}
            </div>

            {/* Booking form */}
            <div className="border rounded-lg overflow-hidden mb-4">
              <div className="grid grid-cols-2">
                <div className="p-3 border-r border-b">
                  <label className="block text-xs font-semibold">CHECK-IN</label>
                  <div className="flex items-center mt-1">
                    <FaRegCalendar className="text-gray-400 mr-2" />
                    <input 
                      type="date" 
                      className="w-full border-none p-0 focus:ring-0" 
                      placeholder="Add date" 
                    />
                  </div>
                </div>
                <div className="p-3 border-b">
                  <label className="block text-xs font-semibold">CHECKOUT</label>
                  <div className="flex items-center mt-1">
                    <FaRegCalendar className="text-gray-400 mr-2" />
                    <input 
                      type="date" 
                      className="w-full border-none p-0 focus:ring-0" 
                      placeholder="Add date" 
                    />
                  </div>
                </div>
                <div className="p-3 col-span-2">
                  <label className="block text-xs font-semibold">GUESTS</label>
                  <div className="flex items-center mt-1">
                    <FaUser className="text-gray-400 mr-2" />
                    <select className="w-full border-none p-0 focus:ring-0">
                      <option>1 guest</option>
                      <option>2 guests</option>
                      <option>3 guests</option>
                      <option>4 guests</option>
                      <option>5 guests</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full btn-primary mb-4">
              Reserve
            </button>

            <div className="text-center text-gray-500 text-sm">
              You won&apos;t be charged yet
            </div>

            {listing.total_price && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span className="underline">
                    {formattedPrice(listing.price_per_night)} x 5 nights
                  </span>
                  <span>{formattedPrice(listing.total_price)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="underline">Cleaning fee</span>
                  <span>{listing.currency} 85</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="underline">Service fee</span>
                  <span>{listing.currency} 120</span>
                </div>
                <div className="flex justify-between font-semibold pt-4 mt-4 border-t">
                  <span>Total before taxes</span>
                  <span>{formattedPrice(listing.total_price)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail; 