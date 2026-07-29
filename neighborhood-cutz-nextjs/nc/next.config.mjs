/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export. Every route is pre-rendered to plain HTML at build time,
  // so Netlify serves files off a CDN with no server functions to pay for.
  output: 'export',

  // The export target has no image optimization server, so next/image would
  // fail. We serve images from /public directly instead.
  images: { unoptimized: true },

  // Emits /about/index.html instead of /about.html. Netlify handles both,
  // but this keeps trailing-slash URLs consistent if pages get added later.
  trailingSlash: true,

  reactStrictMode: true,
};

export default nextConfig;
