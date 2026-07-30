import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      root: path.resolve('.'),
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
