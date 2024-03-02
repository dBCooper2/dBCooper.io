const withMDX = require('@next/mdx')()

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
  images: {
    unoptimized: true,
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "imgur.com",
    ],
  },
};

module.exports = nextConfig;
