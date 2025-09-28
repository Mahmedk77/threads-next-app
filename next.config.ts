import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mongoose"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'images.clerk.dev',
      },
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      // ✅ Add UploadThing CDN domain(s)
      {
        protocol: 'https',
        hostname: '*.ufs.sh',  // wildcard to support any subdomain like ndplttmywc.ufs.sh
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',   // optional - sometimes UploadThing uses this base CDN
      },
    ],
  },
};

export default nextConfig;
