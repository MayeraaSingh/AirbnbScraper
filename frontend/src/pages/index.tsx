import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import SearchBar from '@/components/search/SearchBar';
import ListingGrid from '@/components/listings/ListingGrid';
import { useListings } from '@/hooks/useApi';

const HomePage: NextPage = () => {
  const router = useRouter();
  const { listings, loading, error, total, loadMore, hasMore } = useListings();

  return (
    <Layout>
      <Head>
        <title>Airbnb Scraper | Find Vacation Rentals & Unique Homes</title>
        <meta name="description" content="Browse vacation rentals, cabins, beach houses, and unique homes on Airbnb Scraper" />
      </Head>

      <div className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-airbnb-dark-gray mb-4">
              Find your next stay
            </h1>
            <p className="text-xl text-gray-600">
              Search vacation rentals, cabins, beach houses, and unique homes
            </p>
          </div>

          <SearchBar />
          
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                {loading ? 'Loading listings...' : `${total || 0} available stays`}
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

export default HomePage; 