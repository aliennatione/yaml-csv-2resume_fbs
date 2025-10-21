/** @type {import('next').NextConfig} */
const repoName = '/yaml-csv-2resume_fbs';

const nextConfig = {
  output: 'export',
  basePath: repoName,
  assetPrefix: `${repoName}/`,
  env: {
    NEXT_PUBLIC_BASE_PATH: repoName,
  },
};

export default nextConfig;
