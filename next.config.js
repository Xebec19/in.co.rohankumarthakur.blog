/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "symmetrical-carnival.s3.ap-south-1.amazonaws.com",
        port: "",
        pathname: "/publicprefix/*",
      },
    ],
  },
};

module.exports = nextConfig;
