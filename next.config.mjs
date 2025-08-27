/** @type {import('next').NextConfig} */
import vercelToolbar from "@vercel/toolbar/plugins/next";

const nextConfig = {
  reactStrictMode: true,
};

export default vercelToolbar()(nextConfig);
