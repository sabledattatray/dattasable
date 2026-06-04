/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async redirects() {
    return [
      {
        source: '/what-is-seo-in-digital-marketing-and-how-does-it-work-for-beginners',
        destination: '/blog/what-is-seo-digital-marketing-guide',
        permanent: true,
      },
      {
        source: '/7-best-seo-tools-in-2025',
        destination: '/blog/7-best-seo-tools-2025',
        permanent: true,
      },
      {
        source: '/top-5-free-tools-every-content-creator-should-be-using-in-2025',
        destination: '/blog/top-5-free-content-creator-tools-2025',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/blog-post',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/portfolio-item',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/live-dashboard',
        destination: '/analytics-live',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
