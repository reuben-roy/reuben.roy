/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.explosion.fun',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
