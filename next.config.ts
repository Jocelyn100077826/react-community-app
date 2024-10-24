import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com'], // Allow images from this domain
  },
};

export default nextConfig;
