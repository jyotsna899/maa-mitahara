/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],
  images: {
    domains: ['images.unsplash.com', 'cdn.shopify.com'],
  },
};

export default nextConfig;
