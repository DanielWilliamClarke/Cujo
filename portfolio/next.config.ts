/** @type {import('next').NextConfig} */

// import nrExternals from "newrelic/load-externals.js";

const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["newrelic"],
  },
  webpack: (config) => {
    // nrExternals(config);
    return config;
  },
};

export default nextConfig;
