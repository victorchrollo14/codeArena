import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({ test: /\.node$/, use: 'node-loader' });
    config.resolve.extensions.push('.node');
    config.externals = [...config.externals, 'bcrypt'];
    return config;
  },
};

export default nextConfig;
