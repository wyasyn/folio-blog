import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/my-account/**",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
    ],
  },
};

export default nextConfig;
