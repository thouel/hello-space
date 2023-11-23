const { withLogtail } = require('@logtail/next')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apod.nasa.gov',
        pathname: '/apod/image/**',
        port: '',
      },
    ],
  },
  compiler: {
    removeConsole: false,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    typedRoutes: true,
  },
}

module.exports = withLogtail(nextConfig)
