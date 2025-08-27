/** @type {import('next').NextConfig} */
import vercelToolbar from "@vercel/toolbar/plugins/next";

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // permite cualquier dominio
        pathname: "**", // cualquier ruta
      },
    ],
  },
};

export default vercelToolbar()(nextConfig);
