/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Socket.io requires access to the Node.js server
  // We need to disable the default Next.js behavior that would interfere
  experimental: {
    // Ensure compatibility with Socket.io
  },
}

module.exports = nextConfig
