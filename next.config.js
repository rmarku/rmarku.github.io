/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
