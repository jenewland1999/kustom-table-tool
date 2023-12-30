import { withHydrationOverlay } from '@builder.io/react-hydration-overlay/next';

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

export default withHydrationOverlay({
  /**
   * Optional: `appRootSelector` is the selector for the root element of your app. By default, it is `#__next` which works
   * for Next.js apps with pages directory. If you are using the app directory, you should change this to `main`.
   */
  appRootSelector: 'main',
})(nextConfig);
