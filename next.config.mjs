/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/finoglob',
        destination: '/finoglob.html',
      },
      {
        source: '/edu',
        destination: '/edu.html',
      },
      {
        source: '/broker',
        destination: '/broker.html',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  // Optimize for production
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig