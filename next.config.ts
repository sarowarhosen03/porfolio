import type { NextConfig } from "next";
import { URL } from "url";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https:///content.sarowar.dev/**"),
      new URL("https:///content.vivobox.xyz/**"),
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
