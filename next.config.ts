import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Use unoptimized images on Cloudflare Pages (no image optimization server)
    unoptimized: true,
  },
  trailingSlash: false,

  // Speed up compilation
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@gsap/react"],
  },

  // Exclude heavy 3D libs from server bundle — they are client-only
  serverExternalPackages: ["three", "vanta"],
};

export default nextConfig;
