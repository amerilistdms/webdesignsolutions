import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/**",
      },
      {
        protocol: "https",
        hostname: "www.amerilist.com",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "amerilistwebdesign.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
