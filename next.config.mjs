/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.youtube.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all hostnames over HTTPS
      },
    ],
  },
};

export default nextConfig;
