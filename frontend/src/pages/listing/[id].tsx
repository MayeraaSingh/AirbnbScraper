import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import Layout from '@/components/layout/Layout';
import ListingDetail from '@/components/listings/ListingDetail';
import { useListing } from '@/hooks/useApi';
import { Listing } from '@/interfaces/listing';

interface ListingPageProps {
  fallbackListing?: Listing;
}

const ListingPage: NextPage<ListingPageProps> = ({ fallbackListing }) => {
  const router = useRouter();
  const { id } = router.query;
  const listingId = typeof id === 'string' ? parseInt(id) : 0;

  // Use client-side data fetching if no fallback data is available
  const { listing, loading, error } = useListing(listingId);

  // Use fallback data if available, otherwise use client-side fetched data
  const currentListing = fallbackListing || listing;

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-semibold text-red-500">Error</h1>
            <p className="mt-4">{error}</p>
            <button 
              onClick={() => router.back()} 
              className="mt-6 px-4 py-2 bg-airbnb-pink text-white rounded-lg"
            >
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (loading || !currentListing) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="h-44 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-2">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
                
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="h-8 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="col-span-1">
                <div className="border rounded-xl p-6">
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-40 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-8"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{currentListing.title} - Airbnb Scraper</title>
        <meta name="description" content={currentListing.description.substring(0, 160)} />
      </Head>
      
      <ListingDetail listing={currentListing} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};
  
  try {
    if (id) {
      const response = await axios.get(`http://localhost:8000/api/listings/${id}/`);
      return {
        props: {
          fallbackListing: response.data
        }
      };
    }
  } catch (error) {
    console.error('Error fetching listing:', error);
  }
  
  return {
    props: {}
  };
};

export default ListingPage; 