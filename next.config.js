/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Disable eslint in CI environment to avoid repeat runs.
   */
  eslint: {
    ignoreDuringBuilds: process.env.CI === 'true',
  },
  /**
   * Disable type checking in CI environment to avoid repeat runs.
   */
  typescript: {
    ignoreBuildErrors: process.env.CI === 'true',
  },
};

export default nextConfig;
