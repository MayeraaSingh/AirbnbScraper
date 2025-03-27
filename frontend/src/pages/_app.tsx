import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

// Simple App component without relying on Next.js type imports
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp; 