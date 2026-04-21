import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",        // Static HTML export → generates /out folder
  distDir: "dist",         // Output to /dist instead of /out
  reactStrictMode: true,
  images: {
    unoptimized: true,     // Required for static export
  },
  trailingSlash: true,     // Netlify needs this for clean URLs

  // Speed up compilation
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@gsap/react"],
  },

  // Exclude heavy 3D libs from server bundle — they are client-only
  serverExternalPackages: ["three", "vanta"],
};

export default nextConfig;
