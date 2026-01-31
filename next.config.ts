import type { NextConfig } from "next";
import path from "path";

import { ALLOWED_IMAGE_DOMAINS } from "./lib/constants/images";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: ALLOWED_IMAGE_DOMAINS.map((domain) => ({
      protocol: "https",
      hostname: `*.${domain}`,
    })),
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
