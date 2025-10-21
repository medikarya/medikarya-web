import withBundleAnalyzer from '@next/bundle-analyzer'

const analyzeBuild = process.env.ANALYZE === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true
}

export default analyzeBuild 
  ? withBundleAnalyzer({ enabled: true })(nextConfig)
  : nextConfig