import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/Web-Chomm-s-House",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
