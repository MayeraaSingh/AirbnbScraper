import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { Listing } from '@/interfaces/listing';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  // Format price with currency
  const formattedPrice = (price: string | number) => {
    if (typeof price === 'string') {
      return price;
    }
    return `${listing.currency} ${price.toLocaleString()}`;
  };

  return (
    <Link href={`/listing/${listing.id}`} className="block">
      <div className="group rounded-xl overflow-hidden shadow-listing hover:shadow-lg transition-shadow duration-300">
        {/* Image carousel */}
        <div className="relative h-64 w-full overflow-hidden">
          {listing.image_urls && listing.image_urls.length > 0 ? (
            <Image
              src={listing.image_urls[0]}
              alt={listing.title}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>

        {/* Listing details */}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg leading-tight line-clamp-1">{listing.title}</h3>
            {listing.rating && (
              <div className="flex items-center">
                <FaStar className="text-airbnb-pink mr-1" />
                <span>{listing.rating}</span>
              </div>
            )}
          </div>

          <p className="text-gray-500 mt-1">{listing.location}</p>

          <div className="mt-2 flex flex-wrap gap-1">
            {listing.property_type && (
              <span className="inline-block bg-airbnb-light-gray text-xs px-2 py-1 rounded-md">
                {listing.property_type}
              </span>
            )}
            {listing.amenities && listing.amenities.length > 0 && (
              <span className="inline-block bg-airbnb-light-gray text-xs px-2 py-1 rounded-md">
                {listing.amenities.length} amenities
              </span>
            )}
          </div>

          <div className="mt-4">
            <p className="font-semibold">
              {formattedPrice(listing.price_per_night)} <span className="font-normal">night</span>
            </p>
            {listing.total_price && (
              <p className="text-sm text-gray-500">
                {formattedPrice(listing.total_price)} total
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard; 