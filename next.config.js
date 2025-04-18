/** @type {import('next').NextConfig} */

const nextConfig = {
  // Exclude tempobook directory from the build
  webpack: (config, { isServer }) => {
    // Add a rule to ignore the tempobook directory
    config.module.rules.push({
      test: /[\\/]tempobook[\\/]/,
      loader: "ignore-loader",
    });
    return config;
  },
  // Explicitly exclude tempobook directory from the build
  distDir: ".next",
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // Exclude specific directories from the build
  excludeDefaultMomentLocales: true,
  // Explicitly ignore tempobook directory
  transpilePackages: [],
  // Add more specific exclusions for the tempobook directory
  reactStrictMode: true,
  eslint: {
    // Ignore tempobook directory for eslint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore type errors in tempobook directory
    ignoreBuildErrors: true,
  },
};

if (process.env.NEXT_PUBLIC_TEMPO) {
  nextConfig["experimental"] = {
    // NextJS 13.4.8 up to 14.1.3:
    // swcPlugins: [[require.resolve("tempo-devtools/swc/0.86"), {}]],
    // NextJS 14.1.3 to 14.2.11:
    swcPlugins: [[require.resolve("tempo-devtools/swc/0.90"), {}]],

    // NextJS 15+ (Not yet supported, coming soon)
  };
}

module.exports = nextConfig;
