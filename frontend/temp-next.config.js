const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['a0.muscache.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig 