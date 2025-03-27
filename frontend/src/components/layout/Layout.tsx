import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-300 pt-8">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="font-bold mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm hover:underline">Help Center</a></li>
                  <li><a href="#" className="text-sm hover:underline">Safety Information</a></li>
                  <li><a href="#" className="text-sm hover:underline">Cancellation options</a></li>
                </ul>
              </div>
              <div className="mb-6 md:mb-0">
                <h3 className="font-bold mb-4">Community</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm hover:underline">Disaster relief housing</a></li>
                  <li><a href="#" className="text-sm hover:underline">Combating discrimination</a></li>
                </ul>
              </div>
              <div className="mb-6 md:mb-0">
                <h3 className="font-bold mb-4">Hosting</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm hover:underline">Airbnb your home</a></li>
                  <li><a href="#" className="text-sm hover:underline">AirCover for Hosts</a></li>
                  <li><a href="#" className="text-sm hover:underline">Explore hosting resources</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Airbnb</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm hover:underline">Newsroom</a></li>
                  <li><a href="#" className="text-sm hover:underline">New features</a></li>
                  <li><a href="#" className="text-sm hover:underline">Careers</a></li>
                  <li><a href="#" className="text-sm hover:underline">Investors</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-300 text-sm text-gray-500">
              <p>© 2023 Airbnb Scraper, Inc. · Privacy · Terms · Sitemap</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 