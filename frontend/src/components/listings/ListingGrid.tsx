import React from 'react';
import ListingCard from './ListingCard';
import { Listing } from '@/interfaces/listing';

interface ListingGridProps {
  listings: Listing[];
  loading?: boolean;
  error?: string | null;
  loadMore?: () => void;
  hasMore?: boolean;
}

const ListingGrid: React.FC<ListingGridProps> = ({
  listings,
  loading = false,
  error = null,
  loadMore,
  hasMore = false,
}) => {
  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (listings.length === 0 && !loading) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-xl font-medium mb-2">No listings found</h3>
        <p className="text-gray-500">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
        
        {loading && (
          Array(4).fill(0).map((_, index) => (
            <div key={`skeleton-${index}`} className="rounded-xl overflow-hidden shadow-listing">
              <div className="h-64 w-full bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-5 w-3/4 bg-gray-200 animate-pulse mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 animate-pulse mb-4"></div>
                <div className="h-4 w-1/4 bg-gray-200 animate-pulse"></div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            className="btn-outline"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load more listings'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ListingGrid; 