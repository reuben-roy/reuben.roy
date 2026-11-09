const EXPLOSION = 'https://www.explosion.fun';
const GITHUB = 'https://github.com/reuben-roy';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/about', destination: `${EXPLOSION}/about/`, permanent: true },
      { source: '/about/:path*', destination: `${EXPLOSION}/about/`, permanent: true },
      { source: '/cv', destination: `${EXPLOSION}/cv/`, permanent: true },
      { source: '/cv/:path*', destination: `${EXPLOSION}/cv/`, permanent: true },
      {
        source: '/reuben-roy-cv.pdf',
        destination: `${EXPLOSION}/reuben-roy-cv.pdf`,
        permanent: true,
      },
      { source: '/cv.md', destination: `${EXPLOSION}/cv.md`, permanent: true },
      { source: '/blog', destination: `${EXPLOSION}/blog/`, permanent: true },
      { source: '/blog/:path*', destination: `${EXPLOSION}/blog/:path*/`, permanent: true },
      { source: '/side-track', destination: `${EXPLOSION}/side-track/`, permanent: true },
      {
        source: '/side-track/changelog',
        destination: `${EXPLOSION}/side-track/changelog/`,
        permanent: true,
      },
      {
        source: '/side-track/privacy',
        destination: `${EXPLOSION}/side-track/privacy/`,
        permanent: true,
      },
      {
        source: '/side-track/support',
        destination: `${EXPLOSION}/side-track/support/`,
        permanent: true,
      },
      {
        source: '/side-track/terms',
        destination: `${EXPLOSION}/side-track/terms/`,
        permanent: true,
      },
      {
        source: '/side-track/:path*',
        destination: `${EXPLOSION}/side-track/`,
        permanent: true,
      },

      {
        source: '/projects/auto-apply',
        destination: `${EXPLOSION}/projects/auto-apply/`,
        permanent: true,
      },
      {
        source: '/projects/greatness',
        destination: `${EXPLOSION}/projects/greatness/`,
        permanent: true,
      },
      {
        source: '/projects/greatness/:path*',
        destination: `${EXPLOSION}/projects/greatness/`,
        permanent: true,
      },
      {
        source: '/projects/time-management',
        destination: `${EXPLOSION}/projects/time-management/`,
        permanent: true,
      },
      {
        source: '/projects/time-management/:path*',
        destination: `${EXPLOSION}/projects/time-management/`,
        permanent: true,
      },
      {
        source: '/projects/youtube-scholar',
        destination: `${EXPLOSION}/projects/youtube-scholar/`,
        permanent: true,
      },
      {
        source: '/projects/youtube-scholar/channels',
        destination: `${EXPLOSION}/projects/youtube-scholar/channels/`,
        permanent: true,
      },
      {
        source: '/projects/youtube-scholar/curiosity-velocity',
        destination: `${EXPLOSION}/projects/youtube-scholar/curiosity-velocity/`,
        permanent: true,
      },
      {
        source: '/projects/youtube-scholar/:path*',
        destination: `${EXPLOSION}/projects/youtube-scholar/`,
        permanent: true,
      },
      {
        source: '/projects/agent-star-growth',
        destination: `${EXPLOSION}/projects/agent-star-growth/`,
        permanent: true,
      },
      {
        source: '/projects/employment-by-sex',
        destination: `${EXPLOSION}/projects/employment-by-sex/`,
        permanent: true,
      },
      {
        source: '/projects/side-track',
        destination: `${EXPLOSION}/side-track/`,
        permanent: true,
      },
      { source: '/projects/explosion-fun', destination: `${EXPLOSION}/`, permanent: true },
      {
        source: '/projects/interactive-visualizations',
        destination: `${EXPLOSION}/blog/`,
        permanent: true,
      },
      { source: '/projects/lofty', destination: `${EXPLOSION}/projects/`, permanent: true },
      { source: '/projects/kali', destination: `${GITHUB}/kali`, permanent: true },
      { source: '/projects/kali-platform', destination: `${GITHUB}/Kali-Platform`, permanent: true },
      { source: '/projects/job-answer-app', destination: `${GITHUB}/job-answer-app`, permanent: true },
      { source: '/projects/auto-explosion', destination: `${GITHUB}/auto-explosion`, permanent: true },
      { source: '/projects/window', destination: `${GITHUB}/window`, permanent: true },
      {
        source: '/projects/window-extension',
        destination: `${GITHUB}/window-extension`,
        permanent: true,
      },
      { source: '/projects/ranker', destination: `${GITHUB}/ranker`, permanent: true },
      { source: '/projects/clackinator', destination: `${GITHUB}/clackinator`, permanent: true },
      { source: '/projects/switch-market', destination: `${GITHUB}/switch-market`, permanent: true },
      {
        source: '/projects/freelance-ecommerce',
        destination: 'https://naturabags.com/en',
        permanent: true,
      },

      { source: '/projects', destination: `${EXPLOSION}/projects/`, permanent: true },
      { source: '/projects/:path*', destination: `${EXPLOSION}/projects/`, permanent: true },
    ];
  },
};

export default nextConfig;
