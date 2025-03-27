import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import SearchBar from '@/components/search/SearchBar';
import ListingGrid from '@/components/listings/ListingGrid';
import { useListings } from '@/hooks/useApi';
import { SearchParams } from '@/interfaces/listing';

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { 
    location, 
    checkin, 
    checkout, 
    adults, 
    min_price, 
    max_price, 
    min_rating 
  } = router.query;
  
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  
  useEffect(() => {
    if (!router.isReady) return;
    
    const params: SearchParams = {};
    if (location) params.location = location as string;
    if (checkin) params.checkin = checkin as string;
    if (checkout) params.checkout = checkout as string;
    if (adults) params.adults = parseInt(adults as string);
    if (min_price) params.min_price = parseInt(min_price as string);
    if (max_price) params.max_price = parseInt(max_price as string);
    if (min_rating) params.min_rating = parseFloat(min_rating as string);
    
    setSearchParams(params);
  }, [router.isReady, location, checkin, checkout, adults, min_price, max_price, min_rating]);

  const { listings, loading, error, total, loadMore, hasMore } = useListings(searchParams);

  return (
    <Layout>
      <Head>
        <title>
          {location 
            ? `${location} - Airbnb Scraper | Vacation Rentals & Unique Homes` 
            : 'Search Results - Airbnb Scraper'}
        </title>
        <meta 
          name="description" 
          content={`Browse vacation rentals${location ? ` in ${location}` : ''}, cabins, beach houses, and unique homes on Airbnb Scraper`} 
        />
      </Head>

      <div className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <SearchBar 
            initialLocation={location as string}
            initialCheckin={checkin ? new Date(checkin as string) : undefined}
            initialCheckout={checkout ? new Date(checkout as string) : undefined}
            initialAdults={adults ? parseInt(adults as string) : undefined}
            initialMinPrice={min_price ? parseInt(min_price as string) : undefined}
            initialMaxPrice={max_price ? parseInt(max_price as string) : undefined}
            initialMinRating={min_rating ? parseFloat(min_rating as string) : undefined}
          />
          
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                {loading 
                  ? 'Loading listings...' 
                  : `${total || 0} ${location ? `stays in ${location}` : 'available stays'}`}
              </h2>
            </div>

            <ListingGrid 
              listings={listings}
              loading={loading}
              error={error}
              loadMore={loadMore}
              hasMore={hasMore}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage; 