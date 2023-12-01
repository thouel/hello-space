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
      {
        protocol: 'https',
        hostname: 'daisyui.com',
        pathname: 'images/stock/*',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/*',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        pathname: '/embed/avatars/*',
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
