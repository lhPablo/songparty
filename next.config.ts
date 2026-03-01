import type { NextConfig } from "next";
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

import { ALLOWED_IMAGE_DOMAINS } from "./lib/constants/images";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

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

export default withNextIntl(nextConfig);
