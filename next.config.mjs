/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  // Environment variables are automatically loaded from .env files
  // No need to configure them here unless you want to expose them to client-side
  // Variables with NEXT_PUBLIC_ prefix are automatically exposed to client-side
  // Variables without prefix are only available on server-side
};

export default nextConfig;
