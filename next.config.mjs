import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverActions: { bodySizeLimit: '2mb' } },
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(process.cwd(), 'src');
    config.resolve.alias['@scripts'] = path.join(process.cwd(), 'scripts');
    return config;
  }
};
export default nextConfig;