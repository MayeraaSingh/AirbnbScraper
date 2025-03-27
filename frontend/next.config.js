/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configure TypeScript for the project
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Configure image domains
  images: {
    domains: ['a0.muscache.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig 