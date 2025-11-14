import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/3DBusinessCard" : "",
  assetPrefix: isProd ? "/3DBusinessCard/" : "",
  trailingSlash: true,
  images: { unoptimized: true }, 
};

export default nextConfig;
