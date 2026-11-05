/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns:[
      {
        protocol: "https",
        hostname: "gutwmbtcckhilzaxcvur.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/manga-images/**",
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
