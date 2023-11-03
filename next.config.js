/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["node-nlp"],
  },
};

module.exports = nextConfig;
