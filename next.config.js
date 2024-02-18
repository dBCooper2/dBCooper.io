module.exports = {
  images: {
    unoptimized: true,
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "imgur.com",
    ],
  },
  webpack: (config, { isServer }) => {
    // Add file-loader for HTML files
    config.module.rules.push({
      test: /\.html$/,
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
        outputPath: "static", // Adjust the output path as needed
      },
    });

    return config;
  },
};
