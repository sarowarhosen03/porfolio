import type { NextConfig } from 'next'
import { URL } from 'url'
const base =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://sarowar.dev'
const devEnv = {
  BASE_URL: base,
  AUTH_URL: base,
  NEXT_PUBLIC_BASE_URL: base,
}

const prodEnv = {
  BASE_URL: base,
  AUTH_URL: base,
  NEXT_PUBLIC_BASE_URL: base,
}
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https:///content.sarowar.dev/**'),
      new URL('https:///content.vivobox.xyz/**'),
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    ...(process.env.NODE_ENV === 'development' ? devEnv : prodEnv),
  },
}

export default nextConfig
