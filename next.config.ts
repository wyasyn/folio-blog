// @ts-check
import withPlaiceholder from "@plaiceholder/next";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "images.unsplash.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "res.cloudinary.com",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "unsplash.com",
    //   },
    // ],
  },
};

export default withPlaiceholder(nextConfig);
